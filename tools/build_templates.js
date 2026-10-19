// Genera plantillas de Gadsden desde las de la referencia Shrine, sección por sección (mismos ids y orden).
// Uso: node tools/build_templates.js <grupo|plantilla...>   grupos: pages, products, all
//   node tools/build_templates.js pages            (todo lo que no es product.*)
//   node tools/build_templates.js product.gps-landing
// Reporte en tmp/report-<grupo>.json (errores, redondeos, sin traducir, notas).
const { fs, path, REF, THEME, ROOT, readJSON, writeJSON } = require('./lib');
const { newReport } = require('./translate');
const { translateSection } = require('./sections');
require('./sections_pages');
try { require('./sections_landings'); require('./sections_athlex'); require('./sections_ct'); } catch (e) { if (e.code !== 'MODULE_NOT_FOUND') throw e; }
try { require('./sections_product'); } catch (e) { if (e.code !== 'MODULE_NOT_FOUND') throw e; }
const post = (() => { try { return require('./postprocess'); } catch (e) { if (e.code !== 'MODULE_NOT_FOUND') throw e; return null; } })();

const all = [
  ...fs.readdirSync(path.join(REF, 'templates')).filter(f => f.endsWith('.json')).map(f => f.replace('.json', '')),
  ...fs.readdirSync(path.join(REF, 'templates/customers')).filter(f => f.endsWith('.json')).map(f => 'customers/' + f.replace('.json', '')),
];
const arg = process.argv.slice(2);
const list = arg.flatMap(a => a === 'all' ? all : a === 'pages' ? all.filter(t => !t.startsWith('product.')) : a === 'products' ? all.filter(t => t.startsWith('product.')) : [a]);
const label = arg.join('+').replace(/[^\w+.-]/g, '_');
// Secciones propias de Gero que se copian tal cual (ver más abajo).
// (20-oct) Gero eligió widgets de Gadsden para ATHLEX: no se copia ninguna sección propia. Queda el mecanismo por si hiciera falta.
const OWN = /^$a/;
// (20-oct) Gero: los widgets de Gadsden tienen que ser el código propio. Los de CarboTiras ya lo son (mismo código y mismos
// ids de ajustes), así que la sección pasa con sus ajustes originales sin traducir, sólo con el tipo cambiado.
const OWN_AS = {
  'ct-hero': 'gad-rotating-hero', 'ct-pasos': 'gad-auto-steps', 'ct-resenas': 'gad-review-rows', 'ct-beneficios': 'gad-cropped-cards',
  'ct-coverflow': 'gad-coverflow', 'ct-garantia': 'gad-guarantee', 'ct-cierre': 'gad-closing', 'ct-comparar': 'gad-compare-reveal',
  'athlex-dolor': 'gad-reveal-cards', 'athlex-mecanismo': 'gad-stamps', 'athlex-uso': 'gad-timed-steps', 'athlex-ingredientes': 'gad-posters',
  'athlex-proceso': 'gad-chapters', 'athlex-reviews': 'gad-reviews-wall', 'athlex-legal': 'gad-legal', 'athlex-progreso': 'gad-reading-progress',
  'athlex-test': 'gad-quiz', 'athlex-nota': 'gad-article', 'athlex-skin': 'gad-landing-skin', 'athlex-reviews-mini': 'gad-reviews-mini',
  'athlex-faq': 'gad-objections',
  'gps-steps': 'gad-icon-content', 'gps-comparativa': 'gad-vs-table', 'gps-marquee': 'gad-marquee', 'gps-cta': 'gad-cta-final',
};
// Pedido de Gero (20-oct): el antes/después de ATHLEX es el de CarboTiras (gad-compare-reveal) con las fotos y etiquetas de ATHLEX.
const OWN_FN = {
  'product.athlex-landing': {
    'comparison-slider': e => ({ type: 'gad-compare-reveal', settings: {
      heading: '', heading_size: 'h2', before_image: e.before_image, after_image: e.after_image, labels: true,
      before_label: e.before_label, after_label: e.after_label, ratio: '4 / 5', max_width: 360, corner: 20, note: '',
      background: '#E6DFCE', text_color: '#141210', padding_top: 24, padding_bottom: 24 } }),
  },
};
const report = newReport();
for (const t of list) {
  const j = readJSON(path.join(REF, 'templates', t + '.json'));
  const out = { ...j, sections: {} };
  delete out.order;
  const order = [];
  for (const id of j.order || Object.keys(j.sections)) {
    const s = j.sections[id];
    if (!s) continue;
    if (s.disabled) { report.notes.push(`${t}#${id} (${s.type}): desactivada en la referencia, no se migra`); continue; }
    // Secciones propias de Gero (código de DOMU, no de Shrine): por pedido de Gero (19-oct) van copiadas tal cual,
    // con sus ajustes originales, en vez de reproducirlas con widgets de Gadsden. El .liquid vive en theme/sections/.
    if (OWN.test(s.type) && fs.existsSync(path.join(THEME, 'sections', s.type + '.liquid'))) {
      const c = JSON.parse(JSON.stringify(s));
      for (const [bid, b] of Object.entries(c.blocks || {})) if (b.disabled) { delete c.blocks[bid]; c.block_order = (c.block_order || []).filter(x => x !== bid); }
      out.sections[id] = c; order.push(id);
      report.notes.push(`${t}#${id} (${s.type}): sección propia copiada tal cual`);
      continue;
    }
    const fn = (OWN_FN[t] || {})[s.type];
    if (fn) {
      out.sections[id] = fn(s.settings || {}); order.push(id);
      report.notes.push(`${t}#${id} (${s.type}): ${out.sections[id].type} (pedido de Gero)`);
      continue;
    }
    if (OWN_AS[s.type]) {
      const c = JSON.parse(JSON.stringify(s));
      c.type = OWN_AS[s.type];
      for (const [bid, b] of Object.entries(c.blocks || {})) if (b.disabled) { delete c.blocks[bid]; c.block_order = (c.block_order || []).filter(x => x !== bid); }
      out.sections[id] = c; order.push(id);
      report.notes.push(`${t}#${id} (${s.type}): código propio en ${c.type}, ajustes originales`);
      continue;
    }
    const r = translateSection(s, id, `${t}#${id}`, report);
    if (!r) continue;
    const after = r.__after || []; delete r.__after;
    out.sections[id] = post ? post(r, { template: t, id, src: s, report }) : r;
    order.push(id);
    for (const a of after) { out.sections[a.id] = post ? post(a.section, { template: t, id: a.id, src: s, report }) : a.section; order.push(a.id); }
  }
  // (20-oct) Gero: la ficha de ATHLEX va con el fondo de la marca. En Shrine las secciones no pintaban fondo y se veía el
  // papel del skin; en Gadsden pintan la combinación 1. El estilo de página la pasa a papel y tinta (sólo colores).
  if (t === 'product.athlex-landing') {
    out.sections.page_style = { type: 'gad-page-style', settings: { colors_on: true, bg: '#E6DFCE', text: '#141210', button: '#141210', button_text: '#E6DFCE' } };
    order.push('page_style');
  }
  out.order = order;
  writeJSON(path.join(THEME, 'templates', t + '.json'), out);
}
writeJSON(path.join(ROOT, `tmp/report-${label}.json`), report);
console.log(`${list.length} plantillas; errores ${report.errors.length}, redondeos ${report.rounded.length}, sin traducir ${report.unread.length}, notas ${report.notes.length}`);
for (const k of ['errors', 'unread', 'rounded', 'notes']) report[k].forEach(x => console.log(`[${k}] ${x}`));
