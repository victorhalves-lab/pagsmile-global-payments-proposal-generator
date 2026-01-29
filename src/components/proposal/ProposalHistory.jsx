import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { History, ArrowRight } from 'lucide-react';

export default function ProposalHistory({ proposal, open, onOpenChange }) {
  const { data: allVersions = [] } = useQuery({
    queryKey: ['proposal-history', proposal?.id],
    queryFn: async () => {
      if (!proposal) return [];
      
      // Buscar todas as versões relacionadas (originais e derivadas)
      const parentId = proposal.parent_proposal_id || proposal.id;
      const [children, parent] = await Promise.all([
        base44.entities.Proposal.filter({ parent_proposal_id: parentId }),
        proposal.parent_proposal_id 
          ? base44.entities.Proposal.filter({ id: parentId })
          : Promise.resolve([proposal])
      ]);
      
      return [...parent, ...children].sort((a, b) => (a.version || 1) - (b.version || 1));
    },
    enabled: open && !!proposal
  });

  const formatDate = (date) => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatPercentage = (value) => `${(value || 0).toFixed(2)}%`;
  const formatCurrency = (value) => `$${(value || 0).toFixed(2)}`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#002443] border-[#2bc196]/20 text-white max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-[#2bc196] flex items-center gap-2">
            <History className="h-5 w-5" />
            Histórico de Versões
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 pt-4">
          {allVersions.length <= 1 ? (
            <p className="text-white/60 text-center py-8">Esta é a única versão da proposta.</p>
          ) : (
            <div className="space-y-3">
              {allVersions.map((version, index) => (
                <div 
                  key={version.id} 
                  className={`p-4 rounded-lg border ${
                    version.id === proposal?.id 
                      ? 'bg-[#2bc196]/20 border-[#2bc196]' 
                      : 'bg-white/5 border-[#2bc196]/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-[#2bc196]/20 text-[#2bc196]">
                        v{version.version || 1}
                      </Badge>
                      {version.id === proposal?.id && (
                        <Badge className="bg-blue-500/20 text-blue-400">Atual</Badge>
                      )}
                    </div>
                    <span className="text-white/60 text-sm">{formatDate(version.created_date)}</span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-white/60">Taxa</p>
                      <p className="text-white font-medium">{formatPercentage(version.final_rate_percentage)}</p>
                    </div>
                    <div>
                      <p className="text-white/60">Fee Fixo</p>
                      <p className="text-white font-medium">{formatCurrency(version.final_fixed_fee)}</p>
                    </div>
                    <div>
                      <p className="text-white/60">Settlement</p>
                      <p className="text-white font-medium">{version.settlement_days}</p>
                    </div>
                  </div>
                  
                  {version.change_notes && (
                    <div className="mt-2 pt-2 border-t border-[#2bc196]/20">
                      <p className="text-white/60 text-xs">Notas:</p>
                      <p className="text-white/80 text-sm">{version.change_notes}</p>
                    </div>
                  )}
                  
                  {index < allVersions.length - 1 && (
                    <div className="flex justify-center mt-3 -mb-6">
                      <ArrowRight className="h-4 w-4 text-[#2bc196] rotate-90" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}