import { useState } from 'react';
import { Edit2, X, Check, RotateCcw } from 'lucide-react';

interface DynamicEditableFieldProps {
  label: string;
  path: string;
  value: any;
  isChanged: boolean;
  originalValue?: any;
  onUpdate: (path: string, value: any) => void;
  onRevert: (path: string) => void;
}

export function DynamicEditableField({
  label,
  path,
  value,
  isChanged,
  originalValue,
  onUpdate,
  onRevert,
}: DynamicEditableFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(formatValue(value));
  const [error, setError] = useState('');

  function formatValue(val: any): string {
    if (typeof val === 'object') {
      return JSON.stringify(val, null, 2);
    }
    return String(val);
  }

  function parseValue(str: string, originalType: any): any {
    try {
      // Try to parse as JSON first (for objects/arrays)
      if (str.startsWith('{') || str.startsWith('[')) {
        return JSON.parse(str);
      }
      // Try to parse as number if original was number
      if (typeof originalType === 'number') {
        const num = parseFloat(str);
        if (!isNaN(num)) return num;
      }
      // Try to parse as boolean
      if (str.toLowerCase() === 'true') return true;
      if (str.toLowerCase() === 'false') return false;
      // Return as string
      return str;
    } catch (e) {
      throw new Error('Invalid JSON or format');
    }
  }

  const handleSave = () => {
    try {
      setError('');
      const parsed = parseValue(editValue, value);
      onUpdate(path, parsed);
      setIsEditing(false);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Invalid value');
    }
  };

  const handleCancel = () => {
    setEditValue(formatValue(value));
    setError('');
    setIsEditing(false);
  };

  const displayValue = formatValue(value);
  const isArray = Array.isArray(value);
  const isObject = typeof value === 'object' && value !== null && !isArray;

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
                    setEditValue(formatValue(originalValue));
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
            rows={isObject || isArray ? 6 : 3}
          />
          {error && <p className="text-xs text-red-600">{error}</p>}
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
          {isObject || isArray ? (
            <pre className="text-gray-700 font-mono text-xs bg-gray-50 p-2 rounded overflow-auto max-h-48">
              {displayValue}
            </pre>
          ) : (
            <p className="text-gray-700 font-mono text-sm break-words">{displayValue}</p>
          )}
          {isChanged && originalValue !== undefined && (
            <details className="mt-2 text-xs text-gray-500 cursor-pointer">
              <summary className="hover:text-gray-700">Show original</summary>
              <div className="mt-2 p-2 bg-gray-50 rounded font-mono text-xs break-words max-h-32 overflow-auto">
                {formatValue(originalValue)}
              </div>
            </details>
          )}
        </div>
      )}
    </div>
  );
}
