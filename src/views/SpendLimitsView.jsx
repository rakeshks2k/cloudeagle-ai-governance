import React from 'react';
import { 
  ArrowLeft, 
  DollarSign, 
  AlertTriangle, 
  Building2, 
  ChevronRight,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';
import { DEPARTMENTS_DATA } from '../data/mockData';

export default function SpendLimitsView({ onBack, onSelectDepartment }) {
  const totalSpend = DEPARTMENTS_DATA.reduce((acc, d) => acc + d.spend, 0);
  const totalBudget = DEPARTMENTS_DATA.reduce((acc, d) => acc + d.budget, 0);
  const breachedDepts = DEPARTMENTS_DATA.filter(d => d.utilization >= 100);
  const warningDepts = DEPARTMENTS_DATA.filter(d => d.utilization >= 75 && d.utilization < 100);

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      
      {/* Top Header (Back button removed) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Departmental Spend Caps & Budgets
            </h1>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
              7 Departments Monitored
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Quarterly AI cost center thresholds, forecast overspend alerts, and subteam allocations.
          </p>
        </div>

        <div className="text-left sm:text-right shrink-0">
          <div className="text-xs text-slate-400">Total Enterprise Cap</div>
          <div className="text-xl font-bold text-slate-900 tabular-nums">
            ${totalSpend.toLocaleString()} / ${totalBudget.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Summary Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-700">
              Active Budget Breach
            </span>
            <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse"></span>
          </div>
          <div className="text-2xl font-bold text-slate-900">
            {breachedDepts.length} Department Over Cap
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Legal & Compliance at 111.7% (+${((breachedDepts[0]?.spend - breachedDepts[0]?.budget) || 1400).toLocaleString()}).
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
              Run-Rate Warning
            </span>
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
          </div>
          <div className="text-2xl font-bold text-slate-900">
            {warningDepts.length} Departments at Risk
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Engineering & R&D projected to overshoot by +$8.4k at month-end.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Solvent Departments
            </span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">
            {DEPARTMENTS_DATA.length - breachedDepts.length - warningDepts.length} Within Safe Limits
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Product, Marketing, Finance & HR within allocated quarterly bounds.
          </p>
        </div>
      </div>

      {/* All Departments List Detailed Table / Cards */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-[15px] font-bold text-slate-900">
              Cost Center Limit Allocations
            </h3>
            <p className="text-xs text-slate-500">
              Click any department to inspect squad-level breakdowns and submit re-allocation requests.
            </p>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {DEPARTMENTS_DATA.map((dept) => {
            const isBreached = dept.utilization >= 100;
            const isWarning = dept.utilization >= 75 && dept.utilization < 100;

            let badgeClass = 'bg-slate-100 text-slate-700 border-slate-200';
            let barColor = 'bg-slate-700';
            if (isBreached) {
              badgeClass = 'bg-rose-50 text-rose-700 border-rose-200 font-bold';
              barColor = 'bg-rose-600';
            } else if (isWarning) {
              badgeClass = 'bg-amber-50 text-amber-700 border-amber-200 font-semibold';
              barColor = 'bg-amber-500';
            }

            return (
              <div
                key={dept.id}
                onClick={() => onSelectDepartment(dept)}
                className="p-5 hover:bg-slate-50/80 transition cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 group"
              >
                <div className="space-y-1.5 min-w-[260px]">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-[15px] group-hover:text-slate-700 transition">
                      {dept.name}
                    </span>
                    <span className={`text-[11px] px-2.5 py-0.5 rounded-md border ${badgeClass}`}>
                      {dept.utilization.toFixed(1)}% Consumed
                    </span>
                  </div>
                  <div className="text-xs text-slate-500">
                    {dept.costCenter} • Lead: <strong className="text-slate-700 font-medium">{dept.leadName}</strong> • {dept.activeAiUsers} users
                  </div>
                </div>

                <div className="flex-1 max-w-md mx-auto w-full px-2">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-slate-400">Quarterly Spend Track</span>
                    <span className="font-bold text-slate-900 tabular-nums">
                      ${dept.spend.toLocaleString()} / ${dept.budget.toLocaleString()}
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${barColor}`}
                      style={{ width: `${Math.min(dept.utilization, 100)}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0 text-right">
                  <div>
                    <div className="text-xs text-slate-400">Month-End Forecast</div>
                    <div className="text-sm font-bold text-slate-900 tabular-nums">
                      ${dept.forecastSpend.toLocaleString()}
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900 transition" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
