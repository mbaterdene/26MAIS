import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link to="/" className="flex-shrink-0 flex items-center space-x-3">
          <span className="text-cardinal-red font-serif font-bold text-3xl tracking-tight">Stanford</span>
          <span className="text-black font-sans font-semibold text-lg border-l-2 border-digital-red pl-3 leading-tight hidden sm:block">
            Online High<br/>School
          </span>
        </Link>
        <nav className="hidden md:flex space-x-8">
          <Link to="/academics" className="text-black hover:text-cardinal-red font-semibold transition-colors duration-200">Academics</Link>
          <Link to="/admissions" className="text-black hover:text-cardinal-red font-semibold transition-colors duration-200">Admissions</Link>
          <Link to="/student-life" className="text-black hover:text-cardinal-red font-semibold transition-colors duration-200">Student Life</Link>
          <a href="#" className="bg-cardinal-red hover:bg-digital-red text-white px-5 py-2 rounded-full font-semibold transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cardinal-red">
            Apply Now
          </a>
        </nav>
        <button className="md:hidden text-black" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg">
          <div className="px-4 pt-2 pb-6 flex flex-col space-y-4">
            <Link to="/academics" onClick={() => setIsOpen(false)} className="text-black hover:text-cardinal-red font-semibold text-lg">Academics</Link>
            <Link to="/admissions" onClick={() => setIsOpen(false)} className="text-black hover:text-cardinal-red font-semibold text-lg">Admissions</Link>
            <Link to="/student-life" onClick={() => setIsOpen(false)} className="text-black hover:text-cardinal-red font-semibold text-lg">Student Life</Link>
            <a href="#" className="bg-cardinal-red text-white px-5 py-3 rounded-md text-center font-semibold mt-2">
              Apply Now
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
