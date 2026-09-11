import React, { useState, useEffect } from 'react';
import { 
  PlayerState, 
  KingdomStats, 
  NpcCharacter, 
  JobOpportunity, 
  GameEvent, 
  GameEventChoice, 
  Season,
  SocialRank,
  MarketPrice,
  BondScene
} from './types/game';
import { 
  INITIAL_PLAYER, 
  INITIAL_KINGDOM_STATS, 
  INITIAL_NPCS, 
  RESOURCES, 
  JOB_OPPORTUNITIES, 
  RANDOM_EVENTS, 
  INITIAL_MARKET_PRICES,
  RANK_LADDER
} from './data/initialData';
import { sound } from './utils/audio';
import { HeaderHUD } from './components/HeaderHUD';
import { KingdomDistrictView } from './components/KingdomDistrictView';
import { NpcManagementView } from './components/NpcManagementView';
import { CareerWorkView } from './components/CareerWorkView';
import { MarketTradeView } from './components/MarketTradeView';
import { CrimeIntrigueView } from './components/CrimeIntrigueView';
import { CouncilDecreeView } from './components/CouncilDecreeView';
import { EventModal } from './components/EventModal';
import { NpcDetailModal } from './components/NpcDetailModal';
import { KingdomVitalsModal } from './components/KingdomVitalsModal';
import { RankPromotionModal } from './components/RankPromotionModal';
import { GachaThroneStage } from './components/GachaThroneStage';
import { AndroidInstallModal } from './components/AndroidInstallModal';
import { BondSceneModal } from './components/BondSceneModal';
import { 
  Building2, 
  Users, 
  Briefcase, 
  ShoppingBag, 
  Skull, 
  Crown, 
  Maximize2, 
  Minimize2,
  Sparkles,
  RotateCcw,
  Home,
  Scroll
} from 'lucide-react';

const STORAGE_KEY = 'valenreach_save_v1';

