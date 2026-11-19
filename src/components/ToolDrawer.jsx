import React, { useState } from 'react';
import { 
  X, 
  ShieldAlert, 
  ShieldCheck, 
  Lock, 
  Ban,
  FileCheck,
  Scissors,
  CheckCircle2
} from 'lucide-react';

export default function ToolDrawer({ tool, onClose }) {
  const [actionDone, setActionDone] = useState(null);

  if (!tool) return null;

  const isShadow = tool.status === 'shadow';
  const dataRetention = tool.dataRetentionForTraining || tool.dataRetention || 'Excluded';
  const certifications = tool.complianceCert || tool.certifications || 'SOC 2 Type II';
  const dlpCount = tool.dlpViolations ?? tool.dlpInterceptions ?? 0;

  const triggerAction = (label) => {
    setActionDone(label);
    setTimeout(() => {
      setActionDone(null);
      onClose();
    }, 1300);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-xs flex justify-end transition-opacity">
      <div className="w-full max-w-xl bg-white h-full shadow-2xl flex flex-col border-l border-[#E2E9F2]">
        
        {/* Header */}
        <div className="p-6 lg:p-7 border-b border-[#E2E9F2] bg-white shrink-0">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-[10px] flex items-center justify-center border ${
                isShadow 
                  ? 'bg-[#FEF2F2] text-[#E64D5B] border-[#FECACA]' 
                  : 'bg-[#F0F4F9] text-[#0E9F6E] border-[#E2E9F2]'
              }`}>
                {isShadow ? <ShieldAlert className="w-5 h-5" strokeWidth={1.8} /> : <ShieldCheck className="w-5 h-5 text-[#0E9F6E]" strokeWidth={1.8} />}
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2.5">
                  <span className="text-[12px] font-medium text-[#60738F]">{tool.vendor}</span>
                  <span className="text-[#CBD5E1]">•</span>
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-[5px] border ${
                    isShadow 
                      ? 'bg-[#FEF2F2] text-[#E64D5B] border-[#FECACA]' 
                      : 'bg-[#ECFDF5] text-[#0E9F6E] border-[#A7F3D0]'
                  }`}>
                    {isShadow ? 'Shadow AI' : 'Approved'}
                  </span>
                </div>
                <h2 className="text-[20px] font-bold text-[#12233F] tracking-tight leading-snug">
                  {tool.name}
                </h2>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-[#8B9BB2] hover:text-[#12233F] rounded-[8px] hover:bg-[#F0F4F9] transition cursor-pointer"
            >
              <X className="w-5 h-5" strokeWidth={2} />
            </button>
          </div>

          <div className="flex items-center gap-4 text-xs text-[#60738F] mt-3">
            <span>Category: <strong className="text-[#12233F] font-semibold">{tool.category}</strong></span>
            <span className="text-[#E2E9F2]">•</span>
            <span>Risk Score: <strong className={`font-bold ${tool.riskScore > 50 ? 'text-[#E64D5B]' : 'text-[#0E9F6E]'}`}>{tool.riskScore}/100</strong></span>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 lg:p-7 space-y-6 flex-1 overflow-y-auto text-sm">
          
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3.5 rounded-[10px] bg-[#F0F4F9] border border-[#E2E9F2] text-center">
              <span className="text-xs text-[#8B9BB2] block mb-1 font-medium">Monthly Spend</span>
              <span className="text-[18px] font-bold text-[#12233F] tabular-nums">${tool.spend.toLocaleString()}</span>
            </div>
            <div className="p-3.5 rounded-[10px] bg-[#F0F4F9] border border-[#E2E9F2] text-center">
              <span className="text-xs text-[#8B9BB2] block mb-1 font-medium">Active Users</span>
              <span className="text-[18px] font-bold text-[#12233F] tabular-nums">{tool.activeUsers}</span>
            </div>
            <div className="p-3.5 rounded-[10px] bg-[#F0F4F9] border border-[#E2E9F2] text-center">
              <span className="text-xs text-[#8B9BB2] block mb-1 font-medium">Cost / User</span>
              <span className="text-[18px] font-bold text-[#12233F] tabular-nums">${tool.costPerUser}</span>
            </div>
          </div>

          {/* Compliance & Data Retention Posture */}
          <div className="space-y-3">
            <h3 className="text-[11px] font-semibold uppercase tracking-wider text-[#8B9BB2] flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-[#8B9BB2]" />
              <span>Security & Data Privacy Standards</span>
            </h3>

            <div className="rounded-[10px] border border-[#E2E9F2] overflow-hidden bg-white text-xs">
              <div className="divide-y divide-[#E2E9F2]">
                <div className="p-3.5 flex justify-between">
                  <span className="text-[#60738F]">Model Training Policy:</span>
                  <span className={`font-semibold ${dataRetention.includes('OPT-OUT') || dataRetention.includes('Personal') ? 'text-[#E64D5B]' : 'text-[#12233F]'}`}>
                    {dataRetention}
                  </span>
                </div>
                <div className="p-3.5 flex justify-between">
                  <span className="text-[#60738F]">Security Certifications:</span>
                  <span className="font-semibold text-[#12233F]">{certifications}</span>
                </div>
                <div className="p-3.5 flex justify-between">
                  <span className="text-[#60738F]">Billing Method:</span>
                  <span className="font-semibold text-[#12233F]">{tool.invoicingSource}</span>
                </div>
                <div className="p-3.5 flex justify-between">
                  <span className="text-[#60738F]">Data Leaks Prevented:</span>
                  <span className={`font-semibold ${dlpCount > 0 ? 'text-[#E64D5B]' : 'text-[#0E9F6E]'}`}>
                    {dlpCount} incidents
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Recommendation Callout */}
          <div className="p-4 rounded-[10px] bg-[#F0F4F9] border border-[#E2E9F2] space-y-1">
            <div className="text-[11px] font-semibold text-[#12233F] uppercase tracking-wider">
              Governance Recommendation
            </div>
            <p className="text-xs text-[#60738F] leading-relaxed">
              {tool.recommendation || (isShadow
                ? `High Risk: ${tool.activeUsers} employees are expensing personal accounts. Move users to an enterprise contract to ensure company data is not used for AI model training.`
                : `${tool.inactiveSeats || 0} assigned accounts have had zero activity in the last 60 days. Reclaim these unused licenses to save on monthly subscription costs.`
              )}
            </p>
          </div>

        </div>

        {/* Drawer Footer Actions */}
        <div className="p-5 lg:p-6 border-t border-[#E2E9F2] bg-[#F0F4F9] flex flex-col gap-2.5 shrink-0">
          {actionDone ? (
            <div className="p-3 bg-[#ECFDF5] border border-[#A7F3D0] text-[#0E9F6E] rounded-[10px] text-xs font-semibold flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#0E9F6E]" />
              <span>{actionDone}</span>
            </div>
          ) : isShadow ? (
            <>
              <button
                type="button"
                onClick={() => triggerAction(`Contract Negotiation Initiated with ${tool.vendor}`)}
                className="w-full h-[40px] text-[13px] font-medium text-white bg-[#3152F5] hover:bg-[#2443DC] rounded-[10px] flex items-center justify-center gap-2 transition cursor-pointer shadow-xs"
              >
                <FileCheck className="w-4 h-4" />
                <span>Approve Tool & Start Contract</span>
              </button>
              <button
                type="button"
                onClick={() => triggerAction(`Browser Extension Hard-Block Deployed for ${tool.name}`)}
                className="w-full h-[40px] text-[13px] font-medium text-[#E64D5B] bg-[#FEF2F2] hover:bg-[#FEE2E2] rounded-[10px] border border-[#FECACA] flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <Ban className="w-4 h-4" />
                <span>Block Access in Browser</span>
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => triggerAction(`Reclaimed ${tool.inactiveSeats || 0} Inactive Seats for ${tool.name}`)}
              className="w-full h-[40px] text-[13px] font-medium text-white bg-[#3152F5] hover:bg-[#2443DC] rounded-[10px] flex items-center justify-center gap-2 transition cursor-pointer shadow-xs"
            >
              <Scissors className="w-4 h-4" />
              <span>Reclaim Unused Licenses</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
