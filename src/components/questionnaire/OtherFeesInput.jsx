import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2, Plus } from 'lucide-react';

export default function OtherFeesInput({ fees = [], onChange }) {
  const addFee = () => {
    onChange([...fees, { name: '', value: '', fee_type: 'percentage' }]);
  };

  const updateFee = (index, field, value) => {
    const newFees = [...fees];
    newFees[index] = { ...newFees[index], [field]: value };
    onChange(newFees);
  };

  const removeFee = (index) => {
    onChange(fees.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      {fees.map((fee, index) => (
        <div key={index} className="flex flex-col md:flex-row gap-2 p-3 bg-gray-100 rounded-lg">
          <div className="flex-1">
            <Label className="text-xs text-gray-500">Nome da Taxa</Label>
            <Input
              value={fee.name}
              onChange={(e) => updateFee(index, 'name', e.target.value)}
              placeholder="Ex: Taxa de Manutenção"
            />
          </div>
          <div className="w-full md:w-28">
            <Label className="text-xs text-gray-500">Valor</Label>
            <Input
              type="number"
              step="0.01"
              value={fee.value}
              onChange={(e) => updateFee(index, 'value', e.target.value)}
              placeholder="0.00"
            />
          </div>
          <div className="w-full md:w-32">
            <Label className="text-xs text-gray-500">Tipo</Label>
            <Select
              value={fee.fee_type}
              onValueChange={(value) => updateFee(index, 'fee_type', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="percentage">% (Percentual)</SelectItem>
                <SelectItem value="fixed_usd">US$ (Fixo)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => removeFee(index)}
              className="text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
      
      <Button
        type="button"
        variant="outline"
        onClick={addFee}
        className="w-full border-dashed"
      >
        <Plus className="h-4 w-4 mr-2" />
        Adicionar Outra Taxa
      </Button>
    </div>
  );
}