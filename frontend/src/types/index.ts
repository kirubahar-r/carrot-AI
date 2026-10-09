export type RecordCategory = 'employee' | 'invoice' | 'purchase_order' | 'task' | 'complaint' | 'attendance' | 'company_profile' | 'milestone' | 'financial' | 'executive' | 'segment' | 'sustainability';

export interface RecordItem {
  id: string;
  category: RecordCategory;
  title: string;
  department?: string;
  amount?: number;
  attendanceRate?: number;
  status: string;
  priority?: 'critical' | 'high' | 'medium' | 'low';
  sourceFile: string;
  sourceLocation: string; // e.g. "Row 102", "Page 4"
  date?: string;
  region?: string;
  tags?: string[];
  fields: Record<string, any>;
  hasConflict?: boolean;
  hasMissingInfo?: boolean;
}

export interface DocumentItem {
  id: string;
  name: string;
  type: 'pdf' | 'docx' | 'txt' | 'csv' | 'xlsx' | 'image';
  size: string;
  recordsCount: number;
  chunksCount: number;
  uploadedAt: string;
  status: 'indexed' | 'processing' | 'ready';
  ocrApplied?: boolean;
  summary: string;
  highlights: string[];
}

export type FindingType = 'conflict' | 'missing' | 'duplicate' | 'important';
export type FindingPriority = 'critical' | 'high' | 'medium' | 'low';

export interface FindingItem {
  id: string;
  type: FindingType;
  priority: FindingPriority;
  title: string;
  description: string;
  category: string;
  sources: Array<{
    file: string;
    location: string;
    snippet: string;
  }>;
  diff?: {
    field: string;
    sourceA: string;
    valueA: string;
    sourceB: string;
    valueB: string;
    discrepancyNote: string;
  };
  recommendedAction: string;
  status: 'open' | 'in_progress' | 'resolved';
}

export interface SourceCitation {
  file: string;
  location: string;
  documentType: string;
  snippet: string;
  relevanceScore?: number;
}

export interface WebComparisonItem {
  webSourceTitle: string;
  webUrl: string;
  webSnippet: string;
  comparisonStatus: string;
  analysis: string;
}

export interface QueryResult {
  query: string;
  answer: string;
  totalRecordsExamined: number;
  matchingCount: number;
  matchingRecords: RecordItem[];
  whyThisAnswer: string;
  sources: SourceCitation[];
  confidence: 'High' | 'Medium' | 'Low';
  followUpSuggestions: string[];
  timestamp: string;
  isNotFound?: boolean;
  webComparison?: WebComparisonItem;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  queryResult?: QueryResult;
  timestamp: string;
}

export interface GraphNode {
  id: string;
  label: string;
  type: 'project' | 'department' | 'employee' | 'invoice' | 'document' | 'issue' | 'task';
  categoryColor: string;
  x: number;
  y: number;
  description: string;
  connectedCount: number;
  metrics?: Record<string, string>;
  sourceFile?: string;
}

export interface GraphEdge {
  id: string;
  source: string;
  target: string;
  label: string;
}

export interface WorkspaceInfo {
  id: string;
  name: string;
  description: string;
  totalDocuments: number;
  totalRecords: number;
  lastUpdated: string;
  isDemo: boolean;
}
