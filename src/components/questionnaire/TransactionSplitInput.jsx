import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle, CheckCircle } from 'lucide-react';

export default function TransactionSplitInput({ 
  title,
  fields, 
  values, 
  onChange,
  description 
}) {
  const total = fields.reduce((sum, field) => sum + (parseFloat(values[field.key]) || 0), 0);
  const isValid = Math.abs(total - 100) < 0.01;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-medium text-[#002443]">{title}</h4>
          {description && <p className="text-xs text-gray-500">{description}</p>}
        </div>
        <div className={`flex items-center gap-1 text-sm ${isValid ? 'text-green-600' : 'text-amber-600'}`}>
          {isValid ? (
            <CheckCircle className="h-4 w-4" />
          ) : (
            <AlertCircle className="h-4 w-4" />
          )}
          <span>Total: {total.toFixed(0)}%</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {fields.map((field) => (
          <div key={field.key}>
            <Label className="text-xs text-gray-500">{field.label}</Label>
            <div className="relative">
              <Input
                type="number"
                min="0"
                max="100"
                step="1"
                value={values[field.key] || ''}
                onChange={(e) => onChange(field.key, e.target.value)}
                className="pr-8"
                placeholder="0"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">%</span>
            </div>
          </div>
        ))}
      </div>
      
      {!isValid && total > 0 && (
        <p className="text-xs text-amber-600">
          A soma deve ser exatamente 100%. Diferença: {(100 - total).toFixed(0)}%
        </p>
      )}
    </div>
  );
}