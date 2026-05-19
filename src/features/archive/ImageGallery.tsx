import { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight, Download, X, Loader, AlertCircle } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { PageMapping } from '../../lib/archive-types';
import { getDriveUrl, getFileId, calculatePreloadRange, setupKeyboardNavigation } from '../../lib/galleryUtils';

interface ImageGalleryProps {
  pageMapping: PageMapping;
  totalPages: number;
  title: string;
  onClose?: () => void;
  downloadUrl?: string;
}

export function ImageGallery({
  pageMapping,
  totalPages,
  title,
  onClose,
  downloadUrl,
}: ImageGalleryProps) {
  const { isEnglish } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  // Track which pages have been revealed (img tag rendered)
  const [revealedPages, setRevealedPages] = useState<Set<number>>(new Set([0]));
  // Track per-page loading state: 'loading' | 'loaded' | 'error'
  const [imageStates, setImageStates] = useState<Record<number, 'loading' | 'loaded' | 'error'>>({ 0: 'loading' });
  const preloadedRef = useRef<Set<number>>(new Set());

  const PRELOAD_RANGE = 3;

  // Get file ID for current page
  const getFileIdForPage = useCallback((pageIndex: number): string | null => {
    return getFileId(pageIndex, pageMapping);
  }, [pageMapping]);

  // Preload nearby pages using real Image objects
  useEffect(() => {
    const indicesToReveal = calculatePreloadRange(currentIndex, totalPages, PRELOAD_RANGE);
    const indicesToSet = new Set<number>(indicesToReveal);

    // Reveal pages (render their img tags)
    setRevealedPages(prev => new Set([...prev, ...indicesToSet]));

    // Preload images in background using Image objects
    indicesToSet.forEach(idx => {
      if (preloadedRef.current.has(idx)) return;
      const fileId = getFileIdForPage(idx);
      if (!fileId) return;
      preloadedRef.current.add(idx);
      const img = new Image();
      img.src = getDriveUrl(fileId, 'w1600');
    });
  }, [currentIndex, totalPages, getFileIdForPage]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex(prev => (prev === 0 ? totalPages - 1 : prev - 1));
  }, [totalPages]);

  const goToNext = useCallback(() => {
    setCurrentIndex(prev => (prev === totalPages - 1 ? 0 : prev + 1));
  }, [totalPages]);

  const goToPage = useCallback((page: number) => {
    setCurrentIndex(Math.max(0, Math.min(page, totalPages - 1)));
  }, [totalPages]);

  // Keyboard navigation
  useEffect(() => {
    return setupKeyboardNavigation(goToPrevious, goToNext, 'input, textarea');
  }, [goToPrevious, goToNext]);

  const currentFileId = getFileIdForPage(currentIndex);
  const currentState = imageStates[currentIndex] ?? 'loading';

  // Mark current page as loading when we navigate to it
  useEffect(() => {
    setImageStates(prev => {
      if (prev[currentIndex]) return prev; // already tracked
      return { ...prev, [currentIndex]: 'loading' };
    });
  }, [currentIndex]);

  return (
    <div className="space-y-4 bg-white">
      {/* Header with controls */}
      <div className="flex items-center justify-between p-4 border-b-2 border-black">
        <h3 className="font-bold text-lg text-black flex-1 truncate">{title}</h3>
        <div className="flex items-center gap-2">
          {downloadUrl && (
            <button
              onClick={() => window.open(downloadUrl, '_blank')}
              className="p-2 text-cardinal-red hover:bg-red-50 transition-colors rounded"
              title={isEnglish ? 'Download' : 'Татах'}
            >
              <Download size={20} />
            </button>
          )}
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 text-gray-600 hover:bg-gray-100 transition-colors rounded"
              title={isEnglish ? 'Close' : 'Хаах'}
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Image Display with Loading State */}
      <div className="relative bg-gray-100 aspect-[3/4] sm:aspect-video flex items-center justify-center overflow-hidden">
        {!currentFileId ? (
          <div className="flex flex-col items-center gap-2 text-center p-4">
            <AlertCircle size={32} className="text-gray-400" />
            <p className="text-sm text-red-600 font-semibold">
              {isEnglish ? 'Page not available' : 'Хуудас ашиглах боломжгүй'}
            </p>
            <p className="text-xs text-gray-500">
              {isEnglish
                ? `Page ${currentIndex + 1} has not been configured yet`
                : `${currentIndex + 1}-р хуудас тохируулагдаагүй байна`}
            </p>
          </div>
        ) : (
          <>
            {/* Loading spinner – shown until onLoad fires */}
            {currentState === 'loading' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 z-10">
                <Loader size={32} className="animate-spin text-cardinal-red" />
                <p className="text-xs text-gray-500">
                  {isEnglish ? 'Loading page...' : 'Хуудас ачааллаж байна...'}
                </p>
              </div>
            )}

            {/* Error state */}
            {currentState === 'error' && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center p-4 z-10">
                <AlertCircle size={32} className="text-red-400" />
                <p className="text-sm text-red-600 font-semibold">
                  {isEnglish ? 'Image failed to load' : 'Зураг ачаалж чадсангүй'}
                </p>
                <p className="text-xs text-gray-500">
                  {isEnglish
                    ? 'The file may not be publicly shared'
                    : 'Файл нийтэд нээлттэй биш байж болно'}
                </p>
                <a
                  href={`https://drive.google.com/file/d/${currentFileId}/view`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-cardinal-red underline hover:no-underline mt-1"
                >
                  {isEnglish ? 'Open in Google Drive' : 'Google Drive-д нээх'}
                </a>
              </div>
            )}

            {/* Render all revealed pages; hide non-current ones to keep them cached */}
            {Array.from(revealedPages).map(idx => {
              const fId = getFileIdForPage(idx);
              if (!fId) return null;
              const url = getDriveUrl(fId, 'w1600');
              return (
                <img
                  key={idx}
                  src={url}
                  alt={`Page ${idx + 1}`}
                  className="w-full h-full object-contain"
                  style={{ display: idx === currentIndex ? 'block' : 'none' }}
                  onLoad={() => {
                    setImageStates(prev => ({ ...prev, [idx]: 'loaded' }));
                  }}
                  onError={() => {
                    setImageStates(prev => ({ ...prev, [idx]: 'error' }));
                  }}
                />
              );
            })}
          </>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between px-4 pb-4">
        {/* Previous Button */}
        <button
          onClick={goToPrevious}
          disabled={totalPages <= 1}
          className="p-2 border-2 border-black text-black hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          title={isEnglish ? 'Previous (←)' : 'Өмнөх (←)'}
        >
          <ChevronLeft size={20} />
        </button>

        {/* Page Counter and Selector */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-sm text-gray-600">
            {String(currentIndex + 1).padStart(3, '0')} / {String(totalPages).padStart(3, '0')}
          </span>
          <input
            type="number"
            min="1"
            max={totalPages}
            value={currentIndex + 1}
            onChange={(e) => goToPage(parseInt(e.target.value) - 1)}
            className="w-12 px-2 py-1 border-2 border-black text-center text-sm font-bold focus:outline-none focus:ring-2 focus:ring-cardinal-red/50"
          />
        </div>

        {/* Next Button */}
        <button
          onClick={goToNext}
          disabled={totalPages <= 1}
          className="p-2 border-2 border-black text-black hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          title={isEnglish ? 'Next (→)' : 'Дараах (→)'}
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Preload status */}
      <div className="px-4 pb-2 text-xs text-gray-500 text-center h-4">
        {currentState === 'loading' && currentFileId && (
          <span>{isEnglish ? 'Loading...' : 'Ачааллаж байна...'}</span>
        )}
      </div>
    </div>
  );
}
