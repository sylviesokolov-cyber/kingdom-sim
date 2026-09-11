# Kingdom Sim — Development Plan

## Goal
Turn the current feature-rich vertical prototype into a cohesive, replayable kingdom-life RPG without throwing away its existing content or visual identity.

## Development order

### Phase 0 — Context & audit
**Status: COMPLETE (documented baseline)**
- Establish persistent AI handoff context.
- Record implemented systems separately from planned systems.
- Maintain a living status tracker.
- Map story threads, NPCs, resources, UI systems, and save state.

### Phase 1 — Foundation stabilization
**Status: NEXT**
- Run a complete code/build audit.
- Identify broken, dead, duplicated, or contradictory mechanics.
- Centralize important game-rule calculations.
- Improve save/load compatibility and add versioned migration handling.
- Add deterministic/testable simulation functions where practical.
- Fix mobile layout and interaction problems discovered during playtesting.
- Establish a clean state/action/selector direction without a premature rewrite.

**Exit criteria:** game can be played through a representative multi-day loop without obvious state corruption; build/lint are clean; saves survive code evolution.

### Phase 2 — Simulation Core
- Create a reusable daily simulation pipeline.
- NPC condition -> efficiency -> production.
- Production -> inventory/storage/supply.
- Consumption and shortages -> kingdom/population effects.
- Market supply -> price movement.
- Kingdom conditions -> unrest/prosperity/events.
- Season modifiers affect production, prices, health, and events.
- NPC recovery/sickness uses coherent rules instead of scattered mutations.

**Exit criteria:** changing one major input produces predictable downstream consequences.

### Phase 3 — Player life progression
- Hunger, health, energy and recovery become meaningful choices.
- Equipment and useful inventory categories.
- Property/housing progression.
- Businesses with costs, workers, output, and profit.
- Deeds and personal reputation.
- Rank progression tied to actual social/economic achievements rather than grind alone.

**Exit criteria:** the player has a compelling reason to decide how to spend each day.

### Phase 4 — Character System 2.0
Add deeper persistent NPC state:
- personality traits
- needs and goals
- fears
- secrets
- beliefs
- faction affiliation
- affection
- loyalty
- trust
- resentment
- NPC-to-NPC relationships
- relationship memory

NPCs should react to player actions and to changes in the kingdom.

**Exit criteria:** two NPCs can respond differently to the same player action for understandable reasons.

### Phase 5 — Character story arcs
Expand important characters into structured arcs.

Suggested arc shape:
1. introduction
2. trust building
3. personal conflict
4. secret/revelation
5. major choice
6. resolution / route split

Bond rewards should have mechanical meaning and route consequences.

**Exit criteria:** major characters have stories that can alter later gameplay, not isolated romance scenes.

### Phase 6 — Faction engine
Implement Commoners, Crown, Nobility, Church, Military, Guilds, Underworld, and Refugees as actual competing interests.

Each faction should have:
- support/opinion
- power/influence
- needs
- goals
- leaders
- relationships with other factions
- triggers and red lines

**Exit criteria:** a player action can improve one faction while damaging another, with later consequences.

### Phase 7 — Political engine
Add:
- petitions
- favors
- appointments
- decrees/laws
- taxes
- scandals
- votes/support
- alliances
- blackmail
- political promises
- betrayals
- office/position progression

**Exit criteria:** political choices form a persistent web rather than isolated buttons.

### Phase 8 — Main story engine
Move major narrative into reusable data-driven structures:

`Story -> Chapter -> Quest -> Stage -> Choice -> Consequence`

Add prerequisites and consequences based on:
- rank
- faction standing
- NPC relationships
- kingdom stats
- inventory/resources
- previous choices
- completed bonds
- player traits

**Exit criteria:** the main story can branch and later scenes can reliably detect earlier choices.

### Phase 9 — Economy 2.0
- production capacity
- workers
- consumption
- storage
- shortages/surpluses
- supply/demand pricing
- seasonal effects
- trade routes
- regional modifiers
- black-market economy
- business profitability

**Exit criteria:** the market tells a believable story about what the kingdom is experiencing.

### Phase 10 — Kingdom development
Add districts/buildings/infrastructure and development levels.

Potential investments:
- aqueducts
- farms
- roads
- markets
- walls
- hospitals
- temples
- schools
- workshops

Each should alter production, population welfare, faction power, or story availability.

### Phase 11 — Crisis engine
Introduce multi-day crises:
- famine
- plague
- war
- noble rebellion
- religious schism
- criminal uprising
- economic collapse
- assassination attempt
- refugee influx

Crisis state should evolve each day based on player and kingdom responses.

**Exit criteria:** a crisis creates a short campaign of decisions rather than a single random popup.

### Phase 12 — Succession & endgame
Build toward a major political crisis with multiple routes:
- support existing order
- reform the monarchy
- back another claimant
- seize power
- rule through a faction
- pursue a shadow/underworld route

### Phase 13 — Endings
Calculate an ending from accumulated choices, faction power, kingdom condition, relationships, and player identity.

Endings should be authored, not just a numeric score screen.

### Phase 14 — Polish & release readiness
- tutorial/onboarding
- accessibility
- responsive mobile UI
- performance
- loading states
- error recovery
- save/export/import if appropriate
- audio polish
- art consistency
- balance pass
- content QA
- regression testing
- production build/deployment check

## Architecture direction

Move incrementally toward:

```text
src/
  components/       UI only where practical
  data/             static game content
  types/            domain types
  engine/
    simulation/     day/season/NPC processing
    economy/        production/market/trade
    relationships/  relationship rules
    factions/       faction rules
    politics/       political rules
    events/         event selection/resolution
    progression/    ranks/XP/achievements
  state/
    gameState/      canonical state shape
    actions/        state transitions
    selectors/      derived state
  story/
    chapters/
    quests/
    events/
    endings/
  utils/
```

Do not perform a big-bang rewrite. Extract rules from `App.tsx` as each subsystem is touched.

## Definition of done for gameplay work
A feature is not complete merely because its UI exists. It should have:
- typed state
- a player-facing interaction
- a real state transition
- visible consequence
- persistence if intended
- compatibility with day advancement
- sensible edge-case handling
- mobile usability
- build/lint verification
- tracker update

## Immediate implementation sequence
1. Add/maintain persistent project context (this documentation).
2. Audit the current runtime and identify the real play path from a fresh save.
3. Stabilize the existing day/action/save loop.
4. Extract the daily simulation into testable engine functions.
5. Playtest the loop and fix the highest-impact friction/bugs.
6. Only then begin deeper economy/faction/story expansion.
