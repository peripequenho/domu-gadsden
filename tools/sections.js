// Traductores por tipo de sección de Shrine -> Gadsden. Cada entrada:
//   to: tipo de Gadsden (o función e => tipo)
//   settings: e => ajustes de Gadsden (e = ajustes efectivos de Shrine, con lectura registrada)
//   blocks: { tipoShrine: { to, settings: (e, sec) => {...} } | null (no se migra, se anota) }
//   ignore: ajustes de Shrine que no tienen efecto o se resuelven en otro lado (no van al reporte)
// translateSection() conserva los ids de sección y de bloque, saltea lo desactivado, pasa los bloques de apps
// tal cual y valida todo contra el schema de Gadsden.
const T = require('./translate');
const { schemaOf, REF, THEME, tracked, unread, fit, scheme, SCHEME, HEX, ROLE4, vis, hSize, tok, cc, colorScheme, carousel, common, heading } = T;

const TR = {};
const size3 = (v, map) => map[String(v)] || 'medium';

// ---------- cabecera y pie ----------
TR['announcement-bar'] = {
  to: 'announcement-bar',
  settings: e => ({
    ...colorScheme(e), show_line_separator: false, d_cols: e.columns_desktop, m_cols: e.columns_mobile,
    gap: e.desktop_spacing, separator: e.show_separator, ...carousel(e, { columns_desktop: null, columns_mobile: null, desktop_spacing: null, mobile_spacing: null }),
    d_carousel: e.slider_desktop, m_carousel: e.slider_mobile, padding_top: e.padding_top, padding_bottom: e.padding_bottom,
    show_social: false, enable_country_selector: false, enable_language_selector: false,
  }),
  ignore: ['hidden_products', 'enable_specific_display', 'displayed_products', 'mobile_spacing'],
  note: e => e.mobile_spacing !== e.desktop_spacing ? `separación entre anuncios: Gadsden tiene una sola (${e.desktop_spacing}px); la de mobile de Shrine era ${e.mobile_spacing}px y con un anuncio por vez no se ve` : null,
  blocks: {
    announcement: { to: 'announcement', settings: e => ({
      // Pedido de Gero (20-oct): en mobile la letra de Shrine (10 px) no se lee; mínimo 13.
      text: e.text, align_m: e.text_alignment, align_d: e.text_alignment, size_m: Math.max(e.mobile_text_size, 13), size_d: e.desktop_text_size,
      icon: e.icon, icon_filled: e.filled_icon, icon_image: e.custom_icon, icon_size_m: e.mobile_icon_size, icon_size_d: e.desktop_icon_size,
      layout_m: e.mobile_layout === 'vertical' ? 'stack' : 'row', layout_d: e.desktop_layout === 'vertical' ? 'stack' : 'row',
    }), ignore: ['hidden_products', 'enable_specific_display', 'displayed_products'] },
    discount: { to: 'coupon', settings: e => ({ text: e.code_text, code: e.code, button: e.button_label, copied: e.success_msg,
      align_m: e.text_alignment, align_d: e.text_alignment, size_m: e.mobile_text_size, size_d: e.desktop_text_size }),
      ignore: ['hidden_products', 'enable_specific_display', 'displayed_products', 'display_btn_icon', 'border_radius'] },
    socials: { to: 'social', settings: e => ({ align_m: e.text_alignment, align_d: e.text_alignment, icon_size_m: e.mobile_icon_size, icon_size_d: e.desktop_icon_size }),
      ignore: ['hidden_products', 'enable_specific_display', 'displayed_products'] },
  },
};
TR.header = {
  to: 'header',
  settings: e => ({
    logo_position: e.logo_position, mobile_logo_position: e.mobile_logo_position, menu: e.menu, menu_type_desktop: e.menu_type_desktop,
    mega_links: e.products_mega_menu_links, mega_images_d: e.products_mega_menu_display_collection_images,
    mega_images_m: e.products_mega_menu_display_collection_images_on_mobile,
    sticky_header_type: e.sticky_header_type, show_line_separator: e.show_line_separator,
    color_scheme: scheme(e.color_scheme), menu_color_scheme: scheme(e.menu_color_scheme),
    enable_country_selector: false, enable_language_selector: false,
    margin_bottom: e.margin_bottom, padding_top: e.padding_top, padding_bottom: e.padding_bottom,
    logo_link: e.logo_link, show_search: e.display_search,
    active_highlight: e.highlight_active_link, active_style: 'pill', active_scheme: scheme(e.highlighted_link_color_scheme),
    // Menú mobile de Shrine: panel lateral con título, "Iniciar sesión" y redes; lupa a la derecha y sin cuenta (medido en Limbex).
    mobile_menu_style: 'panel', mobile_menu_title: e.mobile_menu_title, mobile_menu_account: true,
    mobile_search_position: 'right', mobile_account: false,
  }),
  // Con menú "dropdown" el mega menú no se usa; el menú secundario de Shrine está vacío.
  ignore: ['products_mega_menu_display_collection_products', 'secondary_menu'],
  extraBlocks: e => e.secondary_menu ? { mobile_menu: { type: 'mobile_menu', settings: { menu: e.secondary_menu } } } : null,
};
TR.footer = {
  to: 'footer',
  settings: e => ({
    ...colorScheme(e), newsletter_enable: false, enable_follow_on_shop: e.enable_follow_on_shop, show_social: e.show_social,
    enable_country_selector: e.enable_country_selector, enable_language_selector: e.enable_language_selector,
    payment_enable: e.payment_enable, payment_list: e.enabled_payment_types, show_policy: e.show_policy,
    margin_top: e.margin_top, padding_top: e.padding_top, padding_bottom: e.padding_bottom, custom_widths: true,
    // Shrine imprime "© año, tienda" y después el texto de marca (medido en Limbex).
    copyright_text: `© {año}, <a href="/">{tienda}</a> ${e.branding_text || ''}`.trim(),
  }),
  blocks: {
    link_list: { to: 'link_list', settings: e => ({ heading: e.heading, menu: e.menu, width_d: e.width_desktop, width_m: String(e.width_mobile) }) },
    brand_information: { to: 'brand_information', settings: e => ({ show_social: e.show_social, width_d: e.width_desktop, width_m: String(e.width_mobile) }) },
    text: { to: 'text', settings: e => ({ heading: e.heading, subtext: e.subtext, width_d: e.width_desktop, width_m: String(e.width_mobile) }) },
    image: { to: 'image', settings: e => ({ image: e.image, image_width: e.image_width, alignment: e.alignment, image_link: e.url, width_d: e.width_desktop, width_m: String(e.width_mobile) }) },
    email_signup: { to: 'newsletter', settings: e => ({ heading: e.heading, text: e.subtext, button_style: e.button_type === 'solid' ? 'filled' : 'arrow',
      button_label: e.button_label, width_d: e.width_desktop, width_m: String(e.width_mobile) }), ignore: ['button_style_secondary'] },
    featured_product: { to: 'product', settings: e => ({ heading: e.heading, product: e.product, width_d: e.width_desktop, width_m: String(e.width_mobile) }),
      ignore: ['second_image', 'card_width', 'color_scheme'] },
    featured_collection: { to: 'collection', settings: e => ({ heading: e.heading, collection: e.collection, width_d: e.width_desktop, width_m: String(e.width_mobile) }),
      ignore: ['card_width', 'image_ratio', 'color_scheme'] },
  },
};

