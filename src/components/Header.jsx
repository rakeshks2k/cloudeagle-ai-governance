import React from 'react';
import { 
  Shield, 
  ChevronDown, 
  Lightbulb, 
  CheckCircle2, 
  Bell
} from 'lucide-react';
import { SCENARIOS } from '../data/mockData';

export default function Header({ 
  currentScenario, 
  onSelectScenario, 
  showAnnotations, 
  onToggleAnnotations
}) {
  return (
    <header className="bg-white border-b border-[#E4E7EC] sticky top-0 z-30 shadow-[0_1px_2px_rgba(16,24,40,0.05)]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Product Brand */}
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#2244FE] flex items-center justify-center text-white shadow-xs">
                <Shield className="w-5 h-5" strokeWidth={2} />
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[17px] tracking-tight text-[#101828]">
                  CloudEagle<span className="text-[#2244FE]">.ai</span>
                </span>
                <span className="text-[12px] font-medium text-[#475467] pl-2 border-l border-[#EAECF0] hidden sm:inline">
                  AI Governance
                </span>
              </div>
            </div>

            {/* Navigation Tabs */}
            <nav className="hidden lg:flex items-center gap-1 text-[14px] font-medium">
              <button 
                type="button" 
                className="px-3.5 py-1.5 rounded-md bg-[#EEF2FF] text-[#2244FE] font-medium transition cursor-default"
              >
                Executive Overview
              </button>
              <button 
                type="button" 
                className="px-3.5 py-1.5 rounded-md text-[#475467] hover:text-[#101828] hover:bg-[#F8FAFC] transition cursor-pointer"
              >
                AI Tool Catalog (18)
              </button>
              <button 
                type="button" 
                className="px-3.5 py-1.5 rounded-md text-[#475467] hover:text-[#101828] hover:bg-[#F8FAFC] transition cursor-pointer"
              >
                User Telemetry
              </button>
              <button 
                type="button" 
                className="px-3.5 py-1.5 rounded-md text-[#475467] hover:text-[#101828] hover:bg-[#F8FAFC] transition cursor-pointer"
              >
                DLP & Policy Logs
              </button>
            </nav>
          </div>

          {/* Right Controls: Scenario Switcher, PM Annotation Switch, User Info */}
          <div className="flex items-center gap-3">
            
            {/* PM Strategy Annotations Toggle Button */}
            <button
              type="button"
              onClick={onToggleAnnotations}
              className={`h-9 flex items-center gap-2 px-3 rounded-lg text-[13px] font-medium transition cursor-pointer border ${
                showAnnotations
                  ? 'bg-[#EEF2FF] text-[#2244FE] border-[#C7D2FE]'
                  : 'bg-white text-[#475467] border-[#D0D5DD] hover:bg-[#F8FAFC] hover:text-[#101828]'
              }`}
              title="Toggle Product Strategy & Evaluation Annotations"
            >
              <Lightbulb className={`w-4 h-4 ${showAnnotations ? 'text-[#2244FE]' : 'text-[#667085]'}`} strokeWidth={1.75} />
              <span className="hidden sm:inline">PM Annotations:</span>
              <span className="font-semibold text-[12px]">
                {showAnnotations ? 'On' : 'Off'}
              </span>
            </button>

            {/* Scenario Switcher */}
            <div className="relative">
              <select
                value={currentScenario.id}
                onChange={(e) => onSelectScenario(SCENARIOS[e.target.value])}
                className="h-9 bg-white border border-[#D0D5DD] text-[#101828] text-[13px] font-medium rounded-lg pl-3 pr-8 focus:border-[#2244FE] focus:ring-3 focus:ring-[#2244FE]/20 focus:outline-none appearance-none cursor-pointer transition shadow-xs"
                title="Select Demo Scenario State"
              >
                <option value="STANDARD">Scenario: Q4 Baseline (Standard)</option>
                <option value="CRITICAL_BREACH">Scenario: Critical Budget Breach</option>
                <option value="ONBOARDING_PARTIAL">Scenario: Partial Integration / Lag</option>
              </select>
              <ChevronDown className="w-4 h-4 text-[#667085] absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" strokeWidth={1.75} />
            </div>

            {/* User Profile / CFO */}
            <div className="flex items-center gap-3 pl-3 border-l border-[#EAECF0]">
              <div className="w-9 h-9 rounded-full bg-[#EEF2FF] border border-[#C7D2FE] flex items-center justify-center font-semibold text-[13px] text-[#2244FE]">
                SJ
              </div>
              <div className="hidden xl:block text-left">
                <div className="text-[13px] font-medium text-[#101828] leading-tight">Sarah Jenkins</div>
                <div className="text-[12px] text-[#667085]">Chief Financial Officer</div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
}
