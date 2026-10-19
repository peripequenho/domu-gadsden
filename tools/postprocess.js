// Posproceso de cada sección generada. Único cambio al código propio de DOMU: en el custom liquid, las imágenes
// que Shrine cargaba de los assets del theme (`'bank-…svg' | asset_url`, `ct-cara-*`, `ct-pack-*`) salen de
// Contenido > Archivos (`| file_url`), porque en Gadsden nativo esos archivos no van en assets/. Mismo nombre de
// archivo; el resto del código queda tal cual.
// La sección athlex-skin de Shrine repintaba con CSS, sólo en la plantilla athlex-landing, las secciones comunes que
// Gero sumó desde el editor: cintas en tinta con texto papel en mayúsculas de 12 px, slider y antes/después sobre papel
// y sin redondeo. En Gadsden eso son ajustes de cada sección: se cargan acá, sólo en esa plantilla.
const SKIN = {
  'gad-ticker': { custom_colors: true, cc_bg: '#141210', cc_text: '#E6DFCE', uppercase: true, text_size_m: 12, text_size_d: 12 },
  'gad-media-slider': { custom_colors: true, cc_bg: '#E6DFCE', cc_text: '#141210', radius_d: 0, radius_m: 0 },
  // Pedido de Gero (20-oct): el antes/después de ATHLEX igual al de CarboTiras (línea elástica con barrido al aparecer,
  // centrado, 360 px), con las fotos y etiquetas de ATHLEX. Colores del original (medidos en capturas/original/athlex-ba-*):
  // fondo claro (sin el papel), etiquetas azul #0B1F3A con texto claro (scheme-4), línea y manija rellena lima, flechas #1B1B1B.
  'gad-before-after': { custom_colors: false, color_scheme: 'scheme-1', elastic: true, labels_style: 'pill', labels_scheme: 'scheme-4',
    max_width: 360, align: 'center', m_align: 'center', handle_style: 'filled', handle_arrows: 'foreground', line_custom: '#93D920', padding_top: 24, padding_bottom: 24 },
};
// Pedidos de Gero (20-oct) sobre el código propio de DOMU en custom liquid (no es código de Shrine): reemplazos exactos,
// en todas las plantillas donde aparezca el mismo código. Cuotas y transferencia "como en MeLi": legibles (14 px) pero
// compactas (todo el pago en ~15 % de la pantalla del celular: sin márgenes de 15 px, cuotas en un renglón); chips con
// menos aire horizontal y letra más grande.
const CL = [
  ['.meli-cuotas{\n  color:#00a650;\n  font-size:10px;\n  line-height:1.2;\n  margin-top:2px;', '.meli-cuotas{\n  color:#00a650;\n  font-size:13px;\n  letter-spacing:0;\n  line-height:1.25;\n  margin:0;'],
  ['<strong>3 cuotas sin<br> interés de:</strong>', '<strong>3 cuotas sin interés de:</strong>'],
  ['.meli-cuotas__amount{\n  font-size:10px;', '.meli-cuotas__amount{\n  font-size:13px;'],
  ['.meli-transf{\n  color:#00a650;\n  font-size:10px;\n  line-height:1.2;\n  margin-top:3px;', '.meli-transf{\n  color:#00a650;\n  font-size:14px;\n  line-height:1.25;\n  margin:1px 0 0;'],
  ['.meli-transf__amount{\n  font-size:10px;', '.meli-transf__amount{\n  font-size:14px;'],
  ['  font-size:9px;\n  font-weight:700;\n  padding:1px 6px;', '  font-size:12px;\n  font-weight:700;\n  padding:1px 6px;'],
  ['  padding:0;\n  display:inline-flex;\n  gap:6px;\n  font-size:14px;', '  padding:0;\n  margin:1px 0 0;\n  display:inline-flex;\n  gap:6px;\n  font-size:13px;'],
  ['  padding:9px 12px;\n  border:1.5px solid var(--axb-line);', '  padding:7px 9px;\n  border:1.5px solid var(--axb-line);'],
  ['  font-size:11px;font-weight:800;line-height:1.15;\n  letter-spacing:.035em;', '  font-size:12px;font-weight:800;line-height:1.15;\n  letter-spacing:.01em;'],
  ['.axb-tick li{padding:8px 9px;font-size:10px;gap:6px;letter-spacing:.02em}', '.axb-tick li{padding:6px 8px;font-size:12px;gap:5px;letter-spacing:.01em}'],
  // CarboTiras (pedido de Gero: "lo del precio y del resto de cosas que te dije con ATHLEX, acá también")
  ['.ctb-cuotas{color:#00a650;font-size:10px;line-height:1.2;margin-top:2px}', '.ctb-cuotas{color:#00a650;font-size:13px;letter-spacing:0;line-height:1.25;margin:0}'],
  ['.ctb-cuotas__amount,.ctb-transf__amount{font-size:10px;', '.ctb-cuotas__amount,.ctb-transf__amount{font-size:inherit;'],
  ['.ctb-transf{color:#00a650;font-size:10px;line-height:1.2;margin-top:3px}', '.ctb-transf{color:#00a650;font-size:14px;line-height:1.25;margin:1px 0 0}'],
  ['color:#fff;font-size:9px;font-weight:700;padding:1px 6px;', 'color:#fff;font-size:12px;font-weight:700;padding:1px 6px;'],
  ['padding:9px 12px;border:1.5px solid var(--ctb-line);', 'padding:7px 9px;border:1.5px solid var(--ctb-line);'],
  ['font-size:11px;font-weight:800;line-height:1.15;\n  letter-spacing:.035em;text-transform:uppercase}', 'font-size:12px;font-weight:800;line-height:1.15;\n  letter-spacing:.01em;text-transform:uppercase}'],
  ['.ctb-tick li{padding:8px 9px;font-size:10px;gap:6px;letter-spacing:.02em}', '.ctb-tick li{padding:6px 8px;font-size:12px;gap:5px;letter-spacing:.01em}'],
  // Barra fija de CarboTiras: el CSS propio apuntaba a las clases de la barra de Shrine (.sticky-atc); en Gadsden la barra
  // es <gad-sticky-bar>. Mismas reglas sobre las clases de Gadsden: CTA en un renglón y la barra entra con el primer scroll.
  ['.sticky-atc .sticky-atc__label__text{white-space:nowrap;font-size:clamp(14px,4.2vw,18px);letter-spacing:.01em}', 'gad-sticky-bar .gad-sticky__row .gad-sticky__btn{white-space:nowrap;font-size:clamp(14px,4.2vw,18px);letter-spacing:.01em}'],
  ['.sticky-atc{transition:transform .35s cubic-bezier(.22,1,.36,1),opacity .3s ease}', 'gad-sticky-bar{transition:transform .35s cubic-bezier(.22,1,.36,1),opacity .3s ease}'],
  ['html:not(.ctb-scrolleo) .sticky-atc{transform:translateY(110%);opacity:0;pointer-events:none}', 'html:not(.ctb-scrolleo) gad-sticky-bar{transform:translateY(110%);opacity:0;pointer-events:none}'],
  ['@media (prefers-reduced-motion: reduce){.sticky-atc{transition:opacity .3s ease}html:not(.ctb-scrolleo) .sticky-atc{transform:none}}', '@media (prefers-reduced-motion: reduce){gad-sticky-bar{transition:opacity .3s ease}html:not(.ctb-scrolleo) gad-sticky-bar{transform:none}}'],
];
// Precio de ATHLEX como el original (pedidos de Gero): grande y en black (letra de los títulos = Archivo Black, escala
// 125 %), precio anterior arriba y "Ahorrás" en una segunda columna con la letra de los títulos; poco aire abajo.
// (20-oct) Con el skin original de ATHLEX (gad-landing-skin) de vuelta, el precio lo pinta el skin como en el original: sólo poco aire abajo.
const PRICE = {
  'product.athlex-landing': { margin_bottom: 4 },
  // CarboTiras no tiene skin: el precio grande y en black, el anterior arriba y "Ahorrás" al costado son opciones de Gadsden.
  'product.carbotiras-nativo': { price_font: 'heading', fs_scale: '125', order: 'compare_above', badge_font: 'heading', margin_bottom: 4 },
};
// Para que el pago entre en ~15 % de la pantalla, los sellos "Compra con seguridad" (app) van debajo del botón de compra.
const AFTER_BUY = { 'product.athlex-landing': ['conversion_bear_trust_badges_widget_6q4bBR'], 'product.carbotiras-nativo': ['sellos'] };
module.exports = function post(sec, { template, id, src, report }) {
  if (id === 'main' && PRICE[template]) for (const b of Object.values(sec.blocks || {})) if (b.type === 'price') {
    Object.assign(b.settings, PRICE[template]);
    report.notes.push(`${template}#main: precio con ${JSON.stringify(PRICE[template])}`);
  }
  if (id === 'main' && AFTER_BUY[template]) for (const bid of AFTER_BUY[template]) {
    const o = sec.block_order || [];
    const buy = o.find(k => sec.blocks[k] && sec.blocks[k].type === 'buy_buttons');
    if (!o.includes(bid) || !buy) throw new Error(`${template}#main: falta ${bid} o el bloque de compra`);
    o.splice(o.indexOf(bid), 1);
    o.splice(o.indexOf(buy) + 1, 0, bid);
    report.notes.push(`${template}#main: ${bid} debajo del botón de compra`);
  }
  if (template === 'product.athlex-landing' && SKIN[sec.type] && !String(src.type).startsWith('athlex-')) {
    Object.assign(sec.settings, SKIN[sec.type]);
    report.notes.push(`${template}#${id}: colores del skin de ATHLEX (${Object.keys(SKIN[sec.type]).join(', ')})`);
  }
  const fix = (code, where) => {
    if (typeof code !== 'string' || !code.includes('asset_url')) return code;
    const n = (code.match(/\|\s*asset_url/g) || []).length;
    report.notes.push(`${template}#${where}: custom liquid con ${n} \`asset_url\` → \`file_url\` (imágenes en Archivos)`);
    return code.replace(/\|\s*asset_url/g, '| file_url');
  };
  // Sólo en las fichas de ATHLEX y CarboTiras: los pedidos de Gero fueron sobre esas (las otras con el mismo código quedan como estaban).
  const tweak = (code, where) => {
    if (typeof code !== 'string' || !['product.athlex-landing', 'product.carbotiras-nativo'].includes(template)) return code;
    const hits = CL.filter(([a]) => code.includes(a));
    if (hits.length) report.notes.push(`${template}#${where}: ${hits.length} ajustes de letra/aire (pedido de Gero)`);
    return hits.reduce((c, [a, b]) => c.split(a).join(b), code);
  };
  if (sec.settings && sec.settings.custom_liquid) sec.settings.custom_liquid = fix(sec.settings.custom_liquid, id);
  for (const [bid, b] of Object.entries(sec.blocks || {})) if (b.settings && b.settings.custom_liquid) b.settings.custom_liquid = tweak(fix(b.settings.custom_liquid, `${id} > ${bid}`), `${id} > ${bid}`);
  return sec;
};
