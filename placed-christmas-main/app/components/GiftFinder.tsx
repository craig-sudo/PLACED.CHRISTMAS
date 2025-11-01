'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Heart, Star, Sparkles, X } from 'lucide-react';

const questions = [
  {
    question: "What type of property?",
    options: [
      { text: 'Single Family Home', icon: '🏠' },
      { text: 'Townhouse', icon: '🏘️' },
      { text: 'Commercial Building', icon: '🏢' },
      { text: 'Apartment Complex', icon: '🏬' },
    ],
  },
  {
    question: "What's your budget range?",
    options: [
      { text: 'Under $500', icon: '💵' },
      { text: '$500-$1000', icon: '💰' },
      { text: '$1000-$2000', icon: '💳' },
      { text: '$2000+', icon: '💎' },
    ],
  },
  {
    question: 'Which services do you need?',
    options: [
      { text: 'Light Installation', icon: '�' },
      { text: 'Gutter Cleaning', icon: '🏠' },
      { text: 'Exterior Inspection', icon: '🔍' },
      { text: 'Full Package', icon: '⭐' },
      { text: 'Maintenance Only', icon: '�' },
      { text: 'Custom Design', icon: '🎨' },
    ],
  },
];

const recommendations = [
  { name: 'Basic Light Package', price: 'Starting at $299', icon: Gift, match: 85 },
  { name: 'Premium Holiday Service', price: 'Starting at $599', icon: Heart, match: 92 },
  { name: 'Complete Holiday Solution', price: 'Starting at $899', icon: Star, match: 78 },
];

export default function GiftFinder() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const reset = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowResults(false);
  };

  return (
    <>
      {/* Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="bg-gradient-to-r from-christmas-gold to-yellow-600 text-white font-bold py-4 px-8 rounded-full shadow-2xl hover:shadow-3xl transition-all flex items-center gap-3"
      >
        <Sparkles className="w-6 h-6" />
        <span>🎄 Free Consultation</span>
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-slate-900 to-red-950 rounded-3xl p-8 max-w-2xl w-full border border-white/20 shadow-2xl relative"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-white/60 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>

              {!showResults ? (
                <>
                  <div className="mb-6">
                    <div className="flex gap-2 mb-4">
                      {questions.map((_, index) => (
                        <div
                          key={index}
                          className={`h-2 flex-1 rounded-full ${
                            index <= currentQuestion
                              ? 'bg-christmas-gold'
                              : 'bg-white/20'
                          }`}
                        />
                      ))}
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-2">
                      {questions[currentQuestion].question}
                    </h3>
                    <p className="text-white/60">
                      Question {currentQuestion + 1} of {questions.length}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {questions[currentQuestion].options.map((option, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAnswer(option.text)}
                        className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 text-center hover:bg-white/20 transition-all"
                      >
                        <div className="text-4xl mb-2">{option.icon}</div>
                        <div className="text-white font-semibold">
                          {option.text}
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </>
              ) : (
                <>
                  <h3 className="text-3xl font-bold text-white mb-6 text-center">
                    � Recommended Services For You! �
                  </h3>

                  <div className="space-y-4 mb-6">
                    {recommendations.map((rec, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2 }}
                        className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-christmas-gold to-yellow-600 rounded-full flex items-center justify-center">
                            <rec.icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h4 className="text-white font-bold text-lg">
                              {rec.name}
                            </h4>
                            <p className="text-christmas-gold font-bold">
                              {rec.price}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-christmas-gold">
                            {rec.match}%
                          </div>
                          <div className="text-white/60 text-sm">Match</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={reset}
                      className="flex-1 bg-white/10 border border-white/20 text-white font-semibold py-3 rounded-full hover:bg-white/20 transition-all"
                    >
                      Try Again
                    </button>
                    <button className="flex-1 bg-gradient-to-r from-christmas-red to-christmas-green text-white font-bold py-3 rounded-full hover:shadow-xl transition-all">
                      📞 Book Service
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
