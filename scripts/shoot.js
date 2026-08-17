/*
 * Screenshot rig. Full-resolution captures at every breakpoint the polish
 * loop cares about, so "it looks right in code" never stands in for looking.
 *
 *   node scripts/shoot.js                    → all pages, all widths
 *   node scripts/shoot.js /contact 390       → one page, one width
 *   node scripts/shoot.js / 1440 fold        → viewport-only (the fold)
 */
const puppeteer = require("C:/Users/Lucky/gus-renny/node_modules/puppeteer");
const fs = require("fs");
const path = require("path");

const BASE = "http://localhost:3441";
const OUT = path.join(__dirname, "..", "_shots");

const PAGES = [
  ["/", "home"],
  ["/services", "services"],
  ["/services/mobile-diagnostics", "svc-diag"],
  ["/services/brakes", "svc-brakes"],
  ["/our-work", "work"],
  ["/service-area", "area"],
  ["/about", "about"],
  ["/contact", "contact"],
];
const WIDTHS = [375, 768, 1440, 1920];

(async () => {
  const argPath = process.argv[2];
  const argW = process.argv[3] ? Number(process.argv[3]) : null;
  const foldOnly = process.argv[4] === "fold";

  const pages = argPath
    ? [[argPath, argPath.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "") || "home"]]
    : PAGES;
  const widths = argW ? [argW] : WIDTHS;

  fs.mkdirSync(OUT, { recursive: true });
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--force-device-scale-factor=1", "--hide-scrollbars"],
  });

  for (const w of widths) {
    for (const [url, name] of pages) {
      const page = await browser.newPage();
      await page.setViewport({ width: w, height: w < 500 ? 812 : 900 });
      await page.evaluateOnNewDocument(() => {
        try {
          sessionStorage.setItem("gc-owner-seen", "1");
        } catch {}
      });
      await page.goto(BASE + url, { waitUntil: "networkidle0", timeout: 60000 });
      // let scroll-triggered reveals resolve
      await page.evaluate(async () => {
        await new Promise((r) => {
          let y = 0;
          const step = () => {
            y += window.innerHeight * 0.8;
            window.scrollTo(0, y);
            if (y < document.body.scrollHeight) setTimeout(step, 90);
            else {
              window.scrollTo(0, 0);
              setTimeout(r, 500);
            }
          };
          step();
        });
      });
      await new Promise((r) => setTimeout(r, 500));

      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth,
      );
      const file = path.join(OUT, `${name}-${w}${foldOnly ? "-fold" : ""}.png`);
      await page.screenshot({ path: file, fullPage: !foldOnly });
      console.log(
        `${name} @${w}  overflow:${overflow}px  ->  ${path.basename(file)}`,
      );
      await page.close();
    }
  }
  await browser.close();
})();
