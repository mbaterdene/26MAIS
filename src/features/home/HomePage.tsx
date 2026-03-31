import { BookOpen, Users, Compass, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const featureCards = [
  {
    id: 'academics',
    title: 'Academics',
    description: 'Rigorous philosopher-led curriculum with over 40 college-level courses, middle school program, and flipped classrooms.',
    gradient: 'from-cardinal-red to-digital-red',
    icon: <BookOpen size={64} className="text-white opacity-80 group-hover:scale-110 transition-transform duration-300" />,
    href: '/academics',
  },
  {
    id: 'admissions',
    title: 'Admissions',
    description: 'Holistic student review covering full-time, part-time, and single-course enrollments with generous financial aid.',
    gradient: 'from-digital-blue to-black',
    icon: <Award size={64} className="text-white opacity-80 group-hover:scale-110 transition-transform duration-300" />,
    href: '/admissions',
  },
  {
    id: 'student-life',
    title: 'Student Life',
    description: 'Join 60+ student-run clubs, participate in residential summer programs, and access top-tier counseling services.',
    gradient: 'from-sand to-gray-500',
    icon: <Users size={64} className="text-white opacity-80 group-hover:scale-110 transition-transform duration-300" />,
    href: '/student-life',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export function HomePage() {
  return (
    <div className="w-full">

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative bg-black text-white py-32 md:py-48 overflow-hidden">
        {/* Gradient overlay */}
        <div className="absolute inset-0 z-0 opacity-40 mix-blend-multiply bg-gradient-to-r from-cardinal-red to-black" />

        {/* Animated decorative circles */}
        <motion.div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-cardinal-red/10 blur-3xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-digital-blue/10 blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-start">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.22em] uppercase text-white/50 bg-white/10 px-4 py-1.5 rounded-full mb-8"
          >
            Stanford Online High School
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            A world-class <br />
            <span className="text-cardinal-red bg-white/10 px-2 rounded backdrop-blur-sm shadow-lg border border-white/20">
              online education
            </span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-200 mb-10 max-w-2xl font-sans leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8 }}
          >
            Stanford Online High School creates a unique academic community composed of geographically diverse, intellectually gifted students.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <Link
              to="/admissions"
              className="bg-cardinal-red hover:bg-digital-red text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:-translate-y-1 transition-all duration-300 text-center"
            >
              Start Your Application
            </Link>
            <Link
              to="/academics"
              className="bg-transparent border-2 border-white hover:bg-white hover:text-black text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg transition-all duration-300 text-center"
            >
              Explore Academics
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Feature Cards ─────────────────────────────────────────────── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={containerVariants}
          >
            {featureCards.map((card) => (
              <motion.div
                key={card.id}
                variants={cardVariants}
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 group"
              >
                <div className={`h-48 bg-gradient-to-br ${card.gradient} flex items-center justify-center`}>
                  {card.icon}
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-serif font-bold mb-4 text-black">{card.title}</h3>
                  <p className="text-gray-600 mb-6 font-sans leading-relaxed">{card.description}</p>
                  <Link
                    to={card.href}
                    className="text-digital-blue font-bold flex items-center group-hover:text-cardinal-red transition-colors"
                  >
                    Learn More{' '}
                    <span className="ml-2 group-hover:translate-x-2 transition-transform inline-block">→</span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Philosophy Banner ─────────────────────────────────────────── */}
      <motion.section
        className="bg-black py-20 border-b-8 border-cardinal-red"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto text-center px-4">
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Compass size={48} className="mx-auto text-sand mb-6" />
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-8">
            Guided by Reason and Scholarship.
          </h2>
          <p className="text-xl text-gray-300 font-sans leading-relaxed">
            At Stanford OHS, our unique pedagogy combines real-time seminar discussions with a university-style schedule, allowing students to challenge themselves dynamically while maintaining flexibility.
          </p>
        </div>
      </motion.section>
    </div>
  );
}
