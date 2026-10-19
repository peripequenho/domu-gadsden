// Para mapear una sección propia de Gero: schema de Shrine, valores de DOMU, textos visibles escritos dentro de
// su Liquid (copia del Dawn vivo; código de DOMU) y schema del widget de Gadsden. Uso:
//   node tools/dump_landing.js <plantilla> <tipoShrine> <tipoGadsden> > tmp/land/<tipo>.txt
const { fs, path, REF, LIVE, readJSON } = require('./lib');
const { execFileSync } = require('child_process');
const [tpl, type, gad] = process.argv.slice(2);
const sh = (...a) => execFileSync('node', [path.join(__dirname, 'schema.js'), ...a], { encoding: 'utf8' });
console.log(sh(type, '--ref'));
const j = readJSON(path.join(REF, 'templates', tpl + '.json'));
for (const id of j.order) {
  const s = j.sections[id];
  if (s.type !== type || s.disabled) continue;
  console.log(`== VALORES ${id}`, JSON.stringify(s.settings));
  for (const b of s.block_order || []) { const x = s.blocks[b]; if (!x.disabled) console.log(`  ${b} ${x.type}`, JSON.stringify(x.settings)); }
}
const lf = path.join(LIVE, 'sections', type + '.liquid');
if (fs.existsSync(lf)) {
  const src = fs.readFileSync(lf, 'utf8').split(/\{%-?\s*schema/)[0]
    .replace(/<style[\s\S]*?<\/style>/g, '').replace(/<script[\s\S]*?<\/script>/g, '').replace(/\{%-?\s*comment\s*-?%\}[\s\S]*?\{%-?\s*endcomment\s*-?%\}/g, '');
  const texts = [...src.matchAll(/>([^<>{}]*[A-Za-zÁÉÍÓÚáéíóúñ]{3,}[^<>{}]*)</g)].map(m => m[1].trim()).filter(t => t.length > 2);
  console.log(`\n== TEXTOS ESCRITOS EN EL LIQUID (${texts.length})`); texts.forEach(t => console.log('  · ' + t.slice(0, 200)));
  const sets = [...new Set([...src.matchAll(/(section|block)\.settings\.(\w+)/g)].map(m => m[0]))];
  console.log('== AJUSTES QUE USA', sets.join(' '));
}
if (gad) console.log('\n' + sh(gad).split('\n').filter(l => !/cc_|title_scale|text_scale|anchor/.test(l)).join('\n'));
