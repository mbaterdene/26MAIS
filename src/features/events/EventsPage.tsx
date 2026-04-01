import { motion } from 'framer-motion';
import { studentLifeContent } from '../../data/studentLife';
import { Calendar as CalendarIcon, MapPin, Users } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};
const staggerChildren = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

export function EventsPage() {
  const { events } = studentLifeContent;

  return (
    <div className="min-h-screen bg-sand pt-40 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div variants={fadeUp} initial="hidden" animate="visible" className="text-center mb-20">
          <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-black/60 bg-black/10 px-3 py-1 rounded-full mb-6">
            Student Life
          </span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-black mb-6">
            Annual Traditions
          </h1>
          <p className="text-xl max-w-2xl mx-auto font-sans text-gray-700">
            Explore our signature events that bring the Stanford OHS community together.
          </p>
        </motion.div>

        <motion.div
           variants={staggerChildren}
           initial="hidden"
           animate="visible"
           className="relative max-w-4xl mx-auto"
        >
          {/* Timeline Line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-200 transform -translate-x-1/2" />

          <div className="space-y-12">
            {events.timeline.map((event, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div key={event.id} variants={fadeUp} className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-16 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  
                  {/* Content Box */}
                  <div className={`w-full md:w-1/2 ${isEven ? 'md:text-right' : 'md:text-left'} flex flex-col ${isEven ? 'md:items-end' : 'md:items-start'}`}>
                    <span className="inline-block px-3 py-1 rounded text-xs font-bold tracking-widest uppercase text-cardinal-red bg-cardinal-red/10 mb-4 border border-cardinal-red/20 shadow-sm">
                      {event.season}
                    </span>
                    <h3 className="text-3xl font-serif font-bold text-black mb-4">{event.title}</h3>
                    <p className="text-gray-600 font-sans leading-relaxed text-lg mb-6">
                      {event.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm font-semibold text-gray-400">
                      <span className="flex items-center gap-1.5"><CalendarIcon size={16} className="text-cardinal-red"/> Annual</span>
                      <span className="flex items-center gap-1.5"><MapPin size={16} className="text-cardinal-red"/> Global</span>
                    </div>
                  </div>

                  {/* Marker (Desktop) */}
                  <div className="hidden md:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border-4 border-cardinal-red z-10 shadow-md">
                    <div className="w-full h-full bg-cardinal-red rounded-full opacity-20 animate-ping" />
                  </div>

                  {/* Image Box */}
                  <div className="w-full md:w-1/2">
                    <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-sm group">
                      <img 
                        src={event.imageUrl} 
                        alt={event.title} 
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
