import { motion } from 'framer-motion';
import { ArrowRight, Loader, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { bil, formatDate, truncateWords } from '../../lib/utils';
import { usePublicNews } from '../../hooks/usePublicNews';

export function NewsPage() {
  const { isEnglish, t } = useLanguage();
  const { data: allNews, isLoading } = usePublicNews();
  const itemsPerPage = 6;
  const [displayedNews, setDisplayedNews] = useState<typeof allNews>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Load initial 2 pages on mount
  useEffect(() => {
    const itemsToLoad = itemsPerPage * 2;
    setDisplayedNews(allNews.slice(0, itemsToLoad));
  }, [allNews]);

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    const itemsToLoad = itemsPerPage * nextPage;
    setDisplayedNews(allNews.slice(0, itemsToLoad));
    setCurrentPage(nextPage);
  };

  const totalPages = Math.ceil(allNews.length / itemsPerPage);
  const hasMorePages = currentPage < totalPages;

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

        {isLoading ? (
          <div className="py-20 text-center text-gray-500 flex items-center justify-center">
            <Loader className="animate-spin mr-2" />
            {t('Loading news...', 'Мэдээ ачаалж байна...')}
          </div>
        ) : displayedNews.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {displayedNews.map((article, i) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-cardinal-red/30 group flex flex-col h-full"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={article.image || '/placeholder.png'}
                      alt={bil(isEnglish, article.title_en, article.title_mn)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder.png';
                      }}
                    />
                  </div>
                  <div className="p-8 flex-1 flex flex-col">
                    <span className="text-sm text-gray-400 font-medium mb-4">{formatDate(article.created_at)}</span>
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
              ))}
            </div>
            {hasMorePages && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex justify-center"
              >
                <button
                  onClick={handleLoadMore}
                  className="inline-flex items-center gap-3 bg-cardinal-red hover:bg-digital-red text-white px-8 py-4 rounded-full font-bold text-base transition-all hover:-translate-y-1 shadow-lg"
                >
                  {t('Load More Articles', 'Нэмэлт нийтлэлүүд ачаалах')}
                  <ChevronDown size={20} />
                </button>
              </motion.div>
            )}
          </>
        ) : (
          <div className="py-20 text-center text-gray-500">
            {t('No news articles are currently available.', 'Одоогоор мэдээ байхгүй байна.')}
          </div>
        )}
      </div>
    </div>
  );
}
