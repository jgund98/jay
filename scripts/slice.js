/* Slices a tall full-page screenshot into readable panels for review. */
const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const name = process.argv[2];
const panelH = Number(process.argv[3] || 1600);
const SHOTS = path.join(__dirname, "..", "_shots");
const src = path.join(SHOTS, `${name}.png`);
const outDir = path.join(SHOTS, "slices");
fs.mkdirSync(outDir, { recursive: true });

const probe = execFileSync("ffprobe", [
  "-v", "error", "-select_streams", "v:0",
  "-show_entries", "stream=width,height",
  "-of", "csv=p=0", src,
]).toString().trim();
const [w, h] = probe.split(",").map(Number);

const n = Math.ceil(h / panelH);
for (let i = 0; i < n; i++) {
  const y = i * panelH;
  const hh = Math.min(panelH, h - y);
  const out = path.join(outDir, `${name}-p${i + 1}.png`);
  execFileSync("ffmpeg", [
    "-y", "-loglevel", "error", "-i", src,
    "-vf", `crop=${w}:${hh}:0:${y}`, out,
  ]);
  console.log(path.basename(out));
}
