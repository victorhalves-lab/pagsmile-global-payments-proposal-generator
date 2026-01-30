import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { CheckCircle, AlertCircle, Building2, User, DollarSign, CreditCard, Percent, Clock, Send } from 'lucide-react';
import OtherFeesInput from '@/components/questionnaire/OtherFeesInput';

const COUNTRIES = [
  { code: '+1', name: 'USA', flag: '🇺🇸' },
  { code: '+44', name: 'UK', flag: '🇬🇧' },
  { code: '+49', name: 'Germany', flag: '🇩🇪' },
  { code: '+33', name: 'France', flag: '🇫🇷' },
  { code: '+39', name: 'Italy', flag: '🇮🇹' },
  { code: '+34', name: 'Spain', flag: '🇪🇸' },
  { code: '+351', name: 'Portugal', flag: '🇵🇹' },
  { code: '+55', name: 'Brazil', flag: '🇧🇷' },
  { code: '+52', name: 'Mexico', flag: '🇲🇽' },
  { code: '+54', name: 'Argentina', flag: '🇦🇷' },
  { code: '+56', name: 'Chile', flag: '🇨🇱' },
  { code: '+57', name: 'Colombia', flag: '🇨🇴' },
  { code: '+51', name: 'Peru', flag: '🇵🇪' },
  { code: '+86', name: 'China', flag: '🇨🇳' },
  { code: '+81', name: 'Japan', flag: '🇯🇵' },
  { code: '+82', name: 'South Korea', flag: '🇰🇷' },
  { code: '+91', name: 'India', flag: '🇮🇳' },
  { code: '+61', name: 'Australia', flag: '🇦🇺' },
  { code: '+64', name: 'New Zealand', flag: '🇳🇿' },
  { code: '+971', name: 'UAE', flag: '🇦🇪' },
];

const MCC_OPTIONS = [
  { value: '5411', label: '5411 - Grocery Stores, Supermarkets' },
  { value: '5812', label: '5812 - Eating Places, Restaurants' },
  { value: '5814', label: '5814 - Fast Food Restaurants' },
  { value: '5912', label: '5912 - Drug Stores and Pharmacies' },
  { value: '5999', label: '5999 - Miscellaneous and Specialty Retail' },
  { value: '7011', label: '7011 - Hotels, Motels, Resorts' },
  { value: '7230', label: '7230 - Beauty and Barber Shops' },
  { value: '7299', label: '7299 - Miscellaneous Recreation Services' },
  { value: '7399', label: '7399 - Business Services' },
  { value: '7832', label: '7832 - Motion Picture Theaters' },
  { value: '7941', label: '7941 - Sports Clubs, Fields, Promoters' },
  { value: '7995', label: '7995 - Betting/Casino Gambling' },
  { value: '7999', label: '7999 - Recreation Services' },
  { value: '8011', label: '8011 - Doctors' },
  { value: '8021', label: '8021 - Dentists, Orthodontists' },
  { value: '8099', label: '8099 - Medical Services' },
  { value: '8999', label: '8999 - Professional Services' },
  { value: '5816', label: '5816 - Digital Goods: Games' },
  { value: '5817', label: '5817 - Digital Goods: Applications' },
  { value: '5818', label: '5818 - Digital Goods: Large Volume' },
  { value: '6012', label: '6012 - Financial Institutions' },
  { value: '6051', label: '6051 - Non-FI Money Orders' },
  { value: '6211', label: '6211 - Security Brokers/Dealers' },
  { value: '6300', label: '6300 - Insurance Sales' },
  { value: '4814', label: '4814 - Telecommunication Services' },
  { value: '4816', label: '4816 - Computer Network Services' },
  { value: '4899', label: '4899 - Cable and Other Pay TV' },
  { value: '5045', label: '5045 - Computers and Peripherals' },
  { value: '5734', label: '5734 - Computer Software Stores' },
  { value: '5735', label: '5735 - Record Stores' },
  { value: '5942', label: '5942 - Book Stores' },
  { value: '5944', label: '5944 - Jewelry Stores' },
  { value: '5945', label: '5945 - Hobby, Toy, and Game Shops' },
  { value: '5946', label: '5946 - Camera and Photographic Supply' },
  { value: '5947', label: '5947 - Gift, Card, Novelty Stores' },
  { value: '5948', label: '5948 - Luggage and Leather Goods' },
  { value: '5651', label: '5651 - Family Clothing Stores' },
  { value: '5691', label: '5691 - Mens and Womens Clothing' },
  { value: '5699', label: '5699 - Miscellaneous Apparel' },
  { value: 'other', label: 'Other (specify in products/services)' },
];

