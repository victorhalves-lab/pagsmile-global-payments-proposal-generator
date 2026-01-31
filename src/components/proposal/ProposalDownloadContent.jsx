import React from 'react';
import { 
  CreditCard, 
  Wallet, 
  Globe, 
  FileText,
  Shield,
  Banknote,
  ArrowRight,
  RefreshCw,
  Building2,
  Calendar,
  AlertTriangle,
  Sparkles
} from 'lucide-react';

export default function ProposalDownloadContent({ proposal, language = 'pt' }) {
  const formatCurrency = (value) => `$${(value || 0).toFixed(2)}`;
  const formatPercentage = (value) => `${(value || 0).toFixed(2)}%`;

  const translations = {
    pt: {
      pricingProposal: 'Proposta de Preços',
      preparedFor: 'Preparada para',
      proposalFor: 'Proposta para',
      validUntil: 'Válido até',
      mccWarning: 'MCCs Aplicáveis',
      mccDescription: 'Esta proposta é exclusiva para os seguintes MCCs:',
      processingCountries: 'Países de Processamento',
      usa: 'EUA',
      eu: 'UE',
      paymentProcessingFee: 'Taxa de Processamento de Pagamentos',
      creditDebit: 'Cartão de Crédito e Débito',
      creditDebitDesc: 'Visa, MasterCard, Amex, Discover e Diners Club',
      wallet: 'Carteira Digital',
      walletDesc: 'Google Pay e Apple Pay',
      otherFees: 'Outras Taxas',
      setupFee: 'Taxa de Setup',
      gatewayFee: 'Gateway Fee (por transação)',
      refundFee: 'Reembolso (por reembolso)',
      chargebackFee: 'Chargeback (por transação)',
      riskControlFee: 'Risk Control (por transação)',
      rollingReserve: 'Rolling Reserve',
      for: 'por',
      days: 'dias',
      settlementTitle: 'Settlement',
      settlementDescription: 'Após deduzir as taxas dos pagamentos processados, a PAGSMILE transferirá o valor para a conta bancária do merchant.',
      settlementPeriod: 'Período de Settlement',
      fxMarkup: 'FX Markup',
      fxMarkupDesc: 'Quando moeda do pedido ou settlement for diferente de USD',
      wireTransferFee: 'Wire Transfer Fee',
      wireTransferFeeDesc: 'Para cada transferência internacional',
      disclaimer: 'Disclaimer',
      disclaimerText: 'Esta proposta está sujeita à aprovação do departamento de Compliance da Pagsmile. As taxas e condições apresentadas podem ser alteradas após análise documental e perfil de risco do merchant.',
      secureEncrypted: 'Seguro & Criptografado'
    },
    en: {
      pricingProposal: 'Pricing Proposal',
      preparedFor: 'Prepared for',
      proposalFor: 'Proposal for',
      validUntil: 'Valid until',
      mccWarning: 'Applicable MCCs',
      mccDescription: 'This proposal is exclusive for the following MCCs:',
      processingCountries: 'Processing Countries',
      usa: 'USA',
      eu: 'EU',
      paymentProcessingFee: 'Payment Processing Fee',
      creditDebit: 'Credit & Debit Card',
      creditDebitDesc: 'Visa, MasterCard, Amex, Discover and Diners Club',
      wallet: 'Wallet',
      walletDesc: 'Google Pay and Apple Pay',
      otherFees: 'Other Fees',
      setupFee: 'Setup Fee',
      gatewayFee: 'Gateway Fee (per transaction)',
      refundFee: 'Refunds (per refund)',
      chargebackFee: 'Chargeback Fee (per transaction)',
      riskControlFee: 'Risk Control Fee (per transaction)',
      rollingReserve: 'Rolling Reserve',
      for: 'for',
      days: 'days',
      settlementTitle: 'Settlement',
      settlementDescription: 'After deducting the fees from the payments processed, PAGSMILE will transfer the money to merchant\'s bank account.',
      settlementPeriod: 'Settlement Period',
      fxMarkup: 'FX Markup',
      fxMarkupDesc: 'When order or settlement currency is other than USD',
      wireTransferFee: 'Wire Transfer Fee',
      wireTransferFeeDesc: 'For each international settlement transfer',
      disclaimer: 'Disclaimer',
      disclaimerText: 'This proposal is subject to approval by the Pagsmile Compliance department. The rates and conditions presented may be changed after document analysis and merchant risk profile.',
      secureEncrypted: 'Secure & Encrypted'
    },
    zh: {
      pricingProposal: '定价方案',
      preparedFor: '准备给',
      proposalFor: '方案适用于',
      validUntil: '有效期至',
      mccWarning: '适用的MCC',
      mccDescription: '本方案仅适用于以下MCC:',
      processingCountries: '处理国家',
      usa: '美国',
      eu: '欧盟',
      paymentProcessingFee: '支付处理费',
      creditDebit: '信用卡和借记卡',
      creditDebitDesc: 'Visa, MasterCard, Amex, Discover 和 Diners Club',
      wallet: '钱包',
      walletDesc: 'Google Pay 和 Apple Pay',
      otherFees: '其他费用',
      setupFee: '设置费',
      gatewayFee: '网关费（每笔交易）',
      refundFee: '退款费（每笔退款）',
      chargebackFee: '拒付费（每笔交易）',
      riskControlFee: '风控费（每笔交易）',
      rollingReserve: '滚动准备金',
      for: '持续',
      days: '天',
      settlementTitle: '结算',
      settlementDescription: '在扣除处理费用后，PAGSMILE将把款项转入商户的银行账户。',
      settlementPeriod: '结算周期',
      fxMarkup: '外汇加价',
      fxMarkupDesc: '当订单或结算货币非美元时',
      wireTransferFee: '电汇费',
      wireTransferFeeDesc: '每次国际结算转账',
      disclaimer: '免责声明',
      disclaimerText: '本方案须经Pagsmile合规部门批准。所列费率和条件可能在文件分析和商户风险评估后进行调整。',
      secureEncrypted: '安全加密'
    }
  };

  const t = translations[language] || translations.en;

  return (
    <div 
      id="proposal-download-content"
      style={{
        width: '900px',
        padding: '40px',
        background: 'linear-gradient(135deg, #002443 0%, #001a30 100%)',
        fontFamily: 'Inter, system-ui, sans-serif',
        color: 'white'
      }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <img 
          src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/user_68351d4d439cb9574d90dc86/807e8736c_Logo-modo-escuro.png"
          alt="Pagsmile"
          style={{ height: '48px', marginBottom: '24px' }}
        />
        <div style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '8px', 
          padding: '8px 16px', 
          background: 'rgba(43, 193, 150, 0.1)', 
          border: '1px solid rgba(43, 193, 150, 0.3)', 
          borderRadius: '9999px',
          marginBottom: '16px'
        }}>
          <Sparkles style={{ width: '16px', height: '16px', color: '#2bc196' }} />
          <span style={{ color: '#2bc196', fontSize: '14px', fontWeight: '500' }}>{t.pricingProposal}</span>
        </div>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#2bc196', margin: '0 0 8px 0' }}>
          {t.pricingProposal}
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '18px', margin: 0 }}>
          {t.preparedFor} <span style={{ color: '#5cf7cf', fontWeight: '500' }}>{proposal.client_name}</span>
        </p>
      </div>

      {/* Proposal Header Card */}
      <div style={{ 
        background: 'linear-gradient(to right, rgba(43, 193, 150, 0.1), rgba(92, 247, 207, 0.05))',
        border: '1px solid rgba(43, 193, 150, 0.2)',
        borderRadius: '16px',
        padding: '24px',
        marginBottom: '24px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <p style={{ color: 'rgba(43, 193, 150, 0.7)', fontSize: '14px', margin: '0 0 4px 0' }}>{t.proposalFor}</p>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#2bc196', margin: '0 0 4px 0' }}>{proposal.client_name}</h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', margin: 0 }}>{proposal.contact_name} • {proposal.contact_email}</p>
          </div>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px', 
            background: 'rgba(43, 193, 150, 0.1)', 
            borderRadius: '16px', 
            padding: '12px 20px',
            border: '1px solid rgba(43, 193, 150, 0.3)'
          }}>
            <Calendar style={{ width: '20px', height: '20px', color: '#2bc196' }} />
            <div>
              <p style={{ color: 'rgba(43, 193, 150, 0.7)', fontSize: '12px', margin: 0 }}>{t.validUntil}</p>
              <p style={{ color: 'white', fontWeight: '600', margin: 0 }}>
                {proposal.valid_until ? new Date(proposal.valid_until).toLocaleDateString(language === 'zh' ? 'zh-CN' : language === 'pt' ? 'pt-BR' : 'en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '-'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* MCCs Section */}
      {proposal.mccs && proposal.mccs.length > 0 && (
        <div style={{ 
          background: 'rgba(245, 158, 11, 0.05)',
          border: '1px solid rgba(245, 158, 11, 0.2)',
          borderRadius: '16px',
          padding: '20px',
          marginBottom: '24px'
        }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '16px' }}>
            <div style={{ 
              width: '40px', 
              height: '40px', 
              background: 'rgba(245, 158, 11, 0.2)', 
              borderRadius: '12px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <AlertTriangle style={{ width: '20px', height: '20px', color: '#fbbf24' }} />
            </div>
            <div>
              <p style={{ color: '#fcd34d', fontWeight: '600', margin: '0 0 4px 0' }}>{t.mccWarning}</p>
              <p style={{ color: 'rgba(251, 191, 36, 0.7)', fontSize: '14px', margin: 0 }}>{t.mccDescription}</p>
            </div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginLeft: '52px' }}>
            {proposal.mccs.map(mcc => (
              <span key={mcc} style={{ 
                padding: '6px 12px', 
                background: 'rgba(245, 158, 11, 0.2)', 
                color: '#fcd34d', 
                borderRadius: '8px', 
                fontSize: '14px', 
                fontWeight: '500' 
              }}>
                {mcc}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Processing Countries */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            background: 'rgba(43, 193, 150, 0.2)', 
            borderRadius: '12px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}>
            <Globe style={{ width: '20px', height: '20px', color: '#2bc196' }} />
          </div>
          <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#2bc196', margin: 0 }}>{t.processingCountries}</h3>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
          <div style={{ 
            background: 'rgba(43, 193, 150, 0.05)',
            border: '1px solid rgba(43, 193, 150, 0.2)',
            borderRadius: '12px',
            padding: '16px',
            textAlign: 'center'
          }}>
            <span style={{ fontSize: '24px', display: 'block', marginBottom: '8px' }}>🇺🇸</span>
            <p style={{ color: 'white', fontWeight: '500', margin: 0 }}>{t.usa}</p>
          </div>
          <div style={{ 
            background: 'rgba(43, 193, 150, 0.05)',
            border: '1px solid rgba(43, 193, 150, 0.2)',
            borderRadius: '12px',
            padding: '16px',
            textAlign: 'center'
          }}>
            <span style={{ fontSize: '24px', display: 'block', marginBottom: '8px' }}>🇪🇺</span>
            <p style={{ color: 'white', fontWeight: '500', margin: 0 }}>{t.eu}</p>
          </div>
        </div>
      </div>

      {/* Payment Processing Fee */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            background: 'rgba(43, 193, 150, 0.2)', 
            borderRadius: '12px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}>
            <CreditCard style={{ width: '20px', height: '20px', color: '#2bc196' }} />
          </div>
          <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#2bc196', margin: 0 }}>{t.paymentProcessingFee}</h3>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* Credit/Debit Card */}
          <div style={{ 
            background: 'rgba(43, 193, 150, 0.05)',
            border: '1px solid rgba(43, 193, 150, 0.2)',
            borderRadius: '16px',
            padding: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ 
                width: '48px', 
                height: '48px', 
                background: 'rgba(43, 193, 150, 0.2)', 
                borderRadius: '12px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}>
                <CreditCard style={{ width: '24px', height: '24px', color: '#2bc196' }} />
              </div>
              <div>
                <p style={{ color: 'white', fontWeight: '600', margin: '0 0 4px 0' }}>{t.creditDebit}</p>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', margin: 0 }}>{t.creditDebitDesc}</p>
              </div>
            </div>
            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '8px', 
              background: 'rgba(43, 193, 150, 0.1)', 
              border: '1px solid rgba(43, 193, 150, 0.4)', 
              borderRadius: '12px', 
              padding: '8px 16px' 
            }}>
              <span style={{ color: '#5cf7cf', fontSize: '20px', fontWeight: 'bold' }}>{formatPercentage(proposal.final_rate_percentage)}</span>
              <span style={{ color: 'rgba(255,255,255,0.4)' }}>+</span>
              <span style={{ color: '#5cf7cf', fontSize: '20px', fontWeight: 'bold' }}>{formatCurrency(proposal.final_fixed_fee)}</span>
            </div>
          </div>

          {/* Wallet */}
          <div style={{ 
            background: 'rgba(43, 193, 150, 0.05)',
            border: '1px solid rgba(43, 193, 150, 0.2)',
            borderRadius: '16px',
            padding: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ 
                width: '48px', 
                height: '48px', 
                background: 'rgba(43, 193, 150, 0.2)', 
                borderRadius: '12px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center' 
              }}>
                <Wallet style={{ width: '24px', height: '24px', color: '#2bc196' }} />
              </div>
              <div>
                <p style={{ color: 'white', fontWeight: '600', margin: '0 0 4px 0' }}>{t.wallet}</p>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', margin: 0 }}>{t.walletDesc}</p>
              </div>
            </div>
            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '8px', 
              background: 'rgba(43, 193, 150, 0.1)', 
              border: '1px solid rgba(43, 193, 150, 0.4)', 
              borderRadius: '12px', 
              padding: '8px 16px' 
            }}>
              <span style={{ color: '#5cf7cf', fontSize: '20px', fontWeight: 'bold' }}>{formatPercentage(proposal.final_rate_percentage)}</span>
              <span style={{ color: 'rgba(255,255,255,0.4)' }}>+</span>
              <span style={{ color: '#5cf7cf', fontSize: '20px', fontWeight: 'bold' }}>{formatCurrency(proposal.final_fixed_fee)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Other Fees */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            background: 'rgba(43, 193, 150, 0.2)', 
            borderRadius: '12px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}>
            <FileText style={{ width: '20px', height: '20px', color: '#2bc196' }} />
          </div>
          <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#2bc196', margin: 0 }}>{t.otherFees}</h3>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
          <FeeItem label={t.setupFee} value={formatCurrency(proposal.setup_fee)} />
          <FeeItem label={t.gatewayFee} value={formatCurrency(proposal.final_fixed_fee)} />
          <FeeItem label={t.refundFee} value={formatCurrency(proposal.refund_fee)} />
          <FeeItem label={t.chargebackFee} value={formatCurrency(proposal.chargeback_fee)} />
          <FeeItem label={t.riskControlFee} value={formatCurrency(proposal.risk_control_fee)} />
          <FeeItem label={t.rollingReserve} value={`${proposal.rolling_reserve_percentage}% ${t.for} ${proposal.rolling_reserve_days} ${t.days}`} />
        </div>
      </div>

      {/* Settlement Section */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            background: 'rgba(43, 193, 150, 0.2)', 
            borderRadius: '12px', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}>
            <Banknote style={{ width: '20px', height: '20px', color: '#2bc196' }} />
          </div>
          <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#2bc196', margin: 0 }}>{t.settlementTitle}</h3>
        </div>
        
        <div style={{ 
          background: 'linear-gradient(to bottom right, rgba(43, 193, 150, 0.05), rgba(92, 247, 207, 0.05))',
          border: '1px solid rgba(43, 193, 150, 0.2)',
          borderRadius: '16px',
          padding: '24px'
        }}>
          <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: '1.6', marginBottom: '24px' }}>
            {t.settlementDescription}
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              padding: '12px 0', 
              borderBottom: '1px solid rgba(43, 193, 150, 0.2)' 
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ 
                  width: '32px', 
                  height: '32px', 
                  background: 'rgba(43, 193, 150, 0.2)', 
                  borderRadius: '8px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}>
                  <ArrowRight style={{ width: '16px', height: '16px', color: '#2bc196' }} />
                </div>
                <span style={{ color: 'rgba(255,255,255,0.7)' }}>{t.settlementPeriod}</span>
              </div>
              <span style={{ color: '#5cf7cf', fontWeight: 'bold', fontSize: '18px' }}>{proposal.settlement_days}</span>
            </div>
            
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              padding: '12px 0', 
              borderBottom: '1px solid rgba(43, 193, 150, 0.2)' 
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ 
                  width: '32px', 
                  height: '32px', 
                  background: 'rgba(43, 193, 150, 0.2)', 
                  borderRadius: '8px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}>
                  <RefreshCw style={{ width: '16px', height: '16px', color: '#2bc196' }} />
                </div>
                <div>
                  <span style={{ color: 'rgba(255,255,255,0.7)' }}>{t.fxMarkup}</span>
                  <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', margin: 0 }}>{t.fxMarkupDesc}</p>
                </div>
              </div>
              <span style={{ color: '#5cf7cf', fontWeight: 'bold', fontSize: '18px' }}>3%</span>
            </div>
            
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              padding: '12px 0'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ 
                  width: '32px', 
                  height: '32px', 
                  background: 'rgba(43, 193, 150, 0.2)', 
                  borderRadius: '8px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}>
                  <Building2 style={{ width: '16px', height: '16px', color: '#2bc196' }} />
                </div>
                <div>
                  <span style={{ color: 'rgba(255,255,255,0.7)' }}>{t.wireTransferFee}</span>
                  <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', margin: 0 }}>{t.wireTransferFeeDesc}</p>
                </div>
              </div>
              <span style={{ color: '#5cf7cf', fontWeight: 'bold', fontSize: '18px' }}>$50.00</span>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div style={{ 
        background: 'rgba(245, 158, 11, 0.05)',
        border: '1px solid rgba(245, 158, 11, 0.2)',
        borderRadius: '16px',
        padding: '20px',
        marginBottom: '32px'
      }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <Shield style={{ width: '20px', height: '20px', color: '#fbbf24', flexShrink: 0, marginTop: '2px' }} />
          <div>
            <p style={{ color: '#fcd34d', fontWeight: '500', marginBottom: '4px' }}>{t.disclaimer}</p>
            <p style={{ color: 'rgba(251, 191, 36, 0.7)', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
              {t.disclaimerText}
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ textAlign: 'center', paddingTop: '24px', borderTop: '1px solid rgba(43, 193, 150, 0.2)' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'rgba(43, 193, 150, 0.6)', fontSize: '14px' }}>
          <Shield style={{ width: '16px', height: '16px' }} />
          <span>{t.secureEncrypted}</span>
        </div>
        <p style={{ color: 'rgba(43, 193, 150, 0.4)', fontSize: '14px', marginTop: '8px' }}>
          Pagsmile Limited • www.pagsmile.com
        </p>
      </div>
    </div>
  );
}

function FeeItem({ label, value }) {
  return (
    <div style={{ 
      background: 'rgba(43, 193, 150, 0.05)',
      border: '1px solid rgba(43, 193, 150, 0.2)',
      borderRadius: '12px',
      padding: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
      <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>{label}</span>
      <span style={{ color: '#5cf7cf', fontWeight: '600' }}>{value}</span>
    </div>
  );
}