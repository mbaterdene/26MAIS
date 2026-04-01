import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { admissionsContent } from '../../data/admissions';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};
const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.13 } },
};

const vp = { once: true, margin: '-80px' };

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-digital-blue bg-digital-blue/10 px-3 py-1 rounded-full mb-5">
      {children}
    </span>
  );
}

export function AdmissionsPage() {
  const { hero, process, enrollment, financialAid } = admissionsContent;
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <div className="w-full bg-gray-50 pb-24">
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <motion.div
        className="bg-digital-blue py-32 md:py-44 text-white relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80')] mix-blend-overlay opacity-20 object-cover w-full h-full" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.22em] uppercase text-white/80 bg-white/20 px-4 py-1.5 rounded-full mb-8 backdrop-blur-md"
          >
            {hero.eyebrow}
          </motion.div>
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-6 leading-tight"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {hero.title}
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl font-sans max-w-3xl mx-auto opacity-90 leading-relaxed"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {hero.subtitle}
          </motion.p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col gap-32">
        {/* ── Overview & Apply Timeline ────────────────────────────────── */}
        <motion.section initial="hidden" whileInView="visible" viewport={vp} variants={stagger}>
          <motion.div className="text-center mb-16" variants={fadeUp}>
            <SectionLabel>{process.sectionLabel}</SectionLabel>
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-black mb-6">{process.heading}</h2>
            <div className="w-24 h-1.5 bg-cardinal-red mx-auto rounded-full mb-10" />
            <Link to="/apply" className="inline-flex items-center gap-2 bg-cardinal-red text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-red-800 transition-colors shadow-lg">
              Start Application <ArrowRight size={20} />
            </Link>
          </motion.div>

          {/* Timeline */}
          <motion.div className="relative pt-12 pb-8 max-w-4xl mx-auto" variants={stagger}>
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gray-200 transform md:-translate-x-1/2 rounded-full" />
            
            {process.steps.map((step, i) => (
              <motion.div key={step.id} variants={fadeUp} className={`relative flex items-center justify-between mb-16 md:mb-24 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="hidden md:block w-5/12" />
                
                {/* Center Node */}
                <div className="absolute left-8 md:left-1/2 w-16 h-16 rounded-full transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center font-bold text-sm shadow-xl z-10 border-4 border-white leading-tight text-center px-1" style={{ backgroundColor: step.accentBg.replace('bg-', '') }}>
                  <div className={`w-full h-full rounded-full flex items-center justify-center ${step.accentBg} ${step.accentText}`}>
                    {step.month}
                  </div>
                </div>

                <div className="w-full pl-24 md:pl-0 md:w-5/12">
                  <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow relative">
                    <h3 className="text-2xl font-serif font-bold mb-3 text-black">{step.title}</h3>
                    <p className="text-gray-600 font-sans leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* ── Enrollment Options & Tuition ──────────────────────────────── */}
        <motion.section initial="hidden" whileInView="visible" viewport={vp} variants={stagger}>
          <motion.div className="text-center mb-16" variants={fadeUp}>
            <SectionLabel>{enrollment.sectionLabel}</SectionLabel>
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-black mb-6">{enrollment.heading}</h2>
            <p className="text-gray-600 font-sans leading-relaxed max-w-2xl mx-auto">{enrollment.body}</p>
          </motion.div>

          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start" variants={stagger}>
            {enrollment.options.map((opt) => (
              <motion.div
                key={opt.id}
                variants={fadeUp}
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                className={`flex flex-col h-full bg-white border-2 ${opt.borderColor} rounded-3xl p-8 lg:p-10 relative overflow-hidden group ${opt.hoverBg} transition-all duration-300 shadow-sm hover:shadow-2xl`}
              >
                <div className="mb-6">
                  <h3 className={`text-2xl font-serif font-bold ${opt.titleColor} ${opt.titleHoverColor} transition-colors mb-2`}>
                    {opt.title}
                  </h3>
                  <div className="text-sm font-bold uppercase tracking-widest text-gray-500 group-hover:text-gray-300 transition-colors mb-6">
                    {opt.subtitle}
                  </div>
                  <div className={`text-4xl lg:text-5xl font-sans font-black text-black group-hover:text-white transition-colors`}>
                    {opt.tuition}
                  </div>
                  <div className="text-sm text-gray-500 group-hover:text-gray-200 mt-2">per academic year</div>
                </div>

                <div className="flex-1 border-t border-gray-100 group-hover:border-white/20 pt-6 transition-colors">
                  <ul className="text-base font-sans space-y-4 text-gray-700 group-hover:text-white transition-colors">
                    {opt.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle size={20} className="flex-shrink-0 mt-0.5 opacity-80" /> 
                        <span className="leading-tight">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* ── Financial Aid & Criteria Accordion ───────────────────────── */}
        <motion.section 
          initial="hidden" whileInView="visible" viewport={vp} variants={stagger}
          className="bg-sand p-8 lg:p-16 rounded-[3rem] shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-16"
        >
          <motion.div variants={fadeUp}>
            <SectionLabel>{financialAid.sectionLabel}</SectionLabel>
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-black mb-6">{financialAid.heading}</h2>
            <div className="w-16 h-1.5 bg-black rounded-full mb-8" />
            <p className="text-xl font-sans text-gray-800 leading-relaxed mb-8">{financialAid.body}</p>
          </motion.div>

          <motion.div variants={stagger} className="flex flex-col gap-4">
            {financialAid.faqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <motion.div 
                  key={faq.id} 
                  variants={fadeUp}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors focus:outline-none"
                  >
                    <span className="text-lg font-serif font-bold text-black pr-8">{faq.question}</span>
                    <span className="text-cardinal-red flex-shrink-0 bg-red-50 p-2 rounded-full">
                      {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </span>
                  </button>
                  <motion.div
                    initial={false}
                    animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                    className="overflow-hidden"
                  >
                    <p className="p-6 pt-0 text-gray-600 font-sans leading-relaxed border-t border-gray-50 mt-2">
                      {faq.answer}
                    </p>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.section>

      </div>
    </div>
  );
}
