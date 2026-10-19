// Para cada tipo de sección y bloque activo en la referencia: qué ajustes tiene DOMU distintos del default
// del schema de Shrine (se lee sólo el {% schema %}). Incluye grupos, variantes por mercado y estáticas.
// Uso: node tools/settings_used.js > tmp/settings_used.json
const { REF, path, readJSON, schemaOf, defaults, refFiles } = require('./lib');
const out = {};
function visit(s, where) {
  if (!s || s.disabled) return;
  const sch = schemaOf(REF, s.type) || {};
  const sd = defaults(sch.settings);
  const rec = out[s.type] = out[s.type] || { where: [], schema: !!sch.settings, changed: {}, blocks: {} };
  rec.where.push(where);
  for (const [k, v] of Object.entries(s.settings || {})) if (JSON.stringify(sd[k]) !== JSON.stringify(v)) (rec.changed[k] = rec.changed[k] || new Set()).add(JSON.stringify(v).slice(0, 70));
  for (const b of Object.values(s.blocks || {})) {
    if (b.disabled || b.type.startsWith('shopify://')) continue;
    const bs = (sch.blocks || []).find(x => x.type === b.type);
    const bd = defaults(bs && bs.settings);
    const br = rec.blocks[b.type] = rec.blocks[b.type] || { count: 0, changed: {} };
    br.count++;
    for (const [k, v] of Object.entries(b.settings || {})) if (JSON.stringify(bd[k]) !== JSON.stringify(v)) (br.changed[k] = br.changed[k] || new Set()).add(JSON.stringify(v).slice(0, 70));
  }
}
for (const rel of refFiles()) {
  const j = readJSON(path.join(REF, rel));
  for (const id of j.order || Object.keys(j.sections || {})) visit(j.sections[id], rel.replace(/^(templates|sections)\//, '').replace('.json', '') + '#' + id);
}
const sd = readJSON(path.join(REF, 'config/settings_data.json')).current;
for (const [id, s] of Object.entries(sd.sections || {})) visit(s, 'settings_data#' + id);
console.log(JSON.stringify(out, (k, v) => v instanceof Set ? [...v].slice(0, 5) : v, 1));
