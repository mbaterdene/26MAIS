import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#1a1a1a] text-gray-300 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <span className="text-cardinal-red font-serif font-bold text-2xl">MAIS</span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              {t(
                'Mongol Aspiration International School — Developing globally competitive citizens.',
                'Монгол Тэмүүлэл Олон Улсын Сургууль — Дэлхийн иргэнийг хөгжүүлнэ.'
              )}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wide">{t('Quick Links', 'Холбоосууд')}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-white transition-colors">{t('About', 'Бидний тухай')}</Link></li>
              <li><Link to="/academics" className="hover:text-white transition-colors">{t('Academics', 'Сургалт')}</Link></li>
              <li><Link to="/admissions" className="hover:text-white transition-colors">{t('Admissions', 'Элсэлт')}</Link></li>
              <li><Link to="/news" className="hover:text-white transition-colors">{t('News', 'Мэдээ')}</Link></li>
            </ul>
          </div>

          {/* Student */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wide">{t('Students', 'Сурагчид')}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/student-life" className="hover:text-white transition-colors">{t('Student Life', 'Сурагчийн амьдрал')}</Link></li>
              <li><Link to="/student-support" className="hover:text-white transition-colors">{t('Student Support', 'Сурагчийн дэмжлэг')}</Link></li>
              <li><Link to="/events" className="hover:text-white transition-colors">{t('Events', 'Үйл ажиллагаа')}</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wide">{t('Contact', 'Холбоо барих')}</h4>
            <p className="text-sm text-gray-400">
              {t('Mongol Aspiration School', 'Монгол Тэмүүлэл Сургууль')}<br />
              {t('Ulaanbaatar, Mongolia', 'Улаанбаатар, Монгол')}
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} {t('Mongol Aspiration School. All rights reserved.', 'Монгол Тэмүүлэл Сургууль. Бүх эрх хуулиар хамгаалагдсан.')}
          </p>
          <Link to="/admin/login" className="text-xs text-gray-600 hover:text-white transition-colors">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
