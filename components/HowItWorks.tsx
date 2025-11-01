
import React from 'react';

const PhoneIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
);
const DesignIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
);
const ServiceIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m12 0a2 2 0 100-4m0 4a2 2 0 110-4" />
    </svg>
);
const TakedownIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
    </svg>
);

const CheckCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-brand-secondary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);


const steps = [
  {
    number: '01',
    icon: <PhoneIcon />,
    title: 'Instant Quote & Consultation',
    description: 'Use our simple calculator for an instant price range, then we\'ll call to schedule a free, no-obligation design consultation at your property.',
    details: ['Property assessment', 'Discuss your vision', 'Budget planning']
  },
  {
    number: '02',
    icon: <DesignIcon />,
    title: 'Custom Design & Proposal',
    description: 'Our experts create a personalized design mockup tailored to your home\'s unique architecture, complete with a detailed, transparent quote.',
    details: ['Digital design mockup', 'Material selection', 'Firm quote']
  },
  {
    number: '03',
    icon: <ServiceIcon />,
    title: 'Professional Installation',
    description: 'Our certified, insured technicians safely install your custom display with precision, using premium materials and leaving your property pristine.',
    details: ['Safe & secure installation', 'Season-long maintenance', '24/7 support']
  },
  {
    number: '04',
    icon: <TakedownIcon />,
    title: 'Takedown & Storage',
    description: 'After the holidays, we carefully remove everything, label it, and store it in our climate-controlled facility, ready for next year.',
    details: ['Scheduled removal', 'Organized labeling', 'Secure storage']
  },
];

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-20 bg-brand-light">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-primary">Your Worry-Free Experience</h2>
          <p className="text-lg text-gray-600 mt-2">From dazzling design to seamless storage, we handle everything.</p>
          <div className="mt-4 w-24 h-1 bg-brand-secondary mx-auto"></div>
        </div>
        <div className="relative">
             <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-brand-primary/20 transform -translate-x-1/2 hidden md:block" aria-hidden="true"></div>
            <div className="space-y-12 md:space-y-0">
            {steps.map((step, index) => (
                <div key={index} className="md:grid md:grid-cols-2 md:gap-x-16 md:items-center space-y-4 md:space-y-0">
                    <div className={`order-1 ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-16 h-16 rounded-full bg-brand-primary flex items-center justify-center shadow-lg">
                                {step.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-brand-primary">
                                {step.title}
                            </h3>
                        </div>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                            {step.description}
                        </p>
                        <ul className="space-y-2">
                            {step.details.map((detail, i) => (
                                <li key={i} className="flex items-center gap-2">
                                    <CheckCircleIcon />
                                    <span className="text-gray-700">{detail}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                     <div className={`order-2 hidden md:block ${index % 2 === 0 ? 'md:order-2 text-right' : 'md:order-1 text-left'}`}>
                        {/* Empty spacer for alignment */}
                    </div>
                </div>
            ))}
            </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
