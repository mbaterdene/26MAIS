import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Search } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

// Sample subject data
const SAMPLE_SUBJECTS = [
  // International - AS/A
  { id: 1, name_en: 'Biology', name_mn: 'Биология', code: '9700', level: 'AS/A', program: 'international' },
  { id: 2, name_en: 'Chemistry', name_mn: 'Хими', code: '9701', level: 'AS/A', program: 'international' },
  { id: 3, name_en: 'Physics', name_mn: 'Физик', code: '9702', level: 'AS/A', program: 'international' },
  { id: 4, name_en: 'Mathematics', name_mn: 'Математик', code: '9709', level: 'AS/A', program: 'international' },
  { id: 5, name_en: 'Further Mathematics', name_mn: 'Нэмэлт Математик', code: '9231', level: 'AS/A', program: 'international' },
  { id: 6, name_en: 'English Language', name_mn: 'Англи хэл', code: '9093', level: 'AS/A', program: 'international' },
  { id: 7, name_en: 'History', name_mn: 'Түүх', code: '9389', level: 'AS/A', program: 'international' },
  { id: 8, name_en: 'Geography', name_mn: 'Газарзүйн мэдлэг', code: '9395', level: 'AS/A', program: 'international' },
  
  // International - IGCSE
  { id: 9, name_en: 'English Language', name_mn: 'Англи хэл', code: '0500', level: 'IGCSE', program: 'international' },
  { id: 10, name_en: 'Mathematics', name_mn: 'Математик', code: '0580', level: 'IGCSE', program: 'international' },
  { id: 11, name_en: 'Biology', name_mn: 'Биология', code: '0610', level: 'IGCSE', program: 'international' },
  { id: 12, name_en: 'Chemistry', name_mn: 'Хими', code: '0620', level: 'IGCSE', program: 'international' },
  
  // National Programme (Mongolian)
  { id: 13, name_en: 'Mongolian Language', name_mn: 'Монгол хэл', level: 'National', program: 'national' },
  { id: 14, name_en: 'Mongolian History', name_mn: 'Монгол түүх', level: 'National', program: 'national' },
  { id: 15, name_en: 'Mathematics', name_mn: 'Математик', level: 'National', program: 'national' },
  { id: 16, name_en: 'Physics', name_mn: 'Физик', level: 'National', program: 'national' },
  { id: 17, name_en: 'Chemistry', name_mn: 'Хими', level: 'National', program: 'national' },
  { id: 18, name_en: 'English Language', name_mn: 'Англи хэл', level: 'National', program: 'national' },
  { id: 19, name_en: 'Social Studies', name_mn: 'Нийгмийн ухаан', level: 'National', program: 'national' },
  { id: 20, name_en: 'Science Foundations', name_mn: 'Шинжлэх ухааны суурь', level: 'National', program: 'national' },
];

const LEVELS = ['IGCSE', 'AS/A', 'National'];

export function AcademicsPage() {
  const { isEnglish } = useLanguage();
  const location = useLocation();
  
  
  const [searchText, setSearchText] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('');

  const containerVariants = {
    hidden: {},
    visible: {},
  };

  const itemVariants = {
    hidden: {},
    visible: {},
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
        (s.name_en && s.name_en.toLowerCase().includes(query)) ||
        (s.name_mn && s.name_mn.toLowerCase().includes(query)) ||
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

  // Group subjects by program
  const internationalSubjects = filtered.filter(s => s.program === 'international');
  const nationalSubjects = filtered.filter(s => s.program === 'national');

  const shouldShowBothPrograms = !programFilter && filtered.length > 0;

  return (
    <div className="w-full">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white border-b-2 border-black pt-24 pb-8"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-black uppercase tracking-widest text-black mb-2">
            {isEnglish ? 'Academics' : 'Боловсрол'}
          </h1>
          <p className="text-sm font-bold uppercase tracking-wide text-gray-700">
            {isEnglish
              ? 'National and international programs with Cambridge IGCSE, AS & A Level curriculum'
              : 'Кэмбрижийн IGCSE, AS & A Level хөтөлбөртэй үндэсний болон олон улсын сургалт'}
          </p>
        </div>
      </motion.div>

      {/* Subject Browser */}
      <motion.section
        className="py-12 bg-white pt-12 pb-24"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Filters */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <div className="bg-white border-2 border-black p-6 space-y-6">
                <h2 className="text-sm font-black uppercase tracking-widest text-black">
                  {isEnglish ? 'Filter subjects:' : 'Хичээл сүүдрүүлэх:'}
                </h2>

                {/* Search */}
                <div>
                  <h3 className="text-xs font-black uppercase tracking-widest text-black mb-3 pb-2 border-b border-gray-300">
                    {isEnglish ? 'By Title/Code' : 'Нэр/Код'}
                  </h3>
                  <div className="relative">
                    <Search size={16} className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      placeholder={isEnglish ? 'Search...' : 'Хайх...'}
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border-2 border-black text-sm outline-none"
                    />
                  </div>
                </div>

                {/* Level Filter */}
                <div>
                  <h3 className="text-xs font-black uppercase tracking-widest text-black mb-3 pb-2 border-b border-gray-300">
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
                          className="w-4 h-4 cursor-pointer accent-black"
                        />
                        <span className="text-sm font-bold text-gray-900">{level}</span>
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
                    <motion.h3 variants={itemVariants} className="text-xl font-black uppercase tracking-wide text-black mb-6 pb-3 border-b-2 border-black">
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
                          className="bg-white border-2 border-black hover:shadow-lg transition-all p-5 group"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1">
                              <h4 className="text-sm font-black uppercase tracking-wide text-black group-hover:text-cardinal-red transition-colors">
                                {isEnglish ? subject.name_en : subject.name_mn}
                              </h4>
                              {subject.code && (
                                <p className="text-xs text-gray-600 mt-2 font-bold tracking-widest">
                                  {subject.code}
                                </p>
                              )}
                            </div>
                            <span className="bg-cardinal-red text-white px-2 py-1 text-xs font-black whitespace-nowrap">
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
                    <motion.h3 variants={itemVariants} className="text-xl font-black uppercase tracking-wide text-black mb-6 pb-3 border-b-2 border-black">
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
                          className="bg-white border-2 border-black hover:shadow-lg transition-all p-5 group"
                        >
                          <h4 className="text-sm font-black uppercase tracking-wide text-black group-hover:text-cardinal-red transition-colors">
                            {isEnglish ? subject.name_en : subject.name_mn}
                          </h4>
                          {subject.code && (
                            <p className="text-xs text-gray-600 mt-2 font-bold tracking-widest">
                              {subject.code}
                            </p>
                          )}
                          <span className="bg-cardinal-red text-white px-2 py-1 text-xs font-black mt-3 inline-block whitespace-nowrap">
                            {subject.level}
                          </span>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                )}

                {filtered.length === 0 && (
                  <motion.div
                    variants={itemVariants}
                    className="text-center py-12 text-gray-900"
                  >
                    <p className="text-sm font-black uppercase tracking-widest">{isEnglish ? 'No subjects found' : 'Ямар ч хичээл олдсонгүй'}</p>
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
