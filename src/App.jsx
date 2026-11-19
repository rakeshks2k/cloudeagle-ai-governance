import React, { useState, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import WorkspaceHeader from './components/WorkspaceHeader';
import KPICards from './components/KPICards';
import Chart1DeptBudget from './components/Chart1DeptBudget';
import Chart2AdoptionTrend from './components/Chart2AdoptionTrend';
import Chart3ToolSpend from './components/Chart3ToolSpend';
import DepartmentDrawer from './components/DepartmentDrawer';
import ToolDrawer from './components/ToolDrawer';

// Full Screen Right-Side Views (Replacing Modals & Popups)
import ToolCatalogView from './views/ToolCatalogView';
import DLPPolicyView from './views/DLPPolicyView';
import TelemetryView from './views/TelemetryView';
import SettingsView from './views/SettingsView';

import { SCENARIOS, DEPARTMENTS_DATA, TOOLS_DATA } from './data/mockData';
import { CheckCircle2, X } from 'lucide-react';

export default function App() {
  // Navigation & View State
  const [activeView, setActiveView] = useState('overview'); // 'overview' | 'catalog' | 'dlp' | 'telemetry' | 'limits' | 'harvest' | 'shadow' | 'settings'

  // Application Filter & Scenario State
  const [scenario, setScenario] = useState(SCENARIOS.STANDARD);
  const [selectedPeriod, setSelectedPeriod] = useState('Q4_2026');
  const [selectedDepartment, setSelectedDepartment] = useState('ALL');
  const [selectedTool, setSelectedTool] = useState('ALL');
  const [globalToast, setGlobalToast] = useState(null);
  
  // Slide-over Detail Drawer State
  const [activeDepartment, setActiveDepartment] = useState(null);
  const [activeTool, setActiveTool] = useState(null);

  const showToast = (msg) => {
    setGlobalToast(msg);
    setTimeout(() => setGlobalToast(null), 4000);
  };

  // Dynamic Period Adjustments
  const periodAdjustedScenario = useMemo(() => {
    if (selectedPeriod === 'TRAILING_30') {
      return {
        ...scenario,
        totalSpend: Math.round(scenario.totalSpend * 0.94),
        spendDelta: '+14.2% vs prior 30d',
        budgetRemaining: Math.round(scenario.budgetRemaining * 1.06),
        budgetConsumedPct: 67.8,
      };
    }
    if (selectedPeriod === 'Q3_2026') {
      return {
        ...scenario,
        totalSpend: 120600,
        budgetTotal: 180000,
        budgetRemaining: 59400,
        budgetConsumedPct: 67.0,
        spendDelta: '+12.4% vs Q2',
        shadowToolsCount: 11,
        activeUsersCount: 710,
        violationsCount: 15,
      };
    }
    if (selectedPeriod === 'YTD') {
      return {
        ...scenario,
        totalSpend: 412000,
        budgetTotal: 600000,
        budgetRemaining: 188000,
        budgetConsumedPct: 68.7,
        spendDelta: '+28.4% vs FY25',
        shadowToolsCount: 18,
        activeUsersCount: 847,
        violationsCount: 68,
      };
    }
    return scenario;
  }, [selectedPeriod, scenario]);

  // Dynamic Department Filtering
  const filteredDepartments = useMemo(() => {
    return DEPARTMENTS_DATA.filter((d) => {
      if (selectedDepartment !== 'ALL' && d.id !== selectedDepartment) return false;
      if (selectedTool !== 'ALL') {
        const toolObj = TOOLS_DATA.find((t) => t.id === selectedTool);
        if (toolObj && !d.topTools.some((t) => t.name.toLowerCase().includes(toolObj.name.toLowerCase().split(' ')[0]))) {
          return false;
        }
      }
      return true;
    }).map((d) => {
      if (selectedPeriod === 'TRAILING_30') {
        return { ...d, spend: Math.round(d.spend * 0.94) };
      }
      if (selectedPeriod === 'Q3_2026') {
        return { ...d, spend: Math.round(d.spend * 0.82), budget: Math.round(d.budget * 0.9) };
      }
      if (selectedPeriod === 'YTD') {
        return { ...d, spend: Math.round(d.spend * 2.8), budget: Math.round(d.budget * 3.0) };
      }
      return d;
    });
  }, [selectedDepartment, selectedTool, selectedPeriod]);

  // Dynamic Tool Filtering
  const filteredTools = useMemo(() => {
    return TOOLS_DATA.filter((t) => {
      if (selectedTool !== 'ALL' && t.id !== selectedTool) return false;
      if (selectedDepartment !== 'ALL') {
        const deptObj = DEPARTMENTS_DATA.find((d) => d.id === selectedDepartment);
        if (deptObj && !deptObj.topTools.some((dt) => t.name.toLowerCase().includes(dt.name.toLowerCase().split(' ')[0]))) {
          return false;
        }
      }
      return true;
    }).map((t) => {
      if (selectedPeriod === 'TRAILING_30') {
        return { ...t, spend: Math.round(t.spend * 0.94) };
      }
      if (selectedPeriod === 'Q3_2026') {
        return { ...t, spend: Math.round(t.spend * 0.8) };
      }
      if (selectedPeriod === 'YTD') {
        return { ...t, spend: Math.round(t.spend * 2.8) };
      }
      return t;
    });
  }, [selectedTool, selectedDepartment, selectedPeriod]);

  return (
    <div className="min-h-screen w-full bg-[#F6F8FC] flex font-sans antialiased text-[#12233F]">
      
      {/* 1. Left Vertical Navigation Sidebar (268px Desktop Width) */}
      <Sidebar 
        activeView={activeView}
        onNavigate={(view) => {
          setActiveView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* 2. Main Executive Canvas (Renders Active View in Full Screen on the Right) */}
      <main className="flex-1 min-w-0 min-h-screen bg-[#F6F8FC]">
        <div className="px-6 sm:px-8 lg:px-10 py-8 lg:py-9 max-w-[1720px] w-full mx-auto space-y-8">
          
          {/* Global Notification Toast (Fixed Bottom Right) */}
          {globalToast && (
            <div className="fixed bottom-6 right-6 z-50 px-4 py-3 bg-white border border-[#E2E9F2] text-[#12233F] rounded-[12px] shadow-lg flex items-center gap-3 animate-in slide-in-from-bottom-4 duration-200">
              <div className="w-6 h-6 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#0E9F6E]" strokeWidth={2.4} />
              </div>
              <span className="text-[13px] font-medium text-[#12233F]">{globalToast}</span>
              <button 
                type="button"
                onClick={() => setGlobalToast(null)} 
                className="text-[#8B9BB2] hover:text-[#12233F] cursor-pointer ml-1 p-1"
                title="Dismiss"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* VIEW 1: Main Executive Command Center Overview */}
          {activeView === 'overview' && (
            <div className="space-y-8 animate-in fade-in duration-150">
              {/* Header & Controls Toolbar */}
              <WorkspaceHeader
                selectedPeriod={selectedPeriod}
                onSelectPeriod={(p) => {
                  setSelectedPeriod(p);
                  showToast(`Period updated to: ${p.replace('_', ' ')}.`);
                }}
                selectedDepartment={selectedDepartment}
                onSelectDepartment={setSelectedDepartment}
                selectedTool={selectedTool}
                onSelectTool={setSelectedTool}
                scenario={periodAdjustedScenario}
                onOpenDataModal={() => setActiveView('telemetry')}
                onToast={showToast}
              />

              {/* Section 1: Executive KPI Metrics Grid */}
              <section aria-label="Key Performance Indicators">
                <KPICards
                  scenario={periodAdjustedScenario}
                  onOpenViolations={() => setActiveView('dlp')}
                  onOpenShadow={() => setActiveTool(TOOLS_DATA.find((t) => t.id === 'chatgpt-plus'))}
                />
              </section>

              {/* Section 2: Primary Decision Charts (2-Column Grid) */}
              <section className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-stretch" aria-label="Primary Decision Charts">
                {/* Chart 1: Department Spend vs. Budget Limit */}
                <div className="h-full">
                  <Chart1DeptBudget
                    departments={filteredDepartments}
                    onSelectDepartment={(dept) => setActiveDepartment(dept)}
                  />
                </div>

                {/* Chart 3: AI Spend by Tool & Sanction Status */}
                <div className="h-full">
                  <Chart3ToolSpend
                    tools={filteredTools}
                    onSelectTool={(tool) => setActiveTool(tool)}
                    onOpenToolCatalog={() => setActiveView('catalog')}
                  />
                </div>
              </section>

              {/* Section 3: Trajectory & Trend Analysis */}
              <section aria-label="Adoption Velocity and Governance Trajectory">
                <Chart2AdoptionTrend />
              </section>
            </div>
          )}

          {/* VIEW 2: Full-Screen AI Tool Catalog View */}
          {activeView === 'catalog' && (
            <ToolCatalogView 
              onBack={() => setActiveView('overview')}
              onSelectTool={(tool) => setActiveTool(tool)}
            />
          )}

          {/* VIEW 3: Full-Screen DLP Policy Violations Log View */}
          {activeView === 'dlp' && (
            <DLPPolicyView 
              onBack={() => setActiveView('overview')}
            />
          )}

          {/* VIEW 4: Full-Screen API Telemetry Engine View */}
          {activeView === 'telemetry' && (
            <TelemetryView 
              onBack={() => setActiveView('overview')}
              scenario={periodAdjustedScenario}
            />
          )}

          {/* VIEW 5: Full-Screen Governance & Policy Settings View */}
          {activeView === 'settings' && (
            <SettingsView 
              onBack={() => setActiveView('overview')}
            />
          )}

        </div>
      </main>

      {/* Slide-over Detail Drawers */}
      <DepartmentDrawer
        department={activeDepartment}
        onClose={() => setActiveDepartment(null)}
      />

      <ToolDrawer
        tool={activeTool}
        onClose={() => setActiveTool(null)}
      />

    </div>
  );
}
