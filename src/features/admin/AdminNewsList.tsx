import { useState, useEffect } from 'react';
import { Search, Plus, Edit2, Trash2, CheckCircle2 } from 'lucide-react';
import { ContentEditorModal } from './ContentEditorModal';
import { useArticles, Article } from '../../hooks/useArticles';

export function AdminNewsList() {
  const { articles, isLoaded, addArticle, updateArticle, deleteArticle } = useArticles();
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  
  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const filteredData = articles.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (item: Article) => {
    setEditingArticle(item);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setEditingArticle(null);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this article?');
    if (confirmDelete) {
      deleteArticle(id);
      showToast('Article deleted successfully!');
    }
  };

  const handleSave = (data: Partial<Article>) => {
    if (editingArticle) {
      // Update
      updateArticle(editingArticle.id, data);
      showToast('Article updated successfully!');
    } else {
      // Create
      addArticle({
        title: data.title || '',
        description: data.description || '',
        category: data.category || 'Student Life',
        status: data.status || 'Draft',
        content: data.content || ''
      });
      showToast('Article created successfully!');
    }
    setIsModalOpen(false);
  };

  if (!isLoaded) return <div className="p-8 text-gray-500 font-medium">Loading data...</div>;

  return (
    <div className="max-w-7xl mx-auto relative">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-8 z-50 bg-gray-900 text-white px-5 py-3 rounded-lg shadow-xl flex items-center gap-3 animate-fade-in-down transition-all duration-300">
          <CheckCircle2 className="text-green-400" size={20} />
          <span className="font-medium text-sm">{toastMessage}</span>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-serif font-bold text-gray-900">News & Articles</h1>
          <p className="text-gray-500 mt-1">Manage public articles, announcements, and news content.</p>
        </div>
        <button 
          onClick={handleAddNew}
          className="bg-cardinal-red text-white px-5 py-2.5 rounded-lg font-medium text-sm flex items-center justify-center gap-2 hover:bg-red-800 transition-colors shadow-sm whitespace-nowrap"
        >
          <Plus size={18} />
          Add New Article
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Table Toolbar */}
        <div className="p-4 border-b border-gray-200 bg-gray-50/50 flex items-center justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search articles..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cardinal-red/20 focus:border-cardinal-red transition-all"
            />
          </div>
          <div className="text-sm text-gray-500 font-medium">
            {filteredData.length} records found
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-200 text-xs uppercase tracking-wider text-gray-500 font-bold">
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-900">{item.title}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600 bg-gray-100 px-2.5 py-1 rounded-md">{item.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                      item.status === 'Published' 
                        ? 'bg-green-50 text-green-700 border-green-200' 
                        : 'bg-yellow-50 text-yellow-700 border-yellow-200'
                    }`}>
                      {item.status === 'Published' && <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5" />}
                      {item.status === 'Draft' && <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 mr-1.5" />}
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 font-medium">
                    {item.date}
                  </td>
                  <td className="px-6 py-4 text-right text-gray-400">
                    <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity">
                      <button 
                        onClick={() => handleEdit(item)}
                        className="p-1.5 hover:bg-blue-50 hover:text-blue-600 rounded text-gray-400 transition-colors"
                        title="Edit"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(item.id)}
                        className="p-1.5 hover:bg-red-50 hover:text-red-600 rounded text-gray-400 transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                    No articles found matching "{searchTerm}".
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <ContentEditorModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          initialData={editingArticle}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
