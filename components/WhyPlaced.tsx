import React from 'react';
import { Lightbulb, ShieldCheck, Wrench, PackageCheck, Clock, Unplug, TriangleAlert, LightbulbOff, Hourglass, Frown } from 'lucide-react';

const placedWay = [
    { text: 'Commercial-grade, custom-fit LED lights', Icon: Lightbulb },
    { text: 'Fully insured & trained professionals', Icon: ShieldCheck },
    { text: 'Guaranteed season-long maintenance', Icon: Wrench },
    { text: 'Seamless takedown & secure storage', Icon: PackageCheck },
    { text: 'Your valuable time back to enjoy the holidays', Icon: Clock }
];

const diyHassle = [
    { text: 'Retail-quality lights that fail & tangle', Icon: Unplug },
    { text: 'Risky ladder work in icy conditions', Icon: TriangleAlert },
    { text: 'Endless troubleshooting for burnt-out bulbs', Icon: LightbulbOff },
    { text: 'Hours spent untangling and packing lights', Icon: Hourglass },
    { text: 'Lost weekends and added holiday stress', Icon: Frown }
];

const WhyPlaced: React.FC = () => {
  return (
    <section id="why-placed" className="py-20 bg-brand-light">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-primary">The Choice is Clear</h2>
          <p className="text-lg text-gray-600 mt-2 max-w-2xl mx-auto">Experience the peace of mind that comes with a professional touch.</p>
          <div className="mt-4 w-24 h-1 bg-brand-secondary mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-green-500">
                <h3 className="text-2xl font-bold text-brand-primary mb-6">The PLACED Experience</h3>
                <ul className="space-y-4">
                    {placedWay.map(item => (
                        <li key={item.text} className="flex items-start gap-4">
                            <item.Icon className="h-6 w-6 text-green-500 flex-shrink-0 mt-1" />
                            <span className="text-gray-700">{item.text}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg border-t-4 border-red-500">
                 <h3 className="text-2xl font-bold text-brand-primary mb-6">The DIY Hassle</h3>
                 <ul className="space-y-4">
                    {diyHassle.map(item => (
                        <li key={item.text} className="flex items-start gap-4">
                            <item.Icon className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
                            <span className="text-gray-700">{item.text}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>

        <div className="text-center mt-12">
            <a
                href="#quote-calculator"
                className="bg-brand-secondary text-brand-primary font-bold py-3 px-8 text-lg rounded-lg shadow-xl hover:bg-yellow-400 transition-transform duration-300 hover:scale-105 transform inline-block"
            >
                Choose the Easy Way
            </a>
        </div>
      </div>
    </section>
  );
};

export default WhyPlaced;