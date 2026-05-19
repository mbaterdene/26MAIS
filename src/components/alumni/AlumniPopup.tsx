import React, { useMemo } from 'react';
import type { University } from '../../data/alumniData';
import { getTotalAlumniCount } from '../../data/alumniData';
import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';
import { createPortal } from 'react-dom';

interface AlumniPopupProps {
  universities: University[];
  countryName: string;
  onClose: () => void;
}

const AlumniPopup: React.FC<AlumniPopupProps> = ({ universities, countryName, onClose }) => {
  const { t } = useLanguage();

  const sortedUniversities = useMemo(() => {
    return [...universities].sort((a, b) => {
      if (b.alumniCount !== a.alumniCount) {
        return b.alumniCount - a.alumniCount;
      }
      return a.name.localeCompare(b.name);
    });
  }, [universities]);

  const totalAlumni = useMemo(() => {
    return universities.reduce((total, uni) => total + uni.alumniCount, 0);
  }, [universities]);

  const universityStats = useMemo(() => {
    return {
      largePrograms: universities.filter(uni => uni.alumniCount >= 10).length,
      mediumPrograms: universities.filter(uni => uni.alumniCount >= 3 && uni.alumniCount < 10).length,
      smallPrograms: universities.filter(uni => uni.alumniCount < 3).length,
    };
  }, [universities]);

  const globalAlumniCount = getTotalAlumniCount();
  const countryPercentage = globalAlumniCount > 0 ? (totalAlumni / globalAlumniCount) * 100 : 0;

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const modalVariants = {
    hidden: { scale: 0.9, opacity: 0, y: 20 },
    visible: {
      scale: 1,
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
    exit: { scale: 0.9, opacity: 0, y: 20 },
  };

  const content = (
    <motion.div
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-5xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-red-600 relative overflow-hidden px-6 md:px-8 py-8 md:py-10">
          <div className="relative z-10">
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {t('Alumni in', 'Төгсөгчид')} {countryName}
              </h2>
              <p className="text-red-100 text-lg">
                  {totalAlumni} {totalAlumni === 1 ? t('alumnus', 'төгсөгч') : t('alumni', 'төгсөгчид')} • {universities.length} {universities.length === 1 ? t('university', 'их сургууль') : t('universities', 'их сургуулиуд')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="flex flex-col md:flex-row h-auto md:overflow-hidden">
          {/* Main university list */}
          <div className="flex-grow p-6 md:p-8 overflow-y-auto">
            {universities.length > 0 ? (
              <div className="space-y-4">
                {sortedUniversities.map((university, index) => (
                  <motion.div
                    key={university.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group relative bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl p-5 md:p-6 border border-gray-200 hover:border-gray-300 transition-all duration-200"
                  >
                    <div className="absolute top-0 left-0 w-1 h-full bg-red-700 rounded-tl-xl rounded-bl-xl"></div>
                    
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-grow pl-2">
                        <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 group-hover:text-rose-600 transition-colors">
                          {university.name}
                        </h3>
                        
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
                            </svg>
                            <span className="font-semibold text-gray-900">
                              {university.alumniCount} {university.alumniCount === 1 ? t('alumnus', 'төгсөгч') : t('alumni', 'төгсөгчид')}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                            </svg>
                            <span>{university.countryName}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Program size badge */}
                        <div className="flex-shrink-0 pt-1">
                        {university.alumniCount >= 10 ? (
                          <div className="bg-red-100 text-red-700 px-3 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap">
                            {t('Large Program', 'Том Хөтөлбөр')}
                          </div>
                        ) : university.alumniCount >= 3 ? (
                          <div className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap">
                            {t('Medium Program', 'Дунд Хөтөлбөр')}
                          </div>
                        ) : (
                          <div className="bg-gray-50 text-gray-600 px-3 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap">
                            {t('Small Program', 'Жижиг Хөтөлбөр')}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <svg className="w-12 h-12 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </svg>
                <p className="text-gray-500 text-lg font-medium">{t('No alumni data available', 'Төгсөгчийн өгөгдөл байхгүй')}</p>
              </div>
            )}
          </div>

          {/* Statistics Sidebar */}
          {universities.length > 0 && (
            <div className="w-full md:w-80 flex-shrink-0 bg-gray-50 border-t md:border-t-0 md:border-l border-gray-200 p-6 md:p-8">
              <div className="space-y-6">
                {/* Program breakdown */}
                <div>
                  <h3 className="text-sm uppercase tracking-widest font-bold text-gray-600 mb-4">
                    {t('Program Distribution', 'Хөтөлбөрийн Хувьцаа')}
                  </h3>
                  <div className="space-y-3">
                    {universityStats.largePrograms > 0 && (
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-700">{t('Large Programs', 'Том Хөтөлбөрүүд')}</p>
                        <span className="bg-emerald-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                          {universityStats.largePrograms}
                        </span>
                      </div>
                    )}
                    {universityStats.mediumPrograms > 0 && (
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-700">{t('Medium Programs', 'Дунд Хөтөлбөрүүд')}</p>
                        <span className="bg-sky-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                          {universityStats.mediumPrograms}
                        </span>
                      </div>
                    )}
                    {universityStats.smallPrograms > 0 && (
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-700">{t('Small Programs', 'Жижиг Хөтөлбөрүүд')}</p>
                        <span className="bg-gray-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                          {universityStats.smallPrograms}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Visual progress bar */}
                  <div className="mt-4 space-y-2">
                    {universityStats.largePrograms > 0 && (
                      <div className="flex items-center gap-2">
                        <div className="flex-grow bg-gray-200 rounded-full h-1.5 overflow-hidden">
                          <div
                            className="bg-red-600 h-full rounded-full transition-all duration-500"
                            style={{ width: `${(universityStats.largePrograms / universities.length) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                    {universityStats.mediumPrograms > 0 && (
                      <div className="flex items-center gap-2">
                        <div className="flex-grow bg-gray-200 rounded-full h-1.5 overflow-hidden">
                          <div
                            className="bg-gray-600 h-full rounded-full transition-all duration-500"
                            style={{ width: `${(universityStats.mediumPrograms / universities.length) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                    {universityStats.smallPrograms > 0 && (
                      <div className="flex items-center gap-2">
                        <div className="flex-grow bg-gray-200 rounded-full h-1.5 overflow-hidden">
                          <div
                            className="bg-gray-400 h-full rounded-full transition-all duration-500"
                            style={{ width: `${(universityStats.smallPrograms / universities.length) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Key metrics */}
                <div className="pt-4 border-t border-gray-200">
                  <h3 className="text-sm uppercase tracking-widest font-bold text-gray-600 mb-4">
                    {t('Key Metrics', 'Гол Үзүүлэлтүүд')}
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100">
                      <span className="text-sm text-gray-600">{t('Global Share', 'Дэлхийн Хувьцаа')}</span>
                      <span className="font-bold text-gray-900">{countryPercentage.toFixed(1)}%</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100">
                      <span className="text-sm text-gray-600">{t('Avg per University', 'Сургуулиар дунджаар')}</span>
                      <span className="font-bold text-gray-900">{(totalAlumni / universities.length).toFixed(1)}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-100">
                      <span className="text-sm text-gray-600">{t('Total Universities', 'Нийт их сургуулиуд')}</span>
                      <span className="font-bold text-gray-900">{universities.length}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );

  // Use createPortal to render outside of overflow containers
  if (typeof document !== 'undefined') {
    return createPortal(content, document.body);
  }

  return null;
};

export default AlumniPopup;
