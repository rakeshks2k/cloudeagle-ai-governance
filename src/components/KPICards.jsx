import React from 'react';
import { 
  DollarSign, 
  PieChart, 
  ShieldAlert, 
  Users, 
  AlertTriangle, 
  TrendingUp, 
  ArrowUpRight
} from 'lucide-react';

export default function KPICards({ scenario, onOpenViolations, onOpenShadow }) {
  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h2 className="text-[20px] font-semibold text-[#12233F] tracking-tight">
          Key Performance Metrics
        </h2>

        {/* Live DLP Alert Pill (Navigates to full DLP view) */}
        <div className="flex items-center gap-2">
          <button 
            type="button"
            onClick={onOpenViolations}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEF2F2] border border-[#FECACA] text-[#E64D5B] font-semibold text-xs cursor-pointer hover:bg-[#FEE2E2] transition shadow-xs"
            title="Inspect 23 Security Alerts"
          >
            <AlertTriangle className="w-3.5 h-3.5 text-[#E64D5B]" />
            <span>23 Security Alerts ({scenario.violationsCritical} Critical Leaks)</span>
          </button>
        </div>
      </div>

      {/* 4-Card Executive Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Card 1: Total AI Spend */}
        <div className="rounded-[14px] bg-white border border-[#E2E9F2] p-6 flex flex-col justify-between shadow-xs hover:border-[#CBD5E1] transition-all min-h-[155px]">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[12px] font-semibold uppercase tracking-wider text-[#8B9BB2]">
                Total AI Spend
              </span>
              <div className="w-8 h-8 rounded-[8px] bg-[#F0F4F9] border border-[#E2E9F2] flex items-center justify-center text-[#60738F]">
                <DollarSign className="w-4 h-4" strokeWidth={2.2} />
              </div>
            </div>
            <div className="text-[36px] font-bold text-[#12233F] tracking-tight tabular-nums leading-none">
              ${scenario.totalSpend.toLocaleString()}
            </div>
          </div>
          <div className="flex items-center justify-between pt-3.5 text-xs font-medium border-t border-[#E2E9F2] mt-3 text-[#60738F]">
            <span className="inline-flex items-center gap-1 text-[#0E9F6E] font-semibold bg-[#ECFDF5] border border-[#A7F3D0] px-2 py-0.5 rounded-[6px]">
              <TrendingUp className="w-3 h-3 text-[#0E9F6E]" strokeWidth={2.2} />
              {scenario.spendDelta}
            </span>
            <span className="text-[#8B9BB2] font-medium">Budget: ${(scenario.budgetTotal / 1000).toFixed(0)}k</span>
          </div>
        </div>

        {/* Card 2: Budget Remaining */}
        <div className="rounded-[14px] bg-white border border-[#E2E9F2] p-6 flex flex-col justify-between shadow-xs hover:border-[#CBD5E1] transition-all min-h-[155px]">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[12px] font-semibold uppercase tracking-wider text-[#8B9BB2]">
                Budget Remaining
              </span>
              <div className="w-8 h-8 rounded-[8px] bg-[#F0F4F9] border border-[#E2E9F2] flex items-center justify-center text-[#60738F]">
                <PieChart className="w-4 h-4" strokeWidth={2.2} />
              </div>
            </div>
            <div className="text-[36px] font-bold text-[#12233F] tracking-tight tabular-nums leading-none">
              ${scenario.budgetRemaining.toLocaleString()}
            </div>
          </div>
          <div className="flex items-center justify-between pt-3.5 text-xs font-medium border-t border-[#E2E9F2] mt-3 text-[#60738F]">
            <span className="text-[#60738F] font-semibold bg-[#F0F4F9] px-2 py-0.5 rounded-[6px]">
              {scenario.budgetConsumedPct}% budget used
            </span>
            <span className={scenario.projectedOverspend > 0 ? "text-[#E64D5B] bg-[#FEF2F2] border border-[#FECACA] px-2 py-0.5 rounded-[6px] font-semibold" : "text-[#0E9F6E] bg-[#ECFDF5] border border-[#A7F3D0] px-2 py-0.5 rounded-[6px] font-semibold"}>
              {scenario.projectedOverspend > 0 ? `+$${(scenario.projectedOverspend/1000).toFixed(1)}k at risk` : 'On Track'}
            </span>
          </div>
        </div>

        {/* Card 3: Unapproved AI Spend */}
        <div className="rounded-[14px] bg-white border border-[#E2E9F2] p-6 flex flex-col justify-between shadow-xs hover:border-[#CBD5E1] transition-all min-h-[155px]">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[12px] font-semibold uppercase tracking-wider text-[#8B9BB2]">
                Unapproved AI Spend
              </span>
              <div className="w-8 h-8 rounded-[8px] bg-[#FEF2F2] border border-[#FECACA] flex items-center justify-center text-[#E64D5B]">
                <ShieldAlert className="w-4 h-4" strokeWidth={2.2} />
              </div>
            </div>
            <div className="text-[36px] font-bold text-[#12233F] tracking-tight tabular-nums leading-none">
              $22,300<span className="text-[15px] font-normal text-[#8B9BB2] ml-1">/mo</span>
            </div>
          </div>
          <div className="flex items-center justify-between pt-3.5 text-xs font-medium border-t border-[#E2E9F2] mt-3">
            <span className="text-[#E64D5B] font-semibold bg-[#FEF2F2] px-2 py-0.5 rounded-[6px] border border-[#FECACA]">
              14 unapproved tools
            </span>
            <button
              type="button"
              onClick={onOpenShadow}
              className="text-[#3152F5] hover:text-[#2443DC] cursor-pointer font-semibold inline-flex items-center gap-1 transition"
            >
              Review <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Card 4: Employees Using AI */}
        <div className="rounded-[14px] bg-white border border-[#E2E9F2] p-6 flex flex-col justify-between shadow-xs hover:border-[#CBD5E1] transition-all min-h-[155px]">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[12px] font-semibold uppercase tracking-wider text-[#8B9BB2]">
                Employees Using AI
              </span>
              <div className="w-8 h-8 rounded-[8px] bg-[#F0F4F9] border border-[#E2E9F2] flex items-center justify-center text-[#60738F]">
                <Users className="w-4 h-4" strokeWidth={2.2} />
              </div>
            </div>
            <div className="text-[36px] font-bold text-[#12233F] tracking-tight tabular-nums leading-none">
              {scenario.activeUsersCount} <span className="text-[16px] font-normal text-[#8B9BB2]">/ {scenario.totalEmployees}</span>
            </div>
          </div>
          <div className="flex items-center justify-between pt-3.5 text-xs font-medium border-t border-[#E2E9F2] mt-3 text-[#60738F]">
            <span className="text-[#60738F] font-semibold bg-[#F0F4F9] px-2 py-0.5 rounded-[6px]">
              61% adoption
            </span>
            <span className="text-[#D99219] font-medium bg-[#FFFBEB] px-2 py-0.5 rounded-[6px] border border-[#FDE68A]">
              106 unused licenses
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
