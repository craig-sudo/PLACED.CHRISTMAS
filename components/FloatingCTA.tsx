import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingCTA: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ ease: 'easeInOut', duration: 0.3 }}
          className="fixed bottom-6 right-6 z-40"
        >
          <a
            href="#quote-calculator"
            className="bg-brand-secondary text-brand-primary font-bold py-4 px-6 rounded-full shadow-2xl hover:bg-yellow-400 transition-transform duration-300 hover:scale-110 transform flex items-center gap-2"
          >
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <span>Get Instant Quote</span>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FloatingCTA;