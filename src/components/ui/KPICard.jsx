import React from 'react';

export default function KPICard({ title, value, icon: Icon, trend, trendUp, accentColor = '#2bc196' }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-[#001a30]/80 border border-white/[0.08] backdrop-blur-xl transition-all duration-500 hover:border-[#2bc196]/40 hover:shadow-2xl hover:shadow-[#2bc196]/10 card-lift">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2bc196]/[0.03] via-transparent to-[#2bc196]/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Subtle top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-[#2bc196]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <p className="text-white/40 text-[11px] font-semibold uppercase tracking-widest truncate">{title}</p>
            <p className="text-2xl font-bold text-white mt-2.5 truncate tracking-tight">{value}</p>
            {trend && (
              <div className={`flex items-center gap-1.5 mt-2.5 text-xs font-semibold ${trendUp ? 'text-[#2bc196]' : 'text-red-400'}`}>
                <span className="text-sm">{trendUp ? '↑' : '↓'}</span>
                <span>{trend}</span>
              </div>
            )}
          </div>
          {Icon && (
            <div className="flex-shrink-0 p-3.5 rounded-2xl bg-gradient-to-br from-[#2bc196]/15 to-[#2bc196]/5 border border-[#2bc196]/20 group-hover:from-[#2bc196]/25 group-hover:to-[#2bc196]/10 group-hover:border-[#2bc196]/40 transition-all duration-500">
              <Icon className="h-5 w-5 text-[#2bc196] group-hover:scale-110 transition-transform duration-300" />
            </div>
          )}
        </div>
      </div>
      
      {/* Bottom accent line with glow */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#2bc196]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-16 h-4 bg-[#2bc196]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  );
}