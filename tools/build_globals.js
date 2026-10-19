// Paso 4: ajustes globales, secciones fijas (cajón, popup, música, contraseña), app embeds, cabecera y pie con
// sus variantes por mercado. Lee los JSON de la referencia Shrine y escribe en theme/:
//   config/settings_data.json, sections/header-group*.json, sections/footer-group*.json
// Uso: node tools/build_globals.js  (reporte en tmp/report-globals.json)
const { fs, path, REF, THEME, ROOT, readJSON, writeJSON, schemaOf } = require('./lib');
const T = require('./translate');
const { translateSection } = require('./sections');
const { G, C, SCHEME, S, scheme, tok, tracked, unread, fit, newReport } = T;
const report = newReport();

// ---------- ajustes globales ----------
const shrineSchema = readJSON(path.join(REF, 'config/settings_schema.json'));
const gadSchema = readJSON(path.join(THEME, 'config/settings_schema.json'));
const flatSch = sch => ({ settings: sch.flatMap(g => g.settings || []) });
const t = tracked(flatSch(shrineSchema), G, 'globals');
const e = t.p;
const role = v => ({ text: 'foreground', 'accent-1': 'accent', 'background-1': 'background', 'outline-button': 'outline' }[v] || 'foreground');
const fx = v => ({ glow: 'glow', center: 'fill-center', left: 'fill-left', arrow: 'arrow' }[v] || 'none');
const color_schemes = Object.fromEntries(Object.entries(S).map(([k, id]) => {
  const s = SCHEME[k];
  return [id, { settings: { background: s.bg, background_gradient: s.grad, text: s.fg, accent: s.accent, button: s.btn, button_label: s.btnfg, secondary_button_label: s.outline, shadow: C.text } }];
}));
const g = {
  color_schemes, accent_icons: e.accent_icons === 'text' ? 'text' : e.accent_icons === 'outline-button' ? 'button' : 'accent',
  logo: e.logo, logo_secondary: e.secondary_logo, logo_width: e.logo_width, logo_width_mobile: e.mobile_logo_width, favicon: e.favicon,
  type_header_font: e.type_header_font, type_body_font: e.type_body_font, heading_scale: e.heading_scale, body_scale: e.body_scale,
  heading_line_height: e.heading_line_height, heading_letter_spacing: e.heading_letter_spacing,
  body_line_height: e.body_line_height, body_letter_spacing: e.body_letter_spacing,
  custom_font_url: e.custom_header_font_link || e.custom_body_font_link,
  page_width: e.page_width, spacing_sections: e.spacing_sections, spacing_grid_horizontal: e.spacing_grid_horizontal, spacing_grid_vertical: e.spacing_grid_vertical,
  animations_reveal_on_scroll: e.enable_load_animations, reveal_repeat: e.repeat_section_animations,
  reveal_duration: e.animation_duration, reveal_delay: e.animation_init_delay, reveal_stagger: e.animation_children_delay,
  reveal_opacity: e.animation_start_opacity, reveal_x: e.animation_start_x, reveal_y: e.animation_start_y, reveal_zoom: e.animation_start_zoom,
  button_fx_link: fx(e.link_btn_hover), button_fx_action: fx(e.action_btn_hover),
  ...Object.fromEntries(['buttons', 'variant_pills', 'inputs'].flatMap(p => ['border_thickness', 'border_opacity', 'radius', 'shadow_opacity', 'shadow_horizontal_offset', 'shadow_vertical_offset', 'shadow_blur'].map(k => [`${p}_${k}`, e[`${p}_${k}`]]))),
  ...Object.fromEntries(['card', 'collection_card', 'blog_card'].flatMap(p => ['style', 'image_padding', 'text_alignment', 'border_thickness', 'border_opacity', 'corner_radius', 'shadow_opacity', 'shadow_horizontal_offset', 'shadow_vertical_offset', 'shadow_blur'].map(k => [`${p}_${k}`, e[`${p}_${k}`]]))),
  card_color_scheme: scheme(e.card_color_scheme), collection_card_color_scheme: scheme(e.collection_card_color_scheme), blog_card_color_scheme: scheme(e.blog_card_color_scheme),
  card_title_lines: e.product_card_title_limited_lines === 'unlimited' ? 'none' : String(e.product_card_title_limited_lines),
  quick_add_style: e.card_button_style === 'primary' ? 'filled' : 'outline',
  ...Object.fromEntries(['text_boxes', 'media'].flatMap(p => ['border_thickness', 'border_opacity', 'radius', 'shadow_opacity', 'shadow_horizontal_offset', 'shadow_vertical_offset', 'shadow_blur'].map(k => [`${p}_${k}`, e[`${p}_${k}`]]))),
  ...Object.fromEntries(['border_thickness', 'border_opacity', 'corner_radius', 'shadow_opacity', 'shadow_horizontal_offset', 'shadow_vertical_offset', 'shadow_blur'].map(k => [`popup_${k}`, e[`popup_${k}`]])),
  ...Object.fromEntries(['border_thickness', 'border_opacity', 'shadow_opacity', 'shadow_horizontal_offset', 'shadow_vertical_offset', 'shadow_blur'].map(k => [`drawer_${k}`, e[`drawer_${k}`]])),
  badge_position: e.badge_position, card_badge_position: e.product_card_badge_position, badge_corner_radius: e.badge_corner_radius,
  badge_flush: e.product_cards_badge_push_sides, sale_badge_color_scheme: scheme(e.sale_badge_color_scheme), sold_out_badge_color_scheme: scheme(e.sold_out_badge_color_scheme),
  sale_label_text: tok(e.sale_badge_text), sale_label_icon: e.sale_basge_discount_icon, card_badges_tags: tok(e.product_cards_custom_badges_list),
  brand_headline: e.brand_headline, brand_description: e.brand_description, brand_image: e.brand_image, brand_image_width: e.brand_image_width,
  social_icon_style: 'square',
  ...Object.fromEntries(['facebook', 'instagram', 'youtube', 'tiktok', 'twitter', 'snapchat', 'pinterest', 'tumblr', 'vimeo'].map(k => [`social_${k}_link`, e[`social_${k}_link`]])),
  predictive_search_enabled: e.predictive_search_enabled, predictive_search_show_vendor: e.predictive_search_show_vendor, predictive_search_show_price: e.predictive_search_show_price,
  currency_code_enabled: e.currency_code_enabled,
  cart_type: e.cart_type, cart_icon: String(e.cart_icon).replace('_', '-'), show_vendor: e.show_vendor, show_cart_note: e.show_cart_note,
  cart_drawer_collection: e.cart_drawer_collection, cart_continue_shopping: e.display_continue_shopping, cart_continue_url: e.continue_shopping_url,
  // (20-oct) El DOMU original era Dawn 16: tipografía de Dawn sin cambios (el código propio usa las clases h0/h1 de Dawn).
  base_style: 'dawn',
  // (21-oct) Gero: la galería de la ficha en bucle, en todas las fichas.
  product_gallery_loop: true,
  // Formularios de compra: selectores, cantidad, píldoras y muestras.
  dd_bg: role(e.pickers_color_scheme), dd_border: role(e.pickers_border_color), dd_text: role(e.pickers_text_color), dd_veil: role(e.pickers_overlay_color),
  dd_veil_opacity: e.pickers_overlay_opacity, dd_border_width: e.pickers_border_thickness, dd_border_opacity: e.pickers_border_opacity,
  dd_radius: e.pickers_radius, dd_shadow: e.pickers_shadow_opacity > 0, dd_hover_veil: e.pickers_hover_overlay_opacity, dd_hover_border: e.pickers_hover_border_opacity,
  q_bg: role(e.quantity_color_scheme), q_border: role(e.quantity_border_color), q_text: role(e.quantity_text_color), q_veil: role(e.quantity_overlay_color),
  q_veil_opacity: e.quantity_overlay_opacity, q_border_width: e.quantity_border_thickness, q_border_opacity: e.quantity_border_opacity,
  q_radius: e.quantity_radius, q_shadow: e.quantity_shadow_opacity > 0, q_hover_veil: e.quantity_hover_overlay_opacity, q_hover_border: e.quantity_hover_border_opacity,
  pill_accent: role(e.variant_pills_accent_color), pill_veil: e.variant_pills_inactive_overlay_opacity, pill_bold: e.variant_pills_bold_text,
  pill_text_size: e.variant_pills_text_size, pill_pad_y: e.variant_pills_padding_y, pill_pad_x: e.variant_pills_padding_x,
  // Shrine mide el redondeo de las muestras de 0 a 100 % (100 = círculo); Gadsden de 0 a 50 %.
  swatch_radius: Math.round(e.swatches_border_radius / 2), swatch_border_opacity: e.swatches_border_opacity, swatch_selected_border_opacity: e.swatches_selected_border_opacity,
  swatch_colors: String(e.swatches_predefined_colors_list || '').replace(/<\/p>\s*<p>/g, '\n').replace(/<\/?p>/g, '').trim(),
  // Carruseles: Shrine corta a desktop desde 750 px; las flechas en rem (3rem = 31.5 px en Limbex).
  carousel_breakpoint: '750', carousel_arrow_size: Math.round(e.slider_arrow_size * 1.05), carousel_arrow_radius: e.slider_arrow_border_radius,
  carousel_arrow_icon: e.slider_arrow_icon_size, carousel_dot_width: e.pagination_dot_width, carousel_dot_height: e.pagination_dot_height,
  carousel_dot_active_scale: e.pagination_dot_active_scale, carousel_dot_gap: e.pagination_dot_spacing, carousel_dot_radius: e.pagination_dot_radius,
  protect_content: e.disable_inspect,
  // Bloqueo por país: Shrine con la lista vacía no bloquea nada.
  geo_mode: e.country_list ? (e.country_list_function === 'whitelist' ? 'allow' : 'block') : 'off', geo_countries: e.country_list,
  ...(e.country_list ? { geo_message: e.country_invalid_error_msg } : {}),
  rtl_mode: e.enable_rtl ? (e.rtl_enabled_languages ? 'auto' : 'always') : 'off',
  custom_scrollbar: e.scrollbar_style === 'customized', scrollbar_thumb: e.scrollbar_thumb_color, scrollbar_track: e.scrollbar_track_color, scrollbar_width: e.scrollbar_width,
  cursor_image: e.custom_cursor,
};
// Volver arriba de Shrine es una sección fija; en Gadsden, ajustes globales.
const st = tracked(schemaOf(REF, 'scroll-to-top-btn'), G.sections['scroll-to-top-btn'].settings, 'scroll-to-top-btn');
Object.assign(g, { back_to_top: st.p.enable_scroll_btn, back_to_top_after: st.p.display_after, back_to_top_scheme: scheme(st.p.color_scheme),
  back_to_top_position: String(st.p.position).replace('bottom-', ''), back_to_top_x: st.p.offset_x, back_to_top_y: st.p.offset_y });
