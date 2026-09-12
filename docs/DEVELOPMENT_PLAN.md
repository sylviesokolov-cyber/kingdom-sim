# Kingdom Sim — Development Plan

## Goal
Turn the current feature-rich vertical prototype into a cohesive, replayable, mobile-first landscape kingdom-life RPG without throwing away its existing content, simulation foundation, or anime/gacha/VN visual identity.

## Product priorities
1. **Mobile landscape PWA first.** The primary target is a phone installed as a PWA and played horizontally; larger landscape screens are secondary scaling targets.
2. **Anime gacha/VN presentation.** Character art, cinematic backgrounds, dialogue, companion cards, bonds, rarity language, and premium dark/gold UI remain central.
3. **Systems before decoration.** Every new gameplay screen/action must have typed state, a real state transition, visible consequence, persistence where appropriate, and interaction with the day loop.
4. **Incremental development.** Extract and improve the existing implementation rather than performing a big-bang rewrite.
5. **Verification gate.** A change is not complete when code is merely committed. The exact resulting CI/build/deployment must be checked; failures must be fixed and re-checked.

## Development order

### Phase 0 — Context & audit
**Status: COMPLETE**
- Establish persistent AI handoff context.
- Record implemented systems separately from planned systems.
- Maintain a living status tracker.
- Map story threads, NPCs, resources, UI systems, and save state.

### Phase 1 — Foundation stabilization
**Status: FOUNDATION INTEGRATED; FINAL PLAYTEST/SAVE VERIFICATION REMAINS**
- Run a complete code/build audit.
- Identify broken, dead, duplicated, or contradictory mechanics.
- Centralize important game-rule calculations.
- Improve save/load compatibility and add versioned migration handling.
- Add deterministic/testable simulation functions where practical.
- Fix mobile layout and interaction problems discovered during playtesting.
- Establish a clean state/action/selector direction without a premature rewrite.
- Centralize day advancement through `src/engine/simulation/dailySimulation.ts`.

**Exit criteria:** representative multi-day loop works without obvious state corruption; build/lint are clean; saves survive code evolution; fresh-save path has been playtested.

### Phase 2 — Simulation Core
**Status: ACTIVE**
Build the kingdom as a connected living simulation.
- Reusable daily simulation pipeline.
- NPC condition -> efficiency -> production.
- Production -> inventory/storage/supply.
- Consumption and shortages -> population/kingdom effects.
- Market supply -> price movement.
- Kingdom conditions -> unrest/prosperity/events.
- Season modifiers affect production, prices, health, and events.
- NPC recovery/sickness uses coherent rules instead of scattered mutations.
- Make production and consumption visibly explain market and kingdom changes.

**Immediate Phase 2 sequence:**
1. Verify the existing centralized simulation in CI.
2. Model resource production/storage/supply changes explicitly.
3. Add consumption and shortage/surplus consequences.
4. Connect supply/demand to market pricing and supply levels.
5. Connect kingdom vitals to unrest/prosperity/event pressure.
6. Add season-specific modifiers.
7. Add focused simulation tests for important transitions.

**Exit criteria:** changing one major input produces predictable downstream consequences across at least NPC -> resource -> market/kingdom -> player-visible outcome.

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

## UI implementation direction

The primary home composition is an anime-gacha landscape screen:
- premium top HUD with player/profile, level/XP, currencies, day/season and utilities
- compact left utility rail for mail/quests/events/notices
- cinematic central character stage with the supplied background direction
- dialogue box and encounter/matters cards
- right companion profile with affection/loyalty, tags, quote, Talk/Gift/Bond actions, profile links and retinue
- compact bottom dock for major game areas
- no duplicate legacy navigation on the Throne/Home screen

Other screens should reuse the same design language and remain usable at phone landscape sizes.

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
- exact latest-commit CI verification
- deployment verification when the change affects production
- tracker update

## CI / verification workflow

For every meaningful repository change:
1. Commit/push the change.
2. Identify the GitHub Actions run generated by the latest commit.
3. If the run is queued/in progress, wait and poll it rather than reporting completion.
4. Inspect failed jobs and logs when a run fails.
5. Fix the failure and push a corrective commit.
6. Repeat verification until the relevant build/deployment is green.
7. Only then mark the work `[x]` and report it as complete.

An older green run does not count as verification for a newer commit.

## Immediate implementation sequence
1. Maintain persistent project context and verification rules.
2. Complete Phase 1 fresh-save/runtime audit and save migration integration.
3. Verify the latest centralized simulation build/deployment.
4. Finish Phase 2 simulation core: production, consumption, shortages, pricing, kingdom consequences, seasons.
5. Playtest the multi-day loop and fix the highest-impact friction/bugs.
6. Build Character System 2.0 and deeper character arcs.
7. Implement factions and political consequences.
8. Implement the data-driven main story.
9. Expand economy, kingdom development, crises, succession, and endings.
10. Polish, balance, regression-test, and release.
