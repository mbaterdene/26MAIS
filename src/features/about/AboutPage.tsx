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
          </div>
        </section>
      )}

      {/* ── Principal's Greeting ────────────────── */}
      {data?.principal && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="bg-gradient-to-br from-cardinal-red to-digital-blue rounded-2xl overflow-hidden shadow-lg h-96">
                  {data.principal.photo && (
                    <img src={data.principal.photo} alt={data.principal.name_en} className="w-full h-full object-cover" />
                  )}
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl font-serif font-bold mb-3 text-black">
                  {bil(isEnglish, data.principal.name_en, data.principal.name_mn)}
                </h2>
                <p className="text-lg font-semibold text-cardinal-red mb-6">
                  {bil(isEnglish, data.principal.title_en, data.principal.title_mn)}
                </p>
                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  {bil(isEnglish, data.principal.message_en, data.principal.message_mn)}
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* ── School Journey Timeline ──────────────── */}
      {data?.timeline && data.timeline.length > 0 && (
        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-serif font-bold text-black mb-4">{t('Our Journey', 'Манай замнал')}</h2>
            </div>
            <div className="relative">
              <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 h-full border-l-2 border-dashed border-cardinal-red/50" />
              <div className="space-y-10">
                {data.timeline.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="relative"
                  >
                    <div className="md:hidden pl-12">
                      <div className="relative bg-white border border-slate-200 shadow-sm p-6">
                        <span className="inline-flex items-center px-3 py-1 text-xs font-bold tracking-widest text-white bg-cardinal-red mb-3">
                          {item.year}
                        </span>
                        <h3 className="text-xl font-serif font-bold text-black mb-2">
                          {bil(isEnglish, item.title_en, item.title_mn)}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {bil(isEnglish, item.description_en, item.description_mn)}
                        </p>
                      </div>
                    </div>

                    <div className="hidden md:grid md:grid-cols-2 md:gap-12 items-center">
                      <div className={index % 2 === 0 ? '' : 'order-2'}>
                        <div className="relative bg-white border border-slate-200 shadow-sm p-7">
                          <span className="inline-flex items-center px-3 py-1 text-xs font-bold tracking-widest text-white bg-cardinal-red mb-3">
                            {item.year}
                          </span>
                          <h3 className="text-xl font-serif font-bold text-black mb-2">
                            {bil(isEnglish, item.title_en, item.title_mn)}
                          </h3>
                          <p className="text-gray-600 leading-relaxed">
                            {bil(isEnglish, item.description_en, item.description_mn)}
                          </p>
                        </div>
                      </div>
                      <div className={index % 2 === 0 ? 'order-2' : ''} />
                    </div>

                    <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-8 w-4 h-4 bg-cardinal-red rotate-45 border border-white" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Key Statistics ──────────────────────── */}
      {info && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-serif font-bold text-center mb-16 text-black">{t('School Statistics', 'Сургуулийн статистик')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white p-8 border-2 border-cardinal-red rounded-lg"
              >
                <div className="text-3xl font-serif font-bold text-cardinal-red mb-2">IGCSE</div>
                <p className="text-sm text-gray-600 mb-4">{t('International General Certificate of Secondary Education', 'Олон улсын ерөнхий дунд боловсролын гэрчилгээ')}</p>
                <div className="text-4xl font-bold text-cardinal-red mb-1">17</div>
                <p className="text-gray-700 text-sm">{t('subjects', 'хичээл')}</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white p-8 border-2 border-cardinal-red rounded-lg"
              >
                <div className="text-3xl font-serif font-bold text-cardinal-red mb-2">AS Level</div>
                <p className="text-sm text-gray-600 mb-4">{t('Advanced Subsidiary Level', 'Дээд түвшний туслах түвшин')}</p>
                <div className="text-4xl font-bold text-cardinal-red mb-1">16</div>
                <p className="text-gray-700 text-sm">{t('subjects', 'хичээл')}</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white p-8 border-2 border-cardinal-red rounded-lg"
              >
                <div className="text-3xl font-serif font-bold text-cardinal-red mb-2">A2 Level</div>
                <p className="text-sm text-gray-600 mb-4">{t('Advanced Level', 'Дээд түвшин')}</p>
                <div className="text-4xl font-bold text-cardinal-red mb-1">11</div>
                <p className="text-gray-700 text-sm">{t('subjects', 'хичээл')}</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white p-8 border-2 border-cardinal-red rounded-lg"
              >
                <div className="text-3xl font-serif font-bold text-cardinal-red mb-2">PDQ</div>
                <p className="text-sm text-gray-600 mb-4">{t('Professional Development Qualification', 'Мэргэжлийн хөгжлийн гэрчилгээ')}</p>
                <div className="text-4xl font-bold text-cardinal-red mb-1">2</div>
                <p className="text-gray-700 text-sm">{t('program', 'хөтөлбөр')}</p>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* ── Alumni Achievements ─────────────────── */}
      {data?.achievements && data.achievements.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-serif font-bold text-center mb-16 text-black">{t('Remarkable Achievements', 'Гайхамшигт амжилтууд')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data.achievements.slice(0, 6).map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="bg-white border border-gray-200 p-0 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                >
                  <div className="bg-cardinal-red px-5 py-3 flex items-center justify-between">
                    <p className="text-xs font-bold tracking-widest text-white uppercase">{achievement.type.replace('_', ' ')}</p>
                    <p className="text-sm font-bold text-white">{achievement.year > 0 ? achievement.year : '—'}</p>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-serif font-bold text-black leading-snug">
                      {bil(isEnglish, achievement.title_en, achievement.title_mn)}
                    </h3>
                  </div>
                </motion.div>
              ))}
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