const current = fit(gadSchema.flatMap(x => x.settings || []), g, 'globales', report);
current.color_schemes = color_schemes; // color_scheme_group: fit no lo conoce como tipo simple
// Globales de Shrine que no se traducen a propósito:
const IGNORE = [
  'animations_type', 'fav_collection', // candado de licencia de Shrine
  'checkout_accent_color', 'checkout_button_color', // el checkout se configura en su propio editor
  'colors_solid_button_labels', 'colors_accent_1', 'gradient_accent_1', 'colors_accent_2', 'gradient_accent_2', 'colors_text',
  'colors_outline_button_labels', 'colors_background_1', 'gradient_background_1', 'colors_background_2', 'gradient_background_2', // -> color_schemes
  'enable_cart_timer', 'cart_timer_text', 'enable_cart_progress_bar', 'cart_progress_message', 'cart_progress_success_message', 'cart_progress_icon',
  'enable_cart_upsell_1', 'cart_upsell_1_product', 'cart_upsell_1_btn_label', 'enable_cart_upsell_2', 'cart_upsell_2_product', 'cart_upsell_2_title',
  'cart_upsell_2_desc', 'cart_upsell_2_btn_label', 'show_cart_payment_badges', 'cart_trust_badges_width', 'enable_cart_discount', // restos sin schema: el cajón va por bloques
  'swatches_predefined_colors', 'section_animation_type', 'content_for_index', 'sections', 'blocks', // restos sin schema / estructura
  'display_store_languages', // sin efecto con un solo idioma
];
for (const k of unread(t, IGNORE)) report.unread.push(`globales: \`${k}\` = ${JSON.stringify(t.eff[k]).slice(0, 80)}`);

