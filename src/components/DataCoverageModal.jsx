import React from 'react';
import { 
  X, 
  CheckCircle2, 
  AlertTriangle, 
  Database
} from 'lucide-react';
import { API_FRESHNESS_STATUS } from '../data/mockData';

export default function DataCoverageModal({ isOpen, onClose, scenario }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 transition-opacity">
      <div className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 bg-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center">
              <Database className="w-5 h-5" strokeWidth={1.8} />
            </div>
            <div>
              <h3 className="text-[18px] font-bold text-slate-900 tracking-tight">
                API Telemetry Freshness & Coverage
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Live integration status across 8 identity and spend data connectors
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

        {/* Content */}
        <div className="p-6 space-y-6 text-sm">
          
          {/* Top Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-xs font-semibold text-slate-500 block mb-1">
                Attribution Coverage
              </span>
              <div className="text-[24px] font-bold text-slate-900 tabular-nums">
                {scenario?.attributionCoverage || 94.2}%
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Mapped to Okta cost centers
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-xs font-semibold text-slate-500 block mb-1">
                Unattributed Spend
              </span>
              <div className="text-[24px] font-bold text-slate-900 tabular-nums">
                ${(scenario?.unattributedSpend || 8300).toLocaleString()}
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Ramp unmapped expense cards
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
              <span className="text-xs font-semibold text-slate-500 block mb-1">
                Active Telemetry Sync
              </span>
              <div className="text-[24px] font-bold text-slate-900 tabular-nums">
                8 / 8
              </div>
              <p className="text-xs text-emerald-700 font-medium mt-0.5 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> All APIs operational
              </p>
            </div>
          </div>

          {/* Connectors Table */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Connected Telemetry Pipelines
            </h4>

            <div className="rounded-xl border border-slate-200 overflow-hidden bg-white text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-100 text-slate-500">
                  <tr>
                    <th className="py-2.5 px-4 font-semibold">Data Pipeline</th>
                    <th className="py-2.5 px-4 font-semibold">Sync Frequency</th>
                    <th className="py-2.5 px-4 font-semibold">Granularity</th>
                    <th className="py-2.5 px-4 font-semibold text-right">Coverage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {API_FRESHNESS_STATUS.map((api) => (
                    <tr key={api.source} className="hover:bg-slate-50/50">
                      <td className="py-2.5 px-4 font-medium text-slate-900 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                        {api.source}
                      </td>
                      <td className="py-2.5 px-4 text-slate-500">{api.latency}</td>
                      <td className="py-2.5 px-4 text-slate-500">{api.granularity}</td>
                      <td className="py-2.5 px-4 text-slate-900 font-semibold text-right">{api.coverage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex justify-end">
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
