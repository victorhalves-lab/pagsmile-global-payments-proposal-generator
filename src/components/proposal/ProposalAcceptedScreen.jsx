import React from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function ProposalAcceptedScreen({ complianceLink, clientName }) {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-[#002443] flex items-center justify-center p-4">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#2bc196]/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#5cf7cf]/10 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative max-w-lg w-full"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <img
            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_68351d4d439cb9574d90dc86/807e8736c_Logo-modo-escuro.png"
            alt="Pagsmile"
            className="h-10 mx-auto"
          />
        </div>

        {/* Success Card */}
        <div className="bg-white/[0.03] backdrop-blur-xl rounded-3xl border border-[#2bc196]/20 overflow-hidden">
          {/* Green header stripe */}
          <div className="bg-gradient-to-r from-[#2bc196]/20 to-[#5cf7cf]/10 border-b border-[#2bc196]/20 p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
              className="w-20 h-20 bg-gradient-to-br from-[#2bc196] to-[#1a8a6a] rounded-3xl flex items-center justify-center mx-auto mb-5 shadow-2xl shadow-[#2bc196]/30 rotate-3"
            >
              <CheckCircle className="h-10 w-10 text-white" />
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#2bc196]/15 border border-[#2bc196]/30 rounded-full mb-4">
                <Sparkles className="w-3.5 h-3.5 text-[#2bc196]" />
                <span className="text-[#2bc196] text-xs font-semibold">
                  {t('proposalAccepted.badge') || 'Proposta Aceita'}
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                {t('proposalAccepted.title') || 'Obrigado!'}
              </h1>
              {clientName && (
                <p className="text-[#5cf7cf] font-medium">
                  {clientName}
                </p>
              )}
            </motion.div>
          </div>

          {/* Next step content */}
          <div className="p-8">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
              <p className="text-white/60 text-sm leading-relaxed text-center mb-6">
                {t('proposalAccepted.message') || 'Sua proposta foi aceita com sucesso! Agora precisamos avançar para a próxima etapa: o processo de compliance (KYC). Por favor, preencha o questionário abaixo para que possamos analisar o seu negócio e finalizar o onboarding.'}
              </p>

              {/* Compliance step indicator */}
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 mb-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#2bc196]/15 flex items-center justify-center shrink-0">
                    <ShieldCheck className="h-5 w-5 text-[#2bc196]" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-sm mb-1">
                      {t('proposalAccepted.nextStepTitle') || 'Próximo passo: Questionário de Compliance'}
                    </h3>
                    <p className="text-white/40 text-xs leading-relaxed">
                      {t('proposalAccepted.nextStepDesc') || 'Este questionário é necessário para a análise KYC/AML do seu negócio. Precisamos de informações sobre a empresa, sócios, documentos e dados de compliance.'}
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <Button
                onClick={() => window.location.href = complianceLink}
                className="w-full bg-gradient-to-r from-[#2bc196] to-[#25a882] hover:from-[#5cf7cf] hover:to-[#2bc196] text-[#002443] py-7 rounded-2xl text-lg font-bold shadow-lg shadow-[#2bc196]/25 hover:shadow-[#2bc196]/40 transition-all group"
              >
                <ShieldCheck className="h-5 w-5 mr-2" />
                {t('proposalAccepted.startCompliance') || 'Preencher Questionário de Compliance'}
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>

              <p className="text-white/20 text-[11px] text-center mt-4">
                {t('proposalAccepted.disclaimer') || 'O questionário leva aproximadamente 15-20 minutos para ser preenchido. Tenha em mãos os documentos da empresa.'}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-[#2bc196]/40 text-xs">
            Pagsmile Limited • www.pagsmile.com
          </p>
        </div>
      </motion.div>
    </div>
  );
}