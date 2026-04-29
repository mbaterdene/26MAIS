import { motion } from 'framer-motion';
import { useState } from 'react';
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
      name: isEnglish ? 'Mogul Robotics' : 'Mogul ╨á╨╛╨▒╨╛╤å╤é╨╕╨║',
      description: isEnglish
        ? 'Build and program robots through hands-on engineering projects'
        : '╨á╨╛╨▒╨╛╤é ╨▒╥»╤é╤ì╤ì╨╢, ╨┐╤Ç╨╛╨│╤Ç╨░╨╝ ╤à╨╕╨╣╤à ╨╖╨░╨╝╨░╨░╤Ç ╨╕╨╜╨╢╨╡╨╜╨╡╤Ç╨╕╨╣╨╜ ╤ç╨░╨┤╨▓╨░╤Ç╤ï╨│ ╤ü╨░╨╣╨╢╤Ç╤â╤â╨╗╨░╤à',
    },
    {
      id: 'chemhack',
      name: isEnglish ? 'ChemHack' : 'ChemHack',
      description: isEnglish
        ? 'Explore chemistry through interactive experiments and challenges'
        : '╨ÿ╨╜╤é╨╡╤Ç╨░╨║╤é╨╕╨▓ ╤é╤â╤Ç╤ê╨╕╨╗╤é╨░╨░╤Ç ╤à╨╕╨╝╨╕╨╣╨│ ╤ü╤â╨┤╨╗╨░╤à',
    },
    {
      id: 'momentum-physics',
      name: isEnglish ? 'Momentum Physics' : 'Momentum ╨ñ╨╕╨╖╨╕╨║',
      description: isEnglish
        ? 'Discover physics through dynamic experiments and real-world applications'
        : '╨ñ╨╕╨╖╨╕╨║╨╕╨╣╨│ ╤é╤â╤Ç╤ê╨╕╨╗╤é, ╨▒╨╛╨┤╨╕╤é ╤à╤ì╤Ç╤ì╨│╨╗╤ì╤ì╨│╤ì╤ì╤Ç ╤ü╥»╨╜╤ü╤ì╨╗╤ì╤à',
    },
    {
      id: 'german-club',
      name: isEnglish ? 'German Language Club' : '╨ô╨╡╤Ç╨╝╨░╨╜ ╤à╤ì╨╗',
      description: isEnglish
        ? 'Master German language and culture'
        : '╨ô╨╡╤Ç╨╝╨░╨╜ ╤à╤ì╨╗, ╤ü╨╛╤æ╨╗╤ï╨│ ╤ü╨░╨╣╨╢╤Ç╤â╤â╨╗╨░╤à',
    },
    {
      id: 'chinese-club',
      name: isEnglish ? 'Chinese Language Club' : '╨Ñ╤Å╤é╨░╨┤ ╤à╤ì╨╗',
      description: isEnglish
        ? 'Develop Chinese language skills and understand Chinese culture'
        : '╨Ñ╤Å╤é╨░╨┤ ╤à╤ì╨╗, ╤ü╨╛╤æ╨╗╤ï╨│ ╤ü╤â╨┤╨╗╨░╤à',
    },
    {
      id: 'ecobusiness',
      name: isEnglish ? 'EcoBusiness' : 'EcoBusiness',
      description: isEnglish
        ? 'Learn sustainable business practices and environmental entrepreneurship'
        : '╨æ╨░╨╣╨│╨░╨╗╤î ╤â╤à╨░╨░╨╗╨░╨│ ╨▒╨╕╨╖╨╜╨╡╤ü╨╕╨╣╨│ ╤ü╤â╨┤╨╗╨░╤à',
    },
    {
      id: 'money-mind',
      name: isEnglish ? 'Money Mind' : 'Money Mind',
      description: isEnglish
        ? 'Master financial literacy and investment strategies'
        : '╨í╨░╨╜╤à╥»╥»╨│╨╕╨╣╨╜ ╨╝╤ì╨┤╨╗╤ì╨│, ╤à╙⌐╤Ç╙⌐╨╜╨│╙⌐ ╨╛╤Ç╤â╤â╨╗╨░╨╗╤é╤ï╨│ ╤ü╤â╨┤╨╗╨░╤à',
    },
    {
      id: 'book-club',
      name: isEnglish ? 'Book Club' : '╨¥╨╛╨╝╤ï╨╜ ╨Ü╨╗╤â╨▒',
      description: isEnglish
        ? 'Discuss literature and expand your reading horizons'
        : '╨ú╤Ç╨░╨╜ ╨╖╨╛╤à╨╕╨╛╨╗╤ï╨│ ╤à╤ì╨╗╤ì╨╗╤å╤ì╨╢, ╤â╨╜╤ê╨╗╨░╨│╤ï╨│ ╙⌐╤Ç╨│╙⌐╤é╨│╙⌐╤à',
    },
    {
      id: 'ibo-club',
      name: isEnglish ? 'IBO Club' : 'IBO ╨Ü╨╗╤â╨▒',
      description: isEnglish
        ? 'Prepare for and engage with International Baccalaureate principles'
        : 'IBO-╨╕╨╣╨╜ ╨╖╨░╤Ç╤ç╨╝╤ï╨│ ╤ü╤â╨┤╨╗╨░╤à',
    },
    {
      id: 'astronomy',
      name: isEnglish ? 'Astronomy Club' : '╨₧╨┤╨╛╨╜ ╨╛╤Ç╨╜╤ï ╨Ü╨╗╤â╨▒',
      description: isEnglish
        ? 'Explore the cosmos and discover the wonders of space'
        : '╨í╨░╨╜╤ü╨░╤Ç╤ê╨╕╨╗, ╤ü╥»╥»╨╗╤é╤ì╨╣ ╨╛╨┤╨╜╤ï ╤ü╤â╨┤╨░╨╗╨│╨░╨░',
    },
    {
      id: 'young-engineer',
      name: isEnglish ? 'Young Engineers' : '╨ù╨░╨╗╤â╤â ╨ÿ╨╜╨╢╨╡╨╜╨╡╤Ç╥»╥»╨┤',
      description: isEnglish
        ? 'Apply engineering principles to real-world problem solving'
        : '╨ÿ╨╜╨╢╨╡╨╜╨╡╤Ç╨╕╨╣╨╜ ╨░╤ü╤â╤â╨┤╨╗╤ï╨│ ╨▒╨╛╨┤╨╕╤é ╨▒╨░╨╣╨┤╨╗╨░╨░╤Ç ╤ê╨╕╨╣╨┤╤ì╤à',
    },
    {
      id: 'writing-debating-speech',
      name: isEnglish ? 'Writing, Debating & Speech' : '╨æ╨╕╤ç╨╕╤à, ╨£╨░╤Ç╨│╨░╨╗╨┤╨░╤à, ╨»╤Ç╨╕╤à',
      description: isEnglish
        ? 'Develop communication skills through writing, debate, and public speaking'
        : '╨æ╨╕╤ç╨╕╤à, ╨╝╨░╤Ç╨│╨░╨╗╨┤╨░╤à, ╤Å╤Ç╨╕╤à╨░╨░╤Ç ╨║╨╛╨╝╨╝╤â╨╜╨╕╨║╨░╤å╨╕╨╣╨╜ ╤â╤Ç ╤ç╨░╨┤╨▓╨░╤Ç ╤à╙⌐╨│╨╢╥»╥»╨╗╤ì╤à',
    },
    {
      id: 'chess-club',
      name: isEnglish ? 'Chess Club' : '╨¿╨░╤é╤Ç╤ï╨╜ ╨Ü╨╗╤â╨▒',
      description: isEnglish
        ? 'Master strategic thinking and competitive chess play'
        : '╨¿╨░╤é╤Ç╨░╨░╤Ç ╤ü╤ì╤é╨│╤ì╨╜ ╨╗╨╛╨╝╨╛╨╛╤à╤ï╨│ ╤ü╨░╨╣╨╢╤Ç╤â╤â╨╗╨░╤à',
    },
    {
      id: 'go-aspiration',
      name: isEnglish ? 'Go Aspiration' : 'Go Aspiration',
      description: isEnglish
        ? 'Learn the ancient game of Go and develop strategic thinking'
        : 'Go ╤é╨╛╨│╨╗╨╛╨╛╨╝╨╛╨╛╤Ç ╤ü╤é╤Ç╨░╤é╨╡╨│╨╕╨╣╨╜ ╤ü╤ì╤é╨│╤ì╨╗╨│╤ì╤ì ╨▒╙⌐╨│╙⌐╙⌐╨╗╙⌐╤à',
    },
  ];

  const filteredClubs = searchText
    ? clubs.filter(club =>
        club.name.toLowerCase().includes(searchText.toLowerCase()) ||
        club.description.toLowerCase().includes(searchText.toLowerCase())
      )
    : clubs;

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
              {isEnglish ? 'Academic Clubs' : '╨É╨║╨░╨┤╨╡╨╝╨╕╨║ ╨Ü╨╗╤â╨▒╤â╤â╨┤'}
            </h1>
            <p className="text-lg text-black text-opacity-70">
              {isEnglish
                ? 'Explore intellectual pursuits and advance your knowledge through specialized academic clubs focused on sciences, languages, entrepreneurship, and critical thinking.'
                : '╨£╤ì╤Ç╨│╤ì╨╢╨╗╨╕╨╣╨╜ ╨░╨║╨░╨┤╨╡╨╝╨╕╨║ ╨║╨╗╤â╨▒╤â╤â╨┤╨░╨░╤Ç ╨╛╤Ä╤â╨╜ ╤ü╨░╨╜╨░╨░╨╜╤ï ╨░╨╢╨╕╨╗╨┤ ╨╛╤Ç╨╛╨╗╤å╨╛╨╢ ╨╝╤ì╨┤╨╗╤ì╨│╤ì╤ì ╤ü╨░╨╣╨╢╤Ç╤â╤â╨╗╨░╨░╤Ç╨░╨╣'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 bg-white border-b border-black border-opacity-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <input
            type="text"
            placeholder={isEnglish ? 'Search clubs...' : '╨Ü╨╗╤â╨▒ ╤à╨░╨╣╤à...'}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="w-full max-w-md px-4 py-3 border-2 border-cardinal-red rounded-lg focus:outline-none focus:ring-2 focus:ring-cardinal-red"
          />
        </div>
      </section>

      {/* Clubs Grid */}
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
