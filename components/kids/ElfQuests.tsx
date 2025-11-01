import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ElfQuestsProps {
  playerName: string;
  onAddPoints: (points: number, badge?: string) => void;
  onClose: () => void;
}

const quests = [
  {
    id: 1,
    title: "Santa's Silly Dance",
    description: 'Stand up and do your SILLIEST dance move! 💃',
    emoji: '🎭',
    points: 30,
  },
  {
    id: 2,
    title: 'Reindeer Call',
    description: 'Make your best reindeer sound! (It can be REALLY silly!)',
    emoji: '🦌',
    points: 25,
  },
  {
    id: 3,
    title: 'Wrap a Present',
    description: 'Find a toy and wrap it in paper or blanket!',
    emoji: '🎁',
    points: 35,
  },
  {
    id: 4,
    title: 'Sing a Carol',
    description: 'Sing your favorite Christmas song as LOUD as you can!',
    emoji: '🎵',
    points: 40,
  },
  {
    id: 5,
    title: 'Build a Snowman',
    description: 'Make a snowman indoors with pillows or stuffed animals!',
    emoji: '⛄',
    points: 45,
  },
];

export default function ElfQuests({
  playerName,
  onAddPoints,
  onClose,
}: ElfQuestsProps) {
  const [completedQuests, setCompletedQuests] = useState<number[]>([]);
  const [currentQuest, setCurrentQuest] = useState<number | null>(null);

  const handleCompleteQuest = (questId: number, points: number) => {
    if (!completedQuests.includes(questId)) {
      setCompletedQuests([...completedQuests, questId]);
      onAddPoints(points, 'elf-quest');
      setCurrentQuest(null);

      if (completedQuests.length + 1 === quests.length) {
        setTimeout(() => {
          onAddPoints(100, 'quest-master');
        }, 500);
      }
    }
  };

  if (currentQuest !== null) {
    const quest = quests.find((q) => q.id === currentQuest);
    if (!quest) return null;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-12 text-center text-white"
      >
        <div className="text-8xl mb-6 animate-bounce">{quest.emoji}</div>
        <h3 className="text-4xl font-bold mb-4">🎅 Santa's Quest #{currentQuest}</h3>
        <h2 className="text-3xl font-bold mb-6">{quest.title}</h2>
        <p className="text-xl mb-8 leading-relaxed">{quest.description}</p>
        <p className="text-lg mb-8 bg-white/30 rounded-xl py-4 px-6">
          ⭐ Earn {quest.points} Points for Completing This!
        </p>

        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleCompleteQuest(quest.id, quest.points)}
            className="flex-1 bg-yellow-400 text-green-700 font-bold py-4 px-6 rounded-full text-lg hover:shadow-lg transition-all"
          >
            ✅ I Did It!
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentQuest(null)}
            className="flex-1 bg-white/30 text-white font-bold py-4 px-6 rounded-full text-lg hover:bg-white/40 transition-all"
          >
            ← Skip
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h3 className="text-3xl font-bold text-white mb-2">🎅 Santa's Silly Quests</h3>
        <p className="text-white/80">
          Completed: {completedQuests.length} / {quests.length}
        </p>
        <div className="w-full bg-white/20 rounded-full h-3 mt-4 overflow-hidden">
          <motion.div
            animate={{
              width: `${(completedQuests.length / quests.length) * 100}%`,
            }}
            className="h-full bg-gradient-to-r from-green-400 to-emerald-600"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {quests.map((quest) => {
          const isCompleted = completedQuests.includes(quest.id);
          return (
            <motion.button
              key={quest.id}
              onClick={() => !isCompleted && setCurrentQuest(quest.id)}
              whileHover={!isCompleted ? { scale: 1.05 } : {}}
              whileTap={!isCompleted ? { scale: 0.95 } : {}}
              disabled={isCompleted}
              className={`p-6 rounded-2xl text-center font-bold text-lg transition-all ${
                isCompleted
                  ? 'bg-white/20 opacity-50 cursor-not-allowed'
                  : 'bg-gradient-to-br from-green-400 to-emerald-500 text-white shadow-lg hover:shadow-xl'
              }`}
            >
              <div className="text-5xl mb-2">{quest.emoji}</div>
              <div className="text-sm mb-1">{quest.title}</div>
              <div className="text-xs opacity-90">+{quest.points} pts</div>
              {isCompleted && <div className="text-2xl mt-2">✅</div>}
            </motion.button>
          );
        })}
      </div>

      <div className="flex gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          className="flex-1 bg-white/20 text-white font-bold py-4 px-6 rounded-xl text-lg hover:bg-white/30 transition-all"
        >
          ← Back to Games
        </motion.button>
      </div>
    </motion.div>
  );
}