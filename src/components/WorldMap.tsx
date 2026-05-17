import { useState, useMemo } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
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

const geoUrl = 'https://unpkg.com/world-atlas@2/countries-50m.json';

// Map ALL country names from world-atlas to ISO_A2 codes (241 countries, excluding Antarctica)
const countryNameToCode: { [key: string]: string } = {
  'Afghanistan': 'AF', 'Albania': 'AL', 'Algeria': 'DZ', 'American Samoa': 'AS', 'Andorra': 'AD',
  'Angola': 'AO', 'Anguilla': 'AI', 'Antarctica': 'AQ', 'Antigua and Barb.': 'AG', 'Argentina': 'AR',
  'Armenia': 'AM', 'Aruba': 'AW', 'Ashmore and Cartier Is.': 'AS', 'Australia': 'AU', 'Austria': 'AT',
  'Azerbaijan': 'AZ', 'Bahamas': 'BS', 'Bahrain': 'BH', 'Bangladesh': 'BD', 'Barbados': 'BB',
  'Belarus': 'BY', 'Belgium': 'BE', 'Belize': 'BZ', 'Benin': 'BJ', 'Bermuda': 'BM',
  'Bhutan': 'BT', 'Bolivia': 'BO', 'Bosnia and Herz.': 'BA', 'Botswana': 'BW', 'Br. Indian Ocean Ter.': 'IO',
  'Brazil': 'BR', 'British Virgin Is.': 'VG', 'Brunei': 'BN', 'Bulgaria': 'BG', 'Burkina Faso': 'BF',
  'Burundi': 'BI', 'Cabo Verde': 'CV', 'Cambodia': 'KH', 'Cameroon': 'CM', 'Canada': 'CA',
  'Cayman Is.': 'KY', 'Central African Rep.': 'CF', 'Chad': 'TD', 'Chile': 'CL', 'China': 'CN',
  'Colombia': 'CO', 'Comoros': 'KM', 'Congo': 'CG', 'Cook Is.': 'CK', 'Costa Rica': 'CR',
  'Croatia': 'HR', 'Cuba': 'CU', 'Curaçao': 'CW', 'Cyprus': 'CY', 'Czechia': 'CZ',
  'Côte d\'Ivoire': 'CI', 'Dem. Rep. Congo': 'CD', 'Denmark': 'DK', 'Djibouti': 'DJ', 'Dominica': 'DM',
  'Dominican Rep.': 'DO', 'Ecuador': 'EC', 'Egypt': 'EG', 'El Salvador': 'SV', 'Eq. Guinea': 'GQ',
  'Eritrea': 'ER', 'Estonia': 'EE', 'Ethiopia': 'ET', 'Faeroe Is.': 'FO', 'Falkland Is.': 'FK',
  'Fiji': 'FJ', 'Finland': 'FI', 'Fr. Polynesia': 'PF', 'Fr. S. Antarctic Lands': 'TF', 'France': 'FR',
  'Gabon': 'GA', 'Gambia': 'GM', 'Georgia': 'GE', 'Germany': 'DE', 'Ghana': 'GH',
  'Greece': 'GR', 'Greenland': 'GL', 'Grenada': 'GD', 'Guam': 'GU', 'Guatemala': 'GT',
  'Guernsey': 'GG', 'Guinea': 'GN', 'Guinea-Bissau': 'GW', 'Guyana': 'GY', 'Haiti': 'HT',
  'Heard I. and McDonald Is.': 'HM', 'Honduras': 'HN', 'Hong Kong': 'HK', 'Hungary': 'HU', 'Iceland': 'IS',
  'India': 'IN', 'Indian Ocean Ter.': 'IO', 'Indonesia': 'ID', 'Iran': 'IR', 'Iraq': 'IQ',
  'Ireland': 'IE', 'Isle of Man': 'IM', 'Israel': 'IL', 'Italy': 'IT', 'Jamaica': 'JM',
  'Japan': 'JP', 'Jersey': 'JE', 'Jordan': 'JO', 'Kazakhstan': 'KZ', 'Kenya': 'KE',
  'Kiribati': 'KI', 'Kosovo': 'XK', 'Kuwait': 'KW', 'Kyrgyzstan': 'KG', 'Laos': 'LA',
  'Latvia': 'LV', 'Lebanon': 'LB', 'Lesotho': 'LS', 'Liberia': 'LR', 'Libya': 'LY',
  'Liechtenstein': 'LI', 'Lithuania': 'LT', 'Luxembourg': 'LU', 'Macao': 'MO', 'Macedonia': 'MK',
  'Madagascar': 'MG', 'Malawi': 'MW', 'Malaysia': 'MY', 'Maldives': 'MV', 'Mali': 'ML',
  'Malta': 'MT', 'Marshall Is.': 'MH', 'Mauritania': 'MR', 'Mauritius': 'MU', 'Mexico': 'MX',
  'Micronesia': 'FM', 'Moldova': 'MD', 'Monaco': 'MC', 'Mongolia': 'MN', 'Montenegro': 'ME',
  'Montserrat': 'MS', 'Morocco': 'MA', 'Mozambique': 'MZ', 'Myanmar': 'MM', 'N. Cyprus': 'CY',
  'N. Mariana Is.': 'MP', 'Namibia': 'NA', 'Nauru': 'NR', 'Nepal': 'NP', 'Netherlands': 'NL',
  'New Caledonia': 'NC', 'New Zealand': 'NZ', 'Nicaragua': 'NI', 'Niger': 'NE', 'Nigeria': 'NG',
  'Niue': 'NU', 'Norfolk Island': 'NF', 'North Korea': 'KP', 'Norway': 'NO', 'Oman': 'OM',
  'Pakistan': 'PK', 'Palau': 'PW', 'Palestine': 'PS', 'Panama': 'PA', 'Papua New Guinea': 'PG',
  'Paraguay': 'PY', 'Peru': 'PE', 'Philippines': 'PH', 'Pitcairn Is.': 'PN', 'Poland': 'PL',
  'Portugal': 'PT', 'Puerto Rico': 'PR', 'Qatar': 'QA', 'Romania': 'RO', 'Russia': 'RU',
  'Rwanda': 'RW', 'S. Geo. and the Is.': 'GS', 'S. Sudan': 'SS', 'Saint Helena': 'SH', 'Saint Lucia': 'LC',
  'Samoa': 'WS', 'San Marino': 'SM', 'Saudi Arabia': 'SA', 'Senegal': 'SN', 'Serbia': 'RS',
  'Seychelles': 'SC', 'Siachen Glacier': 'GB', 'Sierra Leone': 'SL', 'Singapore': 'SG', 'Sint Maarten': 'SX',
  'Slovakia': 'SK', 'Slovenia': 'SI', 'Solomon Is.': 'SB', 'Somalia': 'SO', 'Somaliland': 'SO',
  'South Africa': 'ZA', 'South Korea': 'KR', 'Spain': 'ES', 'Sri Lanka': 'LK', 'St-Barthélemy': 'BL',
  'St-Martin': 'MF', 'St. Kitts and Nevis': 'KN', 'St. Pierre and Miquelon': 'PM', 'St. Vin. and Gren.': 'VC',
  'Sudan': 'SD', 'Suriname': 'SR', 'Sweden': 'SE', 'Switzerland': 'CH', 'Syria': 'SY',
  'São Tomé and Príncipe': 'ST', 'Taiwan': 'TW', 'Tajikistan': 'TJ', 'Tanzania': 'TZ', 'Thailand': 'TH',
  'Timor-Leste': 'TL', 'Togo': 'TG', 'Tonga': 'TO', 'Trinidad and Tobago': 'TT', 'Tunisia': 'TN',
  'Turkey': 'TR', 'Turkmenistan': 'TM', 'Turks and Caicos Is.': 'TC', 'U.S. Virgin Is.': 'VI', 'Uganda': 'UG',
  'Ukraine': 'UA', 'United Arab Emirates': 'AE', 'United Kingdom': 'GB', 'United States of America': 'US',
  'Uruguay': 'UY', 'Uzbekistan': 'UZ', 'Vanuatu': 'VU', 'Vatican': 'VA', 'Venezuela': 'VE',
  'Vietnam': 'VN', 'W. Sahara': 'EH', 'Wallis and Futuna Is.': 'WF', 'Yemen': 'YE', 'Zambia': 'ZM',
  'Zimbabwe': 'ZW', 'eSwatini': 'SZ', 'Åland': 'AX',
};

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

