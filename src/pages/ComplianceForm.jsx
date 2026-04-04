import React, { useState } from 'react';
import { base44 } from '@/api/base44Client';
import { useMutation } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Building2, Users, UserCheck, CreditCard, ShieldCheck, FileText,
  Globe, Phone, Mail, CheckCircle, Loader2, AlertTriangle, Send
} from 'lucide-react';
import ComplianceFormSection from '@/components/compliance/ComplianceFormSection';
import FileUploadField from '@/components/compliance/FileUploadField';
import ComplianceYesNo from '@/components/compliance/ComplianceYesNo';
import DynamicPersonList from '@/components/compliance/DynamicPersonList';
import { useTranslation } from 'react-i18next';
import '@/components/i18n/i18n';
import LanguageSelector from '@/components/i18n/LanguageSelector';

const APPLICATION_REGIONS = ['Brazil', 'Mexico', 'Chile', 'Colombia', 'Peru', 'Ecuador', 'Guatemala', 'Panama', 'Costa Rica', 'Argentina'];
const PAYMENT_METHODS = ['E-wallet', 'Bank Transfer (Including PIX)', 'Cash Payment'];

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

  const toggleArrayItem = (field, item) => {
    setForm(prev => ({
      ...prev,
      [field]: prev[field].includes(item) ? prev[field].filter(i => i !== item) : [...prev[field], item]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
      <div className="min-h-screen bg-gradient-to-br from-[#001a30] via-[#002443] to-[#003366] flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-[#2bc196]/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-[#2bc196]" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">{t('compliance.successTitle')}</h2>
          <p className="text-white/60">{t('compliance.successMessage')}</p>
        </div>
      </div>
    );
  }

  const inputCls = "bg-white/5 border-white/20 text-white placeholder:text-white/30 focus:border-[#2bc196]/50";

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#001a30] via-[#002443] to-[#003366] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Language Selector */}
        <div className="flex justify-end mb-4">
          <LanguageSelector />
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_68351d4d439cb9574d90dc86/807e8736c_Logo-modo-escuro.png" alt="Pagsmile" className="h-12 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-white">{t('compliance.formTitle')}</h1>
          <p className="text-white/50 mt-2 max-w-2xl mx-auto text-sm">{t('compliance.formSubtitle')}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Client Company Information */}
          <ComplianceFormSection icon={Building2} title={t('compliance.clientCompanyInfo')}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-white/80 text-sm mb-1 block">{t('compliance.applyingForLabel')}</label>
                <Select value={form.applying_for} onValueChange={(v) => update('applying_for', v)}>
                  <SelectTrigger className={inputCls}><SelectValue placeholder={t('compliance.selectPlaceholder')} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Merchant">{t('compliance.merchant')}</SelectItem>
                    <SelectItem value="Master Merchant (PSP License Required)">{t('compliance.masterMerchant')}</SelectItem>
                    <SelectItem value="Introducer">{t('compliance.introducer')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-white/80 text-sm mb-1 block">{t('compliance.paymentDirectionLabel')}</label>
                <Select value={form.payment_direction} onValueChange={(v) => update('payment_direction', v)}>
                  <SelectTrigger className={inputCls}><SelectValue placeholder={t('compliance.selectPlaceholder')} /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pay-in">{t('compliance.payIn')}</SelectItem>
                    <SelectItem value="Pay-out">{t('compliance.payOut')}</SelectItem>
                    <SelectItem value="Both">{t('compliance.both')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-white/80 text-sm mb-1 block">{t('compliance.legalBusinessName')}</label>
                <Input value={form.legal_business_name} onChange={(e) => update('legal_business_name', e.target.value)} className={inputCls} required />
              </div>
              <div>
                <label className="text-white/80 text-sm mb-1 block">{t('compliance.tradeNameDba')}</label>
                <Input value={form.trade_name_dba} onChange={(e) => update('trade_name_dba', e.target.value)} className={inputCls} />
              </div>
              <div className="md:col-span-2">
                <label className="text-white/80 text-sm mb-1 block">{t('compliance.registeredAddress')}</label>
                <Input value={form.registered_business_address} onChange={(e) => update('registered_business_address', e.target.value)} className={inputCls} required />
              </div>
              <div className="md:col-span-2">
                <label className="text-white/80 text-sm mb-1 block">{t('compliance.physicalAddress')}</label>
                <Input value={form.physical_office_address} onChange={(e) => update('physical_office_address', e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className="text-white/80 text-sm mb-1 block">{t('compliance.registeredCountry')}</label>
                <Input value={form.registered_country} onChange={(e) => update('registered_country', e.target.value)} className={inputCls} required />
              </div>
              <div>
                <label className="text-white/80 text-sm mb-1 block">{t('compliance.corporateWebsite')}</label>
                <Input value={form.corporate_website} onChange={(e) => update('corporate_website', e.target.value)} className={inputCls} placeholder="https://..." />
              </div>
              <div>
                <label className="text-white/80 text-sm mb-1 block">{t('compliance.onboardingProduct')}</label>
                <Input value={form.onboarding_product_url} onChange={(e) => update('onboarding_product_url', e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className="text-white/80 text-sm mb-1 block">{t('compliance.businessNatureLabel')}</label>
                <Input value={form.business_nature} onChange={(e) => update('business_nature', e.target.value)} className={inputCls} required />
              </div>
              <div className="md:col-span-2">
                <label className="text-white/80 text-sm mb-1 block">{t('compliance.regulatoryLicenses')}</label>
                <Textarea value={form.regulatory_licenses} onChange={(e) => update('regulatory_licenses', e.target.value)} className={inputCls + " h-20"} placeholder={t('compliance.regulatoryPlaceholder')} />
              </div>
              <div>
                <label className="text-white/80 text-sm mb-1 block">{t('compliance.estMonthlyVolume')}</label>
                <Input type="number" value={form.estimated_monthly_volume_usd} onChange={(e) => update('estimated_monthly_volume_usd', e.target.value)} className={inputCls} placeholder="0" />
              </div>
              <div>
                <label className="text-white/80 text-sm mb-1 block">{t('compliance.estAvgTransaction')}</label>
                <Input type="number" value={form.estimated_avg_transaction_usd} onChange={(e) => update('estimated_avg_transaction_usd', e.target.value)} className={inputCls} placeholder="0" />
              </div>
              <div>
                <label className="text-white/80 text-sm mb-1 block">{t('compliance.countriesOperate')}</label>
                <Input value={form.countries_of_operation} onChange={(e) => update('countries_of_operation', e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className="text-white/80 text-sm mb-1 block">{t('compliance.yearsInBusinessLabel')}</label>
                <Input type="number" value={form.years_in_business} onChange={(e) => update('years_in_business', e.target.value)} className={inputCls} placeholder="0" />
              </div>
              <div>
                <label className="text-white/80 text-sm mb-1 block">{t('compliance.taxRegNumber')}</label>
                <Input value={form.tax_registration_number} onChange={(e) => update('tax_registration_number', e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className="text-white/80 text-sm mb-1 block">{t('compliance.companyTypeLabel')}</label>
                <Input value={form.company_type} onChange={(e) => update('company_type', e.target.value)} className={inputCls} placeholder={t('compliance.companyTypePlaceholder')} />
              </div>
            </div>
          </ComplianceFormSection>

          {/* UBOs */}
          <ComplianceFormSection icon={Users} title={t('compliance.ubosSection')} subtitle={t('compliance.ubosSubtitle')}>
            <DynamicPersonList items={form.ubos} onChange={(v) => update('ubos', v)} type="ubo" />
          </ComplianceFormSection>

          {/* Directors */}
          <ComplianceFormSection icon={UserCheck} title={t('compliance.directorsSection')} subtitle={t('compliance.directorsSubtitle')}>
            <DynamicPersonList items={form.directors} onChange={(v) => update('directors', v)} type="director" />
          </ComplianceFormSection>

          {/* Contacts */}
          <ComplianceFormSection icon={Phone} title={t('compliance.mandatoryContacts')}>
            <div className="space-y-4">
              <div>
                <p className="text-[#2bc196] text-sm font-medium mb-2">{t('compliance.accountingContact')}</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Input placeholder={t('compliance.namePlaceholder')} value={form.accounting_contact_name} onChange={(e) => update('accounting_contact_name', e.target.value)} className={inputCls} />
                  <Input placeholder={t('compliance.emailPlaceholder')} value={form.accounting_contact_email} onChange={(e) => update('accounting_contact_email', e.target.value)} className={inputCls} />
                  <Input placeholder={t('compliance.invoicePlaceholder')} value={form.accounting_invoice_address} onChange={(e) => update('accounting_invoice_address', e.target.value)} className={inputCls} />
                </div>
              </div>
              <div>
                <p className="text-[#2bc196] text-sm font-medium mb-2">{t('compliance.supportContact')}</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Input placeholder={t('compliance.namePlaceholder')} value={form.support_contact_name} onChange={(e) => update('support_contact_name', e.target.value)} className={inputCls} />
                  <Input placeholder={t('compliance.emailPlaceholder')} value={form.support_contact_email} onChange={(e) => update('support_contact_email', e.target.value)} className={inputCls} />
                  <Input placeholder={t('compliance.phonePlaceholder')} value={form.support_contact_phone} onChange={(e) => update('support_contact_phone', e.target.value)} className={inputCls} />
                </div>
              </div>
              <div>
                <p className="text-[#2bc196] text-sm font-medium mb-2">{t('compliance.complianceDisputesContact')}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Input placeholder={t('compliance.namePlaceholder')} value={form.compliance_contact_name} onChange={(e) => update('compliance_contact_name', e.target.value)} className={inputCls} />
                  <Input placeholder={t('compliance.emailPlaceholder')} value={form.compliance_contact_email} onChange={(e) => update('compliance_contact_email', e.target.value)} className={inputCls} />
                </div>
              </div>
            </div>
          </ComplianceFormSection>

          {/* Application */}
          <ComplianceFormSection icon={Globe} title={t('compliance.applicationSection')} subtitle={t('compliance.applicationSubtitle')}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-white/70 text-sm font-medium mb-3">{t('compliance.regionsLabel')}</p>
                <div className="space-y-2">
                  {APPLICATION_REGIONS.map(region => (
                    <label key={region} className="flex items-center gap-2 cursor-pointer">
                      <Checkbox
                        checked={form.application_regions.includes(region)}
                        onCheckedChange={() => toggleArrayItem('application_regions', region)}
                      />
                      <span className="text-white/70 text-sm">{region}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-white/70 text-sm font-medium mb-3">{t('compliance.paymentMethodsLabel')}</p>
                <div className="space-y-2">
                  {PAYMENT_METHODS.map(method => (
                    <label key={method} className="flex items-center gap-2 cursor-pointer">
                      <Checkbox
                        checked={form.payment_methods.includes(method)}
                        onCheckedChange={() => toggleArrayItem('payment_methods', method)}
                      />
                      <span className="text-white/70 text-sm">{method}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
              <p className="text-yellow-400/80 text-xs flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                {t('compliance.licenseWarning')}
              </p>
            </div>
          </ComplianceFormSection>

          {/* Basic Compliance Questions */}
          <ComplianceFormSection icon={ShieldCheck} title={t('compliance.complianceQuestions')}>
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

          {/* Required Documents */}
          <ComplianceFormSection icon={FileText} title={t('compliance.requiredDocuments')}>
            <div className="space-y-4">
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

          {/* Certification */}
          <ComplianceFormSection icon={Send} title={t('compliance.certificationSection')} subtitle={t('compliance.certificationSubtitle')}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-white/80 text-sm mb-1 block">{t('compliance.certifierName')}</label>
                <Input value={form.certifier_name} onChange={(e) => update('certifier_name', e.target.value)} className={inputCls} required />
              </div>
              <div>
                <label className="text-white/80 text-sm mb-1 block">{t('compliance.certifierJobTitle')}</label>
                <Input value={form.certifier_job_title} onChange={(e) => update('certifier_job_title', e.target.value)} className={inputCls} required />
              </div>
              <div>
                <label className="text-white/80 text-sm mb-1 block">{t('compliance.certifierEmail')}</label>
                <Input type="email" value={form.certifier_email} onChange={(e) => update('certifier_email', e.target.value)} className={inputCls} placeholder="email@company.com" required />
              </div>
            </div>
          </ComplianceFormSection>

          {/* Submit */}
          <div className="flex justify-center">
            <Button
              type="submit"
              disabled={mutation.isPending}
              className="bg-[#2bc196] hover:bg-[#2bc196]/90 text-[#002443] font-semibold px-12 py-6 text-lg rounded-xl"
            >
              {mutation.isPending ? (
                <><Loader2 className="h-5 w-5 mr-2 animate-spin" /> {t('compliance.submitting')}</>
              ) : (
                <><Send className="h-5 w-5 mr-2" /> {t('compliance.submitButton')}</>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}