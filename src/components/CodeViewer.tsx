import React, { useState } from 'react';
import { Copy, Check, Download, Code2, Search, Edit3, Save } from 'lucide-react';

interface CodeViewerProps {
  htmlCode: string;
  setHtmlCode: (code: string) => void;
  onCopyCode: () => void;
  onDownloadCode: () => void;
  copied: boolean;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({
  htmlCode,
  setHtmlCode,
  onCopyCode,
  onDownloadCode,
  copied,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(htmlCode);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSaveEdit = () => {
    setHtmlCode(editedText);
    setIsEditing(false);
  };

  const handleStartEdit = () => {
    setEditedText(htmlCode);
    setIsEditing(true);
  };

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-2xl flex flex-col h-full overflow-hidden shadow-2xl">
      
      {/* Code Viewer Header */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 py-2.5 flex items-center justify-between text-slate-300 text-xs">
        <div className="flex items-center gap-2">
          <Code2 className="w-4 h-4 text-sky-400" />
          <span className="font-semibold text-slate-200">Production-Ready Single HTML + Embedded CSS</span>
          <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full font-mono">
            {htmlCode.length.toLocaleString()} chars
          </span>
        </div>

        <div className="flex items-center gap-2">
          {isEditing ? (
            <button
              onClick={handleSaveEdit}
              className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium transition-all flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              Apply Changes
            </button>
          ) : (
            <button
              onClick={handleStartEdit}
              className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg font-medium transition-all flex items-center gap-1.5"
            >
              <Edit3 className="w-3.5 h-3.5" />
              Edit HTML Directly
            </button>
          )}

          <button
            onClick={onCopyCode}
            className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition-all flex items-center gap-1.5"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>

          <button
            onClick={onDownloadCode}
            className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg font-medium transition-all flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download</span>
          </button>
        </div>
      </div>

      {/* Code Body Area */}
      <div className="flex-1 overflow-auto p-4 font-mono text-xs text-slate-300 leading-relaxed bg-slate-950">
        {isEditing ? (
          <textarea
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            className="w-full h-full bg-slate-950 text-sky-200 font-mono text-xs p-3 focus:outline-none resize-none border border-slate-800 rounded-xl"
            spellCheck={false}
          />
        ) : (
          <pre className="whitespace-pre-wrap break-all selection:bg-indigo-900 selection:text-indigo-100">
            <code>{htmlCode}</code>
          </pre>
        )}
      </div>

    </div>
  );
};
