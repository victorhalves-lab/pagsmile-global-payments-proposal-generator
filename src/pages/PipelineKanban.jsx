import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building2, DollarSign, Users, TrendingUp, TrendingDown, Percent } from 'lucide-react';
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

  const { data: questionnaires = [], isLoading } = useQuery({
    queryKey: ['questionnaires'],
    queryFn: () => base44.entities.Questionnaire.list()
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, status }) => base44.entities.Questionnaire.update(id, { pipeline_status: status }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['questionnaires'] })
  });

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    
    const { draggableId, destination } = result;
    const newStatus = destination.droppableId;
    
    updateMutation.mutate({ id: draggableId, status: newStatus });
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value || 0);
  };

  // Calcular métricas globais
  const totalTPV = questionnaires.reduce((sum, q) => sum + (q.monthly_tpv || 0), 0);
  const totalLeads = questionnaires.length;
  const tpvGanho = questionnaires
    .filter(q => q.pipeline_status === 'proposal_accepted')
    .reduce((sum, q) => sum + (q.monthly_tpv || 0), 0);
  const tpvPerdido = questionnaires
    .filter(q => q.pipeline_status === 'proposal_lost')
    .reduce((sum, q) => sum + (q.monthly_tpv || 0), 0);
  const winRate = (tpvGanho + tpvPerdido) > 0 
    ? ((tpvGanho / (tpvGanho + tpvPerdido)) * 100).toFixed(1) 
    : 0;

  // Agrupar por status
  const groupedData = COLUMNS.reduce((acc, col) => {
    acc[col.id] = questionnaires.filter(q => q.pipeline_status === col.id);
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

      {/* Kanban */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto pb-4">
          {COLUMNS.map(column => {
            const metrics = getColumnMetrics(column.id);
            return (
              <div key={column.id} className="min-w-[280px]">
                <div className="rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 overflow-hidden">
                  <div className="p-4 border-b border-white/10">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className={`w-2.5 h-2.5 rounded-full ${column.color}`} />
                        <span className="text-white font-medium text-sm">{column.title}</span>
                      </div>
                      <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-white/10 text-white/70 border border-white/10">{metrics.count}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-white/5 rounded-lg p-2.5 border border-white/5">
                        <p className="text-white/50 text-[10px] uppercase tracking-wider">TPV</p>
                        <p className="text-white font-semibold mt-0.5">{formatCurrency(metrics.tpv)}</p>
                      </div>
                      <div className="bg-[#2bc196]/10 rounded-lg p-2.5 border border-[#2bc196]/20">
                        <p className="text-[#2bc196]/70 text-[10px] uppercase tracking-wider">Receita (1%)</p>
                        <p className="text-[#2bc196] font-semibold mt-0.5">{formatCurrency(metrics.revenue)}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-3">
                    <Droppable droppableId={column.id}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className={`min-h-[200px] space-y-2 transition-all rounded-xl p-2 ${
                            snapshot.isDraggingOver ? 'bg-[#2bc196]/10 border-2 border-dashed border-[#2bc196]/30' : 'border-2 border-transparent'
                          }`}
                        >
                          {(groupedData[column.id] || []).map((item, index) => (
                            <Draggable key={item.id} draggableId={item.id} index={index}>
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className={`bg-white/[0.06] hover:bg-white/[0.1] rounded-xl p-3 cursor-grab transition-all border border-white/10 ${
                                    snapshot.isDragging ? 'shadow-xl shadow-[#2bc196]/20 ring-2 ring-[#2bc196] bg-[#002443]' : ''
                                  }`}
                                >
                                  <div className="flex items-center gap-3 mb-2">
                                    <div className="w-9 h-9 bg-[#2bc196]/10 rounded-xl flex items-center justify-center border border-[#2bc196]/20">
                                      <Building2 className="h-4 w-4 text-[#2bc196]" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <p className="text-white font-medium text-sm truncate">
                                        {item.company_name}
                                      </p>
                                      <p className="text-white/50 text-xs truncate">
                                        {item.contact_name}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-center justify-between text-xs pt-2 border-t border-white/10">
                                    <span className="text-white/50">TPV:</span>
                                    <span className="text-[#2bc196] font-semibold">
                                      {formatCurrency(item.monthly_tpv)}
                                    </span>
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
}