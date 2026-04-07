import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

// Sample subject data
const SAMPLE_SUBJECTS = [
  // International - AS/A
  { id: 1, name: 'Biology', code: '9700', level: 'AS/A', program: 'international' },
  { id: 2, name: 'Chemistry', code: '9701', level: 'AS/A', program: 'international' },
  { id: 3, name: 'Physics', code: '9702', level: 'AS/A', program: 'international' },
  { id: 4, name: 'Mathematics', code: '9709', level: 'AS/A', program: 'international' },
  { id: 5, name: 'Further Mathematics', code: '9231', level: 'AS/A', program: 'international' },
  { id: 6, name: 'English Language', code: '9093', level: 'AS/A', program: 'international' },
  { id: 7, name: 'History', code: '9389', level: 'AS/A', program: 'international' },
  { id: 8, name: 'Geography', code: '9395', level: 'AS/A', program: 'international' },
  
  // International - IGCSE
  { id: 9, name: 'English Language', code: '0500', level: 'IGCSE', program: 'international' },
  { id: 10, name: 'Mathematics', code: '0580', level: 'IGCSE', program: 'international' },
  { id: 11, name: 'Biology', code: '0610', level: 'IGCSE', program: 'international' },
  { id: 12, name: 'Chemistry', code: '0620', level: 'IGCSE', program: 'international' },
  
  // National Programme (Mongolian)
  { id: 13, name: 'Mongolian Language', level: 'Mongolian', program: 'national' },
  { id: 14, name: 'Mongolian History', level: 'Mongolian', program: 'national' },
  { id: 15, name: 'Mathematics', level: 'Mongolian', program: 'national' },
  { id: 16, name: 'Physics', level: 'Mongolian', program: 'national' },
  { id: 17, name: 'Chemistry', level: 'Mongolian', program: 'national' },
  { id: 18, name: 'English Language', level: 'Mongolian', program: 'national' },
  { id: 19, name: 'Social Studies', level: 'Mongolian', program: 'national' },
  { id: 20, name: 'Science Foundations', level: 'Mongolian', program: 'national' },
];

const LEVELS = ['IGCSE', 'AS/A', 'Mongolian'];

