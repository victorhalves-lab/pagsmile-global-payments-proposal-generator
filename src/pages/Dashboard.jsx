import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import KPICard from '@/components/ui/KPICard';
import { 
  DollarSign, 
  TrendingUp, 
  Users, 
  CheckCircle, 
  XCircle,
  Percent,
  Plus,
  FileText,
  ClipboardList
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';

export default function Dashboard() {
  const { t } = useTranslation();
  
  const { data: questionnaires = [], isLoading: loadingQ } = useQuery({
    queryKey: ['questionnaires'],
    queryFn: () => base44.entities.Questionnaire.list()
  });

  const { data: proposals = [], isLoading: loadingP } = useQuery({
    queryKey: ['proposals'],
    queryFn: () => base44.entities.Proposal.list()
  });

  // Cálculos de KPIs
  const totalTPV = questionnaires.reduce((sum, q) => sum + (q.monthly_tpv || 0), 0);
  const estimatedRevenue = totalTPV * 0.01;
  const totalLeads = questionnaires.length;

  const acceptedProposals = proposals.filter(p => p.status === 'accepted');
  const rejectedProposals = proposals.filter(p => p.status === 'rejected');

  const tpvGanho = questionnaires
    .filter(q => q.pipeline_status === 'proposal_accepted')
    .reduce((sum, q) => sum + (q.monthly_tpv || 0), 0);

  const tpvPerdido = questionnaires
    .filter(q => q.pipeline_status === 'proposal_lost')
    .reduce((sum, q) => sum + (q.monthly_tpv || 0), 0);

  const winRate = (tpvGanho + tpvPerdido) > 0 
    ? ((tpvGanho / (tpvGanho + tpvPerdido)) * 100).toFixed(1) 
    : 0;

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  if (loadingQ || loadingP) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2bc196]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">{t('dashboard.title')}</h1>
          <p className="text-white/50 mt-1">{t('dashboard.subtitle')}</p>
        </div>
        <Link to={createPageUrl('ProposalCreation')}>
          <Button>
            <Plus className="h-5 w-5" />
            {t('proposal.newProposal')}
          </Button>
        </Link>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <KPICard 
          title={t('dashboard.totalTPV')} 
          value={formatCurrency(totalTPV)} 
          icon={DollarSign}
        />
        <KPICard 
          title={t('dashboard.conversionRate')} 
          value={formatCurrency(estimatedRevenue)} 
          icon={TrendingUp}
        />
        <KPICard 
          title={t('pipeline.totalLeads')} 
          value={totalLeads} 
          icon={Users}
        />
        <KPICard 
          title={t('pipeline.wonTPV')} 
          value={formatCurrency(tpvGanho)} 
          icon={CheckCircle}
        />
        <KPICard 
          title={t('pipeline.lostTPV')} 
          value={formatCurrency(tpvPerdido)} 
          icon={XCircle}
        />
        <KPICard 
          title={t('pipeline.winRate')} 
          value={`${winRate}%`} 
          icon={Percent}
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="group rounded-2xl bg-[#001a30]/80 border border-white/[0.08] overflow-hidden backdrop-blur-xl transition-all duration-500 hover:border-[#2bc196]/30 hover:shadow-xl hover:shadow-[#2bc196]/5">
          <div className="p-5 border-b border-white/[0.06] bg-gradient-to-r from-white/[0.02] to-transparent">
            <h3 className="text-white font-semibold flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[#2bc196]/10 border border-[#2bc196]/20">
                <FileText className="h-4 w-4 text-[#2bc196]" />
              </div>
              {t('dashboard.recentProposals')}
            </h3>
          </div>
          <div className="p-5">
            {proposals.slice(0, 5).length > 0 ? (
              <div className="space-y-2.5">
                {proposals.slice(0, 5).map(proposal => (
                  <div key={proposal.id} className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.05] hover:border-white/10 transition-all duration-300">
                    <div>
                      <p className="text-white font-medium text-sm">{proposal.client_name}</p>
                      <p className="text-white/40 text-xs mt-1 font-mono">{proposal.final_rate_percentage?.toFixed(2)}% + ${proposal.final_fixed_fee?.toFixed(2)}</p>
                    </div>
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold uppercase tracking-wide ${
                      proposal.status === 'accepted' ? 'bg-green-500/15 text-green-400 border border-green-500/25' :
                      proposal.status === 'rejected' ? 'bg-red-500/15 text-red-400 border border-red-500/25' :
                      proposal.status === 'counter_proposal' ? 'bg-yellow-500/15 text-yellow-400 border border-yellow-500/25' :
                      'bg-blue-500/15 text-blue-400 border border-blue-500/25'
                    }`}>
                      {t(`proposal.status.${proposal.status}`)}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-white/30 text-center py-8 text-sm">{t('proposal.noProposals')}</p>
            )}
            <Link to={createPageUrl('ProposalCenter')}>
              <Button variant="ghost" className="w-full mt-4">
                {t('proposal.title')}
              </Button>
            </Link>
          </div>
        </div>

        <div className="group rounded-2xl bg-[#001a30]/80 border border-white/[0.08] overflow-hidden backdrop-blur-xl transition-all duration-500 hover:border-[#2bc196]/30 hover:shadow-xl hover:shadow-[#2bc196]/5">
          <div className="p-5 border-b border-white/[0.06] bg-gradient-to-r from-white/[0.02] to-transparent">
            <h3 className="text-white font-semibold flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[#2bc196]/10 border border-[#2bc196]/20">
                <ClipboardList className="h-4 w-4 text-[#2bc196]" />
              </div>
              {t('dashboard.recentQuestionnaires')}
            </h3>
          </div>
          <div className="p-5">
            {questionnaires.slice(0, 5).length > 0 ? (
              <div className="space-y-2.5">
                {questionnaires.slice(0, 5).map(q => (
                  <div key={q.id} className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.05] hover:border-white/10 transition-all duration-300">
                    <div>
                      <p className="text-white font-medium text-sm">{q.company_name}</p>
                      <p className="text-white/40 text-xs mt-1 font-mono">TPV: {formatCurrency(q.monthly_tpv)}</p>
                    </div>
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-semibold uppercase tracking-wide ${
                      q.pipeline_status === 'proposal_accepted' ? 'bg-green-500/15 text-green-400 border border-green-500/25' :
                      q.pipeline_status === 'proposal_lost' ? 'bg-red-500/15 text-red-400 border border-red-500/25' :
                      q.pipeline_status === 'proposal_made' ? 'bg-blue-500/15 text-blue-400 border border-blue-500/25' :
                      'bg-white/[0.06] text-white/50 border border-white/10'
                    }`}>
                      {t(`questionnaire.status.${q.pipeline_status}`)}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-white/30 text-center py-8 text-sm">{t('questionnaire.noQuestionnaires')}</p>
            )}
            <Link to={createPageUrl('QuestionnaireCenter')}>
              <Button variant="ghost" className="w-full mt-4">
                {t('questionnaire.title')}
              </Button>
            </Link>
          </div>
        </div>

        <div className="group rounded-2xl bg-[#001a30]/80 border border-white/[0.08] overflow-hidden backdrop-blur-xl transition-all duration-500 hover:border-[#2bc196]/30 hover:shadow-xl hover:shadow-[#2bc196]/5">
          <div className="p-5 border-b border-white/[0.06] bg-gradient-to-r from-white/[0.02] to-transparent">
            <h3 className="text-white font-semibold flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[#2bc196]/10 border border-[#2bc196]/20">
                <TrendingUp className="h-4 w-4 text-[#2bc196]" />
              </div>
              {t('common.actions')}
            </h3>
          </div>
          <div className="p-5 space-y-3">
            <Link to={createPageUrl('ProposalCreation')} className="block">
              <Button className="w-full justify-center gap-2 h-12 text-sm font-semibold">
                <Plus className="h-4 w-4" />
                {t('nav.createProposal')}
              </Button>
            </Link>
            <Link to={createPageUrl('PipelineKanban')} className="block">
              <Button variant="secondary" className="w-full justify-center h-11 text-sm">
                {t('nav.pipeline')}
              </Button>
            </Link>
            <Link to={createPageUrl('InterchangeViewer')} className="block">
              <Button variant="outline" className="w-full justify-center h-11 text-sm">
                {t('nav.interchangeRates')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}