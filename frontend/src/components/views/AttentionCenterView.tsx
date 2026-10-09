import React, { useState } from 'react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  ExternalLink, 
  Zap, 
  Clock, 
  Check, 
  Upload 
} from 'lucide-react';
import { FindingItem, FindingPriority, SourceCitation } from '../../types';

interface AttentionCenterViewProps {
  findings: FindingItem[];
  onNavigateToDocuments: () => void;
  onLoadDemo: () => void;
  onOpenSourceInspector: (citation: SourceCitation) => void;
}

export const AttentionCenterView: React.FC<AttentionCenterViewProps> = ({
  findings,
  onNavigateToDocuments,
  onLoadDemo,
  onOpenSourceInspector
}) => {
  const [selectedPriority, setSelectedPriority] = useState<FindingPriority | 'all'>('all');
  const [dismissedIds, setDismissedIds] = useState<string[]>([]);

  const criticalCount = findings.filter(f => f.priority === 'critical').length;
  const highCount = findings.filter(f => f.priority === 'high').length;
  const mediumCount = findings.filter(f => f.priority === 'medium').length;
  const lowCount = findings.filter(f => f.priority === 'low').length;

  const filteredItems = findings.filter(item => {
    if (dismissedIds.includes(item.id)) return false;
    if (selectedPriority === 'all') return true;
    return item.priority === selectedPriority;
  });

  const handleDismiss = (id: string) => {
    setDismissedIds(prev => [...prev, id]);
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
                  <AlertTriangle className="w-5 h-5 text-spidey-electric animate-pulse" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-black font-spidey tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white via-red-200 to-spidey-web">
                    STARK-TECH WARNINGS &amp; ATTENTION CENTER ⚠️
                  </h1>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-spidey-electric/90">Automated Spider-Sense Threat Level</span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 font-tech">
                Prioritizes enterprise issues based on business risk, financial exposure, and project delivery deadlines.
              </p>
            </div>
          </div>

          {/* Priority Triage Counters Bar */}
          {findings.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <button
                onClick={() => setSelectedPriority('critical')}
                className={`p-4 rounded-xl border text-left transition-all ${
                  selectedPriority === 'critical'
                    ? 'bg-rose-950/40 border-rose-500/50 shadow-lg shadow-rose-500/10 ring-1 ring-rose-500/30'
                    : 'bg-surface-850 border-slate-800 hover:border-rose-500/30'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                    🔴 Critical
                  </span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-bold">
                    {criticalCount} Items
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">Immediate action required</p>
              </button>

              <button
                onClick={() => setSelectedPriority('high')}
                className={`p-4 rounded-xl border text-left transition-all ${
                  selectedPriority === 'high'
                    ? 'bg-amber-950/40 border-amber-500/50 shadow-lg shadow-amber-500/10 ring-1 ring-amber-500/30'
                    : 'bg-surface-850 border-slate-800 hover:border-amber-500/30'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    🟠 High
                  </span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">
                    {highCount} Items
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">Urgent operational risk</p>
              </button>

              <button
                onClick={() => setSelectedPriority('medium')}
                className={`p-4 rounded-xl border text-left transition-all ${
                  selectedPriority === 'medium'
                    ? 'bg-yellow-950/40 border-yellow-500/50 shadow-lg shadow-yellow-500/10 ring-1 ring-yellow-500/30'
                    : 'bg-surface-850 border-slate-800 hover:border-yellow-500/30'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-yellow-400 uppercase tracking-wider flex items-center gap-1.5">
                    🟡 Medium
                  </span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-300 font-bold">
                    {mediumCount} Items
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">Standard review required</p>
              </button>

              <button
                onClick={() => setSelectedPriority('low')}
                className={`p-4 rounded-xl border text-left transition-all ${
                  selectedPriority === 'low'
                    ? 'bg-emerald-950/40 border-emerald-500/50 shadow-lg shadow-emerald-500/10 ring-1 ring-emerald-500/30'
                    : 'bg-surface-850 border-slate-800 hover:border-emerald-500/30'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    🟢 Low
                  </span>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                    {lowCount} Items
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">Informational logs</p>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Priority Items List or Empty State */}
      <div className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 space-y-4">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div
              key={item.id}
              className={`p-6 rounded-2xl bg-surface-900 border transition-all shadow-xl space-y-4 ${
                item.priority === 'critical'
                  ? 'border-rose-500/30 bg-gradient-to-br from-rose-950/15 via-surface-900 to-surface-900'
                  : 'border-slate-800'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    {item.category}
                  </span>
                </div>

                <span className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full uppercase ${
                  item.priority === 'critical'
                    ? 'bg-rose-500/10 text-rose-400 border border-rose-500/25'
                    : item.priority === 'high'
                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/25'
                    : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/25'
                }`}>
                  {item.priority} Priority
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-white mb-1.5">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {item.recommendedAction && (
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 truncate">
                    <Zap className="w-4 h-4 text-orange-400 shrink-0" />
                    <span className="text-slate-300 font-medium truncate">
                      Action: {item.recommendedAction}
                    </span>
                  </div>
                  {item.sources && item.sources[0] && (
                    <button
                      onClick={() => onOpenSourceInspector({
                        file: item.sources[0].file,
                        location: item.sources[0].location,
                        snippet: item.sources[0].snippet,
                        documentType: 'log'
                      })}
                      className="text-orange-400 hover:text-orange-300 text-[11px] font-medium shrink-0 flex items-center gap-1"
                    >
                      <span>View Proof</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  )}
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => handleDismiss(item.id)}
                  className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-medium text-xs flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Mark Action Complete</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          /* Empty State */
          <div className="p-12 rounded-2xl bg-surface-900 border border-slate-800 text-center space-y-4">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-surface-850 border border-slate-700 flex items-center justify-center text-slate-400">
              <CheckCircle2 className="w-7 h-7 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Attention Center Clear</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto mt-1">
                No active critical or high priority alerts. Ingest files to trigger automatic risk and deadline analysis.
              </p>
            </div>
            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={onNavigateToDocuments}
                className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-medium text-xs inline-flex items-center gap-2 shadow-lg shadow-orange-600/20"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Files</span>
              </button>
              <button
                onClick={onLoadDemo}
                className="px-4 py-2 rounded-xl bg-surface-850 hover:bg-slate-800 border border-slate-700 text-slate-300 font-medium text-xs inline-flex items-center gap-2"
              >
                <Zap className="w-3.5 h-3.5 text-indigo-400" />
                <span>Load Sample Alerts</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
