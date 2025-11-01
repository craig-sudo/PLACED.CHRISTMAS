'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Star, Share2, Download } from 'lucide-react';

interface WishItem {
  id: number;
  name: string;
  priority: number;
}

export default function WishlistMaker() {
  const [wishes, setWishes] = useState<WishItem[]>([]);
  const [newWish, setNewWish] = useState('');

  const addWish = () => {
    if (newWish.trim()) {
      setWishes([...wishes, { id: Date.now(), name: newWish, priority: 1 }]);
      setNewWish('');
    }
  };

  const removeWish = (id: number) => {
    setWishes(wishes.filter((w) => w.id !== id));
  };

  const updatePriority = (id: number, priority: number) => {
    setWishes(wishes.map((w) => (w.id === id ? { ...w, priority } : w)));
  };

  const shareWishlist = () => {
    // In a real app, this would share the wishlist
    alert('Wishlist ready to share! 🎁');
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
      <div className="text-center mb-8">
        <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
          🎁 My Christmas Wishlist 🎁
        </h3>
        <p className="text-white/70">Create and share your perfect gift list</p>
      </div>

      {/* Add New Wish */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={newWish}
          onChange={(e) => setNewWish(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addWish()}
          placeholder="What do you wish for?"
          className="flex-1 px-6 py-4 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-christmas-gold"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={addWish}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-christmas-red to-christmas-green flex items-center justify-center text-white shadow-xl"
        >
          <Plus className="w-6 h-6" />
        </motion.button>
      </div>

      {/* Wishlist Items */}
      <div className="space-y-3 mb-6 max-h-96 overflow-y-auto">
        <AnimatePresence>
          {wishes.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 text-white/40"
            >
              <div className="text-6xl mb-4">🎄</div>
              <p>Start adding your wishes!</p>
            </motion.div>
          ) : (
            wishes.map((wish) => (
              <motion.div
                key={wish.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 flex items-center gap-4"
              >
                <div className="flex-1">
                  <p className="text-white font-medium">{wish.name}</p>
                  <div className="flex gap-1 mt-2">
                    {[1, 2, 3].map((star) => (
                      <button
                        key={star}
                        onClick={() => updatePriority(wish.id, star)}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-4 h-4 ${
                            star <= wish.priority
                              ? 'fill-christmas-gold text-christmas-gold'
                              : 'text-white/30'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => removeWish(wish.id)}
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash2 className="w-5 h-5" />
                </motion.button>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Action Buttons */}
      {wishes.length > 0 && (
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={shareWishlist}
            className="flex-1 bg-gradient-to-r from-christmas-gold to-yellow-600 text-white font-bold py-3 px-6 rounded-full flex items-center justify-center gap-2 shadow-xl"
          >
            <Share2 className="w-5 h-5" />
            Share List
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1 bg-white/20 backdrop-blur-md border border-white/30 text-white font-bold py-3 px-6 rounded-full flex items-center justify-center gap-2"
          >
            <Download className="w-5 h-5" />
            Download
          </motion.button>
        </div>
      )}

      {/* Stats */}
      {wishes.length > 0 && (
        <div className="mt-6 pt-6 border-t border-white/10 flex justify-around text-center">
          <div>
            <div className="text-2xl font-bold text-christmas-gold">
              {wishes.length}
            </div>
            <div className="text-white/60 text-sm">Total Wishes</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-christmas-gold">
              {wishes.filter((w) => w.priority === 3).length}
            </div>
            <div className="text-white/60 text-sm">Top Priority</div>
          </div>
        </div>
      )}
    </div>
  );
}
