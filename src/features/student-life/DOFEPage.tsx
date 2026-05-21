import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import dofeData from '../../content/student-life/dofe.json';

export function DOFEPage() {
  const { isEnglish } = useLanguage();

  const getText = (obj: { en: string; mn: string }) => isEnglish ? obj.en : obj.mn;
  const getBenefitText = (obj: { title: { en: string; mn: string }; description: { en: string; mn: string } }) => ({
    title: getText(obj.title),
    description: getText(obj.description),
  });
  const getHowItWorksText = (obj: { step: string; title: { en: string; mn: string }; description: { en: string; mn: string } }) => ({
    step: obj.step,
    title: getText(obj.title),
    description: getText(obj.description),
  });

  // Map data with translations
  const awardLevels = dofeData.awardLevels.map(level => ({
    ...level,
    name: getText(level.name),
    duration: getText(level.duration),
  }));

  const objectives = dofeData.objectives.map(obj => getText(obj));

  const awardSections = dofeData.awardSections.map(section => ({
    ...section,
    title: getText(section.title),
    description: getText(section.description),
    activities: section.activities.map(activity => getText(activity)),
  }));

  const howItWorks = dofeData.howItWorks.map(item => getHowItWorksText(item));
  const benefits = dofeData.benefits.map(benefit => getBenefitText(benefit));

  return (
    <div className="w-full pt-8">
      <div className="max-w-full">
        {/* Hero Section */}
        <section className="bg-white text-black py-12 md:py-16 border-b border-gray-200" style={{ backgroundImage: "url('/Dofe-Logo.jpg')" }}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="mb-4"
            >
              <p className="text-xs font-bold tracking-[0.2em] uppercase text-cardinal-red">
                {isEnglish ? 'Duke of Edinburgh Award' : 'Эдинбургийн Герцгийн Одал'}
              </p>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl md:text-5xl font-serif font-bold leading-tight mb-8"
            >
              {isEnglish ? 'Develop Your Potential' : 'Өмөрийн хөгжлийг хөгжүүлэх'}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed"
            >
              {isEnglish
                ? 'The Duke of Edinburgh Award is a proven personal development program that allows participants of all abilities to build their own personal achievement.'
                : 'Эдинбургийн Герцгийн Одал нь бүхнийг хөгжүүлэх үндэстэн удирдамж байрлалтай сургалт эхлүүлэх'}
            </motion.p>
          </div>
        </section>


        {/* About Section */}
        <section className="py-12 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-4xl font-serif font-bold text-black mb-6">
                {isEnglish ? 'About the Award' : 'Одлын Тухай'}
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
                <p>
                  {isEnglish
                    ? 'The Duke of Edinburgh Award is a development program that helps young people achieve their personal goals through self-discipline and perseverance.'
                    : 'Эдинбургийн Герцгийн Одал нь залуу хүмүүсийг дээд зорилгодоо хүрэхэд туслах хөгжлийн үндэстэн чухал төсөл юм.'}
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Award Levels */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-4xl font-serif font-bold text-black mb-4">
                {isEnglish ? 'Award Levels' : 'Одлын Түвшингүүд'}
              </h2>
              <p className="text-gray-600 text-lg">
                {isEnglish
                  ? 'Choose the level that matches your age and commit to your personal challenge.'
                  : 'Өмөрийн нас сонголж, түвшин сонгоно уу.'}
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              variants={{
                visible: {
                  transition: { staggerChildren: 0.1 },
                },
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {awardLevels.map((level) => (
                <motion.div
                  key={level.badge}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="relative group"
                >
                  <div className={`${level.color} border-2 rounded-sm p-8 h-full relative overflow-hidden hover:shadow-lg transition-shadow`}>
                    <div className="absolute top-0 right-0 bg-cardinal-red text-white px-3 py-1 text-xs font-bold tracking-widest">
                      {level.badge}
                    </div>

                    <h3 className="text-2xl font-serif font-bold text-black mb-2 mt-4">
                      {level.name}
                    </h3>
                    <div className="text-sm font-bold text-gray-700 mb-4">
                      {isEnglish ? `Age ${level.age}` : `${level.age} нас`}
                    </div>
                    <div className="border-t border-gray-300 pt-4">
                      <p className="text-sm font-semibold text-gray-800">
                        {level.duration}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Program Objectives */}
        <section className="py-12 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-4xl font-serif font-bold text-black mb-4">
                {isEnglish ? 'Program Objectives' : 'Бүтээлтийн Зорилго'}
              </h2>
              <p className="text-gray-600 text-lg">
                {isEnglish
                  ? 'The DofE program is built on five core objectives that guide personal development'
                  : 'DofE өмөрийн хөгжлийн үндэстэн таван зорилго байдаг'}
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4"
              variants={{
                visible: {
                  transition: { staggerChildren: 0.1 },
                },
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {objectives.map((obj, idx) => (
                <motion.div
                  key={idx}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="bg-gray-50 rounded-sm p-6 shadow-sm hover:shadow-md transition-shadow border-t-2 border-cardinal-red"
                >
                  <p className="text-gray-700 font-semibold leading-relaxed text-sm">
                    {obj}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Program Sections */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="text-4xl font-serif font-bold text-black mb-4">
                {isEnglish ? 'Program Sections' : 'Бүтээлтийн Хэсэг'}
              </h2>
              <p className="text-gray-600 text-lg">
                {isEnglish
                  ? 'Complete activities in all sections to earn your award level.'
                  : 'Бүтэлтийн бүх хэсэгт үйл ажиллагаа гүйцэтгээрэй.'}
              </p>
            </motion.div>

            <motion.div
              className="space-y-12"
              variants={{
                visible: {
                  transition: { staggerChildren: 0.1 },
                },
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {awardSections.map((section, idx) => (
                <motion.div
                  key={section.number}
                  variants={{
                    hidden: { opacity: 0, x: idx % 2 === 0 ? -20 : 20 },
                    visible: { opacity: 1, x: 0 },
                  }}
                  className="bg-white rounded-sm p-8 shadow-sm"
                >
                  <div className="flex flex-col md:flex-row gap-8 items-start">
                    <div className="flex-shrink-0 md:w-16">
                      <div className="bg-black text-white rounded-sm p-4 text-2xl font-bold flex items-center justify-center h-16 hover:bg-cardinal-red transition-colors">
                        {section.number}
                      </div>
                    </div>

                    <div className="flex-1">
                      <h3 className="text-2xl font-serif font-bold text-black mb-3">
                        {section.title}
                      </h3>

                      <p className="text-gray-600 text-base leading-relaxed mb-6">
                        {section.description}
                      </p>

                      <div className="bg-gray-50 rounded-sm p-6 border-l-4 border-cardinal-red">
                        <h4 className="font-bold text-black mb-3 uppercase text-sm">
                          {isEnglish ? 'Examples' : 'Жишээ'}
                        </h4>
                        <ul className="space-y-2">
                          {section.activities.map((activity, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <span className="text-cardinal-red font-bold mt-1">–</span>
                              <span className="text-gray-700 text-sm">{activity}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="text-4xl font-serif font-bold text-black mb-4">
                {isEnglish ? 'How It Works' : 'Хэрхэн Ажилладаг'}
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                {isEnglish
                  ? 'Follow these five simple steps to begin your DofE journey'
                  : 'Таван энгийн алхамыг дагаж DofE сургалтаа эхлүүлээрэй'}
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8"
              variants={{
                visible: {
                  transition: { staggerChildren: 0.1 },
                },
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {howItWorks.map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="text-center"
                >
                  <div className="bg-cardinal-red text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4 font-serif">
                    {item.step}
                  </div>
                  <h3 className="font-bold text-black mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-gray-900 text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="text-4xl font-serif font-bold mb-4">
                {isEnglish ? 'Benefits of the Program' : 'Сургалтын ашиг'}
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                {isEnglish
                  ? 'Gain international recognition and life-changing skills'
                  : 'Олон улсын хүлээн зөвшөөрөлт, амьдралыг өөрчилөх ур чадвар авч авах'}
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={{
                visible: {
                  transition: { staggerChildren: 0.1 },
                },
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {benefits.map((benefit, idx) => (
                <motion.div
                  key={idx}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="bg-gray-800 rounded-sm p-8 hover:bg-gray-700 transition-colors"
                >
                  <h3 className="font-bold text-lg mb-3 text-cardinal-red">{benefit.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{benefit.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 bg-cardinal-red text-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-serif font-bold mb-6">
                {isEnglish ? 'Ready to Start Your Journey?' : 'Сурах үе эхлүүлэхэд бэлэн үү?'}
              </h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
                {isEnglish
                  ? 'Discover what you are truly capable of. Join thousands of participants worldwide who are achieving their goals through the Duke of Edinburgh\'s Award.'
                  : 'Өмөрийнхөө чадварыг нээж мэдээрэй. Эдинбургийн Герцгийн Одлын сургалтын замаар зорилгодоо хүрэх мянга-мянган оролцогчийн хөрөндөө нийлэх.'}
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-cardinal-red px-8 py-3 font-bold uppercase tracking-widest rounded-sm hover:bg-gray-100 transition-colors"
              >
                {isEnglish ? 'Get Started' : 'Эхлүүлэх'}
              </motion.button>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
}
