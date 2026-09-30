import React from 'react';
import { PresetTemplate } from '../types';
import { PRESET_TEMPLATES } from '../data/presets';
import { Sparkles, X, ArrowRight, Building, CheckCircle } from 'lucide-react';

interface PresetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPreset: (preset: PresetTemplate) => void;
  currentPresetId: string;
}

export const PresetModal: React.FC<PresetModalProps> = ({
  isOpen,
  onClose,
  onSelectPreset,
  currentPresetId,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-100">Industry Preset Templates</h3>
              <p className="text-xs text-slate-400">
                Pick a pre-configured high-converting industry blueprint to instantly populate variables and load a sample page
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Grid Body */}
        <div className="p-4 flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          {PRESET_TEMPLATES.map((preset) => {
            const isSelected = currentPresetId === preset.id;
            return (
              <div
                key={preset.id}
                onClick={() => {
                  onSelectPreset(preset);
                  onClose();
                }}
                className={`bg-slate-950 border rounded-xl p-4 cursor-pointer transition-all flex flex-col justify-between hover:scale-[1.01] ${
                  isSelected
                    ? 'border-indigo-500 ring-2 ring-indigo-500/20 shadow-lg shadow-indigo-500/10'
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-semibold bg-slate-800 text-indigo-300 px-2 py-0.5 rounded-full uppercase tracking-wider">
                      {preset.category}
                    </span>
                    {isSelected && (
                      <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-bold">
                        <CheckCircle className="w-3.5 h-3.5" />
                        Active
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-sm text-slate-100 mb-1">{preset.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed mb-3">{preset.description}</p>
                </div>

                <div className="pt-3 border-t border-slate-900 flex items-center justify-between text-xs text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-3 h-3 rounded-full border border-slate-700"
                      style={{ backgroundColor: preset.variables.primaryColor }}
                    />
                    <span
                      className="w-3 h-3 rounded-full border border-slate-700"
                      style={{ backgroundColor: preset.variables.accentColor }}
                    />
                    <span className="text-[11px] text-slate-500">{preset.variables.companyName}</span>
                  </div>
                  <span className="text-indigo-400 font-medium flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Load <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
