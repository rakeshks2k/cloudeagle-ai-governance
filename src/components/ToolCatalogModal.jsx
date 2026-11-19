import React, { useState } from 'react';
import { 
  X, 
  Cpu, 
  Search, 
  ShieldCheck, 
  ShieldAlert, 
  AlertCircle, 
  ChevronRight,
  ArrowUpRight,
  ExternalLink
} from 'lucide-react';
import { TOOLS_DATA } from '../data/mockData';

export default function ToolCatalogModal({ isOpen, onClose, onSelectTool }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  if (!isOpen) return null;

  const filteredTools = TOOLS_DATA.filter((tool) => {
    if (statusFilter !== 'ALL' && tool.status !== statusFilter) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return (
        tool.name.toLowerCase().includes(q) ||
        tool.vendor.toLowerCase().includes(q) ||
        tool.category.toLowerCase().includes(q) ||
        tool.topDepartment.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const approvedCount = TOOLS_DATA.filter(t => t.status === 'approved').length;
  const shadowCount = TOOLS_DATA.filter(t => t.status === 'shadow').length;
  const reviewCount = TOOLS_DATA.filter(t => t.status === 'review').length;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 transition-opacity">
      <div className="bg-white rounded-2xl max-w-4xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center">
              <Cpu className="w-5 h-5" strokeWidth={2} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-[18px] font-bold text-slate-900 tracking-tight">
                  Enterprise AI Tool Catalog
                </h3>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                  {TOOLS_DATA.length} Cataloged Tools
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Full inventory of sanctioned enterprise licenses, pending evaluations, and discovered shadow AI software.
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

        {/* Filter Cards */}
        <div className="p-5 sm:p-6 pb-3 grid grid-cols-1 sm:grid-cols-3 gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setStatusFilter('approved')}
            className={`p-3 rounded-xl border text-left transition cursor-pointer ${
              statusFilter === 'approved'
                ? 'bg-slate-100 border-slate-400 ring-2 ring-slate-200'
                : 'bg-slate-50 border-slate-200/80 hover:bg-slate-100/60'
            }`}
          >
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block mb-1">
              Sanctioned & Approved ({approvedCount})
            </span>
            <div className="text-[18px] font-bold text-slate-900">
              Enterprise Contracts
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">SSO & Zero Data Retention guaranteed</p>
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter('shadow')}
            className={`p-3 rounded-xl border text-left transition cursor-pointer ${
              statusFilter === 'shadow'
                ? 'bg-rose-50/80 border-rose-300 ring-2 ring-rose-200'
                : 'bg-slate-50 border-slate-200/80 hover:bg-slate-100/60'
            }`}
          >
            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700 block mb-1">
              Shadow AI Discovered ({shadowCount})
            </span>
            <div className="text-[18px] font-bold text-slate-900">
              Personal Accounts
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">Expensed on corporate cards</p>
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter('review')}
            className={`p-3 rounded-xl border text-left transition cursor-pointer ${
              statusFilter === 'review'
                ? 'bg-amber-50/80 border-amber-300 ring-2 ring-amber-200'
                : 'bg-slate-50 border-slate-200/80 hover:bg-slate-100/60'
            }`}
          >
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 block mb-1">
              In Evaluation ({reviewCount})
            </span>
            <div className="text-[18px] font-bold text-slate-900">
              Pilot Programs
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">Security & procurement review</p>
          </button>
        </div>

        {/* Search Bar */}
        <div className="px-5 sm:px-6 pb-3 flex items-center justify-between gap-3 shrink-0 flex-wrap">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search tool name, vendor, category, or department..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-8.5 bg-slate-50 hover:bg-white border border-slate-200 text-xs text-slate-900 rounded-xl pl-8 pr-3 focus:bg-white focus:outline-none focus:border-slate-800 transition"
            />
          </div>

          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-slate-400 font-medium mr-1">Status:</span>
            {['ALL', 'approved', 'shadow', 'review'].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setStatusFilter(st)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold capitalize transition cursor-pointer ${
                  statusFilter === st
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Tools Table / Cards */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-2 space-y-2">
          {filteredTools.map((tool, idx) => {
            const isShadow = tool.status === 'shadow';
            const isReview = tool.status === 'review';

            return (
              <div
                key={tool.id}
                onClick={() => {
                  onClose();
                  onSelectTool(tool);
                }}
                className="p-3.5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50 transition cursor-pointer flex items-center justify-between gap-4 shadow-2xs group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-xs font-semibold text-slate-400 w-5">
                    {idx + 1}.
                  </span>
                  
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-[14px] group-hover:text-slate-700 transition">
                        {tool.name}
                      </span>
                      
                      {isShadow ? (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 border border-rose-200">
                          Shadow AI
                        </span>
                      ) : isReview ? (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200">
                          In Review
                        </span>
                      ) : (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200 inline-flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3 text-emerald-600" />
                          Approved
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                      <span>Vendor: <strong className="text-slate-700">{tool.vendor}</strong></span>
                      <span className="text-slate-300">•</span>
                      <span>Category: {tool.category}</span>
                      <span className="text-slate-300">•</span>
                      <span>Risk: <strong className={tool.riskScore > 50 ? 'text-rose-600' : 'text-emerald-700'}>{tool.riskScore}/100</strong></span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <div className="font-bold text-slate-900 text-[14px] tabular-nums">
                      ${tool.spend.toLocaleString()}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {tool.activeUsers} users • ${tool.costPerUser}/seat
                    </div>
                  </div>

                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-700 transition" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between shrink-0">
          <span className="text-xs text-slate-500">
            Showing {filteredTools.length} of {TOOLS_DATA.length} tools
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
