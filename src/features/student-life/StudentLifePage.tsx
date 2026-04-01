import { motion } from 'framer-motion';
import { studentLifeContent } from '../../data/studentLife';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};
const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const vp = { once: true, margin: '-80px' };

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-digital-blue bg-digital-blue/10 px-3 py-1 rounded-full mb-5">
      {children}
    </span>
  );
}

export function StudentLifePage() {
  const { hero, clubs, events } = studentLifeContent;

  return (
    <div className="w-full bg-white pb-32">
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <motion.div
        className="bg-black py-32 md:py-56 text-white relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-digital-blue/40 via-black to-cardinal-red/20 opacity-80" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-digital-blue/30 rounded-full blur-[120px]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.22em] uppercase text-white/50 bg-white/10 px-4 py-1.5 rounded-full mb-8 backdrop-blur-sm"
          >
            {hero.eyebrow}
          </motion.div>
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-6"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {hero.title}
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl font-sans max-w-2xl mx-auto opacity-90 leading-relaxed text-gray-200"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {hero.subtitle}
          </motion.p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 flex flex-col gap-40">
        
        {/* ── Clubs & Community ────────────────────────────────────────── */}
        <motion.section initial="hidden" whileInView="visible" viewport={vp} variants={stagger}>
          <motion.div className="flex flex-col md:flex-row gap-12 justify-between items-end mb-16" variants={fadeUp}>
            <div className="max-w-2xl">
              <SectionLabel>{clubs.sectionLabel}</SectionLabel>
              <h2 className="text-4xl lg:text-6xl font-serif font-bold text-black mb-6">{clubs.heading}</h2>
              <p className="text-xl text-gray-600 font-sans leading-relaxed">{clubs.body}</p>
            </div>
            <button className="bg-black text-white px-8 py-3 rounded-full font-bold hover:bg-cardinal-red transition-colors whitespace-nowrap">
              Explore All Clubs
            </button>
          </motion.div>

          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" variants={stagger}>
            {clubs.items.map((club, i) => (
              <motion.div
                key={club.id}
                custom={i}
                variants={fadeUp}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative h-80 rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500"
              >
                <img 
                  src={club.image} 
                  alt={club.name} 
                  className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-700 ease-in-out" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80" />
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <span className="text-cardinal-red text-sm font-bold tracking-widest uppercase mb-2">
                    {club.category}
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-white group-hover:text-sand transition-colors">
                    {club.name}
                  </h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* ── Events Timeline ──────────────────────────────────────────── */}
        <motion.section initial="hidden" whileInView="visible" viewport={vp} variants={stagger}>
          <motion.div className="text-center mb-24" variants={fadeUp}>
            <SectionLabel>{events.sectionLabel}</SectionLabel>
            <h2 className="text-4xl lg:text-6xl font-serif font-bold text-black mb-6">{events.heading}</h2>
            <div className="w-20 h-1.5 bg-black rounded-full mx-auto" />
          </motion.div>

          {/* Vertical Timeline */}
          <div className="relative max-w-5xl mx-auto pl-6 md:pl-0">
            {/* Timeline Line */}
            <div className="absolute left-[38px] md:left-1/2 top-0 bottom-0 w-1 bg-gray-100 transform md:-translate-x-1/2" />
            
            <div className="space-y-24">
              {events.timeline.map((event, i) => (
                <motion.div 
                  key={event.id}
                  variants={fadeUp}
                  className={`relative flex flex-col md:flex-row items-center gap-10 md:gap-0 ${i % 2 === 0 ? '' : 'md:flex-row-reverse'}`}
                >
                  {/* Center Dot */}
                  <div className={`absolute left-0 md:left-1/2 w-20 h-20 rounded-full transform md:-translate-x-1/2 flex items-center justify-center font-bold text-sm shadow-xl z-10 border-4 border-white leading-tight text-center ${event.accentBg} ${event.accentText}`}>
                    {event.season}
                  </div>

                  <div className={`md:w-1/2 ${i % 2 === 0 ? 'md:pr-20' : 'md:pl-20'} pl-24 md:pl-0 w-full`}>
                    <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-50 hover:shadow-xl transition-shadow group relative overflow-hidden">
                      <div className={`absolute top-0 left-0 w-full h-2 ${event.accentBg}`} />
                      <div className="w-full h-48 rounded-xl overflow-hidden mb-6">
                        <img 
                          src={event.imageUrl} 
                          alt={event.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                      <h3 className="text-3xl font-serif font-bold text-black mb-4 group-hover:text-cardinal-red transition-colors">{event.title}</h3>
                      <p className="text-gray-600 font-sans leading-relaxed text-lg">{event.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

      </div>
    </div>
  );
}
