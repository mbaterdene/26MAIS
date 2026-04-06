import { useState, useMemo } from 'react';
import WorldMapComponent from 'react-svg-worldmap';
import type { CountryContext } from 'react-svg-worldmap';
import { AnimatePresence, motion } from 'framer-motion';
import { getCountryAlumniData, getUniversitiesByCountry } from '../data/alumniData';
import AlumniPopup from './ui/AlumniPopup';
import AlumniPostersSlider from './ui/AlumniPostersSlider';
import { useLanguage } from '../context/LanguageContext';

interface CountryData {
  country: string;
  value: number;
  color?: string;
}

// Premium color palette with sophisticated contrast and regional awareness
const generateCountryData = (): CountryData[] => {
  const countryAlumniData = getCountryAlumniData();
  
  const premiumColors = [
    "#E11D48", // Rose-600
    "#0369A1", // Sky-700
    "#059669", // Emerald-600
    "#D97706", // Amber-600
    "#7C3AED", // Violet-600
    "#DC2626", // Red-600
    "#0891B2", // Cyan-600
    "#D91B77", // Pink-600
    "#1F2937", // Gray-800
    "#BE185D", // Pink-700
    "#1E40AF", // Blue-800
    "#15803D", // Green-700
    "#B45309", // Amber-700
    "#5B21B6", // Purple-700
    "#EA580C", // Orange-600
    "#0E7490", // Cyan-700
    "#A21CAF", // Fuchsia-600
    "#374151", // Gray-700
    "#7F1D1D", // Red-900
    "#164E63", // Cyan-900
  ];

  const regionColorAssignment: { [key: string]: string } = {
    // North America
    "US": premiumColors[1],
    "CA": premiumColors[5],
    
    // Europe - Warm palette
    "GB": premiumColors[0],
    "DE": premiumColors[4],
    "FR": premiumColors[3],
    "IT": premiumColors[7],
    "ES": premiumColors[2],
    "AT": premiumColors[12],
    "PL": premiumColors[10],
    "CZ": premiumColors[14],
    "HU": premiumColors[9],
    "RO": premiumColors[17],
    "UA": premiumColors[8],
    "TR": premiumColors[15],
    
    // Asia-Pacific
    "CN": premiumColors[2],
    "JP": premiumColors[1],
    "KR": premiumColors[6],
    "TW": premiumColors[11],
    "HK": premiumColors[19],
    "KG": premiumColors[13],
    "RU": premiumColors[18],
    "AU": premiumColors[16],
  };

  return countryAlumniData
    .filter((countryData) => countryData.countryCode !== 'MN')
    .map((countryData) => ({
      country: countryData.countryCode,
      value: countryData.totalAlumni,
      color: regionColorAssignment[countryData.countryCode] || premiumColors[0]
    }));
};

const countryData: CountryData[] = generateCountryData();

