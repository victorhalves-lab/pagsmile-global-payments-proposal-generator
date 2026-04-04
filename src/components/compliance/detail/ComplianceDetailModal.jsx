import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Building2, FileText, X, Calendar, Globe, DollarSign } from 'lucide-react';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import CompanyInfoTab from './CompanyInfoTab';
import DocumentsTab from './DocumentsTab';

const STATUS_COLORS = {
  pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/20',
  submitted: 'bg-blue-500/20 text-blue-400 border-blue-500/20',
  in_review: 'bg-purple-500/20 text-purple-400 border-purple-500/20',
  approved: 'bg-green-500/20 text-green-400 border-green-500/20',
  rejected: 'bg-red-500/20 text-red-400 border-red-500/20',
};

export default function ComplianceDetailModal({ data, open, onClose }) {
  const [activeTab, setActiveTab] = useState('info');
  const { t } = useTranslation();

  if (!data) return null;

  const statusLabel = (s) => t(`compliance.status${s?.charAt(0).toUpperCase()}${s?.slice(1)?.replace('_', '')}`) || s;

  const tabs = [
    { id: 'info', label: 'Informações', icon: Building2 },
    { id: 'docs', label: 'Documentos', icon: FileText },
  ];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[92vh] p-0 bg-[#001a30] border-white/10 text-white overflow-hidden">
        <DialogTitle className="sr-only">{data.legal_business_name}</DialogTitle>
        {/* Header */}
        <div className="border-b border-white/[0.06] px-6 py-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#2bc196]/15 flex items-center justify-center">
                <Building2 className="h-6 w-6 text-[#2bc196]" />
              </div>
              <div>
                <h2 className="text-white font-bold text-lg leading-tight">{data.legal_business_name}</h2>
                <div className="flex items-center gap-3 mt-1">
                  <Badge className={`text-[10px] border ${STATUS_COLORS[data.status] || STATUS_COLORS.pending}`}>
                    {statusLabel(data.status)}
                  </Badge>
                  {data.registered_country && (
                    <span className="text-white/30 text-xs flex items-center gap-1">
                      <Globe className="h-3 w-3" /> {data.registered_country}
                    </span>
                  )}
                  {data.estimated_monthly_volume_usd > 0 && (
                    <span className="text-white/30 text-xs flex items-center gap-1">
                      <DollarSign className="h-3 w-3" /> US$ {data.estimated_monthly_volume_usd.toLocaleString('pt-BR')}
                    </span>
                  )}
                  <span className="text-white/30 text-xs flex items-center gap-1">
                    <Calendar className="h-3 w-3" /> {moment(data.created_date).format('DD/MM/YYYY')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-1 mt-4">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#2bc196]/15 text-[#2bc196] border border-[#2bc196]/20'
                    : 'text-white/40 hover:text-white/60 hover:bg-white/5'
                }`}
              >
                <tab.icon className="h-3.5 w-3.5" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto px-6 py-5" style={{ maxHeight: 'calc(92vh - 140px)' }}>
          {activeTab === 'info' && <CompanyInfoTab data={data} />}
          {activeTab === 'docs' && <DocumentsTab data={data} />}
        </div>
      </DialogContent>
    </Dialog>
  );
}