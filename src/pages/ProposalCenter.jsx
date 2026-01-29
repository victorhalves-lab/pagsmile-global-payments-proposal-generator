import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';
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
  AlertCircle
} from 'lucide-react';
import { toast } from 'sonner';

export default function ProposalCenter() {
  const [selectedProposal, setSelectedProposal] = useState(null);
  const queryClient = useQueryClient();

  const { data: proposals = [], isLoading } = useQuery({
    queryKey: ['proposals'],
    queryFn: () => base44.entities.Proposal.list('-created_date')
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.Proposal.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['proposals'] });
      toast.success('Proposta excluída');
    }
  });

  const copyLink = (proposal) => {
    const link = `${window.location.origin}${createPageUrl('PublicProposal')}?token=${proposal.public_link_token}`;
    navigator.clipboard.writeText(link);
    toast.success('Link copiado para a área de transferência!');
  };

  const formatCurrency = (value) => `$${(value || 0).toFixed(2)}`;
  const formatPercentage = (value) => `${(value || 0).toFixed(2)}%`;

  const getStatusBadge = (status) => {
    const config = {
      draft: { icon: Clock, label: 'Rascunho', className: 'bg-gray-500/20 text-gray-300' },
      sent: { icon: Clock, label: 'Enviada', className: 'bg-blue-500/20 text-blue-400' },
      accepted: { icon: CheckCircle, label: 'Aceita', className: 'bg-green-500/20 text-green-400' },
      counter_proposal: { icon: AlertCircle, label: 'Contraproposta', className: 'bg-yellow-500/20 text-yellow-400' },
      rejected: { icon: XCircle, label: 'Recusada', className: 'bg-red-500/20 text-red-400' }
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
          <h1 className="text-3xl font-bold text-white">Central de Propostas</h1>
          <p className="text-white/60 mt-1">Gerencie todas as propostas criadas</p>
        </div>
        <Link to={createPageUrl('ProposalCreation')}>
          <Button className="bg-[#2bc196] hover:bg-[#5cf7cf] text-[#002443]">
            Nova Proposta
          </Button>
        </Link>
      </div>

      {proposals.length === 0 ? (
        <Card className="bg-white/5 border-[#2bc196]/20">
          <CardContent className="py-12 text-center">
            <p className="text-white/60">Nenhuma proposta criada ainda.</p>
            <Link to={createPageUrl('ProposalCreation')}>
              <Button className="mt-4 bg-[#2bc196] hover:bg-[#5cf7cf] text-[#002443]">
                Criar Primeira Proposta
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {proposals.map(proposal => (
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
                    <span className="text-white/60 text-sm">Taxa Final:</span>
                    <span className="text-[#2bc196] font-bold">
                      {formatPercentage(proposal.final_rate_percentage)} + {formatCurrency(proposal.final_fixed_fee)}
                    </span>
                  </div>
                </div>

                {/* MCCs */}
                {proposal.mccs && proposal.mccs.length > 0 && (
                  <div className="mb-4">
                    <p className="text-white/60 text-xs mb-1">MCCs:</p>
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
                  <span className="text-white/60">Válida até:</span>
                  <span className="text-white">
                    {proposal.valid_until ? new Date(proposal.valid_until).toLocaleDateString('pt-BR') : '-'}
                  </span>
                </div>

                {/* Ações */}
                <div className="grid grid-cols-5 gap-2">
                  <Link to={`${createPageUrl('ProposalCreation')}?editId=${proposal.id}`}>
                    <Button variant="ghost" size="sm" className="w-full text-white/60 hover:text-white hover:bg-white/10">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setSelectedProposal(proposal)}
                    className="text-white/60 hover:text-white hover:bg-white/10"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => copyLink(proposal)}
                    className="text-white/60 hover:text-white hover:bg-white/10"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Link to={`${createPageUrl('PublicProposal')}?token=${proposal.public_link_token}`} target="_blank">
                    <Button variant="ghost" size="sm" className="w-full text-white/60 hover:text-white hover:bg-white/10">
                      <FileDown className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => deleteMutation.mutate(proposal.id)}
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
      <Dialog open={!!selectedProposal} onOpenChange={() => setSelectedProposal(null)}>
        <DialogContent className="bg-[#002443] border-[#2bc196]/20 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-[#2bc196]">Detalhes da Proposta</DialogTitle>
          </DialogHeader>
          {selectedProposal && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-white/60 text-sm">Cliente</p>
                  <p className="text-white font-medium">{selectedProposal.client_name}</p>
                </div>
                <div>
                  <p className="text-white/60 text-sm">Contato</p>
                  <p className="text-white font-medium">{selectedProposal.contact_name}</p>
                </div>
                <div>
                  <p className="text-white/60 text-sm">E-mail</p>
                  <p className="text-white">{selectedProposal.contact_email}</p>
                </div>
                <div>
                  <p className="text-white/60 text-sm">Status</p>
                  {getStatusBadge(selectedProposal.status)}
                </div>
              </div>

              <div className="border-t border-[#2bc196]/20 pt-4">
                <h4 className="text-[#2bc196] font-medium mb-3">Taxas</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-white/60 text-sm">Taxa Final</p>
                    <p className="text-white font-bold text-lg">{formatPercentage(selectedProposal.final_rate_percentage)}</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Fee Fixo</p>
                    <p className="text-white font-bold text-lg">{formatCurrency(selectedProposal.final_fixed_fee)}</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Setup Fee</p>
                    <p className="text-white">{formatCurrency(selectedProposal.setup_fee)}</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Refund Fee</p>
                    <p className="text-white">{formatCurrency(selectedProposal.refund_fee)}</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Chargeback Fee</p>
                    <p className="text-white">{formatCurrency(selectedProposal.chargeback_fee)}</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Risk Control Fee</p>
                    <p className="text-white">{formatCurrency(selectedProposal.risk_control_fee)}</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Rolling Reserve</p>
                    <p className="text-white">{selectedProposal.rolling_reserve_percentage}% em {selectedProposal.rolling_reserve_days} dias</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Prazo de Recebimento</p>
                    <p className="text-white">{selectedProposal.settlement_days}</p>
                  </div>
                </div>
              </div>

              {selectedProposal.mccs && selectedProposal.mccs.length > 0 && (
                <div className="border-t border-[#2bc196]/20 pt-4">
                  <h4 className="text-[#2bc196] font-medium mb-3">MCCs Aplicáveis</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProposal.mccs.map(mcc => (
                      <Badge key={mcc} className="bg-white/10 text-white">{mcc}</Badge>
                    ))}
                  </div>
                </div>
              )}

              {selectedProposal.counter_proposal_rate && (
                <div className="border-t border-[#2bc196]/20 pt-4">
                  <h4 className="text-yellow-400 font-medium mb-3">Contraproposta do Cliente</h4>
                  <div className="grid grid-cols-3 gap-4 bg-yellow-500/10 p-4 rounded-lg">
                    <div>
                      <p className="text-white/60 text-sm">Taxa Proposta</p>
                      <p className="text-white">{formatPercentage(selectedProposal.counter_proposal_rate)}</p>
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">Fee Proposto</p>
                      <p className="text-white">{formatCurrency(selectedProposal.counter_proposal_fixed_fee)}</p>
                    </div>
                    <div>
                      <p className="text-white/60 text-sm">Prazo Proposto</p>
                      <p className="text-white">{selectedProposal.counter_proposal_settlement_days}</p>
                    </div>
                    {selectedProposal.counter_proposal_notes && (
                      <div className="col-span-3">
                        <p className="text-white/60 text-sm">Observações</p>
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
    </div>
  );
}