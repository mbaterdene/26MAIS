import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { getTeachers } from '../../lib/api';
import type { Teacher } from '../../lib/types';

type TeacherCategory = 'all' | 'national' | 'international' | 'other_staff';

const ITEMS_PER_PAGE = 10;

export function TeachersPage() {
  const { t, isEnglish } = useLanguage();
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<TeacherCategory>('all');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getTeachers().then((data) => { 
      setTeachers(data); 
      setLoading(false); 
    }).catch(() => setLoading(false));
  }, []);

  const filteredTeachers = activeCategory === 'all' 
    ? teachers 
    : activeCategory === 'national'
    ? teachers.filter(t => t.category === 'national' && t.type === 'teacher')
    : activeCategory === 'international'
    ? teachers.filter(t => t.category === 'international' && t.type === 'teacher')
    : teachers.filter(t => t.type === 'general_staff');

  const totalPages = Math.ceil(filteredTeachers.length / ITEMS_PER_PAGE);
  const paginatedTeachers = filteredTeachers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const categoryLabel = (cat: string) => {
    const labels: Record<string, string> = {
      'all': isEnglish ? 'All Staff' : 'Бүх баг',
      'national': isEnglish ? 'National Program' : 'Үндэсний программ',
      'international': isEnglish ? 'International Program' : 'Олон улсын программ',
      'other_staff': isEnglish ? 'Other Staff' : 'Бусад баг',
      'igcse': 'IGCSE',
      'aice': isEnglish ? 'Cambridge A-Level' : 'Кембрижийн A-Level',
      'pdq': isEnglish ? 'PDQ' : 'PDQ',
    };
    return labels[cat] || cat;
  };

  const handleCategoryChange = (cat: TeacherCategory) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  const generatePageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
    
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="min-h-screen bg-white pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Header ───────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold uppercase tracking-wider text-black mb-3">
            THE FACULTY
          </h1>
          <p className="text-base md:text-lg font-bold uppercase tracking-[0.3em] text-cardinal-red">
            ACADEMIC ROSTER // 2024 - 2025
          </p>
          <div className="mt-6 h-1 w-32 bg-black" />
        </motion.div>

        {/* ── Main Content with Sidebar ───────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* ── Sidebar Filter ───────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-600 mb-6">
                {isEnglish ? 'Filter by Program' : 'Хөтөлбөрөөр сүүдэр'}
              </h3>
              
              {([
                { id: 'all', label: categoryLabel('all') },
                { id: 'national', label: categoryLabel('national') },
                { id: 'international', label: categoryLabel('international') },
                { id: 'other_staff', label: categoryLabel('other_staff') },
              ] as const).map((cat) => (
                <motion.button
                  key={cat.id}
                  whileHover={{ x: 4 }}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`w-full text-left px-4 py-3 border-l-4 transition-all duration-300 ${
                    activeCategory === cat.id
                      ? 'bg-cardinal-red text-white border-l-cardinal-red font-bold'
                      : 'bg-white text-gray-700 border-l-gray-200 hover:bg-gray-50 hover:border-l-gray-400'
                  }`}
                >
                  <span className="text-sm font-bold uppercase tracking-wider block">{cat.label}</span>
                </motion.button>
              ))}
            </div>

            {/* Apply Filters Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {}}
              className="w-full mt-8 px-6 py-3 bg-black text-white font-bold uppercase text-xs tracking-widest hover:bg-gray-800 transition-colors"
            >
              {isEnglish ? 'Apply Filters' : 'Сүүдэр хэрэглэх'}
            </motion.button>

            {/* Total Members Count */}
            <div className="mt-8 p-4 bg-gray-50 border border-gray-200">
              <p className="text-xs uppercase tracking-widest font-bold text-gray-600 mb-2">
                {isEnglish ? 'Total Members' : 'Нийт Гишүүд'}
              </p>
              <p className="text-4xl font-bold text-black">{filteredTeachers.length}</p>
            </div>
          </motion.div>

          {/* ── Teachers Directory ───────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            {loading ? (
              <div className="text-center py-20">
                <div className="inline-block w-8 h-8 border-3 border-cardinal-red border-t-transparent rounded-full animate-spin" />
              </div>
            ) : filteredTeachers.length > 0 ? (
              <>
                {/* ── Mobile Card Layout ───────────────────────────────────── */}
                <div className="lg:hidden space-y-4">
                  {paginatedTeachers.map((teacher, idx) => (
                    <motion.div
                      key={teacher.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="border border-black p-6 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start gap-4">
                        {/* Photo + ID */}
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-16 h-16 bg-gradient-to-br from-cardinal-red/20 to-digital-blue/20 rounded-lg flex items-center justify-center border border-gray-200">
                            {teacher.photo ? (
                              <img src={teacher.photo} alt={teacher.full_name} className="w-full h-full object-cover rounded-lg" />
                            ) : (
                              <span className="text-2xl">👤</span>
                            )}
                          </div>
                          <span className="font-bold text-sm text-gray-400">
                            {String((currentPage - 1) * ITEMS_PER_PAGE + idx + 1).padStart(2, '0')}
                          </span>
                        </div>

                        {/* Info */}
                        <div className="flex-1">
                          <h3 className="font-bold text-black uppercase tracking-wide text-sm leading-tight mb-1">
                            {teacher.full_name}
                          </h3>
                          <p className="text-xs text-gray-500 mb-3">
                            {teacher.position || (isEnglish ? 'Staff' : 'Баг')}
                          </p>

                          {/* Subject & Program */}
                          <div className="space-y-2 pt-3 border-t border-gray-200">
                            {teacher.type === 'teacher' ? (
                              <>
                                <div>
                                  <p className="text-xs font-bold uppercase tracking-widest text-gray-600 mb-1">
                                    {isEnglish ? 'Subject' : 'Хичээл'}
                                  </p>
                                  <p className="text-sm font-semibold text-gray-700">
                                    {teacher.subject || '—'}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-xs font-bold uppercase tracking-widest text-gray-600 mb-1">
                                    {isEnglish ? 'Program' : 'Хөтөлбөр'}
                                  </p>
                                  <span className="inline-block px-3 py-1 bg-black text-white font-bold text-xs uppercase tracking-widest">
                                    {categoryLabel(teacher.category)}
                                  </span>
                                </div>
                              </>
                            ) : (
                              <>
                                <div>
                                  <p className="text-xs font-bold uppercase tracking-widest text-gray-600 mb-1">
                                    {isEnglish ? 'Subject' : 'Хичээл'}
                                  </p>
                                  <p className="text-sm font-semibold text-gray-700">—</p>
                                </div>
                                <div>
                                  <p className="text-xs font-bold uppercase tracking-widest text-gray-600 mb-1">
                                    {isEnglish ? 'Program' : 'Хөтөлбөр'}
                                  </p>
                                  <p className="text-sm font-semibold text-gray-700">—</p>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* ── Desktop Table Layout ───────────────────────────────────── */}
                <div className="hidden lg:block space-y-0 border border-black">
                  {/* Table Header */}
                  <div className="grid grid-cols-12 gap-4 bg-black text-white p-6 font-bold uppercase text-xs tracking-widest border-b border-black">
                    <div className="col-span-1">{isEnglish ? 'ID' : 'ID'}</div>
                    <div className="col-span-1">{isEnglish ? 'Photo' : 'Зураг'}</div>
                    <div className="col-span-4">{isEnglish ? 'Name & Position' : 'Нэр & Албан тушаал'}</div>
                    <div className="col-span-3">{isEnglish ? 'Subject' : 'Хичээл'}</div>
                    <div className="col-span-3">{isEnglish ? 'Program' : 'Хөтөлбөр'}</div>
                  </div>

                  {/* Table Rows */}
                  {paginatedTeachers.map((teacher, idx) => (
                    <motion.div
                      key={teacher.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: idx * 0.05 }}
                      className="grid grid-cols-12 gap-4 p-6 border-b border-gray-200 hover:bg-gray-50 transition-colors items-center"
                    >
                      <div className="col-span-1">
                        <span className="font-bold text-lg text-gray-400">
                          {String((currentPage - 1) * ITEMS_PER_PAGE + idx + 1).padStart(2, '0')}
                        </span>
                      </div>
                      
                      <div className="col-span-1">
                        <div className="w-12 h-12 bg-gradient-to-br from-cardinal-red/20 to-digital-blue/20 rounded-lg flex items-center justify-center border border-gray-200">
                          {teacher.photo ? (
                            <img src={teacher.photo} alt={teacher.full_name} className="w-full h-full object-cover rounded-lg" />
                          ) : (
                            <span className="text-lg">👤</span>
                          )}
                        </div>
                      </div>

                      <div className="col-span-4">
                        <h3 className="font-bold text-black uppercase tracking-wide">
                          {teacher.full_name}
                        </h3>
                        <p className="text-xs text-gray-500 mt-1">
                          {teacher.position || (isEnglish ? 'Staff' : 'Баг')}
                        </p>
                      </div>

                      <div className="col-span-3">
                        <p className="text-sm font-semibold text-gray-700">
                          {teacher.type === 'teacher' ? (teacher.subject || '—') : '—'}
                        </p>
                      </div>

                      <div className="col-span-3">
                        {teacher.type === 'teacher' ? (
                          <span className="inline-block px-3 py-1 bg-black text-white font-bold text-xs uppercase tracking-widest">
                            {categoryLabel(teacher.category)}
                          </span>
                        ) : (
                          <span className="text-sm font-semibold text-gray-700">—</span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-20 text-gray-500">
                {isEnglish ? 'No teachers found' : 'Багш олдсонгүй'}
              </div>
            )}

            {/* ── Pagination ───────────────────────────────────── */}
            {filteredTeachers.length > 0 && (
              <div className="mt-12 flex items-center justify-between">
                <div className="text-sm text-gray-600 font-medium">
                  {isEnglish ? `Showing ${(currentPage - 1) * ITEMS_PER_PAGE + 1}–${Math.min(currentPage * ITEMS_PER_PAGE, filteredTeachers.length)} of ${filteredTeachers.length}` : `${(currentPage - 1) * ITEMS_PER_PAGE + 1}–${Math.min(currentPage * ITEMS_PER_PAGE, filteredTeachers.length)} / ${filteredTeachers.length}`}
                </div>

                <div className="flex gap-2 items-center">
                  {currentPage > 1 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setCurrentPage(currentPage - 1)}
                      className="px-3 py-2 border border-gray-300 font-bold text-sm hover:bg-gray-50 transition-colors"
                    >
                      ←
                    </motion.button>
                  )}

                  {generatePageNumbers().map((page) => (
                    <motion.button
                      key={page}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-2 font-bold text-sm border transition-all ${
                        currentPage === page
                          ? 'bg-black text-white border-black'
                          : 'border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </motion.button>
                  ))}

                  {currentPage < totalPages && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setCurrentPage(currentPage + 1)}
                      className="px-3 py-2 border border-gray-300 font-bold text-sm hover:bg-gray-50 transition-colors"
                    >
                      →
                    </motion.button>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
