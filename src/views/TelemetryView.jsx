import React from 'react';
import { 
  ArrowLeft, 
  Database, 
  CheckCircle2, 
  Activity, 
  RefreshCw,
  Server
} from 'lucide-react';
import { API_FRESHNESS_STATUS } from '../data/mockData';

export default function TelemetryView({ onBack, scenario }) {
  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E2E9F2]">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-[28px] sm:text-[30px] font-bold text-[#12233F] tracking-tight leading-tight">
              Connected Data Sources & Pipelines
            </h1>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-[6px] bg-[#ECFDF5] text-[#0E9F6E] border border-[#A7F3D0]">
              8 Connected Sources Active
            </span>
          </div>
          <p className="text-[13px] text-[#60738F] mt-1">
            Live data feeds syncing employee rosters (Okta), cloud invoices, vendor APIs, and corporate card expenses (Ramp).
          </p>
        </div>

        <div className="text-left sm:text-right shrink-0">
          <div className="text-xs text-[#8B9BB2] font-medium">Last Data Sync</div>
          <div className="text-[13px] font-semibold text-[#12233F]">
            {scenario?.syncTimestamp || '28m ago'} (Automated hourly sync)
          </div>
        </div>
      </div>

      {/* Top Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-5 rounded-[14px] bg-white border border-[#E2E9F2] shadow-xs">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8B9BB2]">
              Cost Tracking Coverage
            </span>
            <Activity className="w-4 h-4 text-[#0E9F6E]" />
          </div>
          <div className="text-[32px] font-bold text-[#12233F] tabular-nums leading-tight">
            {scenario?.attributionCoverage || 94.2}%
          </div>
          <p className="text-xs text-[#60738F] mt-1">
            Costs matched directly to employee profiles and departments.
          </p>
        </div>

        <div className="p-5 rounded-[14px] bg-white border border-[#E2E9F2] shadow-xs">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8B9BB2]">
              Uncategorized Spend
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-[6px] bg-[#FEF2F2] text-[#E64D5B] border border-[#FECACA]">
              Pending Review
            </span>
          </div>
          <div className="text-[32px] font-bold text-[#12233F] tabular-nums leading-tight">
            ${(scenario?.unattributedSpend || 8280).toLocaleString()}
          </div>
          <p className="text-xs text-[#60738F] mt-1">
            Corporate card transactions waiting to be assigned to a department.
          </p>
        </div>

        <div className="p-5 rounded-[14px] bg-white border border-[#E2E9F2] shadow-xs">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8B9BB2]">
              Connection Health
            </span>
            <CheckCircle2 className="w-4 h-4 text-[#0E9F6E]" />
          </div>
          <div className="text-[32px] font-bold text-[#12233F] tabular-nums leading-tight">
            8 / 8 Active
          </div>
          <p className="text-xs text-[#0E9F6E] font-medium mt-1">
            All API connections and automated exports syncing normally.
          </p>
        </div>
      </div>

      {/* Connected Telemetry Pipelines Table */}
      <div className="bg-white rounded-[14px] border border-[#E2E9F2] overflow-hidden shadow-xs overflow-x-auto">
        <div className="p-5 border-b border-[#E2E9F2] flex items-center justify-between">
          <div>
            <h3 className="text-[15px] font-semibold text-[#12233F]">
              Active Data Integrations
            </h3>
            <p className="text-xs text-[#60738F]">
              Live automated pipelines feeding usage and cost data into this governance dashboard.
            </p>
          </div>
          <span className="text-xs text-[#8B9BB2] font-medium">
            SSO, Vendor APIs & Invoicing
          </span>
        </div>

        <table className="w-full text-left border-collapse min-w-[760px]">
          <thead>
            <tr className="bg-[#F0F4F9] border-b border-[#E2E9F2] text-[12px] font-semibold text-[#60738F]">
              <th className="py-3 px-5">Integration Source</th>
              <th className="py-3 px-5">Pipeline Status</th>
              <th className="py-3 px-5">Sync Latency</th>
              <th className="py-3 px-5">Telemetry Granularity</th>
              <th className="py-3 px-5 text-right">Data Coverage</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2E9F2] text-xs">
            {API_FRESHNESS_STATUS.map((api) => {
              const isHealthy = api.status === 'healthy';

              return (
                <tr key={api.source} className="hover:bg-[#F6F8FC] transition h-[60px]">
                  <td className="py-3.5 px-5 font-semibold text-[#12233F] text-[14px] flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-[6px] bg-[#F0F4F9] border border-[#E2E9F2] flex items-center justify-center text-[#60738F]">
                      <Server className="w-3.5 h-3.5" />
                    </div>
                    <span>{api.source}</span>
                  </td>

                  <td className="py-3.5 px-5">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[6px] font-semibold text-[11px] uppercase tracking-wider border ${
                      isHealthy 
                        ? 'bg-[#ECFDF5] text-[#0E9F6E] border-[#A7F3D0]' 
                        : 'bg-[#FFFBEB] text-[#D99219] border-[#FDE68A]'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${isHealthy ? 'bg-[#0E9F6E]' : 'bg-[#D99219]'}`} />
                      {api.status}
                    </span>
                  </td>

                  <td className="py-3.5 px-5 text-[#60738F] font-mono text-[13px]">
                    {api.latency}
                  </td>

                  <td className="py-3.5 px-5 text-[#60738F] text-[13px]">
                    {api.granularity}
                  </td>

                  <td className="py-3.5 px-5 text-right font-bold text-[#12233F] tabular-nums text-[14px]">
                    {api.coverage}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

    </div>
  );
}
