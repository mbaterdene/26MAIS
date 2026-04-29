import { motion } from 'framer-motion';
import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';

interface Club {
  id: string;
  name: string;
  description: string;
}

export function ServiceClubsSection() {
  const { isEnglish } = useLanguage();
  const [searchText, setSearchText] = useState('');

  const serviceClubs: Club[] = [
    {
      id: 'career-compass',
      name: isEnglish ? 'Career Compass' : 'Career Compass',
      description: isEnglish
        ? 'Navigate your future with career guidance and professional development workshops'
        : '╨Ü╨░╤Ç╤î╨╡╤Ç╨╕╨╣╨╜ ╨╖╙⌐╨▓╨╗╙⌐╨│╙⌐╙⌐, ╨╝╤ì╤Ç╨│╤ì╨╢╨╗╨╕╨╣╨╜ ╤à╙⌐╨│╨╢╨╗╙⌐╙⌐╤Ç ╨╕╤Ç╤ì╤ì╨┤╥»╨╣╨│╤ì╤ì ╨╖╨╛╤Ç╨╕╤â╨╗╨░╤à',
    },
    {
      id: 'clean-mais',
      name: isEnglish ? 'Clean MAIS' : 'Clean MAIS',
      description: isEnglish
        ? 'Promote environmental sustainability and maintain a clean campus'
        : '╨æ╨░╨╣╨│╨░╨╗╤î╤ï╨╜ ╤ì╤Ç╨│╥»╥»╨╗╤ì╨╗╨╕╨╣╨│ ╤ü╥»╥»╨┤╥»╥»╨╗╨╢, ╤å╤ì╨╜╨│╤ì╨╗╤ì╨╜ ╨║╨░╨╝╨┐╤â╤ü╤ï╨╜ ╨╛╤Ç╤ç╨╜╤ï╨│ ╤à╨░╨┤╨│╨░╨╗╨░╤à',
    },
    {
      id: 'mab',
      name: isEnglish ? 'MAB' : 'MAB',
      description: isEnglish
        ? 'Build leadership skills through mentoring and peer support programs'
        : '╨Ñ╨░╤Ç╨╕╨╗╤å╤ï╨╜ ╤é╤â╤ü╨╗╨░╨╗╤å╨░╨░, ╤ü╤â╤Ç╨│╨░╨╗╤é╨░╨░╤Ç ╤â╨┤╨╕╤Ç╨┤╨╗╨░╨│╤ï╨╜ ╤â╤Ç ╤ç╨░╨┤╨▓╨░╤Ç ╤à╙⌐╨│╨╢╥»╥»╨╗╤ì╤à',
    },
    {
      id: 'multimedia',
      name: isEnglish ? 'Multimedia' : 'Multimedia',
      description: isEnglish
        ? 'Create engaging content through photography, videography, and digital media'
        : '╨ù╤â╤Ç╨│╨╕╨╣╨╜ ╨▒╨╛╨╗╨╛╨╜ ╨▓╨╕╨┤╨╡╨╛╨│╨╕╨╣╨╜ ╤ç╨░╨┤╨▓╨░╤Ç╤ï╨│ ╤à╙⌐╨│╨╢╥»╥»╨╗╤ì╤à',
    },
    {
      id: 'model-aspiration',
      name: isEnglish ? 'Model Aspiration' : 'Model Aspiration',
      description: isEnglish
        ? 'Develop diplomacy and public speaking skills through Model UN and international forums'
        : 'Model UN-╨░╨░╤Ç ╨┤╨╕╨┐╨╗╨╛╨╝╨░╤é╨╕╨╣╨╜ ╤â╤Ç ╤ç╨░╨┤╨▓╨░╤Ç, ╨╛╨╗╨╛╨╜ ╤é╙⌐╤Ç╨╗╨╕╨╣╨╜ ╤ü╤ì╤é╨│╤ì╨╗╨│╤ì╤ì ╤à╙⌐╨│╨╢╥»╥»╨╗╤ì╤à',
    },
    {
      id: 'study-simple',
      name: isEnglish ? 'Study Simple' : 'Study Simple',
      description: isEnglish
        ? 'Provide peer tutoring and academic support for struggling students'
        : '╨í╤â╤Ç╨│╨░╨╗╤é╤ï╨╜ ╤é╤â╤ü╨╗╨░╨╗╤å╨░╨░, ╤ü╤â╤Ç╨░╨╗╤å╨░╨│╤ç╨┤╤ï╨│ ╨┤╤ì╨╝╨╢╨╕╤à',
    },
    {
      id: 'red-cross',
      name: isEnglish ? 'Red Cross' : 'Red Cross',
      description: isEnglish
        ? 'Develop humanitarian values and first aid skills through community service'
        : '╨¡╤à╨╜╨╕╨╣ ╤é╤â╤ü╨╗╨░╨╝╨╢, ╨╜╨╕╨╣╨│╨╝╨╕╨╣╨╜ ╥»╨╣╨╗╤ç╨╕╨╗╨│╤ì╤ì╨│╤ì╤ì╤Ç ╤à╥»╨╝╥»╥»╨╜╨╗╤ì╨│╨╕╨╣╨╜ ╥»╨╜╤ì╤é╥»╥»╨╗╤ì╨╗╤é╤ì╨╣ ╨▒╨░╨╣╤à',
    },
    {
      id: 'futuregivers',
      name: isEnglish ? 'FutureGivers' : 'FutureGivers',
      description: isEnglish
        ? 'Create positive social impact through fundraising and charitable initiatives'
        : '╨¥╨╕╨╣╨│╨╝╨╕╨╣╨╜ ╥»╨╣╨╗ ╨░╨╢╨╕╨╗╨│╨░╨░,σïƒΘçæφÖ£σïò∞£╝δí£ Ω╕ì∞áò∞áü∞¥╕ ∞ÿüφûÑ ∞░╜∞╢£',
    },
    {
      id: 'minds-matter',
      name: isEnglish ? 'Minds Matter' : 'Minds Matter',
      description: isEnglish
        ? 'Promote mental health awareness and well-being support across campus'
        : '╨í╤ì╤é╨│╤ì╤å╨╕╨╣╨╜ ╤ì╤Ç╥»╥»╨╗ ╨╝╤ì╨╜╨┤╨╕╨╣╨╜ ╤â╤à╨░╨╝╤ü╨░╤Ç ╤ê╨╕╤Ç╥»╥»╨╗╤ì╤à, ╤ü╨░╨╣╨╜ ╤ü╨░╨╣╤à╨╜╤ï ╤é╙⌐╨╗╙⌐╨▓',
    },
    {
      id: 'earth-science',
      name: isEnglish ? 'Earth Science' : 'Earth Science',
      description: isEnglish
        ? 'Champion environmental conservation and climate change awareness initiatives'
        : '╨æ╨░╨╣╨│╨░╨╗╤î╤ï╨╜ ╤â╤à╨░╨░╨╗, ╤â╤â╤Ç ╨░╨╝╤î╤ü╨│╨░╨╗╤ï╨╜ ╙⌐╙⌐╤Ç╤ç╨╗╙⌐╨╗╤é╨╕╨╣╨╜ ╤é╨░╨╗╨░╨░╤Ç ╤â╤à╨░╨╝╤ü╨░╤Ç ╤ê╨╕╤Ç╥»╥»╨╗╤ì╤à',
    },
  ];

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
              {isEnglish ? 'Service & Leadership' : '╥«╨╣╨╗╤ç╨╕╨╗╨│╤ì╤ì & ╨ú╨┤╨╕╤Ç╨┤╨╗╨░╨│╨░'}
            </h1>
            <p className="text-lg text-black text-opacity-70">
              {isEnglish
                ? 'Make a positive impact through service-oriented clubs that build leadership skills and foster community engagement.'
                : '╥«╨╣╨╗╤ç╨╕╨╗╨│╤ì╤ì╨╜╨╕╨╣ ╨║╨╗╤â╨▒╤â╤â╨┤╨░╨░╤Ç ╤â╨┤╨╕╤Ç╨┤╨╗╨░╨│╤ï╨╜ ╤â╤Ç ╤ç╨░╨┤╨▓╨░╤Ç ╤à╙⌐╨│╨╢╥»╥»╨╗╨╢, ╨╜╨╕╨╣╨│╨╝╨╕╨╣╨╜ ╨╛╤Ç╨╛╨╗╤å╨╛╨╛╨│ ╨╕╨┤╤ì╨▓╤à╨╢╥»╥»╨╗╤ì╤à'}
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
