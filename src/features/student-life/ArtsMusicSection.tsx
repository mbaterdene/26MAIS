import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

interface Program {
  id: string;
  name: string;
  description: string;
  schedule: string;
  director: string;
  location: string;
  isDofe?: boolean;
}

export function ArtsMusicSection() {
  const { isEnglish } = useLanguage();

  const programs: Program[] = [
    {
      id: 'creative-media',
      name: isEnglish ? 'Creative Media' : '╨í╨╛╨╜╨│╨╕╨╜╤é╨╛╨╣ ╨£╨╡╨┤╨╕╨░',
      description: isEnglish
        ? 'Develop skills in photography, videography, graphic design, and digital media production'
        : '╨ù╤â╤Ç╨░╨│╨╗╨░╨░╨╗, ╨▓╨╕╨┤╨╡╨╛ ╨▒╨╕╤ç╨╗╤ì╨│, ╨│╤Ç╨░╤ä╨╕╨╣╨╜ ╨┤╨╕╨╖╨░╨╣╨╜, ╨┤╨╕╨╢╨╕╤é╨░╨╗ ╨╝╨╡╨┤╨╕╨░ ╥»╨╣╨╗╨┤╨▓╤ì╤Ç╨╗╤ì╨╗╤é',
      schedule: isEnglish ? 'MON / TUE / 16:00 - 17:30' : '╨ö╨É / ╨ó╨ú / 16:00 - 17:30',
      director: isEnglish ? 'Director: James Morrison' : '╨ù╨░╤à╨╕╤Ç╨░╨╗: ╨û╨╡╨╣╨╝╤ü ╨£╨╛╤Ç╨╕╤ü╨╛╨╜',
      location: isEnglish ? 'Media Lab / Room 301' : '╨£╨╡╨┤╨╕╨░ ╨¢╨░╨▒╨╛╤Ç╨░╤é╨╛╤Ç╨╕ / ╙¿╤Ç╙⌐╙⌐ 301',
    },
    {
      id: 'crochet',
      name: isEnglish ? 'Crochet Club' : 'Crohet ╨Ü╨╗╤â╨▒',
      description: isEnglish
        ? 'Learn traditional crochet techniques and create beautiful handmade pieces'
        : '╨ú╨╗╨░╨╝╨╢╨╗╨░╨╗╤é crohet ╨░╤Ç╨│╤ï╨│ ╤ü╤â╤Ç╨╢, ╤ü╨░╨╣╤à╨░╨╜ ╨│╥»╨╣╤å╤ì╤é╨│╤ì╨╗ ╥»╥»╤ü╨│╤ì╤à',
      schedule: isEnglish ? 'WED-THU / 16:30 - 17:30' : '╨æ╥«-╨æ╨É / 16:30 - 17:30',
      director: isEnglish ? 'Instructor: Maria Garcia' : '╨û.╨í╤â╤Ç╨│╤â╤â╨╗╤î: ╨£╨░╤Ç╨╕╤Å ╨ô╨░╤Ç╤ü╨╕╨░',
      location: isEnglish ? 'Arts Studio / Room 205' : '╨ú╤Ç╨╗╨░╨│ ╨í╤é╤â╨┤╨╕╨╛ / ╙¿╤Ç╙⌐╙⌐ 205',
    },
    {
      id: 'calligraphy',
      name: isEnglish ? 'Calligraphy (DofE)' : '╨ù╨░╨╗╨▒╨╕╤Ç╨╗╨░╨╗ (DofE)',
      description: isEnglish
        ? 'Master the art of beautiful handwriting and calligraphic techniques'
        : '╨í╨░╨╣╤à╨░╨╜ ╨│╨░╤Ç╨░╨░ ╥»╤ü╤ì╨│ ╨▒╨╕╤ç╨╕╤à ╨▒╨░ ╨╖╨░╨╗╨▒╨╕╤Ç╨╗╨░╨╗╤ï╨╜ ╤â╤Ç ╤ç╨░╨┤╨▓╨░╤Ç╤ï╨│ ╤ü╥»╨╜╤ü╤ì╨╗╤ì╤à',
      schedule: isEnglish ? 'SAT / 14:00 - 15:30' : '╨æ╨É / 14:00 - 15:30',
      director: isEnglish ? 'Master: Li Wei Chen' : '╨û.╨í╤â╤Ç╨│╤â╤â╨╗╤î: ╨¢╨╕ ╨Æ╤ì╨╣ ╨º╤ì╨╜╤î',
      location: isEnglish ? 'Art Studio / Room 210' : '╨ú╤Ç╨╗╨░╨│ ╨í╤é╤â╨┤╨╕╨╛ / ╙¿╤Ç╙⌐╙⌐ 210',
      isDofe: true,
    },
    {
      id: 'guitar',
      name: isEnglish ? 'Guitar Ensemble (DofE)' : '╨ô╨╕╤é╨░╤Ç ╨É╨╜╤ü╨░╨╝╨▒╨╗╤î (DofE)',
      description: isEnglish
        ? 'All skill levels welcome - from beginner to advanced. Classical and contemporary music.'
        : '╨æ╥»╤à ╤é╥»╨▓╤ê╨╜╤ì╤ì╤ü ╨░╨╜╤à╨╗╨░╨╜ ╤ì╤à╨╗╤ì╨│╤ç╤ì╤ì╤ü ╨░╤à╨╕╤ü╥»╥»╨╗╤ì╤à╥»╥»╨┤ ╤à╥»╤Ç╤é╤ì╨╗. ╨í╨╛╨╜╨│╨╛╨┤╨╛╨│ ╨▒╨░ ╨╛╤Ç╤ç╨╕╨╜ ╥»╨╡╨╕╨╣╨╜ ╤à╙⌐╨│╨╢╨╕╨╝.',
      schedule: isEnglish ? 'TUE-FRI / 17:00 - 18:00' : '╨ó╨ú-╨ƒ╨ó / 17:00 - 18:00',
      director: isEnglish ? 'Director: Paulo Silva' : '╨ù╨░╤à╨╕╤Ç╨░╨╗: ╨ƒ╨░╤â╨╗╤â ╨í╨╕╨╗╨▓╨░',
      location: isEnglish ? 'Music Hall / Studio 1' : '╨Ñ╙⌐╨│╨╢╨╝╨╕╨╣╨╜ ╨ó╨░╨╜╤à╨╕╨╝ / ╨í╤é╤â╨┤╨╕╨╛ 1',
      isDofe: true,
    },
    {
      id: 'morin-huur',
      name: isEnglish ? 'Morin Huur Ensemble (DofE)' : '╨£╨╛╤Ç╨╕╨╜ ╨Ñ╤â╤â╤Ç ╨É╨╜╤ü╨░╨╝╨▒╨╗╤î (DofE)',
      description: isEnglish
        ? 'Learn traditional Mongolian horsehead fiddle and explore Mongolian folk music'
        : '╨ú╨╗╨░╨╝╨╢╨╗╨░╨╗╤é ╨£╨╛╨╜╨│╨╛╨╗ ╨╝╨╛╤Ç╨╕╨╜ ╤à╤â╤â╤Ç ╤ü╤â╤Ç╨╢, ╨£╨╛╨╜╨│╨╛╨╗ ╨░╤Ç╨┤╤ï╨╜ ╤à╙⌐╨│╨╢╨╝╨╕╨╣╨│ ╤ü╥»╨╜╤ü╤ì╨╗╤ì╤à',
      schedule: isEnglish ? 'MON-THU / 18:00 - 19:00' : '╨ö╨É-╨æ╨É / 18:00 - 19:00',
      director: isEnglish ? 'Master: Bataar Enkhbold' : '╨û.╨í╤â╤Ç╨│╤â╤â╨╗╤î: ╨æ╨░╤é╨░╨░╤Ç ╨¡╨╜╤à╨▒╨╛╨╗╨┤',
      location: isEnglish ? 'Music Hall / Studio 2' : '╨Ñ╙⌐╨│╨╢╨╝╨╕╨╣╨╜ ╨ó╨░╨╜╤à╨╕╨╝ / ╨í╤é╤â╨┤╨╕╨╛ 2',
      isDofe: true,
    },
  ];

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
              {isEnglish ? 'Arts & Music' : '╨ú╤Ç╨╗╨░╨│ & ╨Ñ╙⌐╨│╨╢╨╕╨╝'}
            </h1>
            <p className="text-lg text-black text-opacity-70">
              {isEnglish
                ? 'Express your creativity through visual arts, performing arts, music, and traditional crafts. Discover your artistic voice with our diverse programs.'
                : '╨ö╥»╤Ç╤ü╨╗╤ì╤à ╤â╤Ç╨╗╨░╨│, ╨╢╥»╨╢╨│╨╕╨╣╨╜ ╤â╤Ç╨╗╨░╨│, ╤à╙⌐╨│╨╢╨╕╨╝, ╤â╨╗╨░╨╝╨╢╨╗╨░╨╗╤é ╤â╤Ç╨╗╨░╨│╨░╨░╤Ç ╤ü╨╛╨╜╨│╨╕╨╜╤é╨╛╨╣ ╨╕╨╗╤ì╤Ç╤à╨╕╨╣╨╗╨╜╤ì'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Programs Showcase */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {programs.map((program, index) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-6 items-center ${
                  index % 2 === 1 ? 'lg:grid-cols-2' : ''
                }`}
              >
                {/* Image */}
                <motion.div
                  className="relative h-80 bg-black rounded-lg overflow-hidden flex items-center justify-center order-2 lg:order-1"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-white/30 text-8xl mb-4 font-bold">
                        {program.name.charAt(0)}
                      </div>
                      <p className="text-white/40 text-sm">{isEnglish ? 'Program Photo' : '╨ƒ╤Ç╨╛╨│╤Ç╨░╨╝╨╝╤ï╨╜ ╨ù╤â╤Ç╨░╨│'}</p>
                    </div>
                  </div>

                  {/* Status Badge */}
                  {program.isDofe && (
                    <div className="absolute top-4 right-4 bg-cardinal-red text-white px-3 py-1 text-xs font-bold rounded">
                      DOFE
                    </div>
                  )}

                  {/* Program Label - Vertical */}
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 writing-mode-vertical text-white font-bold text-lg uppercase tracking-widest">
                    <div style={{ writingMode: 'vertical-lr', transform: 'rotate(180deg)' }}>
                      {program.name}
                    </div>
                  </div>
                </motion.div>

                {/* Details */}
                <motion.div className="space-y-4 order-1 lg:order-2">
                  <div>
                    <p className="text-black text-opacity-70 leading-relaxed mb-4">
                      {program.description}
                    </p>
                  </div>

                  <div className="space-y-3 bg-gray-50 rounded-lg p-6">
                    <div>
                      <p className="text-black text-opacity-50 text-sm uppercase tracking-wider">
                        {isEnglish ? 'Meeting Times' : '╨ú╤â╨╗╨╖╨░╨╗╤é╤ï╨╜ ╨ª╨░╨│'}
                      </p>
                      <p className="text-black font-bold">{program.schedule}</p>
                    </div>
                    <div>
                      <p className="text-black text-opacity-50 text-sm uppercase tracking-wider">
                        {isEnglish ? 'Director' : '╨ù╨░╤à╨╕╤Ç╨░╨╗'}
                      </p>
                      <p className="text-black font-bold">{program.director}</p>
                    </div>
                    <div>
                      <p className="text-black text-opacity-50 text-sm uppercase tracking-wider">
                        {isEnglish ? 'Location' : '╨æ╨░╨╣╤Ç╤ê╨╕╨╗'}
                      </p>
                      <p className="text-black font-bold">{program.location}</p>
                    </div>
                  </div>

                  <button className="w-full border-2 border-black text-black font-bold py-3 rounded hover:bg-black hover:text-white transition">
                    {isEnglish ? 'LEARN MORE' : '╨ö╨¡╨¢╨ô╨¡╨á╥«╥«╨¢╨¡╨Ñ'}
                  </button>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
