import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, GraduationCap, HeartPulse, PenTool, ArrowRight, CheckCircle2, ChevronDown } from 'lucide-react';
import { studentSupportContent } from '../../data/studentSupport';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};
const staggerChildren = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const iconMap: Record<string, React.ReactNode> = {
  'book': <BookOpen size={24} />,
  'grad-cap': <GraduationCap size={24} />,
  'heart': <HeartPulse size={24} />,
  'pen': <PenTool size={24} />,
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-black/60 bg-black/10 px-3 py-1 rounded-full mb-5">
      {children}
    </span>
  );
}

export function StudentSupportPage() {
  const { hero, services } = studentSupportContent;
  const [activeTabId, setActiveTabId] = useState(services.items[0].id);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const activeService = services.items.find((item) => item.id === activeTabId) || services.items[0];

  return (
    <div className="w-full bg-sand min-h-screen">
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <motion.div
        className="bg-sand pt-40 pb-20 text-black border-b border-gray-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-10">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="inline-block mb-6"
          >
            <SectionLabel>{hero.eyebrow}</SectionLabel>
          </motion.div>
          
          <motion.h1
            className="text-5xl md:text-7xl font-serif font-bold mb-6 text-black tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {hero.title}
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl font-sans max-w-3xl mx-auto text-gray-700 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38, duration: 0.8 }}
          >
            {hero.subtitle}
          </motion.p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 pb-32">
        <motion.div 
          initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} variants={staggerChildren}
          className="flex flex-col lg:flex-row gap-12 lg:gap-20"
        >
          {/* Navigation Sidebar (Desktop) / Dropdown (Mobile) */}
          <motion.div variants={fadeUp} className="w-full lg:w-1/3 flex-shrink-0">
            {/* Mobile Dropdown Header */}
            <div className="lg:hidden relative">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="w-full flex items-center justify-between bg-white text-black p-5 rounded-2xl shadow-sm border border-gray-100 font-serif font-bold text-xl"
              >
                {activeService.title}
                <ChevronDown size={24} className={`transform transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {isMobileMenuOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-20"
                  >
                    {services.items.map((service) => (
                      <button
                        key={service.id}
                        onClick={() => {
                          setActiveTabId(service.id);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`w-full text-left px-5 py-4 font-serif font-bold border-b border-gray-50 last:border-b-0 hover:bg-sand transition-colors ${activeTabId === service.id ? 'text-cardinal-red bg-sand/50' : 'text-gray-600'}`}
                      >
                        {service.title}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Desktop Sidebar Navigation */}
            <div className="hidden lg:flex flex-col gap-3 sticky top-32">
              <h3 className="text-sm font-bold tracking-[0.2em] uppercase text-gray-500 mb-4 pl-6">Support Directories</h3>
              {services.items.map((service) => {
                const isActive = activeTabId === service.id;
                return (
                  <button
                    key={service.id}
                    onClick={() => setActiveTabId(service.id)}
                    className={`flex items-center gap-4 w-full text-left px-6 py-5 rounded-2xl font-serif font-bold text-lg transition-all duration-300 ${
                      isActive 
                        ? 'bg-black text-white shadow-lg transform scale-[1.02]' 
                        : 'bg-transparent text-gray-600 hover:bg-white border border-transparent hover:border-gray-200'
                    }`}
                  >
                    <div className={`p-2 rounded-xl flex items-center justify-center transition-colors ${isActive ? 'bg-white/20 text-white' : 'bg-sand text-black/60'}`}>
                      {iconMap[service.iconId]}
                    </div>
                    {service.title}
                    {isActive && <motion.div layoutId="activeSupportIndicator" className="ml-auto w-2 h-2 bg-white rounded-full" />}
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Tab Panel Content */}
          <motion.div variants={fadeUp} className="w-full lg:w-2/3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="bg-white rounded-[2.5rem] p-8 lg:p-12 shadow-sm border border-gray-100 flex flex-col h-full"
              >
                <div className="flex items-center gap-5 mb-8">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white ${activeService.accentBg.replace('bg-sand', 'bg-black')} bg-opacity-90 shadow-md`}>
                    {iconMap[activeService.iconId]}
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-serif font-bold text-black">{activeService.title}</h2>
                </div>

                <div className="w-full h-80 rounded-2xl overflow-hidden mb-10 shadow-sm">
                  <img src={activeService.imageUrl} alt={activeService.title} className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" />
                </div>

                <p className="text-xl font-sans text-gray-700 leading-relaxed mb-10">
                  {activeService.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 mb-12 flex-grow">
                  {activeService.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className={`flex-shrink-0 mt-1 ${activeService.accentText.replace('text-black', 'text-gray-400')}`} size={20} />
                      <span className="text-gray-700 font-sans leading-snug">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto border-t border-gray-100 pt-8">
                  <a
                    href={activeService.ctaLink}
                    className="inline-flex items-center justify-center gap-3 w-full sm:w-auto bg-black text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-800 transition-colors shadow-md"
                  >
                    {activeService.ctaLabel} <ArrowRight size={20} />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
