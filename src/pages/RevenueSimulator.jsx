import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { 
  Calculator, 
  DollarSign, 
  TrendingUp, 
  Percent, 
  CreditCard,
  PiggyBank
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from 'recharts';
import { useTranslation } from 'react-i18next';

export default function RevenueSimulator() {
  const { t } = useTranslation();
  const [params, setParams] = useState({
    monthlyTPV: 100000,
    averageTicket: 50,
    ratePercentage: 4.5,
    fixedFee: 0.15,
    interchangePercentage: 2.0,
    baseCost: 0.5,
    chargebackRate: 0.5,
    chargebackFee: 15,
    refundRate: 2,
    refundFee: 1
  });

  const updateParam = (key, value) => {
    setParams(prev => ({ ...prev, [key]: parseFloat(value) || 0 }));
  };

  const calculations = useMemo(() => {
    const {
      monthlyTPV,
      averageTicket,
      ratePercentage,
      fixedFee,
      interchangePercentage,
      baseCost,
      chargebackRate,
      chargebackFee,
      refundRate,
      refundFee
    } = params;

    const monthlyTransactions = averageTicket > 0 ? Math.round(monthlyTPV / averageTicket) : 0;
    
    // Receita bruta
    const grossRevenue = (monthlyTPV * ratePercentage / 100) + (monthlyTransactions * fixedFee);
    
    // Custos
    const interchangeCost = monthlyTPV * interchangePercentage / 100;
    const baseCostAmount = monthlyTPV * baseCost / 100;
    
    // Chargebacks e refunds
    const chargebackCount = Math.round(monthlyTransactions * chargebackRate / 100);
    const chargebackCost = chargebackCount * chargebackFee;
    const refundCount = Math.round(monthlyTransactions * refundRate / 100);
    const refundCost = refundCount * refundFee;
    
    const totalCosts = interchangeCost + baseCostAmount + chargebackCost + refundCost;
    
    // Receita líquida
    const netRevenue = grossRevenue - totalCosts;
    const marginPercentage = grossRevenue > 0 ? (netRevenue / grossRevenue) * 100 : 0;

    return {
      monthlyTransactions,
      grossRevenue,
      interchangeCost,
      baseCostAmount,
      chargebackCount,
      chargebackCost,
      refundCount,
      refundCost,
      totalCosts,
      netRevenue,
      marginPercentage,
      annualNetRevenue: netRevenue * 12
    };
  }, [params]);

  // Dados para o gráfico de projeção anual
  const projectionData = useMemo(() => {
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    let accumulated = 0;
    return months.map((month, index) => {
      // Simular crescimento de 5% ao mês
      const growthFactor = Math.pow(1.05, index);
      const monthRevenue = calculations.netRevenue * growthFactor;
      accumulated += monthRevenue;
      return {
        name: month,
        receita: Math.round(monthRevenue),
        acumulado: Math.round(accumulated)
      };
    });
  }, [calculations.netRevenue]);

  // Dados para breakdown de custos
  const costBreakdown = useMemo(() => [
    { name: 'Interchange', valor: calculations.interchangeCost, fill: '#ef4444' },
    { name: 'Custo Base', valor: calculations.baseCostAmount, fill: '#f59e0b' },
    { name: 'Chargebacks', valor: calculations.chargebackCost, fill: '#8b5cf6' },
    { name: 'Refunds', valor: calculations.refundCost, fill: '#3b82f6' }
  ], [calculations]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <Calculator className="h-8 w-8 text-[#2bc196]" />
          {t('simulator.title')}
        </h1>
        <p className="text-white/60 mt-1">{t('simulator.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Parâmetros de Entrada */}
        <div className="space-y-4">
          <Card className="bg-white/5 border-[#2bc196]/20">
            <CardHeader>
              <CardTitle className="text-white text-lg flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-[#2bc196]" />
                Volume
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-white/80">TPV Mensal (USD)</Label>
                <Input
                  type="number"
                  value={params.monthlyTPV}
                  onChange={(e) => updateParam('monthlyTPV', e.target.value)}
                  className="bg-white/10 border-[#2bc196]/30 text-white"
                />
                <Slider
                  value={[params.monthlyTPV]}
                  onValueChange={([v]) => updateParam('monthlyTPV', v)}
                  max={5000000}
                  step={10000}
                  className="mt-2"
                />
              </div>
              <div>
                <Label className="text-white/80">Ticket Médio (USD)</Label>
                <Input
                  type="number"
                  value={params.averageTicket}
                  onChange={(e) => updateParam('averageTicket', e.target.value)}
                  className="bg-white/10 border-[#2bc196]/30 text-white"
                />
              </div>
              <div className="bg-white/5 rounded p-3">
                <p className="text-white/60 text-sm">Transações Estimadas</p>
                <p className="text-white text-xl font-bold">{calculations.monthlyTransactions.toLocaleString()}/mês</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-[#2bc196]/20">
            <CardHeader>
              <CardTitle className="text-white text-lg flex items-center gap-2">
                <Percent className="h-5 w-5 text-[#2bc196]" />
                Taxas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-white/80">Taxa Cobrada (%)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={params.ratePercentage}
                  onChange={(e) => updateParam('ratePercentage', e.target.value)}
                  className="bg-white/10 border-[#2bc196]/30 text-white"
                />
                <Slider
                  value={[params.ratePercentage]}
                  onValueChange={([v]) => updateParam('ratePercentage', v)}
                  max={10}
                  step={0.1}
                  className="mt-2"
                />
              </div>
              <div>
                <Label className="text-white/80">Fee Fixo (USD)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={params.fixedFee}
                  onChange={(e) => updateParam('fixedFee', e.target.value)}
                  className="bg-white/10 border-[#2bc196]/30 text-white"
                />
              </div>
              <div>
                <Label className="text-white/80">Interchange (%)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={params.interchangePercentage}
                  onChange={(e) => updateParam('interchangePercentage', e.target.value)}
                  className="bg-white/10 border-[#2bc196]/30 text-white"
                />
              </div>
              <div>
                <Label className="text-white/80">Custo Base Pagsmile (%)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={params.baseCost}
                  onChange={(e) => updateParam('baseCost', e.target.value)}
                  className="bg-white/10 border-[#2bc196]/30 text-white"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-[#2bc196]/20">
            <CardHeader>
              <CardTitle className="text-white text-lg flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-[#2bc196]" />
                Chargebacks & Refunds
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-white/80 text-xs">Chargeback Rate (%)</Label>
                  <Input
                    type="number"
                    step="0.1"
                    value={params.chargebackRate}
                    onChange={(e) => updateParam('chargebackRate', e.target.value)}
                    className="bg-white/10 border-[#2bc196]/30 text-white"
                  />
                </div>
                <div>
                  <Label className="text-white/80 text-xs">Chargeback Fee (USD)</Label>
                  <Input
                    type="number"
                    value={params.chargebackFee}
                    onChange={(e) => updateParam('chargebackFee', e.target.value)}
                    className="bg-white/10 border-[#2bc196]/30 text-white"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-white/80 text-xs">Refund Rate (%)</Label>
                  <Input
                    type="number"
                    step="0.1"
                    value={params.refundRate}
                    onChange={(e) => updateParam('refundRate', e.target.value)}
                    className="bg-white/10 border-[#2bc196]/30 text-white"
                  />
                </div>
                <div>
                  <Label className="text-white/80 text-xs">Refund Fee (USD)</Label>
                  <Input
                    type="number"
                    value={params.refundFee}
                    onChange={(e) => updateParam('refundFee', e.target.value)}
                    className="bg-white/10 border-[#2bc196]/30 text-white"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Resultados */}
        <div className="lg:col-span-2 space-y-4">
          {/* KPIs de Resultado */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-[#2bc196]/20 to-[#002443] border-[#2bc196]/40">
              <CardContent className="pt-4">
                <p className="text-white/60 text-sm">Receita Bruta</p>
                <p className="text-white text-2xl font-bold">{formatCurrency(calculations.grossRevenue)}</p>
                <p className="text-white/40 text-xs">mensal</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-red-500/20 to-[#002443] border-red-500/40">
              <CardContent className="pt-4">
                <p className="text-white/60 text-sm">Custos Totais</p>
                <p className="text-white text-2xl font-bold">{formatCurrency(calculations.totalCosts)}</p>
                <p className="text-white/40 text-xs">mensal</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-green-500/20 to-[#002443] border-green-500/40">
              <CardContent className="pt-4">
                <p className="text-white/60 text-sm">Receita Líquida</p>
                <p className="text-[#2bc196] text-2xl font-bold">{formatCurrency(calculations.netRevenue)}</p>
                <p className="text-white/40 text-xs">mensal</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-purple-500/20 to-[#002443] border-purple-500/40">
              <CardContent className="pt-4">
                <p className="text-white/60 text-sm">Margem</p>
                <p className="text-white text-2xl font-bold">{calculations.marginPercentage.toFixed(1)}%</p>
                <p className="text-white/40 text-xs">da receita bruta</p>
              </CardContent>
            </Card>
          </div>

          {/* Receita Anual Destacada */}
          <Card className="bg-gradient-to-r from-[#2bc196]/30 to-[#002443] border-[#2bc196]">
            <CardContent className="py-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-[#2bc196] rounded-full flex items-center justify-center">
                  <PiggyBank className="h-7 w-7 text-[#002443]" />
                </div>
                <div>
                  <p className="text-white/80">Projeção de Receita Líquida Anual</p>
                  <p className="text-[#2bc196] text-4xl font-bold">{formatCurrency(calculations.annualNetRevenue)}</p>
                </div>
              </div>
              <TrendingUp className="h-12 w-12 text-[#2bc196]/50" />
            </CardContent>
          </Card>

          {/* Gráfico de Projeção */}
          <Card className="bg-white/5 border-[#2bc196]/20">
            <CardHeader>
              <CardTitle className="text-white">Projeção Anual (com 5% de crescimento/mês)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={projectionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2bc196/20" />
                    <XAxis dataKey="name" stroke="#fff" fontSize={12} />
                    <YAxis stroke="#fff" fontSize={12} tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#002443', border: '1px solid #2bc196' }}
                      labelStyle={{ color: '#fff' }}
                      formatter={(value) => [formatCurrency(value), '']}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="receita" 
                      stroke="#2bc196" 
                      fill="#2bc196" 
                      fillOpacity={0.3}
                      name="Receita Mensal"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="acumulado" 
                      stroke="#5cf7cf" 
                      fill="#5cf7cf" 
                      fillOpacity={0.1}
                      name="Acumulado"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Breakdown de Custos */}
          <Card className="bg-white/5 border-[#2bc196]/20">
            <CardHeader>
              <CardTitle className="text-white">Breakdown de Custos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={costBreakdown} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#2bc196/20" />
                    <XAxis type="number" stroke="#fff" fontSize={12} tickFormatter={(v) => `$${v.toFixed(0)}`} />
                    <YAxis dataKey="name" type="category" stroke="#fff" fontSize={12} width={80} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#002443', border: '1px solid #2bc196' }}
                      formatter={(value) => [formatCurrency(value), '']}
                    />
                    <Bar dataKey="valor" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-4 gap-2 mt-4">
                {costBreakdown.map(item => (
                  <div key={item.name} className="text-center p-2 bg-white/5 rounded">
                    <p className="text-white/60 text-xs">{item.name}</p>
                    <p className="text-white font-medium">{formatCurrency(item.valor)}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}