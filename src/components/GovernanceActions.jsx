import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Scissors, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle,
  RotateCcw,
  X
} from 'lucide-react';
import { ACTION_ITEMS } from '../data/mockData';

export default function GovernanceActions() {
  const [items, setItems] = useState(ACTION_ITEMS);
  const [resolvedToast, setResolvedToast] = useState(null);

  const handleActionClick = (action) => {
    setItems((prev) => prev.filter((i) => i.id !== action.id));
    setResolvedToast(`Initiated: "${action.suggestedAction}". Remediation workflow triggered.`);
    setTimeout(() => setResolvedToast(null), 4000);
  };

  const handleResetActions = () => {
    setItems(ACTION_ITEMS);
    setResolvedToast(null);
  };

  // Short punchy action button label mapping
  const getActionLabel = (item) => {
    if (item.id === 'act-1') return 'Enforce Hard Cap';
    if (item.id === 'act-2') return 'Migrate 67 to SSO';
    if (item.id === 'act-3') return 'Harvest 106 Seats';
    if (item.id === 'act-4') return 'Reallocate $8k';
    return item.suggestedAction;
  };

  return (
    <div className="space-y-4">
      {/* Toast Notification */}
      {resolvedToast && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center justify-between shadow-xs animate-in fade-in duration-150">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" strokeWidth={2.2} />
            <span className="font-semibold">{resolvedToast}</span>
          </div>
          <button 
            type="button"
            onClick={() => setResolvedToast(null)} 
            className="text-emerald-700 hover:text-emerald-900 p-1 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <h2 className="text-[17px] font-bold text-slate-900 tracking-tight">
            Priority Governance Actions
          </h2>
          <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
            items.length > 0 
              ? 'bg-[#FFF1F2] text-[#9F1239] border-[#FFE4E6]' 
              : 'bg-[#ECFDF5] text-[#065F46] border-[#D1FAE5]'
          }`}>
            {items.length} {items.length === 1 ? 'Action' : 'Actions'} Pending
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-500">
          <span>Automated FinOps & DLP Remediation Levers</span>
          {items.length < ACTION_ITEMS.length && (
            <button
              type="button"
              onClick={handleResetActions}
              className="text-[#2144FE] hover:underline font-medium inline-flex items-center gap-1 cursor-pointer ml-1"
            >
              <RotateCcw className="w-3 h-3" />
              Reset All
            </button>
          )}
        </div>
      </div>

      {/* Action Cards Grid */}
      {items.length === 0 ? (
        <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 shadow-2xs">
          <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto mb-2.5" strokeWidth={2} />
          <p className="font-bold text-slate-900 text-[15px]">All Governance Actions Resolved</p>
          <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
            Zero pending budget breaches, unsanctioned shadow AI applications, or dormant seats requiring executive authorization.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {items.map((item) => {
            const isCritical = item.severity === 'critical';

            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl border border-slate-200/90 hover:border-slate-300 p-5 flex flex-col justify-between shadow-2xs hover:shadow-xs transition-all duration-150 space-y-4"
              >
                {/* Card Top: Badges */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-0.5 rounded-full border uppercase tracking-wider ${
                      isCritical
                        ? 'bg-[#FFF1F2] text-[#9F1239] border-[#FFE4E6]'
                        : 'bg-[#FFFBEB] text-[#92400E] border-[#FEF3C7]'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${isCritical ? 'bg-rose-500' : 'bg-amber-500'}`} />
                      {item.severity}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {item.date}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-[13.5px] font-bold text-slate-900 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1.5 leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Card Bottom: Impact Box & Action CTA */}
                <div className="space-y-3 pt-2">
                  <div className="bg-slate-50 border border-slate-100 rounded-xl p-2.5">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Remediation Impact
                    </div>
                    <div className="text-xs font-semibold text-slate-800 mt-0.5 leading-tight">
                      {item.impact}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleActionClick(item)}
                    className={`w-full h-8.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer shadow-2xs ${
                      isCritical
                        ? 'bg-[#2144FE] hover:bg-[#1A38D8] text-white shadow-xs'
                        : 'bg-blue-50/70 hover:bg-blue-100/70 text-[#2144FE] border border-blue-200/60'
                    }`}
                  >
                    <span>{getActionLabel(item)}</span>
                    <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
