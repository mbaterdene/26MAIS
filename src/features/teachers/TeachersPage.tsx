import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Mail, BookOpen } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { getTeachers } from '../../lib/api';
import type { Teacher } from '../../lib/types';

type TeacherCategory = 'all' | 'national' | 'igcse' | 'aice';

export function TeachersPage() {
  const { t } = useLanguage();
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<TeacherCategory>('all');

  useEffect(() => {
    getTeachers().then((data) => { setTeachers(data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  const filteredTeachers = activeCategory === 'all' ? teachers : teachers.filter(t => t.category === activeCategory);

  const categoryLabel = (cat: string) => {
    switch (cat) {
      case 'national': return t('National Program', 'Үндэсний программ');
      case 'igcse': return t('IGCSE', 'IGCSE');
      case 'aice': return t('Cambridge A-Level', 'Кембрижийн A-Level');
      default: return cat;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Hero Section ───────────────────────────────────── */}
      <section className="relative bg-black text-white py-32 md:py-44 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30 bg-gradient-to-br from-cardinal-red to-digital-blue" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-cardinal-red/10 blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}
            className="inline-flex text-xs font-bold tracking-[0.2em] uppercase text-white/50 bg-white/10 px-4 py-1.5 rounded-full mb-8"
          >
            {t('Faculty', 'Багш нарын баг')}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight"
          >
            {t('Our Teachers', 'Манай багш нар')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-200 max-w-2xl font-sans leading-relaxed"
          >
            {t('Expert educators committed to student success and development.', 'Сурагчдын амжилт болон хөгжүүлэмжид зорилгоо тавьсан мэргэжилтэн багш нар.')}
          </motion.p>
        </div>
      </section>

      {/* ── Category Filter ───────────────────────────────────── */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {(['all', 'national', 'igcse', 'aice'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full font-medium text-sm transition-all ${
                  activeCategory === cat
                    ? 'bg-cardinal-red text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat === 'all' ? t('All Teachers', 'Бүх багш') : categoryLabel(cat)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Teachers Grid ───────────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-20 text-gray-500">{t('Loading...', 'Ачааллаж байна...')}</div>
          ) : filteredTeachers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredTeachers.map((teacher, i) => (
                <motion.div
                  key={teacher.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-cardinal-red/20 group"
                >
                  {/* Header with category badge */}
                  <div className="h-32 bg-gradient-to-br from-cardinal-red/10 to-digital-blue/10 flex items-center justify-center relative overflow-hidden">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                      className="absolute w-32 h-32 rounded-full bg-cardinal-red/5"
                    />
                    <div className="absolute top-3 right-3 z-10">
                      <span className="inline-block text-xs font-bold tracking-[0.1em] uppercase text-cardinal-red bg-cardinal-red/10 px-3 py-1 rounded-full">
                        {categoryLabel(teacher.category)}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <div className="mb-4">
                      <h3 className="text-xl font-serif font-bold text-black mb-1">{teacher.full_name}</h3>
                      <div className="inline-flex items-center gap-2 text-sm text-cardinal-red font-semibold">
                        <BookOpen size={14} />
                        {teacher.subject}
                      </div>
                    </div>

                    <p className="text-gray-600 font-sans leading-relaxed mb-6 text-sm line-clamp-3">
                      {teacher.bio}
                    </p>

                    {/* Contact */}
                    <a
                      href={`mailto:${teacher.email}`}
                      className="inline-flex items-center gap-2 text-sm text-digital-blue hover:text-digital-blue/80 font-medium transition-colors"
                    >
                      <Mail size={14} />
                      {teacher.email}
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-500">
              {t('No teachers found', 'Багш олдсонгүй')}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
