# Kingdom Sim — Development Status

> Update this file after meaningful development. Use `[x]` only for work verified in the repository; use `[~]` for partial/foundation work; use `[ ]` for planned work.

## Current milestone
**Foundation / Playtest & Stabilization**

## Project snapshot
- [x] React + TypeScript + Vite application exists
- [x] Private GitHub repository connected and writable
- [x] Persistent AI development context added
- [x] Game design/story baseline documented
- [x] Development roadmap documented
- [ ] Fresh-save end-to-end playthrough verified by current development environment
- [ ] Automated build/lint status verified after latest repository changes

## Existing gameplay systems
- [x] Player social rank progression model
- [x] Player RPG stats: Might / Cunning / Authority / Piety
- [x] Player energy / health / hunger
- [x] Player currency, inventory, businesses, deeds, perks fields
- [x] Faction-style reputation fields
- [x] Kingdom vitals and prosperity/unrest model
- [x] Day advancement
- [x] Four-season cycle
- [x] NPC health/status/illness/efficiency
- [x] NPC resource production
- [x] Work/job opportunities
- [x] Market buy/sell and fluctuating prices
- [x] NPC treatment/medicine interaction
- [x] Random event framework
- [x] Companion/throne screen
- [x] NPC management screen
- [x] Kingdom screen
- [x] Work screen
- [x] Market screen
- [x] Crime screen
- [x] Council screen
- [x] Bond scene framework
- [x] Browser localStorage save/load

## Existing content
- [x] Valenreach setting
- [x] Water / aqueduct supply line
- [x] Grain / farm / granary supply line
- [x] Bread / bakery resource
- [x] Fish / harbor supply line
- [x] Fruit / orchard supply line
- [x] Clothing / textile supply line
- [x] Iron ore / mine supply line
- [x] Forged tools / forge supply line
- [x] Herbs / forest supply line
- [x] Medicine / herbarium supply line
- [x] Contraband / catacomb supply line
- [x] Multiple named NPCs with backstories and dialogue
- [x] Multiple character bond episodes
- [~] Larger mystery threads exist but are not yet unified into a complete main-story campaign

## Major gaps to resolve
- [ ] Verify the exact fresh-save tutorial/onboarding path
- [ ] Verify every major tab is reachable and functional from a fresh save
- [ ] Centralize daily simulation rules
- [ ] Reduce game-rule logic embedded in UI components
- [ ] Formalize save schema versioning/migrations
- [ ] Add stronger relationship dimensions beyond affection/loyalty
- [ ] Implement persistent faction behavior
- [ ] Implement political choices with persistent consequences
- [ ] Connect NPC production, economy, population, and kingdom stats into one coherent simulation
- [ ] Implement multi-day crises
- [ ] Implement data-driven main story chapters/quests
- [ ] Implement succession/endgame routes
- [ ] Implement authored ending states

## Current priority queue
1. **Play the existing game from a fresh save.** Record every screen, action, error, confusing interaction, and unreachable feature.
2. **Build/lint verification.** Fix compile/type errors before deeper feature work.
3. **Gameplay loop stabilization.** Ensure day advancement, jobs, market, NPC condition, events, relationships, and saving behave consistently.
4. **Simulation extraction.** Move daily rules into testable engine functions.
5. **Player-facing onboarding.** Make the first several in-game days understandable and purposeful.

## Playtest log

### Fresh-save test
**Date:** 2026-09-12
**Status:** Pending runtime access / execution test.

Record:
- Starting screen:
- First available actions:
- First story/event:
- First job:
- First NPC interaction:
- First market action:
- First day advancement:
- First bond scene:
- First promotion:
- Save/reload behavior:
- Bugs:
- UX friction:
- Balance issues:

## Change log

### 2026-09-12
- Added `AGENTS.md` with persistent AI development rules and source-of-truth guidance.
- Added `docs/GAME_BIBLE.md` with implemented-feature baseline and target narrative/design context.
- Added `docs/DEVELOPMENT_PLAN.md` with ordered roadmap and definition of done.
- Added this living development tracker.
