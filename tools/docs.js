// Arma MAPEO.md, GAPS-GADSDEN.md y COMPARACION.md desde los traductores (tools/sections*.js) y los reportes de
// build_globals.js / build_templates.js (tmp/report-*.json) y las verificaciones (capturas/nuevo/*.json).
// Uso: node tools/build_globals.js && node tools/build_templates.js all && node tools/docs.js
const { fs, path, ROOT, REF, THEME, readJSON } = require('./lib');
const { TR } = require('./sections');
require('./sections_pages'); require('./sections_landings'); require('./sections_athlex'); require('./sections_ct'); require('./sections_product');
const rep = ['globals', 'all'].map(n => readJSON(path.join(ROOT, `tmp/report-${n}.json`)));
const notes = rep.flatMap(r => r.notes), rounded = rep.flatMap(r => r.rounded);
const usage = fs.readFileSync(path.join(ROOT, 'tmp/usage.txt'), 'utf8');
const used = new Set([...usage.matchAll(/^- `([^`\s]+)(?: \[settings_data\])?` ×/gm)].map(m => m[1]));
const LEVEL = t => notes.some(n => n.includes(`(${t})`) && /GAP/.test(n)) ? 'N0 + GAP' : 'N0';

// ---------- MAPEO ----------
const M = ['# Mapeo Shrine (DOMU) → Gadsden 1.1.0', '',
  'Niveles: **N0** = sale con ajustes de Gadsden; **GAP** = algo de Shrine sin ajuste equivalente (detalle en [GAPS-GADSDEN.md](GAPS-GADSDEN.md)). DOMU no tiene N1 ni N2: nada de CSS ni secciones propias.', '',
  'El mapeo es código: cada fila sale de un traductor de `tools/sections*.js` (`build_globals.js` para los globales). El motor (`tools/translate.js`) lee los ajustes efectivos de Shrine (default del schema + lo guardado), registra cuáles usó el traductor, valida contra el schema de Gadsden (ids, opciones, min/max/step) y reporta lo que quedó sin traducir. Resultado de la última corrida: **0 errores, 0 ajustes sin traducir**.', '',
  '## Ajustes globales', '',
  '| Shrine | Gadsden | Nota |', '|---|---|---|',
  '| Paleta de 5 colores (`colors_*`, `gradient_*`) y esquemas fijos background-1, background-2, inverse, accent-1, accent-2 | `color_schemes` scheme-1..5 | misma lógica de Dawn viejo (fondo, texto, botón, etiqueta del botón, botón de contorno); los degradés de accent-1/2 como degradé de la combinación |',
  '| Logo, logo secundario, anchos 110/50, favicon | `logo`, `logo_secondary`, `logo_width`, `logo_width_mobile`, `favicon` | |',
  '| Poppins 700 / Harmonia Sans 400, escalas, interlineados, interletrado | mismos ids | Estilo base: Clásico |',
  '| Animación de entrada (`enable_load_animations`, `animation_*`) | `animations_reveal_on_scroll`, `reveal_*` | mismos valores |',
  '| Botones, píldoras, campos, tarjetas (producto, colección, blog), cajas, medios, popups, drawers | mismos ids de Dawn | |',
  '| Hover de botones (glow / center / left / arrow) | `button_fx_link`, `button_fx_action` | center → fill-center, left → fill-left |',
  '| Selectores (`pickers_*`), cantidad (`quantity_*`), píldoras de variantes, muestras | `dd_*`, `q_*`, `pill_*`, `swatch_*` | colores sueltos → rol (text → foreground, accent-1 → accent); redondeo de muestras 0–100 % → 0–50 % |',
  '| Flechas y puntos de los sliders (`slider_arrow_*`, `pagination_dot_*`) | `carousel_arrow_*`, `carousel_dot_*`; corte de desktop 750 px | flecha 30 × 1,05 = 32 px (Shrine mide en rem, medido en Limbex) |',
  '| Etiquetas (posición, redondeo, combinaciones, texto "Ahorras [percentage]!", etiquetas propias) | `badge_*`, `card_badge_position`, `sale_label_text` (`{porcentaje}`), `card_badges_tags` | |',
  '| Carrito (tipo, ícono bag_2, nota, seguir comprando) | `cart_type`, `cart_icon: bag-2`, … | |',
  '| Volver arriba (sección fija) | `back_to_top_*` (global) | |',
  '| Proteger contenido (`disable_inspect`), países (lista vacía) | `protect_content`, `geo_mode: off` | |',
  '| Barra de scroll, cursor | `custom_scrollbar`, `scrollbar_*`, `cursor_image` | |',
  '| `animations_type`, `fav_collection` | — | candado de licencia de Shrine: no se migra |',
  '| `checkout_*_color` | — | sin efecto (el checkout tiene su editor) |',
  '| Globales viejos del carrito (`enable_cart_timer`, `cart_progress_*`, `cart_upsell_*`) | — | sin schema en Shrine 1.3.0; el cajón va por bloques |',
  '| App embeds (Judge.me, Clarity ×2, Kaching Bundles, MP Antifraud) | `current.blocks` con los mismos ids | Clarity brandAgents sigue apagado |', '',
  '## Secciones y bloques', '',
  '| Shrine | Gadsden | Nivel | Bloques (Shrine → Gadsden) |', '|---|---|---|---|'];
for (const [t, tr] of Object.entries(TR).sort()) {
  if (!used.has(t)) continue;
  const to = typeof tr.to === 'function' ? '(según ajustes)' : `\`${tr.to}\``;
  const bl = Object.entries(tr.blocks || {}).map(([b, x]) => x === null ? `${b} → (no se migra)` : `${b} → ${typeof x.to === 'function' ? '…' : x.to}`).join(', ');
  M.push(`| \`${t}\` | ${to}${tr.after ? ' + `gad-icon-content`' : ''} | ${LEVEL(t)} | ${bl || (tr.extra ? '(armados desde datos)' : '—')} |`);
}
M.push('', 'Las secciones propias de Gero (athlex-*, ct-*, gps-*) se mapean según LANDINGS-MAPA.md / V1-MATRIZ.md c.2 de Gadsden; los bloques sticky_atc, emoji_benefits, reviews y text de la ficha, según V1-MATRIZ.md c.5. Los ids de sección y de bloque son los de la referencia (salvo los bloques que en Shrine no existían como tales: preguntas y resultados del test, filas del aviso legal, palabras de la cinta gigante, bloques del cierre del GPS y la sección `dolor-ciencia`).');
fs.writeFileSync(path.join(ROOT, 'MAPEO.md'), M.join('\n') + '\n');

