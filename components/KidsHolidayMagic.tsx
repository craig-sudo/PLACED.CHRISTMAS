import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LightDesigner from './kids/LightDesigner';
import ElfQuests from './kids/ElfQuests';
import HolidayTrivia from './kids/HolidayTrivia';

interface KidsMagicState {
  activeGame: 'designer' | 'quests' | 'trivia' | null;
  totalPoints: number;
  unlockedBadges: string[];
  playerName: string;
}

export default function KidsHolidayMagic() {
  const [state, setState] = useState<KidsMagicState>({
    activeGame: null,
    totalPoints: 0,
    unlockedBadges: [],
    playerName: '',
  });

  const [showNameModal, setShowNameModal] = useState(true);

  const handleAddPoints = (points: number, badge?: string) => {
    setState((prev) => ({
      ...prev,
      totalPoints: prev.totalPoints + points,
      unlockedBadges: badge && !prev.unlockedBadges.includes(badge)
        ? [...prev.unlockedBadges, badge]
        : prev.unlockedBadges,
    }));
  };

  const handleSetName = (name: string) => {
    setState((prev) => ({ ...prev, playerName: name }));
    setShowNameModal(false);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-blue-900 via-purple-900 to-indigo-900 overflow-hidden text-white font-sans">
      {/* Animated Background Stars */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center py-8">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-red-400 to-green-400 mb-2"
          >
            ✨ Kids' Holiday Magic ✨
          </motion.h2>
          <p className="text-white/80 text-lg md:text-xl">
            Play & Learn While Your Home Gets Magical Lights!
          </p>
        </div>

        {/* Name Entry Modal */}
        <AnimatePresence>
          {showNameModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-3xl p-8 text-center max-w-sm"
              >
                <h3 className="text-3xl font-bold text-white mb-4">
                  Welcome, Young Elf! 🎅
                </h3>
                <p className="text-white/90 mb-6">What's your name, adventurer?</p>
                <input
                  type="text"
                  placeholder="Your name"
                  maxLength={20}
                  className="w-full px-4 py-3 rounded-lg mb-4 text-center font-bold text-lg text-brand-dark"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                      handleSetName(e.currentTarget.value);
                    }
                  }}
                />
                <button
                  onClick={(e) => {
                    const input = (e.currentTarget.previousElementSibling as HTMLInputElement);
                    if (input.value.trim()) {
                      handleSetName(input.value);
                    }
                  }}
                  className="w-full bg-yellow-400 text-purple-900 font-bold py-3 rounded-lg hover:bg-yellow-300 transition-colors"
                >
                  Start My Adventure! 🎄
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats Bar */}
        {!showNameModal && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-6xl mx-auto px-4 mb-8"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-white/70 text-sm mb-1">Player</p>
                  <p className="text-2xl font-bold text-yellow-300">
                    {state.playerName}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-white/70 text-sm mb-1">⭐ Points</p>
                  <motion.p
                    key={state.totalPoints}
                    animate={{ scale: [1, 1.2, 1] }}
                    className="text-2xl font-bold text-green-400"
                  >
                    {state.totalPoints}
                  </motion.p>
                </div>
                <div className="text-center">
                  <p className="text-white/70 text-sm mb-1">🏆 Badges</p>
                  <p className="text-2xl font-bold text-red-400">
                    {state.unlockedBadges.length}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-white/70 text-sm mb-1">Level</p>
                  <p className="text-2xl font-bold text-purple-300">
                    {Math.floor(state.totalPoints / 100) + 1}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Game Selection / Active Game */}
        <div className="max-w-6xl mx-auto px-4 pb-16">
          {!state.activeGame ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {/* Light Designer Game */}
              <GameCard
                icon="🎨"
                title="Light Designer"
                description="Design your own light show! Choose colors and patterns!"
                onClick={() => setState((prev) => ({ ...prev, activeGame: 'designer' }))}
                bgColor="from-pink-500 to-rose-600"
              />

              {/* Elf Quests */}
              <GameCard
                icon="🎅"
                title="Elf Quests"
                description="Help Santa's elves complete silly holiday challenges!"
                onClick={() => setState((prev) => ({ ...prev, activeGame: 'quests' }))}
                bgColor="from-green-500 to-emerald-600"
              />

              {/* Holiday Trivia */}
              <GameCard
                icon="❓"
                title="Holiday Trivia"
                description="Answer fun Christmas questions and earn points!"
                onClick={() => setState((prev) => ({ ...prev, activeGame: 'trivia' }))}
                bgColor="from-blue-500 to-cyan-600"
              />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {state.activeGame === 'designer' && (
                <LightDesigner
                  playerName={state.playerName}
                  onAddPoints={handleAddPoints}
                  onClose={() => setState((prev) => ({ ...prev, activeGame: null }))}
                />
              )}
              {state.activeGame === 'quests' && (
                <ElfQuests
                  playerName={state.playerName}
                  onAddPoints={handleAddPoints}
                  onClose={() => setState((prev) => ({ ...prev, activeGame: null }))}
                />
              )}
              {state.activeGame === 'trivia' && (
                <HolidayTrivia
                  playerName={state.playerName}
                  onAddPoints={handleAddPoints}
                  onClose={() => setState((prev) => ({ ...prev, activeGame: null }))}
                />
              )}
            </motion.div>
          )}
        </div>

        {/* Parent CTA */}
        {!state.activeGame && !showNameModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4"
          >
            <div className="max-w-6xl mx-auto text-center">
              <p className="text-white/80 text-sm mb-2">
                While your kids play, let's design YOUR perfect light show!
              </p>
              <a
                href="#visualization-tool"
                className="inline-block bg-gradient-to-r from-brand-secondary to-yellow-400 text-brand-primary font-bold py-3 px-8 rounded-full hover:shadow-xl hover:scale-105 transition-all"
              >
                Get Your Free Light Design Mockup
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

interface GameCardProps {
  icon: string;
  title: string;
  description: string;
  onClick: () => void;
  bgColor: string;
}

function GameCard({ icon, title, description, onClick, bgColor }: GameCardProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.05, rotateZ: 2 }}
      whileTap={{ scale: 0.95 }}
      className={`relative p-8 rounded-3xl bg-gradient-to-br ${bgColor} text-white shadow-2xl overflow-hidden group`}
    >
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 bg-white/20"
        animate={{
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      <div className="relative z-10 text-center">
        <div className="text-6xl mb-4">{icon}</div>
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-white/90 text-sm">{description}</p>
        <div className="mt-4 text-lg font-bold">Play Now →</div>
      </div>
    </motion.button>
  );
}
