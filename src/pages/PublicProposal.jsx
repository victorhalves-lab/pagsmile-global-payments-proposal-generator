import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CheckCircle, XCircle, RefreshCw, AlertTriangle, Clock } from 'lucide-react';
import { toast } from 'sonner';

export default function PublicProposal() {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');
  const queryClient = useQueryClient();

  const [counterModalOpen, setCounterModalOpen] = useState(false);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [counterForm, setCounterForm] = useState({
    rate: '',
    fixed_fee: '',
    settlement_days: '',
    notes: ''
  });

  const { data: proposals = [], isLoading } = useQuery({
    queryKey: ['public-proposal', token],
    queryFn: () => base44.entities.Proposal.filter({ public_link_token: token }),
    enabled: !!token
  });

  const proposal = proposals[0];

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Proposal.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['public-proposal', token] });
    }
  });

  const handleAccept = async () => {
    await updateMutation.mutateAsync({
      id: proposal.id,
      data: { status: 'accepted' }
    });
    
    if (proposal.questionnaire_id) {
      await base44.entities.Questionnaire.update(proposal.questionnaire_id, {
        pipeline_status: 'proposal_accepted'
      });
    }
    toast.success('Proposta aceita com sucesso!');
  };

  const handleReject = async () => {
    await updateMutation.mutateAsync({
      id: proposal.id,
      data: { status: 'rejected' }
    });
    
    if (proposal.questionnaire_id) {
      await base44.entities.Questionnaire.update(proposal.questionnaire_id, {
        pipeline_status: 'proposal_lost'
      });
    }
    setRejectModalOpen(false);
    toast.success('Proposta recusada');
  };

  const handleCounterProposal = async () => {
    await updateMutation.mutateAsync({
      id: proposal.id,
      data: {
        status: 'counter_proposal',
        counter_proposal_rate: parseFloat(counterForm.rate) || 0,
        counter_proposal_fixed_fee: parseFloat(counterForm.fixed_fee) || 0,
        counter_proposal_settlement_days: counterForm.settlement_days,
        counter_proposal_notes: counterForm.notes
      }
    });
    
    if (proposal.questionnaire_id) {
      await base44.entities.Questionnaire.update(proposal.questionnaire_id, {
        pipeline_status: 'counter_proposal'
      });
    }
    setCounterModalOpen(false);
    toast.success('Contraproposta enviada!');
  };

  const formatCurrency = (value) => `$${(value || 0).toFixed(2)}`;
  const formatPercentage = (value) => `${(value || 0).toFixed(2)}%`;

  const isExpired = proposal && new Date(proposal.valid_until) < new Date();
  const isAlreadyResponded = proposal && ['accepted', 'rejected', 'counter_proposal'].includes(proposal.status);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#002443] to-[#003366] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2bc196]"></div>
      </div>
    );
  }

  if (!proposal) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#002443] to-[#003366] flex items-center justify-center p-4">
        <Card className="max-w-md w-full bg-white">
          <CardContent className="pt-8 text-center">
            <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-[#002443] mb-2">Proposta não encontrada</h2>
            <p className="text-gray-600">O link da proposta é inválido ou expirou.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#002443] to-[#003366] py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <img 
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_68351d4d439cb9574d90dc86/807e8736c_Logo-modo-escuro.png"
            alt="Pagsmile"
            className="h-12 mx-auto mb-6"
          />
          <h1 className="text-3xl font-bold text-white mb-2">Pricing Proposal</h1>
          <p className="text-white/70">Proposta personalizada para {proposal.client_name}</p>
        </div>

        {/* Status Alerts */}
        {isExpired && (
          <div className="bg-red-500/20 border border-red-500/40 rounded-lg p-4 mb-6 flex items-center gap-3">
            <Clock className="h-5 w-5 text-red-400" />
            <p className="text-red-300">Esta proposta expirou em {new Date(proposal.valid_until).toLocaleDateString('pt-BR')}.</p>
          </div>
        )}

        {isAlreadyResponded && (
          <div className={`rounded-lg p-4 mb-6 flex items-center gap-3 ${
            proposal.status === 'accepted' ? 'bg-green-500/20 border border-green-500/40' :
            proposal.status === 'rejected' ? 'bg-red-500/20 border border-red-500/40' :
            'bg-yellow-500/20 border border-yellow-500/40'
          }`}>
            {proposal.status === 'accepted' && <CheckCircle className="h-5 w-5 text-green-400" />}
            {proposal.status === 'rejected' && <XCircle className="h-5 w-5 text-red-400" />}
            {proposal.status === 'counter_proposal' && <RefreshCw className="h-5 w-5 text-yellow-400" />}
            <p className={
              proposal.status === 'accepted' ? 'text-green-300' :
              proposal.status === 'rejected' ? 'text-red-300' :
              'text-yellow-300'
            }>
              {proposal.status === 'accepted' && 'Esta proposta foi aceita.'}
              {proposal.status === 'rejected' && 'Esta proposta foi recusada.'}
              {proposal.status === 'counter_proposal' && 'Uma contraproposta foi enviada e está em análise.'}
            </p>
          </div>
        )}

        {/* Proposta */}
        <Card className="bg-white mb-6">
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Proposta para</p>
                <CardTitle className="text-[#002443]">{proposal.client_name}</CardTitle>
                <p className="text-gray-600 text-sm">{proposal.contact_name} - {proposal.contact_email}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-500 text-sm">Válida até</p>
                <p className={`font-medium ${isExpired ? 'text-red-500' : 'text-[#002443]'}`}>
                  {new Date(proposal.valid_until).toLocaleDateString('pt-BR')}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            {/* MCCs */}
            {proposal.mccs && proposal.mccs.length > 0 && (
              <div className="bg-[#002443]/5 rounded-lg p-4">
                <p className="text-[#002443] font-semibold mb-2">⚠️ MCCs Aplicáveis</p>
                <p className="text-gray-600 text-sm mb-3">
                  Esta proposta é exclusivamente para os seguintes MCCs (Merchant Category Codes):
                </p>
                <div className="flex flex-wrap gap-2">
                  {proposal.mccs.map(mcc => (
                    <Badge key={mcc} className="bg-[#2bc196] text-white">{mcc}</Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Payment Processing Fee */}
            <div>
              <h3 className="text-[#002443] font-semibold text-lg mb-4">Payment Processing Fee</h3>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead className="bg-[#2bc196]">
                    <tr>
                      <th className="text-left text-white px-4 py-3">Payment Method</th>
                      <th className="text-left text-white px-4 py-3">Description</th>
                      <th className="text-right text-white px-4 py-3">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="px-4 py-3 font-medium">Credit & Debit Card</td>
                      <td className="px-4 py-3 text-gray-600">Visa, MasterCard, Amex, Discover and Diners Club</td>
                      <td className="px-4 py-3 text-right font-bold text-[#002443]">
                        {formatPercentage(proposal.final_rate_percentage)} + {formatCurrency(proposal.final_fixed_fee)}
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium">Wallet</td>
                      <td className="px-4 py-3 text-gray-600">Google Pay and Apple Pay</td>
                      <td className="px-4 py-3 text-right font-bold text-[#002443]">
                        {formatPercentage(proposal.final_rate_percentage)} + {formatCurrency(proposal.final_fixed_fee)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Other Fees */}
            <div>
              <h3 className="text-[#002443] font-semibold text-lg mb-4">Other Fees</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex justify-between p-3 bg-gray-50 rounded">
                  <span className="text-gray-600">Setup Fee</span>
                  <span className="font-medium">{formatCurrency(proposal.setup_fee)}</span>
                </div>
                <div className="flex justify-between p-3 bg-gray-50 rounded">
                  <span className="text-gray-600">Gateway Fee (per transaction)</span>
                  <span className="font-medium">{formatCurrency(proposal.final_fixed_fee)}</span>
                </div>
                <div className="flex justify-between p-3 bg-gray-50 rounded">
                  <span className="text-gray-600">Refunds (per refund)</span>
                  <span className="font-medium">{formatCurrency(proposal.refund_fee)}</span>
                </div>
                <div className="flex justify-between p-3 bg-gray-50 rounded">
                  <span className="text-gray-600">Chargeback Fee (per transaction)</span>
                  <span className="font-medium">{formatCurrency(proposal.chargeback_fee)}</span>
                </div>
                <div className="flex justify-between p-3 bg-gray-50 rounded">
                  <span className="text-gray-600">Risk Control Fee (per transaction)</span>
                  <span className="font-medium">{formatCurrency(proposal.risk_control_fee)}</span>
                </div>
                <div className="flex justify-between p-3 bg-gray-50 rounded">
                  <span className="text-gray-600">Rolling Reserve</span>
                  <span className="font-medium">{proposal.rolling_reserve_percentage}% on {proposal.rolling_reserve_days} days</span>
                </div>
              </div>
            </div>

            {/* Settlement */}
            <div>
              <h3 className="text-[#002443] font-semibold text-lg mb-4">Settlement</h3>
              <div className="bg-[#002443]/5 rounded-lg p-4">
                <p className="text-gray-700">
                  After deducting the fees from the payments processed for merchant's website, 
                  PAGSMILE will transfer the money to merchant's bank account.
                </p>
                <p className="text-[#002443] font-medium mt-2">
                  Settlement: <span className="text-[#2bc196]">{proposal.settlement_days}</span> in USD
                </p>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-yellow-800 text-sm">
                <strong>Disclaimer:</strong> Esta proposta está sujeita à aprovação do departamento de Compliance da Pagsmile. 
                As taxas e condições apresentadas podem ser alteradas após análise de documentação e perfil de risco do merchant.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Botões de Ação */}
        {!isExpired && !isAlreadyResponded && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              onClick={handleAccept}
              disabled={updateMutation.isPending}
              className="bg-green-600 hover:bg-green-700 text-white py-6"
            >
              <CheckCircle className="h-5 w-5 mr-2" />
              Aceitar Proposta
            </Button>
            <Button 
              onClick={() => setCounterModalOpen(true)}
              disabled={updateMutation.isPending}
              className="bg-yellow-600 hover:bg-yellow-700 text-white py-6"
            >
              <RefreshCw className="h-5 w-5 mr-2" />
              Fazer Contraproposta
            </Button>
            <Button 
              onClick={() => setRejectModalOpen(true)}
              disabled={updateMutation.isPending}
              variant="outline"
              className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white py-6"
            >
              <XCircle className="h-5 w-5 mr-2" />
              Recusar Proposta
            </Button>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-white/60 text-sm">
            Pagsmile Limited | www.pagsmile.com
          </p>
        </div>
      </div>

      {/* Modal Contraproposta */}
      <Dialog open={counterModalOpen} onOpenChange={setCounterModalOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle className="text-[#002443]">Fazer Contraproposta</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div>
              <Label>Taxa proposta (%)</Label>
              <Input 
                type="number"
                step="0.01"
                value={counterForm.rate}
                onChange={(e) => setCounterForm(prev => ({ ...prev, rate: e.target.value }))}
                placeholder="Ex: 3.50"
              />
            </div>
            <div>
              <Label>Fee fixo proposto (USD)</Label>
              <Input 
                type="number"
                step="0.01"
                value={counterForm.fixed_fee}
                onChange={(e) => setCounterForm(prev => ({ ...prev, fixed_fee: e.target.value }))}
                placeholder="Ex: 0.10"
              />
            </div>
            <div>
              <Label>Prazo de recebimento</Label>
              <Select 
                value={counterForm.settlement_days} 
                onValueChange={(v) => setCounterForm(prev => ({ ...prev, settlement_days: v }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="D+2/D+3">D+2 / D+3</SelectItem>
                  <SelectItem value="D+7">D+7</SelectItem>
                  <SelectItem value="D+15">D+15</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Observações</Label>
              <Textarea 
                value={counterForm.notes}
                onChange={(e) => setCounterForm(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Adicione comentários sobre sua contraproposta..."
                rows={3}
              />
            </div>
            <Button 
              onClick={handleCounterProposal}
              disabled={updateMutation.isPending}
              className="w-full bg-[#2bc196] hover:bg-[#5cf7cf] text-[#002443]"
            >
              Enviar Contraproposta
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal Rejeição */}
      <Dialog open={rejectModalOpen} onOpenChange={setRejectModalOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle className="text-[#002443]">Confirmar Recusa</DialogTitle>
          </DialogHeader>
          <div className="pt-4">
            <p className="text-gray-600 mb-6">
              Tem certeza que deseja recusar esta proposta? Esta ação não pode ser desfeita.
            </p>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={() => setRejectModalOpen(false)}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button 
                onClick={handleReject}
                disabled={updateMutation.isPending}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
              >
                Confirmar Recusa
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}