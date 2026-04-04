import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, CheckCircle, ExternalLink, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

export default function ComplianceDashboard() {
  const [copied, setCopied] = useState(false);
  const { t } = useTranslation();

  const complianceFormLink = `${window.location.origin}/ComplianceForm`;

  const copyLink = () => {
    navigator.clipboard.writeText(complianceFormLink);
    setCopied(true);
    toast.success(t('compliance.linkCopiedToast'));
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <ShieldCheck className="h-8 w-8 text-[#2bc196]" />
          {t('compliance.dashboardTitle')}
        </h1>
        <p className="text-white/50 mt-1">{t('compliance.dashboardSubtitle')}</p>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <div className="w-16 h-16 bg-[#2bc196]/20 rounded-2xl flex items-center justify-center mx-auto">
            <ShieldCheck className="h-8 w-8 text-[#2bc196]" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">{t('compliance.formLinkTitle')}</h2>
            <p className="text-white/50 mt-2 text-sm">{t('compliance.formLinkDescription')}</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-3">
            <input
              readOnly
              value={complianceFormLink}
              className="flex-1 bg-transparent text-white/80 text-sm outline-none truncate"
            />
            <Button onClick={copyLink} variant="outline" size="sm" className="shrink-0">
              {copied ? <CheckCircle className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
              {copied ? t('compliance.linkCopied') : t('compliance.copyLink')}
            </Button>
          </div>

          <Button
            onClick={() => window.open(complianceFormLink, '_blank')}
            className="bg-[#2bc196] hover:bg-[#2bc196]/90 text-[#002443]"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            {t('compliance.previewForm')}
          </Button>

          <div className="bg-white/5 border border-white/10 rounded-xl p-5 text-left space-y-3">
            <h3 className="text-white font-medium text-sm">{t('compliance.kycDocumentsTitle')}</h3>
            <ol className="text-white/60 text-sm space-y-2 list-decimal list-inside">
              <li>{t('compliance.kycDoc1')}</li>
              <li>{t('compliance.kycDoc2')}</li>
              <li>{t('compliance.kycDoc3')}</li>
              <li>{t('compliance.kycDoc4')}</li>
              <li>{t('compliance.kycDoc5')}</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}