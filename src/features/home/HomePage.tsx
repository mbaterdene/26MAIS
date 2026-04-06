import { BookOpen, Users, Award, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { getHomeData, getAlumniStats } from '../../lib/api';
import type { HomeData, AlumniStatsData } from '../../lib/api';
import { bil, formatDate, formatNumber, truncateWords } from '../../lib/utils';
import { jsonCourses } from '../../data/contentJson';
import { pageText } from '../../data/pageText';
import type { Course } from '../../lib/types';
import WorldMap from '../../components/WorldMap';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export function HomePage() {
  const { isEnglish, t } = useLanguage();
  const ui = pageText.home;
  const tr = (label: { en: string; mn: string }) => t(label.en, label.mn);

  const [homeData, setHomeData] = useState<HomeData | null>(null);
  const [alumniData, setAlumniData] = useState<AlumniStatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getHomeData().catch(() => null),
      getAlumniStats().catch(() => null),
    ]).then(([home, alumni]) => {
      setHomeData(home);
      setAlumniData(alumni);
      setLoading(false);
    });
  }, []);

  const latestNews = homeData?.latest_news ?? [];
  const upcomingEvents = homeData?.upcoming_events ?? [];
  const featuredCourses: Course[] = jsonCourses.slice(0, 3);
  const alumniStats = alumniData?.statistics;

  const featureCards = [
    {
      id: 'academics',
      title: t('Academics', 'Сургалт'),
      description: t(
        'National and international programs with Cambridge IGCSE, AS & A Level curriculum.',
        'Кэмбрижийн IGCSE, AS & A Level хөтөлбөртэй үндэсний болон олон улсын сургалт.'
      ),
      gradient: 'from-cardinal-red to-digital-red',
      icon: <BookOpen size={64} className="text-white opacity-80 group-hover:scale-110 transition-transform duration-300" />,
      href: '/academics',
    },
    {
      id: 'admissions',
      title: t('Admissions', 'Элсэлт'),
      description: t(
        'Annual entrance examination selecting top 96 students. Registration opens in June.',
        'Жилийн орох шалгалтаар топ 96 сурагч сонгогдоно. Бүртгэл 6-р сард нээгдэнэ.'
      ),
      gradient: 'from-digital-blue to-black',
      icon: <Award size={64} className="text-white opacity-80 group-hover:scale-110 transition-transform duration-300" />,
      href: '/admissions',
    },
    {
      id: 'student-life',
      title: t('Student Life', 'Сурагчийн амьдрал'),
      description: t(
        'Clubs, activities, events, and development programs for holistic student growth.',
        'Клубүүд, үйл ажиллагаа, арга хэмжээ, хөгжлийн хөтөлбөрүүд.'
      ),
      gradient: 'from-sand to-gray-500',
      icon: <Users size={64} className="text-white opacity-80 group-hover:scale-110 transition-transform duration-300" />,
      href: '/student-life',
    },
  ];

  return (
    <div className="w-full">

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative bg-black text-white py-32 md:py-48 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40 mix-blend-multiply bg-gradient-to-r from-cardinal-red to-black" />

        <motion.div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-cardinal-red/10 blur-3xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-digital-blue/10 blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-start">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.22em] uppercase text-white/50 bg-white/10 px-4 py-1.5 rounded-full mb-8"
          >
            {t('Mongol Aspiration School', 'Монгол Тэмүүлэл Сургууль')}
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {t('World-class', 'Дэлхийн түвшний')} <br />
            <span className="text-cardinal-red bg-white/10 px-2 rounded backdrop-blur-sm shadow-lg border border-white/20">
              {t('education', 'боловсрол')}
            </span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-200 mb-10 max-w-2xl font-sans leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8 }}
          >
            {t(
              'Mongol Aspiration School develops quality education, knowledge, and skills for globally competitive citizens.',
              'Монгол Тэмүүлэл сургууль дэлхийн иргэнийг хөгжүүлэх чанартай боловсрол, мэдлэг, ур чадварыг хөгжүүлнэ.'
            )}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <Link
              to="/admissions"
              className="bg-cardinal-red hover:bg-digital-red text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:-translate-y-1 transition-all duration-300 text-center"
            >
              {t('Learn About Admissions', 'Элсэлтийн мэдээлэл')}
            </Link>
            <Link
              to="/academics"
              className="bg-transparent border-2 border-white hover:bg-white hover:text-black text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg transition-all duration-300 text-center"
            >
              {t('Explore Academics', 'Сургалтын хөтөлбөр')}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Feature Cards ─────────────────────────────────────────────── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={containerVariants}
          >
            {featureCards.map((card) => (
              <motion.div
                key={card.id}
                variants={cardVariants}
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 group"
              >
                <div className={`h-48 bg-gradient-to-br ${card.gradient} flex items-center justify-center`}>
                  {card.icon}
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-serif font-bold mb-4 text-black">{card.title}</h3>
                  <p className="text-gray-600 mb-6 font-sans leading-relaxed">{card.description}</p>
                  <Link
                    to={card.href}
                    className="text-digital-blue font-bold flex items-center group-hover:text-cardinal-red transition-colors"
                  >
                    {t('Learn More', 'Дэлгэрэнгүй')}{' '}
                    <span className="ml-2 group-hover:translate-x-2 transition-transform inline-block">→</span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Latest News ──────────────────────────────────────────────── */}
      {!loading && latestNews.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-4xl font-serif font-bold text-black">{tr(ui.latestNews)}</h2>
              <Link to="/news" className="text-digital-blue font-bold hover:text-cardinal-red transition-colors flex items-center gap-2">
                {tr(ui.allNews)} <span>→</span>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {latestNews.map((news, i) => (
                <motion.article
                  key={news.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-cardinal-red/20 group"
                >
                  {news.image ? (
                    <div className="relative overflow-hidden h-48">
                      <img src={news.image} alt={bil(isEnglish, news.title_en, news.title_mn)} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute top-3 right-3 bg-cardinal-red text-white px-2.5 py-0.5 rounded-full text-xs font-bold">{tr(ui.newsTag)}</div>
                    </div>
                  ) : (
                    <div className="h-48 bg-gradient-to-br from-cardinal-red/10 to-digital-blue/10 flex items-center justify-center">
                      <span className="text-4xl">📰</span>
                    </div>
                  )}
                  <div className="p-6">
                    <p className="text-xs text-gray-400 mb-2">{formatDate(news.created_at)} • {news.author}</p>
                    <h3 className="text-lg font-serif font-bold text-black mb-3 line-clamp-2 group-hover:text-cardinal-red transition-colors">
                      <Link to={`/news/${news.slug}`}>{bil(isEnglish, news.title_en, news.title_mn)}</Link>
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-4">{truncateWords(bil(isEnglish, news.content_en, news.content_mn), 15)}</p>
                    <Link to={`/news/${news.slug}`} className="text-sm font-bold text-black hover:text-cardinal-red transition-colors">
                      {tr(ui.readMore)} →
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Philosophy Banner ─────────────────────────────────────────── */}
      <motion.section
        className="bg-black py-20 border-b-8 border-cardinal-red"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto text-center px-4">
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Compass size={48} className="mx-auto text-sand mb-6" />
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-8">
            {t('Guided by Knowledge and Aspiration.', 'Мэдлэг, Тэмүүлэлээр удирдуулсан.')}
          </h2>
          <p className="text-xl text-gray-300 font-sans leading-relaxed">
            {t(
              'At Mongol Aspiration School, our curriculum combines national and international programs, preparing students to become globally competitive citizens.',
              'Монгол Тэмүүлэл сургуульд үндэсний болон олон улсын хөтөлбөрийг хослуулан, сурагчдыг дэлхийн өрсөлдөөнд бэлтгэнэ.'
            )}
          </p>
        </div>
      </motion.section>

      {/* ── Upcoming Events ──────────────────────────────────────────── */}
      {upcomingEvents.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-4xl font-serif font-bold text-black mb-2">{tr(ui.upcomingEvents)}</h2>
                <p className="text-gray-600">{tr(ui.upcomingEventsSub)}</p>
              </div>
              <Link to="/events" className="text-digital-blue font-bold hover:text-cardinal-red transition-colors">{tr(ui.viewCalendar)}</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents.map((event) => (
                <motion.div
                  key={event.id}
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-cardinal-red/20 group"
                >
                  <div className="relative h-48 overflow-hidden">
                    {event.image ? (
                      <img src={event.image} alt={bil(isEnglish, event.title_en, event.title_mn)} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-digital-blue/10 to-cardinal-red/10 flex items-center justify-center">
                        <span className="text-4xl">📅</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="text-sm text-gray-400 mb-3">{formatDate(event.event_date)}</div>
                    <h3 className="text-xl font-serif font-bold text-black mb-3 group-hover:text-cardinal-red transition-colors">
                      <Link to={`/events/${event.id}`}>{bil(isEnglish, event.title_en, event.title_mn)}</Link>
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-4">{truncateWords(bil(isEnglish, event.description_en, event.description_mn), 20)}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-400">{event.location ?? ""}</span>
                      <Link to={`/events/${event.id}`} className="text-digital-blue font-bold hover:text-cardinal-red text-sm">{tr(ui.details)}</Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Alumni Stats ──────────────────────────────────────────────── */}
      {alumniStats && (
        <section className="py-20 bg-black text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-serif font-bold mb-12">{tr(ui.worldAlumniNetwork)}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <p className="text-4xl md:text-5xl font-bold text-cardinal-red">{formatNumber(alumniStats.total_alumni)}</p>
                <p className="text-gray-400 mt-2">{tr(ui.alumniAbroad)}</p>
              </div>
              <div>
                <p className="text-4xl md:text-5xl font-bold text-digital-blue">{formatNumber(alumniStats.total_countries)}</p>
                <p className="text-gray-400 mt-2">{tr(ui.countries)}</p>
              </div>
              <div>
                <p className="text-4xl md:text-5xl font-bold text-sand">{formatNumber(alumniStats.total_universities)}</p>
                <p className="text-gray-400 mt-2">{tr(ui.universities)}</p>
              </div>
              <div>
                <p className="text-4xl md:text-5xl font-bold text-green-400">${formatNumber(alumniStats.total_scholarship)}</p>
                <p className="text-gray-400 mt-2">{tr(ui.totalScholarship)}</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Global Alumni Network ──────────────────────────────────── */}
      <WorldMap />

      {/* ── Featured Courses ─────────────────────────────────────────── */}
      {featuredCourses.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-serif font-bold text-center mb-12 text-black">{tr(ui.featuredCourses)}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {featuredCourses.map((course) => (
                <motion.div
                  key={course.id}
                  whileHover={{ y: -4 }}
                  className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="h-48 bg-gradient-to-br from-digital-blue/20 to-cardinal-red/10 flex items-center justify-center">
                    <BookOpen size={48} className="text-gray-300" />
                  </div>
                  <div className="p-6">
                    {course.grade_display && (
                      <span className="inline-block bg-cardinal-red text-white px-3 py-1 rounded-full text-xs font-bold mb-3">{course.grade_display}</span>
                    )}
                    <h3 className="text-xl font-serif font-bold mb-2 text-black group-hover:text-cardinal-red transition-colors">
                      <Link to={`/courses/${course.slug}`}>{course.name}</Link>
                    </h3>
                    {course.teacher && <p className="text-sm text-gray-500 mb-2">{tr(ui.teacher)}: {course.teacher}</p>}
                    <p className="text-gray-600 mb-4 text-sm line-clamp-3">{truncateWords(course.description, 15)}</p>
                    <Link to={`/courses/${course.slug}`} className="text-digital-blue font-bold hover:text-cardinal-red text-sm">{tr(ui.readMoreArrow)}</Link>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="text-center">
              <Link to="/courses" className="inline-block bg-cardinal-red hover:bg-digital-red text-white px-8 py-3 rounded-full font-bold transition-all hover:-translate-y-1 shadow-lg">
                {tr(ui.allCourses)}
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
