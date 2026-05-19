import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { getClubs } from '../../lib/api';
import type { Club } from '../../lib/types';
import { bil } from '../../lib/utils';

// IDs of clubs classified as "academic"
const ACADEMIC_CLUB_IDS = [1, 2, 3, 6, 7, 8, 11];

export function AcademicClubsSection() {
  const { isEnglish } = useLanguage();
  const [academicClubs, setAcademicClubs] = useState<Club[]>([]);
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const allClubs = await getClubs('student');
        // Filter to only academic clubs
        const filtered = allClubs.filter(club => ACADEMIC_CLUB_IDS.includes(club.id));
        setAcademicClubs(filtered);
      } catch (error) {
        console.error('Failed to fetch academic clubs:', error);
        setAcademicClubs([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchClubs();
  }, []);

  const filteredClubs = searchText
    ? academicClubs.filter(club =>
        bil(isEnglish, club.name_en, club.name_mn).toLowerCase().includes(searchText.toLowerCase()) ||
        bil(isEnglish, club.description_en, club.description_mn).toLowerCase().includes(searchText.toLowerCase())
      )
    : academicClubs;

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white border-b-2 border-black pb-8 mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-widest text-black mb-2">
            {isEnglish ? 'Academic Clubs' : 'Akademik Clubs'}
          </h1>
          <p className="text-sm font-bold uppercase tracking-wide text-gray-700">
            {isEnglish ? 'Intellectual pursuits and knowledge advancement' : 'Knowledge and skill development'}
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="relative w-full md:w-80">
            <Search size={18} className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder={isEnglish ? 'Search clubs...' : 'Clubs search...'}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border-2 border-black text-sm outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </motion.div>

        {/* Clubs Grid */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {isLoading ? (
            <motion.div variants={itemVariants} className="text-center py-12 bg-white border-2 border-black">
              <p className="text-sm font-bold uppercase text-gray-500">
                {isEnglish ? 'Loading academic clubs...' : 'Academic clubs loading...'}
              </p>
            </motion.div>
          ) : filteredClubs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredClubs.map((club) => (
                <motion.div
                  key={club.id}
                  variants={itemVariants}
                  className="bg-white border-2 border-black p-5 hover:shadow-lg transition-all group"
                >
                  <div className="flex items-start gap-3 mb-3">
                    {club.image_url && (
                      <img 
                        src={club.image_url} 
                        alt={bil(isEnglish, club.name_en, club.name_mn)} 
                        className="w-12 h-12 object-cover flex-shrink-0 border border-black" 
                      />
                    )}
                    <h3 className="text-sm font-black uppercase tracking-wide text-black group-hover:text-cardinal-red transition-colors">
                      {bil(isEnglish, club.name_en, club.name_mn)}
                    </h3>
                  </div>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    {bil(isEnglish, club.description_en, club.description_mn)}
                  </p>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div variants={itemVariants} className="text-center py-12 bg-white border-2 border-black">
              <p className="text-sm font-bold uppercase text-gray-500">
                {isEnglish ? 'No academic clubs found' : 'Academic clubs not found'}
              </p>
            </motion.div>
          )}
        </motion.section>
      </div>
    </div>
  );
}
