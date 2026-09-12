# Kingdom Sim — Royal Gacha UI System

## Purpose

The Throne/Home screen is the visual source of truth for every gameplay screen. Secondary screens must feel like another room of the same premium anime medieval-fantasy RPG, not a separate dashboard application.

## Visual source of truth

- Dark royal cinematic surfaces: near-black, plum, wine, charcoal.
- Gold/ivory typography and thin gold framing.
- Rose/pink is the relationship/affection accent.
- Status colors may remain semantic, but they are muted rather than becoming dominant UI themes.
- Cinzel-style display typography for headings and navigation; elegant serif copy for narrative text.
- Character illustration and painted medieval-fantasy atmosphere are preferred over flat dashboard presentation.
- Panels use translucent layered materials, subtle inner highlights, soft shadows, and restrained ornament.
- Primary actions use jewel-like burgundy/gold gradients rather than generic Tailwind buttons.

## Shared shell

Every gameplay screen uses the same structural language:

1. Existing premium top HUD remains authoritative.
2. Secondary content scrolls inside the landscape gameplay stage.
3. Background is cinematic and dark enough to keep UI legible.
4. Content panels share the Home screen's gold/black/plum material.
5. Bottom navigation is the same compact premium dock as Home.
6. Modals use the same dark glass, gold border, vignette, and shadow treatment.
7. Large touch targets remain suitable for landscape phones.

## Screen map

| Screen | Visual identity | Primary content |
|---|---|---|
| Throne / Home | Character-first throne room | Active companion, dialogue, matters, retinue, next day |
| Kingdom / Districts | Valenreach realm overview | Vitals, supply chains, districts, facilities |
| Characters / Lieutenants | Character gallery | Roster, health, loyalty, affection, roles, management |
| Work / Career | Guild/work hall | Jobs, rewards, energy cost, rank progression |
| Market / Bazaar | Royal trading hall | Prices, inventory, buy/sell, market trends |
| Council / Decrees | Royal council chamber | Laws, petitions, political choices, consequences |
| Intrigue / Crime | Candlelit underworld | Bounty, suspicion, operations, risk/reward |
| Bond / Story scenes | VN cinematic stage | Character art, dialogue, choices, relationship consequences |

## Layout rules

- Landscape-first at phone dimensions.
- Avoid desktop dashboard density.
- Prefer 2–3 major visual zones over many equal cards.
- Use one dominant heading and one primary action per screen section.
- Keep important information above the fold where possible.
- Do not introduce a new navigation system for a single screen.
- Do not use bright blue/green/indigo as a screen-wide visual theme.

## Current implementation

`src/styles/royalScreens.css` is the shared visual compatibility layer for existing secondary screens. It intentionally styles the current components incrementally instead of replacing working gameplay systems. The next UI pass should progressively give each screen its own cinematic placeholder/background and bespoke composition while continuing to inherit this shared system.

## Next UI pass order

1. Kingdom / Districts
2. Characters / Lieutenants
3. Work / Career
4. Market / Bazaar
5. Council / Decrees
6. Intrigue / Crime
7. Bond/Event/Character modals

Each screen should be reviewed at approximately 1536×711 and a compact landscape-phone viewport before being considered visually aligned.
