import React, { useState } from 'react';
import { 
  X, 
  Settings, 
  Sliders, 
  Shield, 
  CheckCircle2, 
  DollarSign, 
  Bell, 
  Scissors
} from 'lucide-react';

export default function GovernanceSettingsModal({ isOpen, onClose }) {
  const [budgetThreshold, setBudgetThreshold] = useState(85);
  const [autoQuarantine, setAutoQuarantine] = useState(true);
  const [dlpStrict, setDlpStrict] = useState(true);
  const [harvestDays, setHarvestDays] = useState(60);
  const [isSaved, setIsSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 transition-opacity">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center">
              <Settings className="w-5 h-5" strokeWidth={1.8} />
            </div>
            <div>
              <h3 className="text-[18px] font-bold text-slate-900 tracking-tight">
                Governance & Policy Configuration
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Set enterprise FinOps spend caps, auto-quarantine triggers, and DLP rules.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-800 rounded-xl hover:bg-slate-50 transition cursor-pointer"
          >
            <X className="w-5 h-5" strokeWidth={2} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 text-xs">
          
          {/* Rule 1: Spend Cap Alert Threshold */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-slate-700" />
                Department Spend Run-Rate Alert
              </span>
              <span className="font-bold text-slate-900 text-sm bg-white px-2 py-0.5 rounded-md border border-slate-200">
                {budgetThreshold}%
              </span>
            </div>
            <p className="text-slate-500 leading-relaxed">
              Trigger automated warning notifications to Department VP when quarterly budget reaches this limit.
            </p>
            <input
              type="range"
              min="70"
              max="95"
              step="5"
              value={budgetThreshold}
              onChange={(e) => setBudgetThreshold(Number(e.target.value))}
              className="w-full cursor-pointer accent-slate-900"
            />
          </div>

          {/* Rule 2: Auto-Quarantine Shadow AI */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start justify-between gap-4">
            <div className="space-y-1">
              <span className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Shield className="w-4 h-4 text-slate-700" />
                Ramp Corporate Card Auto-Quarantine
              </span>
              <p className="text-slate-500 leading-relaxed">
                Automatically flag personal OpenAI/Midjourney credit card transactions and notify compliance.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setAutoQuarantine(!autoQuarantine)}
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer shrink-0 ${
                autoQuarantine ? 'bg-slate-900' : 'bg-slate-300'
              }`}
            >
              <span className={`block w-4 h-4 rounded-full bg-white transition-transform absolute top-1 left-1 ${
                autoQuarantine ? 'translate-x-5' : 'translate-x-0'
              }`} />
            </button>
          </div>

          {/* Rule 3: Browser Extension DLP Enforcement */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start justify-between gap-4">
            <div className="space-y-1">
              <span className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Bell className="w-4 h-4 text-slate-700" />
                Strict Prompt DLP Hard-Blocking
              </span>
              <p className="text-slate-500 leading-relaxed">
                Instantly intercept prompts containing Customer PII, JWT API tokens, or unreleased financials.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setDlpStrict(!dlpStrict)}
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer shrink-0 ${
                dlpStrict ? 'bg-slate-900' : 'bg-slate-300'
              }`}
            >
              <span className={`block w-4 h-4 rounded-full bg-white transition-transform absolute top-1 left-1 ${
                dlpStrict ? 'translate-x-5' : 'translate-x-0'
              }`} />
            </button>
          </div>

          {/* Rule 4: License Harvesting Inactivity Window */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Scissors className="w-4 h-4 text-slate-700" />
                License Harvest Inactivity Window
              </span>
              <span className="font-bold text-slate-900 text-sm bg-white px-2 py-0.5 rounded-md border border-slate-200">
                {harvestDays} days
              </span>
            </div>
            <p className="text-slate-500 leading-relaxed">
              Flag assigned SaaS seats (GitHub Copilot, Cursor) as dormant if zero prompt completions recorded in this window.
            </p>
            <div className="flex gap-2">
              {[30, 60, 90].map((days) => (
                <button
                  key={days}
                  type="button"
                  onClick={() => setHarvestDays(days)}
                  className={`px-3 py-1.5 rounded-lg font-semibold transition cursor-pointer ${
                    harvestDays === days
                      ? 'bg-slate-900 text-white'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {days} Days
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            {isSaved ? '✓ Policies updated successfully!' : 'Changes apply immediately to live monitoring'}
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-xl transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition cursor-pointer shadow-xs"
            >
              {isSaved ? 'Saved!' : 'Save Policies'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
