import React from 'react';

export default function KPICard({ title, value, icon: Icon, trend, trendUp, accentColor = '#2bc196' }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 backdrop-blur-sm transition-all duration-300 hover:border-[#2bc196]/30 hover:shadow-lg hover:shadow-[#2bc196]/5">
      {/* Glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2bc196]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <p className="text-white/50 text-xs font-medium uppercase tracking-wider truncate">{title}</p>
            <p className="text-2xl font-bold text-white mt-2 truncate">{value}</p>
            {trend && (
              <div className={`flex items-center gap-1 mt-2 text-xs font-medium ${trendUp ? 'text-[#2bc196]' : 'text-red-400'}`}>
                <span>{trendUp ? '↑' : '↓'}</span>
                <span>{trend}</span>
              </div>
            )}
          </div>
          {Icon && (
            <div className="flex-shrink-0 p-3 rounded-xl bg-[#2bc196]/10 border border-[#2bc196]/20 group-hover:bg-[#2bc196]/20 group-hover:border-[#2bc196]/30 transition-all duration-300">
              <Icon className="h-5 w-5 text-[#2bc196]" />
            </div>
          )}
        </div>
      </div>
      
      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#2bc196]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
}