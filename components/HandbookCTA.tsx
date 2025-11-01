
import React from 'react';

const HandbookCTA: React.FC = () => {
  return (
    <section id="handbook" className="py-20 bg-brand-primary text-white">
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-secondary mb-4">The PLACED Homeowner's Handbook</h2>
            <p className="text-lg text-brand-light mb-8">
                Your complete guide to dazzling Christmas lights. We're sharing our pro secrets on everything from design and safety to why expert installation is the smartest choice for your home.
            </p>
            <button className="bg-brand-secondary text-brand-primary font-bold py-3 px-8 rounded-lg shadow-xl hover:bg-yellow-400 transition-transform duration-300 hover:scale-105 transform">
                Download The Free Guide
            </button>
        </div>
      </div>
    </section>
  );
};

export default HandbookCTA;
