import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { 
  CreditCard, 
  Building2, 
  ChevronRight,
  Search,
  Table2,
  TrendingUp,
} from 'lucide-react';
import { 
  INTERCHANGE_SUMMARY,
  VISA_INTERCHANGE_RATES,
  MASTERCARD_INTERCHANGE_RATES,
  WEIGHTED_AVERAGE_CATEGORIES,
  calculateWeightedAverage,
  getAllWeightedAverageOptions
} from './InterchangeData';

// Ícones por categoria
const categoryIcons = {
  brand: CreditCard,
  cardType: CreditCard,
  masterTier: CreditCard,
  industry: Building2,
  largeTicket: TrendingUp,
  business: Building2,
};

// Cores por brand
const brandColors = {
  visa: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  mastercard: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  combined: 'bg-[#2bc196]/20 text-[#2bc196] border-[#2bc196]/30',
};

const formatPercentage = (value) => `${value.toFixed(2)}%`;
const formatFixed = (value) => `$${value.toFixed(2)}`;

export default function InterchangeSelector({ 
  selectedType, 
  customInterchange, 
  onSelectType, 
  onSelectCustomRate 
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('quick');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategory, setExpandedCategory] = useState(null);

  // Opções organizadas por categoria
  const quickOptions = useMemo(() => {
    const allWeightedOptions = getAllWeightedAverageOptions();

    const generalAverages = [
      { value: 'combined_avg', label: 'Geral Médio', brand: 'combined', stats: INTERCHANGE_SUMMARY.combined.avg },
      { value: 'combined_high', label: 'Geral Maior', brand: 'combined', stats: INTERCHANGE_SUMMARY.combined.high },
    ];

    const cardTypeSegments = allWeightedOptions.filter(opt => opt.categoryId === 'cardType').map(opt => ({
      value: opt.id,
      label: opt.name,
      brand: opt.brand,
      stats: opt.stats.avg,
      isWeighted: true,
    }));

    const industrySegments = allWeightedOptions.filter(opt => opt.categoryId === 'industry').map(opt => ({
      value: opt.id,
      label: opt.name,
      brand: opt.brand,
      stats: opt.stats.avg,
      isWeighted: true,
    }));

    const largeTicketSegments = allWeightedOptions.filter(opt => opt.categoryId === 'largeTicket').map(opt => ({
      value: opt.id,
      label: opt.name,
      brand: opt.brand,
      stats: opt.stats.avg,
      isWeighted: true,
    }));

    const businessSegments = allWeightedOptions.filter(opt => opt.categoryId === 'business').map(opt => ({
      value: opt.id,
      label: opt.name,
      brand: opt.brand,
      stats: opt.stats.avg,
      isWeighted: true,
    }));
    
    return {
      generalAverages,
      cardTypeSegments,
      industrySegments,
      largeTicketSegments,
      businessSegments,
    };
  }, []);

  // Todas as opções de médias ponderadas
  const allWeightedOptions = useMemo(() => getAllWeightedAverageOptions(), []);

  // Filtrar taxas individuais por busca
  const filteredVisaRates = useMemo(() => {
    if (!searchTerm) return VISA_INTERCHANGE_RATES;
    const term = searchTerm.toLowerCase();
    return VISA_INTERCHANGE_RATES.filter(r => 
      r.program_name.toLowerCase().includes(term) || 
      r.card_type.toLowerCase().includes(term)
    );
  }, [searchTerm]);

  const filteredMasterRates = useMemo(() => {
    if (!searchTerm) return MASTERCARD_INTERCHANGE_RATES;
    const term = searchTerm.toLowerCase();
    return MASTERCARD_INTERCHANGE_RATES.filter(r => 
      r.program_name.toLowerCase().includes(term) || 
      r.card_type.toLowerCase().includes(term)
    );
  }, [searchTerm]);

  const handleSelectQuickOption = (option) => {
    if (option.isWeighted) {
      onSelectCustomRate(option.stats, option.label);
    } else {
      onSelectType(option.value);
    }
    setModalOpen(false);
  };

  const handleSelectWeightedAverage = (option) => {
    onSelectCustomRate({
      percentage: option.stats.avg.percentage,
      fixed: option.stats.avg.fixed
    }, `${option.categoryName} - ${option.name}`);
    setModalOpen(false);
  };

  const handleSelectIndividualRate = (rate, brand) => {
    onSelectCustomRate({
      percentage: rate.rate_percentage,
      fixed: rate.rate_fixed
    }, `${rate.program_name} (${brand})`);
    setModalOpen(false);
  };

  const getCurrentValue = () => {
    if (selectedType === 'custom') {
      return customInterchange;
    }
    const [brand, level] = selectedType.split('_');
    if (brand === 'visa') return INTERCHANGE_SUMMARY.visa[level];
    if (brand === 'master') return INTERCHANGE_SUMMARY.master[level];
    return INTERCHANGE_SUMMARY.combined[level];
  };

  const currentValue = getCurrentValue();

  // Componente de botão de opção reutilizável
  const OptionButton = ({ option, isSelected }) => (
    <button
      onClick={() => handleSelectQuickOption(option)}
      className={`
        p-3 rounded-lg text-center transition-all border
        ${isSelected
          ? 'bg-[#2bc196] text-[#002443] border-[#2bc196]'
          : `${brandColors[option.brand]} hover:opacity-80`
        }
      `}
    >
      <p className="text-sm font-medium leading-tight min-h-[32px] flex items-center justify-center">{option.label}</p>
      <p className="text-lg font-bold mt-1">{formatPercentage(option.stats.percentage)}</p>
      <p className="text-xs opacity-70">+ {formatFixed(option.stats.fixed)}</p>
    </button>
  );

  // Verificar se uma opção está selecionada
  const isOptionSelected = (option) => {
    if (option.isWeighted) {
      return selectedType === 'custom' && 
        customInterchange.percentage === option.stats.percentage && 
        customInterchange.fixed === option.stats.fixed;
    }
    return selectedType === option.value;
  };

  return (
    <div className="space-y-4">
      {/* Botão para abrir modal */}
      <div className="flex items-center gap-3">
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogTrigger asChild>
            <Button 
              variant="outline" 
              className="flex-1 bg-[#001a30] border-[#2bc196]/40 text-white hover:bg-[#2bc196]/20"
            >
              <Table2 className="h-4 w-4 mr-2" />
              {selectedType === 'custom' 
                ? `Personalizado: ${formatPercentage(customInterchange.percentage)} + ${formatFixed(customInterchange.fixed)}`
                : `Selecionar Taxa de Interchange`
              }
              <ChevronRight className="h-4 w-4 ml-auto" />
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#002443] border-[#2bc196]/20 text-white max-w-5xl max-h-[85vh] overflow-hidden flex flex-col">
            <DialogHeader>
              <DialogTitle className="text-[#2bc196] text-xl">Selecionar Taxa de Interchange</DialogTitle>
            </DialogHeader>
            
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden">
              <TabsList className="bg-white/5 border-b border-[#2bc196]/20">
                <TabsTrigger value="quick" className="data-[state=active]:bg-[#2bc196] data-[state=active]:text-[#002443]">
                  Médias Rápidas
                </TabsTrigger>
                <TabsTrigger value="weighted" className="data-[state=active]:bg-[#2bc196] data-[state=active]:text-[#002443]">
                  Por Categoria
                </TabsTrigger>
                <TabsTrigger value="individual" className="data-[state=active]:bg-[#2bc196] data-[state=active]:text-[#002443]">
                  Taxa Individual
                </TabsTrigger>
              </TabsList>

              {/* Tab: Médias Rápidas */}
              <TabsContent value="quick" className="flex-1 overflow-auto p-4 space-y-6">
                {/* Médias Combinadas Gerais */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-[#2bc196]" />
                    Médias Combinadas Gerais
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {quickOptions.generalAverages.map(option => (
                      <OptionButton key={option.value} option={option} isSelected={isOptionSelected(option)} />
                    ))}
                  </div>
                </div>

                {/* Por Tipo de Cartão */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-[#2bc196]" />
                    Por Tipo de Cartão
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {quickOptions.cardTypeSegments.map(option => (
                      <OptionButton key={option.value} option={option} isSelected={isOptionSelected(option)} />
                    ))}
                  </div>
                </div>
                
                {/* Por Segmento de Indústria */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-[#2bc196]" />
                    Por Segmento de Indústria
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {quickOptions.industrySegments.map(option => (
                      <OptionButton key={option.value} option={option} isSelected={isOptionSelected(option)} />
                    ))}
                  </div>
                </div>

                {/* Transações de Grande Valor */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-[#2bc196]" />
                    Transações de Grande Valor
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {quickOptions.largeTicketSegments.map(option => (
                      <OptionButton key={option.value} option={option} isSelected={isOptionSelected(option)} />
                    ))}
                  </div>
                </div>

                {/* Cartões Empresariais */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-[#2bc196]" />
                    Cartões Empresariais
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {quickOptions.businessSegments.map(option => (
                      <OptionButton key={option.value} option={option} isSelected={isOptionSelected(option)} />
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Tab: Por Categoria */}
              <TabsContent value="weighted" className="flex-1 overflow-auto p-4">
                <div className="space-y-4">
                  {Object.entries(WEIGHTED_AVERAGE_CATEGORIES).map(([key, category]) => {
                    const Icon = categoryIcons[key] || CreditCard;
                    return (
                      <Card key={key} className="bg-white/5 border-[#2bc196]/20">
                        <CardHeader 
                          className="cursor-pointer hover:bg-white/5 transition-all"
                          onClick={() => setExpandedCategory(expandedCategory === key ? null : key)}
                        >
                          <CardTitle className="text-white text-base flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Icon className="h-5 w-5 text-[#2bc196]" />
                              <span>{category.name}</span>
                            </div>
                            <ChevronRight className={`h-5 w-5 transition-transform ${expandedCategory === key ? 'rotate-90' : ''}`} />
                          </CardTitle>
                          <p className="text-white/50 text-sm">{category.description}</p>
                        </CardHeader>
                        {expandedCategory === key && (
                          <CardContent>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                              {category.options.map(option => {
                                const stats = calculateWeightedAverage(option.id);
                                return (
                                  <button
                                    key={option.id}
                                    onClick={() => handleSelectWeightedAverage({ ...option, stats })}
                                    className={`p-3 rounded-lg text-left transition-all border ${brandColors[option.brand]} hover:opacity-80`}
                                  >
                                    <p className="font-medium text-sm leading-tight">{option.name}</p>
                                    <div className="flex items-baseline gap-2 mt-2">
                                      <span className="text-lg font-bold">{formatPercentage(stats.avg.percentage)}</span>
                                      <span className="text-xs opacity-70">+ {formatFixed(stats.avg.fixed)}</span>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mt-1 text-xs opacity-60">
                                      <span>Min: {formatPercentage(stats.low.percentage)}</span>
                                      <span>Max: {formatPercentage(stats.high.percentage)}</span>
                                    </div>
                                  </button>
                                );
                              })}
                            </div>
                          </CardContent>
                        )}
                      </Card>
                    );
                  })}
                </div>
              </TabsContent>

              {/* Tab: Taxa Individual */}
              <TabsContent value="individual" className="flex-1 overflow-hidden flex flex-col p-4">
                <div className="mb-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
                    <Input
                      placeholder="Buscar por nome do programa ou tipo de cartão..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-white/10 border-[#2bc196]/30 text-white"
                    />
                  </div>
                </div>
                
                <div className="flex-1 overflow-auto space-y-6">
                  {/* Visa */}
                  <div>
                    <h4 className="text-blue-400 font-medium mb-2 sticky top-0 bg-[#002443] py-2">
                      Visa ({filteredVisaRates.length} taxas)
                    </h4>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="border-[#2bc196]/20">
                            <TableHead className="text-white/60">Programa</TableHead>
                            <TableHead className="text-white/60">Tipo</TableHead>
                            <TableHead className="text-white/60 text-right">Taxa</TableHead>
                            <TableHead className="text-white/60 text-right">Fixo</TableHead>
                            <TableHead></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredVisaRates.map((rate, idx) => (
                            <TableRow key={idx} className="border-[#2bc196]/10 hover:bg-white/5">
                              <TableCell className="text-white text-sm">{rate.program_name}</TableCell>
                              <TableCell className="text-white/70 text-sm">{rate.card_type}</TableCell>
                              <TableCell className="text-white text-right font-medium">{formatPercentage(rate.rate_percentage)}</TableCell>
                              <TableCell className="text-white text-right">{formatFixed(rate.rate_fixed)}</TableCell>
                              <TableCell>
                                <Button 
                                  size="sm" 
                                  onClick={() => handleSelectIndividualRate(rate, 'Visa')}
                                  className="bg-[#2bc196] hover:bg-[#5cf7cf] text-[#002443]"
                                >
                                  Selecionar
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>

                  {/* Mastercard */}
                  <div>
                    <h4 className="text-orange-400 font-medium mb-2 sticky top-0 bg-[#002443] py-2">
                      Mastercard ({filteredMasterRates.length} taxas)
                    </h4>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="border-[#2bc196]/20">
                            <TableHead className="text-white/60">Programa</TableHead>
                            <TableHead className="text-white/60">Tipo</TableHead>
                            <TableHead className="text-white/60 text-right">Taxa</TableHead>
                            <TableHead className="text-white/60 text-right">Fixo</TableHead>
                            <TableHead></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredMasterRates.map((rate, idx) => (
                            <TableRow key={idx} className="border-[#2bc196]/10 hover:bg-white/5">
                              <TableCell className="text-white text-sm">{rate.program_name}</TableCell>
                              <TableCell className="text-white/70 text-sm">{rate.card_type}</TableCell>
                              <TableCell className="text-white text-right font-medium">{formatPercentage(rate.rate_percentage)}</TableCell>
                              <TableCell className="text-white text-right">{formatFixed(rate.rate_fixed)}</TableCell>
                              <TableCell>
                                <Button 
                                  size="sm" 
                                  onClick={() => handleSelectIndividualRate(rate, 'Mastercard')}
                                  className="bg-[#2bc196] hover:bg-[#5cf7cf] text-[#002443]"
                                >
                                  Selecionar
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>

        {/* Indicador de taxa selecionada */}
        {selectedType === 'custom' && (
          <div className="px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-lg">
            <p className="text-purple-400 text-sm font-medium">
              {formatPercentage(customInterchange.percentage)} + {formatFixed(customInterchange.fixed)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}