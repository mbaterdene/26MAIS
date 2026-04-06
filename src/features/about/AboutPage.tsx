import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { getAboutData } from '../../lib/api';
import type { AboutData } from '../../lib/api';
import { bil, formatNumber } from '../../lib/utils';
import { pageText } from '../../data/pageText';

export function AboutPage() {
  const { isEnglish, t } = useLanguage();
  const ui = pageText.about;
  const tr = (label: { en: string; mn: string }) => t(label.en, label.mn);
  const [data, setData] = useState<AboutData | null>(null);

  useEffect(() => {
    getAboutData().then(setData).catch(() => {});
  }, []);

  const info = data?.school_info;

  return (
    <div className="w-full">
      {/* ── Hero ───────────────────────────────── */}
      <section className="relative bg-black text-white py-32 md:py-44 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30 bg-gradient-to-br from-cardinal-red to-digital-blue" />
        <motion.div
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-cardinal-red/10 blur-3xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}
            className="inline-flex text-xs font-bold tracking-[0.2em] uppercase text-white/50 bg-white/10 px-4 py-1.5 rounded-full mb-8"
          >
            {tr(ui.heroTitle)}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight"
          >
            {t('Mongol', 'Монгол')} <br />
            <span className="text-cardinal-red">{t('Aspiration', 'Тэмүүлэл')}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-200 max-w-2xl font-sans leading-relaxed"
          >
            {tr(ui.heroSubtitle)}
          </motion.p>
        </div>
      </section>

      {/* ── Vision & Mission ───────────────────── */}
      {info && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-cardinal-red bg-cardinal-red/10 px-3 py-1 rounded-full mb-4">{tr(ui.vision)}</span>
                <p className="text-lg text-gray-700 font-sans leading-relaxed">{bil(isEnglish, info.vision_en, info.vision_mn)}</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
                <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-digital-blue bg-digital-blue/10 px-3 py-1 rounded-full mb-4">{tr(ui.mission)}</span>
                <p className="text-lg text-gray-700 font-sans leading-relaxed">{bil(isEnglish, info.mission_en, info.mission_mn)}</p>
              </motion.div>
            </div>
            {(info.total_students || info.total_teachers) && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
                {info.total_students && (
                  <div className="text-center">
                    <p className="text-4xl font-bold text-cardinal-red">{formatNumber(info.total_students)}</p>
                    <p className="text-gray-500 mt-1">{tr(ui.totalStudents)}</p>
                  </div>
                )}
                {info.total_teachers && (
                  <div className="text-center">
                    <p className="text-4xl font-bold text-digital-blue">{formatNumber(info.total_teachers)}</p>
                    <p className="text-gray-500 mt-1">{tr(ui.totalTeachers)}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── School Characteristics ──────────────── */}
      {data && data.characteristics.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-serif font-bold text-center mb-12 text-black">{tr(ui.schoolCharacteristics)}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.characteristics.map((c, i) => (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-serif font-bold text-black mb-3">{bil(isEnglish, c.title_en, c.title_mn)}</h3>
                  <p className="text-gray-600 font-sans leading-relaxed">{bil(isEnglish, c.description_en, c.description_mn)}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── National Program Results ────────────── */}
      {data?.national_program && (
        <section className="py-20 bg-black text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-serif font-bold mb-12">{tr(ui.nationalProgramResults)}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <p className="text-5xl font-bold text-cardinal-red">{data.national_program.performance_rate}%</p>
                <p className="text-gray-400 mt-2">{tr(ui.performanceRate)}</p>
              </div>
              <div>
                <p className="text-5xl font-bold text-digital-blue">{data.national_program.success_rate}%</p>
                <p className="text-gray-400 mt-2">{tr(ui.successRate)}</p>
              </div>
              <div>
                <p className="text-5xl font-bold text-sand">{data.national_program.quality_rate}%</p>
                <p className="text-gray-400 mt-2">{tr(ui.qualityRate)}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Graduate Information ────────────────── */}
      {data && data.graduate_stats.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-serif font-bold text-center mb-4 text-black">{tr(ui.graduateInformation)}</h2>
            <div className="grid grid-cols-3 gap-8 text-center mb-12">
              <div>
                <p className="text-3xl font-bold text-cardinal-red">{formatNumber(data.total_graduates)}</p>
                <p className="text-gray-500">{tr(ui.totalGraduates)}</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-digital-blue">{formatNumber(data.total_abroad)}</p>
                <p className="text-gray-500">{tr(ui.abroad)}</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-sand">${formatNumber(data.total_scholarship)}</p>
                <p className="text-gray-500">{tr(ui.scholarshipAmount)}</p>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="py-3 px-4 text-sm font-bold text-gray-500">{tr(ui.year)}</th>
                    <th className="py-3 px-4 text-sm font-bold text-gray-500">{tr(ui.totalGraduates)}</th>
                    <th className="py-3 px-4 text-sm font-bold text-gray-500">{tr(ui.abroad)}</th>
                    <th className="py-3 px-4 text-sm font-bold text-gray-500">{tr(ui.scholarshipAmount)}</th>
                    <th className="py-3 px-4 text-sm font-bold text-gray-500">{tr(ui.percentage)}</th>
                  </tr>
                </thead>
                <tbody>
                  {data.graduate_stats.map((g) => (
                    <tr key={g.year} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-semibold">{g.year}</td>
                      <td className="py-3 px-4">{formatNumber(g.total_graduates)}</td>
                      <td className="py-3 px-4">{formatNumber(g.abroad_count)}</td>
                      <td className="py-3 px-4">${formatNumber(g.scholarship_amount)}</td>
                      <td className="py-3 px-4">{g.percentage}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
