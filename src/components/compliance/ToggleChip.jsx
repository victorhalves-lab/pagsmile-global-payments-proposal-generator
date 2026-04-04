import React from 'react';
import { Check } from 'lucide-react';

export default function ToggleChip({ label, flag, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border text-sm font-medium
        transition-all duration-200 whitespace-nowrap
        ${selected
          ? 'border-[#2bc196]/60 bg-[#2bc196]/15 text-[#2bc196] shadow-sm shadow-[#2bc196]/10'
          : 'border-white/10 bg-white/[0.03] text-white/50 hover:border-white/20 hover:text-white/70'
        }
      `}
    >
      {flag && <span className="text-base leading-none">{flag}</span>}
      <span>{label}</span>
      {selected && <Check className="h-3 w-3 ml-0.5" />}
    </button>
  );
}