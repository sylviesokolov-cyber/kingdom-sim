# Kingdom Sim — Development Status

> Update this file after meaningful development. Use `[x]` only for work verified in the repository; use `[~]` for partial/foundation work; use `[ ]` for planned work.

## Current milestone
**Phase 1 — Foundation Stabilization**

## Project snapshot
- [x] React + TypeScript + Vite application exists
- [x] Public GitHub repository connected and writable
- [x] Persistent AI development context added
- [x] Game design/story baseline documented
- [x] Development roadmap documented
- [~] Fresh-save end-to-end playthrough pending runtime verification
- [~] Automated build/lint status running after latest repository changes
- [x] Mobile-first landscape game shell styling added
- [x] PWA landscape orientation already configured and retained
- [x] Safe-area support added to the game shell
- [x] Thumb-friendly bottom navigation sizing added
- [x] Cinematic throne-stage visual hierarchy added
- [x] Build 2 throne/home stage redesigned around illustration-first landscape composition
- [x] Build 2 compact companion command card with portrait, dialogue, stats and bond CTA
- [x] Build 2 retinue selector for switching active companions
- [x] Build 2 audience choices for rumor/report/praise interactions
- [x] Build 2 next-day command and kingdom-health quick action
- [x] Build 2 distress alert routes to NPC management
- [x] Character image fallback added to reduce broken-art failures
- [~] Pure daily simulation engine extracted; App integration remains
- [~] Versioned save migration/serialization foundation added; App integration remains

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
- [~] Centralize daily simulation rules
- [~] Reduce game-rule logic embedded in UI components
- [~] Formalize save schema versioning/migrations
- [ ] Add stronger relationship dimensions beyond affection/loyalty
- [ ] Implement persistent faction behavior
- [ ] Implement political choices with persistent consequences
- [ ] Connect NPC production, economy, population, and kingdom stats into one coherent simulation
- [ ] Implement multi-day crises
- [ ] Implement data-driven main story chapters/quests
- [ ] Implement succession/endgame routes
- [ ] Implement authored ending states

## Current priority queue
1. **Complete Phase 1 audit and playtest.** Record every screen, action, error, confusing interaction, and unreachable feature.
2. **Build/lint verification.** Fix compile/type errors before deeper feature work.
3. **Integrate the extracted daily simulation engine into the existing App state transitions.**
4. **Integrate versioned save migration into load/write paths without losing existing saves.**
5. **Fix highest-impact loop issues, especially day/season/NPC/economy consistency.**
6. **Then begin Phase 2 — Simulation Core and expand the Character Roster/Profile visual pass.**

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
- Added the first mobile-first landscape UI foundation: cinematic game shell, compact HUD treatment, right-side companion panel treatment, thumb-friendly bottom dock, safe-area handling, and portrait fallback.
- Added Build 2 Throne/Home: illustration-first landscape stage, active companion card, dialogue/audience choices, RPG stat strip, bond-ready CTA, retinue selector, next-day control, kingdom-health shortcut, distress alert, and character-art fallback handling.
- Started Phase 1 foundation stabilization with a pure daily simulation module and versioned save migration/serialization module, preserving the existing App/UI while preparing incremental integration.
