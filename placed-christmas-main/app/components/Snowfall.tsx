'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Snowfall() {
  const [snowflakes, setSnowflakes] = useState<Array<{ id: number; left: string; duration: number; delay: number }>>([]);

  useEffect(() => {
    const flakes = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      duration: 5 + Math.random() * 10,
      delay: Math.random() * 5,
    }));
    setSnowflakes(flakes);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {snowflakes.map((flake) => (
        <motion.div
          key={flake.id}
          className="absolute text-white text-xl opacity-80"
          style={{ left: flake.left, top: '-20px' }}
          animate={{
            y: ['0vh', '100vh'],
            x: [0, Math.random() * 100 - 50],
            rotate: [0, 360],
            opacity: [0, 1, 0.8, 0],
          }}
          transition={{
            duration: flake.duration,
            delay: flake.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          ❄
        </motion.div>
      ))}
    </div>
  );
}
