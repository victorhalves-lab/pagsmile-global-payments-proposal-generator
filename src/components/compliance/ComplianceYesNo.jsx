import React from 'react';
import { Input } from '@/components/ui/input';
import { useTranslation } from 'react-i18next';

export default function ComplianceYesNo({ question, value, detail, onValueChange, onDetailChange }) {
  const { t } = useTranslation();
  return (
    <div className="space-y-3 p-5 bg-white/[0.03] rounded-xl border border-white/[0.08] hover:border-white/[0.12] transition-all">
      <p className="text-white/80 text-sm leading-relaxed">{question}</p>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => onValueChange(true)}
          className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
            value === true 
              ? 'bg-red-500/20 text-red-400 border-2 border-red-500/50 shadow-lg shadow-red-500/10' 
              : 'bg-white/[0.04] text-white/40 border-2 border-white/[0.08] hover:border-white/20 hover:text-white/60'
          }`}
        >
          {t('common.yes')}
        </button>
        <button
          type="button"
          onClick={() => onValueChange(false)}
          className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${
            value === false 
              ? 'bg-[#2bc196]/20 text-[#2bc196] border-2 border-[#2bc196]/50 shadow-lg shadow-[#2bc196]/10' 
              : 'bg-white/[0.04] text-white/40 border-2 border-white/[0.08] hover:border-white/20 hover:text-white/60'
          }`}
        >
          {t('common.no')}
        </button>
      </div>
      {value === true && (
        <Input
          placeholder="Please specify..."
          value={detail || ''}
          onChange={(e) => onDetailChange(e.target.value)}
          className="mt-1 bg-white/5 border-white/20 text-white placeholder:text-white/30 rounded-xl"
        />
      )}
    </div>
  );
}