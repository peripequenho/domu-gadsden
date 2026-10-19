// DIFF-CONTENIDO-15OCT: compara los valores de contenido (textos, precios, imágenes, videos, links, productos)
// de las secciones y bloques con el mismo id entre la copia Shrine del 15-oct y el Dawn vivo (bajado el 19-oct).
// Manda la copia Shrine; esto sólo lista lo que Gero cambió después. Uso: node tools/diff_live.js > DIFF-CONTENIDO-15OCT.md
const { fs, path, REF, LIVE, readJSON, refFiles } = require('./lib');
const isContent = (k, v) => typeof v === 'string' && v.trim() !== '' && !/^#[0-9a-f]{3,8}$/i.test(v) &&
  !/^(scheme-|background-|accent-|inverse|left|center|right|top|bottom|small|medium|large|none|auto|adapt|full|h\d|default|custom|text|solid)/.test(v) &&
  !/color|scheme|style|layout|alignment|position|size|width|height|padding|font|animation|effect|direction/.test(k);
const flat = (j) => {
  const m = {};
  for (const [sid, s] of Object.entries(j.sections || {})) {
    if (s.disabled) continue;
    for (const [k, v] of Object.entries(s.settings || {})) if (isContent(k, v)) m[`${sid} · ${k}`] = v;
    for (const [bid, b] of Object.entries(s.blocks || {})) {
      if (b.disabled) continue;
      for (const [k, v] of Object.entries(b.settings || {})) if (isContent(k, v)) m[`${sid} > ${bid} · ${k}`] = v;
    }
  }
  return m;
};
const short = v => JSON.stringify(v.length > 140 ? v.slice(0, 140) + '…' : v);
const out = ['# Diferencias de contenido: copia Shrine del 15-oct vs. Dawn vivo (19-oct)', '',
  'Compara sólo valores de contenido (textos, imágenes, videos, links, productos) en secciones y bloques con el **mismo id**. Manda la copia Shrine: lo que figura acá es lo que cambió en el Dawn después del 15-oct (o en el port de ese día) y **no** se lleva a Gadsden salvo que Gero lo pida.', ''];
let total = 0;
for (const rel of refFiles()) {
  const live = path.join(LIVE, rel);
  if (!fs.existsSync(live)) { out.push(`- \`${rel}\`: no existe en el Dawn vivo.`); continue; }
  const a = flat(readJSON(path.join(REF, rel))), b = flat(readJSON(live));
  const diffs = []; let oneSide = 0;
  const liveSecs = readJSON(live).sections;
  for (const k of new Set([...Object.keys(a), ...Object.keys(b)])) {
    if (a[k] === b[k]) continue;
    if (!(k.split(' · ')[0].split(' > ')[0] in liveSecs)) continue; // sección que el Dawn no tiene: no comparable
    if (a[k] === undefined || b[k] === undefined) { oneSide++; continue; } // ajuste de un solo theme (el port), no edición
    diffs.push(`  - \`${k}\`: Shrine ${short(a[k])} → Dawn ${short(b[k])}`);
  }
  total += diffs.length;
  if (diffs.length || oneSide) out.push(`- \`${rel}\`: ${diffs.length} ediciones${oneSide ? ` (+${oneSide} ajustes que existen en un solo theme: no son ediciones)` : ''}`, ...diffs);
}
out.push('', `Total: ${total} valores distintos.`);
console.log(out.join('\n'));
