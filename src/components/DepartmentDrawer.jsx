import React, { useState } from 'react';
import { 
  X, 
  Building2, 
  Send, 
  CheckCircle2,
  ArrowRightLeft
} from 'lucide-react';

export default function DepartmentDrawer({ department, onClose }) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!department) return null;

  const subteams = department.subteams || department.squads || [];

  const handleNotifyVP = () => {
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-xs flex justify-end transition-opacity">
      <div className="w-full max-w-xl bg-white h-full shadow-2xl flex flex-col border-l border-[#E2E9F2]">
        
        {/* Drawer Header */}
        <div className="p-6 lg:p-7 border-b border-[#E2E9F2] bg-white shrink-0">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-[10px] bg-[#F0F4F9] border border-[#E2E9F2] text-[#12233F] flex items-center justify-center">
                <Building2 className="w-5 h-5 text-[#60738F]" strokeWidth={1.8} />
              </div>
              <div>
                <span className="text-[11px] font-mono text-[#8B9BB2] font-semibold tracking-wide">
                  {department.costCenter}
                </span>
                <h2 className="text-[20px] font-bold text-[#12233F] tracking-tight">
                  {department.name}
                </h2>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-[#8B9BB2] hover:text-[#12233F] rounded-[8px] hover:bg-[#F0F4F9] transition cursor-pointer"
            >
              <X className="w-5 h-5" strokeWidth={2} />
            </button>
          </div>

          <div className="flex items-center gap-4 text-xs text-[#60738F] mt-3">
            <span>Lead: <strong className="text-[#12233F] font-semibold">{department.leadName}</strong></span>
            <span className="text-[#E2E9F2]">•</span>
            <span>Active Users: <strong className="text-[#12233F] font-semibold tabular-nums">{department.activeAiUsers} / {department.headcount}</strong></span>
          </div>
        </div>

        {/* Drawer Body */}
        <div className="p-6 lg:p-7 space-y-6 flex-1 overflow-y-auto text-sm">
          
          {/* Spend vs Budget Summary Card */}
          <div className="p-5 rounded-[12px] bg-[#F0F4F9] border border-[#E2E9F2] space-y-3">
            <div className="flex justify-between items-center text-xs text-[#60738F]">
              <span>Quarterly Budget Usage</span>
              <span className="font-bold text-[#12233F] tabular-nums">{department.utilization.toFixed(1)}% of budget used</span>
            </div>
            
            <div className="flex items-baseline justify-between">
              <div className="text-[30px] font-bold text-[#12233F] tabular-nums tracking-tight">
                ${department.spend.toLocaleString()}
              </div>
              <div className="text-xs text-[#60738F] font-medium">
                Limit: ${department.budget.toLocaleString()}
              </div>
            </div>

            <p className="text-xs text-[#60738F] pt-3 border-t border-[#E2E9F2] leading-relaxed">
              <strong className="text-[#12233F]">Key Finding:</strong> {department.keyRisk}
            </p>
          </div>

          {/* Sub-Squad / Team Breakdown */}
          {subteams.length > 0 && (
            <div>
              <h3 className="text-[11px] font-semibold uppercase tracking-wider text-[#8B9BB2] mb-3">
                Team Breakdown
              </h3>
              <div className="space-y-3">
                {subteams.map((squad) => {
                  const limit = squad.budget || squad.limit || 1;
                  const squadUtil = squad.utilization ?? (squad.spend / limit) * 100;
                  const isSquadOver = squadUtil >= 100;
                  return (
                    <div key={squad.name} className="p-4 rounded-[10px] border border-[#E2E9F2] bg-white space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-[#12233F] text-[14px]">{squad.name}</span>
                        <span className="font-bold text-[#12233F] tabular-nums text-[14px]">
                          ${squad.spend.toLocaleString()}
                        </span>
                      </div>
                      <div className="w-full bg-[#F0F4F9] rounded-full h-1.5 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-[#64748B]"
                          style={{ width: `${Math.min(squadUtil, 100)}%` }}
                        />
                      </div>
                      <div className="flex justify-between items-center text-xs text-[#60738F]">
                        <span>Budget: ${limit.toLocaleString()}</span>
                        <span className={isSquadOver ? 'text-[#E64D5B] font-semibold' : 'text-[#60738F]'}>
                          {squadUtil.toFixed(1)}% used
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Department Top AI Applications */}
          {department.topTools && department.topTools.length > 0 && (
            <div>
              <h3 className="text-[11px] font-semibold uppercase tracking-wider text-[#8B9BB2] mb-3">
                AI Tools Used by this Department
              </h3>
              <div className="space-y-2.5">
                {department.topTools.map((tool) => (
                  <div key={tool.name} className="p-3.5 rounded-[10px] border border-[#E2E9F2] bg-white flex justify-between items-center">
                    <div>
                      <div className="font-semibold text-[#12233F] text-sm">{tool.name}</div>
                      <div className="text-xs text-[#60738F]">{tool.users} active users</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-[#12233F] tabular-nums text-sm">
                        ${tool.spend.toLocaleString()}
                      </div>
                      <div className="text-xs text-[#8B9BB2]">Month-to-date</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Drawer Footer Actions */}
        <div className="p-5 lg:p-6 border-t border-[#E2E9F2] bg-[#F0F4F9] flex items-center justify-end gap-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 text-xs font-semibold text-[#60738F] hover:text-[#12233F] hover:bg-white rounded-[10px] border border-[#E2E9F2] transition cursor-pointer"
          >
            Close
          </button>
          <button
            type="button"
            onClick={handleNotifyVP}
            disabled={isSubmitted}
            className={`px-4.5 py-2.5 text-xs font-semibold rounded-[10px] flex items-center gap-2 transition cursor-pointer shadow-xs ${
              isSubmitted 
                ? 'bg-[#0E9F6E] text-white' 
                : 'bg-[#3152F5] hover:bg-[#2443DC] text-white'
            }`}
          >
            {isSubmitted ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Re-allocation Request Sent!</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Notify VP & Request Re-allocation</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
