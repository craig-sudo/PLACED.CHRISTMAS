'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, CreditCard } from 'lucide-react';
import confetti from 'canvas-confetti';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const initialBookings: CartItem[] = [
  { id: 1, name: 'Christmas Light Consultation', price: 0, quantity: 1, image: '💡' },
  { id: 2, name: 'Gutter Cleaning Service', price: 149, quantity: 1, image: '�' },
];

export default function ShoppingCart() {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<CartItem[]>(initialBookings);

  const updateQuantity = (id: number, change: number) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(0, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#dc2626', '#16a34a', '#fbbf24'],
    });
    alert('🎉 Booking submitted! We\'ll contact you within 24 hours! 🎄');
  };

  return (
    <>
      {/* Cart Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="relative text-white"
      >
        <ShoppingBag className="w-6 h-6" />
        {itemCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-2 -right-2 bg-christmas-red text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold"
          >
            {itemCount}
          </motion.span>
        )}
      </motion.button>

      {/* Cart Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-gradient-to-br from-slate-900 to-red-950 shadow-2xl z-[70] flex flex-col"
            >
              {/* Header */}
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <ShoppingBag className="w-6 h-6 text-christmas-gold" />
                  Service Booking
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/60 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Items */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {items.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📅</div>
                    <p className="text-white/60">No services booked yet</p>
                    <p className="text-white/40 text-sm mt-2">Add services to request a quote</p>
                  </div>
                ) : (
                  items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20"
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-4xl">{item.image}</div>
                        <div className="flex-1">
                          <h3 className="text-white font-semibold">{item.name}</h3>
                          <p className="text-christmas-gold font-bold">
                            ${item.price.toFixed(2)}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="text-white font-bold w-8 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="p-6 border-t border-white/10 space-y-4">
                  <div className="flex items-center justify-between text-white">
                    <span className="text-lg">Estimated Total:</span>
                    <span className="text-2xl font-bold text-christmas-gold">
                      {total === 0 ? 'FREE QUOTE' : `$${total.toFixed(2)}+`}
                    </span>
                  </div>
                  <div className="text-xs text-white/60 text-center">
                    *Final pricing determined after consultation
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCheckout}
                    className="w-full bg-gradient-to-r from-christmas-red to-christmas-green text-white font-bold py-4 rounded-full flex items-center justify-center gap-2 shadow-2xl"
                  >
                    <CreditCard className="w-5 h-5" />
                    📞 Request Quote
                  </motion.button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
