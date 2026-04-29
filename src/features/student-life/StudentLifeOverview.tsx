import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { Link } from 'react-router-dom';

export function StudentLifeOverview() {
  const { isEnglish } = useLanguage();

  // Featured Article
  const featuredArticle = {
    title: isEnglish ? 'The Heart of Community' : '╨¥╨╕╨╣╨│╨╝╨╕╨╣╨╜ ╨╖╥»╤Ç╤à',
    subtitle: isEnglish 
      ? 'How student initiatives are shaping the MAIS experience'
      : '╨₧╤Ä╤â╤é╨╜╤ï ╤à╙⌐╨┤╙⌐╨╗╨│╙⌐╙⌐╨╜╥»╥»╨┤ MAIS-╨╕╨╣╨╜ ╤é╤â╤Ç╤ê╨╗╨░╨│╤ï╨│ ╤à╤ì╤Ç╤à╤ì╨╜ ╙⌐╙⌐╤Ç╤ç╨╕╨╗╨╢ ╨▒╨░╨╣╨╜╨░',
    description: isEnglish
      ? 'Our students drive innovation and community through diverse clubs, athletic excellence, and collaborative initiatives. From academic competitions to cultural events, student life at MAIS is vibrant, inclusive, and transformative.'
      : '╨æ╨╕╨┤╨╜╨╕╨╣ ╨╛╤Ä╤â╤é╨╜╤â╤â╨┤ ╨╛╨╗╨╛╨╜ ╤Å╨╜╨╖╤ï╨╜ ╨║╨╗╤â╨▒╤â╤â╨┤, ╤ü╨┐╨╛╤Ç╤é╤ï╨╜ ╤ê╨░╤Ç╨│╨░╨╗╤é╨░╨╣ ╨░╨╢╨╕╨╗, ╤à╨░╨╝╤é╤Ç╨░╨╜ ╨░╨╢╨╕╨╗╨╗╨░╤à ╤ü╨░╨╜╨░╨░╤ç╨╕╨╗╨│╤â╤â╨┤╨░╨░╤Ç ╨╕╨╜╨╜╨╛╨▓╨░╤å╨╕╨┤ ╙⌐╨╜╨┤╙⌐╤Ç╨╗╙⌐╨╢, ╨╜╨╕╨╣╨│╨╝╨╕╨╣╨│ ╨▒╥»╤é╤ì╤ì╨╢ ╨▒╨░╨╣╨╜╨░.',
  };

  // Clubs of the Month
  const clubsOfMonth = [
    {
      name: isEnglish ? 'Tech Innovation Club' : '╨ó╨╡╤à╨╜╨╛╨╗╨╛╨│╨╕ ╨ÿ╨╜╨╜╨╛╨▓╨░╤å ╨Ü╨╗╤â╨▒',
      members: isEnglish ? '45 Members' : '45 ╨│╨╕╤ê╥»╥»╨╜',
    },
    {
      name: isEnglish ? 'Debate Society' : '╨£╨░╤Ç╨│╨░╨░╨╜ ╨¥╨╕╨╣╨│╤ì╨╝╨╗╤ì╨│',
      members: isEnglish ? '32 Members' : '32 ╨│╨╕╤ê╥»╥»╨╜',
    },
    {
      name: isEnglish ? 'Drama Club' : '╨û╥»╨╢╨│╨╕╨╣╨╜ ╨Ü╨╗╤â╨▒',
      members: isEnglish ? '28 Members' : '28 ╨│╨╕╤ê╥»╥»╨╜',
    },
  ];

  // Events of the Month
  const eventsOfMonth = [
    {
      date: isEnglish ? 'APR 28' : '4-╤Ç ╤ü╨░╤Ç 28',
      title: isEnglish ? 'Science Fair' : '╨¿╨╕╨╜╨╢╨╗╤ì╤à ╨ú╤à╨░╨░╨╜╤ï ╨É╤Ç╨│╨░ ╨Ñ╤ì╨╝╨╢╤ì╤ì',
      location: isEnglish ? 'Main Hall ΓÇó 14:00' : '╥«╨╜╨┤╤ü╤ì╨╜ ╤é╨░╨╜╤à╨╕╨╝ ΓÇó 14:00',
    },
    {
      date: isEnglish ? 'MAY 5' : '5-╤Ç ╤ü╨░╤Ç 5',
      title: isEnglish ? 'Annual Sports Day' : '╨û╨╕╨╗╨╕╨╣╨╜ ╨í╨┐╨╛╤Ç╤é╤ï╨╜ ╙¿╨┤╙⌐╤Ç',
      location: isEnglish ? 'Stadium ΓÇó All Day' : '╨ª╤ì╨╜╨│╤ì╨╗╨┤╤ì╤à ╤à╥»╤Ç╤ì╤ì╨╗╤ì╨╜ ΓÇó ╨æ╥»╤à╤ì╨╗ ╙⌐╨┤╙⌐╤Ç',
    },
    {
      date: isEnglish ? 'MAY 12' : '5-╤Ç ╤ü╨░╤Ç 12',
      title: isEnglish ? 'Cultural Festival' : '╨í╨╛╤æ╨╗╤ï╨╜ ╨æ╨░╤Å╤Ç',
      location: isEnglish ? 'Campus ΓÇó 15:00' : '╨Ü╨░╨╝╨┐╤â╤ü ΓÇó 15:00',
    },
  ];

  // Highlights
  const highlights = [
    {
      title: isEnglish ? 'Basketball Finals' : '╨í╨░╨│╤ü╨░╨╜ ╨▒╙⌐╨╝╨▒╙⌐╨│╨╕╨╣╨╜ ╨ñ╨╕╨╜╨░╨╗',
      result: isEnglish ? 'Boys: 89 - 76 Girls: 67 - 54' : '╨Ñ╙⌐╨▓╨│╥»╥»╨┤: 89 - 76 ╨₧╤à╨╕╨┤: 67 - 54',
      status: isEnglish ? 'CHAMPIONS' : '╨»╨¢╨É╨¢╨ó',
    },
    {
      title: isEnglish ? 'Debate Championship' : '╨£╨░╤Ç╨│╨░╨░╨╜ ╨º╨╡╨╝╨┐╨╕╨╛╨╜╨░╤é',
      result: isEnglish ? '1st Place ΓÇó National Competition' : '1-╤Ç ╨▒╨░╨╣╤Ç ΓÇó ╨ú╨╗╤ü╤ï╨╜ ╨ú╤Ç╨░╨╗╨┤╨░╨░╨╜',
      status: isEnglish ? 'VICTORY' : '╨»╨¢╨É╨¢╨ó',
    },
  ];

  return (
    <div className="w-full bg-white">
      {/* Featured Section */}
      <section className="py-12 bg-white border-b border-black border-opacity-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Featured Image/Content Area */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="bg-black rounded-lg h-64 md:h-80 flex items-center justify-center"
            >
              <p className="text-white/40 text-sm">{isEnglish ? 'Featured Image' : '╨í╨╛╨╜╨│╨╛╤ü╨╛╨╜ ╨╖╤â╤Ç╨░╨│'}</p>
            </motion.div>

            {/* Featured Article Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="inline-block bg-cardinal-red text-white text-xs font-bold px-3 py-1 rounded mb-4">
                {isEnglish ? 'FEATURED' : '╨₧╨¥╨ª╨¢╨₧╨ô╨ö╨í╨₧╨¥'}
              </div>
              <h2 className="text-4xl font-serif font-bold text-black mb-3">
                {featuredArticle.title}
              </h2>
              <p className="text-gray-600 text-sm mb-6">{featuredArticle.subtitle}</p>
              <p className="text-gray-700 leading-relaxed mb-6">
                {featuredArticle.description}
              </p>
              <button className="bg-black text-white font-bold px-6 py-3 rounded hover:bg-gray-800 transition">
                {isEnglish ? 'READ FULL ARTICLE' : '╨æ╥«╨ó╨¡╨¥ ╨¥╨ÿ╨Ö╨ó╨¢╨¡╨¢ ╨ú╨¥╨¿╨ÿ╨Ñ'}
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Three Column Section */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Clubs of the Month */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0 }}
              className="bg-white rounded-lg p-8 border-t-4 border-cardinal-red"
            >
              <h3 className="text-xl font-serif font-bold text-black mb-6">
                {isEnglish ? 'Clubs of the Month' : '╨í╨░╤Ç╤ï╨╜ ╨Ü╨╗╤â╨▒╤â╤â╨┤'}
              </h3>

              <div className="space-y-4">
                {clubsOfMonth.map((club, index) => (
                  <motion.div
                    key={club.name}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index }}
                    className="pb-4 border-b border-black border-opacity-10 last:border-b-0"
                  >
                    <p className="font-bold text-black">{club.name}</p>
                    <p className="text-sm text-black text-opacity-60">{club.members}</p>
                  </motion.div>
                ))}
              </div>

              <Link 
                to="/student-life/academic-clubs"
                className="block text-center mt-6 text-cardinal-red font-bold text-sm uppercase hover:underline"
              >
                {isEnglish ? 'View All Clubs ΓåÆ' : '╨æ╥»╤à ╨║╨╗╤â╨▒╤ï╨│ ╥»╨╖╤ì╤à ΓåÆ'}
              </Link>
            </motion.div>

            {/* Events of the Month */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-lg p-8 border-t-4 border-cardinal-red"
            >
              <h3 className="text-xl font-serif font-bold text-black mb-6">
                {isEnglish ? 'Upcoming Events' : '╨ÿ╤Ç╤ì╤ì╨┤╥»╨╣╨╜ ╥«╨╣╨╗ ╤Å╨▓╨┤╨╗╤â╤â╨┤'}
              </h3>

              <div className="space-y-4">
                {eventsOfMonth.map((event, index) => (
                  <motion.div
                    key={event.title}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index }}
                    className="pb-4 border-b border-black border-opacity-10 last:border-b-0"
                  >
                    <p className="text-cardinal-red font-bold text-sm mb-1">{event.date}</p>
                    <p className="font-bold text-black mb-1">{event.title}</p>
                    <p className="text-sm text-black text-opacity-60">{event.location}</p>
                  </motion.div>
                ))}
              </div>

              <Link 
                to="/student-life/events"
                className="block text-center mt-6 text-cardinal-red font-bold text-sm uppercase hover:underline"
              >
                {isEnglish ? 'View Calendar ΓåÆ' : '╨í╥»╥»╨╗╨╕╨╣╨│ ╥»╨╖╤ì╤à ΓåÆ'}
              </Link>
            </motion.div>

            {/* Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-lg p-8 border-t-4 border-cardinal-red"
            >
              <h3 className="text-xl font-serif font-bold text-black mb-6">
                {isEnglish ? 'Achievements' : '╨₧╨╗╨╛╨╗╤é'}
              </h3>

              <div className="space-y-4">
                {highlights.map((highlight, index) => (
                  <motion.div
                    key={highlight.title}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index }}
                    className="pb-4 border-b border-black border-opacity-10 last:border-b-0"
                  >
                    <div className="flex justify-between items-start gap-2 mb-2">
                      <p className="font-bold text-black">{highlight.title}</p>
                      <span className="bg-black text-white text-xs font-bold px-2 py-1 rounded">
                        {highlight.status}
                      </span>
                    </div>
                    <p className="text-sm text-black text-opacity-60">{highlight.result}</p>
                  </motion.div>
                ))}
              </div>

              <Link 
                to="/student-life/athletics"
                className="block text-center mt-6 text-cardinal-red font-bold text-sm uppercase hover:underline"
              >
                {isEnglish ? 'View All Achievements ΓåÆ' : '╨æ╥»╤à ╨╛╨╗╨╛╨╗╤é╤ï╨│ ╥»╨╖╤ì╤à ΓåÆ'}
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-black mb-6">
              {isEnglish ? 'Why Student Life Matters' : '╨₧╤Ä╤â╤é╨╜╤ï ╨░╨╝╤î╨┤╤Ç╨░╨╗ ╤Å╨░╨│╨░╨░╨┤ ╤ç╤â╤à╨░╨╗'}
            </h2>
            <p className="text-lg text-black text-opacity-70 leading-relaxed">
              {isEnglish
                ? 'Student life at MAIS is more than just extracurricular activities. It\'s where friendships are forged, leadership is developed, and memories are created. Through clubs, sports, arts, and community service, our students discover their passions and grow as individuals.'
                : 'MAIS-╨┤ ╨╛╤Ä╤â╤é╨╜╤ï ╨░╨╝╤î╨┤╤Ç╨░╨╗ ╨╜╤î ╨╖╙⌐╨▓╤à╙⌐╨╜ ╤ü╤â╤Ç╨│╨░╨╗╨│╤ï╨╜ ╨│╨░╨┤╤â╤â╤Ç╤à ╥»╨╣╨╗ ╨░╨╢╨╕╨╗╨╗╨░ ╨▒╨╕╤ê ╤Ä╨╝. ╨¡╨╜╤ì ╨▒╨╛╨╗ ╨╜╨░╨╣╨╖╤â╤â╨┤╤é╨░╨╣ ╤â╤â╨╗╨╖╨░╨╢, ╤â╨┤╨╕╤Ç╨┤╨╗╨░╨│╤ï╨╜ ╤â╤Ç ╤ç╨░╨┤╨▓╨░╤Ç╤ï╨│ ╨▒╙⌐╨│╙⌐╙⌐╨┤ ╨╛╤Ä╤â╤é╨╜╤â╤â╨┤ ╙⌐╙⌐╤Ç╤ü╨┤╨╕╨╣╨╜ ╤à╥»╤ü╤ì╨╗╤é╨╕╨╣╨│ ╨╛╨╗╨╢, ╨│╨░╨╜╤å╨░╨░╤Ç╤ç╨╕╨╗╤ü╨░╨╜ ╨▒╨░╨╣╨┤╨╗╨░╨░╤Ç ╤ü╙⌐╨│╨┤╙⌐╤à ╨│╨░╨╖╨░╤Ç ╤Ä╨╝.'}
            </p>
          </motion.div>

          {/* Key Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: isEnglish ? 'Leadership Development' : '╨ú╨┤╨╕╤Ç╨┤╨╗╨░╨│╤ï╨╜ ╨Ñ╙⌐╨│╨╢╥»╥»╨╗╤ì╨╗╤é',
                description: isEnglish
                  ? 'Take on leadership roles and develop essential skills for your future.'
                  : '╨ú╨┤╨╕╤Ç╨┤╨╗╨░╨│╤ï╨╜ ╥»╥»╤Ç╨│╨╕╨╣╨│ ╨░╨▓╤ç, ╨╕╤Ç╤ì╤ì╨┤╥»╨╣╨╜╨┤ ╤ç╤â╤à╨░╨╗ ╤â╤Ç ╤ç╨░╨┤╨▓╨░╤Ç╤ï╨│ ╤à╙⌐╨│╨╢╥»╥»╨╗╤ì╤ì╤Ç╤ì╨╣.',
              },
              {
                title: isEnglish ? 'Community Connection' : '╨¥╨╕╨╣╨│╨╝╨╕╨╣╨╜ ╤à╨╛╨╗╨▒╨╛╨╗╤é',
                description: isEnglish
                  ? 'Build lasting friendships and create bonds with your peers.'
                  : '╨¡╤Ç╨│╥»╥»╨╗╤ì╨╣ ╨╜╨░╨╣╨╖╤â╤â╨┤╤é╨░╨╣ ╤ì╤Ç╨│╥»╥»╨╗╤ì╨╣ ╤â╤â╨╗╨╖╨░╨╗╤é╨░╨░ ╨░╨▓╤ç, ╤ü╥»╨╜╤ü╨╗╤ì╨│ ╤à╨╛╨╗╨▒╨╛╨╛ ╨▒╥»╤é╤ì╤ì.',
              },
              {
                title: isEnglish ? 'Personal Growth' : '╨Ñ╤â╨▓╤î ╤à╥»╨╜╨╕╨╣ ╨Ñ╙⌐╨│╨╢╥»╥»╨╗╤ì╨╗╤é',
                description: isEnglish
                  ? 'Explore your interests and discover new passions outside the classroom.'
                  : '╨í╨╛╨╜╨╕╤Ç╤à╨╗╤ï╨│ ╨┤╥»╤Ç╤ü╨╗╤ì╤ì╨┤, ╤ü╤â╤Ç╨│╤â╤â╨╗╨╕╨╣╨╜ ╨│╨░╨┤╨╜╨░ ╤ê╨╕╨╜╤ì ╨┤╤â╤Ç╨╗╨░╨╗╤â╤â╨┤╤ï╨│ ╨╛╨╗╨╛╨╛╤Ç╨╛╨╣.',
              },
              {
                title: isEnglish ? 'Excellence & Recognition' : '╨ó╙⌐╨│╤ü ╨▒╨░╨╣╨┤╨░╨╗ & ╨Ñ╥»╨╗╤ì╤ì╨╜ ╨╖╙⌐╨▓╤ê╙⌐╙⌐╤Ç╙⌐╨╗╤é',
                description: isEnglish
                  ? 'Pursue excellence and be recognized for your achievements.'
                  : '╨ó╙⌐╨│╤ü ╨▒╨░╨╣╨┤╨╗╤ï╨│ ╤ì╨│╤ê╨╕╨╜╨╗╤ì╤ì╨┤, ╨╛╨╗╨╛╨╗╤é╤â╤â╨┤╨░╨░ ╤à╥»╨╗╤ì╤ì╨╜ ╨╖╙⌐╨▓╤ê╙⌐╙⌐╤Ç╥»╥»╨╗╤ì╤ì╤Ç╤ì╨╣.',
              },
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                className="bg-white rounded-lg p-6 border-l-4 border-cardinal-red"
              >
                <h3 className="text-lg font-serif font-bold text-black mb-2">
                  {benefit.title}
                </h3>
                <p className="text-black text-opacity-70">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-12 bg-cardinal-red text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-serif font-bold mb-2">
              {isEnglish ? 'By The Numbers' : '╨ó╨╛╨╛╨│╨╛╨╛╤Ç'}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { stat: '29+', label: isEnglish ? 'Active Clubs' : '╨ÿ╨┤╤ì╨▓╤à╤é╤ì╨╣ ╨║╨╗╤â╨▒╤â╤â╨┤' },
              { stat: '15+', label: isEnglish ? 'Sports Teams' : '╨í╨┐╨╛╤Ç╤é╤ï╨╜ ╨▒╨░╨│' },
              { stat: '85%', label: isEnglish ? 'Student Participation' : '╨₧╤Ä╤â╤é╨╜╤ï ╨╛╤Ç╨╛╨╗╤å╨╛╨╛' },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
              >
                <div className="text-5xl font-bold mb-2">{item.stat}</div>
                <p className="text-lg text-white/90">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
