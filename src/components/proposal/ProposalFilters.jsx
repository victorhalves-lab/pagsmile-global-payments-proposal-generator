import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, X, Download } from 'lucide-react';

export default function ProposalFilters({ filters, setFilters, onExport }) {
  const handleReset = () => {
    setFilters({
      search: '',
      status: 'all',
      dateFrom: '',
      dateTo: ''
    });
  };

  return (
    <div className="rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 p-4">
      <div className="flex flex-wrap gap-3">
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
            <Input
              placeholder="Buscar por cliente ou contato..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40 rounded-xl focus:border-[#2bc196]/50 focus:ring-[#2bc196]/20"
            />
          </div>
        </div>
        
        <Select value={filters.status} onValueChange={(v) => setFilters({ ...filters, status: v })}>
          <SelectTrigger className="w-[180px] bg-white/5 border-white/10 text-white rounded-xl">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="bg-[#001a30] border-white/10">
            <SelectItem value="all">Todos os Status</SelectItem>
            <SelectItem value="sent">Enviada</SelectItem>
            <SelectItem value="accepted">Aceita</SelectItem>
            <SelectItem value="counter_proposal">Contraproposta</SelectItem>
            <SelectItem value="rejected">Recusada</SelectItem>
          </SelectContent>
        </Select>

        <Input
          type="date"
          placeholder="Data inicial"
          value={filters.dateFrom}
          onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
          className="w-[160px] bg-white/5 border-white/10 text-white rounded-xl"
        />

        <Input
          type="date"
          placeholder="Data final"
          value={filters.dateTo}
          onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
          className="w-[160px] bg-white/5 border-white/10 text-white rounded-xl"
        />

        <Button
          onClick={handleReset}
          variant="secondary"
        >
          <X className="h-4 w-4" />
          Limpar
        </Button>

        <Button onClick={onExport}>
          <Download className="h-4 w-4" />
          Exportar CSV
        </Button>
      </div>
    </div>
  );
}