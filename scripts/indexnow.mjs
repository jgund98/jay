// Tell Bing (and every IndexNow engine: Yandex, Seznam, Naver) which URLs
// changed. Bing's index is what ChatGPT search reads, and as of 2026-10-04
// Bing had not indexed this site at all. Run after each production deploy:
//   node scripts/indexnow.mjs            -> submits every URL in the live sitemap
//   node scripts/indexnow.mjs /services  -> submits only the given paths
const host = "www.gamechangerautomotive.com";
const key = "2b775468932a7095af91e32137b3236f"; // served at https://<host>/<key>.txt from public/
const args = process.argv.slice(2);
let urls;
if (args.length) {
  urls = args.map((p) => (p.startsWith("http") ? p : `https://${host}${p}`));
} else {
  const xml = await (await fetch(`https://${host}/sitemap.xml`)).text();
  urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
}
const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key, keyLocation: `https://${host}/${key}.txt`, urlList: urls }),
});
console.log(`IndexNow: ${res.status} ${res.statusText} for ${urls.length} URLs`);
if (res.status >= 400) {
  console.log(await res.text());
  process.exit(1);
}
