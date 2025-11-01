'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function ChristmasLights() {
  const [lights, setLights] = useState<Array<{ id: number; color: string; delay: number }>>([]);

  useEffect(() => {
    const colors = ['#dc2626', '#16a34a', '#fbbf24', '#3b82f6', '#a855f7'];
    const lightCount = 50;
    
    const newLights = Array.from({ length: lightCount }, (_, i) => ({
      id: i,
      color: colors[i % colors.length],
      delay: Math.random() * 2,
    }));
    
    setLights(newLights);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      <svg width="100%" height="40" className="absolute top-0">
        {/* Wire */}
        <path
          d="M 0,20 Q 50,10 100,20 T 200,20 T 300,20 T 400,20 T 500,20 T 600,20 T 700,20 T 800,20 T 900,20 T 1000,20 T 1100,20 T 1200,20 T 1300,20 T 1400,20 T 1500,20 T 1600,20 T 1700,20 T 1800,20 T 1900,20 T 2000,20"
          stroke="#1e293b"
          strokeWidth="2"
          fill="none"
        />
        
        {/* Lights */}
        {lights.map((light, index) => {
          const x = (index / lights.length) * 100;
          const y = 20 + Math.sin(index * 0.5) * 5;
          
          return (
            <motion.g key={light.id}>
              {/* Light bulb glow */}
              <motion.circle
                cx={`${x}%`}
                cy={y}
                r="8"
                fill={light.color}
                opacity={0.6}
                animate={{
                  opacity: [0.6, 1, 0.6],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: light.delay,
                }}
              />
              {/* Light bulb */}
              <circle
                cx={`${x}%`}
                cy={y}
                r="5"
                fill={light.color}
              />
              {/* Wire to light */}
              <line
                x1={`${x}%`}
                y1={20}
                x2={`${x}%`}
                y2={y - 5}
                stroke="#1e293b"
                strokeWidth="1"
              />
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}
