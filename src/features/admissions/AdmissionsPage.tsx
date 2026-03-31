import { CreditCard, Users, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { admissionsContent } from '../../data/admissions';

// ─── Animation Variants ───────────────────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.13 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const viewportOpts = { once: true, margin: '-80px' };

export function AdmissionsPage() {
  const { hero, process, enrollment, financialAid } = admissionsContent;

  return (
    <div className="w-full bg-gray-50">

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <motion.div
        className="bg-digital-blue py-32 text-white relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full bg-white/5 border border-white/10"
          animate={{ rotate: 360 }}
          transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h1
            className="text-5xl md:text-7xl font-serif font-bold mb-6"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {hero.title}
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl font-sans max-w-3xl mx-auto opacity-90"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {hero.subtitle}
          </motion.p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col gap-24">

        {/* ── Application Process ──────────────────────────────────────── */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={viewportOpts}
          variants={containerVariants}
        >
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-digital-blue bg-digital-blue/10 px-3 py-1 rounded-full mb-5">
              {process.sectionLabel}
            </span>
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-black mb-4">{process.heading}</h2>
            <div className="w-24 h-1.5 bg-cardinal-red mx-auto rounded-full" />
          </motion.div>

          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-10 pt-8" variants={containerVariants}>
            {process.steps.map((step, i) => (
              <motion.div
                key={step.id}
                variants={itemVariants}
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                className={`bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow relative ${i > 0 ? 'mt-0' : ''}`}
              >
                <div className={`absolute -top-6 left-8 ${step.accentBg} ${step.accentText} w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl shadow-lg`}>
                  {step.step}
                </div>
                <h3 className="text-2xl font-serif font-bold mt-4 mb-4 text-black">{step.title}</h3>
                <p className="text-gray-600 font-sans leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* ── Enrollment Options ───────────────────────────────────────── */}
        <motion.section
          className="bg-white p-10 lg:p-16 rounded-3xl shadow-lg border border-gray-100"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOpts}
          variants={containerVariants}
        >
          <motion.div className="flex flex-col lg:flex-row gap-12 items-start" variants={containerVariants}>
            <motion.div className="lg:w-1/3" variants={itemVariants}>
              <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-digital-blue bg-digital-blue/10 px-3 py-1 rounded-full mb-5">
                {enrollment.sectionLabel}
              </span>
              <h2 className="text-4xl font-serif font-bold text-black mb-6">{enrollment.heading}</h2>
              <p className="text-gray-600 font-sans leading-relaxed">{enrollment.body}</p>
            </motion.div>

            <motion.div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-3 gap-6" variants={containerVariants}>
              {enrollment.options.map((opt) => (
                <motion.div
                  key={opt.id}
                  variants={itemVariants}
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                  className={`border-2 ${opt.borderColor} rounded-2xl p-6 relative overflow-hidden group ${opt.hoverBg} transition-colors duration-300 cursor-default`}
                >
                  <h3 className={`text-xl font-bold ${opt.titleColor} ${opt.titleHoverColor} transition-colors mb-1`}>
                    {opt.title}
                  </h3>
                  <p className="text-sm text-gray-500 group-hover:text-gray-200 mb-4 transition-colors font-sans">
                    {opt.subtitle}
                  </p>
                  <ul className="text-sm font-sans space-y-2 text-gray-700 group-hover:text-white transition-colors">
                    {opt.features.map((f) => (
                      <li key={f} className="flex items-center gap-2">
                        <CheckCircle size={16} className="flex-shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.section>

        {/* ── Financial Aid ────────────────────────────────────────────── */}
        <motion.section
          className="bg-sand text-black p-10 lg:p-16 rounded-3xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOpts}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-black/60 bg-black/10 px-3 py-1 rounded-full mb-5">
              {financialAid.sectionLabel}
            </span>
            <CreditCard size={48} className="text-black mb-6" />
            <h2 className="text-4xl font-serif font-bold mb-6">{financialAid.heading}</h2>
            <p className="text-lg font-sans leading-relaxed mb-6">{financialAid.body}</p>
            <ul className="space-y-4 font-sans font-semibold text-lg">
              {financialAid.items.map((item) => (
                <li key={item.id} className="flex items-start gap-3">
                  <div className="mt-1 bg-black text-white rounded-full p-1">
                    <CheckCircle size={16} />
                  </div>
                  {item.text}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-black/10 p-8 rounded-2xl backdrop-blur-sm border border-black/5 flex flex-col items-center"
          >
            <Users size={64} className="opacity-50 mb-4" />
            <p className="text-center italic mb-6 font-sans leading-relaxed">{financialAid.quote}</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="bg-black text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition-colors"
            >
              {financialAid.ctaLabel}
            </motion.button>
          </motion.div>
        </motion.section>

      </div>
    </div>
  );
}
