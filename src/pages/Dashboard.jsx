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

export default function Dashboard() {
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
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-white/60 mt-1">Visão geral do seu pipeline de propostas</p>
        </div>
        <Link to={createPageUrl('ProposalCreation')}>
          <Button className="bg-[#2bc196] hover:bg-[#5cf7cf] text-[#002443] font-semibold">
            <Plus className="h-5 w-5 mr-2" />
            Nova Proposta
          </Button>
        </Link>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <KPICard 
          title="TPV Total" 
          value={formatCurrency(totalTPV)} 
          icon={DollarSign}
        />
        <KPICard 
          title="Receita Estimada (1%)" 
          value={formatCurrency(estimatedRevenue)} 
          icon={TrendingUp}
        />
        <KPICard 
          title="Total de Leads" 
          value={totalLeads} 
          icon={Users}
        />
        <KPICard 
          title="TPV Ganho" 
          value={formatCurrency(tpvGanho)} 
          icon={CheckCircle}
        />
        <KPICard 
          title="TPV Perdido" 
          value={formatCurrency(tpvPerdido)} 
          icon={XCircle}
        />
        <KPICard 
          title="Win Rate" 
          value={`${winRate}%`} 
          icon={Percent}
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white/5 border-[#2bc196]/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <FileText className="h-5 w-5 text-[#2bc196]" />
              Propostas Recentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            {proposals.slice(0, 5).length > 0 ? (
              <div className="space-y-3">
                {proposals.slice(0, 5).map(proposal => (
                  <div key={proposal.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div>
                      <p className="text-white font-medium">{proposal.client_name}</p>
                      <p className="text-white/60 text-sm">{proposal.final_rate_percentage?.toFixed(2)}% + ${proposal.final_fixed_fee?.toFixed(2)}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      proposal.status === 'accepted' ? 'bg-green-500/20 text-green-400' :
                      proposal.status === 'rejected' ? 'bg-red-500/20 text-red-400' :
                      proposal.status === 'counter_proposal' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {proposal.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-white/40 text-center py-4">Nenhuma proposta ainda</p>
            )}
            <Link to={createPageUrl('ProposalCenter')}>
              <Button variant="ghost" className="w-full mt-4 text-[#2bc196] hover:text-[#5cf7cf] hover:bg-[#2bc196]/10">
                Ver todas as propostas
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-[#2bc196]/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-[#2bc196]" />
              Últimos Questionários
            </CardTitle>
          </CardHeader>
          <CardContent>
            {questionnaires.slice(0, 5).length > 0 ? (
              <div className="space-y-3">
                {questionnaires.slice(0, 5).map(q => (
                  <div key={q.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                    <div>
                      <p className="text-white font-medium">{q.company_name}</p>
                      <p className="text-white/60 text-sm">TPV: {formatCurrency(q.monthly_tpv)}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      q.pipeline_status === 'proposal_accepted' ? 'bg-green-500/20 text-green-400' :
                      q.pipeline_status === 'proposal_lost' ? 'bg-red-500/20 text-red-400' :
                      q.pipeline_status === 'proposal_made' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {q.pipeline_status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-white/40 text-center py-4">Nenhum questionário ainda</p>
            )}
            <Link to={createPageUrl('QuestionnaireCenter')}>
              <Button variant="ghost" className="w-full mt-4 text-[#2bc196] hover:text-[#5cf7cf] hover:bg-[#2bc196]/10">
                Ver todos os questionários
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-[#2bc196]/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-[#2bc196]" />
              Ações Rápidas
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link to={createPageUrl('ProposalCreation')} className="block">
              <Button className="w-full bg-[#2bc196] hover:bg-[#5cf7cf] text-[#002443]">
                <Plus className="h-4 w-4 mr-2" />
                Criar Nova Proposta
              </Button>
            </Link>
            <Link to={createPageUrl('PipelineKanban')} className="block">
              <Button variant="outline" className="w-full border-[#2bc196]/40 text-white hover:bg-[#2bc196]/20">
                Ver Pipeline
              </Button>
            </Link>
            <Link to={createPageUrl('InterchangeViewer')} className="block">
              <Button variant="outline" className="w-full border-[#2bc196]/40 text-white hover:bg-[#2bc196]/20">
                Ver Taxas Interchange
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}