import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { LandingPage } from './components/LandingPage';
import { SourceInspectorModal } from './components/SourceInspectorModal';

import { DashboardView } from './components/views/DashboardView';
import { AskAIView } from './components/views/AskAIView';
import { InformationDetectiveView } from './components/views/InformationDetectiveView';
import { InformationMapView } from './components/views/InformationMapView';
import { DocumentsView } from './components/views/DocumentsView';
import { RecordsView } from './components/views/RecordsView';
import { AttentionCenterView } from './components/views/AttentionCenterView';
import { SettingsView } from './components/views/SettingsView';

import { DEMO_DOCUMENTS, ALL_RECORDS, DETECTIVE_FINDINGS, GRAPH_NODES, GRAPH_EDGES } from './data/demoData';
import { RecordItem, DocumentItem, FindingItem, GraphNode, GraphEdge, SourceCitation } from './types';
import { buildDynamicGraph } from './services/ingestionEngine';

export function App() {
  const [showLandingPage, setShowLandingPage] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard'); // Start on Dashboard

  // Clean state: starts with 0 records by default!
  const [records, setRecords] = useState<RecordItem[]>([]);
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [findings, setFindings] = useState<FindingItem[]>([]);
  const [graphNodes, setGraphNodes] = useState<GraphNode[]>([]);
  const [graphEdges, setGraphEdges] = useState<GraphEdge[]>([]);

  const [inspectorCitation, setInspectorCitation] = useState<SourceCitation | null>(null);
  const [isInspectorOpen, setIsInspectorOpen] = useState(false);

  // Upload handler for custom files
  const handleIngestNewFile = (newDoc: DocumentItem, newRecords: RecordItem[], newFindings: FindingItem[]) => {
    const updatedDocs = [newDoc, ...documents];
    const updatedRecords = [...newRecords, ...records];
    const updatedFindings = [...newFindings, ...findings];

    setDocuments(updatedDocs);
    setRecords(updatedRecords);
    setFindings(updatedFindings);

    const { nodes, edges } = buildDynamicGraph(updatedDocs, updatedRecords);
    setGraphNodes(nodes);
    setGraphEdges(edges);
  };

  // Clear all data to pristine 0 state
  const handleClearAllData = () => {
    setRecords([]);
    setDocuments([]);
    setFindings([]);
    setGraphNodes([]);
    setGraphEdges([]);
    fetch('http://127.0.0.1:8000/api/workspace/clear', { method: 'POST' }).catch(() => {});
  };

  // Load Demo Data (1,050 records) on demand
  const handleLoadDemoData = () => {
    setRecords(ALL_RECORDS);
    setDocuments(DEMO_DOCUMENTS);
    setFindings(DETECTIVE_FINDINGS);
    setGraphNodes(GRAPH_NODES);
    setGraphEdges(GRAPH_EDGES);
    fetch('http://127.0.0.1:8000/api/workspace/load-demo', { method: 'POST' }).catch(() => {});
  };

  const handleOpenSourceInspector = (citation: SourceCitation) => {
    setInspectorCitation(citation);
    setIsInspectorOpen(true);
  };

  const handleCloseSourceInspector = () => {
    setIsInspectorOpen(false);
    setInspectorCitation(null);
  };

  const totalRecordsCount = records.length;
  const conflictCount = findings.filter(f => f.type === 'conflict').length;
  const missingCount = findings.filter(f => f.type === 'missing').length;
  const criticalCount = findings.filter(f => f.priority === 'critical').length;

  if (showLandingPage) {
    return (
      <div className="min-h-screen bg-[#090d16] flex flex-col">
        <Navbar
          currentView={currentView}
          setCurrentView={setCurrentView}
          showLandingPage={showLandingPage}
          setShowLandingPage={setShowLandingPage}
          totalRecordsCount={totalRecordsCount}
          onClearAll={handleClearAllData}
          onLoadDemo={handleLoadDemoData}
        />
        <LandingPage
          onEnterDemo={() => {
            setShowLandingPage(false);
            if (records.length === 0) handleLoadDemoData();
            setCurrentView('ask');
          }}
          onUploadClick={() => {
            setShowLandingPage(false);
            setCurrentView('documents');
          }}
        />
        <SourceInspectorModal
          isOpen={isInspectorOpen}
          onClose={handleCloseSourceInspector}
          citation={inspectorCitation}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#090d16] text-slate-100">
      {/* Top Navbar */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        showLandingPage={showLandingPage}
        setShowLandingPage={setShowLandingPage}
        totalRecordsCount={totalRecordsCount}
        onClearAll={handleClearAllData}
        onLoadDemo={handleLoadDemoData}
      />

      {/* Main Layout Shell */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <Sidebar
          currentView={currentView}
          setCurrentView={setCurrentView}
          conflictCount={conflictCount}
          missingCount={missingCount}
          criticalCount={criticalCount}
          totalRecordsCount={totalRecordsCount}
        />

        {/* Dynamic Center/Right Workspace View */}
        <main className="flex-1 flex flex-col overflow-hidden relative">
          {currentView === 'dashboard' && (
            <DashboardView
              documents={documents}
              records={records}
              findings={findings}
              onNavigateToAskAI={() => setCurrentView('ask')}
              onNavigateToDetective={() => setCurrentView('detective')}
              onNavigateToDocuments={() => setCurrentView('documents')}
              onNavigateToRecords={() => setCurrentView('records')}
              onLoadDemo={handleLoadDemoData}
              onOpenSourceInspector={handleOpenSourceInspector}
              totalRecordsCount={totalRecordsCount}
            />
          )}

          {currentView === 'ask' && (
            <AskAIView
              records={records}
              onNavigateToDocuments={() => setCurrentView('documents')}
              onLoadDemo={handleLoadDemoData}
              onOpenSourceInspector={handleOpenSourceInspector}
              totalRecordsCount={totalRecordsCount}
            />
          )}

          {currentView === 'detective' && (
            <InformationDetectiveView
              findings={findings}
              setFindings={setFindings}
              onNavigateToDocuments={() => setCurrentView('documents')}
              onLoadDemo={handleLoadDemoData}
              onOpenSourceInspector={handleOpenSourceInspector}
            />
          )}

          {currentView === 'map' && (
            <InformationMapView
              nodes={graphNodes}
              edges={graphEdges}
              onNavigateToDocuments={() => setCurrentView('documents')}
              onLoadDemo={handleLoadDemoData}
              onOpenSourceInspector={handleOpenSourceInspector}
            />
          )}

          {currentView === 'documents' && (
            <DocumentsView
              documents={documents}
              records={records}
              onIngestNewFile={handleIngestNewFile}
              onOpenSourceInspector={handleOpenSourceInspector}
              onLoadDemo={handleLoadDemoData}
            />
          )}

          {currentView === 'records' && (
            <RecordsView
              records={records}
              onNavigateToDocuments={() => setCurrentView('documents')}
              onLoadDemo={handleLoadDemoData}
              onOpenSourceInspector={handleOpenSourceInspector}
            />
          )}

          {currentView === 'attention' && (
            <AttentionCenterView
              findings={findings}
              onNavigateToDocuments={() => setCurrentView('documents')}
              onLoadDemo={handleLoadDemoData}
              onOpenSourceInspector={handleOpenSourceInspector}
            />
          )}

          {currentView === 'settings' && (
            <SettingsView
              onClearAll={handleClearAllData}
              onLoadDemo={handleLoadDemoData}
              totalRecordsCount={totalRecordsCount}
            />
          )}
        </main>
      </div>

      {/* Grounded Source Evidence Inspector Modal */}
      <SourceInspectorModal
        isOpen={isInspectorOpen}
        onClose={handleCloseSourceInspector}
        citation={inspectorCitation}
      />
    </div>
  );
}

export default App;
