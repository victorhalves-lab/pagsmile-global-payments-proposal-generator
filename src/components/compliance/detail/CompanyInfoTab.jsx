import React from 'react';
import DetailField from './DetailField';
import SectionHeader from './SectionHeader';
import { Building2, Users, UserCheck, Phone, Globe, ShieldCheck, Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';

function PersonCard({ title, children }) {
  return (
    <div className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-3">
      <p className="text-[#2bc196] text-[11px] font-semibold uppercase tracking-wider mb-2">{title}</p>
      <div className="grid grid-cols-2 gap-x-4 gap-y-2">{children}</div>
    </div>
  );
}

function ContactBlock({ title, name, email, extra }) {
  if (!name && !email) return null;
  return (
    <div className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-3">
      <p className="text-[#2bc196] text-[11px] font-semibold uppercase tracking-wider mb-2">{title}</p>
      <div className="space-y-1">
        {name && <p className="text-white text-sm">{name}</p>}
        {email && <p className="text-white/60 text-xs">{email}</p>}
        {extra && <p className="text-white/40 text-xs">{extra}</p>}
      </div>
    </div>
  );
}

function ComplianceAnswer({ question, value, detail }) {
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-white/[0.04] last:border-0">
      <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${value ? 'bg-red-500/20' : 'bg-green-500/20'}`}>
        <span className={`text-[10px] font-bold ${value ? 'text-red-400' : 'text-green-400'}`}>
          {value ? '!' : '✓'}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white/70 text-xs leading-relaxed">{question}</p>
        {value && detail && (
          <p className="text-yellow-400/70 text-xs mt-1 bg-yellow-500/5 p-2 rounded">{detail}</p>
        )}
      </div>
      <Badge className={`shrink-0 text-[10px] ${value ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
        {value ? 'Sim' : 'Não'}
      </Badge>
    </div>
  );
}

export default function CompanyInfoTab({ data }) {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      {/* Section 1: Company Info */}
      <div>
        <SectionHeader step="1" title={t('compliance.companyInfo')} />
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4">
          <div className="grid grid-cols-2 gap-x-6 gap-y-3">
            <DetailField label={t('compliance.legalName')} value={data.legal_business_name} />
            <DetailField label={t('compliance.tradeName')} value={data.trade_name_dba} />
            <DetailField label={t('compliance.country')} value={data.registered_country} />
            <DetailField label={t('compliance.companyType')} value={data.company_type} />
            <DetailField label={t('compliance.address')} value={data.registered_business_address} fullWidth />
            {data.physical_office_address && (
              <DetailField label={t('compliance.physicalAddress') || 'Endereço Físico'} value={data.physical_office_address} fullWidth />
            )}
            <DetailField label={t('compliance.businessNature')} value={data.business_nature} />
            <DetailField label={t('compliance.website')} value={data.corporate_website} />
            <DetailField label={t('compliance.monthlyVolume')} value={data.estimated_monthly_volume_usd ? `US$ ${data.estimated_monthly_volume_usd.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : null} />
            <DetailField label={t('compliance.avgTransaction')} value={data.estimated_avg_transaction_usd ? `US$ ${data.estimated_avg_transaction_usd.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : null} />
            <DetailField label={t('compliance.yearsInBusiness')} value={data.years_in_business ? `${data.years_in_business} anos` : null} />
            <DetailField label={t('compliance.taxRegistration')} value={data.tax_registration_number} />
            <DetailField label={t('compliance.applyingFor')} value={data.applying_for} />
            <DetailField label={t('compliance.paymentDirection')} value={data.payment_direction} />
            {data.regulatory_licenses && <DetailField label="Licenças Regulatórias" value={data.regulatory_licenses} fullWidth />}
          </div>
        </div>
      </div>

      {/* Section 2: UBOs */}
      {data.ubos?.length > 0 && (
        <div>
          <SectionHeader step="2" title={t('compliance.ubosSection') || t('compliance.ubosTitle')} />
          <div className="space-y-2">
            {data.ubos.map((u, i) => (
              <PersonCard key={i} title={`${t('compliance.uboLabel') || 'UBO'} #${i + 1}`}>
                <DetailField label={t('compliance.uboNameLabel') || 'Nome'} value={u.name} />
                <DetailField label={t('compliance.uboNationalityLabel') || 'Nacionalidade'} value={u.nationality} />
                <DetailField label={t('compliance.uboAddressLabel') || 'Endereço'} value={u.address} />
                <DetailField label={t('compliance.uboOwnershipLabel') || '% Participação'} value={u.ownership_percentage ? `${u.ownership_percentage}%` : null} />
              </PersonCard>
            ))}
          </div>
        </div>
      )}

      {/* Section 3: Directors */}
      <div>
        <SectionHeader step="3" title={t('compliance.directorsSection') || t('compliance.directorsTitle')} />
        {data.directors_same_as_ubos ? (
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded bg-[#2bc196]/20 flex items-center justify-center">
                <span className="text-[#2bc196] text-[10px]">✓</span>
              </div>
              <p className="text-white/50 text-sm italic">{t('compliance.directorsSameAsUbos')}</p>
            </div>
          </div>
        ) : data.directors?.length > 0 ? (
          <div className="space-y-2">
            {data.directors.map((d, i) => (
              <PersonCard key={i} title={`${t('compliance.directorLabel') || 'Diretor'} #${i + 1}`}>
                <DetailField label={t('compliance.dirJobTitleLabel') || 'Cargo'} value={d.job_title} />
                <DetailField label="Nome" value={`${d.first_name || ''} ${d.last_name || ''}`.trim()} />
              </PersonCard>
            ))}
          </div>
        ) : (
          <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4">
            <p className="text-white/30 text-sm">Nenhum diretor informado</p>
          </div>
        )}
      </div>

      {/* Section 4: Contacts */}
      <div>
        <SectionHeader step="4" title={t('compliance.contacts')} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          <ContactBlock
            title={t('compliance.accounting')}
            name={data.accounting_contact_name}
            email={data.accounting_contact_email}
            extra={data.accounting_invoice_address}
          />
          <ContactBlock
            title={t('compliance.support')}
            name={data.support_contact_name}
            email={data.support_contact_email}
            extra={data.support_contact_phone}
          />
          <ContactBlock
            title={t('compliance.complianceContact')}
            name={data.compliance_contact_name}
            email={data.compliance_contact_email}
          />
        </div>
      </div>

      {/* Section 5: Application */}
      <div>
        <SectionHeader step="5" title={t('compliance.application')} />
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4 space-y-3">
          {data.application_regions?.length > 0 && (
            <div>
              <p className="text-white/40 text-[11px] font-medium uppercase tracking-wider mb-2">{t('compliance.regions')}</p>
              <div className="flex flex-wrap gap-1.5">
                {data.application_regions.map((r, i) => (
                  <Badge key={i} className="bg-[#2bc196]/10 text-[#2bc196] border border-[#2bc196]/20 text-xs">{r}</Badge>
                ))}
              </div>
            </div>
          )}
          {data.payment_methods?.length > 0 && (
            <div>
              <p className="text-white/40 text-[11px] font-medium uppercase tracking-wider mb-2">{t('compliance.paymentMethods')}</p>
              <div className="flex flex-wrap gap-1.5">
                {data.payment_methods.map((m, i) => (
                  <Badge key={i} className="bg-white/5 text-white/70 border border-white/10 text-xs">{m}</Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Section 6: Compliance */}
      <div>
        <SectionHeader step="6" title={t('compliance.complianceAnswers')} />
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4">
          <ComplianceAnswer question={t('compliance.q1')} value={data.q_sanctions_list} detail={data.q_sanctions_list_detail} />
          <ComplianceAnswer question={t('compliance.q2')} value={data.q_pep} detail={data.q_pep_detail} />
          <ComplianceAnswer question={t('compliance.q3')} value={data.q_sanctioned_country} detail={data.q_sanctioned_country_detail} />
          <ComplianceAnswer question={t('compliance.q4')} value={data.q_sanctioned_ownership} detail={data.q_sanctioned_ownership_detail} />
          <ComplianceAnswer question={t('compliance.q5')} value={data.q_pagsmile_dealings} detail={data.q_pagsmile_dealings_detail} />
          <ComplianceAnswer question={t('compliance.q6')} value={data.q_value_exchange} detail={data.q_value_exchange_detail} />
        </div>
      </div>

      {/* Section 7: Certification */}
      <div>
        <SectionHeader step="7" title={t('compliance.certification')} />
        <div className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4">
          <div className="grid grid-cols-2 gap-x-6 gap-y-3">
            <DetailField label={t('compliance.certifier')} value={data.certifier_name} />
            <DetailField label={t('compliance.jobTitle')} value={data.certifier_job_title} />
            <DetailField label={t('compliance.emailLabel')} value={data.certifier_email} />
            <DetailField label={t('compliance.dateLabel')} value={data.certification_date} />
          </div>
        </div>
      </div>
    </div>
  );
}