import React, { useState } from 'react';
import { 
  X, 
  FileText, 
  Database, 
  Layers, 
  CheckCircle2, 
  Eye, 
  ExternalLink, 
  Calendar, 
  ShieldCheck, 
  Hash, 
  FileSpreadsheet,
  Image as ImageIcon,
  AlertTriangle,
  Sparkles
} from 'lucide-react';
import { DocumentItem, RecordItem, SourceCitation } from '../../types';

interface DocumentInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  document: DocumentItem | null;
  records?: RecordItem[];
  onOpenSourceInspector: (citation: SourceCitation) => void;
}

export const DocumentInspectorModal: React.FC<DocumentInspectorModalProps> = ({
  isOpen,
  onClose,
  document: doc,
  records = [],
  onOpenSourceInspector
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'chunks' | 'records'>('overview');

  if (!isOpen || !doc) return null;

  // Filter records matching this document
  const matchingRecords = records.filter(r => {
    const docBase = doc.name.toLowerCase().split('.')[0];
    const recFile = r.sourceFile.toLowerCase();
    return recFile.includes(docBase);
  });

  // Extract or generate realistic semantic chunks
  const getDocumentChunks = (d: DocumentItem) => {
    const name = d.name.toLowerCase();
    if (name.includes('attendance_report')) {
      return [
        {
          id: 'chk-1',
          location: 'Page 1 — Executive Summary',
          content: 'Executive Biometric Attendance Evaluation: Departmental compliance analysis across CSE, ECE, IT, Mechanical, and Operations.',
          relevance: 'Overview'
        },
        {
          id: 'chk-2',
          location: 'Page 2 — Threshold Policy',
          content: 'Policy Guideline: Institutional mandatory minimum attendance is 75.00%. Staff below 75% are placed on administrative review.',
          relevance: 'Compliance Policy'
        },
        {
          id: 'chk-3',
          location: 'Page 4 — CSE Department Findings',
          content: 'CRITICAL DEFICIT: 23 personnel in Computer Science & Engineering (CSE) have recorded attendance strictly below the 75% threshold (ranging from 65% to 74%).',
          relevance: '🔴 Discrepancy / At Risk'
        },
        {
          id: 'chk-4',
          location: 'Page 4, Paragraph 3 — Downward Trend Alert',
          content: '3 engineering staff (EMP187, EMP142, EMP257) show consecutive monthly decline: EMP187 dropped from 81% -> 74% -> 68% over 3 quarters.',
          relevance: '🔴 Trend Anomaly'
        }
      ];
    }
    if (name.includes('vendor_invoices')) {
      return [
        {
          id: 'chk-1',
          location: 'Rows 1-42 — High Value Invoices',
          content: 'Identified 42 vendor invoices exceeding ₹50,000 threshold, representing cumulative accounts payable of ₹3,912,400.',
          relevance: 'Threshold Filter (> ₹50,000)'
        },
        {
          id: 'chk-2',
          location: 'Row 22 — INV-8821 Mismatch',
          content: 'Invoice INV-8821 | Ref: PO-4091 | Vendor: Apex Cloud Infrastructure Ltd. | Billed Amount: ₹118,500 | Status: Pending Verification.',
          relevance: '🔴 Conflict: ₹18,500 over PO-4091'
        },
        {
          id: 'chk-3',
          location: 'Rows 4, 12, 18, 26, 34 — Regional Overdue Accounts',
          content: '17 invoices from Tamil Nadu vendors; 5 past-due accounts flagged (Due Date: 2026-09-15) totaling ₹354,000.',
          relevance: '🟠 Overdue Warning'
        }
      ];
    }
    if (name.includes('purchase_orders')) {
      return [
        {
          id: 'chk-1',
          location: 'Row 2 — PO-4091 Approved Specification',
          content: 'PO Number: PO-4091 | Vendor: Apex Cloud Infrastructure Ltd. | Approved Amount: ₹100,000 | Status: Approved | Approver: VP of Engineering.',
          relevance: '🔴 Discrepancy Baseline (Billed ₹118,500)'
        },
        {
          id: 'chk-2',
          location: 'Row 12 — PO-4102 Signature Missing',
          content: 'PO Number: PO-4102 | Vendor: Vendor Global Corp | Amount: ₹85,000 | Approver Signature: [NULL / Missing] | Status: Awaiting Signature.',
          relevance: '🟠 Missing Information'
        }
      ];
    }
    if (name.includes('project_alpha_charter')) {
      return [
        {
          id: 'chk-1',
          location: 'Page 1 — Project Charter Baseline',
          content: 'Project Alpha Charter & Architecture Baseline (Ref: DOC-ALPHA-2026-V1). Executive Sponsor: VP of Engineering.',
          relevance: 'Baseline Spec'
        },
        {
          id: 'chk-2',
          location: 'Page 12, Section 4.2 — Milestone 2.0 Delivery',
          content: 'Delivery of production-hardened microservices scheduled strictly for 15 October 2026.',
          relevance: '🔴 Deadline Conflict (Charter: 15 Oct 2026)'
        }
      ];
    }
    if (name.includes('project_alpha_status_update')) {
      return [
        {
          id: 'chk-1',
          location: 'Page 3, Section 3.1 — Schedule Revision',
          content: 'Milestone 2.0 revised target slid to 20 October 2026 due to backend latency profiling across Kubernetes cluster.',
          relevance: '🔴 Deadline Conflict (Status: 20 Oct 2026)'
        },
        {
          id: 'chk-2',
          location: 'Section 3.4 — Task Alpha-34 Delay',
          content: 'Task Alpha-34: API Gateway Latency Optimization assigned to EMP187 (CSE) is Delayed (+8 Days). Critical path blocked.',
          relevance: '🟠 Task Blocker'
        }
      ];
    }
    if (name.includes('employee_directory')) {
      return [
        {
          id: 'chk-1',
          location: 'Master Personnel Index',
          content: 'Indexed 350 enterprise personnel across CSE, ECE, IT, Mechanical, Finance, Civil, and Operations departments.',
          relevance: 'Directory Index'
        },
        {
          id: 'chk-2',
          location: 'Rows 115, 139, 173, 212, 264, 316, 349',
          content: 'Compliance Flag: 7 employee records missing emergency contact phone numbers (EMP114, EMP138, EMP172, EMP211, EMP263, EMP315, EMP348).',
          relevance: '🟠 Missing Data'
        },
        {
          id: 'chk-3',
          location: 'Row 110 — Staff EMP109',
          content: 'EMP109 | Staff Member 109 | Department: CSE | Designation: Sr. Software Engineer | Band: L4.',
          relevance: '🟡 Designation Conflict (Tech Lead in Attendance)'
        }
      ];
    }
    if (name.includes('customer_support')) {
      return [
        {
          id: 'chk-1',
          location: 'Rows 1-25 — Payment Gateway Incident Cluster',
          content: '18 high-priority customer dispute tickets reporting 504 gateway timeout and double credit card debits.',
          relevance: 'Payment Cluster'
        },
        {
          id: 'chk-2',
          location: 'Rows 1-3 — Urgent SLA Breaches',
          content: 'Tickets CMP-5001, CMP-5002, CMP-5003 exceeded 48h SLA response threshold. Customer accounts placed on priority outreach.',
          relevance: '🔴 SLA Breach'
        }
      ];
    }
    // Generic fallback for user-uploaded documents
    return [
      {
        id: 'chk-1',
        location: 'Ingestion Chunk Manifest',
        content: d.summary,
        relevance: 'Document Summary'
      },
      ...(d.highlights || []).map((h, i) => ({
        id: `chk-${i + 2}`,
        location: `Detected Highlight #${i + 1}`,
        content: h,
        relevance: 'Discovered Fact'
      }))
    ];
  };

  const chunks = getDocumentChunks(doc);

  const getFormatIcon = (type: DocumentItem['type']) => {
    switch (type) {
      case 'xlsx':
      case 'csv':
        return <FileSpreadsheet className="w-5 h-5 text-emerald-400" />;
      case 'pdf':
        return <FileText className="w-5 h-5 text-rose-400" />;
      case 'docx':
        return <FileText className="w-5 h-5 text-blue-400" />;
      case 'image':
        return <ImageIcon className="w-5 h-5 text-amber-400" />;
      default:
        return <FileText className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] bg-spidey-card border-2 border-spidey-red/50 rounded-2xl shadow-[0_0_40px_rgba(226,54,54,0.3)] overflow-hidden flex flex-col text-slate-100 font-tech"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-spidey-red/25 bg-gradient-to-r from-spidey-navy via-spidey-card to-spidey-navy">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-spidey-red/20 text-spidey-electric border border-spidey-red/40 shadow-[0_0_12px_rgba(226,54,54,0.3)]">
              {getFormatIcon(doc.type)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white font-spidey tracking-wide">
                  {doc.name}
                </h3>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-spidey-navy text-spidey-web border border-spidey-blue/40 uppercase font-bold">
                  {doc.type} {doc.ocrApplied ? '(OCR)' : ''}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  <CheckCircle2 className="w-3 h-3" /> Indexed
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5 font-tech">
                Spider-Net Node • Size: {doc.size} • {doc.recordsCount} Records • {doc.chunksCount} Semantic Chunks
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-spidey-red/20 hover:border hover:border-spidey-red/40 transition-colors"
            title="Close Inspector"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-spidey-red/20 bg-spidey-navy/50">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 text-xs font-spidey font-bold uppercase tracking-wider rounded-t-xl transition-colors border-b-2 ${
              activeTab === 'overview'
                ? 'border-spidey-electric text-spidey-electric bg-spidey-card shadow-sm'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Synopsis &amp; Highlights
          </button>
          <button
            onClick={() => setActiveTab('chunks')}
            className={`px-4 py-2 text-xs font-spidey font-bold uppercase tracking-wider rounded-t-xl transition-colors border-b-2 flex items-center gap-1.5 ${
              activeTab === 'chunks'
                ? 'border-spidey-electric text-spidey-electric bg-spidey-card shadow-sm'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Semantic Chunks ({chunks.length})
          </button>
          <button
            onClick={() => setActiveTab('records')}
            className={`px-4 py-2 text-xs font-spidey font-bold uppercase tracking-wider rounded-t-xl transition-colors border-b-2 flex items-center gap-1.5 ${
              activeTab === 'records'
                ? 'border-spidey-electric text-spidey-electric bg-spidey-card shadow-sm'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Extracted Records ({matchingRecords.length > 0 ? matchingRecords.length : doc.recordsCount})
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* TAB 1: OVERVIEW & SYNOPSIS */}
          {activeTab === 'overview' && (
            <div className="space-y-5">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                  <span className="text-[11px] font-medium text-slate-400 block uppercase">Format</span>
                  <span className="text-sm font-bold text-white font-mono uppercase">{doc.type}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                  <span className="text-[11px] font-medium text-slate-400 block uppercase">File Size</span>
                  <span className="text-sm font-bold text-white font-mono">{doc.size}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                  <span className="text-[11px] font-medium text-slate-400 block uppercase">Records Extracted</span>
                  <span className="text-sm font-bold text-orange-400 font-mono">{doc.recordsCount}</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800">
                  <span className="text-[11px] font-medium text-slate-400 block uppercase">Indexed Chunks</span>
                  <span className="text-sm font-bold text-indigo-400 font-mono">{doc.chunksCount}</span>
                </div>
              </div>

              {/* Document Synopsis */}
              <div>
                <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-orange-400" />
                  Executive Synopsis
                </span>
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-slate-200 leading-relaxed">
                  {doc.summary}
                </div>
              </div>

              {/* Highlights & Detected Insights */}
              {doc.highlights && doc.highlights.length > 0 && (
                <div>
                  <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-orange-400" />
                    Discovered Insights &amp; Cross-Document Flags
                  </span>
                  <div className="space-y-2">
                    {doc.highlights.map((h, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-xl bg-surface-850 border border-slate-800 text-xs text-slate-200 flex items-start gap-2.5"
                      >
                        <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: SEMANTIC CHUNKS */}
          {activeTab === 'chunks' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-400">
                Indexed semantic chunks used by the precision retrieval and anti-hallucination engine:
              </p>
              <div className="space-y-3">
                {chunks.map((chk, idx) => (
                  <div 
                    key={chk.id || idx}
                    className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-orange-500/40 transition-colors space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-[10px]">
                          Chunk #{idx + 1}
                        </span>
                        <span className="text-xs font-semibold text-white font-mono">
                          {chk.location}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                        {chk.relevance}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 font-mono bg-slate-900/60 p-3 rounded-lg border border-slate-800/80 leading-relaxed">
                      {chk.content}
                    </p>
                    <div className="flex justify-end pt-1">
                      <button
                        onClick={() => {
                          onClose();
                          onOpenSourceInspector({
                            file: doc.name,
                            location: chk.location,
                            snippet: chk.content,
                            documentType: doc.type
                          });
                        }}
                        className="text-xs text-orange-400 hover:text-orange-300 font-medium inline-flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect Evidence In Modal</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: EXTRACTED RECORDS */}
          {activeTab === 'records' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  {matchingRecords.length > 0 
                    ? `Showing ${matchingRecords.length} records matching this source`
                    : `Document contains ${doc.recordsCount} tabular records`}
                </span>
              </div>

              {matchingRecords.length > 0 ? (
                <div className="overflow-x-auto rounded-xl border border-slate-800">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-surface-850 text-slate-400 font-medium uppercase border-b border-slate-800">
                      <tr>
                        <th className="py-2.5 px-3">Record ID</th>
                        <th className="py-2.5 px-3">Title / Entity</th>
                        <th className="py-2.5 px-3">Location</th>
                        <th className="py-2.5 px-3">Status</th>
                        <th className="py-2.5 px-3 text-right">Details</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80 text-slate-300">
                      {matchingRecords.slice(0, 20).map((r) => (
                        <tr key={r.id} className="hover:bg-slate-800/40">
                          <td className="py-2 px-3 font-mono text-orange-400 font-semibold">{r.id}</td>
                          <td className="py-2 px-3 font-medium text-white max-w-xs truncate">{r.title}</td>
                          <td className="py-2 px-3 font-mono text-slate-400">{r.sourceLocation}</td>
                          <td className="py-2 px-3">
                            <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300">
                              {r.status}
                            </span>
                          </td>
                          <td className="py-2 px-3 text-right">
                            <button
                              onClick={() => {
                                onClose();
                                onOpenSourceInspector({
                                  file: r.sourceFile,
                                  location: r.sourceLocation,
                                  snippet: JSON.stringify(r.fields, null, 2),
                                  documentType: doc.type
                                });
                              }}
                              className="text-xs text-orange-400 hover:text-orange-300 inline-flex items-center gap-1"
                            >
                              <span>Inspect</span>
                              <ExternalLink className="w-3 h-3" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {matchingRecords.length > 20 && (
                    <div className="p-2.5 text-center text-xs text-slate-400 bg-surface-850">
                      + {matchingRecords.length - 20} more records in database
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-8 text-center rounded-xl bg-slate-950 border border-slate-800">
                  <Database className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                  <p className="text-xs text-slate-400">
                    This document is indexed as a reference manual with {doc.chunksCount} text chunks and {doc.recordsCount} structured facts.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800 bg-surface-850">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Anti-Hallucination Grounded Source</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onClose();
                onOpenSourceInspector({
                  file: doc.name,
                  location: chunks[0]?.location || 'Page 1',
                  snippet: chunks[0]?.content || doc.summary,
                  documentType: doc.type
                });
              }}
              className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-medium text-xs flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Open in Evidence Inspector</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
