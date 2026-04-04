import React, { useState } from 'react';
import { Input } from '@/components/ui/input';

function formatBRL(value) {
  if (!value && value !== 0) return '';
  const num = typeof value === 'string' ? parseFloat(value.replace(/[^\d]/g, '')) / 100 : value;
  if (isNaN(num)) return '';
  return num.toLocaleString('pt-BR', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });
}

function parseBRL(formatted) {
  const digits = formatted.replace(/[^\d]/g, '');
  return digits ? parseFloat(digits) / 100 : '';
}

export default function CurrencyInput({ value, onChange, className, placeholder, ...props }) {
  const [display, setDisplay] = useState(() => {
    if (value) return formatBRL(value);
    return '';
  });

  const handleChange = (e) => {
    const raw = e.target.value.replace(/[^\d]/g, '');
    if (!raw) {
      setDisplay('');
      onChange('');
      return;
    }
    const num = parseFloat(raw) / 100;
    setDisplay(formatBRL(num));
    onChange(num);
  };

  const handleFocus = () => {
    if (value) {
      setDisplay(formatBRL(value));
    }
  };

  return (
    <Input
      value={display}
      onChange={handleChange}
      onFocus={handleFocus}
      className={className}
      placeholder={placeholder || 'US$ 0,00'}
      inputMode="numeric"
      {...props}
    />
  );
}