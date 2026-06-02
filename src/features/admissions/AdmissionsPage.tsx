import { motion } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

export function AdmissionsPage() {
  const { isEnglish } = useLanguage();

  return (
    <div className="w-full">
      {/* Hero - Admissions Closed Status */}
      <section className="relative bg-cardinal-red text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10 bg-gradient-to-br from-white to-transparent" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 12 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mb-6"
          >
            <div className="h-1 w-16 bg-white/40 mx-auto mb-6" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl md:text-5xl font-serif font-bold mb-4 leading-tight"
          >
            {isEnglish ? 'The 2026-27 Application is Opening Soon' : '2026-27 оны элсэлт удахгүй нээгдэнэ'}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.35, duration: 0.8 }}
            className="text-lg text-white/90 max-w-2xl mx-auto font-sans mb-8"
          >
            {isEnglish
              ? 'Registration for the 2026-27 academic year will be opening soon. Please check back later for updates.'
              : '2026-27 оны хичээлийн жилийн элсэлтийн бүртгэл удахгүй нээгдэх тул та мэдээллийг эргэж шалгана уу.'}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ delay: 0.5, duration: 0.6 }}
            className="bg-white/10 backdrop-blur-sm rounded-xl p-8 max-w-lg mx-auto border border-white/20"
          >
            <p className="text-xl font-medium">
              {isEnglish ? 'Coming Soon' : 'Удахгүй'}
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
