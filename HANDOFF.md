# BSides RGV 2026 Website — Agent Handoff

> **Purpose of this file:** a complete, self-contained briefing so another LLM/agent can
> continue this redesign with zero prior context. Read it top to bottom before touching code.
> **Snapshot date:** 2026-05-21. **Status:** redesign built and compiling; visual QA in progress.

---

## 1. Quick orientation (read this first)

You are continuing an **aesthetic redesign** of the official website for the **7th Annual
BSides RGV Cybersecurity Conference** — a real event that needs to be published soon.

The site is a single-page Next.js app. It was already content-complete in a dark "cyber"
theme. The current job is a **full visual reskin** to a warm, elegant, editorial aesthetic
called **"Daybreak over the Valley."** All 20+ files have been written, `npm run build`
passes, and the dev server runs. The **hero section has been visually verified and looks
excellent.** The remaining work is **visual QA of every section below the hero**, then polish.

**Do not restart or re-architect.** The design direction is locked and approved by the user.
Your job is to finish QA and polish, not redesign.

---

## 2. The project

| | |
|---|---|
| **What** | Official website for the 7th Annual BSides RGV Cybersecurity Conference |
| **Repo** | `/Users/jraudy/Files/BSides Conference/bsidesrgv-2026` (note the space in the path — quote it in shell commands) |
| **Stack** | Next.js 16.2.6 · React 19.2.4 · Tailwind CSS 4 · TypeScript 5 · `motion` ^12.40.0 |
| **Structure** | App Router, **no `src/` dir**, import alias `@/*` → project root |
| **Git** | Only one commit exists (`Initial commit from Create Next App`). **All redesign work is uncommitted.** Do not commit unless the user asks. |
| **Owner** | Josue (jraudy) — CS senior, building this for the real conference. Wants it **finished and publishable**, not taught step-by-step. |

### Confirmed event facts (already in `data/conference.ts` — all real, never invent more)
- 7th Annual BSides RGV Cybersecurity Conference
- **Saturday, June 27, 2026**, 9:00 AM – 4:00 PM CDT (main) + 5:00–8:00 PM reception
- **Mission Event Center**, 200 North Shary Road, Mission, Texas 78572
- Registration: Eventbrite link · CFP: `https://link.bsidesrgv.com/cfp`, deadline **May 31, 2026**
- Contact: `BSidesRGV@gmail.com` · Twitter `@BSidesRGV`
- CPE credits: ISACA 4.75, ISC2 4.00
- Speakers / sessions / keynote are genuinely **TBD** — keep the site honest, do not fabricate.

### Sponsors (6, provided by the user — they are an organizer)
`Arctic Wolf` · `Cisco` · `Fortinet` · `Sequel Data Systems` · `SentinelOne` · `CrowdStrike`
- ⚠️ **Two names were interpreted and are UNCONFIRMED:** user wrote "Sentinel 1" → rendered as
  **SentinelOne**; user wrote "Sequel data" → rendered as **Sequel Data Systems**. Ask the user
  to confirm exact spelling/branding.
- **No logo image files yet.** Sponsors currently render as elegant typographic wordmarks.
  The `Sponsor` type in `data/conference.ts` has an optional `logo?: string` field. When the
  user provides official logo files, drop them in `public/sponsors/` and set `logo` — the
  `SponsorsSection` already conditionally renders `<Image>` when `logo` is present.

---

## 3. The design direction — "Daybreak over the Valley" (LOCKED & APPROVED)

**Concept:** dawn breaking over the Rio Grande Valley — a gold sun rising over palms, the
conference framed as a new signal rising for South Texas security. Warm, optimistic, elegant,
editorial. A "broadsheet" feeling without being a literal newspaper layout.

**Color inspiration:** *The Monitor*, the Mission, TX newspaper (reference images live at
`/Users/jraudy/Downloads/The_Monitor_(Texas)_front_page.jpg` and `unnamed.png`).

