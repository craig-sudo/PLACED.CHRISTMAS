import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Eye, MapPin, Calendar } from 'lucide-react';

const portfolioData = [
  {
    id: 1,
    location: 'Quispamsis Family Home',
    date: 'December 2023',
    type: 'Residential Installation',
    image: 'https://images.unsplash.com/photo-1607293823993-36e1c6a08f23?q=80&w=1932&auto=format&fit=crop',
    description: 'Complete exterior transformation with warm white LED lights, featuring roofline, windows, and landscape lighting.',
  },
  {
    id: 2,
    location: 'Saint John Commercial Plaza',
    date: 'November 2023',
    type: 'Commercial Installation',
    image: 'https://images.unsplash.com/photo-1574631241943-4f243026ac70?q=80&w=1974&auto=format&fit=crop',
    description: 'Large-scale commercial installation with synchronized lighting display and custom branding elements.',
  },
  {
    id: 3,
    location: 'Rothesay Heritage Home',
    date: 'December 2023',
    type: 'Heritage Restoration',
    image: 'https://images.unsplash.com/photo-1640092322442-3dc5d8d85f57?q=80&w=2070&auto=format&fit=crop',
    description: 'Careful installation preserving historical architecture while creating magical holiday atmosphere.',
  },
];


const InstallationPortfolio: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<(typeof portfolioData[0]) | null>(null);

  return (
    <section id="portfolio" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-primary">Our Recent Work</h2>
          <p className="text-lg text-gray-600 mt-2">Bringing holiday magic to homes and businesses.</p>
          <div className="mt-4 w-24 h-1 bg-brand-secondary mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {portfolioData.map((project) => (
            <motion.div 
              key={project.id} 
              className="group bg-brand-light rounded-lg shadow-lg overflow-hidden cursor-pointer transition-transform duration-300 ease-in-out hover:-translate-y-2"
              onClick={() => setSelectedProject(project)}
            >
                <div className="relative">
                    <img loading="lazy" src={project.image} alt={project.location} className="w-full h-56 object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="text-white text-lg font-bold border-2 border-white py-2 px-4 rounded-md flex items-center gap-2"><Eye className="w-6 h-6"/> View Project</span>
                    </div>
                </div>
              <div className="p-6">
                <span className="text-xs bg-brand-secondary/80 text-brand-primary px-2 py-1 rounded-full font-semibold">{project.type}</span>
                <h3 className="text-xl font-bold text-brand-primary my-2">{project.location}</h3>
                <p className="text-gray-600 text-sm line-clamp-2">{project.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <AnimatePresence>
            {selectedProject && (
                 <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
                    onClick={() => setSelectedProject(null)}
                >
                     <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                    >
                         <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white z-10">
                            <div>
                                <h2 className="text-2xl font-bold text-brand-primary mb-1">
                                    {selectedProject.location}
                                </h2>
                                <div className="flex items-center gap-4 text-gray-500 text-sm">
                                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {selectedProject.type}</span>
                                    <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {selectedProject.date}</span>
                                </div>
                            </div>
                            <button
                            onClick={() => setSelectedProject(null)}
                            className="text-gray-400 hover:text-gray-700"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="p-6">
                            <img loading="lazy" src={selectedProject.image} alt={selectedProject.location} className="w-full h-72 object-cover rounded-lg mb-6" />
                            <h4 className="text-lg font-bold text-brand-primary mb-2">Project Details</h4>
                            <p className="text-gray-700 leading-relaxed">
                                {selectedProject.description}
                            </p>
                        </div>
                         <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-end">
                             <button onClick={() => setSelectedProject(null)} className="py-2 px-6 bg-brand-primary text-white font-bold rounded-lg hover:bg-blue-800">Close</button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default InstallationPortfolio;
