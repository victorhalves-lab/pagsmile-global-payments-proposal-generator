import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
  VISA_INTERCHANGE_RATES, 
  MASTERCARD_INTERCHANGE_RATES, 
  INTERCHANGE_SUMMARY 
} from '@/components/interchange/InterchangeData';

export default function InterchangeViewer() {
  const [selectedTab, setSelectedTab] = useState('summary');

  const formatPercentage = (value) => `${value.toFixed(2)}%`;
  const formatFixed = (value) => `$${value.toFixed(2)}`;

  const SummaryCard = ({ title, low, avg, high, color }) => (
    <Card className="bg-white/5 border-[#2bc196]/20">
      <CardHeader className="pb-2">
        <CardTitle className={`text-lg ${color}`}>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-green-500/10 rounded-lg">
            <p className="text-green-400 text-xs font-medium mb-1">MENOR</p>
            <p className="text-white font-bold">{formatPercentage(low.percentage)}</p>
            <p className="text-white/60 text-sm">{formatFixed(low.fixed)}</p>
          </div>
          <div className="text-center p-3 bg-yellow-500/10 rounded-lg">
            <p className="text-yellow-400 text-xs font-medium mb-1">MÉDIA</p>
            <p className="text-white font-bold">{formatPercentage(avg.percentage)}</p>
            <p className="text-white/60 text-sm">{formatFixed(avg.fixed)}</p>
          </div>
          <div className="text-center p-3 bg-red-500/10 rounded-lg">
            <p className="text-red-400 text-xs font-medium mb-1">MAIOR</p>
            <p className="text-white font-bold">{formatPercentage(high.percentage)}</p>
            <p className="text-white/60 text-sm">{formatFixed(high.fixed)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const InterchangeTable = ({ data, brand }) => (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-[#2bc196]/20">
            <TableHead className="text-white/60">Programa</TableHead>
            <TableHead className="text-white/60">Tipo de Cartão</TableHead>
            <TableHead className="text-white/60 text-right">Taxa (%)</TableHead>
            <TableHead className="text-white/60 text-right">Fixo (USD)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((rate, index) => (
            <TableRow key={index} className="border-[#2bc196]/10 hover:bg-white/5">
              <TableCell className="text-white font-medium">{rate.program_name}</TableCell>
              <TableCell>
                <Badge variant="outline" className="border-[#2bc196]/40 text-[#2bc196]">
                  {rate.card_type}
                </Badge>
              </TableCell>
              <TableCell className="text-white text-right">{formatPercentage(rate.rate_percentage)}</TableCell>
              <TableCell className="text-white text-right">{formatFixed(rate.rate_fixed)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Taxas de Interchange</h1>
        <p className="text-white/60 mt-1">Card Not Present - USA</p>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="bg-white/10 border border-[#2bc196]/20">
          <TabsTrigger 
            value="summary" 
            className="data-[state=active]:bg-[#2bc196] data-[state=active]:text-[#002443] text-white"
          >
            Resumo
          </TabsTrigger>
          <TabsTrigger 
            value="visa" 
            className="data-[state=active]:bg-[#2bc196] data-[state=active]:text-[#002443] text-white"
          >
            Visa
          </TabsTrigger>
          <TabsTrigger 
            value="mastercard" 
            className="data-[state=active]:bg-[#2bc196] data-[state=active]:text-[#002443] text-white"
          >
            Mastercard
          </TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <SummaryCard 
              title="Visa" 
              low={INTERCHANGE_SUMMARY.visa.low}
              avg={INTERCHANGE_SUMMARY.visa.avg}
              high={INTERCHANGE_SUMMARY.visa.high}
              color="text-blue-400"
            />
            <SummaryCard 
              title="Mastercard" 
              low={INTERCHANGE_SUMMARY.master.low}
              avg={INTERCHANGE_SUMMARY.master.avg}
              high={INTERCHANGE_SUMMARY.master.high}
              color="text-orange-400"
            />
            <SummaryCard 
              title="Combinado (Visa + Master)" 
              low={INTERCHANGE_SUMMARY.combined.low}
              avg={INTERCHANGE_SUMMARY.combined.avg}
              high={INTERCHANGE_SUMMARY.combined.high}
              color="text-[#2bc196]"
            />
          </div>

          <Card className="mt-6 bg-white/5 border-[#2bc196]/20">
            <CardHeader>
              <CardTitle className="text-white">Legenda</CardTitle>
            </CardHeader>
            <CardContent className="text-white/70 space-y-2">
              <p><span className="text-green-400 font-medium">Menor:</span> A taxa mais baixa disponível para cada bandeira.</p>
              <p><span className="text-yellow-400 font-medium">Média:</span> A média de todas as taxas de cada bandeira.</p>
              <p><span className="text-red-400 font-medium">Maior:</span> A taxa mais alta disponível para cada bandeira.</p>
              <p className="pt-2 border-t border-white/10"><span className="text-[#2bc196] font-medium">Combinado:</span> Média ponderada entre Visa e Mastercard para cada categoria (menor, média, maior).</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="visa" className="mt-6">
          <Card className="bg-white/5 border-[#2bc196]/20">
            <CardHeader>
              <CardTitle className="text-blue-400 flex items-center gap-2">
                <span className="text-2xl">💳</span>
                Tabela Completa - Visa (Card Not Present)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <InterchangeTable data={VISA_INTERCHANGE_RATES} brand="visa" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mastercard" className="mt-6">
          <Card className="bg-white/5 border-[#2bc196]/20">
            <CardHeader>
              <CardTitle className="text-orange-400 flex items-center gap-2">
                <span className="text-2xl">💳</span>
                Tabela Completa - Mastercard (Card Not Present)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <InterchangeTable data={MASTERCARD_INTERCHANGE_RATES} brand="mastercard" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}