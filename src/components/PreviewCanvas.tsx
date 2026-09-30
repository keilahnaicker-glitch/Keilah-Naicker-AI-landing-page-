import React, { useEffect, useRef, useState } from 'react';
import { Monitor, Tablet, Smartphone, RefreshCw, ZoomIn, ZoomOut, Check, Sparkles, ExternalLink, ShieldCheck } from 'lucide-react';
import { LeadSubmission } from '../types';

interface PreviewCanvasProps {
  htmlCode: string;
  viewport: 'desktop' | 'tablet' | 'mobile';
  setViewport: (vp: 'desktop' | 'tablet' | 'mobile') => void;
  onLeadCaptured: (lead: LeadSubmission) => void;
  onOpenNewWindow: () => void;
}

export const PreviewCanvas: React.FC<PreviewCanvasProps> = ({
  htmlCode,
  viewport,
  setViewport,
  onLeadCaptured,
  onOpenNewWindow,
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [zoom, setZoom] = useState<number>(100);
  const [lastSubmissionToast, setLastSubmissionToast] = useState<string | null>(null);

  // Listen for iframe lead submissions
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'LEAD_SUBMISSION') {
        const { fullName, phone, email, businessName } = event.data.data || {};
        if (fullName) {
          const newLead: LeadSubmission = {
            id: 'lead-' + Date.now(),
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            fullName,
            phone: phone || 'N/A',
            email: email || 'N/A',
            businessName: businessName || 'Landing Page Lead',
          };
          onLeadCaptured(newLead);
          setLastSubmissionToast(`🎉 Lead Captured: ${fullName} (${email})`);
          setTimeout(() => setLastSubmissionToast(null), 5000);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onLeadCaptured]);

  // Determine viewport width style
  const getViewportWidth = () => {
    switch (viewport) {
      case 'mobile':
        return '375px';
      case 'tablet':
        return '768px';
      case 'desktop':
      default:
        return '100%';
    }
  };

  const handleRefresh = () => {
    if (iframeRef.current) {
      iframeRef.current.srcdoc = htmlCode;
    }
  };

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-2xl flex flex-col h-full overflow-hidden shadow-2xl relative">
      
      {/* Top Device & Zoom Bar */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 py-2.5 flex items-center justify-between text-slate-300 text-xs">
        
        {/* Device Mode Selectors */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => setViewport('desktop')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all ${
              viewport === 'desktop' ? 'bg-indigo-600 text-white font-medium' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Desktop</span>
          </button>
          <button
            onClick={() => setViewport('tablet')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all ${
              viewport === 'tablet' ? 'bg-indigo-600 text-white font-medium' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Tablet className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Tablet (768px)</span>
          </button>
          <button
            onClick={() => setViewport('mobile')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-all ${
              viewport === 'mobile' ? 'bg-indigo-600 text-white font-medium' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Mobile (375px)</span>
          </button>
        </div>

        {/* Live Status indicator */}
        <div className="hidden md:flex items-center gap-2 text-[11px] text-emerald-400 font-medium bg-emerald-950/40 border border-emerald-800/40 px-2.5 py-0.5 rounded-full">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>Live Form Interactivity Active</span>
        </div>

        {/* Zoom & Popout */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-slate-950 px-2 py-1 rounded-lg border border-slate-800">
            <button
              onClick={() => setZoom((z) => Math.max(50, z - 10))}
              className="text-slate-400 hover:text-slate-200 p-0.5"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="font-mono text-[11px] text-slate-300 w-8 text-center">{zoom}%</span>
            <button
              onClick={() => setZoom((z) => Math.min(125, z + 10))}
              className="text-slate-400 hover:text-slate-200 p-0.5"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={handleRefresh}
            title="Reload Preview"
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onOpenNewWindow}
            title="Open in New Window"
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all flex items-center gap-1"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Lead Capture Toast Banner */}
      {lastSubmissionToast && (
        <div className="absolute top-14 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white px-4 py-2 rounded-xl shadow-2xl font-semibold text-xs flex items-center gap-2 animate-bounce border border-emerald-400">
          <ShieldCheck className="w-4 h-4 text-emerald-200" />
          <span>{lastSubmissionToast}</span>
        </div>
      )}

      {/* Canvas Viewport Frame */}
      <div className="flex-1 bg-slate-900/50 p-4 overflow-auto flex justify-center items-start">
        <div
          className={`transition-all duration-300 ease-in-out bg-white rounded-xl shadow-2xl border border-slate-700 overflow-hidden ${
            viewport !== 'desktop' ? 'my-4 ring-8 ring-slate-800/80' : 'w-full h-full'
          }`}
          style={{
            width: getViewportWidth(),
            height: viewport === 'desktop' ? '100%' : '840px',
            transform: `scale(${zoom / 100})`,
            transformOrigin: 'top center',
          }}
        >
          <iframe
            ref={iframeRef}
            srcDoc={htmlCode}
            title="AI Generated Landing Page Live Preview"
            className="w-full h-full border-0"
            sandbox="allow-scripts allow-forms allow-same-origin allow-modals"
          />
        </div>
      </div>

    </div>
  );
};
