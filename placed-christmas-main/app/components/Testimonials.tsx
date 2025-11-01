'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { useState } from 'react';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Happy Customer',
    image: '👩',
    rating: 5,
    text: 'Absolutely magical experience! The gifts arrived perfectly wrapped and my family loved everything. Will definitely order again!',
  },
  {
    name: 'Michael Chen',
    role: 'Corporate Client',
    image: '👨',
    rating: 5,
    text: 'Used them for our company Christmas gifts. Professional service, amazing quality, and our employees were thrilled!',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Gift Enthusiast',
    image: '👱‍♀️',
    rating: 5,
    text: 'The advent calendar was a hit with my kids! Each day brought so much joy. Thank you for making our Christmas special!',
  },
  {
    name: 'David Thompson',
    role: 'First-time Buyer',
    image: '🧔',
    rating: 5,
    text: 'Fast shipping, excellent customer service, and the products exceeded my expectations. Highly recommended!',
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl"
        >
          <Quote className="w-12 h-12 text-christmas-gold mb-6" />
          
          <p className="text-white text-lg md:text-xl mb-8 leading-relaxed">
            "{testimonials[currentIndex].text}"
          </p>

          <div className="flex items-center gap-4 mb-4">
            <div className="text-5xl">{testimonials[currentIndex].image}</div>
            <div>
              <h4 className="text-white font-bold text-xl">
                {testimonials[currentIndex].name}
              </h4>
              <p className="text-white/70">{testimonials[currentIndex].role}</p>
            </div>
          </div>

          <div className="flex gap-1">
            {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-christmas-gold text-christmas-gold" />
            ))}
          </div>
        </motion.div>

        {/* Navigation Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevTestimonial}
            className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            ←
          </motion.button>
          
          <div className="flex gap-2 items-center">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-christmas-gold w-8'
                    : 'bg-white/30'
                }`}
              />
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextTestimonial}
            className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            →
          </motion.button>
        </div>
      </div>
    </div>
  );
}
