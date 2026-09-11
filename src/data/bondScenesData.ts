import { BondScene, NpcCharacter } from '../types/game';

export const BOND_SCENES: BondScene[] = [
  // ==========================================
  // MIRA — THE SPRINGTENDER
  // ==========================================
  {
    id: 'mira_bond_1',
    npcId: 'mira',
    title: 'Starlight over the Aqueduct Sluice',
    episodeNumber: 1,
    requiredAffection: 20,
    synopsis: 'Meet Mira at midnight upon the high aqueduct bridge as the moon casts silvery ripples across the mountain water.',
    location: 'High Mountain Aqueduct - Midnight Sluice',
    scenicBackgroundUrl: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1200&q=80',
    reward: {
      title: 'Springtender\'s Clear Breath',
      description: 'Permanent +10 Max Energy & +1 Piety from crystal spring meditation.',
      perkId: 'mira_perk_1',
      maxEnergyBonus: 10,
      statBonus: { stat: 'piety', value: 1 },
    },
    script: [
      {
        id: 'm1_1',
        speaker: 'Narrator',
        isNarrator: true,
        text: 'The kingdom sleeps beneath an indigo veil of mountain stars. Only the ceaseless rush of pure glacial water echoes along the Romanesque stone arches of the Grand Aqueduct.',
        emotion: 'normal',
      },
      {
        id: 'm1_2',
        speaker: 'Mira',
        text: 'You shouldn\'t walk along the narrow coping stones without a lantern... The drop into the gorge is steep, traveler.',
        emotion: 'thoughtful',
      },
      {
        id: 'm1_3',
        speaker: 'Narrator',
        isNarrator: true,
        text: 'Mira wipes her mist-dampened forehead with the back of her sleeve. Her teal hair glows softly in the moonlight as she tests the tension on the brass sluice valve.',
        emotion: 'normal',
      },
      {
        id: 'm1_4',
        speaker: 'Player',
        text: 'Why are you working so late alone? The city gates closed hours ago.',
        emotion: 'normal',
        choices: [
          {
            id: 'm1_c1',
            text: '"I wanted to make sure you were safe up here in the freezing wind."',
            response: 'Mira\'s cheeks blush faintly pink against the chilly air. She looks down at the churning water.',
            affectionGain: 6,
            rpgStatGain: { stat: 'authority', value: 1 },
            reactionEmotion: 'blush',
          },
          {
            id: 'm1_c2',
            text: '"The kingdom relies on your water, but don\'t exhaust yourself."',
            response: 'Mira smiles gently, visibly moved by your consideration of her well-being.',
            affectionGain: 5,
            rpgStatGain: { stat: 'piety', value: 1 },
            reactionEmotion: 'happy',
          },
          {
            id: 'm1_c3',
            text: '"Let me take the wrench. Tell me what needs turning."',
            response: 'Mira blinks in surprise, then lets out a warm, musical laugh before placing her hands over yours.',
            affectionGain: 8,
            rpgStatGain: { stat: 'might', value: 1 },
            reactionEmotion: 'tender',
          },
        ],
      },
      {
        id: 'm1_5',
        speaker: 'Mira',
        text: 'When I was seven, my village suffered through the Red Drought. We watched cattle drop in the dirt, and the village wells turned to foul clay. I promised myself I would never let anyone in Valenreach thirst like that.',
        emotion: 'serious',
      },
      {
        id: 'm1_6',
        speaker: 'Mira',
        text: 'Sometimes the silence up here gets lonely. But tonight... with you standing beside me on the wall, the rushing stream sounds almost like a song.',
        emotion: 'tender',
      },
      {
        id: 'm1_7',
        speaker: 'Narrator',
        isNarrator: true,
        text: 'Mira reaches out, dipping a small porcelain cup into the untouched mountain runoff, offering you the pure first draught under the watch of constellations.',
        emotion: 'normal',
      },
      {
        id: 'm1_8',
        speaker: 'Mira',
        text: 'Drink with me. May our paths flow together as true as these glacial waters.',
        emotion: 'happy',
      },
    ],
  },
  {
    id: 'mira_bond_2',
    npcId: 'mira',
    title: 'The Whispering Sunken Grotto',
    episodeNumber: 2,
    requiredAffection: 45,
    synopsis: 'Mira leads you beneath the aqueduct arches into a forgotten luminescent cave holding ancient kingdom relics.',
    location: 'Sunken Spring Cavern',
    scenicBackgroundUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    reward: {
      title: 'Glacial Resonance',
      description: 'Permanent +1 Authority & +15 Max Energy.',
      perkId: 'mira_perk_2',
      maxEnergyBonus: 15,
      statBonus: { stat: 'authority', value: 1 },
    },
    script: [
      {
        id: 'm2_1',
        speaker: 'Narrator',
        isNarrator: true,
        text: 'Beneath the thundering waterfall foundations lies a secret subterranean grotto lit by bioluminescent moss clinging to basalt pillars.',
        emotion: 'normal',
      },
      {
        id: 'm2_2',
        speaker: 'Mira',
        text: 'Nobody in the Citadel knows this cavern exists. Only my grandfather and I knew the passage... and now you.',
        emotion: 'thoughtful',
      },
      {
        id: 'm2_3',
        speaker: 'Mira',
        text: 'Look into the pool. Legend says the primordial spring reflects the true heart of whoever gazes upon it.',
        emotion: 'normal',
        choices: [
          {
            id: 'm2_c1',
            text: '"I only see my reflection standing beside yours, Mira."',
            response: 'Mira\'s breath catches, her fingers softly brushing against your arm as her eyes shimmer.',
            affectionGain: 10,
            reactionEmotion: 'blush',
          },
          {
            id: 'm2_c2',
            text: '"I see the future of a flourishing realm that we will build together."',
            response: 'Mira nods proudly, feeling an unshakeable bond with your righteous ambition.',
            affectionGain: 8,
            rpgStatGain: { stat: 'authority', value: 1 },
            reactionEmotion: 'serious',
          },
        ],
      },
      {
        id: 'm2_4',
        speaker: 'Mira',
        text: 'Whatever trials await you on your climb to the sovereign throne... remember this sanctuary. Whenever the politics and bloodshed weary your heart, my waters and I will always welcome you home.',
        emotion: 'tender',
      },
    ],
  },

  // ==========================================
  // CAREN — LADY OF THE HARVEST
  // ==========================================
  {
    id: 'caren_bond_1',
    npcId: 'caren',
    title: 'The Warmth of the First Loaf',
    episodeNumber: 1,
    requiredAffection: 20,
    synopsis: 'Stay behind at the communal bakery after dusk as Caren pulls the legendary midnight sourdough from the stone hearth.',
    location: 'Sunmill Communal Bakery & Silos',
    scenicBackgroundUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80',
    reward: {
      title: 'Hearthkeeper\'s Bounty',
      description: 'Permanent +50 Copper & +1 Might from hearty communal labor.',
      perkId: 'caren_perk_1',
      copperBonus: 50,
      statBonus: { stat: 'might', value: 1 },
    },
    script: [
      {
        id: 'c1_1',
        speaker: 'Narrator',
        isNarrator: true,
        text: 'The communal bakery glows with cherry-red embers. The aroma of roasting barley, cracked wheat, and caramelized yeast fills the warm timber room.',
        emotion: 'normal',
      },
      {
        id: 'c1_2',
        speaker: 'Caren',
        text: 'Careful with that paddle! That iron peel is heavier than it looks. Here, let me show you how to slide it under the crust...',
        emotion: 'happy',
      },
      {
        id: 'c1_3',
        speaker: 'Narrator',
        isNarrator: true,
        text: 'Caren steps behind you, her hands gently clasping yours to guide the long wooden handle into the roaring brick oven. A stray streak of white flour dusts her sun-kissed cheek.',
        emotion: 'normal',
      },
      {
        id: 'c1_4',
        speaker: 'Player',
        text: 'Your hands are remarkably warm despite the autumn chill outside.',
        emotion: 'normal',
        choices: [
          {
            id: 'c1_c1',
            text: 'Gently reach up and wipe the white flour from her cheek with your thumb.',
            response: 'Caren freezes for a heartbeat, her amber eyes widening in flustered surprise, then softening into a sweet smile.',
            affectionGain: 8,
            reactionEmotion: 'blush',
          },
          {
            id: 'c1_c2',
            text: '"You work harder than any three council nobles combined, Caren."',
            response: 'Caren chuckles proudly, dusting off her apron and offering you a warm crust.',
            affectionGain: 6,
            rpgStatGain: { stat: 'authority', value: 1 },
            reactionEmotion: 'happy',
          },
        ],
      },
      {
        id: 'c1_5',
        speaker: 'Caren',
        text: 'My mother always told me: gold coins can\'t fill an empty belly in winter. It\'s bread and honest sweat that keeps human beings alive.',
        emotion: 'serious',
      },
      {
        id: 'c1_6',
        speaker: 'Caren',
        text: 'She breaks off the steaming crust and places it into your hands. "Eat this while it\'s hot. As long as I\'m overseeing the granary, you\'ll never know hunger again, my friend."',
        emotion: 'tender',
      },
    ],
  },
  {
    id: 'caren_bond_2',
    npcId: 'caren',
    title: 'Sunset over the Golden Silos',
    episodeNumber: 2,
    requiredAffection: 45,
    synopsis: 'Climb atop the wooden silo balcony with Caren to watch the sun melt across thousands of acres of whispering wheat.',
    location: 'Sunmill High Silo Balcony',
    scenicBackgroundUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
    reward: {
      title: 'Golden Hearth Vow',
      description: 'Permanent +1 Might & +10 Max Energy.',
      perkId: 'caren_perk_2',
      maxEnergyBonus: 10,
      statBonus: { stat: 'might', value: 1 },
    },
    script: [
      {
        id: 'c2_1',
        speaker: 'Narrator',
        isNarrator: true,
        text: 'From the highest silo deck, the sea of ripe barley undulates like waves of molten gold in the evening breeze.',
        emotion: 'normal',
      },
      {
        id: 'c2_2',
        speaker: 'Caren',
        text: 'When you first arrived as a weary exile... I saw the fire in your eyes. But I also saw how tired you were from carrying the world on your shoulders.',
        emotion: 'thoughtful',
      },
      {
        id: 'c2_3',
        speaker: 'Caren',
        text: 'She leans her shoulder against yours, watching the crimson sun touch the mountain rim.',
        emotion: 'tender',
        choices: [
          {
            id: 'c2_c1',
            text: 'Put your arm around her shoulders to keep out the evening wind.',
            response: 'Caren rests her head against your chest with a content sigh, holding your hand tightly.',
            affectionGain: 12,
            reactionEmotion: 'blush',
          },
          {
            id: 'c2_c2',
            text: '"Having you beside me gives me strength to keep fighting, Caren."',
            response: 'Caren looks up with tears of joy in her eyes, smiling with deep tenderness.',
            affectionGain: 10,
            rpgStatGain: { stat: 'authority', value: 1 },
            reactionEmotion: 'tender',
          },
        ],
      },
      {
        id: 'c2_4',
        speaker: 'Caren',
        text: 'I swear to you... even if famine sweeps the continent, my silos will feed your people, and my hearth will be your sanctuary.',
        emotion: 'happy',
      },
    ],
  },

  // ==========================================
  // VESPER — THE SHADOW MIRAGE
  // ==========================================
  {
    id: 'vesper_bond_1',
    npcId: 'vesper',
    title: 'Moonlight on the Tiled Slums',
    episodeNumber: 1,
    requiredAffection: 20,
    synopsis: 'Vesper pulls you up into the twilight rooftops above the Undercity to witness how the underworld truly operates.',
    location: 'Rooftops of the Catacomb Quarter',
    scenicBackgroundUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    reward: {
      title: 'Nightshade Step',
      description: 'Permanent +1 Cunning & reduced crime bounty risk.',
      perkId: 'vesper_perk_1',
      statBonus: { stat: 'cunning', value: 1 },
    },
    script: [
      {
        id: 'v1_1',
        speaker: 'Narrator',
        isNarrator: true,
        text: 'A cold hand suddenly grabs your wrist from the chimney shadows, pulling you over the brick parapet just as a troop of city guards marches below.',
        emotion: 'normal',
      },
      {
        id: 'v1_2',
        speaker: 'Vesper',
        text: 'Shh... quiet, stray cat. Unless you fancy explaining to Valerius\'s halberdiers why you\'re creeping through my territory.',
        emotion: 'serious',
      },
      {
        id: 'v1_3',
        speaker: 'Narrator',
        isNarrator: true,
        text: 'Vesper is pressed dangerously close against you, the scent of nightshade blossoms and sweet wine lingering on her leather collar. A smirk plays across her violet lips.',
        emotion: 'normal',
      },
      {
        id: 'v1_4',
        speaker: 'Player',
        text: 'I wasn\'t hiding from the guards. I came looking for you.',
        emotion: 'normal',
        choices: [
          {
            id: 'v1_c1',
            text: '"Did you think I\'d get lost in your alleys, Vesper?"',
            response: 'Vesper chuckles, her daggers spinning effortlessly in her gloved fingers.',
            affectionGain: 7,
            rpgStatGain: { stat: 'cunning', value: 1 },
            reactionEmotion: 'happy',
          },
          {
            id: 'v1_c2',
            text: '"You\'re standing awfully close for someone who doesn\'t trust anyone."',
            response: 'Vesper raises an eyebrow, her violet eyes flashing with amused intrigue before stepping closer.',
            affectionGain: 9,
            reactionEmotion: 'blush',
          },
        ],
      },
      {
        id: 'v1_5',
        speaker: 'Vesper',
        text: 'In the Undercity, trust is a coin that buys you a knife between the ribs. But you... you\'re different. You don\'t look at me like an outlaw, and you don\'t pretend to be an angel either.',
        emotion: 'thoughtful',
      },
      {
        id: 'v1_6',
        speaker: 'Vesper',
        text: 'She flips an antique silver coin into your palm—engraved with the two-headed viper of the Nightshade Syndicate. "Keep this. Show it in any alley in Valenreach, and my shadows will bleed for you."',
        emotion: 'tender',
      },
    ],
  },
  {
    id: 'vesper_bond_2',
    npcId: 'vesper',
    title: 'A Dagger and an Oath',
    episodeNumber: 2,
    requiredAffection: 45,
    synopsis: 'Deep in the Velvet Dagger Den, Vesper shows you her deepest childhood scar and pledges her blades to your reign.',
    location: 'The Velvet Dagger Sanctuary',
    scenicBackgroundUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
    reward: {
      title: 'Shadow Sovereign Bond',
      description: 'Permanent +2 Cunning & +50 Copper.',
      perkId: 'vesper_perk_2',
      copperBonus: 50,
      statBonus: { stat: 'cunning', value: 2 },
    },
    script: [
      {
        id: 'v2_1',
        speaker: 'Narrator',
        isNarrator: true,
        text: 'Cushions of dark velvet and tapestries of stolen silk line Vesper\'s private den. She is cleaning a venomous stiletto over a silver bowl.',
        emotion: 'normal',
      },
      {
        id: 'v2_2',
        speaker: 'Vesper',
        text: 'The High Council thinks they can buy me. Lord Moros offered five hundred gold coins yesterday for your head.',
        emotion: 'serious',
      },
      {
        id: 'v2_3',
        speaker: 'Player',
        text: 'And what did you tell his messenger?',
        emotion: 'normal',
        choices: [
          {
            id: 'v2_c1',
            text: '"I know you wouldn\'t sell me out for all the gold in the treasury."',
            response: 'Vesper smiles softly, sheathing her blade and stepping within inches of your embrace.',
            affectionGain: 12,
            reactionEmotion: 'tender',
          },
          {
            id: 'v2_c2',
            text: '"I\'d match his bounty and double it with my kingdom\'s favor."',
            response: 'Vesper laughs heartily, clapping your shoulder with genuine admiration.',
            affectionGain: 8,
            rpgStatGain: { stat: 'cunning', value: 1 },
            reactionEmotion: 'happy',
          },
        ],
      },
      {
        id: 'v2_4',
        speaker: 'Vesper',
        text: 'I sent his messenger back missing an ear with a message: "The exile belongs to the shadows, and the shadows belong to me."',
        emotion: 'blush',
      },
      {
        id: 'v2_5',
        speaker: 'Vesper',
        text: 'Take this blade, my sovereign. If anyone tries to stab you in the back, make sure they find my steel first.',
        emotion: 'happy',
      },
    ],
  },

  // ==========================================
  // ELENA — THE SAGE OF ELIXIRS
  // ==========================================
  {
    id: 'elena_bond_1',
    npcId: 'elena',
    title: 'The Midnight Distillation',
    episodeNumber: 1,
    requiredAffection: 20,
    synopsis: 'Catch an exhausted Elena before she collapses from three sleepless days of potion brewing.',
    location: 'The Royal Alchemical Herbarium',
    scenicBackgroundUrl: 'https://images.unsplash.com/photo-1514733670139-4d87a1941d55?auto=format&fit=crop&w=1200&q=80',
    reward: {
      title: 'Apothecary\'s Panacea',
      description: 'Permanent +1 Piety & +10 Max Energy from alchemical wellness.',
      perkId: 'elena_perk_1',
      maxEnergyBonus: 10,
      statBonus: { stat: 'piety', value: 1 },
    },
    script: [
      {
        id: 'e1_1',
        speaker: 'Narrator',
        isNarrator: true,
        text: 'Glass alembics hum with boiling luminescent violet liquid. Elena sways on her stool, quill slipping from her ink-stained fingers.',
        emotion: 'normal',
      },
      {
        id: 'e1_2',
        speaker: 'Narrator',
        isNarrator: true,
        text: 'Her balance gives way! A rack of volatile crystal flasks teeters on the edge of the workbench. You dive forward, catching both Elena and the flasks in one swift motion.',
        emotion: 'serious',
      },
      {
        id: 'e1_3',
        speaker: 'Elena',
        text: 'Eek! Wh-what?! Ah... it\'s you! Put me down! Wait, no, don\'t drop the dragon-root precipitate!',
        emotion: 'blush',
      },
      {
        id: 'e1_4',
        speaker: 'Player',
        text: 'You haven\'t slept in forty hours, Elena. You\'re human, not an alembic.',
        emotion: 'normal',
        choices: [
          {
            id: 'e1_c1',
            text: 'Carefully carry her to the velvet settee and wrap a warm blanket around her.',
            response: 'Elena hides her blushing face behind her oversized lab coat sleeve, her heart racing.',
            affectionGain: 9,
            reactionEmotion: 'blush',
          },
          {
            id: 'e1_c2',
            text: '"Let me watch the distillation flames while you take a short nap."',
            response: 'Elena stares with wide, sparkling magenta eyes at your unexpected gentle patience.',
            affectionGain: 8,
            rpgStatGain: { stat: 'piety', value: 1 },
            reactionEmotion: 'happy',
          },
        ],
      },
      {
        id: 'e1_5',
        speaker: 'Elena',
        text: 'Everyone in the Citadel only comes to me when they are dying or need poison for their rivals. You\'re the first person who ever checked if the alchemist herself was breathing.',
        emotion: 'tender',
      },
    ],
  },

  // ==========================================
  // BEATRIX — HIGH PRIESTESS OF SOL
  // ==========================================
  {
    id: 'beatrix_bond_1',
    npcId: 'beatrix',
    title: 'Solace Beneath the Stained Glass',
    episodeNumber: 1,
    requiredAffection: 20,
    synopsis: 'Find High Priestess Beatrix kneeling alone in prayer after dismissing the pompous cathedral bishops.',
    location: 'Cathedral of Sol - Golden Nave',
    scenicBackgroundUrl: 'https://images.unsplash.com/photo-1548625361-195fe5795df5?auto=format&fit=crop&w=1200&q=80',
    reward: {
      title: 'Dawn Mother\'s Grace',
      description: 'Permanent +1 Piety & +1 Authority.',
      perkId: 'beatrix_perk_1',
      statBonus: { stat: 'piety', value: 1 },
    },
    script: [
      {
        id: 'b1_1',
        speaker: 'Narrator',
        isNarrator: true,
        text: 'Golden evening light filters through the cathedral rose window, casting kaleidoscopic patterns of ruby and sapphire across the marble flagstones.',
        emotion: 'normal',
      },
      {
        id: 'b1_2',
        speaker: 'Narrator',
        isNarrator: true,
        text: 'Beatrix has removed her heavy gilded papal circlet. Her platinum hair cascades loosely down her shoulders as she breathes a deep, quiet sigh of exhaustion.',
        emotion: 'thoughtful',
      },
      {
        id: 'b1_3',
        speaker: 'Beatrix',
        text: 'Step forward, my child... Ah, it is you. Forgive me; I assumed it was another noble bishop demanding indulgences for his gluttony.',
        emotion: 'normal',
      },
      {
        id: 'b1_4',
        speaker: 'Player',
        text: 'You look so burdened, Your Holiness. Even the Voice of the Dawn Goddess needs rest.',
        emotion: 'normal',
        choices: [
          {
            id: 'b1_c1',
            text: 'Kneel beside her and gently take her cold hands into yours.',
            response: 'Beatrix shivers slightly at your warmth, not pulling away, her serene facade melting into profound gratitude.',
            affectionGain: 9,
            reactionEmotion: 'blush',
          },
          {
            id: 'b1_c2',
            text: '"You protect the realm\'s faith. Let me be the shield that protects you."',
            response: 'Beatrix looks at you with divine warmth in her amber eyes, whispering a sacred benediction.',
            affectionGain: 8,
            rpgStatGain: { stat: 'authority', value: 1 },
            reactionEmotion: 'tender',
          },
        ],
      },
      {
        id: 'b1_5',
        speaker: 'Beatrix',
        text: 'They call me Holy Mother, yet none see the frail woman beneath the cloth of gold. Beside you, I feel I may put aside the divine mantle, if only for an hour.',
        emotion: 'tender',
      },
    ],
  },

  // ==========================================
  // VALERIUS — THE SHIELD OF THE REALM
  // ==========================================
  {
    id: 'valerius_bond_1',
    npcId: 'valerius',
    title: 'Sparring on the High Bastion',
    episodeNumber: 1,
    requiredAffection: 20,
    synopsis: 'A fierce training duel with the Commander of the City Guard under the gathering twilight storm clouds.',
    location: 'High Bastion Combat Yard',
    scenicBackgroundUrl: 'https://images.unsplash.com/photo-1533158307587-828f0a76ef46?auto=format&fit=crop&w=1200&q=80',
    reward: {
      title: 'Bulwark Discipline',
      description: 'Permanent +1 Might & +1 Authority.',
      perkId: 'valerius_perk_1',
      statBonus: { stat: 'might', value: 1 },
    },
    script: [
      {
        id: 'va1_1',
        speaker: 'Narrator',
        isNarrator: true,
        text: 'Clash! The crack of oak training swords resonates off the stone battlements. Valerius steps back, lowering his broad wooden guard with an appreciative nod.',
        emotion: 'serious',
      },
      {
        id: 'va1_2',
        speaker: 'Valerius',
        text: 'Your footing has improved remarkably since you arrived in Valenreach. You parried my thrust with the poise of a seasoned vanguard.',
        emotion: 'normal',
      },
      {
        id: 'va1_3',
        speaker: 'Player',
        text: 'I learned from watching you hold the gate during the border raid.',
        emotion: 'normal',
        choices: [
          {
            id: 'va1_c1',
            text: '"A sovereign must be able to fight alongside their commander."',
            response: 'Valerius grins broadly—a rare sight on the grim knight\'s battle-scarred face.',
            affectionGain: 8,
            rpgStatGain: { stat: 'authority', value: 1 },
            reactionEmotion: 'happy',
          },
          {
            id: 'va1_c2',
            text: '"Next time, I won\'t stop before your wooden shield splits!"',
            response: 'Valerius barks with hearty laughter, knocking knuckles against his breastplate in respect.',
            affectionGain: 8,
            rpgStatGain: { stat: 'might', value: 1 },
            reactionEmotion: 'happy',
          },
        ],
      },
      {
        id: 'va1_4',
        speaker: 'Valerius',
        text: 'Kings and queens come and go like wind across the heath. But a sovereign who stands in the mud with their soldiers... that is someone this blade will defend to the death.',
        emotion: 'tender',
      },
    ],
  },
];

export function getBondScenesForNpc(npcId: string): BondScene[] {
  return BOND_SCENES.filter((s) => s.npcId === npcId);
}

export function getNextAvailableBondScene(npc: NpcCharacter, completedSceneIds: string[] = []): BondScene | null {
  const scenes = getBondScenesForNpc(npc.id);
  for (const scene of scenes) {
    if (!completedSceneIds.includes(scene.id) && npc.affection >= scene.requiredAffection) {
      return scene;
    }
  }
  return null;
}

export function hasAvailableBondScene(npc: NpcCharacter, completedSceneIds: string[] = []): boolean {
  return getNextAvailableBondScene(npc, completedSceneIds) !== null;
}

export function getNextLockedBondScene(npc: NpcCharacter, completedSceneIds: string[] = []): BondScene | null {
  const scenes = getBondScenesForNpc(npc.id);
  for (const scene of scenes) {
    if (!completedSceneIds.includes(scene.id)) {
      return scene;
    }
  }
  return null;
}
