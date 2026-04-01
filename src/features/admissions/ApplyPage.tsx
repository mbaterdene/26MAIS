import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export function ApplyPage() {
  return (
    <div className="min-h-screen bg-sand pt-40 pb-32">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-black/60 bg-black/10 px-3 py-1 rounded-full mb-6">
            Admissions
          </span>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-black mb-6">
            Application Portal
          </h1>
          <p className="text-xl mx-auto font-sans text-gray-700">
            Take the first step towards joining the Stanford OHS community.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-white rounded-[2rem] p-10 md:p-14 shadow-lg border border-gray-100 relative overflow-hidden"
        >
          {/* Top Decorative bar */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-cardinal-red to-digital-blue" />
          
          <div className="mb-10 text-center">
             <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Start Your Application</h2>
             <p className="text-gray-500 font-sans">Please log in or create an account to securely submit your materials, track your status, and register for events.</p>
          </div>

          <form className="space-y-6 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
              <input type="email" placeholder="student@example.com" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cardinal-red/20 focus:border-cardinal-red outline-none transition-all" />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
              <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cardinal-red/20 focus:border-cardinal-red outline-none transition-all" />
              <div className="text-right mt-2">
                <a href="#" className="text-xs font-semibold text-cardinal-red hover:underline">Forgot password?</a>
              </div>
            </div>

            <button type="submit" className="w-full bg-black text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-800 transition-colors shadow-md flex items-center justify-center gap-2">
               Log In <ArrowRight size={18} />
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col items-center">
            <p className="text-sm font-bold text-gray-500 mb-4 uppercase tracking-widest">New Applicant?</p>
            <button className="bg-white border-2 border-black text-black px-8 py-4 rounded-full font-bold hover:bg-black hover:text-white transition-colors shadow-sm">
               Create an Account
            </button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 flex flex-col md:flex-row gap-8 justify-center items-center text-sm font-medium text-gray-500"
        >
          <div className="flex items-center gap-2"><CheckCircle2 className="text-green-500" size={18}/> Secure & Encrypted</div>
          <div className="flex items-center gap-2"><CheckCircle2 className="text-green-500" size={18}/> Auto-saving Progress</div>
          <div className="flex items-center gap-2"><CheckCircle2 className="text-green-500" size={18}/> 24/7 Portal Access</div>
        </motion.div>
        
      </div>
    </div>
  );
}
