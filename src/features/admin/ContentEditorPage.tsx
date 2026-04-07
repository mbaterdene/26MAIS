import { useState } from 'react';
import { ChevronRight, RotateCcw, CheckCircle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { bil } from '../../lib/utils';
import { GitHubSettings } from './GitHubSettings';
import { useEditableContent } from '../../hooks/useEditableContent';
import { contentEditorService } from '../../services/contentEditorService';
import { CONTENT_PAGES, getContentPageByKey } from '../../data/contentRegistry';
import { AboutPageEditor } from './previews/AboutPageEditor';
import { AlumniContentPreview } from './previews/AlumniContentPreview';
import { EventsContentPreview } from './previews/EventsContentPreview';
import { GenericContentPreview } from './previews/GenericContentPreview';

/**
 * Render the appropriate preview component based on content page
 */
function renderPreview(
  pageKey: string,
  content: any,
  onUpdate: (path: string, value: any) => void,
  isEnglish: boolean
) {
  switch (pageKey) {
    case 'about':
      return <AboutPageEditor content={content} onUpdate={onUpdate} />;
    case 'alumni':
      return <AlumniContentPreview content={content} onUpdate={onUpdate} />;
    case 'events':
      return <EventsContentPreview content={content} onUpdate={onUpdate} isEnglish={isEnglish} />;
    default:
      return <GenericContentPreview content={content} onUpdate={onUpdate} />;
  }
}

export function ContentEditorPage() {
  const { isEnglish } = useLanguage();
  const [selectedPageKey, setSelectedPageKey] = useState('about');
  const [successMessage, setSuccessMessage] = useState('');

  const currentPage = getContentPageByKey(selectedPageKey);
  if (!currentPage) {
    return (
      <div className="min-h-screen bg-gray-50 pt-28 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-red-600">Page not found</h1>
          </div>
        </div>
      </div>
    );
  }

  const {
    content,
    updateField,
    clearChanges,
    hasChanges,
    changeCount,
  } = useEditableContent(selectedPageKey, currentPage.data);

  const totalChanges = Object.values(contentEditorService.getPendingChanges()).reduce(
    (sum, changes) => sum + changes.length,
    0
  );

  const handleClearChanges = () => {
    if (window.confirm('Are you sure you want to clear all changes for this page?')) {
      clearChanges();
      setSuccessMessage('Changes cleared');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-serif font-bold text-black mb-2">Content Editor</h1>
          <p className="text-gray-600">
            Edit all school content directly. Changes are saved temporarily and can be committed together.
          </p>
        </div>

        {/* Messages */}
        {successMessage && (
          <div className="mb-6 flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
            <CheckCircle size={20} className="text-green-600" />
            <span className="text-green-700">{successMessage}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Page Navigator */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-32 space-y-6">
              <div>
                <h2 className="text-lg font-bold text-gray-900 mb-4">Content Pages</h2>
                <div className="space-y-2">
                  {CONTENT_PAGES.map((page) => (
                    <button
                      key={page.key}
                      onClick={() => setSelectedPageKey(page.key)}
                      className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center justify-between ${
                        selectedPageKey === page.key
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <div>
                        <p className="font-medium">
                          {bil(isEnglish, page.label, page.label_mn)}
                        </p>
                        <p className={`text-xs ${selectedPageKey === page.key ? 'text-blue-100' : 'text-gray-500'}`}>
                          {page.description}
                        </p>
                      </div>
                      {selectedPageKey === page.key && <ChevronRight size={16} />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Changes Summary */}
              {totalChanges > 0 && (
                <div className="pt-6 border-t border-gray-200">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-sm font-semibold text-yellow-900 mb-3">
                      {totalChanges} pending change{totalChanges !== 1 ? 's' : ''}
                    </p>
                    <GitHubSettings />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Main Content - Editor */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {bil(isEnglish, currentPage.label, currentPage.label_mn)}
                  </h2>
                  <p className="text-gray-600 text-sm mt-1">{currentPage.description}</p>
                </div>
                {hasChanges && (
                  <button
                    onClick={handleClearChanges}
                    className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium text-sm"
                  >
                    <RotateCcw size={16} />
                    Clear Changes
                  </button>
                )}
              </div>

              {/* Content Preview */}
              {renderPreview(selectedPageKey, content, updateField, isEnglish)}

              {/* Status */}
              {hasChanges && (
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    {changeCount} field{changeCount !== 1 ? 's' : ''} changed on this page
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
