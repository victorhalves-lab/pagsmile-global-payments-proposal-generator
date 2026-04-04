import React from 'react';
import { Wallet, Building, Banknote } from 'lucide-react';
import SelectionButton from './SelectionButton';

const METHODS = [
  { id: 'E-wallet', icon: Wallet, labelKey: 'E-wallet', descKey: 'Google Pay, Apple Pay, etc.' },
  { id: 'Bank Transfer (Including PIX)', icon: Building, labelKey: 'Bank Transfer', descKey: 'PIX, Wire transfer, ACH' },
  { id: 'Cash Payment', icon: Banknote, labelKey: 'Cash Payment', descKey: 'Boleto, OXXO, etc.' }
];

export default function PaymentMethodSelector({ selected = [], onChange }) {
  const toggle = (id) => {
    onChange(selected.includes(id) ? selected.filter(i => i !== id) : [...selected, id]);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
      {METHODS.map(m => (
        <SelectionButton
          key={m.id}
          label={m.labelKey}
          description={m.descKey}
          icon={m.icon}
          selected={selected.includes(m.id)}
          onClick={() => toggle(m.id)}
        />
      ))}
    </div>
  );
}