import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface AlumniPosterModalProps {
  open: boolean;
  onClose: () => void;
  posterSrc: string;
  alt: string;
}

const AlumniPosterModal: React.FC<AlumniPosterModalProps> = ({
  open,
  onClose,
  posterSrc,
  alt
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Reset image loaded state when modal opens
  useEffect(() => {
    if (open) {
      setImageLoaded(false);
      // Prevent scrolling on background when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!mounted) return null;

  const modalContent = (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            key="modal-content"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{
              type: "spring",
              damping: 30,
              stiffness: 400,
              duration: 0.3
            }}
            className="relative z-10 flex flex-col items-center justify-center w-[95vw] sm:w-[90vw] md:w-[85vw] lg:w-[80vw] max-w-[1000px] h-[85vh] md:h-[80vh] max-h-[90vh] p-0 m-0 outline-none"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 text-white bg-black/70 hover:bg-black/90 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white border-0"
              aria-label="Close modal"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {/* Loading skeleton for image */}
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100/90 rounded-lg backdrop-blur-md">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="text-gray-500"
                >
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
                  </svg>
                </motion.div>
              </div>
            )}

            {/* Enlarged poster image */}
            <img
              src={posterSrc}
              alt={alt}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageLoaded(true)}
              className={`w-auto h-auto max-w-full max-h-full object-contain rounded-lg shadow-2xl transition-opacity duration-300 ${imageLoaded ? 'opacity-100 block' : 'opacity-0 hidden'}`}
              loading="lazy"
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
};

export default AlumniPosterModal;