// ---------- secciones fijas ----------
const IMG17 = { 17: 'small', 20: 'medium', 25: 'large' };
const TXT13 = { 1.3: 'small', 1.5: 'medium', 1.7: 'large' };
const FS5 = { 1: 'xs', 1.2: 's', 1.4: 'm', 1.6: 'l', 1.8: 'xl' };
const mg = e => ({ margin_top: e.margin_top, margin_bottom: e.margin_bottom });
TR['cart-drawer'] = {
  to: 'cart-drawer',
  settings: e => ({
    test_mode: e.test_mode, heading_text: tok(e.heading_text), heading_align: e.heading_alignment === 'center' ? 'center' : 'left',
    width_d: e.desktop_width === 'large' ? 'wide' : 'normal', width_m: e.mobile_width,
    header_bg: e.enable_header_bg, header_bg_color: e.header_bg_color, body_bg: e.enable_body_bg, body_bg_color: e.body_bg_color,
    footer_bg: e.enable_footer_bg, footer_bg_color: e.footer_bg_color,
  }),
  blocks: {
    progress_bar: { to: 'progress', settings: e => ({ goal_type: e.goal_type, goal: e.goal, message: tok(e.progress_message),
      success_message: tok(e.success_message), icon: e.icon, icon_filled: e.icon_filled, icon_image: e.custom_icon, accent: ROLE4(e.accent_color), ...mg(e) }) },
    checkpoints_bar: { to: 'milestones', settings: e => ({ goal_type: e.goal_type, message: tok(e.progress_message), success_message: e.success_message,
      accent: ROLE4(e.accent_color), label_size_d: e.labels_desktop_text_size, label_size_m: e.labels_mobile_text_size,
      ...Object.fromEntries([1, 2, 3].flatMap(i => [[`g${i}_on`, e[`enable_goal_${i}`]], [`g${i}_amount`, e[`goal_${i}_amount`]], [`g${i}_icon`, e[`goal_${i}_icon`]],
        [`g${i}_filled`, e[`goal_${i}_icon_filled`]], [`g${i}_label`, e[`goal_${i}_label`]], [`g${i}_prize`, e[`goal_${i}_text`]]])), ...mg(e) }) },
    countdown_timer: { to: 'countdown', settings: e => ({ text: tok(e.timer_text), duration: e.timer_duration, text_size: FS5[e.font_size] || 'm',
      color_scheme: scheme(e.color_scheme), ...mg(e) }) },
    cart_items: { to: 'items', settings: e => ({
      image_size: IMG17[e.image_size] || 'medium', image_link: e.image_link, title_size: TXT13[e.title_size] || 'medium', title_link: e.title_link,
      variant_style: e.displayed_variants, price_position: e.prices_position,
      compare_source: { discounts: 'cart', product: 'compare', automatic: 'auto' }[e.displayed_compare_prices],
      price_color: ROLE4(e.price_color), compare_color: ROLE4(e.compare_price_color), unit_price: e.display_single_item_prices,
      savings: e.enable_savings, savings_text: tok(e.savings_text), savings_color: ROLE4(e.savings_color),
      qty_custom: true, qty_font: e.quantity_font_size, qty_icon: Math.round(e.quantity_font_size * e.quantity_btns_icon_size / 100),
      qty_padding: Math.round(e.quantity_padding * 10), qty_radius: e.quantity_corner_radius, qty_border: e.quantity_border_width,
      qty_border_color: e.quantity_border_color, qty_scheme: scheme(e.quantity_container_color_scheme), qty_btn_scheme: scheme(e.quantity_btns_color_scheme),
      qty_divider: e.quantity_separators_opacity, qty_btn_shape: e.quantity_outline_btns ? 'outline' : e.quantity_round_btns ? 'rounded' : 'square',
      remove_position: 'top', ...mg(e) }),
      ignore: ['quantity_container_padding', 'quantity_input_padding'],
      note: e => `cantidad: relleno del contenedor ${e.quantity_container_padding}rem y del número ${e.quantity_input_padding}rem sin ajuste propio en Gadsden (se usa el de los botones, ${e.quantity_padding}rem = ${Math.round(e.quantity_padding * 10)}px)` },
    cart_note: { to: 'note', settings: e => mg(e) },
    discount_field: { to: 'coupon', settings: e => ({ placeholder: e.placeholder, button_text: e.btn_label, error: e.error_msg, separator: e.bottom_separator, ...mg(e) }) },
    subtotals: { to: 'subtotals', settings: e => ({
      show_savings: e.display_total_savings, savings_left: e.savings_left_text, savings_right: tok(e.savings_right_text),
      savings_layout: e.savings_alignment, savings_color: ROLE4(e.savings_text_color), savings_size: e.savings_text_size,
      savings_position: e.savings_position === 'bellow' ? 'below' : 'above', savings_gap: e.savings_spacing,
      show_subtotal: e.display_subtotal, subtotal_left: e.subtotal_left_text, subtotal_right: tok(e.subtotal_right_text),
      subtotal_layout: e.subtotal_alignment, subtotal_color: ROLE4(e.subtotal_text_color), subtotal_size: e.subtotal_text_size,
      subtotal_bold: /<strong>/.test(e.subtotal_left_text || '') || /<strong>/.test(e.subtotal_right_text || ''),
      show_discounts: e.display_discounts, discounts_title: e.discounts_label, discounts_align: e.discounts_alignment === 'flex-end' ? 'right' : 'left',
      show_tax_note: false, ...mg(e) }) },
    checkout_btn: { to: 'checkout', settings: e => ({ show_total: e.display_price, express: e.show_additional_checkout_buttons,
      custom_color: e.enable_custom_color, btn_bg: e.custom_color, icon_before: e.prefix_icon, icon_after: e.suffix_icon,
      icon_scale: e.icon_scale, icon_gap: e.icon_spacing, ...mg(e) }) },
    payment_badges: { to: 'payment_icons', settings: e => ({ custom_list: e.enabled_payment_types, align: 'center', ...mg(e) }) },
    custom_liquid: { to: 'custom', settings: e => ({ zone: e.position, custom_liquid: e.custom_liquid }) },
    image: { to: 'image', settings: e => ({ zone: e.position, image: e.image, width: e.width, align: { 'flex-start': 'left', center: 'center', 'flex-end': 'right' }[e.alignment], radius: e.border_radius, ...mg(e) }) },
  },
};
TR['promo-popup'] = {
  to: 'gad-promo-popup',
  settings: e => ({
    mode: e.mode, delay_seconds: e.popup_seconds, delay_days: e.popup_days, image: e.image, layout: e.layout, color_scheme: scheme(e.color_scheme),
    prefix: e.heading_prefix, heading: e.heading, heading_size: e.heading_size, suffix: e.heading_suffix, text: e.text,
    timer: e.display_timer, timer_minutes: e.timer_duration, email_form: true, button_label: e.button_label, dismiss_label: e.dismiss_btn_label,
    success_prefix: e.success_heading_prefix, success_heading: e.success_heading, success_text: e.success_text, code: e.discount_code,
    code_label: e.discount_code_label, copy_label: e.copy_button_label, copied: e.copy_message, success_close: e.success_dismiss_btn_label,
  }),
  // Popup apagado en DOMU ("disabled"): estos tres no tienen efecto.
  ignore: ['success_heading_size', 'success_heading_suffix', 'success_display_image'],
};
TR['global-music-player'] = {
  to: 'gad-music-global',
  settings: e => ({ enabled: e.enabled, audio_url: e.audio_src, volume: e.volume, pulse: e.btn_animation, color_scheme: scheme(e.color_scheme),
    position: e.position === 'bottom-right' ? 'bottom-right' : 'bottom-left', offset_x: e.offset_x, offset_y: e.offset_y }),
};
TR['main-password-header'] = { to: 'main-password-header', settings: e => ({ color_scheme: scheme(e.color_scheme) }) };
TR['main-password-footer'] = { to: 'main-password-footer', settings: e => ({ color_scheme: scheme(e.color_scheme) }) };

