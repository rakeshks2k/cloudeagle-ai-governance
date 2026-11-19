import React, { useState } from 'react';
import { 
  DollarSign, 
  CreditCard, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  X 
} from 'lucide-react';

export default function SettingsView() {
  const [budgetThreshold, setBudgetThreshold] = useState(85);
  const [autoQuarantine, setAutoQuarantine] = useState(true);
  const [dlpStrict, setDlpStrict] = useState(true);
  const [harvestDays, setHarvestDays] = useState(60);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => {
      setToast((current) => (current === message ? null : current));
    }, 3500);
  };

  const handleSliderChange = (e) => {
    const val = Number(e.target.value);
    setBudgetThreshold(val);
    setHasUnsavedChanges(true);
    showToast(`Budget alert threshold set to ${val}%.`);
  };

  const handleToggleQuarantine = () => {
    const next = !autoQuarantine;
    setAutoQuarantine(next);
    setHasUnsavedChanges(true);
    showToast(`Card expense flagging ${next ? 'enabled' : 'disabled'}.`);
  };

  const handleToggleDlp = () => {
    const next = !dlpStrict;
    setDlpStrict(next);
    setHasUnsavedChanges(true);
    showToast(`Confidential prompt protection ${next ? 'enabled' : 'disabled'}.`);
  };

  const handleSelectHarvestDays = (days) => {
    setHarvestDays(days);
    setHasUnsavedChanges(true);
    showToast(`Inactive seat reclaim window set to ${days} days.`);
  };

  const handleSave = () => {
    setHasUnsavedChanges(false);
    showToast('All governance settings saved successfully.');
  };

  return (
    <div className="max-w-[1040px] mx-auto w-full space-y-6 animate-in fade-in duration-150 pb-12">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E2E9F2]">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-[28px] sm:text-[30px] font-bold text-[#12233F] tracking-tight leading-tight">
              Governance & Spending Settings
            </h1>
            {hasUnsavedChanges && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[6px] bg-[#FFFBEB] text-[#D99219] border border-[#FDE68A] text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D99219] animate-pulse" />
                Unsaved changes
              </span>
            )}
          </div>
          <p className="text-[13px] text-[#60738F] mt-1">
            Set automatic spending limits, employee card rules, and AI data safeguards.
          </p>
        </div>

        <button
          type="button"
          onClick={handleSave}
          className={`h-[40px] px-6 rounded-[10px] font-medium text-[13px] transition cursor-pointer shadow-xs flex items-center gap-2 shrink-0 ${
            hasUnsavedChanges
              ? 'bg-[#3152F5] hover:bg-[#2443DC] text-white'
              : 'bg-white hover:bg-[#F0F4F9] border border-[#E2E9F2] text-[#12233F]'
          }`}
        >
          <CheckCircle2 className="w-4 h-4 text-current" />
          <span>Save Settings</span>
        </button>
      </div>

      {/* Settings Cards Grid */}
      <div className="space-y-4">
        
        {/* Setting 1: Budget Alert Warning */}
        <div className="p-6 rounded-[14px] bg-white border border-[#E2E9F2] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="w-8 h-8 rounded-[8px] bg-[#EFF6FF] border border-[#BFDBFE] flex items-center justify-center text-[#3152F5] shrink-0">
                <DollarSign className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-semibold text-[#12233F] text-[15px]">
                  Budget Alert Warning
                </h3>
                <p className="text-[13px] text-[#60738F] mt-0.5">
                  Notify department leads when their team uses up this much of their quarterly budget.
                </p>
              </div>
            </div>

            <span className="font-semibold text-xs bg-[#EFF6FF] text-[#3152F5] border border-[#BFDBFE] px-2.5 py-1 rounded-[6px] tabular-nums shrink-0">
              {budgetThreshold}%
            </span>
          </div>

          <div className="pt-1">
            <input
              type="range"
              min="70"
              max="95"
              step="5"
              value={budgetThreshold}
              onChange={handleSliderChange}
              className="w-full cursor-pointer accent-[#3152F5] h-2 bg-[#F0F4F9] rounded-lg"
            />
            <div className="flex justify-between text-[11px] text-[#8B9BB2] mt-2 font-medium">
              <span>70% (Early warning)</span>
              <span>80%</span>
              <span className="text-[#3152F5] font-semibold">85% (Recommended)</span>
              <span>90%</span>
              <span>95% (Urgent only)</span>
            </div>
          </div>
        </div>

        {/* Setting 2: Flag Unapproved Card Expenses */}
        <div className="p-6 rounded-[14px] bg-white border border-[#E2E9F2] shadow-xs flex items-center justify-between gap-6">
          <div className="flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-[8px] bg-[#FFFBEB] border border-[#FDE68A] flex items-center justify-center text-[#D99219] shrink-0 mt-0.5">
              <CreditCard className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-semibold text-[#12233F] text-[15px]">
                Flag Unapproved Card Expenses
              </h3>
              <p className="text-[13px] text-[#60738F] mt-1 leading-relaxed">
                Alert finance when an employee charges a personal AI subscription (like ChatGPT or Midjourney) on a company card.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleToggleQuarantine}
            aria-label="Toggle card expense flagging"
            className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer shrink-0 ${
              autoQuarantine ? 'bg-[#3152F5]' : 'bg-[#E2E9F2]'
            }`}
          >
            <span className={`block w-4 h-4 rounded-full bg-white transition-transform absolute top-1 left-1 shadow-xs ${
              autoQuarantine ? 'translate-x-5' : 'translate-x-0'
            }`} />
          </button>
        </div>

        {/* Setting 3: Block Sensitive Data in Prompts */}
        <div className="p-6 rounded-[14px] bg-white border border-[#E2E9F2] shadow-xs flex items-center justify-between gap-6">
          <div className="flex items-start gap-3.5">
            <div className="w-8 h-8 rounded-[8px] bg-[#ECFDF5] border border-[#A7F3D0] flex items-center justify-center text-[#0E9F6E] shrink-0 mt-0.5">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-semibold text-[#12233F] text-[15px]">
                Block Sensitive Data in AI Prompts
              </h3>
              <p className="text-[13px] text-[#60738F] mt-1 leading-relaxed">
                Stop employees from pasting customer records, confidential credentials, or source code into public AI chats.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleToggleDlp}
            aria-label="Toggle sensitive prompt blocking"
            className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer shrink-0 ${
              dlpStrict ? 'bg-[#3152F5]' : 'bg-[#E2E9F2]'
            }`}
          >
            <span className={`block w-4 h-4 rounded-full bg-white transition-transform absolute top-1 left-1 shadow-xs ${
              dlpStrict ? 'translate-x-5' : 'translate-x-0'
            }`} />
          </button>
        </div>

        {/* Setting 4: Reclaim Inactive Paid Accounts */}
        <div className="p-6 rounded-[14px] bg-white border border-[#E2E9F2] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="w-8 h-8 rounded-[8px] bg-[#F0F4F9] border border-[#E2E9F2] flex items-center justify-center text-[#60738F] shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-semibold text-[#12233F] text-[15px]">
                  Reclaim Inactive Paid Accounts
                </h3>
                <p className="text-[13px] text-[#60738F] mt-0.5">
                  Flag paid licenses (like Copilot or Cursor) for reassignment if an employee hasn't used them recently.
                </p>
              </div>
            </div>

            <span className="font-semibold text-xs bg-[#F0F4F9] text-[#60738F] border border-[#E2E9F2] px-2.5 py-1 rounded-[6px] shrink-0">
              {harvestDays} Days
            </span>
          </div>

          <div className="flex gap-2.5 pt-1">
            {[30, 60, 90].map((days) => (
              <button
                key={days}
                type="button"
                onClick={() => handleSelectHarvestDays(days)}
                className={`h-9 px-4 rounded-[8px] text-xs font-semibold transition cursor-pointer ${
                  harvestDays === days
                    ? 'bg-[#3152F5] text-white shadow-xs'
                    : 'bg-white border border-[#E2E9F2] text-[#60738F] hover:bg-[#F0F4F9]'
                }`}
              >
                {days} Days {days === 60 ? '(Recommended)' : ''}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Floating Bottom-Right Toast Notification */}
      {toast && (
        <div 
          role="status"
          className="fixed bottom-6 right-6 z-50 px-4 py-3 bg-white border border-[#E2E9F2] text-[#12233F] rounded-[12px] shadow-lg flex items-center gap-3 animate-in slide-in-from-bottom-4 duration-200"
        >
          <div className="w-6 h-6 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#0E9F6E]" />
          </div>
          <span className="text-[13px] font-medium text-[#12233F]">{toast}</span>
          <button 
            type="button"
            onClick={() => setToast(null)} 
            className="text-[#8B9BB2] hover:text-[#12233F] cursor-pointer ml-1 p-1"
            title="Dismiss notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

    </div>
  );
}
