import { motion } from 'framer-motion';
import { useState } from 'react';
import { Search } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface Club {
  id: string;
  name: string;
  description: string;
}

export function AcademicClubsSection() {
  const { isEnglish } = useLanguage();
  const [searchText, setSearchText] = useState('');

  const clubs: Club[] = [
    {
      id: 'mogul-robotic',
      name: isEnglish ? 'Mogul Robotics' : 'Mogul Robotics',
      description: isEnglish
        ? 'Build and program robots through hands-on engineering projects'
        : 'Robot learning through projects',
    },
    {
      id: 'chemhack',
      name: isEnglish ? 'ChemHack' : 'ChemHack',
      description: isEnglish
        ? 'Explore chemistry through interactive experiments and challenges'
        : 'Interactive chemistry learning',
    },
    {
      id: 'momentum-physics',
      name: isEnglish ? 'Momentum Physics' : 'Momentum Physics',
      description: isEnglish
        ? 'Discover physics through dynamic experiments and real-world applications'
        : 'Physics through experiments',
    },
    {
      id: 'german-club',
      name: isEnglish ? 'German Language Club' : 'German Club',
      description: isEnglish
        ? 'Master German language and culture'
        : 'German language learning',
    },
    {
      id: 'chinese-club',
      name: isEnglish ? 'Chinese Language Club' : 'Chinese Club',
      description: isEnglish
        ? 'Develop Chinese language skills and understand Chinese culture'
        : 'Chinese language learning',
    },
    {
      id: 'ecobusiness',
      name: isEnglish ? 'EcoBusiness' : 'EcoBusiness',
      description: isEnglish
        ? 'Learn sustainable business practices and environmental entrepreneurship'
        : 'Sustainable business learning',
    },
    {
      id: 'money-mind',
      name: isEnglish ? 'Money Mind' : 'Money Mind',
      description: isEnglish
        ? 'Master financial literacy and investment strategies'
        : 'Financial literacy training',
    },
    {
      id: 'book-club',
      name: isEnglish ? 'Book Club' : 'Book Club',
      description: isEnglish
        ? 'Discuss literature and expand your reading horizons'
        : 'Literature discussion club',
    },
    {
      id: 'ibo-club',
      name: isEnglish ? 'IBO Club' : 'IBO Club',
      description: isEnglish
        ? 'Prepare for and engage with International Baccalaureate principles'
        : 'IBO preparation club',
    },
    {
      id: 'astronomy',
      name: isEnglish ? 'Astronomy Club' : 'Astronomy Club',
      description: isEnglish
        ? 'Explore the cosmos and discover the wonders of space'
        : 'Space and astronomy exploration',
    },
    {
      id: 'young-engineer',
      name: isEnglish ? 'Young Engineers' : 'Young Engineers',
      description: isEnglish
        ? 'Apply engineering principles to real-world problem solving'
        : 'Engineering problem solving',
    },
    {
      id: 'writing-debating-speech',
      name: isEnglish ? 'Writing, Debating & Speech' : 'Debate Club',
      description: isEnglish
        ? 'Develop communication skills through writing, debate, and public speaking'
        : 'Communication and debate',
    },
    {
      id: 'chess-club',
      name: isEnglish ? 'Chess Club' : 'Chess Club',
      description: isEnglish
        ? 'Master strategic thinking and competitive chess play'
        : 'Strategic chess learning',
    },
    {
      id: 'go-aspiration',
      name: isEnglish ? 'Go Aspiration' : 'Go Aspiration',
      description: isEnglish
        ? 'Learn the ancient game of Go and develop strategic thinking'
        : 'Ancient Go game learning',
    },
  ];

  const filteredClubs = searchText
    ? clubs.filter(club =>
        club.name.toLowerCase().includes(searchText.toLowerCase()) ||
        club.description.toLowerCase().includes(searchText.toLowerCase())
      )
    : clubs;

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
          {filteredClubs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredClubs.map((club) => (
                <motion.div
                  key={club.id}
                  variants={itemVariants}
                  className="bg-white border-2 border-black p-5 hover:shadow-lg transition-all group"
                >
                  <h3 className="text-sm font-black uppercase tracking-wide text-black group-hover:text-cardinal-red transition-colors mb-3">
                    {club.name}
                  </h3>
                  <p className="text-xs text-gray-700 leading-relaxed">
                    {club.description}
                  </p>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div variants={itemVariants} className="text-center py-12 bg-white border-2 border-black">
              <p className="text-sm font-bold uppercase text-gray-500">
                {isEnglish ? 'No clubs found' : 'No clubs found'}
              </p>
            </motion.div>
          )}
        </motion.section>
      </div>
    </div>
  );
}
