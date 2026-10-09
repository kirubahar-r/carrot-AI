import React from 'react';
import { 
  Database, 
  FileText, 
  ShieldAlert, 
  AlertOctagon, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Upload, 
  Zap, 
  Activity, 
  ChevronRight,
  PlusCircle
} from 'lucide-react';
import { DocumentItem, RecordItem, FindingItem, SourceCitation } from '../../types';

interface DashboardViewProps {
  documents: DocumentItem[];
  records: RecordItem[];
  findings: FindingItem[];
  onNavigateToAskAI: () => void;
  onNavigateToDetective: () => void;
  onNavigateToDocuments: () => void;
  onNavigateToRecords: () => void;
  onLoadDemo: () => void;
  onOpenSourceInspector: (citation: SourceCitation) => void;
  totalRecordsCount: number;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  documents,
  records,
  findings,
  onNavigateToAskAI,
  onNavigateToDetective,
  onNavigateToDocuments,
  onNavigateToRecords,
  onLoadDemo,
  onOpenSourceInspector,
  totalRecordsCount
}) => {
  const conflictCount = findings.filter(f => f.type === 'conflict').length;
  const missingCount = findings.filter(f => f.type === 'missing').length;
  const criticalCount = findings.filter(f => f.priority === 'critical').length;

  return (
    <div className="flex-1 flex flex-col h-full spidey-web-bg text-slate-100 overflow-y-auto font-tech">
      {/* Hero Welcome Header */}
      <div className="border-b border-spidey-red/25 bg-gradient-to-b from-spidey-red/15 via-[#0A1128]/70 to-[#070913] px-6 py-8 backdrop-blur-md">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-spidey font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                  totalRecordsCount > 0 
                    ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30' 
                    : 'bg-spidey-card text-slate-400 border border-slate-700'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${totalRecordsCount > 0 ? 'bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]' : 'bg-slate-500'}`} />
                  {totalRecordsCount > 0 ? 'Spider-Net Knowledge Matrix Live' : 'Clean Matrix (0 Nodes)'}
                </span>
                <span className="text-xs text-spidey-web/80 font-mono">
                  🕷️ Stark-Tech Suit Protocol
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black font-spidey tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white via-red-200 to-spidey-web mt-1">
                SPIDER-NET COMMAND HQ 🕸️
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 font-tech">
                Real-time multi-source telemetry, spider-sense discrepancy monitoring, and grounded AI intelligence.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onNavigateToDocuments}
                className="px-4 py-2.5 rounded-xl bg-spidey-card hover:bg-slate-800 border border-spidey-red/30 text-slate-200 font-spidey font-bold uppercase text-xs flex items-center gap-2 transition-all shadow-sm"
              >
                <Upload className="w-4 h-4 text-spidey-electric" />
                <span>Upload Data</span>
              </button>
              <button
                onClick={onNavigateToAskAI}
                className="px-4 py-2.5 rounded-xl spidey-btn text-white font-spidey font-bold uppercase text-xs flex items-center gap-2 transition-all transform hover:-translate-y-0.5 shadow-lg"
              >
                <Sparkles className="w-4 h-4 text-spidey-web animate-pulse" />
                <span>Web-Shoot AI 🕸️</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl w-full mx-auto p-4 sm:p-6 space-y-6">
        {/* Metric KPI Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Total Records */}
          <div 
            onClick={onNavigateToRecords}
            className="p-5 rounded-2xl bg-spidey-card/90 border border-spidey-red/30 hover:border-spidey-electric hover:shadow-[0_0_20px_rgba(226,54,54,0.35)] transition-all cursor-pointer group backdrop-blur-sm"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-spidey font-bold uppercase tracking-wider text-slate-300">
                Network Nodes
              </span>
              <div className="p-2 rounded-xl bg-spidey-red/20 text-spidey-electric group-hover:bg-spidey-electric group-hover:text-white transition-colors border border-spidey-red/30">
                <Database className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black font-spidey text-white tracking-tight">
              {totalRecordsCount.toLocaleString()}
            </div>
            <div className="mt-2 text-xs text-slate-400 flex items-center gap-1 font-tech font-medium">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              <span>{totalRecordsCount > 0 ? 'Indexed in Spider-Net' : 'Awaiting data injection'}</span>
            </div>
          </div>

          {/* Total Documents */}
          <div 
            onClick={onNavigateToDocuments}
            className="p-5 rounded-2xl bg-spidey-card/90 border border-spidey-blue/30 hover:border-spidey-web hover:shadow-[0_0_20px_rgba(37,99,235,0.35)] transition-all cursor-pointer group backdrop-blur-sm"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-spidey font-bold uppercase tracking-wider text-blue-300">
                Documents Ingested
              </span>
              <div className="p-2 rounded-xl bg-spidey-blue/20 text-spidey-web group-hover:bg-spidey-blue group-hover:text-white transition-colors border border-spidey-blue/30">
                <FileText className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black font-spidey text-white tracking-tight">
              {documents.length}
            </div>
            <div className="mt-2 text-xs text-slate-400 font-mono flex items-center gap-1">
              <span>PDF, XLSX, DOCX, CSV, TXT</span>
            </div>
          </div>

          {/* Conflicts Detected */}
          <div 
            onClick={onNavigateToDetective}
            className="p-5 rounded-2xl bg-spidey-card/90 border-2 border-rose-500/40 spider-sense-active hover:shadow-[0_0_25px_rgba(255,30,68,0.6)] transition-all cursor-pointer group backdrop-blur-sm"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-spidey font-bold uppercase tracking-wider text-rose-300">
                Spider-Sense Alerts ⚠️
              </span>
              <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400 group-hover:bg-rose-600 group-hover:text-white transition-colors border border-rose-500/40">
                <AlertOctagon className="w-4 h-4 animate-bounce" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black font-spidey text-rose-200 tracking-tight">
              {conflictCount}
            </div>
            <div className="mt-2 text-xs text-rose-400 flex items-center gap-1 font-tech font-bold">
              <span>{conflictCount > 0 ? `${conflictCount} Discrepancies Flagged` : 'Zero Conflicts Detected'}</span>
            </div>
          </div>

          {/* Missing Information */}
          <div 
            onClick={onNavigateToDetective}
            className="p-5 rounded-2xl bg-spidey-card/90 border border-amber-500/30 hover:border-amber-400 hover:shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-all cursor-pointer group backdrop-blur-sm"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-spidey font-bold uppercase tracking-wider text-amber-300">
                Missing Attributes
              </span>
              <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 group-hover:bg-amber-600 group-hover:text-white transition-colors border border-amber-500/30">
                <AlertTriangle className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-black font-spidey text-white tracking-tight">
              {missingCount}
            </div>
            <div className="mt-2 text-xs text-amber-400 flex items-center gap-1 font-tech font-medium">
              <span>{missingCount > 0 ? `${missingCount} Incomplete Fields` : 'All Nodes Complete'}</span>
            </div>
          </div>
        </div>

        {/* Clean State Onboarding Card if 0 records */}
        {totalRecordsCount === 0 && (
          <div className="p-8 rounded-2xl bg-spidey-card/90 border border-spidey-red/30 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-3xl bg-gradient-to-tr from-spidey-red/20 to-spidey-blue/20 text-spidey-electric border border-spidey-red/40 flex items-center justify-center text-3xl shadow-[0_0_20px_rgba(226,54,54,0.3)]">
              🕷️
            </div>
            <div>
              <h2 className="text-xl font-bold font-spidey text-white">Your Spider-Net Grid is Clean &amp; Ready</h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto mt-1 leading-relaxed font-tech">
                CARROT AI is ready for your enterprise and personal data files. Drag &amp; drop spreadsheets (CSV/XLSX), Word documents, PDFs, or text notes to begin scanning with zero hallucinations.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={onNavigateToDocuments}
                className="px-6 py-3 rounded-xl spidey-btn text-white font-spidey font-bold uppercase text-xs inline-flex items-center gap-2 transition-all shadow-lg"
              >
                <Upload className="w-4 h-4" />
                <span>Upload Your First File</span>
              </button>
              <button
                onClick={onLoadDemo}
                className="px-6 py-3 rounded-xl bg-spidey-navy hover:bg-slate-800 border border-spidey-blue/40 text-blue-300 font-spidey font-bold uppercase text-xs inline-flex items-center gap-2 transition-all"
              >
                <Zap className="w-4 h-4 text-spidey-web" />
                <span>Load Complete Spider-Net Dataset (1,064 records)</span>
              </button>
            </div>
          </div>
        )}

        {/* Major Discrepancy Alert Banner if conflicts exist */}
        {conflictCount > 0 && (
          <div className="p-5 rounded-2xl bg-gradient-to-r from-red-950/60 via-spidey-card to-[#070913] border-2 border-spidey-electric spider-sense-active flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-[0_0_30px_rgba(255,30,68,0.3)]">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-rose-500/20 text-spidey-electric border border-rose-500/40 shrink-0 mt-0.5 shadow-[0_0_12px_rgba(255,30,68,0.5)]">
                <AlertOctagon className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold font-spidey text-white uppercase tracking-wide">
                    {findings.find(f => f.type === 'conflict')?.title || 'Active Discrepancy Detected'}
                  </h3>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-rose-500/30 text-rose-300 font-mono font-bold border border-rose-500/40">
                    SPIDER-SENSE TRIGGERED
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed font-tech">
                  {findings.find(f => f.type === 'conflict')?.description}
                </p>
              </div>
            </div>

            <button
              onClick={onNavigateToDetective}
              className="px-4 py-2 rounded-xl spidey-btn text-white font-spidey font-bold uppercase text-xs flex items-center justify-center gap-1.5 transition-all shrink-0 shadow-lg"
            >
              <span>Inspect in Detective</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Two Columns: Findings List & Ingestion Status */}
        {documents.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Column 1: Priority Findings Inbox */}
            <div className="p-6 rounded-2xl bg-spidey-card/95 border border-spidey-red/30 space-y-4 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-spidey-red/20">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-spidey-electric" />
                  <h3 className="text-sm font-bold font-spidey text-white uppercase tracking-wider">
                    Spider-Sense Intel ({findings.length})
                  </h3>
                </div>
                <button
                  onClick={onNavigateToDetective}
                  className="text-xs font-spidey uppercase font-bold text-spidey-electric hover:text-white flex items-center gap-1 transition-colors"
                >
                  <span>Investigate All</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-3">
                {findings.slice(0, 3).map((f) => (
                  <div
                    key={f.id}
                    className="p-3.5 rounded-xl bg-[#070913] border border-spidey-red/25 hover:border-spidey-electric hover:shadow-[0_0_12px_rgba(226,54,54,0.3)] transition-all space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white truncate max-w-[280px] font-tech">
                        {f.title}
                      </span>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
                        {f.priority.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed font-tech">
                      {f.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Column 2: Ingestion & Document Health Status */}
            <div className="p-6 rounded-2xl bg-spidey-card/95 border border-spidey-blue/30 space-y-4 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-spidey-blue/20">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-spidey-web" />
                  <h3 className="text-sm font-bold font-spidey text-white uppercase tracking-wider">
                    Web Data Sources ({documents.length})
                  </h3>
                </div>
                <button
                  onClick={onNavigateToDocuments}
                  className="text-xs font-spidey uppercase font-bold text-spidey-web hover:text-white flex items-center gap-1 transition-colors"
                >
                  <span>Manage Grid</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-2.5">
                {documents.slice(0, 4).map((doc) => (
                  <div
                    key={doc.id}
                    className="p-3 rounded-xl bg-[#070913] border border-spidey-blue/20 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded uppercase font-bold bg-spidey-blue/20 text-spidey-web border border-spidey-blue/30">
                        {doc.type}
                      </span>
                      <div>
                        <span className="font-semibold text-white block truncate max-w-[200px] font-tech">
                          {doc.name}
                        </span>
                        <span className="text-[11px] text-slate-400 font-mono">
                          {doc.recordsCount} records • {doc.size}
                        </span>
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-mono">
                      <CheckCircle2 className="w-3 h-3" /> Indexed
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
