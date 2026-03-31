import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import {
  Users,
  BookOpen,
  GraduationCap,
  Plane,
  HeartHandshake,
  PenLine,
  ChevronRight,
  Sparkles,
  Flag,
  CalendarDays,
} from 'lucide-react';
import { studentLifeContent, type CommunityItem, type EventItem, type SupportService } from '../../data/studentLife';

// ─── Animation Variants ───────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: 'easeOut', delay: i * 0.12 },
  }),
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.13 } },
};

// ─── Icon map (icons can't be serialized into data files) ────────────────────
const communityIconMap: Record<string, React.ReactNode> = {
  clubs: <Sparkles size={28} />,
  gov: <Flag size={28} />,
  homeroom: <CalendarDays size={28} />,
};

const supportIconMap: Record<string, React.ReactNode> = {
  advising: <BookOpen size={24} />,
  counseling: <GraduationCap size={24} />,
  wellness: <HeartHandshake size={24} />,
  tutoring: <PenLine size={24} />,
};

const eventIconMap: Record<string, React.ReactNode> = {
  summer: <Sparkles size={36} className="text-white/80" />,
  retreats: <HeartHandshake size={36} className="text-white/80" />,
  spirit: <GraduationCap size={36} className="text-white/80" />,
  travel: <Plane size={36} className="text-white/80" />,
};

// ─── Sub-components ───────────────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block text-xs font-sans font-bold tracking-[0.2em] uppercase text-digital-blue bg-digital-blue/10 px-3 py-1 rounded-full mb-5">
      {children}
    </span>
  );
}

function CommunityCard({ item, index }: { item: CommunityItem; index: number }) {
  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`bg-white border border-gray-100 rounded-3xl p-8 flex flex-col gap-4 cursor-default ${item.shadowColor} ${item.shadowHover} transition-shadow duration-300`}
    >
      <div className={`w-14 h-14 rounded-2xl ${item.accentBg} flex items-center justify-center text-white flex-shrink-0`}>
        {communityIconMap[item.id]}
      </div>
      <h3 className={`text-xl font-bold font-serif ${item.textColor}`}>{item.label}</h3>
      <p className="text-gray-600 font-sans text-sm leading-relaxed">{item.description}</p>
    </motion.div>
  );
}

