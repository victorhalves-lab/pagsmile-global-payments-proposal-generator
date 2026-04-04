import React, { useState, useRef } from 'react';
import { base44 } from '@/api/base44Client';
import { Upload, CheckCircle, Loader2, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
    <div className="space-y-1.5">
      <label className="text-white/80 text-sm font-medium">{label}</label>
      {description && <p className="text-white/40 text-xs">{description}</p>}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleUpload}
        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.xls,.xlsx"
      />
      {value ? (
        <div className="flex items-center gap-2 bg-[#2bc196]/10 border border-[#2bc196]/30 rounded-lg p-3">
          <CheckCircle className="h-4 w-4 text-[#2bc196] shrink-0" />
          <span className="text-[#2bc196] text-sm truncate flex-1">File uploaded</span>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="text-white/60 hover:text-white text-xs"
            onClick={() => fileInputRef.current?.click()}
          >
            Replace
          </Button>
          <a href={value} target="_blank" rel="noopener noreferrer" className="text-[#2bc196] text-xs hover:underline">
            View
          </a>
        </div>
      ) : (
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="w-full border-dashed border-white/20 text-white/60 hover:text-white hover:border-[#2bc196]/50 bg-transparent h-12"
        >
          {uploading ? (
            <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Uploading...</>
          ) : (
            <><Upload className="h-4 w-4 mr-2" /> Upload file</>
          )}
        </Button>
      )}
    </div>
  );
}