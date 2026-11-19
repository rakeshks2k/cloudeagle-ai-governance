import React, { useState } from 'react';
import { 
  X, 
  ShieldAlert, 
  AlertTriangle, 
  ShieldCheck, 
  Search, 
  Filter,
  CheckCircle2,
  Lock,
  ArrowUpRight,
  Shield,
  User,
  Building2
} from 'lucide-react';
import { DLP_INCIDENTS_DATA } from '../data/mockData';

export default function DLPPolicyModal({ isOpen, onClose }) {
  const [filterSeverity, setFilterSeverity] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [incidents, setIncidents] = useState(DLP_INCIDENTS_DATA);
  const [toastMessage, setToastMessage] = useState(null);

  if (!isOpen) return null;

  const filteredIncidents = incidents.filter((item) => {
    if (filterSeverity !== 'ALL' && item.severity !== filterSeverity) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return (
        item.user.toLowerCase().includes(q) ||
        item.department.toLowerCase().includes(q) ||
        item.tool.toLowerCase().includes(q) ||
        item.type.toLowerCase().includes(q) ||
        item.snippet.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleAction = (incident, actionName) => {
    setToastMessage(`Action recorded: ${actionName} for ${incident.user}`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const criticalCount = incidents.filter(i => i.severity === 'critical').length;
  const highCount = incidents.filter(i => i.severity === 'high').length;
  const mediumCount = incidents.filter(i => i.severity === 'medium').length;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 transition-opacity">
      <div className="bg-white rounded-2xl max-w-4xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <ShieldAlert className="w-5 h-5" strokeWidth={2} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-[18px] font-bold text-slate-900 tracking-tight">
                  DLP Policy Violations & Incident Logs
                </h3>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                  {incidents.length} Logged Alerts
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Real-time prompt leak interceptions across corporate endpoints and personal shadow AI tools.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-800 rounded-xl hover:bg-slate-50 transition cursor-pointer"
          >
            <X className="w-5 h-5" strokeWidth={2} />
          </button>
        </div>

        {/* Toast Feedback */}
        {toastMessage && (
          <div className="mx-6 mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center gap-2 shrink-0 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" strokeWidth={2.2} />
            <span className="font-semibold">{toastMessage}</span>
          </div>
        )}

        {/* Severity Summary Stat Cards */}
        <div className="p-5 sm:p-6 pb-3 grid grid-cols-1 sm:grid-cols-3 gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setFilterSeverity('critical')}
            className={`p-3.5 rounded-xl border text-left transition cursor-pointer ${
              filterSeverity === 'critical'
                ? 'bg-rose-50/80 border-rose-300 ring-2 ring-rose-200'
                : 'bg-slate-50 border-slate-200/80 hover:bg-slate-100/60'
            }`}
          >
            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700 block mb-1">
              Critical Leaks ({criticalCount})
            </span>
            <div className="text-[20px] font-bold text-slate-900 tabular-nums">
              Customer PII & Secrets
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">Blocked by Browser DLP Extension</p>
          </button>

          <button
            type="button"
            onClick={() => setFilterSeverity('high')}
            className={`p-3.5 rounded-xl border text-left transition cursor-pointer ${
              filterSeverity === 'high'
                ? 'bg-amber-50/80 border-amber-300 ring-2 ring-amber-200'
                : 'bg-slate-50 border-slate-200/80 hover:bg-slate-100/60'
            }`}
          >
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 block mb-1">
              High Severity ({highCount})
            </span>
            <div className="text-[20px] font-bold text-slate-900 tabular-nums">
              Internal IP & Code
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">Quarantined for CISO review</p>
          </button>

          <button
            type="button"
            onClick={() => setFilterSeverity('medium')}
            className={`p-3.5 rounded-xl border text-left transition cursor-pointer ${
              filterSeverity === 'medium'
                ? 'bg-slate-100 border-slate-400 ring-2 ring-slate-200'
                : 'bg-slate-50 border-slate-200/80 hover:bg-slate-100/60'
            }`}
          >
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 block mb-1">
              Medium Severity ({mediumCount})
            </span>
            <div className="text-[20px] font-bold text-slate-900 tabular-nums">
              Asset & Data Queries
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">Audit logged to Okta</p>
          </button>
        </div>

        {/* Search & Filter Controls */}
        <div className="px-5 sm:px-6 pb-3 flex items-center justify-between gap-3 shrink-0 flex-wrap">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search user, department, tool, or policy snippet..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-8.5 bg-slate-50 hover:bg-white border border-slate-200 text-xs text-slate-900 rounded-xl pl-8 pr-3 focus:bg-white focus:outline-none focus:border-slate-800 transition"
            />
          </div>

          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-slate-400 font-medium mr-1">Filter:</span>
            {['ALL', 'critical', 'high', 'medium'].map((sev) => (
              <button
                key={sev}
                type="button"
                onClick={() => setFilterSeverity(sev)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold capitalize transition cursor-pointer ${
                  filterSeverity === sev
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {sev}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Incident Logs List */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-2 space-y-3">
          {filteredIncidents.length === 0 ? (
            <div className="p-8 text-center bg-slate-50 rounded-xl border border-slate-200">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
              <p className="font-semibold text-slate-900 text-xs">No policy violations match criteria</p>
              <button
                type="button"
                onClick={() => { setFilterSeverity('ALL'); setSearchQuery(''); }}
                className="text-xs text-slate-600 underline mt-1 cursor-pointer font-medium"
              >
                Reset filters
              </button>
            </div>
          ) : (
            filteredIncidents.map((incident) => {
              const isCrit = incident.severity === 'critical';
              const isHigh = incident.severity === 'high';

              return (
                <div
                  key={incident.id}
                  className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all space-y-2 text-xs shadow-2xs"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] uppercase tracking-wider border ${
                        isCrit
                          ? 'bg-rose-50 text-rose-700 border-rose-200'
                          : isHigh
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : 'bg-slate-100 text-slate-700 border-slate-200'
                      }`}>
                        {incident.severity}
                      </span>
                      <span className="font-bold text-slate-900 text-[13px]">
                        {incident.type}
                      </span>
                      <span className="text-slate-400">•</span>
                      <span className="font-semibold text-slate-700">
                        {incident.tool}
                      </span>
                    </div>

                    <span className="text-[11px] text-slate-400 font-mono shrink-0">
                      {incident.timestamp}
                    </span>
                  </div>

                  <p className="text-slate-600 bg-slate-50 border border-slate-100 rounded-lg p-2 font-mono text-[11.5px] leading-relaxed">
                    {incident.snippet}
                  </p>

                  <div className="flex items-center justify-between pt-1 text-[11px] text-slate-500">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="inline-flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-slate-400 shrink-0" strokeWidth={2} />
                        <strong className="text-slate-800 font-semibold">{incident.user}</strong>
                        <span className="text-slate-400">({incident.role})</span>
                      </span>

                      <span className="text-slate-300">•</span>

                      <span className="inline-flex items-center gap-1.5">
                        <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" strokeWidth={2} />
                        <span className="text-slate-700 font-medium">{incident.department}</span>
                      </span>

                      <span className="text-slate-300">•</span>

                      <span className={`text-[11.5px] font-medium ${
                        incident.status.toLowerCase().includes('blocked') || incident.status.toLowerCase().includes('quarantine')
                          ? 'text-[#E64D5B]'
                          : incident.status.toLowerCase().includes('flagged') || incident.status.toLowerCase().includes('audit')
                            ? 'text-[#D97706]'
                            : incident.status.toLowerCase().includes('sanitized') || incident.status.toLowerCase().includes('masked')
                              ? 'text-[#0E9F6E]'
                              : incident.status.toLowerCase().includes('intercepted')
                                ? 'text-[#3152F5]'
                                : 'text-[#60738F]'
                      }`}>
                        {incident.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleAction(incident, 'Security Warning Issued')}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition cursor-pointer"
                      >
                        Send Warning
                      </button>
                      <button
                        type="button"
                        onClick={() => handleAction(incident, 'Enforced Hard Block')}
                        className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold transition cursor-pointer"
                      >
                        Enforce Block
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between shrink-0">
          <span className="text-xs text-slate-500">
            Showing {filteredIncidents.length} of {incidents.length} total logged incidents
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition cursor-pointer"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
}
