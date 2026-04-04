import React, { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { Building2, User, DollarSign, Eye, FileText, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import QuestionnaireFilters from '@/components/proposal/QuestionnaireFilters';
import LeadDetailModal from '@/components/questionnaire/LeadDetailModal';

export default function QuestionnaireCenter() {
  const [selectedQuestionnaire, setSelectedQuestionnaire] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    tpvMin: '',
    tpvMax: '',
    hasPartner: 'all'
  });
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const { data: questionnaires = [], isLoading } = useQuery({
    queryKey: ['questionnaires'],
    queryFn: () => base44.entities.Questionnaire.list('-created_date')
  });

  // Filtrar questionários
  const filteredQuestionnaires = useMemo(() => {
    return questionnaires.filter(q => {
      const matchSearch = !filters.search || 
        q.company_name?.toLowerCase().includes(filters.search.toLowerCase()) ||
        q.contact_name?.toLowerCase().includes(filters.search.toLowerCase());
      const matchStatus = filters.status === 'all' || q.pipeline_status === filters.status;
      const matchTpvMin = !filters.tpvMin || (q.monthly_tpv || 0) >= parseFloat(filters.tpvMin);
      const matchTpvMax = !filters.tpvMax || (q.monthly_tpv || 0) <= parseFloat(filters.tpvMax);
      const matchPartner = filters.hasPartner === 'all' || 
        (filters.hasPartner === 'yes' && q.has_current_partner) ||
        (filters.hasPartner === 'no' && !q.has_current_partner);
      return matchSearch && matchStatus && matchTpvMin && matchTpvMax && matchPartner;
    });
  }, [questionnaires, filters]);

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.Questionnaire.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['questionnaires'] })
  });

  const exportToCSV = () => {
    const headers = ['Empresa', 'Contato', 'Email', 'Telefone', 'TPV Mensal', 'Ticket Médio', 'Transações/mês', 'Tem Parceiro', 'Taxa Atual', 'Status', 'Criado em'];
    const rows = filteredQuestionnaires.map(q => [
      q.company_name,
      q.contact_name,
      q.contact_email,
      `${q.contact_phone_country_code || ''} ${q.contact_phone || ''}`,
      q.monthly_tpv,
      q.average_ticket,
      q.monthly_transactions,
      q.has_current_partner ? 'Sim' : 'Não',
      q.current_rate_percentage ? `${q.current_rate_percentage}%` : '',
      q.pipeline_status,
      new Date(q.created_date).toLocaleDateString('pt-BR')
    ]);
    
    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `questionarios_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value || 0);
  };

  const getStatusBadge = (status) => {
    const styles = {
      leads: 'bg-white/10 text-white/60 border-white/20',
      proposal_made: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      proposal_accepted: 'bg-green-500/20 text-green-400 border-green-500/30',
      counter_proposal: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      proposal_lost: 'bg-red-500/20 text-red-400 border-red-500/30'
    };
    return (
      <span className={`${styles[status] || styles.leads} px-2.5 py-1 rounded-full text-xs font-medium border`}>
        {t(`questionnaire.status.${status}`) || t('questionnaire.status.leads')}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2bc196]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">{t('questionnaire.title')}</h1>
        <p className="text-white/50 mt-1">{t('questionnaire.subtitle')}</p>
      </div>

      <QuestionnaireFilters filters={filters} setFilters={setFilters} onExport={exportToCSV} />

      {questionnaires.length === 0 ? (
        <div className="rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 py-16 text-center">
          <p className="text-white/50">{t('questionnaire.noQuestionnaires')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredQuestionnaires.map(q => (
            <div
              key={q.id}
              onClick={() => setSelectedQuestionnaire(q)}
              className="group rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-[#2bc196]/30 hover:bg-white/[0.04] transition-all duration-300 cursor-pointer overflow-hidden"
            >
              <div className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 bg-[#2bc196]/10 rounded-xl flex items-center justify-center group-hover:bg-[#2bc196]/20 transition-all">
                      <Building2 className="h-5 w-5 text-[#2bc196]" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-sm">{q.company_name}</h3>
                      <p className="text-white/40 text-xs flex items-center gap-1 mt-0.5">
                        <User className="h-3 w-3" />
                        {q.contact_name}
                      </p>
                    </div>
                  </div>
                  {getStatusBadge(q.pipeline_status)}
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/40 text-xs">{t('questionnaire.monthlyTPV')}</span>
                    <span className="text-[#2bc196] font-semibold text-sm">{formatCurrency(q.monthly_tpv)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/40 text-xs">{t('questionnaire.avgTicket')}</span>
                    <span className="text-white/70 text-sm">{formatCurrency(q.average_ticket)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/40 text-xs">{t('questionnaire.monthlyTransactions')}</span>
                    <span className="text-white/70 text-sm">{(q.monthly_transactions || 0).toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-3 border-t border-white/[0.06]">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={(e) => { e.stopPropagation(); setSelectedQuestionnaire(q); }}
                    className="flex-1 text-white/50 hover:text-[#2bc196]"
                  >
                    <Eye className="h-3.5 w-3.5 mr-1" />
                    {t('common.details')}
                  </Button>
                  {q.proposal_id ? (
                    <Link to={`${createPageUrl('ProposalCenter')}?id=${q.proposal_id}`} className="flex-1" onClick={e => e.stopPropagation()}>
                      <Button size="sm" className="w-full text-xs">
                        <Eye className="h-3.5 w-3.5 mr-1" />
                        {t('proposal.viewProposal')}
                      </Button>
                    </Link>
                  ) : (
                    <Link to={`${createPageUrl('ProposalCreation')}?questionnaireId=${q.id}`} className="flex-1" onClick={e => e.stopPropagation()}>
                      <Button size="sm" className="w-full text-xs">
                        <FileText className="h-3.5 w-3.5 mr-1" />
                        {t('questionnaire.generateProposal')}
                      </Button>
                    </Link>
                  )}
                  <Button
                    variant="destructive"
                    size="icon"
                    className="h-8 w-8"
                    onClick={(e) => { e.stopPropagation(); deleteMutation.mutate(q.id); }}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <LeadDetailModal
        data={selectedQuestionnaire}
        open={!!selectedQuestionnaire}
        onClose={() => setSelectedQuestionnaire(null)}
      />
    </div>
  );
}