function EventCard({ event, index }: { event: EventItem; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ scale: 1.03, zIndex: 10 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className="relative rounded-3xl overflow-hidden cursor-pointer group"
      style={{ minHeight: 340 }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${event.gradient} transition-transform duration-700 group-hover:scale-105`} />
      <div
        className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")" }}
      />
      <div className="relative z-10 p-8 flex flex-col h-full" style={{ minHeight: 340 }}>
        <div className="flex items-start justify-between mb-6">
          <span className="text-xs font-sans font-bold tracking-widest uppercase text-white/60 bg-white/10 px-3 py-1 rounded-full">
            {event.tag}
          </span>
          {eventIconMap[event.id]}
        </div>
        <div className="mt-auto">
          <h3 className="text-2xl font-serif font-bold text-white mb-3">{event.title}</h3>
          <AnimatePresence>
            {hovered && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.25 }}
                className="text-white/80 text-sm font-sans leading-relaxed mb-5"
              >
                {event.description}
              </motion.p>
            )}
          </AnimatePresence>
          <div className="flex items-center gap-6">
            <div>
              <div className="text-2xl font-bold font-serif text-white">{event.stat}</div>
              <div className="text-xs text-white/50 font-sans uppercase tracking-wider">{event.statLabel}</div>
            </div>
            <motion.div
              animate={{ x: hovered ? 6 : 0 }}
              transition={{ duration: 0.3 }}
              className="ml-auto"
            >
              <ChevronRight size={22} className="text-white/50" />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ServiceRow({ svc, index }: { svc: SupportService; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      custom={index}
      variants={fadeUp}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group flex gap-6 items-start p-6 rounded-2xl transition-colors duration-300 cursor-default hover:bg-white/5"
    >
      <div className="flex flex-col items-center gap-2 pt-1 min-w-[2.5rem]">
        <span className={`text-3xl font-bold font-serif ${svc.accentColor} leading-none`}>{svc.num}</span>
        <motion.div
          className={`w-0.5 ${svc.barColor} rounded-full`}
          animate={{ height: hovered ? 48 : 24 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <span className={`${svc.accentColor}`}>{supportIconMap[svc.id]}</span>
          <h3 className="text-xl font-bold font-serif text-white">{svc.title}</h3>
        </div>
        <p className="text-gray-400 font-sans text-sm leading-relaxed">{svc.description}</p>
      </div>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export function StudentLifePage() {
  const communityRef = useRef(null);
  const eventsRef = useRef(null);
  const supportRef = useRef(null);

  const communityInView = useInView(communityRef, { once: true, margin: '-80px' });
  const eventsInView = useInView(eventsRef, { once: true, margin: '-80px' });
  const supportInView = useInView(supportRef, { once: true, margin: '-80px' });

  const { hero, community, events, support } = studentLifeContent;

  return (
    <div className="w-full bg-white">

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <motion.div
        className="bg-cardinal-red py-32 text-white relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full bg-white/5 border border-white/10"
          animate={{ rotate: 360 }}
          transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute -bottom-20 -left-20 w-[300px] h-[300px] rounded-full bg-white/[0.04] border border-white/10"
          animate={{ rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.7 }}
            className="inline-flex items-center gap-2 text-xs font-sans font-bold tracking-[0.22em] uppercase text-white/60 bg-white/10 px-4 py-1.5 rounded-full mb-8"
          >
            <Users size={12} /> Student Life &amp; Support
          </motion.div>
          <motion.h1
            className="text-5xl md:text-7xl font-serif font-bold mb-6"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.25, duration: 0.8 }}
          >
            {hero.title}
            <br />
            <span className="text-sand">{hero.titleAccent}</span>
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl font-sans max-w-2xl mx-auto opacity-80 leading-relaxed"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {hero.subtitle}
          </motion.p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col gap-32">

        {/* ── Community ─────────────────────────────────────────────── */}
        <section ref={communityRef}>
          <motion.div initial="hidden" animate={communityInView ? 'visible' : 'hidden'} variants={stagger}>
            <motion.div variants={fadeUp} className="flex flex-col lg:flex-row lg:items-end gap-8 mb-14">
              <div className="lg:w-1/2">
                <SectionLabel>{community.sectionLabel}</SectionLabel>
                <h2 className="text-4xl lg:text-5xl font-serif font-bold text-black mb-5">
                  {community.heading}
                </h2>
                <div className="w-20 h-1.5 bg-cardinal-red rounded-full mb-5" />
                <p className="text-gray-600 font-sans text-lg leading-relaxed max-w-lg">{community.body}</p>
              </div>
              <motion.div variants={fadeUp} className="lg:w-1/2 flex justify-center lg:justify-end">
                <div className="bg-gray-50 border border-gray-100 rounded-3xl px-10 py-8 text-center shadow-sm">
                  <div className="text-7xl font-serif font-bold text-cardinal-red mb-1">
                    {community.stat.value.replace('+', '')}
                    <span className="text-4xl">+</span>
                  </div>
                  <div className="text-sm font-sans text-gray-500 tracking-widest uppercase">
                    {community.stat.label}
                  </div>
                </div>
              </motion.div>
            </motion.div>
            <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {community.items.map((item, i) => (
                <CommunityCard key={item.id} item={item} index={i} />
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* ── Events ────────────────────────────────────────────────── */}
        <section ref={eventsRef}>
          <motion.div initial="hidden" animate={eventsInView ? 'visible' : 'hidden'} variants={stagger}>
            <motion.div variants={fadeUp} className="text-center mb-14">
              <SectionLabel>{events.sectionLabel}</SectionLabel>
              <h2 className="text-4xl lg:text-5xl font-serif font-bold text-black mb-5">{events.heading}</h2>
              <div className="w-20 h-1.5 bg-digital-blue rounded-full mx-auto mb-5" />
              <p className="text-gray-600 font-sans text-lg max-w-2xl mx-auto leading-relaxed">{events.body}</p>
            </motion.div>
            <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {events.items.map((event, i) => (
                <EventCard key={event.id} event={event} index={i} />
              ))}
            </motion.div>
          </motion.div>
        </section>

        {/* ── Support Services ──────────────────────────────────────── */}
        <section ref={supportRef}>
          <motion.div initial="hidden" animate={supportInView ? 'visible' : 'hidden'} variants={stagger}>
            <div className="bg-black text-white rounded-[3rem] overflow-hidden shadow-2xl relative">
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cardinal-red via-digital-blue to-sand" />
              <div className="absolute top-20 right-20 w-80 h-80 bg-digital-blue/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-10 left-10 w-48 h-48 bg-cardinal-red/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 p-10 lg:p-16">
                <motion.div variants={fadeUp} className="flex flex-col lg:flex-row lg:items-end gap-8 mb-12">
                  <div className="lg:w-1/2">
                    <SectionLabel>{support.sectionLabel}</SectionLabel>
                    <h2 className="text-4xl lg:text-5xl font-serif font-bold text-white mb-5">{support.heading}</h2>
                    <div className="w-20 h-1.5 bg-gradient-to-r from-cardinal-red to-digital-blue rounded-full mb-5" />
                  </div>
                  <p className="lg:w-1/2 text-gray-400 font-sans text-lg leading-relaxed">{support.body}</p>
                </motion.div>
                <motion.div variants={stagger} className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-10">
                  {support.services.map((svc, i) => (
                    <ServiceRow key={svc.id} svc={svc} index={i} />
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </section>

      </div>
    </div>
  );
}
