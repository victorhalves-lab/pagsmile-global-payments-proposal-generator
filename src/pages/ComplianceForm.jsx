import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useMutation } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Building2, Users, UserCheck, ShieldCheck, FileText,
  Globe, Phone, CheckCircle, Loader2, AlertTriangle, Send,
  Store, Network, ArrowLeftRight, ArrowDownToLine, ArrowUpFromLine, ArrowRightLeft
} from 'lucide-react';
import { toast } from 'sonner';
import ComplianceFormSection from '@/components/compliance/ComplianceFormSection';
import FileUploadField from '@/components/compliance/FileUploadField';
import ComplianceYesNo from '@/components/compliance/ComplianceYesNo';
import DynamicPersonList from '@/components/compliance/DynamicPersonList';
import SelectionButton from '@/components/compliance/SelectionButton';
import RegionSelector from '@/components/compliance/RegionSelector';
import PaymentMethodSelector from '@/components/compliance/PaymentMethodSelector';
import { useTranslation } from 'react-i18next';
import '@/components/i18n/i18n';
import LanguageSelector from '@/components/i18n/LanguageSelector';

const Q_KEYS = ['q_sanctions_list', 'q_pep', 'q_sanctioned_country', 'q_sanctioned_ownership', 'q_pagsmile_dealings', 'q_value_exchange'];

const initialForm = {
  applying_for: '', payment_direction: '',
  legal_business_name: '', trade_name_dba: '', registered_business_address: '', physical_office_address: '',
  registered_country: '', corporate_website: '', onboarding_product_url: '', business_nature: '',
  regulatory_licenses: '', estimated_monthly_volume_usd: '', estimated_avg_transaction_usd: '',
  countries_of_operation: '', years_in_business: '', tax_registration_number: '', company_type: '',
  ubos: [{ name: '', nationality: '', address: '', ownership_percentage: '' }],
  directors: [{ job_title: '', first_name: '', last_name: '' }],
  accounting_contact_name: '', accounting_contact_email: '', accounting_invoice_address: '',
  support_contact_name: '', support_contact_email: '', support_contact_phone: '',
  compliance_contact_name: '', compliance_contact_email: '',
  application_regions: [], payment_methods: [],
  q_sanctions_list: null, q_sanctions_list_detail: '',
  q_pep: null, q_pep_detail: '',
  q_sanctioned_country: null, q_sanctioned_country_detail: '',
  q_sanctioned_ownership: null, q_sanctioned_ownership_detail: '',
  q_pagsmile_dealings: null, q_pagsmile_dealings_detail: '',
  q_value_exchange: null, q_value_exchange_detail: '',
  doc_corp_documents_url: '', doc_bank_statement_url: '', doc_directors_id_url: '',
  doc_ubos_id_url: '', doc_dd_form_url: '', doc_aml_questionnaire_url: '',
  doc_license_url: '', doc_ownership_chart_url: '',
  certifier_name: '', certifier_job_title: '', certifier_email: '', certification_date: ''
};

