# Kingdom Sim — Game Bible

> Living context document. This records the current product direction, what is implemented/verified, and the long-term target. Do not treat planned systems as implemented.

## 1. Game identity

**Genre:** Anime medieval-fantasy life / kingdom simulation RPG with branching character, political, economic, and narrative systems.

**Setting:** Valenreach, a medieval-fantasy kingdom containing mountain waterworks, farmland and granaries, docks, orchards, textile districts, mines and forge facilities, religious institutions, military/security structures, noble society, refugee communities, and an underworld centered around the Catacomb Quarter.

**Core fantasy:** Begin with little social power and survive in Valenreach. Work, build wealth and reputation, form relationships, help or exploit institutions, uncover hidden conflicts, rise through the social order, gain political power, and eventually influence or control the kingdom.

## 2. Presentation direction

The game is **mobile-first and landscape-first**, designed primarily for installation and play as a PWA on phones held horizontally, while scaling to larger landscape displays.

The visual target is a premium anime gacha/VN RPG presentation:
- character illustration is the primary visual anchor
- cinematic painted medieval-fantasy backgrounds
- dark royal UI with gold accents and ornate fantasy framing
- compact premium HUD rather than desktop-dashboard chrome
- expressive character portraits and dialogue presentation
- companion-focused interaction, affection/loyalty, bonds, gifts, and retinue
- gacha-style rarity/presentation language where appropriate
- thumb-friendly landscape navigation and large tap targets

The current Throne/Home redesign follows the supplied anime-gacha reference direction: top resource HUD, left utility rail, central character stage/dialogue, encounter/matters panels, right companion profile/actions, and a compact bottom game dock.

## 3. What is demonstrably implemented

### Player progression
- Social ranks currently model: Refugee -> Peasant -> Villager -> Priest -> Knight -> Noble -> King.
- Player has level/EXP plus Might, Cunning, Authority, and Piety.
- Player has energy, health, hunger, copper, faction-style reputation values, crime bounty, inventory, businesses, deeds, completed bond scenes, and perks.
- Rank promotion consumes progression/currency and increases max energy.

### Kingdom simulation
- Kingdom stats include population, granary, clean water, public health, security, piety, treasury gold, unrest, and prosperity.
- Days advance the simulation and seasons rotate on a 30-day cycle.
- A centralized daily simulation engine now processes day advancement, player recovery, NPC condition, kingdom changes, market movement, and event selection.
- NPC condition affects production and several kingdom stats.
- Treasury receives daily gold.
- Low grain/water can increase unrest.
- Market prices fluctuate around base values.
- Random events can occur during day advancement.
- The simulation engine is intended to be deterministic/testable where practical; further economy integration remains in progress.

### Character / NPC system
NPCs have typed identity, role, district/facility, visual identity, rarity/theme, personality, health/energy/status, illness, loyalty, affection, managed resources, production, efficiency, backstory, greetings, dialogue topics, favorite gifts, and treatment requirements.

Important currently represented characters include Mira, Caren, Old Bran, Lyra, Madam Sylvie, Torvin, Elena, Valerius, and Vesper.

### Resource economy
Current resource examples include fresh spring water, grain, bread, fish, orchard fruit, clothing, iron ore, forged tools, herbs, medicine, and contraband. Resources are connected to named NPC suppliers and facilities.

### Character bonds
Bond scenes are multi-step VN-style scenes with affection thresholds, locations, scripted dialogue choices, relationship/stat effects, and rewards. Existing examples include Mira's aqueduct/grotto stories, Caren's bakery/silos stories, and Vesper's Catacomb Quarter story.

### Main UI systems
The current app exposes major areas for:
- Throne / companion interaction
- Kingdom
- NPC management
- Work / jobs
- Market
- Crime
- Council

The throne/home view includes companion art, tap-to-talk interaction, affection/loyalty, retinue switching, RPG stats, ambition/quest information, day advancement, bond readiness, audience choices, kingdom-health access, and distress routing.

### PWA / mobile UX
- Mobile-first landscape shell.
- Landscape PWA orientation retained.
- Safe-area support.
- Thumb-friendly bottom navigation.
- Compact premium HUD.
- Character-art fallback handling to reduce broken-art failures.
- Home/Throne owns the primary game dock to avoid duplicate navigation chrome.

