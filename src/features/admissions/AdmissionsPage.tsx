import { CreditCard, Users, CheckCircle } from 'lucide-react';

export function AdmissionsPage() {
  return (
    <div className="w-full bg-gray-50 animate-fade-in">
      {/* Hero Section */}
      <div className="bg-digital-blue py-24 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-serif font-bold mb-6">Admissions</h1>
          <p className="text-xl font-sans max-w-3xl mx-auto opacity-90">
            Join a vibrant community of passionate learners from around the globe.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        {/* Process Section */}
        <section className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-black mb-4">The Application Process</h2>
            <div className="w-24 h-1 bg-cardinal-red mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow relative">
              <div className="absolute -top-6 left-8 bg-cardinal-red text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl shadow-lg">1</div>
              <h3 className="text-2xl font-serif font-bold mt-4 mb-4">Traditional App</h3>
              <p className="text-gray-600 font-sans">Similar to a college application, requiring transcripts, teacher recommendations, and standardized test scores.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow relative mt-12 md:mt-0">
              <div className="absolute -top-6 left-8 bg-digital-blue text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl shadow-lg">2</div>
              <h3 className="text-2xl font-serif font-bold mt-4 mb-4">Holistic Review</h3>
              <p className="text-gray-600 font-sans">We look beyond numbers. There are no strict cut-offs. Every applicant is evaluated comprehensively to gauge potential.</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-shadow relative mt-12 md:mt-0">
              <div className="absolute -top-6 left-8 bg-black text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-xl shadow-lg">3</div>
              <h3 className="text-2xl font-serif font-bold mt-4 mb-4">Assessments</h3>
              <p className="text-gray-600 font-sans">Finalist candidates complete a proctored online assessment and engage in a personalized interview with our admissions team.</p>
            </div>
          </div>
        </section>

        {/* Enrollment Options Section */}
        <section className="mb-24 bg-white p-12 rounded-3xl shadow-lg border border-gray-100">
          <div className="flex flex-col md:flex-row gap-12 items-center">
             <div className="md:w-1/3">
               <h2 className="text-4xl font-serif font-bold text-black mb-6">Enrollment Options</h2>
               <p className="text-gray-600 font-sans mb-8 leading-relaxed">Customize your educational journey. Whether you are looking for a complete high school experience or supplemental advanced coursework, we have an option for you.</p>
             </div>
             <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="border-2 border-cardinal-red rounded-xl p-6 relative overflow-hidden group hover:bg-cardinal-red transition-colors duration-300">
                  <h3 className="text-xl font-bold text-cardinal-red group-hover:text-white transition-colors mb-2">Full-Time</h3>
                  <p className="text-sm text-gray-500 group-hover:text-gray-200 mb-4 transition-colors">4+ Courses</p>
                  <ul className="text-sm font-sans space-y-2 text-gray-700 group-hover:text-white transition-colors">
                    <li className="flex items-center gap-2"><CheckCircle size={16} /> Complete diploma path</li>
                    <li className="flex items-center gap-2"><CheckCircle size={16} /> Full advising support</li>
                  </ul>
                </div>
                <div className="border border-digital-blue rounded-xl p-6 relative overflow-hidden group hover:bg-digital-blue transition-colors duration-300">
                  <h3 className="text-xl font-bold text-digital-blue group-hover:text-white transition-colors mb-2">Part-Time</h3>
                  <p className="text-sm text-gray-500 group-hover:text-gray-200 mb-4 transition-colors">2-3 Courses</p>
                  <ul className="text-sm font-sans space-y-2 text-gray-700 group-hover:text-white transition-colors">
                    <li className="flex items-center gap-2"><CheckCircle size={16} /> Dual enrollment</li>
                    <li className="flex items-center gap-2"><CheckCircle size={16} /> Flexible schedule</li>
                  </ul>
                </div>
                <div className="border border-gray-300 rounded-xl p-6 relative overflow-hidden group hover:bg-black transition-colors duration-300">
                  <h3 className="text-xl font-bold text-black group-hover:text-white transition-colors mb-2">Single Course</h3>
                  <p className="text-sm text-gray-500 group-hover:text-gray-400 mb-4 transition-colors">1 Course</p>
                  <ul className="text-sm font-sans space-y-2 text-gray-700 group-hover:text-white transition-colors">
                    <li className="flex items-center gap-2"><CheckCircle size={16} /> Advanced subjects</li>
                    <li className="flex items-center gap-2"><CheckCircle size={16} /> Specialized focus</li>
                  </ul>
                </div>
             </div>
          </div>
        </section>

        {/* Financial Aid */}
        <section className="bg-sand text-black p-12 rounded-3xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <CreditCard size={48} className="text-black mb-6" />
              <h2 className="text-4xl font-serif font-bold mb-6">Financial Aid</h2>
              <p className="text-lg font-sans leading-relaxed mb-6">
                Stanford OHS is committed to making our program accessible to all qualified students, regardless of financial circumstance.
              </p>
              <ul className="space-y-4 font-sans font-semibold text-lg">
                <li className="flex items-start gap-3">
                  <div className="mt-1 bg-black text-white rounded-full p-1"><CheckCircle size={16} /></div>
                  Need-based awards only
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 bg-black text-white rounded-full p-1"><CheckCircle size={16} /></div>
                  Available for International Students
                </li>
              </ul>
            </div>
            <div className="bg-black/10 p-8 rounded-2xl backdrop-blur-sm border border-black/5 flex flex-col items-center">
               <Users size={64} className="opacity-50 mb-4" />
               <p className="text-center italic mb-6">"Our financial aid program ensures that geographic and socioeconomic diversity remains a cornerstone of the OHS experience."</p>
               <button className="bg-black text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition-colors">
                 Learn About Tuition & Aid
               </button>
            </div>
        </section>

      </div>
    </div>
  );
}
