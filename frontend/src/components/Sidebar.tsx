import React from 'react';
import { 
  LayoutDashboard, 
  Sparkles, 
  FileText, 
  Database, 
  SearchAlert, 
  Network, 
  AlertTriangle, 
  Settings, 
  ShieldAlert,
  ChevronRight,
  TrendingUp
} from 'lucide-react';

interface SidebarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  conflictCount: number;
  missingCount: number;
  criticalCount: number;
  totalRecordsCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  setCurrentView,
  conflictCount,
  missingCount,
  criticalCount,
  totalRecordsCount
}) => {
  const navItems = [
    {
      id: 'dashboard',
      label: 'Web Command HQ',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'ask',
      label: 'Spider-Net AI',
      icon: Sparkles,
      highlight: true,
      badge: 'Sensors On'
    },
    {
      id: 'documents',
      label: 'Web Ingestion Hub',
      icon: FileText,
      badge: 'Files'
    },
    {
      id: 'records',
      label: 'Records Matrix',
      icon: Database,
      badge: `${totalRecordsCount.toLocaleString()}`
    },
    {
      id: 'detective',
      label: 'Spider-Sense Detective',
      icon: ShieldAlert,
      badge: `${conflictCount} Conflicts`,
      badgeColor: 'bg-red-500/15 text-red-400 border border-red-500/30 spider-sense-active'
    },
    {
      id: 'map',
      label: 'Spider-Web Map',
      icon: Network,
      badge: 'Graph'
    },
    {
      id: 'attention',
      label: 'Stark-Tech Warnings',
      icon: AlertTriangle,
      badge: `${criticalCount} Urgent`,
      badgeColor: 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
    },
    {
      id: 'settings',
      label: 'Suit Configuration',
      icon: Settings,
      badge: null
    }
  ];

  return (
    <aside className="w-64 border-r border-red-950/50 bg-[#070913] flex flex-col shrink-0 select-none font-tech">
      {/* Top Banner */}
      <div className="p-4 border-b border-red-950/50">
        <div className="p-3 rounded-xl bg-gradient-to-br from-red-950/40 via-[#0b0e1b] to-blue-950/40 border border-red-600/30 shadow-inner">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-spidey font-bold uppercase tracking-wider text-red-400">
              🕷️ Spider-Sense Online
            </span>
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
            </span>
          </div>
          <p className="text-xs font-semibold font-spidey text-slate-100">
            Precision Web Reasoning
          </p>
          <div className="mt-2 text-[11px] text-slate-400 flex items-center justify-between">
            <span className="text-blue-300/80">Web Integrity:</span>
            <span className="text-red-400 font-mono font-medium">100% Grounded</span>
          </div>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 p-3 space-y-1.5 overflow-y-auto">
        <div className="px-3 py-1.5 text-[11px] font-spidey font-bold uppercase tracking-widest text-red-400/70">
          Suit Telemetry
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all group ${
                isActive
                  ? item.highlight
                    ? 'spidey-btn text-white shadow-lg shadow-red-600/40 border border-red-400/60'
                    : 'bg-[#10162a] text-red-300 border border-red-700/50 shadow-sm'
                  : item.highlight
                  ? 'bg-red-950/20 text-red-300 hover:bg-red-900/30 border border-red-500/20'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    isActive
                      ? item.highlight
                        ? 'text-white'
                        : 'text-red-400'
                      : item.highlight
                      ? 'text-red-400'
                      : 'text-slate-400 group-hover:text-red-400'
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </div>

              {item.badge && (
                <span
                  className={`text-[10px] font-medium px-2 py-0.5 rounded-full shrink-0 ${
                    isActive && item.highlight
                      ? 'bg-white/20 text-white'
                      : item.badgeColor || 'bg-slate-900 text-slate-400 border border-slate-800'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom User / Quick Action */}
      <div className="p-4 border-t border-red-950/50 bg-[#070913]">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <div>
            <span className="block text-slate-200 font-semibold font-spidey">Peter Parker Protocol</span>
            <span className="text-[11px] text-blue-400/70">Spider-Net v3.0</span>
          </div>
          <span className="px-2 py-0.5 rounded text-[10px] bg-red-950/60 text-red-300 border border-red-500/30 font-mono">
            Suit ON
          </span>
        </div>
      </div>
    </aside>
  );
};
