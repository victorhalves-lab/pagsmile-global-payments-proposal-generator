import React from 'react';
import { Wallet, Building, Banknote } from 'lucide-react';
import SelectionButton from './SelectionButton';
import { useTranslation } from 'react-i18next';

const METHODS = [
  { id: 'E-wallet', icon: Wallet, labelKey: 'compliance.pmEwallet', descKey: 'compliance.pmEwalletDesc' },
  { id: 'Bank Transfer (Including PIX)', icon: Building, labelKey: 'compliance.pmBankTransfer', descKey: 'compliance.pmBankTransferDesc' },
  { id: 'Cash Payment', icon: Banknote, labelKey: 'compliance.pmCash', descKey: 'compliance.pmCashDesc' }
];

export default function PaymentMethodSelector({ selected = [], onChange }) {
  const { t } = useTranslation();

  const toggle = (id) => {
    onChange(selected.includes(id) ? selected.filter(i => i !== id) : [...selected, id]);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {METHODS.map(m => (
        <SelectionButton
          key={m.id}
          label={t(m.labelKey)}
          description={t(m.descKey)}
          icon={m.icon}
          selected={selected.includes(m.id)}
          onClick={() => toggle(m.id)}
        />
      ))}
    </div>
  );
}