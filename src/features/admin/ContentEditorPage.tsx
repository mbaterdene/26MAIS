import { useState } from 'react';
import { ChevronRight, RotateCcw, CheckCircle, Github, ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { bil } from '../../lib/utils';
import { useEditableContent } from '../../hooks/useEditableContent';
import { contentEditorService } from '../../services/contentEditorService';
import { CONTENT_PAGES, getContentPageByKey } from '../../data/contentRegistry';
import { AboutPageEditor } from './previews/AboutPageEditor';
import { AlumniContentPreview } from './previews/AlumniContentPreview';
import { EventsContentPreview } from './previews/EventsContentPreview';
import { AcademicsContentEditor } from './previews/AcademicsContentEditor';
import { StaffContentEditor } from './previews/StaffContentEditor';
import { FAQContentEditor } from './previews/FAQContentEditor';
import { ContactPageEditor } from './previews/ContactPageEditor';
import { GitHubSettingsPage } from './previews/GitHubSettingsPage';
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
    case 'subjects':
      return <AcademicsContentEditor content={content} onUpdate={onUpdate} />;
    case 'staff':
      return <StaffContentEditor content={content} onUpdate={onUpdate} />;
    case 'faq':
      return <FAQContentEditor content={content} onUpdate={onUpdate} />;
    case 'contact':
      return <ContactPageEditor content={content} onUpdate={onUpdate} />;
    case 'github-settings':
      return <GitHubSettingsPage />;
    default:
      return <GenericContentPreview content={content} onUpdate={onUpdate} />;
  }
}

export function ContentEditorPage() {
  const { isEnglish } = useLanguage();
  const [selectedPageKey, setSelectedPageKey] = useState('about');
  const [successMessage, setSuccessMessage] = useState('');
  const [showChangesPreview, setShowChangesPreview] = useState(false);

  const isGitHubSettings = selectedPageKey === 'github-settings';
  const currentPage = isGitHubSettings ? null : getContentPageByKey(selectedPageKey);
  
  if (!isGitHubSettings && !currentPage) {
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

  const contentData = isGitHubSettings ? {} : (currentPage?.data || {});

  const {
    content,
    updateField,
    clearChanges,
    hasChanges,
    changeCount,
  } = useEditableContent(selectedPageKey, contentData);

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
      {/* Mobile Access Restriction */}
      <div className="lg:hidden fixed inset-0 z-50 bg-white flex items-center justify-center p-4">
        <div className="text-center max-w-sm">
          <div className="mb-4 text-5xl">🖥️</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {isEnglish ? 'Desktop Only' : 'Компьютер түгээмэл'}
          </h1>
          <p className="text-gray-600 mb-6">
            {isEnglish
              ? 'Please access the admin panel from a computer for the best experience and to prevent accidental changes.'
              : 'Компьютер ашиглан админ панель руу орно уу. Сайтай ажиллагаа болон санамсаргүй өөрчлөлтөөс урьлах хэрэгтэй.'}
          </p>
          <a
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            {isEnglish ? 'Back to Home' : 'Үйл ажиллагаа руу буцах'}
          </a>
        </div>
      </div>

      {/* Desktop Content */}
      <div className="hidden lg:block">
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
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setShowChangesPreview(!showChangesPreview)}
                      className="w-full flex items-center justify-between p-4 hover:bg-yellow-100 transition-colors"
                    >
                      <div className="text-left">
                        <p className="text-sm font-semibold text-yellow-900">
                          {totalChanges} pending change{totalChanges !== 1 ? 's' : ''}
                        </p>
                        <p className="text-xs text-yellow-800 mt-1">
                          {isEnglish ? 'Tap to view changes' : 'Өөрчлөлтийг харахын тулд дар'}
                        </p>
                      </div>
                      {showChangesPreview ? (
                        <ChevronUp size={16} className="text-yellow-700" />
                      ) : (
                        <ChevronDown size={16} className="text-yellow-700" />
                      )}
                    </button>

                    {/* Changes Preview */}
                    {showChangesPreview && (
                      <div className="border-t border-yellow-200 bg-white p-4 space-y-2 max-h-80 overflow-y-auto">
                        {Object.entries(contentEditorService.getPendingChanges()).map(([file, changes]) => (
                          <div key={file} className="border border-yellow-200 rounded p-3 bg-yellow-50 text-xs">
                            <p className="font-semibold text-yellow-900 mb-2">{file}</p>
                            <div className="space-y-1">
                              {changes.slice(0, 3).map((change, idx) => (
                                <p key={idx} className="text-yellow-800 font-mono">
                                  {change.path}: {typeof change.newValue === 'string' ? change.newValue.substring(0, 30) : JSON.stringify(change.newValue).substring(0, 30)}...
                                </p>
                              ))}
                              {changes.length > 3 && (
                                <p className="text-yellow-700 italic">+{changes.length - 3} more</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="border-t border-yellow-200 p-4 space-y-2">
                      <button
                        onClick={() => setSelectedPageKey('github-settings')}
                        className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
                      >
                        <Github size={16} />
                        {isEnglish ? 'Go to GitHub' : 'GitHub руу'}
                      </button>
                    </div>
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
                  {isGitHubSettings ? (
                    <>
                      <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <Github size={24} />
                        {isEnglish ? 'GitHub Settings & Commit' : 'GitHub Тохиргоо & Илгээх'}
                      </h2>
                      <p className="text-gray-600 text-sm mt-1">
                        {isEnglish ? 'Configure and commit your changes to GitHub' : 'GitHub руу өөрчлөлтүүдийг илгээнэ'}
                      </p>
                    </>
                  ) : (
                    <>
                      <h2 className="text-2xl font-bold text-gray-900">
                        {currentPage && bil(isEnglish, currentPage.label, currentPage.label_mn)}
                      </h2>
                      <p className="text-gray-600 text-sm mt-1">{currentPage?.description}</p>
                    </>
                  )}
                </div>
                {!isGitHubSettings && hasChanges && (
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
              {!isGitHubSettings && hasChanges && (
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
    </div>
  );
}
