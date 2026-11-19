import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Scissors, 
  ArrowRight, 
  CheckCircle2, 
  Lightbulb, 
  ChevronDown, 
  Activity, 
  X,
  ExternalLink
} from 'lucide-react';
import { ACTION_ITEMS, SCENARIOS } from '../data/mockData';

export default function RightRail({
  scenario,
  onSelectScenario,
  showAnnotations,
  onToggleAnnotations,
  onOpenDataModal,
  onOpenDept,
  onOpenTool
}) {
  const [items, setItems] = useState(ACTION_ITEMS);
  const [resolvedToast, setResolvedToast] = useState(null);

  const handleActionClick = (action) => {
    setItems(prev => prev.filter(i => i.id !== action.id));
    setResolvedToast(`Initiated: ${action.suggestedAction}`);
    setTimeout(() => setResolvedToast(null), 3000);
  };

  return (
    <aside className="w-[280px] xl:w-[300px] bg-[#FAFCFE] border-l border-[#E9EDF4] flex flex-col justify-between p-5 lg:p-6 shrink-0 overflow-y-auto space-y-6 select-none">
      
      {/* Top: Workspace Controls & Simulation */}
      <div className="space-y-4">
        
        {/* Controls Header */}
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#94A3B8]">
            Workspace Controls
          </span>
          <button
            type="button"
            onClick={onToggleAnnotations}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[12px] font-semibold transition cursor-pointer border ${
              showAnnotations
                ? 'bg-[#0F172A] text-white border-[#0F172A]'
                : 'bg-white text-[#475467] border-[#E2E8F0] hover:bg-[#F8FAFC]'
            }`}
            title="Toggle PM Strategic Thinking & Rationale badges"
          >
            <Lightbulb className={`w-3.5 h-3.5 ${showAnnotations ? 'text-[#F59E0B]' : 'text-[#64748B]'}`} strokeWidth={2} />
            <span>PM Notes: {showAnnotations ? 'On' : 'Off'}</span>
          </button>
        </div>

        {/* Simulation Scenario Dropdown */}
        <div className="p-3.5 rounded-2xl bg-white border border-[#E9EDF4] space-y-2 shadow-card-subtle">
          <label className="text-[12px] font-bold text-[#0F172A] block uppercase tracking-wide">
            Simulation Scenario State
          </label>
          <div className="relative">
            <select
              value={scenario.id}
              onChange={(e) => onSelectScenario(SCENARIOS[e.target.value])}
              className="w-full h-9 bg-[#F8FAFC] hover:bg-white border border-[#E2E8F0] text-[#0F172A] text-[13px] font-medium rounded-xl pl-3 pr-7 focus:border-[#2244FE] focus:ring-2 focus:ring-[#2244FE]/20 focus:outline-none appearance-none cursor-pointer shadow-2xs transition"
            >
              <option value="STANDARD">Q4 Baseline (Standard)</option>
              <option value="CRITICAL_BREACH">Critical Budget Breach</option>
              <option value="ONBOARDING_PARTIAL">Partial Integration / Lag</option>
            </select>
            <ChevronDown className="w-3.5 h-3.5 text-[#64748B] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" strokeWidth={2} />
          </div>
          <p className="text-[12px] text-[#64748B] leading-relaxed">
            {scenario.description}
          </p>
        </div>

      </div>

      {/* Middle: Priority Governance Actions */}
      <div className="space-y-3.5 flex-1">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[14px] font-bold text-[#0F172A]">
              Governance Actions
            </span>
            <span className="text-[12px] font-bold px-2 py-0.5 rounded-full bg-[#FFF1F2] text-[#9F1239]">
              {items.length}
            </span>
          </div>
          <span className="text-[12px] text-[#64748B] font-medium">
            Priority Levers
          </span>
        </div>

        {/* Toast Feedback */}
        {resolvedToast && (
          <div className="p-3 bg-[#F0FDF4] border border-[#DCFCE7] rounded-xl text-[12px] text-[#166534] flex items-center justify-between animate-in fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#16A34A] shrink-0" strokeWidth={2.2} />
              <span className="font-semibold truncate max-w-[200px]">{resolvedToast}</span>
            </div>
            <button onClick={() => setResolvedToast(null)} className="text-[#166534]">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Action Cards (Clean, dignified white surfaces with refined status indicators) */}
        <div className="space-y-3">
          {items.length === 0 ? (
            <div className="p-5 text-center text-[#64748B] text-[13px] bg-white rounded-2xl border border-[#E9EDF4] shadow-card-subtle">
              <CheckCircle2 className="w-6 h-6 text-[#16A34A] mx-auto mb-2" strokeWidth={2.2} />
              <p className="font-bold text-[#0F172A]">All actions resolved</p>
              <p className="text-[12px] text-[#64748B] mt-1">No pending budget breaches or unvetted shadow tools.</p>
            </div>
          ) : (
            items.map((item) => {
              const isCritical = item.severity === 'critical';
              return (
                <div 
                  key={item.id}
                  className="p-3.5 rounded-2xl bg-white border border-[#E9EDF4] hover:border-[#CBD5E1] transition-all space-y-2 shadow-card-subtle"
                >
                  <div className="flex items-start gap-2.5">
                    {isCritical ? (
                      <span className="w-2 h-2 rounded-full bg-[#EF4444] mt-1.5 shrink-0" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-[#F59E0B] mt-1.5 shrink-0" />
                    )}
                    <span className="text-[13px] font-bold text-[#0F172A] leading-tight">
                      {item.title}
                    </span>
                  </div>

                  <p className="text-[12px] text-[#64748B] leading-relaxed line-clamp-2">
                    {item.description}
                  </p>

                  <div className="pt-2 border-t border-[#F1F5F9] flex items-center justify-between text-[12px]">
                    <span className="font-semibold text-[#0F172A]">
                      {item.impact}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleActionClick(item)}
                      className={`h-7 px-3 rounded-lg text-[12px] font-semibold flex items-center gap-1.5 transition cursor-pointer shadow-xs ${
                        isCritical
                          ? 'bg-[#EF4444] hover:bg-[#DC2626] text-white'
                          : 'bg-[#0F172A] hover:bg-[#1E293B] text-white'
                      }`}
                    >
                      <span>Resolve</span>
                      <ArrowRight className="w-3 h-3" strokeWidth={2} />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>

      {/* Bottom: Telemetry Widget */}
      <div className="pt-4 border-t border-[#F1F5F9] space-y-2">
        <div className="p-3.5 rounded-2xl bg-white border border-[#E9EDF4] space-y-2 shadow-card-subtle">
          <div className="flex items-center justify-between text-[12px]">
            <span className="font-bold text-[#475467] uppercase tracking-wider flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-[#3B82F6]" strokeWidth={2.2} />
              Telemetry Health
            </span>
            <span className="text-[#94A3B8] font-mono text-[11px]">{scenario.syncTimestamp}</span>
          </div>

          <div className="flex items-baseline justify-between">
            <span className="text-[20px] font-black text-[#0F172A] tabular-nums">
              {scenario.attributionCoverage}%
            </span>
            <span className="text-[12px] text-[#16A34A] font-semibold">
              Attributed
            </span>
          </div>

          <button
            type="button"
            onClick={onOpenDataModal}
            className="w-full py-2 rounded-xl bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#0F172A] font-semibold text-[12px] border border-[#E2E8F0] flex items-center justify-center gap-1.5 transition cursor-pointer shadow-2xs"
          >
            <span>Inspect 8 Live APIs</span>
            <ExternalLink className="w-3 h-3 text-[#64748B]" strokeWidth={2} />
          </button>
        </div>
      </div>

    </aside>
  );
}
