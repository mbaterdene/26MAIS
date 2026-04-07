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
  const [events, setEvents] = useState<Event[]>([]);

  const dofePrograms = [
    { id: 1, name: { en: 'Basketball', mn: 'Сагс' }, emoji: '🏀' },
    { id: 2, name: { en: 'Badminton', mn: 'Бадминтон' }, emoji: '🏸' },
    { id: 3, name: { en: 'Guitar', mn: 'Гитар' }, emoji: '🎸' },
    { id: 4, name: { en: 'Volleyball', mn: 'Волейбол' }, emoji: '🏐' },
    { id: 5, name: { en: 'Piano', mn: 'Нь нь' }, emoji: '🎹' },
    { id: 6, name: { en: 'Tennis', mn: 'Теннис' }, emoji: '🎾' },
    { id: 7, name: { en: 'Swimming', mn: 'Сүлжээ' }, emoji: '🏊' },
    { id: 8, name: { en: 'Dance', mn: 'Бүжиг' }, emoji: '💃' },
  ];

  useEffect(() => {
    getClubs('student').then(setStudentClubs).catch(() => {});
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {studentClubs.slice(0, 6).map((club, i) => (
                <motion.div key={club.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                  className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start gap-3 mb-3">
                    {club.image_url && (
                      <img src={club.image_url} alt={bil(isEnglish, club.name_en, club.name_mn)} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                    )}
                    <h3 className="text-lg font-serif font-bold text-black flex-1">{bil(isEnglish, club.name_en, club.name_mn)}</h3>
                  </div>
                  <p className="text-gray-600 text-sm">{bil(isEnglish, club.description_en, club.description_mn)}</p>
                </motion.div>
              ))}
            </div>
            <div className="flex justify-center">
              <Link to="/clubs" className="px-8 py-3 bg-cardinal-red text-white font-bold rounded-lg hover:bg-red-700 transition-colors">
                {isEnglish ? 'View All Clubs' : 'Бүх клубыг харах'}
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* DOFE Programs */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-serif font-bold mb-4 text-black">{isEnglish ? 'DOFE Programs' : 'DOFE Хөтөлбөр'}</h2>
          <p className="text-gray-600 mb-12">{isEnglish ? 'Engage in diverse programs to develop skills and passions' : 'Янз бүрийн хөтөлбөрт оролцож дурлал, чадварыг хөгжүүлэх'}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {dofePrograms.map((program, i) => (
              <motion.div key={program.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="bg-white rounded-2xl p-6 hover:shadow-lg transition-shadow flex flex-col items-center text-center"
              >
                <div className="text-4xl mb-3">{program.emoji}</div>
                <h3 className="text-lg font-serif font-bold text-black">{isEnglish ? program.name.en : program.name.mn}</h3>
              </motion.div>
            ))}
          </div>
          <div className="flex justify-center">
            <Link to="/dofe" className="px-8 py-3 bg-cardinal-red text-white font-bold rounded-lg hover:bg-red-700 transition-colors">
              {isEnglish ? 'Learn More About DOFE' : 'DOFE-ийн талаар дэлгэрэнгүй'}
            </Link>
          </div>
        </div>
      </section>

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
