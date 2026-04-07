import { useState } from 'react';
import { Edit2, X, Check, RotateCcw } from 'lucide-react';

interface EditableFieldProps {
  label: string;
  path: string;
  value: any;
  isChanged: boolean;
  originalValue?: any;
  onUpdate: (path: string, value: any) => void;
  onRevert: (path: string) => void;
}

export function EditableField({
  label,
  path,
  value,
  isChanged,
  originalValue,
  onUpdate,
  onRevert,
}: EditableFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(String(value));

  const handleSave = () => {
    onUpdate(path, editValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(String(value));
    setIsEditing(false);
  };

  const displayValue = String(value);

  return (
    <div
      className={`p-4 rounded-lg border-2 transition-all ${
        isChanged
          ? 'bg-yellow-50 border-yellow-400'
          : 'bg-white border-gray-200'
      }`}
    >
      <div className="flex items-start justify-between mb-2">
        <label className="text-sm font-semibold text-gray-700">{label}</label>
        <div className="flex items-center gap-2">
          {isChanged && (
            <span className="text-xs font-bold text-yellow-700 bg-yellow-100 px-2 py-1 rounded">
              Modified
            </span>
          )}
          {!isEditing && (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="p-1 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                title="Edit field"
              >
                <Edit2 size={16} />
              </button>
              {isChanged && (
                <button
                  onClick={() => {
                    onRevert(path);
                    setEditValue(String(originalValue));
                  }}
                  className="p-1 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                  title="Revert to original"
                >
                  <RotateCcw size={16} />
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {isEditing ? (
        <div className="space-y-2">
          <textarea
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={value.length > 50 ? 4 : 2}
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm"
            >
              <Check size={14} />
              Save
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center gap-1 px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors text-sm"
            >
              <X size={14} />
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div>
          <p className="text-gray-700 font-mono text-sm break-words">{displayValue}</p>
          {isChanged && originalValue !== undefined && (
            <p className="mt-2 text-xs text-gray-500">
              Original: <span className="font-mono">{String(originalValue)}</span>
            </p>
          )}
        </div>
      )}
    </div>
  );
}
