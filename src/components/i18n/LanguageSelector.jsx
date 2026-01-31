import React from 'react';
import { useTranslation } from 'react-i18next';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Globe } from 'lucide-react';

export default function LanguageSelector({ className = '' }) {
  const { i18n, t } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('language', lng);
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Globe className="h-4 w-4 text-white/60" />
      <Select value={i18n.language} onValueChange={changeLanguage}>
        <SelectTrigger className="w-32 bg-transparent border-[#2bc196]/40 text-white text-sm">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="pt">{t('language.pt')}</SelectItem>
          <SelectItem value="en">{t('language.en')}</SelectItem>
          <SelectItem value="zh">{t('language.zh')}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}