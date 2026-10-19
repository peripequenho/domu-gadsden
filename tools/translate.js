// Motor de traducción Shrine -> Gadsden. Cada traductor recibe `e` (ajustes efectivos de Shrine: default del
// schema + lo guardado), devuelve ajustes de Gadsden y el motor:
//  - registra qué ajustes de Shrine leyó (Proxy). Los que tienen valor distinto del default y nadie leyó quedan
//    en el reporte "sin traducir" (material de MAPEO.md / GAPS-GADSDEN.md);
//  - valida contra el schema de Gadsden: id inexistente = error; rango fuera de min/max/step = se redondea y se
//    anota (COMPARACION.md); opción inexistente = error.
const { REF, THEME, schemaOf, defaults, readJSON, path } = require('./lib');

// ---------- colores de DOMU (settings_data de Shrine) ----------
const G = readJSON(path.join(REF, 'config/settings_data.json')).current;
const C = { text: G.colors_text, bg1: G.colors_background_1, bg2: G.colors_background_2, a1: G.colors_accent_1, a2: G.colors_accent_2,
  solid: G.colors_solid_button_labels, outline: G.colors_outline_button_labels };
// Los 5 esquemas fijos de Shrine (Dawn 2-8) en el mismo orden que Limbex; la lógica de cada uno es la de Dawn viejo.
const S = { 'background-1': 'scheme-1', 'background-2': 'scheme-2', inverse: 'scheme-3', 'accent-1': 'scheme-4', 'accent-2': 'scheme-5' };
const SCHEME = {
  'background-1': { bg: C.bg1, fg: C.text, btn: C.a1, btnfg: C.solid, outline: C.outline, accent: C.a1, grad: G.gradient_background_1 || '' },
  'background-2': { bg: C.bg2, fg: C.text, btn: C.text, btnfg: C.bg2, outline: C.text, accent: C.a1, grad: G.gradient_background_2 || '' },
  inverse: { bg: C.text, fg: C.bg1, btn: C.bg1, btnfg: C.text, outline: C.bg1, accent: C.a1, grad: '' },
  'accent-1': { bg: C.a1, fg: C.solid, btn: C.solid, btnfg: C.a1, outline: C.solid, accent: C.solid, grad: G.gradient_accent_1 || '' },
  'accent-2': { bg: C.a2, fg: C.solid, btn: C.solid, btnfg: C.a2, outline: C.solid, accent: C.solid, grad: G.gradient_accent_2 || '' },
};
// Color suelto de Shrine ("accent-1", "text", "outline-button"...) como hex.
const HEX = { 'accent-1': C.a1, 'accent-2': C.a2, 'background-1': C.bg1, 'background-2': C.bg2, inverse: C.text, text: C.text, 'outline-button': C.outline };
// Color suelto -> rol de Gadsden en los selects de 4 valores (text/muted/accent/button).
const ROLE4 = v => ({ text: 'text', 'accent-1': 'accent', 'outline-button': 'button', 'accent-2': 'accent' }[v] || 'text');
const scheme = v => S[v] || 'scheme-1';

// ---------- conversiones comunes ----------
const VIS = { 'always-display': 'all', 'desktop-hidden': 'mobile', 'mobile-hidden': 'desktop' };
const vis = v => VIS[v] || 'all';
const hSize = (v, allowed = ['h0', 'h1', 'h2']) => (allowed.includes(v) ? v : allowed.includes('h1') ? 'h1' : allowed[0]);
const tok = s => (s == null ? s : String(s).replace(/\[percentage\]/g, '{porcentaje}').replace(/\[amount_saved\]/g, '{ahorro}')
  .replace(/\[amount\]/g, '{monto}').replace(/\[savings\]/g, '{ahorro}').replace(/\[subtotal\]/g, '{subtotal}').replace(/\[timer\]/g, '{tiempo}')
  .replace(/\[count\]/g, '{cantidad}').replace(/\[stars\]/g, '{estrellas}').replace(/\[name\]/g, '{nombre}').replace(/\[selected\]/g, '{valor}')
  .replace(/\[quantity\]/g, '{cantidad}').replace(/\[compare_price\]/g, '{precio_anterior}').replace(/\[price\]/g, '{precio}')
  .replace(/\[icon_1\]/g, '{icono1}').replace(/\[icon_2\]/g, '{icono2}').replace(/\[next_goal\]/g, '{premio}'));
