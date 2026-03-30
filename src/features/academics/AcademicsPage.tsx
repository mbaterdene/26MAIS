import { BookOpen, Calendar, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

export function AcademicsPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.2 
      } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  return (
    <div className="w-full bg-white">
      {/* Hero Section */}
      <motion.div 
        className="bg-cardinal-red py-32 text-white relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 z-0 opacity-20 mix-blend-multiply bg-black"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.h1 
            className="text-5xl md:text-7xl font-serif font-bold mb-6"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Academics
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl font-sans max-w-3xl mx-auto opacity-90"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            A challenging, discussion-based curriculum designed for passionate learners.
          </motion.p>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        
        {/* Curriculum Section */}
        <motion.div 
          className="mb-32 flex flex-col lg:flex-row gap-16 items-start"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div className="lg:w-1/3" variants={itemVariants}>
            <div className="inline-flex items-center justify-center p-5 bg-sand rounded-2xl mb-8 shadow-sm">
              <BookOpen size={48} className="text-black" />
            </div>
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-black mb-6">The Curriculum</h2>
            <div className="w-20 h-1.5 bg-digital-red mb-6"></div>
            <p className="text-lg text-gray-600 font-sans leading-relaxed">
              Our core subjects interlock, creating a profound, university-level academic journey from early middle school to post-AP graduation.
            </p>
          </motion.div>

          <motion.div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-8 font-sans w-full" variants={containerVariants}>
             <motion.div variants={itemVariants} className="bg-white border text-left p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 border-l-cardinal-red flex flex-col justify-between h-full group">
               <div>
                  <h3 className="text-2xl font-bold mb-4 text-black group-hover:text-cardinal-red transition-colors">Core Sequence</h3>
                  <p className="text-gray-600 leading-relaxed">A rigorous sequence rooted in philosophy, teaching students to think critically, argue effectively, and write clearly.</p>
               </div>
             </motion.div>
             <motion.div variants={itemVariants} className="bg-white border text-left p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 border-l-digital-blue flex flex-col justify-between h-full group">
               <div>
                 <h3 className="text-2xl font-bold mb-4 text-black group-hover:text-digital-blue transition-colors">40+ College Courses</h3>
                 <p className="text-gray-600 leading-relaxed">Go beyond High School. Access specialized and advanced subjects rarely offered elsewhere.</p>
               </div>
             </motion.div>
             <motion.div variants={itemVariants} className="bg-white border text-left p-10 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 border-l-4 border-l-black flex flex-col justify-between h-full group">
               <div>
                 <h3 className="text-2xl font-bold mb-4 text-black group-hover:text-gray-700 transition-colors">Post-AP & University</h3>
                 <p className="text-gray-600 leading-relaxed">Opportunities for dual enrollment and ultra-advanced study in math, science, and humanities.</p>
               </div>
             </motion.div>
             <motion.div variants={itemVariants} className="bg-white border text-left p-10 rounded-3xl shadow-lg border-l-4 border-l-sand hover:shadow-2xl transition-all duration-300 flex flex-col justify-between h-full group">
               <div>
                 <h3 className="text-2xl font-bold mb-4 text-black group-hover:text-sand transition-colors">Middle School (7-8)</h3>
                 <p className="text-gray-600 leading-relaxed">Building foundations for exceptional academic achievement with a specialized curriculum for younger students.</p>
               </div>
             </motion.div>
          </motion.div>
        </motion.div>

        {/* Pedagogy Section */}
        <motion.div 
          className="mb-32 flex flex-col lg:flex-row-reverse gap-16 items-start bg-gray-50 rounded-3xl p-8 lg:p-16 shadow-inner"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div className="lg:w-1/3" variants={itemVariants}>
            <div className="inline-flex items-center justify-center p-5 bg-digital-blue rounded-2xl mb-8 text-white shadow-sm">
              <Calendar size={48} />
            </div>
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-black mb-6">Pedagogy</h2>
            <div className="w-20 h-1.5 bg-digital-blue mb-6"></div>
            <p className="text-lg text-gray-600 font-sans leading-relaxed">
              Our pedagogical approach flips the traditional classroom model to maximize the value of instructional time.
            </p>
          </motion.div>

          <motion.div className="lg:w-2/3 flex flex-col gap-8 font-sans w-full" variants={containerVariants}>
            <motion.div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 flex gap-6 items-start" variants={itemVariants}>
               <div className="flex-shrink-0 w-12 h-12 rounded-full bg-cardinal-red text-white flex items-center justify-center font-bold text-xl shadow-lg">1</div>
               <div>
                 <h3 className="text-2xl font-bold text-black mb-2">Flipped Classroom Model</h3>
                 <p className="text-gray-600 leading-relaxed">Students consume lectures and read materials independently before class, ensuring they arrive prepared to engage.</p>
               </div>
            </motion.div>
            
            <motion.div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 flex gap-6 items-start" variants={itemVariants}>
               <div className="flex-shrink-0 w-12 h-12 rounded-full bg-digital-blue text-white flex items-center justify-center font-bold text-xl shadow-lg">2</div>
               <div>
                 <h3 className="text-2xl font-bold text-black mb-2">Live Discussion Seminars</h3>
                 <p className="text-gray-600 leading-relaxed">Classes are exclusively discussion-based. Real-time online seminars with small class sizes foster active debate and collaboration.</p>
               </div>
            </motion.div>

            <motion.div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 flex gap-6 items-start" variants={itemVariants}>
               <div className="flex-shrink-0 w-12 h-12 rounded-full bg-black text-white flex items-center justify-center font-bold text-xl shadow-lg">3</div>
               <div>
                 <h3 className="text-2xl font-bold text-black mb-2">Critical Reasoning</h3>
                 <p className="text-gray-600 leading-relaxed">We train students to dismantle arguments, assess evidence, and articulate truth—not merely memorize facts.</p>
               </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Graduation Requirements Section */}
        <motion.div 
           className="bg-black text-white rounded-[3rem] p-12 lg:p-20 shadow-2xl relative overflow-hidden"
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true, margin: "-100px" }}
           variants={containerVariants}
        >
           <motion.div 
             className="absolute top-0 right-0 p-8 opacity-10"
             animate={{ rotate: 360 }}
             transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
           >
              <GraduationCap size={400} />
           </motion.div>

           <div className="relative z-10 text-center mb-16">
              <motion.h2 className="text-4xl lg:text-6xl font-serif font-bold mb-6" variants={itemVariants}>Graduation Requirements</motion.h2>
              <motion.div className="w-24 h-1.5 bg-cardinal-red mx-auto" variants={itemVariants}></motion.div>
           </div>

           <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-10 font-sans" variants={containerVariants}>
                 
                 <motion.div className="border border-gray-700/50 p-10 rounded-3xl bg-white/5 backdrop-blur-md hover:bg-white/10 transition-colors" variants={itemVariants}>
                   <div className="text-6xl md:text-7xl font-bold text-cardinal-red mb-6 drop-shadow-md">20</div>
                   <h3 className="text-2xl font-bold mb-4 font-serif">Full-Year Courses</h3>
                   <p className="text-gray-400 leading-relaxed">Total continuous credits required over four years of rigorous secondary education.</p>
                 </motion.div>
                 
                 <motion.div className="border border-gray-700/50 p-10 rounded-3xl bg-white/5 backdrop-blur-md hover:bg-white/10 transition-colors md:-translate-y-8" variants={itemVariants}>
                   <div className="text-6xl md:text-7xl font-bold text-sand mb-6 drop-shadow-md">4</div>
                   <h3 className="text-2xl font-bold mb-4 font-serif">Years Core Class</h3>
                   <p className="text-gray-400 leading-relaxed">Annual enrollment in our foundational multi-disciplinary philosophy sequence.</p>
                 </motion.div>
                 
                 <motion.div className="border border-gray-700/50 p-10 rounded-3xl bg-white/5 backdrop-blur-md hover:bg-white/10 transition-colors" variants={itemVariants}>
                   <div className="text-6xl md:text-7xl font-bold text-digital-blue mb-6 drop-shadow-md">1+</div>
                   <h3 className="text-2xl font-bold mb-4 font-serif">Discipline Unit</h3>
                   <p className="text-gray-400 leading-relaxed">Strict specific minimums distributed across science, humanities, and critical languages.</p>
                 </motion.div>

           </motion.div>
        </motion.div>

      </div>
    </div>
  );
}
