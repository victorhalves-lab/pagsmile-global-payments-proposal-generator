import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Eye, Building2, Loader2, Globe, DollarSign, Calendar } from 'lucide-react';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import ComplianceDetailModal from './detail/ComplianceDetailModal';

const STATUS_COLORS = {
  pending: 'bg-yellow-500/20 text-yellow-400',
  submitted: 'bg-blue-500/20 text-blue-400',
  in_review: 'bg-purple-500/20 text-purple-400',
  approved: 'bg-green-500/20 text-green-400',
  rejected: 'bg-red-500/20 text-red-400',
};

export default function ComplianceReceivedList() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const { t } = useTranslation();

  const statusLabel = (s) => t(`compliance.status${s?.charAt(0).toUpperCase()}${s?.slice(1)?.replace('_', '')}`) || s;

  const { data: questionnaires = [], isLoading } = useQuery({
    queryKey: ['compliance-questionnaires'],
    queryFn: () => base44.entities.ComplianceQuestionnaire.list('-created_date', 100),
  });

  const filtered = questionnaires.filter(q =>
    (q.legal_business_name || '').toLowerCase().includes(search.toLowerCase()) ||
    (q.certifier_name || '').toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) {
    return <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 text-[#2bc196] animate-spin" /></div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
          <Input
            placeholder={t('compliance.searchPlaceholder')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-white/30"
          />
        </div>
        <Badge className="bg-white/10 text-white/60">{filtered.length} {t('compliance.records')}</Badge>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-12 text-white/40">{t('compliance.noRecords')}</div>
      ) : (
        <div className="space-y-3">
          {filtered.map(q => (
            <div
              key={q.id}
              onClick={() => setSelected(q)}
              className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 hover:border-[#2bc196]/30 hover:bg-white/[0.04] transition-all cursor-pointer group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 bg-[#2bc196]/10 rounded-xl flex items-center justify-center group-hover:bg-[#2bc196]/20 transition-all">
                    <Building2 className="h-5 w-5 text-[#2bc196]" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-sm">{q.legal_business_name || 'Unnamed'}</h3>
                    <div className="flex items-center gap-3 mt-0.5">
                      {q.registered_country && (
                        <span className="text-white/30 text-xs flex items-center gap-1">
                          <Globe className="h-3 w-3" /> {q.registered_country}
                        </span>
                      )}
                      {q.business_nature && (
                        <span className="text-white/30 text-xs">{q.business_nature}</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {q.estimated_monthly_volume_usd > 0 && (
                    <span className="text-white/40 text-xs flex items-center gap-1 hidden md:flex">
                      <DollarSign className="h-3 w-3" /> US$ {q.estimated_monthly_volume_usd.toLocaleString('pt-BR')}
                    </span>
                  )}
                  <Badge className={STATUS_COLORS[q.status] || STATUS_COLORS.pending}>
                    {statusLabel(q.status)}
                  </Badge>
                  <span className="text-white/20 text-xs hidden sm:block">
                    {moment(q.created_date).format('DD/MM/YYYY')}
                  </span>
                  <Button variant="ghost" size="sm" className="text-[#2bc196] hover:text-[#2bc196]/80 opacity-0 group-hover:opacity-100 transition-all">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ComplianceDetailModal
        data={selected}
        open={!!selected}
        onClose={() => setSelected(null)}
      />
    </div>
  );
}