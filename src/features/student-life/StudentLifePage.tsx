import { motion } from 'framer-motion';
import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { bil, formatDate } from '../../lib/utils';
import { pageText } from '../../data/pageText';
import clubsData from '../../content/clubs.json';
import eventsData from '../../content/events.json';
import newsData from '../../content/studentNews.json';
import { FaList, FaBook, FaTrophy, FaMusic, FaHandsHelping, FaCalendarAlt, FaNewspaper, FaStar, FaRunning } from 'react-icons/fa';

type FilterType = 'overview' | 'clubs-academic' | 'clubs-athletics' | 'clubs-arts' | 'clubs-service' | 'events' | 'news';

interface Club {
  id: number;
  name_en: string;
  name_mn: string;
  description_en: string;
  description_mn: string;
  image_url: string;
  category: string;
}

interface Event {
  id: number;
  title_en: string;
  title_mn: string;
  description_en: string;
  description_mn: string;
  image: string;
  event_date: string;
  event_type: string;
  location: string;
}

interface News {
  id: number;
  title: { en: string; mn: string };
  excerpt: { en: string; mn: string };
  content: { en: string; mn: string };
  heroImage: string;
  date: string;
  type: string;
  featured: boolean;
}

export function StudentLifePage() {
  const { isEnglish, t } = useLanguage();
  const ui = pageText.studentLife;
  
  const [activeFilter, setActiveFilter] = useState<FilterType>('overview');
  
  const clubs: Club[] = clubsData;
  const events: Event[] = eventsData;
  const news: News[] = newsData.news;

  const getClubsByCategory = (category: string) => {
    return clubs.filter((c: any) => {
      if (category === 'academic') {
        return c.name_en?.includes('Robotics') || c.name_en?.includes('Chemistry') || c.name_en?.includes('Physics') || c.name_en?.includes('German') || c.name_en?.includes('Debate');
      }
      if (category === 'athletics') {
        return c.name_en?.includes('Sports') || c.name_en?.includes('Basketball');
      }
      if (category === 'arts') {
        return c.name_en?.includes('Media') || c.name_en?.includes('Crochet') || c.name_en?.includes('Theater');
      }
      if (category === 'service') {
        return c.name_en?.includes('Environmental') || c.name_en?.includes('Volunteer');
      }
      return false;
    });
  };

  const getFilteredContent = () => {
    switch (activeFilter) {
      case 'clubs-academic':
        return getClubsByCategory('academic');
      case 'clubs-athletics':
        return getClubsByCategory('athletics');
      case 'clubs-arts':
        return getClubsByCategory('arts');
      case 'clubs-service':
        return getClubsByCategory('service');
      case 'events':
        return events;
      case 'news':
        return news;
      case 'overview':
      default:
        return clubs.slice(0, 6);
    }
  };

  const filteredContent = getFilteredContent();
  const featuredClub = clubs[0];
  const topClubs = clubs.slice(0, 3);
  const upcomingEvents = events.slice(0, 3);

  return (
    <div className="min-h-screen bg-white pt-24">
      <div className="flex gap-0">
        
        {/* ════ SIDEBAR (LEFT) ════ */}
        <motion.aside
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-56 bg-white border-l-2 border-r-2 border-black sticky top-24 h-screen overflow-y-auto"
        >
          <div className="p-0">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-600 px-6 pt-6 mb-4">
                {isEnglish ? 'Categories' : 'Ангилал'}
              </p>
              <nav className="space-y-0 border-t-2 border-b-2 border-black">
                {[
                  { filter: 'overview' as FilterType, label: 'Overview', Icon: FaList },
                  { filter: 'clubs-academic' as FilterType, label: 'Academic Clubs', Icon: FaBook },
                  { filter: 'clubs-athletics' as FilterType, label: 'Athletics', Icon: FaTrophy },
                  { filter: 'clubs-arts' as FilterType, label: 'Arts & Music', Icon: FaMusic },
                  { filter: 'clubs-service' as FilterType, label: 'Service Clubs', Icon: FaHandsHelping },
                  { filter: 'events' as FilterType, label: 'Events', Icon: FaCalendarAlt },
                  { filter: 'news' as FilterType, label: 'News Archive', Icon: FaNewspaper },
                ].map(({ filter, label, Icon }) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`w-full text-left px-6 py-4 font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-3 border-b border-gray-300 ${
                      activeFilter === filter
                        ? 'bg-cardinal-red text-white border-b border-cardinal-red'
                        : 'text-black hover:bg-gray-50 hover:border-b hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </motion.aside>

        {/* ════ MAIN CONTENT ════ */}
        <div className="flex-1 pb-20">
          
          {activeFilter === 'overview' && (
            <>
              {/* Featured Article Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-2 bg-white border-b border-gray-300"
              >
                {/* Left: Hero Image */}
                <div className="relative h-96 bg-black overflow-hidden">
                  <img
                    src={featuredClub?.image_url || 'https://images.pexels.com/photos/3825517/pexels-photo-3825517.jpeg?w=800&h=600&fit=crop'}
                    alt="featured"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Right: Content */}
                <div className="p-12 flex flex-col justify-center">
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-cardinal-red text-white text-xs font-bold uppercase tracking-widest">
                      {isEnglish ? 'Exclusive' : 'Онцлох'}
                    </span>
                  </div>
                  <h2 className="text-5xl font-black uppercase tracking-tight text-black mb-6 leading-none">
                    {isEnglish ? 'Student Archive' : 'Оюутан Архив'}
                  </h2>
                  <p className="text-sm text-gray-700 leading-relaxed mb-8">
                    {isEnglish
                      ? 'Explore our comprehensive student clubs and activities archive. Connect with peers, discover new interests, and make an impact on campus.'
                      : 'Манай оюутнуудын клуб ба үйл ажиллагааны архивыг үзнэ үү. Найздаа холбог, шинэ сонирхлыг нээж авах.'}
                  </p>
                  <button className="inline-block px-6 py-3 bg-black text-white font-bold uppercase text-xs tracking-widest hover:bg-gray-800 transition-colors w-fit">
                    {isEnglish ? 'Read Full Article' : 'Бүтэн уг унших'}
                  </button>
                </div>
              </motion.div>

              {/* Metadata Bar */}
              <div className="grid grid-cols-4 bg-gray-100 border-b border-gray-300">
                <div className="px-6 py-4 border-r border-gray-300">
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-600">
                    {isEnglish ? 'Date' : 'Огноо'}
                  </p>
                  <p className="text-sm font-bold text-black mt-1">April 19, 2026</p>
                </div>
                <div className="px-6 py-4 border-r border-gray-300">
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-600">
                    {isEnglish ? 'Location' : 'Байршил'}
                  </p>
                  <p className="text-sm font-bold text-black mt-1">{isEnglish ? 'Main Campus' : 'Үндсэн сайн'}</p>
                </div>
                <div className="px-6 py-4 border-r border-gray-300">
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-600">
                    {isEnglish ? 'Volume' : 'Эзлэхүүн'}
                  </p>
                  <p className="text-sm font-bold text-black mt-1">{clubs.length} Clubs</p>
                </div>
                <div className="px-6 py-4">
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-600">
                    {isEnglish ? 'Status' : 'Статус'}
                  </p>
                  <p className="text-sm font-bold text-black mt-1">{isEnglish ? 'Active' : 'Идэвхтэй'}</p>
                </div>
              </div>

              {/* Three-Column Showcase */}
              <div className="grid grid-cols-3 bg-white border-2 border-black">
                
                {/* Clubs of the Month */}
                <div className="border-r-2 border-black p-8">
                  <h3 className="text-base font-black uppercase tracking-widest text-black mb-6 flex items-center gap-3">
                    <FaStar className="w-5 h-5" /> {isEnglish ? 'Clubs of the Month' : 'Сарын Клубууд'}
                  </h3>
                  <div className="space-y-4">
                    {topClubs.map((club) => (
                      <div key={club.id} className="flex gap-4">
                        <div className="w-12 h-12 bg-black flex-shrink-0 flex items-center justify-center text-white font-black">
                          {club.name_en[0]}
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-bold uppercase tracking-widest text-black">
                            {isEnglish ? club.name_en : club.name_mn}
                          </p>
                          <p className="text-xs text-gray-600 mt-1">
                            {clubs.filter(c => c.category === club.category).length} {isEnglish ? 'Members' : 'Гишүүн'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-8 py-3 text-xs font-bold uppercase tracking-widest border-t border-gray-300 text-center text-gray-700 hover:text-black transition-colors">
                    {isEnglish ? 'View All 64 Organizations' : 'Бүх 64 байгууллагыг үзэх'}
                  </button>
                </div>

                {/* Marquee Events */}
                <div className="border-r-2 border-black p-8">
                  <h3 className="text-base font-black uppercase tracking-widest text-black mb-6 flex items-center gap-3">
                    <FaCalendarAlt className="w-5 h-5" /> {isEnglish ? 'Marquee Events' : 'Үндсэн Үйл Явдал'}
                  </h3>
                  <div className="space-y-6">
                    {upcomingEvents.map((event) => (
                      <div key={event.id}>
                        <p className="text-2xl font-black text-black">
                          {new Date(event.event_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </p>
                        <p className="text-xs font-bold uppercase tracking-widest text-black mt-2">
                          {isEnglish ? event.title_en : event.title_mn}
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                          {event.location} • {new Date(event.event_date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Athletics Highlights */}
                <div className="p-8">
                  <h3 className="text-base font-black uppercase tracking-widest text-black mb-6 flex items-center gap-3">
                    <FaRunning className="w-5 h-5" /> {isEnglish ? 'Athletics Highlights' : 'Спортын Онцлог'}
                  </h3>
                  <div className="space-y-4">
                    <div className="bg-black h-40 rounded overflow-hidden">
                      <img
                        src="https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?w=400&h=300&fit=crop"
                        alt="sports"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-black">
                        {isEnglish ? 'Basketball • Win vs Metro' : 'Сагс • Метро-д хүл ялалт'}
                      </p>
                      <p className="text-2xl font-black text-black mt-2">12-0</p>
                      <p className="text-xs text-gray-600">
                        {isEnglish ? 'Tennis Streak' : 'Теннис Уралдаан'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeFilter !== 'overview' && (
            <div className="p-8 max-w-6xl">
              <h2 className="text-3xl font-black uppercase tracking-wider text-black mb-8">
                {activeFilter === 'clubs-academic' && (isEnglish ? 'Academic Clubs' : 'Сурган хүмүүжүүлэх Клуб')}
                {activeFilter === 'clubs-athletics' && (isEnglish ? 'Athletics' : 'Спортын Клуб')}
                {activeFilter === 'clubs-arts' && (isEnglish ? 'Arts & Music' : 'Урлаг ба Хөгжим')}
                {activeFilter === 'clubs-service' && (isEnglish ? 'Service Clubs' : 'Үйлчилгээний Клуб')}
                {activeFilter === 'events' && (isEnglish ? 'Events' : 'Үйл явдал')}
                {activeFilter === 'news' && (isEnglish ? 'News Archive' : 'Мэдээний архив')}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredContent.slice(0, 12).map((item: any) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="border border-gray-300 overflow-hidden hover:shadow-lg transition-all"
                  >
                    <div className="relative h-48 bg-gray-100 overflow-hidden border-b border-gray-300">
                      <img
                        src={item.image_url || item.image || 'https://images.pexels.com/photos/3825517/pexels-photo-3825517.jpeg?w=500&h=300&fit=crop'}
                        alt="item"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-sm font-bold uppercase tracking-wide text-black mb-2 line-clamp-2">
                        {isEnglish ? (item.name_en || item.title_en) : (item.name_mn || item.title_mn)}
                      </h3>
                      <p className="text-xs text-gray-700 line-clamp-3 mb-4">
                        {isEnglish ? item.description_en : item.description_mn}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
