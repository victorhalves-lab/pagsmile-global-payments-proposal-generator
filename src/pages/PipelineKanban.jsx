import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, DollarSign, Users, TrendingUp, TrendingDown, Percent, FileText } from 'lucide-react';
import KPICard from '@/components/ui/KPICard';
import { useTranslation } from 'react-i18next';

export default function PipelineKanban() {
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const COLUMNS = [
    { id: 'leads', title: t('pipeline.columns.leads'), color: 'bg-gray-500' },
    { id: 'proposal_made', title: t('pipeline.columns.proposal_made'), color: 'bg-blue-500' },
    { id: 'proposal_accepted', title: t('pipeline.columns.proposal_accepted'), color: 'bg-green-500' },
    { id: 'counter_proposal', title: t('pipeline.columns.counter_proposal'), color: 'bg-yellow-500' },
    { id: 'proposal_lost', title: t('pipeline.columns.proposal_lost'), color: 'bg-red-500' },
  ];

  // Buscar questionários
  const { data: questionnaires = [], isLoading: loadingQuestionnaires } = useQuery({
    queryKey: ['questionnaires'],
    queryFn: () => base44.entities.Questionnaire.list()
  });

  // Buscar propostas (para incluir as que não têm questionário vinculado)
  const { data: proposals = [], isLoading: loadingProposals } = useQuery({
    queryKey: ['proposals'],
    queryFn: () => base44.entities.Proposal.list()
  });

  const isLoading = loadingQuestionnaires || loadingProposals;

  // Mapear status da proposta para status do pipeline
  const mapProposalStatusToPipeline = (status) => {
    switch (status) {
      case 'sent': return 'proposal_made';
      case 'accepted': return 'proposal_accepted';
      case 'counter_proposal': return 'counter_proposal';
      case 'rejected': return 'proposal_lost';
      default: return 'proposal_made';
    }
  };

  // Encontrar propostas sem questionário vinculado
  const proposalsWithoutQuestionnaire = proposals.filter(p => !p.questionnaire_id);

  // Converter propostas sem questionário para formato de pipeline item
  const proposalPipelineItems = proposalsWithoutQuestionnaire.map(p => ({
    id: `proposal_${p.id}`,
    originalId: p.id,
    type: 'proposal',
    company_name: p.client_name,
    contact_name: p.contact_name,
    contact_email: p.contact_email,
    monthly_tpv: 0, // Propostas diretas não têm TPV estimado
    pipeline_status: mapProposalStatusToPipeline(p.status),
    final_rate: p.final_rate_percentage,
    final_fixed_fee: p.final_fixed_fee,
    created_date: p.created_date
  }));

  // Converter questionários para formato de pipeline item
  const questionnairePipelineItems = questionnaires.map(q => ({
    id: q.id,
    originalId: q.id,
    type: 'questionnaire',
    company_name: q.company_name,
    contact_name: q.contact_name,
    contact_email: q.contact_email,
    monthly_tpv: q.monthly_tpv || 0,
    pipeline_status: q.pipeline_status || 'leads',
    created_date: q.created_date
  }));

  // Combinar todos os itens do pipeline
  const allPipelineItems = [...questionnairePipelineItems, ...proposalPipelineItems];

  const updateQuestionnaireMutation = useMutation({
    mutationFn: ({ id, status }) => base44.entities.Questionnaire.update(id, { pipeline_status: status }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['questionnaires'] })
  });

  const updateProposalMutation = useMutation({
    mutationFn: ({ id, status }) => {
      // Mapear status do pipeline de volta para status da proposta
      const proposalStatus = status === 'proposal_made' ? 'sent' 
        : status === 'proposal_accepted' ? 'accepted'
        : status === 'counter_proposal' ? 'counter_proposal'
        : status === 'proposal_lost' ? 'rejected'
        : 'sent';
      return base44.entities.Proposal.update(id, { status: proposalStatus });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['proposals'] })
  });

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    
    const { draggableId, destination } = result;
    const newStatus = destination.droppableId;
    
    // Verificar se é uma proposta ou questionário
    if (draggableId.startsWith('proposal_')) {
      const proposalId = draggableId.replace('proposal_', '');
      updateProposalMutation.mutate({ id: proposalId, status: newStatus });
    } else {
      updateQuestionnaireMutation.mutate({ id: draggableId, status: newStatus });
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value || 0);
  };

  // Calcular métricas globais (usando todos os itens do pipeline)
  const totalTPV = allPipelineItems.reduce((sum, item) => sum + (item.monthly_tpv || 0), 0);
  const totalLeads = allPipelineItems.length;
  const tpvGanho = allPipelineItems
    .filter(item => item.pipeline_status === 'proposal_accepted')
    .reduce((sum, item) => sum + (item.monthly_tpv || 0), 0);
  const tpvPerdido = allPipelineItems
    .filter(item => item.pipeline_status === 'proposal_lost')
    .reduce((sum, item) => sum + (item.monthly_tpv || 0), 0);
  const winRate = (tpvGanho + tpvPerdido) > 0 
    ? ((tpvGanho / (tpvGanho + tpvPerdido)) * 100).toFixed(1) 
    : 0;

  // Agrupar por status (combinando questionários e propostas)
  const groupedData = COLUMNS.reduce((acc, col) => {
    acc[col.id] = allPipelineItems.filter(item => item.pipeline_status === col.id);
    return acc;
  }, {});

  // Calcular métricas por coluna
  const getColumnMetrics = (columnId) => {
    const items = groupedData[columnId] || [];
    const tpv = items.reduce((sum, q) => sum + (q.monthly_tpv || 0), 0);
    return {
      count: items.length,
      tpv,
      revenue: tpv * 0.01
    };
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
        <h1 className="text-3xl font-bold text-white">{t('pipeline.title')}</h1>
        <p className="text-white/50 mt-1">{t('pipeline.subtitle')}</p>
      </div>

      {/* KPIs Globais */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <KPICard title={t('pipeline.totalTPV')} value={formatCurrency(totalTPV)} icon={DollarSign} />
        <KPICard title={t('pipeline.estimatedRevenue')} value={formatCurrency(totalTPV * 0.01)} icon={TrendingUp} />
        <KPICard title={t('pipeline.totalLeads')} value={totalLeads} icon={Users} />
        <KPICard title={t('pipeline.wonTPV')} value={formatCurrency(tpvGanho)} icon={TrendingUp} />
        <KPICard title={t('pipeline.lostTPV')} value={formatCurrency(tpvPerdido)} icon={TrendingDown} />
        <KPICard title={t('pipeline.winRate')} value={`${winRate}%`} icon={Percent} />
      </div>

      {/* Kanban - Layout Horizontal */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-4" style={{ minWidth: 'max-content' }}>
            {COLUMNS.map(column => {
              const metrics = getColumnMetrics(column.id);
              return (
                <div key={column.id} className="w-[280px] flex-shrink-0">
                  <div className="rounded-2xl bg-[#001a30]/80 border border-white/[0.08] overflow-hidden backdrop-blur-xl h-full flex flex-col">
                    {/* Header da Coluna */}
                    <div className="p-4 border-b border-white/[0.06] bg-gradient-to-r from-white/[0.02] to-transparent">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-2.5 h-2.5 rounded-full ${column.color}`} />
                          <span className="text-white font-semibold text-sm">{column.title}</span>
                        </div>
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-white/[0.08] text-white/70">{metrics.count}</span>
                      </div>
                      <div className="flex gap-2 text-xs">
                        <div className="flex-1 bg-white/[0.04] rounded-lg px-3 py-2 border border-white/[0.05]">
                          <p className="text-white/40 text-[10px] uppercase tracking-wider">TPV</p>
                          <p className="text-white font-semibold">{formatCurrency(metrics.tpv)}</p>
                        </div>
                        <div className="flex-1 bg-[#2bc196]/10 rounded-lg px-3 py-2 border border-[#2bc196]/20">
                          <p className="text-[#2bc196]/60 text-[10px] uppercase tracking-wider">Receita</p>
                          <p className="text-[#2bc196] font-semibold">{formatCurrency(metrics.revenue)}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Área de Cards */}
                    <div className="flex-1 p-2">
                      <Droppable droppableId={column.id}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className={`min-h-[300px] max-h-[500px] overflow-y-auto space-y-2 p-2 rounded-xl transition-all ${
                              snapshot.isDraggingOver ? 'bg-[#2bc196]/10 border-2 border-dashed border-[#2bc196]/30' : ''
                            }`}
                          >
                            {(groupedData[column.id] || []).map((item, index) => (
                              <Draggable key={item.id} draggableId={item.id} index={index}>
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className={`bg-white/[0.05] hover:bg-white/[0.08] rounded-xl p-3 cursor-grab transition-all border border-white/[0.08] hover:border-[#2bc196]/30 ${
                                      snapshot.isDragging ? 'shadow-xl shadow-[#2bc196]/20 ring-2 ring-[#2bc196] bg-[#002443]' : ''
                                    }`}
                                  >
                                    <div className="flex items-center gap-2.5 mb-2">
                                      <div className="w-8 h-8 bg-[#2bc196]/15 rounded-lg flex items-center justify-center border border-[#2bc196]/20">
                                        <Building2 className="h-3.5 w-3.5 text-[#2bc196]" />
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <p className="text-white font-medium text-sm truncate">{item.company_name}</p>
                                        <p className="text-white/40 text-xs truncate">{item.contact_name}</p>
                                      </div>
                                    </div>
                                    <div className="flex items-center justify-between text-xs pt-2 border-t border-white/[0.08]">
                                      <span className="text-white/40">TPV:</span>
                                      <span className="text-[#2bc196] font-semibold">{formatCurrency(item.monthly_tpv)}</span>
                                    </div>
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                            {(groupedData[column.id] || []).length === 0 && (
                              <div className="flex items-center justify-center h-24 text-white/20 text-xs">
                                Arraste cards aqui
                              </div>
                            )}
                          </div>
                        )}
                      </Droppable>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </DragDropContext>
    </div>
  );
}