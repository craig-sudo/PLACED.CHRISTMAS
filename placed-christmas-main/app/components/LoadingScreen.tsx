'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Gift } from 'lucide-react';

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] bg-gradient-to-br from-slate-900 via-red-950 to-green-950 flex items-center justify-center"
        >
          <div className="text-center">
            <motion.div
              animate={{
                rotate: 360,
                scale: [1, 1.2, 1],
              }}
              transition={{
                rotate: { duration: 2, repeat: Infinity, ease: 'linear' },
                scale: { duration: 1, repeat: Infinity },
              }}
              className="mb-8"
            >
              <Gift className="w-20 h-20 text-christmas-gold mx-auto" />
            </motion.div>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Preparing the Magic...
            </h2>

            <div className="w-64 h-2 bg-white/20 rounded-full overflow-hidden mb-4">
              <motion.div
                className="h-full bg-gradient-to-r from-christmas-red via-christmas-gold to-christmas-green"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
              />
            </div>

            <p className="text-white/60 text-lg">{progress}%</p>

            <div className="mt-8 flex justify-center gap-2">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3 bg-christmas-gold rounded-full"
                  animate={{ y: [0, -10, 0] }}
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
    </AnimatePresence>
  );
}
