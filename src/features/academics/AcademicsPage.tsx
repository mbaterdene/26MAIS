import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { BookOpen } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { getCourseList } from '../../lib/api';
import type { Course } from '../../lib/types';
import { truncateWords } from '../../lib/utils';
import { pageText } from '../../data/pageText';

export function AcademicsPage() {
  const { t } = useLanguage();
  const ui = pageText.coursesList;
  const tr = (label: { en: string; mn: string }) => t(label.en, label.mn);
  const [courses, setCourses] = useState<Course[]>([]);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    getCourseList().then(setCourses).catch(() => {});
  }, []);

  const grades = [...new Set(courses.map((c) => c.grade).filter(Boolean))] as string[];
  const filtered = filter === 'all' ? courses : courses.filter((c) => c.grade === filter);

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="relative bg-black text-white py-32 md:py-44 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30 bg-gradient-to-br from-digital-blue to-cardinal-red" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}
            className="inline-flex text-xs font-bold tracking-[0.2em] uppercase text-white/50 bg-white/10 px-4 py-1.5 rounded-full mb-8"
          >
            {t('Academics', 'Сургалт')}
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-7xl font-serif font-bold mb-6"
          >
            {t('Curriculum', 'Хөтөлбөр')}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.8 }}
            className="text-xl text-gray-200 max-w-2xl font-sans"
          >
            {t(
              'National and international programs with Cambridge IGCSE, AS & A Level curriculum.',
              'Кэмбрижийн IGCSE, AS & A Level хөтөлбөртэй үндэсний болон олон улсын сургалт.'
            )}
          </motion.p>
        </div>
      </section>

      {/* Course List */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter */}
          <div className="flex flex-wrap gap-3 mb-12">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${filter === 'all' ? 'bg-cardinal-red text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
            >
              {tr(ui.allGrades)}
            </button>
            {grades.map((g) => (
              <button
                key={g}
                onClick={() => setFilter(g)}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${filter === g ? 'bg-cardinal-red text-white' : 'bg-white text-gray-700 hover:bg-gray-100'}`}
              >
                {g} {tr(ui.gradeSuffix)}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((course, i) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group"
              >
                <div className="h-40 bg-gradient-to-br from-digital-blue/10 to-cardinal-red/5 flex items-center justify-center">
                  <BookOpen size={40} className="text-gray-300" />
                </div>
                <div className="p-6">
                  {course.grade_display && (
                    <span className="inline-block bg-cardinal-red text-white px-3 py-1 rounded-full text-xs font-bold mb-3">{course.grade_display}</span>
                  )}
                  <h3 className="text-lg font-serif font-bold text-black mb-2 group-hover:text-cardinal-red transition-colors">{course.name}</h3>
                  {course.teacher && <p className="text-sm text-gray-500 mb-2">{tr(ui.teacher)}: {course.teacher}</p>}
                  <p className="text-gray-600 text-sm line-clamp-3">{truncateWords(course.description, 20)}</p>
                </div>
              </motion.div>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-20 text-gray-500">{tr(ui.empty)}</div>
          )}
        </div>
      </section>
    </div>
  );
}
