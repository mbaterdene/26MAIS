import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
  TouchEvent,
} from 'react';
import HTMLFlipBook from 'react-pageflip';
import {
  ChevronLeft,
  ChevronRight,
  Loader,
  AlertCircle,
  BookOpen,
  Maximize,
  Minimize,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { PageMapping } from '../../lib/archive-types';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getDriveUrl(fileId: string) {
  // w1200 gives a good resolution for page viewing without being too heavy
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1200`;
}

function getPageFilename(index: number, pm: PageMapping): string {
  if (index === 0) return pm.front;
  const lastIndex = pm.endPage - pm.startPage + 2;
  if (index === lastIndex) return pm.back;
  return `${pm.startPage + (index - 1)}.jpg`;
}

function getFileId(index: number, pm: PageMapping): string | null {
  const name = getPageFilename(index, pm);
  if (pm.fileIdMap?.[name]) return pm.fileIdMap[name];
  if (name === pm.front && pm.frontFileId) return pm.frontFileId;
  if (name === pm.back && pm.backFileId) return pm.backFileId;
  return null;
}

// ─── BookPage ─────────────────────────────────────────────────────────────────
// react-pageflip requires children to be React.forwardRef components.

interface BookPageProps {
  pageIndex: number;
  fileId: string | null;
  shouldLoad: boolean;
  label: string;
  isBlank?: boolean;
  isVisible?: boolean;
}

const BookPage = React.memo(
  React.forwardRef<HTMLDivElement, BookPageProps>(
    ({ fileId, shouldLoad, label, isBlank, isVisible }, ref) => {
      const [src, setSrc] = useState<string | null>(null);
      const [status, setStatus] = useState<'idle' | 'loading' | 'loaded' | 'error'>('idle');

      // Set src exactly once — never clear it
      useEffect(() => {
        if (!isBlank && shouldLoad && fileId && src === null) {
          setSrc(getDriveUrl(fileId));
          setStatus('loading');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [shouldLoad, fileId, isBlank]);

      const commonStyle: React.CSSProperties = {
        display: isVisible ? 'block' : 'none',
        width: '100%',
        height: '100%',
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? 'auto' : 'none',
        transition: 'opacity 0.3s ease-in-out',
      };

      if (isBlank) {
        return (
          <div
            ref={ref}
            className="w-full h-full overflow-hidden select-none"
            style={{ ...commonStyle, backgroundColor: '#ffffff', position: 'relative' }}
          >
            <span className="absolute bottom-2 inset-x-0 text-center text-[9px] text-stone-300 font-mono pointer-events-none select-none">
              {label}
            </span>
          </div>
        );
      }

      return (
        <div
          ref={ref}
          className="relative w-full h-full overflow-hidden select-none"
          style={{ ...commonStyle, backgroundColor: '#f3f0eb' }}
        >
          {/* Placeholder — shown before lazy-load triggers */}
          {!src && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-stone-100">
              <BookOpen size={40} className="text-stone-300" strokeWidth={1} />
            </div>
          )}

          {/* Loading spinner — shown while image is in-flight */}
          {src && status === 'loading' && (
            <div className="absolute inset-0 flex items-center justify-center bg-stone-100 z-10">
              <Loader size={22} className="animate-spin text-stone-400" />
            </div>
          )}

          {/* Error state */}
          {src && status === 'error' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-stone-50 z-10 p-6">
              <AlertCircle size={22} className="text-red-400" />
              <p className="text-xs text-stone-500 text-center leading-relaxed">
                Could not load this page
              </p>
            </div>
          )}

          {/* Page image — fades in when loaded */}
          {src && (
            <img
              src={src}
              alt={label}
              draggable={false}
              className="w-full h-full object-contain transition-opacity duration-300"
              style={{ opacity: status === 'loaded' ? 1 : 0 }}
              onLoad={() => setStatus('loaded')}
              onError={() => setStatus('error')}
            />
          )}

          {/* Page label */}
          <span className="absolute bottom-2 inset-x-0 text-center text-[10px] text-stone-400 font-mono pointer-events-none select-none">
            {label}
          </span>
        </div>
      );
    }
  )
);
BookPage.displayName = 'BookPage';

// ─── FlipBookGallery ──────────────────────────────────────────────────────────

export interface FlipBookGalleryProps {
  pageMapping: PageMapping;
  totalPages: number;
  title: string;
  bookId?: string;
}

// How many pages ahead/behind to keep image src loaded
const PRELOAD_RANGE = 6;

// Page aspect ratio (portrait A4-ish)
const PAGE_RATIO = 1.41; // height / width

export function FlipBookGallery({
  pageMapping,
  totalPages,
  title,
  bookId,
}: FlipBookGalleryProps) {
  const { isEnglish } = useLanguage();
  const bookRef = useRef<unknown>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const bookCanvasRef = useRef<HTMLDivElement>(null);

  // currentPage tracks the left-page index of the current spread as reported
  // by react-pageflip's onFlip event.
  const [currentPage, setCurrentPage] = useState(0);

  // Page dimensions (per single page, NOT the full spread).
  // react-pageflip `width` = single page width; it doubles for the 2-page spread.
  const [pageW, setPageW] = useState(360);
  const [pageH, setPageH] = useState(508);
  const [isMobileView, setIsMobileView] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const [jumpValue, setJumpValue] = useState('');

  // ── Measure container & compute page dimensions ─────────────────────────
  useEffect(() => {
    const measure = () => {
      if (!containerRef.current) return;
      const cw = containerRef.current.clientWidth;
      // Subtract horizontal padding (px-3 on each side = 24px total)
      const availW = cw - 24;
      // Max viewport height budget for the book (60vh to ensure it fits with UI)
      const maxH = Math.floor(window.innerHeight * 0.60);
      const isMobile = window.innerWidth < 640;

      // usePortrait=true means the book shows a single-page view (good for mobile).
      // usePortrait=false means it ALWAYS shows a 2-page spread.
      const targetW = isMobile
        ? Math.floor(availW * 0.95) // 1 page (mobile)
        : Math.min(Math.floor(availW / 2), 480); // 2 pages (desktop)

      const h = Math.min(Math.floor(targetW * PAGE_RATIO), maxH);
      const w = Math.floor(h / PAGE_RATIO);

      setPageW(Math.max(w, 160));
      setPageH(Math.max(h, 220));
      setIsMobileView(isMobile);
    };

    measure();
    const ro = new ResizeObserver(measure);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [zoom]); // Added zoom to dependencies

  // ── Navigation callbacks ─────────────────────────────────────────────────
  const handleFlip = useCallback((e: { data: number }) => {
    setCurrentPage(e.data);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pf = () => (bookRef.current as any)?.pageFlip();

  const flipPrev = useCallback(() => pf()?.flipPrev('bottom'), []);
  const flipNext = useCallback(() => pf()?.flipNext('bottom'), []);

  // Exception: the 2024-2025 yearbook already has correct physical mapping or layout
  const hasSpacers = bookId !== 'yearbook-2024';
  const totalBookPages = hasSpacers ? totalPages + 2 : totalPages;

  const jumpToPage = useCallback(() => {
    const n = parseInt(jumpValue, 10);
    if (!isNaN(n) && n >= 1 && n <= totalBookPages) {
      pf()?.turnToPage(n - 1);
      setCurrentPage(n - 1);
    }
    setJumpValue('');
  }, [jumpValue, totalBookPages]);

  const toggleFullScreen = () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handler = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  // Keyboard navigation (← →)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).tagName === 'INPUT') return;
      if (e.key === 'ArrowLeft') flipPrev();
      if (e.key === 'ArrowRight') flipNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [flipPrev, flipNext]);

  // ── Mouse-wheel zoom (desktop) ───────────────────────────────────────────
  // Zoom when the pointer is hovering over the book canvas — no Ctrl needed.
  // Outside the canvas the page scrolls normally.
  const isHoveringBookRef = useRef(false);

  useEffect(() => {
    const el = bookCanvasRef.current;
    if (!el) return;

    const onEnter = () => { isHoveringBookRef.current = true; };
    const onLeave = () => { isHoveringBookRef.current = false; };

    const onWheel = (e: WheelEvent) => {
      if (!isHoveringBookRef.current) return;
      e.preventDefault();
      e.stopPropagation();
      const delta = e.deltaY < 0 ? 0.1 : -0.1;
      setZoom(prev => Math.min(2.5, Math.max(1, parseFloat((prev + delta).toFixed(2)))));
    };

    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
    // Must be non-passive to call preventDefault()
    el.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
      el.removeEventListener('wheel', onWheel);
    };
  }, []);

  // ── Pinch-to-zoom (mobile / touch) ──────────────────────────────────────
  const pinchStartDistRef = useRef<number | null>(null);
  const pinchStartZoomRef = useRef<number>(1);

  const onTouchStart = useCallback((e: TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      pinchStartDistRef.current = Math.hypot(dx, dy);
      pinchStartZoomRef.current = zoom;
    }
  }, [zoom]);

  const onTouchMove = useCallback((e: TouchEvent<HTMLDivElement>) => {
    if (e.touches.length !== 2 || pinchStartDistRef.current === null) return;
    e.preventDefault();
    const dx = e.touches[0].clientX - e.touches[1].clientX;
    const dy = e.touches[0].clientY - e.touches[1].clientY;
    const dist = Math.hypot(dx, dy);
    const scale = dist / pinchStartDistRef.current;
    const next = parseFloat((pinchStartZoomRef.current * scale).toFixed(2));
    setZoom(Math.min(2.5, Math.max(1, next)));
  }, []);

  const onTouchEnd = useCallback(() => {
    pinchStartDistRef.current = null;
  }, []);

  // ── Page list ────────────────────────────────────────────────────────────
  // We insert two white pages if hasSpacers is true: index 1 (after cover) and totalBookPages - 2 (before back).
  const pages = useMemo(
    () =>
      Array.from({ length: totalBookPages }, (_, i) => {
        if (!hasSpacers) {
          return {
            index: i,
            isBlank: false,
            fileId: getFileId(i, pageMapping),
            label:
              i === 0
                ? isEnglish ? 'Cover' : 'Хавтас'
                : i === totalBookPages - 1
                  ? isEnglish ? 'Back cover' : 'Арын хавтас'
                  : String(i),
          };
        }

        const isBack = i === totalBookPages - 1;
        const isBlank = i === 1 || i === totalBookPages - 2;
        const contentIdx = i === 0 ? 0 : isBack ? totalPages - 1 : i - 1;

        return {
          index: i,
          isBlank,
          fileId: isBlank ? null : getFileId(contentIdx, pageMapping),
          label:
            i === 0
              ? isEnglish ? 'Cover' : 'Хавтас'
              : isBack
                ? isEnglish ? 'Back' : 'Арын хавтас'
                : isBlank
                  ? ''
                  : String(contentIdx),
        };
      }),
    [totalPages, totalBookPages, pageMapping, isEnglish, hasSpacers]
  );

  const progress = Math.round((currentPage / Math.max(totalBookPages - 1, 1)) * 100);

  return (
    <div ref={containerRef} className="flex flex-col items-center gap-1 sm:gap-2 bg-white">
      {/* ── Title / Download bar ──────────────────────────────────────────── */}
      {title && (
        <div className="w-full flex items-center justify-between px-4 sm:px-6">
          <h3 className="text-stone-900 font-extrabold text-lg sm:text-xl tracking-tight">
            {title}
          </h3>
        </div>
      )}

      {/* ── Book canvas ───────────────────────────────────────────────────── */}
      {/*
        react-pageflip `width` / `height` = dimensions of ONE page.
        The full spread is 2 × width when in landscape mode.
        showCover={true}  → page 0 (front) displayed alone on the right;
                            last page (back) displayed alone on the left.
        usePortrait={true} → on narrow viewports it collapses to 1-page portrait mode.
      */}
      <div
        ref={bookCanvasRef}
        className={`w-full flex justify-center ${zoom > 1 ? 'items-start overflow-auto' : 'items-center overflow-hidden'}`}
        style={{
          height: isFullScreen ? 'calc(100vh - 120px)' : pageH,
          minHeight: isFullScreen ? 'calc(100vh - 120px)' : pageH,
          maxHeight: isFullScreen ? 'calc(100vh - 120px)' : '70vh',
        }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <HTMLFlipBook
          key={`${zoom}-${pageW}-${isMobileView}`}
          ref={bookRef}
          width={Math.floor(pageW * zoom)}
          height={Math.floor(pageH * zoom)}
          /* Cover pages shown as single pages */
          showCover={true}
          /* 1-page on mobile, 2-page spread on desktop */
          usePortrait={isMobileView}
          /* Animation */
          flippingTime={700}
          /* Visual */
          drawShadow={true}
          maxShadowOpacity={0.3}
          showPageCorners={true}
          /* Interaction */
          useMouseEvents={true}
          mobileScrollSupport={false}
          swipeDistance={25}
          clickEventForward={false}
          disableFlipByClick={false}
          /* Sizing */
          size="fixed"
          minWidth={pageW}
          maxWidth={pageW}
          minHeight={pageH}
          maxHeight={pageH}
          autoSize={false}
          /* Misc */
          startPage={currentPage}
          startZIndex={0}
          renderOnlyPageLengthChange={false}
          onFlip={handleFlip}
          style={{ boxShadow: '0 20px 50px rgba(0,0,0,0.12)', backgroundColor: '#ffffff' }}
          className=""
        >
          {pages.map(({ index, fileId, label, isBlank }) => (
            <BookPage
              key={index}
              pageIndex={index}
              fileId={fileId}
              shouldLoad={Math.abs(index - currentPage) <= PRELOAD_RANGE}
              isVisible={Math.abs(index - currentPage) <= 6}
              label={label}
              isBlank={isBlank}
            />
          ))}
        </HTMLFlipBook>
      </div>

      {/* ── Controls ──────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center px-4 w-full">
        {/* Prev */}
        <button
          onClick={flipPrev}
          disabled={currentPage === 0}
          aria-label={isEnglish ? 'Previous page' : 'Өмнөх хуудас'}
          className="p-3.5 rounded-xl bg-white border border-stone-200 text-stone-600 hover:text-red-600 hover:border-red-600 hover:bg-red-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft size={22} />
        </button>

        {/* Zoom Out */}
        <button
          onClick={() => setZoom(prev => Math.max(1, parseFloat((prev - 0.1).toFixed(2))))}
          disabled={zoom <= 1}
          className="p-3.5 rounded-xl bg-white border border-stone-200 text-stone-600 hover:text-red-600 hover:border-red-600 hover:bg-red-50 disabled:opacity-30 transition-all"
          title={isEnglish ? 'Zoom Out (scroll inside book)' : 'Жижигсгэх'}
        >
          <ZoomOut size={22} />
        </button>

        {/* Zoom % badge — click to reset */}
        {zoom > 1 && (
          <button
            onClick={() => setZoom(1)}
            className="px-2.5 py-1.5 rounded-lg bg-red-50 border border-red-200 text-red-600 text-[11px] font-black tabular-nums hover:bg-red-600 hover:text-white transition-all"
            title={isEnglish ? 'Reset zoom' : 'Томруулалт арилгах'}
          >
            {Math.round(zoom * 100)}%
          </button>
        )}

        {/* Page counter + jump-to input */}
        <div className="flex items-center gap-3 bg-white border border-stone-200 rounded-xl px-5 py-2.5 text-sm font-bold text-stone-800">
          <span className="flex items-center">
            <span className="text-red-600 font-black">{currentPage + 1}</span>
            <span className="mx-2 text-stone-300">/</span>
            <span>{totalBookPages}</span>
          </span>
          <span className="w-px h-4 bg-stone-200 mx-1" />
          <form
            onSubmit={(e) => { e.preventDefault(); jumpToPage(); }}
            className="flex items-center gap-2"
          >
            <input
              type="number"
              min={1}
              max={totalBookPages}
              value={jumpValue}
              onChange={(e) => setJumpValue(e.target.value)}
              placeholder="Go"
              className="w-10 bg-transparent text-stone-900 placeholder:text-stone-300 focus:outline-none text-center"
              style={{ MozAppearance: 'textfield' as React.CSSProperties['MozAppearance'] }}
            />
            <button
              type="submit"
              className="px-2 py-1 rounded-md text-[10px] bg-stone-100 text-stone-500 hover:bg-red-600 hover:text-white transition-colors uppercase tracking-widest font-black"
            >
              Go
            </button>
          </form>
        </div>

        {/* Zoom In */}
        <button
          onClick={() => setZoom(prev => Math.min(2.5, parseFloat((prev + 0.1).toFixed(2))))}
          disabled={zoom >= 2.5}
          className="p-3.5 rounded-xl bg-white border border-stone-200 text-stone-600 hover:text-red-600 hover:border-red-600 hover:bg-red-50 disabled:opacity-30 transition-all"
          title={isEnglish ? 'Zoom In (scroll inside book)' : 'Томсгох'}
        >
          <ZoomIn size={22} />
        </button>

        {/* Fullscreen */}
        <button
          onClick={toggleFullScreen}
          className="p-3.5 rounded-xl bg-white border border-stone-200 text-stone-600 hover:text-red-600 hover:border-red-600 hover:bg-red-50 transition-all"
          title={isEnglish ? 'Fullscreen' : 'Бүтэн дэлгэц'}
        >
          {isFullScreen ? <Minimize size={22} /> : <Maximize size={22} />}
        </button>

        {/* Next */}
        <button
          onClick={flipNext}
          disabled={currentPage >= totalBookPages - 1}
          aria-label={isEnglish ? 'Next page' : 'Дараах хуудас'}
          className="p-3.5 rounded-xl bg-white border border-stone-200 text-stone-600 hover:text-red-600 hover:border-red-600 hover:bg-red-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      {/* ── Reading progress bar ──────────────────────────────────────────── */}
      <div className="w-full px-4 pb-5 sm:px-6 sm:pb-6">
        <div className="relative w-full h-1 bg-stone-200 rounded-full overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 rounded-full transition-all duration-500"
            style={{
              width: `${progress}%`,
              backgroundColor: '#be2e2e',
            }}
          />
        </div>
        <div className="flex justify-between mt-2 text-[10px] text-stone-400 font-bold uppercase tracking-wider select-none">
          <span>{isEnglish ? 'Cover' : 'Хавтас'}</span>
          <span className="text-stone-300">{progress}%</span>
          <span>{isEnglish ? 'Back' : 'Арын хавтас'}</span>
        </div>
      </div>
    </div>
  );
}