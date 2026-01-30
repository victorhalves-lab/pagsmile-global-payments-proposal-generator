import React, { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Building2, User, DollarSign, Eye, FileText, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import QuestionnaireFilters from '@/components/proposal/QuestionnaireFilters';

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
            <div key={q.id} className="group rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 hover:border-[#2bc196]/30 transition-all duration-300 overflow-hidden">
              <div className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 bg-[#2bc196]/10 rounded-xl flex items-center justify-center border border-[#2bc196]/20">
                      <Building2 className="h-5 w-5 text-[#2bc196]" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{q.company_name}</h3>
                      <p className="text-white/50 text-sm flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {q.contact_name}
                      </p>
                    </div>
                  </div>
                  {getStatusBadge(q.pipeline_status)}
                </div>

                <div className="space-y-2.5 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/50">{t('questionnaire.monthlyTPV')}:</span>
                    <span className="text-[#2bc196] font-semibold flex items-center gap-1">
                      {formatCurrency(q.monthly_tpv)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/50">{t('questionnaire.avgTicket')}:</span>
                    <span className="text-white/80">{formatCurrency(q.average_ticket)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/50">{t('questionnaire.monthlyTransactions')}:</span>
                    <span className="text-white/80">{(q.monthly_transactions || 0).toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-4 border-t border-white/10">
                  <Button 
                    size="sm"
                    variant="ghost"
                    onClick={() => setSelectedQuestionnaire(q)}
                    className="flex-1"
                  >
                    <Eye className="h-4 w-4" />
                    {t('common.details')}
                  </Button>
                  {q.proposal_id ? (
                    <Link to={`${createPageUrl('ProposalCenter')}?id=${q.proposal_id}`} className="flex-1">
                      <Button 
                        size="sm"
                        className="w-full"
                      >
                        <Eye className="h-4 w-4" />
                        {t('proposal.viewProposal')}
                      </Button>
                    </Link>
                  ) : (
                    <Link to={`${createPageUrl('ProposalCreation')}?questionnaireId=${q.id}`} className="flex-1">
                      <Button 
                        size="sm"
                        className="w-full"
                      >
                        <FileText className="h-4 w-4" />
                        {t('questionnaire.generateProposal')}
                      </Button>
                    </Link>
                  )}
                  <Button 
                    variant="destructive" 
                    size="icon"
                    onClick={() => deleteMutation.mutate(q.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal de Detalhes */}
      <Dialog open={!!selectedQuestionnaire} onOpenChange={() => setSelectedQuestionnaire(null)}>
        <DialogContent className="bg-[#002443] border-[#2bc196]/20 text-white max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-[#2bc196]">
              {t('questionnaire.questionnaireDetails')}
            </DialogTitle>
          </DialogHeader>
          {selectedQuestionnaire && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-white/60 text-sm">{t('questionnaire.company')}</p>
                  <p className="text-white font-medium">{selectedQuestionnaire.company_name}</p>
                </div>
                <div>
                  <p className="text-white/60 text-sm">{t('questionnaire.contact')}</p>
                  <p className="text-white font-medium">{selectedQuestionnaire.contact_name}</p>
                </div>
                <div>
                  <p className="text-white/60 text-sm">{t('questionnaire.email')}</p>
                  <p className="text-white">{selectedQuestionnaire.contact_email}</p>
                </div>
                <div>
                  <p className="text-white/60 text-sm">{t('questionnaire.phone')}</p>
                  <p className="text-white">{selectedQuestionnaire.contact_phone_country_code} {selectedQuestionnaire.contact_phone}</p>
                </div>
                <div>
                  <p className="text-white/60 text-sm">{t('questionnaire.role')}</p>
                  <p className="text-white">{selectedQuestionnaire.contact_role || '-'}</p>
                </div>
                <div>
                  <p className="text-white/60 text-sm">{t('questionnaire.businessType')}</p>
                  <p className="text-white">{selectedQuestionnaire.business_type || '-'}</p>
                </div>
                <div>
                  <p className="text-white/60 text-sm">{t('questionnaire.businessModel')}</p>
                  <p className="text-white">{selectedQuestionnaire.business_model || '-'}</p>
                </div>
                <div>
                  <p className="text-white/60 text-sm">{t('questionnaire.products')}</p>
                  <p className="text-white">{selectedQuestionnaire.products_services || '-'}</p>
                </div>
                <div>
                  <p className="text-white/60 text-sm">MCC</p>
                  <p className="text-white">{selectedQuestionnaire.mcc || '-'}</p>
                </div>
              </div>

              <div className="border-t border-[#2bc196]/20 pt-4">
                <h4 className="text-[#2bc196] font-medium mb-3">{t('questionnaire.financialInfo')}</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-white/60 text-sm">{t('questionnaire.monthlyTPV')}</p>
                    <p className="text-white font-medium">{formatCurrency(selectedQuestionnaire.monthly_tpv)}</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">{t('questionnaire.avgTicket')}</p>
                    <p className="text-white font-medium">{formatCurrency(selectedQuestionnaire.average_ticket)}</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">{t('questionnaire.monthlyTransactions')}</p>
                    <p className="text-white font-medium">{(selectedQuestionnaire.monthly_transactions || 0).toLocaleString()}</p>
                  </div>
                </div>
              </div>

              {/* Divisão de Transações */}
              {(selectedQuestionnaire.credit_percentage > 0 || selectedQuestionnaire.visa_percentage > 0) && (
                <div className="border-t border-[#2bc196]/20 pt-4">
                  <h4 className="text-[#2bc196] font-medium mb-3">Divisão de Transações</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {(selectedQuestionnaire.credit_percentage > 0 || selectedQuestionnaire.debit_percentage > 0) && (
                      <div className="bg-white/5 p-3 rounded-lg">
                        <p className="text-white/60 text-xs mb-2">Por Tipo de Cartão</p>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-white/70">Crédito</span>
                            <span className="text-white">{selectedQuestionnaire.credit_percentage || 0}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/70">Débito</span>
                            <span className="text-white">{selectedQuestionnaire.debit_percentage || 0}%</span>
                          </div>
                        </div>
                      </div>
                    )}
                    {(selectedQuestionnaire.visa_percentage > 0 || selectedQuestionnaire.mastercard_percentage > 0) && (
                      <div className="bg-white/5 p-3 rounded-lg">
                        <p className="text-white/60 text-xs mb-2">Por Bandeira</p>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-white/70">Visa</span>
                            <span className="text-white">{selectedQuestionnaire.visa_percentage || 0}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/70">Mastercard</span>
                            <span className="text-white">{selectedQuestionnaire.mastercard_percentage || 0}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/70">Amex</span>
                            <span className="text-white">{selectedQuestionnaire.amex_percentage || 0}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/70">Outras</span>
                            <span className="text-white">{selectedQuestionnaire.other_brands_percentage || 0}%</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {selectedQuestionnaire.has_current_partner && (
                <div className="border-t border-[#2bc196]/20 pt-4">
                  <h4 className="text-[#2bc196] font-medium mb-3">{t('questionnaire.hasPartner')}</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-white/60 text-sm">{t('questionnaire.currentRate')}</p>
                      <p className="text-white font-medium">{selectedQuestionnaire.current_rate_percentage}%</p>
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">{t('questionnaire.currentFee')}</p>
                      <p className="text-white font-medium">${selectedQuestionnaire.current_fixed_fee}</p>
                    </div>
                  </div>
                  
                  {/* Outras Taxas */}
                  {selectedQuestionnaire.other_current_fees?.length > 0 && (
                    <div className="mt-4">
                      <p className="text-white/60 text-sm mb-2">Outras Taxas do Parceiro Atual</p>
                      <div className="bg-white/5 rounded-lg p-3 space-y-2">
                        {selectedQuestionnaire.other_current_fees.map((fee, idx) => (
                          <div key={idx} className="flex justify-between text-sm">
                            <span className="text-white/70">{fee.name}</span>
                            <span className="text-white">
                              {fee.fee_type === 'percentage' ? `${fee.value}%` : `$${fee.value}`}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div className="border-t border-[#2bc196]/20 pt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-white/60 text-sm">{t('questionnaire.expectedSettlement')}</p>
                    <p className="text-white font-medium">{selectedQuestionnaire.expected_settlement_days || '-'}</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">{t('common.status')}</p>
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