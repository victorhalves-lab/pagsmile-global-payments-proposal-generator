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
  Plane, 
  ShoppingCart, 
  Repeat, 
  Heart, 
  Landmark,
  Zap,
  ChevronRight,
  Search,
  Check,
  Table2,
  TrendingUp,
  TrendingDown,
  Minus
} from 'lucide-react';
import { 
  INTERCHANGE_SUMMARY,
  VISA_INTERCHANGE_RATES,
  MASTERCARD_INTERCHANGE_RATES,
  WEIGHTED_AVERAGE_CATEGORIES,
  calculateWeightedAverage,
  getAllWeightedAverageOptions
} from './InterchangeData';

// Helper para obter stats de opção rápida
const getQuickOptionStats = (option, customInterchange) => {
  if (option.isWeighted) {
    return option.stats;
  }
  const [brand, level] = option.value.split('_');
  if (brand === 'visa') return INTERCHANGE_SUMMARY.visa[level];
  if (brand === 'master') return INTERCHANGE_SUMMARY.master[level];
  return INTERCHANGE_SUMMARY.combined[level];
};

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

  // Opções rápidas (as mais usadas)
  const quickOptions = useMemo(() => {
    const creditStats = calculateWeightedAverage('combined_credit');
    const debitStats = calculateWeightedAverage('combined_debit');
    const ecommerceStats = calculateWeightedAverage('ecommerce');
    const travelStats = calculateWeightedAverage('travel');
    const recurringStats = calculateWeightedAverage('recurring');
    
    return [
      // Médias gerais
      { value: 'combined_avg', label: 'Geral Médio', brand: 'combined', stats: INTERCHANGE_SUMMARY.combined.avg },
      { value: 'combined_low', label: 'Geral Menor', brand: 'combined', stats: INTERCHANGE_SUMMARY.combined.low },
      { value: 'combined_high', label: 'Geral Maior', brand: 'combined', stats: INTERCHANGE_SUMMARY.combined.high },
      // Por tipo de cartão combinado
      { value: 'combined_credit', label: 'Crédito (V+M)', brand: 'combined', stats: creditStats.avg, isWeighted: true },
      { value: 'combined_debit', label: 'Débito (V+M)', brand: 'combined', stats: debitStats.avg, isWeighted: true },
      // Por segmento
      { value: 'ecommerce', label: 'E-commerce', brand: 'combined', stats: ecommerceStats.avg, isWeighted: true },
      { value: 'travel', label: 'Viagens', brand: 'combined', stats: travelStats.avg, isWeighted: true },
      { value: 'recurring', label: 'Recorrente', brand: 'combined', stats: recurringStats.avg, isWeighted: true },
    ];
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

  return (
    <div className="space-y-4">
      {/* Seleção Rápida */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
        {quickOptions.map(option => {
          const isSelected = option.isWeighted 
            ? (selectedType === 'custom' && customInterchange.percentage === option.stats.percentage && customInterchange.fixed === option.stats.fixed)
            : selectedType === option.value;
          return (
            <button
              key={option.value}
              onClick={() => handleSelectQuickOption(option)}
              className={`
                p-3 rounded-lg text-center transition-all border
                ${isSelected
                  ? 'bg-[#2bc196] text-[#002443] border-[#2bc196]'
                  : `${brandColors[option.brand]} hover:opacity-80`
                }
              `}
            >
              <p className="text-xs font-medium truncate">{option.label}</p>
              <p className="text-lg font-bold mt-1">{formatPercentage(option.stats.percentage)}</p>
              <p className="text-xs opacity-70">+ {formatFixed(option.stats.fixed)}</p>
            </button>
          );
        })}
      </div>

      {/* Botão para opções avançadas */}
      <div className="flex items-center gap-3">
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogTrigger asChild>
            <Button 
              variant="outline" 
              className="flex-1 bg-[#001a30] border-[#2bc196]/40 text-white hover:bg-[#2bc196]/20"
            >
              <Table2 className="h-4 w-4 mr-2" />
              Mais Opções de Interchange
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
              <TabsContent value="quick" className="flex-1 overflow-auto p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Visa */}
                  <Card className="bg-blue-500/10 border-blue-500/30">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-blue-400 text-lg flex items-center gap-2">
                        <CreditCard className="h-5 w-5" />
                        Visa
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {['low', 'avg', 'high'].map(level => (
                        <button
                          key={`visa_${level}`}
                          onClick={() => { onSelectType(`visa_${level}`); setModalOpen(false); }}
                          className={`w-full p-3 rounded-lg flex justify-between items-center transition-all
                            ${selectedType === `visa_${level}` ? 'bg-blue-500 text-white' : 'bg-white/5 hover:bg-white/10'}
                          `}
                        >
                          <span className="capitalize">{level === 'low' ? 'Menor' : level === 'avg' ? 'Média' : 'Maior'}</span>
                          <span className="font-bold">{formatPercentage(INTERCHANGE_SUMMARY.visa[level].percentage)}</span>
                        </button>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Mastercard */}
                  <Card className="bg-orange-500/10 border-orange-500/30">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-orange-400 text-lg flex items-center gap-2">
                        <CreditCard className="h-5 w-5" />
                        Mastercard
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {['low', 'avg', 'high'].map(level => (
                        <button
                          key={`master_${level}`}
                          onClick={() => { onSelectType(`master_${level}`); setModalOpen(false); }}
                          className={`w-full p-3 rounded-lg flex justify-between items-center transition-all
                            ${selectedType === `master_${level}` ? 'bg-orange-500 text-white' : 'bg-white/5 hover:bg-white/10'}
                          `}
                        >
                          <span className="capitalize">{level === 'low' ? 'Menor' : level === 'avg' ? 'Média' : 'Maior'}</span>
                          <span className="font-bold">{formatPercentage(INTERCHANGE_SUMMARY.master[level].percentage)}</span>
                        </button>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Combinado */}
                  <Card className="bg-[#2bc196]/10 border-[#2bc196]/30">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-[#2bc196] text-lg flex items-center gap-2">
                        <CreditCard className="h-5 w-5" />
                        Combinado
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {['low', 'avg', 'high'].map(level => (
                        <button
                          key={`combined_${level}`}
                          onClick={() => { onSelectType(`combined_${level}`); setModalOpen(false); }}
                          className={`w-full p-3 rounded-lg flex justify-between items-center transition-all
                            ${selectedType === `combined_${level}` ? 'bg-[#2bc196] text-[#002443]' : 'bg-white/5 hover:bg-white/10'}
                          `}
                        >
                          <span className="capitalize">{level === 'low' ? 'Menor' : level === 'avg' ? 'Média' : 'Maior'}</span>
                          <span className="font-bold">{formatPercentage(INTERCHANGE_SUMMARY.combined[level].percentage)}</span>
                        </button>
                      ))}
                    </CardContent>
                  </Card>
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
                                    <p className="font-medium text-sm">{option.name}</p>
                                    <div className="flex items-baseline gap-2 mt-1">
                                      <span className="text-lg font-bold">{formatPercentage(stats.avg.percentage)}</span>
                                      <span className="text-xs opacity-70">+ {formatFixed(stats.avg.fixed)}</span>
                                    </div>
                                    <div className="flex gap-2 mt-1 text-xs opacity-60">
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
                          {filteredVisaRates.slice(0, 20).map((rate, idx) => (
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
                      {filteredVisaRates.length > 20 && (
                        <p className="text-white/50 text-sm text-center py-2">
                          Mostrando 20 de {filteredVisaRates.length} taxas. Use a busca para filtrar.
                        </p>
                      )}
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
                          {filteredMasterRates.slice(0, 20).map((rate, idx) => (
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
                      {filteredMasterRates.length > 20 && (
                        <p className="text-white/50 text-sm text-center py-2">
                          Mostrando 20 de {filteredMasterRates.length} taxas. Use a busca para filtrar.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>

        {/* Indicador de taxa personalizada */}
        {selectedType === 'custom' && (
          <div className="px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-lg">
            <p className="text-purple-400 text-sm font-medium">
              Personalizado: {formatPercentage(customInterchange.percentage)} + {formatFixed(customInterchange.fixed)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}