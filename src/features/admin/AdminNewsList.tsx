import { useNews, useDeleteNews, useApproveNews, useRejectNews, useSubmitNews } from '../../hooks/useNews';
import { Trash2, Check, X, Send, Loader2, Edit2, Eye } from 'lucide-react';
import type { News } from '../../lib/admin-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { NewsPreview } from './NewsPreview';

const statusColors: Record<string, string> = {
  draft: 'bg-gray-100 text-gray-600',
  pending: 'bg-yellow-100 text-yellow-700',
  published: 'bg-green-100 text-green-700',
};

export function AdminNewsList() {
  const { data: news, isLoading, refetch } = useNews();
  const deleteMutation = useDeleteNews();
  const approveMutation = useApproveNews();
  const rejectMutation = useRejectNews();
  const submitMutation = useSubmitNews();
  const [filter, setFilter] = useState<string>('all');
  const [previewArticle, setPreviewArticle] = useState<News | null>(null);

  const filtered = filter === 'all' ? news : news.filter((n: News) => n.status === filter);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="animate-spin text-cardinal-red" size={32} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-gray-900">News Management</h1>
          <p className="text-gray-500 mt-1">Create, edit, and manage news articles.</p>
        </div>
        <Link
          to="/admin/news/new"
          className="bg-cardinal-red hover:bg-digital-red text-white px-5 py-2 rounded-xl font-bold text-sm transition-colors"
        >
          + New Article
        </Link>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {['all', 'draft', 'pending', 'published'].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold capitalize transition-colors ${
              filter === s ? 'bg-cardinal-red text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {s} {s !== 'all' && `(${news.filter((n: News) => n.status === s).length})`}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="py-16 text-center text-gray-500">No articles found.</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 text-left">
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase">Title</th>
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase">Author</th>
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((article: News) => (
                <tr key={article.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-semibold text-gray-900 text-sm">{article.title_en || article.title_mn}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{article.title_mn}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold capitalize ${statusColors[article.status] ?? ''}`}>
                      {article.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{article.author}</td>
                  <td className="px-6 py-4 text-sm text-gray-400">{new Date(article.created_at).toLocaleDateString()}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setPreviewArticle(article)}
                        title="Preview"
                        className="p-1.5 rounded-lg text-blue-500 hover:bg-blue-50 transition-colors"
                      >
                        <Eye size={16} />
                      </button>
                      {article.status === 'draft' && (
                        <button
                          onClick={() => submitMutation.mutateAsync(article.id).then(() => refetch())}
                          title="Submit for approval"
                          className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                        >
                          <Send size={16} />
                        </button>
                      )}
                      {article.status === 'pending' && (
                        <>
                          <button
                            onClick={() => approveMutation.mutateAsync(article.id).then(() => refetch())}
                            title="Approve"
                            className="p-1.5 rounded-lg text-green-600 hover:bg-green-50 transition-colors"
                          >
                            <Check size={16} />
                          </button>
                          <button
                            onClick={() => rejectMutation.mutateAsync(article.id).then(() => refetch())}
                            title="Reject"
                            className="p-1.5 rounded-lg text-orange-600 hover:bg-orange-50 transition-colors"
                          >
                            <X size={16} />
                          </button>
                        </>
                      )}
                      <Link
                        to={`/admin/news/${article.id}/edit`}
                        title="Edit"
                        className="p-1.5 rounded-lg text-purple-600 hover:bg-purple-50 transition-colors inline-flex"
                      >
                        <Edit2 size={16} />
                      </Link>
                      <button
                        onClick={() => {
                          if (confirm('Delete this article?')) {
                            deleteMutation.mutateAsync(article.id).then(() => refetch());
                          }
                        }}
                        title="Delete"
                        className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Preview Modal */}
      {previewArticle && (
        <NewsPreview
          title_en={previewArticle.title_en}
          title_mn={previewArticle.title_mn}
          content_en={previewArticle.content_en}
          content_mn={previewArticle.content_mn}
          image={previewArticle.image}
          onClose={() => setPreviewArticle(null)}
        />
      )}
    </div>
  );
}
