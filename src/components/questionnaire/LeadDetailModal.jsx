import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Building2, User, DollarSign, CreditCard, Handshake, Clock, Globe, Calendar } from 'lucide-react';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import DetailField from '@/components/compliance/detail/DetailField';

const STATUS_STYLES = {
  leads: 'bg-white/10 text-white/60 border-white/20',
  proposal_made: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  proposal_accepted: 'bg-green-500/20 text-green-400 border-green-500/30',
  counter_proposal: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  proposal_lost: 'bg-red-500/20 text-red-400 border-red-500/30'
};

const SIDEBAR_TABS = [
  { id: 'contact', label: 'Contato', icon: User },
  { id: 'company', label: 'Empresa', icon: Building2 },
  { id: 'financial', label: 'Financeiro', icon: DollarSign },
  { id: 'transactions', label: 'Transações', icon: CreditCard },
  { id: 'partner', label: 'Parceiro Atual', icon: Handshake },
  { id: 'settlement', label: 'Liquidação', icon: Clock },
  { id: 'markets', label: 'Mercados', icon: Globe },
];

function formatCurrency(value) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value || 0);
}

function PercentageBar({ label, value }) {
  if (!value && value !== 0) return null;
  return (
    <div className="flex items-center gap-3">
      <span className="text-white/50 text-xs w-24 shrink-0">{label}</span>
      <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
        <div className="h-full bg-[#2bc196]/60 rounded-full" style={{ width: `${Math.min(value, 100)}%` }} />
      </div>
      <span className="text-white text-xs font-medium w-10 text-right">{value}%</span>
    </div>
  );
}

