import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ScanSearch, 
  ShieldAlert, 
  CreditCard, 
  AlertTriangle,
  Lock,
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { TOOLS_DATA } from '../data/mockData';

export default function ShadowRadarView({ onBack, onSelectTool }) {
  const shadowTools = TOOLS_DATA.filter(t => t.status === 'shadow');
  const totalShadowSpend = shadowTools.reduce((acc, t) => acc + t.spend, 0);
  const totalShadowUsers = shadowTools.reduce((acc, t) => acc + t.activeUsers, 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      
      {/* Top Header (Back button removed) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Shadow AI Discovery Radar
            </h1>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#FFF1F2] text-[#9F1239] border border-[#FFE4E6]">
              {shadowTools.length} Unapproved Tools Discovered
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Continuous reconnaissance across Ramp corporate card statements, Browser DLP extension traffic, and DNS queries.
          </p>
        </div>

        <div className="text-left sm:text-right shrink-0">
          <div className="text-xs text-slate-400">Total Unvetted Spend</div>
          <div className="text-xl font-bold text-rose-700 tabular-nums">
            ${totalShadowSpend.toLocaleString()}
            <span className="text-xs font-normal text-slate-400">/mo (${(totalShadowSpend * 12).toLocaleString()}/yr)</span>
          </div>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-700">
              Unapproved AI Spend
            </span>
            <CreditCard className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-3xl font-bold text-slate-900 tabular-nums">
            ${totalShadowSpend.toLocaleString()}<span className="text-xs font-normal text-slate-400">/mo</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">Expensed on corporate credit cards without SOC 2 vetting.</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
              Exposed Employees
            </span>
            <ShieldAlert className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-3xl font-bold text-slate-900 tabular-nums">
            {totalShadowUsers} Employees
          </div>
          <p className="text-xs text-slate-500 mt-1">Active on unmanaged consumer AI accounts.</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Training Data Exposure
            </span>
            <Lock className="w-4 h-4 text-slate-500" />
          </div>
          <div className="text-3xl font-bold text-rose-700">
            Opt-In Default
          </div>
          <p className="text-xs text-slate-500 mt-1">Consumer terms permit third-party LLM training on prompts.</p>
        </div>
      </div>

      {/* Discovered Shadow Tools List */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-[15px] font-bold text-slate-900">
              Unsanctioned Shadow AI Applications
            </h3>
            <p className="text-xs text-slate-500">
              Click any tool to review employee usage, compliance posture, or deploy browser extension hard-blocks.
            </p>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {shadowTools.map((tool) => (
            <div
              key={tool.id}
              onClick={() => onSelectTool(tool)}
              className="p-5 hover:bg-slate-50/80 transition cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 group"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 text-sm group-hover:text-slate-700 transition">
                    {tool.name}
                  </span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-[#FFF1F2] text-[#9F1239] border border-[#FFE4E6]">
                    Risk: {tool.riskScore}/100
                  </span>
                </div>
                <div className="text-xs text-slate-500">
                  Vendor: <strong className="text-slate-700">{tool.vendor}</strong> • Category: {tool.category} • Detected In: {tool.topDepartment}
                </div>
                <div className="text-xs text-[#9F1239] font-medium">
                  {tool.recommendation}
                </div>
              </div>

              <div className="flex items-center gap-6 shrink-0 text-right">
                <div>
                  <div className="text-xs text-slate-400">Monthly Run-Rate</div>
                  <div className="text-sm font-bold text-slate-900 tabular-nums">
                    ${tool.spend.toLocaleString()}/mo
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {tool.activeUsers} active users
                  </div>
                </div>

                <div className="h-9 px-3.5 rounded-xl bg-[#2144FE] hover:bg-[#1A38D8] text-white text-xs font-semibold flex items-center gap-1.5 transition shadow-xs">
                  <span>Sanction or Block</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
