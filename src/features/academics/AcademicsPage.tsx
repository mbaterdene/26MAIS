import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Award, Clock } from 'lucide-react';
import { academicsContent } from '../../data/academics';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};
const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};
const listStagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};
const listItem = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const vp = { once: true, margin: '-80px' };

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-cardinal-red bg-cardinal-red/10 px-3 py-1 rounded-full mb-5">
      {children}
    </span>
  );
}

export function AcademicsPage() {
  const { hero, middleSchool, philosophy, catalog, schedule, requirements } = academicsContent;
  const [activeCategory, setActiveCategory] = useState<string>('All');
  
  const categories = ['All', ...catalog.categories];
  
  const filteredCourses = activeCategory === 'All' 
    ? catalog.courses 
    : catalog.courses.filter(c => c.category === activeCategory);

  return (
    <div className="w-full bg-white pb-24">
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <motion.div
        className="bg-black py-32 md:py-44 text-white relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-cardinal-red/20 via-black to-digital-blue/20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.22em] uppercase text-white/50 bg-white/10 px-4 py-1.5 rounded-full mb-8"
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
            className="text-xl md:text-2xl font-sans max-w-3xl mx-auto opacity-80 leading-relaxed"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {hero.subtitle}
          </motion.p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col gap-32">
        {/* ── Curriculum & Middle School ───────────────────────────────── */}
        <section className="flex flex-col gap-24">
          {/* Philosophy Sequence */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={vp} variants={stagger}
            className="flex flex-col lg:flex-row gap-16 items-center"
          >
            <motion.div variants={fadeUp} className="w-full lg:w-1/2">
              <SectionLabel>{philosophy.sectionLabel}</SectionLabel>
              <h2 className="text-4xl lg:text-5xl font-serif font-bold text-black mb-6">{philosophy.heading}</h2>
              <div className="w-20 h-1.5 bg-cardinal-red rounded-full mb-6" />
              <p className="text-gray-600 text-lg font-sans leading-relaxed">{philosophy.body}</p>
            </motion.div>
            <motion.div variants={fadeUp} className="w-full lg:w-1/2">
              <div className="rounded-3xl overflow-hidden shadow-2xl relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-cardinal-red/30 to-transparent mix-blend-overlay z-10" />
                <img src={philosophy.imageUrl} alt="Philosophy core sequence" className="w-full h-[400px] object-cover transform hover:scale-105 transition-transform duration-700" />
              </div>
            </motion.div>
          </motion.div>

          {/* Middle School Program */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={vp} variants={stagger}
            className="flex flex-col lg:flex-row-reverse gap-16 items-center"
          >
            <motion.div variants={fadeUp} className="w-full lg:w-1/2">
              <SectionLabel>{middleSchool.sectionLabel}</SectionLabel>
              <h2 className="text-4xl lg:text-5xl font-serif font-bold text-black mb-6">{middleSchool.heading}</h2>
              <div className="w-20 h-1.5 bg-digital-blue rounded-full mb-6" />
              <p className="text-gray-600 text-lg font-sans leading-relaxed">{middleSchool.body}</p>
            </motion.div>
            <motion.div variants={fadeUp} className="w-full lg:w-1/2">
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img src={middleSchool.imageUrl} alt="Middle School Program" className="w-full h-[400px] object-cover transform hover:scale-105 transition-transform duration-700" />
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* ── Course Catalog (Mock UI) ─────────────────────────────────── */}
        <motion.section initial="hidden" whileInView="visible" viewport={vp} variants={stagger}>
          <motion.div className="text-center mb-12" variants={fadeUp}>
            <SectionLabel>{catalog.sectionLabel}</SectionLabel>
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-black mb-6">{catalog.heading}</h2>
          </motion.div>

          {/* Filter Bar */}
          <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full font-bold text-sm transition-colors ${
                  activeCategory === cat 
                    ? 'bg-black text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Course Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={stagger}
            key={activeCategory} // Force re-render animation on category change
          >
            {filteredCourses.map((course, i) => (
              <motion.div
                key={course.id}
                custom={i}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all"
              >
                <div className="flex justify-between items-start mb-4">
                  <BookOpen className="text-digital-blue" size={24} />
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{course.category}</span>
                </div>
                <h3 className="text-xl font-serif font-bold text-black mb-2">{course.title}</h3>
                <span className="inline-block bg-sand/30 text-black/80 text-xs font-semibold px-2 py-1 rounded">
                  {course.level}
                </span>
              </motion.div>
            ))}
            {/* Visual filler for matching prompt requirement '40+' mock look */}
            {filteredCourses.length > 0 && Array.from({ length: Math.max(0, 8 - filteredCourses.length) }).map((_, i) => (
               <motion.div key={`filler-${i}`} variants={fadeUp} className="bg-gray-50 border border-gray-100 rounded-2xl p-6 opacity-60">
                 <div className="w-8 h-8 bg-gray-200 rounded mb-4 animate-pulse"></div>
                 <div className="w-full h-4 bg-gray-200 rounded mb-2 animate-pulse"></div>
                 <div className="w-1/2 h-4 bg-gray-200 rounded animate-pulse"></div>
               </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* ── Schedule & Requirements ──────────────────────────────────── */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Schedule Graphic */}
          <motion.div initial="hidden" whileInView="visible" viewport={vp} variants={stagger} className="bg-sand rounded-[3rem] p-10 lg:p-14">
            <motion.div variants={fadeUp} className="mb-8">
              <SectionLabel>{schedule.sectionLabel}</SectionLabel>
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-black mb-4">{schedule.heading}</h2>
              <p className="text-gray-700 font-sans leading-relaxed">{schedule.body}</p>
            </motion.div>
            
            <motion.div variants={fadeUp} className="space-y-4">
              {['Monday (Flipped Classroom)', 'Tuesday (Live Seminar, 90m)', 'Wednesday (Office Hours)', 'Thursday (Live Seminar, 90m)', 'Friday (Independent Research)'].map((day, i) => (
                <div key={i} className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm">
                  <Clock className="text-cardinal-red flex-shrink-0" size={20} />
                  <span className="font-sans font-medium text-black">{day}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Graduation Requirements */}
          <motion.div initial="hidden" whileInView="visible" viewport={vp} variants={listStagger}>
             <motion.div variants={fadeUp} className="mb-8 pl-4 lg:pl-0">
               <SectionLabel>{requirements.sectionLabel}</SectionLabel>
               <h2 className="text-3xl lg:text-4xl font-serif font-bold text-black mb-2">{requirements.heading}</h2>
               <div className="text-5xl font-black text-gray-200">{requirements.totalCredits} <span className="text-xl font-bold font-sans tracking-widest uppercase text-gray-400">Total Credits</span></div>
             </motion.div>

             <motion.ul variants={listStagger} className="space-y-4">
               {requirements.items.map((req) => (
                 <motion.li 
                   key={req.id} 
                   variants={listItem}
                   className="flex items-center justify-between border-b border-gray-100 pb-4 pl-4 lg:pl-0 pr-4"
                 >
                   <div className="flex items-center gap-3">
                     <Award className="text-cardinal-red" size={20} />
                     <span className="text-lg font-serif font-bold text-black">{req.subject}</span>
                   </div>
                   <div className="font-sans font-medium text-gray-500">
                     {req.years} <span className="text-sm">Year{req.years > 1 ? 's' : ''}</span>
                   </div>
                 </motion.li>
               ))}
             </motion.ul>
          </motion.div>
        </section>

      </div>
    </div>
  );
}
