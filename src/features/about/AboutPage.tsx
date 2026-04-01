import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Globe, BookOpen, Heart, ArrowRight, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { aboutContent } from '../../data/about';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.65, ease: 'easeOut', delay: i * 0.1 },
  }),
};
const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};
const vp = { once: true, margin: '-80px' };

const pillarIconMap: Record<string, React.ReactNode> = {
  intellect: <BookOpen size={22} />,
  access: <Globe size={22} />,
  whole: <Heart size={22} />,
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block text-xs font-sans font-bold tracking-[0.2em] uppercase text-digital-blue bg-digital-blue/10 px-3 py-1 rounded-full mb-5">
      {children}
    </span>
  );
}

export function AboutPage() {
  const missionRef = useRef(null);
  const newsRef = useRef(null);
  const tourRef = useRef(null);

  const missionInView = useInView(missionRef, vp);
  const newsInView = useInView(newsRef, vp);
  const tourInView = useInView(tourRef, vp);

  const { hero, mission, news, tour } = aboutContent;

  const [activeSlide, setActiveSlide] = useState(0);

  const nextSlide = () => setActiveSlide((p) => (p + 1) % tour.galleryImages.length);
  const prevSlide = () => setActiveSlide((p) => (p - 1 + tour.galleryImages.length) % tour.galleryImages.length);

  return (
    <div className="w-full bg-white">
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <motion.section
        className="relative bg-black text-white py-32 md:py-44 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 w-full h-full">
          <img src={hero.bgImage} alt="Stanford OHS background" className="w-full h-full object-cover opacity-40 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.22em] uppercase text-white/80 bg-white/20 px-4 py-1.5 rounded-full mb-8 backdrop-blur-md"
          >
            {hero.eyebrow}
          </motion.div>
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-6 leading-[1.1]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {hero.title}
            <br />
            <span className="text-cardinal-red">{hero.titleAccent}</span>
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-sans leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38, duration: 0.8 }}
          >
            {hero.subtitle}
          </motion.p>
        </div>
      </motion.section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col gap-32">
        {/* ── Mission ───────────────────────────────────────────────────── */}
        <section ref={missionRef}>
          <motion.div initial="hidden" animate={missionInView ? 'visible' : 'hidden'} variants={stagger}>
            <motion.div variants={fadeUp} className="text-center mb-16 max-w-2xl mx-auto">
              <SectionLabel>{mission.sectionLabel}</SectionLabel>
              <h2 className="text-4xl lg:text-5xl font-serif font-bold text-black mb-5">{mission.heading}</h2>
              <div className="w-20 h-1.5 bg-cardinal-red rounded-full mx-auto mb-6" />
              <p className="text-gray-600 font-sans text-lg leading-relaxed">{mission.body}</p>
            </motion.div>
            <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {mission.pillars.map((p, i) => (
                <motion.div
                  key={p.id}
                  custom={i}
                  variants={fadeUp}
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                  className="bg-gray-50 border border-gray-100 rounded-3xl p-8 flex flex-col gap-4 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-center gap-4">
                    <span className={`text-3xl font-serif font-bold ${p.accentColor}`}>{p.num}</span>
                    <div className={`w-0.5 h-8 ${p.barColor} rounded-full`} />
                    <span className={`${p.accentColor}`}>{pillarIconMap[p.id]}</span>
                  </div>
                  <h3 className="text-xl font-serif font-bold text-black">{p.heading}</h3>
                  <p className="text-gray-600 font-sans text-sm leading-relaxed">{p.body}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* ── Community News ────────────────────────────────────────────── */}
        <section ref={newsRef}>
          <motion.div initial="hidden" animate={newsInView ? 'visible' : 'hidden'} variants={stagger}>
            <motion.div variants={fadeUp} className="mb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <SectionLabel>{news.sectionLabel}</SectionLabel>
                <h2 className="text-4xl lg:text-5xl font-serif font-bold text-black mb-4">{news.heading}</h2>
                <div className="w-20 h-1.5 bg-black rounded-full" />
              </div>
              <Link to="/news" className="inline-flex items-center gap-2 text-digital-blue font-bold hover:underline">
                View All News <ArrowRight size={18} />
              </Link>
            </motion.div>
            
            <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {news.items.map((item, i) => (
                <motion.div
                  key={item.id}
                  custom={i}
                  variants={fadeUp}
                  className={`group relative rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500 bg-white ${i === 0 ? 'lg:col-span-2 lg:row-span-2' : ''}`}
                >
                  <div className={`overflow-hidden ${i === 0 ? 'h-80 lg:h-[400px]' : 'h-60'}`}>
                    <img 
                      src={item.imageUrl} 
                      alt={item.title} 
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" 
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 p-8 w-full z-10 flex flex-col justify-end">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="bg-cardinal-red text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">{item.category}</span>
                      <span className="text-gray-300 text-sm">{item.date}</span>
                    </div>
                    <h3 className={`font-serif font-bold text-white leading-tight ${i === 0 ? 'text-2xl lg:text-3xl' : 'text-xl'} group-hover:text-sand transition-colors duration-300`}>
                      {item.title}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* ── Take the Tour ─────────────────────────────────────────────── */}
        <section ref={tourRef} className="bg-sand rounded-[3rem] p-10 lg:p-20 overflow-hidden relative">
          <motion.div 
            initial="hidden" 
            animate={tourInView ? 'visible' : 'hidden'} 
            variants={stagger}
            className="flex flex-col lg:flex-row gap-16 items-center"
          >
            <motion.div variants={fadeUp} className="w-full lg:w-1/3">
              <SectionLabel>{tour.sectionLabel}</SectionLabel>
              <h2 className="text-4xl lg:text-5xl font-serif font-bold text-black mb-6">{tour.heading}</h2>
              <p className="text-lg font-sans text-gray-800 leading-relaxed mb-8">{tour.body}</p>
              
              <div className="flex flex-col gap-4">
                <Link to="/tour" className="inline-flex items-center justify-center gap-2 bg-cardinal-red text-white px-8 py-3.5 rounded-full font-bold hover:bg-black transition-colors shadow-lg">
                  Start Virtual Tour
                </Link>
                <Link to="/admissions" className="inline-flex items-center justify-center gap-2 border-2 border-black text-black px-8 py-3.5 rounded-full font-bold hover:bg-black hover:text-white transition-colors">
                  Contact Admissions
                </Link>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="w-full lg:w-2/3 flex flex-col gap-6">
              {/* Video Placeholder */}
              <div className="relative w-full aspect-video bg-black rounded-3xl overflow-hidden group shadow-2xl">
                <img src={tour.videoPlaceholderUrl} alt="Tour Video" className="w-full h-full object-cover opacity-60 group-hover:opacity-50 transition-opacity duration-300" />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-20 h-20 bg-cardinal-red/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-xl backdrop-blur-sm">
                    <Play className="text-white ml-2 w-8 h-8" />
                  </div>
                </div>
              </div>

              {/* Photo Gallery Slider */}
              <div className="flex gap-4 items-center">
                <button onClick={prevSlide} className="p-3 rounded-full bg-white shadow-md hover:bg-cardinal-red hover:text-white transition-colors">
                  <ChevronLeft size={24} />
                </button>
                <div className="flex-1 overflow-hidden rounded-2xl h-48 relative">
                  <motion.div 
                    className="flex h-full w-full"
                    animate={{ x: `-${activeSlide * 100}%` }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  >
                    {tour.galleryImages.map((img, i) => (
                      <div key={i} className="min-w-full h-full p-1">
                        <img src={img} alt={`Gallery ${i}`} className="w-full h-full object-cover rounded-xl" />
                      </div>
                    ))}
                  </motion.div>
                </div>
                <button onClick={nextSlide} className="p-3 rounded-full bg-white shadow-md hover:bg-cardinal-red hover:text-white transition-colors">
                  <ChevronRight size={24} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        </section>

      </div>
    </div>
  );
}
