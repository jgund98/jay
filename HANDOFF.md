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

## 2. The photos of Jay and Jason

Jay sent over two promotional flyers and asked for his and Jason's faces on
the site. The flyer **artwork** — lightning, logo, headline — is AI-generated,
but the **men in it are photographs**, so that is where the portraits come
from.

They appear in exactly one place: the **"Who shows up"** cards on the home
page, via `team[].photo` in `lib/site.ts`. The hero stays a car. Putting them
in the hero as well was tried and pulled — it read as a flyer, not a website.

```bash
cd scripts && bash extract-people.sh
```

That regenerates `public/img/jay-portrait.jpg` and `jason-portrait.jpg` from
`scripts/jay-src.jpg` and `scripts/jason-src.jpg`, and the comments in it
explain the one non-obvious thing:

> Both men are boxed in by flyer furniture — an icon column down the left, a
> headline block top right, a phone banner across the bottom. Cropping to miss
> all of it gives you a passport photo. So the script **defocuses** the
> headline first: a heavy blur composited back through a **soft-edged mask**,
> which reads as depth of field. A hard-edged rectangle of blur is instantly
> visible; the feather is what sells it. With the headline gone, the crop can
> open up and both men get framed head-and-shoulders with the shirt logo
> showing.

Both outputs are square, and the card renders at `aspect-square`, so nothing
gets cropped a second time. If you re-frame, keep the two head sizes close —
side by side, a mismatch is the first thing you notice.

If Jay and Jason ever send straight phone photos, prefer those: drop them in
`public/img` under **new filenames** and repoint `photo`. **Never substitute a
stock or generated face** — the whole point of that section is that these are
the two people who actually turn up.

### Image rules that were set by the client

- **No people in stock photos.** Jay rejected every bib-overall stock mechanic.
  Any stock image must be car-only. (Photos of Jay and Jason themselves are of
  course the exception, and the goal.)
- **Must read as American.** No European cars, plates, or streets.
- **No business-card photo.** It was mistaken for a job photo and is banned.
- The `Jay's photo` badge on `/our-work` (`real: true`) may only be set on a
  photo Jay actually took. It is a trust signal — do not put it on stock.
- **Next's image optimiser caches by filename.** Replacing a photo? Give it a
  **new** filename, or the old picture keeps being served after a rebuild.
  Locally also `rm -rf .next/cache/images`.

## 3. Open items

1. **The sitemap and every canonical point at `gamechangerauto.shop`, not
   `jay.epicdevsolutions.com`.** Jay owns that domain but it is currently a
   parked lander, so Google is being sent to a page that is not the site. If
   the plan is to move to it, point the DNS and this is already correct; if
   not, change `siteUrl` in `lib/site.ts`. Either way it should not stay as
   it is — pick one.
2. **`/api/quote` is a stub.** It `console.log`s and returns 200. Quote-form
   leads currently go nowhere. Wire the Brevo drop-in from
   `epic/client-email-protocol` plus an SMS to Jay before pointing any paid
   traffic at the form. Phone and text links work fine today — those are the
   live lead paths.
3. **Jason's ASE status is unconfirmed.** The site calls him a "certified
   technician" and deliberately never says ASE about him. Do not upgrade that
   claim without confirming it.
4. **Jason's flyer also claims "25 YEAR ASE CERTIFIED"** — that is almost
   certainly the template copied from Jay's version, so the site does not
   repeat it. Do not promote Jason's credential without asking.

---

## 4. Facts and where they came from

Every claim on the site traces to something Jay said or published:

- 25 years, ASE certified **master technician**, gas and diesel, **dealer
  certified on Ford, GM and Chrysler diesel** — Jay's own Facebook intro.
- **$125 diagnostic, waived when you have the repair done** — confirmed by Jay
  2026-08-19 (it was $35 before that).
- **Jason Garcia, partner, certified technician** — confirmed by Jay. He called
  him a "small partner", so Jay stays the face of the business.
- **Jason's line, (936) 405-2838** — confirmed by Jordan 2026-08-27. It is on
  his team card and on /contact. Jay's (832) number is still the one in the
  header, the hero, the popup and every service page; Jason's is a second
  route in, not a replacement.
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
