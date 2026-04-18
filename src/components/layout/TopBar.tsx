import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function TopBar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) {
      searchInputRef.current?.focus();
    }
  }, [searchOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // For now, just logging. Backend integration can be added later
      console.log('Search query:', searchQuery);
      setSearchQuery('');
      setSearchOpen(false);
    }
  };

  return (
    <div className="bg-black text-white py-3 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        
        {/* Left: Questions (FAQ) */}
        <Link
          to="/faq"
          className="font-bold text-xs tracking-widest uppercase whitespace-nowrap hover:text-cardinal-red transition-colors"
        >
          Questions?
        </Link>

        {/* Center: Contact Us */}
        <Link
          to="/contact"
          className="font-bold text-xs tracking-widest uppercase whitespace-nowrap hover:text-cardinal-red transition-colors"
        >
          Contact Us
        </Link>

        {/* Right: Search Bar */}
        <div className="ml-auto">
          <AnimatePresence mode="wait">
            {!searchOpen ? (
              <motion.button
                key="search-icon"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSearchOpen(true)}
                className="p-2 hover:bg-gray-900 rounded transition-colors"
                aria-label="Open search"
              >
                <Search size={18} />
              </motion.button>
            ) : (
              <motion.form
                key="search-input"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSearch}
                className="flex items-center gap-2"
              >
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-gray-900 text-white px-3 py-2 text-sm rounded border border-gray-700 focus:outline-none focus:border-cardinal-red focus:ring-1 focus:ring-cardinal-red min-w-[150px] md:min-w-[250px]"
                />
                <button
                  type="button"
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchQuery('');
                  }}
                  className="p-2 hover:bg-gray-900 rounded transition-colors text-gray-400 hover:text-white"
                  aria-label="Close search"
                >
                  <X size={18} />
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile responsive note: On very small screens, items stack with search on its own row */}
      <style>{`
        @media (max-width: 640px) {
          .topbar-mobile {
            flex-wrap: wrap;
          }
        }
      `}</style>
    </div>
  );
}
