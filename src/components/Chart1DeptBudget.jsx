import React from 'react';
import { AlertTriangle, ChevronRight } from 'lucide-react';

export default function Chart1DeptBudget({ 
  departments, 
  onSelectDepartment 
}) {
  return (
    <div 
      id="chart1-dept-budget" 
      className="bg-white rounded-[14px] border border-[#E2E9F2] p-5 sm:p-6 shadow-xs flex flex-col justify-between h-full scroll-mt-6"
    >
      <div>
        {/* Header: Clean, uncluttered title & subtitle */}
        <div className="mb-4">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-[15px] font-semibold text-[#12233F] tracking-tight">
              Department Spend vs. Budget Limit
            </h3>
            <span className="text-xs text-[#8B9BB2] font-medium hidden sm:inline">
              Q4 MTD
            </span>
          </div>
          <p className="text-[12.5px] text-[#60738F] mt-0.5">
            Current spending by department compared against quarterly budget limits.
          </p>
        </div>

        {/* Refined Warning Strip: Calm, compact, pastel amber */}
        <div className="mb-4 px-3.5 py-2 rounded-[8px] bg-[#FFFBEB] border border-[#FEF3C7] flex items-center justify-between text-xs text-[#92400E]">
          <div className="flex items-center gap-2 min-w-0">
            <AlertTriangle className="w-3.5 h-3.5 text-[#D97706] shrink-0" strokeWidth={2.2} />
            <span className="truncate">
              <strong className="font-semibold text-[#78350F]">Legal is over limit</strong> by $1,400 • Engineering projected +$8,400 at month-end
            </span>
          </div>
          <button 
            type="button" 
            onClick={() => onSelectDepartment(departments.find(d => d.id === 'legal') || departments[0])}
            className="text-xs font-semibold text-[#3152F5] hover:text-[#2443DC] hover:underline cursor-pointer shrink-0 ml-3"
          >
            Review →
          </button>
        </div>

        {/* Department Rows: Clean 2-line layout with sleek 5px progress bars */}
        <div className="space-y-1.5">
          {departments.map((dept) => {
            const isBreached = dept.utilization >= 100;
            const isWarning = dept.utilization >= 75 && dept.utilization < 100;
            
            // Percentage display badge
            let percentBadge = (
              <span className="text-xs text-[#60738F] font-medium tabular-nums ml-1">
                {dept.utilization.toFixed(0)}%
              </span>
            );
            if (isBreached) {
              percentBadge = (
                <span className="text-[11px] font-semibold px-1.5 py-0.5 rounded bg-[#FEF2F2] text-[#E64D5B] border border-[#FECACA] tabular-nums ml-1">
                  {dept.utilization.toFixed(0)}%
                </span>
              );
            } else if (isWarning) {
              percentBadge = (
                <span className="text-[11px] font-medium px-1.5 py-0.5 rounded bg-[#FFFBEB] text-[#D97706] border border-[#FEF3C7] tabular-nums ml-1">
                  {dept.utilization.toFixed(0)}%
                </span>
              );
            }

            // Visual bar fill capped at 100%
            const fillWidth = Math.min(dept.utilization, 100);

            return (
              <div 
                key={dept.id}
                onClick={() => onSelectDepartment(dept)}
                className="group px-3 py-2.5 rounded-[9px] hover:bg-[#F8FAFC] transition-colors border border-transparent hover:border-[#E2E9F2] cursor-pointer"
              >
                {/* Row 1: Department Name & Amounts */}
                <div className="flex items-center justify-between mb-1.5">
                  <span className="font-medium text-[13.5px] text-[#12233F] group-hover:text-[#3152F5] transition-colors truncate pr-2">
                    {dept.name}
                  </span>
                  
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="font-semibold text-[13.5px] text-[#12233F] tabular-nums">
                      ${dept.spend.toLocaleString()}
                    </span>
                    <span className="text-xs text-[#8B9BB2] tabular-nums">
                      / ${dept.budget.toLocaleString()}
                    </span>
                    {percentBadge}
                  </div>
                </div>

                {/* Row 2: Sleek 5px Progress Bar - Soft Light Slate */}
                <div className="w-full bg-[#EEF2F6] rounded-full h-1.5 overflow-hidden my-1.5">
                  <div 
                    className="h-full rounded-full transition-all duration-300 bg-[#64748B]"
                    style={{ width: `${fillWidth}%` }}
                  />
                </div>

                {/* Row 3: Quiet Secondary Metadata */}
                <div className="flex items-center justify-between text-[12px] text-[#60738F]">
                  <span className="truncate">
                    Primary: <span className="text-[#12233F] font-medium">{dept.topTools[0]?.name || 'AI Tools'}</span>
                  </span>
                  <span className="text-[#8B9BB2] shrink-0 tabular-nums">
                    <span className="text-[#60738F] font-medium">{dept.activeAiUsers}</span> active users
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer: Quiet helpful action */}
      <div className="mt-4 pt-3 border-t border-[#E2E9F2] flex items-center justify-between text-xs text-[#60738F]">
        <span>Click any department to view squad details</span>
        <button
          type="button"
          onClick={() => onSelectDepartment(departments[0])}
          className="font-medium text-[#3152F5] hover:text-[#2443DC] hover:underline cursor-pointer"
        >
          Engineering breakdown →
        </button>
      </div>
    </div>
  );
}
