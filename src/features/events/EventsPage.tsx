import { motion } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { getEvents } from '../../lib/api';
import type { Event } from '../../lib/types';
import { bil } from '../../lib/utils';

export function EventsPage() {
  const { isEnglish } = useLanguage();
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPastEvents, setShowPastEvents] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  const now = new Date();
  const futureEvents = allEvents.filter(event => new Date(event.event_date) >= now);
  const pastEvents = allEvents.filter(event => new Date(event.event_date) < now);
  
  const displayEvents = showPastEvents ? pastEvents : futureEvents;

  // Get unique event types for filters
  const eventTypes = useMemo(() => {
    const types = new Set(displayEvents.map(e => e.event_type));
    return ['ALL', ...Array.from(types)];
  }, [displayEvents]);

  // Filter events by selected type
  const filteredEvents = selectedFilter === 'ALL' 
    ? displayEvents 
    : displayEvents.filter(e => e.event_type === selectedFilter);

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
    getEvents().then((data) => { setAllEvents(data); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-white pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="text-center py-32">
            <div className="inline-block w-8 h-8 border-3 border-cardinal-red border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="space-y-6">
            {/* Month header with navigation */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-4 md:gap-0">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-8">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-wider text-black whitespace-nowrap">{monthName.toUpperCase()}</h1>
                <span className="text-lg md:text-2xl font-bold text-gray-400">{year}</span>
              </div>
              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handlePrevMonth}
                  className="p-3 border-2 border-black hover:bg-black hover:text-white transition-all"
                >
                  <ChevronLeft size={24} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleNextMonth}
                  className="p-3 border-2 border-black hover:bg-black hover:text-white transition-all"
                >
                  <ChevronRight size={24} />
                </motion.button>
              </div>
            </div>

            {/* Filter buttons */}
            <div className="flex gap-2 mb-8 flex-wrap border-b-2 border-black pb-4">
              {eventTypes.map((type) => (
                <motion.button
                  key={type}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedFilter(type)}
                  className={`px-4 py-2 uppercase text-xs font-bold tracking-widest transition-all border-2 ${
                    selectedFilter === type
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-black border-black hover:bg-black hover:text-white'
                  }`}
                >
                  {type}
                </motion.button>
              ))}
              
              {/* Past/Upcoming toggle */}
              {futureEvents.length > 0 && pastEvents.length > 0 && (
                <div className="flex gap-2 ml-auto items-center border-l-2 border-black pl-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowPastEvents(false)}
                    className={`px-3 py-2 font-bold uppercase text-xs tracking-wider transition-all ${
                      !showPastEvents
                        ? 'text-cardinal-red border-b-2 border-cardinal-red'
                        : 'text-gray-500 hover:text-black'
                    }`}
                  >
                    Upcoming
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowPastEvents(true)}
                    className={`px-3 py-2 font-bold uppercase text-xs tracking-wider transition-all ${
                      showPastEvents
                        ? 'text-cardinal-red border-b-2 border-cardinal-red'
                        : 'text-gray-500 hover:text-black'
                    }`}
                  >
                    Past
                  </motion.button>
                </div>
              )}
            </div>

            {/* Calendar Grid */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ duration: 0.4 }}
              className="border-2 border-black"
            >
              {/* Day headers */}
              <div className="grid grid-cols-7 border-b-2 border-black bg-black text-white">
                {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
                  <div key={day} className="p-4 text-center font-bold uppercase text-xs tracking-widest border-r border-white last:border-r-0">
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
                      transition={{ delay: idx * 0.01 }}
                      whileHover={{ scale: 1.02, zIndex: 10 }}
                      className={`relative min-h-40 border-r border-b border-black ${
                        !isCurrentMonth ? 'bg-gray-50' : 'bg-white'
                      } ${idx % 7 === 6 ? 'border-r-0' : ''} ${idx >= grid.length - 7 ? 'border-b-0' : ''}`}
                    >
                      {/* Date number */}
                      <div className={`absolute top-3 left-3 text-sm font-bold ${eventCount > 0 ? 'text-white' : (isCurrentMonth ? 'text-black' : 'text-gray-400')}`}>
                        {dateNum}
                      </div>

                      {/* Events - fill entire cell, split by count */}
                      {eventCount > 0 ? (
                        <div className={`h-full grid gap-0.5`} style={{ gridTemplateRows: `repeat(${eventCount}, 1fr)` }}>
                          {dayEvents.map((event) => (
                            <motion.button
                              key={event.id}
                              onClick={() => setSelectedEvent(event)}
                              className="w-full bg-cardinal-red text-white px-2 py-1 text-xs font-bold uppercase tracking-wide flex items-center justify-center overflow-hidden cursor-pointer"
                              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', whiteSpace: 'normal', wordWrap: 'break-word', overflow: 'hidden', textOverflow: 'ellipsis', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}
                              title={bil(isEnglish, event.title_en, event.title_mn)}
                            >
                              {bil(isEnglish, event.title_en, event.title_mn)}
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
            <div className="mt-8 flex gap-6 text-xs font-bold">
              <div className="flex items-center gap-2">
                <div className="w-16 h-6 bg-cardinal-red" />
                <span className="uppercase tracking-wide">Events</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Event detail modal */}
      {selectedEvent && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedEvent(null)}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 pt-32"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white max-w-2xl w-full shadow-2xl border-2 border-black"
          >
            {selectedEvent.image && (
              <div className="h-64 overflow-hidden border-b-2 border-black">
                <img src={selectedEvent.image} alt={bil(isEnglish, selectedEvent.title_en, selectedEvent.title_mn)} className="w-full h-full object-cover" />
              </div>
            )}

            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-black mb-2">
                    {bil(isEnglish, selectedEvent.title_en, selectedEvent.title_mn)}
                  </h2>
                  <div className="w-12 h-1 bg-cardinal-red" />
                </div>
                <button 
                  onClick={() => setSelectedEvent(null)} 
                  className="text-2xl font-bold text-gray-500 hover:text-black"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-6 text-sm">
                <div>
                  <div className="font-bold uppercase text-gray-600 text-xs tracking-widest mb-1">Date</div>
                  <div className="text-black font-bold">{new Date(selectedEvent.event_date).toLocaleDateString(isEnglish ? 'en-US' : 'mn-MN')}</div>
                </div>
                {selectedEvent.location && (
                  <div>
                    <div className="font-bold uppercase text-gray-600 text-xs tracking-widest mb-1">Location</div>
                    <div className="text-black font-bold">{selectedEvent.location}</div>
                  </div>
                )}
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed">
                {bil(isEnglish, selectedEvent.description_en, selectedEvent.description_mn)}
              </p>

              <div className="inline-block bg-black text-white px-4 py-2 font-bold uppercase text-xs tracking-widest">
                {selectedEvent.event_type_display}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
