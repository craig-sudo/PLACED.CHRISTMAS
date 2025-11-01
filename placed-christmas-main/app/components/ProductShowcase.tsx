'use client';

import { motion } from 'framer-motion';
import { Gift, Sparkles, Heart, Star } from 'lucide-react';

const services = [
  {
    name: 'Christmas Light Installation',
    description: 'Full exterior lighting design & installation',
    price: 'Starting at $299',
    icon: Gift,
    color: 'from-red-500 to-red-700',
    features: ['Professional Design', 'Quality LED Lights', 'Safe Installation']
  },
  {
    name: 'Holiday Maintenance',
    description: 'Keep your lights shining bright all season',
    price: 'Starting at $99',
    icon: Sparkles,
    color: 'from-blue-500 to-blue-700',
    features: ['Bulb Replacement', 'Wire Repairs', '24/7 Support']
  },
  {
    name: 'Takedown & Storage',
    description: 'Careful removal and organized storage',
    price: 'Starting at $199',
    icon: Heart,
    color: 'from-green-500 to-green-700',
    features: ['Safe Removal', 'Organized Storage', 'Spring Setup Ready']
  },
  {
    name: 'Gutter Cleaning',
    description: 'Pre-installation gutter cleaning service',
    price: 'Starting at $149',
    icon: Star,
    color: 'from-yellow-500 to-yellow-700',
    features: ['Debris Removal', 'Downspout Check', 'Safety First']
  },
  {
    name: 'Exterior Inspection',
    description: 'Complete home exterior safety check',
    price: 'Starting at $79',
    icon: Gift,
    color: 'from-purple-500 to-purple-700',
    features: ['Roof Assessment', 'Electrical Check', 'Detailed Report']
  },
  {
    name: 'Custom Displays',
    description: 'Bespoke holiday lighting solutions',
    price: 'Quote Required',
    icon: Sparkles,
    color: 'from-pink-500 to-pink-700',
    features: ['Custom Design', 'Premium Materials', 'Unique Concepts']
  },
];

export default function ProductShowcase() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {services.map((service, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true }}
          whileHover={{ y: -10 }}
          className="group"
        >
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
            <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
              <service.icon className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-2 text-white">{service.name}</h3>
            <p className="text-white/80 mb-4 flex-1">{service.description}</p>
            <div className="mb-4">
              {service.features.map((feature, featureIndex) => (
                <div key={featureIndex} className="flex items-center gap-2 text-sm text-white/70 mb-1">
                  <span className="text-christmas-gold">✓</span>
                  {feature}
                </div>
              ))}
            </div>
            <p className="text-2xl font-bold text-christmas-gold mb-4">{service.price}</p>
            <button className="w-full bg-gradient-to-r from-christmas-red to-christmas-green text-white font-semibold py-3 px-6 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300">
              Get Quote
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
