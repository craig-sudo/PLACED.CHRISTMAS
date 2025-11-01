'use client';

// FIX: Import React to use React.FormEvent type.
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setEmail('');
    }, 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-gradient-to-r from-christmas-red to-christmas-green rounded-3xl p-8 md:p-12 text-center shadow-2xl"
    >
      <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
        🎄 Stay Connected with PLACED! 🎄
      </h2>
      <p className="text-white/90 text-lg mb-8">
        Get early booking discounts, maintenance tips, and seasonal updates for the Greater Saint John area
      </p>
      
      {!submitted ? (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email..."
              required
              className="flex-1 px-6 py-4 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-4 bg-white text-christmas-red rounded-full font-bold flex items-center gap-2 hover:shadow-xl transition-shadow"
            >
              <Send className="w-5 h-5" />
              <span className="hidden md:inline">Subscribe</span>
            </motion.button>
          </div>
        </form>
      ) : (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-white text-xl font-bold"
        >
          🎉 Thanks for joining! Watch for early bird specials! 🎉
        </motion.div>
      )}
    </motion.div>
  );
}