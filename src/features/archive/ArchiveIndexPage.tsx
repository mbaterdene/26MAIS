import { useLanguage } from '../../context/LanguageContext';
import archiveData from '../../content/archive.json';
import { ArchiveBook } from '../../lib/archive-types';
import { BookCard } from './BookCard';

export function ArchiveIndexPage() {
  const { isEnglish } = useLanguage();
  const books = (archiveData.books as unknown as ArchiveBook[]) || [];

  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-0 border-b-2 border-black pb-6 sm:pb-8">
          <div className="inline-block bg-white px-0 py-1 mb-2">
            <span className="text-xs sm:text-sm font-bold text-gray-600 uppercase tracking-widest">
              {isEnglish ? 'Library Index' : 'Том индекс'}
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-black mb-2 font-serif uppercase">
            {isEnglish ? 'Archive' : 'Архив'}
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl">
            {isEnglish
              ? 'Explore our institution archives - yearbooks, study guides, and collections'
              : 'Манай сургууль архивыг судлаарай - жилийн номууд, гарын авлага, цуглуулгууд'}
          </p>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 mt-12">
          {books.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </div>
  );
}
