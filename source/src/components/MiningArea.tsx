import { motion } from 'framer-motion';
import { useState } from 'react';

interface MiningAreaProps {
  clickPower: number;
  onMine: () => void;
  isClicking: boolean;
}

export function MiningArea({ clickPower, onMine, isClicking }: MiningAreaProps) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [particleId, setParticleId] = useState(0);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onMine();

    // Criar partículas de efeito
    const rect = e.currentTarget.getBoundingClientRect();
    const newParticles = Array.from({ length: 8 }).map((_, i) => ({
      id: particleId + i,
      x: rect.width / 2 + (Math.random() - 0.5) * 100,
      y: rect.height / 2 + (Math.random() - 0.5) * 100,
    }));

    setParticles((prev) => [...prev, ...newParticles]);
    setParticleId((prev) => prev + 8);

    // Remover partículas após animação
    setTimeout(() => {
      setParticles((prev) =>
        prev.filter((p) => !newParticles.some((np) => np.id === p.id))
      );
    }, 600);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 mb-12">
      <h2 className="text-2xl font-bold text-slate-200">Área de Mineração</h2>

      <motion.button
        onClick={handleClick}
        className="relative w-32 h-32 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 border-4 border-amber-600 shadow-2xl flex items-center justify-center text-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={isClicking ? { scale: [1, 0.95, 1] } : {}}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <div className="flex flex-col items-center">
          <span className="text-4xl">⛏️</span>
          <span className="text-xs font-bold text-amber-950 mt-1">
            +{Math.floor(clickPower)}
          </span>
        </div>

        {/* Partículas de efeito */}
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-2 h-2 bg-amber-300 rounded-full pointer-events-none"
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{
              x: particle.x,
              y: particle.y,
              opacity: 0,
              scale: 0,
            }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        ))}
      </motion.button>

      <div className="text-sm text-slate-400 text-center max-w-xs">
        Clique para minerar pedras. Quanto mais upgrades, mais pedras por clique!
      </div>
    </div>
  );
}
