import { motion } from 'framer-motion';
import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import serviceClubsData from '../../content/student-life/serviceClubs.json';

interface Club {
  id: string;
  name: string;
  description: string;
}

export function ServiceClubsSection() {
  const { isEnglish } = useLanguage();
  const [searchText, setSearchText] = useState('');

  const getText = (obj: { en: string; mn: string }) => isEnglish ? obj.en : obj.mn;

  const serviceClubs: Club[] = serviceClubsData.clubs.map(club => ({
    ...club,
    name: getText(club.name),
    description: getText(club.description),
  }));

  const filteredClubs = searchText
    ? serviceClubs.filter(club =>
        club.name.toLowerCase().includes(searchText.toLowerCase()) ||
        club.description.toLowerCase().includes(searchText.toLowerCase())
      )
    : serviceClubs;

  return (
    <div className="w-full bg-white">
      {/* Title Section */}
      <section className="py-12 bg-white border-b border-black border-opacity-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-black mb-4">
              {getText(serviceClubsData.title)}
            </h1>
            <p className="text-lg text-black text-opacity-70">
              {getText(serviceClubsData.description)}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 bg-white border-b border-black border-opacity-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <input
            type="text"
            placeholder={isEnglish ? 'Search clubs...' : 'Клубыг хайх...'}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full max-w-md px-4 py-3 border-2 border-cardinal-red rounded-lg focus:outline-none focus:ring-2 focus:ring-cardinal-red"
          />
        </div>
      </section>

      {/* Service Clubs Grid */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredClubs.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={{
                visible: {
                  transition: { staggerChildren: 0.05 },
                },
              }}
              initial="hidden"
              animate="visible"
            >
              {filteredClubs.map((club, index) => (
                <motion.div
                  key={club.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-lg overflow-hidden border-l-4 border-cardinal-red hover:shadow-lg transition-shadow"
                >
                  {/* Photo Section */}
                  <div className="h-40 bg-black flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-white text-sm font-semibold">Featured Photo</p>
                    </div>
                  </div>
                  {/* Content Section */}
                  <div className="p-6">
                    <h3 className="text-lg font-serif font-bold text-black mb-3">
                      {club.name}
                    </h3>
                    <p className="text-black text-opacity-70 leading-relaxed">
                      {club.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-12">
              <p className="text-black text-opacity-60">
                {isEnglish ? 'No clubs found' : '╨Ü╨╗╤â╨▒ ╨╛╨╗╨┤╤ü╨╛╨╜╨│╥»╨╣'}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
