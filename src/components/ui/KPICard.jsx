import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

export default function KPICard({ title, value, icon: Icon, trend, trendUp }) {
  return (
    <Card className="bg-white/10 border-[#2bc196]/20 backdrop-blur">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-white/60 text-sm font-medium">{title}</p>
            <p className="text-2xl font-bold text-white mt-2">{value}</p>
            {trend && (
              <p className={`text-sm mt-1 ${trendUp ? 'text-[#2bc196]' : 'text-red-400'}`}>
                {trend}
              </p>
            )}
          </div>
          {Icon && (
            <div className="p-3 bg-[#2bc196]/20 rounded-lg">
              <Icon className="h-6 w-6 text-[#2bc196]" />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}