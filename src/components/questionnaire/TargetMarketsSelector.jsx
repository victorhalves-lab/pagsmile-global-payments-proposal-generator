import React from 'react';
import { Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const REGIONS = {
  usa: {
    labelKey: 'targetMarkets.usa',
    countries: [
      { id: 'us', flag: '🇺🇸', labelKey: 'targetMarkets.countries.us' }
    ]
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

function CountryButton({ country, isSelected, onToggle, t }) {
  return (
    <button
      type="button"
      onClick={() => onToggle(country.id)}
      className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border-2 transition-all duration-200 text-sm font-medium ${
        isSelected
          ? 'border-[#2bc196] bg-[#2bc196]/10 text-[#1a7d61] shadow-sm'
          : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50'
      }`}
    >
      <span className="text-lg leading-none">{country.flag}</span>
      <span>{t(country.labelKey)}</span>
    </button>
  );
}

function RegionGroup({ regionKey, region, selectedCountries, onToggleCountry, onSelectAll, t }) {
  const regionCountryIds = region.countries.map(c => c.id);
  const allSelected = regionCountryIds.every(id => selectedCountries.includes(id));
  const someSelected = regionCountryIds.some(id => selectedCountries.includes(id));

  // For USA region with single country, just show the button
  if (regionKey === 'usa') {
    const country = region.countries[0];
    return (
      <div>
        <CountryButton
          country={country}
          isSelected={selectedCountries.includes(country.id)}
          onToggle={onToggleCountry}
          t={t}
        />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-gray-800">{t(region.labelKey)}</h4>
        <button
          type="button"
          onClick={() => onSelectAll(regionCountryIds, !allSelected)}
          className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-all ${
            allSelected
              ? 'bg-[#2bc196] text-white'
              : someSelected
              ? 'bg-[#2bc196]/20 text-[#1a7d61] hover:bg-[#2bc196]/30'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {allSelected ? t('targetMarkets.deselectAll') : t('targetMarkets.selectAll')}
        </button>
      </div>
      <div className="flex flex-wrap gap-2">
        {region.countries.map(country => (
          <CountryButton
            key={country.id}
            country={country}
            isSelected={selectedCountries.includes(country.id)}
            onToggle={onToggleCountry}
            t={t}
          />
        ))}
      </div>
    </div>
  );
}

export default function TargetMarketsSelector({ selectedCountries = [], onChange }) {
  const { t } = useTranslation();

  const handleToggleCountry = (countryId) => {
    const updated = selectedCountries.includes(countryId)
      ? selectedCountries.filter(id => id !== countryId)
      : [...selectedCountries, countryId];
    onChange(updated);
  };

  const handleSelectAll = (countryIds, select) => {
    let updated;
    if (select) {
      const newIds = countryIds.filter(id => !selectedCountries.includes(id));
      updated = [...selectedCountries, ...newIds];
    } else {
      updated = selectedCountries.filter(id => !countryIds.includes(id));
    }
    onChange(updated);
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-[#2bc196] to-[#25a882] rounded-xl flex items-center justify-center shadow-lg shadow-[#2bc196]/20">
          <Globe className="h-6 w-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-[#002443]">{t('targetMarkets.title')}</h3>
          <p className="text-sm text-gray-500">{t('targetMarkets.subtitle')}</p>
        </div>
      </div>

      <div className="space-y-6">
        {Object.entries(REGIONS).map(([key, region]) => (
          <RegionGroup
            key={key}
            regionKey={key}
            region={region}
            selectedCountries={selectedCountries}
            onToggleCountry={handleToggleCountry}
            onSelectAll={handleSelectAll}
            t={t}
          />
        ))}
      </div>

      {selectedCountries.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-500">
            {t('targetMarkets.selected')}: <span className="font-semibold text-[#2bc196]">{selectedCountries.length}</span>
          </p>
        </div>
      )}
    </div>
  );
}