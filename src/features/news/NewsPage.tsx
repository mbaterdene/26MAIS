import { motion } from 'framer-motion';
import { FileText, ArrowRight, Loader } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { bil, formatDate, truncateWords } from '../../lib/utils';
import { usePublicNews } from '../../hooks/usePublicNews';

export function NewsPage() {
  const { isEnglish, t } = useLanguage();
  const { data: publishedNews, isLoading } = usePublicNews();

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-black/60 bg-black/10 px-3 py-1 rounded-full mb-6">
            {t('Community Updates', 'Мэдээнүүд')}
          </span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-black mb-6">
            {t('Latest News', 'Сүүлийн мэдээ')}
          </h1>
          <p className="text-xl max-w-2xl mx-auto font-sans text-gray-700">
            {t(
              'Read the latest stories, achievements, and announcements from our school community.',
              'Сургуулийн хамт олны сүүлийн үеийн мэдээ, амжилт, зарлалуудыг уншаарай.'
            )}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            <div className="col-span-full py-20 text-center text-gray-500 flex items-center justify-center">
              <Loader className="animate-spin mr-2" />
              {t('Loading news...', 'Мэдээ ачаалж байна...')}
            </div>
          ) : publishedNews.length > 0 ? (
            publishedNews.map((article, i) => (
              <motion.article
                key={article.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-cardinal-red/20 group flex flex-col h-full"
              >
                {article.image ? (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={article.image}
                      alt={bil(isEnglish, article.title_en, article.title_mn)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ) : (
                  <div className="h-48 bg-gray-100 flex items-center justify-center text-gray-400 group-hover:scale-105 transition-transform duration-500">
                    <FileText size={48} className="opacity-20" />
                  </div>
                )}
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-bold uppercase tracking-wider text-cardinal-red bg-cardinal-red/10 px-2 py-1 rounded">
                      {t('News', 'Мэдээ')}
                    </span>
                    <span className="text-sm text-gray-400 font-medium">{formatDate(article.created_at)}</span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-black mb-4 group-hover:text-cardinal-red transition-colors">
                    <Link to={`/news/${article.slug}`}>
                      {bil(isEnglish, article.title_en, article.title_mn)}
                    </Link>
                  </h3>
                  <p className="text-gray-600 font-sans leading-relaxed mb-6 flex-1">
                    {truncateWords(bil(isEnglish, article.content_en, article.content_mn), 20)}
                  </p>

                  <div className="mt-auto pt-6 border-t border-gray-100 mb-2">
                    <Link
                      to={`/news/${article.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-bold text-black group-hover:text-cardinal-red transition-colors"
                    >
                      {t('Read Article', 'Дэлгэрэнгүй')} <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))
          ) : (
            <div className="col-span-full py-20 text-center text-gray-500">
              {t('No news articles are currently available.', 'Одоогоор мэдээ байхгүй байна.')}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
