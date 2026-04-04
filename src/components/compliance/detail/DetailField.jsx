import React from 'react';

export default function DetailField({ label, value, fullWidth = false }) {
  if (value === null || value === undefined || value === '') return null;
  const display = typeof value === 'boolean' ? (value ? 'Sim' : 'Não') : value;

  return (
    <div className={fullWidth ? 'col-span-full' : ''}>
      <p className="text-white/40 text-[11px] font-medium uppercase tracking-wider mb-1">{label}</p>
      <p className="text-white text-sm leading-relaxed">{display}</p>
    </div>
  );
}