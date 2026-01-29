import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Building2, User, DollarSign, Eye, FileText, Trash2 } from 'lucide-react';

export default function QuestionnaireCenter() {
  const [selectedQuestionnaire, setSelectedQuestionnaire] = useState(null);
  const queryClient = useQueryClient();

  const { data: questionnaires = [], isLoading } = useQuery({
    queryKey: ['questionnaires'],
    queryFn: () => base44.entities.Questionnaire.list('-created_date')
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.Questionnaire.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['questionnaires'] })
  });

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
      leads: 'bg-gray-500/20 text-gray-300',
      proposal_made: 'bg-blue-500/20 text-blue-400',
      proposal_accepted: 'bg-green-500/20 text-green-400',
      counter_proposal: 'bg-yellow-500/20 text-yellow-400',
      proposal_lost: 'bg-red-500/20 text-red-400'
    };
    const labels = {
      leads: 'Lead',
      proposal_made: 'Proposta Feita',
      proposal_accepted: 'Aceita',
      counter_proposal: 'Contraproposta',
      proposal_lost: 'Perdida'
    };
    return (
      <Badge className={styles[status] || styles.leads}>
        {labels[status] || 'Lead'}
      </Badge>
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
        <h1 className="text-3xl font-bold text-white">Central de Questionários</h1>
        <p className="text-white/60 mt-1">Gerencie todos os questionários recebidos</p>
      </div>

      {questionnaires.length === 0 ? (
        <Card className="bg-white/5 border-[#2bc196]/20">
          <CardContent className="py-12 text-center">
            <p className="text-white/60">Nenhum questionário recebido ainda.</p>
            <p className="text-white/40 text-sm mt-2">Compartilhe o link do questionário para receber novos leads.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {questionnaires.map(q => (
            <Card key={q.id} className="bg-white/5 border-[#2bc196]/20 hover:bg-white/10 transition-colors">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#2bc196]/20 rounded-full flex items-center justify-center">
                      <Building2 className="h-5 w-5 text-[#2bc196]" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{q.company_name}</h3>
                      <p className="text-white/60 text-sm flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {q.contact_name}
                      </p>
                    </div>
                  </div>
                  {getStatusBadge(q.pipeline_status)}
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/60">TPV Mensal:</span>
                    <span className="text-white font-medium flex items-center gap-1">
                      <DollarSign className="h-3 w-3 text-[#2bc196]" />
                      {formatCurrency(q.monthly_tpv)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/60">Ticket Médio:</span>
                    <span className="text-white">{formatCurrency(q.average_ticket)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/60">Transações/mês:</span>
                    <span className="text-white">{(q.monthly_transactions || 0).toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setSelectedQuestionnaire(q)}
                    className="flex-1 border-[#2bc196]/40 text-white hover:bg-[#2bc196]/20"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Detalhes
                  </Button>
                  {q.proposal_id ? (
                    <Link to={`${createPageUrl('ProposalCenter')}?id=${q.proposal_id}`} className="flex-1">
                      <Button 
                        size="sm"
                        className="w-full bg-[#2bc196] hover:bg-[#5cf7cf] text-[#002443]"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Ver Proposta
                      </Button>
                    </Link>
                  ) : (
                    <Link to={`${createPageUrl('ProposalCreation')}?questionnaireId=${q.id}`} className="flex-1">
                      <Button 
                        size="sm"
                        className="w-full bg-[#2bc196] hover:bg-[#5cf7cf] text-[#002443]"
                      >
                        <FileText className="h-4 w-4 mr-1" />
                        Gerar Proposta
                      </Button>
                    </Link>
                  )}
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => deleteMutation.mutate(q.id)}
                    className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Modal de Detalhes */}
      <Dialog open={!!selectedQuestionnaire} onOpenChange={() => setSelectedQuestionnaire(null)}>
        <DialogContent className="bg-[#002443] border-[#2bc196]/20 text-white max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-[#2bc196]">
              Detalhes do Questionário
            </DialogTitle>
          </DialogHeader>
          {selectedQuestionnaire && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-white/60 text-sm">Empresa</p>
                  <p className="text-white font-medium">{selectedQuestionnaire.company_name}</p>
                </div>
                <div>
                  <p className="text-white/60 text-sm">Contato</p>
                  <p className="text-white font-medium">{selectedQuestionnaire.contact_name}</p>
                </div>
                <div>
                  <p className="text-white/60 text-sm">E-mail</p>
                  <p className="text-white">{selectedQuestionnaire.contact_email}</p>
                </div>
                <div>
                  <p className="text-white/60 text-sm">Telefone</p>
                  <p className="text-white">{selectedQuestionnaire.contact_phone_country_code} {selectedQuestionnaire.contact_phone}</p>
                </div>
                <div>
                  <p className="text-white/60 text-sm">Cargo</p>
                  <p className="text-white">{selectedQuestionnaire.contact_role || '-'}</p>
                </div>
                <div>
                  <p className="text-white/60 text-sm">Tipo de Negócio</p>
                  <p className="text-white">{selectedQuestionnaire.business_type || '-'}</p>
                </div>
                <div>
                  <p className="text-white/60 text-sm">Modelo de Negócio</p>
                  <p className="text-white">{selectedQuestionnaire.business_model || '-'}</p>
                </div>
                <div>
                  <p className="text-white/60 text-sm">Produtos/Serviços</p>
                  <p className="text-white">{selectedQuestionnaire.products_services || '-'}</p>
                </div>
              </div>

              <div className="border-t border-[#2bc196]/20 pt-4">
                <h4 className="text-[#2bc196] font-medium mb-3">Dados Financeiros</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-white/60 text-sm">TPV Mensal</p>
                    <p className="text-white font-medium">{formatCurrency(selectedQuestionnaire.monthly_tpv)}</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Ticket Médio</p>
                    <p className="text-white font-medium">{formatCurrency(selectedQuestionnaire.average_ticket)}</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Transações/mês</p>
                    <p className="text-white font-medium">{(selectedQuestionnaire.monthly_transactions || 0).toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {selectedQuestionnaire.has_current_partner && (
                <div className="border-t border-[#2bc196]/20 pt-4">
                  <h4 className="text-[#2bc196] font-medium mb-3">Parceiro Atual</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-white/60 text-sm">Taxa Atual</p>
                      <p className="text-white font-medium">{selectedQuestionnaire.current_rate_percentage}%</p>
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">Fee Fixo Atual</p>
                      <p className="text-white font-medium">${selectedQuestionnaire.current_fixed_fee}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="border-t border-[#2bc196]/20 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-white/60 text-sm">Prazo Esperado</p>
                    <p className="text-white font-medium">{selectedQuestionnaire.expected_settlement_days || '-'}</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Status</p>
                    {getStatusBadge(selectedQuestionnaire.pipeline_status)}
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}