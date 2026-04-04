import React from 'react';
import { Input } from '@/components/ui/input';
import { Plus, Trash2, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const inputCls = "bg-white/5 border-white/[0.12] text-white placeholder:text-white/25 rounded-xl focus:border-[#2bc196]/50 h-11";

export default function DynamicPersonList({ items, onChange, type }) {
  const { t } = useTranslation();

  const addItem = () => {
    if (type === 'ubo') {
      onChange([...items, { name: '', nationality: '', address: '', ownership_percentage: '' }]);
    } else {
      onChange([...items, { job_title: '', first_name: '', last_name: '' }]);
    }
  };

  const removeItem = (index) => {
    if (items.length <= 1) return;
    onChange(items.filter((_, i) => i !== index));
  };

  const updateItem = (index, field, value) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div key={index} className="relative bg-white/[0.03] rounded-xl p-4 border border-white/[0.08] hover:border-white/[0.12] transition-all group">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#2bc196]/10 flex items-center justify-center">
                <User className="h-3.5 w-3.5 text-[#2bc196]" />
              </div>
              <span className="text-white/40 text-xs font-semibold tracking-wider uppercase">
                {type === 'ubo' ? `${t('compliance.uboLabel')} #${index + 1}` : `${t('compliance.directorLabel')} #${index + 1}`}
              </span>
            </div>
            {items.length > 1 && (
              <button type="button" onClick={() => removeItem(index)} className="w-7 h-7 rounded-lg flex items-center justify-center text-red-400/60 hover:text-red-400 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all">
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
          {type === 'ubo' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="text-white/40 text-[10px] font-medium mb-1 block uppercase tracking-wider">{t('compliance.uboNameLabel')}</label>
                <Input placeholder={t('compliance.uboNamePlaceholder')} value={item.name || ''} onChange={(e) => updateItem(index, 'name', e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className="text-white/40 text-[10px] font-medium mb-1 block uppercase tracking-wider">{t('compliance.uboNationalityLabel')}</label>
                <Input placeholder={t('compliance.uboNationalityPlaceholder')} value={item.nationality || ''} onChange={(e) => updateItem(index, 'nationality', e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className="text-white/40 text-[10px] font-medium mb-1 block uppercase tracking-wider">{t('compliance.uboAddressLabel')}</label>
                <Input placeholder={t('compliance.uboAddressPlaceholder')} value={item.address || ''} onChange={(e) => updateItem(index, 'address', e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className="text-white/40 text-[10px] font-medium mb-1 block uppercase tracking-wider">{t('compliance.uboOwnershipLabel')}</label>
                <Input placeholder={t('compliance.uboOwnershipPlaceholder')} type="number" min="0" max="100" value={item.ownership_percentage || ''} onChange={(e) => updateItem(index, 'ownership_percentage', parseFloat(e.target.value) || '')} className={inputCls} />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="text-white/40 text-[10px] font-medium mb-1 block uppercase tracking-wider">{t('compliance.dirJobTitleLabel')}</label>
                <Input placeholder={t('compliance.dirJobTitlePlaceholder')} value={item.job_title || ''} onChange={(e) => updateItem(index, 'job_title', e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className="text-white/40 text-[10px] font-medium mb-1 block uppercase tracking-wider">{t('compliance.dirFirstNameLabel')}</label>
                <Input placeholder={t('compliance.dirFirstNamePlaceholder')} value={item.first_name || ''} onChange={(e) => updateItem(index, 'first_name', e.target.value)} className={inputCls} />
              </div>
              <div>
                <label className="text-white/40 text-[10px] font-medium mb-1 block uppercase tracking-wider">{t('compliance.dirLastNameLabel')}</label>
                <Input placeholder={t('compliance.dirLastNamePlaceholder')} value={item.last_name || ''} onChange={(e) => updateItem(index, 'last_name', e.target.value)} className={inputCls} />
              </div>
            </div>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={addItem}
        className="w-full py-3 rounded-xl border-2 border-dashed border-white/10 text-white/30 text-sm font-medium flex items-center justify-center gap-2 hover:border-[#2bc196]/30 hover:text-[#2bc196]/60 transition-all"
      >
        <Plus className="h-4 w-4" />
        {type === 'ubo' ? t('compliance.addUbo') : t('compliance.addDirector')}
      </button>
    </div>
  );
}