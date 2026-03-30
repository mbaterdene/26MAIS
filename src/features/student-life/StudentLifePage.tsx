import { Users, Tent, Presentation, Compass, Calendar, GraduationCap } from 'lucide-react';

export function StudentLifePage() {
  return (
    <div className="w-full bg-white animate-fade-in">
      {/* Hero Section */}
      <div className="bg-digital-red py-24 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-serif font-bold mb-6">Student Life & Support</h1>
          <p className="text-xl font-sans max-w-3xl mx-auto opacity-90">
            A vibrant, global community fostering connection beyond the virtual classroom.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        {/* Community Section */}
        <section className="mb-24 px-4 bg-gray-50 rounded-3xl py-16 shadow-inner relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-10">
            <Users size={300} />
          </div>
          <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <h2 className="text-4xl font-serif font-bold text-black mb-6">Community</h2>
              <div className="w-16 h-1 bg-digital-blue mb-6"></div>
              <p className="text-gray-700 font-sans text-lg mb-8 leading-relaxed">
                Our students connect deeply across time zones, building friendships and collaborating on projects through a multitude of student-led initiatives.
              </p>
            </div>
            <div className="md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-md transition-shadow">
                 <div className="bg-sand p-3 rounded-full text-black mt-1"><Presentation size={24} /></div>
                 <div>
                   <h3 className="font-bold text-lg text-black mb-1">90+ Student Clubs</h3>
                   <p className="text-sm text-gray-500">From Model UN to Robotics and literary magazines.</p>
                 </div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-md transition-shadow">
                 <div className="bg-cardinal-red p-3 rounded-full text-white mt-1"><Users size={24} /></div>
                 <div>
                   <h3 className="font-bold text-lg text-black mb-1">Student Gov</h3>
                   <p className="text-sm text-gray-500">Elected representatives shaping the OHS experience.</p>
                 </div>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4 hover:shadow-md transition-shadow sm:col-span-2">
                 <div className="bg-digital-blue p-3 rounded-full text-white mt-1"><Calendar size={24} /></div>
                 <div>
                   <h3 className="font-bold text-lg text-black mb-1">Weekly Homeroom</h3>
                   <p className="text-sm text-gray-500">Dedicated time for connection, announcements, and advisory support with dedicated instructors.</p>
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* Events Layout Section */}
        <section className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-black mb-4">Events</h2>
            <div className="w-24 h-1 bg-cardinal-red mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 font-sans">
             <div className="bg-white border rounded-2xl p-6 group hover:border-cardinal-red transition-colors duration-300">
                <Tent size={40} className="text-cardinal-red mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold mb-2">Summer @ Stanford</h3>
                <p className="text-sm text-gray-600">A residential summer program exclusively for OHS students on the beautiful Stanford campus.</p>
             </div>
             <div className="bg-white border rounded-2xl p-6 group hover:border-digital-blue transition-colors duration-300">
                <Compass size={40} className="text-digital-blue mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold mb-2">Science & Arts Fairs</h3>
                <p className="text-sm text-gray-600">Annual showcases of exceptional student research and creative portfolio work.</p>
             </div>
             <div className="bg-white border rounded-2xl p-6 group hover:border-black transition-colors duration-300">
                <GraduationCap size={40} className="text-black mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold mb-2">Pixel Fest & Grad</h3>
                <p className="text-sm text-gray-600">Celebrate the end of the year with our dynamic online festival and in-person graduation ceremonies.</p>
             </div>
             <div className="bg-white border rounded-2xl p-6 group hover:border-sand transition-colors duration-300 border-b-4 border-b-sand">
                <Users size={40} className="text-sand mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold mb-2">Regional Meetups</h3>
                <p className="text-sm text-gray-600">Geographical gatherings organized by parents and students spanning the globe.</p>
             </div>
          </div>
        </section>

        {/* Support Services */}
        <section className="bg-black text-white p-12 rounded-3xl shadow-xl border-t-8 border-digital-blue">
           <h2 className="text-4xl font-serif font-bold mb-8">Support Services</h2>
           <p className="text-lg text-gray-300 mb-12 font-sans max-w-2xl">
             Comprehensive advising ensures every student thrives academically and emotionally in our rigorous environment.
           </p>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-sans">
              <div className="flex gap-6 items-start">
                 <div className="text-3xl text-digital-blue font-serif font-bold">01</div>
                 <div>
                   <h3 className="text-2xl font-bold text-white mb-2">Academic Advising</h3>
                   <p className="text-gray-400">Personalized guidance to navigate course selection, coordinate schedules, and build long-term academic roadmaps.</p>
                 </div>
              </div>
              <div className="flex gap-6 items-start">
                 <div className="text-3xl text-digital-red font-serif font-bold">02</div>
                 <div>
                   <h3 className="text-2xl font-bold text-white mb-2">College Counseling</h3>
                   <p className="text-gray-400">Expert structured support for the college application process, starting early to identify best-fit university pathways.</p>
                 </div>
              </div>
              <div className="flex gap-6 items-start">
                 <div className="text-3xl text-cardinal-red font-serif font-bold">03</div>
                 <div>
                   <h3 className="text-2xl font-bold text-white mb-2">Wellness & SEL</h3>
                   <p className="text-gray-400">Dedicated counselors focused on Social-Emotional Learning and student wellbeing in a high-achievement setting.</p>
                 </div>
              </div>
              <div className="flex gap-6 items-start">
                 <div className="text-3xl text-sand font-serif font-bold">04</div>
                 <div>
                   <h3 className="text-2xl font-bold text-white mb-2">Writing & Tutoring</h3>
                   <p className="text-gray-400">Peer and instructor-led centers assisting students with essays, complex math sets, and study habits.</p>
                 </div>
              </div>
           </div>
        </section>

      </div>
    </div>
  );
}