// Create a map of country codes to alumni data for quick lookup
const createCountryDataMap = (): { [key: string]: CountryData } => {
  return countryData.reduce((map, data) => {
    map[data.country] = data;
    return map;
  }, {} as { [key: string]: CountryData });
};

export default function WorldMap() {
  const { isEnglish, t } = useLanguage();
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const countryDataMap = useMemo(() => createCountryDataMap(), []);

  // World map responsive container styles
  const mapContainerStyles = `
    .map-svg {
      width: 100%;
      height: 100%;
      filter: drop-shadow(0 10px 25px rgba(0, 0, 0, 0.08));
      display: block;
    }
    .map-svg svg {
      width: 100%;
      height: 100%;
    }
  `;

  // Define translation function BEFORE using it in useMemo
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

  const filteredCountryData = useMemo(() => {
    if (searchTerm === '') return countryData;
    
    return countryData.filter(country => {
      const countryName = getCountryNameTranslated(country.country);
      const universities = getUniversitiesByCountry(country.country);
      
      return countryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
             universities.some(uni => uni.name.toLowerCase().includes(searchTerm.toLowerCase()));
    });
  }, [searchTerm]);

  const handleCountryClick = (countryCode: string) => {
    const data = countryDataMap[countryCode];
    if (data && data.value > 0) {
      setSelectedCountry(countryCode);
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
      <style dangerouslySetInnerHTML={{ __html: mapContainerStyles }} />
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
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-2 text-center">
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
              <div className="w-full" style={{ aspectRatio: '2 / 1', padding: 0, margin: 0 }}>
                {filteredCountryData.length > 0 ? (
                  <ComposableMap
                    width={1600}
                    height={800}
                    projection="geoEquirectangular"
                    projectionConfig={{
                      scale: 255,
                      center: [10, 0],
                    }}
                    className="map-svg"
                  >
                    <Geographies geography={geoUrl}>
                      {({ geographies }: { geographies: any[] }) =>
                        geographies.map((geo: any) => {
                          // world-atlas has country names in properties.name
                          const countryName = geo.properties?.name || '';
                          const countryCode = countryNameToCode[countryName] || '';
                          
                          // Skip if no country code found
                          if (!countryCode) return null;
                          
                          const countryInfo = countryDataMap[countryCode];
                          const isFiltered = filteredCountryData.some(c => c.country === countryCode);
                          const hasAlumni = countryInfo && countryInfo.value > 0;
                          
                          return (
                            <Geography
                              key={geo.rsmKey}
                              geography={geo}
                              onClick={() => {
                                if (isFiltered && hasAlumni) {
                                  handleCountryClick(countryCode);
                                }
                              }}
                              style={{
                                default: {
                                  fill: isFiltered && countryInfo ? countryInfo.color : '#1E293B',
                                  stroke: '#E5E7EB',
                                  strokeWidth: 0.5,
                                  cursor: isFiltered && hasAlumni ? 'pointer' : 'default',
                                  transition: 'all 0.2s ease-in-out',
                                  outline: 'none',
                                },
                                hover: {
                                  fill:
                                    isFiltered && countryInfo
                                      ? `${countryInfo.color}dd`
                                      : '#334155',
                                  stroke: '#1F2937',
                                  strokeWidth: 1,
                                  cursor: isFiltered && hasAlumni ? 'pointer' : 'default',
                                  transition: 'all 0.2s ease-in-out',
                                  outline: 'none',
                                },
                                pressed: {
                                  fill:
                                    isFiltered && countryInfo
                                      ? `${countryInfo.color}ff`
                                      : '#334155',
                                  stroke: '#000000',
                                  strokeWidth: 1.5,
                                  outline: 'none',
                                },
                              }}
                            />
                          );
                        })
                      }
                    </Geographies>
                  </ComposableMap>
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