export default function WorldMap() {
  const { isEnglish, t } = useLanguage();
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  // World map styling with premium appearance
  const worldMapStyles = `
    .world-map-container {
      position: relative !important;
      width: 100% !important;
      height: 100% !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      overflow: hidden !important;
      background: #ffffff !important;
    }
    
    .world-map-container > figure {
      width: 100% !important;
      height: 100% !important;
      margin: 0 !important;
      padding: 0 !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
    }
    
    .world-map-container svg {
      max-width: 100% !important;
      max-height: 100% !important;
      width: auto !important;
      height: 100% !important;
      object-fit: contain !important;
      filter: drop-shadow(0 10px 25px rgba(0, 0, 0, 0.08));
    }
  `;

  const filteredCountryData = useMemo(() => {
    if (searchTerm === '') return countryData;
    
    return countryData.filter(country => {
      const countryName = getCountryNameTranslated(country.country);
      const universities = getUniversitiesByCountry(country.country);
      
      return countryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
             universities.some(uni => uni.name.toLowerCase().includes(searchTerm.toLowerCase()));
    });
  }, [searchTerm]);

  const getCountryNameTranslated = (code: string): string => {
    // Country name mapping for translations
    const countryNames: { [key: string]: { en: string; mn: string } } = {
      'US': { en: 'United States', mn: 'Америк Нэгдсэн Улс' },
      'CA': { en: 'Canada', mn: 'Канад' },
      'GB': { en: 'United Kingdom', mn: 'Нэгдсэн Хаант Улс' },
      'DE': { en: 'Germany', mn: 'Герман' },
      'FR': { en: 'France', mn: 'Франц' },
      'IT': { en: 'Italy', mn: 'Итали' },
      'ES': { en: 'Spain', mn: 'Испани' },
      'AT': { en: 'Austria', mn: 'Австри' },
      'PL': { en: 'Poland', mn: 'Польш' },
      'CZ': { en: 'Czech Republic', mn: 'Чехия' },
      'HU': { en: 'Hungary', mn: 'Унгар' },
      'RO': { en: 'Romania', mn: 'Румын' },
      'UA': { en: 'Ukraine', mn: 'Украйн' },
      'TR': { en: 'Turkey', mn: 'Турк' },
      'CN': { en: 'China', mn: 'Хятад' },
      'JP': { en: 'Japan', mn: 'Япон' },
      'KR': { en: 'South Korea', mn: 'Өмнөд Солонгос' },
      'TW': { en: 'Taiwan', mn: 'Тайвань' },
      'HK': { en: 'Hong Kong', mn: 'Сүүлийн Хонконг' },
      'KG': { en: 'Kyrgyzstan', mn: 'Киргизстан' },
      'RU': { en: 'Russia', mn: 'Орос' },
      'AU': { en: 'Australia', mn: 'Австрали' },
    };

    const names = countryNames[code];
    return names ? (isEnglish ? names.en : names.mn) : code;
  };

  const getTooltipContent = (ctx: CountryContext) => {
    const data = filteredCountryData.find(item => item.country === ctx.countryCode);
    if (data) {
      const countryName = getCountryNameTranslated(ctx.countryCode);
      const label = isEnglish ? 'alumni' : 'төгсөгчид';
      return `${countryName}: ${data.value} ${label}`;
    }
    return "";
  };

  const handleCountryClick = (ctx: CountryContext) => {
    const data = filteredCountryData.find(item => item.country === ctx.countryCode);
    if (data && data.value > 0) {
      setSelectedCountry(ctx.countryCode);
    }
  };

  const handleClosePopup = () => {
    setSelectedCountry(null);
  };

  const handleResetFilters = () => {
    setSearchTerm('');
  };
  
  const selectedCountryUniversities = useMemo(() => {
    if (!selectedCountry) return [];
    return getUniversitiesByCountry(selectedCountry);
  }, [selectedCountry]);

  const totalAlumni = filteredCountryData.reduce((sum, c) => sum + c.value, 0);
  const totalCountries = filteredCountryData.length;
  const totalUniversities = filteredCountryData.reduce((sum, c) => sum + getUniversitiesByCountry(c.country).length, 0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: worldMapStyles }} />
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
        className="relative w-full bg-gray-50 overflow-hidden py-12 md:py-16"
      >
        <div className="container mx-auto px-4">
        {/* Header Section */}
        <motion.div variants={itemVariants} className="py-8 md:py-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2 text-center">
            {t('Global Alumni Network', 'Дэлхийн Төгсөгчдийн Сүлжээ')}
          </h2>
          <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto">
            {t('Our graduates are making an impact across the world', 'Манай төгсөгчид дэлхий даяар нөлөөлөл үзүүлж байна')}
          </p>
        </motion.div>

        {/* Search & Filters Section */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  {t('Search countries or universities', 'Орнууд эсвэл их сургуулиудыг хайх')}
                </label>
                <input
                  type="text"
                  placeholder={t('Enter country or university name...', 'Улс эсвэл их сургуулийн нэрийг оруулна уу...')}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-rose-500 focus:outline-none transition-colors duration-200 text-gray-700 placeholder-gray-400"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex items-end">
                <button
                  className="w-full px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-lg transition-colors duration-200"
                  onClick={handleResetFilters}
                >
                  {t('Reset', 'Дахин эхлүүлэх')}
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <motion.div variants={itemVariants} className="mb-8 pt-8 md:pt-0">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Map Section - Takes 3 columns */}
            <div className="lg:col-span-3 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="aspect-video md:aspect-auto h-[500px]">
                {filteredCountryData.length > 0 ? (
                  <div className="w-full h-full world-map-container">
                    <WorldMapComponent
                      color="red"
                      title=""
                      valueSuffix="alumni"
                      size="responsive"
                      data={filteredCountryData as any}
                      tooltipTextFunction={getTooltipContent}
                      onClickFunction={handleCountryClick}
                      styleFunction={(ctx: CountryContext) => {
                        const countryInfo = filteredCountryData.find(item => item.country === ctx.countryCode);
                        return {
                          fill: countryInfo?.color || "#F3F4F6",
                          stroke: "#E5E7EB",
                          strokeWidth: 0.5,
                          cursor: countryInfo ? 'pointer' : 'default',
                          hover: {
                            fill: countryInfo?.color ? `${countryInfo.color}cc` : "#E5E7EB",
                            outline: "none",
                            strokeWidth: 1,
                            stroke: "#1F2937"
                          }
                        };
                      }}
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-slate-50 to-slate-100">
                    <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <h4 className="text-lg font-semibold text-gray-600 mb-2">{t('No results found', 'Үр дүн олдсонгүй')}</h4>
                    <button
                      className="px-4 py-2 mt-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors"
                      onClick={handleResetFilters}
                    >
                      {t('Clear filters', 'Шүүлтүүрийг арилгах')}
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Stats Panel - Takes 1 column */}
            <div className="lg:col-span-1 space-y-4">
              {/* Total Alumni */}
              <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
                <p className="text-xs uppercase tracking-widest text-gray-600 font-semibold mb-1">{t('Total Alumni', 'Нийт Төгсөгчид')}</p>
                <p className="text-3xl font-bold text-gray-900">{totalAlumni}</p>
              </div>

              {/* Countries */}
              <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
                <p className="text-xs uppercase tracking-widest text-gray-600 font-semibold mb-1">{t('Countries', 'Орнууд')}</p>
                <p className="text-3xl font-bold text-gray-900">{totalCountries}</p>
              </div>

              {/* Universities */}
              <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
                <p className="text-xs uppercase tracking-widest text-gray-600 font-semibold mb-1">{t('Universities', 'Их Сургуулиуд')}</p>
                <p className="text-3xl font-bold text-gray-900">{totalUniversities}</p>
              </div>

              {/* Top Destination */}
              {filteredCountryData.length > 0 && (
                <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
                  <p className="text-xs uppercase tracking-widest text-gray-600 font-semibold mb-3">{t('Top Destination', 'Ивээлтийн Орон')}</p>
                  <div className="space-y-2">
                    {filteredCountryData
                      .sort((a, b) => b.value - a.value)
                      .slice(0, 3)
                      .map((item, index) => (
                        <div key={item.country} className="flex items-center gap-3">
                          <div
                            className="flex-shrink-0 w-3 h-3 rounded-full"
                            style={{ backgroundColor: item.color }}
                          ></div>
                          <span className="text-sm font-medium text-gray-700 truncate">
                            {index + 1}. {getCountryNameTranslated(item.country)}
                          </span>
                          <span className="text-sm font-bold text-gray-600 ml-auto">{item.value}</span>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Alumni Posters Slider */}
        <motion.div variants={itemVariants} className="pt-8 md:pt-12 -mx-4 md:-mx-8 px-4 md:px-8 bg-white">
          <AlumniPostersSlider />
        </motion.div>

        {/* Popup Dialog */}
        <AnimatePresence>
          {selectedCountry && (
            <AlumniPopup
              universities={selectedCountryUniversities}
              countryName={getCountryNameTranslated(selectedCountry)}
              onClose={handleClosePopup}
            />
          )}
        </AnimatePresence>
        </div>
      </motion.div>
    </>
  );
}
