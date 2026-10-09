import React, { useState } from 'react';
import { 
  Settings, 
  ShieldCheck, 
  Cpu, 
  Check, 
  Trash2, 
  Zap, 
  Database 
} from 'lucide-react';

interface SettingsViewProps {
  onClearAll: () => void;
  onLoadDemo: () => void;
  totalRecordsCount: number;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  onClearAll,
  onLoadDemo,
  totalRecordsCount
}) => {
  const [similarityThreshold, setSimilarityThreshold] = useState(85);
  const [antiHallucinationStrict, setAntiHallucinationStrict] = useState(true);
  const [ocrEngineEnabled, setOcrEngineEnabled] = useState(true);
  const [rerankingEnabled, setRerankingEnabled] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="flex-1 flex flex-col h-full spidey-web-bg text-slate-100 overflow-y-auto font-tech">
      {/* Header */}
      <div className="border-b border-spidey-red/25 bg-gradient-to-b from-spidey-red/15 via-[#0A1128]/70 to-[#070913] px-6 py-8 backdrop-blur-md">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-spidey-red/20 text-spidey-electric border border-spidey-red/40 shadow-[0_0_15px_rgba(226,54,54,0.4)]">
              <Settings className="w-5 h-5 text-spidey-electric animate-spin" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black font-spidey tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white via-red-200 to-spidey-web">
                PETER PARKER PROTOCOL &amp; SUIT TELEMETRY 🕸️
              </h1>
              <span className="text-[10px] uppercase font-mono tracking-widest text-spidey-web/90">Autonomous Neural Configuration</span>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 font-tech">
            Tune precision retrieval parameters, anti-hallucination guardrails, and manage Spider-Net memory storage.
          </p>
        </div>
      </div>

      <div className="max-w-4xl w-full mx-auto p-4 sm:p-6 space-y-6">
        {savedSuccess && (
          <div className="p-3.5 rounded-xl bg-emerald-950/70 border border-emerald-500/40 text-emerald-200 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Settings successfully saved and applied to active engine.</span>
            </div>
            <span className="text-[10px] uppercase font-mono text-emerald-400">Applied</span>
          </div>
        )}

        {/* Workspace Data Management */}
        <div className="p-6 rounded-2xl bg-surface-900 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-orange-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Workspace Data Management
              </h3>
            </div>
            <span className="text-xs font-mono text-slate-400">
              Current Records: <strong className="text-white">{totalRecordsCount.toLocaleString()}</strong>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <h4 className="text-sm font-bold text-white">Reset to Clean Workspace</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Wipe all records and documents to return to a 0-record empty state.
              </p>
              <button
                onClick={onClearAll}
                className="mt-2 px-4 py-2 rounded-xl bg-rose-600/20 hover:bg-rose-600 text-rose-300 hover:text-white border border-rose-500/30 text-xs font-medium flex items-center gap-2 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All Records</span>
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <h4 className="text-sm font-bold text-white">Load Demo Dataset</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Populate 1,050 pre-indexed enterprise records and 8 documents with intentional conflicts for demonstration.
              </p>
              <button
                onClick={onLoadDemo}
                className="mt-2 px-4 py-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/30 text-xs font-medium flex items-center gap-2 transition-colors"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Load 1,050 Demo Records</span>
              </button>
            </div>
          </div>
        </div>

        {/* Anti-Hallucination & Evidence Policy */}
        <div className="p-6 rounded-2xl bg-surface-900 border border-slate-800 space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
            <ShieldCheck className="w-4 h-4 text-orange-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Anti-Hallucination Guardrail Policy
            </h3>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-950 border border-slate-800">
            <div className="space-y-1">
              <span className="text-sm font-semibold text-white block">
                Strict Grounded Answers Only
              </span>
              <p className="text-xs text-slate-400 leading-relaxed max-w-lg">
                Prevents the engine from fabricating answers when documents do not contain direct evidence. Displays explicit "Insufficient information found" message instead of guessing.
              </p>
            </div>
            <input
              type="checkbox"
              checked={antiHallucinationStrict}
              onChange={(e) => setAntiHallucinationStrict(e.target.checked)}
              className="w-5 h-5 accent-orange-600 rounded cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-medium">Vector Retrieval Relevance Threshold:</span>
              <span className="font-mono text-orange-300 font-bold">{similarityThreshold}%</span>
            </div>
            <input
              type="range"
              min="50"
              max="98"
              value={similarityThreshold}
              onChange={(e) => setSimilarityThreshold(Number(e.target.value))}
              className="w-full accent-orange-600"
            />
          </div>
        </div>

        {/* Ingestion Pipeline Options */}
        <div className="p-6 rounded-2xl bg-surface-900 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
            <Cpu className="w-4 h-4 text-orange-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Document Processing Pipeline
            </h3>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-950 border border-slate-800">
            <div>
              <span className="text-sm font-semibold text-white block">
                OCR Engine for Scanned Documents
              </span>
              <p className="text-xs text-slate-400">
                Extracts text from scanned invoices, receipts, and photo uploads.
              </p>
            </div>
            <input
              type="checkbox"
              checked={ocrEngineEnabled}
              onChange={(e) => setOcrEngineEnabled(e.target.checked)}
              className="w-5 h-5 accent-orange-600 rounded cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-950 border border-slate-800">
            <div>
              <span className="text-sm font-semibold text-white block">
                Cross-Encoder Semantic Reranker
              </span>
              <p className="text-xs text-slate-400">
                Re-ranks top retrieved vector chunks before answer synthesis.
              </p>
            </div>
            <input
              type="checkbox"
              checked={rerankingEnabled}
              onChange={(e) => setRerankingEnabled(e.target.checked)}
              className="w-5 h-5 accent-orange-600 rounded cursor-pointer"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={handleSave}
            className="px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-medium text-xs shadow-lg shadow-orange-600/20 transition-colors"
          >
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
};
