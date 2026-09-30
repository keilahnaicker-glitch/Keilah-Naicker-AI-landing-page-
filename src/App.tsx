/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { GeneratorForm } from './components/GeneratorForm';
import { PreviewCanvas } from './components/PreviewCanvas';
import { CodeViewer } from './components/CodeViewer';
import { LeadSubmissionsModal } from './components/LeadSubmissionsModal';
import { PresetModal } from './components/PresetModal';
import { PRESET_TEMPLATES } from './data/presets';
import { LandingPageVariables, LeadSubmission, PresetTemplate } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<'edit' | 'preview' | 'code' | 'split'>('split');
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  // Load initial preset
  const defaultPreset = PRESET_TEMPLATES[0];
  const [currentPresetId, setCurrentPresetId] = useState<string>(defaultPreset.id);
  const [variables, setVariables] = useState<LandingPageVariables>(defaultPreset.variables);
  const [htmlCode, setHtmlCode] = useState<string>(defaultPreset.sampleHtml || '');

  // Loading states
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isRefining, setIsRefining] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Leads & Modals
  const [leads, setLeads] = useState<LeadSubmission[]>([]);
  const [isLeadsModalOpen, setIsLeadsModalOpen] = useState<boolean>(false);
  const [isPresetsModalOpen, setIsPresetsModalOpen] = useState<boolean>(false);

  // Handle Preset Change
  const handleSelectPreset = (preset: PresetTemplate) => {
    setCurrentPresetId(preset.id);
    setVariables(preset.variables);
    if (preset.sampleHtml) {
      setHtmlCode(preset.sampleHtml);
    } else {
      // Trigger auto-generate for presets without sampleHtml
      generatePageForVariables(preset.variables);
    }
  };

  // Generate Landing Page via Server API
  const generatePageForVariables = async (varsToUse: LandingPageVariables) => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate-landing-page', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(varsToUse),
      });
      const data = await response.json();
      if (data.success && data.htmlCode) {
        setHtmlCode(data.htmlCode);
      } else {
        alert('Generation error: ' + (data.error || 'Failed to generate page'));
      }
    } catch (err: any) {
      console.error('API Error:', err);
      alert('Error contacting AI server: ' + err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerate = () => {
    generatePageForVariables(variables);
  };

  // Refine Landing Page via Server API
  const handleRefine = async (instruction: string) => {
    setIsRefining(true);
    try {
      const response = await fetch('/api/refine-landing-page', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentHtml: htmlCode,
          instruction,
        }),
      });
      const data = await response.json();
      if (data.success && data.htmlCode) {
        setHtmlCode(data.htmlCode);
      } else {
        alert('Refinement error: ' + (data.error || 'Failed to refine page'));
      }
    } catch (err: any) {
      console.error('Refine Error:', err);
      alert('Error refining landing page: ' + err.message);
    } finally {
      setIsRefining(false);
    }
  };

  // Copy Code to Clipboard
  const handleCopyCode = () => {
    navigator.clipboard.writeText(htmlCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Download HTML File
  const handleDownloadCode = () => {
    const filename = `${variables.companyName.toLowerCase().replace(/[^a-z0-9]/g, '_')}_landing_page.html`;
    const blob = new Blob([htmlCode], { type: 'text/html;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
  };

  // Open Landing Page in New Tab
  const handleOpenNewWindow = () => {
    const blob = new Blob([htmlCode], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  // Lead capture handler from iframe
  const handleLeadCaptured = (newLead: LeadSubmission) => {
    setLeads((prev) => [newLead, ...prev]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      
      {/* Top Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        viewport={viewport}
        setViewport={setViewport}
        onCopyCode={handleCopyCode}
        onDownloadCode={handleDownloadCode}
        copied={copied}
        leadCount={leads.length}
        onOpenLeadsModal={() => setIsLeadsModalOpen(true)}
        onOpenPresetsModal={() => setIsPresetsModalOpen(true)}
        onOpenNewWindow={handleOpenNewWindow}
      />

      {/* Main Studio Work Area */}
      <main className="flex-1 p-3 sm:p-5 max-w-[1700px] w-full mx-auto overflow-hidden">
        
        {/* Split Studio Layout */}
        {activeTab === 'split' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 h-[calc(100vh-100px)] min-h-[650px]">
            {/* Left Generator Controls Panel (5 cols) */}
            <div className="lg:col-span-5 h-full overflow-hidden">
              <GeneratorForm
                variables={variables}
                setVariables={setVariables}
                onGenerate={handleGenerate}
                onRefine={handleRefine}
                isGenerating={isGenerating}
                isRefining={isRefining}
                currentPresetId={currentPresetId}
                onSelectPreset={handleSelectPreset}
              />
            </div>

            {/* Right Live Preview Canvas Panel (7 cols) */}
            <div className="lg:col-span-7 h-full overflow-hidden">
              <PreviewCanvas
                htmlCode={htmlCode}
                viewport={viewport}
                setViewport={setViewport}
                onLeadCaptured={handleLeadCaptured}
                onOpenNewWindow={handleOpenNewWindow}
              />
            </div>
          </div>
        )}

        {/* Full Preview Layout */}
        {activeTab === 'preview' && (
          <div className="h-[calc(100vh-100px)] min-h-[650px]">
            <PreviewCanvas
              htmlCode={htmlCode}
              viewport={viewport}
              setViewport={setViewport}
              onLeadCaptured={handleLeadCaptured}
              onOpenNewWindow={handleOpenNewWindow}
            />
          </div>
        )}

        {/* Generator Controls Only */}
        {activeTab === 'edit' && (
          <div className="max-w-3xl mx-auto h-[calc(100vh-100px)]">
            <GeneratorForm
              variables={variables}
              setVariables={setVariables}
              onGenerate={handleGenerate}
              onRefine={handleRefine}
              isGenerating={isGenerating}
              isRefining={isRefining}
              currentPresetId={currentPresetId}
              onSelectPreset={handleSelectPreset}
            />
          </div>
        )}

        {/* HTML Code View */}
        {activeTab === 'code' && (
          <div className="h-[calc(100vh-100px)] min-h-[650px]">
            <CodeViewer
              htmlCode={htmlCode}
              setHtmlCode={setHtmlCode}
              onCopyCode={handleCopyCode}
              onDownloadCode={handleDownloadCode}
              copied={copied}
            />
          </div>
        )}

      </main>

      {/* Captured Leads Modal */}
      <LeadSubmissionsModal
        isOpen={isLeadsModalOpen}
        onClose={() => setIsLeadsModalOpen(false)}
        leads={leads}
        onClearLeads={() => setLeads([])}
      />

      {/* Industry Presets Modal */}
      <PresetModal
        isOpen={isPresetsModalOpen}
        onClose={() => setIsPresetsModalOpen(false)}
        onSelectPreset={handleSelectPreset}
        currentPresetId={currentPresetId}
      />

    </div>
  );
}
