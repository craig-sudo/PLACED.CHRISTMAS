'use client';

import { useEffect, useState } from 'react';

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const christmas = new Date(new Date().getFullYear(), 11, 25);
      const now = new Date();
      
      if (now > christmas) {
        christmas.setFullYear(christmas.getFullYear() + 1);
      }
      
      const difference = christmas.getTime() - now.getTime();
      
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    setTimeLeft(calculateTimeLeft());

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="grid grid-cols-4 gap-4 md:gap-8 max-w-2xl mx-auto">
      {[
        { label: 'Days', value: timeLeft.days },
        { label: 'Hours', value: timeLeft.hours },
        { label: 'Minutes', value: timeLeft.minutes },
        { label: 'Seconds', value: timeLeft.seconds },
      ].map((item, index) => (
        <div
          key={index}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-6 border border-white/20 shadow-xl"
        >
          <div className="text-3xl md:text-5xl font-bold text-christmas-gold glowing-text">
            {item.value.toString().padStart(2, '0')}
          </div>
          <div className="text-xs md:text-sm text-white/80 mt-2 uppercase tracking-wider">
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
}
