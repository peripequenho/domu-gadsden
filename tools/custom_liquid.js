// Lista las piezas de custom liquid de la referencia (bloques custom_liquid de la ficha y secciones custom-liquid)
// y, para cada una, las clases y variables CSS que usa sin definirlas ella misma ni Gadsden: ésas dependían de
// estilos de Shrine (o de nadie) y pueden verse distinto. Se compara contra el CSS de Gadsden, no el de Shrine.
// Uso: node tools/custom_liquid.js [--json]
const { fs, path, REF, THEME, readJSON, refFiles } = require('./lib');

// Clases y variables que define Gadsden (assets/*.css y <style> / {% style %} de sus secciones y snippets).
const gadCss = [];
for (const d of ['assets', 'sections', 'snippets', 'layout']) for (const f of fs.readdirSync(path.join(THEME, d))) {
  const txt = fs.readFileSync(path.join(THEME, d, f), 'utf8');
  if (f.endsWith('.css')) gadCss.push(txt);
  else if (f.endsWith('.liquid')) for (const m of txt.matchAll(/\{%-?\s*(?:style|stylesheet)\s*-?%\}([\s\S]*?)\{%-?\s*end(?:style|stylesheet)\s*-?%\}|<style[^>]*>([\s\S]*?)<\/style>/g)) gadCss.push(m[1] || m[2]);
}
const allGad = gadCss.join('\n');
const gadClasses = new Set([...allGad.matchAll(/\.(-?[_a-zA-Z][\w-]*)/g)].map(m => m[1]));
const gadVars = new Set([...allGad.matchAll(/(--[\w-]+)\s*:/g)].map(m => m[1]));
// Clases que Gadsden escribe desde Liquid/JS sin selector propio (p. ej. utilidades de Dawn) también cuentan.
for (const d of ['sections', 'snippets', 'layout']) for (const f of fs.readdirSync(path.join(THEME, d))) {
  for (const m of fs.readFileSync(path.join(THEME, d, f), 'utf8').matchAll(/class="([^"{]*)"/g)) m[1].split(/\s+/).forEach(c => c && gadClasses.add(c));
}

const pieces = [];
for (const rel of refFiles()) {
  const j = readJSON(path.join(REF, rel));
  const t = rel.replace(/^(templates|sections)\//, '').replace('.json', '');
  for (const id of j.order || Object.keys(j.sections || {})) {
    const s = j.sections[id];
    if (!s || s.disabled) continue;
    if (s.type === 'custom-liquid') pieces.push({ t, where: `sección ${id}`, code: s.settings.custom_liquid || '' });
    for (const bid of s.block_order || Object.keys(s.blocks || {})) {
      const b = (s.blocks || {})[bid];
      if (b && !b.disabled && b.type === 'custom_liquid') pieces.push({ t, where: `${id} > ${bid}`, code: b.settings.custom_liquid || '' });
    }
  }
}
const res = pieces.map(p => {
  const own = [...p.code.matchAll(/<style[^>]*>([\s\S]*?)<\/style>|\{%-?\s*style\s*-?%\}([\s\S]*?)\{%-?\s*endstyle\s*-?%\}/g)].map(m => m[1] || m[2]).join('\n');
  const ownClasses = new Set([...own.matchAll(/\.(-?[_a-zA-Z][\w-]*)/g)].map(m => m[1]));
  const ownVars = new Set([...p.code.matchAll(/(--[\w-]+)\s*:/g)].map(m => m[1]));
  const used = new Set();
  for (const m of p.code.matchAll(/class\s*=\s*["']([^"']*)["']/g)) m[1].replace(/\{\{[\s\S]*?\}\}|\{%[\s\S]*?%\}/g, ' ').split(/\s+/).forEach(c => c && used.add(c));
  const vars = new Set([...p.code.matchAll(/var\((--[\w-]+)/g)].map(m => m[1]));
  const ext = [...used].filter(c => !ownClasses.has(c));
  return {
    ...p, bytes: Buffer.byteLength(p.code),
    dawn: ext.filter(c => gadClasses.has(c)), missing: ext.filter(c => !gadClasses.has(c)),
    varsMissing: [...vars].filter(v => !ownVars.has(v) && !gadVars.has(v)),
    scripts: (p.code.match(/<script/g) || []).length, assetUrl: /asset_url/.test(p.code),
  };
});
if (process.argv.includes('--json')) { console.log(JSON.stringify(res, null, 1)); process.exit(); }
let total = 0;
for (const r of res) {
  total += r.bytes;
  console.log(`| ${r.t} | ${r.where} | ${(r.bytes / 1024).toFixed(1)} KB | ${r.dawn.join(' ') || '—'} | ${r.missing.join(' ') || '—'} | ${r.varsMissing.join(' ') || '—'} | ${r.scripts}${r.assetUrl ? ' · asset_url' : ''} |`);
}
console.log(`\n${res.length} piezas, ${(total / 1024).toFixed(0)} KB`);
