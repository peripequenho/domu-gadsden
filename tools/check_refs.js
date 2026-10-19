// Comprueba que cada shopify://shop_images/<archivo> y shopify://files/videos/<archivo> de theme/ (plantillas,
// grupos, settings_data) exista en Contenido > Archivos con ese nombre exacto (tmp/files.json, de files_pull.js).
// Shopify deja el ajuste vacío sin avisar si no existe. Uso: node tools/check_refs.js
const { fs, path, THEME, ROOT } = require('./lib');
const files = new Set(require(path.join(ROOT, 'tmp/files.json')).map(f => f.name));
const targets = [
  ...fs.readdirSync(path.join(THEME, 'templates')).filter(f => f.endsWith('.json')).map(f => 'templates/' + f),
  ...fs.readdirSync(path.join(THEME, 'templates/customers')).map(f => 'templates/customers/' + f),
  ...fs.readdirSync(path.join(THEME, 'sections')).filter(f => f.endsWith('.json')).map(f => 'sections/' + f),
  'config/settings_data.json',
];
const missing = {}; let total = 0;
for (const t of targets) {
  const txt = fs.readFileSync(path.join(THEME, t), 'utf8');
  for (const m of txt.matchAll(/shopify:\/\/(shop_images|files\/videos)\/([^"\\]+)/g)) {
    total++;
    const name = decodeURIComponent(m[2]);
    if (!files.has(name)) (missing[name] = missing[name] || new Set()).add(t);
  }
}
console.log(`${total} referencias; ${Object.keys(missing).length} archivos que no están en Archivos:`);
for (const [n, ts] of Object.entries(missing)) console.log(`- ${n}  (${[...ts].join(', ')})`);
process.exit(Object.keys(missing).length ? 1 : 0);
