import React, { useState } from 'react';
import { LandingPageVariables, PresetTemplate } from '../types';
import { PRESET_TEMPLATES } from '../data/presets';
import { Wand2, RefreshCw, Palette, Building2, ShieldAlert, MousePointerClick, PhoneCall, Sparkles, CheckCircle2, ChevronRight, HelpCircle } from 'lucide-react';

interface GeneratorFormProps {
  variables: LandingPageVariables;
  setVariables: React.Dispatch<React.SetStateAction<LandingPageVariables>>;
  onGenerate: () => void;
  onRefine: (instruction: string) => void;
  isGenerating: boolean;
  isRefining: boolean;
  currentPresetId: string;
  onSelectPreset: (preset: PresetTemplate) => void;
}

const COLOR_PALETTES = [
  { name: 'Sky & Slate (HVAC/Home)', primary: '#0284c7', secondary: '#0f172a', accent: '#f97316' },
  { name: 'Indigo & Dark (B2B SaaS)', primary: '#6366f1', secondary: '#090d16', accent: '#10b981' },
  { name: 'Amber & Forest (Solar/Eco)', primary: '#f59e0b', secondary: '#1e293b', accent: '#16a34a' },
  { name: 'Teal & Navy (Medical/Dental)', primary: '#0d9488', secondary: '#0f172a', accent: '#0284c7' },
  { name: 'Crimson & Gold (Legal/Finance)', primary: '#991b1b', secondary: '#18181b', accent: '#d97706' },
  { name: 'Red & Yellow (Fitness/Gym)', primary: '#dc2626', secondary: '#090d16', accent: '#eab308' },
];

