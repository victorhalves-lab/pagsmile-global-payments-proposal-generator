import React from 'react';
import ToggleChip from './ToggleChip';
import { useTranslation } from 'react-i18next';

const REGIONS = {
  usa: {
    labelKey: 'targetMarkets.usa',
    countries: [{ id: 'us', flag: '🇺🇸', labelKey: 'targetMarkets.countries.us' }]
  },
  latam: {
    labelKey: 'targetMarkets.latam',
    countries: [
      { id: 'ar', flag: '🇦🇷', labelKey: 'targetMarkets.countries.ar' },
      { id: 'bo', flag: '🇧🇴', labelKey: 'targetMarkets.countries.bo' },
      { id: 'br', flag: '🇧🇷', labelKey: 'targetMarkets.countries.br' },
      { id: 'cl', flag: '🇨🇱', labelKey: 'targetMarkets.countries.cl' },
      { id: 'co', flag: '🇨🇴', labelKey: 'targetMarkets.countries.co' },
      { id: 'ec', flag: '🇪🇨', labelKey: 'targetMarkets.countries.ec' },
      { id: 'mx', flag: '🇲🇽', labelKey: 'targetMarkets.countries.mx' },
      { id: 'py', flag: '🇵🇾', labelKey: 'targetMarkets.countries.py' },
      { id: 'pe', flag: '🇵🇪', labelKey: 'targetMarkets.countries.pe' },
      { id: 'uy', flag: '🇺🇾', labelKey: 'targetMarkets.countries.uy' },
      { id: 've', flag: '🇻🇪', labelKey: 'targetMarkets.countries.ve' }
    ]
  },
  europe: {
    labelKey: 'targetMarkets.europe',
    countries: [
      { id: 'de', flag: '🇩🇪', labelKey: 'targetMarkets.countries.de' },
      { id: 'at', flag: '🇦🇹', labelKey: 'targetMarkets.countries.at' },
      { id: 'be', flag: '🇧🇪', labelKey: 'targetMarkets.countries.be' },
      { id: 'es', flag: '🇪🇸', labelKey: 'targetMarkets.countries.es' },
      { id: 'fr', flag: '🇫🇷', labelKey: 'targetMarkets.countries.fr' },
      { id: 'nl', flag: '🇳🇱', labelKey: 'targetMarkets.countries.nl' },
      { id: 'it', flag: '🇮🇹', labelKey: 'targetMarkets.countries.it' },
      { id: 'pt', flag: '🇵🇹', labelKey: 'targetMarkets.countries.pt' },
      { id: 'gb', flag: '🇬🇧', labelKey: 'targetMarkets.countries.gb' },
      { id: 'se', flag: '🇸🇪', labelKey: 'targetMarkets.countries.se' },
      { id: 'ch', flag: '🇨🇭', labelKey: 'targetMarkets.countries.ch' }
    ]
  },
  asia: {
    labelKey: 'targetMarkets.asia',
    countries: [
      { id: 'cn', flag: '🇨🇳', labelKey: 'targetMarkets.countries.cn' },
      { id: 'in', flag: '🇮🇳', labelKey: 'targetMarkets.countries.in' },
      { id: 'jp', flag: '🇯🇵', labelKey: 'targetMarkets.countries.jp' },
      { id: 'kr', flag: '🇰🇷', labelKey: 'targetMarkets.countries.kr' },
      { id: 'sg', flag: '🇸🇬', labelKey: 'targetMarkets.countries.sg' },
      { id: 'hk', flag: '🇭🇰', labelKey: 'targetMarkets.countries.hk' },
      { id: 'ae', flag: '🇦🇪', labelKey: 'targetMarkets.countries.ae' }
    ]
  }
};

export default function RegionSelector({ selected = [], onChange }) {
  const { t } = useTranslation();

  const toggle = (id) => {
    onChange(selected.includes(id) ? selected.filter(i => i !== id) : [...selected, id]);
  };

  const toggleAll = (ids) => {
    const allIn = ids.every(id => selected.includes(id));
    if (allIn) {
      onChange(selected.filter(id => !ids.includes(id)));
    } else {
      const merged = [...new Set([...selected, ...ids])];
      onChange(merged);
    }
  };

  return (
    <div className="space-y-5">
      {Object.entries(REGIONS).map(([key, region]) => {
        const ids = region.countries.map(c => c.id);
        const allIn = ids.every(id => selected.includes(id));
        return (
          <div key={key}>
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-white/60 text-xs font-semibold tracking-wider uppercase">{t(region.labelKey)}</span>
              {region.countries.length > 1 && (
                <button
                  type="button"
                  onClick={() => toggleAll(ids)}
                  className={`text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md transition-all ${
                    allIn ? 'bg-[#2bc196]/20 text-[#2bc196]' : 'bg-white/5 text-white/30 hover:text-white/50'
                  }`}
                >
                  {allIn ? t('targetMarkets.deselectAll') : t('targetMarkets.selectAll')}
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {region.countries.map(c => (
                <ToggleChip
                  key={c.id}
                  label={t(c.labelKey)}
                  flag={c.flag}
                  selected={selected.includes(c.id)}
                  onClick={() => toggle(c.id)}
                />
              ))}
            </div>
          </div>
        );
      })}
      {selected.length > 0 && (
        <p className="text-white/30 text-xs">{selected.length} {t('targetMarkets.selected')}</p>
      )}
    </div>
  );
}