import { X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { bil } from '../../lib/utils';

interface NewsPreviewProps {
  title_en: string;
  title_mn: string;
  content_en: string;
  content_mn: string;
  image: string;
  onClose: () => void;
}

export function NewsPreview({ title_en, title_mn, content_en, content_mn, image, onClose }: NewsPreviewProps) {
  const { isEnglish } = useLanguage();
  const title = bil(isEnglish, title_en, title_mn);
  const content = bil(isEnglish, content_en, content_mn);

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Preview</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 p-8">
          <div className="prose prose-sm max-w-none">
            {image && (
              <div className="mb-6 rounded-lg overflow-hidden">
                <img
                  src={image}
                  alt={title}
                  className="w-full h-80 object-cover"
                />
              </div>
            )}
            <h1 className="text-3xl font-serif font-bold text-gray-900 mb-6">{title}</h1>
            <div
              className="text-gray-700 leading-relaxed space-y-4"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-100 bg-gray-50">
          <button
            onClick={onClose}
            className="px-6 py-2 text-sm font-bold text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