export default function ComplianceForm() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const { t } = useTranslation();

  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');

  const mutation = useMutation({
    mutationFn: (data) => base44.entities.ComplianceQuestionnaire.create(data),
    onSuccess: () => setSubmitted(true),
  });

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const DOC_KEYS = [
    'doc_corp_documents_url', 'doc_bank_statement_url', 'doc_directors_id_url',
    'doc_ubos_id_url', 'doc_dd_form_url', 'doc_aml_questionnaire_url',
    'doc_license_url', 'doc_ownership_chart_url'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all compliance questions answered
    const unansweredQuestions = Q_KEYS.some(k => form[k] === null);
    if (unansweredQuestions) {
      toast.error(t('compliance.validationQuestions'));
      return;
    }

    // Validate all documents uploaded
    const missingDocs = DOC_KEYS.some(k => !form[k]);
    if (missingDocs) {
      toast.error(t('compliance.validationDocuments'));
      return;
    }

    const payload = {
      ...form,
      estimated_monthly_volume_usd: parseFloat(form.estimated_monthly_volume_usd) || 0,
      estimated_avg_transaction_usd: parseFloat(form.estimated_avg_transaction_usd) || 0,
      years_in_business: parseFloat(form.years_in_business) || 0,
      status: 'submitted',
      public_link_token: token || '',
      certification_date: form.certification_date || new Date().toISOString().split('T')[0],
    };
    mutation.mutate(payload);
  };

  const COMPLIANCE_QUESTIONS = [
    t('compliance.q1'), t('compliance.q2'), t('compliance.q3'),
    t('compliance.q4'), t('compliance.q5'), t('compliance.q6')
  ];

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#002443] flex items-center justify-center p-4">
        <div className="relative text-center max-w-lg">
          <div className="absolute inset-0 bg-[#2bc196]/5 blur-[100px] rounded-full" />
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-[#2bc196] to-[#1a8a6a] rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-[#2bc196]/30 rotate-3">
              <CheckCircle className="h-12 w-12 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">{t('compliance.successTitle')}</h2>
            <p className="text-white/50 leading-relaxed">{t('compliance.successMessage')}</p>
          </div>
        </div>
      </div>
    );
  }

  const inputCls = "bg-white/5 border-white/[0.12] text-white placeholder:text-white/25 rounded-xl focus:border-[#2bc196]/50 h-11";

  return (
    <div className="min-h-screen bg-[#002443]">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#2bc196]/[0.03] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#2bc196]/[0.02] rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-4xl mx-auto py-8 px-4 md:px-8">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-10">
          <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_68351d4d439cb9574d90dc86/807e8736c_Logo-modo-escuro.png" alt="Pagsmile" className="h-10" />
          <LanguageSelector />
        </div>

        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2bc196]/10 border border-[#2bc196]/20 mb-6">
            <ShieldCheck className="h-4 w-4 text-[#2bc196]" />
            <span className="text-[#2bc196] text-xs font-semibold tracking-wider uppercase">KYC / Compliance</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">{t('compliance.formTitle')}</h1>
          <p className="text-white/40 max-w-2xl mx-auto text-sm leading-relaxed">{t('compliance.formSubtitle')}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">

          {/* 1 — Applying For & Payment Direction */}
          <ComplianceFormSection icon={Building2} title={t('compliance.clientCompanyInfo')} step="1">
            {/* Applying For */}
            <div className="mb-6">
              <label className="text-white/50 text-xs font-semibold tracking-wider uppercase mb-3 block">{t('compliance.applyingForLabel')}</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <SelectionButton
                  label={t('compliance.merchant')}
                  description={t('compliance.merchantDesc')}
                  icon={Store}
                  selected={form.applying_for === 'Merchant'}
                  onClick={() => update('applying_for', 'Merchant')}
                />
                <SelectionButton
                  label={t('compliance.masterMerchantShort')}
                  description={t('compliance.masterMerchantDesc')}
                  icon={Network}
                  selected={form.applying_for === 'Master Merchant (PSP License Required)'}
                  onClick={() => update('applying_for', 'Master Merchant (PSP License Required)')}
                />
                <SelectionButton
                  label={t('compliance.introducer')}
                  description={t('compliance.introducerDesc')}
                  icon={ArrowLeftRight}
                  selected={form.applying_for === 'Introducer'}
                  onClick={() => update('applying_for', 'Introducer')}
                />
              </div>
            </div>

            {/* Payment Direction */}
            <div className="mb-6">
              <label className="text-white/50 text-xs font-semibold tracking-wider uppercase mb-3 block">{t('compliance.paymentDirectionLabel')}</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <SelectionButton
                  label={t('compliance.payIn')}
                  description={t('compliance.payInDesc')}
                  icon={ArrowDownToLine}
                  selected={form.payment_direction === 'Pay-in'}
                  onClick={() => update('payment_direction', 'Pay-in')}
                />
                <SelectionButton
                  label={t('compliance.payOut')}
                  description={t('compliance.payOutDesc')}
                  icon={ArrowUpFromLine}
                  selected={form.payment_direction === 'Pay-out'}
                  onClick={() => update('payment_direction', 'Pay-out')}
                />
                <SelectionButton
                  label={t('compliance.both')}
                  description={t('compliance.bothDesc')}
                  icon={ArrowRightLeft}
                  selected={form.payment_direction === 'Both'}
                  onClick={() => update('payment_direction', 'Both')}
                />
              </div>
            </div>

            {/* Company Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-white/50 text-xs font-medium mb-1.5 block">{t('compliance.legalBusinessName')}</label>
                <Input value={form.legal_business_name} onChange={(e) => update('legal_business_name', e.target.value)} className={inputCls} required />
              </div>
              <div>
                <label className="text-white/50 text-xs font-medium mb-1.5 block">{t('compliance.tradeNameDba')}</label>
                <Input value={form.trade_name_dba} onChange={(e) => update('trade_name_dba', e.target.value)} className={inputCls} />
              </div>
              <div className="md:col-span-2">
                <label className="text-white/50 text-xs font-medium mb-1.5 block">{t('compliance.registeredAddress')}</label>
                <Input value={form.registered_business_address} onChange={(e) => update('registered_business_address', e.target.value)} className={inputCls} required />
              </div>
              <div className="md:col-span-2">
                <label className="text-white/50 text-xs font-medium mb-1.5 block">{t('compliance.physicalAddress')}</label>
                <Input value={form.physical_office_address} onChange={(e) => update('physical_office_address', e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className="text-white/50 text-xs font-medium mb-1.5 block">{t('compliance.registeredCountry')}</label>
                <Input value={form.registered_country} onChange={(e) => update('registered_country', e.target.value)} className={inputCls} required />
              </div>
              <div>
                <label className="text-white/50 text-xs font-medium mb-1.5 block">{t('compliance.corporateWebsite')}</label>
                <Input value={form.corporate_website} onChange={(e) => update('corporate_website', e.target.value)} className={inputCls} placeholder="https://..." />
              </div>
              <div>
                <label className="text-white/50 text-xs font-medium mb-1.5 block">{t('compliance.onboardingProduct')}</label>
                <Input value={form.onboarding_product_url} onChange={(e) => update('onboarding_product_url', e.target.value)} className={inputCls} placeholder={t('compliance.onboardingProductPlaceholder')} />
              </div>
              <div>
                <label className="text-white/50 text-xs font-medium mb-1.5 block">{t('compliance.businessNatureLabel')}</label>
                <Input value={form.business_nature} onChange={(e) => update('business_nature', e.target.value)} className={inputCls} required />
              </div>
              <div className="md:col-span-2">
                <label className="text-white/50 text-xs font-medium mb-1.5 block">{t('compliance.regulatoryLicenses')}</label>
                <Textarea value={form.regulatory_licenses} onChange={(e) => update('regulatory_licenses', e.target.value)} className={inputCls + " h-20 py-3"} placeholder={t('compliance.regulatoryPlaceholder')} />
              </div>
              <div>
                <label className="text-white/50 text-xs font-medium mb-1.5 block">{t('compliance.estMonthlyVolume')}</label>
                <Input type="number" value={form.estimated_monthly_volume_usd} onChange={(e) => update('estimated_monthly_volume_usd', e.target.value)} className={inputCls} placeholder="0" />
              </div>
              <div>
                <label className="text-white/50 text-xs font-medium mb-1.5 block">{t('compliance.estAvgTransaction')}</label>
                <Input type="number" value={form.estimated_avg_transaction_usd} onChange={(e) => update('estimated_avg_transaction_usd', e.target.value)} className={inputCls} placeholder="0" />
              </div>
              <div>
                <label className="text-white/50 text-xs font-medium mb-1.5 block">{t('compliance.countriesOperate')}</label>
                <Input value={form.countries_of_operation} onChange={(e) => update('countries_of_operation', e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className="text-white/50 text-xs font-medium mb-1.5 block">{t('compliance.yearsInBusinessLabel')}</label>
                <Input type="number" value={form.years_in_business} onChange={(e) => update('years_in_business', e.target.value)} className={inputCls} placeholder="0" />
              </div>
              <div>
                <label className="text-white/50 text-xs font-medium mb-1.5 block">{t('compliance.taxRegNumber')}</label>
                <Input value={form.tax_registration_number} onChange={(e) => update('tax_registration_number', e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className="text-white/50 text-xs font-medium mb-1.5 block">{t('compliance.companyTypeLabel')}</label>
                <Input value={form.company_type} onChange={(e) => update('company_type', e.target.value)} className={inputCls} placeholder={t('compliance.companyTypePlaceholder')} />
              </div>
            </div>
          </ComplianceFormSection>

          {/* 2 — UBOs */}
          <ComplianceFormSection icon={Users} title={t('compliance.ubosSection')} subtitle={t('compliance.ubosSubtitle')} step="2">
            <DynamicPersonList items={form.ubos} onChange={(v) => update('ubos', v)} type="ubo" />
          </ComplianceFormSection>

          {/* 3 — Directors */}
          <ComplianceFormSection icon={UserCheck} title={t('compliance.directorsSection')} subtitle={t('compliance.directorsSubtitle')} step="3">
            <DynamicPersonList items={form.directors} onChange={(v) => update('directors', v)} type="director" />
          </ComplianceFormSection>

          {/* 4 — Contacts */}
          <ComplianceFormSection icon={Phone} title={t('compliance.mandatoryContacts')} step="4">
            <div className="space-y-5">
              <div>
                <p className="text-[#2bc196] text-xs font-semibold tracking-wider uppercase mb-3">{t('compliance.accountingContact')}</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Input placeholder={t('compliance.namePlaceholder')} value={form.accounting_contact_name} onChange={(e) => update('accounting_contact_name', e.target.value)} className={inputCls} />
                  <Input placeholder={t('compliance.emailPlaceholder')} value={form.accounting_contact_email} onChange={(e) => update('accounting_contact_email', e.target.value)} className={inputCls} />
                  <Input placeholder={t('compliance.invoicePlaceholder')} value={form.accounting_invoice_address} onChange={(e) => update('accounting_invoice_address', e.target.value)} className={inputCls} />
                </div>
              </div>
              <div>
                <p className="text-[#2bc196] text-xs font-semibold tracking-wider uppercase mb-3">{t('compliance.supportContact')}</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Input placeholder={t('compliance.namePlaceholder')} value={form.support_contact_name} onChange={(e) => update('support_contact_name', e.target.value)} className={inputCls} />
                  <Input placeholder={t('compliance.emailPlaceholder')} value={form.support_contact_email} onChange={(e) => update('support_contact_email', e.target.value)} className={inputCls} />
                  <Input placeholder={t('compliance.phonePlaceholder')} value={form.support_contact_phone} onChange={(e) => update('support_contact_phone', e.target.value)} className={inputCls} />
                </div>
              </div>
              <div>
                <p className="text-[#2bc196] text-xs font-semibold tracking-wider uppercase mb-3">{t('compliance.complianceDisputesContact')}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Input placeholder={t('compliance.namePlaceholder')} value={form.compliance_contact_name} onChange={(e) => update('compliance_contact_name', e.target.value)} className={inputCls} />
                  <Input placeholder={t('compliance.emailPlaceholder')} value={form.compliance_contact_email} onChange={(e) => update('compliance_contact_email', e.target.value)} className={inputCls} />
                </div>
              </div>
            </div>
          </ComplianceFormSection>

          {/* 5 — Application: Regions & Payment Methods */}
          <ComplianceFormSection icon={Globe} title={t('compliance.applicationSection')} subtitle={t('compliance.applicationSubtitle')} step="5">
            <div className="space-y-6">
              <div>
                <label className="text-white/50 text-xs font-semibold tracking-wider uppercase mb-3 block">{t('compliance.regionsLabel')}</label>
                <RegionSelector selected={form.application_regions} onChange={(v) => update('application_regions', v)} />
              </div>
              <div className="border-t border-white/[0.06] pt-5">
                <label className="text-white/50 text-xs font-semibold tracking-wider uppercase mb-3 block">{t('compliance.paymentMethodsLabel')}</label>
                <PaymentMethodSelector selected={form.payment_methods} onChange={(v) => update('payment_methods', v)} />
              </div>
            </div>
            <div className="mt-5 p-4 bg-yellow-500/[0.06] border border-yellow-500/20 rounded-xl">
              <p className="text-yellow-400/70 text-xs flex items-start gap-2.5 leading-relaxed">
                <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5 text-yellow-500/60" />
                {t('compliance.licenseWarning')}
              </p>
            </div>
          </ComplianceFormSection>

          {/* 6 — Compliance Questions */}
          <ComplianceFormSection icon={ShieldCheck} title={t('compliance.complianceQuestions')} step="6">
            <div className="space-y-3">
              {COMPLIANCE_QUESTIONS.map((q, i) => (
                <ComplianceYesNo
                  key={i}
                  question={q}
                  value={form[Q_KEYS[i]]}
                  detail={form[Q_KEYS[i] + '_detail']}
                  onValueChange={(v) => update(Q_KEYS[i], v)}
                  onDetailChange={(v) => update(Q_KEYS[i] + '_detail', v)}
                />
              ))}
            </div>
          </ComplianceFormSection>

          {/* 7 — Required Documents */}
          <ComplianceFormSection icon={FileText} title={t('compliance.requiredDocuments')} step="7">
            <div className="space-y-3">
              <FileUploadField label={t('compliance.docCorpLabel')} description={t('compliance.docCorpDesc')} value={form.doc_corp_documents_url} onChange={(v) => update('doc_corp_documents_url', v)} />
              <FileUploadField label={t('compliance.docBankLabel')} description={t('compliance.docBankDesc')} value={form.doc_bank_statement_url} onChange={(v) => update('doc_bank_statement_url', v)} />
              <FileUploadField label={t('compliance.docDirectorsLabel')} value={form.doc_directors_id_url} onChange={(v) => update('doc_directors_id_url', v)} />
              <FileUploadField label={t('compliance.docUbosLabel')} value={form.doc_ubos_id_url} onChange={(v) => update('doc_ubos_id_url', v)} />
              <FileUploadField label={t('compliance.docDdLabel')} value={form.doc_dd_form_url} onChange={(v) => update('doc_dd_form_url', v)} />
              <FileUploadField label={t('compliance.docAmlLabel')} value={form.doc_aml_questionnaire_url} onChange={(v) => update('doc_aml_questionnaire_url', v)} />
              <FileUploadField label={t('compliance.docLicenseLabel')} value={form.doc_license_url} onChange={(v) => update('doc_license_url', v)} />
              <FileUploadField label={t('compliance.docOwnershipLabel')} value={form.doc_ownership_chart_url} onChange={(v) => update('doc_ownership_chart_url', v)} />
            </div>
          </ComplianceFormSection>

          {/* 8 — Certification */}
          <ComplianceFormSection icon={Send} title={t('compliance.certificationSection')} subtitle={t('compliance.certificationSubtitle')} step="8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-white/50 text-xs font-medium mb-1.5 block">{t('compliance.certifierName')}</label>
                <Input value={form.certifier_name} onChange={(e) => update('certifier_name', e.target.value)} className={inputCls} required />
              </div>
              <div>
                <label className="text-white/50 text-xs font-medium mb-1.5 block">{t('compliance.certifierJobTitle')}</label>
                <Input value={form.certifier_job_title} onChange={(e) => update('certifier_job_title', e.target.value)} className={inputCls} required />
              </div>
              <div>
                <label className="text-white/50 text-xs font-medium mb-1.5 block">{t('compliance.certifierEmail')}</label>
                <Input type="email" value={form.certifier_email} onChange={(e) => update('certifier_email', e.target.value)} className={inputCls} placeholder="email@company.com" required />
              </div>
            </div>
          </ComplianceFormSection>

          {/* Submit */}
          <div className="flex justify-center pt-4 pb-8">
            <Button
              type="submit"
              disabled={mutation.isPending}
              className="bg-gradient-to-r from-[#2bc196] to-[#1a8a6a] hover:from-[#35d4a5] hover:to-[#2bc196] text-white font-semibold px-16 py-7 text-lg rounded-2xl shadow-2xl shadow-[#2bc196]/30 hover:shadow-[#2bc196]/40 transition-all duration-300 hover:scale-[1.02]"
            >
              {mutation.isPending ? (
                <><Loader2 className="h-5 w-5 mr-3 animate-spin" /> {t('compliance.submitting')}</>
              ) : (
                <><Send className="h-5 w-5 mr-3" /> {t('compliance.submitButton')}</>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}