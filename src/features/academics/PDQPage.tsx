import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

export function PDQPage() {
  const { isEnglish } = useLanguage();

  const title = isEnglish ? 'Program Development & Quality' : 'Хөтөлбөрийн хөгжил ба чанар';
  const subtitle = isEnglish
    ? 'Ensuring educational excellence through continuous improvement'
    : 'Тасралтгүй дор хаяа явуулах замаар боловсролын өндөр чанарыг хангах';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-black text-white py-44 flex items-center justify-center">
        <motion.div
          className="text-center max-w-4xl px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">{title}</h1>
          <p className="text-xl md:text-2xl text-gray-300">{subtitle}</p>
        </motion.div>
      </section>

      {/* Overview with Indicators */}
      <motion.section
        className="py-12 bg-slate-50"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Overview */}
            <motion.div
              className="bg-white border-2 border-cardinal-red p-8 rounded-lg shadow-lg"
              variants={itemVariants}
            >
              <h2 className="text-2xl font-bold mb-4 text-black">
                {isEnglish ? 'Program Overview' : 'Хөтөлбөрийн тойм'}
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {isEnglish
                  ? 'Our Program Development & Quality initiative focuses on continuous improvement of educational standards and curriculum delivery. We evaluate, enhance, and innovate our programs to meet international and national benchmarks while maintaining our educational excellence.'
                  : 'Бидний Хөтөлбөрийн хөгжил ба чанар санаачих боловсролын норм ба сургалтын хүргүүлэлтийн тасралтгүй сайжруулалтад чиглэгддэг. Бид олон улсын болон үндэсний стандарттай нийцүүлэхийн зэрэгцээ боловсролын өндөр чанарыг хадгалан програмуудаа үнэлдэг, сайжруулдаг, шинэчилдэг.'}
              </p>
            </motion.div>

            {/* Indicators */}
            <motion.div className="space-y-4" variants={itemVariants}>
              <div className="bg-white border-2 border-cardinal-red p-6 rounded-lg shadow-lg">
                <div className="text-4xl font-bold text-cardinal-red mb-2">98%</div>
                <div className="text-gray-700 font-semibold">
                  {isEnglish ? 'Program Satisfaction Rate' : 'Хөтөлбөрийн сэтгэл ханамжийн түвшин'}
                </div>
              </div>
              <div className="bg-white border-2 border-cardinal-red p-6 rounded-lg shadow-lg">
                <div className="text-4xl font-bold text-cardinal-red mb-2">15+</div>
                <div className="text-gray-700 font-semibold">
                  {isEnglish ? 'Quality Assurance Reviews' : 'Чанарын баталгаа үзүүлэлт'}
                </div>
              </div>
              <div className="bg-white border-2 border-digital-blue p-6 rounded-lg shadow-lg">
                <div className="text-4xl font-bold text-digital-blue mb-2">100%</div>
                <div className="text-gray-700 font-semibold">
                  {isEnglish ? 'Curriculum Review Completion' : 'Сургалтын хөтөлбөрийн хэрэгжүүлэлт'}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Modules Section */}
      <motion.section
        className="py-12 bg-white"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-black">
            {isEnglish ? 'Program Modules' : 'Хөтөлбөрийн модулиуд'}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title_en: 'Curriculum Development',
                title_mn: 'Сургалтын хөтөлбөр боловсруулах',
              },
              {
                title_en: 'Assessment & Evaluation',
                title_mn: 'Үнэлгээ ба үнэлэлт',
              },
              {
                title_en: 'Teaching Excellence',
                title_mn: 'Сургалтын өндөр мэргэшлийг хөгжүүлэх',
              },
              {
                title_en: 'Student Outcomes',
                title_mn: 'Сурагчдын үр дүнгүүд',
              },
              {
                title_en: 'Resource Management',
                title_mn: 'Нөөцийн менежментүүлэлт',
              },
              {
                title_en: 'Compliance & Standards',
                title_mn: 'Нийцүүлэлт ба стандартууд',
              },
              {
                title_en: 'Professional Development',
                title_mn: 'Мэргэжлийн хөгжүүлэлт',
              },
              {
                title_en: 'Community Engagement',
                title_mn: 'Нийгмийн оролцоо',
              },
            ].map((mod, idx) => (
              <motion.div
                key={idx}
                className="bg-slate-50 border-2 border-cardinal-red rounded-lg shadow-md p-6 hover:shadow-lg hover:scale-105 transition-all"
                variants={itemVariants}
              >
                <div className="flex items-center justify-center w-12 h-12 bg-cardinal-red text-white rounded-full font-bold mb-4">
                  {String(idx + 1).padStart(2, '0')}
                </div>
                <h3 className="font-semibold text-gray-900">
                  {isEnglish ? mod.title_en : mod.title_mn}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Development Cycle */}
      <motion.section
        className="py-12 bg-slate-50"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-black">
            {isEnglish ? 'Development Cycle' : 'Хөгжүүлэлтийн цикл'}
          </h2>
          <div className="grid md:grid-cols-5 gap-4">
            {[
              {
                step: 1,
                title_en: 'Plan',
                title_mn: 'Төлөвлөх',
                desc_en: 'Define objectives and strategies',
                desc_mn: 'Зорилго, сургалтын стратеги тодорхойлох',
              },
              {
                step: 2,
                title_en: 'Design',
                title_mn: 'Зохион бүтээх',
                desc_en: 'Create curriculum and content',
                desc_mn: 'Сургалтын хөтөлбөр ба агуулгыг үүсгэх',
              },
              {
                step: 3,
                title_en: 'Implement',
                title_mn: 'Хэрэгжүүлэх',
                desc_en: 'Deliver programs and courses',
                desc_mn: 'Хөтөлбөр ба хичээлийг явуулах',
              },
              {
                step: 4,
                title_en: 'Evaluate',
                title_mn: 'Үнэлэх',
                desc_en: 'Assess outcomes and impact',
                desc_mn: 'Үр дүн ба нөлөөг үнэлэх',
              },
              {
                step: 5,
                title_en: 'Improve',
                title_mn: 'Сайжруулах',
                desc_en: 'Refine and enhance quality',
                desc_mn: 'Чанарыг сайжруулах',
              },
            ].map((cycle) => (
              <motion.div key={cycle.step} variants={itemVariants}>
                <div className="bg-white border-2 border-cardinal-red p-5 rounded-lg shadow-md h-full">
                  <div className="flex items-center justify-center w-10 h-10 bg-cardinal-red text-white rounded-full font-bold mb-3">
                    {cycle.step}
                  </div>
                  <h3 className="font-semibold mb-2 text-gray-900">
                    {isEnglish ? cycle.title_en : cycle.title_mn}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {isEnglish ? cycle.desc_en : cycle.desc_mn}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="py-12 bg-black text-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">
            {isEnglish ? 'Driving Educational Excellence' : 'Боловсролын өндөр чанар хүрэх'}
          </h2>
          <p className="text-gray-300 mb-6">
            {isEnglish
              ? 'Our PDQ initiative is committed to continuous improvement and maintaining the highest standards of educational quality.'
              : 'Бидний PDQ санаачих нь тасралтгүй сайжруулалт ба боловсролын өндөр чанарын стандартын уян хатан байдалд тусгайлан зориулагдсан байдаг.'}
          </p>
          <a
            href="/academics"
            className="inline-block bg-cardinal-red hover:bg-digital-red text-white px-8 py-3 rounded-full font-semibold transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
          >
            {isEnglish ? 'Back to Academics' : 'Боловсрол рүү буцах'}
          </a>
        </div>
      </motion.section>
    </div>
  );
}
