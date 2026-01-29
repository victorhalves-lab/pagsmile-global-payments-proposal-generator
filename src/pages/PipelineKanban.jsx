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
        <p className="text-white/60 mt-1">{t('pipeline.subtitle')}</p>
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
                <Card className="bg-white/5 border-[#2bc196]/20">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${column.color}`} />
                        <CardTitle className="text-white text-sm">{column.title}</CardTitle>
                      </div>
                      <Badge className="bg-white/10 text-white">{metrics.count}</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
                      <div className="bg-white/5 rounded p-2">
                        <p className="text-white/60">TPV</p>
                        <p className="text-white font-medium">{formatCurrency(metrics.tpv)}</p>
                      </div>
                      <div className="bg-white/5 rounded p-2">
                        <p className="text-white/60">Receita (1%)</p>
                        <p className="text-[#2bc196] font-medium">{formatCurrency(metrics.revenue)}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <Droppable droppableId={column.id}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className={`min-h-[200px] space-y-2 transition-colors rounded-lg p-2 ${
                            snapshot.isDraggingOver ? 'bg-[#2bc196]/10' : ''
                          }`}
                        >
                          {(groupedData[column.id] || []).map((item, index) => (
                            <Draggable key={item.id} draggableId={item.id} index={index}>
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className={`bg-white/10 rounded-lg p-3 cursor-grab transition-all ${
                                    snapshot.isDragging ? 'shadow-lg ring-2 ring-[#2bc196]' : ''
                                  }`}
                                >
                                  <div className="flex items-center gap-2 mb-2">
                                    <div className="w-8 h-8 bg-[#2bc196]/20 rounded-full flex items-center justify-center">
                                      <Building2 className="h-4 w-4 text-[#2bc196]" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <p className="text-white font-medium text-sm truncate">
                                        {item.company_name}
                                      </p>
                                      <p className="text-white/60 text-xs truncate">
                                        {item.contact_name}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-center justify-between text-xs">
                                    <span className="text-white/60">TPV:</span>
                                    <span className="text-[#2bc196] font-medium">
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
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
}