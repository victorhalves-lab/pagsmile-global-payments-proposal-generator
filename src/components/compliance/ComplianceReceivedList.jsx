import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Search, Eye, Building2, FileText, ExternalLink, Loader2 } from 'lucide-react';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

function DocLink({ label, url }) {
  if (!url) return null;
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-[#2bc196] hover:underline p-2 bg-[#2bc196]/10 rounded-lg">
      <FileText className="h-4 w-4" />
      <span>{label}</span>
      <ExternalLink className="h-3 w-3 ml-auto" />
    </a>
  );
}

function DetailSection({ title, children }) {
  return (
    <div className="space-y-2">
      <h4 className="text-sm font-semibold text-[#2bc196] uppercase tracking-wider">{title}</h4>
      <div className="bg-[#002443]/50 rounded-lg p-3 space-y-1">{children}</div>
    </div>
  );
}

function DetailRow({ label, value }) {
  if (!value) return null;
  return (
    <div className="flex justify-between text-sm">
      <span className="text-white/50">{label}</span>
      <span className="text-white">{typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value}</span>
    </div>
  );
}

export default function ComplianceReceivedList() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const { t } = useTranslation();

  const STATUS_COLORS = {
    pending: 'bg-yellow-500/20 text-yellow-400',
    submitted: 'bg-blue-500/20 text-blue-400',
    in_review: 'bg-purple-500/20 text-purple-400',
    approved: 'bg-green-500/20 text-green-400',
    rejected: 'bg-red-500/20 text-red-400',
  };

  const statusLabel = (s) => t(`compliance.status${s?.charAt(0).toUpperCase()}${s?.slice(1)?.replace('_', '')}`) || s;

  const { data: questionnaires = [], isLoading } = useQuery({
    queryKey: ['compliance-questionnaires'],
    queryFn: () => base44.entities.ComplianceQuestionnaire.list('-created_date', 100),
  });

  const filtered = questionnaires.filter(q =>
    (q.legal_business_name || '').toLowerCase().includes(search.toLowerCase()) ||
    (q.certifier_name || '').toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) {
    return <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 text-[#2bc196] animate-spin" /></div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
          <Input
            placeholder={t('compliance.searchPlaceholder')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-white/30"
          />
        </div>
        <Badge className="bg-white/10 text-white/60">{filtered.length} {t('compliance.records')}</Badge>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-12 text-white/40">{t('compliance.noRecords')}</div>
      ) : (
        <div className="space-y-3">
          {filtered.map(q => (
            <div key={q.id} className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-[#2bc196]/30 transition-all">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#2bc196]/20 rounded-lg flex items-center justify-center">
                    <Building2 className="h-5 w-5 text-[#2bc196]" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{q.legal_business_name || 'Unnamed'}</h3>
                    <p className="text-white/40 text-xs">{q.registered_country} · {q.business_nature}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={STATUS_COLORS[q.status] || STATUS_COLORS.pending}>
                    {statusLabel(q.status)}
                  </Badge>
                  <span className="text-white/30 text-xs">{moment(q.created_date).format('DD/MM/YYYY')}</span>
                  <Button variant="ghost" size="sm" onClick={() => setSelected(q)} className="text-[#2bc196] hover:text-[#2bc196]/80">
                    <Eye className="h-4 w-4 mr-1" /> {t('common.view')}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-[#002443] border-white/10 text-white">
          <DialogHeader>
            <DialogTitle className="text-white">{selected?.legal_business_name}</DialogTitle>
          </DialogHeader>
          {selected && (
            <div className="space-y-4">
              <DetailSection title={t('compliance.companyInfo')}>
                <DetailRow label={t('compliance.legalName')} value={selected.legal_business_name} />
                <DetailRow label={t('compliance.tradeName')} value={selected.trade_name_dba} />
                <DetailRow label={t('compliance.address')} value={selected.registered_business_address} />
                <DetailRow label={t('compliance.country')} value={selected.registered_country} />
                <DetailRow label={t('compliance.businessNature')} value={selected.business_nature} />
                <DetailRow label={t('compliance.companyType')} value={selected.company_type} />
                <DetailRow label={t('compliance.website')} value={selected.corporate_website} />
                <DetailRow label={t('compliance.monthlyVolume')} value={selected.estimated_monthly_volume_usd?.toLocaleString()} />
                <DetailRow label={t('compliance.avgTransaction')} value={selected.estimated_avg_transaction_usd?.toLocaleString()} />
                <DetailRow label={t('compliance.yearsInBusiness')} value={selected.years_in_business} />
                <DetailRow label={t('compliance.taxRegistration')} value={selected.tax_registration_number} />
                <DetailRow label={t('compliance.applyingFor')} value={selected.applying_for} />
                <DetailRow label={t('compliance.paymentDirection')} value={selected.payment_direction} />
              </DetailSection>

              {selected.ubos?.length > 0 && (
                <DetailSection title={t('compliance.ubosTitle')}>
                  {selected.ubos.map((u, i) => (
                    <div key={i} className="text-sm text-white/70 border-b border-white/5 pb-1 mb-1">
                      {u.name} — {u.nationality} — {u.ownership_percentage}%
                    </div>
                  ))}
                </DetailSection>
              )}

              {selected.directors?.length > 0 && (
                <DetailSection title={t('compliance.directorsTitle')}>
                  {selected.directors.map((d, i) => (
                    <div key={i} className="text-sm text-white/70 border-b border-white/5 pb-1 mb-1">
                      {d.job_title}: {d.first_name} {d.last_name}
                    </div>
                  ))}
                </DetailSection>
              )}

              <DetailSection title={t('compliance.contacts')}>
                <DetailRow label={t('compliance.accounting')} value={`${selected.accounting_contact_name || ''} — ${selected.accounting_contact_email || ''}`} />
                <DetailRow label={t('compliance.support')} value={`${selected.support_contact_name || ''} — ${selected.support_contact_email || ''}`} />
                <DetailRow label={t('compliance.complianceContact')} value={`${selected.compliance_contact_name || ''} — ${selected.compliance_contact_email || ''}`} />
              </DetailSection>

              <DetailSection title={t('compliance.application')}>
                <DetailRow label={t('compliance.regions')} value={selected.application_regions?.join(', ')} />
                <DetailRow label={t('compliance.paymentMethods')} value={selected.payment_methods?.join(', ')} />
              </DetailSection>

              <DetailSection title={t('compliance.complianceAnswers')}>
                <DetailRow label={t('compliance.sanctionsList')} value={selected.q_sanctions_list} />
                {selected.q_sanctions_list_detail && <DetailRow label={`  ${t('compliance.detail')}`} value={selected.q_sanctions_list_detail} />}
                <DetailRow label={t('compliance.pep')} value={selected.q_pep} />
                {selected.q_pep_detail && <DetailRow label={`  ${t('compliance.detail')}`} value={selected.q_pep_detail} />}
                <DetailRow label={t('compliance.sanctionedCountry')} value={selected.q_sanctioned_country} />
                <DetailRow label={t('compliance.sanctionedOwnership')} value={selected.q_sanctioned_ownership} />
                <DetailRow label={t('compliance.pagsmileDealings')} value={selected.q_pagsmile_dealings} />
                <DetailRow label={t('compliance.valueExchange')} value={selected.q_value_exchange} />
              </DetailSection>

              <DetailSection title={t('compliance.documents')}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <DocLink label={t('compliance.corpDocuments')} url={selected.doc_corp_documents_url} />
                  <DocLink label={t('compliance.bankStatement')} url={selected.doc_bank_statement_url} />
                  {selected.doc_ids?.filter(d => d.file_url).map((d, i) => (
                    <DocLink key={`id-${i}`} label={`ID: ${d.name || `#${i+1}`}`} url={d.file_url} />
                  ))}
                  {selected.doc_address_proofs?.filter(d => d.file_url).map((d, i) => (
                    <DocLink key={`addr-${i}`} label={`${t('compliance.address')}: ${d.name || `#${i+1}`}`} url={d.file_url} />
                  ))}
                  <DocLink label={t('compliance.companyAddressProof')} url={selected.doc_company_address_proof_url} />
                  <DocLink label={t('compliance.pilotLlc')} url={selected.doc_pilot_llc_url} />
                  <DocLink label={t('compliance.license')} url={selected.doc_license_url} />
                  <DocLink label={t('compliance.ownershipChart')} url={selected.doc_ownership_chart_url} />
                </div>
              </DetailSection>

              <DetailSection title={t('compliance.certification')}>
                <DetailRow label={t('compliance.certifier')} value={selected.certifier_name} />
                <DetailRow label={t('compliance.jobTitle')} value={selected.certifier_job_title} />
                <DetailRow label={t('compliance.emailLabel')} value={selected.certifier_email} />
                <DetailRow label={t('compliance.dateLabel')} value={selected.certification_date} />
              </DetailSection>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}