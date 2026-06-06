import { motion } from 'framer-motion';
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Upgrade, GameState } from '@/hooks/useGameState';
import { Pickaxe, Zap, Hammer, Briefcase } from 'lucide-react';

interface UpgradesPanelProps {
  gameState: GameState;
  onBuyUpgrade: (upgradeId: string) => void;
}

const CATEGORY_ICONS = {
  mining: <Pickaxe className="w-4 h-4" />,
  automation: <Zap className="w-4 h-4" />,
  processing: <Hammer className="w-4 h-4" />,
  industrial: <Briefcase className="w-4 h-4" />,
};

const CATEGORY_LABELS = {
  mining: 'Mineração',
  automation: 'Automação',
  processing: 'Processamento',
  industrial: 'Industrial',
};

function UpgradeCard({
  upgrade,
  gameState,
  onBuy,
}: {
  upgrade: Upgrade;
  gameState: GameState;
  onBuy: () => void;
}) {
  const nextLevel = upgrade.level + 1;
  const cost = Math.floor(upgrade.baseCost * Math.pow(1.5, upgrade.level));
  const canAfford =
    (upgrade.costCurrency === 'stones' && gameState.stones >= cost) ||
    (upgrade.costCurrency === 'gems' && gameState.gems >= cost) ||
    (upgrade.costCurrency === 'money' && gameState.money >= cost);
  const isMaxed = upgrade.level >= upgrade.maxLevel;

  const getCostColor = () => {
    if (upgrade.costCurrency === 'stones') return 'text-amber-400';
    if (upgrade.costCurrency === 'gems') return 'text-purple-400';
    return 'text-green-400';
  };

  const getCostSymbol = () => {
    if (upgrade.costCurrency === 'stones') return '⛏️';
    if (upgrade.costCurrency === 'gems') return '💎';
    return '$';
  };

  return (
    <motion.div
      className="bg-slate-800 rounded-lg p-4 border border-slate-700 hover:border-slate-600 transition-colors"
      whileHover={{ y: -2 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="font-bold text-slate-100">{upgrade.name}</h4>
          <p className="text-xs text-slate-400 mt-1">{upgrade.description}</p>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-slate-300">
            {upgrade.level}/{upgrade.maxLevel}
          </div>
        </div>
      </div>

      {/* Barra de progresso */}
      <Progress
        value={(upgrade.level / upgrade.maxLevel) * 100}
        className="mb-3 h-2"
      />

      {/* Custo e Botão */}
      <div className="flex items-center justify-between">
        <div className={`text-sm font-semibold ${getCostColor()}`}>
          {getCostSymbol()} {cost}
        </div>
        <Button
          onClick={onBuy}
          disabled={isMaxed || !canAfford}
          size="sm"
          variant={canAfford && !isMaxed ? 'default' : 'outline'}
          className={isMaxed ? 'opacity-50' : ''}
        >
          {isMaxed ? 'Máx' : 'Comprar'}
        </Button>
      </div>
    </motion.div>
  );
}

export function UpgradesPanel({ gameState, onBuyUpgrade }: UpgradesPanelProps) {
  const categories = ['mining', 'automation', 'processing', 'industrial'] as const;

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-slate-200 mb-6">Melhorias</h2>

      <Tabs defaultValue="mining" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          {categories.map((cat) => (
            <TabsTrigger key={cat} value={cat} className="flex items-center gap-2">
              {CATEGORY_ICONS[cat]}
              <span className="hidden sm:inline">{CATEGORY_LABELS[cat]}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category} value={category}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.values(gameState.upgrades)
                .filter((u) => u.category === category)
                .map((upgrade) => (
                  <UpgradeCard
                    key={upgrade.id}
                    upgrade={upgrade}
                    gameState={gameState}
                    onBuy={() => onBuyUpgrade(upgrade.id)}
                  />
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
