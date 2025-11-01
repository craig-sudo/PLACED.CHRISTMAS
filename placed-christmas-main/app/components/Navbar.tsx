'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Gift, User } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-900/95 backdrop-blur-lg shadow-2xl'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-2 cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            <Gift className="w-8 h-8 text-christmas-gold" />
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-bold text-white">
                PLACED
              </span>
              <span className="text-xs text-christmas-gold hidden md:block">
                Your Christmas, Our Hands
              </span>
            </div>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {['Services', 'Gallery', 'Process', 'Handbook', 'Contact'].map((item) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-white/80 hover:text-white font-medium transition-colors relative group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {item}
                {item === 'Handbook' && (
                  <span className="absolute -top-2 -right-2 text-xs bg-christmas-red text-white rounded-full px-2 py-1 group-hover:scale-110 transition-transform">
                    NEW
                  </span>
                )}
              </motion.a>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <ThemeToggle />

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="hidden md:block text-white"
            >
              <User className="w-6 h-6" />
            </motion.button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-900/98 backdrop-blur-lg border-t border-white/10"
          >
            <div className="px-4 py-6 space-y-4">
              {['Services', 'Gallery', 'Process', 'Handbook', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block text-white/80 hover:text-white font-medium py-2 flex items-center justify-between"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>{item}</span>
                  {item === 'Handbook' && (
                    <span className="text-xs bg-christmas-red text-white rounded-full px-2 py-1">
                      NEW
                    </span>
                  )}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
