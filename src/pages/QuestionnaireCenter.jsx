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
      leads: 'bg-gray-500/20 text-gray-300',
      proposal_made: 'bg-blue-500/20 text-blue-400',
      proposal_accepted: 'bg-green-500/20 text-green-400',
      counter_proposal: 'bg-yellow-500/20 text-yellow-400',
      proposal_lost: 'bg-red-500/20 text-red-400'
    };
    return (
      <Badge className={styles[status] || styles.leads}>
        {t(`questionnaire.status.${status}`) || t('questionnaire.status.leads')}
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
        <h1 className="text-3xl font-bold text-white">{t('questionnaire.title')}</h1>
        <p className="text-white/60 mt-1">{t('questionnaire.subtitle')}</p>
      </div>

      <QuestionnaireFilters filters={filters} setFilters={setFilters} onExport={exportToCSV} />

      {questionnaires.length === 0 ? (
        <Card className="bg-white/5 border-[#2bc196]/20">
          <CardContent className="py-12 text-center">
            <p className="text-white/60">{t('questionnaire.noQuestionnaires')}</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredQuestionnaires.map(q => (
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
                    <span className="text-white/60">{t('questionnaire.monthlyTPV')}:</span>
                    <span className="text-white font-medium flex items-center gap-1">
                      <DollarSign className="h-3 w-3 text-[#2bc196]" />
                      {formatCurrency(q.monthly_tpv)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/60">{t('questionnaire.avgTicket')}:</span>
                    <span className="text-white">{formatCurrency(q.average_ticket)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/60">{t('questionnaire.monthlyTransactions')}:</span>
                    <span className="text-white">{(q.monthly_transactions || 0).toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button 
                    size="sm"
                    onClick={() => setSelectedQuestionnaire(q)}
                    className="flex-1 bg-[#1a5a4c] hover:bg-[#2bc196] text-white"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    {t('common.details')}
                  </Button>
                  {q.proposal_id ? (
                    <Link to={`${createPageUrl('ProposalCenter')}?id=${q.proposal_id}`} className="flex-1">
                      <Button 
                        size="sm"
                        className="w-full bg-[#2bc196] hover:bg-[#5cf7cf] text-[#002443]"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        {t('proposal.viewProposal')}
                      </Button>
                    </Link>
                  ) : (
                    <Link to={`${createPageUrl('ProposalCreation')}?questionnaireId=${q.id}`} className="flex-1">
                      <Button 
                        size="sm"
                        className="w-full bg-[#2bc196] hover:bg-[#5cf7cf] text-[#002443]"
                      >
                        <FileText className="h-4 w-4 mr-1" />
                        {t('questionnaire.generateProposal')}
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