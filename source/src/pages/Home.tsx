import { useEffect, useRef } from 'react';
import { useGameState } from '@/hooks/useGameState';
import { ResourceDisplay } from '@/components/ResourceDisplay';
import { MiningArea } from '@/components/MiningArea';
import { UpgradesPanel } from '@/components/UpgradesPanel';
import { motion } from 'framer-motion';

export default function Home() {
  const { gameState, mine, buyUpgrade, autoTick } = useGameState();
  const lastTickRef = useRef<number>(Date.now());
  const isClickingRef = useRef(false);

  // Loop de atualização automática
  useEffect(() => {
    const gameLoop = setInterval(() => {
      const now = Date.now();
      const deltaTime = now - lastTickRef.current;
      lastTickRef.current = now;

      autoTick(deltaTime);
    }, 100); // Atualizar a cada 100ms

    return () => clearInterval(gameLoop);
  }, [autoTick]);

  const handleMine = () => {
    isClickingRef.current = true;
    mine(1);
    setTimeout(() => {
      isClickingRef.current = false;
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <motion.header
        className="bg-slate-900/80 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-400 via-purple-400 to-green-400 bg-clip-text text-transparent">
                💎 Gem Tycoon
              </h1>
              <p className="text-sm text-slate-400 mt-1">
                Miner & Lapidary - Commercial Edition
              </p>
            </div>
            <div className="text-right">
              <div className="text-xs text-slate-400">Total de Gemas Encontradas</div>
              <div className="text-2xl font-bold text-purple-400">
                {Math.floor(gameState.totalGemsFound)}
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Recursos */}
        <ResourceDisplay
          stones={gameState.stones}
          gems={gameState.gems}
          money={gameState.money}
        />

        {/* Área de Mineração */}
        <MiningArea
          clickPower={gameState.clickPower}
          onMine={handleMine}
          isClicking={isClickingRef.current}
        />

        {/* Painel de Upgrades */}
        <motion.div
          className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-slate-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <UpgradesPanel gameState={gameState} onBuyUpgrade={buyUpgrade} />
        </motion.div>

        {/* Footer Info */}
        <motion.div
          className="mt-12 text-center text-slate-400 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p>
            Seu progresso é salvo automaticamente. Divirta-se minerando e construindo seu império de gemas!
          </p>
        </motion.div>
      </main>
    </div>
  );
}
