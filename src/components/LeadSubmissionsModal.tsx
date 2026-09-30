import React from 'react';
import { LeadSubmission } from '../types';
import { Inbox, X, Trash2, Download, UserCheck, Phone, Mail, Clock } from 'lucide-react';

interface LeadSubmissionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  leads: LeadSubmission[];
  onClearLeads: () => void;
}

export const LeadSubmissionsModal: React.FC<LeadSubmissionsModalProps> = ({
  isOpen,
  onClose,
  leads,
  onClearLeads,
}) => {
  if (!isOpen) return null;

  const handleExportCSV = () => {
    if (leads.length === 0) return;
    const headers = ['Full Name', 'Phone Number', 'Email Address', 'Timestamp', 'Business Name'];
    const rows = leads.map((l) => [l.fullName, l.phone, l.email, l.timestamp, l.businessName]);
    const csvContent = [headers.join(','), ...rows.map((r) => r.map((c) => `"${c}"`).join(','))].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `leads_export_${Date.now()}.csv`;
    link.click();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Inbox className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-100">Captured Leads Inbox</h3>
              <p className="text-xs text-slate-400">
                Form submissions captured in real-time from your landing page preview
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

        {/* Content Body */}
        <div className="p-4 flex-1 overflow-y-auto">
          {leads.length === 0 ? (
            <div className="text-center py-12 text-slate-400 space-y-3">
              <Inbox className="w-12 h-12 mx-auto text-slate-600" />
              <p className="text-sm font-medium">No lead submissions recorded yet.</p>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Test submitting the lead capture form in the live preview canvas to see entries record here live!
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {leads.map((lead) => (
                <div
                  key={lead.id}
                  className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm hover:border-slate-700 transition-all"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-200 text-sm">{lead.fullName}</span>
                      <span className="text-[10px] bg-indigo-950 text-indigo-300 border border-indigo-800/50 px-2 py-0.5 rounded-full">
                        {lead.businessName}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        <Phone className="w-3 h-3 text-sky-400" />
                        {lead.phone}
                      </span>
                      <span className="flex items-center gap-1">
                        <Mail className="w-3 h-3 text-emerald-400" />
                        {lead.email}
                      </span>
                    </div>
                  </div>
                  <div className="text-right text-[11px] text-slate-500 flex items-center gap-1 self-start sm:self-center">
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{lead.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {leads.length > 0 && (
          <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
            <button
              onClick={onClearLeads}
              className="px-3 py-1.5 text-xs text-rose-400 hover:text-rose-300 font-medium flex items-center gap-1 transition-all"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear All Leads
            </button>

            <button
              onClick={handleExportCSV}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs rounded-xl flex items-center gap-1.5 transition-all shadow-md"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