// ---------- GAPS ----------
const gaps = notes.filter(n => /GAP/.test(n));
const G = ['# Lo que Gadsden no tiene (GAP)', '',
  'Ajustes o comportamientos de DOMU en Shrine sin equivalente en Gadsden 1.1.0. **No se parchean en el theme de DOMU** (Gadsden nativo). Los huecos que dejó la migración sobre la 1.0.1 (volantas, lista de colecciones, botón de contacto, pie del desplegable, tabla comparativa, test, nota, señal de los pasos, destacadas, promesa, fuente y etiqueta de ATHLEX) se sumaron a Gadsden 1.1.0 como ajustes genéricos. Lo que sigue o quedó afuera con OK de Gero (19-oct-2026) o espera su decisión (el estilo de la landing de ATHLEX, ver COMPARACION.md). Salen de los reportes de los traductores.', '',
  '| Dónde | Qué falta (valor de DOMU) | Por qué queda afuera |', '|---|---|---|'];
const WHY = [[/dos columnas/, 'decisión de Gero (19-oct): es rearmar el bloque Precio de la ficha, no un estilo de página; si hace falta, va como disposición del bloque Precio en otra versión'],
  [/estilo de la referencia/, 'pendiente de Gero: entra en Gadsden sólo como opciones nuevas (por ejemplo del "Estilo de esta página", L19); ver COMPARACION.md, ATHLEX'],
  [/./, 'sin decidir: revisar']];
for (const n of gaps) {
  const [where, ...rest] = n.split(': ');
  for (const part of rest.join(': ').split('; ').filter(p => /GAP/.test(p)))
    G.push(`| ${where.replace(/\|/g, '/')} | ${part.replace(/^GAP /, '').replace(/\|/g, '/')} | ${WHY.find(([re]) => re.test(part))[1]} |`);
}
G.push('', '## Otros (fuera de los traductores)', '',
  '| Dónde | Qué falta | Por qué queda afuera |', '|---|---|---|',
  '| page.athlex-nota-* (bloques "día" y "semana") | 2 bloques "día" (franjas horarias húmedas) y 4 "semana" (dos filas de 21 días) de la nota de Shrine; sus textos están en la referencia y en INVENTARIO-AJUSTES.md. | decisión de Gero (19-oct): son demostraciones muy de un producto; la nota se lee completa con "versus" y "ciclo". |',
  '| settings_data `platform_customizations.custom_css` | `sticky-atc.sticky-atc {z-index: 50 !important;}` (CSS para la barra fija de Shrine, por el botón "Shop with AI"). | no aplica: es un selector de Shrine que en Gadsden no existe; la barra fija de Gadsden tiene su z-index y el botón de Clarity está apagado. Verificado el 19-oct en la tienda en vivo, en 390 y 1440: nada tapa la barra (en la vista previa la tapa sólo la barra de preview de Shopify). |');
