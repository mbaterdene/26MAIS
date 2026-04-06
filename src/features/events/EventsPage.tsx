import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { Calendar } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { getEvents } from '../../lib/api';
import type { Event } from '../../lib/types';
import { bil, formatDate, truncateWords } from '../../lib/utils';

export function EventsPage() {
  const { isEnglish, t } = useLanguage();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getEvents().then((data) => { setEvents(data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-16">
          <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-black/60 bg-black/10 px-3 py-1 rounded-full mb-6">
            {t('Events', 'Үйл ажиллагаа')}
          </span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-black mb-6">
            {t('Events Calendar', 'Үйл ажиллагааны хуанли')}
          </h1>
          <p className="text-xl max-w-2xl mx-auto font-sans text-gray-700">
            {t('Stay updated with all school events and activities.', 'Сургуулийн бүх үйл ажиллагаанаас мэдлэгтэй байгаарай.')}
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center py-20 text-gray-500">{t('Loading...', 'Ачааллаж байна...')}</div>
        ) : events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-cardinal-red/20 group"
              >
                <div className="h-48 overflow-hidden">
                  {event.image ? (
                    <img src={event.image} alt={bil(isEnglish, event.title_en, event.title_mn)} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-digital-blue/10 to-cardinal-red/10 flex items-center justify-center">
                      <Calendar size={48} className="text-gray-300" />
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    {event.event_type_display && (
                      <span className="text-xs font-bold uppercase tracking-wider text-digital-blue bg-digital-blue/10 px-2 py-1 rounded">{event.event_type_display}</span>
                    )}
                    <span className="text-sm text-gray-400">{formatDate(event.event_date)}</span>
                  </div>
                  <h3 className="text-xl font-serif font-bold text-black mb-3 group-hover:text-cardinal-red transition-colors">
                    {bil(isEnglish, event.title_en, event.title_mn)}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                    {truncateWords(bil(isEnglish, event.description_en, event.description_mn), 25)}
                  </p>
                  {event.location && <p className="text-xs text-gray-400">📍 {event.location}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500">{t('No events available.', 'Одоогоор үйл ажиллагаа байхгүй байна.')}</div>
        )}
      </div>
    </div>
  );
}
