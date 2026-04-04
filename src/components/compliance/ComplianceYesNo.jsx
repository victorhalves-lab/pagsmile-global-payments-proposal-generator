import React from 'react';
import { Input } from '@/components/ui/input';

export default function ComplianceYesNo({ question, value, detail, onValueChange, onDetailChange }) {
  return (
    <div className="space-y-2 p-4 bg-white/5 rounded-lg border border-white/10">
      <p className="text-white/80 text-sm leading-relaxed">{question}</p>
      <div className="flex gap-4 mt-2">
        <button
          type="button"
          onClick={() => onValueChange(true)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            value === true ? 'bg-red-500/20 text-red-400 border border-red-500/50' : 'bg-white/5 text-white/50 border border-white/10 hover:bg-white/10'
          }`}
        >
          Yes
        </button>
        <button
          type="button"
          onClick={() => onValueChange(false)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            value === false ? 'bg-[#2bc196]/20 text-[#2bc196] border border-[#2bc196]/50' : 'bg-white/5 text-white/50 border border-white/10 hover:bg-white/10'
          }`}
        >
          No
        </button>
      </div>
      {value === true && (
        <Input
          placeholder="Please specify..."
          value={detail || ''}
          onChange={(e) => onDetailChange(e.target.value)}
          className="mt-2 bg-white/5 border-white/20 text-white placeholder:text-white/30"
        />
      )}
    </div>
  );
}