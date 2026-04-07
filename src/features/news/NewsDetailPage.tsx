import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Loader } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { bil, formatDate } from '../../lib/utils';
import { usePublicNewsBySlug } from '../../hooks/usePublicNews';

export function NewsDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { isEnglish, t } = useLanguage();
  const { data: article, isLoading } = usePublicNewsBySlug(slug);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-32 flex items-center justify-center">
        <div className="text-center text-gray-500 flex items-center gap-2">
          <Loader className="animate-spin" />
          {t('Loading article...', 'Өгүүлэл ачаалж байна...')}
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 pt-32 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-serif font-bold text-black mb-4">
            {t('Article not found', 'Мэдээ олдсонгүй')}
          </h1>
          <Link to="/news" className="text-digital-blue font-bold hover:text-cardinal-red">
            ← {t('Back to News', 'Мэдээнүүд рүү буцах')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            to="/news"
            className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-cardinal-red transition-colors mb-8"
          >
            <ArrowLeft size={16} />
            {t('Back to News', 'Мэдээнүүд рүү буцах')}
          </Link>

          {article.image && (
            <div className="rounded-2xl overflow-hidden mb-8">
              <img
                src={article.image}
                alt={bil(isEnglish, article.title_en, article.title_mn)}
                className="w-full h-64 md:h-96 object-cover"
                onError={(e) => {
                  console.error('Image failed to load:', article.image);
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
          )}

          <div className="flex items-center gap-3 mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-cardinal-red bg-cardinal-red/10 px-2 py-1 rounded">
              {t('News', 'Мэдээ')}
            </span>
            <span className="text-sm text-gray-400">{formatDate(article.created_at)}</span>
            <span className="text-sm text-gray-400">• {article.author}</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-serif font-bold text-black mb-8 leading-tight">
            {bil(isEnglish, article.title_en, article.title_mn)}
          </h1>

          <div
            className="prose prose-lg max-w-none text-gray-700 font-sans leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: bil(isEnglish, article.content_en, article.content_mn) || ''
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}
