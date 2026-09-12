# Kingdom Sim — AI Development Context

## Project
Kingdom Sim is a React + TypeScript + Vite mobile-first landscape PWA: an anime medieval-fantasy life/kingdom simulation RPG set in Valenreach. Development is incremental from the existing implementation; do not replace working systems with disconnected prototypes.

## Source of truth
- `docs/GAME_BIBLE.md` — canonical current design, presentation direction, systems, lore, and long-term gameplay target.
- `docs/DEVELOPMENT_PLAN.md` — ordered implementation roadmap, architecture direction, verification gates, and current priorities.
- `docs/DEVELOPMENT_STATUS.md` — living implementation tracker and CI/playtest record.
- Existing source code and data remain authoritative for what is actually implemented. Documentation must distinguish implemented/verified work from planned work.

## Current product direction
1. Mobile-first, **landscape-first** PWA is the primary game format.
2. The visual target is a premium anime gacha/VN RPG presentation rather than a generic dashboard.
3. The Throne/Home screen should remain illustration-first, with the character and world art as the visual focus.
4. The reference anime-gacha UI direction is the baseline for HUD, side rail, dialogue, companion card, banners, and bottom navigation.
5. The existing Valenreach simulation, NPCs, resources, jobs, bonds, events, and story content should be expanded rather than discarded.

## Development rules
1. Preserve the existing anime/gacha/VN presentation unless a deliberate redesign is requested.
2. Prefer incremental refactors over rewrites.
3. Before adding a feature, connect it to the core loop: player action -> character/economy consequence -> kingdom consequence -> future choice.
4. Avoid UI-only mechanics with no state or gameplay consequence.
5. Keep save compatibility in mind. The current save key is `valenreach_save_v1`; migrations must be deliberate and must preserve existing progress and current art assets.
6. Keep game rules out of large UI components when practical. New simulation logic should move toward reusable engine/state modules.
7. Characters should have meaningful motivations, relationships, secrets, and consequences rather than functioning only as resource buttons.
8. Choices should matter and preferably affect later events, relationships, factions, economy, or story.
9. Every substantial change must be checked for TypeScript/build correctness and mobile usability.
10. Update `docs/DEVELOPMENT_STATUS.md` after meaningful work and only mark work `[x]` when it has been verified.
11. Do not report a change as complete merely because code was committed. Verify the relevant GitHub Actions run after the change.
12. If CI is queued or in progress, wait/poll before reporting completion.
13. If CI fails, inspect the failing job/logs, fix the cause, push the fix, and re-check CI until the relevant build/deployment is green.
14. Prefer verifying the exact latest commit or its resulting deployment, not an older successful run.
15. Keep changes small enough that failures can be isolated and corrected safely.

## Simulation architecture
The long-term target is a centralized deterministic simulation pipeline:

`day -> season -> NPC condition -> production -> supply/consumption -> market -> kingdom vitals -> unrest/prosperity/events -> player-visible consequences`

The extracted `src/engine/simulation/dailySimulation.ts` is the current foundation. Continue moving game rules out of `App.tsx` incrementally. Do not duplicate simulation rules in UI components.

## State/save architecture
The current application state is still primarily held in `App.tsx`. The target is a canonical state/action/selector structure under `src/state/`. The save system should evolve through explicit versioned migration rather than destructive resets.

## Current technical baseline
- React 18 + TypeScript + Vite 5.
- Tailwind CSS 4 and lucide-react.
- PWA support is configured through Vite tooling.
- Primary UX target: landscape phone/PWA, scaling upward to larger landscape screens.
- Main gameplay state currently lives primarily in `App.tsx`, with typed models in `src/types` and data in `src/data`.
- Existing major UI systems include throne/companion interaction, kingdom, NPC management, work/jobs, market, crime, council, and bond scenes.
- Centralized daily simulation is now integrated into `App.tsx`; versioned save migration foundation exists but must be verified/integrated before being treated as complete.

## Working style for future AI sessions
Start by reading this file plus the three docs in `docs/`. Then inspect the relevant source files before changing them. Treat the tracker as a handoff document, not as proof that a feature works: verify implementation in code and verify the latest CI result before calling work complete.
