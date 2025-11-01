'use client';

import { motion } from 'framer-motion';
import { Phone, PenTool, Hammer, Settings, Package, CheckCircle } from 'lucide-react';

const processSteps = [
  {
    id: 1,
    title: 'Free Consultation',
    description: 'We visit your property for a comprehensive assessment and design consultation at no cost.',
    icon: Phone,
    details: [
      'Property assessment',
      'Design consultation',
      'Budget discussion',
      'Timeline planning'
    ],
    duration: '30-60 minutes',
    color: 'from-blue-500 to-blue-700'
  },
  {
    id: 2,
    title: 'Custom Design',
    description: 'Our team creates a personalized lighting design tailored to your home\'s architecture.',
    icon: PenTool,
    details: [
      'Architectural analysis',
      '3D design mockup',
      'Material selection',
      'Detailed quote'
    ],
    duration: '2-3 business days',
    color: 'from-purple-500 to-purple-700'
  },
  {
    id: 3,
    title: 'Professional Installation',
    description: 'Our certified technicians safely install your custom lighting display with precision.',
    icon: Hammer,
    details: [
      'Safe installation',
      'Quality materials',
      'Clean workmanship',
      'Final inspection'
    ],
    duration: '4-8 hours',
    color: 'from-orange-500 to-orange-700'
  },
  {
    id: 4,
    title: 'Season Maintenance',
    description: 'We monitor and maintain your display throughout the holiday season.',
    icon: Settings,
    details: [
      '24/7 monitoring',
      'Bulb replacement',
      'Weather adjustments',
      'Technical support'
    ],
    duration: 'All season long',
    color: 'from-green-500 to-green-700'
  },
  {
    id: 5,
    title: 'Takedown & Storage',
    description: 'Careful removal and organized storage keeps your investment protected.',
    icon: Package,
    details: [
      'Gentle removal',
      'Organized labeling',
      'Climate storage',
      'Ready for next year'
    ],
    duration: '2-4 hours',
    color: 'from-red-500 to-red-700'
  }
];

export default function HowItWorks() {
  return (
    <div className="relative">
      {/* Timeline Line */}
      <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-christmas-red via-christmas-gold to-christmas-green transform md:-translate-x-1/2 hidden sm:block"></div>

      <div className="space-y-12 md:space-y-16">
        {processSteps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className={`flex flex-col md:flex-row items-center gap-8 ${
              index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            }`}
          >
            {/* Content Card */}
            <div className="flex-1 relative">
              <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-300 group">
                <div className="flex items-start gap-6">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-3xl font-bold text-christmas-gold">
                        {step.id.toString().padStart(2, '0')}
                      </span>
                      <h3 className="text-2xl md:text-3xl font-bold text-white">
                        {step.title}
                      </h3>
                    </div>
                    
                    <p className="text-white/80 text-lg mb-6 leading-relaxed">
                      {step.description}
                    </p>

                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {step.details.map((detail, detailIndex) => (
                        <div
                          key={detailIndex}
                          className="flex items-center gap-2 text-white/70"
                        >
                          <CheckCircle className="w-4 h-4 text-christmas-green flex-shrink-0" />
                          <span className="text-sm">{detail}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-christmas-gold">
                        <span className="text-sm font-semibold">Duration:</span>
                        <span className="text-sm">{step.duration}</span>
                      </div>
                      
                      {index < processSteps.length - 1 && (
                        <div className="hidden md:flex items-center text-white/40">
                          <span className="text-sm mr-2">Next</span>
                          <motion.div
                            animate={{ x: [0, 10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            →
                          </motion.div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Step Connector for Mobile */}
              {index < processSteps.length - 1 && (
                <div className="md:hidden flex justify-center mt-6">
                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-2xl text-christmas-gold"
                  >
                    ↓
                  </motion.div>
                </div>
              )}
            </div>

            {/* Timeline Node */}
            <div className="hidden md:block relative z-10">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-christmas-red to-christmas-green flex items-center justify-center shadow-2xl border-4 border-white/20">
                <step.icon className="w-10 h-10 text-white" />
              </div>
            </div>

            {/* Spacer for alternating layout */}
            <div className="flex-1 hidden md:block"></div>
          </motion.div>
        ))}
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        viewport={{ once: true }}
        className="text-center mt-16 p-8 bg-gradient-to-r from-christmas-red to-christmas-green rounded-3xl"
      >
        <h3 className="text-3xl font-bold text-white mb-4">
          Ready to Get Started?
        </h3>
        <p className="text-white/90 text-lg mb-6">
          Let's begin with your free consultation and bring your vision to life!
        </p>
        <button className="bg-white text-christmas-red font-bold py-4 px-8 rounded-full text-lg hover:shadow-xl hover:scale-105 transition-all">
          📞 Schedule Free Consultation
        </button>
      </motion.div>
    </div>
  );
}