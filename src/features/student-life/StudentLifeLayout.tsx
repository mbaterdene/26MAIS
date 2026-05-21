import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import navigationData from '../../content/student-life/studentLifeNavigation.json';

interface SidebarLink {
  label: { en: string; mn: string };
  href: string;
  id: string;
}

const links = [
  { id: 'overview', href: '/student-life' },
  { id: 'clubs', href: '/student-life/clubs' },
  { id: 'academic-clubs', href: '/student-life/academic-clubs' },
  { id: 'athletics', href: '/student-life/athletics' },
  { id: 'arts-music', href: '/student-life/arts-music' },
  { id: 'service-clubs', href: '/student-life/service-clubs' },
  { id: 'dofe', href: '/student-life/dofe' },
  { id: 'events', href: '/student-life/events' },
];

const sidebarLinks: SidebarLink[] = links.map((link, index) => ({
  ...link,
  label: {
    en: navigationData.navigation[index].en,
    mn: navigationData.navigation[index].mn,
  },
}));

interface StudentLifeLayoutProps {
  children: ReactNode;
}

export function StudentLifeLayout({ children }: StudentLifeLayoutProps) {
  const location = useLocation();
  const { isEnglish } = useLanguage();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const getText = (obj: { en: string; mn: string }) => isEnglish ? obj.en : obj.mn;

  const getActiveSection = () => {
    const path = location.pathname;
    if (path === '/student-life') return 'overview';
    return path.split('/').pop() || 'overview';
  };

  const activeSection = getActiveSection();

  return (
    <div className="flex bg-white">
      {/* Mobile Menu Button - hidden, button now in sidebar */}
      {!sidebarOpen && (
        <div className="md:hidden fixed top-28 left-4 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg bg-cardinal-red text-white hover:bg-digital-red transition-colors"
            aria-label="Toggle sidebar"
          >
            <Menu size={20} />
          </button>
        </div>
      )}

      {/* Overlay on mobile when sidebar is open */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 md:hidden z-10"
          />
        )}
      </AnimatePresence>

      {/* Left Sidebar */}
      <motion.aside
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="hidden md:flex md:w-56 bg-white border-r border-gray-200 md:sticky md:top-20 md:h-[calc(100vh-5rem)] md:overflow-y-auto md:flex-shrink-0"
      >
        <div className="p-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">
            Categories
          </h3>
          <nav className="space-y-2">
            {sidebarLinks.map((link) => {
              const isActive = activeSection === link.id || (link.id === 'overview' && activeSection === 'student-life');
              return (
                <motion.div key={link.id} whileHover={{ x: 4 }}>
                  <Link
                    to={link.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg font-semibold text-sm transition-all duration-200 ${
                      isActive
                        ? 'bg-cardinal-red text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="w-1 h-1 rounded-full bg-current"></span>
                    {getText(link.label)}
                  </Link>
                </motion.div>
              );
            })}
          </nav>
        </div>
      </motion.aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ opacity: 0, x: -280 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -280 }}
            transition={{ duration: 0.3 }}
            className="fixed md:hidden inset-0 w-56 bg-white overflow-y-auto z-20"
          >
            <div className="p-6">
              {/* Close Button */}
              <div className="mb-6">
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 rounded-lg bg-cardinal-red text-white hover:bg-digital-red transition-colors"
                  aria-label="Close sidebar"
                >
                  <X size={20} />
                </button>
              </div>

              <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4">
                Categories
              </h3>
              <nav className="space-y-2">
                {sidebarLinks.map((link) => {
                  const isActive = activeSection === link.id || (link.id === 'overview' && activeSection === 'student-life');
                  return (
                    <motion.div key={link.id} whileHover={{ x: 4 }}>
                      <Link
                        to={link.href}
                        onClick={() => setSidebarOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg font-semibold text-sm transition-all duration-200 ${
                          isActive
                            ? 'bg-cardinal-red text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <span className="w-1 h-1 rounded-full bg-current"></span>
                        {getText(link.label)}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="w-full"
      >
        {children}
      </motion.div>
    </div>
  );
}
