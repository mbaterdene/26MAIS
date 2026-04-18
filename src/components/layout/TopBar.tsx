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
      console.log('Search query:', searchQuery);
      setSearchQuery('');
      setSearchOpen(false);
    }
  };

  return (
    <div className="bg-[#1a1a1a] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-9 gap-1">
          {/* Left: Questions and Contact Us */}
          <div className="flex items-center gap-1">
            <Link
              to="/faq"
              className="flex items-center gap-1 text-xs font-medium text-gray-300 hover:text-white transition-colors px-2.5 py-1 rounded hover:bg-white/10"
            >
              Questions?
            </Link>
            <Link
              to="/contact"
              className="flex items-center gap-1 text-xs font-medium text-gray-300 hover:text-white transition-colors px-2.5 py-1 rounded hover:bg-white/10"
            >
              Contact Us
            </Link>
          </div>

          {/* Right: Search Bar */}
          <div>
            <AnimatePresence mode="wait">
              {!searchOpen ? (
                <motion.button
                  key="search-icon"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSearchOpen(true)}
                  className="p-1.5 text-gray-300 hover:text-white transition-colors rounded hover:bg-white/10"
                  aria-label="Open search"
                >
                  <Search size={16} />
                </motion.button>
              ) : (
                <motion.form
                  key="search-input"
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSearch}
                  className="flex items-center gap-1"
                >
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-gray-900 text-white text-xs px-2.5 py-1 rounded border border-gray-700 focus:outline-none focus:border-cardinal-red focus:ring-1 focus:ring-cardinal-red min-w-[120px] md:min-w-[200px]"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setSearchOpen(false);
                      setSearchQuery('');
                    }}
                    className="p-1.5 text-gray-300 hover:text-white transition-colors rounded hover:bg-white/10"
                    aria-label="Close search"
                  >
                    <X size={16} />
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
