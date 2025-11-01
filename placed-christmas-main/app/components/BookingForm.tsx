'use client';

// FIX: Import React to use React.FormEvent type.
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Phone, Mail, User, Home, Clock, FileText, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

const serviceOptions = [
  { id: 'lights', name: 'Christmas Light Installation', price: 299 },
  { id: 'maintenance', name: 'Holiday Maintenance', price: 99 },
  { id: 'takedown', name: 'Takedown & Storage', price: 199 },
  { id: 'gutters', name: 'Gutter Cleaning', price: 149 },
  { id: 'inspection', name: 'Exterior Inspection', price: 79 },
  { id: 'custom', name: 'Custom Display Design', price: 0 },
];

const timeSlots = [
  '9:00 AM - 12:00 PM',
  '12:00 PM - 3:00 PM', 
  '3:00 PM - 6:00 PM',
  'Evening (6:00 PM - 8:00 PM)'
];

export default function BookingForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: 'Saint John',
    services: [] as string[],
    preferredDate: '',
    preferredTime: '',
    propertyType: 'single-family',
    specialRequests: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleServiceToggle = (serviceId: string) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter(s => s !== serviceId)
        : [...prev.services, serviceId]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#dc2626', '#16a34a', '#fbbf24'],
    });
    
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: 'Saint John',
        services: [],
        preferredDate: '',
        preferredTime: '',
        propertyType: 'single-family',
        specialRequests: '',
      });
    }, 5000);
  };

  const estimatedTotal = formData.services.reduce((total, serviceId) => {
    const service = serviceOptions.find(s => s.id === serviceId);
    return total + (service?.price || 0);
  }, 0);

  if (submitted) {
    return (
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-gradient-to-br from-christmas-green/20 to-christmas-red/20 backdrop-blur-lg rounded-3xl p-12 border border-christmas-gold/30 shadow-2xl text-center"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-8xl mb-6"
        >
          🎉
        </motion.div>
        <h3 className="text-4xl font-bold text-white mb-4">
          Booking Submitted Successfully!
        </h3>
        <p className="text-xl text-white/80 mb-6">
          Thank you {formData.firstName}! We'll contact you within 24 hours to schedule your free consultation.
        </p>
        <div className="bg-white/10 rounded-xl p-4 border border-white/20">
          <p className="text-white/70 text-sm">
            📧 Confirmation email sent to <span className="text-christmas-gold">{formData.email}</span>
          </p>
          <p className="text-white/70 text-sm mt-2">
            📞 Questions? Call us at <span className="text-christmas-gold">(506) 123-XMAS</span>
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
      <div className="text-center mb-8">
        <Calendar className="w-12 h-12 text-christmas-gold mx-auto mb-4" />
        <h3 className="text-3xl font-bold text-white mb-2">
          📅 Book Your Free Consultation
        </h3>
        <p className="text-white/70">
          Complete this form and we'll contact you within 24 hours
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="flex items-center gap-2 text-white font-semibold mb-2">
              <User className="w-4 h-4 text-christmas-gold" />
              First Name *
            </label>
            <input
              type="text"
              required
              value={formData.firstName}
              onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-christmas-gold"
              placeholder="Enter your first name"
            />
          </div>
          <div>
            <label className="flex items-center gap-2 text-white font-semibold mb-2">
              <User className="w-4 h-4 text-christmas-gold" />
              Last Name *
            </label>
            <input
              type="text"
              required
              value={formData.lastName}
              onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-christmas-gold"
              placeholder="Enter your last name"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="flex items-center gap-2 text-white font-semibold mb-2">
              <Mail className="w-4 h-4 text-christmas-gold" />
              Email Address *
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-christmas-gold"
              placeholder="your.email@example.com"
            />
          </div>
          <div>
            <label className="flex items-center gap-2 text-white font-semibold mb-2">
              <Phone className="w-4 h-4 text-christmas-gold" />
              Phone Number *
            </label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-christmas-gold"
              placeholder="(506) 123-4567"
            />
          </div>
        </div>

        {/* Property Information */}
        <div>
          <label className="flex items-center gap-2 text-white font-semibold mb-2">
            <Home className="w-4 h-4 text-christmas-gold" />
            Property Address *
          </label>
          <input
            type="text"
            required
            value={formData.address}
            onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
            className="w-full px-4 py-3 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-christmas-gold"
            placeholder="123 Main Street"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="flex items-center gap-2 text-white font-semibold mb-2">
              <MapPin className="w-4 h-4 text-christmas-gold" />
              City
            </label>
            <select
              value={formData.city}
              onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-christmas-gold"
            >
              <option value="Saint John">Saint John</option>
              <option value="Quispamsis">Quispamsis</option>
              <option value="Rothesay">Rothesay</option>
              <option value="Hampton">Hampton</option>
              <option value="Grand Bay">Grand Bay</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="flex items-center gap-2 text-white font-semibold mb-2">
              <Home className="w-4 h-4 text-christmas-gold" />
              Property Type
            </label>
            <select
              value={formData.propertyType}
              onChange={(e) => setFormData(prev => ({ ...prev, propertyType: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-christmas-gold"
            >
              <option value="single-family">Single Family Home</option>
              <option value="townhouse">Townhouse</option>
              <option value="commercial">Commercial Building</option>
              <option value="apartment">Apartment Complex</option>
            </select>
          </div>
        </div>

        {/* Services */}
        <div>
          <label className="flex items-center gap-2 text-white font-semibold mb-4">
            <FileText className="w-4 h-4 text-christmas-gold" />
            Services Interested In *
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {serviceOptions.map((service) => (
              <motion.button
                key={service.id}
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleServiceToggle(service.id)}
                className={`p-4 rounded-xl border-2 transition-all text-left ${
                  formData.services.includes(service.id)
                    ? 'bg-christmas-gold/20 border-christmas-gold text-white'
                    : 'bg-white/10 border-white/20 text-white/80 hover:border-white/40'
                }`}
              >
                <div className="font-semibold">{service.name}</div>
                <div className="text-sm opacity-80">
                  {service.price === 0 ? 'Quote Required' : `Starting at $${service.price}`}
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Scheduling */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="flex items-center gap-2 text-white font-semibold mb-2">
              <Calendar className="w-4 h-4 text-christmas-gold" />
              Preferred Date
            </label>
            <input
              type="date"
              value={formData.preferredDate}
              onChange={(e) => setFormData(prev => ({ ...prev, preferredDate: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-christmas-gold"
            />
          </div>
          <div>
            <label className="flex items-center gap-2 text-white font-semibold mb-2">
              <Clock className="w-4 h-4 text-christmas-gold" />
              Preferred Time
            </label>
            <select
              value={formData.preferredTime}
              onChange={(e) => setFormData(prev => ({ ...prev, preferredTime: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-christmas-gold"
            >
              <option value="">Select a time</option>
              {timeSlots.map((slot) => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Special Requests */}
        <div>
          <label className="flex items-center gap-2 text-white font-semibold mb-2">
            <FileText className="w-4 h-4 text-christmas-gold" />
            Special Requests or Notes
          </label>
          <textarea
            value={formData.specialRequests}
            onChange={(e) => setFormData(prev => ({ ...prev, specialRequests: e.target.value }))}
            rows={4}
            className="w-full px-4 py-3 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-christmas-gold resize-none"
            placeholder="Any specific requirements, concerns, or questions..."
          />
        </div>

        {/* Estimate */}
        {formData.services.length > 0 && (
          <div className="bg-christmas-gold/20 border border-christmas-gold/50 rounded-xl p-4">
            <div className="flex justify-between items-center">
              <span className="text-white font-semibold">Estimated Starting Cost:</span>
              <span className="text-2xl font-bold text-christmas-gold">
                {estimatedTotal === 0 ? 'Quote Required' : `$${estimatedTotal}+`}
              </span>
            </div>
            <p className="text-white/70 text-sm mt-2">
              *Final pricing determined after consultation and site assessment
            </p>
          </div>
        )}

        {/* Submit */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={formData.services.length === 0}
          className="w-full bg-gradient-to-r from-christmas-red to-christmas-green text-white font-bold py-4 rounded-full text-lg shadow-2xl hover:shadow-3xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-5 h-5" />
          Submit Booking Request
        </motion.button>
      </form>
    </div>
  );
}