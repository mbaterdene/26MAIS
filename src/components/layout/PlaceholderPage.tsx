import { Link } from 'react-router-dom';
import { Settings, ArrowLeft } from 'lucide-react';

export function PlaceholderPage() {
  return (
    <div className="min-h-screen bg-sand flex flex-col items-center justify-center p-8 text-center text-black">
      <div className="animate-spin text-cardinal-red/50 mb-8">
        <Settings size={80} strokeWidth={1} />
      </div>
      <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight mb-4 text-black">
        Page Under Construction
      </h1>
      <p className="text-xl max-w-xl font-sans text-gray-600 mb-10 leading-relaxed">
        We're actively building out this section of the Stanford OHS experience. Please check back soon for updates.
      </p>
      <Link 
        to="/" 
        className="inline-flex items-center gap-3 bg-cardinal-red hover:bg-black text-white px-8 py-3.5 rounded-full font-bold text-lg shadow-md transition-all duration-300"
      >
        <ArrowLeft size={20} /> Return Home
      </Link>
    </div>
  );
}
