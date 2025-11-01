'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, Music, Pause, Play } from 'lucide-react';

export default function FloatingButtons() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleMusic = () => {
    setMusicPlaying(!musicPlaying);
    // Add audio logic here if you have music files
  };

  return (
    <div className="fixed bottom-8 right-8 z-40 flex flex-col gap-4">
      {/* Music Player */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleMusic}
        className="w-14 h-14 rounded-full bg-gradient-to-r from-christmas-red to-christmas-green shadow-2xl flex items-center justify-center text-white"
      >
        {musicPlaying ? (
          <Pause className="w-6 h-6" />
        ) : (
          <Play className="w-6 h-6 ml-1" />
        )}
      </motion.button>

      {/* Back to Top */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="w-14 h-14 rounded-full bg-christmas-gold shadow-2xl flex items-center justify-center text-white"
          >
            <ChevronUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Music playing indicator */}
      {musicPlaying && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute -top-16 right-0 bg-slate-900/90 backdrop-blur-md rounded-lg px-4 py-2 text-white text-sm whitespace-nowrap"
        >
          <div className="flex items-center gap-2">
            <Music className="w-4 h-4 text-christmas-gold" />
            <span>🎄 Jingle Bells</span>
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-christmas-gold rounded-full"
                  animate={{ height: [4, 12, 4] }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: i * 0.2,
                  }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
