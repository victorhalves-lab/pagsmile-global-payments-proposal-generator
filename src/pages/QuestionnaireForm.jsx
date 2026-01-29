import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import '@/components/i18n/i18n';

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

export default function QuestionnaireForm() {
  const { t } = useTranslation();
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
    monthly_tpv: '',
    average_ticket: '',
    has_current_partner: null,
    current_rate_percentage: '',
    current_fixed_fee: '',
    expected_settlement_days: ''
  });

  const mutation = useMutation({
    mutationFn: async (data) => {
      const monthlyTransactions = data.average_ticket > 0 
        ? Math.round(data.monthly_tpv / data.average_ticket) 
        : 0;
      
      return base44.entities.Questionnaire.create({
        ...data,
        monthly_tpv: parseFloat(data.monthly_tpv) || 0,
        average_ticket: parseFloat(data.average_ticket) || 0,
        monthly_transactions: monthlyTransactions,
        current_rate_percentage: data.current_rate_percentage ? parseFloat(data.current_rate_percentage) : null,
        current_fixed_fee: data.current_fixed_fee ? parseFloat(data.current_fixed_fee) : null,
        pipeline_status: 'leads'
      });
    },
    onSuccess: () => {
      setSubmitted(true);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
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
      <div className="min-h-screen bg-gradient-to-br from-[#002443] to-[#003366] flex items-center justify-center p-4">
        <Card className="max-w-md w-full bg-white">
          <CardContent className="pt-8 text-center">
            <div className="w-16 h-16 bg-[#2bc196] rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-[#002443] mb-2">{t('questionnaireForm.successTitle')}</h2>
            <p className="text-gray-600">
              {t('questionnaireForm.successMessage')}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#002443] to-[#003366] py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <img 
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_68351d4d439cb9574d90dc86/807e8736c_Logo-modo-escuro.png"
            alt="Pagsmile"
            className="h-12 mx-auto mb-6"
          />
          <h1 className="text-3xl font-bold text-white mb-2">{t('questionnaireForm.title')}</h1>
          <p className="text-white/70">{t('questionnaireForm.subtitle')}</p>
        </div>

        <Card className="bg-white">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Dados do Contato */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#002443] border-b pb-2">{t('questionnaireForm.contactSection')}</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contact_name">{t('questionnaireForm.fullName')} *</Label>
                    <Input 
                      id="contact_name"
                      value={form.contact_name}
                      onChange={(e) => updateForm('contact_name', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact_email">{t('questionnaireForm.email')} *</Label>
                    <Input 
                      id="contact_email"
                      type="email"
                      value={form.contact_email}
                      onChange={(e) => updateForm('contact_email', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>{t('questionnaireForm.phone')}</Label>
                    <div className="flex gap-2">
                      <Select 
                        value={form.contact_phone_country_code} 
                        onValueChange={(v) => updateForm('contact_phone_country_code', v)}
                      >
                        <SelectTrigger className="w-28">
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
                        className="flex-1"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="contact_role">{t('questionnaireForm.role')}</Label>
                    <Input 
                      id="contact_role"
                      value={form.contact_role}
                      onChange={(e) => updateForm('contact_role', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Dados da Empresa */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#002443] border-b pb-2">{t('questionnaireForm.companySection')}</h3>
                
                <div>
                  <Label htmlFor="company_name">{t('questionnaireForm.companyName')} *</Label>
                  <Input 
                    id="company_name"
                    value={form.company_name}
                    onChange={(e) => updateForm('company_name', e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="business_type">{t('questionnaireForm.businessType')}</Label>
                    <Input 
                      id="business_type"
                      value={form.business_type}
                      onChange={(e) => updateForm('business_type', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="business_model">{t('questionnaireForm.businessModel')}</Label>
                    <Input 
                      id="business_model"
                      value={form.business_model}
                      onChange={(e) => updateForm('business_model', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="products_services">{t('questionnaireForm.products')}</Label>
                  <Textarea 
                    id="products_services"
                    value={form.products_services}
                    onChange={(e) => updateForm('products_services', e.target.value)}
                    rows={3}
                  />
                </div>
              </div>

              {/* Dados Financeiros */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#002443] border-b pb-2">{t('questionnaireForm.financialSection')}</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="monthly_tpv">{t('questionnaireForm.monthlyTPV')} *</Label>
                    <Input 
                      id="monthly_tpv"
                      type="number"
                      value={form.monthly_tpv}
                      onChange={(e) => updateForm('monthly_tpv', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="average_ticket">{t('questionnaireForm.avgTicket')} *</Label>
                    <Input 
                      id="average_ticket"
                      type="number"
                      value={form.average_ticket}
                      onChange={(e) => updateForm('average_ticket', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label>{t('questionnaire.monthlyTransactions')}</Label>
                    <Input 
                      value={monthlyTransactions.toLocaleString()}
                      disabled
                      className="bg-gray-100"
                    />
                  </div>
                </div>
              </div>

              {/* Parceiro Atual */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#002443] border-b pb-2">{t('questionnaireForm.partnerSection')}</h3>
                
                <div>
                  <Label>{t('questionnaireForm.hasPartner')}</Label>
                  <RadioGroup 
                    value={form.has_current_partner === true ? 'yes' : form.has_current_partner === false ? 'no' : ''}
                    onValueChange={(v) => updateForm('has_current_partner', v === 'yes')}
                    className="flex gap-4 mt-2"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="yes" />
                      <Label htmlFor="yes">{t('common.yes')}</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="no" />
                      <Label htmlFor="no">{t('common.no')}</Label>
                    </div>
                  </RadioGroup>
                </div>

                {form.has_current_partner && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                    <div>
                      <Label htmlFor="current_rate_percentage">{t('questionnaireForm.currentRate')}</Label>
                      <Input 
                        id="current_rate_percentage"
                        type="number"
                        step="0.01"
                        value={form.current_rate_percentage}
                        onChange={(e) => updateForm('current_rate_percentage', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="current_fixed_fee">{t('questionnaireForm.currentFee')}</Label>
                      <Input 
                        id="current_fixed_fee"
                        type="number"
                        step="0.01"
                        value={form.current_fixed_fee}
                        onChange={(e) => updateForm('current_fixed_fee', e.target.value)}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Prazo de Recebimento */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-[#002443] border-b pb-2">{t('questionnaireForm.expectedSettlement')}</h3>
                
                <div>
                  <Label>{t('questionnaireForm.expectedSettlement')}</Label>
                  <Select 
                    value={form.expected_settlement_days} 
                    onValueChange={(v) => updateForm('expected_settlement_days', v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="D+2/D+3">D+2 / D+3</SelectItem>
                      <SelectItem value="D+7">D+7</SelectItem>
                      <SelectItem value="D+15">D+15</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-[#2bc196] hover:bg-[#5cf7cf] text-[#002443] font-semibold py-6"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? t('questionnaireForm.submitting') : t('questionnaireForm.submit')}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}