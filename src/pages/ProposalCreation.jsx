import React, { useState, useEffect, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Calculator, FileText, Link as LinkIcon, Download, Table2 } from 'lucide-react';
import { toast } from 'sonner';
import { 
  INTERCHANGE_SUMMARY, 
  MCC_LIST,
  VISA_INTERCHANGE_RATES,
  MASTERCARD_INTERCHANGE_RATES
} from '@/components/interchange/InterchangeData';
import InterchangeSelector from '@/components/interchange/InterchangeSelector';

export default function ProposalCreation() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const urlParams = new URLSearchParams(window.location.search);
  const questionnaireId = urlParams.get('questionnaireId');

  const [form, setForm] = useState({
    client_name: '',
    contact_name: '',
    contact_email: '',
    mccs: [],
    markup_percentage: 0,
    fixed_fee_per_transaction: 0,
    setup_fee: 0,
    refund_fee: 1,
    chargeback_fee: 15,
    risk_control_fee: 0.1,
    rolling_reserve_percentage: 8,
    rolling_reserve_days: 180,
    settlement_days: 'D+7',
    selected_interchange_type: 'combined_avg'
  });

  const [customInterchange, setCustomInterchange] = useState({
    percentage: 0,
    fixed: 0
  });



  // Carregar dados do questionário se vier de um
  const { data: questionnaire } = useQuery({
    queryKey: ['questionnaire', questionnaireId],
    queryFn: () => base44.entities.Questionnaire.get(questionnaireId),
    enabled: !!questionnaireId
  });

  useEffect(() => {
    if (questionnaire) {
      setForm(prev => ({
        ...prev,
        client_name: questionnaire.company_name || '',
        contact_name: questionnaire.contact_name || '',
        contact_email: questionnaire.contact_email || '',
        // Pré-preencher MCC do questionário se existir
        mccs: questionnaire.mcc ? [questionnaire.mcc] : prev.mccs,
        // Pré-preencher com taxas do parceiro atual se existirem
        settlement_days: questionnaire.expected_settlement_days || prev.settlement_days
      }));
      
      // Se o cliente tem parceiro atual, preencher markup com base na taxa atual dele
      if (questionnaire.has_current_partner && questionnaire.current_rate_percentage) {
        // Calcular markup sugerido (taxa atual - custo base - interchange médio)
        const baseCost = 0.5;
        const avgInterchange = INTERCHANGE_SUMMARY.combined.avg.percentage;
        const suggestedMarkup = Math.max(0, questionnaire.current_rate_percentage - baseCost - avgInterchange);
        
        setForm(prev => ({
          ...prev,
          markup_percentage: suggestedMarkup.toFixed(2)
        }));
      }
      
      // Pré-preencher fixed fee se existir
      if (questionnaire.has_current_partner && questionnaire.current_fixed_fee) {
        // Converter para centavos (nosso campo é em centavos)
        setForm(prev => ({
          ...prev,
          fixed_fee_per_transaction: (questionnaire.current_fixed_fee * 100).toFixed(0)
        }));
      }
    }
  }, [questionnaire]);

  // Calcular interchange baseado na seleção
  const selectedInterchange = useMemo(() => {
    if (form.selected_interchange_type === 'custom') {
      return customInterchange;
    }

    const [brand, level] = form.selected_interchange_type.split('_');
    
    if (brand === 'visa') {
      return INTERCHANGE_SUMMARY.visa[level];
    } else if (brand === 'master') {
      return INTERCHANGE_SUMMARY.master[level];
    } else {
      return INTERCHANGE_SUMMARY.combined[level];
    }
  }, [form.selected_interchange_type, customInterchange]);

  // Calcular taxa final
  const finalRate = useMemo(() => {
    const baseCost = 0.5;
    const interchange = selectedInterchange.percentage;
    // Converter vírgula para ponto antes de parsear
    const rawMarkup = String(form.markup_percentage || '0').replace(',', '.');
    const markup = parseFloat(rawMarkup) || 0;
    return baseCost + interchange + markup;
  }, [selectedInterchange, form.markup_percentage]);

  const finalFixedFee = useMemo(() => {
    const interchangeFixed = selectedInterchange.fixed;
    // Converter vírgula para ponto e depois para número (centavos para dólares)
    const rawValue = String(form.fixed_fee_per_transaction || '0').replace(',', '.');
    const gatewayFee = (parseFloat(rawValue) || 0) / 100;
    return interchangeFixed + gatewayFee;
  }, [selectedInterchange, form.fixed_fee_per_transaction]);

  const updateForm = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const toggleMCC = (mcc) => {
    setForm(prev => ({
      ...prev,
      mccs: prev.mccs.includes(mcc) 
        ? prev.mccs.filter(m => m !== mcc)
        : [...prev.mccs, mcc]
    }));
  };



  const createMutation = useMutation({
    mutationFn: async (data) => {
      const token = crypto.randomUUID();
      const validUntil = new Date();
      validUntil.setDate(validUntil.getDate() + 15);

      const proposal = await base44.entities.Proposal.create({
        ...data,
        questionnaire_id: questionnaireId || null,
        base_cost_percentage: 0.5,
        interchange_percentage: selectedInterchange.percentage,
        interchange_fixed: selectedInterchange.fixed,
        final_rate_percentage: finalRate,
        final_fixed_fee: finalFixedFee,
        valid_until: validUntil.toISOString().split('T')[0],
        status: 'sent',
        public_link_token: token
      });

      // Atualizar questionário se existir
      if (questionnaireId) {
        await base44.entities.Questionnaire.update(questionnaireId, {
          proposal_id: proposal.id,
          pipeline_status: 'proposal_made'
        });
      }

      return proposal;
    },
    onSuccess: (proposal) => {
      queryClient.invalidateQueries({ queryKey: ['proposals'] });
      queryClient.invalidateQueries({ queryKey: ['questionnaires'] });
      toast.success('Proposta criada com sucesso!');
      navigate(`${createPageUrl('ProposalCenter')}`);
    }
  });

  const handleSubmit = () => {
    if (!form.client_name || !form.contact_name || !form.contact_email) {
      toast.error('Preencha os dados do cliente');
      return;
    }
    if (form.mccs.length === 0) {
      toast.error('Selecione pelo menos um MCC');
      return;
    }
    createMutation.mutate(form);
  };

  const formatPercentage = (value) => `${value.toFixed(2)}%`;
  const formatFixed = (value) => `$${value.toFixed(2)}`;

  const handleSelectCustomRate = (rate, label) => {
    setCustomInterchange(rate);
    setForm(prev => ({ ...prev, selected_interchange_type: 'custom' }));
    toast.success(`Taxa selecionada: ${label}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">
          {questionnaireId ? 'Criar Proposta a partir do Questionário' : 'Criar Nova Proposta'}
        </h1>
        <p className="text-white/60 mt-1">Configure as taxas e gere uma proposta para o cliente</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Formulário Principal */}
        <div className="lg:col-span-2 space-y-6">
          {/* Dados do Cliente */}
          <Card className="bg-white/5 border-[#2bc196]/20">
            <CardHeader>
              <CardTitle className="text-white">Dados do Cliente</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-white/80">Nome da Empresa *</Label>
                  <Input 
                    value={form.client_name}
                    onChange={(e) => updateForm('client_name', e.target.value)}
                    className="bg-white/10 border-[#2bc196]/30 text-white"
                  />
                </div>
                <div>
                  <Label className="text-white/80">Nome do Contato *</Label>
                  <Input 
                    value={form.contact_name}
                    onChange={(e) => updateForm('contact_name', e.target.value)}
                    className="bg-white/10 border-[#2bc196]/30 text-white"
                  />
                </div>
              </div>
              <div>
                <Label className="text-white/80">E-mail do Contato *</Label>
                <Input 
                  type="email"
                  value={form.contact_email}
                  onChange={(e) => updateForm('contact_email', e.target.value)}
                  className="bg-white/10 border-[#2bc196]/30 text-white"
                />
              </div>
            </CardContent>
          </Card>

          {/* Seleção de MCCs */}
          <Card className="bg-white/5 border-[#2bc196]/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <span>MCCs Aplicáveis *</span>
                <Badge className="bg-[#2bc196]/20 text-[#2bc196]">
                  {form.mccs.length} selecionado(s)
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white/60 text-sm mb-4">
                Selecione os MCCs (Merchant Category Codes) para os quais esta proposta será válida.
              </p>
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2 max-h-48 overflow-y-auto p-2 bg-white/5 rounded-lg">
                {MCC_LIST.map(mcc => (
                  <div 
                    key={mcc}
                    onClick={() => toggleMCC(mcc)}
                    className={`
                      cursor-pointer px-3 py-2 rounded text-center text-sm font-mono transition-all
                      ${form.mccs.includes(mcc) 
                        ? 'bg-[#2bc196] text-[#002443]' 
                        : 'bg-white/10 text-white/70 hover:bg-white/20'
                      }
                    `}
                  >
                    {mcc}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Seleção de Interchange */}
          <Card className="bg-white/5 border-[#2bc196]/20">
            <CardHeader>
              <CardTitle className="text-white">Taxa de Interchange</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Médias Rápidas - exibidas diretamente */}
              <div className="space-y-4">
                {/* Médias Combinadas Gerais */}
                <div>
                  <p className="text-white/60 text-sm mb-2">Médias Combinadas Gerais</p>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        updateForm('selected_interchange_type', 'combined_avg');
                      }}
                      className={`p-3 rounded-lg text-center transition-all border ${
                        form.selected_interchange_type === 'combined_avg'
                          ? 'bg-[#2bc196] text-[#002443] border-[#2bc196]'
                          : 'bg-[#2bc196]/20 text-[#2bc196] border-[#2bc196]/30 hover:opacity-80'
                      }`}
                    >
                      <p className="text-sm font-medium">Geral Médio</p>
                      <p className="text-lg font-bold mt-1">{formatPercentage(INTERCHANGE_SUMMARY.combined.avg.percentage)}</p>
                      <p className="text-xs opacity-70">+ {formatFixed(INTERCHANGE_SUMMARY.combined.avg.fixed)}</p>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        updateForm('selected_interchange_type', 'combined_high');
                      }}
                      className={`p-3 rounded-lg text-center transition-all border ${
                        form.selected_interchange_type === 'combined_high'
                          ? 'bg-[#2bc196] text-[#002443] border-[#2bc196]'
                          : 'bg-[#2bc196]/20 text-[#2bc196] border-[#2bc196]/30 hover:opacity-80'
                      }`}
                    >
                      <p className="text-sm font-medium">Geral Maior</p>
                      <p className="text-lg font-bold mt-1">{formatPercentage(INTERCHANGE_SUMMARY.combined.high.percentage)}</p>
                      <p className="text-xs opacity-70">+ {formatFixed(INTERCHANGE_SUMMARY.combined.high.fixed)}</p>
                    </button>
                  </div>
                </div>

                {/* Por Tipo de Cartão */}
                <div>
                  <p className="text-white/60 text-sm mb-2">Por Tipo de Cartão</p>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'credit', name: 'Crédito', filter: (r) => r.card_type.includes('Consumer Credit') },
                      { id: 'debit', name: 'Débito', filter: (r) => r.card_type.includes('Consumer Debit') },
                      { id: 'prepaid', name: 'Pré-pago', filter: (r) => r.card_type.includes('Consumer Prepaid') },
                    ].map(cardType => {
                      const visaRates = VISA_INTERCHANGE_RATES.filter(cardType.filter);
                      const masterRates = MASTERCARD_INTERCHANGE_RATES.filter(cardType.filter);
                      const allRates = [...visaRates, ...masterRates];
                      const avgPct = allRates.reduce((a, b) => a + b.rate_percentage, 0) / allRates.length;
                      const avgFixed = allRates.reduce((a, b) => a + b.rate_fixed, 0) / allRates.length;
                      const isSelected = form.selected_interchange_type === 'custom' && 
                        Math.abs(customInterchange.percentage - avgPct) < 0.001;
                      
                      return (
                        <button
                          key={cardType.id}
                          type="button"
                          onClick={() => handleSelectCustomRate({ percentage: avgPct, fixed: avgFixed }, cardType.name)}
                          className={`p-2 rounded-lg text-center transition-all border ${
                            isSelected
                              ? 'bg-[#2bc196] text-[#002443] border-[#2bc196]'
                              : 'bg-[#2bc196]/20 text-[#2bc196] border-[#2bc196]/30 hover:opacity-80'
                          }`}
                        >
                          <p className="text-xs font-medium">{cardType.name}</p>
                          <p className="text-sm font-bold">{formatPercentage(avgPct)}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Por Segmento */}
                <div>
                  <p className="text-white/60 text-sm mb-2">Por Segmento</p>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { id: 'ecommerce', name: 'E-commerce', category: 'ecommerce' },
                      { id: 'travel', name: 'Viagens', category: 'travel' },
                      { id: 'restaurant', name: 'Restaurantes', category: 'restaurant' },
                      { id: 'supermarket', name: 'Supermercados', category: 'supermarket' },
                      { id: 'utility', name: 'Utilidades', category: 'utility' },
                      { id: 'recurring', name: 'Recorrente', category: 'recurring' },
                      { id: 'charity', name: 'Caridade', category: 'charity' },
                      { id: 'government', name: 'Governo', category: 'government' },
                    ].map(segment => {
                      const visaRates = VISA_INTERCHANGE_RATES.filter(r => r.category === segment.category);
                      const masterRates = MASTERCARD_INTERCHANGE_RATES.filter(r => r.category === segment.category);
                      const allRates = [...visaRates, ...masterRates];
                      if (allRates.length === 0) return null;
                      const avgPct = allRates.reduce((a, b) => a + b.rate_percentage, 0) / allRates.length;
                      const avgFixed = allRates.reduce((a, b) => a + b.rate_fixed, 0) / allRates.length;
                      const isSelected = form.selected_interchange_type === 'custom' && 
                        Math.abs(customInterchange.percentage - avgPct) < 0.001;
                      
                      return (
                        <button
                          key={segment.id}
                          type="button"
                          onClick={() => handleSelectCustomRate({ percentage: avgPct, fixed: avgFixed }, segment.name)}
                          className={`p-2 rounded-lg text-center transition-all border ${
                            isSelected
                              ? 'bg-[#2bc196] text-[#002443] border-[#2bc196]'
                              : 'bg-orange-500/20 text-orange-400 border-orange-500/30 hover:opacity-80'
                          }`}
                        >
                          <p className="text-xs font-medium leading-tight">{segment.name}</p>
                          <p className="text-sm font-bold">{formatPercentage(avgPct)}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Botão para ver todas as taxas individuais */}
              <InterchangeSelector
                selectedType={form.selected_interchange_type}
                customInterchange={customInterchange}
                onSelectType={(type) => updateForm('selected_interchange_type', type)}
                onSelectCustomRate={handleSelectCustomRate}
                showQuickOptions={false}
              />
            </CardContent>
          </Card>

          {/* Markup e Taxas */}
          <Card className="bg-white/5 border-[#2bc196]/20">
            <CardHeader>
              <CardTitle className="text-white">Markup e Taxas Pagsmile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-white/80">Markup (%)</Label>
                  <Input 
                    type="number"
                    step="0.01"
                    value={form.markup_percentage}
                    onChange={(e) => updateForm('markup_percentage', e.target.value)}
                    className="bg-white/10 border-[#2bc196]/30 text-white"
                  />
                </div>
                <div>
                  <Label className="text-white/80">Fixed Fee / Gateway Fee (centavos USD)</Label>
                  <Input 
                    type="number"
                    value={form.fixed_fee_per_transaction}
                    onChange={(e) => updateForm('fixed_fee_per_transaction', e.target.value)}
                    className="bg-white/10 border-[#2bc196]/30 text-white"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Outras Taxas */}
          <Card className="bg-white/5 border-[#2bc196]/20">
            <CardHeader>
              <CardTitle className="text-white">Outras Taxas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-white/80">Setup Fee (USD)</Label>
                  <Input 
                    type="number"
                    value={form.setup_fee}
                    onChange={(e) => updateForm('setup_fee', e.target.value)}
                    className="bg-white/10 border-[#2bc196]/30 text-white"
                  />
                </div>
                <div>
                  <Label className="text-white/80">Refund Fee (USD)</Label>
                  <Input 
                    type="number"
                    value={form.refund_fee}
                    onChange={(e) => updateForm('refund_fee', e.target.value)}
                    className="bg-white/10 border-[#2bc196]/30 text-white"
                  />
                </div>
                <div>
                  <Label className="text-white/80">Chargeback Fee (USD)</Label>
                  <Input 
                    type="number"
                    value={form.chargeback_fee}
                    onChange={(e) => updateForm('chargeback_fee', e.target.value)}
                    className="bg-white/10 border-[#2bc196]/30 text-white"
                  />
                </div>
                <div>
                  <Label className="text-white/80">Risk Control Fee (USD)</Label>
                  <Input 
                    type="number"
                    step="0.01"
                    value={form.risk_control_fee}
                    onChange={(e) => updateForm('risk_control_fee', e.target.value)}
                    className="bg-white/10 border-[#2bc196]/30 text-white"
                  />
                </div>
                <div>
                  <Label className="text-white/80">Rolling Reserve (%)</Label>
                  <Input 
                    type="number"
                    value={form.rolling_reserve_percentage}
                    onChange={(e) => updateForm('rolling_reserve_percentage', e.target.value)}
                    className="bg-white/10 border-[#2bc196]/30 text-white"
                  />
                </div>
                <div>
                  <Label className="text-white/80">Rolling Reserve (dias)</Label>
                  <Input 
                    type="number"
                    value={form.rolling_reserve_days}
                    onChange={(e) => updateForm('rolling_reserve_days', e.target.value)}
                    className="bg-white/10 border-[#2bc196]/30 text-white"
                  />
                </div>
              </div>
              <div>
                <Label className="text-white/80">Prazo de Recebimento</Label>
                <Select value={form.settlement_days} onValueChange={(v) => updateForm('settlement_days', v)}>
                  <SelectTrigger className="bg-white/10 border-[#2bc196]/30 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="D+2/D+3">D+2 / D+3</SelectItem>
                    <SelectItem value="D+7">D+7</SelectItem>
                    <SelectItem value="D+15">D+15</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preview da Taxa Final */}
        <div className="lg:col-span-1">
          <Card className="bg-gradient-to-br from-[#2bc196]/20 to-[#002443] border-[#2bc196]/40 sticky top-6">
            <CardHeader>
              <CardTitle className="text-[#2bc196] flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Taxa Final
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Breakdown */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Custo Base Pagsmile</span>
                  <span className="text-white">0.50%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Interchange</span>
                  <span className="text-white">{formatPercentage(selectedInterchange.percentage)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Markup</span>
                  <span className="text-white">{formatPercentage(parseFloat(form.markup_percentage) || 0)}</span>
                </div>
                <div className="border-t border-[#2bc196]/30 pt-3 flex justify-between">
                  <span className="text-white font-medium">Taxa Total</span>
                  <span className="text-[#2bc196] font-bold text-xl">{formatPercentage(finalRate)}</span>
                </div>
              </div>

              {/* Fixed Fee */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Interchange Fixo</span>
                  <span className="text-white">{formatFixed(selectedInterchange.fixed)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Gateway Fee</span>
                  <span className="text-white">{formatFixed((parseFloat(form.fixed_fee_per_transaction) || 0) / 100)}</span>
                </div>
                <div className="border-t border-[#2bc196]/30 pt-3 flex justify-between">
                  <span className="text-white font-medium">Fee Fixo Total</span>
                  <span className="text-[#2bc196] font-bold text-xl">{formatFixed(finalFixedFee)}</span>
                </div>
              </div>

              {/* MCCs Selecionados */}
              {form.mccs.length > 0 && (
                <div className="pt-4 border-t border-[#2bc196]/30">
                  <p className="text-white/60 text-sm mb-2">MCCs Selecionados:</p>
                  <div className="flex flex-wrap gap-1">
                    {form.mccs.slice(0, 8).map(mcc => (
                      <Badge key={mcc} className="bg-white/10 text-white text-xs">{mcc}</Badge>
                    ))}
                    {form.mccs.length > 8 && (
                      <Badge className="bg-[#2bc196]/20 text-[#2bc196] text-xs">+{form.mccs.length - 8}</Badge>
                    )}
                  </div>
                </div>
              )}

              {/* Botão de Gerar */}
              <Button 
                onClick={handleSubmit}
                disabled={createMutation.isPending}
                className="w-full bg-[#2bc196] hover:bg-[#5cf7cf] text-[#002443] font-semibold py-6"
              >
                {createMutation.isPending ? 'Criando...' : 'Gerar Proposta'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}