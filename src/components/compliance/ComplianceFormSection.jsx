import React from 'react';

export default function ComplianceFormSection({ icon: Icon, title, subtitle, children }) {
  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 space-y-4">
      <div className="flex items-center gap-3 mb-2">
        {Icon && <div className="w-10 h-10 bg-[#2bc196]/20 rounded-xl flex items-center justify-center">
          <Icon className="h-5 w-5 text-[#2bc196]" />
        </div>}
        <div>
          <h3 className="text-white font-semibold text-lg">{title}</h3>
          {subtitle && <p className="text-white/50 text-sm">{subtitle}</p>}
        </div>
      </div>
      {children}
    </div>
  );
}