// Colores propios de Shrine (color_scheme "custom" + custom_colors_*) -> T02 de Gadsden.
const cc = (e, prefix = 'custom_colors_') => e.color_scheme === 'custom' ? {
  custom_colors: true,
  cc_bg: e[prefix + 'background'] ?? '#FFFFFF', cc_bg_gradient: e.custom_gradient_background || '',
  cc_bg_image: e.custom_image_background || '', cc_bg_image_mobile: e.custom_mobile_image_background || '',
  cc_text: e[prefix + 'text'] ?? '#121212',
  ...(e[prefix + 'solid_button_background'] !== undefined ? { cc_btn_bg: e[prefix + 'solid_button_background'] } : {}),
  ...(e[prefix + 'solid_button_text'] !== undefined ? { cc_btn_text: e[prefix + 'solid_button_text'] } : {}),
  ...(e[prefix + 'outline_button'] !== undefined ? { cc_outline: e[prefix + 'outline_button'] } : {}),
  ...(e[prefix + 'accent'] !== undefined ? { cc_accent: e[prefix + 'accent'] } : {}),
} : { custom_colors: false };
const colorScheme = e => ({ color_scheme: e.color_scheme === 'custom' ? 'scheme-1' : scheme(e.color_scheme), ...cc(e) });

// Carrusel de Shrine (slide/loop, desktop_*/mobile_*) -> car_*/d_*/m_* de Gadsden.
function carousel(e, o = {}) {
  const r = {};
  if ('type' in e) r.car_type = e.type === 'loop' ? 'loop' : e.type === 'fade' ? 'fade' : 'classic';
  if ('drag' in e) r.car_drag = e.drag === 'disabled' ? 'off' : 'on';
  if ('autoplay' in e) r.car_autoplay = !!e.autoplay;
  if ('autoplay_speed' in e) r.car_speed = e.autoplay_speed;
  if ('arrows_color_scheme' in e) r.car_arrows_scheme = scheme(e.arrows_color_scheme);
  if ('transparent_arrows' in e) r.car_arrows_bare = !!e.transparent_arrows;
  if ('dots_color_scheme' in e) r.car_dots_color = (SCHEME[e.dots_color_scheme] || {}).bg || '';
  if ('center_mode' in e) r.car_center = !!e.center_mode;
  const d = { slider_desktop: 'd_carousel', columns_desktop: 'd_per_view', slides_desktop: 'd_per_view', per_move_desktop: 'd_per_move',
    desktop_spacing: 'd_gap', desktop_side_padding: 'd_peek', desktop_padding_calc: 'd_edge_fit', desktop_adaptive_height: 'd_auto_height',
    desktop_dots_position: 'd_dots', desktop_arrows_position: 'd_arrows',
    slider_mobile: 'm_carousel', columns_mobile: 'm_per_view', slides_mobile: 'm_per_view', per_move_mobile: 'm_per_move',
    mobile_spacing: 'm_gap', mobile_side_padding: 'm_peek', mobile_padding_calc: 'm_edge_fit', mobile_adaptive_height: 'm_auto_height',
    mobile_dots_position: 'm_dots', mobile_arrows_position: 'm_arrows', ...o };
  for (const [from, to] of Object.entries(d)) if (to && from in e) r[to] = to === 'm_per_view' ? String(e[from]) : e[from];
  // "Vista previa" de Shrine en mobile (sin medida): la pista con 25px de los vecinos (medido en Limbex).
  // (20-oct) El código propio (Dawn DOMU, lo último que vio Gero) no asoma vecinos en mobile: la "vista previa" no se traduce.
  return r;
}
const padding = e => ({ padding_top: e.padding_top, padding_bottom: e.padding_bottom });
const common = e => ({ ...('visibility' in e ? { visibility: vis(e.visibility) } : {}), ...('padding_top' in e ? padding(e) : {}),
  ...(e.display_id ? { anchor: e.__id } : {}) });
const heading = (e, from = 'title', allowed) => ({ heading: e[from], heading_size: hSize(e.heading_size, allowed), heading_accent: e.title_highlight_color });

