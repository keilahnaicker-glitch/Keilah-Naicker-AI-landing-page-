import React from 'react';
import { Sparkles, Code2, Eye, Download, Copy, Check, Inbox, Monitor, Smartphone, Tablet, ExternalLink, Layers } from 'lucide-react';

interface HeaderProps {
  activeTab: 'edit' | 'preview' | 'code' | 'split';
  setActiveTab: (tab: 'edit' | 'preview' | 'code' | 'split') => void;
  viewport: 'desktop' | 'tablet' | 'mobile';
  setViewport: (vp: 'desktop' | 'tablet' | 'mobile') => void;
  onCopyCode: () => void;
  onDownloadCode: () => void;
  copied: boolean;
  leadCount: number;
  onOpenLeadsModal: () => void;
  onOpenPresetsModal: () => void;
  onOpenNewWindow: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  viewport,
  setViewport,
  onCopyCode,
  onDownloadCode,
  copied,
  leadCount,
  onOpenLeadsModal,
  onOpenPresetsModal,
  onOpenNewWindow,
}) => {
  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-sky-500 to-emerald-400 p-0.5 shadow-lg shadow-indigo-500/20">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-sky-400 animate-pulse" />
            </div>
          </div>
          <div>
            <h1 className="font-bold text-base md:text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
              AI Landing Page Studio
            </h1>
            <p className="text-xs text-slate-400 hidden sm:block">
              Single-File High-Converting HTML & CSS Generator
            </p>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="hidden md:flex items-center bg-slate-950/80 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setActiveTab('split')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'split'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Split Studio
          </button>
          <button
            onClick={() => setActiveTab('preview')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'preview'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            Full Preview
          </button>
          <button
            onClick={() => setActiveTab('edit')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'edit'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            Generator Controls
          </button>
          <button
            onClick={() => setActiveTab('code')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeTab === 'code'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            HTML Code
          </button>
        </div>

        {/* Viewport controls for preview mode */}
        {(activeTab === 'preview' || activeTab === 'split') && (
          <div className="hidden lg:flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => setViewport('desktop')}
              title="Desktop View"
              className={`p-1.5 rounded-md transition-all ${
                viewport === 'desktop' ? 'bg-slate-800 text-sky-400' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewport('tablet')}
              title="Tablet View"
              className={`p-1.5 rounded-md transition-all ${
                viewport === 'tablet' ? 'bg-slate-800 text-sky-400' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Tablet className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewport('mobile')}
              title="Mobile View"
              className={`p-1.5 rounded-md transition-all ${
                viewport === 'mobile' ? 'bg-slate-800 text-sky-400' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          
          {/* Presets Selector Modal Button */}
          <button
            onClick={onOpenPresetsModal}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-all flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Industry</span> Presets
          </button>

          {/* Leads Inbox */}
          <button
            onClick={onOpenLeadsModal}
            className="relative px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-all flex items-center gap-1.5"
          >
            <Inbox className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Captured</span> Leads
            {leadCount > 0 && (
              <span className="ml-1 bg-emerald-500 text-slate-950 font-bold px-1.5 py-0.2 rounded-full text-[10px]">
                {leadCount}
              </span>
            )}
          </button>

          {/* Copy HTML */}
          <button
            onClick={onCopyCode}
            className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition-all flex items-center gap-1.5 shadow-sm shadow-indigo-600/30"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{copied ? 'Copied!' : 'Copy HTML'}</span>
          </button>

          {/* Download HTML */}
          <button
            onClick={onDownloadCode}
            title="Download index.html"
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all"
          >
            <Download className="w-4 h-4" />
          </button>

          {/* Pop out preview */}
          <button
            onClick={onOpenNewWindow}
            title="Open Landing Page in New Tab"
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all"
          >
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Mobile Tab bar */}
      <div className="flex md:hidden border-t border-slate-800 bg-slate-950 px-2 py-1 justify-around text-xs">
        <button
          onClick={() => setActiveTab('split')}
          className={`px-3 py-1 rounded-md ${activeTab === 'split' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
        >
          Studio
        </button>
        <button
          onClick={() => setActiveTab('preview')}
          className={`px-3 py-1 rounded-md ${activeTab === 'preview' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
        >
          Preview
        </button>
        <button
          onClick={() => setActiveTab('edit')}
          className={`px-3 py-1 rounded-md ${activeTab === 'edit' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
        >
          Controls
        </button>
        <button
          onClick={() => setActiveTab('code')}
          className={`px-3 py-1 rounded-md ${activeTab === 'code' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
        >
          Code
        </button>
      </div>
    </header>
  );
};
