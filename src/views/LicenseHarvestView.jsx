import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Scissors, 
  CheckCircle2, 
  DollarSign, 
  Users, 
  AlertCircle,
  Clock,
  ArrowRight
} from 'lucide-react';
import { TOOLS_DATA } from '../data/mockData';

export default function LicenseHarvestView({ onBack, onSelectTool }) {
  const [harvestedTools, setHarvestedTools] = useState([]);
  const [toastMessage, setToastMessage] = useState(null);

  // Tools that have dormant / inactive seats
  const toolsWithInactive = TOOLS_DATA.filter(t => (t.inactiveSeats || 0) > 0);
  const totalDormantSeats = toolsWithInactive.reduce((acc, t) => acc + (t.inactiveSeats || 0), 0);
  const totalMonthlySavings = toolsWithInactive.reduce((acc, t) => acc + ((t.inactiveSeats || 0) * t.costPerUser), 0);

  const handleHarvest = (tool) => {
    setHarvestedTools(prev => [...prev, tool.id]);
    setToastMessage(`Automated deprovisioning triggered: Reclaimed ${tool.inactiveSeats} seats for ${tool.name}. Monthly run-rate reduced by $${(tool.inactiveSeats * tool.costPerUser).toLocaleString()}.`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      
      {/* Top Header (Back button removed) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Automated License Harvesting
            </h1>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#FFFBEB] text-[#92400E] border border-[#FEF3C7]">
              {totalDormantSeats} Inactive Seats Detected
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Reclaim paid SaaS AI licenses where assigned employees have recorded zero prompt activity in 60+ days.
          </p>
        </div>

        <div className="text-left sm:text-right shrink-0">
          <div className="text-xs text-slate-400">Potential Recurring Savings</div>
          <div className="text-xl font-bold text-emerald-700 tabular-nums">
            +${totalMonthlySavings.toLocaleString()}
            <span className="text-xs font-normal text-slate-400">/mo (${(totalMonthlySavings * 12).toLocaleString()}/yr)</span>
          </div>
        </div>
      </div>

      {/* Toast Feedback */}
      {toastMessage && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" strokeWidth={2.2} />
            <span className="font-semibold">{toastMessage}</span>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-emerald-700 hover:text-emerald-900 cursor-pointer">
            ✕
          </button>
        </div>
      )}

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Total Dormant Seats
            </span>
            <Users className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-3xl font-bold text-slate-900 tabular-nums">
            {totalDormantSeats}
          </div>
          <p className="text-xs text-slate-500 mt-1">Across 7 sanctioned software enterprise contracts.</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Annualized Run-Rate Reduction
            </span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-bold text-emerald-700 tabular-nums">
            ${(totalMonthlySavings * 12).toLocaleString()}
          </div>
          <p className="text-xs text-slate-500 mt-1">Direct recurring EBITDA improvement.</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Inactivity Trigger Window
            </span>
            <Clock className="w-4 h-4 text-slate-500" />
          </div>
          <div className="text-3xl font-bold text-slate-900">
            60 Days
          </div>
          <p className="text-xs text-slate-500 mt-1">Audited via GitHub REST API, Cursor usage, and Okta SSO.</p>
        </div>
      </div>

      {/* Tools with Inactive Seats List */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-[15px] font-bold text-slate-900">
              Applications with Reclaimable Licenses
            </h3>
            <p className="text-xs text-slate-500">
              Select an application to trigger one-click automated SCIM deprovisioning.
            </p>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {toolsWithInactive.map((tool) => {
            const isHarvested = harvestedTools.includes(tool.id);
            const savings = (tool.inactiveSeats || 0) * tool.costPerUser;

            return (
              <div
                key={tool.id}
                className="p-5 hover:bg-slate-50/80 transition flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-sm">
                      {tool.name}
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-[#FFFBEB] text-[#92400E] border border-[#FEF3C7]">
                      {tool.inactiveSeats} dormant seats (of {tool.allocatedSeats})
                    </span>
                  </div>
                  <div className="text-xs text-slate-500">
                    Vendor: <strong className="text-slate-700">{tool.vendor}</strong> • Cost: ${tool.costPerUser}/seat/mo • Invoicing: {tool.invoicingSource.split('(')[0]}
                  </div>
                </div>

                <div className="flex items-center gap-6 shrink-0">
                  <div className="text-right">
                    <div className="text-xs text-slate-400">Monthly Run-Rate Cut</div>
                    <div className="text-sm font-bold text-emerald-700 tabular-nums">
                      +${savings.toLocaleString()}/mo
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleHarvest(tool)}
                    disabled={isHarvested}
                    className={`h-9 px-4 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer shadow-xs ${
                      isHarvested
                        ? 'bg-[#ECFDF5] text-[#065F46] border border-[#D1FAE5] cursor-default'
                        : 'bg-[#2144FE] hover:bg-[#1A38D8] text-white shadow-xs'
                    }`}
                  >
                    <Scissors className="w-3.5 h-3.5" />
                    <span>{isHarvested ? 'Seats Reclaimed' : `Harvest ${tool.inactiveSeats} Seats`}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
