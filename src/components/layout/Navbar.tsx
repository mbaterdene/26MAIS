import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ExternalLink, Globe, Search } from 'lucide-react';
import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../context/LanguageContext';

// ─── Data ─────────────────────────────────────────────────────────────────────

interface NavItem {
  label: string;
  href?: string;
  children?: { label: string; href: string; desc?: string }[];
}

interface UtilityLink {
  label: string;
  href: string;
  external: boolean;
}

// ─── Animation Variants ───────────────────────────────────────────────────────

const dropdownVariants = {
  hidden: { opacity: 0, y: -8, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0,
    y: -6,
    scale: 0.97,
    transition: { duration: 0.15, ease: 'easeIn' },
  },
};

const drawerVariants = {
  hidden: { x: '100%' },
  visible: { x: 0, transition: { type: 'spring', stiffness: 280, damping: 30 } },
  exit: { x: '100%', transition: { duration: 0.22, ease: 'easeIn' } },
};

const accordionVariants = {
  hidden: { height: 0, opacity: 0 },
  visible: { height: 'auto', opacity: 1, transition: { duration: 0.28, ease: 'easeOut' } },
  exit: { height: 0, opacity: 0, transition: { duration: 0.2, ease: 'easeIn' } },
};

// ─── Desktop Dropdown Item ─────────────────────────────────────────────────────

