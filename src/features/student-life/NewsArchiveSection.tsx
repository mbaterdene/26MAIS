import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { getNewsList } from '../../lib/api';
import type { NewsItem } from '../../lib/types';
import { bil, formatDate, truncateWords } from '../../lib/utils';
import { Link } from 'react-router-dom';

export function NewsArchiveSection() {
  const { isEnglish } = useLanguage();
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    getNewsList(100)
      .then(setNews)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filteredNews = searchText
    ? news.filter(item =>
        bil(isEnglish, item.title_en, item.title_mn).toLowerCase().includes(searchText.toLowerCase()) ||
        bil(isEnglish, item.content_en, item.content_mn).toLowerCase().includes(searchText.toLowerCase())
      )
    : news;

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-black to-gray-900 text-white py-32 md:py-44">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="inline-flex text-xs font-bold tracking-[0.2em] uppercase text-white/50 bg-white/10 px-4 py-1.5 rounded-full mb-8"
          >
            {isEnglish ? 'News Archive' : '╨£╤ì╨┤╤ì╤ì╨╜╨╕╨╣ ╨░╤Ç╤à╨╕╨▓'}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-6xl font-serif font-bold mb-6"
          >
            {isEnglish ? 'News Archive' : '╨£╤ì╨┤╤ì╤ì╨╜╨╕╨╣ ╨░╤Ç╤à╨╕╨▓'}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8 }}
            className="text-xl text-gray-200 max-w-2xl"
          >
            {isEnglish
              ? 'Explore the latest news and stories from our student community'
              : '╨£╨░╨╜╨░╨╣ ╨╛╤Ä╤â╤é╨╜╤ï ╨╜╨╕╨╣╨│╤ì╨╝╨╗╤ì╨│╤ì╤ì╤ü ╤ü╥»╥»╨╗╨╕╨╣╨╜ ╨╝╤ì╨┤╤ì╤ì, ╤é╥»╥»╤à╥»╥»╨┤╨╕╨╣╨│ ╥»╨╖╤ì╤à'}
          </motion.p>
        </div>
      </section>

      {/* Search Section */}
      <motion.section
        className="py-12 bg-gray-50 border-b border-gray-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <input
            type="text"
            placeholder={isEnglish ? 'Search news...' : '╨£╤ì╨┤╤ì╤ì ╤à╨░╨╣╤à...'}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full max-w-md px-4 py-3 border-2 border-cardinal-red rounded-lg focus:outline-none focus:ring-2 focus:ring-cardinal-red"
          />
        </div>
      </motion.section>

      {/* News List */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-500">{isEnglish ? 'Loading news...' : '╨£╤ì╨┤╤ì╤ì╨│ ╨░╤ç╨░╨░╨╗╨╢ ╨▒╨░╨╣╨╜╨░...'}</p>
            </div>
          ) : filteredNews.length > 0 ? (
            <motion.div
              className="space-y-6"
              variants={{
                visible: {
                  transition: { staggerChildren: 0.05 },
                },
              }}
              initial="hidden"
              animate="visible"
            >
              {filteredNews.map((item) => (
                <motion.article
                  key={item.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="border-b border-gray-200 pb-8 last:border-b-0 hover:bg-gray-50 p-6 rounded-lg transition-colors"
                >
                  <Link
                    to={`/news/${item.slug}`}
                    className="group block"
                  >
                    <div className="flex gap-6">
                      {item.image && (
                        <div className="flex-shrink-0 w-32 h-32 rounded-lg overflow-hidden">
                          <img
                            src={item.image}
                            alt={bil(isEnglish, item.title_en, item.title_mn)}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <p className="text-sm text-gray-400 font-semibold mb-2">
                          {formatDate(item.created_at)}
                        </p>
                        <h3 className="text-2xl font-serif font-bold text-black mb-3 group-hover:text-cardinal-red transition-colors">
                          {bil(isEnglish, item.title_en, item.title_mn)}
                        </h3>
                        <p className="text-gray-600 leading-relaxed line-clamp-3">
                          {truncateWords(bil(isEnglish, item.content_en, item.content_mn), 40)}
                        </p>
                        <div className="mt-4">
                          <span className="text-cardinal-red font-semibold group-hover:underline">
                            {isEnglish ? 'Read More ΓåÆ' : '╨ö╤ì╨╗╨│╤ì╤Ç╥»╥»╨╗╤ì╤à ΓåÆ'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">
                {isEnglish ? 'No news found.' : '╨£╤ì╨┤╤ì╤ì ╨╛╨╗╨┤╤ü╨╛╨╜╨│╥»╨╣.'}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
