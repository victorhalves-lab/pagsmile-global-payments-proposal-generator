import React from 'react';

export default function ComplianceFormSection({ icon: Icon, title, subtitle, children, step }) {
  return (
    <div className="relative">
      {/* Glow line on left */}
      <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#2bc196]/60 via-[#2bc196]/20 to-transparent rounded-full" />
      
      <div className="ml-6 bg-white/[0.04] backdrop-blur-md border border-white/[0.08] rounded-2xl overflow-hidden hover:border-white/[0.15] transition-all duration-500">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 flex items-start gap-4">
          <div className="relative shrink-0">
            <div className="w-12 h-12 bg-gradient-to-br from-[#2bc196] to-[#1a8a6a] rounded-xl flex items-center justify-center shadow-lg shadow-[#2bc196]/20">
              {Icon && <Icon className="h-5 w-5 text-white" />}
            </div>
            {step && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#002443] border-2 border-[#2bc196] rounded-full flex items-center justify-center">
                <span className="text-[10px] font-bold text-[#2bc196]">{step}</span>
              </div>
            )}
          </div>
          <div className="min-w-0">
            <h3 className="text-white font-semibold text-lg tracking-tight">{title}</h3>
            {subtitle && <p className="text-white/40 text-sm mt-0.5 leading-relaxed">{subtitle}</p>}
          </div>
        </div>
        
        {/* Content */}
        <div className="px-6 pb-6">
          {children}
        </div>
      </div>
    </div>
  );
}