export const GeneratorForm: React.FC<GeneratorFormProps> = ({
  variables,
  setVariables,
  onGenerate,
  onRefine,
  isGenerating,
  isRefining,
  currentPresetId,
  onSelectPreset,
}) => {
  const [refineText, setRefineText] = useState('');
  const [activeAccordion, setActiveAccordion] = useState<'variables' | 'colors' | 'company' | 'refine'>('variables');

  const handleChange = (field: keyof LandingPageVariables, value: string) => {
    setVariables((prev) => ({ ...prev, [field]: value }));
  };

  const handleApplyPalette = (p: typeof COLOR_PALETTES[0]) => {
    setVariables((prev) => ({
      ...prev,
      primaryColor: p.primary,
      secondaryColor: p.secondary,
      accentColor: p.accent,
    }));
  };

  const handleRefineSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!refineText.trim()) return;
    onRefine(refineText);
    setRefineText('');
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl text-slate-200 flex flex-col gap-6 max-h-full overflow-y-auto">
      
      {/* Header & Preset Selector Chips */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-indigo-400 font-semibold text-sm">
            <Wand2 className="w-4 h-4" />
            <span>AI CRO Studio Setup</span>
          </div>
          <span className="text-[11px] text-slate-400 bg-slate-800 px-2.5 py-0.5 rounded-full">
            Gemini 3.6 Flash
          </span>
        </div>

        {/* Quick Industry Presets */}
        <p className="text-xs text-slate-400 mb-2">Quick Presets:</p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {PRESET_TEMPLATES.map((preset) => (
            <button
              key={preset.id}
              onClick={() => onSelectPreset(preset)}
              className={`text-xs px-2.5 py-1 rounded-lg border transition-all flex items-center gap-1 ${
                currentPresetId === preset.id
                  ? 'bg-indigo-600/30 border-indigo-500 text-indigo-200 font-medium'
                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              <span>{preset.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Accordion Tabs */}
      <div className="space-y-3">
        
        {/* Section 1: Core Landing Page Variables */}
        <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950/60">
          <button
            onClick={() => setActiveAccordion(activeAccordion === 'variables' ? 'variables' : 'variables')}
            className="w-full px-4 py-3 bg-slate-950 flex items-center justify-between text-left font-medium text-sm text-slate-200 border-b border-slate-800/60"
          >
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-sky-400" />
              <span>Core Service & Copy Variables</span>
            </div>
            <span className="text-xs text-sky-400 font-mono">Step 1</span>
          </button>

          <div className="p-4 space-y-4">
            
            {/* Business Type */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center justify-between">
                <span>Business Type / Industry</span>
                <span className="text-[10px] text-slate-500">[Insert Business]</span>
              </label>
              <input
                type="text"
                value={variables.businessType}
                onChange={(e) => handleChange('businessType', e.target.value)}
                placeholder="e.g. HVAC & Home Services, SaaS Platform, Dental Clinic"
                className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Specific Service */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center justify-between">
                <span>Specific Service Offered</span>
                <span className="text-[10px] text-slate-500">[Insert Service]</span>
              </label>
              <input
                type="text"
                value={variables.service}
                onChange={(e) => handleChange('service', e.target.value)}
                placeholder="e.g. Summer Emergency AC Repair, AI Content Generator"
                className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Primary Customer Pain Point */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center justify-between">
                <span>Primary Customer Pain Point</span>
                <span className="text-[10px] text-slate-500">[Customer Pain Point]</span>
              </label>
              <textarea
                rows={2}
                value={variables.painPoint}
                onChange={(e) => handleChange('painPoint', e.target.value)}
                placeholder="e.g. High electric bills and broken air conditioning during summer heatwaves"
                className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Call-to-Action Button Text */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 flex items-center justify-between">
                <span>Call-To-Action Button Label</span>
                <span className="text-[10px] text-slate-500">[Insert CTA Text]</span>
              </label>
              <input
                type="text"
                value={variables.ctaText}
                onChange={(e) => handleChange('ctaText', e.target.value)}
                placeholder="e.g. Get My Free AC Inspection & Estimate"
                className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-2 text-xs text-slate-100 font-medium placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

          </div>
        </div>

        {/* Section 2: Brand Palette & Styling */}
        <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950/60">
          <button
            onClick={() => setActiveAccordion(activeAccordion === 'colors' ? 'variables' : 'colors')}
            className="w-full px-4 py-3 bg-slate-950 flex items-center justify-between text-left font-medium text-sm text-slate-200 border-b border-slate-800/60"
          >
            <div className="flex items-center gap-2">
              <Palette className="w-4 h-4 text-emerald-400" />
              <span>Brand Color Palette</span>
            </div>
            <span className="text-xs text-emerald-400 font-mono">Step 2</span>
          </button>

          <div className="p-4 space-y-3">
            
            <p className="text-xs text-slate-400">Quick Palette Presets:</p>
            <div className="grid grid-cols-2 gap-2 mb-3">
              {COLOR_PALETTES.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => handleApplyPalette(p)}
                  className="bg-slate-900 hover:bg-slate-850 p-2 rounded-lg border border-slate-800 text-left transition-all flex items-center justify-between"
                >
                  <span className="text-[11px] text-slate-300 truncate">{p.name}</span>
                  <div className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: p.primary }} />
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: p.secondary }} />
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: p.accent }} />
                  </div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Primary Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={variables.primaryColor}
                    onChange={(e) => handleChange('primaryColor', e.target.value)}
                    className="w-7 h-7 rounded border-none bg-transparent cursor-pointer"
                  />
                  <input
                    type="text"
                    value={variables.primaryColor}
                    onChange={(e) => handleChange('primaryColor', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-[11px] font-mono text-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Secondary (Dark)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={variables.secondaryColor}
                    onChange={(e) => handleChange('secondaryColor', e.target.value)}
                    className="w-7 h-7 rounded border-none bg-transparent cursor-pointer"
                  />
                  <input
                    type="text"
                    value={variables.secondaryColor}
                    onChange={(e) => handleChange('secondaryColor', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-[11px] font-mono text-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">CTA Accent</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={variables.accentColor}
                    onChange={(e) => handleChange('accentColor', e.target.value)}
                    className="w-7 h-7 rounded border-none bg-transparent cursor-pointer"
                  />
                  <input
                    type="text"
                    value={variables.accentColor}
                    onChange={(e) => handleChange('accentColor', e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded px-2 py-1 text-[11px] font-mono text-slate-200"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Section 3: Company Info */}
        <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950/60">
          <button
            onClick={() => setActiveAccordion(activeAccordion === 'company' ? 'variables' : 'company')}
            className="w-full px-4 py-3 bg-slate-950 flex items-center justify-between text-left font-medium text-sm text-slate-200 border-b border-slate-800/60"
          >
            <div className="flex items-center gap-2">
              <PhoneCall className="w-4 h-4 text-amber-400" />
              <span>Company Branding & Contact Details</span>
            </div>
            <span className="text-xs text-amber-400 font-mono">Step 3</span>
          </button>

          <div className="p-4 space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Company Name</label>
              <input
                type="text"
                value={variables.companyName}
                onChange={(e) => handleChange('companyName', e.target.value)}
                placeholder="Apex Air & Heating Solutions"
                className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Phone Number</label>
                <input
                  type="text"
                  value={variables.phoneNumber || ''}
                  onChange={(e) => handleChange('phoneNumber', e.target.value)}
                  placeholder="(800) 555-0199"
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                <input
                  type="text"
                  value={variables.emailAddress || ''}
                  onChange={(e) => handleChange('emailAddress', e.target.value)}
                  placeholder="contact@apex.com"
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Additional Copy / Special Offers</label>
              <textarea
                rows={2}
                value={variables.additionalNotes || ''}
                onChange={(e) => handleChange('additionalNotes', e.target.value)}
                placeholder="e.g. Include $50 Off Coupon Special and 100% Satisfaction Money-Back Guarantee."
                className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

      </div>

      {/* Primary AI Generate Button */}
      <button
        onClick={onGenerate}
        disabled={isGenerating || isRefining}
        className={`w-full py-3.5 px-4 rounded-xl font-bold text-sm text-white transition-all shadow-lg flex items-center justify-center gap-2 ${
          isGenerating || isRefining
            ? 'bg-slate-800 text-slate-400 cursor-not-allowed border border-slate-700'
            : 'bg-gradient-to-r from-indigo-600 via-sky-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:scale-[1.01]'
        }`}
      >
        {isGenerating ? (
          <>
            <RefreshCw className="w-4 h-4 animate-spin text-sky-400" />
            <span>Generating High-Converting Landing Page...</span>
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Generate Premium Landing Page</span>
          </>
        )}
      </button>

      {/* AI Refinement Prompt Box */}
      <div className="border-t border-slate-800 pt-4">
        <label className="block text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Refine Current Page with AI Instruction</span>
        </label>
        
        <form onSubmit={handleRefineSubmit} className="flex gap-2">
          <input
            type="text"
            value={refineText}
            onChange={(e) => setRefineText(e.target.value)}
            placeholder='e.g. "Add a pricing calculator section" or "Make hero headline bolder"'
            className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
          <button
            type="submit"
            disabled={isRefining || !refineText.trim()}
            className="px-3 py-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 text-white text-xs font-semibold rounded-lg transition-all flex items-center gap-1"
          >
            {isRefining ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : 'Refine'}
          </button>
        </form>
      </div>

    </div>
  );
};
