# Game Changer Automotive — handoff

Mobile-mechanic site for **Jay Metcalf**, Conroe / Montgomery County, TX.

| | |
|---|---|
| Live | https://jay.epicdevsolutions.com |
| Repo | `jgund98/jay` (branch `main`) |
| Hosting | Vercel — auto-deploys on every push to `main` |
| Local dev | `npm run dev` → http://localhost:3441 |
| Stack | Next.js 16 (App Router) · Tailwind CSS 4 · framer-motion 12 · TypeScript |

```bash
npm install && npm run dev
```

---

## 1. The one file that matters

**`lib/site.ts` is the single source of truth.** Phone, email, fee, hours, service
areas, reviews, the whole services catalog and the team roster all live there.
Change it there and every page, every meta description and every JSON-LD block
updates with it. Do not hard-code a phone number or a price into a component.

Common edits:

| Change | Where in `lib/site.ts` |
|---|---|
| Phone / text number | `phone`, `phoneHref`, `smsHref` |
| Diagnostic fee | `callOutFee`, `callOutLabel`, `callOutNote` |
| Add or edit a service page | the `services` array — each entry generates `/services/<slug>` |
| Add a city | `coreCities` / `extraCities` |
| Reviews | the `reviews` array |
| Team members and their photos | the `team` array |

---

## 2. Adding real photos of Jay and Jason (do this first)

The **"Who shows up"** section on the home page currently draws a branded
monogram (JM / JG) instead of a face. That is a placeholder, not a design
choice — a real photo is strictly better and Jay has asked for one.

1. Get a phone photo of each of them. Ideally in a Game Changer shirt, next to
   the truck, outdoors, daylight. Portrait or square.
2. Drop them in `public/img/` as `jay.jpg` and `jason.jpg`.
3. In `lib/site.ts`, in the `team` array, change `photo: null` to
   `photo: "/img/jay.jpg"` (and the same for Jason).

That is the whole change. The card swaps from monogram to photo automatically.

> **Do not use AI-generated portraits here.** Jay's stated reason for wanting
> photos is *"the whole website is AI so I want to make it real."* A generated
> face defeats that, and a customer who meets him has been misled. The slot
> stays a monogram until real photos exist.

### Image rules that were set by the client

- **No people in stock photos.** Jay rejected every bib-overall stock mechanic.
  Any stock image must be car-only.
- **Must read as American.** No European cars, plates, or streets.
- **No business-card photo.** It was mistaken for a job photo and is banned.
- The `Jay's photo` badge on `/our-work` (`real: true`) may only be set on a
  photo Jay actually took. It is a trust signal — do not put it on stock.
- **Next's image optimiser caches by filename.** Replacing a photo? Give it a
  **new** filename, or the old picture keeps being served after a rebuild.
  Locally also `rm -rf .next/cache/images`.

---

## 3. Open items

1. **`/api/quote` is a stub.** It `console.log`s and returns 200. Quote-form
   leads currently go nowhere. Wire the Brevo drop-in from
   `epic/client-email-protocol` plus an SMS to Jay before pointing any paid
   traffic at the form. Phone and text links work fine today — those are the
   live lead paths.
2. **Jason's phone number is unconfirmed.** Both team cards call Jay's line.
   If Jason has his own number, add it to his entry in `team`.
3. **Jason's ASE status is unconfirmed.** The site calls him a "certified
   technician" and deliberately never says ASE about him. Do not upgrade that
   claim without confirming it.
4. **No photo of Jay or Jason** — see section 2.

---

## 4. Facts and where they came from

Every claim on the site traces to something Jay said or published:

- 25 years, ASE certified **master technician**, gas and diesel, **dealer
  certified on Ford, GM and Chrysler diesel** — Jay's own Facebook intro.
- **$125 diagnostic, waived when you have the repair done** — confirmed by Jay
  2026-08-19 (it was $35 before that).
- **Jason Garcia, partner, certified technician** — confirmed by Jay. He called
  him a "small partner", so Jay stays the face of the business.
- 4.5★ / 8 reviews, open 24 hours, tagline "Your ride, my priority.",
  LGBTQ+ friendly and disabled-owned — Google Business Profile.
- 8 of the 9 photos on `/our-work` are Jay's own, off his Google profile and
  Facebook page.

There is **no source website** — `gamechangerauto.shop` is a parked domain Jay
owns. Everything here was written from scratch.

---

## 5. Design notes for whoever edits this next

- **Custom CSS must live inside `@layer components`** in `globals.css`.
  Unlayered rules outrank Tailwind utilities — an unlayered
  `.btn { display: inline-flex }` once beat `hidden sm:inline-flex` and showed
  both header CTAs on a 375px phone.
- `background-clip: text` shears the descenders off italic type. Use the
  `.grad-text` helper, which pads then negates the padding.
- framer-motion 12 rejects inline bezier arrays. Import `EASE` from
  `lib/motion.ts`.
- **JSX drops whitespace between an expression and text on the next line.**
  `{site.callOutLabel}` followed by ` is for.` on the next line renders as
  "diagnosticis for". Keep them on one line or add `{" "}`.
- `max-w-[NNch]` on a *wrapper* resolves `ch` against the wrapper's 16px font,
  not the heading inside it. Use pixel max-widths on heading wrappers.
- Never bulk-edit source with PowerShell `Get-Content`/`Set-Content` without
  `-Encoding utf8` — it turns every em dash into mojibake.
- The logo is Jay's **real** artwork, keyed off its carbon background by
  `scripts/extract-logo.ps1`. The setting that matters is **tolerance, not
  threshold**: `threshold=0.14 tolerance=0.05 softness=0.06`. Higher tolerance
  eats the purple out of "GAME CHANGER". Because the key leaves faint residue,
  **only place the logo on dark solid sections — never on a light section and
  never over a photo.**
- The showpiece is **"The Scan"** (`components/TheScan.tsx`): pick a symptom,
  watch a scope trace, get likely causes and a CTA that prefills the quote
  form. Pure DOM and SVG on purpose — no canvas, no blend modes.
- Reveal animations use one `useInView` per section, not one per element. On
  the service-area map that mattered: the map scrolls sideways on phones, so
  per-element observers never fired and it rendered blank.

## 6. Scripts

```bash
npm run typecheck          # tsc --noEmit
node scripts/audit-images.js   # walks every route, reports broken images
node scripts/shoot.js          # viewport screenshots of every page
```

Both audit scripts need the production server running (`npm run build && npm start`).
