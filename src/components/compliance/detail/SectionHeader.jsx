import React from 'react';

export default function SectionHeader({ step, icon: Icon, title, subtitle }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="w-8 h-8 rounded-lg bg-[#2bc196]/15 flex items-center justify-center shrink-0">
        {step ? (
          <span className="text-[#2bc196] text-xs font-bold">{step}</span>
        ) : Icon ? (
          <Icon className="h-4 w-4 text-[#2bc196]" />
        ) : null}
      </div>
      <div>
        <h3 className="text-white font-semibold text-sm">{title}</h3>
        {subtitle && <p className="text-white/30 text-xs">{subtitle}</p>}
      </div>
    </div>
  );
}