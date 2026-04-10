import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

export function NotFoundPage() {
  const { isEnglish } = useLanguage();

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl"
      >
        {/* Large 404 */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <span className="text-9xl md:text-[160px] font-bold text-cardinal-red">
            404
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl md:text-5xl font-bold text-black mb-4"
        >
          {isEnglish ? 'Page Not Found' : 'Хуудас олдсонгүй'}
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-xl text-gray-600 mb-8"
        >
          {isEnglish
            ? 'The page you are looking for doesn\'t exist or has been moved.'
            : 'Таны хайж буй хуудас олдсонгүй эсвэл шилжүүлэгдсэн байна.'}
        </motion.p>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="w-24 h-1 bg-cardinal-red mx-auto mb-8"
        />

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/"
            className="px-8 py-3 bg-cardinal-red hover:bg-digital-red text-white font-bold rounded-lg transition-all duration-300 hover:shadow-lg"
          >
            {isEnglish ? 'Return Home' : 'Эхлэл рүү буцах'}
          </Link>
          <button
            onClick={() => window.history.back()}
            className="px-8 py-3 border-2 border-cardinal-red text-cardinal-red hover:bg-cardinal-red/10 font-bold rounded-lg transition-all duration-300"
          >
            {isEnglish ? 'Go Back' : 'Буцах'}
          </button>
        </motion.div>

        {/* Additional help text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-sm text-gray-500 mt-12"
        >
          {isEnglish
            ? 'Try navigating to one of our main sections using the navigation menu.'
            : 'Навигацийн цэсийг ашиглан бидний үндсэн хэсгүүдийн аль нэгэнд ороорой.'}
        </motion.p>
      </motion.div>
    </div>
  );
}
