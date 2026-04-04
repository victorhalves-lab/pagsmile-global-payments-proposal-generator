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

const APPLICATION_REGIONS = ['Brazil', 'Mexico', 'Chile', 'Colombia', 'Peru', 'Ecuador', 'Guatemala', 'Panama', 'Costa Rica', 'Argentina'];
const PAYMENT_METHODS = ['E-wallet', 'Bank Transfer (Including PIX)', 'Cash Payment'];

const COMPLIANCE_QUESTIONS = [
  "Is the company or any of its officers, directors, direct or indirect shareholders or ultimate actual beneficiaries involved in any sanctions list?",
  "Is the company or any of its officers, directors, direct or indirect shareholders or ultimate actual beneficiaries a Politically Exposed Person (PEP), or a close associate or immediate family member of a PEP?",
  "Is the company or any of its officers, directors, direct or indirect shareholders or ultimate actual beneficiaries involved under the laws of any country, region or territory that is the target of comprehensive, country- or territory-wide Sanctions?",
  "Is the company directly or indirectly owned or controlled by any sanctioned or designated person on the sanctions list, or acting as a representative for its interests?",
  "Has the company or any of its officers, directors, direct or indirect shareholders or ultimate beneficiaries have any business dealings with any Pagsmile's officers, directors or employees in the past 12 months?",
  "Unless expressly stated in Pagsmile's written agreement, does the company or any of its officers, directors or employees pay, accept or provide anything of value in exchange for the opportunity to establish a business relationship with Pagsmile?"
];

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

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#001a30] via-[#002443] to-[#003366] flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-[#2bc196]/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-[#2bc196]" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">Thank You!</h2>
          <p className="text-white/60">Your compliance questionnaire has been successfully submitted. Our team will review your information and contact you shortly.</p>
        </div>
      </div>
    );
  }

  const inputCls = "bg-white/5 border-white/20 text-white placeholder:text-white/30 focus:border-[#2bc196]/50";

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#001a30] via-[#002443] to-[#003366] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_68351d4d439cb9574d90dc86/807e8736c_Logo-modo-escuro.png" alt="Pagsmile" className="h-12 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-white">Know Your Business</h1>
          <p className="text-white/50 mt-2 max-w-2xl mx-auto text-sm">
            As part of Pagsmile's corporate risk assessment policy and in compliance with anti-money laundering and counter-terrorism financing regulations, we are required to collect specific information from all clients.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Client Company Information */}
          <ComplianceFormSection icon={Building2} title="Client Company Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-white/80 text-sm mb-1 block">Applying For *</label>
                <Select value={form.applying_for} onValueChange={(v) => update('applying_for', v)}>
                  <SelectTrigger className={inputCls}><SelectValue placeholder="Select..." /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Merchant">Merchant</SelectItem>
                    <SelectItem value="Master Merchant (PSP License Required)">Master Merchant (PSP License Required)</SelectItem>
                    <SelectItem value="Introducer">Introducer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-white/80 text-sm mb-1 block">Payment Direction</label>
                <Select value={form.payment_direction} onValueChange={(v) => update('payment_direction', v)}>
                  <SelectTrigger className={inputCls}><SelectValue placeholder="Select..." /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pay-in">Pay-in</SelectItem>
                    <SelectItem value="Pay-out">Pay-out</SelectItem>
                    <SelectItem value="Both">Both</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-white/80 text-sm mb-1 block">Legal Business Name *</label>
                <Input value={form.legal_business_name} onChange={(e) => update('legal_business_name', e.target.value)} className={inputCls} placeholder="Company Legal Name" required />
              </div>
              <div>
                <label className="text-white/80 text-sm mb-1 block">Trade Name / DBA</label>
                <Input value={form.trade_name_dba} onChange={(e) => update('trade_name_dba', e.target.value)} className={inputCls} placeholder="Doing Business As" />
              </div>
              <div className="md:col-span-2">
                <label className="text-white/80 text-sm mb-1 block">Registered Business Address *</label>
                <Input value={form.registered_business_address} onChange={(e) => update('registered_business_address', e.target.value)} className={inputCls} placeholder="Physical address, not a PO box" required />
              </div>
              <div className="md:col-span-2">
                <label className="text-white/80 text-sm mb-1 block">Physical Office Address</label>
                <Input value={form.physical_office_address} onChange={(e) => update('physical_office_address', e.target.value)} className={inputCls} placeholder="Office address" />
              </div>
              <div>
                <label className="text-white/80 text-sm mb-1 block">Registered Country *</label>
                <Input value={form.registered_country} onChange={(e) => update('registered_country', e.target.value)} className={inputCls} placeholder="Country" required />
              </div>
              <div>
                <label className="text-white/80 text-sm mb-1 block">Corporate Website</label>
                <Input value={form.corporate_website} onChange={(e) => update('corporate_website', e.target.value)} className={inputCls} placeholder="https://..." />
              </div>
              <div>
                <label className="text-white/80 text-sm mb-1 block">Onboarding Product Website/APK</label>
                <Input value={form.onboarding_product_url} onChange={(e) => update('onboarding_product_url', e.target.value)} className={inputCls} placeholder="URL or APK download" />
              </div>
              <div>
                <label className="text-white/80 text-sm mb-1 block">Business Nature *</label>
                <Input value={form.business_nature} onChange={(e) => update('business_nature', e.target.value)} className={inputCls} placeholder="Nature of business" required />
              </div>
              <div className="md:col-span-2">
                <label className="text-white/80 text-sm mb-1 block">Regulatory Licenses/Qualifications</label>
                <Textarea value={form.regulatory_licenses} onChange={(e) => update('regulatory_licenses', e.target.value)} className={inputCls + " h-20"} placeholder="List applicable licenses (Gambling, Gaming, Forex, Crypto, PSP...)" />
              </div>
              <div>
                <label className="text-white/80 text-sm mb-1 block">Est. Monthly Volume (USD)</label>
                <Input type="number" value={form.estimated_monthly_volume_usd} onChange={(e) => update('estimated_monthly_volume_usd', e.target.value)} className={inputCls} placeholder="0" />
              </div>
              <div>
                <label className="text-white/80 text-sm mb-1 block">Est. Avg Transaction (USD)</label>
                <Input type="number" value={form.estimated_avg_transaction_usd} onChange={(e) => update('estimated_avg_transaction_usd', e.target.value)} className={inputCls} placeholder="0" />
              </div>
              <div>
                <label className="text-white/80 text-sm mb-1 block">Countries You Operate In</label>
                <Input value={form.countries_of_operation} onChange={(e) => update('countries_of_operation', e.target.value)} className={inputCls} placeholder="List countries..." />
              </div>
              <div>
                <label className="text-white/80 text-sm mb-1 block">Years in Business</label>
                <Input type="number" value={form.years_in_business} onChange={(e) => update('years_in_business', e.target.value)} className={inputCls} placeholder="0" />
              </div>
              <div>
                <label className="text-white/80 text-sm mb-1 block">Tax Registration Number (VAT ID)</label>
                <Input value={form.tax_registration_number} onChange={(e) => update('tax_registration_number', e.target.value)} className={inputCls} placeholder="VAT ID or equivalent" />
              </div>
              <div>
                <label className="text-white/80 text-sm mb-1 block">Type of Company</label>
                <Input value={form.company_type} onChange={(e) => update('company_type', e.target.value)} className={inputCls} placeholder="Partnership, Private, Public, Limited..." />
              </div>
            </div>
          </ComplianceFormSection>

          {/* UBOs */}
          <ComplianceFormSection icon={Users} title="Ultimate Beneficial Owners" subtitle="All individuals holding more than 25% of the shares (10% for Chile, Argentina, Colombia)">
            <DynamicPersonList items={form.ubos} onChange={(v) => update('ubos', v)} type="ubo" />
          </ComplianceFormSection>

          {/* Directors */}
          <ComplianceFormSection icon={UserCheck} title="Executive Officers and Directors" subtitle="All senior management, including executive officers and directors">
            <DynamicPersonList items={form.directors} onChange={(v) => update('directors', v)} type="director" />
          </ComplianceFormSection>

          {/* Contacts */}
          <ComplianceFormSection icon={Phone} title="Mandatory Contacts">
            <div className="space-y-4">
              <div>
                <p className="text-[#2bc196] text-sm font-medium mb-2">Accounting & Invoicing Contact</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Input placeholder="Name" value={form.accounting_contact_name} onChange={(e) => update('accounting_contact_name', e.target.value)} className={inputCls} />
                  <Input placeholder="Email" value={form.accounting_contact_email} onChange={(e) => update('accounting_contact_email', e.target.value)} className={inputCls} />
                  <Input placeholder="Invoice Address" value={form.accounting_invoice_address} onChange={(e) => update('accounting_invoice_address', e.target.value)} className={inputCls} />
                </div>
              </div>
              <div>
                <p className="text-[#2bc196] text-sm font-medium mb-2">End Customer Support Contact</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Input placeholder="Name" value={form.support_contact_name} onChange={(e) => update('support_contact_name', e.target.value)} className={inputCls} />
                  <Input placeholder="Email" value={form.support_contact_email} onChange={(e) => update('support_contact_email', e.target.value)} className={inputCls} />
                  <Input placeholder="Mobile Phone" value={form.support_contact_phone} onChange={(e) => update('support_contact_phone', e.target.value)} className={inputCls} />
                </div>
              </div>
              <div>
                <p className="text-[#2bc196] text-sm font-medium mb-2">Compliance & Disputes Contact</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Input placeholder="Name" value={form.compliance_contact_name} onChange={(e) => update('compliance_contact_name', e.target.value)} className={inputCls} />
                  <Input placeholder="Email" value={form.compliance_contact_email} onChange={(e) => update('compliance_contact_email', e.target.value)} className={inputCls} />
                </div>
              </div>
            </div>
          </ComplianceFormSection>

          {/* Application */}
          <ComplianceFormSection icon={Globe} title="Application" subtitle="Select regions and payment methods">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-white/70 text-sm font-medium mb-3">Regions</p>
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
                <p className="text-white/70 text-sm font-medium mb-3">Payment Methods</p>
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
                Argentina, Brazil, Chile, Colombia, Peru and Mexico require a local license for certain businesses.
              </p>
            </div>
          </ComplianceFormSection>

          {/* Basic Compliance Questions */}
          <ComplianceFormSection icon={ShieldCheck} title="Basic Compliance Questions">
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
          <ComplianceFormSection icon={FileText} title="Required Documents (KYC)">
            <div className="space-y-4">
              <FileUploadField
                label="1. Full set of corporation documents"
                description="Certificate of Incorporation, Company Registry, Articles & Memorandum, Shareholder Register, Certificate of Incumbency"
                value={form.doc_corp_documents_url}
                onChange={(v) => update('doc_corp_documents_url', v)}
              />
              <FileUploadField
                label="2. Bank Statement or Reference Letter"
                description="Recent bank statement or signed bank reference letter with account number, business name and address"
                value={form.doc_bank_statement_url}
                onChange={(v) => update('doc_bank_statement_url', v)}
              />
              <FileUploadField
                label="3. Passport/ID & Proof of Address — All Directors"
                value={form.doc_directors_id_url}
                onChange={(v) => update('doc_directors_id_url', v)}
              />
              <FileUploadField
                label="4. Passport/ID & Proof of Address — All UBOs (≥25%)"
                value={form.doc_ubos_id_url}
                onChange={(v) => update('doc_ubos_id_url', v)}
              />
              <FileUploadField
                label="5. DD Form (as aligned with our templates)"
                value={form.doc_dd_form_url}
                onChange={(v) => update('doc_dd_form_url', v)}
              />
              <FileUploadField
                label="AML Questionnaire (if applicable)"
                value={form.doc_aml_questionnaire_url}
                onChange={(v) => update('doc_aml_questionnaire_url', v)}
              />
              <FileUploadField
                label="License (if applicable)"
                value={form.doc_license_url}
                onChange={(v) => update('doc_license_url', v)}
              />
              <FileUploadField
                label="Ownership Chart (if complex structure)"
                value={form.doc_ownership_chart_url}
                onChange={(v) => update('doc_ownership_chart_url', v)}
              />
            </div>
          </ComplianceFormSection>

          {/* Certification */}
          <ComplianceFormSection icon={Send} title="Certification" subtitle="I hereby certify that this form has been completed correctly">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-white/80 text-sm mb-1 block">Certifier's Name *</label>
                <Input value={form.certifier_name} onChange={(e) => update('certifier_name', e.target.value)} className={inputCls} placeholder="Full name" required />
              </div>
              <div>
                <label className="text-white/80 text-sm mb-1 block">Job Title *</label>
                <Input value={form.certifier_job_title} onChange={(e) => update('certifier_job_title', e.target.value)} className={inputCls} placeholder="Position" required />
              </div>
              <div>
                <label className="text-white/80 text-sm mb-1 block">E-mail Address *</label>
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
                <><Loader2 className="h-5 w-5 mr-2 animate-spin" /> Submitting...</>
              ) : (
                <><Send className="h-5 w-5 mr-2" /> Submit Questionnaire</>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}