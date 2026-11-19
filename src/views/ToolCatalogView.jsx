import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Cpu, 
  Search, 
  ShieldCheck, 
  ShieldAlert, 
  ChevronRight, 
  Download,
  Filter
} from 'lucide-react';
import { TOOLS_DATA } from '../data/mockData';

export default function ToolCatalogView({ onBack, onSelectTool }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [categoryFilter, setCategoryFilter] = useState('ALL');

  const categories = ['ALL', ...new Set(TOOLS_DATA.map(t => t.category))];

  const filteredTools = TOOLS_DATA.filter((tool) => {
    if (statusFilter !== 'ALL' && tool.status !== statusFilter) return false;
    if (categoryFilter !== 'ALL' && tool.category !== categoryFilter) return false;
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
  const totalSpend = TOOLS_DATA.reduce((acc, t) => acc + t.spend, 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E2E9F2]">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-[28px] sm:text-[30px] font-bold text-[#12233F] tracking-tight leading-tight">
              Enterprise AI Tool Catalog
            </h1>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-[6px] bg-[#F0F4F9] text-[#60738F] border border-[#E2E9F2]">
              {TOOLS_DATA.length} Tools Tracked
            </span>
          </div>
          <p className="text-[13px] text-[#60738F] mt-1">
            Complete directory of all AI tools in use across the company, showing approved contracts, unapproved apps, and security posture.
          </p>
        </div>

        <div className="text-left sm:text-right shrink-0">
          <div className="text-xs text-[#8B9BB2] font-medium">Monthly AI Spend</div>
          <div className="text-[22px] font-bold text-[#12233F] tabular-nums">
            ${totalSpend.toLocaleString()}
            <span className="text-xs font-normal text-[#8B9BB2] ml-1">/mo</span>
          </div>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <button
          type="button"
          onClick={() => setStatusFilter(statusFilter === 'approved' ? 'ALL' : 'approved')}
          className={`p-5 rounded-[14px] border text-left transition cursor-pointer ${
            statusFilter === 'approved'
              ? 'bg-[#ECFDF5] border-[#A7F3D0] ring-2 ring-[#0E9F6E]/20'
              : 'bg-white border-[#E2E9F2] hover:border-[#CBD5E1] shadow-xs'
          }`}
        >
          <div className="mb-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#60738F]">
              Approved Enterprise Tools
            </span>
          </div>
          <div className="text-[28px] font-bold text-[#12233F] tabular-nums leading-tight">
            {approvedCount} Tools
          </div>
          <p className="text-xs text-[#60738F] mt-1">Officially contracted with enterprise SSO and zero training data retention.</p>
        </button>

        <button
          type="button"
          onClick={() => setStatusFilter(statusFilter === 'shadow' ? 'ALL' : 'shadow')}
          className={`p-5 rounded-[14px] border text-left transition cursor-pointer ${
            statusFilter === 'shadow'
              ? 'bg-[#FEF2F2] border-[#FECACA] ring-2 ring-[#E64D5B]/20'
              : 'bg-white border-[#E2E9F2] hover:border-[#CBD5E1] shadow-xs'
          }`}
        >
          <div className="mb-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#E64D5B]">
              Unapproved Apps Found
            </span>
          </div>
          <div className="text-[28px] font-bold text-[#12233F] tabular-nums leading-tight">
            {shadowCount} Tools
          </div>
          <p className="text-xs text-[#60738F] mt-1">Expensed on employee cards without security review or enterprise privacy terms.</p>
        </button>

        <button
          type="button"
          onClick={() => setStatusFilter(statusFilter === 'review' ? 'ALL' : 'review')}
          className={`p-5 rounded-[14px] border text-left transition cursor-pointer ${
            statusFilter === 'review'
              ? 'bg-[#FFFBEB] border-[#FDE68A] ring-2 ring-[#D99219]/20'
              : 'bg-white border-[#E2E9F2] hover:border-[#CBD5E1] shadow-xs'
          }`}
        >
          <div className="mb-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#D99219]">
              In Security Review
            </span>
          </div>
          <div className="text-[28px] font-bold text-[#12233F] tabular-nums leading-tight">
            {reviewCount} Tool
          </div>
          <p className="text-xs text-[#60738F] mt-1">Undergoing active compliance, privacy, and legal evaluation pilots.</p>
        </button>
      </div>

      {/* Cohesive Search & Filter Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 bg-white rounded-[14px] border border-[#E2E9F2] shadow-xs">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-[#8B9BB2] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by tool name, vendor, category, or department..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-[38px] bg-[#F0F4F9] hover:bg-white focus:bg-white border border-[#E2E9F2] text-[13px] text-[#12233F] rounded-[8px] pl-9 pr-3 focus:outline-none focus:border-[#3152F5] transition"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1 text-xs">
            <span className="text-[#8B9BB2] font-medium mr-1">Status:</span>
            {['ALL', 'approved', 'shadow', 'review'].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setStatusFilter(st)}
                className={`h-[32px] px-3 rounded-[6px] text-xs font-semibold capitalize transition cursor-pointer ${
                  statusFilter === st
                    ? 'bg-[#3152F5] text-white shadow-xs'
                    : 'bg-[#F0F4F9] text-[#60738F] hover:bg-[#E2E9F2]'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <div className="h-4 w-px bg-[#E2E9F2] hidden sm:block mx-1" />

          {/* Category Dropdown */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="h-[32px] bg-[#F0F4F9] border border-[#E2E9F2] text-xs font-medium text-[#12233F] rounded-[6px] px-2.5 focus:outline-none focus:border-[#3152F5]"
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c === 'ALL' ? 'All Categories' : c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Full Screen Interactive Tool Catalog Table */}
      <div className="bg-white rounded-[14px] border border-[#E2E9F2] overflow-hidden shadow-xs overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[860px]">
          <thead>
            <tr className="bg-[#F0F4F9] border-b border-[#E2E9F2] text-[12px] font-semibold text-[#60738F]">
              <th className="py-3 px-5">#</th>
              <th className="py-3 px-5">AI Application & Vendor</th>
              <th className="py-3 px-5">Clearance Status</th>
              <th className="py-3 px-5">Category</th>
              <th className="py-3 px-5">Risk Score</th>
              <th className="py-3 px-5 text-right">Active Users</th>
              <th className="py-3 px-5 text-right">Spend (MTD)</th>
              <th className="py-3 px-5 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2E9F2] text-xs">
            {filteredTools.map((tool, index) => {
              const isShadow = tool.status === 'shadow';
              const isReview = tool.status === 'review';

              return (
                <tr
                  key={tool.id}
                  onClick={() => onSelectTool(tool)}
                  className="hover:bg-[#F6F8FC] transition cursor-pointer group h-[64px]"
                >
                  <td className="py-3.5 px-5 text-[#8B9BB2] font-mono font-medium">
                    {index + 1}
                  </td>
                  
                  <td className="py-3.5 px-5">
                    <div className="font-semibold text-[#12233F] text-[14px] group-hover:text-[#3152F5] transition mb-1">
                      {tool.name}
                    </div>
                    <div className="text-[#60738F] text-[12px]">
                      {tool.vendor} • Invoicing: {tool.invoicingSource.split('(')[0]}
                    </div>
                  </td>

                  <td className="py-3.5 px-5">
                    {isShadow ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-[6px] text-[11px] font-semibold bg-[#FEF2F2] text-[#E64D5B] border border-[#FECACA]">
                        <ShieldAlert className="w-3 h-3 text-[#E64D5B]" />
                        Shadow AI
                      </span>
                    ) : isReview ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-[6px] text-[11px] font-semibold bg-[#FFFBEB] text-[#D99219] border border-[#FDE68A]">
                        In Review
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-[6px] text-[11px] font-semibold bg-[#ECFDF5] text-[#0E9F6E] border border-[#A7F3D0]">
                        <ShieldCheck className="w-3 h-3 text-[#0E9F6E]" />
                        Approved
                      </span>
                    )}
                  </td>

                  <td className="py-3.5 px-5 text-[#60738F] text-[13px]">
                    {tool.category}
                  </td>

                  <td className="py-3.5 px-5">
                    <span className={`font-bold tabular-nums text-[13px] ${tool.riskScore > 50 ? 'text-[#E64D5B]' : 'text-[#0E9F6E]'}`}>
                      {tool.riskScore}/100
                    </span>
                  </td>

                  <td className="py-3.5 px-5 text-right font-medium text-[#12233F] tabular-nums text-[13px]">
                    {tool.activeUsers}
                    {tool.inactiveSeats > 0 && (
                      <span className="text-[#D99219] block text-[11px]">
                        ({tool.inactiveSeats} dormant)
                      </span>
                    )}
                  </td>

                  <td className="py-3.5 px-5 text-right font-bold text-[#12233F] tabular-nums text-[14px]">
                    ${tool.spend.toLocaleString()}
                    <span className="text-[#8B9BB2] block text-[11px] font-normal">
                      ${tool.costPerUser}/seat
                    </span>
                  </td>

                  <td className="py-3.5 px-5 text-center">
                    <span className="inline-flex items-center justify-center p-1.5 rounded-[6px] text-[#8B9BB2] group-hover:text-[#3152F5] transition">
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filteredTools.length === 0 && (
          <div className="p-12 text-center text-[#60738F] text-xs">
            No tools match your filter criteria.
          </div>
        )}
      </div>

    </div>
  );
}
