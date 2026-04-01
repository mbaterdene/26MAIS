import { motion } from 'framer-motion';
import { useArticles } from '../../hooks/useArticles';
import { FileText, ArrowRight } from 'lucide-react';

export function NewsPage() {
  const { articles, isLoaded } = useArticles();
  
  if (!isLoaded) return <div className="min-h-screen bg-sand flex items-center justify-center">Loading...</div>;

  const publishedNews = articles.filter(a => a.status === 'Published');

  return (
    <div className="min-h-screen bg-sand pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-black/60 bg-black/10 px-3 py-1 rounded-full mb-6">
            Community Updates
          </span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-black mb-6">Latest News</h1>
          <p className="text-xl max-w-2xl mx-auto font-sans text-gray-700">
            Read the latest stories, achievements, and announcements from our global student body and faculty.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {publishedNews.length > 0 ? (
            publishedNews.map((article, i) => (
              <motion.article 
                key={article.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-cardinal-red/20 group flex flex-col h-full"
              >
                <div className="h-48 bg-gray-100 flex items-center justify-center text-gray-400 group-hover:scale-105 transition-transform duration-500">
                   <FileText size={48} className="opacity-20" />
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-cardinal-red bg-cardinal-red/10 px-2 py-1 rounded">
                      {article.category}
                    </span>
                    <span className="text-sm text-gray-400 font-medium">{article.date}</span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-black mb-4 group-hover:text-cardinal-red transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 font-sans leading-relaxed mb-6 flex-1">
                    {article.description || 'Click to read the full story and discover more about this topic.'}
                  </p>
                  
                  <div className="mt-auto pt-6 border-t border-gray-100 mb-2">
                    <span className="inline-flex items-center gap-2 text-sm font-bold text-black group-hover:text-cardinal-red transition-colors cursor-pointer">
                      Read Article <ArrowRight size={16} />
                    </span>
                  </div>
                </div>
              </motion.article>
            ))
          ) : (
            <div className="col-span-full py-20 text-center text-gray-500">
              No news articles are currently published.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
