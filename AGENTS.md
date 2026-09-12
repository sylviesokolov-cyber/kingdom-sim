# Kingdom Sim — AI Development Context

## Project
Kingdom Sim is a React + TypeScript + Vite mobile-first landscape PWA: an anime medieval-fantasy life/kingdom simulation RPG set in Valenreach. Development is incremental from the existing implementation; do not replace working systems with disconnected prototypes.

## Cross-chat continuity — mandatory
This repository is the shared memory and source of truth across every AI/project chat. A new chat must be able to continue development without relying on conversation history.

At the start of every development session:
1. Read `AGENTS.md`.
2. Read `docs/GAME_BIBLE.md`.
3. Read `docs/DEVELOPMENT_PLAN.md`.
4. Read `docs/DEVELOPMENT_STATUS.md`.
5. Inspect the current `main` commit and relevant source before making changes.
6. Check the latest CI/deployment state for the exact current commit when work depends on build health.

Never assume a previous chat's claims are correct. Code and verified CI results outrank conversation memory. If documentation conflicts with implemented code, investigate and update the documentation rather than silently choosing one.

## Source of truth
- `docs/GAME_BIBLE.md` — canonical current design, presentation direction, systems, lore, and long-term gameplay target.
- `docs/DEVELOPMENT_PLAN.md` — canonical ordered roadmap from Phase 0 through Phase 14, including implementation steps, architecture direction, exit criteria, and verification gates.
- `docs/DEVELOPMENT_STATUS.md` — canonical living implementation tracker, current milestone, completed/pending work, CI state, and playtest record.
- `AGENTS.md` — mandatory rules for how any AI should work on the repository.
- Existing source code and data remain authoritative for what is actually implemented. Documentation must distinguish implemented/verified work from planned work.

## Roadmap continuity
The project follows the phases in `docs/DEVELOPMENT_PLAN.md` in order. Do not skip, reorder, or declare a phase complete without its documented exit criteria and verification gate.

Phase sequence:
- Phase 0 — Context & audit
- Phase 1 — Foundation stabilization
- Phase 2 — Simulation Core
- Phase 3 — Player life progression
- Phase 4 — Character System 2.0
- Phase 5 — Character story arcs
- Phase 6 — Faction engine
- Phase 7 — Political engine
- Phase 8 — Main story engine
- Phase 9 — Economy 2.0
- Phase 10 — Kingdom development
- Phase 11 — Crisis engine
- Phase 12 — Succession & endgame
- Phase 13 — Endings
- Phase 14 — Polish & release readiness

Each phase's detailed steps and exit criteria live in `docs/DEVELOPMENT_PLAN.md`; this file intentionally provides the continuity rule and phase index rather than duplicating the entire plan.

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
16. Do not create parallel replacement systems when an existing system can be extended.
17. Before changing shared types, state, save format, simulation rules, or navigation, inspect all known consumers and update them coherently.
18. After each meaningful milestone, update the tracker with what is implemented, what is verified, what remains, and the exact commit/CI state when known.
19. If a task is too large for one safe change, split it into explicit incremental commits and verify each meaningful step.
20. Never fabricate tests, CI results, deployment status, implemented features, or playtest results.

## Simulation architecture
The long-term target is a centralized deterministic simulation pipeline:

`day -> season -> NPC condition -> production -> supply/consumption -> market -> kingdom vitals -> unrest/prosperity/events -> player-visible consequences`

The extracted `src/engine/simulation/dailySimulation.ts` is the current foundation. Continue moving game rules out of `App.tsx` incrementally. Do not duplicate simulation rules in UI components.

## State/save architecture
The current application state is still primarily held in `App.tsx`. The target is a canonical state/action/selector structure under `src/state/`. The save system should evolve through explicit versioned migration rather than destructive resets.

## Technical baseline
- React 18 + TypeScript + Vite 5.
- Tailwind CSS 4 and lucide-react.
- PWA support is configured through Vite tooling.
- Primary UX target: landscape phone/PWA, scaling upward to larger landscape screens.
- Main gameplay state currently lives primarily in `App.tsx`, with typed models in `src/types` and data in `src/data`.
- Existing major UI systems include throne/companion interaction, kingdom, NPC management, work/jobs, market, crime, council, and bond scenes.
- Centralized daily simulation is integrated into `App.tsx`; versioned save migration foundation exists but must be verified/integrated before being treated as complete.

## Definition of done
A development task is complete only when:
1. The intended implementation exists in source.
2. Relevant state and gameplay consequences are connected.
3. The mobile landscape experience is checked where UI is affected.
4. TypeScript/lint and production build pass.
5. The exact latest commit has the relevant GitHub Actions result green.
6. Production deployment is verified when applicable.
7. `docs/DEVELOPMENT_STATUS.md` records the resulting state.

## Mandatory CI recovery loop
For every meaningful repository change:

`inspect -> change -> commit/push -> find exact-SHA Actions run -> wait/poll -> inspect jobs -> green? -> if no, inspect logs -> fix -> commit/push -> repeat`

An older green run never verifies a newer commit. A queued or in-progress run means the work is **not yet verified**. A failed run means the work is **not complete**. Continue fixing and rechecking until the relevant gate is green, or explicitly report that verification is still pending/unavailable.

## Working style for future AI sessions
Start from the repository, not from assumptions. Read this file plus the three docs in `docs/`, inspect the relevant source, determine the current phase from the status tracker, and make the smallest coherent change toward the next unchecked step. Keep all project chats aligned by committing the implementation and updating the repository's documentation after meaningful milestones.