export default function App() {
  // Game State
  const [day, setDay] = useState<number>(1);
  const [season, setSeason] = useState<Season>('Spring');
  const [player, setPlayer] = useState<PlayerState>(INITIAL_PLAYER);
  const [kingdom, setKingdom] = useState<KingdomStats>(INITIAL_KINGDOM_STATS);
  const [npcs, setNpcs] = useState<NpcCharacter[]>(INITIAL_NPCS);
  const [marketPrices, setMarketPrices] = useState<MarketPrice[]>(INITIAL_MARKET_PRICES);

  // UI Navigation (Gacha Style)
  const [currentTab, setCurrentTab] = useState<'throne' | 'kingdom' | 'npcs' | 'work' | 'market' | 'crime' | 'council'>('throne');
  const [activeCompanionId, setActiveCompanionId] = useState<string>('vesper');
  const [isFullScreen, setIsFullScreen] = useState<boolean>(true);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(false);

  // Modals
  const [selectedNpc, setSelectedNpc] = useState<NpcCharacter | null>(null);
  const [activeEvent, setActiveEvent] = useState<GameEvent | null>(null);
  const [activeBondScene, setActiveBondScene] = useState<BondScene | null>(null);
  const [showVitalsModal, setShowVitalsModal] = useState<boolean>(false);
  const [showRankModal, setShowRankModal] = useState<boolean>(false);
  const [showAndroidModal, setShowAndroidModal] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Show quick toast notification
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Load from LocalStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.day) setDay(parsed.day);
        if (parsed.season) setSeason(parsed.season);
        if (parsed.player) {
          setPlayer({
            ...INITIAL_PLAYER,
            ...parsed.player,
            completedBondSceneIds: parsed.player.completedBondSceneIds || [],
            activePerks: parsed.player.activePerks || [],
          });
        }
        if (parsed.kingdom) setKingdom(parsed.kingdom);
        if (parsed.npcs && Array.isArray(parsed.npcs)) {
          // Merge saved player progress with INITIAL_NPCS to ensure latest character assets & art are intact
          const mergedNpcs = INITIAL_NPCS.map((initial) => {
            const savedNpc = parsed.npcs.find((n: any) => n.id === initial.id);
            if (!savedNpc) return initial;
            return {
              ...initial,
              health: typeof savedNpc.health === 'number' ? savedNpc.health : initial.health,
              energy: typeof savedNpc.energy === 'number' ? savedNpc.energy : initial.energy,
              status: savedNpc.status || initial.status,
              loyalty: typeof savedNpc.loyalty === 'number' ? savedNpc.loyalty : initial.loyalty,
              affection: typeof savedNpc.affection === 'number' ? savedNpc.affection : initial.affection,
              portraitUrl: initial.portraitUrl,
              avatarUrl: initial.avatarUrl,
              backgroundUrl: initial.backgroundUrl,
            };
          });
          setNpcs(mergedNpcs);
        }
        if (parsed.marketPrices) setMarketPrices(parsed.marketPrices);
      }
    } catch (e) {
      console.error('Failed to load save', e);
    }
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ day, season, player, kingdom, npcs, marketPrices })
      );
    } catch (e) {
      console.error('Failed to write save', e);
    }
  }, [day, season, player, kingdom, npcs, marketPrices]);

  // Advance Day / Rest Engine
  const advanceDay = () => {
    const nextDay = day + 1;
    setDay(nextDay);

    // Seasons cycle every 30 days
    const seasons: Season[] = ['Spring', 'Summer', 'Autumn', 'Winter'];
    const seasonIndex = Math.floor((nextDay % 120) / 30);
    setSeason(seasons[seasonIndex]);

    // Player Energy & Health restoration
    setPlayer((prev) => ({
      ...prev,
      energy: Math.min(prev.maxEnergy, prev.energy + 65),
      health: Math.min(100, prev.health + 10),
      hunger: Math.min(100, prev.hunger + 15),
    }));

    // NPCs simulation & Production Line
    setNpcs((prevNpcs) =>
      prevNpcs.map((npc) => {
        let newHealth = npc.health;
        let newStatus = npc.status;
        let newModifier = npc.efficiencyModifier;

        // If sick or injured
        if (newStatus === 'Sick' || newStatus === 'Injured' || newStatus === 'Critical') {
          newHealth = Math.max(10, newHealth - 8);
          newModifier = 0.25; // 25% output
          if (newHealth < 25) newStatus = 'Critical';
        } else {
          // Healthy NPCs work at full speed
          newModifier = 1.0;
          // 5% random chance of fatigue or incident
          if (Math.random() < 0.04) {
            newStatus = 'Sick';
            newHealth = 60;
            newModifier = 0.3;
          }
        }

        return {
          ...npc,
          health: newHealth,
          status: newStatus,
          efficiencyModifier: newModifier,
        };
      })
    );

    // Kingdom Vitals update based on NPC status
    setKingdom((prev) => {
      const mira = npcs.find((n) => n.id === 'mira');
      const caren = npcs.find((n) => n.id === 'caren');
      const valerius = npcs.find((n) => n.id === 'valerius');
      const elena = npcs.find((n) => n.id === 'elena');

      // Water impact
      const waterDelta = mira && mira.status === 'Healthy' ? 4 : -8;
      // Granary impact
      const grainDelta = caren && caren.status === 'Healthy' ? 3 : -7;
      // Security impact
      const securityDelta = valerius && valerius.status === 'Healthy' ? 2 : -6;
      // Health impact
      const healthDelta = elena && elena.status === 'Healthy' ? 2 : -5;

      const newGranary = Math.max(5, Math.min(100, prev.granary + grainDelta));
      const newWater = Math.max(5, Math.min(100, prev.cleanWater + waterDelta));
      const newSecurity = Math.max(5, Math.min(100, prev.security + securityDelta));
      const newPublicHealth = Math.max(5, Math.min(100, prev.publicHealth + healthDelta));

      let newUnrest = prev.unrest;
      if (newGranary < 25 || newWater < 25) newUnrest = Math.min(100, newUnrest + 8);
      else newUnrest = Math.max(5, newUnrest - 3);

      return {
        ...prev,
        granary: newGranary,
        cleanWater: newWater,
        security: newSecurity,
        publicHealth: newPublicHealth,
        unrest: newUnrest,
        treasuryGold: prev.treasuryGold + 25,
      };
    });

    // Market Price Fluctuations
    setMarketPrices((prev) =>
      prev.map((mp) => {
        const delta = (Math.random() - 0.5) * 4;
        const newPrice = Math.max(1, Math.round(mp.basePrice + delta));
        return {
          ...mp,
          currentPrice: newPrice,
          trend: newPrice > mp.currentPrice ? 'up' : newPrice < mp.currentPrice ? 'down' : 'steady',
        };
      })
    );

    // Random Event trigger (approx every 3 days)
    if (nextDay % 3 === 0 || Math.random() < 0.35) {
      const randomEvent = RANDOM_EVENTS[Math.floor(Math.random() * RANDOM_EVENTS.length)];
      setActiveEvent(randomEvent);
      sound.playAlert();
    } else {
      showToast(`Dawn arrives on Day ${nextDay}! Energy restored.`);
    }
  };

  // Perform Job
  const handleExecuteJob = (job: JobOpportunity) => {
    if (player.energy < job.energyCost) return;

    setPlayer((prev) => {
      const newInventory = { ...prev.inventory };
      if (job.rewardItem) {
        newInventory[job.rewardItem.itemId] = (newInventory[job.rewardItem.itemId] || 0) + job.rewardItem.amount;
      }

      return {
        ...prev,
        energy: prev.energy - job.energyCost,
        copper: prev.copper + job.copperReward,
        rankProgress: prev.rankProgress + 8,
        inventory: newInventory,
      };
    });

    // Supervisor relationship increase
    if (job.supervisorNpcId) {
      setNpcs((prev) =>
        prev.map((n) =>
          n.id === job.supervisorNpcId
            ? { ...n, affection: Math.min(100, n.affection + (job.npcRelationshipBonus || 3)) }
            : n
        )
      );
    }

    // Kingdom stat impact
    setKingdom((prev) => ({
      ...prev,
      [job.kingdomImpact.statKey]: Math.min(
        100,
        (prev[job.kingdomImpact.statKey] as number) + job.kingdomImpact.delta
      ),
    }));

    showToast(`Completed "${job.title}"! Earned ${job.copperReward} Copper.`);
  };

  // Promote Social Rank
  const handlePromoteRank = () => {
    const currentRankIdx = RANK_LADDER.findIndex((r) => r.rank === player.rank);
    const nextRank = RANK_LADDER[currentRankIdx + 1];
    if (!nextRank) return;

    if (player.rankProgress >= nextRank.requiredProgress && player.copper >= nextRank.copperCost) {
      setPlayer((prev) => ({
        ...prev,
        rank: nextRank.rank,
        title: nextRank.title,
        copper: prev.copper - nextRank.copperCost,
        rankProgress: 0,
        maxEnergy: prev.maxEnergy + 15,
        energy: prev.maxEnergy + 15,
      }));

      sound.playLevelUp();
      setShowRankModal(false);
      showToast(`🎉 Elevated to ${nextRank.rank}! Station Title: "${nextRank.title}"`);
    }
  };

  // Buy Item from Bazaar
  const handleBuyItem = (itemId: string, qty: number) => {
    const mp = marketPrices.find((p) => p.resourceId === itemId);
    if (!mp) return;
    const totalCost = mp.currentPrice * qty;
    if (player.copper < totalCost) return;

    setPlayer((prev) => ({
      ...prev,
      copper: prev.copper - totalCost,
      inventory: {
        ...prev.inventory,
        [itemId]: (prev.inventory[itemId] || 0) + qty,
      },
    }));

    showToast(`Purchased ${qty} ${itemId} for ${totalCost} Copper.`);
  };

  // Sell Item at Bazaar
  const handleSellItem = (itemId: string, qty: number) => {
    const mp = marketPrices.find((p) => p.resourceId === itemId);
    if (!mp) return;
    const playerQty = player.inventory[itemId] || 0;
    if (playerQty < qty) return;

    const sellPrice = Math.round(mp.currentPrice * 0.85);
    const totalEarnings = sellPrice * qty;

    setPlayer((prev) => ({
      ...prev,
      copper: prev.copper + totalEarnings,
      inventory: {
        ...prev.inventory,
        [itemId]: prev.inventory[itemId] - qty,
      },
    }));

    showToast(`Sold ${qty} ${itemId} for +${totalEarnings} Copper.`);
  };

  // Consume food/water/medicine
  const handleConsumeItem = (itemId: string) => {
    const playerQty = player.inventory[itemId] || 0;
    if (playerQty <= 0) return;

    setPlayer((prev) => {
      let energyBoost = 0;
      let healthBoost = 0;

      if (itemId === 'water') energyBoost = 15;
      if (itemId === 'bread') energyBoost = 35;
      if (itemId === 'fish') energyBoost = 30;
      if (itemId === 'fruits') { energyBoost = 20; healthBoost = 10; }
      if (itemId === 'medicine') healthBoost = 40;

      return {
        ...prev,
        energy: Math.min(prev.maxEnergy, prev.energy + energyBoost),
        health: Math.min(100, prev.health + healthBoost),
        inventory: {
          ...prev.inventory,
          [itemId]: prev.inventory[itemId] - 1,
        },
      };
    });

    showToast(`Consumed ${itemId}! Vitality replenished.`);
  };

  // Treat sick NPC
  const handleTreatNpc = (npcId: string, medicineType: string) => {
    const hasMed = (player.inventory[medicineType] || 0) > 0;
    if (!hasMed) return;

    // Deduct medicine
    setPlayer((prev) => ({
      ...prev,
      inventory: {
        ...prev.inventory,
        [medicineType]: prev.inventory[medicineType] - 1,
      },
      rankProgress: prev.rankProgress + 15,
    }));

    // Heal NPC
    setNpcs((prev) =>
      prev.map((n) =>
        n.id === npcId
          ? {
              ...n,
              status: 'Healthy',
              health: 100,
              efficiencyModifier: 1.0,
              loyalty: Math.min(100, n.loyalty + 25),
              affection: Math.min(100, n.affection + 20),
            }
          : n
      )
    );

    sound.playHolyChime();
    showToast(`Administered cure to ${npcId}! Facility output restored to 100%.`);
  };

  // Give Gift to NPC
  const handleGiveGift = (npcId: string, itemId: string) => {
    if ((player.inventory[itemId] || 0) <= 0) return;

    setPlayer((prev) => ({
      ...prev,
      inventory: {
        ...prev.inventory,
        [itemId]: prev.inventory[itemId] - 1,
      },
    }));

    setNpcs((prev) =>
      prev.map((n) => {
        if (n.id === npcId) {
          const isFav = n.favoriteGifts.includes(itemId);
          const boost = isFav ? 18 : 8;
          return {
            ...n,
            affection: Math.min(100, n.affection + boost),
            loyalty: Math.min(100, n.loyalty + 10),
          };
        }
        return n;
      })
    );

    showToast(`Presented ${itemId} as gift! Affection raised.`);
  };

  // Assist NPC with work shift
  const handleAssistNpc = (npcId: string) => {
    if (player.energy < 20) return;

    setPlayer((prev) => ({
      ...prev,
      energy: prev.energy - 20,
      rankProgress: prev.rankProgress + 10,
    }));

    setNpcs((prev) =>
      prev.map((n) =>
        n.id === npcId
          ? {
              ...n,
              efficiencyModifier: Math.min(1.5, n.efficiencyModifier + 0.3),
              affection: Math.min(100, n.affection + 6),
            }
          : n
      )
    );

    showToast(`Assisted shift! Facility yield boosted for today.`);
  };

  // Converse with Companion in Visual Novel Audience
  const handleConverseWithNpc = (npcId: string, choiceType: 'rumor' | 'admin' | 'praise') => {
    if (player.energy < 5) {
      showToast('Not enough energy to hold audience (requires 5 EN)');
      return;
    }

    setPlayer((prev) => {
      const expGain = 10;
      const currentStats = prev.stats || {
        level: 1,
        exp: 0,
        maxExp: 100,
        might: 14,
        cunning: 16,
        authority: 12,
        piety: 10,
      };

      let newExp = currentStats.exp + expGain;
      let newLevel = currentStats.level;
      let newMaxExp = currentStats.maxExp;
      let newMight = currentStats.might;
      let newCunning = currentStats.cunning + (choiceType === 'rumor' ? 1 : 0);
      let newAuthority = currentStats.authority + (choiceType === 'admin' ? 1 : 0);
      let newPiety = currentStats.piety;

      if (newExp >= newMaxExp) {
        newLevel += 1;
        newExp = newExp - newMaxExp;
        newMaxExp = Math.round(newMaxExp * 1.5);
        newMight += 1;
        newCunning += 1;
        newAuthority += 1;
        newPiety += 1;
        sound.playLevelUp();
        showToast(`👑 LEVEL UP! Sovereign Level ${newLevel} attained! All attributes +1.`);
      }

      return {
        ...prev,
        energy: Math.max(0, prev.energy - 5),
        stats: {
          level: newLevel,
          exp: newExp,
          maxExp: newMaxExp,
          might: newMight,
          cunning: newCunning,
          authority: newAuthority,
          piety: newPiety,
        },
      };
    });

    setNpcs((prev) =>
      prev.map((n) => {
        if (n.id !== npcId) return n;
        const affectionDelta = choiceType === 'praise' ? 5 : 2;
        const loyaltyDelta = choiceType === 'praise' ? 1 : 0;
        return {
          ...n,
          affection: Math.min(100, (n.affection || 20) + affectionDelta),
          loyalty: Math.min(100, (n.loyalty || 0) + loyaltyDelta),
        };
      })
    );
  };

  // Bond Scene System Handlers
  const handleOpenBondScene = (scene: BondScene) => {
    sound.playHolyChime();
    setActiveBondScene(scene);
  };

  const handleCompleteBondScene = (scene: BondScene, earnedAffection: number, statGains?: { stat: 'might' | 'cunning' | 'authority' | 'piety'; value: number }) => {
  const sceneId = scene.id;
  const reward = scene.reward;
  const alreadyCompleted = (player.completedBondSceneIds || []).includes(sceneId);

  if (!alreadyCompleted) {
    setPlayer((prev) => {
      const currentStats = prev.stats || { level: 1, exp: 0, maxExp: 100, might: 14, cunning: 16, authority: 12, piety: 10 };
      const newStats = { ...currentStats };
      if (statGains) newStats[statGains.stat] += statGains.value;
      return {
        ...prev,
        copper: prev.copper + (reward.copperBonus || 0),
        maxEnergy: prev.maxEnergy + (reward.maxEnergyBonus || 0),
        energy: Math.min(prev.maxEnergy + (reward.maxEnergyBonus || 0), prev.energy + (reward.maxEnergyBonus || 0)),
        stats: newStats,
        completedBondSceneIds: [...(prev.completedBondSceneIds || []), sceneId],
        activePerks: (prev.activePerks || []).includes(reward.perkId)
          ? (prev.activePerks || [])
          : [...(prev.activePerks || []), reward.perkId],
      };
    });

    if (earnedAffection > 0) {
      setNpcs((prevNpcs) => prevNpcs.map((n) =>
        n.id === activeSceneNpcId
          ? { ...n, affection: Math.min(100, (n.affection || 0) + earnedAffection) }
          : n
      ));
    }

    if (reward.statBonus) {
      setPlayer((prev) => ({
        ...prev,
        stats: {
          ...(prev.stats || { level: 1, exp: 0, maxExp: 100, might: 14, cunning: 16, authority: 12, piety: 10 }),
          [reward.statBonus!.stat]: (prev.stats?.[reward.statBonus!.stat] || 0) + reward.statBonus!.value,
        },
      }));
    }

    showToast(`✨ Covenant Bond Fulfilled! Received: ${reward.title}`);
  }
  setActiveBondScene(null);
};
  // Commit Crime
  const handleCommitCrime = (crime: {
    id: string;
    title: string;
    energyCost: number;
    successRate: number;
    copperReward: number;
    bountyRisk: number;
    description: string;
    rewardItem?: { itemId: string; amount: number };
    targetNpcId?: string;
  }) => {
    if (player.energy < crime.energyCost) return;

    const roll = Math.random() * 100;
    const isSuccess = roll <= crime.successRate;

    setPlayer((prev) => {
      const newInventory = { ...prev.inventory };
      if (isSuccess && crime.rewardItem) {
        newInventory[crime.rewardItem.itemId] =
          (newInventory[crime.rewardItem.itemId] || 0) + crime.rewardItem.amount;
      }

      return {
        ...prev,
        energy: prev.energy - crime.energyCost,
        copper: isSuccess ? prev.copper + crime.copperReward : prev.copper,
        crimeBounty: isSuccess ? prev.crimeBounty + Math.round(crime.bountyRisk * 0.5) : prev.crimeBounty + crime.bountyRisk,
        inventory: newInventory,
      };
    });

    if (isSuccess) {
      sound.playCoins();
      showToast(`Infiltration Succeeded! Gained ${crime.copperReward} Copper.`);
    } else {
      sound.playAlert();
      showToast(`Spotted by sentries! Bounty increased by +${crime.bountyRisk}.`);
    }
  };

  // Pay Bounty
  const handlePayBounty = () => {
    if (player.copper < player.crimeBounty) {
      sound.playAlert();
      alert("Not enough copper coins to bribe the bailiff!");
      return;
    }

    setPlayer((prev) => ({
      ...prev,
      copper: prev.copper - prev.crimeBounty,
      crimeBounty: 0,
    }));

    showToast("Bailiff bribed. Criminal bounty cleared!");
  };

  // Issue Royal Decree
  const handleIssueDecree = (decree: {
    id: string;
    title: string;
    costGold: number;
    statImpact: Partial<KingdomStats>;
    description: string;
  }) => {
    if (kingdom.treasuryGold < decree.costGold) return;

    setKingdom((prev) => {
      const updated = { ...prev, treasuryGold: prev.treasuryGold - decree.costGold };
      Object.entries(decree.statImpact).forEach(([key, val]) => {
        const k = key as keyof KingdomStats;
        (updated[k] as number) = Math.max(0, Math.min(100, (updated[k] as number) + (val as number)));
      });
      return updated;
    });

    showToast(`Decree Enacted: "${decree.title}"!`);
  };

  // Handle Event Choice
  const handleSelectEventChoice = (choice: GameEventChoice) => {
    // Apply Player Impacts
    setPlayer((prev) => {
      let copper = prev.copper;
      let energy = prev.energy;
      let health = prev.health;
      let bounty = prev.crimeBounty;
      const inv = { ...prev.inventory };

      if (choice.energyCost) energy -= choice.energyCost;
      if (choice.copperCost) copper -= choice.copperCost;
      if (choice.playerImpact?.copper) copper += choice.playerImpact.copper;
      if (choice.playerImpact?.energy) energy += choice.playerImpact.energy;
      if (choice.playerImpact?.health) health += choice.playerImpact.health;
      if (choice.playerImpact?.bounty) bounty += choice.playerImpact.bounty;
      if (choice.itemRequirement) {
        inv[choice.itemRequirement.itemId] = Math.max(
          0,
          (inv[choice.itemRequirement.itemId] || 0) - choice.itemRequirement.amount
        );
      }

      return {
        ...prev,
        copper: Math.max(0, copper),
        energy: Math.max(0, energy),
        health: Math.max(1, Math.min(100, health)),
        crimeBounty: bounty,
        inventory: inv,
      };
    });

    // Apply Kingdom Impacts
    if (choice.statImpact) {
      setKingdom((prev) => {
        const updated = { ...prev };
        Object.entries(choice.statImpact!).forEach(([key, val]) => {
          const k = key as keyof KingdomStats;
          (updated[k] as number) = Math.max(0, Math.min(100, (updated[k] as number) + (val as number)));
        });
        return updated;
      });
    }

    // Apply NPC Impacts
    if (choice.npcImpact) {
      setNpcs((prev) =>
        prev.map((n) => {
          if (n.id === choice.npcImpact!.npcId) {
            return {
              ...n,
              loyalty: choice.npcImpact!.loyaltyDelta ? n.loyalty + choice.npcImpact!.loyaltyDelta : n.loyalty,
              health: choice.npcImpact!.healthDelta ? Math.max(10, n.health + choice.npcImpact!.healthDelta) : n.health,
              status: choice.npcImpact!.status || n.status,
            };
          }
          return n;
        })
      );
    }

    setActiveEvent(null);
    showToast(choice.consequenceText);
  };

  // Reset Game
  const handleResetGame = () => {
    if (confirm("Reset game back to Refugee origin? All progress will be cleared.")) {
      localStorage.removeItem(STORAGE_KEY);
      setDay(1);
      setSeason('Spring');
      setPlayer(INITIAL_PLAYER);
      setKingdom(INITIAL_KINGDOM_STATS);
      setNpcs(INITIAL_NPCS);
      setMarketPrices(INITIAL_MARKET_PRICES);
      showToast("Game reset to Refugee status.");
    }
  };

  const sickNpcCount = npcs.filter(
    (n) => n.status === 'Sick' || n.status === 'Injured' || n.status === 'Critical'
  ).length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-start font-sans select-none antialiased">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-16 z-50 px-4 py-2 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-slate-950 font-black text-xs shadow-2xl animate-in slide-in-from-top-4 duration-300 border border-amber-300 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-slate-950" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Responsive Container - Widescreen Gacha Landscape Console */}
      <div
        className={`w-full flex flex-col transition-all duration-300 ${
          isFullScreen
            ? 'max-w-7xl h-[100dvh] max-h-[960px] rounded-2xl border border-amber-500/30 my-auto'
            : 'max-w-5xl min-h-screen border-x border-slate-800'
        } bg-slate-950 shadow-2xl overflow-hidden relative`}
      >
        {/* Top Header HUD (Sovereign Rank, Resources Ticker, Realm Time) */}
        <HeaderHUD
          player={player}
          kingdom={kingdom}
          day={day}
          season={season}
          onAdvanceDay={advanceDay}
          onOpenKingdomVitals={() => setShowVitalsModal(true)}
          onOpenRankModal={() => setShowRankModal(true)}
          isAudioMuted={isAudioMuted}
          onToggleMute={() => setIsAudioMuted(sound.toggleMute())}
          activeSickNpcCount={sickNpcCount}
          isFullScreen={isFullScreen}
          onToggleFullScreen={() => setIsFullScreen(!isFullScreen)}
          onResetGame={handleResetGame}
          onOpenAndroidModal={() => setShowAndroidModal(true)}
        />

        {/* View Content Body: Center Action & Interaction Focus */}
        <main className="flex-1 overflow-y-auto relative flex flex-col">
          {currentTab === 'throne' && (
            <GachaThroneStage
              npcs={npcs}
              activeNpcId={activeCompanionId}
              onSelectActiveNpc={(id) => setActiveCompanionId(id)}
              kingdom={kingdom}
              player={player}
              day={day}
              season={season}
              onAdvanceDay={advanceDay}
              onOpenNpcDetail={(npc) => setSelectedNpc(npc)}
              onOpenVitals={() => setShowVitalsModal(true)}
              onTreatNpc={handleTreatNpc}
              onNavigateTab={(tab) => { sound.playClick(); setCurrentTab(tab); }}
              onConverse={handleConverseWithNpc}
              onOpenBondScene={handleOpenBondScene}
            />
          )}

          {currentTab === 'kingdom' && (
            <div className="p-3">
              <KingdomDistrictView
                kingdom={kingdom}
                npcs={npcs}
                resources={RESOURCES}
                onSelectNpc={(npc) => setSelectedNpc(npc)}
              />
            </div>
          )}

          {currentTab === 'npcs' && (
            <div className="p-3">
              <NpcManagementView
                npcs={npcs}
                resources={RESOURCES}
                player={player}
                onSelectNpc={(npc) => setSelectedNpc(npc)}
                onTreatNpc={handleTreatNpc}
                onAssistNpc={handleAssistNpc}
                onOpenBondScene={handleOpenBondScene}
              />
            </div>
          )}

          {currentTab === 'work' && (
            <div className="p-3">
              <CareerWorkView
                player={player}
                jobs={JOB_OPPORTUNITIES}
                npcs={npcs}
                onExecuteJob={handleExecuteJob}
                onPromoteRank={handlePromoteRank}
              />
            </div>
          )}

          {currentTab === 'market' && (
            <div className="p-3">
              <MarketTradeView
                player={player}
                resources={RESOURCES}
                marketPrices={marketPrices}
                npcs={npcs}
                onBuyItem={handleBuyItem}
                onSellItem={handleSellItem}
                onConsumeItem={handleConsumeItem}
              />
            </div>
          )}

          {currentTab === 'crime' && (
            <div className="p-3">
              <CrimeIntrigueView
                player={player}
                npcs={npcs}
                onCommitCrime={handleCommitCrime}
                onPayBounty={handlePayBounty}
              />
            </div>
          )}

          {currentTab === 'council' && (
            <div className="p-3">
              <CouncilDecreeView
                player={player}
                kingdom={kingdom}
                npcs={npcs}
                onIssueDecree={handleIssueDecree}
              />
            </div>
          )}
        </main>

        {/* Bottom Gacha Navigation Dock */}
        <nav className="sticky bottom-0 z-30 w-full bg-slate-950/95 backdrop-blur-lg border-t border-amber-500/30 px-2 py-1.5 shadow-2xl">
          <div className="grid grid-cols-7 gap-1 sm:gap-2 text-[10px] max-w-4xl mx-auto">
            {/* Throne (Center Stage) */}
            <button
              onClick={() => { sound.playClick(); setCurrentTab('throne'); }}
              className={`flex flex-col items-center justify-center py-1 sm:py-1.5 rounded-xl transition-all duration-200 ${
                currentTab === 'throne'
                  ? 'bg-gradient-to-b from-amber-500/30 to-amber-600/20 text-amber-300 font-black border border-amber-400/60 shadow-lg shadow-amber-500/20 scale-105'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <Crown className={`w-4 h-4 mb-0.5 ${currentTab === 'throne' ? 'text-amber-400' : ''}`} />
              <span className="truncate">Throne</span>
            </button>

            {/* Districts */}
            <button
              onClick={() => { sound.playClick(); setCurrentTab('kingdom'); }}
              className={`flex flex-col items-center justify-center py-1 sm:py-1.5 rounded-xl transition-all duration-200 ${
                currentTab === 'kingdom'
                  ? 'bg-gradient-to-b from-amber-500/30 to-amber-600/20 text-amber-300 font-black border border-amber-400/60 shadow-lg shadow-amber-500/20 scale-105'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <Building2 className={`w-4 h-4 mb-0.5 ${currentTab === 'kingdom' ? 'text-amber-400' : ''}`} />
              <span className="truncate">Districts</span>
            </button>

            {/* Lieutenants */}
            <button
              onClick={() => { sound.playClick(); setCurrentTab('npcs'); }}
              className={`relative flex flex-col items-center justify-center py-1 sm:py-1.5 rounded-xl transition-all duration-200 ${
                currentTab === 'npcs'
                  ? 'bg-gradient-to-b from-amber-500/30 to-amber-600/20 text-amber-300 font-black border border-amber-400/60 shadow-lg shadow-amber-500/20 scale-105'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              {sickNpcCount > 0 && (
                <span className="absolute top-0.5 right-2 w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              )}
              <Users className={`w-4 h-4 mb-0.5 ${currentTab === 'npcs' ? 'text-amber-400' : ''}`} />
              <span className="truncate">Lieutenants</span>
            </button>

            {/* Decrees */}
            <button
              onClick={() => { sound.playClick(); setCurrentTab('council'); }}
              className={`flex flex-col items-center justify-center py-1 sm:py-1.5 rounded-xl transition-all duration-200 ${
                currentTab === 'council'
                  ? 'bg-gradient-to-b from-amber-500/30 to-amber-600/20 text-amber-300 font-black border border-amber-400/60 shadow-lg shadow-amber-500/20 scale-105'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <Scroll className={`w-4 h-4 mb-0.5 ${currentTab === 'council' ? 'text-amber-400' : ''}`} />
              <span className="truncate">Decrees</span>
            </button>

            {/* Bazaar */}
            <button
              onClick={() => { sound.playClick(); setCurrentTab('market'); }}
              className={`flex flex-col items-center justify-center py-1 sm:py-1.5 rounded-xl transition-all duration-200 ${
                currentTab === 'market'
                  ? 'bg-gradient-to-b from-amber-500/30 to-amber-600/20 text-amber-300 font-black border border-amber-400/60 shadow-lg shadow-amber-500/20 scale-105'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <ShoppingBag className={`w-4 h-4 mb-0.5 ${currentTab === 'market' ? 'text-amber-400' : ''}`} />
              <span className="truncate">Bazaar</span>
            </button>

            {/* Intrigue */}
            <button
              onClick={() => { sound.playClick(); setCurrentTab('crime'); }}
              className={`flex flex-col items-center justify-center py-1 sm:py-1.5 rounded-xl transition-all duration-200 ${
                currentTab === 'crime'
                  ? 'bg-gradient-to-b from-purple-500/30 to-purple-600/20 text-purple-300 font-black border border-purple-400/60 shadow-lg shadow-purple-500/20 scale-105'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <Skull className={`w-4 h-4 mb-0.5 ${currentTab === 'crime' ? 'text-purple-400' : ''}`} />
              <span className="truncate">Intrigue</span>
            </button>

            {/* Career */}
            <button
              onClick={() => { sound.playClick(); setCurrentTab('work'); }}
              className={`flex flex-col items-center justify-center py-1 sm:py-1.5 rounded-xl transition-all duration-200 ${
                currentTab === 'work'
                  ? 'bg-gradient-to-b from-amber-500/30 to-amber-600/20 text-amber-300 font-black border border-amber-400/60 shadow-lg shadow-amber-500/20 scale-105'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <Briefcase className={`w-4 h-4 mb-0.5 ${currentTab === 'work' ? 'text-amber-400' : ''}`} />
              <span className="truncate">Career</span>
            </button>
          </div>
        </nav>
      </div>

      {/* Modals & Dialogues */}
      {selectedNpc && (
        <NpcDetailModal
          npc={selectedNpc}
          player={player}
          resources={RESOURCES}
          onClose={() => setSelectedNpc(null)}
          onTreatNpc={handleTreatNpc}
          onGiveGift={handleGiveGift}
          onAssistNpc={handleAssistNpc}
          onOpenBondScene={(scene) => {
            setSelectedNpc(null);
            handleOpenBondScene(scene);
          }}
        />
      )}

      {/* Visual Novel Bond Scene Modal */}
      {activeBondScene && (
        <BondSceneModal
          scene={activeBondScene}
          npc={npcs.find((n) => n.id === activeBondScene.npcId) || npcs[0]}
          player={player}
          onClose={() => setActiveBondScene(null)}
          onComplete={handleCompleteBondScene}
        />
      )}

      {activeEvent && (
        <EventModal
          event={activeEvent}
          speakerNpc={npcs.find((n) => n.id === activeEvent.speakerNpcId)}
          player={player}
          onSelectChoice={handleSelectEventChoice}
        />
      )}

      {showVitalsModal && (
        <KingdomVitalsModal
          kingdom={kingdom}
          npcs={npcs}
          onClose={() => setShowVitalsModal(false)}
          onNavigateToNpc={(npc) => {
            setCurrentTab('npcs');
            setSelectedNpc(npc);
          }}
        />
      )}

      {showRankModal && (
        <RankPromotionModal
          player={player}
          onClose={() => setShowRankModal(false)}
          onPromoteRank={handlePromoteRank}
        />
      )}

      {/* Android Installation & APK Modal */}
      <AndroidInstallModal
        isOpen={showAndroidModal}
        onClose={() => setShowAndroidModal(false)}
      />
    </div>
  );
}
