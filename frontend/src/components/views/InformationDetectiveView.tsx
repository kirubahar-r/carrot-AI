import React, { useState } from 'react';
import { 
  ShieldAlert, 
  AlertTriangle, 
  AlertOctagon, 
  Copy, 
  Star, 
  Check, 
  Zap, 
  Upload, 
  CheckCircle2, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { FindingItem, FindingType, FindingPriority, SourceCitation } from '../../types';

interface InformationDetectiveViewProps {
  findings: FindingItem[];
  setFindings: React.Dispatch<React.SetStateAction<FindingItem[]>>;
  onNavigateToDocuments: () => void;
  onLoadDemo: () => void;
  onOpenSourceInspector: (citation: SourceCitation) => void;
}

export const InformationDetectiveView: React.FC<InformationDetectiveViewProps> = ({
  findings,
  setFindings,
  onNavigateToDocuments,
  onLoadDemo,
  onOpenSourceInspector
}) => {
  const [selectedType, setSelectedType] = useState<FindingType | 'all'>('all');
  const [actionSuccessMessage, setActionSuccessMessage] = useState<string | null>(null);

  const handleResolveAction = (findingId: string, actionText: string) => {
    setFindings(prev => prev.map(f => {
      if (f.id === findingId) {
        return { ...f, status: f.status === 'resolved' ? 'open' : 'resolved' };
      }
      return f;
    }));

    setActionSuccessMessage(`Action executed: "${actionText}"`);
    setTimeout(() => {
      setActionSuccessMessage(null);
    }, 4000);
  };

  const filteredFindings = findings.filter(f => {
    const matchesType = selectedType === 'all' || f.type === selectedType;
    return matchesType;
  });

  const conflictCount = findings.filter(f => f.type === 'conflict').length;
  const missingCount = findings.filter(f => f.type === 'missing').length;
  const duplicateCount = findings.filter(f => f.type === 'duplicate').length;
  const importantCount = findings.filter(f => f.type === 'important').length;

  const getPriorityBadge = (priority: FindingPriority) => {
    switch (priority) {
      case 'critical':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-500/10 text-rose-400 border border-rose-500/25">
            🔴 Critical Priority
          </span>
        );
      case 'high':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/25">
            🟠 High Priority
          </span>
        );
      case 'medium':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-400 border border-yellow-500/25">
            🟡 Medium Priority
          </span>
        );
      case 'low':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/25">
            🟢 Low Priority
          </span>
        );
    }
  };

  const getTypeIcon = (type: FindingType) => {
    switch (type) {
      case 'conflict':
        return <AlertOctagon className="w-4 h-4 text-rose-400" />;
      case 'missing':
        return <AlertTriangle className="w-4 h-4 text-amber-400" />;
      case 'duplicate':
        return <Copy className="w-4 h-4 text-yellow-400" />;
      case 'important':
        return <Star className="w-4 h-4 text-orange-400" />;
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full spidey-web-bg text-slate-100 overflow-y-auto font-tech">
      {/* Header Banner */}
      <div className="border-b border-spidey-red/25 bg-gradient-to-b from-spidey-red/15 via-[#0A1128]/70 to-[#070913] px-6 py-8 backdrop-blur-md">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-spidey-red/20 text-spidey-electric border border-spidey-red/40 shadow-[0_0_15px_rgba(226,54,54,0.4)]">
                  <ShieldAlert className="w-5 h-5 text-spidey-electric animate-pulse" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-black font-spidey tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white via-red-200 to-spidey-web">
                    SPIDER-SENSE DETECTIVE 🕷️
                  </h1>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-spidey-electric/90">Autonomous Anomaly Auditing</span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 font-tech">
                Autonomous Stark-Tech audit scanning across all uploaded datasets to catch conflicting values, missing fields, duplicates, and fraud alerts.
              </p>
            </div>
          </div>

          {/* Type Filter Buttons */}
          {findings.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              <button
                onClick={() => setSelectedType('all')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-spidey font-bold uppercase tracking-wider transition-all ${
                  selectedType === 'all'
                    ? 'spidey-btn text-white shadow-lg'
                    : 'bg-spidey-card hover:bg-slate-800 text-slate-300 border border-spidey-red/30'
                }`}
              >
                All Spider-Intel ({findings.length})
              </button>
              <button
                onClick={() => setSelectedType('conflict')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-spidey font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                  selectedType === 'conflict'
                    ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/35 border border-rose-400'
                    : 'bg-spidey-card hover:bg-rose-950/40 text-rose-300 border border-rose-500/30'
                }`}
              >
                <AlertOctagon className="w-3.5 h-3.5 text-rose-400" />
                <span>🔴 Conflicts ({conflictCount})</span>
              </button>
              <button
                onClick={() => setSelectedType('missing')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-spidey font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                  selectedType === 'missing'
                    ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/35 border border-amber-400'
                    : 'bg-spidey-card hover:bg-amber-950/40 text-amber-300 border border-amber-500/30'
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                <span>🟠 Missing Info ({missingCount})</span>
              </button>
              <button
                onClick={() => setSelectedType('duplicate')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-spidey font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                  selectedType === 'duplicate'
                    ? 'bg-yellow-600 text-white shadow-lg shadow-yellow-600/35 border border-yellow-400'
                    : 'bg-spidey-card hover:bg-yellow-950/40 text-yellow-300 border border-yellow-500/30'
                }`}
              >
                <Copy className="w-3.5 h-3.5 text-yellow-400" />
                <span>🟡 Duplicates ({duplicateCount})</span>
              </button>
              <button
                onClick={() => setSelectedType('important')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-spidey font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all ${
                  selectedType === 'important'
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/35 border border-blue-400'
                    : 'bg-spidey-card hover:bg-blue-950/40 text-blue-300 border border-blue-500/30'
                }`}
              >
                <Star className="w-3.5 h-3.5 text-blue-400" />
                <span>🔵 Important Intel ({importantCount})</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Action Notification Toast */}
      {actionSuccessMessage && (
        <div className="max-w-6xl mx-auto px-6 pt-4 w-full animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 text-xs flex items-center justify-between shadow-[0_0_15px_rgba(16,185,129,0.3)]">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" />
              <span className="font-tech">{actionSuccessMessage}</span>
            </div>
            <span className="text-[10px] uppercase font-mono font-bold text-emerald-400">Spider Protocol Executed</span>
          </div>
        </div>
      )}

      {/* Findings List or Empty State */}
      <div className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 space-y-5">
        {filteredFindings.length > 0 ? (
          filteredFindings.map((finding) => (
            <div
              key={finding.id}
              className={`p-6 rounded-2xl bg-spidey-card/95 border transition-all shadow-xl space-y-4 ${
                finding.status === 'resolved'
                  ? 'opacity-60 border-slate-800'
                  : finding.type === 'conflict'
                  ? 'border-2 border-rose-500/50 spider-sense-active bg-gradient-to-br from-rose-950/20 via-spidey-card to-spidey-card shadow-[0_0_25px_rgba(255,30,68,0.25)]'
                  : 'border-spidey-red/30'
              }`}
            >
              {/* Finding Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-spidey-red/20">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-spidey-navy border border-spidey-blue/30">
                    {getTypeIcon(finding.type)}
                  </div>
                  <span className="text-xs font-spidey font-bold uppercase tracking-wider text-spidey-electric">
                    {finding.category}
                  </span>
                  <span className="text-slate-600">•</span>
                  <span className="text-xs font-mono text-slate-400">NODE ID: {finding.id}</span>
                </div>
                <div className="flex items-center gap-2">
                  {getPriorityBadge(finding.priority)}
                  <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded ${
                    finding.status === 'resolved'
                      ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                      : 'bg-spidey-navy text-slate-300 border border-spidey-blue/20'
                  }`}>
                    {finding.status === 'resolved' ? 'Resolved' : 'Active Intel'}
                  </span>
                </div>
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="text-base font-bold font-spidey text-white mb-1.5">
                  {finding.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-tech">
                  {finding.description}
                </p>
              </div>

              {/* Visual Diff Box for Conflicts */}
              {finding.diff && (
                <div className="p-4 rounded-xl bg-[#070913] border-2 border-rose-500/40 space-y-3 shadow-inner">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-spidey font-bold text-rose-300 uppercase tracking-wider flex items-center gap-1.5">
                      <AlertOctagon className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
                      Spider-Sense Discrepancy Matrix: {finding.diff.field}
                    </span>
                    <span className="text-[11px] font-mono text-rose-300 font-bold bg-rose-500/20 px-2 py-0.5 rounded border border-rose-500/40">
                      {finding.diff.discrepancyNote}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
                    <div className="p-3 rounded-lg bg-spidey-card border border-spidey-red/25 space-y-1">
                      <span className="text-[11px] text-slate-400 font-tech block">
                        Source A: {finding.diff.sourceA}
                      </span>
                      <span className="font-mono text-sm font-bold text-spidey-web">
                        {finding.diff.valueA}
                      </span>
                    </div>

                    <div className="p-3 rounded-lg bg-spidey-card border border-rose-500/30 space-y-1">
                      <span className="text-[11px] text-slate-400 font-tech block">
                        Source B: {finding.diff.sourceB}
                      </span>
                      <span className="font-mono text-sm font-bold text-rose-400">
                        {finding.diff.valueB}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Sources Excerpt Chips */}
              <div className="space-y-2">
                <span className="text-xs font-spidey font-bold text-slate-300 uppercase tracking-wider block">
                  Grounding Evidence from Source Nodes ({finding.sources.length}):
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {finding.sources.map((src, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-xl bg-[#070913] border border-spidey-red/20 hover:border-spidey-electric transition-all flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="truncate">
                        <span className="font-mono text-spidey-electric font-bold block truncate">
                          {src.file} ({src.location})
                        </span>
                        <p className="text-[11px] text-slate-400 font-mono truncate mt-0.5">
                          {src.snippet}
                        </p>
                      </div>
                      <button
                        onClick={() => onOpenSourceInspector({
                          file: src.file,
                          location: src.location,
                          snippet: src.snippet,
                          documentType: src.file.split('.').pop() || 'file'
                        })}
                        className="px-2.5 py-1.5 rounded-lg spidey-btn text-white text-[11px] font-spidey font-bold uppercase transition-all shrink-0 flex items-center gap-1 shadow-sm"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>Inspect</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Action & Resolution Button */}
              <div className="pt-3 border-t border-spidey-red/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-2">
                  <Zap className="w-4 h-4 text-spidey-electric mt-0.5 shrink-0" />
                  <p className="text-xs text-slate-300 font-tech">
                    <strong className="text-white font-spidey">Recommended Protocol:</strong> {finding.recommendedAction}
                  </p>
                </div>

                <button
                  onClick={() => handleResolveAction(finding.id, finding.recommendedAction)}
                  className={`px-4 py-2 rounded-xl text-xs font-spidey font-bold uppercase tracking-wider shrink-0 transition-all flex items-center gap-1.5 ${
                    finding.status === 'resolved'
                      ? 'bg-spidey-card text-slate-400 hover:text-white border border-slate-700'
                      : 'spidey-btn text-white shadow-lg'
                  }`}
                >
                  {finding.status === 'resolved' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Re-Open Incident</span>
                    </>
                  ) : (
                    <>
                      <span>Execute Protocol</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          ))
        ) : (
          /* Empty State */
          <div className="p-12 rounded-2xl bg-spidey-card/90 border border-spidey-red/30 text-center space-y-4">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-spidey-navy border border-spidey-blue/30 flex items-center justify-center text-slate-400">
              <CheckCircle2 className="w-7 h-7 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-base font-bold font-spidey text-white">0 Anomaly Findings Detected</h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto mt-1 font-tech">
                Spider-Net telemetry currently shows zero detected discrepancies or missing compliance fields. Upload files in Documents to perform automated scans.
              </p>
            </div>
            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={onNavigateToDocuments}
                className="px-4 py-2 rounded-xl spidey-btn text-white font-spidey font-bold uppercase text-xs inline-flex items-center gap-2 shadow-lg"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Documents to Scan</span>
              </button>
              <button
                onClick={onLoadDemo}
                className="px-4 py-2 rounded-xl bg-spidey-navy hover:bg-slate-800 border border-spidey-blue/30 text-blue-300 font-spidey font-bold uppercase text-xs inline-flex items-center gap-2"
              >
                <Zap className="w-3.5 h-3.5 text-spidey-web" />
                <span>Load Sample Conflicts</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
