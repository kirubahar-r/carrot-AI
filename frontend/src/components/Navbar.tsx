import React from 'react';
import { 
  Compass, 
  Database, 
  Layers, 
  Sparkles, 
  Search, 
  Trash2, 
  Zap, 
  ExternalLink 
} from 'lucide-react';

interface NavbarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  showLandingPage: boolean;
  setShowLandingPage: (show: boolean) => void;
  totalRecordsCount: number;
  onClearAll: () => void;
  onLoadDemo: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  setCurrentView,
  showLandingPage,
  setShowLandingPage,
  totalRecordsCount,
  onClearAll,
  onLoadDemo
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-red-900/40 bg-[#070913]/95 backdrop-blur-md shadow-lg shadow-black/60">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Brand / Logo */}
        <div className="flex items-center gap-6">
          <div 
            onClick={() => setShowLandingPage(false)}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-red-600 via-rose-600 to-blue-600 p-0.5 shadow-lg shadow-red-600/30 group-hover:scale-105 group-hover:shadow-red-500/50 transition-all">
              <div className="w-full h-full bg-[#070913] rounded-[10px] flex items-center justify-center text-lg">
                🕷️
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-spidey font-black tracking-wider bg-gradient-to-r from-red-500 via-rose-400 to-blue-400 bg-clip-text text-transparent">
                  CARROT AI
                </span>
                <span className="text-[10px] font-spidey font-bold uppercase tracking-widest px-2 py-0.5 rounded-full bg-red-600/20 text-red-400 border border-red-500/30 shadow-[0_0_10px_rgba(239,68,68,0.2)]">
                  SPIDER-NET
                </span>
              </div>
              <span className="text-[10px] font-tech text-blue-300/70 tracking-wide hidden sm:block">
                With Great Data Comes Great Responsibility • Web Intelligence
              </span>
            </div>
          </div>

          {/* Workspace Pill */}
          {!showLandingPage && (
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0b0e1b] border border-blue-900/40 text-xs">
              <Database className="w-3.5 h-3.5 text-red-400" />
              <span className="text-slate-400 font-tech">Web Sensors:</span>
              <span className="font-semibold text-slate-200 font-tech">
                {totalRecordsCount === 0 ? 'Empty Web' : 'Active Web Nodes'}
              </span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-medium ${
                totalRecordsCount === 0 
                  ? 'bg-slate-800 text-slate-400' 
                  : 'bg-red-500/10 text-red-400 border border-red-500/30 shadow-[0_0_8px_rgba(239,68,68,0.2)]'
              }`}>
                {totalRecordsCount.toLocaleString()} Records
              </span>
            </div>
          )}
        </div>

        {/* Center: "Ask Across Everything" quick launcher */}
        {!showLandingPage && (
          <div className="hidden md:flex items-center">
            <button
              onClick={() => setCurrentView('ask')}
              className={`flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-semibold font-tech tracking-wide transition-all ${
                currentView === 'ask'
                  ? 'spidey-btn text-white border border-red-400/60 shadow-lg shadow-red-600/40'
                  : 'bg-[#0d1326] hover:bg-[#131c38] text-slate-300 border border-red-900/40 hover:border-red-500/50'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-red-400" />
              <span>Spider-Net Intelligence</span>
              <kbd className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-black/60 text-red-400 border border-red-900/50">
                ⌘K
              </kbd>
            </button>
          </div>
        )}

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          {/* Quick Data Actions */}
          {!showLandingPage && (
            <div className="flex items-center gap-1.5">
              {totalRecordsCount > 0 ? (
                <button
                  onClick={onClearAll}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-tech font-semibold text-slate-400 hover:text-red-400 hover:bg-red-500/10 border border-red-950 hover:border-red-500/40 transition-colors"
                  title="Remove all records and return to blank workspace"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Clear Web</span>
                </button>
              ) : (
                <button
                  onClick={onLoadDemo}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-tech font-semibold text-blue-200 bg-blue-950/60 hover:bg-blue-900/80 border border-blue-500/40 transition-all shadow-[0_0_12px_rgba(37,99,235,0.25)]"
                  title="Populate demo dataset"
                >
                  <Zap className="w-3.5 h-3.5 text-blue-400" />
                  <span>Deploy Web Dataset</span>
                </button>
              )}
            </div>
          )}

          {/* Landing / App View Toggle */}
          <button
            onClick={() => setShowLandingPage(!showLandingPage)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-tech font-semibold border border-red-900/40 bg-[#0b0e1b] hover:bg-red-950/40 text-slate-300 hover:text-white transition-colors"
          >
            {showLandingPage ? (
              <>
                <Layers className="w-3.5 h-3.5 text-red-400" />
                <span>Open Terminal</span>
              </>
            ) : (
              <>
                <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
                <span>Briefing Page</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
