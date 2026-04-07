import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { getClubs } from '../../lib/api';
import type { Club } from '../../lib/types';
import { bil } from '../../lib/utils';


export function ClubsPage() {
  const { isEnglish } = useLanguage();
  const [studentClubs, setStudentClubs] = useState<Club[]>([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    getClubs('student').then(setStudentClubs).catch(() => {});
  }, []);

  const filteredClubs = searchText
    ? studentClubs.filter(club =>
        bil(isEnglish, club.name_en, club.name_mn).toLowerCase().includes(searchText.toLowerCase()) ||
        bil(isEnglish, club.description_en, club.description_mn).toLowerCase().includes(searchText.toLowerCase())
      )
    : studentClubs;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-black text-white py-32 md:py-44 flex items-center justify-center">
        <motion.div
          className="text-center max-w-4xl px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">{isEnglish ? 'All Clubs' : 'Бүх клубууд'}</h1>
          <p className="text-xl md:text-2xl text-gray-300">
            {isEnglish ? 'Explore our diverse range of student clubs and find your passion' : 'Бидний сонирхолтой клубыг сайтаж, өөрийнхөө дурлалыг олоорой'}
          </p>
        </motion.div>
      </section>

      {/* Search and Filter */}
      <motion.section
        className="py-12 bg-slate-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="max-w-md mx-auto">
            <input
              type="text"
              placeholder={isEnglish ? 'Search clubs...' : 'Клуб хайх...'}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full px-4 py-3 border-2 border-cardinal-red rounded-lg focus:outline-none focus:ring-2 focus:ring-cardinal-red"
            />
          </div>
        </div>
      </motion.section>

      {/* Clubs Grid */}
      <motion.section
        className="py-20 bg-white"
        variants={containerVariants}
        initial="visible"
        animate="visible"
      >
        <div className="container mx-auto px-4 max-w-7xl">
          {filteredClubs.length > 0 ? (
            <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredClubs.map((club) => (
                <motion.div
                  key={club.id}
                  variants={itemVariants}
                  className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg hover:border-cardinal-red border-2 border-transparent transition-all"
                >
                  <div className="flex items-start gap-4 mb-4">
                    {club.image_url && (
                      <img src={club.image_url} alt={bil(isEnglish, club.name_en, club.name_mn)} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
                    )}
                    <h3 className="text-lg font-serif font-bold text-black flex-1">
                      {bil(isEnglish, club.name_en, club.name_mn)}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm">{bil(isEnglish, club.description_en, club.description_mn)}</p>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div variants={itemVariants} className="text-center py-12 text-gray-500">
              <p className="text-lg">{isEnglish ? 'No clubs found' : 'Ямар ч клуб олдсонгүй'}</p>
            </motion.div>
          )}
        </div>
      </motion.section>
    </div>
  );
}
