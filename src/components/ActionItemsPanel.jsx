import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Scissors, 
  CheckCircle2, 
  ArrowRight, 
  X,
  AlertCircle
} from 'lucide-react';
import PMAnnotationBadge from './PMAnnotationBadge';
import { ACTION_ITEMS, PM_ANNOTATIONS } from '../data/mockData';

export default function ActionItemsPanel({ 
  showAnnotations, 
  onResolveAction,
  onOpenDept,
  onOpenTool 
}) {
  const [items, setItems] = useState(ACTION_ITEMS);
  const [resolvedToast, setResolvedToast] = useState(null);

  const handleActionClick = (action) => {
    setItems(prev => prev.filter(i => i.id !== action.id));
    setResolvedToast(`Action initiated: "${action.suggestedAction}".`);
    setTimeout(() => setResolvedToast(null), 3500);
  };

  return (
    <div className="bg-white rounded-xl border border-[#E4E7EC] p-6 shadow-[0_1px_2px_rgba(16,24,40,0.05)]">
      
      {/* Toast Notification */}
      {resolvedToast && (
        <div className="mb-4 p-3 bg-[#F0FDF4] border border-[#BBF7D0] rounded-lg flex items-center justify-between text-[13px] text-[#166534] transition">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#16A34A]" strokeWidth={2} />
            <span className="font-medium">{resolvedToast}</span>
          </div>
          <button 
            type="button" 
            onClick={() => setResolvedToast(null)} 
            className="text-[#166534] hover:text-[#14532D] p-1 cursor-pointer"
          >
            <X className="w-4 h-4" strokeWidth={1.75} />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-[12px] font-medium text-[#2244FE] bg-[#EEF2FF] px-2 py-0.5 rounded-md">
            Interventions
          </span>
          <h3 className="text-[16px] font-semibold text-[#101828] tracking-tight">
            Governance Action Center ({items.length})
          </h3>
          <PMAnnotationBadge
            sectionKey="ACTIONS"
            annotation={PM_ANNOTATIONS.ACTIONS}
            show={showAnnotations}
          />
        </div>
        <div className="text-[12px] text-[#667085] hidden sm:block">
          One-click remediation workflows via integration engine
        </div>
      </div>

      {/* Action Items List */}
      <div className="space-y-3">
        {items.length === 0 ? (
          <div className="p-8 text-center text-[#667085] text-[13px] bg-[#F8FAFC] rounded-lg border border-[#EAECF0]">
            <CheckCircle2 className="w-6 h-6 text-[#16A34A] mx-auto mb-1.5" strokeWidth={2} />
            <p className="font-medium text-[#101828]">All priority actions resolved</p>
            <p className="text-[12px] text-[#667085] mt-0.5">No active budget breaches or critical shadow risks pending review.</p>
          </div>
        ) : (
          items.map((item) => {
            const isCritical = item.severity === 'critical';
            return (
              <div 
                key={item.id}
                className="p-4 rounded-lg border border-[#E4E7EC] bg-white hover:border-[#D0D5DD] transition flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3.5">
                  <div className={`p-2 rounded-lg shrink-0 mt-0.5 ${
                    isCritical ? 'bg-[#FEF2F2] text-[#DC2626]' : 'bg-[#FFFBEB] text-[#D97706]'
                  }`}>
                    {isCritical ? (
                      <ShieldAlert className="w-4 h-4" strokeWidth={1.75} />
                    ) : (
                      <Scissors className="w-4 h-4" strokeWidth={1.75} />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-[14px] text-[#101828]">
                        {item.title}
                      </span>
                      <span className={`text-[11px] font-medium px-2 py-0.5 rounded border ${
                        isCritical 
                          ? 'bg-[#FEF2F2] text-[#991B1B] border-[#FECACA]' 
                          : 'bg-[#FFFBEB] text-[#92400E] border-[#FDE68A]'
                      }`}>
                        {item.severity}
                      </span>
                    </div>
                    <p className="text-[13px] text-[#475467] leading-relaxed">
                      {item.description}
                    </p>
                    <div className="flex items-center gap-3 mt-2 text-[12px] text-[#667085]">
                      <span>Impact: <strong className="text-[#344054] font-medium">{item.impact}</strong></span>
                      <span>•</span>
                      <span>Detected: {item.date}</span>
                    </div>
                  </div>
                </div>

                {/* Action Trigger Button */}
                <div className="shrink-0 md:self-center pl-11 md:pl-0">
                  <button
                    type="button"
                    onClick={() => handleActionClick(item)}
                    className="h-9 px-4 rounded-lg text-[13px] font-medium bg-[#2244FE] hover:bg-[#1E3FE5] text-white transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <span>{item.suggestedAction}</span>
                    <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.75} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
