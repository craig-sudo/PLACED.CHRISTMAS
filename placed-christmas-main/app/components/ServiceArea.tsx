'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Clock } from 'lucide-react';

const serviceAreas = [
  { city: 'Saint John', distance: '0 km', popular: true },
  { city: 'Quispamsis', distance: '15 km', popular: true },
  { city: 'Rothesay', distance: '12 km', popular: true },
  { city: 'Hampton', distance: '25 km', popular: false },
  { city: 'Grand Bay-Westfield', distance: '30 km', popular: false },
  { city: 'Millidgeville', distance: '8 km', popular: false },
];

export default function ServiceArea() {
  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
      <div className="text-center mb-8">
        <MapPin className="w-12 h-12 text-christmas-gold mx-auto mb-4" />
        <h3 className="text-3xl font-bold text-white mb-2">
          🗺️ Service Areas 🗺️
        </h3>
        <p className="text-white/70">We proudly serve the Greater Saint John area</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {serviceAreas.map((area, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 rounded-xl border transition-all ${
              area.popular
                ? 'bg-christmas-gold/20 border-christmas-gold/50'
                : 'bg-white/5 border-white/20'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-white font-bold flex items-center gap-2">
                  {area.city}
                  {area.popular && <span className="text-xs bg-christmas-red px-2 py-1 rounded-full">POPULAR</span>}
                </h4>
                <p className="text-white/60 text-sm">{area.distance} from base</p>
              </div>
              <MapPin className="w-5 h-5 text-christmas-gold" />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="space-y-4 text-center">
        <div className="flex items-center justify-center gap-6 text-white/80">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-christmas-gold" />
            <span className="text-sm">(506) 123-XMAS</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-christmas-gold" />
            <span className="text-sm">24/7 Emergency</span>
          </div>
        </div>
        
        <p className="text-white/60 text-sm">
          Don't see your area? Give us a call - we may still be able to help!
        </p>
        
        <button className="bg-gradient-to-r from-christmas-red to-christmas-green text-white font-bold py-3 px-8 rounded-full hover:shadow-xl transition-all">
          📞 Check My Area
        </button>
      </div>
    </div>
  );
}