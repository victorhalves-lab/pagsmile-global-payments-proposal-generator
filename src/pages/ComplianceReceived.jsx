import React from 'react';
import { ShieldCheck } from 'lucide-react';
import ComplianceReceivedList from '@/components/compliance/ComplianceReceivedList';

export default function ComplianceReceived() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <ShieldCheck className="h-8 w-8 text-[#2bc196]" />
          Received Questionnaires
        </h1>
        <p className="text-white/50 mt-1">Review submitted KYC questionnaires and compliance documentation</p>
      </div>
      <ComplianceReceivedList />
    </div>
  );
}