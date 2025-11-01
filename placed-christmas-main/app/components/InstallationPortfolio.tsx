'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, Eye, MapPin, Calendar } from 'lucide-react';

const portfolioData = [
  {
    id: 1,
    location: 'Quispamsis Family Home',
    date: 'December 2023',
    type: 'Residential Installation',
    before: '🏠', // Placeholder - you'll replace with real images
    after: '✨🏠✨',
    description: 'Complete exterior transformation with warm white LED lights, featuring roofline, windows, and landscape lighting.',
    features: ['25,000 LED lights', 'Roofline coverage', 'Window accents', 'Landscape lighting'],
    testimonial: '"PLACED transformed our home into a winter wonderland! Professional, timely, and absolutely stunning results."'
  },
  {
    id: 2,
    location: 'Saint John Commercial Building',
    date: 'November 2023',
    type: 'Commercial Installation',
    before: '🏢',
    after: '🌟🏢🌟',
    description: 'Large-scale commercial installation with synchronized lighting display and custom branding elements.',
    features: ['50,000+ LED lights', 'Synchronized display', 'Custom branding', 'Timer controls'],
    testimonial: '"Our customers love the festive atmosphere! Sales increased 30% during the holiday season."'
  },
  {
    id: 3,
    location: 'Rothesay Heritage Home',
    date: 'December 2023',
    type: 'Heritage Restoration',
    before: '🏛️',
    after: '✨🏛️✨',
    description: 'Careful installation preserving historical architecture while creating magical holiday atmosphere.',
    features: ['Heritage-safe mounting', 'Warm white theme', 'Architectural highlighting', 'Minimal impact'],
    testimonial: '"They respected our heritage home while creating absolute magic. Highly recommend!"'
  },
  {
    id: 4,
    location: 'Hampton Waterfront Property',
    date: 'November 2023',
    type: 'Waterfront Spectacular',
    before: '🏡🌊',
    after: '🌟🏡🌊🌟',
    description: 'Stunning waterfront installation with reflection lighting and weather-resistant setup.',
    features: ['Waterfront lighting', 'Reflection effects', 'Weather-resistant', 'Dock lighting'],
    testimonial: '"The reflection on the water is breathtaking! Our neighbors are amazed every night."'
  },
  {
    id: 5,
    location: 'Grand Bay Estate',
    date: 'December 2023',
    type: 'Luxury Estate',
    before: '🏰',
    after: '✨🏰✨',
    description: 'Premium estate installation with custom design, multiple zones, and advanced controls.',
    features: ['Custom design', 'Multiple zones', 'Smart controls', 'Premium materials'],
    testimonial: '"PLACED exceeded our expectations. The attention to detail is incredible!"'
  },
  {
    id: 6,
    location: 'Millidgeville Townhomes',
    date: 'November 2023',
    type: 'Multi-Unit Complex',
    before: '🏘️',
    after: '🌟🏘️🌟',
    description: 'Coordinated installation across 12 townhomes with unified design and individual controls.',
    features: ['12-unit coordination', 'Unified design', 'Individual controls', 'Bulk pricing'],
    testimonial: '"Perfect coordination across all units. The community looks amazing!"'
  }
];

export default function InstallationPortfolio() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openProject = (id: number) => {
    setSelectedProject(id);
    setCurrentImageIndex(0);
  };

  const closeProject = () => {
    setSelectedProject(null);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => prev === 0 ? 1 : 0);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => prev === 0 ? 1 : 0);
  };

  const selectedProjectData = portfolioData.find(p => p.id === selectedProject);

  return (
    <div>
      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {portfolioData.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
            className="group cursor-pointer"
            onClick={() => openProject(project.id)}
          >
            <div className="bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
              {/* Image Area */}
              <div className="relative h-48 bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center overflow-hidden">
                <div className="text-6xl group-hover:scale-110 transition-transform duration-300">
                  {project.after}
                </div>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <div className="absolute top-4 left-4 bg-christmas-red px-3 py-1 rounded-full text-white text-xs font-bold">
                  FEATURED
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-white group-hover:text-christmas-gold transition-colors">
                    {project.location}
                  </h3>
                  <span className="text-xs bg-white/20 px-2 py-1 rounded-full text-white/80">
                    {project.type}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-sm text-white/60 mb-3">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {project.location.split(' ')[0]}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {project.date}
                  </div>
                </div>

                <p className="text-white/80 text-sm mb-4 line-clamp-2">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.features.slice(0, 2).map((feature, featureIndex) => (
                    <span
                      key={featureIndex}
                      className="text-xs bg-christmas-gold/20 text-christmas-gold px-2 py-1 rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                  {project.features.length > 2 && (
                    <span className="text-xs bg-white/20 text-white/60 px-2 py-1 rounded-full">
                      +{project.features.length - 2} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && selectedProjectData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={closeProject}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-slate-900 to-red-950 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/20 shadow-2xl"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">
                    {selectedProjectData.location}
                  </h2>
                  <div className="flex items-center gap-4 text-white/60">
                    <span>{selectedProjectData.type}</span>
                    <span>{selectedProjectData.date}</span>
                  </div>
                </div>
                <button
                  onClick={closeProject}
                  className="text-white/60 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Before/After Images */}
              <div className="p-6">
                <div className="relative">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="text-center">
                      <h3 className="text-lg font-bold text-white mb-4">BEFORE</h3>
                      <div className="h-64 bg-gradient-to-br from-slate-700 to-slate-900 rounded-xl flex items-center justify-center text-8xl">
                        {selectedProjectData.before}
                      </div>
                    </div>
                    <div className="text-center">
                      <h3 className="text-lg font-bold text-christmas-gold mb-4">AFTER</h3>
                      <div className="h-64 bg-gradient-to-br from-red-900 to-green-900 rounded-xl flex items-center justify-center text-8xl relative overflow-hidden">
                        {selectedProjectData.after}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
                      </div>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-xl font-bold text-white mb-3">Project Description</h4>
                      <p className="text-white/80 leading-relaxed">
                        {selectedProjectData.description}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xl font-bold text-white mb-3">Features & Highlights</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {selectedProjectData.features.map((feature, index) => (
                          <div
                            key={index}
                            className="bg-christmas-gold/20 border border-christmas-gold/30 rounded-lg p-3 text-center"
                          >
                            <span className="text-christmas-gold font-semibold text-sm">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                      <h4 className="text-xl font-bold text-white mb-3">Customer Testimonial</h4>
                      <blockquote className="text-white/90 italic text-lg leading-relaxed">
                        {selectedProjectData.testimonial}
                      </blockquote>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-white/10 flex gap-4">
                <button className="flex-1 bg-gradient-to-r from-christmas-red to-christmas-green text-white font-bold py-3 rounded-full hover:shadow-xl transition-all">
                  📞 Get Similar Quote
                </button>
                <button className="flex-1 bg-white/20 backdrop-blur-md border border-white/30 text-white font-bold py-3 rounded-full hover:bg-white/30 transition-all">
                  📧 Request Details
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}