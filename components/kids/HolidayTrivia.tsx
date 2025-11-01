import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface HolidayTriviaProps {
  playerName: string;
  onAddPoints: (points: number, badge?: string) => void;
  onClose: () => void;
}

const triviaQuestions = [
  {
    id: 1,
    question: "What color is Rudolph's nose?",
    options: ['Red', 'Blue', 'Green', 'Yellow'],
    correct: 0,
    emoji: '🦌',
  },
  {
    id: 2,
    question: "How many reindeer help pull Santa's sleigh?",
    options: ['6', '8', '9', '10'],
    correct: 2,
    emoji: '🛷',
  },
  {
    id: 3,
    question: 'What do you hang on a Christmas tree?',
    options: ['Lights', 'Ornaments', 'Tinsel', 'All of the above'],
    correct: 3,
    emoji: '🎄',
  },
  {
    id: 4,
    question: 'What do kids leave for Santa on Christmas Eve?',
    options: ['Toys', 'Milk and Cookies', 'Coal', 'Socks'],
    correct: 1,
    emoji: '🍪',
  },
  {
    id: 5,
    question: 'What song has "Jingle Bells" in it?',
    options: ['Jingle Bell Rock', 'Jingle Bells', 'Both', 'Neither'],
    correct: 2,
    emoji: '🔔',
  },
];

export default function HolidayTrivia({
  playerName,
  onAddPoints,
  onClose,
}: HolidayTriviaProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);

  const currentQuestion = triviaQuestions[currentQuestionIndex];
  const isCorrect = selectedAnswer === currentQuestion.correct;

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setAnswered(true);

    if (answerIndex === currentQuestion.correct) {
      setScore(score + 1);
      onAddPoints(20, 'trivia-master');
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex + 1 < triviaQuestions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setAnswered(false);
      setSelectedAnswer(null);
    } else {
      onAddPoints(50, 'trivia-expert');
      setFinished(true);
    }
  };

  if (finished) {
    const percentage = (score / triviaQuestions.length) * 100;
    let achievement = '🎓 Great Try!';
    if (percentage === 100) achievement = "🌟 PERFECT! You're a Holiday Expert!";
    else if (percentage >= 80) achievement = '⭐ Excellent! You know holidays!';
    else if (percentage >= 60) achievement = '👍 Good Job! Keep Learning!';

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-12 text-center text-white"
      >
        <div className="text-8xl mb-6">{achievement.split(' ')[0]}</div>
        <h3 className="text-4xl font-bold mb-2">{achievement.substring(2)}</h3>
        <p className="text-2xl mb-8">
          You got <span className="font-bold">{score}</span> out of{' '}
          <span className="font-bold">{triviaQuestions.length}</span> correct!
        </p>
        <p className="text-5xl font-bold mb-8">{Math.round(percentage)}%</p>

        <div className="flex gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setCurrentQuestionIndex(0);
              setScore(0);
              setAnswered(false);
              setSelectedAnswer(null);
              setFinished(false);
            }}
            className="flex-1 bg-yellow-400 text-blue-600 font-bold py-4 px-6 rounded-full text-lg hover:shadow-lg transition-all"
          >
            🔄 Try Again
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="flex-1 bg-white/30 text-white font-bold py-4 px-6 rounded-full text-lg hover:bg-white/40 transition-all"
          >
            ← Back
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20"
    >
      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between text-white/80 mb-2">
          <span>Question {currentQuestionIndex + 1}</span>
          <span>{score} Correct</span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden">
          <motion.div
            animate={{
              width: `${((currentQuestionIndex + 1) / triviaQuestions.length) * 100}%`,
            }}
            className="h-full bg-gradient-to-r from-blue-400 to-purple-600"
          />
        </div>
      </div>

      {/* Question */}
      <motion.div
        key={currentQuestion.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="text-7xl mb-4">{currentQuestion.emoji}</div>
        <h3 className="text-3xl font-bold text-white mb-8">
          {currentQuestion.question}
        </h3>

        {/* Answer Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {currentQuestion.options.map((option, index) => (
            <motion.button
              key={index}
              onClick={() => !answered && handleAnswer(index)}
              disabled={answered}
              whileHover={!answered ? { scale: 1.05 } : {}}
              whileTap={!answered ? { scale: 0.95 } : {}}
              animate={
                answered
                  ? {
                      backgroundColor:
                        index === currentQuestion.correct
                          ? '#4ade80'
                          : index === selectedAnswer
                            ? '#ef4444'
                            : 'rgba(255,255,255,0.1)',
                    }
                  : {}
              }
              className={`p-6 rounded-2xl font-bold text-xl text-white transition-all ${
                !answered
                  ? 'bg-white/20 hover:bg-white/30 cursor-pointer'
                  : 'cursor-not-allowed'
              }`}
            >
              <AnimatePresence>
                {answered && index === currentQuestion.correct && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="mr-2"
                  >
                    ✅
                  </motion.span>
                )}
                {answered && index === selectedAnswer && index !== currentQuestion.correct && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="mr-2"
                  >
                    ❌
                  </motion.span>
                )}
              </AnimatePresence>
              {option}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Next Button */}
      {answered && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            className="flex-1 bg-gradient-to-r from-green-400 to-emerald-600 text-white font-bold py-4 px-6 rounded-xl text-lg hover:shadow-lg transition-all"
          >
            {currentQuestionIndex + 1 === triviaQuestions.length
              ? '✅ Finish Quiz!'
              : '→ Next Question'}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="flex-1 bg-white/20 text-white font-bold py-4 px-6 rounded-xl text-lg hover:bg-white/30 transition-all"
          >
            ← Back
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
}
