'use client';

import { motion } from 'framer-motion';
import { Sparkles, Zap, Heart, Gift } from 'lucide-react';

const features = [
  {
    icon: Sparkles,
    title: 'Magical Experiences',
    description: 'Create unforgettable holiday moments with our curated collection',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Get your gifts delivered faster than Santa\'s sleigh',
  },
  {
    icon: Heart,
    title: 'Made with Love',
    description: 'Each item is carefully selected to spread Christmas joy',
  },
  {
    icon: Gift,
    title: 'Perfect Wrapping',
    description: 'Beautiful gift wrapping included with every purchase',
  },
];

export default function Features() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
      {features.map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-block p-4 bg-gradient-to-br from-christmas-gold to-yellow-600 rounded-full mb-4">
            <feature.icon className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-bold mb-2 text-white">{feature.title}</h3>
          <p className="text-white/80">{feature.description}</p>
        </motion.div>
      ))}
    </div>
  );
}