function DesktopNavItem({ item }: { item: NavItem }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const location = useLocation();

  const isActive = item.href ? location.pathname === item.href : false;

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 120);
  };

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  if (!item.children) {
    return (
      <Link
        to={item.href ?? '#'}
        className={`text-sm font-semibold transition-colors duration-200 hover:text-cardinal-red ${isActive ? 'text-cardinal-red' : 'text-black'
          }`}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        onClick={() => setOpen(!open)}
        aria-haspopup="true"
        aria-expanded={open}
        className={`flex items-center gap-1 text-sm font-semibold transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cardinal-red focus-visible:ring-offset-2 rounded ${isActive || open ? 'text-cardinal-red' : 'text-black hover:text-cardinal-red'
          }`}
      >
        {item.label}
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={14} strokeWidth={2.5} />
        </motion.div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-64 bg-cardinal-red shadow-2xl border border-cardinal-red overflow-hidden z-50"
            role="menu"
          >
            {item.children.map((child) => (
              <Link
                key={child.label}
                to={child.href}
                role="menuitem"
                onClick={() => setOpen(false)}
                className="group flex flex-col px-4 py-3 hover:bg-digital-red transition-colors duration-150 focus:outline-none focus:bg-digital-red"
              >
                <span className="text-sm font-semibold text-white group-hover:text-white transition-colors">
                  {child.label}
                </span>
                {child.desc && (
                  <span className="text-xs text-gray-100 mt-0.5 leading-snug">{child.desc}</span>
                )}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Mobile Accordion Item ────────────────────────────────────────────────────

function MobileAccordionItem({
  item,
  onClose,
}: {
  item: NavItem;
  onClose: () => void;
}) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isActive = item.href ? location.pathname === item.href : false;

  if (!item.children) {
    return (
      <Link
        to={item.href ?? '#'}
        onClick={onClose}
        className={`block px-4 py-3.5 text-base font-semibold border-b border-gray-100 transition-colors ${isActive ? 'text-cardinal-red' : 'text-black hover:text-cardinal-red'
          }`}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div className="border-b border-gray-100">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3.5 text-base font-semibold text-black hover:text-cardinal-red transition-colors focus:outline-none"
        aria-expanded={open}
      >
        <span className={isActive ? 'text-cardinal-red' : ''}>{item.label}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={16} strokeWidth={2.5} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="accordion"
            variants={accordionVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="overflow-hidden"
          >
            <div className="bg-gray-50 pb-2">
              {item.children.map((child) => (
                <Link
                  key={child.label}
                  to={child.href}
                  onClick={onClose}
                  className="flex flex-col px-6 py-2.5 hover:bg-gray-100 transition-colors"
                >
                  <span className="text-sm font-semibold text-black hover:text-cardinal-red transition-colors">
                    {child.label}
                  </span>
                  {child.desc && (
                    <span className="text-xs text-gray-500 mt-0.5">{child.desc}</span>
                  )}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Utility Search ───────────────────────────────────────────────────────

function UtilitySearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log('Search query:', searchQuery);
      setSearchQuery('');
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center border border-cardinal-red rounded overflow-hidden">
      <input
        ref={searchInputRef}
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="bg-transparent text-gray-300 text-xs px-2.5 py-1 focus:outline-none focus:text-white w-[140px] placeholder-gray-500"
      />
      <button
        type="submit"
        className="bg-cardinal-red text-white flex items-center justify-center hover:bg-digital-red transition-colors border-l border-cardinal-red h-6 w-6"
        aria-label="Search"
      >
        <Search size={14} />
      </button>
    </form>
  );
}

// ─── Main Navbar ──────────────────────────────────────────────────────────────

function LanguageToggle() {
  const { lang, setLang } = useLanguage();
  return (
    <button
      onClick={() => setLang(lang === 'mn' ? 'en' : 'mn')}
      className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border border-gray-200 text-gray-600 hover:border-cardinal-red hover:text-cardinal-red transition-colors"
      title="Toggle language"
    >
      <Globe size={14} />
      {lang === 'mn' ? 'EN' : 'MN'}
    </button>
  );
}

export function Navbar() {
  const { lang, isEnglish } = useLanguage();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  // Create bilingual nav items
  const navItems = useMemo<NavItem[]>(() => [
    {
      label: isEnglish ? 'About' : 'Тухай',
      children: [
        { label: isEnglish ? 'About Us' : 'Бидний тухай', href: '/about', desc: isEnglish ? 'Our mission, history, and leadership.' : 'Бидний үндсэн зорилго, түүх, удирдлага.' },
        { label: isEnglish ? 'Community News' : 'Сообщество Мэдээ', href: '/news', desc: isEnglish ? 'Latest stories from our global community.' : 'Манай дэлхийн сообщество-с шинэ нэвтрүүлэг.' },
        { label: isEnglish ? 'Admission' : 'Элсэлт', href: '/admissions', desc: isEnglish ? 'Everything you need to know about applying.' : 'Элсэх үйл явцын тухай бүх мэдлэг.' },
      ],
    },
    {
      label: isEnglish ? 'Academics' : 'Боловсрол',
      children: [
        { label: isEnglish ? 'All Courses' : 'Бүх курс', href: '/academics', desc: isEnglish ? 'Browse all available courses.' : 'Бүх боломжит сургалтыг үзэх.' },
        { label: isEnglish ? 'PDQ' : 'PDQ', href: '/courses/pdq', desc: isEnglish ? 'Program Development and Quality.' : 'Хөтөлбөрийн хөгжил ба чанар.' },
      ],
    },
    {
      label: isEnglish ? 'Staff' : 'Ажилчид',
      children: [
        { label: isEnglish ? 'Staff Directory' : 'Баг-ын жагсаалт', href: '/teachers', desc: isEnglish ? 'Meet our faculty and staff.' : 'Манай факультет, багштай танилцаарай.' },
      ],
    },
    {
      label: isEnglish ? 'Student Life' : 'Сурагчийн амьдрал',
      children: [
        { label: isEnglish ? 'Overview' : 'Ерөнхий мэдээлэл', href: '/student-life', desc: isEnglish ? 'Student life overview and activities.' : 'Сурагчдын амьдралын ерөнхий мэдээлэл.' },
        { label: isEnglish ? 'All Clubs' : 'Бүх клубууд', href: '/student-life/clubs', desc: isEnglish ? 'Explore all student clubs.' : 'Бүх сурагчдын клубыг судла.' },
        { label: isEnglish ? 'DOFE' : 'DOFE', href: '/student-life/dofe', desc: isEnglish ? 'Duke of Edinburgh\'s Award.' : 'Эдинбургийн герцгийн шагнал.' },
        { label: isEnglish ? 'Events' : 'Үйл явдал', href: '/student-life/events', desc: isEnglish ? 'Student events and announcements.' : 'Сурагчдын үйл явдал.' },
        { label: isEnglish ? 'News Archive' : 'Мэдээний архив', href: '/student-life/news-archive', desc: isEnglish ? 'Archive of student news.' : 'Сурагчдын мэдээний архив.' },
      ],
    },
    {
      label: isEnglish ? 'Student Support' : 'Сурагчдад туслах',
      children: [
        { label: isEnglish ? 'School Therapist' : 'Сургуулийн психолог', href: '/student-support', desc: isEnglish ? 'Mental health and wellness support.' : 'Сэтгэцийн эрүүл мэнд, сайн сайхны туслалцаа.' },
      ],
    },
  ], [isEnglish]);

  // Create bilingual utility links
  const utilityLinks = useMemo<UtilityLink[]>(() => [
    { label: isEnglish ? 'Questions?' : 'Асуулт?', href: '/faq', external: false },
    { label: isEnglish ? 'Contact Us' : 'Холбоо барих', href: '/contact', external: false },
  ], [isEnglish]);

  // Shadow on scroll
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  // Close drawer on ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') closeDrawer(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [closeDrawer]);

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${scrolled ? 'shadow-lg' : 'shadow-sm'
        }`}
    >
      {/* ── Tier 1: Utility Bar ──────────────────────────────────────── */}
      <div className="bg-[#1a1a1a] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-end h-9 gap-3">
            {utilityLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="flex items-center gap-1 text-xs font-medium text-gray-300 hover:text-white transition-colors px-2.5 py-1 rounded hover:bg-white/10"
              >
                {link.label}
                {link.external && <ExternalLink size={10} className="opacity-60" />}
              </a>
            ))}

            {/* Search Bar */}
            <UtilitySearch />
          </div>
        </div>
      </div>

      {/* ── Tier 2: Primary Navigation ───────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 flex-shrink-0 group">
            <span className="text-cardinal-red font-serif font-bold text-2xl tracking-tight transition-opacity group-hover:opacity-80">
              MAIS
            </span>
            <span className="text-black font-sans font-semibold text-sm border-l-2 border-gray-300 pl-3 leading-tight hidden sm:block">
              {lang === 'mn' ? (
                <>Монгол<br />Тэмүүлэл</>
              ) : (
                <>Mongol<br />Aspiration</>
              )}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7" aria-label="Primary navigation">
            {navItems.map((item) => (
              <DesktopNavItem key={item.label} item={item} />
            ))}
          </nav>

          {/* Desktop CTA + Lang Toggle */}
          <div className="hidden lg:flex items-center gap-3">
            <LanguageToggle />
            <Link
              to="/admissions"
              className="bg-cardinal-red hover:bg-digital-red text-white text-sm px-5 py-2 rounded-full font-semibold transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-px focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cardinal-red"
            >
              Apply Now
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg text-black hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-cardinal-red"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={drawerOpen}
          >
            <Menu size={22} />
          </button>
        </div>
      </div>

      {/* ── Mobile Drawer ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={closeDrawer}
              aria-hidden="true"
            />

            {/* Drawer panel */}
            <motion.div
              key="drawer"
              variants={drawerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-0 right-0 h-full w-[min(360px,90vw)] bg-white z-50 lg:hidden flex flex-col shadow-2xl"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-4 h-16 border-b border-gray-100 flex-shrink-0">
                <Link to="/" onClick={closeDrawer} className="flex items-center gap-2">
                  <span className="text-cardinal-red font-serif font-bold text-xl">MAIS</span>
                  <span className="text-black font-sans text-xs font-semibold leading-tight">
                    {lang === 'mn' ? (
                      <>Монгол<br />Тэмүүлэл</>
                    ) : (
                      <>Mongol<br />Aspiration</>
                    )}
                  </span>
                </Link>
                <button
                  onClick={closeDrawer}
                  aria-label="Close navigation menu"
                  className="w-9 h-9 flex items-center justify-center rounded-lg text-black hover:bg-gray-100 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Scrollable body */}
              <div className="flex-1 overflow-y-auto overscroll-contain">
                {/* Primary nav items */}
                <nav aria-label="Mobile primary navigation">
                  {navItems.map((item) => (
                    <MobileAccordionItem key={item.label} item={item} onClose={closeDrawer} />
                  ))}
                </nav>

                {/* Divider */}
                <div className="mx-4 my-4 border-t border-gray-200" />

                {/* Utility links */}
                <div className="px-4 pb-2">
                  <p className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-2 px-0">Quick Links</p>
                  {utilityLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={closeDrawer}
                      className="flex items-center gap-1.5 py-2 text-sm text-gray-600 hover:text-cardinal-red transition-colors"
                    >
                      {link.label}
                      {link.external && <ExternalLink size={11} className="opacity-50" />}
                    </a>
                  ))}
                </div>
              </div>

              {/* Drawer footer CTA */}
              {/* Language toggle in drawer */}
              <div className="px-4 pb-4">
                <LanguageToggle />
              </div>
              <div className="p-4 border-t border-gray-100 flex-shrink-0">
                <Link
                  to="/admissions"
                  onClick={closeDrawer}
                  className="block w-full bg-cardinal-red hover:bg-digital-red text-white text-center py-3 rounded-xl font-bold text-sm transition-colors shadow-md"
                >
                  Apply Now →
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
