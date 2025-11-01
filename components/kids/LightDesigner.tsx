import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface LightDesignerProps {
  playerName: string;
  onAddPoints: (points: number, badge?: string) => void;
  onClose: () => void;
}

const lightPatterns = [
  { id: 'solid', name: 'Solid', icon: '●' },
  { id: 'blink', name: 'Blink', icon: '◐' },
  { id: 'chase', name: 'Chase', icon: '→' },
  { id: 'twinkle', name: 'Twinkle', icon: '✨' },
];

const lightColors = [
  { name: 'Warm White', hex: '#FDB813', emoji: '🟨' },
  { name: 'Multi-Color', hex: '#FF6B6B', emoji: '🌈' },
  { name: 'Cool Blue', hex: '#4ECDC4', emoji: '🟦' },
  { name: 'Red & Green', hex: '#FF0000', emoji: '🎄' },
];

export default function LightDesigner({
  playerName,
  onAddPoints,
  onClose,
}: LightDesignerProps) {
  const [selectedColor, setSelectedColor] = useState(lightColors[0]);
  const [selectedPattern, setSelectedPattern] = useState(lightPatterns[0]);
  const [houseGlow, setHouseGlow] = useState(false);
  const [completed, setCompleted] = useState(false);

  const handleDesignComplete = () => {
    setHouseGlow(true);
    setTimeout(() => {
      onAddPoints(50, 'light-designer');
      setCompleted(true);
    }, 1000);
  };

  if (completed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-yellow-300 to-red-400 rounded-3xl p-12 text-center"
      >
        <div className="text-8xl mb-4">🎉</div>
        <h3 className="text-4xl font-bold text-white mb-4">Amazing Job!</h3>
        <p className="text-white/90 text-xl mb-6">
          Your light design is BEAUTIFUL, {playerName}! You earned 50 points! ⭐
        </p>
        <button
          onClick={onClose}
          className="bg-white text-yellow-600 font-bold py-3 px-8 rounded-full text-lg hover:shadow-lg transition-all"
        >
          Back to Games 🎮
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Preview */}
        <div className="flex flex-col items-center justify-center">
          <h3 className="text-2xl font-bold text-white mb-6">Your Light Preview</h3>
          <motion.div
            animate={houseGlow ? { boxShadow: `0 0 40px ${selectedColor.hex}` } : {}}
            transition={{ duration: 0.5 }}
            className="w-32 h-32 bg-slate-700 rounded-2xl flex items-center justify-center border-4 border-white/30"
          >
            <motion.div
              animate={
                selectedPattern.id === 'blink'
                  ? { opacity: [0.3, 1, 0.3] }
                  : selectedPattern.id === 'twinkle'
                    ? { opacity: [0.2, 0.8, 0.2], scale: [0.9, 1.1, 0.9] }
                    : selectedPattern.id === 'chase'
                      ? { x: [-10, 10, -10] }
                      : {}
              }
              transition={{
                duration: selectedPattern.id === 'chase' ? 1.5 : 1,
                repeat: Infinity,
              }}
              className="text-5xl"
              style={{
                filter: `drop-shadow(0 0 10px ${selectedColor.hex})`,
              }}
            >
              {selectedColor.emoji}
            </motion.div>
          </motion.div>
          <p className="text-white/80 mt-6 text-center">
            Color: <span className="font-bold text-yellow-300">{selectedColor.name}</span>
            <br />
            Pattern: <span className="font-bold text-green-300">{selectedPattern.name}</span>
          </p>
        </div>

        {/* Controls */}
        <div className="flex flex-col justify-center">
          {/* Color Selection */}
          <div className="mb-8">
            <h4 className="text-white font-bold text-lg mb-4">Choose Your Color 🎨</h4>
            <div className="grid grid-cols-2 gap-3">
              {lightColors.map((color) => (
                <motion.button
                  key={color.name}
                  onClick={() => setSelectedColor(color)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-4 rounded-xl font-bold transition-all ${
                    selectedColor.name === color.name
                      ? 'ring-4 ring-white scale-105'
                      : 'ring-2 ring-white/30'
                  }`}
                  style={{
                    background: color.hex,
                    color: color.name === 'Warm White' ? '#333' : '#fff',
                  }}
                >
                  {color.emoji} {color.name}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Pattern Selection */}
          <div className="mb-8">
            <h4 className="text-white font-bold text-lg mb-4">Pick a Pattern ✨</h4>
            <div className="grid grid-cols-2 gap-3">
              {lightPatterns.map((pattern) => (
                <motion.button
                  key={pattern.id}
                  onClick={() => setSelectedPattern(pattern)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-4 rounded-xl font-bold text-xl transition-all ${
                    selectedPattern.id === pattern.id
                      ? 'bg-white text-purple-600 ring-4 ring-white'
                      : 'bg-white/20 text-white ring-2 ring-white/30'
                  }`}
                >
                  {pattern.icon} {pattern.name}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDesignComplete}
              className="flex-1 bg-gradient-to-r from-green-400 to-emerald-600 text-white font-bold py-4 px-6 rounded-xl text-lg hover:shadow-lg transition-all"
            >
              ✅ Complete Design!
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onClose}
              className="flex-1 bg-white/20 text-white font-bold py-4 px-6 rounded-xl text-lg hover:bg-white/30 transition-all"
            >
              ← Back
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}