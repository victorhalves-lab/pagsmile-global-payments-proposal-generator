import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';

export default function DynamicPersonList({ items, onChange, type, t }) {
  const addItem = () => {
    if (type === 'ubo') {
      onChange([...items, { name: '', nationality: '', address: '', ownership_percentage: '' }]);
    } else {
      onChange([...items, { job_title: '', first_name: '', last_name: '' }]);
    }
  };

  const removeItem = (index) => {
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
        <div key={index} className="bg-white/5 rounded-lg p-4 border border-white/10 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-white/60 text-xs font-medium">#{index + 1}</span>
            {items.length > 1 && (
              <Button type="button" variant="ghost" size="sm" onClick={() => removeItem(index)} className="text-red-400 hover:text-red-300 h-6 w-6 p-0">
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            )}
          </div>
          {type === 'ubo' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Input placeholder="Full Name" value={item.name || ''} onChange={(e) => updateItem(index, 'name', e.target.value)} className="bg-white/5 border-white/20 text-white placeholder:text-white/30" />
              <Input placeholder="Nationality" value={item.nationality || ''} onChange={(e) => updateItem(index, 'nationality', e.target.value)} className="bg-white/5 border-white/20 text-white placeholder:text-white/30" />
              <Input placeholder="Address" value={item.address || ''} onChange={(e) => updateItem(index, 'address', e.target.value)} className="bg-white/5 border-white/20 text-white placeholder:text-white/30" />
              <Input placeholder="% Ownership" type="number" value={item.ownership_percentage || ''} onChange={(e) => updateItem(index, 'ownership_percentage', parseFloat(e.target.value) || '')} className="bg-white/5 border-white/20 text-white placeholder:text-white/30" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Input placeholder="Job Title" value={item.job_title || ''} onChange={(e) => updateItem(index, 'job_title', e.target.value)} className="bg-white/5 border-white/20 text-white placeholder:text-white/30" />
              <Input placeholder="First Name(s)" value={item.first_name || ''} onChange={(e) => updateItem(index, 'first_name', e.target.value)} className="bg-white/5 border-white/20 text-white placeholder:text-white/30" />
              <Input placeholder="Last Name(s)" value={item.last_name || ''} onChange={(e) => updateItem(index, 'last_name', e.target.value)} className="bg-white/5 border-white/20 text-white placeholder:text-white/30" />
            </div>
          )}
        </div>
      ))}
      <Button type="button" variant="outline" onClick={addItem} className="w-full border-dashed border-white/20 text-white/60 hover:text-white bg-transparent">
        <Plus className="h-4 w-4 mr-2" /> {type === 'ubo' ? 'Add UBO' : 'Add Director/Officer'}
      </Button>
    </div>
  );
}