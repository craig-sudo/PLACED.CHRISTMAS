import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const notifications = [
  { name: 'Sarah from Quispamsis', item: 'Christmas Light Installation', time: '2 min ago' },
  { name: 'Mike from Saint John', item: 'Gutter Cleaning Service', time: '5 min ago' },
  { name: 'Emma from Rothesay', item: 'Full Holiday Package', time: '8 min ago' },
  { name: 'Alex from Hampton', item: 'Drone Roof Inspection', time: '12 min ago' },
  { name: 'Lisa from Grand Bay', item: 'Custom Light Display', time: '15 min ago' },
];

const LiveNotifications: React.FC = () => {
  const [currentNotification, setCurrentNotification] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const showNotification = () => {
      setIsVisible(true);
      
      confetti({
        particleCount: 20,
        spread: 40,
        origin: { y: 0.9, x: 0.1 },
        colors: ['#D4AF37', '#1E3A8A', '#F1F5F9'],
        angle: 120,
        scalar: 0.8,
      });

      setTimeout(() => setIsVisible(false), 4000);
    };

    const interval = setInterval(() => {
      setCurrentNotification((prev) => (prev + 1) % notifications.length);
      showNotification();
    }, 8000);

    const initialTimeout = setTimeout(showNotification, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(initialTimeout);
    };
  }, []);

  const notification = notifications[currentNotification];

  return (
    <div className="fixed bottom-6 left-6 z-50 pointer-events-none">
        <AnimatePresence>
        {isVisible && (
            <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ ease: 'easeOut', duration: 0.4 }}
            className="w-full max-w-sm"
            >
            <div className="bg-white/95 backdrop-blur-lg rounded-xl p-4 shadow-2xl border border-brand-secondary/30 pointer-events-auto">
                <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-brand-secondary to-yellow-400 rounded-full flex items-center justify-center text-white text-xl flex-shrink-0">
                    ✨
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-brand-primary">
                    {notification.name}
                    </p>
                    <p className="text-sm text-gray-600 truncate">
                    Just requested a quote for <span className="font-medium">{notification.item}</span>
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-xs text-gray-500">
                           Verified Booking Request &bull; {notification.time}
                        </span>
                    </div>
                </div>
                </div>
            </div>
            </motion.div>
        )}
        </AnimatePresence>
    </div>
  );
}

export default LiveNotifications;