**Hard requirement — must NOT look like generic AI UI.** The user explicitly cited Awwwards
as the quality bar and is allergic to "AI slop." Avoid: purple/violet gradients, `rounded-full`
pill buttons, identical bordered card grids on every section, Inter/generic sans, centered-blob
heroes. The redesign deliberately uses distinctive serif type, sharp corners, asymmetric
editorial layouts, hairline rules, real motifs, and art-directed motion.

### Palette — defined in `app/globals.css` `@theme` (use the Tailwind tokens, e.g. `bg-paper`, `text-ink`)
```
paper       #f7f3e9   warm ivory — primary ground (~90% of the page)
paper-warm  #efe7d4   deeper band tone for alternating sections
ink         #1c1813   warm near-black — primary text
ink-muted   #6b6055   secondary text
navy        #103a5a   deep Monitor navy — structure, set-piece backgrounds
navy-deep   #0b2336   footer / dusk
gold        #d99a2b   the SIGNATURE accent — sunburst, rules, highlights
gold-soft   #f2c75e   sun core, light highlights
ember       #d4722a   sunburst warmth, eyebrow accents
red         #c0392e   RARE — primary CTA ("Register") and urgent emphasis only
palm        #2f6b3f   organic green accent (sparingly)
```

### Typography (loaded in `app/layout.tsx` via `next/font/google`)
- **Fraunces** — display headlines. CSS var `--font-fraunces` → Tailwind `font-display`.
- **Newsreader** — body copy. `--font-newsreader` → `font-body`. Also the default `<body>` font.
- **IBM Plex Mono** — eyebrows, labels, data stamps, section numbers. `--font-plex` → `font-mono`.
- Headings (`h1`–`h4`) default to `font-display` via a base rule in `globals.css`.

### Motifs
- **Sunburst** (`components/motifs/Sunburst.tsx`) — the signature rising sun (SVG, slowly
  rotating rays, breathing halo). Also exports **`SunGlyph`** — a tiny static sun for inline marks.
- **PalmEngraving** (`components/motifs/PalmEngraving.tsx`) — vintage palm engravings from
  `public/brand/`. On light grounds uses `mix-blend-multiply` to drop the white plate; on dark
  grounds (`onDark` prop) uses `invert` + `mix-blend-screen`.
- **SectionMarker** (`components/ui/SectionMarker.tsx`) — the editorial eyebrow that replaces
  generic uppercase labels: sun glyph + `№ 0X` + label + hairline rule. `tone="paper"` variant
  for use on navy backgrounds.

### Motion
- Library: **`motion`** (Motion for React v12, imported from `motion/react`).
- **`Reveal`** (`components/ui/Reveal.tsx`, client) — scroll-triggered fade + rise; wrap content blocks in it.
- **Hero** — orchestrated page-load: sun rises, headline staggers in line-by-line; sun parallax on scroll.
- **Agenda** — signature set-piece: a sun travels a dawn→dusk gradient rail as you scroll the schedule.
- **CFP** — bold navy editorial set-piece.
- All motion honors `prefers-reduced-motion`. **Lenis smooth-scroll was deliberately NOT used**
  (risk with anchor-nav + mobile) — do not add it.

### Section background rhythm (gives the page its cadence — keep it)
Hero (dawn gradient) → 01 EventDetails (paper) → 02 About (paper) → 03 Audience (paper-warm) →
**04 CFP (navy set-piece)** → 05 Agenda (paper) → 06 Activities (paper-warm) → 07 Sponsors (paper) →
08 Venue (paper-warm) → **Resources (navy band)** → 09 Conduct (paper) → Footer (navy-deep).

---

## 4. Files — what was created / changed

All section components live in `components/`; shared pieces in `components/motifs/` and
`components/ui/`. Sections are **server components** that render `<Reveal>` (client) islands,
except where noted as client.

