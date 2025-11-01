'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function StatsCounter() {
  const [counts, setCounts] = useState({
    gifts: 0,
    customers: 0,
    countries: 0,
    rating: 0,
  });

  const targets = {
    gifts: 10000,
    customers: 5000,
    countries: 50,
    rating: 4.9,
  };

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const interval = duration / steps;

    const timer = setInterval(() => {
      setCounts((prev) => ({
        gifts: Math.min(prev.gifts + targets.gifts / steps, targets.gifts),
        customers: Math.min(prev.customers + targets.customers / steps, targets.customers),
        countries: Math.min(prev.countries + targets.countries / steps, targets.countries),
        rating: Math.min(prev.rating + targets.rating / steps, targets.rating),
      }));
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const stats = [
    { label: 'Gifts Delivered', value: Math.floor(counts.gifts).toLocaleString(), suffix: '+', icon: '🎁' },
    { label: 'Happy Customers', value: Math.floor(counts.customers).toLocaleString(), suffix: '+', icon: '😊' },
    { label: 'Countries Served', value: Math.floor(counts.countries), suffix: '+', icon: '🌍' },
    { label: 'Average Rating', value: counts.rating.toFixed(1), suffix: '⭐', icon: '⭐' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="text-5xl mb-4">{stat.icon}</div>
          <div className="text-3xl md:text-5xl font-bold text-christmas-gold mb-2">
            {stat.value}{stat.suffix}
          </div>
          <div className="text-white/80 text-sm md:text-base">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );
}