// ---------- motor ----------
function translateSection(sec, id, where, report) {
  const tr = TR[sec.type];
  if (!tr) { report.errors.push(`${where}: sin traductor para \`${sec.type}\``); return null; }
  const shrineSch = schemaOf(REF, sec.type) || {};
  const t = tracked(shrineSch, sec.settings, id);
  const to = typeof tr.to === 'function' ? tr.to(t.p) : tr.to;
  // Secciones sin {% schema %} (p. ej. main-404): existen pero no tienen ajustes.
  const gadSch = schemaOf(THEME, to) || (require('fs').existsSync(require('path').join(THEME, 'sections', to + '.liquid')) ? { settings: [] } : null);
  if (!gadSch) { report.errors.push(`${where}: Gadsden no tiene la sección \`${to}\``); return null; }
  const settings = fit(gadSch.settings, tr.settings(t.p, sec), `${where} (${sec.type} → ${to})`, report);
  for (const k of unread(t, tr.ignore || [])) report.unread.push(`${where} (${sec.type}): \`${k}\` = ${JSON.stringify(t.eff[k]).slice(0, 80)}`);
  const n = tr.note && tr.note(t.p); if (n) report.notes.push(`${where} (${sec.type}): ${n}`);
  const out = { type: to, settings };
  const blocks = {}, order = [];
  for (const bid of sec.block_order || Object.keys(sec.blocks || {})) {
    const b = (sec.blocks || {})[bid];
    if (!b || b.disabled) continue;
    if (b.type.startsWith('shopify://apps/') || b.type === '@app') { blocks[bid] = b; order.push(bid); continue; }
    const btr = (tr.blocks || {})[b.type];
    if (btr === null) { report.notes.push(`${where} > ${bid}: bloque \`${b.type}\` no se migra`); continue; }
    if (!btr) { report.errors.push(`${where} > ${bid}: sin traductor de bloque \`${sec.type} > ${b.type}\``); continue; }
    const bsch = (shrineSch.blocks || []).find(x => x.type === b.type) || {};
    const bt = tracked(bsch, b.settings, bid);
    const bto = typeof btr.to === 'function' ? btr.to(bt.p, sec) : btr.to;
    const gb = (gadSch.blocks || []).find(x => x.type === bto);
    if (!gb) { report.errors.push(`${where} > ${bid}: Gadsden \`${to}\` no tiene el bloque \`${bto}\``); continue; }
    const res = btr.settings(bt.p, sec, t.p, bid);
    // Un traductor de bloque puede devolver varios bloques (p. ej. un bloque de Shrine que en Gadsden son dos).
    const list = Array.isArray(res) ? res : [{ id: bid, type: bto, settings: res }];
    for (const it of list) {
      const igb = (gadSch.blocks || []).find(x => x.type === (it.type || bto));
      if (!igb) { report.errors.push(`${where} > ${it.id}: Gadsden \`${to}\` no tiene el bloque \`${it.type}\``); continue; }
      blocks[it.id] = { type: it.type || bto, settings: fit(igb.settings, it.settings, `${where} > ${it.id} (${b.type} → ${it.type || bto})`, report) };
      order.push(it.id);
    }
    for (const k of unread(bt, btr.ignore || [])) report.unread.push(`${where} > ${bid} (${b.type}): \`${k}\` = ${JSON.stringify(bt.eff[k]).slice(0, 80)}`);
    const bn = btr.note && btr.note(bt.p); if (bn) report.notes.push(`${where} > ${bid} (${b.type}): ${bn}`);
  }
  const extra = tr.extraBlocks && tr.extraBlocks(t.p, sec);
  if (extra) for (const [k, v] of Object.entries(extra)) { blocks[k] = v; order.push(k); }
  if (order.length || sec.blocks) { out.blocks = blocks; out.block_order = order; }
  // Bloques armados desde datos (p. ej. el test de ATHLEX): se validan igual que los demás.
  if (tr.extra) {
    tr.extra(t.p, out, report, where);
    out.settings = fit(gadSch.settings, out.settings, `${where} (${sec.type} → ${to}, extra)`, report);
    for (const [k, b] of Object.entries(out.blocks || {})) {
      if (b.type.startsWith('shopify://')) continue;
      const gb = (gadSch.blocks || []).find(x => x.type === b.type);
      if (!gb) { report.errors.push(`${where} > ${k}: Gadsden \`${to}\` no tiene el bloque \`${b.type}\``); continue; }
      b.settings = fit(gb.settings, b.settings, `${where} > ${k} (extra)`, report);
    }
  }
  // Una sección de Shrine que en Gadsden son dos (p. ej. athlex-dolor = L02 + S21): las extra van después.
  if (tr.after) {
    out.__after = (tr.after(t.p, sec, report, where) || []).map(x => {
      const sch2 = schemaOf(THEME, x.type);
      const s2 = { type: x.type, settings: fit(sch2.settings, x.settings, `${where} → ${x.id} (${x.type})`, report), blocks: {}, block_order: [] };
      for (const bid of x.block_order || []) {
        const b = x.blocks[bid];
        const gb = (sch2.blocks || []).find(y => y.type === b.type);
        if (!gb) { report.errors.push(`${where} → ${x.id}: Gadsden \`${x.type}\` no tiene el bloque \`${b.type}\``); continue; }
        s2.blocks[bid] = { type: b.type, settings: fit(gb.settings, b.settings, `${where} → ${x.id} > ${bid}`, report) };
        s2.block_order.push(bid);
      }
      return { id: x.id, section: s2 };
    });
  }
  // CSS a medida por sección: DOMU no tiene (todos vacíos); si apareciera, no se copia (Gadsden nativo).
  if (sec.custom_css && sec.custom_css.length) report.errors.push(`${where}: custom_css no vacío (no se copia)`);
  return out;
}

module.exports = { TR, translateSection };
