import React from 'react';
import { 
  LayoutDashboard, 
  Cpu, 
  ShieldAlert, 
  Database, 
  Settings
} from 'lucide-react';

export default function Sidebar({ activeView, onNavigate }) {
  const getNavClass = (viewName) => {
    const isActive = activeView === viewName;
    return `w-full h-[44px] flex items-center justify-between px-3.5 rounded-[10px] text-[14px] font-medium transition-colors cursor-pointer group ${
      isActive
        ? 'bg-[#3152F5] text-white shadow-xs'
        : 'text-[#60738F] hover:text-[#12233F] hover:bg-[#F0F4F9]'
    }`;
  };

  const getIconClass = (viewName) => {
    const isActive = activeView === viewName;
    return `w-[18px] h-[18px] shrink-0 transition-colors ${isActive ? 'text-white' : 'text-[#8B9BB2] group-hover:text-[#60738F]'}`;
  };

  return (
    <aside className="w-[268px] bg-white border-r border-[#E2E9F2] h-screen sticky top-0 flex flex-col justify-between py-6 px-4 shrink-0 select-none overflow-y-auto z-20">
      
      {/* Top: Brand & Navigation */}
      <div className="space-y-6">
        
        {/* Brand Logo with CloudEagle Icon */}
        <div 
          onClick={() => onNavigate('overview')}
          className="flex items-center gap-2.5 px-2 cursor-pointer group"
          title="Return to Executive Overview"
        >
          <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 shadow-xs ring-1 ring-[#E2E9F2] group-hover:ring-[#3152F5]/40 transition">
            <img 
              src="/cloudeagle-logo.jpg" 
              alt="CloudEagle.ai Logo" 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="font-bold text-[16px] tracking-tight text-[#12233F] leading-tight">
              CloudEagle<span className="text-[#3152F5]">.ai</span>
            </div>
            <div className="text-[11px] font-medium text-[#8B9BB2]">
              AI Governance Platform
            </div>
          </div>
        </div>

        {/* Navigation Sections */}
        <div className="space-y-3">
          <div className="px-2 text-[11px] font-semibold uppercase tracking-wider text-[#8B9BB2]">
            Navigation
          </div>
          <nav className="space-y-1">
            
            {/* 1. Overview (Primary Executive Command Center) */}
            <button 
              type="button"
              onClick={() => onNavigate('overview')}
              className={getNavClass('overview')}
              title="Executive Command Center (Spend Limits & Shadow AI)"
            >
              <div className="flex items-center gap-2.5">
                <LayoutDashboard className={getIconClass('overview')} strokeWidth={2} />
                <span>Command Center</span>
              </div>
              {activeView === 'overview' && (
                <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
              )}
            </button>

            {/* 2. AI Tool Inventory (All 18 Tools: Approved & Shadow) */}
            <button 
              type="button"
              onClick={() => onNavigate('catalog')}
              className={getNavClass('catalog')}
              title="All 18 AI Tools (Approved, Shadow AI, and Pilots)"
            >
              <div className="flex items-center gap-2.5">
                <Cpu className={getIconClass('catalog')} strokeWidth={1.8} />
                <span>Tool Inventory</span>
              </div>
              <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-[6px] ${
                activeView === 'catalog' ? 'bg-white/20 text-white' : 'bg-[#F0F4F9] text-[#60738F]'
              }`}>
                18
              </span>
            </button>

            {/* 3. Security & DLP Logs (23 Alerts) */}
            <button 
              type="button"
              onClick={() => onNavigate('dlp')}
              className={getNavClass('dlp')}
              title="Inspect 23 DLP Policy Alerts & Prompt Leak Logs"
            >
              <div className="flex items-center gap-2.5">
                <ShieldAlert className={activeView === 'dlp' ? 'w-[18px] h-[18px] text-white shrink-0' : 'w-[18px] h-[18px] text-[#E64D5B] shrink-0'} strokeWidth={1.8} />
                <span>Security & DLP</span>
              </div>
              <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-[6px] border ${
                activeView === 'dlp' ? 'bg-white/20 text-white border-white/20' : 'bg-[#FEF2F2] text-[#E64D5B] border-[#FECACA]'
              }`}>
                23
              </span>
            </button>

            {/* 4. Data Sources & APIs (Part 2) */}
            <button 
              type="button"
              onClick={() => onNavigate('telemetry')}
              className={getNavClass('telemetry')}
              title="Inspect 8 Connected Live Telemetry APIs"
            >
              <div className="flex items-center gap-2.5">
                <Database className={getIconClass('telemetry')} strokeWidth={1.8} />
                <span>Data Sources</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-[#0E9F6E]" title="8 connectors healthy" />
            </button>

            {/* 5. Settings */}
            <button 
              type="button"
              onClick={() => onNavigate('settings')}
              className={getNavClass('settings')}
              title="Configure Governance Policies & Spend Alerts"
            >
              <div className="flex items-center gap-2.5">
                <Settings className={getIconClass('settings')} strokeWidth={1.8} />
                <span>Settings</span>
              </div>
            </button>

          </nav>
        </div>

      </div>

      {/* Bottom: User Profile */}
      <div className="pt-4 border-t border-[#E2E9F2]">
        <div 
          onClick={() => onNavigate('settings')}
          className="flex items-center px-1.5 py-1.5 cursor-pointer hover:bg-[#F0F4F9] rounded-[10px] transition"
          title="Account & Governance Settings"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-[8px] bg-[#EFF6FF] border border-[#BFDBFE] flex items-center justify-center font-bold text-xs text-[#3152F5]">
              R
            </div>
            <div className="text-left">
              <div className="text-[13px] font-semibold text-[#12233F] leading-tight">Rakesh</div>
              <div className="text-[11px] text-[#8B9BB2]">Enterprise Admin</div>
            </div>
          </div>
        </div>
      </div>

    </aside>
  );
}
