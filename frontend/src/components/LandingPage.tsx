import React from 'react';
import { 
  Compass, 
  ArrowRight, 
  Upload, 
  Search, 
  FileCheck, 
  Sparkles, 
  ShieldCheck, 
  Database, 
  FileSpreadsheet, 
  FileText, 
  Image as ImageIcon, 
  Layers, 
  Network, 
  AlertOctagon, 
  CheckCircle2, 
  BarChart3,
  ChevronRight
} from 'lucide-react';

interface LandingPageProps {
  onEnterDemo: () => void;
  onUploadClick: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onEnterDemo,
  onUploadClick
}) => {
  const workflowSteps = [
    {
      num: '01',
      title: 'Upload',
      desc: 'Ingest 1,000+ files across PDF, Excel, Word, CSV, TXT & Scanned OCR images.',
      icon: Upload,
      color: 'from-blue-500 to-indigo-500'
    },
    {
      num: '02',
      title: 'Understand',
      desc: 'Auto-detect schema, column data types, semantic chunks & cross-document relations.',
      icon: Layers,
      color: 'from-indigo-500 to-violet-500'
    },
    {
      num: '03',
      title: 'Search',
      desc: 'Query across all 1,000+ pieces of data simultaneously in conversational natural language.',
      icon: Search,
      color: 'from-violet-500 to-purple-500'
    },
    {
      num: '04',
      title: 'Detect',
      desc: 'Information Detective identifies discrepancies, missing compliance fields & anomalies.',
      icon: AlertOctagon,
      color: 'from-purple-500 to-pink-500'
    },
    {
      num: '05',
      title: 'Decide',
      desc: 'Receive precision answers with highlighted source citations, confidence & next steps.',
      icon: CheckCircle2,
      color: 'from-pink-500 to-rose-500'
    }
  ];

  const supportedFormats = [
    { label: 'PDF Documents', ext: 'PDF', icon: FileText, color: 'text-red-400 border-red-500/30 bg-red-500/10' },
    { label: 'Spreadsheets', ext: 'XLSX / CSV', icon: FileSpreadsheet, color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10' },
    { label: 'Word Documents', ext: 'DOCX', icon: FileText, color: 'text-blue-400 border-blue-500/30 bg-blue-500/10' },
    { label: 'Raw Text Files', ext: 'TXT', icon: FileText, color: 'text-slate-400 border-slate-500/30 bg-slate-500/10' },
    { label: 'Scanned Invoices / OCR', ext: 'PNG / JPG', icon: ImageIcon, color: 'text-amber-400 border-amber-500/30 bg-amber-500/10' },
  ];

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 px-6 sm:px-12 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-b from-indigo-500/15 via-violet-500/5 to-transparent blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto text-center space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>PS01 Smart Automation: Find → Understand → Organize → Use Information</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
            Turn 1,000+ pieces of information into{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-pink-400 bg-clip-text text-transparent">
              one clear answer.
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed">
            CARROT AI finds, understands, connects and explains the information that matters.
            Search across unstructured PDFs, complex Excel sheets, Word docs, and scanned OCR images with zero hallucinations.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={onEnterDemo}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold text-sm shadow-xl shadow-indigo-500/25 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
            >
              <span>Try Demo (1,050 Records)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onUploadClick}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-surface-900 hover:bg-slate-800 text-slate-200 font-semibold text-sm border border-slate-700/80 flex items-center justify-center gap-2 transition-all"
            >
              <Upload className="w-4 h-4 text-indigo-400" />
              <span>Upload Custom Data</span>
            </button>
          </div>

          {/* Key Guarantee Metrics */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto text-left">
            <div className="p-3.5 rounded-xl bg-surface-900/60 border border-slate-800/80">
              <span className="text-2xl font-bold text-white block">1,050+</span>
              <span className="text-xs text-slate-400">Pre-indexed Demo Records</span>
            </div>
            <div className="p-3.5 rounded-xl bg-surface-900/60 border border-slate-800/80">
              <span className="text-2xl font-bold text-emerald-400 block">100%</span>
              <span className="text-xs text-slate-400">Grounded Source Evidence</span>
            </div>
            <div className="p-3.5 rounded-xl bg-surface-900/60 border border-slate-800/80">
              <span className="text-2xl font-bold text-rose-400 block">4 Conflicts</span>
              <span className="text-xs text-slate-400">Detected Automatically</span>
            </div>
            <div className="p-3.5 rounded-xl bg-surface-900/60 border border-slate-800/80">
              <span className="text-2xl font-bold text-indigo-400 block">0%</span>
              <span className="text-xs text-slate-400">Hallucinated Values</span>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Workflow Section */}
      <section className="py-16 px-6 sm:px-12 border-t border-slate-800/80 bg-surface-950/40">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              The CARROT Intelligence Pipeline
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              From raw fragmented records to verified decisions in milliseconds
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {workflowSteps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.num}
                  className="relative p-5 rounded-2xl bg-surface-900 border border-slate-800/80 hover:border-indigo-500/40 transition-all group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-slate-400">
                      {step.num}
                    </span>
                    <div className="p-2 rounded-xl bg-slate-800 group-hover:bg-indigo-600/20 text-indigo-400 transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-white mb-1.5">{step.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison: Why CARROT AI is Not a Basic Chatbot */}
      <section className="py-16 px-6 sm:px-12 border-t border-slate-800/80">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Precision Answer Engine vs. Basic Chatbots
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              Why typical document summarizers fail on 1,000+ enterprise records
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Typical Chatbot */}
            <div className="p-6 rounded-2xl bg-surface-900/50 border border-rose-500/20">
              <div className="flex items-center gap-2 text-rose-400 font-semibold text-sm mb-4">
                <span>❌ Basic Chatbots &amp; Simple Summarizers</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span>Dumps either a vague summary or all 1,000 records without precision filtering.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span>Invents confident numbers and hallucinated dates when answers are missing.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span>Cannot detect when an Invoice claims ₹118,500 against a ₹100,000 Purchase Order.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold">•</span>
                  <span>No verifiable link to the exact Excel row or PDF page supporting the answer.</span>
                </li>
              </ul>
            </div>

            {/* CARROT AI */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950/40 via-surface-900 to-slate-900 border border-indigo-500/40 shadow-lg shadow-indigo-500/10">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm mb-4">
                <CheckCircle2 className="w-4 h-4" />
                <span>CARROT AI (Decision Engine)</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-200">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>Precision Filter:</strong> Asks for CSE &lt; 75% attendance? Returns only 23 matching rows from 1,000 records.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>Information Detective:</strong> Automatically uncovers discrepancies, missing contact info &amp; duplicate invoices.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>Clickable Source Evidence:</strong> Inspect the original file, sheet, row, or page with full text highlighting.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span><strong>Interactive Information Map:</strong> Visually navigate relationships between Projects, Staff, Tasks, and Invoices.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Data Formats Banner */}
      <section className="py-12 px-6 sm:px-12 border-t border-slate-800/80 bg-surface-950/60">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-xs font-semibold uppercase tracking-wider text-slate-400 mb-6">
            Supported Mixed Information Formats
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {supportedFormats.map((fmt) => {
              const Icon = fmt.icon;
              return (
                <div
                  key={fmt.label}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-medium ${fmt.color}`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{fmt.label}</span>
                  <span className="text-[10px] opacity-75 font-mono">({fmt.ext})</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <footer className="mt-auto py-12 px-6 sm:px-12 border-t border-slate-800 text-center space-y-4">
        <h3 className="text-xl font-bold text-white">
          Experience precision information retrieval right now
        </h3>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Loaded with 1,050 real enterprise operational records across HR, Finance, Procurement, and Project Alpha.
        </p>
        <button
          onClick={onEnterDemo}
          className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs shadow-lg shadow-indigo-500/20 inline-flex items-center gap-2 transition-all"
        >
          <span>Launch Company Operations Demo</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </footer>
    </div>
  );
};
