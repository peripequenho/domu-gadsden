// La Admin API no tiene permiso de páginas: se deduce qué plantilla usa cada página desde el storefront en vivo,
// comparando los ids de sección del HTML con el orden de cada plantilla page.* de la referencia.
// Uso: node tools/probe_pages.js handle1 handle2 ...
const { fs, path, REF, readJSON } = require('./lib');
const { execFileSync } = require('child_process');
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36';
const tpls = fs.readdirSync(path.join(REF, 'templates')).filter(f => /^page(\.|$)/.test(f.replace('.json', '')) || f === 'page.json')
  .map(f => ({ name: f.replace('.json', ''), ids: new Set(readJSON(path.join(REF, 'templates', f)).order) }));
for (const h of process.argv.slice(2)) {
  const html = execFileSync('curl', ['-s', '-A', UA, '-w', '\n%{http_code}', `https://domuhogar.com/pages/${h}`], { encoding: 'utf8', maxBuffer: 1 << 26 });
  const code = html.trim().split('\n').pop();
  const ids = [...new Set([...html.matchAll(/shopify-section-template--\d+__([\w-]+)/g)].map(m => m[1]))];
  const best = tpls.map(t => [t.name, ids.filter(i => t.ids.has(i)).length]).sort((a, b) => b[1] - a[1])[0];
  console.log(`${h}\tHTTP ${code}\t${ids.join(',')}\t=> ${best && best[1] ? best[0] + ' (' + best[1] + '/' + ids.length + ')' : '?'}`);
}
