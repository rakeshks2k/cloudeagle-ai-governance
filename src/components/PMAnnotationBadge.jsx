import React, { useState } from 'react';
import { Lightbulb, X } from 'lucide-react';

export default function PMAnnotationBadge({ sectionKey, annotation, show }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!show || !annotation) return null;

  return (
    <div className="relative inline-block z-20 ml-2">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[11px] font-medium rounded-md bg-[#EEF2FF] text-[#2244FE] hover:bg-[#E0E7FF] border border-[#C7D2FE] transition cursor-pointer"
        title="Click to view PM design rationale"
      >
        <Lightbulb className="w-3.5 h-3.5 text-[#2244FE]" strokeWidth={1.75} />
        <span>Rationale</span>
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full mt-2 w-80 md:w-96 p-4 bg-white text-[#101828] rounded-xl shadow-[0_4px_12px_rgba(16,24,40,0.08)] border border-[#E4E7EC] z-50 text-left text-[12px] transition">
          <div className="flex items-center justify-between pb-2.5 border-b border-[#EAECF0] mb-2.5">
            <div className="flex items-center gap-1.5 font-semibold text-[#101828] text-[13px]">
              <Lightbulb className="w-4 h-4 text-[#2244FE]" strokeWidth={1.75} />
              <span>{annotation.title}</span>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-[#667085] hover:text-[#101828] p-1 rounded-md hover:bg-[#F8FAFC] cursor-pointer"
            >
              <X className="w-3.5 h-3.5" strokeWidth={1.75} />
            </button>
          </div>

          <div className="space-y-2.5">
            <div>
              <span className="font-semibold text-[#166534] block mb-0.5 text-[11px] uppercase tracking-wider">
                Product Strategy:
              </span>
              <p className="text-[#475467] leading-relaxed">{annotation.strategy}</p>
            </div>
            <div>
              <span className="font-semibold text-[#991B1B] block mb-0.5 text-[11px] uppercase tracking-wider">
                Tradeoffs & Alternatives:
              </span>
              <p className="text-[#667085] leading-relaxed">{annotation.tradeoff}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
