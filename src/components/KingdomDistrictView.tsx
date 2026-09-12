import React, { useState } from 'react';
import { KingdomStats, NpcCharacter, ResourceItem } from '../types/game';
import { AnimeAvatar } from './AnimeAvatar';
import { sound } from '../utils/audio';
import {
  Building2,
  Droplets,
  Wheat,
  Fish,
  Apple,
  Hammer,
  Sparkles,
  Shield,
  Coins,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  HeartPulse,
  ChevronRight,
  Map,
  Crown,
  Landmark,
  Users,
} from 'lucide-react';

interface KingdomDistrictViewProps {
  kingdom: KingdomStats;
  npcs: NpcCharacter[];
  resources: Record<string, ResourceItem>;
  onSelectNpc: (npc: NpcCharacter) => void;
}

const DISTRICT_BACKDROP =
  'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1800&q=82';

export const KingdomDistrictView: React.FC<KingdomDistrictViewProps> = ({
  kingdom,
  npcs,
  resources,
  onSelectNpc,
}) => {
  const [selectedDistrict, setSelectedDistrict] = useState('farms');

  const districts = [
    {
      id: 'aqueduct',
      name: 'Upper Mountain Springs',
      shortName: 'Aqueduct',
      subtitle: 'The Grand Aqueduct',
      npcId: 'mira',
      managedResource: 'water',
      icon: Droplets,
      description: 'Ancient stone viaducts channel glacial runoff into the royal cisterns.',
      impact: 'Drinking water & sanitation',
      outputRate: '120 jugs / day',
    },
    {
      id: 'farms',
      name: 'Sunmill Farmlands',
      shortName: 'Farmlands',
      subtitle: 'Golden Fields & Silos',
      npcId: 'caren',
      managedResource: 'grain',
      icon: Wheat,
      description: 'Amber wheat and barley fields feed the city and fill the Royal Granary.',
      impact: 'Food security & bread',
      outputRate: '95 sacks / day',
    },
    {
      id: 'docks',
      name: 'Whistling Docks',
      shortName: 'Docks',
      subtitle: 'River Harbor & Basin',
      npcId: 'bran',
      managedResource: 'fish',
      icon: Fish,
      description: 'River cutters bring silver trout from the basin to the city markets.',
      impact: 'Protein & trade supply',
      outputRate: '75 crates / day',
    },
    {
      id: 'orchards',
      name: 'Suncrest Orchards',
      shortName: 'Orchards',
      subtitle: 'Royal Greenhouses & Glades',
      npcId: 'lyra',
      managedResource: 'fruits',
      icon: Apple,
      description: 'Terraced groves and woodland herbs provide food and alchemical ingredients.',
      impact: 'Nutrition & medicines',
      outputRate: '60 baskets / day',
    },
    {
      id: 'forge',
      name: 'The Artisan Quarter',
      shortName: 'Forge',
      subtitle: 'The Great Molten Forge',
      npcId: 'torvin',
      managedResource: 'tools',
      icon: Hammer,
      description: 'Mountain iron is turned into tools, weapons and equipment for Valenreach.',
      impact: 'Farming & garrison output',
      outputRate: '35 sets / day',
    },
    {
      id: 'herbarium',
      name: 'Cathedral Courtyard',
      shortName: 'Herbarium',
      subtitle: 'Royal Herbarium & Lab',
      npcId: 'elena',
      managedResource: 'medicine',
      icon: Sparkles,
      description: 'Rare herbs are refined into tinctures used to treat citizens and officials.',
      impact: 'Public health & recovery',
      outputRate: '30 vials / day',
    },
    {
      id: 'citadel',
      name: 'High Citadel Garrison',
      shortName: 'Citadel',
      subtitle: 'The Iron Bastion',
      npcId: 'valerius',
      managedResource: 'security',
      icon: Shield,
      description: 'Fortress towers guard the mountain passes and keep trade routes secure.',
      impact: 'Order & defence',
      outputRate: '+50 patrol strength',
    },
    {
      id: 'bazaar',
      name: 'The Grand Bazaar',
      shortName: 'Bazaar',
      subtitle: 'Merchant Exchange',
      npcId: 'silas',
      managedResource: 'prosperity',
      icon: Coins,
      description: 'Caravans from distant realms exchange luxury goods, timber and coin.',
      impact: 'Treasury & prosperity',
      outputRate: '+80 gold revenue',
    },
  ];

  const selected = districts.find((district) => district.id === selectedDistrict) || districts[0];
  const overseer = npcs.find((npc) => npc.id === selected.npcId);
  const isDistressed = Boolean(
    overseer && ['Sick', 'Injured', 'Critical'].includes(overseer.status)
  );
  const SelectedIcon = selected.icon;

  const vitals = [
    { label: 'Granary', value: kingdom.granary, icon: Wheat },
    { label: 'Water', value: kingdom.cleanWater, icon: Droplets },
    { label: 'Health', value: kingdom.publicHealth, icon: HeartPulse },
    { label: 'Order', value: kingdom.security, icon: Shield },
    { label: 'Piety', value: kingdom.piety, icon: Sparkles },
    { label: 'Unrest', value: kingdom.unrest, icon: AlertTriangle, inverse: true },
  ];

  return (
    <section className="ks-kingdom-screen">
      <div
        className="ks-kingdom-bg"
        style={{ backgroundImage: `url(${DISTRICT_BACKDROP})` }}
        aria-hidden="true"
      />
      <div className="ks-kingdom-vignette" aria-hidden="true" />

      <div className="ks-kingdom-content">
        <div className="ks-kingdom-heading">
          <div>
            <div className="ks-eyebrow"><Crown /> ROYAL DOMAIN</div>
            <h1>Valenreach</h1>
            <p>Kingdom Districts <span>·</span> The realm moves by your command.</p>
          </div>
          <div className="ks-kingdom-summary">
            <div><Landmark /><span>Treasury</span><b>{kingdom.treasuryGold.toLocaleString()} G</b></div>
            <div><Users /><span>Population</span><b>{kingdom.population.toLocaleString()}</b></div>
          </div>
        </div>

        <div className="ks-kingdom-grid">
          <div className="ks-kingdom-vitals-panel">
            <div className="ks-section-heading">
              <div><HeartPulse /><span>Kingdom Vitals</span></div>
              <small>REALM CONDITION</small>
            </div>

            <div className="ks-vital-list">
              {vitals.map((vital) => {
                const Icon = vital.icon;
                const danger = vital.inverse ? vital.value > 50 : vital.value < 30;
                return (
                  <div className="ks-vital" key={vital.label}>
                    <div className="ks-vital-top">
                      <span><Icon /> {vital.label}</span>
                      <b className={danger ? 'danger' : ''}>{vital.value}%</b>
                    </div>
                    <div className="ks-vital-track">
                      <i className={danger ? 'danger' : ''} style={{ width: `${vital.value}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>

            <button className="ks-vitals-action" type="button">
              <span>Open full realm report</span>
              <ChevronRight />
            </button>
          </div>

          <div className="ks-district-panel">
            <div className="ks-section-heading">
              <div><Map /><span>Royal Districts</span></div>
              <small>{districts.length} ACTIVE</small>
            </div>

            <div className="ks-district-strip">
              {districts.map((district) => {
                const Icon = district.icon;
                const manager = npcs.find((npc) => npc.id === district.npcId);
                const distressed = Boolean(manager && ['Sick', 'Injured', 'Critical'].includes(manager.status));
                return (
                  <button
                    key={district.id}
                    type="button"
                    className={`ks-district-tab ${selectedDistrict === district.id ? 'selected' : ''}`}
                    onClick={() => { sound.playClick(); setSelectedDistrict(district.id); }}
                  >
                    <span className="ks-district-icon"><Icon /></span>
                    <span>{district.shortName}</span>
                    {distressed && <i />}
                  </button>
                );
              })}
            </div>

            <div className="ks-district-feature">
              <div className="ks-district-art">
                <div className="ks-art-overlay" />
                <div className="ks-district-art-copy">
                  <span>SELECTED DISTRICT</span>
                  <strong>{selected.name}</strong>
                  <small>{selected.subtitle}</small>
                </div>
              </div>

              <div className="ks-district-detail">
                <div className="ks-detail-title">
                  <div>
                    <SelectedIcon />
                    <span>{selected.impact}</span>
                  </div>
                  <b className={isDistressed ? 'danger' : ''}>
                    {isDistressed ? 'SUPPLY DISRUPTED' : selected.outputRate}
                  </b>
                </div>
                <p>{selected.description}</p>

                <div className="ks-detail-stats">
                  <div><span>Overseer</span><b>{overseer?.name || 'Unassigned'}</b></div>
                  <div><span>Condition</span><b className={isDistressed ? 'danger' : ''}>{overseer?.status || 'Operational'}</b></div>
                  <div><span>Resource</span><b>{selected.managedResource}</b></div>
                </div>

                {overseer && (
                  <button
                    className="ks-overseer-card"
                    type="button"
                    onClick={() => { sound.playClick(); onSelectNpc(overseer); }}
                  >
                    <AnimeAvatar
                      seed={overseer.avatarSeed}
                      name={overseer.name}
                      avatarUrl={overseer.avatarUrl}
                      portraitUrl={overseer.portraitUrl}
                      backgroundUrl={overseer.backgroundUrl}
                      status={overseer.status}
                      size="sm"
                    />
                    <span><b>{overseer.name}</b><small>{overseer.role}</small></span>
                    <ChevronRight />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="ks-supply-panel">
          <div className="ks-section-heading">
            <div><TrendingUp /><span>Living Supply Chains</span></div>
            <small>PRODUCTION → DISTRIBUTION → WELFARE</small>
          </div>
          <div className="ks-supply-chain">
            <span><Droplets /> Aqueduct <b>Mira</b></span>
            <ArrowRight />
            <span><Wheat /> Farmlands <b>Caren</b></span>
            <ArrowRight />
            <strong>Granary & Bread</strong>
            <ArrowRight />
            <em>Citizen welfare</em>
          </div>
          <div className="ks-supply-chain">
            <span><Hammer /> Forge <b>Torvin</b></span>
            <ArrowRight />
            <strong>Tools & Armaments</strong>
            <ArrowRight />
            <span><Shield /> Citadel <b>Valerius</b></span>
            <ArrowRight />
            <em>Kingdom order</em>
          </div>
        </div>
      </div>
    </section>
  );
};
