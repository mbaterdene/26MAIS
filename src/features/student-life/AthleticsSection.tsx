import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import athleticsData from '../../content/student-life/athletics.json';

export function AthleticsSection() {
  const { isEnglish } = useLanguage();

  const getText = (obj: { en: string; mn: string }) => isEnglish ? obj.en : obj.mn;

  const teams = athleticsData.teams.map(team => ({
    ...team,
    name: getText(team.name),
    description: getText(team.description),
    schedule: getText(team.schedule),
    coach: getText(team.coach),
    location: getText(team.location),
  }));

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
              {getText(athleticsData.title)}
            </h1>
            <p className="text-lg text-black text-opacity-70">
              {getText(athleticsData.description)}
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
                      <p className="text-white/40 text-sm">{isEnglish ? 'Team Photo' : 'Баг Зураг'}</p>
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
                        {isEnglish ? 'Meeting Times' : 'Уулзалтын цаг'}
                      </p>
                      <p className="text-black font-bold">{team.schedule}</p>
                    </div>
                    <div>
                      <p className="text-black text-opacity-50 text-sm uppercase tracking-wider">
                        {isEnglish ? 'Head Coach' : 'Тамирчны ахлагч'}
                      </p>
                      <p className="text-black font-bold">{team.coach}</p>
                    </div>
                    <div>
                      <p className="text-black text-opacity-50 text-sm uppercase tracking-wider">
                        {isEnglish ? 'Location' : 'Байршил'}
                      </p>
                      <p className="text-black font-bold">{team.location}</p>
                    </div>
                  </div>

                  <button className="w-full border-2 border-black text-black font-bold py-3 rounded hover:bg-black hover:text-white transition">
                    {isEnglish ? 'VIEW ROSTER' : 'Багийн жагсаалтыг үзэх'}
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
