'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift } from 'lucide-react';

const dailyTips = [
  '💡 LED vs Incandescent Guide!',
  '🔧 Pre-Season Prep Tips!',
  '⭐ Early Bird 15% Off!',
  '🎅 Free Consultation!',
  '❄️ Weather-Proof Tips!',
  '🔔 Maintenance Reminder!',
  '🎊 Bundle Deal Alert!',
  '✨ Design Inspiration!',
];

export default function AdventCalendar() {
  const [openedDoors, setOpenedDoors] = useState<Set<number>>(new Set());

  const toggleDoor = (day: number) => {
    const newOpened = new Set(openedDoors);
    if (newOpened.has(day)) {
      newOpened.delete(day);
    } else {
      newOpened.add(day);
    }
    setOpenedDoors(newOpened);
  };

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="grid grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-2 md:gap-4">
        {Array.from({ length: 25 }, (_, i) => i + 1).map((day) => {
          const isOpened = openedDoors.has(day);
          const tipIndex = (day - 1) % dailyTips.length;
          
          return (
            <motion.button
              key={day}
              onClick={() => toggleDoor(day)}
              className="relative aspect-square rounded-lg overflow-hidden cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-christmas-red to-christmas-green flex items-center justify-center text-white font-bold text-xl md:text-2xl border-2 border-christmas-gold shadow-lg"
                animate={{ rotateY: isOpened ? 180 : 0 }}
                transition={{ duration: 0.6 }}
                style={{ backfaceVisibility: 'hidden' }}
              >
                <div className="flex flex-col items-center">
                  <Gift className="w-6 h-6 md:w-8 md:h-8 mb-1" />
                  <span>{day}</span>
                </div>
              </motion.div>
              
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-christmas-gold to-yellow-600 flex items-center justify-center text-white text-xs md:text-sm font-semibold p-2 text-center border-2 border-christmas-gold shadow-lg"
                animate={{ rotateY: isOpened ? 0 : -180 }}
                transition={{ duration: 0.6 }}
                style={{ backfaceVisibility: 'hidden', transform: 'rotateY(-180deg)' }}
              >
                {dailyTips[tipIndex]}
              </motion.div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