fs.writeFileSync(path.join(ROOT, 'GAPS-GADSDEN.md'), G.join('\n') + '\n');

// ---------- COMPARACION ----------
const tpls = fs.readdirSync(path.join(THEME, 'templates')).filter(f => f.endsWith('.json') && !/^(product|gift)/.test(f) || /^product\.(prod_test|gps|athlex|carbo)/.test(f)).map(f => f.replace('.json', ''));
const shots = Object.fromEntries(fs.readdirSync(path.join(ROOT, 'capturas/nuevo')).filter(f => f.endsWith('.json')).map(f => [f.replace('.json', ''), readJSON(path.join(ROOT, 'capturas/nuevo', f))]));
const C = ['# Comparación por plantilla', '',
  'No hay referencia visual del DOMU de Shrine (el theme se borró el 15-oct, el Wayback Machine no tiene capturas y no se pidió el login de Clarity): el 1 a 1 se mide por **configuración** (cada ajuste usado, traducido con su valor; ver MAPEO.md) y por **funcionamiento** en la vista previa del theme nuevo. Las capturas desktop (1440) y mobile (390) de cada plantilla están en `capturas/nuevo/`; las hojas lado a lado, en `capturas/comparacion/`.', '',
  '| Plantilla | Verificada | Secciones | Liquid / JS | Scroll horizontal | Aproximado | GAP |', '|---|---|---|---|---|---|---|'];
const shotFor = t => shots[t] || shots[t.replace('customers/', 'customers.')];
for (const t of tpls.sort()) {
  const s = shotFor(t);
  const n = notes.filter(x => x.startsWith(t + '#'));
  const ap = rounded.filter(x => x.startsWith(t + '#')).length + n.filter(x => !/GAP|desactivada|no se migra|asset_url/.test(x)).length;
  const gp = n.reduce((a, x) => a + (x.match(/GAP/g) || []).length, 0);
  if (!s) { C.push(`| ${t} | no (ver BUILD-DOMU.md) | — | — | — | ${ap} | ${gp} |`); continue; }
  const d = s.d || s.m, m = s.m || s.d;
  const errs = [...(d.errors || []), ...(m.errors || [])].filter(x => !/bank-maestro|no-existe|Failed to load resource/.test(x));
  C.push(`| ${t} | sí | ${d.secs.length}${d.missing && d.missing.length ? ` (faltan ${d.missing.join(', ')})` : ''}${d.orderOk === false ? ' orden distinto' : ''} | ${(d.liquid.length + m.liquid.length) ? 'ERROR' : 'OK'}${errs.length ? ' (' + errs.length + ' avisos)' : ''} | ${d.hscroll || m.hscroll ? 'sí' : 'no'} | ${ap} | ${gp} |`);
}
C.push('', 'Avisos esperados que no cuentan: `bank-maestro.svg` (roto también en Shrine: el archivo es `bank-mastro.svg`) y el 404 de la página de prueba del 404.', '',
  '## Valores redondeados al rango de Gadsden', '', ...rounded.map(r => `- ${r}`), '',
  '## Aproximaciones (lo que entra, pero no igual)', '', ...notes.filter(x => !/GAP|desactivada|no se migra/.test(x)).map(x => `- ${x}`), '');
// Comparación sección por sección de ATHLEX contra la referencia del Dawn (tools/compare_sections.js), escrita a mano.
const AX = path.join(ROOT, 'tools/data/athlex-comparacion.md');
if (fs.existsSync(AX)) C.push(fs.readFileSync(AX, 'utf8'));
fs.writeFileSync(path.join(ROOT, 'COMPARACION.md'), C.join('\n') + '\n');
console.log('MAPEO', M.length, 'GAPS', G.length, 'COMPARACION', C.length);
