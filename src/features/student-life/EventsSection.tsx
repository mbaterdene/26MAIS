import { motion } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { getEvents } from '../../lib/api';
import type { Event } from '../../lib/types';
import { bil, formatDate, truncateWords } from '../../lib/utils';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export function EventsSection() {
  const { isEnglish } = useLanguage();
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  const now = new Date();
  const upcomingEvents = allEvents.filter(event => new Date(event.event_date) >= now);

  // Get unique event types for filters
  const eventTypes = useMemo(() => {
    const types = new Set(upcomingEvents.map(e => e.event_type));
    return ['ALL', ...Array.from(types)];
  }, [upcomingEvents]);

  // Filter events by selected type
  const filteredEvents = selectedFilter === 'ALL' 
    ? upcomingEvents 
    : upcomingEvents.filter(e => e.event_type === selectedFilter);

  // Generate calendar grid for current month
  const generateCalendarGrid = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const grid = [];
    const current = new Date(startDate);
    while (grid.length < 42) {
      grid.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return grid;
  };

  const getDateEvents = (date: Date) => {
    return filteredEvents.filter(event => {
      const eventDate = new Date(event.event_date).toDateString();
      return date.toDateString() === eventDate;
    });
  };

  const grid = generateCalendarGrid();
  const monthName = currentDate.toLocaleDateString(isEnglish ? 'en-US' : 'mn-MN', { month: 'long' });
  const year = currentDate.getFullYear();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  useEffect(() => {
    getEvents(false)
      .then(setAllEvents)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="w-full">
      {/* Calendar and Events Section */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-500">{isEnglish ? 'Loading events...' : '╥«╨╣╨╗ ╤Å╨▓╨┤╨╗╤ï╨│ ╨░╤ç╨░╨░╨╗╨╢ ╨▒╨░╨╣╨╜╨░...'}</p>
            </div>
          ) : (
            <div className="space-y-12">
              {/* Month header with navigation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4 md:gap-0">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
                    <h2 className="text-4xl md:text-5xl font-bold text-black uppercase tracking-wider">
                      {monthName.toUpperCase()}
                    </h2>
                    <span className="text-lg md:text-2xl font-bold text-gray-400 uppercase tracking-wide">
                      {isEnglish ? 'Academic Year' : '╨É╨║╨░╨┤╨╡╨╝╨╕╨║ ╨╢╨╕╨╗'} {year}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handlePrevMonth}
                      className="p-2 md:p-3 border border-gray-300 hover:border-black hover:bg-black hover:text-white transition-all"
                    >
                      <ChevronLeft size={20} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleNextMonth}
                      className="p-2 md:p-3 border border-gray-300 hover:border-black hover:bg-black hover:text-white transition-all"
                    >
                      <ChevronRight size={20} />
                    </motion.button>
                  </div>
                </div>

                {/* Filter buttons */}
                <div className="flex gap-2 mb-6 flex-wrap border-b border-gray-300 pb-4">
                  {eventTypes.map((type) => (
                    <motion.button
                      key={type}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedFilter(type)}
                      className={`px-3 md:px-4 py-2 uppercase text-xs font-bold tracking-widest transition-all ${
                        selectedFilter === type
                          ? 'bg-black text-white'
                          : 'bg-white text-black border border-gray-300 hover:border-black'
                      }`}
                    >
                      {type}
                    </motion.button>
                  ))}
                </div>
              </motion.div>

              {/* Calendar Grid */}
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ duration: 0.4 }}
                className="border border-gray-300 overflow-x-auto"
              >
                {/* Day headers */}
                <div className="grid grid-cols-7 border-b border-gray-300 bg-gray-50 min-w-full">
                  {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
                    <div key={day} className="p-2 md:p-4 text-center font-bold uppercase text-xs tracking-widest text-gray-700 border-r border-gray-300 last:border-r-0">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar cells */}
                <div className="grid grid-cols-7">
                  {grid.map((date, idx) => {
                    const isCurrentMonth = date.getMonth() === currentDate.getMonth();
                    const dayEvents = getDateEvents(date);
                    const dateNum = date.getDate();
                    const eventCount = dayEvents.length;

                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: idx * 0.005 }}
                        className={`relative min-h-24 md:min-h-32 border-r border-b border-gray-300 ${
                          !isCurrentMonth ? 'bg-gray-100' : 'bg-white'
                        } ${idx % 7 === 6 ? 'border-r-0' : ''} ${idx >= grid.length - 7 ? 'border-b-0' : ''}`}
                      >
                        {/* Date number */}
                        <div className={`absolute top-1 md:top-2 left-1 md:left-3 text-xs md:text-sm font-bold ${eventCount > 0 ? 'text-white' : (isCurrentMonth ? 'text-black' : 'text-gray-400')}`}>
                          {dateNum}
                        </div>

                        {/* Events */}
                        {eventCount > 0 ? (
                          <div className={`h-full grid gap-0 pt-5 md:pt-6`} style={{ gridTemplateRows: `repeat(${Math.min(eventCount, 3)}, 1fr)` }}>
                            {dayEvents.slice(0, 3).map((event) => (
                              <motion.button
                                key={event.id}
                                onClick={() => setSelectedEvent(event)}
                                className="w-full bg-cardinal-red text-white px-0.5 md:px-1 py-0.5 text-xs font-bold uppercase tracking-wide flex items-center justify-center overflow-hidden cursor-pointer hover:bg-red-700 transition-colors border-t border-red-700"
                                title={bil(isEnglish, event.title_en, event.title_mn)}
                              >
                                <span className="truncate text-center px-0.5">{bil(isEnglish, event.title_en, event.title_mn)}</span>
                              </motion.button>
                            ))}
                          </div>
                        ) : null}
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Legend */}
              <div className="flex gap-6 text-xs font-bold">
                <div className="flex items-center gap-2">
                  <div className="w-12 h-4 bg-cardinal-red" />
                  <span className="uppercase tracking-wide">{isEnglish ? 'Events' : '╥«╨╣╨╗ ╤Å╨▓╨┤╨░╨╗'}</span>
                </div>
              </div>

              {/* Featured Event and Stats Section */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 pt-6 border-t border-gray-300">
                {/* Featured Event */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="lg:col-span-2 border border-gray-300 p-6 md:p-8"
                >
                  <h3 className="text-sm font-bold uppercase tracking-widest text-gray-600 mb-4">
                    {isEnglish ? 'Featured Event' : '╨₧╨╜╤å╨╗╨╛╤à ╥»╨╣╨╗ ╤Å╨▓╨┤╨░╨╗'}
                  </h3>
                  
                  {filteredEvents.length > 0 ? (
                    <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                      {filteredEvents[0].image && (
                        <div className="w-full md:w-48 h-40 md:h-32 overflow-hidden bg-black">
                          <img
                            src={filteredEvents[0].image}
                            alt={bil(isEnglish, filteredEvents[0].title_en, filteredEvents[0].title_mn)}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <h2 className="text-2xl md:text-3xl font-bold text-black mb-3 uppercase tracking-wide">
                          {bil(isEnglish, filteredEvents[0].title_en, filteredEvents[0].title_mn)}
                        </h2>
                        <p className="text-gray-600 text-sm md:text-base mb-4 leading-relaxed">
                          {truncateWords(bil(isEnglish, filteredEvents[0].description_en, filteredEvents[0].description_mn), 50)}
                        </p>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedEvent(filteredEvents[0])}
                          className="bg-white border border-black text-black px-4 md:px-6 py-2 md:py-3 font-bold uppercase text-xs tracking-widest hover:bg-black hover:text-white transition-colors"
                        >
                          {isEnglish ? 'Details & Registration' : '╨ö╤ì╨╗╨│╤ì╤Ç╤ì╨╜╨│╥»╨╣ & ╨æ╥»╤Ç╤é╨│╥»╥»╨╗╤ì╤à'}
                        </motion.button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-500">{isEnglish ? 'No featured event available.' : '╨₧╨╜╤å╨╗╨╛╤à ╥»╨╣╨╗ ╤Å╨▓╨┤╨░╨╗ ╨▒╨░╨╣╤à╨│╥»╨╣.'}</p>
                  )}
                </motion.div>

                {/* Monthly Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-black text-white p-6 md:p-8"
                >
                  <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-8">
                    {isEnglish ? 'Monthly Stats' : '╨í╨░╤Ç╤ï╨╜ ╤ü╤é╨░╤é╨╕╤ü╤é╨╕╨║'}
                  </h3>
                  <div className="space-y-8">
                    <div>
                      <div className="text-4xl md:text-5xl font-bold mb-1">{filteredEvents.length}</div>
                      <p className="text-xs md:text-sm uppercase tracking-widest text-gray-400">
                        {isEnglish ? 'Events' : '╥«╨╣╨╗ ╤Å╨▓╨┤╨░╨╗'}
                      </p>
                    </div>
                    <div>
                      <div className="text-4xl md:text-5xl font-bold mb-1">{eventTypes.length - 1}</div>
                      <p className="text-xs md:text-sm uppercase tracking-widest text-gray-400">
                        {isEnglish ? 'Categories' : '╨É╨╜╨│╨╕╨╗╨╗╨░╨╗'}
                      </p>
                    </div>
                    <div>
                      <div className="text-4xl md:text-5xl font-bold mb-1">{Math.ceil(filteredEvents.length / 4)}</div>
                      <p className="text-xs md:text-sm uppercase tracking-widest text-gray-400">
                        {isEnglish ? 'Weeks' : '╨ö╨╛╨╗╨╛╨╛ ╤à╨╛╨╜╨╛╨│'}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Event detail modal */}
      {selectedEvent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedEvent(null)}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white max-w-2xl w-full shadow-2xl rounded-2xl overflow-hidden"
          >
            {selectedEvent.image && (
              <div className="h-64 overflow-hidden">
                <img src={selectedEvent.image} alt={bil(isEnglish, selectedEvent.title_en, selectedEvent.title_mn)} className="w-full h-full object-cover" />
              </div>
            )}
            <div className="p-8">
              <p className="text-sm text-gray-400 font-semibold mb-2">{formatDate(selectedEvent.event_date)}</p>
              <h2 className="text-3xl font-serif font-bold text-black mb-4">{bil(isEnglish, selectedEvent.title_en, selectedEvent.title_mn)}</h2>
              <p className="text-gray-600 leading-relaxed mb-6">{bil(isEnglish, selectedEvent.description_en, selectedEvent.description_mn)}</p>
              <div className="flex gap-4">
                <Link
                  to={`/events/${selectedEvent.id}`}
                  className="flex-1 bg-cardinal-red text-white px-6 py-3 font-bold rounded-lg hover:bg-red-700 transition-colors text-center"
                >
                  {isEnglish ? 'View Details' : '╨ö╤ì╨╗╨│╤ì╤Ç╤ì╨╜╨│╥»╨╣ ╥»╨╖╤ì╤à'}
                </Link>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedEvent(null)}
                  className="px-6 py-3 border-2 border-gray-300 rounded-lg hover:border-black transition-colors"
                >
                  {isEnglish ? 'Close' : '╨Ñ╨░╨░╤à'}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
