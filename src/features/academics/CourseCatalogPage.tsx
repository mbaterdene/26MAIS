import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { academicsContent } from '../../data/academics';
import { Search, ChevronDown } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export function CourseCatalogPage() {
  const { catalog } = academicsContent;
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = catalog.courses.filter((course) => {
    const matchesCategory = activeCategory === 'All' || course.category === activeCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full bg-sand min-h-screen pt-40 pb-20 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="text-center mb-16">
          <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-black/60 bg-black/10 px-3 py-1 rounded-full mb-6">
            Academics
          </span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 text-black tracking-tight">Course Catalog</h1>
          <p className="text-xl max-w-2xl mx-auto font-sans text-gray-700">
            Explore our catalog of 40+ college-level seminars.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.2 }} className="mb-12 flex flex-col md:flex-row gap-6 items-center justify-between">
          
          <div className="flex bg-white rounded-full p-1.5 shadow-sm border border-gray-200 overflow-x-auto max-w-full">
             {catalog.categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${
                    activeCategory === category
                      ? 'bg-cardinal-red text-white shadow-md'
                      : 'text-gray-600 hover:text-black hover:bg-gray-50'
                  }`}
                >
                  {category}
                </button>
              ))}
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search courses..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-cardinal-red/20 focus:border-cardinal-red transition-all shadow-sm"
            />
          </div>

        </motion.div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredCourses.map((course) => (
              <motion.div
                layout
                key={course.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer flex flex-col h-full"
              >
                <div className="flex justify-between items-start mb-6">
                  <span className="text-xs font-bold font-sans tracking-[0.1em] text-cardinal-red uppercase bg-cardinal-red/10 px-3 py-1 rounded-md">
                    {course.id}
                  </span>
                  {course.level === 'Post-AP' && (
                     <span className="text-xs font-bold font-sans tracking-wide text-orange-600 uppercase bg-orange-100 px-3 py-1 rounded-md border border-orange-200">
                       Post-AP
                     </span>
                  )}
                </div>
                <h3 className="text-2xl font-serif font-bold text-black mb-4 group-hover:text-cardinal-red transition-colors">{course.title}</h3>
                <p className="font-sans text-gray-600 leading-relaxed mb-8 flex-1">An in-depth exploration of advanced topics tailored for highly motivated students.</p>
                <div className="mt-auto flex items-center justify-between text-sm font-bold text-gray-400 border-t border-gray-100 pt-6">
                  <span className="text-black/60">{course.category}</span>
                  <span className="group-hover:text-cardinal-red transition-colors flex items-center gap-1">Details <ChevronDown size={14} className="-rotate-90" /></span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredCourses.length === 0 && (
          <div className="py-24 text-center">
            <h3 className="text-2xl font-serif font-bold text-black mb-2">No courses found</h3>
            <p className="text-gray-500 font-sans">Try adjusting your search or filters.</p>
          </div>
        )}

      </div>
    </div>
  );
}
