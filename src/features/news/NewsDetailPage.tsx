import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Loader, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { bil, formatDate } from '../../lib/utils';
import { usePublicNewsBySlug } from '../../hooks/usePublicNews';

// ── Carousel ──────────────────────────────────────────────────────────────────

interface CarouselProps {
  images: string[];
  alt: string;
}

function ImageCarousel({ images, alt }: CarouselProps) {
  const [current, setCurrent] = useState(0);

  const prev = useCallback(() => setCurrent((c) => (c - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setCurrent((c) => (c + 1) % images.length), [images.length]);

  // Keyboard nav
  useEffect(() => {
    if (images.length <= 1) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [prev, next, images.length]);

  if (images.length === 0) {
    return (
      <div className="rounded-2xl overflow-hidden mb-8">
        <img
          src="/placeholder.png"
          alt={alt}
          className="w-full h-64 md:h-96 object-cover"
        />
      </div>
    );
  }

  if (images.length === 1) {
    return (
      <div className="rounded-2xl overflow-hidden mb-8">
        <img
          src={images[0]}
          alt={alt}
          className="w-full h-64 md:h-96 object-cover"
          onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.png'; }}
        />
      </div>
    );
  }

  // Multi-image carousel — windowed rendering (current ± 1) for lazy loading
  const windowIndices = new Set([
    (current - 1 + images.length) % images.length,
    current,
    (current + 1) % images.length,
  ]);

  return (
    <div className="rounded-2xl overflow-hidden mb-8 relative select-none">
      {/* Main image area */}
      <div className="relative w-full h-64 md:h-96 bg-gray-100">
        {images.map((src, i) => (
          // Only render neighbours in the DOM (lazy-load strategy)
          windowIndices.has(i) ? (
            <img
              key={src}
              src={src}
              alt={`${alt} — ${i + 1} / ${images.length}`}
              loading={i === current ? 'eager' : 'lazy'}
              onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.png'; }}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                i === current ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            />
          ) : null
        ))}

        {/* Prev / Next buttons */}
        <button
          onClick={prev}
          aria-label="Previous image"
          className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full transition-colors z-10"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          onClick={next}
          aria-label="Next image"
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full transition-colors z-10"
        >
          <ChevronRight size={22} />
        </button>

        {/* Counter badge */}
        <span className="absolute bottom-3 right-3 bg-black/50 text-white text-xs font-semibold px-2 py-1 rounded-full z-10">
          {current + 1} / {images.length}
        </span>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-1.5 mt-3">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to image ${i + 1}`}
            className={`rounded-full transition-all ${
              i === current
                ? 'w-5 h-2 bg-cardinal-red'
                : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
            }`}
          />
        ))}
      </div>

      {/* Thumbnail strip — only shown when >1 image, lazy-loads all thumbs */}
      {images.length > 1 && (
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-thin">
          {images.map((src, i) => (
            <button
              key={src}
              onClick={() => setCurrent(i)}
              className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                i === current ? 'border-cardinal-red' : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <img
                src={src}
                alt={`Thumbnail ${i + 1}`}
                loading="lazy"
                className="w-full h-full object-cover"
                onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder.png'; }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

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

  // Normalise images — backend always resolves this, but guard on frontend too
  const images: string[] = Array.isArray(article.images) && article.images.length > 0
    ? article.images
    : article.image ? [article.image] : [];

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

          <ImageCarousel
            images={images}
            alt={bil(isEnglish, article.title_en, article.title_mn)}
          />

          <div className="flex items-center gap-3 mb-6">
            <span className="text-sm text-gray-400">
              {article.publishedDate
                ? new Date(article.publishedDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })
                : formatDate(article.created_at)
              }
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-serif font-bold text-black mb-8 leading-tight">
            {bil(isEnglish, article.title_en, article.title_mn)}
          </h1>

          <style>{`
            .news-content img,
            .news-content span {
              display: inline !important;
              vertical-align: text-bottom !important;
            }
            .news-content img[src*="emoji.php"],
            .news-content img[width="16"],
            .news-content img[height="16"] {
              margin: 0 0.2em !important;
            }
            .news-content p {
              margin: 1em 0 !important;
            }
          `}</style>

          <div
            className="news-content prose prose-lg max-w-none text-gray-700 font-sans leading-relaxed"
            dangerouslySetInnerHTML={{
              __html: bil(isEnglish, article.content_en, article.content_mn) || ''
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}
