// Compara por contenido los assets ct-* de la referencia contra imágenes de Archivos con la misma proporción:
// huella de 16x16 en gris (ffmpeg) y error cuadrático medio. Uso: node tools/assets_match.js <prefijoArchivos> <globAssets>
const { fs, path, ROOT } = require('./lib');
const { execFileSync } = require('child_process');
const [prefix, assetRe] = process.argv.slice(2);
const A = 'D:/_refs/shrine-domu-og-2026-10-15/assets/';
const files = require(path.join(ROOT, 'tmp/files.json')).filter(f => f.name.startsWith(prefix) && f.type === 'MediaImage');
const tmp = path.join(ROOT, 'tmp/match'); fs.mkdirSync(tmp, { recursive: true });
const print = src => execFileSync('ffmpeg', ['-v', 'error', '-i', src, '-vf', 'scale=16:16,format=gray', '-f', 'rawvideo', '-'], { maxBuffer: 1 << 20 });
const fp = {};
for (const f of files) {
  const local = path.join(tmp, f.name);
  if (!fs.existsSync(local)) execFileSync('curl', ['-s', '-o', local, f.url + (f.url.includes('?') ? '&' : '?') + 'width=200']);
  fp[f.name] = print(local);
}
const mse = (a, b) => a.reduce((s, v, i) => s + (v - b[i]) ** 2, 0) / a.length;
for (const a of fs.readdirSync(A).filter(x => new RegExp(assetRe).test(x))) {
  const p = print(A + a);
  const best = Object.entries(fp).map(([n, q]) => [n, mse(p, q)]).sort((x, y) => x[1] - y[1])[0];
  console.log(`${a}\t${best[0]}\t${best[1].toFixed(0)}`);
}
