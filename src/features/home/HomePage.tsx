import { Compass } from 'lucide-react';
import { FaUsers, FaUserGraduate, FaBookOpen, FaTree } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { getHomeData } from '../../lib/api';
import type { HomeData } from '../../lib/api';
import { bil, formatDate, truncateWords } from '../../lib/utils';
import { pageText } from '../../data/pageText';
import WorldMap from '../../components/WorldMap';

export function HomePage() {
  const { isEnglish, t } = useLanguage();
  const ui = pageText.home;
  const tr = (label: { en: string; mn: string }) => t(label.en, label.mn);

  const [homeData, setHomeData] = useState<HomeData | null>(null);
  const [loading, setLoading] = useState(true);

  type StatItem = {
    icon: React.ReactNode;
    value: string;
    label: { en: string; mn: string };
    colors: {
      bg: string;
      icon: string;
      border: string;
    };
  };

  const stats: StatItem[] = [
    {
      icon: <FaUsers className="w-8 h-8" />,
      value: "384",
      label: { en: "Students", mn: "Сураагчид" },
      colors: {
        bg: "bg-red-500/20",
        icon: "text-red-400",
        border: "hover:border-red-500/50",
      },
    },
    {
      icon: <FaUserGraduate className="w-8 h-8" />,
      value: "42",
      label: { en: "Teachers", mn: "Багш нар" },
      colors: {
        bg: "bg-digital-blue/20",
        icon: "text-digital-blue",
        border: "hover:border-digital-blue/50",
      },
    },
    {
      icon: <FaBookOpen className="w-8 h-8" />,
      value: "44",
      label: { en: "Programs", mn: "Хичээлүүд" },
      colors: {
        bg: "bg-sand/20",
        icon: "text-sand",
        border: "hover:border-sand/50",
      },
    },
    {
      icon: <FaTree className="w-8 h-8" />,
      value: "$3.4M",
      label: { en: "2024 Scholarship", mn: "2024 төгөлгөлүүд" },
      colors: {
        bg: "bg-green-400/20",
        icon: "text-green-400",
        border: "hover:border-green-400/50",
      },
    },
  ];

  useEffect(() => {
    getHomeData().then((data) => {
      setHomeData(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const latestNews = homeData?.latest_news ?? [];
  const upcomingEvents = homeData?.upcoming_events ?? [];

  return (
    <div className="w-full">

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section 
        className="relative bg-black text-white py-32 md:py-48 overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: 'url(/pic1.jpg)',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 z-0 bg-black/60" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-start">
          <motion.h1
            className="text-5xl md:text-7xl font-serif font-bold mb-10 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {t('World-class', 'Дэлхийн түвшний')} <br />
            <span className="text-cardinal-red">
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

      {/* ── Admissions Status Banner ────────────────────────────────────────── */}
      <section className="bg-cardinal-red">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Thin border line */}
          <div className="border-b border-white/20 pb-12">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center text-white"
            >
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 leading-tight">
                {isEnglish
                  ? 'The 2026-27 Application is Now Closed'
                  : '2026-27 оны элсэлт хаагдлаа'}
              </h2>
              <p className="text-lg text-white/90 font-sans mb-6 max-w-2xl mx-auto">
                {isEnglish
                  ? 'Thank you for your interest in Mongol Aspiration School. We received an overwhelming response to this year\'s application. Registration for next year will open in June.'
                  : 'Монгол Тэмүүлэл сургуульд сонирхож үзсэний төлөө баярлалаа. Энэ жилийн элсэлтэд маш их хүн хүсэлтийн гүйцэтгэл илгээсэн. Дараа жилийн бүртгэл 6-р сарын үед нээгдэх болно.'}
              </p>
              <Link
                to="/admissions"
                className="inline-block text-cardinal-red bg-white hover:bg-gray-100 px-8 py-3 rounded-lg font-bold text-base transition-all hover:-translate-y-0.5 shadow-md"
              >
                {isEnglish ? 'Learn About Admissions' : 'Элсэлтийн мэдээлэл'}
              </Link>
            </motion.div>
          </div>
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
              {latestNews.slice(0, 4).map((news, i) => (
                <motion.article
                  key={news.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-cardinal-red/30 group"
                >
                  {news.image ? (
                    <div className="overflow-hidden h-48">
                      <img src={news.image} alt={bil(isEnglish, news.title_en, news.title_mn)} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                  ) : (
                    <div className="h-48 bg-gradient-to-br from-cardinal-red/10 to-digital-blue/10 flex items-center justify-center">
                      <span className="text-4xl">📰</span>
                    </div>
                  )}
                  <div className="p-6">
                    <p className="text-xs text-gray-400 mb-2">{formatDate(news.created_at)}</p>
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

      {/* ── School Stats ──────────────────────────────────────────────── */}
      <section className="py-20 bg-black border-b-8 border-cardinal-red">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`rounded-xl p-6 border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] hover:from-white/10 hover:to-white/[0.05] transition-all duration-300 flex flex-col items-center text-center backdrop-blur-sm ${stat.colors.border}`}
              >
                <div className={`mb-3 p-3 ${stat.colors.bg} rounded-lg hover:opacity-80 transition-opacity`}>
                  <div className={stat.colors.icon}>{stat.icon}</div>
                </div>
                <p className="text-5xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-gray-400 font-sans text-xs uppercase tracking-wider">
                  {isEnglish ? stat.label.en : stat.label.mn}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Global Alumni Network ──────────────────────────────────── */}
      <WorldMap />

      {/* Location Map Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-serif font-bold text-black mb-4">{isEnglish ? 'Our Location' : 'Бидний Байршил'}</h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl overflow-hidden shadow-lg"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3172.650542986599!2d106.97919947671312!3d47.90468146734578!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5d96919a07dfcf83%3A0xc37dcc5f0d801dee!2sMongol%20Aspiration%20International%20School!5e1!3m2!1sen!2smn!4v1775751886153!5m2!1sen!2smn"
              width="100%"
              height="500"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
