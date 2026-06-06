import { motion } from 'framer-motion';
import { Gem, Coins, Pickaxe } from 'lucide-react';

interface ResourceDisplayProps {
  stones: number;
  gems: number;
  money: number;
}

export function ResourceDisplay({ stones, gems, money }: ResourceDisplayProps) {
  const formatNumber = (num: number) => {
    if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
    return Math.floor(num).toString();
  };

  return (
    <div className="grid grid-cols-3 gap-4 mb-8">
      {/* Stones */}
      <motion.div
        className="bg-gradient-to-br from-slate-700 to-slate-900 rounded-lg p-4 border border-slate-600"
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <div className="flex items-center gap-2 mb-2">
          <Pickaxe className="w-5 h-5 text-amber-500" />
          <span className="text-sm font-semibold text-slate-300">Pedras</span>
        </div>
        <motion.div
          className="text-3xl font-bold text-amber-400"
          key={Math.floor(stones)}
          initial={{ scale: 1.2, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {formatNumber(stones)}
        </motion.div>
      </motion.div>

      {/* Gems */}
      <motion.div
        className="bg-gradient-to-br from-purple-700 to-purple-900 rounded-lg p-4 border border-purple-600"
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <div className="flex items-center gap-2 mb-2">
          <Gem className="w-5 h-5 text-purple-300" />
          <span className="text-sm font-semibold text-purple-200">Gemas</span>
        </div>
        <motion.div
          className="text-3xl font-bold text-purple-300"
          key={Math.floor(gems)}
          initial={{ scale: 1.2, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {formatNumber(gems)}
        </motion.div>
      </motion.div>

      {/* Money */}
      <motion.div
        className="bg-gradient-to-br from-green-700 to-green-900 rounded-lg p-4 border border-green-600"
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <div className="flex items-center gap-2 mb-2">
          <Coins className="w-5 h-5 text-green-300" />
          <span className="text-sm font-semibold text-green-200">Dinheiro</span>
        </div>
        <motion.div
          className="text-3xl font-bold text-green-300"
          key={Math.floor(money)}
          initial={{ scale: 1.2, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          ${formatNumber(money)}
        </motion.div>
      </motion.div>
    </div>
  );
}
