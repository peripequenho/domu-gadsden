// Imprime el schema de una sección (de Gadsden por defecto, o de la referencia con --ref) con tipo, default,
// rango y opciones de cada ajuste. Con "settings_schema" imprime los ajustes globales.
// Uso: node tools/schema.js <seccion|settings_schema> [bloque1,bloque2] [--ref]
const { fs, path, THEME, REF, readJSON, schemaOf } = require('./lib');
const args = process.argv.slice(2);
const ref = args.includes('--ref');
const [name, only] = args.filter(a => a !== '--ref');
const dir = ref ? REF : THEME;
const line = x => `  ${x.id} ${x.type} def=${JSON.stringify(x.default)}` +
  (x.options ? ` [${x.options.map(o => o.value).join('/')}]` : '') +
  (x.min !== undefined ? ` ${x.min}..${x.max} step ${x.step || 1}${x.unit ? ' ' + x.unit : ''}` : '') +
  (x.label && !String(x.label).startsWith('t:') ? `  «${String(x.label).slice(0, 50)}»` : '');
if (name === 'settings_schema') {
  for (const g of readJSON(path.join(dir, 'config/settings_schema.json'))) {
    if (only && !String(g.name).toLowerCase().includes(only.toLowerCase())) continue;
    console.log(`## ${g.name}`);
    (g.settings || []).filter(x => x.id).forEach(x => console.log(line(x)));
  }
  process.exit();
}
const sch = schemaOf(dir, name);
if (!sch) { console.log('sin schema: ' + name); process.exit(1); }
if (!only) {
  console.log(`## ${name}: ${sch.name}${sch.max_blocks ? ' max_blocks ' + sch.max_blocks : ''}`);
  (sch.settings || []).filter(x => x.id).forEach(x => console.log(line(x)));
}
for (const b of sch.blocks || []) {
  if (only && !only.split(',').includes(b.type)) continue;
  console.log(`# bloque ${b.type} (${b.name})${b.limit ? ' limit ' + b.limit : ''}`);
  (b.settings || []).filter(x => x.id).forEach(x => console.log(line(x)));
}
