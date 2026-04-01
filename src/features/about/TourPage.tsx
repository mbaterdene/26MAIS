import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

export function TourPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
           className="mb-16"
        >
          <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-white bg-white/20 px-3 py-1 rounded-full mb-6 relative">
            Virtual Experience
          </span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6">Take the Tour</h1>
          <p className="text-xl max-w-2xl mx-auto font-sans text-gray-300">
            Step inside Stanford OHS to discover how we redefine the modern learning environment.
          </p>
        </motion.div>

        <motion.div 
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ delay: 0.2, duration: 1 }}
           className="relative aspect-video max-w-5xl mx-auto bg-gray-900 rounded-3xl overflow-hidden shadow-2xl border border-gray-800 group cursor-pointer"
        >
          <img 
             src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80"
             alt="University Campus Tour"
             className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-24 h-24 bg-cardinal-red/90 rounded-full flex items-center justify-center text-white backdrop-blur-sm group-hover:scale-110 transition-transform shadow-xl hover:bg-red-700">
               <Play size={40} className="ml-2" />
             </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
