import { motion, useInView, AnimatePresence } from 'framer-motion';
import type { UseInViewOptions } from 'framer-motion';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, GraduationCap, HeartHandshake, PenLine, ChevronRight, Check } from 'lucide-react';
import { studentSupportContent } from '../../data/studentSupport';
import type { SupportService } from '../../data/studentSupport';

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
  visible: { opacity: 1, transition: { staggerChildren: 0.13 } },
};
const vp: UseInViewOptions = { once: true, margin: '-80px' as UseInViewOptions['margin'] };

// ─── Icon map ────────────────────────────────────────────────────────────────
const iconMap: Record<string, React.ReactNode> = {
  advising: <BookOpen size={32} />,
  college: <GraduationCap size={32} />,
  wellness: <HeartHandshake size={32} />,
  tutoring: <PenLine size={32} />,
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block text-xs font-sans font-bold tracking-[0.2em] uppercase text-digital-blue bg-digital-blue/10 px-3 py-1 rounded-full mb-5">
      {children}
    </span>
  );
}

// ─── Service Card ─────────────────────────────────────────────────────────────
function ServiceCard({ svc, index }: { svc: SupportService; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      layout
      className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
    >
      {/* Gradient header strip */}
      <div className={`bg-gradient-to-r ${svc.gradientFrom} ${svc.gradientTo} p-8 text-white`}>
        <div className="flex items-start justify-between mb-4">
          <span className="text-5xl font-serif font-bold opacity-20">{svc.num}</span>
          <span className={`${svc.accentColor === 'text-digital-blue' ? 'text-white' : 'text-white'}`}>
            {iconMap[svc.iconId]}
          </span>
        </div>
        <h3 className="text-2xl font-serif font-bold mb-2">{svc.title}</h3>
        <p className="text-sm text-white/70 font-sans italic">{svc.tagline}</p>
      </div>

      {/* Body */}
      <div className="p-8">
        <p className="text-gray-600 font-sans leading-relaxed mb-6">{svc.description}</p>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.ul
              key="bullets"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="overflow-hidden space-y-3 mb-6"
            >
              {svc.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3 text-sm font-sans text-gray-700">
                  <span className={`mt-0.5 flex-shrink-0 ${svc.accentColor}`}>
                    <Check size={15} strokeWidth={3} />
                  </span>
                  {b}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>

        <button
          onClick={() => setExpanded(!expanded)}
          className={`flex items-center gap-2 text-sm font-bold transition-colors ${svc.accentColor} hover:opacity-80`}
          aria-expanded={expanded}
        >
          {expanded ? 'Show less' : 'See how we help'}
          <motion.div animate={{ rotate: expanded ? 90 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronRight size={16} strokeWidth={2.5} />
          </motion.div>
        </button>
      </div>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export function StudentSupportPage() {
  const overviewRef = useRef(null);
  const servicesRef = useRef(null);
  const testimonialsRef = useRef(null);

  const overviewInView = useInView(overviewRef, vp);
  const servicesInView = useInView(servicesRef, vp);
  const testimonialsInView = useInView(testimonialsRef, vp);

  const { hero, overview, services, testimonials, cta } = studentSupportContent;

  return (
    <div className="w-full bg-gray-50">

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <motion.section
        className="bg-digital-blue text-white py-32 relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full bg-white/5 border border-white/10"
          animate={{ rotate: 360 }}
          transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-cardinal-red/20 blur-3xl"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
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
            <span className="text-sand">{hero.titleAccent}</span>
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-white/80 max-w-2xl font-sans leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.38, duration: 0.8 }}
          >
            {hero.subtitle}
          </motion.p>
        </div>
      </motion.section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col gap-24">

        {/* ── Overview ──────────────────────────────────────────────────── */}
        <section ref={overviewRef}>
          <motion.div
            initial="hidden"
            animate={overviewInView ? 'visible' : 'hidden'}
            variants={stagger}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div variants={fadeUp}>
              <SectionLabel>{overview.sectionLabel}</SectionLabel>
              <h2 className="text-4xl lg:text-5xl font-serif font-bold text-black mb-6">{overview.heading}</h2>
              <div className="w-20 h-1.5 bg-digital-blue rounded-full mx-auto mb-8" />
              <p className="text-gray-600 font-sans text-lg leading-relaxed">{overview.body}</p>
            </motion.div>
          </motion.div>
        </section>

        {/* ── Services Grid ─────────────────────────────────────────────── */}
        <section ref={servicesRef}>
          <motion.div
            initial="hidden"
            animate={servicesInView ? 'visible' : 'hidden'}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {services.map((svc, i) => (
              <ServiceCard key={svc.id} svc={svc} index={i} />
            ))}
          </motion.div>
        </section>

        {/* ── Testimonials ──────────────────────────────────────────────── */}
        <section ref={testimonialsRef}>
          <motion.div initial="hidden" animate={testimonialsInView ? 'visible' : 'hidden'} variants={stagger}>
            <motion.div variants={fadeUp} className="text-center mb-14">
              <SectionLabel>{testimonials.sectionLabel}</SectionLabel>
              <h2 className="text-4xl lg:text-5xl font-serif font-bold text-black mb-5">{testimonials.heading}</h2>
              <div className="w-20 h-1.5 bg-cardinal-red rounded-full mx-auto" />
            </motion.div>
            <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.items.map((t, i) => (
                <motion.div
                  key={t.id}
                  custom={i}
                  variants={fadeUp}
                  whileHover={{ y: -6 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                  className={`bg-white rounded-3xl p-8 shadow-sm hover:shadow-lg transition-shadow border-l-4 ${t.accentBorder}`}
                >
                  <p className="text-gray-700 font-sans italic leading-relaxed mb-6 text-sm">{t.quote}</p>
                  <div>
                    <p className="font-serif font-bold text-black">{t.author}</p>
                    <p className="text-xs text-gray-500 font-sans mt-1">{t.role}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* ── CTA ───────────────────────────────────────────────────────── */}
        <motion.section
          className="bg-black text-white rounded-[3rem] p-12 lg:p-20 text-center relative overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.7 }}
        >
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-digital-blue via-cardinal-red to-sand" />
          <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-white/5 blur-3xl" />
          <div className="relative z-10">
            <h2 className="text-3xl lg:text-5xl font-serif font-bold mb-6">{cta.heading}</h2>
            <p className="text-lg font-sans text-gray-400 max-w-xl mx-auto mb-10">{cta.body}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/admissions"
                className="inline-flex items-center justify-center gap-2 bg-cardinal-red hover:bg-digital-red text-white px-8 py-3.5 rounded-full font-bold transition-colors shadow-lg hover:-translate-y-px"
              >
                {cta.primaryLabel} <ChevronRight size={18} />
              </Link>
              <Link
                to="/admissions"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white px-8 py-3.5 rounded-full font-bold hover:bg-white/10 transition-colors"
              >
                {cta.secondaryLabel}
              </Link>
            </div>
          </div>
        </motion.section>

      </div>
    </div>
  );
}
