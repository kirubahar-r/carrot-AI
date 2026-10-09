import React, { useState } from 'react';
import { 
  Network, 
  ExternalLink, 
  Info, 
  Upload, 
  Zap, 
  FileText 
} from 'lucide-react';
import { GraphNode, GraphEdge, SourceCitation } from '../../types';

interface InformationMapViewProps {
  nodes: GraphNode[];
  edges: GraphEdge[];
  onNavigateToDocuments: () => void;
  onLoadDemo: () => void;
  onOpenSourceInspector: (citation: SourceCitation) => void;
}

export const InformationMapView: React.FC<InformationMapViewProps> = ({
  nodes,
  edges,
  onNavigateToDocuments,
  onLoadDemo,
  onOpenSourceInspector
}) => {
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(nodes[0] || null);
  const [filterType, setFilterType] = useState<string>('all');

  const displayedNodes = filterType === 'all'
    ? nodes
    : nodes.filter(n => n.type === filterType);

  const displayedNodeIds = new Set(displayedNodes.map(n => n.id));
  const displayedEdges = edges.filter(
    e => displayedNodeIds.has(e.source) && displayedNodeIds.has(e.target)
  );

  const handleNodeClick = (node: GraphNode) => {
    setSelectedNode(node);
  };

  const getNodeColor = (type: string) => {
    switch (type) {
      case 'project': return '#f97316'; // Orange
      case 'department': return '#3b82f6'; // Blue
      case 'employee': return '#ec4899'; // Pink
      case 'task': return '#f59e0b'; // Amber
      case 'invoice': return '#ef4444'; // Red
      case 'issue': return '#f97316'; // Orange
      case 'document': return '#10b981'; // Green
      default: return '#6366f1';
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full spidey-web-bg text-slate-100 overflow-hidden font-tech">
      {/* Top Banner */}
      <div className="border-b border-spidey-red/25 bg-gradient-to-b from-spidey-red/15 via-[#0A1128]/70 to-[#070913] px-6 py-6 backdrop-blur-md">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-spidey-red/20 text-spidey-electric border border-spidey-red/40 shadow-[0_0_15px_rgba(226,54,54,0.4)]">
                <Network className="w-5 h-5 text-spidey-electric animate-pulse" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-black font-spidey tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white via-red-200 to-spidey-web">
                  SPIDER-WEB MAP — NEURAL GRAPH 🕸️
                </h1>
                <span className="text-[10px] uppercase font-mono tracking-widest text-spidey-web/90">Inter-connected Web Telemetry</span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 font-tech">
              Connects entities across mixed sources: Projects → Employees → Tasks → Deadlines → Invoices.
            </p>
          </div>

          {/* Filter Pills */}
          {nodes.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {['all', 'document', 'department', 'employee', 'task', 'invoice'].map((t) => (
                <button
                  key={t}
                  onClick={() => setFilterType(t)}
                  className={`px-3 py-1 rounded-lg text-xs font-spidey font-bold uppercase tracking-wider capitalize transition-all ${
                    filterType === t
                      ? 'spidey-btn text-white shadow-lg'
                      : 'bg-spidey-card hover:bg-slate-800 text-slate-300 border border-spidey-red/25'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Workspace */}
      {nodes.length > 0 ? (
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* SVG Network Canvas */}
          <div className="flex-1 relative bg-gradient-to-b from-[#090d16] to-[#0c1220] p-6 flex items-center justify-center overflow-auto border-r border-slate-800/80">
            <svg
              className="w-full h-full min-w-[700px] min-h-[550px] select-none"
              viewBox="0 0 900 600"
            >
              <defs>
                <pattern id="graph-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#graph-grid)" />

              {/* Render Edges */}
              {displayedEdges.map((edge) => {
                const srcNode = nodes.find(n => n.id === edge.source);
                const tgtNode = nodes.find(n => n.id === edge.target);
                if (!srcNode || !tgtNode) return null;

                const isConnectedToSelected = selectedNode && (selectedNode.id === edge.source || selectedNode.id === edge.target);
                const midX = (srcNode.x + tgtNode.x) / 2;
                const midY = (srcNode.y + tgtNode.y) / 2;

                return (
                  <g key={edge.id} className="transition-all">
                    <line
                      x1={srcNode.x}
                      y1={srcNode.y}
                      x2={tgtNode.x}
                      y2={tgtNode.y}
                      stroke={isConnectedToSelected ? '#fb923c' : 'rgba(148, 163, 184, 0.25)'}
                      strokeWidth={isConnectedToSelected ? '2.5' : '1.5'}
                    />
                    <rect
                      x={midX - 40}
                      y={midY - 10}
                      width="80"
                      height="20"
                      rx="6"
                      fill="#111827"
                      stroke="#334155"
                      strokeWidth="1"
                    />
                    <text
                      x={midX}
                      y={midY + 4}
                      textAnchor="middle"
                      fill="#94a3b8"
                      fontSize="9.5"
                      fontFamily="Inter, sans-serif"
                      fontWeight="500"
                    >
                      {edge.label}
                    </text>
                  </g>
                );
              })}

              {/* Render Nodes */}
              {displayedNodes.map((node) => {
                const isSelected = selectedNode?.id === node.id;
                const color = getNodeColor(node.type);

                return (
                  <g
                    key={node.id}
                    onClick={() => handleNodeClick(node)}
                    className="cursor-pointer group"
                    transform={`translate(${node.x}, ${node.y})`}
                  >
                    {isSelected && (
                      <circle
                        r="36"
                        fill="none"
                        stroke={color}
                        strokeWidth="2.5"
                        strokeDasharray="4 2"
                        className="animate-spin"
                        style={{ transformOrigin: '0 0', animationDuration: '10s' }}
                      />
                    )}

                    <circle
                      r="26"
                      fill="#111827"
                      stroke={color}
                      strokeWidth={isSelected ? '3' : '2'}
                      filter="drop-shadow(0 4px 6px rgba(0, 0, 0, 0.4))"
                      className="group-hover:scale-110 transition-transform"
                    />

                    <circle
                      r="9"
                      fill={color}
                      opacity="0.85"
                    />

                    <text
                      y="45"
                      textAnchor="middle"
                      fill={isSelected ? '#ffffff' : '#cbd5e1'}
                      fontSize="11"
                      fontFamily="Inter, sans-serif"
                      fontWeight={isSelected ? 'bold' : '600'}
                    >
                      {node.label}
                    </text>

                    <text
                      y="58"
                      textAnchor="middle"
                      fill="#64748b"
                      fontSize="9"
                      fontFamily="Inter, sans-serif"
                      className="uppercase tracking-wider"
                    >
                      {node.type}
                    </text>
                  </g>
                );
              })}
            </svg>

            <div className="absolute bottom-4 left-6 p-2.5 rounded-xl bg-surface-900/90 border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2 backdrop-blur-sm">
              <Info className="w-3.5 h-3.5 text-orange-400" />
              <span>Click any node to view entity relations &amp; source files.</span>
            </div>
          </div>

          {/* Selected Entity Inspector Panel */}
          <div className="w-full lg:w-96 border-t lg:border-t-0 lg:border-l border-slate-800 bg-surface-900 p-6 flex flex-col justify-between overflow-y-auto">
            {selectedNode ? (
              <div className="space-y-5">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className="text-[11px] font-mono px-2 py-0.5 rounded uppercase tracking-wider font-semibold"
                      style={{
                        backgroundColor: `${getNodeColor(selectedNode.type)}20`,
                        color: getNodeColor(selectedNode.type),
                        border: `1px solid ${getNodeColor(selectedNode.type)}40`
                      }}
                    >
                      {selectedNode.type} Entity
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      {selectedNode.connectedCount} Connected Links
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    {selectedNode.label}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    {selectedNode.description}
                  </p>
                </div>

                {selectedNode.metrics && (
                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                      Extracted Attributes &amp; Metrics
                    </span>
                    <div className="rounded-xl bg-slate-950/80 border border-slate-800 divide-y divide-slate-800/80 text-xs">
                      {Object.entries(selectedNode.metrics).map(([key, val]) => (
                        <div key={key} className="p-3 flex items-center justify-between">
                          <span className="text-slate-400">{key}</span>
                          <span className="font-mono font-medium text-orange-300 text-right">
                            {val}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedNode.sourceFile && (
                  <div className="p-4 rounded-xl bg-orange-950/20 border border-orange-500/20 space-y-2">
                    <div className="flex items-center justify-between text-xs font-medium text-slate-300">
                      <span className="flex items-center gap-1.5 text-orange-300">
                        <FileText className="w-3.5 h-3.5" />
                        Originating Document
                      </span>
                    </div>
                    <p className="font-mono text-xs text-white break-all">
                      {selectedNode.sourceFile}
                    </p>
                    <button
                      onClick={() => onOpenSourceInspector({
                        file: selectedNode.sourceFile || '',
                        location: 'Extracted Entity Graph',
                        snippet: selectedNode.description,
                        documentType: selectedNode.sourceFile?.split('.').pop() || 'doc'
                      })}
                      className="w-full mt-2 py-2 px-3 rounded-lg bg-orange-600 hover:bg-orange-500 text-white text-xs font-medium flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Inspect Raw Snippet</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12 text-slate-400 text-xs">
                Select any graph node on the canvas to inspect connected entities.
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="flex-1 flex items-center justify-center p-8 text-center">
          <div className="max-w-md space-y-4">
            <div className="w-16 h-16 mx-auto rounded-3xl bg-surface-900 border border-slate-800 flex items-center justify-center text-slate-400">
              <Network className="w-8 h-8 text-orange-400" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Graph Awaiting Ingestion</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                The Information Map dynamically connects entities across your documents. Upload files to generate relationship nodes automatically.
              </p>
            </div>
            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={onNavigateToDocuments}
                className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-medium text-xs inline-flex items-center gap-2 shadow-lg shadow-orange-600/20"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Documents</span>
              </button>
              <button
                onClick={onLoadDemo}
                className="px-4 py-2 rounded-xl bg-surface-850 hover:bg-slate-800 border border-slate-700 text-slate-300 font-medium text-xs inline-flex items-center gap-2"
              >
                <Zap className="w-3.5 h-3.5 text-indigo-400" />
                <span>Load Sample Graph</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