| File | State | Notes |
|---|---|---|
| `app/globals.css` | rewritten | Design system: `@theme` palette + fonts, base styles, paper-grain overlay, keyframes (`ray-spin`, `sun-glow`, `marquee`, `palm-sway`), reduced-motion guard, helpers (`.rule`, `.text-balance`, `.numerals-tabular`). |
| `app/layout.tsx` | rewritten | Loads Fraunces / Newsreader / IBM Plex Mono; SEO metadata. |
| `app/page.tsx` | rewritten | Composes header + 11 sections + footer. |
| `data/conference.ts` | edited | Added `Sponsor` type + `sponsors` array. **Everything else unchanged** — all real content. |
| `components/motifs/Sunburst.tsx` | new | `Sunburst` + `SunGlyph`. Pure SVG, server component. |
| `components/motifs/PalmEngraving.tsx` | new | Palm engraving image w/ blend modes (`onDark` prop). |
| `components/ui/Reveal.tsx` | new | **client** — scroll fade-rise wrapper. |
| `components/ui/SectionMarker.tsx` | new | Editorial section eyebrow. |
| `components/ui/CTA.tsx` | new | Link-button: variants `primary` (red), `navy`, `outline`, `outline-light`. Sharp corners, mono label, nudging arrow. |
| `components/SiteHeader.tsx` | rewritten | **client** — sticky masthead, navy dateline strip that collapses on scroll, desktop nav, animated mobile menu. |
| `components/SiteFooter.tsx` | rewritten | Navy "dusk" footer — setting sun, palms, columns. |
| `components/HeroSection.tsx` | rewritten | **client** — the dawn set-piece. ✅ visually verified. |
| `components/EventDetails.tsx` | rewritten | Editorial ledger (`<dl>`), CPE highlight. `id="details"`. |
| `components/AboutSection.tsx` | rewritten | Drop cap, pull-quote, numbered highlights. |
| `components/AudienceSection.tsx` | rewritten | Numbered editorial index, hover states. |
| `components/CallForPapersSection.tsx` | rewritten | Navy set-piece. `id="cfp"`. |
| `components/AgendaSection.tsx` | rewritten | **client** — sun-arc scroll timeline. `id="agenda"`. |
| `components/ActivitiesSection.tsx` | rewritten | Alternating-offset editorial list. `id="activities"`. |
| `components/SponsorsSection.tsx` | rewritten | Sponsor wall (6) + "Become a sponsor" tiers. `id="sponsors"`. |
| `components/VenueSection.tsx` | rewritten | Venue info + City of Mission seal. `id="venue"`. |
| `components/ResourcesSection.tsx` | rewritten | Navy quick-links band. |
| `components/ConductSection.tsx` | rewritten | Code of conduct. `id="conduct"`. |
| `package.json` | edited | Added `motion`. |

**Section anchor IDs the nav depends on — do not rename:** `#top` (on `<main>`), `#details`,
`#cfp`, `#agenda`, `#activities`, `#sponsors`, `#venue`, `#conduct`.

**Section numbering** passed to `SectionMarker index=`: EventDetails 01, About 02, Audience 03,
CFP 04, Agenda 05, Activities 06, Sponsors 07, Venue 08, Conduct 09.

### Brand assets (`public/brand/`)
- `bsidesrgv-logo.png` — black Texas-outline logo. **USED** in the masthead.
- `bsidesrgv-logo-green.png` — green version. **NOT used** (the green clashes with the palette).
- `city-of-mission-logo.jpg` — used in `VenueSection` (blended with `mix-blend-multiply`).
- `palm-silhouette.png` (tall single palm) & `palm-silhouette-2.png` (fan palm) — used by `PalmEngraving`.

---

## 5. Verification status

| Check | Result |
|---|---|
| `npm run lint` | ✅ clean |
| `npm run build` | ✅ passes — TypeScript clean (one harmless Node `DEP0205` deprecation warning, pre-existing) |
| Dev server (`:3000`) | ✅ running, serves full correct HTML for all sections |
| **Hero section — visual** | ✅ verified in browser — looks excellent (sun rising behind the headline, palms, masthead all correct) |
| **All sections below the hero — visual** | ❌ NOT yet verified — this is the immediate next step |
| Mobile / responsive | ❌ not yet checked |
| Browser console | ❌ not yet checked |

