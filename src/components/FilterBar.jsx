import React from 'react';
import { 
  Calendar, 
  Building2, 
  Cpu, 
  Download, 
  ChevronDown, 
  SlidersHorizontal,
  RotateCcw
} from 'lucide-react';
import { DEPARTMENTS_DATA, TOOLS_DATA } from '../data/mockData';

export default function FilterBar({
  selectedPeriod,
  onSelectPeriod,
  selectedDepartment,
  onSelectDepartment,
  selectedTool,
  onSelectTool,
  scenario,
  onOpenDataModal
}) {
  const isFiltered = selectedDepartment !== 'ALL' || selectedTool !== 'ALL';

  return (
    <div className="bg-white border-b border-[#E4E7EC] py-3.5 shadow-[0_1px_2px_rgba(16,24,40,0.05)]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3">
          
          {/* Left: Filter Controls */}
          <div className="flex flex-wrap items-center gap-2.5">
            
            <div className="flex items-center gap-1.5 text-[13px] font-medium text-[#475467] mr-1">
              <SlidersHorizontal className="w-4 h-4 text-[#667085]" strokeWidth={1.75} />
              <span>Filters</span>
            </div>

            {/* Date Range Selector */}
            <div className="relative">
              <select
                value={selectedPeriod}
                onChange={(e) => onSelectPeriod(e.target.value)}
                className="h-10 bg-white hover:bg-[#F8FAFC] border border-[#D0D5DD] text-[#101828] text-[13px] font-medium rounded-lg pl-9 pr-8 focus:border-[#2244FE] focus:ring-3 focus:ring-[#2244FE]/20 focus:outline-none appearance-none cursor-pointer transition shadow-xs"
              >
                <option value="Q4_2026">Q4 2026 (MTD: Nov 1 – Nov 20)</option>
                <option value="TRAILING_30">Trailing 30 Days</option>
                <option value="Q3_2026">Q3 2026 (Closed)</option>
                <option value="YTD">2026 Year-to-Date</option>
              </select>
              <Calendar className="w-4 h-4 text-[#667085] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" strokeWidth={1.75} />
              <ChevronDown className="w-4 h-4 text-[#667085] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" strokeWidth={1.75} />
            </div>

            {/* Department Filter */}
            <div className="relative">
              <select
                value={selectedDepartment}
                onChange={(e) => onSelectDepartment(e.target.value)}
                className="h-10 bg-white hover:bg-[#F8FAFC] border border-[#D0D5DD] text-[#101828] text-[13px] font-medium rounded-lg pl-9 pr-8 focus:border-[#2244FE] focus:ring-3 focus:ring-[#2244FE]/20 focus:outline-none appearance-none cursor-pointer transition shadow-xs"
              >
                <option value="ALL">All Departments (7)</option>
                {DEPARTMENTS_DATA.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} {d.status === 'breach' ? '(Over budget)' : ''}
                  </option>
                ))}
              </select>
              <Building2 className="w-4 h-4 text-[#667085] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" strokeWidth={1.75} />
              <ChevronDown className="w-4 h-4 text-[#667085] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" strokeWidth={1.75} />
            </div>

            {/* AI Tool Filter */}
            <div className="relative">
              <select
                value={selectedTool}
                onChange={(e) => onSelectTool(e.target.value)}
                className="h-10 bg-white hover:bg-[#F8FAFC] border border-[#D0D5DD] text-[#101828] text-[13px] font-medium rounded-lg pl-9 pr-8 focus:border-[#2244FE] focus:ring-3 focus:ring-[#2244FE]/20 focus:outline-none appearance-none cursor-pointer transition shadow-xs"
              >
                <option value="ALL">All AI Tools (18)</option>
                {TOOLS_DATA.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} ({t.status === 'shadow' ? 'Shadow' : 'Approved'})
                  </option>
                ))}
              </select>
              <Cpu className="w-4 h-4 text-[#667085] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" strokeWidth={1.75} />
              <ChevronDown className="w-4 h-4 text-[#667085] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" strokeWidth={1.75} />
            </div>

            {/* Reset Filters */}
            {isFiltered && (
              <button
                type="button"
                onClick={() => {
                  onSelectDepartment('ALL');
                  onSelectTool('ALL');
                }}
                className="h-10 flex items-center gap-1.5 px-3 rounded-lg text-[13px] font-medium text-[#475467] hover:text-[#101828] hover:bg-[#F8FAFC] border border-[#E4E7EC] transition cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#667085]" strokeWidth={1.75} />
                <span>Reset</span>
              </button>
            )}

          </div>

          {/* Right: Data Freshness Status Pill & Export Button */}
          <div className="flex items-center gap-3">
            
            {/* Clickable Telemetry Pill */}
            <button
              type="button"
              onClick={onOpenDataModal}
              className="h-10 flex items-center gap-2 px-3.5 rounded-lg border border-[#E4E7EC] bg-white hover:bg-[#F8FAFC] text-[13px] text-[#475467] transition cursor-pointer shadow-xs"
              title="Click to view full API telemetry freshness & attribution coverage"
            >
              <span className={`w-2 h-2 rounded-full ${
                scenario.attributionCoverage < 85 ? 'bg-[#D97706]' : 'bg-[#16A34A]'
              }`} />
              <span>
                Synced <strong className="text-[#101828] font-medium">{scenario.syncTimestamp}</strong>
              </span>
              <span className="text-[#D0D5DD]">|</span>
              <span>
                Coverage <strong className="text-[#101828] font-medium tabular-nums">{scenario.attributionCoverage}%</strong>
              </span>
            </button>

            {/* Export PDF Button */}
            <button
              type="button"
              onClick={() => alert('Generating executive report: Board-ready PDF summary for Q4 2026 AI Governance.')}
              className="h-10 flex items-center gap-2 px-4 rounded-lg bg-white hover:bg-[#F8FAFC] text-[#101828] text-[14px] font-medium border border-[#D0D5DD] transition cursor-pointer shadow-xs"
            >
              <Download className="w-4 h-4 text-[#475467]" strokeWidth={1.75} />
              <span>Export</span>
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}
