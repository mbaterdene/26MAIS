import { InlineEdit } from '../../../components/shared/InlineEdit';

interface GenericContentPreviewProps {
  content: Record<string, any>;
  onUpdate: (path: string, value: any) => void;
  title?: string;
  subtitle?: string;
}

/**
 * Generic preview for content that doesn't have a specific preview component
 * Shows a simplified card-based layout with inline editing
 */
export function GenericContentPreview({
  content,
  onUpdate,
  title = 'Content',
  subtitle = '',
}: GenericContentPreviewProps) {
  return (
    <div className="space-y-8 bg-white p-8 rounded-lg border border-gray-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-12 text-center">
        {subtitle && <p className="text-sm font-bold tracking-widest uppercase text-gray-600 mb-4">{subtitle}</p>}
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-black">{title}</h1>
      </div>

      {/* Content Display */}
      <div className="space-y-6 max-w-3xl mx-auto">
        {Array.isArray(content) ? (
          // Array content (like events, clubs, etc.)
          content.map((item, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:border-blue-300 transition-colors">
              {typeof item === 'object' && item !== null ? (
                <div className="space-y-3">
                  {Object.entries(item).map(([key, value]) => (
                    <div key={`${index}-${key}`}>
                      <p className="text-xs font-bold uppercase text-gray-600 mb-1">{key.replace(/_/g, ' ')}</p>
                      {typeof value === 'string' ? (
                        <InlineEdit
                          value={String(value)}
                          onChange={(newValue) => onUpdate(`[${index}].${key}`, newValue)}
                          multiline={String(value).length > 50}
                          className="block w-full"
                        />
                      ) : (
                        <p className="text-gray-700 font-mono text-sm">{JSON.stringify(value)}</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <InlineEdit
                  value={String(item)}
                  onChange={(newValue) => onUpdate(`[${index}]`, newValue)}
                  className="block w-full"
                />
              )}
            </div>
          ))
        ) : (
          // Object content (like school info)
          Object.entries(content).map(([key, value]) => (
            <div key={key} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <p className="text-sm font-bold uppercase text-gray-600 mb-2">{key.replace(/_/g, ' ')}</p>
              {typeof value === 'string' ? (
                <InlineEdit
                  value={value}
                  onChange={(newValue) => onUpdate(key, newValue)}
                  multiline={value.length > 50}
                  className="block w-full"
                />
              ) : typeof value === 'number' ? (
                <InlineEdit
                  value={value}
                  onChange={(newValue) => onUpdate(key, parseInt(newValue) || newValue)}
                  className="block w-full"
                />
              ) : (
                <pre className="bg-white p-2 rounded text-xs overflow-auto text-gray-700 border border-gray-300">
                  {JSON.stringify(value, null, 2)}
                </pre>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
