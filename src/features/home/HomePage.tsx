import { BookOpen, Users, Compass, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

export function HomePage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-black text-white py-32 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40 mix-blend-multiply bg-gradient-to-r from-cardinal-red to-black"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-start animate-slide-up">
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight">
            A world-class <br />
            <span className="text-cardinal-red bg-white/10 px-2 rounded backdrop-blur-sm shadow-lg border border-white/20">online education</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-2xl font-sans">
            Stanford Online High School creates a unique academic community composed of geographically diverse, intellectually gifted students.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/admissions" className="bg-cardinal-red hover:bg-digital-red text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:-translate-y-1 transition-all duration-300">
              Start Your Application
            </Link>
            <Link to="/academics" className="bg-transparent border-2 border-white hover:bg-white hover:text-black text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg transition-all duration-300">
              Explore Academics
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Navigation Cards Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Academics */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group">
              <div className="h-48 bg-gradient-to-br from-cardinal-red to-digital-red flex items-center justify-center">
                <BookOpen size={64} className="text-white opacity-80 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-serif font-bold mb-4">Academics</h3>
                <p className="text-gray-600 mb-6 font-sans">
                  Rigorous philosopher-led curriculum with over 40 college-level courses, middle school program, and flipped classrooms.
                </p>
                <Link to="/academics" className="text-digital-blue font-bold flex items-center group-hover:text-cardinal-red transition-colors">
                  Learn More <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
                </Link>
              </div>
            </div>

            {/* Admissions */}
            <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-digital-blue to-black flex items-center justify-center">
                <Award size={64} className="text-white opacity-80 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-serif font-bold mb-4">Admissions</h3>
                <p className="text-gray-600 mb-6 font-sans">
                  Holistic student review covering full-time, part-time, and single-course enrollments with generous financial aid.
                </p>
                <Link to="/admissions" className="text-digital-blue font-bold flex items-center group-hover:text-cardinal-red transition-colors">
                  Learn More <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
                </Link>
              </div>
            </div>

            {/* Student Life */}
            <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 group overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-sand to-gray-500 flex items-center justify-center">
                <Users size={64} className="text-white opacity-80 group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-serif font-bold mb-4">Student Life</h3>
                <p className="text-gray-600 mb-6 font-sans">
                  Join 90+ student-run clubs, participate in residential summer programs, and access top-tier counseling services.
                </p>
                <Link to="/student-life" className="text-digital-blue font-bold flex items-center group-hover:text-cardinal-red transition-colors">
                  Learn More <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Philosophy Banner */}
      <section className="bg-black py-20 border-b-8 border-cardinal-red">
         <div className="max-w-4xl mx-auto text-center px-4">
            <Compass size={48} className="mx-auto text-sand mb-6" />
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-8">Guided by Reason and Scholarship.</h2>
            <p className="text-xl text-gray-300 font-sans leading-relaxed">
              At Stanford OHS, our unique pedagogy combines real-time seminar discussions with a university-style schedule, allowing students to challenge themselves dynamically while maintaining flexibility.
            </p>
         </div>
      </section>
    </div>
  );
}
