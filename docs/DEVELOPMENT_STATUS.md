# Kingdom Sim — Development Status

> Update this file after meaningful development. Use `[x]` only for work verified in the repository; use `[~]` for partial/foundation work; use `[ ]` for planned work. CI must be verified for the exact resulting commit before a milestone is marked complete.

## Current milestone
**Phase 2 — Simulation Core (active)**

## Product direction
- [x] Mobile-first landscape game shell
- [x] PWA landscape orientation retained
- [x] Safe-area support
- [x] Thumb-friendly bottom navigation sizing
- [x] Premium anime-gacha dark/gold visual direction
- [x] Illustration-first Throne/Home composition
- [x] Reference-inspired top HUD / left rail / dialogue / companion panel / bottom dock
- [~] Secondary gameplay screens being visually aligned to the Throne/Home design system

## Project snapshot
- [x] React + TypeScript + Vite application exists
- [x] Public GitHub repository connected and writable
- [x] Persistent AI development context added
- [x] Game design/story baseline documented
- [x] Development roadmap documented
- [~] Fresh-save end-to-end playthrough pending full runtime verification
- [x] Latest centralized day simulation integrated into `App.tsx`
- [~] Latest Phase 2 simulation/economy changes require exact CI verification before milestone completion
- [x] Character image fallback added to reduce broken-art failures
- [~] Versioned save migration/serialization foundation added; full App load/write integration remains

## Build 2 — Throne / Home
- [x] Illustration-first landscape stage
- [x] Active companion card with portrait, dialogue, stats and bond CTA
- [x] Retinue selector for switching active companions
- [x] Audience choices for rumor/report/praise interactions
- [x] Next-day command and kingdom-health quick action
- [x] Distress alert routing to NPC management
- [x] Character-art fallback handling
- [x] Duplicate legacy bottom navigation hidden on Throne/Home

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

## Phase 1 — Foundation stabilization
- [x] Pure daily simulation module extracted
- [x] Centralized daily simulation integrated into `App.tsx`
- [x] Market trend type correctness fixed
- [~] Versioned save migration/serialization foundation
- [ ] Integrate versioned migration into the active save load/write paths
- [ ] Complete fresh-save multi-day runtime playtest
- [ ] Verify all major tabs/actions from a fresh save

## Phase 2 — Simulation Core
**Status: ACTIVE**
- [x] Central daily simulation pipeline exists
- [x] NPC condition -> efficiency processing exists
- [x] Initial NPC/kingdom condition effects exist
- [~] NPC production -> explicit resource supply pipeline
- [~] Supply -> market price relationship
- [ ] Consumption model and shortages/surpluses
- [ ] Population welfare effects from resource availability
- [ ] Stronger kingdom unrest/prosperity feedback loop
- [ ] Season-specific production/price/health/event modifiers
- [ ] Focused deterministic simulation tests
- [ ] Player-visible explanations of major simulation changes

## UI consistency pass
- [x] Shared Royal Gacha secondary-screen style layer added
- [x] Secondary screens now inherit Home-screen dark/plum/gold materials
- [x] Legacy secondary bottom navigation restyled to match the Home dock
- [x] Shared modal material aligned with the Home visual language
- [x] Royal Gacha UI design-system document added
- [~] Bespoke cinematic backgrounds and compositions for each secondary screen remain
- [ ] Kingdom / Districts bespoke screen composition
- [ ] Characters / Lieutenants bespoke screen composition
- [ ] Work / Career bespoke screen composition
- [ ] Market / Bazaar bespoke screen composition
- [ ] Council / Decrees bespoke screen composition
- [ ] Intrigue / Crime bespoke screen composition
- [ ] Bond/Event/Character modal visual pass
- [ ] Landscape-phone visual regression review for every screen

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
- [ ] Fresh-save tutorial/onboarding verification
- [ ] Verify every major tab is reachable and functional from a fresh save
- [~] Complete daily simulation centralization
- [~] Reduce game-rule logic embedded in UI components
- [~] Formalize save schema versioning/migrations
- [ ] Connect production, consumption, economy, population, and kingdom stats into one coherent simulation
- [ ] Add stronger relationship dimensions beyond affection/loyalty
- [ ] Implement persistent faction behavior
- [ ] Implement political choices with persistent consequences
- [ ] Implement multi-day crises
- [ ] Implement data-driven main story chapters/quests
- [ ] Implement succession/endgame routes
- [ ] Implement authored ending states

## Current priority queue
1. **Verify the latest Phase 2 changes in GitHub Actions.** Wait for queued/in-progress runs; inspect and fix failures rather than declaring completion prematurely.
2. **Finish Phase 1 save integration and fresh-save playtest.** Preserve `valenreach_save_v1` progress while introducing deliberate migration handling.
3. **Complete Phase 2 simulation chain:** NPC condition -> production -> supply -> consumption/shortage -> market -> kingdom consequences.
4. **Continue the Royal Gacha UI consistency pass** screen-by-screen without changing gameplay behavior unnecessarily.
5. **Add season modifiers and deterministic tests.**
6. **Add player-facing simulation feedback so the player understands why prices, welfare, unrest, and prosperity change.**
7. **Then move to Phase 3 player life progression and Phase 4 Character System 2.0.**

## CI verification policy
For each meaningful development commit:
- [ ] Identify the workflow run generated by the exact latest commit.
- [ ] Wait/poll while queued or in progress.
- [ ] Inspect failed job/log output if unsuccessful.
- [ ] Push a fix if needed and repeat.
- [ ] Verify build/lint success.
- [ ] Verify deployment success when production-facing changes are involved.
- [ ] Only then mark the relevant work `[x]`.

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
- Added a shared Royal Gacha secondary-screen visual layer so Kingdom, Characters, Work, Market, Council, Crime, and modal surfaces inherit the Throne/Home dark-plum/gold material, typography, borders, shadows, and navigation language.
- Added `docs/UI_DESIGN_SYSTEM.md` as the canonical UI consistency reference for the screen-by-screen redesign.
- Began the secondary-screen visual overhaul incrementally without replacing working gameplay components.
- Updated persistent AI development rules to make mobile landscape PWA and anime-gacha presentation explicit.
- Added a hard CI verification gate: wait for the exact latest run, inspect failures, fix, and re-check before reporting completion.
- Updated the Game Bible with the current Throne/Home presentation direction and connected simulation chain.
- Updated the Development Plan with the active Phase 2 implementation sequence and verification workflow.
- Integrated the centralized daily simulation engine into `App.tsx`.
- Began Phase 2 work on connecting production, supply, market, and kingdom consequences.
