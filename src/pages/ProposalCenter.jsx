import React, { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Link, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  Building2, 
  Edit, 
  Eye, 
  Copy, 
  FileDown, 
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  History,
  CopyPlus
} from 'lucide-react';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import ProposalFilters from '@/components/proposal/ProposalFilters';
import ProposalHistory from '@/components/proposal/ProposalHistory';

export default function ProposalCenter() {
  const [selectedProposal, setSelectedProposal] = useState(null);
  const [historyProposal, setHistoryProposal] = useState(null);
  const [filters, setFilters] = useState({
    search: '',
    status: 'all',
    dateFrom: '',
    dateTo: ''
  });
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { data: proposals = [], isLoading } = useQuery({
    queryKey: ['proposals'],
    queryFn: () => base44.entities.Proposal.list('-created_date')
  });

  // Filtrar propostas
  const filteredProposals = useMemo(() => {
    return proposals.filter(p => {
      const matchSearch = !filters.search || 
        p.client_name?.toLowerCase().includes(filters.search.toLowerCase()) ||
        p.contact_name?.toLowerCase().includes(filters.search.toLowerCase());
      const matchStatus = filters.status === 'all' || p.status === filters.status;
      const matchDateFrom = !filters.dateFrom || new Date(p.created_date) >= new Date(filters.dateFrom);
      const matchDateTo = !filters.dateTo || new Date(p.created_date) <= new Date(filters.dateTo + 'T23:59:59');
      return matchSearch && matchStatus && matchDateFrom && matchDateTo;
    });
  }, [proposals, filters]);

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.Proposal.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['proposals'] });
      toast.success('Proposta excluída');
    }
  });

  const duplicateMutation = useMutation({
    mutationFn: async (proposal) => {
      const token = crypto.randomUUID();
      const validUntil = new Date();
      validUntil.setDate(validUntil.getDate() + 15);
      
      const { id, created_date, updated_date, created_by, public_link_token, ...proposalData } = proposal;
      
      return base44.entities.Proposal.create({
        ...proposalData,
        status: 'draft',
        public_link_token: token,
        valid_until: validUntil.toISOString().split('T')[0],
        version: 1,
        parent_proposal_id: null,
        change_notes: `Duplicado de proposta para ${proposal.client_name}`
      });
    },
    onSuccess: (newProposal) => {
      queryClient.invalidateQueries({ queryKey: ['proposals'] });
      toast.success('Proposta duplicada com sucesso!');
      navigate(`${createPageUrl('ProposalCreation')}?editId=${newProposal.id}`);
    }
  });

  const exportToCSV = () => {
    const headers = ['Cliente', 'Contato', 'Email', 'Taxa %', 'Fee Fixo', 'Status', 'Settlement', 'Criado em', 'Válido até'];
    const rows = filteredProposals.map(p => [
      p.client_name,
      p.contact_name,
      p.contact_email,
      p.final_rate_percentage?.toFixed(2),
      p.final_fixed_fee?.toFixed(2),
      p.status,
      p.settlement_days,
      new Date(p.created_date).toLocaleDateString('pt-BR'),
      p.valid_until ? new Date(p.valid_until).toLocaleDateString('pt-BR') : ''
    ]);
    
    const csvContent = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `propostas_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    toast.success('Relatório exportado!');
  };

  const copyLink = (proposal) => {
    const link = `${window.location.origin}${createPageUrl('PublicProposal')}?token=${proposal.public_link_token}`;
    navigator.clipboard.writeText(link);
    toast.success('Link copiado para a área de transferência!');
  };

  const formatCurrency = (value) => `$${(value || 0).toFixed(2)}`;
  const formatPercentage = (value) => `${(value || 0).toFixed(2)}%`;

  const getStatusBadge = (status) => {
    const config = {
      draft: { icon: Clock, label: t('proposal.status.draft'), className: 'bg-gray-500/20 text-gray-300' },
      sent: { icon: Clock, label: t('proposal.status.sent'), className: 'bg-blue-500/20 text-blue-400' },
      accepted: { icon: CheckCircle, label: t('proposal.status.accepted'), className: 'bg-green-500/20 text-green-400' },
      counter_proposal: { icon: AlertCircle, label: t('proposal.status.counter_proposal'), className: 'bg-yellow-500/20 text-yellow-400' },
      rejected: { icon: XCircle, label: t('proposal.status.rejected'), className: 'bg-red-500/20 text-red-400' }
    };
    const { icon: Icon, label, className } = config[status] || config.draft;
    return (
      <Badge className={`${className} flex items-center gap-1`}>
        <Icon className="h-3 w-3" />
        {label}
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">{t('proposal.title')}</h1>
          <p className="text-white/60 mt-1">{t('proposal.subtitle')}</p>
        </div>
        <Link to={createPageUrl('ProposalCreation')}>
          <Button className="bg-[#2bc196] hover:bg-[#5cf7cf] text-[#002443] font-semibold">
            {t('proposal.newProposal')}
          </Button>
        </Link>
      </div>

      <ProposalFilters filters={filters} setFilters={setFilters} onExport={exportToCSV} />

      {proposals.length === 0 ? (
        <Card className="bg-white/5 border-[#2bc196]/20">
          <CardContent className="py-12 text-center">
            <p className="text-white/60">{t('proposal.noProposals')}</p>
            <Link to={createPageUrl('ProposalCreation')}>
              <Button className="mt-4 bg-[#2bc196] hover:bg-[#5cf7cf] text-[#002443] font-semibold">
                {t('proposal.createFirst')}
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProposals.map(proposal => (
            <Card key={proposal.id} className="bg-white/5 border-[#2bc196]/20 hover:bg-white/10 transition-colors">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#2bc196]/20 rounded-full flex items-center justify-center">
                      <Building2 className="h-5 w-5 text-[#2bc196]" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{proposal.client_name}</h3>
                      <p className="text-white/60 text-sm">{proposal.contact_name}</p>
                    </div>
                  </div>
                  {getStatusBadge(proposal.status)}
                </div>

                {/* Taxas */}
                <div className="bg-white/5 rounded-lg p-3 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white/60 text-sm">{t('proposal.finalRate')}:</span>
                    <span className="text-[#2bc196] font-bold">
                      {formatPercentage(proposal.final_rate_percentage)} + {formatCurrency(proposal.final_fixed_fee)}
                    </span>
                  </div>
                </div>

                {/* MCCs */}
                {proposal.mccs && proposal.mccs.length > 0 && (
                  <div className="mb-4">
                    <p className="text-white/60 text-xs mb-1">{t('proposal.mccs')}:</p>
                    <div className="flex flex-wrap gap-1">
                      {proposal.mccs.slice(0, 5).map(mcc => (
                        <Badge key={mcc} variant="outline" className="border-[#2bc196]/30 text-white/70 text-xs">
                          {mcc}
                        </Badge>
                      ))}
                      {proposal.mccs.length > 5 && (
                        <Badge className="bg-[#2bc196]/20 text-[#2bc196] text-xs">
                          +{proposal.mccs.length - 5}
                        </Badge>
                      )}
                    </div>
                  </div>
                )}

                {/* Validade */}
                <div className="flex items-center justify-between text-sm mb-4">
                  <span className="text-white/60">{t('common.validUntil')}:</span>
                  <span className="text-white">
                    {proposal.valid_until ? new Date(proposal.valid_until).toLocaleDateString('pt-BR') : '-'}
                  </span>
                </div>

                {/* Ações */}
                <div className="grid grid-cols-7 gap-1">
                  <Link to={`${createPageUrl('ProposalCreation')}?editId=${proposal.id}`}>
                    <Button variant="ghost" size="sm" className="w-full text-white/60 hover:text-white hover:bg-white/10" title="Editar">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setSelectedProposal(proposal)}
                    className="text-white/60 hover:text-white hover:bg-white/10"
                    title="Ver detalhes"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => duplicateMutation.mutate(proposal)}
                    className="text-white/60 hover:text-white hover:bg-white/10"
                    title="Duplicar proposta"
                  >
                    <CopyPlus className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setHistoryProposal(proposal)}
                    className="text-white/60 hover:text-white hover:bg-white/10"
                    title="Histórico de versões"
                  >
                    <History className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => copyLink(proposal)}
                    className="text-white/60 hover:text-white hover:bg-white/10"
                    title="Copiar link"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Link to={`${createPageUrl('PublicProposal')}?token=${proposal.public_link_token}`} target="_blank">
                    <Button variant="ghost" size="sm" className="w-full text-white/60 hover:text-white hover:bg-white/10" title="Ver proposta">
                      <FileDown className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => deleteMutation.mutate(proposal.id)}
                    className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                    title="Excluir"
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
      <Dialog open={!!selectedProposal} onOpenChange={() => setSelectedProposal(null)}>
        <DialogContent className="bg-[#002443] border-[#2bc196]/20 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-[#2bc196]">{t('proposal.proposalDetails')}</DialogTitle>
          </DialogHeader>
          {selectedProposal && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-white/60 text-sm">{t('proposal.client')}</p>
                  <p className="text-white font-medium">{selectedProposal.client_name}</p>
                </div>
                <div>
                  <p className="text-white/60 text-sm">{t('proposal.contact')}</p>
                  <p className="text-white font-medium">{selectedProposal.contact_name}</p>
                </div>
                <div>
                  <p className="text-white/60 text-sm">{t('proposal.email')}</p>
                  <p className="text-white">{selectedProposal.contact_email}</p>
                </div>
                <div>
                  <p className="text-white/60 text-sm">{t('common.status')}</p>
                  {getStatusBadge(selectedProposal.status)}
                </div>
              </div>

              <div className="border-t border-[#2bc196]/20 pt-4">
                <h4 className="text-[#2bc196] font-medium mb-3">{t('proposal.rates')}</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-white/60 text-sm">{t('proposal.finalRate')}</p>
                    <p className="text-white font-bold text-lg">{formatPercentage(selectedProposal.final_rate_percentage)}</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">{t('proposal.fixedFee')}</p>
                    <p className="text-white font-bold text-lg">{formatCurrency(selectedProposal.final_fixed_fee)}</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">{t('proposal.setupFee')}</p>
                    <p className="text-white">{formatCurrency(selectedProposal.setup_fee)}</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">{t('proposal.refundFee')}</p>
                    <p className="text-white">{formatCurrency(selectedProposal.refund_fee)}</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">{t('proposal.chargebackFee')}</p>
                    <p className="text-white">{formatCurrency(selectedProposal.chargeback_fee)}</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">{t('proposal.riskControlFee')}</p>
                    <p className="text-white">{formatCurrency(selectedProposal.risk_control_fee)}</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">{t('proposal.rollingReserve')}</p>
                    <p className="text-white">{selectedProposal.rolling_reserve_percentage}% - {selectedProposal.rolling_reserve_days} {t('publicProposal.days')}</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">{t('proposal.settlement')}</p>
                    <p className="text-white">{selectedProposal.settlement_days}</p>
                  </div>
                </div>
              </div>

              {selectedProposal.mccs && selectedProposal.mccs.length > 0 && (
                <div className="border-t border-[#2bc196]/20 pt-4">
                  <h4 className="text-[#2bc196] font-medium mb-3">{t('proposal.mccApplicable')}</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProposal.mccs.map(mcc => (
                      <Badge key={mcc} className="bg-white/10 text-white">{mcc}</Badge>
                    ))}
                  </div>
                </div>
              )}

              {selectedProposal.counter_proposal_rate && (
                <div className="border-t border-[#2bc196]/20 pt-4">
                  <h4 className="text-yellow-400 font-medium mb-3">{t('proposal.counterProposal')}</h4>
                  <div className="grid grid-cols-3 gap-4 bg-yellow-500/10 p-4 rounded-lg">
                    <div>
                      <p className="text-white/60 text-sm">{t('proposal.proposedRate')}</p>
                      <p className="text-white">{formatPercentage(selectedProposal.counter_proposal_rate)}</p>
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">{t('proposal.proposedFee')}</p>
                      <p className="text-white">{formatCurrency(selectedProposal.counter_proposal_fixed_fee)}</p>
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">{t('proposal.proposedSettlement')}</p>
                      <p className="text-white">{selectedProposal.counter_proposal_settlement_days}</p>
                    </div>
                    {selectedProposal.counter_proposal_notes && (
                      <div className="col-span-3">
                        <p className="text-white/60 text-sm">{t('proposal.observations')}</p>
                        <p className="text-white">{selectedProposal.counter_proposal_notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal de Histórico */}
      <ProposalHistory 
        proposal={historyProposal} 
        open={!!historyProposal} 
        onOpenChange={() => setHistoryProposal(null)} 
      />
    </div>
  );
}