export default function LeadDetailModal({ data, open, onClose }) {
  const [activeTab, setActiveTab] = useState('contact');
  const { t } = useTranslation();

  if (!data) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] p-0 bg-[#001a30] border-white/10 text-white overflow-hidden">
        <DialogTitle className="sr-only">{data.company_name}</DialogTitle>
        
        {/* Header */}
        <div className="border-b border-white/[0.06] px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#2bc196]/15 flex items-center justify-center">
              <Building2 className="h-6 w-6 text-[#2bc196]" />
            </div>
            <div className="flex-1">
              <h2 className="text-white font-bold text-lg">{data.company_name}</h2>
              <div className="flex items-center gap-3 mt-1">
                <Badge className={`text-[10px] border ${STATUS_STYLES[data.pipeline_status] || STATUS_STYLES.leads}`}>
                  {t(`questionnaire.status.${data.pipeline_status}`) || 'Lead'}
                </Badge>
                <span className="text-white/30 text-xs flex items-center gap-1">
                  <DollarSign className="h-3 w-3" /> {formatCurrency(data.monthly_tpv)}
                </span>
                <span className="text-white/30 text-xs flex items-center gap-1">
                  <Calendar className="h-3 w-3" /> {moment(data.created_date).format('DD/MM/YYYY')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Body: Sidebar + Content */}
        <div className="flex" style={{ height: 'calc(90vh - 90px)' }}>
          {/* Sidebar */}
          <div className="w-48 border-r border-white/[0.06] p-2 overflow-y-auto shrink-0">
            {SIDEBAR_TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-xs font-medium transition-all mb-0.5 ${
                  activeTab === tab.id
                    ? 'bg-[#2bc196]/15 text-[#2bc196]'
                    : 'text-white/40 hover:text-white/60 hover:bg-white/5'
                }`}
              >
                <tab.icon className="h-3.5 w-3.5 shrink-0" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {activeTab === 'contact' && (
              <div>
                <h3 className="text-white font-semibold text-sm mb-4 flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-[#2bc196]/15 flex items-center justify-center"><span className="text-[#2bc196] text-[10px] font-bold">1</span></div>
                  Informações de Contato
                </h3>
                <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5">
                  <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                    <DetailField label={t('questionnaire.contact')} value={data.contact_name} />
                    <DetailField label={t('questionnaire.email')} value={data.contact_email} />
                    <DetailField label={t('questionnaire.phone')} value={data.contact_phone ? `${data.contact_phone_country_code || ''} ${data.contact_phone}` : null} />
                    <DetailField label={t('questionnaire.role')} value={data.contact_role} />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'company' && (
              <div>
                <h3 className="text-white font-semibold text-sm mb-4 flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-[#2bc196]/15 flex items-center justify-center"><span className="text-[#2bc196] text-[10px] font-bold">2</span></div>
                  Informações da Empresa
                </h3>
                <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5">
                  <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                    <DetailField label={t('questionnaire.company')} value={data.company_name} />
                    <DetailField label="MCC" value={data.mcc} />
                    <DetailField label={t('questionnaire.businessType')} value={data.business_type} />
                    <DetailField label={t('questionnaire.businessModel')} value={data.business_model} />
                    <DetailField label={t('questionnaire.products')} value={data.products_services} fullWidth />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'financial' && (
              <div>
                <h3 className="text-white font-semibold text-sm mb-4 flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-[#2bc196]/15 flex items-center justify-center"><span className="text-[#2bc196] text-[10px] font-bold">3</span></div>
                  Dados Financeiros
                </h3>
                <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5">
                  <div className="grid grid-cols-3 gap-4 mb-5">
                    <div className="bg-[#2bc196]/5 border border-[#2bc196]/15 rounded-xl p-4 text-center">
                      <p className="text-white/40 text-[10px] uppercase tracking-wider mb-1">TPV Mensal</p>
                      <p className="text-[#2bc196] font-bold text-lg">{formatCurrency(data.monthly_tpv)}</p>
                    </div>
                    <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 text-center">
                      <p className="text-white/40 text-[10px] uppercase tracking-wider mb-1">Ticket Médio</p>
                      <p className="text-white font-bold text-lg">{formatCurrency(data.average_ticket)}</p>
                    </div>
                    <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4 text-center">
                      <p className="text-white/40 text-[10px] uppercase tracking-wider mb-1">Transações/mês</p>
                      <p className="text-white font-bold text-lg">{(data.monthly_transactions || 0).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'transactions' && (
              <div>
                <h3 className="text-white font-semibold text-sm mb-4 flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-[#2bc196]/15 flex items-center justify-center"><span className="text-[#2bc196] text-[10px] font-bold">4</span></div>
                  Distribuição de Transações
                </h3>
                <div className="space-y-4">
                  {(data.credit_percentage > 0 || data.debit_percentage > 0) && (
                    <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5">
                      <p className="text-[#2bc196] text-[11px] font-semibold uppercase tracking-wider mb-3">Por Tipo de Cartão</p>
                      <div className="space-y-2.5">
                        <PercentageBar label="Crédito" value={data.credit_percentage} />
                        <PercentageBar label="Débito" value={data.debit_percentage} />
                      </div>
                    </div>
                  )}
                  {(data.visa_percentage > 0 || data.mastercard_percentage > 0) && (
                    <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5">
                      <p className="text-[#2bc196] text-[11px] font-semibold uppercase tracking-wider mb-3">Por Bandeira</p>
                      <div className="space-y-2.5">
                        <PercentageBar label="Visa" value={data.visa_percentage} />
                        <PercentageBar label="Mastercard" value={data.mastercard_percentage} />
                        <PercentageBar label="Amex" value={data.amex_percentage} />
                        <PercentageBar label="Outras" value={data.other_brands_percentage} />
                      </div>
                    </div>
                  )}
                  {!data.credit_percentage && !data.visa_percentage && (
                    <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-8 text-center">
                      <p className="text-white/30 text-sm">Nenhuma distribuição informada</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'partner' && (
              <div>
                <h3 className="text-white font-semibold text-sm mb-4 flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-[#2bc196]/15 flex items-center justify-center"><span className="text-[#2bc196] text-[10px] font-bold">5</span></div>
                  Parceiro de Pagamento Atual
                </h3>
                {data.has_current_partner ? (
                  <div className="space-y-4">
                    <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-5 h-5 rounded bg-[#2bc196]/20 flex items-center justify-center">
                          <span className="text-[#2bc196] text-[10px]">✓</span>
                        </div>
                        <p className="text-[#2bc196] text-sm font-medium">Possui parceiro atual</p>
                      </div>
                      <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                        <DetailField label="Taxa Atual (%)" value={data.current_rate_percentage ? `${data.current_rate_percentage}%` : null} />
                        <DetailField label="Fee Fixo Atual (USD)" value={data.current_fixed_fee ? `$${data.current_fixed_fee}` : null} />
                      </div>
                    </div>
                    {data.other_current_fees?.length > 0 && (
                      <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5">
                        <p className="text-[#2bc196] text-[11px] font-semibold uppercase tracking-wider mb-3">Outras Taxas do Parceiro</p>
                        <div className="space-y-2">
                          {data.other_current_fees.map((fee, idx) => (
                            <div key={idx} className="flex items-center justify-between py-2 border-b border-white/[0.04] last:border-0">
                              <span className="text-white/60 text-sm">{fee.name}</span>
                              <span className="text-white text-sm font-medium">
                                {fee.fee_type === 'percentage' ? `${fee.value}%` : `$${fee.value}`}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-8 text-center">
                    <p className="text-white/30 text-sm">Não possui parceiro de pagamento atual</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'settlement' && (
              <div>
                <h3 className="text-white font-semibold text-sm mb-4 flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-[#2bc196]/15 flex items-center justify-center"><span className="text-[#2bc196] text-[10px] font-bold">6</span></div>
                  Expectativas de Liquidação
                </h3>
                <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5">
                  <DetailField label="Prazo de Recebimento Esperado" value={data.expected_settlement_days || 'Não informado'} />
                </div>
              </div>
            )}

            {activeTab === 'markets' && (
              <div>
                <h3 className="text-white font-semibold text-sm mb-4 flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-[#2bc196]/15 flex items-center justify-center"><span className="text-[#2bc196] text-[10px] font-bold">7</span></div>
                  Mercados Alvo
                </h3>
                <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-5">
                  {data.target_markets?.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {data.target_markets.map((m, i) => (
                        <Badge key={i} className="bg-[#2bc196]/10 text-[#2bc196] border border-[#2bc196]/20 text-xs px-3 py-1">{m}</Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-white/30 text-sm">Nenhum mercado alvo informado</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}