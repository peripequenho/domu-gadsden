// Productos, páginas y colecciones con su plantilla (templateSuffix) desde la Admin API -> tmp/suffixes.json
// Uso: node tools/suffixes.js
const { path, ROOT, gql, writeJSON } = require('./lib');
const page = (field, extra) => {
  const out = []; let after = null;
  do {
    const d = gql(`query($after: String) { ${field}(first: 250, after: $after) { pageInfo { hasNextPage endCursor } nodes { handle title templateSuffix ${extra} } } }`, { after });
    out.push(...d[field].nodes);
    after = d[field].pageInfo.hasNextPage ? d[field].pageInfo.endCursor : null;
  } while (after);
  return out;
};
const tryPage = (f, e) => { try { return page(f, e); } catch (err) { console.log(`${f}: sin acceso (${String(err.stdout).match(/Access denied[^.]*/) || 'error'})`); return []; } };
const res = { products: tryPage('products', 'status onlineStoreUrl'), pages: tryPage('pages', 'isPublished'), collections: tryPage('collections', '') };
writeJSON(path.join(ROOT, 'tmp/suffixes.json'), res);
for (const [k, list] of Object.entries(res)) {
  const by = {}; list.forEach(x => (by[x.templateSuffix || '(defecto)'] = by[x.templateSuffix || '(defecto)'] || []).push(x.handle + (x.status && x.status !== 'ACTIVE' ? ` [${x.status}]` : '') + (x.status === 'ACTIVE' && !x.onlineStoreUrl ? ' [sin canal]' : '')));
  console.log(`\n## ${k} (${list.length})`);
  for (const [s, h] of Object.entries(by)) console.log(`- ${s} ×${h.length}: ${h.length > 8 ? h.slice(0, 8).join(', ') + ' …' : h.join(', ')}`);
}
