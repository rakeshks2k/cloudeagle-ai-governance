import React from 'react';
import { ShieldAlert, ExternalLink } from 'lucide-react';

export default function Chart3ToolSpend({ 
  tools, 
  onSelectTool, 
  onOpenToolCatalog
}) {
  const displayTools = tools.length > 7 ? tools.slice(0, 7) : tools;
  const maxSpend = Math.max(...tools.map((t) => t.spend));

  return (
    <div 
      id="chart3-tool-spend" 
      className="bg-white rounded-[14px] border border-[#E2E9F2] p-5 sm:p-6 shadow-xs flex flex-col justify-between h-full scroll-mt-6"
    >
      <div>
        {/* Header: Clean, uncluttered title & subtitle */}
        <div className="mb-4">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-[15px] font-semibold text-[#12233F] tracking-tight">
              AI Spend by Tool & Sanction Status
            </h3>
            <span className="text-xs text-[#8B9BB2] font-medium hidden sm:inline">
              {tools.length > 7 ? `Top 7 of ${tools.length} Tools` : `${tools.length} Tools`}
            </span>
          </div>
          <p className="text-[12.5px] text-[#60738F] mt-0.5">
            AI tools ranked by monthly cost, showing approved enterprise tools vs. unapproved apps.
          </p>
        </div>

        {/* Refined Danger Strip: Calm, compact, pastel red */}
        <div className="mb-4 px-3.5 py-2 rounded-[8px] bg-[#FEF2F2] border border-[#FEE2E2] flex items-center justify-between text-xs text-[#991B1B]">
          <div className="flex items-center gap-2 min-w-0">
            <ShieldAlert className="w-3.5 h-3.5 text-[#E64D5B] shrink-0" strokeWidth={2.2} />
            <span className="truncate">
              <strong className="font-semibold text-[#7F1D1D]">$22,300/mo unapproved spend</strong> detected across 6 unmonitored apps
            </span>
          </div>
          <button 
            type="button"
            onClick={() => onSelectTool(tools.find((t) => t.id === 'chatgpt-plus') || tools[0])}
            className="text-xs font-semibold text-[#3152F5] hover:text-[#2443DC] hover:underline cursor-pointer shrink-0 ml-3"
          >
            Review →
          </button>
        </div>

        {/* Tools List: Clean 2-line layout with sleek 5px progress bars */}
        <div className="space-y-1.5">
          {displayTools.map((tool) => {
            const isShadow = tool.status === 'shadow';
            const pctOfMax = (tool.spend / maxSpend) * 100;

            return (
              <div 
                key={tool.id}
                onClick={() => onSelectTool(tool)}
                className="group px-3 py-2.5 rounded-[9px] hover:bg-[#F8FAFC] transition-colors border border-transparent hover:border-[#E2E9F2] cursor-pointer"
              >
                {/* Row 1: Tool Name + (only if Shadow) Badge + Spend */}
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2 truncate pr-2">
                    <span className="font-medium text-[13.5px] text-[#12233F] group-hover:text-[#3152F5] transition-colors truncate">
                      {tool.name}
                    </span>
                    
                    {/* Status Badge: ONLY shown on exceptions (Shadow AI) to eliminate badge fatigue */}
                    {isShadow && (
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10.5px] font-semibold bg-[#FEF2F2] text-[#E64D5B] border border-[#FECACA] shrink-0">
                        Shadow AI
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="font-semibold text-[13.5px] text-[#12233F] tabular-nums">
                      ${tool.spend.toLocaleString()}
                    </span>
                    <span className="text-xs text-[#8B9BB2] tabular-nums hidden sm:inline">
                      (${tool.costPerUser}/mo)
                    </span>
                  </div>
                </div>

                {/* Row 2: Sleek 5px Progress Bar - Soft Light Slate */}
                <div className="w-full bg-[#EEF2F6] rounded-full h-1.5 overflow-hidden my-1.5">
                  <div 
                    className="h-full rounded-full transition-all duration-300 bg-[#64748B]"
                    style={{ width: `${pctOfMax}%` }}
                  />
                </div>

                {/* Row 3: Quiet Secondary Metadata */}
                <div className="flex items-center justify-between text-[12px] text-[#60738F]">
                  <span className="truncate">
                    <span className="text-[#12233F] font-medium tabular-nums">{tool.activeUsers}</span> active users
                    {tool.inactiveSeats > 0 && (
                      <span className="text-[#D97706] font-medium ml-1.5">
                        • {tool.inactiveSeats} unused licenses
                      </span>
                    )}
                  </span>
                  <span className="text-[#8B9BB2] text-[11.5px] truncate shrink-0">
                    {tool.category || 'AI Tool'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer: Quiet helpful action */}
      <div className="mt-4 pt-3 border-t border-[#E2E9F2] flex items-center justify-between text-xs text-[#60738F]">
        <span>Click any tool to inspect contracts & security posture</span>
        <button
          type="button"
          onClick={onOpenToolCatalog}
          className="font-medium text-[#3152F5] hover:text-[#2443DC] hover:underline cursor-pointer"
        >
          View all 18 tools →
        </button>
      </div>
    </div>
  );
}
