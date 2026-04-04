import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, CheckCircle, ExternalLink, ClipboardList, FileText, Globe } from 'lucide-react';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { createPageUrl } from '@/utils';

export default function LeadQuestionnaireDashboard() {
  const [copied, setCopied] = useState(false);
  const { t } = useTranslation();

  const questionnaireLink = `${window.location.origin}${createPageUrl('QuestionnaireForm')}`;

  const copyLink = () => {
    navigator.clipboard.writeText(questionnaireLink);
    setCopied(true);
    toast.success(t('nav.linkCopied') || 'Link copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <ClipboardList className="h-8 w-8 text-[#2bc196]" />
          {t('leadDashboard.title')}
        </h1>
        <p className="text-white/50 mt-1">{t('leadDashboard.subtitle')}</p>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <div className="w-16 h-16 bg-[#2bc196]/20 rounded-2xl flex items-center justify-center mx-auto">
            <FileText className="h-8 w-8 text-[#2bc196]" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">{t('leadDashboard.linkTitle')}</h2>
            <p className="text-white/50 mt-2 text-sm">{t('leadDashboard.linkDescription')}</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-3">
            <Globe className="h-4 w-4 text-white/30 shrink-0" />
            <input
              readOnly
              value={questionnaireLink}
              className="flex-1 bg-transparent text-white/80 text-sm outline-none truncate"
            />
            <Button onClick={copyLink} variant="outline" size="sm" className="shrink-0">
              {copied ? <CheckCircle className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
              {copied ? (t('compliance.linkCopied') || 'Copied!') : (t('compliance.copyLink') || 'Copy')}
            </Button>
          </div>

          <Button
            onClick={() => window.open(questionnaireLink, '_blank')}
            className="bg-[#2bc196] hover:bg-[#2bc196]/90 text-[#002443]"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            {t('leadDashboard.previewForm')}
          </Button>

          <div className="bg-white/5 border border-white/10 rounded-xl p-5 text-left space-y-3">
            <h3 className="text-white font-medium text-sm">{t('leadDashboard.whatCollects')}</h3>
            <ul className="text-white/60 text-sm space-y-2 list-disc list-inside">
              <li>{t('leadDashboard.collect1')}</li>
              <li>{t('leadDashboard.collect2')}</li>
              <li>{t('leadDashboard.collect3')}</li>
              <li>{t('leadDashboard.collect4')}</li>
              <li>{t('leadDashboard.collect5')}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}