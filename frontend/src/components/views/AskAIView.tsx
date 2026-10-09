import React, { useState, useRef } from 'react';
import { 
  Sparkles, 
  Search, 
  CornerDownLeft, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink, 
  Info, 
  Database,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Clock,
  Upload,
  Zap,
  Globe,
  Scale,
  AlertTriangle
} from 'lucide-react';
import { ChatMessage, QueryResult, SourceCitation, RecordItem } from '../../types';
import { executeNaturalLanguageQueryAsync } from '../../services/queryEngine';

interface AskAIViewProps {
  records: RecordItem[];
  onNavigateToDocuments: () => void;
  onLoadDemo: () => void;
  onOpenSourceInspector: (citation: SourceCitation) => void;
  totalRecordsCount: number;
}

export const AskAIView: React.FC<AskAIViewProps> = ({
  records,
  onNavigateToDocuments,
  onLoadDemo,
  onOpenSourceInspector,
  totalRecordsCount
}) => {
  const [queryInput, setQueryInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [activeQueryResult, setActiveQueryResult] = useState<QueryResult | null>(null);
  
  // Table pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const inputRef = useRef<HTMLInputElement>(null);

  // Suggested preset questions
  const presetQueries = [
    'Who is Anto?',
    'What game does Antony play?',
    'Tell me about Microsoft profile and CEO',
    'Any fraud alerts detected by FraudGuard?',
    'Find conflicts between purchase orders and invoices',
    'When is the delivery deadline for Project Alpha?',
    'Find conflicts in employee information',
    'Find CSE employees with attendance below 75%',
    'Which of these have attendance continuously decreasing?',
    'Show invoices above ₹50,000',
    'Only from Tamil Nadu.',
    'Which ones are overdue?',
    'Where is the information about Project Alpha\'s delayed tasks?',
    'What information is missing from these records?'
  ];

  const handleRunQuery = (queryString: string) => {
    if (!queryString.trim()) return;

    setIsProcessing(true);
    setCurrentPage(1);

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}-user`,
      role: 'user',
      content: queryString,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Execute dynamic query over active records
    executeNaturalLanguageQueryAsync(
      queryString,
      { lastQueryResult: activeQueryResult || undefined },
      records
    ).then((result) => {
      const assistantMessage: ChatMessage = {
        id: `msg-${Date.now()}-ai`,
        role: 'assistant',
        content: result.answer,
        queryResult: result,
        timestamp: result.timestamp
      };

      setChatHistory(prev => [...prev, userMessage, assistantMessage]);
      setActiveQueryResult(result);
      setQueryInput('');
      setIsProcessing(false);
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleRunQuery(queryInput);
  };

  const handleResetConversation = () => {
    setChatHistory([]);
    setActiveQueryResult(null);
    setQueryInput('');
    if (inputRef.current) inputRef.current.focus();
  };

  // Paginated records for table view
  const matchingRecords = activeQueryResult?.matchingRecords || [];
  const totalPages = Math.ceil(matchingRecords.length / rowsPerPage);
  const paginatedRecords = matchingRecords.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const getConfidenceBadge = (confidence: 'High' | 'Medium' | 'Low') => {
    if (confidence === 'High') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          <ShieldCheck className="w-3.5 h-3.5" /> High Confidence
        </span>
      );
    }
    if (confidence === 'Medium') {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20">
          <Info className="w-3.5 h-3.5" /> Medium Confidence
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
        <AlertCircle className="w-3.5 h-3.5" /> Low Confidence
      </span>
    );
  };

  return (
    <div className="flex-1 flex flex-col h-full spidey-web-bg text-slate-100 overflow-y-auto font-tech">
      {/* Top Banner / Hero Title */}
      <div className="border-b border-spidey-red/25 bg-gradient-to-b from-spidey-red/15 via-[#0A1128]/70 to-[#070913] px-6 py-6 sm:py-8 backdrop-blur-md">
        <div className="max-w-5xl mx-auto space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-spidey-red/20 text-spidey-electric border border-spidey-red/40 shadow-[0_0_15px_rgba(226,54,54,0.4)]">
                  <Sparkles className="w-5 h-5 text-spidey-electric animate-pulse" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-black font-spidey tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white via-red-200 to-spidey-web">
                    SPIDER-NET PRECISION ENGINE 🕸️
                  </h1>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-spidey-web/80">Stark-Tech Grounded Telemetry</span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 font-tech">
                Scanning across <span className="font-bold text-spidey-electric font-mono">{totalRecordsCount.toLocaleString()}</span> indexed network nodes with grounded citations &amp; zero hallucinations.
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleResetConversation}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-spidey font-semibold uppercase tracking-wider text-slate-300 hover:text-white bg-spidey-card hover:bg-slate-800 border border-spidey-red/30 hover:border-spidey-electric transition-all shadow-sm"
                title="Clear conversational memory"
              >
                <RotateCcw className="w-3.5 h-3.5 text-spidey-red" />
                <span>Reset Web</span>
              </button>
            </div>
          </div>

          {/* Large Central Question Box */}
          <form onSubmit={handleFormSubmit} className="relative mt-2">
            <div className="relative flex items-center">
              <div className="absolute left-4 text-spidey-electric pointer-events-none">
                <Search className="w-5 h-5" />
              </div>
              <input
                ref={inputRef}
                type="text"
                value={queryInput}
                onChange={(e) => setQueryInput(e.target.value)}
                placeholder="Ask CARROT anything... (e.g. Who is Anto? or Find CSE employees with attendance below 75%)"
                className="w-full pl-12 pr-32 py-4 rounded-2xl bg-spidey-card/95 border border-spidey-red/40 focus:border-spidey-electric focus:ring-4 focus:ring-spidey-red/20 text-sm sm:text-base text-white placeholder-slate-400 shadow-[0_4px_30px_rgba(0,0,0,0.7)] transition-all outline-none font-tech"
              />
              <button
                type="submit"
                disabled={isProcessing || !queryInput.trim()}
                className="absolute right-3 px-4 py-2.5 rounded-xl spidey-btn disabled:opacity-40 disabled:cursor-not-allowed text-white font-spidey font-bold uppercase tracking-wider text-xs sm:text-sm flex items-center gap-1.5 shadow-lg transition-all"
              >
                <span>Web-Shoot 🕸️</span>
                <CornerDownLeft className="w-3.5 h-3.5 text-white/80" />
              </button>
            </div>
          </form>

          {/* Empty workspace notification banner if 0 records */}
          {totalRecordsCount === 0 && (
            <div className="p-3.5 rounded-xl bg-spidey-card/90 border border-spidey-red/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <span className="text-slate-300 font-tech">
                Spider-Net matrix is currently clean with 0 records. Upload custom files in Documents to start scanning!
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={onNavigateToDocuments}
                  className="px-3 py-1.5 rounded-lg spidey-btn text-white font-spidey font-bold uppercase tracking-wider text-xs flex items-center gap-1.5"
                >
                  <Upload className="w-3 h-3" />
                  <span>Upload Files</span>
                </button>
                <button
                  onClick={onLoadDemo}
                  className="px-3 py-1.5 rounded-lg bg-spidey-navy/90 hover:bg-slate-800 border border-spidey-blue/40 text-blue-300 text-xs font-spidey font-semibold flex items-center gap-1.5"
                >
                  <Zap className="w-3 h-3 text-spidey-web" />
                  <span>Load Sample Data</span>
                </button>
              </div>
            </div>
          )}

          {/* Quick Preset Query Chips */}
          <div>
            <span className="text-[11px] font-spidey font-bold uppercase tracking-wider text-spidey-electric/90 block mb-2">
              🕷️ Quick Spider-Net Probes:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {presetQueries.map((q) => (
                <button
                  key={q}
                  onClick={() => {
                    if (totalRecordsCount === 0) onLoadDemo();
                    handleRunQuery(q);
                  }}
                  className="px-2.5 py-1 rounded-lg text-xs font-tech bg-spidey-card/90 hover:bg-spidey-red/20 text-slate-300 hover:text-white border border-spidey-red/25 hover:border-spidey-electric hover:shadow-[0_0_10px_rgba(226,54,54,0.3)] transition-all text-left"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Answer Workspace */}
      <div className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 space-y-6">
        {isProcessing && (
          <div className="p-8 rounded-2xl bg-spidey-card border border-spidey-red/40 text-center space-y-3 animate-pulse shadow-[0_0_25px_rgba(226,54,54,0.3)]">
            <div className="w-12 h-12 mx-auto rounded-full bg-spidey-red/20 flex items-center justify-center text-spidey-electric border border-spidey-red/50">
              <Sparkles className="w-6 h-6 animate-spin text-spidey-electric" />
            </div>
            <p className="text-base font-spidey font-bold text-white tracking-wide">
              Web-Scanning active records with hybrid neural precision...
            </p>
            <p className="text-xs text-slate-300 font-tech">
              Engaging Spider-Sense to verify grounded evidence &amp; eradicate hallucinations...
            </p>
          </div>
        )}

        {/* Active Query Result Card */}
        {activeQueryResult && !isProcessing && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Header & AI Direct Answer Card */}
            <div className="p-6 rounded-2xl bg-spidey-card/95 border border-spidey-red/30 shadow-[0_4px_30px_rgba(0,0,0,0.8)] space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-spidey-red/20">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-spidey-red/20 text-spidey-electric border border-spidey-red/30">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-spidey font-bold uppercase tracking-wider text-spidey-electric">
                    Spider-Sense Telemetry Query
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {getConfidenceBadge(activeQueryResult.confidence)}
                  <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3 text-spidey-blue" /> {activeQueryResult.timestamp}
                  </span>
                </div>
              </div>

              {/* User Question */}
              <div className="text-base sm:text-lg font-bold font-tech text-white flex items-start gap-2">
                <span className="text-spidey-electric font-black font-spidey">Q:</span>
                <span>"{activeQueryResult.query}"</span>
              </div>

              {/* Direct AI Answer */}
              <div className={`p-5 rounded-xl bg-[#070913]/95 border-2 space-y-2.5 transition-all ${
                activeQueryResult.isNotFound
                  ? 'border-amber-500/70 shadow-[0_0_25px_rgba(245,158,11,0.3)]'
                  : 'border-spidey-red/60 shadow-[0_0_20px_rgba(226,54,54,0.35)]'
              }`}>
                {activeQueryResult.isNotFound ? (
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                    <span className="text-xs font-spidey font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-amber-400 animate-pulse" />
                      ⚠️ NOT FOUND IN UPLOADED FILES — AUTO WEB SEARCH ACTIVE 🌐
                    </span>
                    <span className="text-[11px] font-mono text-amber-300 font-bold bg-amber-500/15 px-2.5 py-0.5 rounded border border-amber-500/30">
                      0 Files Matches • Auto Web Intelligence Fetched
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-spidey font-bold uppercase tracking-wider text-spidey-electric flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      CARROT SPIDER-SENSE PRECISION ANSWER 🕷️
                    </span>
                    <span className="text-[11px] font-mono text-spidey-web font-bold">
                      {activeQueryResult.matchingCount} verified matches / {activeQueryResult.totalRecordsExamined.toLocaleString()} records scanned
                    </span>
                  </div>
                )}
                <p className="text-sm sm:text-base text-slate-100 font-tech font-medium leading-relaxed whitespace-pre-line">
                  {activeQueryResult.answer}
                </p>
              </div>

              {/* "Why this answer?" Explanation */}
              <div className="p-4 rounded-xl bg-spidey-navy/70 border border-spidey-blue/30 flex items-start gap-3">
                <div className="p-1.5 rounded-lg bg-spidey-blue/20 text-blue-400 shrink-0 mt-0.5 border border-spidey-blue/30">
                  <Info className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-spidey font-bold text-blue-300 uppercase tracking-wider mb-1">
                    Why this answer? (Spider-Sense Grounding Logic)
                  </h4>
                  <p className="text-xs text-slate-300 font-tech leading-relaxed">
                    {activeQueryResult.whyThisAnswer}
                  </p>
                </div>
              </div>

              {/* Web vs Document Comparison Card */}
              {activeQueryResult.webComparison && (
                <div className={`p-4 rounded-xl bg-gradient-to-r from-spidey-navy/90 via-slate-900 to-[#0A1128] border-2 space-y-3 shadow-lg ${
                  activeQueryResult.webComparison.comparisonStatus.includes('Auto Web Fallback')
                    ? 'border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.2)]'
                    : 'border-spidey-blue/40'
                }`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-spidey-blue/25">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-blue-500/20 text-spidey-web border border-blue-400/30">
                        <Globe className="w-4 h-4 animate-spin" />
                      </div>
                      <span className="text-xs font-spidey font-bold uppercase tracking-wider text-spidey-web">
                        Web Intelligence vs Uploaded Document Comparison 🌐
                      </span>
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold border ${
                      activeQueryResult.webComparison.comparisonStatus.includes('Auto Web Fallback')
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse'
                        : activeQueryResult.webComparison.comparisonStatus.includes('Verified') || activeQueryResult.webComparison.comparisonStatus.includes('Confirmed')
                        ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                        : activeQueryResult.webComparison.comparisonStatus.includes('Discrepancy')
                        ? 'bg-rose-500/20 text-rose-300 border-rose-500/40 spider-sense-active'
                        : 'bg-blue-500/15 text-blue-300 border-blue-500/30'
                    }`}>
                      {activeQueryResult.webComparison.comparisonStatus}
                    </span>
                  </div>

                  {/* Side-by-Side Comparison Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1 text-xs">
                    {/* Column 1: Uploaded Document Evidence */}
                    <div className={`p-3 rounded-lg bg-black/60 border space-y-1.5 ${
                      activeQueryResult.isNotFound ? 'border-amber-500/35' : 'border-spidey-red/25'
                    }`}>
                      <div className="flex items-center justify-between">
                        <span className={`text-[11px] font-spidey font-bold uppercase flex items-center gap-1 ${
                          activeQueryResult.isNotFound ? 'text-amber-400' : 'text-spidey-electric'
                        }`}>
                          <FileText className="w-3.5 h-3.5" /> 📄 Uploaded Document Evidence
                        </span>
                        <span className={`text-[10px] font-mono font-bold ${activeQueryResult.isNotFound ? 'text-amber-300' : 'text-slate-400'}`}>
                          {activeQueryResult.isNotFound ? '❌ Not Found in Files' : 'Internal File Node'}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-200 font-tech leading-relaxed bg-[#070913] p-2 rounded border border-slate-800 line-clamp-3">
                        {activeQueryResult.isNotFound
                          ? '⚠️ Not found in uploaded files. Zero internal records matched this query. Spider-Net automatically searched the public web.'
                          : activeQueryResult.sources[0]?.snippet || activeQueryResult.answer.slice(0, 160)}
                      </p>
                    </div>

                    {/* Column 2: External Live Web Source */}
                    <div className="p-3 rounded-lg bg-black/60 border border-spidey-blue/30 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-spidey font-bold text-spidey-web uppercase flex items-center gap-1">
                          <Globe className="w-3.5 h-3.5" /> 🌐 Live Web Intelligence
                        </span>
                        {activeQueryResult.webComparison.webUrl.startsWith('http') && (
                          <a 
                            href={activeQueryResult.webComparison.webUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-[10px] font-mono text-blue-400 hover:text-white flex items-center gap-0.5 underline"
                          >
                            <span>Open Source</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-200 font-tech leading-relaxed bg-[#070913] p-2 rounded border border-slate-800 line-clamp-3">
                        {activeQueryResult.webComparison.webSnippet}
                      </p>
                    </div>
                  </div>

                  {/* Comparative Analysis Bar */}
                  <div className="p-2.5 rounded-lg bg-blue-950/30 border border-blue-500/20 flex items-start gap-2">
                    <Scale className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <p className="text-xs text-blue-200 font-tech leading-relaxed">
                      <strong className="text-white font-spidey">Cross-Verification Synthesis:</strong> {activeQueryResult.webComparison.analysis}
                    </p>
                  </div>
                </div>
              )}

              {/* Sources Section */}
              {activeQueryResult.sources.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-spidey font-bold uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-spidey-electric" />
                      Supporting Web Nodes &amp; Citations ({activeQueryResult.sources.length})
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeQueryResult.sources.map((src, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-[#070913] border border-spidey-red/25 hover:border-spidey-electric hover:shadow-[0_0_15px_rgba(226,54,54,0.3)] transition-all flex flex-col justify-between gap-3 group"
                      >
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-mono font-bold text-spidey-electric truncate max-w-[200px]">
                              {src.file}
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-spidey-navy text-spidey-web border border-spidey-blue/30">
                              {src.location}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-300 font-mono line-clamp-2 leading-relaxed bg-black/50 p-2 rounded border border-slate-800">
                            {src.snippet}
                          </p>
                        </div>

                        <button
                          onClick={() => onOpenSourceInspector(src)}
                          className="w-full py-1.5 px-3 rounded-lg spidey-btn text-white text-xs font-spidey font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Inspect Source Node</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Precision Matching Records Table */}
            {matchingRecords.length > 0 && (
              <div className="p-6 rounded-2xl bg-spidey-card/95 border border-spidey-red/30 shadow-[0_4px_30px_rgba(0,0,0,0.8)] space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <Database className="w-4 h-4 text-spidey-web" />
                      <h3 className="text-sm font-spidey font-bold text-white uppercase tracking-wider">
                        Matching Web Records ({matchingRecords.length})
                      </h3>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5 font-tech">
                      Precision filtered: Verified network data points matching active query.
                    </p>
                  </div>

                  <span className="text-xs font-mono text-spidey-electric font-bold px-2.5 py-1 rounded bg-spidey-red/15 border border-spidey-red/30">
                    Filtered {matchingRecords.length} from {activeQueryResult.totalRecordsExamined.toLocaleString()} records
                  </span>
                </div>

                {/* Table */}
                <div className="overflow-x-auto rounded-xl border border-spidey-red/20">
                  <table className="w-full text-left text-xs font-tech">
                    <thead className="bg-spidey-navy/90 text-slate-300 font-spidey font-bold uppercase tracking-wider border-b border-spidey-red/30">
                      <tr>
                        <th className="py-3 px-4">Identifier</th>
                        <th className="py-3 px-4">Title / Name</th>
                        <th className="py-3 px-4">Category / Dept</th>
                        <th className="py-3 px-4">Key Telemetry</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Source Node</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/80 font-mono text-slate-300">
                      {paginatedRecords.map((rec) => (
                        <tr key={rec.id} className="hover:bg-spidey-red/10 transition-colors">
                          <td className="py-3 px-4 font-bold text-white font-mono">
                            {rec.id}
                          </td>
                          <td className="py-3 px-4 text-slate-200 font-tech font-semibold">
                            {rec.fields['Full Name'] || rec.title}
                          </td>
                          <td className="py-3 px-4 font-tech">
                            <span className="px-2 py-0.5 rounded bg-spidey-navy text-blue-300 border border-spidey-blue/40">
                              {rec.department || rec.category}
                            </span>
                          </td>
                          <td className="py-3 px-4 font-bold text-spidey-electric font-mono">
                            {rec.attendanceRate !== undefined
                              ? `${rec.attendanceRate}% Attendance`
                              : rec.amount !== undefined
                              ? `₹${rec.amount.toLocaleString('en-IN')}`
                              : rec.fields['Deadline'] || rec.status}
                          </td>
                          <td className="py-3 px-4 font-tech">
                            <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                              rec.status === 'At Risk' || rec.status === 'Overdue' || rec.status.includes('Delayed')
                                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 spider-sense-active'
                                : 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                            }`}>
                              {rec.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right text-slate-400 font-mono">
                            {rec.sourceFile} ({rec.sourceLocation})
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-xs text-slate-400 font-tech">
                      Showing {(currentPage - 1) * rowsPerPage + 1} to {Math.min(currentPage * rowsPerPage, matchingRecords.length)} of {matchingRecords.length} records
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        disabled={currentPage === 1}
                        className="p-1.5 rounded-lg bg-spidey-card hover:bg-slate-800 disabled:opacity-40 text-slate-300 border border-spidey-red/20 transition-colors"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <span className="text-xs font-mono text-slate-300 font-bold">
                        Page {currentPage} of {totalPages}
                      </span>
                      <button
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        disabled={currentPage === totalPages}
                        className="p-1.5 rounded-lg bg-spidey-card hover:bg-slate-800 disabled:opacity-40 text-slate-300 border border-spidey-red/20 transition-colors"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
