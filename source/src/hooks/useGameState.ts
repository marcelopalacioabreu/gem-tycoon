import { useState, useCallback, useEffect } from 'react';

export interface Upgrade {
  id: string;
  name: string;
  description: string;
  category: 'mining' | 'automation' | 'processing' | 'industrial';
  level: number;
  maxLevel: number;
  baseCost: number;
  costCurrency: 'stones' | 'gems' | 'money';
  effect: (level: number) => number;
}

export interface GameState {
  stones: number;
  gems: number;
  money: number;
  totalGemsFound: number;
  clickPower: number;
  autoMinersPerSecond: number;
  upgrades: Record<string, Upgrade>;
  lastUpdateTime: number;
}

const UPGRADES_CONFIG = [
  // Categoria: Mineração Manual
  {
    id: 'pickaxe',
    name: 'Picareta de Ferro',
    description: 'Aumenta pedras por clique',
    category: 'mining' as const,
    baseCost: 10,
    costCurrency: 'stones' as const,
    effect: (level: number) => level * 1,
  },
  {
    id: 'gloves',
    name: 'Luvas de Minerador',
    description: 'Aumenta velocidade de clique',
    category: 'mining' as const,
    baseCost: 25,
    costCurrency: 'stones' as const,
    effect: (level: number) => level * 0.05,
  },
  {
    id: 'magnifier',
    name: 'Lupa de Geólogo',
    description: 'Aumenta chance crítica de gema',
    category: 'mining' as const,
    baseCost: 50,
    costCurrency: 'stones' as const,
    effect: (level: number) => level * 0.01,
  },
  // Categoria: Automação de Campo
  {
    id: 'apprentice',
    name: 'Minerador Aprendiz',
    description: 'Gera pedras por segundo',
    category: 'automation' as const,
    baseCost: 100,
    costCurrency: 'stones' as const,
    effect: (level: number) => level * 1,
  },
  {
    id: 'drill',
    name: 'Broca a Vapor',
    description: 'Gera pedras por segundo (eficiente)',
    category: 'automation' as const,
    baseCost: 250,
    costCurrency: 'stones' as const,
    effect: (level: number) => level * 2.5,
  },
  {
    id: 'excavation',
    name: 'Equipe de Escavação',
    description: 'Aumenta chance de gemas automáticas',
    category: 'automation' as const,
    baseCost: 500,
    costCurrency: 'stones' as const,
    effect: (level: number) => level * 0.02,
  },
  // Categoria: Processamento (Lapidação)
  {
    id: 'watermill',
    name: 'Rebolo de Água',
    description: 'Aumenta velocidade de lapidação',
    category: 'processing' as const,
    baseCost: 20,
    costCurrency: 'gems' as const,
    effect: (level: number) => level * 0.1,
  },
  {
    id: 'autolapidary',
    name: 'Lapidador Automático',
    description: 'Processa gemas brutas automaticamente',
    category: 'processing' as const,
    baseCost: 50,
    costCurrency: 'gems' as const,
    effect: (level: number) => level * 1,
  },
  {
    id: 'polish',
    name: 'Polimento de Luxo',
    description: 'Aumenta valor de venda das gemas',
    category: 'processing' as const,
    baseCost: 100,
    costCurrency: 'gems' as const,
    effect: (level: number) => level * 0.05,
  },
  // Categoria: Industrial & Comercial
  {
    id: 'market',
    name: 'Mercado de Gemas',
    description: 'Vende gemas automaticamente',
    category: 'industrial' as const,
    baseCost: 200,
    costCurrency: 'gems' as const,
    effect: (level: number) => level * 1,
  },
  {
    id: 'refinery',
    name: 'Refinaria Industrial',
    description: 'Chance de duplicar gemas',
    category: 'industrial' as const,
    baseCost: 500,
    costCurrency: 'gems' as const,
    effect: (level: number) => level * 0.02,
  },
  {
    id: 'contracts',
    name: 'Contratos de Exportação',
    description: 'Bônus passivo de dinheiro',
    category: 'industrial' as const,
    baseCost: 1000,
    costCurrency: 'money' as const,
    effect: (level: number) => level * 10,
  },
];

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>(() => {
    const saved = localStorage.getItem('gemTycoonState');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // Fallback to initial state if parsing fails
      }
    }

    const upgrades: Record<string, Upgrade> = {};
    UPGRADES_CONFIG.forEach((config) => {
      upgrades[config.id] = {
        ...config,
        level: 0,
        maxLevel: 12,
      };
    });

    return {
      stones: 0,
      gems: 0,
      money: 0,
      totalGemsFound: 0,
      clickPower: 1,
      autoMinersPerSecond: 0,
      upgrades,
      lastUpdateTime: Date.now(),
    };
  });

  // Salvar estado no localStorage
  useEffect(() => {
    localStorage.setItem('gemTycoonState', JSON.stringify(gameState));
  }, [gameState]);

  const mine = useCallback((clickCount: number = 1) => {
    setGameState((prev) => {
      const basePower = prev.clickPower * clickCount;
      const critChance = Math.min(0.5, prev.upgrades.magnifier.level * 0.01);
      const critMultiplier = Math.random() < critChance ? 2 : 1;
      const stonesToAdd = basePower * critMultiplier;

      // Chance de encontrar gema bruta (1% base + bônus de upgrades)
      const gemChance = 0.01 + prev.upgrades.magnifier.level * 0.005;
      const gemsToAdd = Math.random() < gemChance ? 1 : 0;

      return {
        ...prev,
        stones: prev.stones + stonesToAdd,
        gems: prev.gems + gemsToAdd,
        totalGemsFound: prev.totalGemsFound + gemsToAdd,
      };
    });
  }, []);

  const buyUpgrade = useCallback((upgradeId: string) => {
    setGameState((prev) => {
      const upgrade = prev.upgrades[upgradeId];
      if (!upgrade || upgrade.level >= upgrade.maxLevel) return prev;

      const nextLevel = upgrade.level + 1;
      const cost = Math.floor(upgrade.baseCost * Math.pow(1.5, upgrade.level));

      // Verificar se tem recursos suficientes
      if (upgrade.costCurrency === 'stones' && prev.stones < cost) return prev;
      if (upgrade.costCurrency === 'gems' && prev.gems < cost) return prev;
      if (upgrade.costCurrency === 'money' && prev.money < cost) return prev;

      const newState = { ...prev };

      // Deduzir custo
      if (upgrade.costCurrency === 'stones') {
        newState.stones -= cost;
      } else if (upgrade.costCurrency === 'gems') {
        newState.gems -= cost;
      } else if (upgrade.costCurrency === 'money') {
        newState.money -= cost;
      }

      // Atualizar upgrade
      newState.upgrades[upgradeId] = {
        ...upgrade,
        level: nextLevel,
      };

      // Aplicar efeitos do upgrade
      if (upgradeId === 'pickaxe') {
        newState.clickPower += 1;
      } else if (upgradeId === 'apprentice') {
        newState.autoMinersPerSecond += 1;
      } else if (upgradeId === 'drill') {
        newState.autoMinersPerSecond += 2.5;
      }

      return newState;
    });
  }, []);

  const autoTick = useCallback((deltaTime: number) => {
    setGameState((prev) => {
      const deltaSeconds = deltaTime / 1000;
      const autoMinedStones = prev.autoMinersPerSecond * deltaSeconds;

      // Chance de gema na mineração automática
      const autoGemChance = 0.005 + prev.upgrades.excavation.level * 0.002;
      const autoGemsToAdd = Math.random() < autoGemChance ? Math.floor(autoMinedStones / 100) : 0;

      // Lapidação automática
      let lapidatedGems = 0;
      if (prev.upgrades.autolapidary.level > 0 && prev.stones >= 1) {
        const lapidationRate = prev.upgrades.autolapidary.level * deltaSeconds;
        lapidatedGems = Math.min(lapidationRate * 0.2, prev.stones);
      }

      // Venda automática de gemas
      let autoMoney = 0;
      const marketLevel = prev.upgrades.market.level;
      if (marketLevel > 0) {
        const gemsToSell = prev.gems * 0.01 * marketLevel * deltaSeconds;
        autoMoney = gemsToSell * 100;
      }

      // Bônus passivo de dinheiro
      const contractsBonus = prev.upgrades.contracts.level * prev.totalGemsFound * 0.001 * deltaSeconds;

      return {
        ...prev,
        stones: Math.max(0, prev.stones + autoMinedStones - lapidatedGems),
        gems: prev.gems + autoGemsToAdd + lapidatedGems,
        money: prev.money + autoMoney + contractsBonus,
      };
    });
  }, []);

  return {
    gameState,
    mine,
    buyUpgrade,
    autoTick,
  };
}
