import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

interface Team {
  id: string;
  name: string;
  description: string;
  schedule: string;
  coach: string;
  location: string;
  isDofe?: boolean;
}

export function AthleticsSection() {
  const { isEnglish } = useLanguage();

  const teams: Team[] = [
    {
      id: 'basketball',
      name: isEnglish ? 'Basketball' : '╨í╨░╨│╤ü',
      description: isEnglish
        ? 'Join our competitive basketball team and develop your skills on the court'
        : '╨£╨░╨╜╨░╨╣ ╤ü╨┐╨╛╤Ç╤é╤ï╨╜ ╤ü╨░╨│╤ü╨╜╤ï ╨▒╨░╨│╤é ╨╜╤ì╨│╨┤╤ì╤ì╨┤ ╤é╨░╨╜╨░╨╣ ╤â╤Ç ╤ç╨░╨┤╨▓╨░╤Ç╤ï╨│ ╙⌐╤Ç╨│╙⌐╨╢╥»╥»╨╗╤ì╤à',
      schedule: isEnglish ? 'MON-FRI / 16:30 - 17:30' : '╨ö╨É-╨ƒ╨ó / 16:30 - 17:30',
      coach: isEnglish ? 'Head Coach: Marcus Thorne' : '╨û.╨í╤â╤Ç╨│╤â╤â╨╗╤î: ╨£╨░╤Ç╨║╤â╤ü ╨ó╨╛╤Ç╨╜',
      location: isEnglish ? 'East Gymnasium / Court A' : '╨ù╥»╥»╨╜ ╨í╨┐╨╛╤Ç╤é╤ï╨╜ ╨ª╤ì╨╜╨│╤ì╨╗╨┤╤ì╤à ╨Ñ╥»╤Ç╤ì╤ì╨╗╤ì╨╜ / ╨ª╤ì╨╜╨│╤ì╨╗╨┤╤ì╤à ╨É',
    },
    {
      id: 'volleyball',
      name: isEnglish ? 'Volleyball' : '╨Æ╨╛╨╗╨╡╨╣╨▒╨╛╨╗',
      description: isEnglish
        ? 'Team-oriented sport that builds camaraderie and athletic excellence'
        : '╨æ╨░╨│ ╤ü╨░╨╜╨░╨░╤é╨░╨╣ ╤ü╨┐╨╛╤Ç╤é, ╨▒╨░╨│ ╤ü╨░╨╜╨░╨░, ╤ü╨┐╨╛╤Ç╤é╤ï╨╜ ╤à╥»╨╜╨┤ ╨░╨╢╨╕╨╗ ╥»╥»╤ü╨│╤ì╨╗╤é ╤à╨╕╨╣╤à',
      schedule: isEnglish ? 'TUE-THU / 16:00 - 17:00' : '╨ó╨ú-╨æ╨É / 16:00 - 17:00',
      coach: isEnglish ? 'Head Coach: Sarah Chen' : '╨û.╨í╤â╤Ç╨│╤â╤â╨╗╤î: ╨í╨░╤Ç╨░ ╨º╤ì╨╜',
      location: isEnglish ? 'West Sports Hall / Court B' : '╨æ╨░╤Ç╤â╤â╨╜ ╨í╨┐╨╛╤Ç╤é╤ï╨╜ ╨ª╤ì╨╜╨│╤ì╨╗╨┤╤ì╤à ╨Ñ╥»╤Ç╤ì╤ì╨╗╤ì╨╜ / ╨ª╤ì╨╜╨│╤ì╨╗╨┤╤ì╤à ╨æ',
    },
    {
      id: 'badminton',
      name: isEnglish ? 'Badminton (DofE)' : '╨æ╨░╨┤╨╝╨╕╨╜╤é╨╛╨╜ (DofE)',
      description: isEnglish
        ? 'Develop precision, agility, and competitive skills through badminton'
        : '╨æ╨░╨┤╨╝╨╕╨╜╤é╨╛╨╜╨░╨░╤Ç ╨╜╨░╤Ç╨╕╨╣╨▓╤ç╨╗╨░╨╗╤ï╨│, ╤à╙⌐╨┤╙⌐╨╗╨│╙⌐╙⌐╨╜╨╕╨╣ ╤ç╨░╨┤╨▓╨░╤Ç╤ï╨│, ╤ü╨┐╨╛╤Ç╤é╤ï╨╜ ╤â╤Ç ╤ç╨░╨┤╨▓╨░╤Ç╤ï╨│ ╤à╙⌐╨│╨╢╥»╥»╨╗╤ì╤à',
      schedule: isEnglish ? 'WED-SAT / 15:00 - 16:00' : '╨æ╥«-╨æ╨É / 15:00 - 16:00',
      coach: isEnglish ? 'Coach: David Wong' : '╨û.╨í╤â╤Ç╨│╤â╤â╨╗╤î: ╨ö╤ì╨▓╨╕╨┤ ╨Æ╨╛╨╜╨│',
      location: isEnglish ? 'Indoor Courts / Hall 3' : '╨ö╨╛╤é╨╛╤Ç ╨ª╤ì╨╜╨│╤ì╨╗╨┤╤ì╤à / ╨ª╤ì╨╜╨│╤ì╨╗╨┤╤ì╤à 3',
      isDofe: true,
    },
    {
      id: 'tabletennis',
      name: isEnglish ? 'Table Tennis (DofE)' : '╨¿╨╕╤Ç╤ì╤ì╨╜╨╕╨╣ ╨ó╨╡╨╜╨╜╨╕╤ü (DofE)',
      description: isEnglish
        ? 'Build reflexes, strategy, and competitive spirit through table tennis'
        : '╨¿╨╕╤Ç╤ì╤ì╨╜╨╕╨╣ ╤é╨╡╨╜╨╜╨╕╤ü╨░╨░╤Ç ╤Ç╨╡╤ä╨╗╨╡╨║╤ü, ╤ü╤é╤Ç╨░╤é╨╡╨│╨╕, ╤ü╨┐╨╛╤Ç╤é╤ï╨╜ ╤ü╥»╨╜╤ü╨╕╨╣╨│ ╤à╙⌐╨│╨╢╥»╥»╨╗╤ì╤à',
      schedule: isEnglish ? 'MON-WED / 17:00 - 18:00' : '╨ö╨É-╨æ╥« / 17:00 - 18:00',
      coach: isEnglish ? 'Coach: Emma Liu' : '╨û.╨í╤â╤Ç╨│╤â╤â╨╗╤î: ╨¡╨╝╨╝╨░ ╨¢╨╕╤â',
      location: isEnglish ? 'Recreation Center / Room 105' : '╨í╨╛╨╜╨╕╤Ç╤à╨╛╨╗ ╨ó╙⌐╨▓ / ╙¿╤Ç╙⌐╙⌐ 105',
      isDofe: true,
    },
    {
      id: 'yoga',
      name: isEnglish ? 'Yoga (DofE)' : '╨Ö╨╛╨│╨░ (DofE)',
      description: isEnglish
        ? 'Enhance flexibility, strength, and mental wellness through yoga'
        : '╨Ö╨╛╨│╨░╨░╤Ç ╤ü╤â╨╗╨│╨░╤å╤ï╨│, ╤à╥»╤ç╨╕╨╣╨│, ╤ü╤ì╤é╨│╤ì╤å╨╕╨╣╨╜ ╤ì╤Ç╥»╥»╨╗ ╨╝╤ì╨╜╨┤╨╕╨╣╨│ ╤ü╨░╨╣╨╢╤Ç╤â╤â╨╗╨░╤à',
      schedule: isEnglish ? 'TUE-THU / 16:30 - 17:30' : '╨ó╨ú-╨æ╨É / 16:30 - 17:30',
      coach: isEnglish ? 'Instructor: Lisa Park' : '╨û.╨í╤â╤Ç╨│╤â╤â╨╗╤î: ╨¢╨╕╨╖╨░ ╨ƒ╨░╤Ç╨║',
      location: isEnglish ? 'Wellness Studio / Room 201' : '╨¡╤Ç╥»╥»╨╗ ╨£╤ì╨╜╨┤╨╕╨╣╨╜ ╨í╤é╤â╨┤╨╕╨╛ / ╙¿╤Ç╙⌐╙⌐ 201',
      isDofe: true,
    },
    {
      id: 'dance',
      name: isEnglish ? 'Dance (DofE)' : '╨æ╥»╨╢╨╕╨│ (DofE)',
      description: isEnglish
        ? 'Express yourself through dance while building coordination and confidence'
        : '╨æ╥»╨╢╨╕╨│╤ì╤ì╤Ç ╤ü╨╛╨╜╨│╨╕╨╜╨░╨░ ╨╕╨╗╤ì╤Ç╤à╨╕╨╣╨╗╨╢, ╨║╨╛╨╛╤Ç╨┤╨╕╨╜╨░╤å, ╨╕╤é╨│╤ì╨╗ ╤ç╨░╨┤╨▓╨░╤Ç╤ï╨│ ╨▒╙⌐╨│╙⌐╙⌐╨╗╙⌐╤à',
      schedule: isEnglish ? 'MON-WED / 18:00 - 19:00' : '╨ö╨É-╨æ╥« / 18:00 - 19:00',
      coach: isEnglish ? 'Choreographer: Miguel Santos' : '╨û.╨í╤â╤Ç╨│╤â╤â╨╗╤î: ╨£╨╕╨│╨╡╨╗╤î ╨í╨░╨╜╤é╨╛╤ü',
      location: isEnglish ? 'Dance Studio / Hall 4' : '╨æ╥»╨╢╨│╨╕╨╣╨╜ ╨í╤é╤â╨┤╨╕╨╛ / ╨ª╤ì╨╜╨│╤ì╨╗╨┤╤ì╤à 4',
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
              {isEnglish ? 'Athletics' : '╨í╨┐╨╛╤Ç╤é'}
            </h1>
            <p className="text-lg text-black text-opacity-70">
              {isEnglish
                ? 'Build strength, teamwork, and excellence through our competitive athletic programs. From individual sports to team-based activities, we offer something for every athlete.'
                : '╨£╨░╨╜╨░╨╣ ╤ü╨┐╨╛╤Ç╤é╤ï╨╜ ╨┐╤Ç╨╛╨│╤Ç╨░╨╝╤â╤â╨┤╨░╨░╤Ç ╤à╥»╤ç ╤ç╨░╨┤╨░╨╗, ╨▒╨░╨│ ╤ü╨░╨╜╨░╨░, ╤à╥»╨╜╨┤ ╨░╨╢╨╕╨╗ ╥»╥»╤ü╨│╤ì╨╗╤é ╤à╨╕╨╣╨╜╤ì'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Teams Showcase */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {teams.map((team, index) => (
              <motion.div
                key={team.id}
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
                        {team.name.charAt(0)}
                      </div>
                      <p className="text-white/40 text-sm">{isEnglish ? 'Team Photo' : '╨æ╨░╨│ ╨ù╤â╤Ç╨░╨│'}</p>
                    </div>
                  </div>

                  {/* Status Badge */}
                  {team.isDofe && (
                    <div className="absolute top-4 right-4 bg-cardinal-red text-white px-3 py-1 text-xs font-bold rounded">
                      DOFE
                    </div>
                  )}

                  {/* Team Label - Vertical */}
                  <div className="absolute left-4 top-1/2 transform -translate-y-1/2 writing-mode-vertical text-white font-bold text-lg uppercase tracking-widest">
                    <div style={{ writingMode: 'vertical-lr', transform: 'rotate(180deg)' }}>
                      {team.name}
                    </div>
                  </div>
                </motion.div>

                {/* Details */}
                <motion.div className="space-y-4 order-1 lg:order-2">
                  <div>
                    <p className="text-black text-opacity-70 leading-relaxed mb-4">
                      {team.description}
                    </p>
                  </div>

                  <div className="space-y-3 bg-gray-50 rounded-lg p-6">
                    <div>
                      <p className="text-black text-opacity-50 text-sm uppercase tracking-wider">
                        {isEnglish ? 'Meeting Times' : '╨ú╤â╨╗╨╖╨░╨╗╤é╤ï╨╜ ╨ª╨░╨│'}
                      </p>
                      <p className="text-black font-bold">{team.schedule}</p>
                    </div>
                    <div>
                      <p className="text-black text-opacity-50 text-sm uppercase tracking-wider">
                        {isEnglish ? 'Head Coach' : '╨û.╨í╤â╤Ç╨│╤â╤â╨╗╤î'}
                      </p>
                      <p className="text-black font-bold">{team.coach}</p>
                    </div>
                    <div>
                      <p className="text-black text-opacity-50 text-sm uppercase tracking-wider">
                        {isEnglish ? 'Location' : '╨æ╨░╨╣╤Ç╤ê╨╕╨╗'}
                      </p>
                      <p className="text-black font-bold">{team.location}</p>
                    </div>
                  </div>

                  <button className="w-full border-2 border-black text-black font-bold py-3 rounded hover:bg-black hover:text-white transition">
                    {isEnglish ? 'VIEW ROSTER' : '╨æ╨É╨ô ╥«╨ù╨¡╨Ñ'}
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
