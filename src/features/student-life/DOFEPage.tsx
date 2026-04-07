import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

const dofePrograms = [
  { id: 1, name: { en: 'Basketball', mn: 'Сагс' }, emoji: '🏀', desc: { en: 'Team sport developing coordination and strategic thinking', mn: 'Коммандын спорт, сэтгэцийн хөгжил' } },
  { id: 2, name: { en: 'Badminton', mn: 'Бадминтон' }, emoji: '🏸', desc: { en: 'Racquet sport improving agility and reflexes', mn: 'Үзүүлэлтийн спорт, хөдөлгөөний хөгжил' } },
  { id: 3, name: { en: 'Guitar', mn: 'Гитар' }, emoji: '🎸', desc: { en: 'Musical instrument mastery and performance skills', mn: 'Хөгжимний уран эзэмших' } },
  { id: 4, name: { en: 'Volleyball', mn: 'Волейбол' }, emoji: '🏐', desc: { en: 'Dynamic team sport building communication', mn: 'Команд спортын сургалж' } },
  { id: 5, name: { en: 'Piano', mn: 'Нь нь' }, emoji: '🎹', desc: { en: 'Classical music development and composition', mn: 'Сонгинын чадвар хөгжүүлэх' } },
  { id: 6, name: { en: 'Tennis', mn: 'Теннис' }, emoji: '🎾', desc: { en: 'Individual sport promoting fitness and discipline', mn: 'Хувь хэцийн спорт, үнэлэл сургалж' } },
  { id: 7, name: { en: 'Swimming', mn: 'Сүлжээ' }, emoji: '🏊', desc: { en: 'Water sport for fitness and water safety', mn: 'Усан спорт, эрүүл мэнд' } },
  { id: 8, name: { en: 'Dance', mn: 'Бүжиг' }, emoji: '💃', desc: { en: 'Artistic expression through movement and rhythm', mn: 'Урлагийн илэрхийлэл, хөдөлгөөн' } },
  { id: 9, name: { en: 'Rowing', mn: 'Сэлүүлэх' }, emoji: '🚣', desc: { en: 'Water sport building strength and teamwork', mn: 'Устай спорт, багийн ажиллагаа' } },
  { id: 10, name: { en: 'Rock Climbing', mn: 'Чулуу авах' }, emoji: '🧗', desc: { en: 'Adventure sport developing problem-solving', mn: 'Аялалын спорт, сэтгэцийн хөгжил' } },
  { id: 11, name: { en: 'Martial Arts', mn: 'Бөхийн урлаг' }, emoji: '🥋', desc: { en: 'Discipline-based combat training for self-defense', mn: 'Сахилга, дайнаа сургалж' } },
  { id: 12, name: { en: 'Photography', mn: 'Зураг авалт' }, emoji: '📷', desc: { en: 'Visual arts and creative documentation', mn: 'Урлагийн үзүүлэлт, сэтгэцийн хөгжил' } },
];

