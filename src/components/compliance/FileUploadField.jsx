import React, { useState, useRef } from 'react';
import { base44 } from '@/api/base44Client';
import { Upload, CheckCircle, Loader2, Eye, RefreshCw } from 'lucide-react';

export default function FileUploadField({ label, description, value, onChange }) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    onChange(file_url);
    setUploading(false);
  };

  return (
    <div className="group relative p-4 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:border-white/[0.15] transition-all duration-300">
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleUpload}
        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx"
      />
      
      <div className="flex items-start gap-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all ${
          value ? 'bg-[#2bc196]/20' : 'bg-white/5'
        }`}>
          {value ? (
            <CheckCircle className="h-5 w-5 text-[#2bc196]" />
          ) : uploading ? (
            <Loader2 className="h-5 w-5 text-[#2bc196] animate-spin" />
          ) : (
            <Upload className="h-5 w-5 text-white/30" />
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-medium ${value ? 'text-[#2bc196]' : 'text-white/80'}`}>{label}</p>
          {description && <p className="text-white/30 text-xs mt-0.5 leading-relaxed">{description}</p>}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {value ? (
            <>
              <a href={value} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40 hover:text-[#2bc196] hover:bg-[#2bc196]/10 transition-all">
                <Eye className="h-3.5 w-3.5" />
              </a>
              <button type="button" onClick={() => fileInputRef.current?.click()} className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all">
                <RefreshCw className="h-3.5 w-3.5" />
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white/50 text-xs font-medium hover:border-[#2bc196]/40 hover:text-[#2bc196] transition-all disabled:opacity-40"
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}