function SectionHeader({ icon: Icon, title, subtitle }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="w-12 h-12 bg-gradient-to-br from-[#2bc196] to-[#25a882] rounded-xl flex items-center justify-center shadow-lg shadow-[#2bc196]/20">
        <Icon className="h-6 w-6 text-white" />
      </div>
      <div>
        <h3 className="text-xl font-bold text-[#002443]">{title}</h3>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      </div>
    </div>
  );
}

function FormSection({ children, className = '' }) {
  return (
    <div className={`bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-6 md:p-8 ${className}`}>
      {children}
    </div>
  );
}

export default function QuestionnaireForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    contact_name: '',
    contact_email: '',
    contact_phone: '',
    contact_phone_country_code: '+1',
    contact_role: '',
    company_name: '',
    business_type: '',
    business_model: '',
    products_services: '',
    mcc: '',
    monthly_tpv: '',
    average_ticket: '',
    credit_percentage: '',
    debit_percentage: '',
    visa_percentage: '',
    mastercard_percentage: '',
    amex_percentage: '',
    other_brands_percentage: '',
    has_current_partner: null,
    current_rate_percentage: '',
    current_fixed_fee: '',
    other_current_fees: [],
    expected_settlement_days: ''
  });

  const mutation = useMutation({
    mutationFn: async (data) => {
      const monthlyTransactions = data.average_ticket > 0 
        ? Math.round(data.monthly_tpv / data.average_ticket) 
        : 0;
      
      const processedOtherFees = (data.other_current_fees || [])
        .filter(fee => fee.name && fee.value)
        .map(fee => ({
          name: fee.name,
          value: parseFloat(fee.value) || 0,
          fee_type: fee.fee_type
        }));
      
      return base44.entities.Questionnaire.create({
        ...data,
        monthly_tpv: parseFloat(data.monthly_tpv) || 0,
        average_ticket: parseFloat(data.average_ticket) || 0,
        monthly_transactions: monthlyTransactions,
        credit_percentage: parseFloat(data.credit_percentage) || 0,
        debit_percentage: parseFloat(data.debit_percentage) || 0,
        visa_percentage: parseFloat(data.visa_percentage) || 0,
        mastercard_percentage: parseFloat(data.mastercard_percentage) || 0,
        amex_percentage: parseFloat(data.amex_percentage) || 0,
        other_brands_percentage: parseFloat(data.other_brands_percentage) || 0,
        current_rate_percentage: data.current_rate_percentage ? parseFloat(data.current_rate_percentage) : null,
        current_fixed_fee: data.current_fixed_fee ? parseFloat(data.current_fixed_fee) : null,
        other_current_fees: processedOtherFees,
        pipeline_status: 'leads'
      });
    },
    onSuccess: () => {
      setSubmitted(true);
    }
  });

  const cardTypeTotal = (parseFloat(form.credit_percentage) || 0) + (parseFloat(form.debit_percentage) || 0);
  const brandTotal = (parseFloat(form.visa_percentage) || 0) + (parseFloat(form.mastercard_percentage) || 0) + 
                     (parseFloat(form.amex_percentage) || 0) + (parseFloat(form.other_brands_percentage) || 0);
  const isCardTypeValid = Math.abs(cardTypeTotal - 100) < 0.01;
  const isBrandValid = Math.abs(brandTotal - 100) < 0.01;

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!isCardTypeValid) {
      alert('A soma de Crédito e Débito deve ser 100%');
      return;
    }
    if (!isBrandValid) {
      alert('A soma das bandeiras deve ser 100%');
      return;
    }
    if (form.has_current_partner === null) {
      alert('Por favor, indique se você já possui um parceiro de pagamentos');
      return;
    }
    
    mutation.mutate(form);
  };

  const updateForm = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const monthlyTransactions = form.average_ticket && parseFloat(form.average_ticket) > 0
    ? Math.round(parseFloat(form.monthly_tpv || 0) / parseFloat(form.average_ticket))
    : 0;

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#002443] via-[#003366] to-[#002443] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-8 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-[#2bc196] to-[#25a882] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-[#2bc196]/30">
            <CheckCircle className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-[#002443] mb-3">Thank You!</h2>
          <p className="text-gray-600 text-lg">
            Your questionnaire has been successfully submitted. Our team will contact you shortly with a customized proposal.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#002443] via-[#003366] to-[#002443]">
      {/* Header */}
      <div className="bg-[#002443]/50 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <img 
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_68351d4d439cb9574d90dc86/807e8736c_Logo-modo-escuro.png"
            alt="Pagsmile"
            className="h-10 mx-auto"
          />
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-4 py-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Payment Solutions <span className="text-[#2bc196]">Questionnaire</span>
        </h1>
        <p className="text-white/70 text-lg max-w-2xl mx-auto">
          Complete the form below so we can understand your business and create a customized payment proposal for you.
        </p>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 pb-16">
        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Contact Information */}
          <FormSection>
            <SectionHeader icon={User} title="Contact Information" subtitle="Tell us who we should contact" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label className="text-gray-700 font-medium">Full Name *</Label>
                <Input 
                  value={form.contact_name}
                  onChange={(e) => updateForm('contact_name', e.target.value)}
                  required
                  className="mt-1.5 h-12 border-gray-200 focus:border-[#2bc196] focus:ring-[#2bc196]"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <Label className="text-gray-700 font-medium">Email *</Label>
                <Input 
                  type="email"
                  value={form.contact_email}
                  onChange={(e) => updateForm('contact_email', e.target.value)}
                  required
                  className="mt-1.5 h-12 border-gray-200 focus:border-[#2bc196] focus:ring-[#2bc196]"
                  placeholder="john@company.com"
                />
              </div>
              <div>
                <Label className="text-gray-700 font-medium">Phone *</Label>
                <div className="flex gap-2 mt-1.5">
                  <Select 
                    value={form.contact_phone_country_code} 
                    onValueChange={(v) => updateForm('contact_phone_country_code', v)}
                  >
                    <SelectTrigger className="w-32 h-12 border-gray-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {COUNTRIES.map(c => (
                        <SelectItem key={c.code} value={c.code}>
                          {c.flag} {c.code}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input 
                    value={form.contact_phone}
                    onChange={(e) => updateForm('contact_phone', e.target.value)}
                    required
                    className="flex-1 h-12 border-gray-200 focus:border-[#2bc196] focus:ring-[#2bc196]"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>
              <div>
                <Label className="text-gray-700 font-medium">Role/Position *</Label>
                <Input 
                  value={form.contact_role}
                  onChange={(e) => updateForm('contact_role', e.target.value)}
                  required
                  className="mt-1.5 h-12 border-gray-200 focus:border-[#2bc196] focus:ring-[#2bc196]"
                  placeholder="CEO, CFO, etc."
                />
              </div>
            </div>
          </FormSection>

          {/* Company Information */}
          <FormSection>
            <SectionHeader icon={Building2} title="Company Information" subtitle="Tell us about your business" />
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-gray-700 font-medium">Company Name *</Label>
                  <Input 
                    value={form.company_name}
                    onChange={(e) => updateForm('company_name', e.target.value)}
                    required
                    className="mt-1.5 h-12 border-gray-200 focus:border-[#2bc196] focus:ring-[#2bc196]"
                    placeholder="Your Company LLC"
                  />
                </div>
                <div>
                  <Label className="text-gray-700 font-medium">MCC (Merchant Category Code)</Label>
                  <Select 
                    value={form.mcc} 
                    onValueChange={(v) => updateForm('mcc', v)}
                  >
                    <SelectTrigger className="mt-1.5 h-12 border-gray-200">
                      <SelectValue placeholder="Select your MCC" />
                    </SelectTrigger>
                    <SelectContent className="max-h-80">
                      {MCC_OPTIONS.map(mcc => (
                        <SelectItem key={mcc.value} value={mcc.value}>
                          {mcc.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-gray-700 font-medium">Business Type *</Label>
                  <Input 
                    value={form.business_type}
                    onChange={(e) => updateForm('business_type', e.target.value)}
                    required
                    className="mt-1.5 h-12 border-gray-200 focus:border-[#2bc196] focus:ring-[#2bc196]"
                    placeholder="E-commerce, SaaS, etc."
                  />
                </div>
                <div>
                  <Label className="text-gray-700 font-medium">Business Model *</Label>
                  <Input 
                    value={form.business_model}
                    onChange={(e) => updateForm('business_model', e.target.value)}
                    required
                    className="mt-1.5 h-12 border-gray-200 focus:border-[#2bc196] focus:ring-[#2bc196]"
                    placeholder="B2B, B2C, Marketplace, etc."
                  />
                </div>
              </div>
              <div>
                <Label className="text-gray-700 font-medium">Products/Services Description *</Label>
                <Textarea 
                  value={form.products_services}
                  onChange={(e) => updateForm('products_services', e.target.value)}
                  required
                  rows={3}
                  className="mt-1.5 border-gray-200 focus:border-[#2bc196] focus:ring-[#2bc196]"
                  placeholder="Describe your main products or services..."
                />
              </div>
            </div>
          </FormSection>

          {/* Financial Information */}
          <FormSection>
            <SectionHeader icon={DollarSign} title="Financial Information" subtitle="Help us understand your volume" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label className="text-gray-700 font-medium">Estimated Monthly TPV (USD) *</Label>
                <div className="relative mt-1.5">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                  <Input 
                    type="number"
                    value={form.monthly_tpv}
                    onChange={(e) => updateForm('monthly_tpv', e.target.value)}
                    required
                    className="h-12 pl-8 border-gray-200 focus:border-[#2bc196] focus:ring-[#2bc196]"
                    placeholder="100,000"
                  />
                </div>
              </div>
              <div>
                <Label className="text-gray-700 font-medium">Average Ticket (USD) *</Label>
                <div className="relative mt-1.5">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                  <Input 
                    type="number"
                    value={form.average_ticket}
                    onChange={(e) => updateForm('average_ticket', e.target.value)}
                    required
                    className="h-12 pl-8 border-gray-200 focus:border-[#2bc196] focus:ring-[#2bc196]"
                    placeholder="50"
                  />
                </div>
              </div>
              <div>
                <Label className="text-gray-700 font-medium">Monthly Transactions</Label>
                <Input 
                  value={monthlyTransactions.toLocaleString()}
                  disabled
                  className="mt-1.5 h-12 bg-gray-50 border-gray-200 text-gray-600"
                />
              </div>
            </div>
          </FormSection>

          {/* Transaction Split */}
          <FormSection>
            <SectionHeader icon={CreditCard} title="Transaction Split" subtitle="How are your transactions distributed?" />
            
            {/* Card Type Split */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-gray-800">By Card Type *</h4>
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${
                  isCardTypeValid ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                }`}>
                  {isCardTypeValid ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                  Total: {cardTypeTotal.toFixed(0)}%
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label className="text-gray-600">Credit (%)</Label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={form.credit_percentage}
                    onChange={(e) => updateForm('credit_percentage', e.target.value)}
                    required
                    className="mt-1.5 h-12 border-gray-200 focus:border-[#2bc196] focus:ring-[#2bc196]"
                    placeholder="70"
                  />
                </div>
                <div>
                  <Label className="text-gray-600">Debit (%)</Label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={form.debit_percentage}
                    onChange={(e) => updateForm('debit_percentage', e.target.value)}
                    required
                    className="mt-1.5 h-12 border-gray-200 focus:border-[#2bc196] focus:ring-[#2bc196]"
                    placeholder="30"
                  />
                </div>
              </div>
            </div>

            {/* Brand Split */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-gray-800">By Card Brand *</h4>
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${
                  isBrandValid ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                }`}>
                  {isBrandValid ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                  Total: {brandTotal.toFixed(0)}%
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <Label className="text-gray-600">Visa (%)</Label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={form.visa_percentage}
                    onChange={(e) => updateForm('visa_percentage', e.target.value)}
                    required
                    className="mt-1.5 h-12 border-gray-200 focus:border-[#2bc196] focus:ring-[#2bc196]"
                    placeholder="40"
                  />
                </div>
                <div>
                  <Label className="text-gray-600">Mastercard (%)</Label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={form.mastercard_percentage}
                    onChange={(e) => updateForm('mastercard_percentage', e.target.value)}
                    required
                    className="mt-1.5 h-12 border-gray-200 focus:border-[#2bc196] focus:ring-[#2bc196]"
                    placeholder="35"
                  />
                </div>
                <div>
                  <Label className="text-gray-600">Amex (%)</Label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={form.amex_percentage}
                    onChange={(e) => updateForm('amex_percentage', e.target.value)}
                    required
                    className="mt-1.5 h-12 border-gray-200 focus:border-[#2bc196] focus:ring-[#2bc196]"
                    placeholder="15"
                  />
                </div>
                <div>
                  <Label className="text-gray-600">Others (%)</Label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={form.other_brands_percentage}
                    onChange={(e) => updateForm('other_brands_percentage', e.target.value)}
                    required
                    className="mt-1.5 h-12 border-gray-200 focus:border-[#2bc196] focus:ring-[#2bc196]"
                    placeholder="10"
                  />
                </div>
              </div>
            </div>
          </FormSection>

          {/* Current Partner */}
          <FormSection>
            <SectionHeader icon={Percent} title="Current Payment Partner" subtitle="Do you currently have a payment processor?" />
            
            <div className="mb-6">
              <Label className="text-gray-700 font-medium mb-3 block">Do you already have a payment partner? *</Label>
              <div className="flex gap-4">
                <Button
                  type="button"
                  onClick={() => updateForm('has_current_partner', true)}
                  className={`flex-1 h-12 text-base font-medium transition-all ${
                    form.has_current_partner === true 
                      ? 'bg-[#2bc196] hover:bg-[#25a882] text-white' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  Yes
                </Button>
                <Button
                  type="button"
                  onClick={() => updateForm('has_current_partner', false)}
                  className={`flex-1 h-12 text-base font-medium transition-all ${
                    form.has_current_partner === false 
                      ? 'bg-[#2bc196] hover:bg-[#25a882] text-white' 
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  No
                </Button>
              </div>
            </div>

            {form.has_current_partner && (
              <div className="bg-gray-50 rounded-xl p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-gray-700 font-medium">Current Rate (%) *</Label>
                    <Input 
                      type="number"
                      step="0.01"
                      value={form.current_rate_percentage}
                      onChange={(e) => updateForm('current_rate_percentage', e.target.value)}
                      required
                      className="mt-1.5 h-12 border-gray-200 focus:border-[#2bc196] focus:ring-[#2bc196] bg-white"
                      placeholder="2.50"
                    />
                  </div>
                  <div>
                    <Label className="text-gray-700 font-medium">Fixed Fee per Transaction (USD) *</Label>
                    <div className="relative mt-1.5">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                      <Input 
                        type="number"
                        step="0.01"
                        value={form.current_fixed_fee}
                        onChange={(e) => updateForm('current_fixed_fee', e.target.value)}
                        required
                        className="h-12 pl-8 border-gray-200 focus:border-[#2bc196] focus:ring-[#2bc196] bg-white"
                        placeholder="0.30"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <Label className="text-gray-700 font-medium mb-3 block">Other Fees (optional)</Label>
                  <OtherFeesInput 
                    fees={form.other_current_fees}
                    onChange={(fees) => updateForm('other_current_fees', fees)}
                  />
                </div>
              </div>
            )}
          </FormSection>

          {/* Settlement Days */}
          <FormSection>
            <SectionHeader icon={Clock} title="Settlement Expectations" subtitle="When do you expect to receive funds?" />
            <div>
              <Label className="text-gray-700 font-medium mb-3 block">Expected Settlement Days *</Label>
              <div className="grid grid-cols-4 gap-3">
                {[
                  { value: 'D+1', label: 'D+1', sublabel: 'Express' },
                  { value: 'D+2', label: 'D+2', sublabel: 'Fast' },
                  { value: 'D+7', label: 'D+7', sublabel: 'Standard' },
                  { value: 'D+15', label: 'D+15', sublabel: 'Extended' },
                ].map((option) => (
                  <Button
                    key={option.value}
                    type="button"
                    onClick={() => updateForm('expected_settlement_days', option.value)}
                    className={`h-auto py-4 flex flex-col items-center gap-1 transition-all ${
                      form.expected_settlement_days === option.value 
                        ? 'bg-[#2bc196] hover:bg-[#25a882] text-white' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    <span className="text-lg font-bold">{option.label}</span>
                    <span className={`text-xs ${form.expected_settlement_days === option.value ? 'text-white/80' : 'text-gray-500'}`}>
                      {option.sublabel}
                    </span>
                  </Button>
                ))}
              </div>
            </div>
          </FormSection>

          {/* Submit */}
          <Button 
            type="submit" 
            disabled={mutation.isPending}
            className="w-full h-14 bg-gradient-to-r from-[#2bc196] to-[#25a882] hover:from-[#25a882] hover:to-[#1f8d6d] text-white font-bold text-lg rounded-xl shadow-lg shadow-[#2bc196]/30 transition-all duration-300"
          >
            {mutation.isPending ? (
              <span className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Submitting...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Send className="h-5 w-5" />
                Submit Questionnaire
              </span>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}