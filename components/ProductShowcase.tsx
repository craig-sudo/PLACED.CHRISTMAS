import React from 'react';

const LightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-brand-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);

const GutterIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-brand-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2z" />
    </svg>
);

const RoofIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-brand-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
);

const ShedIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-brand-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
);


const services = [
  {
    icon: <LightIcon />,
    title: 'Worry-Free Holiday Lights',
    description: 'Full-service installation, maintenance, takedown, and storage for commercial-grade displays.',
  },
  {
    icon: <ShedIcon />,
    title: 'Custom Shed Builds',
    description: 'Design and build your perfect backyard structure. End-to-end service including permits and foundation.',
  },
    {
    icon: <RoofIcon />,
    title: 'Drone Roof Inspections',
    description: 'Get a comprehensive, AI-analyzed report of your roof\'s condition without anyone setting foot on it. Safe, fast, and thorough.',
  },
  {
    icon: <GutterIcon />,
    title: 'Gutter Cleaning & Maintenance',
    description: 'Protect your home from water damage. We ensure your gutters are clear of debris and functioning perfectly for NB winters.',
  },
];

const ProductShowcase: React.FC = () => {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-primary">Our Premium Services</h2>
          <p className="text-lg text-gray-600 mt-2 max-w-2xl mx-auto">One call for complete peace of mind for your home's exterior.</p>
          <div className="mt-4 w-24 h-1 bg-brand-secondary mx-auto"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div key={index} className="group bg-brand-light p-8 rounded-lg shadow-lg text-center transform hover:-translate-y-2 transition-transform duration-300 relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-full rounded-lg ring-2 ring-transparent group-hover:ring-brand-secondary transition-all duration-300"></div>
              <div className="flex justify-center mb-4">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-brand-primary mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
