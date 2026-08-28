/*
 * Reports any card grid whose last row is short — the "awkward weight" class of
 * bug, where adding one more card leaves a hole or strands a single item.
 *
 * Two things this has to get right or it cries wolf:
 *  - Row grouping needs a tolerance. Cards in the same row can differ by a few
 *    pixels in `top`; bucketing on an exact value splits one row into two and
 *    reports a perfectly flush grid as broken.
 *  - Layout grids are not card grids. Anything using grid-template-areas, or
 *    with only a handful of children, is a page layout and is meant to be
 *    lopsided.
 *
 * Runs with prefers-reduced-motion so the scroll reveals don't hide anything.
 */
const puppeteer = require("C:/Users/Lucky/gus-renny/node_modules/puppeteer");
const BASE = "http://localhost:3441";
const WIDTHS = [1440, 1100, 768];
const ROW_TOLERANCE = 24;
const MIN_CARDS = 5;

(async () => {
  const xml = await (await fetch(BASE + "/sitemap.xml")).text();
  const routes = [...xml.matchAll(new RegExp("<loc>([^<]+)</loc>", "g"))].map(
    (m) => new URL(m[1]).pathname,
  );
  const browser = await puppeteer.launch({ headless: "new" });
  let bad = 0;

  for (const width of WIDTHS) {
    const page = await browser.newPage();
    await page.setViewport({ width, height: 1200 });
    await page.emulateMediaFeatures([
      { name: "prefers-reduced-motion", value: "reduce" },
    ]);
    for (const route of routes) {
      await page.goto(BASE + route, { waitUntil: "networkidle0" });
      const problems = await page.evaluate(
        (TOL, MIN) => {
          const out = [];
          document.querySelectorAll("*").forEach((g) => {
            const cs = getComputedStyle(g);
            if (cs.display !== "grid") return;
            if (cs.gridTemplateAreas !== "none") return;
            if (g.children.length < MIN) return;
            const cols = cs.gridTemplateColumns
              .split(" ")
              .filter(Boolean).length;
            if (cols < 2) return;

            const gw = g.getBoundingClientRect().width;
            const boxes = [...g.children]
              .map((c) => c.getBoundingClientRect())
              .filter((b) => b.width > 1)
              .sort((a, b) => a.top - b.top);
            if (!boxes.length) return;

            const rows = [[boxes[0]]];
            for (const b of boxes.slice(1)) {
              const row = rows[rows.length - 1];
              if (b.top - row[0].top <= TOL) row.push(b);
              else rows.push([b]);
            }
            if (rows.length < 2) return;

            const last = rows[rows.length - 1];
            const covered = last.reduce((s, b) => s + b.width, 0);
            if (covered >= gw - (gw / cols) * 0.8) return;

            const sec = g.closest("section");
            const h = sec ? sec.querySelector("h1,h2") : null;
            const label = h
              ? h.innerText.replace(/\s+/g, " ").slice(0, 38)
              : String(g.className).slice(0, 40);
            out.push(
              `${cols}col [${label}] last row ${Math.round(covered)}/${Math.round(gw)}px, ${g.children.length} items`,
            );
          });
          return out;
        },
        ROW_TOLERANCE,
        MIN_CARDS,
      );
      if (problems.length) {
        bad++;
        console.log(`\u2717 [${width}] ${route}`);
        problems.forEach((x) => console.log("   " + x));
      }
    }
    await page.close();
  }

  console.log(
    bad
      ? `\n${bad} short rows`
      : `\nNO SHORT GRID ROWS \u2014 ${routes.length} routes x ${WIDTHS.length} widths`,
  );
  await browser.close();
})();
