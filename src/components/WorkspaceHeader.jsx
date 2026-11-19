import React, { useState } from 'react';
import { 
  Calendar, 
  Building2, 
  Cpu, 
  Download, 
  ChevronDown, 
  RotateCcw
} from 'lucide-react';
import { DEPARTMENTS_DATA, TOOLS_DATA } from '../data/mockData';

export default function WorkspaceHeader({
  selectedPeriod,
  onSelectPeriod,
  selectedDepartment,
  onSelectDepartment,
  selectedTool,
  onSelectTool,
  scenario,
  onOpenDataModal,
  onToast
}) {
  const isFiltered = selectedDepartment !== 'ALL' || selectedTool !== 'ALL';
  const [isExporting, setIsExporting] = useState(false);

  // Real CSV Export Function
  const handleExportCSV = () => {
    setIsExporting(true);

    const rows = [
      ['CloudEagle.ai - Enterprise AI Governance Platform Audit Report'],
      ['Generated Date', new Date().toLocaleDateString()],
      ['Time Period', selectedPeriod],
      ['Simulation Scenario', scenario?.name || 'Standard Baseline'],
      ['Total AI Spend ($)', scenario?.totalSpend || 142800],
      ['Total Budget ($)', scenario?.budgetTotal || 200000],
      ['Budget Remaining ($)', scenario?.budgetRemaining || 57200],
      ['Shadow AI Monthly Spend ($)', 22300],
      ['Active AI Employees', `${scenario?.activeUsersCount || 847} / ${scenario?.totalEmployees || 1380}`],
      ['Telemetry Attribution Coverage', `${scenario?.attributionCoverage || 94.2}%`],
      [],
      ['DEPARTMENT EXPENDITURE AUDIT'],
      ['Cost Center', 'Department Name', 'Spend ($)', 'Budget ($)', 'Utilization (%)', 'Status', 'Active Users', 'Primary AI Application'],
      ...DEPARTMENTS_DATA.map(d => [
        d.costCenter,
        `"${d.name}"`,
        d.spend,
        d.budget,
        `${d.utilization.toFixed(1)}%`,
        d.status,
        d.activeAiUsers,
        `"${d.topTools[0]?.name || ''}"`
      ]),
      [],
      ['AI TOOL INVENTORY & SECURITY STATUS'],
      ['Tool ID', 'Tool Name', 'Vendor', 'Category', 'Clearance Status', 'Risk Score (1-100)', 'Spend ($)', 'Active Users', 'Dormant Seats', 'Invoicing Vector'],
      ...TOOLS_DATA.map(t => [
        t.id,
        `"${t.name}"`,
        `"${t.vendor}"`,
        `"${t.category}"`,
        t.status,
        t.riskScore,
        t.spend,
        t.activeUsers,
        t.inactiveSeats || 0,
        `"${t.invoicingSource}"`
      ])
    ];

    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map(r => r.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `CloudEagle_AI_Governance_Audit_${selectedPeriod}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => {
      setIsExporting(false);
      if (onToast) onToast(`Exported: CloudEagle_AI_Governance_Audit_${selectedPeriod}.csv downloaded successfully.`);
    }, 600);
  };

  return (
    <header className="space-y-4">
      {/* 1. Top Section: Command Center Title & Telemetry Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[28px] sm:text-[30px] font-bold text-[#12233F] tracking-tight leading-tight">
            AI Governance Command Center
          </h1>
          <p className="text-[14px] text-[#60738F] mt-1">
            Track AI tools used across your organization, monitor team spending limits, and detect unapproved software in real time.
          </p>
        </div>

        {/* Live Engine & Telemetry Pill */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onOpenDataModal}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[10px] bg-[#ECFDF5] hover:bg-[#D1FAE5] border border-[#A7F3D0] text-xs font-semibold text-[#0E9F6E] transition cursor-pointer"
            title="Inspect 8 Connected Live Data Sources"
          >
            <span className="w-2 h-2 rounded-full bg-[#0E9F6E] animate-pulse" />
            <span>8 Data Sources Connected</span>
            <span className="text-[#A7F3D0]">•</span>
            <span className="font-bold tabular-nums">
              {scenario?.attributionCoverage || 94.2}% Cost Tracked
            </span>
          </button>
        </div>
      </div>

      {/* 2. Controls Toolbar: Date, Dept, Tool, Export */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1 pb-3 border-b border-[#E2E9F2]">
        
        {/* Left Filter Controls */}
        <div className="flex items-center gap-2.5 flex-wrap">
          
          {/* Time Period Filter */}
          <div className="relative">
            <select
              value={selectedPeriod}
              onChange={(e) => onSelectPeriod(e.target.value)}
              className="h-[40px] bg-white hover:bg-[#F0F4F9] border border-[#E2E9F2] text-[#12233F] text-[13px] font-medium rounded-[10px] pl-8.5 pr-8 focus:border-[#3152F5] focus:ring-2 focus:ring-[#3152F5]/20 focus:outline-none appearance-none cursor-pointer transition shadow-xs"
            >
              <option value="Q4_2026">Q4 2026 (Month-to-Date)</option>
              <option value="TRAILING_30">Past 30 Days</option>
              <option value="Q3_2026">Q3 2026 (Prior Quarter)</option>
              <option value="YTD">Full Year (YTD 2026)</option>
            </select>
            <Calendar className="w-4 h-4 text-[#8B9BB2] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" strokeWidth={1.8} />
            <ChevronDown className="w-3.5 h-3.5 text-[#8B9BB2] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" strokeWidth={2} />
          </div>

          {/* Department Filter */}
          <div className="relative">
            <select
              value={selectedDepartment}
              onChange={(e) => onSelectDepartment(e.target.value)}
              className="h-[40px] bg-white hover:bg-[#F0F4F9] border border-[#E2E9F2] text-[#12233F] text-[13px] font-medium rounded-[10px] pl-8.5 pr-8 focus:border-[#3152F5] focus:ring-2 focus:ring-[#3152F5]/20 focus:outline-none appearance-none cursor-pointer transition shadow-xs"
            >
              <option value="ALL">All Depts ({DEPARTMENTS_DATA.length})</option>
              {DEPARTMENTS_DATA.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name.split(' ')[0]} {d.status === 'breach' ? '(Over)' : ''}
                </option>
              ))}
            </select>
            <Building2 className="w-4 h-4 text-[#8B9BB2] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" strokeWidth={1.8} />
            <ChevronDown className="w-3.5 h-3.5 text-[#8B9BB2] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" strokeWidth={2} />
          </div>

          {/* AI Tool Filter */}
          <div className="relative">
            <select
              value={selectedTool}
              onChange={(e) => onSelectTool(e.target.value)}
              className="h-[40px] bg-white hover:bg-[#F0F4F9] border border-[#E2E9F2] text-[#12233F] text-[13px] font-medium rounded-[10px] pl-8.5 pr-8 focus:border-[#3152F5] focus:ring-2 focus:ring-[#3152F5]/20 focus:outline-none appearance-none cursor-pointer transition shadow-xs"
            >
              <option value="ALL">All Tools ({TOOLS_DATA.length})</option>
              {TOOLS_DATA.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name.split(' ')[0]} ({t.status === 'shadow' ? 'Shadow' : 'Appr'})
                </option>
              ))}
            </select>
            <Cpu className="w-4 h-4 text-[#8B9BB2] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" strokeWidth={1.8} />
            <ChevronDown className="w-3.5 h-3.5 text-[#8B9BB2] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" strokeWidth={2} />
          </div>

          {/* Reset Filters */}
          {isFiltered && (
            <button
              type="button"
              onClick={() => {
                onSelectDepartment('ALL');
                onSelectTool('ALL');
              }}
              className="h-[40px] flex items-center gap-1.5 px-3.5 rounded-[10px] text-[13px] font-medium text-[#60738F] hover:text-[#12233F] hover:bg-[#F0F4F9] bg-white border border-[#E2E9F2] transition cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" strokeWidth={2} />
              <span>Reset</span>
            </button>
          )}

        </div>

        {/* Right Side: Real CSV Export (Primary CTA Color: #3152F5) */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={handleExportCSV}
            disabled={isExporting}
            className="h-[40px] flex items-center gap-2 px-4.5 rounded-[10px] bg-[#3152F5] hover:bg-[#2443DC] text-white text-[13px] font-medium transition cursor-pointer shadow-xs shrink-0 disabled:opacity-75"
          >
            <Download className="w-4 h-4" strokeWidth={2} />
            <span>{isExporting ? 'Exporting...' : 'Export CSV'}</span>
          </button>
        </div>

      </div>
    </header>
  );
}
