'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const notifications = [
  { name: 'Sarah from Quispamsis', item: 'Christmas Light Installation', time: '2 min ago' },
  { name: 'Mike from Saint John', item: 'Gutter Cleaning Service', time: '5 min ago' },
  { name: 'Emma from Rothesay', item: 'Full Holiday Package', time: '8 min ago' },
  { name: 'Alex from Hampton', item: 'Exterior Inspection', time: '12 min ago' },
  { name: 'Lisa from Grand Bay', item: 'Custom Light Display', time: '15 min ago' },
];

export default function LiveNotifications() {
  const [currentNotification, setCurrentNotification] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const showNotification = () => {
      setIsVisible(true);
      setTimeout(() => setIsVisible(false), 4000);
      
      // Trigger mini confetti
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.8, x: 0.1 },
        colors: ['#dc2626', '#16a34a', '#fbbf24'],
      });
    };

    const interval = setInterval(() => {
      setCurrentNotification((prev) => (prev + 1) % notifications.length);
      showNotification();
    }, 8000);

    // Show first one after 3 seconds
    setTimeout(showNotification, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          className="fixed bottom-24 left-8 z-40 max-w-sm"
        >
          <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg rounded-2xl p-4 shadow-2xl border border-christmas-gold/30">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-christmas-red to-christmas-green rounded-full flex items-center justify-center text-white text-xl flex-shrink-0">
                🎁
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {notifications[currentNotification].time}
                  </span>
                </div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  <span className="text-christmas-red">
                    {notifications[currentNotification].name}
                  </span>{' '}
                  just booked
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
                  {notifications[currentNotification].item}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
