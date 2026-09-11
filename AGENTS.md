# Kingdom Sim — AI Development Context

## Project
Kingdom Sim is a React + TypeScript + Vite medieval-fantasy life/kingdom simulation RPG set in Valenreach. The project is developed incrementally from the existing implementation; do not replace working systems with disconnected prototypes.

## Source of truth
- `docs/GAME_BIBLE.md` — canonical current design/lore/context.
- `docs/DEVELOPMENT_PLAN.md` — target architecture and ordered roadmap.
- `docs/DEVELOPMENT_STATUS.md` — living implementation tracker; update it whenever meaningful work is completed.
- Existing source code and data remain authoritative for what is actually implemented. Design documents must distinguish implemented features from planned features.

## Development rules
1. Preserve the existing anime/gacha/VN presentation unless a deliberate redesign is requested.
2. Prefer incremental refactors over rewrites.
3. Before adding a feature, connect it to the core loop: player action -> character/economy consequence -> kingdom consequence -> future choice.
4. Avoid adding UI-only mechanics with no state or gameplay consequence.
5. Keep save compatibility in mind. The current save key is `valenreach_save_v1`; migrations must be deliberate.
6. Keep game rules out of large UI components when practical. New simulation logic should move toward reusable engine/state modules.
7. Characters should have meaningful motivations, relationships, secrets, and consequences rather than functioning only as resource buttons.
8. Choices should matter and preferably affect later events, relationships, factions, economy, or story.
9. Every substantial change should be checked for TypeScript/build correctness and mobile usability.
10. Update `docs/DEVELOPMENT_STATUS.md` after completing a milestone or discovering a material gap.

## Current technical baseline
- React 18 + TypeScript + Vite 5.
- Tailwind CSS 4 and lucide-react.
- PWA support is configured through Vite tooling.
- Main gameplay state currently lives primarily in `App.tsx`, with typed models in `src/types` and data in `src/data`.
- Existing major UI systems include throne/companion interaction, kingdom, NPC management, work/jobs, market, crime, and council.

## Working style for future AI sessions
Start by reading this file plus the three docs in `docs/`. Then inspect the relevant source files before changing them. Treat the tracker as a handoff document, not as proof that a feature works: verify implementation in code.