### Save system
The app currently persists game state through browser localStorage using the key `valenreach_save_v1`, while merging saved NPC progress with current NPC art assets on load.

A versioned save migration/serialization foundation exists and is planned to become the canonical compatibility layer; its full integration and verification remain a development task.

## 4. Current story evidence

The existing data establishes a world where:
- Mira oversees the Grand Aqueduct and has a history involving the Red Drought; suspicious figures have been seen around the aqueduct.
- Caren oversees harvest/granary operations and protects refugee children; she has suffered an injury and can require medicine.
- Bran runs the harbor/fishing supply line and has rumors involving pirates plus illness concerns.
- Lyra manages forest herbs/orchards and has a rare-herb poaching thread plus a dangerous plant incident.
- Sylvie leads textiles/tailoring and has suspicious noble demand for dark silk cloaks connected to secret meetings.
- Vesper connects the player to the criminal/underworld side of Valenreach.

These threads strongly suggest a wider mystery involving shortages, smuggling, suspicious infrastructure activity, noble secrecy, and the Catacombs. The detailed final canon should be consolidated rather than assumed from isolated rumors.

## 5. Intended story direction

The long-term narrative is planned as a branching rise-from-outsider story:

1. **The Exile** — arrival, survival, identity, first allies.
2. **The Commoner** — work, citizenship/social standing, first property and community ties.
3. **The Rising Star** — businesses, faction reputation, influence, competing interests.
4. **The Shadows of Valenreach** — aqueduct, smuggling, rare herbs, pirates, noble meetings, and underworld threads converge.
5. **The Court** — nobles, church, military, guilds, scandals, alliances, blackmail, and succession politics.
6. **The Succession Crisis** — a kingdom-scale crisis forces the player to choose who/what should rule.
7. **The Throne** — the player can reach kingship through different routes.
8. **The Ruler** — endgame governance, crises, laws, development, faction management, and personalized kingdom outcomes.

This is a target narrative framework, not a claim that all chapters are already implemented.

## 6. Core gameplay loop

`Live a day -> choose work/social/political actions -> manage needs and relationships -> produce/consume resources -> kingdom changes -> events and consequences appear -> pursue character/story goals -> rise in rank and influence -> make larger decisions.`

The systemic chain we are explicitly building toward is:

`NPC condition -> facility efficiency -> production -> supply/storage -> consumption/shortage -> market price -> population/kingdom condition -> unrest/prosperity -> faction/political consequence -> player choice -> future consequence.`

Every substantial gameplay feature should connect to this loop rather than exist only as a screen or stat.

## 7. Factions planned for deeper implementation

- Commoners
- Crown
- Nobility
- Church
- Military
- Guilds
- Underworld
- Refugees

The current reputation fields and NPC data provide a starting point, but a full faction engine is not yet equivalent to this design.

## 8. Design pillars

1. **Choices matter.** Major choices should create state that later content can observe.
2. **Characters are people.** Relationships should involve trust, loyalty, conflict, goals, secrets, and memory—not only affection numbers.
3. **Numbers represent systems.** Resources, prices, health, unrest, and reputation should explain the world rather than exist as decoration.
4. **The world moves without the player.** NPC conditions, production, factions, markets, and crises should evolve each day.
5. **Multiple viable lives.** The player should be able to lean toward heroic, political, military, religious, commercial, criminal, or authoritarian outcomes.
6. **Anime/VN presentation stays central.** Character art, expressive dialogue, bond scenes, and a strong companion-focused presentation remain core to the game's identity.
7. **Mobile landscape is the primary interaction surface.** Dense systems must remain readable and playable on a phone in landscape PWA mode.

## 9. Planned ending archetypes

Potential end-state archetypes include Hero, Politician, Conqueror, Shadow, Saint, Merchant, Usurper, and combinations that produce outcomes such as Golden Age, Iron Kingdom, Holy Kingdom, Merchant Kingdom, Shadow Kingdom, Revolutionary Kingdom, Failed Kingdom, or Personal Tyranny.

These are design targets until implemented and tested.