export function DOFEPage() {
  const { isEnglish } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-black text-white py-32 md:py-44 flex items-center justify-center">
        <motion.div
          className="text-center max-w-4xl px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">{isEnglish ? 'DOFE Programs' : 'DOFE Хөтөлбөр'}</h1>
          <p className="text-xl md:text-2xl text-gray-300">
            {isEnglish 
              ? 'Duke of Edinburgh\'s Award - Building Skills, Character, and Confidence'
              : 'Эдинбургийн Гэгэнтэн - Чадвар, цахим болон итгэл үнэмшил хөгжүүлэх'}
          </p>
        </motion.div>
      </section>

      {/* Overview Section */}
      <motion.section
        className="py-20 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-8">
            <h2 className="text-4xl font-serif font-bold text-black mb-4">
              {isEnglish ? 'What is DOFE?' : 'DOFE гэж юу вэ?'}
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              {isEnglish
                ? 'The Duke of Edinburgh\'s Award is an internationally recognized programme that challenges young people to pursue personal achievement, develop resilience, and gain valuable life experience. Our DOFE programs offer a diverse range of activities that help students discover their passions, build confidence, and develop essential life skills.'
                : 'Эдинбургийн Герцгийн Шагнал нь олон улсын хүлээн зөвшөөрөгдсөн программ бөгөөд залуу хүмүүсийг хүн төрөлхтөний сорилтуудыг даван туулахад чиглүүлдэг. Бидний DOFE хөтөлбөрүүд сурагчдад өөрийнхөө дурлалыг олж, итгэлүнэмшил хөгжүүлж, амьдралын чухал ур чадварыг эзэмшүүлдэг.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-cardinal-red/10 to-cardinal-red/5 rounded-2xl p-6 border-2 border-cardinal-red"
            >
              <h3 className="text-xl font-bold text-black mb-3">{isEnglish ? '🏆 Recognition & Certificates' : '🏆 Үзүүлэлт & Сертификат'}</h3>
              <p className="text-gray-700 text-sm">
                {isEnglish
                  ? 'Participants who complete DOFE levels receive internationally recognized certificates that demonstrate personal achievement and commitment. These credentials are valued by universities and employers worldwide as evidence of character and dedication.'
                  : 'DOFE түвшинийг төгөлдөж гүйцэтгэсэн оролцогчид олон улсын хүлээн зөвшөөрөгдсөн сертификат авдаг. Эдгээр баримтууд их сургууль, хөдөлмөрийн байгууллагаараас хүнцийг үнэлэгдэнэ.'}
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-gradient-to-br from-digital-blue/10 to-digital-blue/5 rounded-2xl p-6 border-2 border-digital-blue"
            >
              <h3 className="text-xl font-bold text-black mb-3">{isEnglish ? '⭐ Honor Awards' : '⭐ Хүүхэллэг Шагнал'}</h3>
              <p className="text-gray-700 text-sm">
                {isEnglish
                  ? 'Outstanding participants may receive special honor awards and recognition. These prestigious accolades acknowledge exceptional commitment, leadership, and achievement, providing a significant advantage in university applications and career opportunities.'
                  : 'Гүйцэтгэл сайтай оролцогчид онцгой хүүхэллэг шагнал авч болно. Эдгээр нэрт үзүүлэлтүүд их сургууль, карьерын цаашийн боломжд давуу эрхийг өгнө.'}
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* DOFE Programs Grid */}
      <motion.section
        className="py-20 bg-slate-50"
        variants={containerVariants}
        initial="visible"
        animate="visible"
      >
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-4xl font-serif font-bold text-black mb-12 text-center">
            {isEnglish ? 'Available Programs' : 'Боломжит программууд'}
          </h2>

          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dofePrograms.map((program) => (
              <motion.div
                key={program.id}
                variants={itemVariants}
                className="bg-white rounded-2xl p-6 hover:shadow-lg hover:border-cardinal-red border-2 border-transparent transition-all text-center"
              >
                <div className="text-5xl mb-3">{program.emoji}</div>
                <h3 className="text-lg font-serif font-bold text-black mb-2">
                  {isEnglish ? program.name.en : program.name.mn}
                </h3>
                <p className="text-sm text-gray-600">
                  {isEnglish ? program.desc.en : program.desc.mn}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Benefits Section */}
      <motion.section
        className="py-20 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl font-serif font-bold text-black mb-8 text-center">
            {isEnglish ? 'Why Join DOFE?' : 'Яагаад DOFE-д орох вэ?'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: '🎯',
                title: { en: 'Personal Growth', mn: 'Хүнийн хөгжил' },
                desc: { en: 'Develop confidence, resilience, and leadership skills through challenging activities', mn: 'Хүнц, сахилга, удирдлагын ур чадварыг хөгжүүлэх' }
              },
              {
                icon: '🌍',
                title: { en: 'Global Recognition', mn: 'Дэлхийн хүлээн зөвшөөрөлт' },
                desc: { en: 'Earn credentials recognized by universities and employers worldwide', mn: 'Олон улсын хүлээн зөвшөөрөгдсөн сертификат авах' }
              },
              {
                icon: '🤝',
                title: { en: 'Social Connection', mn: 'Нийтэй холбоо' },
                desc: { en: 'Build lasting friendships and teamwork skills with fellow participants', mn: 'Найз нөхөдтэй үзэл бодал хуваалцах, баг ажиллагаа' }
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="bg-gray-50 rounded-2xl p-6 text-center"
              >
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="text-lg font-bold text-black mb-2">
                  {isEnglish ? item.title.en : item.title.mn}
                </h3>
                <p className="text-gray-600 text-sm">
                  {isEnglish ? item.desc.en : item.desc.mn}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
}
