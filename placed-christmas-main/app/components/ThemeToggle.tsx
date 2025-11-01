'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Check system preference
    if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('light');
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className="relative w-14 h-8 bg-white/20 backdrop-blur-md rounded-full border border-white/30 flex items-center px-1"
    >
      <motion.div
        className="w-6 h-6 rounded-full bg-gradient-to-r from-christmas-gold to-yellow-600 flex items-center justify-center"
        animate={{
          x: isDark ? 0 : 24,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {isDark ? (
          <Moon className="w-4 h-4 text-white" />
        ) : (
          <Sun className="w-4 h-4 text-white" />
        )}
      </motion.div>
    </motion.button>
  );
}
