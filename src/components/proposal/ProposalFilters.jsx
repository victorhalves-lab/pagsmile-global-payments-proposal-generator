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
    <div className="bg-white/5 rounded-lg p-4 space-y-4">
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
            <Input
              placeholder="Buscar por cliente ou contato..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="pl-10 bg-white/10 border-[#2bc196]/30 text-white placeholder:text-white/40"
            />
          </div>
        </div>
        
        <Select value={filters.status} onValueChange={(v) => setFilters({ ...filters, status: v })}>
          <SelectTrigger className="w-[180px] bg-white/10 border-[#2bc196]/30 text-white">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os Status</SelectItem>
            <SelectItem value="draft">Rascunho</SelectItem>
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
          className="w-[160px] bg-white/10 border-[#2bc196]/30 text-white"
        />

        <Input
          type="date"
          placeholder="Data final"
          value={filters.dateTo}
          onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
          className="w-[160px] bg-white/10 border-[#2bc196]/30 text-white"
        />

        <Button
          onClick={handleReset}
          className="bg-[#1a5a4c] hover:bg-[#2bc196] text-white"
        >
          <X className="h-4 w-4 mr-1" />
          Limpar
        </Button>

        <Button
          onClick={onExport}
          className="bg-[#2bc196] hover:bg-[#5cf7cf] text-[#002443] font-semibold"
        >
          <Download className="h-4 w-4 mr-1" />
          Exportar CSV
        </Button>
      </div>
    </div>
  );
}