// ---------- motor ----------
// Defaults de Shrine con clave de traducción ("t:...") -> el texto de su es.schema.json (la tienda está en castellano).
const LOC = [readJSON(path.join(REF, 'locales/es.schema.json')), readJSON(path.join(REF, 'locales/en.default.schema.json'))];
const tKey = v => typeof v === 'string' && v.startsWith('t:') ? (LOC.map(l => v.slice(2).split('.').reduce((a, k) => a && a[k], l)).find(x => typeof x === 'string') ?? v) : v;
function tracked(sch, raw, id) {
  const def = Object.fromEntries(Object.entries(defaults(sch && sch.settings)).map(([k, v]) => [k, tKey(v)]));
  const eff = { ...def, ...(raw || {}), __id: id };
  const read = new Set();
  const p = new Proxy(eff, { get(t, k) { if (typeof k === 'string') read.add(k); return t[k]; }, has(t, k) { read.add(k); return k in t; } });
  return { p, eff, def, read };
}
// Los colores propios de Shrine sólo tienen efecto con la combinación "custom" (de la sección o de las tarjetas).
const inert = (k, eff) => (/^custom_(colors_|gradient_|image_|mobile_image_)/.test(k) && eff.color_scheme !== 'custom') ||
  (/^custom_cards_/.test(k) && eff.cards_color_scheme !== 'custom');
function unread({ eff, def, read }, ignore = []) {
  const ig = typeof ignore === 'function' ? ignore : k => ignore.includes(k);
  return Object.keys(eff).filter(k => k !== '__id' && !read.has(k) && !ig(k) && !inert(k, eff) && JSON.stringify(eff[k]) !== JSON.stringify(def[k]));
}
// Valida y ajusta contra el schema de Gadsden. `where` para el reporte.
function fit(settingsSchema, out, where, report) {
  const byId = Object.fromEntries((settingsSchema || []).filter(s => s.id).map(s => [s.id, s]));
  const res = {};
  for (let [k, v] of Object.entries(out)) {
    if (v === undefined) continue;
    const s = byId[k];
    // visibility y anchor salen de common(): si la sección de Gadsden no los tiene y el valor es el neutro, no hacen falta.
    if (!s && ((k === 'visibility' && v === 'all') || (k === 'anchor' && !v))) continue;
    if (!s) { report.errors.push(`${where}: ajuste inexistente en Gadsden \`${k}\``); continue; }
    if (s.type === 'range') {
      let n = Number(v); if (Number.isNaN(n)) { report.errors.push(`${where}: ${k} no numérico ${JSON.stringify(v)}`); continue; }
      const st = s.step || 1; let r = Math.round((n - s.min) / st) * st + s.min; r = Math.min(s.max, Math.max(s.min, r)); r = +r.toFixed(4);
      if (r !== n) report.rounded.push(`${where}: \`${k}\` ${n} → ${r} (rango ${s.min}..${s.max} paso ${st})`);
      v = r;
    } else if (s.type === 'select' || s.type === 'radio') {
      v = String(v);
      if (!s.options.some(o => o.value === v)) { report.errors.push(`${where}: \`${k}\` opción inexistente ${JSON.stringify(v)} [${s.options.map(o => o.value)}]`); continue; }
    } else if (s.type === 'checkbox') v = !!v;
    else if (s.type === 'number') { if (v === '' || v === null) continue; v = Number(v); }
    else if (['image_picker', 'video', 'url', 'collection', 'product', 'page', 'blog', 'article', 'link_list', 'color', 'color_background', 'font_picker', 'video_url'].includes(s.type)) { if (v === '' || v === null) continue; }
    else if (s.type === 'product_list' || s.type === 'collection_list') { if (!v || (Array.isArray(v) && !v.length)) continue; }
    res[k] = v;
  }
  return res;
}
const newReport = () => ({ errors: [], rounded: [], unread: [], notes: [] });

module.exports = { G, C, S, SCHEME, HEX, ROLE4, scheme, vis, hSize, tok, cc, colorScheme, carousel, padding, common, heading,
  tracked, unread, fit, newReport, schemaOf, REF, THEME };
