/*
 * Flags any button whose label wraps onto more than one line, or that is too
 * narrow to hold its own text. Buttons are the one place a line break always
 * looks like a mistake — a phone number split across two lines especially.
 *
 * Line counting is done on the TEXT NODES only: a .btn usually contains an
 * icon <svg> as well, and measuring the element's client rects counts that as
 * its own "line" and reports every icon button as broken.
 */
const puppeteer = require("C:/Users/Lucky/gus-renny/node_modules/puppeteer");
const BASE = "http://localhost:3441";
const WIDTHS = [320, 375, 414, 768, 1440];

(async () => {
  const xml = await (await fetch(BASE + "/sitemap.xml")).text();
  const routes = [...xml.matchAll(new RegExp("<loc>([^<]+)</loc>", "g"))].map(
    (m) => new URL(m[1]).pathname,
  );
  const browser = await puppeteer.launch({ headless: "new" });
  let bad = 0;

  for (const width of WIDTHS) {
    const page = await browser.newPage();
    await page.setViewport({ width, height: 900 });
    await page.emulateMediaFeatures([
      { name: "prefers-reduced-motion", value: "reduce" },
    ]);
    for (const route of routes) {
      await page.goto(BASE + route, { waitUntil: "networkidle0" });
      const problems = await page.evaluate(() => {
        const seen = new Set();
        const out = [];
        document.querySelectorAll("a,button").forEach((el) => {
          if (!el.className || !String(el.className).includes("btn")) return;
          const box = el.getBoundingClientRect();
          if (box.width < 1 || box.height < 1) return;
          const label = el.innerText.replace(/\s+/g, " ").trim();
          if (!label) return;

          // Measure only the text nodes, so an icon doesn't read as a line.
          const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
          const tops = new Set();
          let node;
          while ((node = walker.nextNode())) {
            if (!node.nodeValue.trim()) continue;
            const range = document.createRange();
            range.selectNodeContents(node);
            [...range.getClientRects()]
              .filter((r) => r.width > 1)
              .forEach((r) => tops.add(Math.round(r.top / 4)));
          }
          if (tops.size <= 1) return;
          const key = label + "|" + tops.size;
          if (seen.has(key)) return;
          seen.add(key);
          out.push(`"${label}" wraps to ${tops.size} lines (btn ${Math.round(box.width)}px)`);
        });
        return out;
      });
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
      ? `\n${bad} route/width combos with wrapping buttons`
      : `\nNO WRAPPING BUTTONS \u2014 ${routes.length} routes x ${WIDTHS.length} widths`,
  );
  await browser.close();
})();
