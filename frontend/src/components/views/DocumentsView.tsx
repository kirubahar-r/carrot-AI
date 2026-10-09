import React, { useState } from 'react';
import { 
  FileText, 
  Upload, 
  FileSpreadsheet, 
  Image as ImageIcon, 
  CheckCircle2, 
  Eye, 
  Layers, 
  Zap, 
  Database,
  ArrowRight,
  FileUp,
  AlertCircle
} from 'lucide-react';
import { DocumentItem, SourceCitation, RecordItem, FindingItem } from '../../types';
import { processUploadedFile } from '../../services/ingestionEngine';
import { DocumentInspectorModal } from '../modals/DocumentInspectorModal';

interface DocumentsViewProps {
  documents: DocumentItem[];
  records?: RecordItem[];
  onIngestNewFile: (doc: DocumentItem, records: RecordItem[], findings: FindingItem[]) => void;
  onOpenSourceInspector: (citation: SourceCitation) => void;
  onLoadDemo: () => void;
}

export const DocumentsView: React.FC<DocumentsViewProps> = ({
  documents,
  records = [],
  onIngestNewFile,
  onOpenSourceInspector,
  onLoadDemo
}) => {
  const [selectedDoc, setSelectedDoc] = useState<DocumentItem | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccessMsg, setUploadSuccessMsg] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = (event.target?.result as string) || '';
      
      // Process file dynamically
      const { document, records, findings } = processUploadedFile(file, content);

      // Ingest into active workspace state
      onIngestNewFile(document, records, findings);

      setIsUploading(false);
      setUploadSuccessMsg(`Successfully processed "${file.name}": Extracted ${records.length} records and ${document.chunksCount} chunks.`);
      setTimeout(() => setUploadSuccessMsg(null), 5000);
    };

    reader.onerror = () => {
      setIsUploading(false);
      alert('Error reading uploaded file.');
    };

    // Read as text
    reader.readAsText(file);
  };

  const getFormatIcon = (type: DocumentItem['type']) => {
    switch (type) {
      case 'xlsx':
      case 'csv':
        return <FileSpreadsheet className="w-4 h-4 text-emerald-400" />;
      case 'pdf':
        return <FileText className="w-4 h-4 text-rose-400" />;
      case 'docx':
        return <FileText className="w-4 h-4 text-blue-400" />;
      case 'image':
        return <ImageIcon className="w-4 h-4 text-amber-400" />;
      default:
        return <FileText className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full spidey-web-bg text-slate-100 overflow-y-auto font-tech">
      {/* Header */}
      <div className="border-b border-spidey-red/25 bg-gradient-to-b from-spidey-red/15 via-[#0A1128]/70 to-[#070913] px-6 py-8 backdrop-blur-md">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-spidey-red/20 text-spidey-electric border border-spidey-red/40 shadow-[0_0_15px_rgba(226,54,54,0.4)]">
                  <FileText className="w-5 h-5 text-spidey-electric animate-pulse" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-black font-spidey tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white via-red-200 to-spidey-web">
                    SPIDER-NET INGESTION MATRIX 🕸️
                  </h1>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-spidey-web/90">Multi-Format Web Sensors</span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 font-tech">
                Upload CSV, TXT, Excel, Word, PDF, or image files. CARROT AI auto-detects schemas, chunks text, and indexes searchable Spider-Net records.
              </p>
            </div>

            {documents.length === 0 && (
              <button
                onClick={onLoadDemo}
                className="px-4 py-2 rounded-xl bg-spidey-navy hover:bg-slate-800 border border-spidey-blue/40 text-blue-300 font-spidey font-bold uppercase text-xs flex items-center gap-2 transition-all self-start sm:self-auto"
              >
                <Zap className="w-4 h-4 text-spidey-web" />
                <span>Load Complete Spider-Net Data</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-6xl w-full mx-auto p-4 sm:p-6 space-y-6">
        {/* Dynamic File Dropzone */}
        <div className="p-8 rounded-2xl border-2 border-dashed border-spidey-red/40 hover:border-spidey-electric bg-spidey-card/85 text-center transition-all group relative shadow-[0_4px_25px_rgba(0,0,0,0.6)]">
          <input
            type="file"
            onChange={handleFileUpload}
            accept=".csv,.txt,.json,.tsv,.pdf,.docx,.xlsx,.png,.jpg"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            title="Upload CSV, TXT, XLSX, DOCX, PDF, or Images"
          />
          <div className="max-w-md mx-auto space-y-3 pointer-events-none">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-spidey-red/20 text-spidey-electric flex items-center justify-center border border-spidey-red/40 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(226,54,54,0.3)]">
              <Upload className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold font-spidey text-white">
                {isUploading ? 'Web-Parsing Schema, Ingesting Records & Building Embeddings...' : 'Drag & drop data files or click to shoot web'}
              </h3>
              <p className="text-xs text-slate-300 mt-1 font-tech">
                Drop CSV (auto-extracts records), TXT, PDF, Word, or spreadsheets
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 pt-1 text-[11px] font-mono text-slate-300">
              <span className="px-2 py-0.5 rounded bg-spidey-navy text-spidey-web border border-spidey-blue/30">Auto-Schema Detect</span>
              <span className="px-2 py-0.5 rounded bg-spidey-navy text-spidey-web border border-spidey-blue/30">Semantic Web Chunks</span>
              <span className="px-2 py-0.5 rounded bg-spidey-navy text-spidey-web border border-spidey-blue/30">Vector Embeddings</span>
            </div>
          </div>
        </div>

        {/* Upload Success Feedback */}
        {uploadSuccessMsg && (
          <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs flex items-center justify-between shadow-[0_0_15px_rgba(16,185,129,0.3)]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className="font-tech">{uploadSuccessMsg}</span>
            </div>
            <span className="text-[10px] uppercase font-mono font-bold text-emerald-400">Indexed in Matrix</span>
          </div>
        )}

        {/* Documents Table or Empty State */}
        {documents.length > 0 ? (
          <div className="p-6 rounded-2xl bg-spidey-card/95 border border-spidey-red/30 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-spidey-red/20">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-spidey-electric" />
                <h3 className="text-sm font-bold font-spidey text-white uppercase tracking-wider">
                  Active Web Data Nodes ({documents.length})
                </h3>
              </div>
              <span className="text-xs text-spidey-web font-mono font-bold">
                Total Extracted Records: {documents.reduce((acc, d) => acc + d.recordsCount, 0).toLocaleString()}
              </span>
            </div>

            <div className="overflow-x-auto rounded-xl border border-spidey-red/20">
              <table className="w-full text-left text-xs font-tech">
                <thead className="bg-spidey-navy/90 text-slate-300 font-spidey font-bold uppercase tracking-wider border-b border-spidey-red/30">
                  <tr>
                    <th className="py-3 px-4">Document Node</th>
                    <th className="py-3 px-4">Format</th>
                    <th className="py-3 px-4">Size</th>
                    <th className="py-3 px-4">Records</th>
                    <th className="py-3 px-4">Chunks</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 text-slate-300 font-mono">
                  {documents.map((doc) => (
                    <tr key={doc.id} className="hover:bg-spidey-red/10 transition-colors">
                      <td className="py-3 px-4 font-medium text-white flex items-center gap-2.5">
                        {getFormatIcon(doc.type)}
                        <div>
                          <span className="block font-mono text-xs font-bold text-slate-100">{doc.name}</span>
                          <span className="text-[11px] text-slate-400 font-tech line-clamp-1">
                            {doc.summary}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 uppercase">
                        <span className="px-2 py-0.5 rounded bg-spidey-navy text-blue-300 border border-spidey-blue/30 text-[10px] font-bold">
                          {doc.type}
                          {doc.ocrApplied && ' (OCR)'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-400">
                        {doc.size}
                      </td>
                      <td className="py-3 px-4 text-spidey-electric font-bold">
                        {doc.recordsCount}
                      </td>
                      <td className="py-3 px-4 text-slate-400">
                        {doc.chunksCount}
                      </td>
                      <td className="py-3 px-4 font-tech">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                          <CheckCircle2 className="w-3 h-3" /> Indexed
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => setSelectedDoc(doc)}
                          className="px-3 py-1.5 rounded-lg spidey-btn text-white transition-all text-xs font-spidey font-bold uppercase inline-flex items-center gap-1.5 shadow-sm"
                          title={`Inspect ${doc.name}`}
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Inspect</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* Sleek Empty State */
          <div className="p-12 rounded-2xl bg-spidey-card/90 border border-spidey-red/30 text-center space-y-4">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-spidey-navy border border-spidey-blue/30 flex items-center justify-center text-slate-400">
              <FileUp className="w-7 h-7 text-spidey-electric" />
            </div>
            <div>
              <h3 className="text-base font-bold font-spidey text-white">No documents uploaded yet</h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto mt-1 font-tech">
                Spider-Net matrix is currently clean. Drag &amp; drop any CSV, TXT, Excel, or Word file above to populate records and unlock precision AI search.
              </p>
            </div>
            <div className="pt-2">
              <button
                onClick={onLoadDemo}
                className="px-4 py-2 rounded-xl spidey-btn text-white font-spidey font-bold uppercase text-xs transition-colors shadow-lg inline-flex items-center gap-2"
              >
                <Zap className="w-3.5 h-3.5 text-spidey-web" />
                <span>Or load Spider-Net Dataset (1,064 records)</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Interactive Grounded Document Inspector Modal */}
      <DocumentInspectorModal
        isOpen={!!selectedDoc}
        onClose={() => setSelectedDoc(null)}
        document={selectedDoc}
        records={records}
        onOpenSourceInspector={onOpenSourceInspector}
      />
    </div>
  );
};
