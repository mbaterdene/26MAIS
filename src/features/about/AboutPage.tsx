import { motion, useInView } from 'framer-motion';
import type { UseInViewOptions } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Globe, BookOpen, Heart, Compass, ArrowRight } from 'lucide-react';
import { aboutContent } from '../../data/about';

// ─── Animation Variants ──────────────────────────────────────────────────────
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
const vp: UseInViewOptions = { once: true, margin: '-80px' as UseInViewOptions['margin'] };

// ─── Pillar icon map ─────────────────────────────────────────────────────────
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
  const statsRef = useRef(null);
  const historyRef = useRef(null);
  const leadershipRef = useRef(null);

  const missionInView = useInView(missionRef, vp);
  const statsInView = useInView(statsRef, vp);
  const historyInView = useInView(historyRef, vp);
  const leadershipInView = useInView(leadershipRef, vp);

  const { hero, mission, stats, history, leadership, tour } = aboutContent;

  return (
    <div className="w-full bg-white">

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <motion.section
        className="bg-black text-white py-32 md:py-44 relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-cardinal-red/10 blur-[100px]"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full bg-digital-blue/10 blur-[80px]"
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.22em] uppercase text-white/50 bg-white/10 px-4 py-1.5 rounded-full mb-8"
          >
            {hero.eyebrow}
          </motion.div>
          <motion.h1
            className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-[1.1]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {hero.title}
            <br />
            <span className="text-cardinal-red">{hero.titleAccent}</span>
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-300 max-w-2xl font-sans leading-relaxed"
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

        {/* ── Stats ─────────────────────────────────────────────────────── */}
        <section ref={statsRef} className="-mx-4 sm:-mx-6 lg:-mx-8">
          <motion.div
            className="bg-black text-white py-20 px-4 sm:px-6 lg:px-8 rounded-[3rem] mx-4 sm:mx-6 lg:mx-8 relative overflow-hidden"
            initial="hidden"
            animate={statsInView ? 'visible' : 'hidden'}
            variants={stagger}
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cardinal-red via-digital-blue to-sand" />
            <motion.h2
              variants={fadeUp}
              className="text-3xl lg:text-4xl font-serif font-bold text-center text-white mb-14"
            >
              {stats.heading}
            </motion.h2>
            <motion.div variants={stagger} className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.items.map((s, i) => (
                <motion.div
                  key={s.id}
                  custom={i}
                  variants={fadeUp}
                  className="text-center"
                >
                  <div className={`text-5xl md:text-6xl font-serif font-bold mb-3 ${s.color}`}>{s.value}</div>
                  <div className="text-sm text-gray-400 font-sans uppercase tracking-wider">{s.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* ── History ───────────────────────────────────────────────────── */}
        <section ref={historyRef}>
          <motion.div
            initial="hidden"
            animate={historyInView ? 'visible' : 'hidden'}
            variants={stagger}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          >
            <motion.div variants={fadeUp}>
              <SectionLabel>{history.sectionLabel}</SectionLabel>
              <h2 className="text-4xl lg:text-5xl font-serif font-bold text-black mb-8">{history.heading}</h2>
              <div className="w-20 h-1.5 bg-digital-blue rounded-full mb-8" />
              <div className="space-y-5">
                {history.paragraphs.map((p, i) => (
                  <p key={i} className="text-gray-600 font-sans leading-relaxed">{p}</p>
                ))}
              </div>
            </motion.div>
            <motion.div variants={fadeUp} className="bg-black rounded-3xl p-10 text-white relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cardinal-red to-digital-blue rounded-l-3xl" />
              <Compass size={48} className="text-sand mb-6 opacity-80" />
              <blockquote className="text-lg font-serif italic leading-relaxed mb-6">{history.quote}</blockquote>
              <p className="text-sm text-gray-500 font-sans">{history.quoteAttr}</p>
            </motion.div>
          </motion.div>
        </section>

        {/* ── Leadership ────────────────────────────────────────────────── */}
        <section ref={leadershipRef}>
          <motion.div initial="hidden" animate={leadershipInView ? 'visible' : 'hidden'} variants={stagger}>
            <motion.div variants={fadeUp} className="text-center mb-14">
              <SectionLabel>{leadership.sectionLabel}</SectionLabel>
              <h2 className="text-4xl lg:text-5xl font-serif font-bold text-black mb-5">{leadership.heading}</h2>
              <div className="w-20 h-1.5 bg-cardinal-red rounded-full mx-auto mb-5" />
              <p className="text-gray-600 font-sans text-lg max-w-xl mx-auto">{leadership.body}</p>
            </motion.div>
            <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {leadership.members.map((m, i) => (
                <motion.div
                  key={m.id}
                  custom={i}
                  variants={fadeUp}
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                  className="bg-white border border-gray-100 rounded-3xl p-8 flex flex-col items-center gap-4 shadow-sm hover:shadow-lg transition-shadow text-center"
                >
                  <div className={`w-16 h-16 rounded-2xl ${m.accentBg} ${m.accentText} flex items-center justify-center text-xl font-serif font-bold shadow-md`}>
                    {m.initials}
                  </div>
                  <div>
                    <p className="font-serif font-bold text-black text-lg">{m.name}</p>
                    <p className="text-sm text-gray-500 font-sans mt-1">{m.title}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* ── Tour CTA ──────────────────────────────────────────────────── */}
        <motion.section
          className="bg-cardinal-red text-white rounded-[3rem] p-12 lg:p-20 text-center relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.7 }}
        >
          <motion.div
            className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/5"
            animate={{ rotate: 360 }}
            transition={{ duration: 70, repeat: Infinity, ease: 'linear' }}
          />
          <div className="relative z-10">
            <h2 className="text-3xl lg:text-5xl font-serif font-bold mb-6">{tour.heading}</h2>
            <p className="text-lg font-sans opacity-80 max-w-xl mx-auto mb-10">{tour.body}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/admissions"
                className="inline-flex items-center gap-2 bg-white text-cardinal-red px-8 py-3.5 rounded-full font-bold hover:bg-gray-100 transition-colors shadow-lg"
              >
                {tour.ctaLabel} <ArrowRight size={18} />
              </Link>
              <Link
                to="/admissions"
                className="inline-flex items-center gap-2 border-2 border-white text-white px-8 py-3.5 rounded-full font-bold hover:bg-white/10 transition-colors"
              >
                Apply Now
              </Link>
            </div>
          </div>
        </motion.section>

      </div>
    </div>
  );
}
