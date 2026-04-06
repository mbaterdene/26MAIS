import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { getClubs, getEvents } from '../../lib/api';
import type { Club, Event } from '../../lib/types';
import { bil, formatDate, truncateWords } from '../../lib/utils';
import { pageText } from '../../data/pageText';
import { Link } from 'react-router-dom';

export function StudentLifePage() {
  const { isEnglish, t } = useLanguage();
  const ui = pageText.studentLife;
  const tr = (label: { en: string; mn: string }) => t(label.en, label.mn);
  const [studentClubs, setStudentClubs] = useState<Club[]>([]);
  const [schoolClubs, setSchoolClubs] = useState<Club[]>([]);
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    getClubs('student').then(setStudentClubs).catch(() => {});
    getClubs('school').then(setSchoolClubs).catch(() => {});
    getEvents(true).then(setEvents).catch(() => {});
  }, []);

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="relative bg-black text-white py-32 md:py-44 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30 bg-gradient-to-br from-sand to-cardinal-red" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }}
            className="inline-flex text-xs font-bold tracking-[0.2em] uppercase text-white/50 bg-white/10 px-4 py-1.5 rounded-full mb-8"
          >
            {tr(ui.heroTitle)}
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-7xl font-serif font-bold mb-6"
          >
            {tr(ui.heroTitle)}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.8 }}
            className="text-xl text-gray-200 max-w-2xl font-sans"
          >
            {tr(ui.heroSubtitle)}
          </motion.p>
        </div>
      </section>

      {/* Student Clubs */}
      {studentClubs.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-serif font-bold mb-4 text-black">{tr(ui.studentClubs)}</h2>
            <p className="text-gray-600 mb-12">{tr(ui.studentClubsDesc)}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {studentClubs.map((club, i) => (
                <motion.div key={club.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                  className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="text-3xl mb-3">{club.icon}</div>
                  <h3 className="text-lg font-serif font-bold text-black mb-2">{bil(isEnglish, club.name_en, club.name_mn)}</h3>
                  <p className="text-gray-600 text-sm">{bil(isEnglish, club.description_en, club.description_mn)}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* School Clubs */}
      {schoolClubs.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-serif font-bold mb-4 text-black">{tr(ui.schoolClubs)}</h2>
            <p className="text-gray-600 mb-12">{tr(ui.schoolClubsDesc)}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {schoolClubs.map((club, i) => (
                <motion.div key={club.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                  className="bg-white rounded-2xl p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="text-3xl mb-3">{club.icon}</div>
                  <h3 className="text-lg font-serif font-bold text-black mb-2">{bil(isEnglish, club.name_en, club.name_mn)}</h3>
                  <p className="text-gray-600 text-sm">{bil(isEnglish, club.description_en, club.description_mn)}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Upcoming Events */}
      {events.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-serif font-bold mb-12 text-black">{tr(ui.annualEvents)}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {events.map((event) => (
                <div key={event.id} className="bg-gray-50 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow group">
                  <div className="h-40 bg-gradient-to-br from-cardinal-red/10 to-digital-blue/10 flex items-center justify-center">
                    <span className="text-4xl">🎉</span>
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-gray-400 mb-2">{formatDate(event.event_date)}</p>
                    <h3 className="text-lg font-serif font-bold text-black mb-2 group-hover:text-cardinal-red transition-colors">
                      <Link to={`/events/${event.id}`}>{bil(isEnglish, event.title_en, event.title_mn)}</Link>
                    </h3>
                    <p className="text-gray-600 text-sm">{truncateWords(bil(isEnglish, event.description_en, event.description_mn), 20)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
