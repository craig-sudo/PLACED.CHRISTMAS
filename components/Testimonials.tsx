import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    quote: "The entire process was so seamless. From the instant quote to the final takedown, PLACED handled everything. It completely removed the stress and risky ladder work I used to dread every year.",
    author: 'Sarah L.',
    location: 'Quispamsis, NB',
    image: 'https://i.pravatar.cc/100?u=sarah',
  },
  {
    quote: "The quality of the lights they use is incredible. Our house has never looked so beautiful for the holidays. Worth every penny for a professional, worry-free result.",
    author: 'Mark T.',
    location: 'Rothesay, NB',
    image: 'https://i.pravatar.cc/100?u=mark',
  },
  {
    quote: "I was hesitant at first, but not having to climb a ladder in the cold was a game-changer. The team was professional, quick, and respectful of my property. Highly recommend!",
    author: 'Jennifer B.',
    location: 'Saint John, NB',
    image: 'https://i.pravatar.cc/100?u=jennifer',
  },
];

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

const Testimonials: React.FC = () => {
  const [[page, direction], setPage] = useState([0, 0]);

  const paginate = (newDirection: number) => {
    setPage([(page + newDirection + testimonials.length) % testimonials.length, newDirection]);
  };

  const testimonial = testimonials[page];

  return (
    <section id="testimonials" className="py-20 bg-white relative">
      <div 
        className="absolute inset-0 bg-repeat opacity-5"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%231E3A8A' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`}}
      ></div>
      <div className="container mx-auto px-6 relative">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-primary">Ask Your Neighbor</h2>
          <p className="text-lg text-gray-600 mt-2">Hear from homeowners just like you in Quispamsis, Rothesay, and Saint John.</p>
          <div className="mt-4 w-24 h-1 bg-brand-secondary mx-auto"></div>
        </div>
        
        <div className="relative max-w-2xl mx-auto h-[320px] overflow-hidden">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={page}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="absolute w-full h-full bg-brand-light p-8 rounded-lg shadow-lg flex flex-col justify-center items-center text-center"
            >
              <div className="absolute -top-4 -left-2 text-brand-primary/10 text-9xl font-serif leading-none">“</div>
              <p className="text-gray-700 italic text-lg flex-grow mb-6 z-10 max-w-prose">{testimonial.quote}</p>
              <div className="flex items-center mt-auto z-10">
                <img loading="lazy" className="w-16 h-16 rounded-full mr-4 object-cover" src={testimonial.image} alt={testimonial.author} />
                <div>
                  <p className="font-bold text-brand-primary">{testimonial.author}</p>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="absolute inset-y-0 left-0 flex items-center">
            <button onClick={() => paginate(-1)} className="bg-white/50 p-2 rounded-full shadow-md hover:bg-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            </button>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center">
            <button onClick={() => paginate(1)} className="bg-white/50 p-2 rounded-full shadow-md hover:bg-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </button>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
