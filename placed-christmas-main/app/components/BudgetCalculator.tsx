'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, DollarSign, TrendingUp, AlertCircle } from 'lucide-react';

export default function BudgetCalculator() {
  const [budget, setBudget] = useState('500');
  const [people, setPeople] = useState('5');
  const [calculated, setCalculated] = useState(false);

  const totalBudget = parseFloat(budget) || 0;
  const totalPeople = parseInt(people) || 1;
  const perPerson = totalBudget / totalPeople;
  const recommended = perPerson * 0.8; // 80% of budget for gifts, 20% buffer

  const handleCalculate = () => {
    setCalculated(true);
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
      <div className="text-center mb-8">
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="inline-block"
        >
          <Calculator className="w-12 h-12 text-christmas-gold mx-auto mb-4" />
        </motion.div>
        <h3 className="text-3xl font-bold text-white mb-2">
          🎄 Budget Calculator 🎄
        </h3>
        <p className="text-white/70">Plan your Christmas spending wisely</p>
      </div>

      <div className="space-y-6">
        {/* Total Budget */}
        <div>
          <label className="text-white font-semibold mb-2 flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-christmas-gold" />
            Total Budget
          </label>
          <input
            type="number"
            value={budget}
            onChange={(e) => {
              setBudget(e.target.value);
              setCalculated(false);
            }}
            className="w-full px-6 py-4 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-christmas-gold"
            placeholder="500"
          />
        </div>

        {/* Number of People */}
        <div>
          <label className="text-white font-semibold mb-2 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-christmas-gold" />
            Number of People
          </label>
          <input
            type="number"
            value={people}
            onChange={(e) => {
              setPeople(e.target.value);
              setCalculated(false);
            }}
            className="w-full px-6 py-4 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-christmas-gold"
            placeholder="5"
          />
        </div>

        {/* Calculate Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCalculate}
          className="w-full bg-gradient-to-r from-christmas-red to-christmas-green text-white font-bold py-4 rounded-full shadow-xl"
        >
          Calculate Budget
        </motion.button>

        {/* Results */}
        {calculated && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4 pt-4 border-t border-white/20"
          >
            <div className="bg-gradient-to-r from-christmas-gold/20 to-yellow-600/20 rounded-xl p-6 border border-christmas-gold/30">
              <div className="text-white/70 text-sm mb-1">Per Person Budget</div>
              <div className="text-4xl font-bold text-christmas-gold">
                ${perPerson.toFixed(2)}
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-4 border border-white/20">
              <div className="text-white/70 text-sm mb-2">Recommended Spending</div>
              <div className="text-2xl font-bold text-white mb-2">
                ${recommended.toFixed(2)} per person
              </div>
              <div className="flex items-start gap-2 text-xs text-white/60">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <p>
                  This leaves ${(totalBudget * 0.2).toFixed(2)} as a buffer for
                  shipping, wrapping, and unexpected expenses.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-xl p-4 text-center border border-white/20">
                <div className="text-white/70 text-xs mb-1">Gift Budget</div>
                <div className="text-xl font-bold text-christmas-green">
                  ${(totalBudget * 0.8).toFixed(2)}
                </div>
              </div>
              <div className="bg-white/5 rounded-xl p-4 text-center border border-white/20">
                <div className="text-white/70 text-xs mb-1">Buffer</div>
                <div className="text-xl font-bold text-christmas-red">
                  ${(totalBudget * 0.2).toFixed(2)}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
