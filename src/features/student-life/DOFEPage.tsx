import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

export function DOFEPage() {
  const { isEnglish } = useLanguage();

  const awardLevels = [
    {
      name: { en: 'Bronze', mn: '╨Ñ╥»╤Ç╤ì╨╗' },
      age: '14+',
      duration: { en: '6 months minimum', mn: '6 ╤ü╨░╤Ç╨░╨░╤ü ╨┤╤ì╤ì╤ê' },
      badge: 'BRONZE',
      color: 'bg-gray-100 border-gray-300',
    },
    {
      name: { en: 'Silver', mn: '╨£╙⌐╨╜╨│╙⌐' },
      age: '15+',
      duration: { en: '12 months minimum', mn: '12 ╤ü╨░╤Ç╨░╨░╤ü ╨┤╤ì╤ì╤ê' },
      badge: 'SILVER',
      color: 'bg-gray-50 border-gray-200',
    },
    {
      name: { en: 'Gold', mn: '╨É╨╗╤é' },
      age: '16+',
      duration: { en: '18 months minimum', mn: '18 ╤ü╨░╤Ç╨░╨░╤ü ╨┤╤ì╤ì╤ê' },
      badge: 'GOLD',
      color: 'bg-red-50 border-cardinal-red',
    },
  ];

  const objectives = [
    { en: 'Encourage self-development and independence', mn: '╙¿╙⌐╤Ç╨╕╨╣╨╜ ╤à╙⌐╨│╨╢╨╕╨╗, ╨▒╨╕╨╡ ╨┤╨░╨░╤ü╨░╨╜ ╨▒╨░╨╣╨┤╨╗╤ï╨│ ╨╜╤ì╨╝╤ì╨│╨┤╥»╥»╨╗╤ì╤à' },
    { en: 'Build leadership and teamwork skills', mn: '╨ú╨┤╨╕╤Ç╨┤╨╗╨░╨│╨░, ╨▒╨░╨│ ╨░╨╢╨╕╨╗╨╗╨░╨│╨░╨░╨╜╤ï ╤â╤Ç ╤ç╨░╨┤╨▓╨░╤Ç ╨▒╥»╤Ç╨┤╥»╥»╨╗╤ì╤à' },
    { en: 'Promote physical and mental well-being', mn: '╨æ╨╕╨╡╨╕╨╣╨╜ ╨▒╨╛╨╗╨╛╨╜ ╤ü╤ì╤é╨│╤ì╤å╨╕╨╣╨╜ ╤ì╤Ç╥»╥»╨╗ ╨╝╤ì╨╜╨┤╨╕╨╣╨│ ╤ü╨░╨╣╨╢╤Ç╤â╤â╨╗╨░╤à' },
    { en: 'Develop a sense of responsibility and community involvement', mn: '╥«╥»╤Ç╤ì╨│ ╨┤╨░╨░╨╗╨│╨░╨▓╨░╤Ç, ╨╜╨╕╨╣╨│╨╝╨╕╨╣╨╜ ╨╛╤Ç╨╛╨╗╤å╨╛╨╛╨│ ╤à╙⌐╨│╨╢╥»╥»╨╗╤ì╤à' },
    { en: 'Foster perseverance and commitment', mn: '╨ó╤ì╨▓╤ç╤ì╤ì╤Ç, ╤ü╨░╤à╨╕╨╗╨│╤ï╨│ ╤ì╤Ç╨│╥»╥»╨╗╤ì╤à' },
  ];

  const awardSections = [
    {
      number: '1',
      title: { en: 'Physical Recreation', mn: '╨æ╨╕╨╡╨╕╨╣╨╜ ╨í╤â╨╗╨╕╨╗╤é' },
      description: {
        en: 'Improving physical fitness through sports or active hobbies.',
        mn: '╨í╨┐╨╛╤Ç╤é╤ï╨╜ ╨▒╨╛╨╗╨╛╨╜ ╨╕╨┤╤ì╨▓╤à╤é╤ì╨╣ ╤ü╨╛╨╜╨╕╤Ç╤à╨╛╨╗╨╛╨╛╤Ç ╤ä╨╕╨╖╨╕╨╕╨╣╨╜ ╨▒╤ì╤à╤ì╨╗╤ì╨╗╤é╨╕╨╣╨│ ╤ü╨░╨╣╨╢╤Ç╤â╤â╨╗╨░╤à',
      },
      activities: [
        { en: 'Running, swimming, gym training', mn: '╨ô╥»╨╣╨╗╤é, ╤ü╥»╨╗╨╢╤ì╤ì, ╨┤╨░╤ü╨│╨░╨╗' },
        { en: 'Team sports', mn: '╨æ╨░╨│ ╤ü╨┐╨╛╤Ç╤é' },
      ],
    },
    {
      number: '2',
      title: { en: 'Skills Development', mn: '╨ú╤Ç ╨º╨░╨┤╨▓╨░╤Ç╤ï╨╜ ╨ó╨╡╤Ç╙⌐╨╗' },
      description: {
        en: 'Learning new abilities or improving existing ones.',
        mn: '╨¿╨╕╨╜╤ì ╤â╤Ç ╤ç╨░╨┤╨▓╨░╤Ç ╤ü╤â╤Ç╨░╤à ╤ì╤ü╨▓╤ì╨╗ ╨▒╨░╨╣╤ü╨░╨╜ ╥»╨╣╨╗ ╨┤╤ì╤ì╤Ç╤ì╤ì ╤ü╨░╨╣╨╢╤Ç╤â╤â╨╗╨░╤à',
      },
      activities: [
        { en: 'Coding, music, art', mn: '╨Ü╨╛╨┤╨╕╨╜╨│, ╤à╙⌐╨│╨╢╨╕╨╝, ╤â╤Ç╨╗╨░╨│' },
        { en: 'Language learning', mn: '╨Ñ╤ì╨╗ ╤ü╤â╤Ç╨░╤à' },
      ],
    },
    {
      number: '3',
      title: { en: 'Volunteer Service', mn: '╨í╨░╨╣╨╜ ╨ö╤â╤Ç╤ï╨╜ ╥«╨╣╨╗╤ç╨╕╨╗╨│╤ì╤ì' },
      description: {
        en: 'Contributing to the community through service.',
        mn: '╨¥╨╕╨╣╨│╨╝╨╕╨╣╨╜╤à╤ì╤ì ╤é╙⌐╨╗╙⌐╙⌐ ╨▓╨╛╨╗╨╛╨╜╤é╨╡╤Ç ╨░╨╢╨╕╨╗╤é╨░╨╣ ╨╛╤Ç╨╛╨╗╤å╨╛╤à',
      },
      activities: [
        { en: 'Helping at charities', mn: '╨æ╤â╤Å╨╜╤ï ╨▒╨░╨╣╨│╤â╤â╨╗╨╗╨░╨│╨░╨┤ ╤é╤â╤ü╨╗╨░╤à' },
        { en: 'Teaching or mentoring', mn: '╨ù╨░╨░╤à, ╨┤╥»╨╜╨│╤ì╤ì╤Ç ╨┤╨░╨┤╨╗╨░╤à' },
        { en: 'Environmental work', mn: '╨æ╨░╨╣╨│╨░╨╗╤î ╤à╨░╨╝╨│╨░╨░╨╗╨░╤à' },
      ],
    },
    {
      number: '4',
      title: { en: 'Adventurous Journey', mn: '╨É╨┤╨░╨╗ ╨»╨┤╨░╨╗╤é╨░╨╣ ╨É╤Å╨╗╨░╨╗' },
      description: {
        en: 'A team-based outdoor expedition designed to build leadership, survival skills, and teamwork.',
        mn: '╨ú╨┤╨╕╤Ç╨┤╨╗╨░╨│╨░, ╨░╨╝╤î╨┤╤Ç╨░╨╗╤ï╨╜ ╤â╤Ç ╤ç╨░╨┤╨▓╨░╤Ç, ╨▒╨░╨│ ╨░╨╢╨╕╨╗╨╗╨░╨│╨░╨░ ╤à╙⌐╨│╨╢╥»╥»╨╗╤ì╤à ╨│╨░╨┤╨░╨░ ╨░╤Å╨╗╨░╨╗',
      },
      activities: [
        { en: 'Planning and training for expeditions', mn: '╨É╤Å╨╗╨░╨╗ ╤é╙⌐╨╗╙⌐╨▓╨╗╙⌐╤à, ╨▒╤ì╨╗╤é╨│╤ì╨╗' },
        { en: 'Completing journeys in nature', mn: '╨æ╨░╨╣╨│╨░╨░╨╗╨╕╨╣╨╜ ╨┤╤â╨╜╨┤╤â╤â╤Ç ╨░╤Å╨╗╨░╨╗' },
      ],
    },
    {
      number: '5',
      title: { en: 'Residential Project', mn: '╨æ╨░╨╣╤Ç╤ê╨╕╨╗╤é╨░╨╣ ╨ó╙⌐╤ü╙⌐╨╗' },
      description: {
        en: 'Gold level only: Spend time away from home working with new people on a shared activity.',
        mn: '╨É╨╗╤é╨░╨╜ ╤é╥»╨▓╤ê╨╕╨╜: ╨ô╤ì╤Ç ╨▒╨░╨╣╨╜╨░╨░╤ü ╤à╨╛╨╗╨┤╨╛╤à, ╤ê╨╕╨╜╤ì ╤à╥»╨╝╥»╥»╤ü╤é╤ì╨╣ ╨░╨╢╨╕╨╗╨╗╨░ ╨╜╨╕╨╣╤é╨╗╤ì╨│ ╤à╥»╤Ç╤ì╤ì╨╗╤ì╨╗',
      },
      activities: [
        { en: 'Work with new people', mn: '╨¿╨╕╨╜╤ì ╤à╥»╨╝╥»╥»╤ü╤é╤ì╨╣ ╨░╨╢╨╕╨╗' },
        { en: 'Shared community activities', mn: '╨¥╨╕╨╣╤é╨╗╤ì╨│ ╥»╨╣╨╗ ╨░╨╢╨╕╨╗╨▒╨░╤Ç╨░' },
        { en: 'Extended time away from home', mn: '╨ô╤ì╤Ç ╨▒╨░╨╣╨╜╨░╨░╤ü ╤â╨┤╨░╨░╨╜ ╤à╤â╨│╨░╤å╨░╨░' },
      ],
      goldOnly: true,
    },
  ];

  return (
    <div className="w-full pt-8">
      <div className="max-w-full">
      {/* Hero Section */}
      <section className="bg-white text-black py-12 md:py-16 border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mb-4"
          >
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-cardinal-red">
              {isEnglish ? 'Duke of Edinburgh Award' : '╨¡╨┤╨╕╨╜╨▒╤â╤Ç╨│╨╕╨╣╨╜ ╨ô╨╡╤Ç╤å╨│╨╕╨╣╨╜ ╨¥╨░╨░╨┤╨░╨╝'}
            </p>
          </motion.div>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 mb-8">
            {/* Logo Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="flex-shrink-0"
            >
              <img
                src="/DofE-Logo.png"
                alt="Duke of Edinburgh's Award"
                className="h-48 md:h-56 object-contain"
              />
            </motion.div>

            {/* Title aligned with logo */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-4xl md:text-5xl font-serif font-bold leading-tight text-center md:text-left"
            >
              {isEnglish ? "The Duke of Edinburgh's Award" : '╨¡╨┤╨╕╨╜╨▒╤â╤Ç╨│╨╕╨╣╨╜ ╨ô╨╡╤Ç╤å╨│╨╕╨╣╨╜ ╨¥╨░╨░╨┤╨░╨╝'}
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.8 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed"
          >
            {isEnglish
              ? 'A globally recognized program for personal development, adventure, and achievement. Build skills, gain confidence, and discover your potential.'
              : '╨Ñ╤â╨▓╤î ╤à╥»╨╜╨╕╨╣ ╤à╙⌐╨│╨╢╥»╥»╨╗╤ì╨╗╤é, ╨░╨┤╨░╨╗ ╤Å╨┤╨░╨╗╤é, ╨░╨╝╨╢╨╕╨╗╤é╤ï╨╜ ╤é╙⌐╨╗╙⌐╙⌐ ╨╛╨╗╨╛╨╜ ╤â╨╗╤ü╤ï╨╜ ╤à╥»╨╗╤ì╤ì╨╜ ╨╖╙⌐╨▓╤ê╙⌐╙⌐╤Ç╙⌐╨│╨┤╤ü╙⌐╨╜ ╤à╙⌐╤é╙⌐╨╗╨▒╙⌐╤Ç'}
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
              {isEnglish ? 'About the Award' : '╨¥╨░╨░╨┤╨░╨╝╤ï╨╜ ╨ó╤â╤à╨░╨╣'}
            </h2>
            <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
              <p>
                {isEnglish
                  ? "The Duke of Edinburgh's International Award is a development program for young people of all abilities. We support participants in progressing along their own individual path and achieving their personal goals through a balanced program of activities across key components."
                  : '╨¡╨┤╨╕╨╜╨▒╤â╤Ç╨│╨╕╨╣╨╜ ╨ô╨╡╤Ç╤å╨│╨╕╨╣╨╜ ╨₧╨╗╨╛╨╜ ╨ú╨╗╤ü╤ï╨╜ ╨¥╨░╨░╨┤╨░╨╝ ╨╜╤î ╨▒╥»╤à ╤ç╨░╨┤╨░╨▓╤à╨╕╨╣╨╜ ╨╛╤Ä╤â╤é╨╜╤â╤â╨┤╤ï╨╜ ╤à╤â╨▓╤î ╤à╥»╨╜╨╕╨╣ ╤à╙⌐╨│╨╢╥»╥»╨╗╤ì╨╗╤é╨╕╨╣╨╜ ╤à╙⌐╤é╙⌐╨╗╨▒╙⌐╤Ç ╤Ä╨╝. ╨æ╨╕╨┤ ╨╛╤Ç╨╛╨╗╤å╨╛╨│╤ç╨┤╤ï╨╜ ╙⌐╙⌐╤Ç╤ü╨┤╨╕╨╣╨╜ ╨╖╨░╨╝╨░╨░╤Ç╨░╨░ ╤ü╨░╨╣╨╜ ╨┤╤ì╨▓╤ê╨╕╨╢, ╤ü╨▒╨░╨╗╨░╨╗╤ü╨░╨╜ ╥»╨╣╨╗ ╨░╨╢╨╕╨╗╨▒╨░╤Ç╨░╨░╤Ç ╨┤╨░╨╝╨╢╤â╤â╨╗╨░╨╜ ╨░╤à╨╕╤å ╨┤╨░╨╝╨╢╤â╤â╨╗╨░╤à╨░╨┤ ╤é╤â╤ü╨╗╨░╨╗╤å╨┤╨░╨│.'}
              </p>
              <p className="text-cardinal-red font-semibold">
                {isEnglish
                  ? 'Whether you are 14 or 16, taking part in the Award programme is an exciting challenge to meet yourself head-on, discover your own potential, and try something new.'
                  : '14 ╤ì╤ü╨▓╤ì╨╗ 16 ╨╜╨░╤ü╤é╨░╨╣ ╨▒╨░╨╣╨╢ ╨▒╨░╨╣╤ü╨░╨╜ ╤ç, ╨¥╨░╨░╨┤╨░╨╝╤ï╨╜ ╤à╙⌐╤é╙⌐╨╗╨▒╙⌐╤Ç╤é ╨╛╤Ç╨╛╨╗╤å╨╛╤à ╨╜╤î ╙⌐╙⌐╤Ç╨╕╨╣╨│╙⌐╙⌐ ╤ü╨╛╤Ç╤î╨╢, ╨▒╨╛╨╗╨╛╨╝╨╢╨╕╨╛╨╛ ╨╜╤ì╤ì╤à, ╤ê╨╕╨╜╤ì╤ì╤Ç ╤ü╨╛╤Ç╨╕╨╗╤å╨╛╤à ╤ü╤ì╤é╨│╤ì╨╗ ╨╖╨╛╤Ç╨│╨╛╨╛╤Ç ╤à╥»╤Ç╨│╤ì╨┤╤ì╨│.'}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Program Objectives */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-4xl font-serif font-bold text-black mb-4">
              {isEnglish ? 'Program Objectives' : '╨Ñ╙⌐╤é╙⌐╨╗╨▒╙⌐╤Ç╨╕╨╣╨╜ ╨ù╨╛╤Ç╨╕╨╗╨│╤â╤â╨┤'}
            </h2>
            <p className="text-gray-600 text-lg">
              {isEnglish
                ? 'The DofE program is built on five core objectives that guide personal development'
                : 'DofE ╤à╙⌐╤é╙⌐╨╗╨▒╙⌐╤Ç ╨╜╤î ╤à╤â╨▓╤î ╤à╥»╨╜╨╕╨╣ ╤à╙⌐╨│╨╢╥»╥»╨╗╤ì╨╗╤é╨╕╨╣╨│ ╤ç╨╕╨│╨╗╥»╥»╨╗╨┤╤ì╨│ ╤é╨░╨▓╨░╨╜ ╥»╨╜╨┤╤ü╤ì╨╜ ╨╖╨╛╤Ç╨╕╨╗╨│╨╛╤é╨╛╨╣'}
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
                className="bg-white rounded-sm p-6 shadow-sm hover:shadow-md transition-shadow border-t-2 border-cardinal-red"
              >
                <p className="text-gray-700 font-semibold leading-relaxed">
                  {isEnglish ? obj.en : obj.mn}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Award Levels */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-4xl font-serif font-bold text-black mb-4">
              {isEnglish ? 'Award Levels' : '╨¥╨░╨░╨┤╨░╨╝╤ï╨╜ ╨ó╥»╨▓╤ê╨╜╥»╥»╨┤'}
            </h2>
            <p className="text-gray-600 text-lg">
              {isEnglish
                ? 'Choose the level that matches your age and commit to your personal challenge.'
                : '╙¿╙⌐╤Ç╨╕╨╣╨╜╤à╙⌐╙⌐ ╨╜╨░╤ü╨░╨╜╨┤ ╤é╨╛╤à╨╕╤Ç╤ü╨╛╨╜ ╤é╥»╨▓╤ê╨╕╨╜╨│ ╤ü╨╛╨╜╨│╨╛╨╛╨┤ ╤ü╨╛╤Ç╨╕╨╗╤é╤ï╨│ ╨┤╨░╨▓╨░╨╜ ╤é╤â╤â╨╗╨░╨░╤Ç╨░╨╣.'}
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
                key={level.name.en}
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
                    {isEnglish ? level.name.en : level.name.mn}
                  </h3>
                  <div className="text-sm font-bold text-gray-700 mb-4">
                    {isEnglish ? `Age ${level.age}` : `${level.age} ╨╜╨░╤ü╤é╨░╨╣`}
                  </div>
                  <div className="border-t border-gray-300 pt-4">
                    <p className="text-sm font-semibold text-gray-800">
                      {isEnglish ? level.duration.en : level.duration.mn}
                    </p>
                  </div>
                </div>
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
              {isEnglish ? 'Program Sections' : '╨Ñ╙⌐╤é╙⌐╨╗╨▒╙⌐╤Ç╨╕╨╣╨╜ ╨Ñ╤ì╤ü╨│╥»╥»╨┤'}
            </h2>
            <p className="text-gray-600 text-lg">
              {isEnglish
                ? 'Complete activities in all sections to earn your award level. The Residential Project is only required for Gold level.'
                : '╨¥╨░╨░╨┤╨░╨╝╤ï╨│ ╨░╨▓╨░╤à╤ï╨╜ ╤é╤â╨╗╨┤ ╨▒╥»╤à ╤à╤ì╤ü╤ì╨│╤é╤ì╨╣ ╥»╨╣╨╗ ╨░╨╢╨╕╨╗╨▒╨░╤Ç╨░ ╤à╨╕╨╣╤à ╤æ╤ü╤é╨╛╨╣. ╨æ╨░╨╣╤Ç╤ê╨╕╨╗╤é╨░╨╣ ╤é╙⌐╤ü╨╗╥»╥»╨┤ ╨╖╙⌐╨▓╤à╙⌐╨╜ ╨É╨╗╤é╨░╨╜ ╤é╥»╨▓╤ê╨╕╨╜╨┤ ╤ê╨░╨░╤Ç╨┤╨╗╨░╨│╨░╤é╨░╨╣.'}
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
                className={`group ${section.goldOnly ? 'border-2 border-cardinal-red bg-white' : 'bg-white'} rounded-sm p-8`}
              >
                {section.goldOnly && (
                  <div className="mb-4 inline-block bg-cardinal-red text-white px-3 py-1 rounded-sm text-xs font-bold uppercase">
                    {isEnglish ? 'Gold Level Only' : '╨ù╙⌐╨▓╤à╙⌐╨╜ ╨É╨╗╤é╨░╨╜ ╨ó╥»╨▓╤ê╨╕╨╜'}
                  </div>
                )}
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="flex-shrink-0 md:w-16">
                    <div className="bg-black text-white rounded-sm p-4 text-2xl font-bold flex items-center justify-center h-16 group-hover:bg-cardinal-red transition-colors">
                      {section.number}
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-2xl font-serif font-bold text-black mb-3">
                      {isEnglish ? section.title.en : section.title.mn}
                    </h3>

                    <p className="text-gray-600 text-base leading-relaxed mb-6">
                      {isEnglish ? section.description.en : section.description.mn}
                    </p>

                    <div className="bg-gray-50 rounded-sm p-6 border-l-4 border-cardinal-red">
                      <h4 className="font-bold text-black mb-3 uppercase text-sm">
                        {isEnglish ? 'Examples' : '╨û╨╕╤ê╤ì╤ì╨╜╥»╥»╨┤'}
                      </h4>
                      <ul className="space-y-2">
                        {section.activities.map((activity, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="text-cardinal-red font-bold mt-1">ΓÇö</span>
                            <span className="text-gray-700">
                              {isEnglish ? activity.en : activity.mn}
                            </span>
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

      {/* How It Works */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-4xl font-serif font-bold text-black mb-4">
              {isEnglish ? 'How It Works' : '╨Ñ╤ì╤Ç╤à╤ì╨╜ ╨É╨╢╨╕╨╗╨╗╨░╤à'}
            </h2>
            <p className="text-gray-600 text-lg">
              {isEnglish
                ? 'Follow these five simple steps to begin your DofE journey'
                : 'DofE ╨░╤Å╨╗╨╗╤ï╨│ ╤ì╤à╨╗╥»╥»╨╗╤ì╤à╨╕╨╣╨╜ ╤é╤â╨╗╨┤ ╤ì╨┤╨│╤ì╤ì╤Ç ╤é╨░╨▓╨░╨╜ ╤ì╨╜╨│╨╕╨╣╨╜ ╨░╨╗╤à╨░╨╝ ╨┤╨░╨│╨░╨░╤Ç╨░╨╣'}
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
            {[
              {
                step: '01',
                title: isEnglish ? 'Choose Your Level' : '╨ó╥»╨▓╤ê╨╕╨╜ ╨í╨╛╨╜╨│╨╛╤à',
                desc: isEnglish ? 'Select Bronze, Silver, or Gold based on your age' : '╨¥╨░╤ü╨░╨╜╨┤ ╥»╨╜╨┤╤ì╤ü╨╗╤ì╨╜ ╤ü╨╛╨╜╨│╨╛╨╛╤Ç╨╛╨╣',
              },
              {
                step: '02',
                title: isEnglish ? 'Select Activities' : '╥«╨╣╨╗ ╨É╨╢╨╕╨╗╨▒╨░╤Ç╨░ ╨í╨╛╨╜╨│╨╛╤à',
                desc: isEnglish ? 'Pick activities that interest you' : '╨í╨╛╨╜╨╕╤Ç╤à╨╛╨╗ ╤é╨░╤é╤ü╨░╨╜ ╥»╨╣╨╗ ╨░╨╢╨╕╨╗╨▒╨░╤Ç╤ï╨│ ╤ü╨╛╨╜╨│╨╛╨╛╤Ç╨╛╨╣',
              },
              {
                step: '03',
                title: isEnglish ? 'Set Goals' : '╨ù╨╛╤Ç╨╕╨╗╨│╨╛ ╨ó╨╛╨│╤é╨╛╨╛╤à',
                desc: isEnglish ? 'Create clear objectives' : '╨ó╨╛╨┤╨╛╤Ç╤à╨╛╨╣ ╨╖╨╛╤Ç╨╕╨╗╨│╨╛ ╨▒╥»╤Ç╨┤╥»╥»╨╗╤ì╤à',
              },
              {
                step: '04',
                title: isEnglish ? 'Complete Duration' : '╨Ñ╤â╨│╨░╤å╨░╨░ ╨ô╥»╨╣╤å╤ì╤é╨│╤ì╤à',
                desc: isEnglish ? 'Commit to the timeframe' : '╨Ñ╤â╨│╨░╤å╨░╨░ ╤é╙⌐╨╗╙⌐╨▓╨╗╙⌐╙⌐╤Ç╙⌐╨╣',
              },
              {
                step: '05',
                title: isEnglish ? 'Receive Award' : '╨¥╨░╨░╨┤╨░╨╝ ╨É╨▓╨░╤à',
                desc: isEnglish ? 'Earn your certificate' : '╨ô╤ì╤Ç╤ç╨╕╨╗╨│╤ì╤ì ╨░╨▓╨░╤à╨░╤Ç╨░╨╣',
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="relative"
              >
                <div className="bg-white rounded-sm p-6 shadow-sm hover:shadow-md transition-all border border-gray-200">
                  <div className="text-3xl font-bold text-cardinal-red mb-3">{item.step}</div>
                  <h3 className="text-base font-bold text-black mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 bg-black text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-serif font-bold mb-12 text-center"
          >
            {isEnglish ? 'Benefits of the Program' : '╨Ñ╙⌐╤é╙⌐╨╗╨▒╙⌐╤Ç╨╕╨╣╨╜ ╨ö╨░╨▓╤â╤â ╨ó╨░╨╗╤â╤â╨┤'}
          </motion.h2>

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
            {[
              {
                title: isEnglish ? 'Internationally Recognized' : '╨₧╨╗╨╛╨╜ ╨ú╨╗╤ü╤ï╨╜ ╨Ñ╥»╨╗╤ì╤ì╨╜ ╨ù╙⌐╨▓╤ê╙⌐╙⌐╤Ç╙⌐╨╗╤é',
                desc: isEnglish
                  ? 'Earn a prestigious certification valued globally'
                  : '╨₧╨╗╨╛╨╜ ╤â╨╗╤ü╨░╨┤ ╥»╨╜╤ì╨╗╤ì╨│╨┤╨┤╤ì╨│ ╨╜╤ì╤Ç╤é ╨│╤ì╤Ç╤ç╨╕╨╗╨│╤ì╤ì ╨░╨▓╨░╤à',
              },
              {
                title: isEnglish ? 'University Advantage' : '╨ÿ╤à ╨í╤â╤Ç╨│╤â╤â╨╗╨╕╨╣╨╜ ╨ö╨░╨▓╤â╤â ╨¡╤Ç╤à',
                desc: isEnglish
                  ? 'Strengthens university and scholarship applications'
                  : '╨ÿ╤à ╤ü╤â╤Ç╨│╤â╤â╨╗╨╕╨╣╨╜ ╙⌐╤Ç╨│╙⌐╨┤╙⌐╨╗, ╤ü╤é╨╕╨┐╨╡╨╜╨┤╨╕╨┤ ╨┤╨░╨▓╤â╤â ╤ì╤Ç╤à ╙⌐╨│╙⌐╤à',
              },
              {
                title: isEnglish ? 'Real-World Skills' : '╨æ╨╛╨┤╨╕╤é ╨ú╤Ç ╨º╨░╨┤╨▓╨░╤Ç',
                desc: isEnglish
                  ? 'Develop practical skills valued by employers'
                  : '╨É╨╢╨╕╨╗╤é╨░╨╜ ╥»╨╜╤ì╨╗╨┤╤ì╨│ ╨▒╨╛╨┤╨╕╤é ╤â╤Ç ╤ç╨░╨┤╨▓╨░╤Ç ╤à╙⌐╨│╨╢╥»╥»╨╗╤ì╤à',
              },
              {
                title: isEnglish ? 'Confidence & Discipline' : '╨ÿ╤é╨│╤ì╨╗ & ╨í╨░╤à╨╕╨╗╨│╨░',
                desc: isEnglish
                  ? 'Build self-confidence and personal discipline'
                  : '╨æ╨░╤é ╨▒╙⌐╤à ╨╕╤é╨│╤ì╨╗ ╥»╨╜╤ì╨╝╤ê╨╕╨╗, ╙⌐╙⌐╤Ç╨╕╨╣╨│ ╤à╤Å╨╜╨░╤à ╤ü╨░╤à╨╕╨╗╨│╨░',
              },
              {
                title: isEnglish ? 'Global Citizenship' : '╨ö╤ì╨╗╤à╨╕╨╣╨╜ ╨ÿ╤Ç╨│╤ì╨╜',
                desc: isEnglish
                  ? 'Foster a global mindset and cultural awareness'
                  : '╨₧╨╗╨╛╨╜ ╨╜╤ï╨╜ ╨╝╤ì╨┤╤ì╨╗╨│╤ì, ╤ü╨╛╤æ╨╗╤ï╨╜ ╤â╤à╨░╨╝╤ü╨░╤Ç╤ï╨│ ╤à╙⌐╨│╨╢╥»╥»╨╗╤ì╤à',
              },
              {
                title: isEnglish ? 'Personal Achievement' : '╨Ñ╥»╨╜╨╕╨╣╨╜ ╨É╨╝╨╢╨╕╨╗╤é',
                desc: isEnglish
                  ? 'Celebrate your accomplishments and growth'
                  : '╙¿╙⌐╤Ç╨╕╨╣╨╜ ╨░╨╝╨╢╨╕╨╗╤é, ╤ü╨░╨╣╨╜ ╨▒╨░╨╣╨┤╨╗╤ï╨│ ╨┤╤â╤â╨╗╨╕╨╢ ╤à╥»╨╗╤ì╤ì╨╗╤å╤ì╤à',
              },
            ].map((benefit, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="bg-gray-900 rounded-sm p-6 hover:bg-cardinal-red transition-colors border border-gray-800"
              >
                <h3 className="text-base font-bold mb-2">{benefit.title}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{benefit.desc}</p>
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
              {isEnglish ? 'Ready to Start Your Journey?' : '╙¿╙⌐╤Ç╨╕╨╣╨╜ ╨É╤Å╨╗╨╗╤ï╨│ ╨¡╤à╨╗╥»╥»╨╗╤ì╤à╤ì╨┤ ╨æ╤ì╨╗╤ì╨╜ ╥«╥»?'}
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
              {isEnglish
                ? 'Discover what you are truly capable of. Join thousands of participants worldwide who are achieving their goals through the Duke of Edinburgh\'s Award.'
                : '╙¿╙⌐╤Ç╨╕╨╣╨╜ ╨╢╨╕╨╜╤à╤ì╨╜╤ì ╤ç╨░╨┤╨▓╨░╤Ç╤ï╨│ ╨╛╨╗╨╢ ╨╝╤ì╨┤╤ì╤à. ╨¡╨┤╨╕╨╜╨▒╤â╤Ç╨│╨╕╨╣╨╜ ╨ô╨╡╤Ç╤å╨│╨╕╨╣╨╜ ╨¥╨░╨░╨┤╨░╨╝╨░╨░╤Ç ╨┤╨░╨╝╨╢╤â╤â╨╗╨░╨╜ ╨╖╨╛╤Ç╨╕╨╗╨│╨╛╨┤╨╛╨╛ ╤à╥»╤Ç╤ì╨╢ ╨▒╨░╨╣╨│╨░╨░ ╨╝╤Å╨╜╨│╨░ ╨╝╤Å╨╜╨│╨░╨╜ ╨╛╤Ç╨╛╨╗╤å╨╛╨│╤ç╨┤╤ï╨╜ ╤ì╨│╨╜╤ì╤ì╨╜╨┤ ╨╜╤ì╨│╨┤╤ì╤ì╤Ç╤ì╨╣.'}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-cardinal-red px-8 py-3 font-bold uppercase tracking-widest rounded-sm hover:bg-gray-100 transition-colors"
            >
              {isEnglish ? 'Get Started' : '╨¡╤à╨╗╥»╥»╨╗╤ì╤à'}
            </motion.button>
            <p className="text-white/80 mt-6 text-sm">
              {isEnglish
                ? 'Contact our DOFE coordinator: Grace Gondwe (Operations Manager)'
                : 'DOFE ╨║╨╛╨╛╤Ç╨┤╨╕╨╜╨░╤é╨╛╤Ç: ╨ô╤Ç╤ì╨╣╤ü ╨ô╨╛╨╜╨┤╨▓╨╡ (╥«╨╣╨╗ ╨░╨╢╨╕╨╗╨╗╨░╨│╨░╨░╨╜╤ï ╨£╨╡╨╜╨╡╨╢╨╡╤Ç)'}
            </p>
          </motion.div>
        </div>
      </section>
      </div>
    </div>
  );
}
