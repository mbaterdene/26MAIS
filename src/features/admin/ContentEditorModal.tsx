import { useState, useEffect } from 'react';
import { X, FileText, Image as ImageIcon, AlertCircle } from 'lucide-react';
import { Article } from '../../hooks/useArticles';
import { TiptapEditor } from '../../components/admin/TiptapEditor';

interface ContentEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Article | null;
  onSave: (data: Partial<Article>) => void;
}

export function ContentEditorModal({ isOpen, onClose, initialData, onSave }: ContentEditorModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Student Life',
    status: 'Draft' as 'Published' | 'Draft',
    content: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        category: initialData.category || 'Student Life',
        status: initialData.status || 'Draft',
        content: initialData.content || ''
      });
    } else {
      setFormData({
        title: '',
        description: '',
        category: 'Student Life',
        status: 'Draft',
        content: ''
      });
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleSave = () => {
    // Basic validation
    if (!formData.title.trim()) {
      setError('Article Title cannot be empty.');
      return;
    }
    if (!formData.category.trim()) {
      setError('Category must be selected.');
      return;
    }
    
    setError('');
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 text-left">
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur z-10">
          <h2 className="text-xl font-bold font-serif text-gray-900 flex items-center gap-3">
            <div className="bg-cardinal-red/10 p-2 rounded-lg text-cardinal-red">
              <FileText size={20} />
            </div>
            {initialData ? 'Edit Article' : 'Create New Article'}
          </h2>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors focus:outline-none"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body Form */}
        <div className="p-8 space-y-8">
          {error && (
            <div className="bg-red-50 text-red-700 p-4 rounded-xl flex items-center gap-3 border border-red-200">
              <AlertCircle size={20} />
              <span className="font-medium text-sm">{error}</span>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column (Main Content) */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Article Title <span className="text-cardinal-red">*</span></label>
                <input
                  type="text"
                  placeholder="Enter a descriptive title..."
                  className={`w-full px-4 py-3 bg-gray-50 border ${!formData.title.trim() && error ? 'border-red-300 ring-1 ring-red-300' : 'border-gray-200'} rounded-xl focus:ring-2 focus:ring-cardinal-red/20 focus:border-cardinal-red outline-none transition-all text-gray-900 font-medium`}
                  value={formData.title}
                  onChange={(e) => { setError(''); setFormData({ ...formData, title: e.target.value }) }}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Short Description</label>
                <textarea
                  placeholder="Brief summary for thumbnails and SEO..."
                  rows={2}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cardinal-red/20 focus:border-cardinal-red outline-none transition-all text-gray-900 resize-none font-medium"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Main Body (Rich Text)</label>
                <TiptapEditor
                  initialContent={formData.content}
                  onChange={(content) => setFormData({ ...formData, content })}
                  placeholder="Start typing the article content here..."
                />
              </div>
            </div>

            {/* Right Column (Settings & Image) */}
            <div className="space-y-6">
              
              {/* Category Dropdown */}
              <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Category <span className="text-cardinal-red">*</span></label>
                <select 
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-cardinal-red/20 focus:border-cardinal-red appearance-none cursor-pointer"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="Student Life">Student Life</option>
                  <option value="Academics">Academics</option>
                  <option value="Alumni">Alumni</option>
                  <option value="Community">Community</option>
                  <option value="Admissions">Admissions</option>
                </select>
              </div>

              {/* Publish Toggle */}
              <div className="bg-gray-50 p-5 rounded-2xl border border-gray-100 flex items-center justify-between">
                <div>
                  <label className="block text-sm font-semibold text-gray-700">Publish Status</label>
                  <p className="text-xs text-gray-500 mt-1">Make visible to public site</p>
                </div>
                <button 
                  type="button"
                  className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${formData.status === 'Published' ? 'bg-cardinal-red' : 'bg-gray-300'}`}
                  onClick={() => setFormData({ ...formData, status: formData.status === 'Published' ? 'Draft' : 'Published' })}
                >
                  <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${formData.status === 'Published' ? 'translate-x-5' : 'translate-x-0'}`} />
                </button>
              </div>

              {/* Image Upload Area */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Featured Image</label>
                <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center bg-gray-50 hover:bg-gray-100 hover:border-cardinal-red/50 transition-colors cursor-pointer group">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm text-gray-400 group-hover:text-cardinal-red transition-colors mb-3">
                    <ImageIcon size={24} />
                  </div>
                  <p className="text-sm font-semibold text-gray-700">Drag & drop image here</p>
                  <p className="text-xs text-gray-400 mt-1">or click to browse from files</p>
                  <p className="text-xs text-gray-400 mt-4 leading-tight">Recommended size:<br/> 1200x630px (WebP, JPG, PNG)</p>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-100 bg-gray-50/50 sticky bottom-0 rounded-b-2xl">
          <button 
            type="button" 
            onClick={onClose}
            className="px-6 py-2.5 text-sm font-bold text-gray-600 hover:text-gray-900 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button 
            type="button" 
            className="px-6 py-2.5 text-sm font-bold text-white bg-cardinal-red border border-transparent rounded-lg shadow-md hover:bg-red-800 transition-colors"
            onClick={handleSave}
          >
            Save Changes
          </button>
        </div>

      </div>
    </div>
  );
}
