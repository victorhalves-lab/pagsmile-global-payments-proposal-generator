import React from 'react';
import { Check } from 'lucide-react';

export default function SelectionButton({ label, description, icon: Icon, selected, onClick, size = 'md' }) {
  const sizeClasses = {
    sm: 'px-3 py-2.5 text-sm',
    md: 'px-4 py-3.5',
    lg: 'px-5 py-4'
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        relative group rounded-xl border-2 transition-all duration-300 text-left w-full
        ${sizeClasses[size]}
        ${selected
          ? 'border-[#2bc196] bg-[#2bc196]/10 shadow-lg shadow-[#2bc196]/10'
          : 'border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.06]'
        }
      `}
    >
      <div className="flex items-center gap-3">
        {Icon && (
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all ${
            selected ? 'bg-[#2bc196]/20' : 'bg-white/5'
          }`}>
            <Icon className={`h-4 w-4 ${selected ? 'text-[#2bc196]' : 'text-white/40'}`} />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <p className={`font-medium text-sm ${selected ? 'text-[#2bc196]' : 'text-white/80'}`}>{label}</p>
          {description && (
            <p className={`text-xs mt-0.5 ${selected ? 'text-[#2bc196]/60' : 'text-white/30'}`}>{description}</p>
          )}
        </div>
        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
          selected ? 'border-[#2bc196] bg-[#2bc196]' : 'border-white/20'
        }`}>
          {selected && <Check className="h-3 w-3 text-white" />}
        </div>
      </div>
    </button>
  );
}