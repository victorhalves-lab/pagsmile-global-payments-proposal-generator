import React, { useState, useRef } from 'react';
import { base44 } from '@/api/base44Client';
import { Upload, CheckCircle, Loader2, Eye, RefreshCw, Plus, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

function SingleEntry({ entry, index, onChange, onRemove, namePlaceholder }) {
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef(null);

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    onChange(index, { ...entry, file_url });
    setUploading(false);
  };

  return (
    <div className="flex items-center gap-3 p-3 rounded-xl border border-white/[0.08] bg-white/[0.02]">
      <input type="file" ref={fileRef} className="hidden" onChange={handleUpload} accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" />
      
      <div className="flex-1">
        <Input
          placeholder={namePlaceholder}
          value={entry.name || ''}
          onChange={(e) => onChange(index, { ...entry, name: e.target.value })}
          className="bg-white/5 border-white/[0.12] text-white placeholder:text-white/25 rounded-lg h-9 text-sm"
        />
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {entry.file_url ? (
          <>
            <div className="w-8 h-8 rounded-lg bg-[#2bc196]/20 flex items-center justify-center">
              <CheckCircle className="h-4 w-4 text-[#2bc196]" />
            </div>
            <a href={entry.file_url} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40 hover:text-[#2bc196] transition-all">
              <Eye className="h-3.5 w-3.5" />
            </a>
            <button type="button" onClick={() => fileRef.current?.click()} className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40 hover:text-white transition-all">
              <RefreshCw className="h-3.5 w-3.5" />
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/50 text-xs font-medium hover:border-[#2bc196]/40 hover:text-[#2bc196] transition-all disabled:opacity-40"
          >
            {uploading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : 'Upload'}
          </button>
        )}
        <button type="button" onClick={() => onRemove(index)} className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-400/60 hover:text-red-400 hover:bg-red-500/20 transition-all">
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}

export default function MultiPersonDocUpload({ label, description, items, onChange, namePlaceholder }) {
  const { t } = useTranslation();

  const addEntry = () => {
    onChange([...items, { name: '', file_url: '' }]);
  };

  const updateEntry = (index, updated) => {
    const next = [...items];
    next[index] = updated;
    onChange(next);
  };

  const removeEntry = (index) => {
    if (items.length <= 1) return;
    onChange(items.filter((_, i) => i !== index));
  };

  return (
    <div className="p-4 rounded-xl border border-white/[0.08] bg-white/[0.02] space-y-3">
      <div>
        <p className="text-sm font-medium text-white/80">{label}</p>
        {description && <p className="text-white/30 text-xs mt-0.5 leading-relaxed">{description}</p>}
      </div>

      <div className="space-y-2">
        {items.map((entry, i) => (
          <SingleEntry
            key={i}
            entry={entry}
            index={i}
            onChange={updateEntry}
            onRemove={removeEntry}
            namePlaceholder={namePlaceholder || t('compliance.namePlaceholder')}
          />
        ))}
      </div>

      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={addEntry}
        className="text-[#2bc196] hover:text-[#2bc196]/80 hover:bg-[#2bc196]/10 text-xs"
      >
        <Plus className="h-3.5 w-3.5 mr-1.5" />
        {t('compliance.addAnother')}
      </Button>
    </div>
  );
}