---

## 6. What's left to do (continue from here)

1. **Finish visual QA.** Scroll through every section at desktop width and screenshot each.
   Confirm each renders correctly and looks polished and intentional.
2. **Check responsive / mobile** (~390px wide). Pay attention to: `SiteHeader` mobile menu
   (hamburger → full-screen overlay), the hero on a short viewport, multi-column grids collapsing.
3. **Check the browser console** for errors/warnings.
4. **Polish anything off.** Likely things worth a close look (unverified guesses, not known bugs):
   - Palm engraving position/opacity in the hero corners and the footer.
   - The Agenda **sun-arc**: confirm the sun actually travels the rail smoothly on scroll.
   - The City of Mission seal `mix-blend-multiply` on the venue card (white-plate JPG).
   - Contrast/legibility on the two navy set-pieces (CFP, Resources).
   - The About drop cap (`first-letter:` utilities) and the pull-quote spacing.
   - Sponsor wall cell sizing with the longest name ("Sequel Data Systems").
5. **(Ask the user)** sponsor logo files → `public/sponsors/` + wire the `logo` field.
6. **(Ask the user)** whether to commit to git and/or deploy — nothing is committed yet.

**To resume QA:** dev server is on `http://localhost:3000`. Use a browser tool to navigate
there, screenshot the hero, then scroll down section by section.

---

## 7. Constraints & decisions — do not break these

- **Delivery mode.** The user explicitly wants the site *finished*, not taught file-by-file.
  Build complete work; align on big direction changes, but don't pause for approval on every edit.
- **All content is real.** Never invent speakers, sponsors, sessions, or schedule detail.
  Sponsors come from the user; event data from the live site / handed-off repo / sponsorship kit.
- **This is Next.js 16 — non-standard.** Per `AGENTS.md`, consult the local docs in
  `node_modules/next/dist/docs/` before using framework APIs; heed deprecation notices.
- **Anti-AI-generic is a core requirement.** No purple gradients, no `rounded-full` pills, no
  identical card grids, distinctive serif typography. Keep the editorial character.
- **Keep the locked design** ("Daybreak over the Valley") — palette, fonts, motifs, motion
  approach are approved. Polish within it; don't redesign.
- **Do not add Lenis** or other smooth-scroll libraries (anchor-nav + mobile risk).
- Honor `prefers-reduced-motion` in any new animation.

---

## 8. How to run

```bash
cd "/Users/jraudy/Files/BSides Conference/bsidesrgv-2026"   # path has a space — quote it
npm run dev      # dev server → http://localhost:3000
npm run lint     # ESLint
npm run build    # production build + full TypeScript check
```
A dev server is currently running on port 3000. If it is stale, restart it:
`lsof -ti:3000 | xargs kill -9 2>/dev/null; npm run dev`.

---

## 9. Source material & references

- **`hermes_conversation_*.json`** (repo root) — transcripts of earlier agent sessions that
  built the original (dark-theme) version and gathered the real event content.
- A raw transcript of the session that produced this redesign was exported via `/export` to a
  `.txt` file in the repo root (timestamped `2026-05-21-...`).
- **Reference images** (the user's design intent):
  - `/Users/jraudy/Downloads/The_Monitor_(Texas)_front_page.jpg` — The Monitor newspaper (color/elegance cue).
  - `/Users/jraudy/Downloads/unnamed.png` — The Monitor app icon (Texas flag + palms + gold sunburst — the palette source).
- **Sponsorship kit:** `public/resources/bsides-rgv-2026-sponsorship-kit.pdf` (also linked from the site).
- The live conference site (`http://bsidesrgv.com/`) is the source of truth for event facts.

---

*End of handoff. The next agent should resume at Section 6, step 1: visual QA of the sections
below the hero, starting from the running dev server at `http://localhost:3000`.*
