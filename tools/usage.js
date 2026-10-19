// Matriz de uso de la referencia: sección y bloque -> archivos donde está activo; apps, embeds y lo desactivado.
// Uso: node tools/usage.js > tmp/usage.txt
const { REF, path, readJSON, refFiles } = require('./lib');
const secUse = {}, blkUse = {}, apps = {}, disabled = [];
const add = (m, k, t) => { (m[k] = m[k] || []).push(t); };
for (const rel of refFiles()) {
  const j = readJSON(path.join(REF, rel));
  const t = rel.replace(/^(templates|sections)\//, '').replace('.json', '');
  for (const id of j.order || Object.keys(j.sections || {})) {
    const s = j.sections[id];
    if (!s) continue;
    if (s.disabled) { disabled.push(`${t} > ${id} (${s.type})`); continue; }
    add(secUse, s.type, t);
    for (const bid of s.block_order || Object.keys(s.blocks || {})) {
      const b = (s.blocks || {})[bid];
      if (!b) continue;
      if (b.disabled) { disabled.push(`${t} > ${id} > ${bid} (${b.type})`); continue; }
      if (b.type.startsWith('shopify://apps/')) add(apps, b.type + ' (en ' + s.type + ')', t);
      else add(blkUse, s.type + ' > ' + b.type, t);
    }
  }
}
const sd = readJSON(path.join(REF, 'config/settings_data.json')).current;
for (const [id, s] of Object.entries(sd.sections || {})) {
  add(secUse, s.type + ' [settings_data]', id);
  for (const b of Object.values(s.blocks || {})) if (!b.disabled) add(blkUse, s.type + ' > ' + b.type, 'settings_data');
}
const pr = (title, m) => {
  console.log(`\n### ${title}\n`);
  Object.entries(m).sort((a, b) => b[1].length - a[1].length).forEach(([k, v]) => {
    const cnt = {}; v.forEach(x => cnt[x] = (cnt[x] || 0) + 1);
    console.log(`- \`${k}\` ×${v.length}: ${Object.entries(cnt).map(([x, n]) => n > 1 ? `${x} (${n})` : x).join(', ')}`);
  });
};
pr('Secciones activas', secUse);
pr('Bloques activos', blkUse);
pr('Bloques de apps', apps);
console.log('\n### App embeds (settings_data.current.blocks)\n');
for (const [id, b] of Object.entries(sd.blocks || {})) console.log(`- \`${b.type}\` id \`${id}\`${b.disabled ? ' (apagado)' : ''}`);
console.log('\n### Desactivado en la referencia (no se migra)\n');
disabled.forEach(d => console.log('- ' + d));
