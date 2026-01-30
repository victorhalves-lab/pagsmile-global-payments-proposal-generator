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
        <div className="rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 overflow-hidden">
          <div className="p-5 border-b border-white/10">
            <h3 className="text-white font-semibold flex items-center gap-2">
              <FileText className="h-5 w-5 text-[#2bc196]" />
              {t('dashboard.recentProposals')}
            </h3>
          </div>
          <div className="p-5">
            {proposals.slice(0, 5).length > 0 ? (
              <div className="space-y-3">
                {proposals.slice(0, 5).map(proposal => (
                  <div key={proposal.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                    <div>
                      <p className="text-white font-medium text-sm">{proposal.client_name}</p>
                      <p className="text-white/50 text-xs mt-0.5">{proposal.final_rate_percentage?.toFixed(2)}% + ${proposal.final_fixed_fee?.toFixed(2)}</p>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      proposal.status === 'accepted' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                      proposal.status === 'rejected' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                      proposal.status === 'counter_proposal' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                      'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                    }`}>
                      {t(`proposal.status.${proposal.status}`)}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-white/40 text-center py-4 text-sm">{t('proposal.noProposals')}</p>
            )}
            <Link to={createPageUrl('ProposalCenter')}>
              <Button variant="ghost" className="w-full mt-4">
                {t('proposal.title')}
              </Button>
            </Link>
          </div>
        </div>

        <div className="rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 overflow-hidden">
          <div className="p-5 border-b border-white/10">
            <h3 className="text-white font-semibold flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-[#2bc196]" />
              {t('dashboard.recentQuestionnaires')}
            </h3>
          </div>
          <div className="p-5">
            {questionnaires.slice(0, 5).length > 0 ? (
              <div className="space-y-3">
                {questionnaires.slice(0, 5).map(q => (
                  <div key={q.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                    <div>
                      <p className="text-white font-medium text-sm">{q.company_name}</p>
                      <p className="text-white/50 text-xs mt-0.5">TPV: {formatCurrency(q.monthly_tpv)}</p>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      q.pipeline_status === 'proposal_accepted' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                      q.pipeline_status === 'proposal_lost' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                      q.pipeline_status === 'proposal_made' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                      'bg-white/10 text-white/60 border border-white/20'
                    }`}>
                      {t(`questionnaire.status.${q.pipeline_status}`)}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-white/40 text-center py-4 text-sm">{t('questionnaire.noQuestionnaires')}</p>
            )}
            <Link to={createPageUrl('QuestionnaireCenter')}>
              <Button variant="ghost" className="w-full mt-4">
                {t('questionnaire.title')}
              </Button>
            </Link>
          </div>
        </div>

        <div className="rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 overflow-hidden">
          <div className="p-5 border-b border-white/10">
            <h3 className="text-white font-semibold flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-[#2bc196]" />
              {t('common.actions')}
            </h3>
          </div>
          <div className="p-5 space-y-3">
            <Link to={createPageUrl('ProposalCreation')} className="block">
              <Button className="w-full">
                <Plus className="h-4 w-4" />
                {t('nav.createProposal')}
              </Button>
            </Link>
            <Link to={createPageUrl('PipelineKanban')} className="block">
              <Button variant="secondary" className="w-full">
                {t('nav.pipeline')}
              </Button>
            </Link>
            <Link to={createPageUrl('InterchangeViewer')} className="block">
              <Button variant="outline" className="w-full">
                {t('nav.interchangeRates')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}