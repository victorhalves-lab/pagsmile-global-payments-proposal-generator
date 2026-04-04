import React from 'react';
import { FileText, ExternalLink, Download, User, Building2, Shield, FileCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useTranslation } from 'react-i18next';
import SectionHeader from './SectionHeader';

function DocCard({ icon: Icon, label, sublabel, url, status }) {
  if (!url) return null;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3 p-3 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:border-[#2bc196]/30 hover:bg-[#2bc196]/[0.03] transition-all"
    >
      <div className="w-10 h-10 rounded-lg bg-[#2bc196]/10 flex items-center justify-center shrink-0 group-hover:bg-[#2bc196]/20 transition-all">
        <Icon className="h-4.5 w-4.5 text-[#2bc196]" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white text-sm font-medium truncate">{label}</p>
        {sublabel && <p className="text-white/30 text-[11px] truncate">{sublabel}</p>}
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <Badge className="bg-green-500/15 text-green-400 text-[10px]">Enviado</Badge>
        <ExternalLink className="h-3.5 w-3.5 text-white/20 group-hover:text-[#2bc196] transition-all" />
      </div>
    </a>
  );
}

function EmptyDoc({ label }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl border border-white/[0.04] bg-white/[0.01] opacity-40">
      <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
        <FileText className="h-4.5 w-4.5 text-white/20" />
      </div>
      <div className="flex-1">
        <p className="text-white/40 text-sm">{label}</p>
      </div>
      <Badge className="bg-white/5 text-white/30 text-[10px]">Não enviado</Badge>
    </div>
  );
}

export default function DocumentsTab({ data }) {
  const { t } = useTranslation();

  // Collect all documents for download
  const allDocs = [];
  if (data.doc_corp_documents_url) allDocs.push({ label: t('compliance.corpDocuments'), url: data.doc_corp_documents_url });
  if (data.doc_bank_statement_url) allDocs.push({ label: t('compliance.bankStatement'), url: data.doc_bank_statement_url });
  data.doc_ids?.filter(d => d.file_url).forEach((d, i) => allDocs.push({ label: `ID: ${d.name || `#${i+1}`}`, url: d.file_url }));
  data.doc_address_proofs?.filter(d => d.file_url).forEach((d, i) => allDocs.push({ label: `Endereço: ${d.name || `#${i+1}`}`, url: d.file_url }));
  if (data.doc_company_address_proof_url) allDocs.push({ label: t('compliance.companyAddressProof'), url: data.doc_company_address_proof_url });
  if (data.doc_pilot_llc_url) allDocs.push({ label: t('compliance.pilotLlc'), url: data.doc_pilot_llc_url });
  if (data.doc_license_url) allDocs.push({ label: t('compliance.license'), url: data.doc_license_url });
  if (data.doc_ownership_chart_url) allDocs.push({ label: t('compliance.ownershipChart'), url: data.doc_ownership_chart_url });

  const handleDownloadAll = () => {
    allDocs.forEach((doc, i) => {
      setTimeout(() => {
        const a = document.createElement('a');
        a.href = doc.url;
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
        a.click();
      }, i * 300);
    });
  };

  return (
    <div className="space-y-6">
      {/* Summary + Download All */}
      <div className="flex items-center justify-between bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#2bc196]/15 flex items-center justify-center">
            <FileCheck className="h-5 w-5 text-[#2bc196]" />
          </div>
          <div>
            <p className="text-white font-medium text-sm">{allDocs.length} documentos enviados</p>
            <p className="text-white/30 text-xs">Clique para abrir individualmente ou baixe todos</p>
          </div>
        </div>
        {allDocs.length > 0 && (
          <Button
            onClick={handleDownloadAll}
            className="bg-[#2bc196] hover:bg-[#2bc196]/80 text-[#002443] font-semibold text-xs px-4"
          >
            <Download className="h-3.5 w-3.5 mr-2" />
            Abrir Todos
          </Button>
        )}
      </div>

      {/* Corporate Documents */}
      <div>
        <SectionHeader step="1" title="Documentos Corporativos" subtitle="Contrato social, extrato bancário" />
        <div className="space-y-2">
          <DocCard icon={Building2} label={t('compliance.corpDocuments')} sublabel="Contrato Social, Estatuto, Registro" url={data.doc_corp_documents_url} />
          {!data.doc_corp_documents_url && <EmptyDoc label={t('compliance.corpDocuments')} />}
          
          <DocCard icon={FileText} label={t('compliance.bankStatement')} sublabel="Extrato bancário ou carta de referência" url={data.doc_bank_statement_url} />
          {!data.doc_bank_statement_url && <EmptyDoc label={t('compliance.bankStatement')} />}

          <DocCard icon={Building2} label={t('compliance.companyAddressProof')} sublabel="Conta de serviço público ou documento oficial" url={data.doc_company_address_proof_url} />
          {!data.doc_company_address_proof_url && <EmptyDoc label={t('compliance.companyAddressProof')} />}
        </div>
      </div>

      {/* Person Documents: IDs */}
      <div>
        <SectionHeader step="2" title="Passaportes / Identidades" subtitle="Documentos de identificação pessoal" />
        <div className="space-y-2">
          {data.doc_ids?.filter(d => d.file_url).length > 0 ? (
            data.doc_ids.filter(d => d.file_url).map((d, i) => (
              <DocCard key={`id-${i}`} icon={User} label={d.name || `Pessoa #${i+1}`} sublabel="Passaporte / Documento de identidade" url={d.file_url} />
            ))
          ) : (
            <EmptyDoc label="Nenhum documento de identidade enviado" />
          )}
        </div>
      </div>

      {/* Person Documents: Address Proofs */}
      <div>
        <SectionHeader step="3" title="Comprovantes de Endereço" subtitle="Endereço de diretores e sócios" />
        <div className="space-y-2">
          {data.doc_address_proofs?.filter(d => d.file_url).length > 0 ? (
            data.doc_address_proofs.filter(d => d.file_url).map((d, i) => (
              <DocCard key={`addr-${i}`} icon={User} label={d.name || `Pessoa #${i+1}`} sublabel="Comprovante de endereço" url={d.file_url} />
            ))
          ) : (
            <EmptyDoc label="Nenhum comprovante de endereço enviado" />
          )}
        </div>
      </div>

      {/* Optional Documents */}
      <div>
        <SectionHeader step="4" title="Documentos Opcionais" subtitle="Licenças, organograma e outros" />
        <div className="space-y-2">
          {data.doc_pilot_llc_url && <DocCard icon={Shield} label={t('compliance.pilotLlc')} url={data.doc_pilot_llc_url} />}
          {data.doc_license_url && <DocCard icon={Shield} label={t('compliance.license')} url={data.doc_license_url} />}
          {data.doc_ownership_chart_url && <DocCard icon={Shield} label={t('compliance.ownershipChart')} url={data.doc_ownership_chart_url} />}
          {!data.doc_pilot_llc_url && !data.doc_license_url && !data.doc_ownership_chart_url && (
            <div className="text-center py-6 text-white/20 text-sm">Nenhum documento opcional enviado</div>
          )}
        </div>
      </div>
    </div>
  );
}