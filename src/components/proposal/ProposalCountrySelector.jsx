import React from 'react';
import { Globe } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const REGIONS = [
  {
    label: 'USA',
    countries: [
      { id: 'us', flag: '🇺🇸', name: 'United States' }
    ]
  },
  {
    label: 'Latin America',
    countries: [
      { id: 'ar', flag: '🇦🇷', name: 'Argentina' },
      { id: 'bo', flag: '🇧🇴', name: 'Bolivia' },
      { id: 'br', flag: '🇧🇷', name: 'Brazil' },
      { id: 'cl', flag: '🇨🇱', name: 'Chile' },
      { id: 'co', flag: '🇨🇴', name: 'Colombia' },
      { id: 'ec', flag: '🇪🇨', name: 'Ecuador' },
      { id: 'mx', flag: '🇲🇽', name: 'Mexico' },
      { id: 'py', flag: '🇵🇾', name: 'Paraguay' },
      { id: 'pe', flag: '🇵🇪', name: 'Peru' },
      { id: 'uy', flag: '🇺🇾', name: 'Uruguay' },
      { id: 've', flag: '🇻🇪', name: 'Venezuela' }
    ]
  },
  {
    label: 'Europe',
    countries: [
      { id: 'de', flag: '🇩🇪', name: 'Germany' },
      { id: 'at', flag: '🇦🇹', name: 'Austria' },
      { id: 'be', flag: '🇧🇪', name: 'Belgium' },
      { id: 'es', flag: '🇪🇸', name: 'Spain' },
      { id: 'fr', flag: '🇫🇷', name: 'France' },
      { id: 'nl', flag: '🇳🇱', name: 'Netherlands' },
      { id: 'it', flag: '🇮🇹', name: 'Italy' },
      { id: 'pt', flag: '🇵🇹', name: 'Portugal' },
      { id: 'gb', flag: '🇬🇧', name: 'United Kingdom' },
      { id: 'se', flag: '🇸🇪', name: 'Sweden' },
      { id: 'ch', flag: '🇨🇭', name: 'Switzerland' }
    ]
  },
  {
    label: 'Asia & Middle East',
    countries: [
      { id: 'cn', flag: '🇨🇳', name: 'China' },
      { id: 'in', flag: '🇮🇳', name: 'India' },
      { id: 'jp', flag: '🇯🇵', name: 'Japan' },
      { id: 'kr', flag: '🇰🇷', name: 'South Korea' },
      { id: 'sg', flag: '🇸🇬', name: 'Singapore' },
      { id: 'hk', flag: '🇭🇰', name: 'Hong Kong' },
      { id: 'ae', flag: '🇦🇪', name: 'UAE' }
    ]
  }
];

export default function ProposalCountrySelector({ selectedCountries = [], onChange }) {
  const toggle = (id) => {
    const updated = selectedCountries.includes(id)
      ? selectedCountries.filter(c => c !== id)
      : [...selectedCountries, id];
    onChange(updated);
  };

  const toggleRegion = (countries) => {
    const ids = countries.map(c => c.id);
    const allSelected = ids.every(id => selectedCountries.includes(id));
    if (allSelected) {
      onChange(selectedCountries.filter(id => !ids.includes(id)));
    } else {
      const newIds = ids.filter(id => !selectedCountries.includes(id));
      onChange([...selectedCountries, ...newIds]);
    }
  };

  return (
    <div className="space-y-4">
      {REGIONS.map(region => {
        const regionIds = region.countries.map(c => c.id);
        const allSelected = regionIds.every(id => selectedCountries.includes(id));
        const someSelected = regionIds.some(id => selectedCountries.includes(id));

        return (
          <div key={region.label}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/60 text-sm font-medium">{region.label}</span>
              <button
                type="button"
                onClick={() => toggleRegion(region.countries)}
                className={`text-xs px-2.5 py-1 rounded-lg transition-all ${
                  allSelected
                    ? 'bg-[#2bc196] text-[#002443]'
                    : someSelected
                    ? 'bg-[#2bc196]/20 text-[#2bc196]'
                    : 'bg-white/10 text-white/50 hover:bg-white/15'
                }`}
              >
                {allSelected ? 'Desmarcar' : 'Selecionar'}
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {region.countries.map(country => (
                <button
                  key={country.id}
                  type="button"
                  onClick={() => toggle(country.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                    selectedCountries.includes(country.id)
                      ? 'bg-[#2bc196] text-[#002443] border-[#2bc196]'
                      : 'bg-white/5 text-white/60 border-white/10 hover:border-white/20 hover:bg-white/10'
                  }`}
                >
                  <span>{country.flag}</span>
                  <span>{country.name}</span>
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}