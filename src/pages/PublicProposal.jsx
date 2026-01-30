import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  CheckCircle, 
  XCircle, 
  RefreshCw, 
  AlertTriangle, 
  Clock, 
  CreditCard, 
  Wallet, 
  Globe, 
  Building2, 
  FileText,
  Shield,
  Banknote,
  ArrowRight,
  Sparkles,
  Calendar
} from 'lucide-react';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import '@/components/i18n/i18n';
import { motion } from 'framer-motion';
import i18n from '@/components/i18n/i18n';

export default function PublicProposal() {
  const { t } = useTranslation();
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');
  const queryClient = useQueryClient();

  const [counterModalOpen, setCounterModalOpen] = useState(false);
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [counterForm, setCounterForm] = useState({
    rate: '',
    fixed_fee: '',
    settlement_days: '',
    notes: ''
  });

  const { data: proposals = [], isLoading } = useQuery({
    queryKey: ['public-proposal', token],
    queryFn: () => base44.entities.Proposal.filter({ public_link_token: token }),
    enabled: !!token
  });

  const proposal = proposals[0];

  React.useEffect(() => {
    if (proposal && proposal.id) {
      // Set the language based on proposal
      if (proposal.language) {
        i18n.changeLanguage(proposal.language);
      }
      
      base44.analytics.track({
        eventName: "proposal_viewed",
        properties: {
          proposal_id: proposal.id,
          client_name: proposal.client_name || '',
          token: token || ''
        }
      });
    }
  }, [proposal?.id, proposal?.language]);

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.Proposal.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['public-proposal', token] });
    }
  });

  const handleAccept = async () => {
    await updateMutation.mutateAsync({
      id: proposal.id,
      data: { status: 'accepted' }
    });
    
    if (proposal.questionnaire_id) {
      await base44.entities.Questionnaire.update(proposal.questionnaire_id, {
        pipeline_status: 'proposal_accepted'
      });
    }
    toast.success(t('publicProposal.proposalAccepted'));
  };

  const handleReject = async () => {
    await updateMutation.mutateAsync({
      id: proposal.id,
      data: { status: 'rejected' }
    });
    
    if (proposal.questionnaire_id) {
      await base44.entities.Questionnaire.update(proposal.questionnaire_id, {
        pipeline_status: 'proposal_lost'
      });
    }
    setRejectModalOpen(false);
    toast.success(t('publicProposal.proposalRejected'));
  };

  const handleCounterProposal = async () => {
    await updateMutation.mutateAsync({
      id: proposal.id,
      data: {
        status: 'counter_proposal',
        counter_proposal_rate: parseFloat(counterForm.rate) || 0,
        counter_proposal_fixed_fee: parseFloat(counterForm.fixed_fee) || 0,
        counter_proposal_settlement_days: counterForm.settlement_days,
        counter_proposal_notes: counterForm.notes
      }
    });
    
    if (proposal.questionnaire_id) {
      await base44.entities.Questionnaire.update(proposal.questionnaire_id, {
        pipeline_status: 'counter_proposal'
      });
    }
    setCounterModalOpen(false);
    toast.success(t('publicProposal.counterProposalSentSuccess'));
  };

  const formatCurrency = (value) => `$${(value || 0).toFixed(2)}`;
  const formatPercentage = (value) => `${(value || 0).toFixed(2)}%`;

  const isExpired = proposal && new Date(proposal.valid_until) < new Date();
  const isAlreadyResponded = proposal && ['accepted', 'rejected', 'counter_proposal'].includes(proposal.status);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#002443] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-[#2bc196]/30 rounded-full animate-pulse"></div>
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-transparent border-t-[#2bc196] rounded-full animate-spin"></div>
          </div>
          <p className="text-white/60 text-sm">Loading proposal...</p>
        </div>
      </div>
    );
  }

  if (!proposal) {
    return (
      <div className="min-h-screen bg-[#002443] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-[#2bc196]/20 text-center"
        >
          <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="h-8 w-8 text-amber-400" />
          </div>
          <h2 className="text-2xl font-bold text-[#2bc196] mb-3">{t('publicProposal.notFound')}</h2>
          <p className="text-white/60">{t('publicProposal.notFoundDesc')}</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#002443]">
      {/* Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#2bc196]/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#5cf7cf]/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 py-8 px-4 md:py-12">
        <div className="max-w-4xl mx-auto">
          
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_68351d4d439cb9574d90dc86/807e8736c_Logo-modo-escuro.png"
              alt="Pagsmile"
              className="h-10 md:h-12 mx-auto mb-8"
            />
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#2bc196]/10 border border-[#2bc196]/30 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-[#2bc196]" />
              <span className="text-[#2bc196] text-sm font-medium">Pricing Proposal</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#2bc196] mb-3">
              {t('publicProposal.title')}
            </h1>
            <p className="text-white/60 text-lg">Prepared for <span className="text-[#5cf7cf] font-medium">{proposal.client_name}</span></p>
          </motion.div>

          {/* Status Alerts */}
          {isExpired && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-500/10 backdrop-blur border border-red-500/30 rounded-2xl p-5 mb-6 flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Clock className="h-6 w-6 text-red-400" />
              </div>
              <div>
                <p className="text-red-300 font-medium">This proposal has expired</p>
                <p className="text-red-400/70 text-sm">Valid until {new Date(proposal.valid_until).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
            </motion.div>
          )}

          {isAlreadyResponded && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`backdrop-blur rounded-2xl p-5 mb-6 flex items-center gap-4 ${
                proposal.status === 'accepted' ? 'bg-[#2bc196]/10 border border-[#2bc196]/30' :
                proposal.status === 'rejected' ? 'bg-red-500/10 border border-red-500/30' :
                'bg-amber-500/10 border border-amber-500/30'
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                proposal.status === 'accepted' ? 'bg-[#2bc196]/20' :
                proposal.status === 'rejected' ? 'bg-red-500/20' : 'bg-amber-500/20'
              }`}>
                {proposal.status === 'accepted' && <CheckCircle className="h-6 w-6 text-[#2bc196]" />}
                {proposal.status === 'rejected' && <XCircle className="h-6 w-6 text-red-400" />}
                {proposal.status === 'counter_proposal' && <RefreshCw className="h-6 w-6 text-amber-400" />}
              </div>
              <div>
                <p className={`font-medium ${
                  proposal.status === 'accepted' ? 'text-[#2bc196]' :
                  proposal.status === 'rejected' ? 'text-red-300' : 'text-amber-300'
                }`}>
                  {proposal.status === 'accepted' && t('publicProposal.alreadyAccepted')}
                  {proposal.status === 'rejected' && t('publicProposal.alreadyRejected')}
                  {proposal.status === 'counter_proposal' && t('publicProposal.counterProposalSent')}
                </p>
              </div>
            </motion.div>
          )}

          {/* Main Proposal Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white/[0.03] backdrop-blur-xl rounded-3xl border border-[#2bc196]/20 overflow-hidden mb-6"
          >
            {/* Proposal Header */}
            <div className="bg-gradient-to-r from-[#2bc196]/10 to-[#5cf7cf]/5 border-b border-[#2bc196]/20 p-6 md:p-8">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <p className="text-[#2bc196]/70 text-sm mb-1">Proposal for</p>
                  <h2 className="text-2xl font-bold text-[#2bc196]">{proposal.client_name}</h2>
                  <p className="text-white/60 mt-1">{proposal.contact_name} • {proposal.contact_email}</p>
                </div>
                <div className="flex items-center gap-3 bg-[#2bc196]/10 rounded-2xl px-5 py-3 border border-[#2bc196]/30">
                  <Calendar className="w-5 h-5 text-[#2bc196]" />
                  <div>
                    <p className="text-[#2bc196]/70 text-xs">Valid until</p>
                    <p className={`font-semibold ${isExpired ? 'text-red-400' : 'text-white'}`}>
                      {new Date(proposal.valid_until).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8 space-y-8">
              
              {/* MCCs Section */}
              {proposal.mccs && proposal.mccs.length > 0 && (
                <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-5">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <AlertTriangle className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                      <p className="text-amber-300 font-semibold">{t('publicProposal.mccWarning')}</p>
                      <p className="text-amber-400/70 text-sm mt-1">{t('publicProposal.mccDescription')}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 ml-13">
                    {proposal.mccs.map(mcc => (
                      <span key={mcc} className="px-3 py-1.5 bg-amber-500/20 text-amber-300 rounded-lg text-sm font-medium">
                        {mcc}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Processing Countries Section */}
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-[#2bc196]/20 rounded-xl flex items-center justify-center">
                    <Globe className="w-5 h-5 text-[#2bc196]" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#2bc196]">Processing Countries</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="bg-[#2bc196]/5 border border-[#2bc196]/20 rounded-xl p-4 text-center hover:bg-[#2bc196]/10 transition-colors">
                    <span className="text-2xl mb-2 block">🇺🇸</span>
                    <p className="text-white font-medium">USA</p>
                  </div>
                  <div className="bg-[#2bc196]/5 border border-[#2bc196]/20 rounded-xl p-4 text-center hover:bg-[#2bc196]/10 transition-colors">
                    <span className="text-2xl mb-2 block">🇪🇺</span>
                    <p className="text-white font-medium">EU</p>
                  </div>
                </div>
              </div>

              {/* Payment Processing Fee */}
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-[#2bc196]/20 rounded-xl flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-[#2bc196]" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#2bc196]">{t('publicProposal.paymentProcessingFee')}</h3>
                </div>
                
                <div className="space-y-3">
                  {/* Credit/Debit Card */}
                  <div className="bg-[#2bc196]/5 border border-[#2bc196]/20 rounded-2xl p-5 hover:bg-[#2bc196]/10 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#2bc196]/20 rounded-xl flex items-center justify-center">
                          <CreditCard className="w-6 h-6 text-[#2bc196]" />
                        </div>
                        <div>
                          <p className="text-white font-semibold">{t('publicProposal.creditDebit')}</p>
                          <p className="text-white/50 text-sm">{t('publicProposal.creditDebitDesc')}</p>
                        </div>
                      </div>
                      <div className="text-right md:text-left">
                        <div className="inline-flex items-center gap-2 bg-[#2bc196]/10 border border-[#2bc196]/40 rounded-xl px-4 py-2">
                          <span className="text-[#5cf7cf] text-xl font-bold">{formatPercentage(proposal.final_rate_percentage)}</span>
                          <span className="text-white/40">+</span>
                          <span className="text-[#5cf7cf] text-xl font-bold">{formatCurrency(proposal.final_fixed_fee)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Wallet */}
                  <div className="bg-[#2bc196]/5 border border-[#2bc196]/20 rounded-2xl p-5 hover:bg-[#2bc196]/10 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#2bc196]/20 rounded-xl flex items-center justify-center">
                          <Wallet className="w-6 h-6 text-[#2bc196]" />
                        </div>
                        <div>
                          <p className="text-white font-semibold">{t('publicProposal.wallet')}</p>
                          <p className="text-white/50 text-sm">{t('publicProposal.walletDesc')}</p>
                        </div>
                      </div>
                      <div className="text-right md:text-left">
                        <div className="inline-flex items-center gap-2 bg-[#2bc196]/10 border border-[#2bc196]/40 rounded-xl px-4 py-2">
                          <span className="text-[#5cf7cf] text-xl font-bold">{formatPercentage(proposal.final_rate_percentage)}</span>
                          <span className="text-white/40">+</span>
                          <span className="text-[#5cf7cf] text-xl font-bold">{formatCurrency(proposal.final_fixed_fee)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Other Fees */}
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-[#2bc196]/20 rounded-xl flex items-center justify-center">
                    <FileText className="w-5 h-5 text-[#2bc196]" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#2bc196]">{t('publicProposal.otherFees')}</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <FeeItem label={t('publicProposal.setupFee')} value={formatCurrency(proposal.setup_fee)} />
                  <FeeItem label={t('publicProposal.gatewayFee')} value={formatCurrency(proposal.final_fixed_fee)} />
                  <FeeItem label={t('publicProposal.refundFee')} value={formatCurrency(proposal.refund_fee)} />
                  <FeeItem label={t('publicProposal.chargebackFee')} value={formatCurrency(proposal.chargeback_fee)} />
                  <FeeItem label={t('publicProposal.riskControlFee')} value={formatCurrency(proposal.risk_control_fee)} />
                  <FeeItem 
                    label={t('publicProposal.rollingReserve')} 
                    value={`${proposal.rolling_reserve_percentage}% for ${proposal.rolling_reserve_days} days`} 
                  />
                </div>
              </div>

              {/* Settlement Section */}
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-[#2bc196]/20 rounded-xl flex items-center justify-center">
                    <Banknote className="w-5 h-5 text-[#2bc196]" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#2bc196]">Settlement</h3>
                </div>
                
                <div className="bg-gradient-to-br from-[#2bc196]/5 to-[#5cf7cf]/5 border border-[#2bc196]/20 rounded-2xl p-6">
                  <p className="text-white/80 leading-relaxed mb-6">
                    After deducting the fees from the payments processed for merchant's website, PAGSMILE will transfer the money to merchant's bank account. The sums received will be withheld the related fees.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between py-3 border-b border-[#2bc196]/20">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#2bc196]/20 rounded-lg flex items-center justify-center">
                          <ArrowRight className="w-4 h-4 text-[#2bc196]" />
                        </div>
                        <span className="text-white/70">Settlement Period</span>
                      </div>
                      <span className="text-[#5cf7cf] font-bold text-lg">{proposal.settlement_days}</span>
                    </div>
                    
                    <div className="flex items-center justify-between py-3 border-b border-[#2bc196]/20">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#2bc196]/20 rounded-lg flex items-center justify-center">
                          <RefreshCw className="w-4 h-4 text-[#2bc196]" />
                        </div>
                        <div>
                          <span className="text-white/70">FX Markup</span>
                          <p className="text-white/40 text-xs">When order or settlement currency is other than USD</p>
                        </div>
                      </div>
                      <span className="text-[#5cf7cf] font-bold text-lg">3%</span>
                    </div>
                    
                    <div className="flex items-center justify-between py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#2bc196]/20 rounded-lg flex items-center justify-center">
                          <Building2 className="w-4 h-4 text-[#2bc196]" />
                        </div>
                        <div>
                          <span className="text-white/70">Wire Transfer Fee</span>
                          <p className="text-white/40 text-xs">For each international settlement transfer</p>
                        </div>
                      </div>
                      <span className="text-[#5cf7cf] font-bold text-lg">$50.00</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-5">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-amber-300 font-medium mb-1">{t('publicProposal.disclaimer')}</p>
                    <p className="text-amber-400/70 text-sm leading-relaxed">
                      {t('publicProposal.disclaimerText')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          {!isExpired && !isAlreadyResponded && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <Button 
                onClick={handleAccept}
                disabled={updateMutation.isPending}
                className="bg-gradient-to-r from-[#2bc196] to-[#25a882] hover:from-[#5cf7cf] hover:to-[#2bc196] text-[#002443] py-7 rounded-2xl text-lg font-semibold shadow-lg shadow-[#2bc196]/25 hover:shadow-[#2bc196]/40 transition-all"
              >
                <CheckCircle className="h-5 w-5 mr-2" />
                {t('publicProposal.acceptProposal')}
              </Button>
              <Button 
                onClick={() => setCounterModalOpen(true)}
                disabled={updateMutation.isPending}
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-7 rounded-2xl text-lg font-semibold shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all"
              >
                <RefreshCw className="h-5 w-5 mr-2" />
                {t('publicProposal.makeCounterProposal')}
              </Button>
              <Button 
                onClick={() => setRejectModalOpen(true)}
                disabled={updateMutation.isPending}
                className="bg-white/5 border border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500/50 py-7 rounded-2xl text-lg font-semibold transition-all"
              >
                <XCircle className="h-5 w-5 mr-2" />
                {t('publicProposal.rejectProposal')}
              </Button>
            </motion.div>
          )}

          {/* Footer */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center mt-12 pb-8"
          >
            <div className="inline-flex items-center gap-2 text-[#2bc196]/60 text-sm">
              <Shield className="w-4 h-4" />
              <span>Secure & Encrypted</span>
            </div>
            <p className="text-[#2bc196]/40 text-sm mt-2">
              Pagsmile Limited • www.pagsmile.com
            </p>
          </motion.div>
        </div>
      </div>

      {/* Counter Proposal Modal */}
      <Dialog open={counterModalOpen} onOpenChange={setCounterModalOpen}>
        <DialogContent className="bg-[#002443] border border-[#2bc196]/30 rounded-2xl max-w-md">
          <DialogHeader>
            <DialogTitle className="text-[#2bc196] text-xl">{t('publicProposal.counterProposalTitle')}</DialogTitle>
          </DialogHeader>
          <div className="space-y-5 pt-4">
            <div>
              <Label className="text-white/70 text-sm">{t('publicProposal.proposedRate')}</Label>
              <Input 
                type="number"
                step="0.01"
                value={counterForm.rate}
                onChange={(e) => setCounterForm(prev => ({ ...prev, rate: e.target.value }))}
                placeholder="Ex: 3.50"
                className="mt-2 bg-white/5 border-[#2bc196]/30 text-white placeholder:text-white/30 rounded-xl"
              />
            </div>
            <div>
              <Label className="text-white/70 text-sm">{t('publicProposal.proposedFee')}</Label>
              <Input 
                type="number"
                step="0.01"
                value={counterForm.fixed_fee}
                onChange={(e) => setCounterForm(prev => ({ ...prev, fixed_fee: e.target.value }))}
                placeholder="Ex: 0.10"
                className="mt-2 bg-white/5 border-[#2bc196]/30 text-white placeholder:text-white/30 rounded-xl"
              />
            </div>
            <div>
              <Label className="text-white/70 text-sm">{t('publicProposal.proposedSettlement')}</Label>
              <Select 
                value={counterForm.settlement_days} 
                onValueChange={(v) => setCounterForm(prev => ({ ...prev, settlement_days: v }))}
              >
                <SelectTrigger className="mt-2 bg-white/5 border-[#2bc196]/30 text-white rounded-xl">
                  <SelectValue placeholder="Select..." />
                </SelectTrigger>
                <SelectContent className="bg-[#002443] border-[#2bc196]/30">
                  <SelectItem value="D+2/D+3">D+2 / D+3</SelectItem>
                  <SelectItem value="D+7">D+7</SelectItem>
                  <SelectItem value="D+15">D+15</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-white/70 text-sm">{t('publicProposal.notes')}</Label>
              <Textarea 
                value={counterForm.notes}
                onChange={(e) => setCounterForm(prev => ({ ...prev, notes: e.target.value }))}
                placeholder={t('publicProposal.notesPlaceholder')}
                rows={3}
                className="mt-2 bg-white/5 border-[#2bc196]/30 text-white placeholder:text-white/30 rounded-xl"
              />
            </div>
            <Button 
              onClick={handleCounterProposal}
              disabled={updateMutation.isPending}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-6 rounded-xl font-semibold"
            >
              {t('publicProposal.sendCounterProposal')}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Reject Modal */}
      <Dialog open={rejectModalOpen} onOpenChange={setRejectModalOpen}>
        <DialogContent className="bg-[#002443] border border-[#2bc196]/30 rounded-2xl max-w-md">
          <DialogHeader>
            <DialogTitle className="text-[#2bc196] text-xl">{t('publicProposal.confirmReject')}</DialogTitle>
          </DialogHeader>
          <div className="pt-4">
            <p className="text-white/60 mb-6">
              {t('publicProposal.confirmRejectMessage')}
            </p>
            <div className="flex gap-3">
              <Button 
                variant="outline" 
                onClick={() => setRejectModalOpen(false)}
                className="flex-1 bg-white/5 border-[#2bc196]/30 text-white hover:bg-[#2bc196]/10 rounded-xl py-5"
              >
                {t('common.cancel')}
              </Button>
              <Button 
                onClick={handleReject}
                disabled={updateMutation.isPending}
                className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl py-5"
              >
                {t('publicProposal.confirmRejectButton')}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function FeeItem({ label, value }) {
  return (
    <div className="bg-[#2bc196]/5 border border-[#2bc196]/20 rounded-xl p-4 flex items-center justify-between hover:bg-[#2bc196]/10 transition-colors">
      <span className="text-white/60 text-sm">{label}</span>
      <span className="text-[#5cf7cf] font-semibold">{value}</span>
    </div>
  );
}