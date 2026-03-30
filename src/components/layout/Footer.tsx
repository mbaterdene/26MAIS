import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-black text-white pt-16 pb-8 border-t-4 border-cardinal-red">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <h2 className="text-3xl font-serif font-bold text-white mb-4 tracking-tight">Stanford <br/>Online High School</h2>
            <p className="text-sm text-gray-300 font-sans leading-relaxed">
              Empowering intellectually engaged students worldwide through a rigorous, interactive online education.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4 text-sand">Academics</h3>
            <ul className="space-y-3 font-sans text-sm text-gray-300">
              <li><Link to="/academics" className="hover:text-white transition-colors">Core Sequence</Link></li>
              <li><Link to="/academics" className="hover:text-white transition-colors">Pedagogy</Link></li>
              <li><Link to="/academics" className="hover:text-white transition-colors">Graduation Requirements</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4 text-sand">Admissions</h3>
            <ul className="space-y-3 font-sans text-sm text-gray-300">
              <li><Link to="/admissions" className="hover:text-white transition-colors">Process</Link></li>
              <li><Link to="/admissions" className="hover:text-white transition-colors">Enrollment Options</Link></li>
              <li><Link to="/admissions" className="hover:text-white transition-colors">Financial Aid</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4 text-sand">Student Life</h3>
            <ul className="space-y-3 font-sans text-sm text-gray-300">
              <li><Link to="/student-life" className="hover:text-white transition-colors">Community</Link></li>
              <li><Link to="/student-life" className="hover:text-white transition-colors">Events</Link></li>
              <li><Link to="/student-life" className="hover:text-white transition-colors">Support Services</Link></li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-gray-800 text-center text-sm font-sans text-gray-400">
          <p>&copy; {new Date().getFullYear()} Stanford Online High School. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
