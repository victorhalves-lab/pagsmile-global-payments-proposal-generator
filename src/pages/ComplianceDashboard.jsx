import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, CheckCircle, ExternalLink, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';

export default function ComplianceDashboard() {
  const [copied, setCopied] = useState(false);

  const complianceFormLink = `${window.location.origin}/ComplianceForm`;

  const copyLink = () => {
    navigator.clipboard.writeText(complianceFormLink);
    setCopied(true);
    toast.success('Compliance form link copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <ShieldCheck className="h-8 w-8 text-[#2bc196]" />
          Compliance Questionnaire
        </h1>
        <p className="text-white/50 mt-1">Share the compliance form link and preview the KYC questionnaire</p>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <div className="w-16 h-16 bg-[#2bc196]/20 rounded-2xl flex items-center justify-center mx-auto">
            <ShieldCheck className="h-8 w-8 text-[#2bc196]" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Compliance Form Link</h2>
            <p className="text-white/50 mt-2 text-sm">
              Share this link with clients to collect their KYC documentation, corporate information, and compliance questionnaire.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-3">
            <input
              readOnly
              value={complianceFormLink}
              className="flex-1 bg-transparent text-white/80 text-sm outline-none truncate"
            />
            <Button onClick={copyLink} variant="outline" size="sm" className="shrink-0">
              {copied ? <CheckCircle className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          </div>

          <Button
            onClick={() => window.open(complianceFormLink, '_blank')}
            className="bg-[#2bc196] hover:bg-[#2bc196]/90 text-[#002443]"
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Preview Form
          </Button>

          <div className="bg-white/5 border border-white/10 rounded-xl p-5 text-left space-y-3">
            <h3 className="text-white font-medium text-sm">KYC Documents Collected:</h3>
            <ol className="text-white/60 text-sm space-y-2 list-decimal list-inside">
              <li>Full set of corporation documents (Certificate of Incorporation, Articles, Shareholder Register, Certificate of Incumbency)</li>
              <li>Bank statement or signed bank reference letter</li>
              <li>Passport/ID & Proof of Address — All Directors</li>
              <li>Passport/ID & Proof of Address — All UBOs (≥25%)</li>
              <li>DD Form (as aligned with our templates)</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}