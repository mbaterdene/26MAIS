import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { Link } from 'react-router-dom';
import studentLifeData from '../../content/student-life/studentLife.json';

export function StudentLifeOverview() {
  const { isEnglish } = useLanguage();

  const getText = (obj: { en: string; mn: string }) => isEnglish ? obj.en : obj.mn;

  const featuredArticle = {
    title: getText(studentLifeData.featuredArticle.title),
    subtitle: getText(studentLifeData.featuredArticle.subtitle),
    description: getText(studentLifeData.featuredArticle.description),
  };

  const clubsOfMonth = studentLifeData.clubsOfMonth.clubs.map(club => ({
    name: getText(club.name),
    members: getText(club.members),
  }));

  const eventsOfMonth = studentLifeData.eventsOfMonth.events.map(event => ({
    date: getText(event.date),
    title: getText(event.title),
    location: getText(event.location),
  }));

  const highlights = studentLifeData.achievements.highlights.map(highlight => ({
    title: getText(highlight.title),
    result: getText(highlight.result),
    status: getText(highlight.status),
  }));

  return (
    <div className="w-full bg-white">
      {/* Featured Section */}
      <section className="py-12 bg-white border-b border-black border-opacity-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="bg-black rounded-lg h-64 md:h-80 flex items-center justify-center"
            >
              <p className="text-white/40 text-sm">{getText(studentLifeData.featuredImagePlaceholder)}</p>
            </motion.div>

            {/* Featured Article Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="inline-block bg-cardinal-red text-white text-xs font-bold px-3 py-1 rounded mb-4">
                {getText(studentLifeData.featuredBadge)}
              </div>
              <h2 className="text-4xl font-serif font-bold text-black mb-3">
                {featuredArticle.title}
              </h2>
              <p className="text-gray-600 text-sm mb-6">{featuredArticle.subtitle}</p>
              <p className="text-gray-700 leading-relaxed mb-6">
                {featuredArticle.description}
              </p>
              <button className="bg-black text-white font-bold px-6 py-3 rounded hover:bg-gray-800 transition">
                {getText(studentLifeData.readFullArticleButton)}
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Three Column Section */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0 }}
              className="bg-white rounded-lg p-8 border-t-4 border-cardinal-red"
            >
              <h3 className="text-xl font-serif font-bold text-black mb-6">
                {getText(studentLifeData.clubsOfMonth.title)}
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
                {getText(studentLifeData.clubsOfMonth.viewAllLink)}
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
                {getText(studentLifeData.eventsOfMonth.title)}
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
                {getText(studentLifeData.eventsOfMonth.viewCalendarLink)}
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
                {getText(studentLifeData.achievements.title)}
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
                {getText(studentLifeData.achievements.viewAllLink)}
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
              {getText(studentLifeData.whyStudentLifeMatters.title)}
            </h2>
            <p className="text-lg text-black text-opacity-70 leading-relaxed">
              {getText(studentLifeData.whyStudentLifeMatters.description)}
            </p>
          </motion.div>

          {/* Key Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {studentLifeData.whyStudentLifeMatters.benefits.map((benefit, index) => (
              <motion.div
                key={getText(benefit.title)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                className="bg-white rounded-lg p-6 border-l-4 border-cardinal-red"
              >
                <h3 className="text-lg font-serif font-bold text-black mb-2">
                  {getText(benefit.title)}
                </h3>
                <p className="text-black text-opacity-70">{getText(benefit.description)}</p>
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
              {getText(studentLifeData.byTheNumbers.title)}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {studentLifeData.byTheNumbers.statistics.map((item, index) => (
              <motion.div
                key={getText(item.label)}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
              >
                <div className="text-5xl font-bold mb-2">{item.stat}</div>
                <p className="text-lg text-white/90">{getText(item.label)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
