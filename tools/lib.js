// Lectura común: JSON de la referencia Shrine (sólo JSON y schemas), theme de Gadsden y Admin API.
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const ROOT = path.join(__dirname, '..');
const REF = 'D:/_refs/shrine-domu-og-2026-10-15';
const LIVE = 'D:/_refs/domu-live-167661797539';
const THEME = path.join(ROOT, 'theme');
const strip = s => s.replace(/^\uFEFF/, '').replace(/^\s*\/\*[\s\S]*?\*\//, '');
const readJSON = f => JSON.parse(strip(fs.readFileSync(f, 'utf8')));
const schemaRe = /\{%-?\s*schema\s*-?%\}([\s\S]*?)\{%-?\s*endschema\s*-?%\}/;
// Sólo se lee el bloque {% schema %} de cada sección; el resto del archivo no se usa.
const schemaCache = {};
function schemaOf(dir, type) {
  const key = dir + '|' + type;
  if (key in schemaCache) return schemaCache[key];
  const f = path.join(dir, 'sections', type + '.liquid');
  let sch = null;
  if (fs.existsSync(f)) { const m = fs.readFileSync(f, 'utf8').match(schemaRe); try { sch = m ? JSON.parse(m[1].replace(/,(\s*[\]}])/g, '$1')) : null; } catch { sch = null; } }
  return (schemaCache[key] = sch);
}
const defaults = settings => Object.fromEntries((settings || []).filter(s => s.id).map(s => [s.id, s.default]));
const writeJSON = (f, obj) => { fs.mkdirSync(path.dirname(f), { recursive: true }); fs.writeFileSync(f, JSON.stringify(obj, null, 2) + '\n'); };
// Admin GraphQL por la CLI (con --query-file, sin problemas de comillas). Devuelve el objeto data.
function gql(query, variables) {
  const tmp = path.join(ROOT, 'tmp'); fs.mkdirSync(tmp, { recursive: true });
  const qf = path.join(tmp, 'q.graphql'); fs.writeFileSync(qf, query);
  const args = ['store', 'execute', '--store', 'mem1a9-ev', '--query-file', qf, '--json', '--no-input'];
  if (variables) { const vf = path.join(tmp, 'v.json'); fs.writeFileSync(vf, JSON.stringify(variables)); args.push('--variable-file', vf); }
  if (/^\s*mutation/.test(query)) args.push('--allow-mutations');
  const out = execFileSync('shopify', args, { encoding: 'utf8', shell: true, maxBuffer: 1 << 28 });
  return JSON.parse(out.slice(out.indexOf('{')));
}
// Plantillas y grupos de la referencia, en orden, sin los desactivados.
function refFiles() {
  const t = fs.readdirSync(path.join(REF, 'templates')).filter(f => f.endsWith('.json')).map(f => 'templates/' + f);
  const c = fs.readdirSync(path.join(REF, 'templates/customers')).filter(f => f.endsWith('.json')).map(f => 'templates/customers/' + f);
  const g = fs.readdirSync(path.join(REF, 'sections')).filter(f => f.endsWith('.json')).map(f => 'sections/' + f);
  return [...t, ...c, ...g];
}
module.exports = { fs, path, ROOT, REF, LIVE, THEME, strip, readJSON, schemaOf, defaults, writeJSON, gql, refFiles };