export function AcademicsPage() {
  const { isEnglish } = useLanguage();
  const location = useLocation();
  
  const [searchText, setSearchText] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  // Apply program filter from query param
  const programFilter = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return params.get('program');
  }, [location.search]);

  // Filter subjects
  const filtered = useMemo(() => {
    let result = SAMPLE_SUBJECTS;

    // Program filter (international/national)
    if (programFilter === 'international') {
      result = result.filter(s => s.program === 'international');
    } else if (programFilter === 'national') {
      result = result.filter(s => s.program === 'national');
    }

    // Search by name or code
    if (searchText) {
      const query = searchText.toLowerCase();
      result = result.filter(s =>
        (s.name && s.name.toLowerCase().includes(query)) ||
        (s.code && s.code.toLowerCase().includes(query))
      );
    }

    // Level filter
    if (selectedLevel) {
      result = result.filter(s => s.level === selectedLevel);
    }

    return result;
  }, [searchText, selectedLevel, programFilter]);

  const handleLevelSelect = (level: string) => {
    setSelectedLevel(selectedLevel === level ? '' : level);
  };

  const title = isEnglish ? 'Academics' : 'Боловсрол';
  const subtitle = isEnglish
    ? 'National and international programs with Cambridge IGCSE, AS & A Level curriculum'
    : 'Кэмбрижийн IGCSE, AS & A Level хөтөлбөртэй үндэсний болон олон улсын сургалт';

  // Group subjects by program
  const internationalSubjects = filtered.filter(s => s.program === 'international');
  const nationalSubjects = filtered.filter(s => s.program === 'national');

  const shouldShowBothPrograms = !programFilter && filtered.length > 0;

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-black text-white py-44 flex items-center justify-center">
        <motion.div
          className="text-center max-w-4xl px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">{title}</h1>
          <p className="text-xl md:text-2xl text-gray-300">{subtitle}</p>
        </motion.div>
      </section>

      {/* Subject Browser */}
      <motion.section
        className="py-12 bg-slate-50"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Filters */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <div className="bg-white rounded-lg border-2 border-cardinal-red p-6 space-y-6">
                <h2 className="text-lg font-bold text-gray-900">
                  {isEnglish ? 'Filter subjects:' : 'Хичээл сүүдрүүлэх:'}
                </h2>

                {/* Search */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-cardinal-red mb-3">
                    {isEnglish ? 'By Title/Code' : 'Нэр/Код'}
                  </h3>
                  <div className="relative">
                    <Search size={16} className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      placeholder={isEnglish ? 'Search...' : 'Хайх...'}
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cardinal-red"
                    />
                  </div>
                </div>

                {/* Level Filter */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-cardinal-red mb-3">
                    {isEnglish ? 'By Level' : 'Түвшин'}
                  </h3>
                  <div className="space-y-2 pl-0">
                    {LEVELS.map(level => (
                      <label key={level} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="level"
                          checked={selectedLevel === level}
                          onChange={() => handleLevelSelect(level)}
                          className="w-4 h-4 cursor-pointer accent-cardinal-red"
                        />
                        <span className="text-sm text-gray-700">{level}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Subject List */}
            <div className="lg:col-span-3">
              <motion.div
                className="space-y-8"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
              >
                {/* International Subjects */}
                {(shouldShowBothPrograms || programFilter === 'international') && internationalSubjects.length > 0 && (
                  <div>
                    <motion.h3 variants={itemVariants} className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-cardinal-red">
                      {isEnglish ? 'International Programme' : 'Олон улсын хөтөлбөр'}
                    </motion.h3>
                    <motion.div
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                      variants={containerVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                    >
                      {internationalSubjects.map((subject) => (
                        <motion.div
                          key={subject.id}
                          variants={itemVariants}
                          className="bg-white rounded-lg border border-gray-200 hover:border-cardinal-red hover:shadow-lg transition-all p-4 group"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1">
                              <h4 className="text-base font-bold text-gray-900 group-hover:text-cardinal-red transition-colors">
                                {subject.name}
                              </h4>
                              {subject.code && (
                                <p className="text-xs text-gray-500 mt-1 font-semibold tracking-wide">
                                  {subject.code}
                                </p>
                              )}
                            </div>
                            <span className="bg-red-100 text-cardinal-red px-2 py-1 rounded text-xs font-semibold whitespace-nowrap">
                              {subject.level}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                )}

                {/* National Subjects */}
                {(shouldShowBothPrograms || programFilter === 'national') && nationalSubjects.length > 0 && (
                  <div>
                    <motion.h3 variants={itemVariants} className="text-2xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-digital-blue">
                      {isEnglish ? 'National Programme' : 'Үндэсний хөтөлбөр'}
                    </motion.h3>
                    <motion.div
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                      variants={containerVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                    >
                      {nationalSubjects.map((subject) => (
                        <motion.div
                          key={subject.id}
                          variants={itemVariants}
                          className="bg-white rounded-lg border border-gray-200 hover:border-digital-blue hover:shadow-lg transition-all p-4 group"
                        >
                          <h4 className="text-base font-bold text-gray-900 group-hover:text-digital-blue transition-colors">
                            {subject.name}
                          </h4>
                          {subject.code && (
                            <p className="text-xs text-gray-500 mt-1 font-semibold tracking-wide">
                              {subject.code}
                            </p>
                          )}
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                )}

                {filtered.length === 0 && (
                  <motion.div
                    variants={itemVariants}
                    className="text-center py-12 text-gray-500"
                  >
                    <p className="text-lg">{isEnglish ? 'No subjects found' : 'Ямар ч хичээл олдсонгүй'}</p>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
