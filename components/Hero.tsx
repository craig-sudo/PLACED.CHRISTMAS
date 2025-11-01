import React from 'react';
import { motion } from 'framer-motion';

const ChevronDown = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
)

const Hero: React.FC = () => {
  return (
    <section 
      className="relative bg-cover bg-center text-white h-screen flex flex-col justify-center items-center"
      style={{ backgroundImage: "linear-gradient(rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.7)), url('https://images.unsplash.com/photo-1604928141068-a2ac8927e22f?q=80&w=2070&auto=format&fit=crop')" }}
    >
      <div className="container mx-auto px-6 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 text-brand-secondary tracking-wide"
        >
          Your Home's Exterior, Perfected.
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-2xl mb-8 max-w-3xl mx-auto text-brand-light"
        >
          Premium, worry-free Christmas light installation, gutter cleaning, and roof inspections in Quispamsis & Saint John.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#quote-calculator"
            className="bg-brand-secondary text-brand-primary font-bold py-4 px-10 text-lg rounded-lg shadow-xl hover:bg-yellow-400 transition-transform duration-300 hover:scale-105 transform w-full sm:w-auto"
          >
            Get Your Instant Quote
          </a>
          <a
            href="#quote-calculator"
            className="bg-transparent border-2 border-brand-secondary text-brand-secondary font-bold py-4 px-10 text-lg rounded-lg shadow-xl hover:bg-brand-secondary hover:text-brand-primary transition-colors duration-300 hover:scale-105 transform w-full sm:w-auto"
          >
            Book Now
          </a>
        </motion.div>
      </div>
       <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute bottom-10"
        >
            <a href="#features" aria-label="Scroll down">
                <ChevronDown />
            </a>
        </motion.div>
    </section>
  );
};

export default Hero;