'use client';

import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

const locations = [
  { city: 'North Pole', emoji: '🎅', progress: 0 },
  { city: 'Tokyo', emoji: '🗼', progress: 15 },
  { city: 'Sydney', emoji: '🦘', progress: 30 },
  { city: 'Mumbai', emoji: '🕌', progress: 45 },
  { city: 'London', emoji: '🏰', progress: 60 },
  { city: 'New York', emoji: '🗽', progress: 75 },
  { city: 'Los Angeles', emoji: '🌴', progress: 90 },
];

export default function SantaTracker() {
  const currentProgress = 45; // This could be dynamic based on time

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
      <div className="text-center mb-8">
        <motion.div
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="text-6xl mb-4"
        >
          🎅🛷
        </motion.div>
        <h3 className="text-3xl font-bold text-white mb-2">Track Santa!</h3>
        <p className="text-white/70">Follow Santa's journey around the world</p>
      </div>

      {/* Progress Bar */}
      <div className="relative mb-8">
        <div className="h-2 bg-white/20 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-christmas-red via-christmas-gold to-christmas-green"
            initial={{ width: 0 }}
            animate={{ width: `${currentProgress}%` }}
            transition={{ duration: 1 }}
          />
        </div>
        
        {/* Santa Icon on Progress */}
        <motion.div
          className="absolute -top-4 text-4xl"
          initial={{ left: 0 }}
          animate={{ left: `${currentProgress}%` }}
          transition={{ duration: 1 }}
          style={{ transform: 'translateX(-50%)' }}
        >
          🎅
        </motion.div>
      </div>

      {/* Locations */}
      <div className="space-y-4">
        {locations.map((location, index) => {
          const isVisited = currentProgress >= location.progress;
          const isCurrent = currentProgress >= location.progress && 
                          (index === locations.length - 1 || currentProgress < locations[index + 1].progress);
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                isCurrent
                  ? 'bg-christmas-gold/20 border-2 border-christmas-gold'
                  : isVisited
                  ? 'bg-christmas-green/20 border border-christmas-green/30'
                  : 'bg-white/5 border border-white/10'
              }`}
            >
              <div className="text-3xl">{location.emoji}</div>
              <div className="flex-1">
                <div className="font-bold text-white">{location.city}</div>
                {isCurrent && (
                  <div className="text-christmas-gold text-sm">
                    Current Location 🎯
                  </div>
                )}
                {isVisited && !isCurrent && (
                  <div className="text-christmas-green text-sm">
                    Delivered! ✓
                  </div>
                )}
              </div>
              <MapPin className={`w-5 h-5 ${
                isVisited ? 'text-christmas-green' : 'text-white/30'
              }`} />
            </motion.div>
          );
        })}
      </div>

      <div className="mt-8 text-center">
        <p className="text-white/60 text-sm">
          🎁 <span className="text-christmas-gold font-bold">2,547</span> gifts delivered today!
        </p>
      </div>
    </div>
  );
}
