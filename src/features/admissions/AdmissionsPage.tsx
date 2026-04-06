import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { pageText } from '../../data/pageText';
import { FileText, Users, Calendar } from 'lucide-react';

export function AdmissionsPage() {
  const { t } = useLanguage();
  const ui = pageText.studentLife;
  const tr = (label: { en: string; mn: string }) => t(label.en, label.mn);

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="relative bg-black text-white py-32 md:py-44 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30 bg-gradient-to-br from-cardinal-red to-black" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}
            className="inline-flex text-xs font-bold tracking-[0.2em] uppercase text-white/50 bg-white/10 px-4 py-1.5 rounded-full mb-8"
          >
            {t('Admissions', 'Элсэлт')}
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-7xl font-serif font-bold mb-6"
          >
            {t('Join Our School', 'Манай сургуульд элсээрэй')}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.8 }}
            className="text-xl text-gray-200 max-w-2xl font-sans"
          >
            {t(
              'Learn about our entrance examination and registration process.',
              'Манай орох шалгалт болон бүртгэлийн процессын талаар мэдээлэл аваарай.'
            )}
          </motion.p>
        </div>
      </section>

      {/* Info Cards */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="bg-white rounded-2xl p-8 shadow-sm text-center"
            >
              <div className="w-16 h-16 bg-cardinal-red/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText size={28} className="text-cardinal-red" />
              </div>
              <h3 className="text-xl font-serif font-bold mb-2">{tr(ui.admissionExam)}</h3>
              <p className="text-gray-600 text-sm">{t(
                'Annual entrance exam to select exceptional students.',
                'Онцгой сурагчдыг сонгох жилийн орох шалгалт.'
              )}</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl p-8 shadow-sm text-center"
            >
              <div className="w-16 h-16 bg-digital-blue/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar size={28} className="text-digital-blue" />
              </div>
              <h3 className="text-xl font-serif font-bold mb-2">{tr(ui.registrationOpens)}</h3>
              <p className="text-gray-600 text-sm">{t(
                'Registration opens in June each year.',
                'Бүртгэл жил бүрийн 6-р сард нээгдэнэ.'
              )}</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-sm text-center"
            >
              <div className="w-16 h-16 bg-sand/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users size={28} className="text-sand" />
              </div>
              <h3 className="text-xl font-serif font-bold mb-2">{tr(ui.topStudents)}</h3>
              <p className="text-gray-600 text-sm">{t(
                'Top 96 students selected from the exam each year.',
                'Жил бүр шалгалтаас топ 96 сурагч сонгогдоно.'
              )}</p>
            </motion.div>
          </div>

          {/* Detail */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 md:p-12 shadow-sm"
          >
            <h2 className="text-3xl font-serif font-bold text-black mb-6">{tr(ui.admissionTitle)}</h2>
            <div className="text-gray-700 font-sans leading-relaxed space-y-4">
              <p>{t(
                'Mongol Aspiration School holds an annual entrance examination to select exceptional students for our program. The examination is designed to identify students with strong academic foundations and exceptional potential.',
                'Монгол Тэмүүлэл сургууль жил бүр гайхамшигт оюун ухаантай сурагчдыг сонгох үндэсний шалгалт явуулдаг.'
              )}</p>
              <p>{t(
                'Selection Process: The top 96 students are admitted to our school each year after successfully completing our comprehensive entrance examination.',
                'Сонгох үйл явц: Бидний сургуулийн цогц орох шалгалтыг амжилттай өнгөрөөсөн топ 96 сурагчдыг жил бүр элсүүлдэг.'
              )}</p>
              <p>{t(
                'Registration Period: Registration for the annual entrance examination opens in June at our admission website.',
                'Бүртгэлийн хугацаа: Жилийн орох шалгалтанд бүртгүүлэх хугацаа 6-р сарын үед манай элсэлтийн вэб сайтад эхэлдэг.'
              )}</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
