import { useState, useEffect } from 'react';
import { X, FileText, AlertCircle, Loader2, Eye } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { TiptapEditor } from '../../components/admin/TiptapEditor';
import { NewsPreview } from './NewsPreview';
import { ImageUpload } from './ImageUpload';
import { useCreateNews, useUpdateNews, useNewsById } from '../../hooks/useNews';

interface NewsEditorPageProps {
  mode?: 'create' | 'edit';
}

export function NewsEditorPage({ mode = 'create' }: NewsEditorPageProps) {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [language, setLanguage] = useState<'en' | 'mn'>('en');
  const [formData, setFormData] = useState({
    title_en: '',
    title_mn: '',
    content_en: '',
    content_mn: '',
    image: '' as string,
    status: 'draft' as 'draft' | 'pending' | 'published',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Fetch existing news if editing
  const { data: existingNews, isLoading: isFetching } = useNewsById(id || null);
  const createMutation = useCreateNews();
  const updateMutation = useUpdateNews(id || '');

  useEffect(() => {
    if (existingNews) {
      setFormData({
        title_en: existingNews.title_en || '',
        title_mn: existingNews.title_mn || '',
        content_en: existingNews.content_en || '',
        content_mn: existingNews.content_mn || '',
        image: existingNews.image || '',
        status: existingNews.status || 'draft',
      });
    }
  }, [existingNews]);

  const currentTitle = language === 'en' ? formData.title_en : formData.title_mn;
  const currentContent = language === 'en' ? formData.content_en : formData.content_mn;

  const handleTitleChange = (value: string) => {
    if (language === 'en') {
      setFormData({ ...formData, title_en: value });
    } else {
      setFormData({ ...formData, title_mn: value });
    }
  };

  const handleContentChange = (value: string) => {
    if (language === 'en') {
      setFormData({ ...formData, content_en: value });
    } else {
      setFormData({ ...formData, content_mn: value });
    }
  };

  const handleSave = async () => {
    setError('');
    
    // Validation
    if (!formData.title_en.trim() || !formData.title_mn.trim()) {
      setError('Both English and Mongolian titles are required.');
      return;
    }
    if (!formData.content_en.trim() || !formData.content_mn.trim()) {
      setError('Both English and Mongolian content are required.');
      return;
    }
    if (!formData.image) {
      setError('Cover image is required.');
      return;
    }

    setIsLoading(true);
    try {
      if (mode === 'create') {
        await createMutation.mutateAsync(formData as any);
      } else if (id) {
        await updateMutation.mutateAsync({
          ...formData,
        } as any);
      }
      navigate('/admin/news');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while saving.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="animate-spin text-cardinal-red" size={32} />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-gray-900 flex items-center gap-3">
            <div className="bg-cardinal-red/10 p-2 rounded-lg text-cardinal-red">
              <FileText size={24} />
            </div>
            {mode === 'create' ? 'Create News Article' : 'Edit News Article'}
          </h1>
          <p className="text-gray-500 mt-1">
            {mode === 'create'
              ? 'Add a new news article with bilingual support'
              : 'Update the news article with bilingual content'}
          </p>
        </div>
        <button
          onClick={() => navigate('/admin/news')}
          className="p-2 text-gray-400 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X size={24} />
        </button>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-xl flex items-center gap-3 border border-red-200">
          <AlertCircle size={20} />
          <span className="font-medium text-sm">{error}</span>
        </div>
      )}

      {/* Main Form */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Language Tabs */}
        <div className="flex border-b border-gray-100">
          <button
            onClick={() => setLanguage('en')}
            className={`flex-1 py-4 text-center font-semibold transition-colors ${
              language === 'en'
                ? 'text-cardinal-red bg-cardinal-red/5 border-b-2 border-cardinal-red'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            🇺🇸 English
          </button>
          <button
            onClick={() => setLanguage('mn')}
            className={`flex-1 py-4 text-center font-semibold transition-colors ${
              language === 'mn'
                ? 'text-cardinal-red bg-cardinal-red/5 border-b-2 border-cardinal-red'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            🇲🇳 Mongolian
          </button>
        </div>

        {/* Form Content */}
        <div className="p-8 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {language === 'en' ? 'English' : 'Mongolian'} Title <span className="text-cardinal-red">*</span>
            </label>
            <input
              type="text"
              placeholder={language === 'en' ? 'Enter English title...' : 'Монгол гарчгийг оруулна уу...'}
              value={currentTitle}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cardinal-red/20 focus:border-cardinal-red outline-none transition-all text-gray-900 font-medium"
            />
          </div>

          {/* Rich Text Content Editor */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {language === 'en' ? 'English' : 'Mongolian'} Content <span className="text-cardinal-red">*</span>
            </label>
            <TiptapEditor
              initialContent={currentContent}
              onChange={handleContentChange}
              placeholder={
                language === 'en'
                  ? 'Start typing the article content here...'
                  : 'Нийтлэлийн контентыг энд бичнэ үү...'
              }
            />
          </div>
        </div>
      </div>

      {/* Settings Panel */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-6">
        <h2 className="text-lg font-bold text-gray-900">Article Settings</h2>

        {/* Cover Image Upload */}
        <ImageUpload
          value={formData.image}
          onChange={(url: string) => setFormData({ ...formData, image: url })}
        />

        {/* Status */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Publication Status</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cardinal-red/20 focus:border-cardinal-red outline-none transition-all text-gray-900"
          >
            <option value="draft">Draft (Work in Progress)</option>
            <option value="pending">Pending (Awaiting Approval)</option>
            <option value="published">Published (Live on Site)</option>
          </select>
          <p className="text-xs text-gray-500 mt-2">
            {formData.status === 'draft' && 'Saved as draft. Only visible to admins.'}
            {formData.status === 'pending' && 'Submitted for approval. Waiting for admin confirmation.'}
            {formData.status === 'published' && 'Articles will be visible on the public news page.'}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-end gap-3 sticky bottom-0 bg-white/95 backdrop-blur p-6 rounded-2xl shadow-sm border border-gray-100">
        <button
          onClick={() => navigate('/admin/news')}
          className="px-6 py-3 text-sm font-bold text-gray-600 hover:text-gray-900 bg-white border border-gray-200 rounded-lg transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={() => setShowPreview(true)}
          className="px-6 py-3 text-sm font-bold text-gray-600 hover:text-gray-900 bg-white border border-gray-200 rounded-lg transition-colors flex items-center gap-2"
        >
          <Eye size={16} />
          Preview
        </button>
        <button
          onClick={handleSave}
          disabled={isLoading}
          className="px-6 py-3 text-sm font-bold text-white bg-cardinal-red hover:bg-red-800 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors flex items-center gap-2"
        >
          {isLoading && <Loader2 size={16} className="animate-spin" />}
          {mode === 'create' ? 'Create Article' : 'Save Changes'}
        </button>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <NewsPreview
          title_en={formData.title_en}
          title_mn={formData.title_mn}
          content_en={formData.content_en}
          content_mn={formData.content_mn}
          image={formData.image}
          onClose={() => setShowPreview(false)}
        />
      )}
    </div>
  );
}
