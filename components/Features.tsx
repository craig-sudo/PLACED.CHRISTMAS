import React from 'react';

const CandyCaneIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 18V8a4 4 0 10-8 0v10m-2-2h12" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M14 10h-4" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M14 14h-4" />
    </svg>
);
const SparkleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3L9.187 8.813a2 2 0 01-1.275 1.275L2 12l5.912 2.912a2 2 0 011.275 1.275L12 21l2.813-5.813a2 2 0 011.275-1.275L22 12l-5.912-2.912a2 2 0 01-1.275-1.275L12 3z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M19 17v4M3 5h4M17 19h4" />
    </svg>
);
const GiftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h18v4H3z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 12v7a2 2 0 01-2 2H7a2 2 0 01-2-2v-7" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8a2.5 2.5 0 010-5A4.8 4.8 0 0112 5a4.8 4.8 0 014.5-2 2.5 2.5 0 010 5" />
    </svg>
);


const features = [
  {
    icon: <CandyCaneIcon />,
    title: 'Safety & Insurance',
    description: 'Our certified technicians are fully insured, using professional-grade equipment to protect your home and our team.',
  },
  {
    icon: <SparkleIcon />,
    title: 'Commercial-Grade Quality',
    description: 'We use premium, durable LED lights and materials that outshine and outlast any retail product, guaranteed.',
  },
  {
    icon: <GiftIcon />,
    title: 'The Full-Service Promise',
    description: 'One price covers it all: custom design, installation, season-long maintenance, takedown, and climate-controlled storage.',
  },
];

const Features: React.FC = () => {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {features.map((feature, index) => (
            <div key={index}>
                <div className="flex items-center justify-center h-20 w-20 mx-auto mb-4 bg-brand-secondary/20 rounded-full">
                    {feature.icon}
                </div>
              <h3 className="text-xl font-bold text-brand-primary mb-2">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;