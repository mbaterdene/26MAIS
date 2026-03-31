import { BookOpen, Calendar, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';
import { academicsContent } from '../../data/academics';

// ─── Animation Variants ───────────────────────────────────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const viewportOpts = { once: true, margin: '-100px' };

export function AcademicsPage() {
  const { hero, curriculum, pedagogy, graduation } = academicsContent;

  return (
    <div className="w-full bg-white">

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <motion.div
        className="bg-cardinal-red py-32 text-white relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 z-0 opacity-20 mix-blend-multiply bg-black" />
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">

        {/* ── Curriculum ───────────────────────────────────────────────── */}
        <motion.div
          className="mb-32 flex flex-col lg:flex-row gap-16 items-start"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOpts}
          variants={containerVariants}
        >
          <motion.div className="lg:w-1/3" variants={itemVariants}>
            <div className="inline-flex items-center justify-center p-5 bg-sand rounded-2xl mb-8 shadow-sm">
              <BookOpen size={48} className="text-black" />
            </div>
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-black mb-6">
              {curriculum.heading}
            </h2>
            <div className="w-20 h-1.5 bg-digital-red mb-6" />
            <p className="text-lg text-gray-600 font-sans leading-relaxed">{curriculum.body}</p>
          </motion.div>

          <motion.div
            className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-8 font-sans w-full"
            variants={containerVariants}
          >
            {curriculum.items.map((item) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className={`bg-white border text-left p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 ${item.accentColor} flex flex-col justify-between h-full group`}
              >
                <div>
                  <h3 className={`text-2xl font-bold mb-4 text-black ${item.hoverColor} transition-colors`}>
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Pedagogy ─────────────────────────────────────────────────── */}
        <motion.div
          className="mb-32 flex flex-col lg:flex-row-reverse gap-16 items-start bg-gray-50 rounded-3xl p-8 lg:p-16 shadow-inner"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOpts}
          variants={containerVariants}
        >
          <motion.div className="lg:w-1/3" variants={itemVariants}>
            <div className="inline-flex items-center justify-center p-5 bg-digital-blue rounded-2xl mb-8 text-white shadow-sm">
              <Calendar size={48} />
            </div>
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-black mb-6">
              {pedagogy.heading}
            </h2>
            <div className="w-20 h-1.5 bg-digital-blue mb-6" />
            <p className="text-lg text-gray-600 font-sans leading-relaxed">{pedagogy.body}</p>
          </motion.div>

          <motion.div className="lg:w-2/3 flex flex-col gap-8 font-sans w-full" variants={containerVariants}>
            {pedagogy.steps.map((s) => (
              <motion.div
                key={s.id}
                variants={itemVariants}
                className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 flex gap-6 items-start"
              >
                <div
                  className={`flex-shrink-0 w-12 h-12 rounded-full ${s.accentBg} text-white flex items-center justify-center font-bold text-xl shadow-lg`}
                >
                  {s.step}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-black mb-2">{s.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{s.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Graduation Requirements ──────────────────────────────────── */}
        <motion.div
          className="bg-black text-white rounded-[3rem] p-12 lg:p-20 shadow-2xl relative overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOpts}
          variants={containerVariants}
        >
          <motion.div
            className="absolute top-0 right-0 p-8 opacity-10"
            animate={{ rotate: 360 }}
            transition={{ duration: 100, repeat: Infinity, ease: 'linear' }}
          >
            <GraduationCap size={400} />
          </motion.div>

          <div className="relative z-10 text-center mb-16">
            <motion.h2 className="text-4xl lg:text-6xl font-serif font-bold mb-6" variants={itemVariants}>
              {graduation.heading}
            </motion.h2>
            <motion.div className="w-24 h-1.5 bg-cardinal-red mx-auto" variants={itemVariants} />
          </div>

          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-10 font-sans" variants={containerVariants}>
            {graduation.stats.map((stat) => (
              <motion.div
                key={stat.id}
                variants={itemVariants}
                className={`border border-gray-700/50 p-10 rounded-3xl bg-white/5 backdrop-blur-md hover:bg-white/10 transition-colors ${stat.offset ?? ''}`}
              >
                <div className={`text-6xl md:text-7xl font-bold ${stat.color} mb-6 drop-shadow-md`}>
                  {stat.value}
                </div>
                <h3 className="text-2xl font-bold mb-4 font-serif">{stat.label}</h3>
                <p className="text-gray-400 leading-relaxed">{stat.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
}