// ---------- secciones fijas y embeds ----------
current.sections = {};
for (const [id, s] of Object.entries(G.sections)) {
  if (['header', 'footer', 'scroll-to-top-btn'].includes(id)) continue; // header/footer: restos de antes de los grupos
  const out = translateSection(s, id, `settings_data/${id}`, report);
  if (out) current.sections[out.type === 'gad-promo-popup' ? 'gad-promo-popup' : out.type === 'gad-music-global' ? 'gad-music-global' : id] = out;
}
// App embeds: mismos tipos e ids (Shopify los muestra activos si la app sigue instalada).
current.blocks = G.blocks;

const gadData = readJSON(path.join(THEME, 'config/settings_data.json'));
writeJSON(path.join(THEME, 'config/settings_data.json'), { current, presets: gadData.presets });

// ---------- grupos y variantes por mercado ----------
for (const f of fs.readdirSync(path.join(REF, 'sections')).filter(f => /^(header|footer)-group.*\.json$/.test(f))) {
  const j = readJSON(path.join(REF, 'sections', f));
  const out = { ...j, sections: {} };
  for (const [id, s] of Object.entries(j.sections || {})) {
    if (s.disabled) { report.notes.push(`${f} > ${id} (${s.type}): desactivada en la referencia, no se migra`); continue; }
    const r = translateSection(s, id, `${f}#${id}`, report);
    if (r) out.sections[id] = r;
  }
  if (j.order) out.order = j.order.filter(id => out.sections[id]);
  writeJSON(path.join(THEME, 'sections', f), out);
}
writeJSON(path.join(ROOT, 'tmp/report-globals.json'), report);
console.log(`globales: ${Object.keys(current).length} ajustes; errores ${report.errors.length}, redondeos ${report.rounded.length}, sin traducir ${report.unread.length}, notas ${report.notes.length}`);
[...report.errors, ...report.rounded, ...report.unread, ...report.notes].forEach(x => console.log(' -', x));
