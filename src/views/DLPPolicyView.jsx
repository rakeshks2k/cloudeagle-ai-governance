import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ShieldAlert, 
  Search, 
  CheckCircle2, 
  AlertTriangle,
  Lock,
  RotateCcw,
  User,
  Building2
} from 'lucide-react';
import { DLP_INCIDENTS_DATA } from '../data/mockData';

export default function DLPPolicyView({ onBack }) {
  const [filterSeverity, setFilterSeverity] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [incidents, setIncidents] = useState(DLP_INCIDENTS_DATA);
  const [toastMessage, setToastMessage] = useState(null);

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
    <div className="space-y-6 animate-in fade-in duration-150">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E2E9F2]">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-[28px] sm:text-[30px] font-bold text-[#12233F] tracking-tight leading-tight">
              Data Protection & Incident Logs
            </h1>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-[6px] bg-[#FEF2F2] text-[#E64D5B] border border-[#FECACA]">
              {incidents.length} Alerts Intercepted
            </span>
          </div>
          <p className="text-[13px] text-[#60738F] mt-1">
            Real-time log of sensitive data (customer info, API keys, confidential documents) intercepted before leaking into external AI tools.
          </p>
        </div>
      </div>

      {/* Toast Feedback */}
      {toastMessage && (
        <div className="p-3.5 bg-[#ECFDF5] border border-[#A7F3D0] rounded-[10px] text-xs text-[#0E9F6E] flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#0E9F6E] shrink-0" strokeWidth={2.2} />
            <span className="font-semibold text-[#12233F]">{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-[#60738F] hover:text-[#12233F] cursor-pointer">
            ✕
          </button>
        </div>
      )}

      {/* Severity Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <button
          type="button"
          onClick={() => setFilterSeverity(filterSeverity === 'critical' ? 'ALL' : 'critical')}
          className={`p-5 rounded-[14px] border text-left transition cursor-pointer ${
            filterSeverity === 'critical'
              ? 'bg-[#FEF2F2] border-[#FECACA] ring-2 ring-[#E64D5B]/20'
              : 'bg-white border-[#E2E9F2] hover:border-[#CBD5E1] shadow-xs'
          }`}
        >
          <div className="mb-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#E64D5B]">
              Critical Leaks ({criticalCount})
            </span>
          </div>
          <div className="text-[22px] font-bold text-[#12233F] leading-tight">
            Customer Data & Passwords
          </div>
          <p className="text-xs text-[#60738F] mt-1">Blocked automatically at browser endpoint before reaching external models.</p>
        </button>

        <button
          type="button"
          onClick={() => setFilterSeverity(filterSeverity === 'high' ? 'ALL' : 'high')}
          className={`p-5 rounded-[14px] border text-left transition cursor-pointer ${
            filterSeverity === 'high'
              ? 'bg-[#FFFBEB] border-[#FDE68A] ring-2 ring-[#D99219]/20'
              : 'bg-white border-[#E2E9F2] hover:border-[#CBD5E1] shadow-xs'
          }`}
        >
          <div className="mb-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#D99219]">
              High Severity ({highCount})
            </span>
          </div>
          <div className="text-[22px] font-bold text-[#12233F] leading-tight">
            Internal Code & IP
          </div>
          <p className="text-xs text-[#60738F] mt-1">Sanitized or quarantined pending authorization by security team.</p>
        </button>

        <button
          type="button"
          onClick={() => setFilterSeverity(filterSeverity === 'medium' ? 'ALL' : 'medium')}
          className={`p-5 rounded-[14px] border text-left transition cursor-pointer ${
            filterSeverity === 'medium'
              ? 'bg-[#EFF6FF] border-[#BFDBFE] ring-2 ring-[#4385DF]/20'
              : 'bg-white border-[#E2E9F2] hover:border-[#CBD5E1] shadow-xs'
          }`}
        >
          <div className="mb-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#4385DF]">
              Medium Severity ({mediumCount})
            </span>
          </div>
          <div className="text-[22px] font-bold text-[#12233F] leading-tight">
            Internal Documents & Queries
          </div>
          <p className="text-xs text-[#60738F] mt-1">Logged to company security audit stream for compliance monitoring.</p>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-white rounded-[14px] border border-[#E2E9F2] shadow-xs">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-[#8B9BB2] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by user, department, tool name, or incident snippet..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-[38px] bg-[#F0F4F9] hover:bg-white border border-[#E2E9F2] text-[13px] text-[#12233F] rounded-[8px] pl-9 pr-3 focus:bg-white focus:outline-none focus:border-[#3152F5] transition"
          />
        </div>

        <div className="flex items-center gap-1.5 text-xs">
          <span className="text-[#8B9BB2] font-medium mr-1">Filter Severity:</span>
          {['ALL', 'critical', 'high', 'medium'].map((sev) => (
            <button
              key={sev}
              type="button"
              onClick={() => setFilterSeverity(sev)}
              className={`h-[32px] px-3 rounded-[6px] text-xs font-semibold capitalize transition cursor-pointer ${
                filterSeverity === sev
                  ? 'bg-[#3152F5] text-white shadow-xs'
                  : 'bg-[#F0F4F9] text-[#60738F] hover:bg-[#E2E9F2]'
              }`}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>

      {/* Incident Cards List */}
      <div className="space-y-3">
        {filteredIncidents.map((incident) => {
          const isCrit = incident.severity === 'critical';
          const isHigh = incident.severity === 'high';

          return (
            <div
              key={incident.id}
              className="p-5 rounded-[14px] border border-[#E2E9F2] bg-white hover:border-[#CBD5E1] transition-all space-y-3 shadow-xs text-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className={`px-2.5 py-0.5 rounded-[6px] font-semibold text-[11px] uppercase tracking-wider border ${
                    isCrit
                      ? 'bg-[#FEF2F2] text-[#E64D5B] border-[#FECACA]'
                      : isHigh
                      ? 'bg-[#FFFBEB] text-[#D99219] border-[#FDE68A]'
                      : 'bg-[#EFF6FF] text-[#4385DF] border-[#BFDBFE]'
                  }`}>
                    {incident.severity}
                  </span>
                  
                  <span className="font-semibold text-[#12233F] text-[15px]">
                    {incident.type}
                  </span>

                  <span className="text-[#8B9BB2]">•</span>

                  <span className="font-medium text-[#60738F]">
                    {incident.tool}
                  </span>
                </div>

                <span className="text-xs text-[#8B9BB2] font-mono">
                  {incident.timestamp}
                </span>
              </div>

              {/* Intercepted Prompt Content */}
              <div className="p-3 bg-[#F0F4F9] border border-[#E2E9F2] rounded-[8px] font-mono text-[12px] text-[#12233F] leading-relaxed">
                {incident.snippet}
              </div>

              {/* Identity & Remediation Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-[#E2E9F2] text-xs">
                <div className="flex items-center gap-2 text-[#60738F] flex-wrap">
                  {/* User icon and name */}
                  <span className="inline-flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#8B9BB2] shrink-0" strokeWidth={2} />
                    <strong className="text-[#12233F] font-semibold">{incident.user}</strong>
                    <span className="text-[#8B9BB2]">({incident.role})</span>
                  </span>

                  <span className="text-[#CBD5E1]">•</span>

                  {/* Department icon and name */}
                  <span className="inline-flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-[#8B9BB2] shrink-0" strokeWidth={2} />
                    <span className="text-[#60738F] font-medium">{incident.department}</span>
                  </span>

                  <span className="text-[#CBD5E1]">•</span>

                  {/* Status - Clean text only, no rectangle pill */}
                  <span className={`text-[12px] font-medium ${
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

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleAction(incident, 'Compliance Reminder Dispatched')}
                    className="h-8 px-3.5 rounded-[8px] bg-white hover:bg-[#F0F4F9] border border-[#E2E9F2] text-[#12233F] font-medium transition cursor-pointer"
                  >
                    Send Policy Warning
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAction(incident, 'Account Quarantine Enforced')}
                    className="h-8 px-3.5 rounded-[8px] bg-[#FEF2F2] hover:bg-[#FEE2E2] border border-[#FECACA] text-[#E64D5B] font-medium transition cursor-pointer shadow-xs"
                  >
                    Enforce Quarantine
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {filteredIncidents.length === 0 && (
          <div className="p-12 text-center bg-white rounded-[14px] border border-[#E2E9F2] text-[#60738F] text-xs">
            No policy violation alerts match your search.
          </div>
        )}
      </div>

    </div>
  );
}
