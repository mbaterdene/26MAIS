import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Download } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { ArchiveBook } from '../../lib/archive-types';

interface BookCardProps {
  book: ArchiveBook;
}

export function BookCard({ book }: BookCardProps) {
  const { isEnglish } = useLanguage();
  const [imgError, setImgError] = useState(false);

  const title = isEnglish ? book.title_en : book.title_mn;

  // Use the thumbnail API — works without authentication for publicly-shared files
  const thumbnailUrl = book.pageMapping.frontFileId
    ? `https://drive.google.com/thumbnail?id=${book.pageMapping.frontFileId}&sz=w400`
    : null;

  return (
    <Link
      to={`/archive/${book.id}`}
      className="group bg-white border-2 border-black hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300"
    >
      {/* Thumbnail - Taller aspect ratio */}
      <div className="aspect-[3/4] bg-gray-100 overflow-hidden border-b-2 border-black flex items-center justify-center relative">
        {thumbnailUrl && !imgError ? (
          <img
            src={thumbnailUrl}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-gray-400 group-hover:text-cardinal-red transition-colors">
            <BookOpen size={64} strokeWidth={1} />
          </div>
        )}
      </div>

      {/* Simplified Content at Bottom */}
      <div className="p-4 bg-white border-t-0">
        <h3 className="font-serif font-black text-base sm:text-lg text-black mb-2 line-clamp-1 uppercase tracking-tight group-hover:text-cardinal-red transition-colors">
          {title}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-[10px] sm:text-xs font-black text-stone-400 uppercase tracking-widest">
            {book.pageCount} {isEnglish ? 'pages' : 'хуудас'}
          </span>
          <div className="flex items-center gap-3">
            {book.downloadUrl && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  window.open(book.downloadUrl, '_blank');
                }}
                className="text-stone-400 hover:text-cardinal-red transition-colors"
                title={isEnglish ? 'Download PDF' : 'PDF татах'}
              >
                <Download size={16} strokeWidth={2.5} />
              </button>
            )}
            <div className="text-black group-hover:text-cardinal-red transition-colors">
              <BookOpen size={16} strokeWidth={2.5} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
