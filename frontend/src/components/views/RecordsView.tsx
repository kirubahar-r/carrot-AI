import React, { useState, useMemo } from 'react';
import { 
  Database, 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  ExternalLink, 
  AlertOctagon, 
  AlertTriangle,
  Upload,
  Zap,
  FileSpreadsheet
} from 'lucide-react';
import { RecordItem, RecordCategory, SourceCitation } from '../../types';

interface RecordsViewProps {
  records: RecordItem[];
  onNavigateToDocuments: () => void;
  onLoadDemo: () => void;
  onOpenSourceInspector: (citation: SourceCitation) => void;
}

export const RecordsView: React.FC<RecordsViewProps> = ({
  records,
  onNavigateToDocuments,
  onLoadDemo,
  onOpenSourceInspector
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<RecordCategory | 'all'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  const filteredRecords = useMemo(() => {
    return records.filter(record => {
      const matchesCategory = selectedCategory === 'all' || record.category === selectedCategory;
      const term = searchTerm.toLowerCase();
      const matchesSearch = !term || 
        record.id.toLowerCase().includes(term) ||
        record.title.toLowerCase().includes(term) ||
        (record.department && record.department.toLowerCase().includes(term)) ||
        (record.region && record.region.toLowerCase().includes(term)) ||
        JSON.stringify(record.fields).toLowerCase().includes(term);

      return matchesCategory && matchesSearch;
    });
  }, [records, searchTerm, selectedCategory]);

  const totalPages = Math.ceil(filteredRecords.length / pageSize);
  const paginatedRecords = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredRecords.slice(start, start + pageSize);
  }, [filteredRecords, currentPage, pageSize]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(Math.min(Math.max(1, newPage), totalPages));
  };

  return (
    <div className="flex-1 flex flex-col h-full spidey-web-bg text-slate-100 overflow-y-auto font-tech">
      {/* Header */}
      <div className="border-b border-spidey-red/25 bg-gradient-to-b from-spidey-red/15 via-[#0A1128]/70 to-[#070913] px-6 py-8 backdrop-blur-md">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-spidey-red/20 text-spidey-electric border border-spidey-red/40 shadow-[0_0_15px_rgba(226,54,54,0.4)]">
                  <Database className="w-5 h-5 text-spidey-electric animate-pulse" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-black font-spidey tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white via-red-200 to-spidey-web">
                    SPIDER-NET RECORDS MATRIX 🕸️
                  </h1>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-spidey-web/90">
                    {records.length.toLocaleString()} Indexed Data Nodes
                  </span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 font-tech">
                Unified telemetry explorer indexing uploaded rows, columns, and extracted fields with instant search.
              </p>
            </div>

            <div className="text-xs text-slate-300 font-mono">
              Displaying: <strong className="text-spidey-electric font-bold">{filteredRecords.length}</strong> matching nodes
            </div>
          </div>

          {/* Search Controls */}
          {records.length > 0 && (
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-spidey-electric absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Search across all records by ID, employee name, vendor, department..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-spidey-card/95 border border-spidey-red/35 focus:border-spidey-electric focus:ring-2 focus:ring-spidey-red/20 text-xs text-white placeholder-slate-400 outline-none font-tech transition-all"
                />
              </div>

              {/* Category Filter Tabs */}
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: 'all', label: `All (${records.length})` },
                  { id: 'employee', label: 'Employees' },
                  { id: 'invoice', label: 'Invoices' },
                  { id: 'task', label: 'Tasks' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setSelectedCategory(tab.id as any);
                      setCurrentPage(1);
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-spidey font-bold uppercase tracking-wider transition-all ${
                      selectedCategory === tab.id
                        ? 'spidey-btn text-white shadow-lg'
                        : 'bg-spidey-card hover:bg-slate-800 text-slate-300 border border-spidey-red/25'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Records Table or Empty State */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-4">
        {records.length > 0 ? (
          <div className="p-6 rounded-2xl bg-spidey-card/95 border border-spidey-red/30 shadow-xl space-y-4">
            {/* Table Header & Pagination Options */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-spidey-red/20">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold font-spidey text-white uppercase tracking-wider">
                  Indexed Network Rows
                </span>
                <span className="text-xs text-spidey-web font-mono font-bold">
                  (Page {currentPage} of {totalPages || 1})
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-300 font-tech">Rows per page:</span>
                <select
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="bg-spidey-navy border border-spidey-blue/40 text-xs text-slate-200 rounded-lg px-2 py-1 outline-none font-mono"
                >
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-xl border border-spidey-red/20">
              <table className="w-full text-left text-xs font-tech">
                <thead className="bg-spidey-navy/90 text-slate-300 font-spidey font-bold uppercase tracking-wider border-b border-spidey-red/30">
                  <tr>
                    <th className="py-3 px-4">Node ID</th>
                    <th className="py-3 px-4">Title / Name</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Department / Scope</th>
                    <th className="py-3 px-4">Primary Metric</th>
                    <th className="py-3 px-4">Status &amp; Flags</th>
                    <th className="py-3 px-4 text-right">Origin Node</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 font-mono text-slate-300">
                  {paginatedRecords.map((r) => (
                    <tr key={r.id} className="hover:bg-spidey-red/10 transition-colors">
                      <td className="py-3 px-4 font-bold text-white font-mono">
                        {r.id}
                      </td>
                      <td className="py-3 px-4 font-tech text-slate-200">
                        <div className="font-semibold text-white">{r.fields['Full Name'] || r.title}</div>
                      </td>
                      <td className="py-3 px-4 font-tech capitalize">
                        <span className="px-2 py-0.5 rounded text-[10px] bg-spidey-navy text-blue-300 border border-spidey-blue/30 font-mono font-bold">
                          {r.category.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-tech text-slate-300">
                        {r.department || r.region || '—'}
                      </td>
                      <td className="py-3 px-4 font-bold text-spidey-electric font-mono">
                        {r.attendanceRate !== undefined ? (
                          <span className={r.attendanceRate < 75 ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>
                            {r.attendanceRate}% Attendance
                          </span>
                        ) : r.amount !== undefined ? (
                          `₹${r.amount.toLocaleString('en-IN')}`
                        ) : (
                          r.fields['Deadline'] || r.status
                        )}
                      </td>
                      <td className="py-3 px-4 font-tech">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            r.status === 'At Risk' || r.status === 'Overdue' || r.status.includes('Delayed')
                              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 spider-sense-active'
                              : 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                          }`}>
                            {r.status}
                          </span>

                          {r.hasConflict && (
                            <span className="px-1.5 py-0.5 rounded text-[10px] bg-rose-500/30 text-rose-300 font-mono font-bold flex items-center gap-0.5 border border-rose-500/40 spider-sense-active" title="Conflict detected">
                              <AlertOctagon className="w-3 h-3 text-rose-400 animate-pulse" /> Conflict
                            </span>
                          )}

                          {r.hasMissingInfo && (
                            <span className="px-1.5 py-0.5 rounded text-[10px] bg-amber-500/20 text-amber-300 font-mono flex items-center gap-0.5 border border-amber-500/30" title="Missing required info">
                              <AlertTriangle className="w-3 h-3 text-amber-400" /> Missing
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right text-slate-400 font-mono">
                        <button
                          onClick={() => onOpenSourceInspector({
                            file: r.sourceFile,
                            location: r.sourceLocation,
                            snippet: JSON.stringify(r.fields, null, 2),
                            documentType: r.sourceFile.split('.').pop() || 'file'
                          })}
                          className="text-spidey-electric hover:text-white hover:underline inline-flex items-center gap-1 font-bold"
                        >
                          <span>{r.sourceFile.split('.')[0]}</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls Footer */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-800">
              <span className="text-xs text-slate-400">
                Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, filteredRecords.length)} of {filteredRecords.length.toLocaleString()} records
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg bg-spidey-card hover:bg-slate-800 disabled:opacity-30 text-slate-300 border border-spidey-red/25 transition-colors"
                  title="Previous page"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <span className="text-xs font-mono text-slate-300 px-2 font-bold">
                  Page {currentPage} of {totalPages || 1}
                </span>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage >= totalPages}
                  className="p-2 rounded-lg bg-spidey-card hover:bg-slate-800 disabled:opacity-30 text-slate-300 border border-spidey-red/25 transition-colors"
                  title="Next page"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="p-12 rounded-2xl bg-spidey-card/90 border border-spidey-red/30 text-center space-y-4">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-spidey-navy border border-spidey-blue/30 flex items-center justify-center text-slate-400">
              <FileSpreadsheet className="w-7 h-7 text-spidey-electric" />
            </div>
            <div>
              <h3 className="text-base font-bold font-spidey text-white">0 Records in Matrix</h3>
              <p className="text-xs text-slate-300 max-w-md mx-auto mt-1 font-tech">
                Your Spider-Net grid is empty. Drop any CSV, Excel, or structured data file in the Documents view to populate records.
              </p>
            </div>
            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={onNavigateToDocuments}
                className="px-4 py-2 rounded-xl spidey-btn text-white font-spidey font-bold uppercase text-xs inline-flex items-center gap-2 shadow-lg"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload CSV / Spreadsheet</span>
              </button>
              <button
                onClick={onLoadDemo}
                className="px-4 py-2 rounded-xl bg-spidey-navy hover:bg-slate-800 border border-spidey-blue/30 text-blue-300 font-spidey font-bold uppercase text-xs inline-flex items-center gap-2"
              >
                <Zap className="w-3.5 h-3.5 text-spidey-web" />
                <span>Load Complete Records</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
