import { RecordItem, DocumentItem, FindingItem, GraphNode, GraphEdge } from '../types';

// Simple robust client-side CSV parser
export function parseCSV(text: string): { headers: string[]; rows: Record<string, string>[] } {
  const lines = text.split(/\r?\n/).filter(line => line.trim().length > 0);
  if (lines.length === 0) return { headers: [], rows: [] };

  // Parse header
  const headers = parseCSVLine(lines[0]);
  const rows: Record<string, string>[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    if (values.length === 0) continue;
    const rowObj: Record<string, string> = {};
    headers.forEach((h, idx) => {
      rowObj[h] = values[idx] || '';
    });
    rows.push(rowObj);
  }

  return { headers, rows };
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

// Convert parsed file into Records, Chunks, and Document Metadata
export function processUploadedFile(
  file: File,
  content: string
): { document: DocumentItem; records: RecordItem[]; findings: FindingItem[] } {
  const ext = file.name.split('.').pop()?.toLowerCase() || 'txt';
  const sizeMB = (file.size / (1024 * 1024)).toFixed(2) + ' MB';
  const docId = `doc-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
  const uploadedAt = 'Just now';

  let records: RecordItem[] = [];
  let chunksCount = 1;
  let summary = `Uploaded file ${file.name}`;
  const highlights: string[] = [];

  if (ext === 'csv') {
    const { headers, rows } = parseCSV(content);
    chunksCount = Math.max(1, Math.ceil(rows.length / 10));
    summary = `Tabular data containing ${rows.length} rows across ${headers.length} detected columns: ${headers.slice(0, 4).join(', ')}${headers.length > 4 ? '...' : ''}.`;
    highlights.push(`Auto-detected schema: ${headers.length} columns`);
    highlights.push(`Parsed ${rows.length} structured records`);

    records = rows.map((row, idx) => {
      const recId = row['ID'] || row['Employee ID'] || row['Invoice Number'] || row['Ticket ID'] || row['PO Number'] || `REC-${idx + 1}`;
      const title = row['Title'] || row['Name'] || row['Full Name'] || row['Description'] || `${file.name} - Row ${idx + 1}`;
      const dept = row['Department'] || row['Category'] || row['Region'];
      
      // Auto detect numeric values
      let amount: number | undefined;
      let attendance: number | undefined;
      for (const [k, v] of Object.entries(row)) {
        const cleanV = String(v).replace(/[^0-9.-]/g, '');
        if (cleanV && !isNaN(Number(cleanV))) {
          if (k.toLowerCase().includes('amount') || k.toLowerCase().includes('inr') || k.toLowerCase().includes('price')) {
            amount = Number(cleanV);
          }
          if (k.toLowerCase().includes('attendance')) {
            attendance = Number(cleanV);
          }
        }
      }

      // Check for missing info
      let hasMissing = false;
      for (const [k, v] of Object.entries(row)) {
        if (!v || v.trim() === '' || v.toLowerCase() === 'null' || v.toLowerCase() === 'missing') {
          hasMissing = true;
          break;
        }
      }

      return {
        id: recId,
        category: (ext === 'csv' && file.name.toLowerCase().includes('invoice') ? 'invoice' :
                  file.name.toLowerCase().includes('employee') ? 'employee' :
                  file.name.toLowerCase().includes('task') ? 'task' : 'employee'),
        title: String(title),
        department: dept,
        amount,
        attendanceRate: attendance,
        status: row['Status'] || (attendance !== undefined && attendance < 75 ? 'At Risk' : 'Normal'),
        priority: amount && amount > 50000 ? 'high' : (attendance && attendance < 70 ? 'critical' : 'medium'),
        sourceFile: file.name,
        sourceLocation: `Row ${idx + 2}`,
        fields: row,
        hasMissingInfo: hasMissing
      };
    });
  } else {
    // Unstructured text / PDF / DOCX
    const paragraphs = content.split(/\n\s*\n/).filter(p => p.trim().length > 0);
    chunksCount = Math.max(1, paragraphs.length);
    summary = `Unstructured document extracted into ${chunksCount} semantic passages. Full-text search and embeddings indexed.`;
    highlights.push(`Extracted ${chunksCount} text chunks`);
    highlights.push(`Word count: ${content.split(/\s+/).length.toLocaleString()} words`);

    paragraphs.slice(0, 50).forEach((para, idx) => {
      records.push({
        id: `CHUNK-${idx + 1}`,
        category: 'task',
        title: para.slice(0, 60) + (para.length > 60 ? '...' : ''),
        status: 'Indexed',
        priority: 'low',
        sourceFile: file.name,
        sourceLocation: `Section ${idx + 1}`,
        fields: {
          'Content': para,
          'Passage': `${idx + 1} of ${paragraphs.length}`
        }
      });
    });
  }

  // Autonomous dynamic detective analysis on uploaded records
  const findings: FindingItem[] = [];

  // Check for missing fields
  const missingRecords = records.filter(r => r.hasMissingInfo);
  if (missingRecords.length > 0) {
    findings.push({
      id: `det-missing-${Date.now()}`,
      type: 'missing',
      priority: missingRecords.length > 5 ? 'high' : 'medium',
      title: `Missing Attribute Values in ${file.name} (${missingRecords.length} records)`,
      description: `${missingRecords.length} records in ${file.name} contain blank, null, or missing fields violating completeness standards.`,
      category: 'Data Quality & Compliance',
      sources: missingRecords.slice(0, 3).map(r => ({
        file: r.sourceFile,
        location: r.sourceLocation,
        snippet: JSON.stringify(r.fields)
      })),
      recommendedAction: `Inspect affected rows in ${file.name} and fill in missing information.`,
      status: 'open'
    });
  }

  // Check for duplicate IDs
  const idCounts: Record<string, number> = {};
  records.forEach(r => {
    idCounts[r.id] = (idCounts[r.id] || 0) + 1;
  });
  const duplicateIds = Object.keys(idCounts).filter(id => idCounts[id] > 1);
  if (duplicateIds.length > 0) {
    findings.push({
      id: `det-dup-${Date.now()}`,
      type: 'duplicate',
      priority: 'medium',
      title: `Duplicate Record Identifiers Detected in ${file.name}`,
      description: `Identified ${duplicateIds.length} repeated identifier(s): ${duplicateIds.slice(0, 5).join(', ')}.`,
      category: 'Data Integrity',
      sources: [
        {
          file: file.name,
          location: 'Multiple Rows',
          snippet: `Repeated IDs: ${duplicateIds.join(', ')}`
        }
      ],
      recommendedAction: 'Deduplicate identical entries to prevent double-counting.',
      status: 'open'
    });
  }

  // Check for low attendance or anomalies
  const lowAttendance = records.filter(r => r.attendanceRate !== undefined && r.attendanceRate < 75);
  if (lowAttendance.length > 0) {
    findings.push({
      id: `det-att-${Date.now()}`,
      type: 'important',
      priority: 'critical',
      title: `${lowAttendance.length} Personnel with Attendance Deficit (< 75%)`,
      description: `Found ${lowAttendance.length} records where attendance rate is below 75% threshold in ${file.name}.`,
      category: 'HR Compliance',
      sources: lowAttendance.slice(0, 2).map(r => ({
        file: r.sourceFile,
        location: r.sourceLocation,
        snippet: `Attendance: ${r.attendanceRate}%`
      })),
      recommendedAction: 'Schedule attendance review with department leads.',
      status: 'open'
    });
  }

  const docType = (['pdf', 'docx', 'xlsx', 'csv', 'png', 'jpg'].includes(ext)
    ? (ext === 'png' || ext === 'jpg' ? 'image' : ext)
    : 'txt') as DocumentItem['type'];

  const document: DocumentItem = {
    id: docId,
    name: file.name,
    type: docType,
    size: sizeMB,
    recordsCount: records.length,
    chunksCount,
    uploadedAt,
    status: 'indexed',
    ocrApplied: docType === 'image',
    summary,
    highlights
  };

  return { document, records, findings };
}

// Generate dynamic graph nodes & edges from current records and documents
export function buildDynamicGraph(
  documents: DocumentItem[],
  records: RecordItem[]
): { nodes: GraphNode[]; edges: GraphEdge[] } {
  if (documents.length === 0 && records.length === 0) {
    return { nodes: [], edges: [] };
  }

  const nodes: GraphNode[] = [];
  const edges: GraphEdge[] = [];

  // Add document nodes
  documents.forEach((doc, idx) => {
    const angle = (idx / Math.max(1, documents.length)) * 2 * Math.PI;
    const x = 450 + 220 * Math.cos(angle);
    const y = 300 + 160 * Math.sin(angle);

    nodes.push({
      id: `node-doc-${doc.id}`,
      label: doc.name,
      type: 'document',
      categoryColor: '#3b82f6',
      x,
      y,
      description: doc.summary,
      connectedCount: Math.min(doc.recordsCount, 10),
      metrics: { 'Type': doc.type.toUpperCase(), 'Records': String(doc.recordsCount), 'Size': doc.size },
      sourceFile: doc.name
    });
  });

  // Extract unique departments or categories
  const categories = Array.from(new Set(records.map(r => r.department || r.category).filter(Boolean))).slice(0, 5);
  categories.forEach((cat, idx) => {
    const catId = `node-cat-${idx}`;
    const x = 300 + idx * 90;
    const y = 200 + (idx % 2 === 0 ? -40 : 40);

    nodes.push({
      id: catId,
      label: String(cat),
      type: 'department',
      categoryColor: '#6366f1',
      x,
      y,
      description: `Category cluster: ${cat}`,
      connectedCount: records.filter(r => (r.department || r.category) === cat).length,
      metrics: { 'Records': String(records.filter(r => (r.department || r.category) === cat).length) }
    });

    // Link category to matching documents
    documents.forEach(doc => {
      edges.push({
        id: `edge-${catId}-${doc.id}`,
        source: catId,
        target: `node-doc-${doc.id}`,
        label: 'Contains'
      });
    });
  });

  return { nodes, edges };
}
