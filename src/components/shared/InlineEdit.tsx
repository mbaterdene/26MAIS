import { useState } from 'react';
import { Edit2, Check, X } from 'lucide-react';

interface InlineEditProps {
  value: string | number;
  onChange: (value: any) => void;
  multiline?: boolean;
  className?: string;
}

export function InlineEdit({ value, onChange, multiline = false, className = '' }: InlineEditProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(String(value));

  const handleSave = () => {
    onChange(editValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(String(value));
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="inline-block relative group">
        {multiline ? (
          <textarea
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="w-full p-2 border-2 border-blue-500 rounded font-inherit bg-white"
            rows={3}
            autoFocus
            onFocus={(e) => e.target.select()}
          />
        ) : (
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="px-2 py-1 border-2 border-blue-500 rounded font-inherit bg-white"
            autoFocus
            onFocus={(e) => e.target.select()}
          />
        )}
        <div className="flex gap-1 mt-2">
          <button
            onClick={handleSave}
            className="flex items-center gap-1 px-2 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
          >
            <Check size={14} />
            Save
          </button>
          <button
            onClick={handleCancel}
            className="flex items-center gap-1 px-2 py-1 bg-gray-300 text-gray-700 rounded text-sm hover:bg-gray-400"
          >
            <X size={14} />
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`inline-block group cursor-pointer relative py-1 px-2 rounded hover:bg-yellow-50 border-2 border-transparent hover:border-yellow-300 transition-all ${className}`}
      onClick={() => setIsEditing(true)}
    >
      {String(value)}
      <Edit2 size={14} className="absolute top-1 right-1 opacity-0 group-hover:opacity-50 transition-opacity" />
    </div>
  );
}
