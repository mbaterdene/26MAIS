import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Download } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import archiveData from '../../content/archive.json';
import { ArchiveBook } from '../../lib/archive-types';
import { FlipBookGallery } from './FlipBookGallery';

export function ArchiveReaderPage() {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();
  const { isEnglish } = useLanguage();

  const book = (archiveData.books as unknown as ArchiveBook[]).find(b => b.id === bookId);

  if (!book) {
    return (
      <div className="min-h-screen bg-white pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-black mb-2">
            {isEnglish ? 'Book not found' : 'Ном олдсонгүй'}
          </h1>
          <p className="text-gray-600 mb-4">
            {isEnglish ? 'The book you are looking for does not exist.' : 'Таны хайсан ном байхгүй байна.'}
          </p>
          <button
            onClick={() => navigate('/archive')}
            className="px-6 py-2 bg-cardinal-red text-white font-bold hover:bg-red-700 transition-colors"
          >
            {isEnglish ? 'Back to Archive' : 'Архив руу буцах'}
          </button>
        </div>
      </div>
    );
  }

  const title = isEnglish ? book.title_en : book.title_mn;

  return (
    <div className="min-h-screen bg-white pt-14 pb-12">
      {/* Top Bar with Back Button */}
      <div className="sticky top-0 z-40 bg-white border-b-2 border-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-3">
          <button
            onClick={() => navigate('/archive')}
            className="p-2 hover:bg-gray-100 transition-colors rounded"
            title={isEnglish ? 'Back' : 'Буцах'}
          >
            <ChevronLeft size={24} className="text-black" />
          </button>
          <div className="flex-1 min-w-0">
            <h1 className="text-sm sm:text-base font-bold text-black uppercase tracking-widest">
              {isEnglish ? 'Archive' : 'Архив'}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 pt-4 sm:pt-6 pb-4 border-b-2 border-black">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-black font-serif uppercase">
              {title}
            </h2>
            {book.downloadUrl && (
              <a
                href={book.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 hover:bg-gray-100 rounded-full transition-colors text-black hover:text-cardinal-red"
                title={isEnglish ? 'Download PDF' : 'PDF татах'}
              >
                <Download size={24} />
              </a>
            )}
          </div>
        </div>

        {/* Flip-book reader */}
        <div className="mb-8 rounded-xl overflow-hidden">
          <FlipBookGallery
            pageMapping={book.pageMapping}
            totalPages={book.pageCount}
            title=""
            bookId={book.id}
          />
        </div>

        {/* Back to Archive Link */}
        <div className="mt-12 pt-8 border-t-2 border-black text-center">
          <button
            onClick={() => navigate('/archive')}
            className="px-6 py-2 border-2 border-cardinal-red text-cardinal-red font-bold hover:bg-red-50 transition-colors"
          >
            {isEnglish ? 'Back to Archive' : 'Архив руу буцах'}
          </button>
        </div>
      </div>
    </div>
  );
}
