// Traductores de las secciones de páginas, colecciones, carrito, blog, búsqueda, cuentas y contraseña.
const { TR } = require('./sections');
const { schemaOf, THEME, scheme, SCHEME, HEX, vis, hSize, tok, cc, colorScheme, carousel, common, heading } = require('./translate');

// Traspaso directo: copia cada ajuste de Shrine cuyo id existe en Gadsden (esquemas y visibilidad convertidos).
function same(to, e, only) {
  const out = {};
  for (const s of ((schemaOf(THEME, to) || {}).settings || [])) {
    if (!s.id || (only && !only.includes(s.id)) || !(s.id in e)) continue;
    let v = e[s.id];
    if (s.type === 'color_scheme') v = scheme(v);
    if (s.id === 'visibility') v = vis(v);
    out[s.id] = v;
  }
  return out;
}
const sameBlock = (to, type) => ({ to: type, settings: e => {
  const sch = (schemaOf(THEME, to).blocks || []).find(b => b.type === type) || {};
  return Object.fromEntries((sch.settings || []).filter(s => s.id && s.id in e).map(s => [s.id, e[s.id]]));
} });
const auto = (to, extra = {}) => ({ to, settings: e => ({ ...same(to, e), ...common(e), ...(extra.settings ? extra.settings(e) : {}) }),
  blocks: extra.blocks, ignore: extra.ignore, note: extra.note });

// Cuentas, contraseña, sistema: mismos ids que Dawn.
for (const t of ['main-account', 'main-activate-account', 'main-addresses', 'main-login', 'main-order', 'main-register', 'main-reset-password', 'main-404', 'main-page'])
  TR[t] = auto(t);
TR['main-blog'] = auto('main-blog');
TR['main-search'] = auto('main-search');
TR['main-article'] = auto('main-article', { ignore: ['page_width'], blocks: {
  featured_image: sameBlock('main-article', 'featured_image'), title: sameBlock('main-article', 'title'),
  content: sameBlock('main-article', 'content'), share: sameBlock('main-article', 'share') } });
TR['main-cart-items'] = auto('main-cart-items');
TR['main-cart-footer'] = auto('main-cart-footer', { blocks: {
  subtotal: { to: 'subtotal', settings: () => ({}) }, buttons: { to: 'buttons', settings: () => ({}) },
  discount_field: { to: 'coupon', settings: e => ({ placeholder: e.placeholder, button_text: e.btn_label, error: e.error_msg }) } } });
TR['custom-liquid'] = auto('custom-liquid');
TR['email-signup-banner'] = auto('email-signup-banner', { blocks: {
  heading: sameBlock('email-signup-banner', 'heading'), paragraph: sameBlock('email-signup-banner', 'paragraph'), email_form: sameBlock('email-signup-banner', 'email_form') } });

TR.newsletter = auto('newsletter', {
  settings: e => ({ ...colorScheme(e) }),
  blocks: {
    heading: { to: 'heading', settings: e => heading(e, 'title', ['h2', 'h1', 'h0', 'hxl', 'hxxl']) },
    paragraph: { to: 'paragraph', settings: e => ({ text: e.text }) },
    // El botón de Shrine es un ajuste de la sección; en Gadsden, del bloque del formulario.
    email_form: { to: 'email_form', settings: (e, sec, se) => ({ button_style: se.button_type === 'solid' ? 'below' : 'arrow', button_label: se.button_label }) },
  },
  ignore: ['button_type', 'button_label', 'button_style_secondary'],
  note: e => e.button_type === 'solid' ? `botón "${e.button_label}" lleno: Gadsden lo pone debajo del campo ("below")` : null,
});

const BADGES = { regular: 'sale', custom: 'custom', disabled: 'none' };
const grid = e => ({ quick_add: e.enable_quick_add ? 'standard' : 'none', equal_height: e.stretch_cards, badges: BADGES[e.badges],
  swatch_option: e.swatches_option_name, swatch_position: e.swatches_position, swatch_size_d: e.swatches_desktop_size, swatch_size_m: e.swatches_mobile_size });
TR['main-collection-product-grid'] = auto('main-collection-product-grid', { settings: grid });
TR['featured-collection'] = auto('featured-collection', {
  settings: e => ({ ...colorScheme(e), heading_size: hSize(e.heading_size, ['h2', 'h1', 'h0', 'hxl', 'hxxl']), title: e.title, title_accent: e.title_highlight_color,
    ...grid(e), card_scheme_on: true, card_scheme: scheme(e.cards_color_scheme), full_width: e.desktop_full_page,
    ...carousel(e, { columns_desktop: null, columns_mobile: null }), columns_desktop: e.columns_desktop, columns_mobile: String(e.columns_mobile) }),
});

TR['collection-list'] = auto('collection-list', {
  settings: e => ({ color_scheme: e.color_scheme === 'custom' ? 'scheme-1' : scheme(e.color_scheme), heading_size: hSize(e.heading_size, ['h2', 'h1', 'h0', 'hxl', 'hxxl']),
    image_ratio: e.image_ratio === 'circle' ? 'square' : e.image_ratio, columns_desktop: e.columns_desktop,
    columns_mobile: String(Math.min(e.columns_mobile_int, 2)), swipe_on_mobile: e.slider_mobile,
    // Carrusel de Shrine -> el de Gadsden 1.1.0 (las columnas por pantalla son las de la sección).
    ...carousel(e, { columns_desktop: null, columns_mobile: null }),
    full_width: /^desktop-full-page/.test(e.desktop_page_width),
    // Estilo propio de las tarjetas de Shrine con el título encima -> "Título sobre la imagen" de Gadsden 1.1.0.
    ...(e.custon_styling && /^over/.test(e.card_title_position) ? { card_layout: 'overlay', overlay_position: /bottom/.test(e.card_title_position) ? 'bottom' : 'center',
      overlay_color: e.cards_title_overlay_color, overlay_opacity: e.cards_title_overlay_opacity, overlay_text: e.cards_title_over_color,
      card_title_d: e.cards_desktop_title_size, card_title_m: e.cards_mobile_title_size, card_arrow: !!e.cards_show_arrow, card_radius: e.cards_corner_radius } : {}) }),
  // Con el título encima, el resto del estilo propio de Shrine (tarjeta, alineación, botón) no se ve.
  ignore: ['title_highlight_color', 'card_style', 'cards_color_scheme', 'card_text_alignment', 'card_title_limited_lines',
    'cards_cta_label', 'cards_cta_style', 'cards_cta_full_width', 'cards_cta_color', 'cards_desktop_cta_size', 'cards_mobile_cta_size',
    'cards_cta_height', 'cards_cta_padding', 'cards_cta_top_margin', 'mobile_full_page'],
  note: e => e.custon_styling && !/^over/.test(e.card_title_position) ? `GAP lista de colecciones: estilo propio de Shrine con el título ${e.card_title_position}` : null,
  blocks: { featured_collection: { to: 'featured_collection', settings: e => ({ collection: e.collection, image: e.custom_image, title: e.custom_title }) } },
});

TR['main-list-collections'] = auto('main-list-collections', {
  settings: e => ({ image_ratio: e.image_ratio === 'circle' ? 'square' : e.image_ratio, columns_mobile: String(e.columns_mobile),
    ...(e.custon_styling ? { card_title_d: e.cards_desktop_title_size, card_title_m: e.cards_mobile_title_size } : {}) }),
  // Sin "estilo propio" (custon_styling) Shrine usa los ajustes globales de tarjetas: el resto no tiene efecto.
  ignore: ['title_highlight_color', 'cards_mobile_title_size', 'cards_desktop_title_size', 'cards_cta_label', 'card_style', 'cards_color_scheme', 'card_text_alignment', 'cards_corner_radius', 'card_title_limited_lines', 'card_title_position', 'cards_title_overlay_color', 'cards_title_overlay_opacity', 'cards_title_over_color', 'cards_show_arrow', 'cards_cta_style', 'cards_cta_full_width', 'cards_cta_color', 'cards_desktop_cta_size', 'cards_mobile_cta_size', 'cards_cta_height', 'cards_cta_padding', 'cards_cta_top_margin', 'desktop_page_width', 'desktop_spacing', 'mobile_full_page', 'mobile_spacing'],
  note: e => e.custon_styling ? 'GAP lista de colecciones (página): estilo propio de Shrine sin equivalente' : null,
});

TR.slideshow = auto('slideshow', {
  settings: e => ({ pagination_d: e.desktop_pagination_position, pagination_m: e.mobile_pagination_position }),
  blocks: { slide: { to: 'slide', settings: e => ({
    image: e.image, image_mobile: e.mobile_image, image_overlay_opacity: e.image_overlay_opacity,
    ...heading(e, 'heading', ['h2', 'h1', 'h0', 'hxl', 'hxxl']), subheading: e.subheading, button_label: e.button_label, link: e.link,
    button_style_secondary: e.button_style_secondary, show_text_box: e.show_text_box,
    transparent_text: e.show_text_box ? 'scheme' : (e.transparent_container_color === 'black' ? 'dark' : 'light'),
    box_align: e.box_align, text_alignment: e.text_alignment, text_alignment_mobile: e.text_alignment_mobile,
    color_scheme: scheme(e.color_scheme), atc_label: e.atc_button_label, atc_product: e.atc_product, atc_skip_cart: e.atc_skip_cart }),
    note: e => e.color_scheme === 'custom' ? 'GAP colores propios de la diapositiva (Gadsden: sólo combinación)' : null } },
});

TR['slideshow-hero'] = {
  to: 'gad-hero-slides',
  settings: e => ({
    height_desktop: { autofit: 'fit', pixels: 'px', '100vh': 'screen' }[e.min_desktop_height_type], height_desktop_px: e.desktop_pixels_height,
    height_mobile: { autofit: 'fit', pixels: 'px', '100vh': 'screen' }[e.min_mobile_height_type], height_mobile_px: e.mobile_pixels_height,
    transparent_header: e.transparent_header, th_link: HEX[e.transparent_header_text_color], th_active: HEX[e.transparent_header_highlighted_link_color],
    th_hover: HEX[e.transparent_header_hover_link_color], th_logo: e.transparent_header_logo === 'secondary' ? 'secondary' : 'primary',
    th_hide_bars: e.hide_announcement_bars, car_type: e.slider_type === 'fade' ? 'fade' : 'loop', car_drag: e.drag, car_autoplay: e.autoplay,
    car_speed: e.autoplay_speed, show_dots: e.enable_dots, car_dots_color: (SCHEME[e.dots_color_scheme] || {}).bg, show_arrows: false,
    ...common(e) }),
  blocks: { slide: { to: 'slide', settings: e => ({
    bg_image: e.desktop_bg_image, bg_video: e.desktop_bg_video, overlay_color: e.desktop_overlay_color, overlay_opacity: e.desktop_overlay_opacity,
    bg_image_mobile: e.mobile_bg_image, bg_video_mobile: e.mobile_bg_video, overlay_color_mobile: e.mobile_overlay_color, overlay_opacity_mobile: e.mobile_overlay_opacity,
    sound_button: e.display_sound_btn, sound_scheme: scheme(e.sound_btn_color_scheme),
    pretitle: e.heading_prefix, heading: e.heading, heading_size: hSize(e.heading_size, ['h2', 'h1', 'h0', 'hxl']), heading_accent: e.title_highlight_color,
    subtitle: e.heading_suffix, small_size: e.heading_prefix_size === 'h2' ? 'h3' : e.heading_prefix_size === 'h3' ? 'h3' : e.heading_prefix_size,
    text: e.text, button_label_1: e.button_label_1, button_link_1: e.button_link_1, button_outline_1: e.button_style_secondary_1,
    button_label_2: e.button_label_2, button_link_2: e.button_link_2, button_outline_2: e.button_style_secondary_2,
    color_scheme: e.color_scheme === 'custom' ? 'scheme-1' : scheme(e.color_scheme),
    ...(e.color_scheme === 'custom' ? { custom_colors: true, cc_text: e.custom_colors_text, cc_btn_bg: e.custom_colors_solid_button_background,
      cc_btn_text: e.custom_colors_solid_button_text, cc_outline: e.custom_colors_outline_button } : { custom_colors: false }),
    full_width: e.full_page_width, max_width: { unlimited: 'none', pixels: 'px', percentage: 'pct' }[e.content_max_width] || 'none',
    max_width_px: e.content_pixels_max_width, max_width_pct: e.content_percentage_max_width,
    v_pos: { 'flex-start': 'top', center: 'center', 'flex-end': 'bottom' }[e.content_vertical_position],
    h_pos: { 'flex-start': 'left', center: 'center', 'flex-end': 'right' }[e.content_horizontal_position], align: e.content_text_alignment,
    m_v_pos: { 'flex-start': 'top', center: 'center', 'flex-end': 'bottom' }[e.mobile_content_vertical_position], m_align: e.mobile_content_text_alignment }),
    note: e => e.heading_prefix_size === 'h2' ? 'tamaño del antetítulo h2 → h3 (Gadsden llega a h3)' : null } },
};

TR['icon-bar'] = {
  to: 'gad-icon-bar',
  settings: e => ({
    ...heading(e), text: e.text, layout: e.icon_layout, icon_size: e.icon_size, icon_color: 'button', // el código propio pinta los íconos con el color del botón
    ...colorScheme(e),
    // Con las tarjetas de la misma combinación que la sección, Shrine no dibuja la caja (medido en Limbex).
    card_style: e.cards_color_scheme === e.color_scheme && e.color_scheme !== 'custom' ? 'none' : e.cards_color_scheme === 'custom' ? 'custom' : e.cards_color_scheme === 'bg-overlay' ? 'tint' : 'scheme',
    card_color_scheme: scheme(e.cards_color_scheme), card_cc_bg: e.custom_cards_colors_background, card_cc_bg_gradient: e.custom_cards_gradient_background,
    card_cc_text: e.custom_cards_colors_text, full_width: e.desktop_full_page, ...carousel(e), car_drag: 'on', ...common(e),
  }),
  note: e => e.icon_color === 'accent-2' || e.icon_color === 'background-1' || e.icon_color === 'background-2' ? `color de íconos ${e.icon_color} → acento` : null,
  blocks: { column: { to: 'icon', settings: e => ({ icon: e.icon, icon_filled: e.filled_icon, icon_image: e.image, title: e.title, text: e.text }) } },
};

TR['contact-form'] = {
  to: 'contact-form',
  settings: e => ({ ...heading(e, 'title', ['h2', 'h1', 'h0', 'hxl', 'hxxl']), ...colorScheme(e),
    ok_icon: e.success_icon, ok_icon_filled: e.success_icon_filled, ok_icon_image: e.success_custom_icon, ok_text: e.success_text_color,
    ok_bg: e.success_bg_color, ok_radius: e.success_border_radius, ok_border: e.success_border_width, ok_border_color: e.success_border_color,
    err_icon: e.errors_icon, err_icon_filled: e.errors_icon_filled, err_icon_image: e.errors_custom_icon, err_text: e.errors_text_color,
    err_bg: e.errors_bg_color, err_radius: e.errors_border_radius, err_border: e.errors_border_width, err_border_color: e.errors_border_color,
    button_full_width: e.button_full_width, ...common(e) }),
  blocks: {
    field_row: { to: 'fields', settings: e => Object.assign({}, ...[1, 2].map(n => ({ [`f${n}_on`]: e[`input_${n}_enabled`], [`f${n}_type`]: e[`input_${n}_type`],
      [`f${n}_label`]: e[`input_${n}_type`] === 'custom' ? e[`input_${n}_custom_name`] : '', [`f${n}_required`]: e[`input_${n}_required`],
      [`f${n}_error`]: e[`input_${n}_error_message`] }))), ignore: ['input_1_custom_name', 'input_2_custom_name'] },
    textarea: { to: 'textarea', settings: e => ({ kind: e.input_type, label: e.input_type === 'custom' ? e.input_custom_name : '', maxlength: e.max_characters || 0,
      required: e.input_required, error: e.input_error_message }), ignore: ['input_custom_name'] },
  },
};

const ROW = { small: 'sm', medium: 'md', large: 'lg' };
TR['collapsible-content'] = {
  to: 'collapsible-content',
  settings: e => ({ caption: e.caption, ...heading(e, 'title', ['h2', 'h1', 'h0', 'hxl', 'hxxl']), heading_alignment: e.heading_alignment, layout: e.layout,
    ...colorScheme(e), container_color_scheme: e.container_color_scheme === 'custom' ? 'scheme-2' : scheme(e.container_color_scheme),
    ...(e.container_color_scheme === 'custom' ? { container_custom_colors: true, container_cc_bg: e.custom_contaner_colors_background,
      container_cc_bg_gradient: e.custom_container_gradient_background, container_cc_text: e.custom_contaner_colors_text } : { container_custom_colors: false }),
    open_first_collapsible_row: e.open_first_collapsible_row, title_size: ROW[e.row_heading_size], toggle_icon: e.collapse_icon === 'plus' ? 'plus' : 'caret',
    top_border: e.display_top_border, image: e.image, video: e.video, video_autoplay: e.video_muted_autoplay, image_ratio: e.image_ratio,
    desktop_layout: e.desktop_layout, ...common(e) }),
  ignore: ['custom_contaner_colors_background', 'custom_container_gradient_background', 'custom_contaner_colors_text'],
  blocks: { collapsible_row: { to: 'collapsible_row', settings: e => ({ heading: e.heading, icon: 'none', icon_name: e.custom_icon ? '' : e.icon,
    icon_filled: e.filled_icon, icon_image: e.custom_icon, row_content: e.row_content, page: e.page }) } },
};

TR.multicolumn = {
  to: 'multicolumn',
  settings: e => ({ title: e.title, heading_size: hSize(e.heading_size, ['h2', 'h1', 'h0', 'hxl', 'hxxl']), title_accent: e.title_highlight_color,
    button_label: e.button_label, button_link: e.button_link, atc_label: e.atc_button_label, atc_product: e.atc_product, atc_skip_cart: e.atc_skip_cart,
    ...colorScheme(e),
    card_style: e.cards_color_scheme === 'bg-overlay' ? 'tint' : e.cards_color_scheme === 'custom' ? 'custom' : 'scheme', card_color_scheme: scheme(e.cards_color_scheme),
    card_cc_bg: e.custom_cards_colors_background, card_cc_bg_gradient: e.custom_cards_gradient_background, card_cc_text: e.custom_cards_colors_text,
    card_radius: e.cards_corner_radius, equal_height: e.stretch_cards,
    valign: { 'flex-start': 'top', center: 'center', 'flex-end': 'bottom' }[e.stretched_cards_content_alignment],
    image_width: e.image_width, image_ratio: e.image_ratio, media_position: e.media_position,
    column_alignment: e.column_alignment === 'right' ? 'left' : e.column_alignment,
    title_size_d: e.desktop_heading_size, title_size_m: e.mobile_heading_size, text_size_d: e.desktop_text_size, text_size_m: e.mobile_text_size,
    title_gap: e.desktop_text_top_margin, card_pad_d: e.desktop_container_padding_x, card_pad_m: e.mobile_container_padding_x,
    full_width: e.desktop_full_page, ...carousel(e, { columns_desktop: null, columns_mobile: null }), columns_desktop: e.columns_desktop, columns_mobile: String(e.columns_mobile),
    car_drag: 'on', ...common(e) }),
  ignore: ['mobile_text_top_margin', 'desktop_container_padding_y', 'mobile_container_padding_y', 'custom_cards_colors_heading'],
  note: e => {
    const n = [];
    if (e.mobile_text_top_margin !== e.desktop_text_top_margin) n.push(`separación título-texto en mobile ${e.mobile_text_top_margin}px (Gadsden: una sola, ${e.desktop_text_top_margin}px)`);
    if (e.desktop_container_padding_y !== e.desktop_container_padding_x || e.mobile_container_padding_y !== e.mobile_container_padding_x)
      n.push(`relleno de tarjeta vertical ${e.desktop_container_padding_y}/${e.mobile_container_padding_y}px distinto del horizontal (Gadsden: uno solo)`);
    if (e.cards_color_scheme === 'custom') n.push(`GAP color de los títulos de las tarjetas ${e.custom_cards_colors_heading}`);
    if (e.column_alignment === 'right') n.push('GAP alineación a la derecha');
    return n.join('; ') || null;
  },
  blocks: { column: { to: 'column', settings: e => ({ image: e.image, video: e.video, video_autoplay: e.muted_autoplay, title: e.title, text: e.text,
    link_label: e.link_label, link: e.link }), ignore: ['video_thumbnail'],
    note: e => e.video_thumbnail ? `GAP miniatura del video ${e.video_thumbnail}` : null } },
};

TR['comparison-table'] = {
  to: 'gad-compare-table',
  settings: e => {
    const hlC = e.highlighted_color_scheme === 'custom', regC = e.other_cells_color_scheme === 'custom';
    return { ...heading(e), text: e.text, button_label: e.button_label, button_link: e.link, button_outline: e.button_style_secondary,
      atc_label: e.atc_button_label, atc_product: e.atc_product, atc_skip_cart: e.atc_skip_cart,
      align: e.desktop_alignment, m_align: e.mobile_alignment, ...colorScheme(e), position: e.layout === 'table_first' ? 'first' : 'second',
      table_style: e.style, own_tab: e.style === 'centered', radius: e.corner_radius, competitors: e.number_of_competitors,
      own_label: String(e.us_label).replace('[shop_name]', '{tienda}'), own_size: e.us_label_size, own_logo: e.logo, own_logo_width_d: e.logo_width, own_logo_width_m: e.mobile_logo_width,
      c1_label: e.others_label, c1_size: e.others_label_size, c1_logo: e.others_logo, c1_logo_width_d: e.others_logo_width, c1_logo_width_m: e.others_mobile_logo_width,
      c2_label: e.others_2_label, c2_size: e.others_2_label_size, c2_logo: e.others_2_logo, c2_logo_width_d: e.others_2_logo_width, c2_logo_width_m: e.others_2_mobile_logo_width,
      c3_label: e.others_3_label, c3_size: e.others_3_label_size, c3_logo: e.others_3_logo, c3_logo_width_d: e.others_3_logo_width, c3_logo_width_m: e.others_3_mobile_logo_width,
      check_style: e.checkmark_style === 'regular' ? 'simple' : 'filled', check_color: e.checkmark_color, check_bg: e.checkmark_bg_color,
      cross_style: e.x_style === 'regular' ? 'simple' : 'filled', cross_color: e.x_color, cross_bg: e.x_bg_color, inverted: e.opposite_icon_colors === 'inverse',
      hl_style: hlC ? 'custom' : 'scheme', hl_scheme: hlC ? 'scheme-5' : scheme(e.highlighted_color_scheme), hl_bg: e.custom_colors_highlighted_background,
      hl_text: e.custom_colors_highlighted_text, hl_separator: e.highlighted_separator_opacity, hl_zebra: e.highlighted_overlay_opacity,
      reg_style: regC ? 'custom' : 'scheme', reg_scheme: regC ? 'scheme-2' : scheme(e.other_cells_color_scheme), reg_bg: e.custom_colors_others_background,
      reg_text: e.custom_colors_others_text, reg_separator: e.regular_separator_opacity, reg_zebra: e.regular_overlay_opacity,
      min_line: e.minimalistic_border_opacity, ...common(e) };
  },
  ignore: ['custom_colors_highlighted_background', 'custom_colors_highlighted_text', 'custom_colors_others_background', 'custom_colors_others_text'],
  blocks: { row: { to: 'row', settings: e => ({ benefit: e.benefit, own: e.us, c1: e.others, c2: e.others_2, c3: e.others_3 }) } },
};

TR['content-tabs'] = {
  to: 'gad-tabs',
  settings: e => ({ ...heading(e), text: e.text, ...colorScheme(e),
    // Ancho del contenedor de Shrine (80/100/120 rem o el de la página) -> xs/s/m/normal de Gadsden. [VERIFICAR] en la captura.
    width: { 80: 's', 100: 'm', 120: 'normal', normal: 'normal' }[e.container_width] || 'normal',
    custom_buttons: e.buttons_color_scheme === 'custom', button_color: e.buttons_color_scheme === 'custom' ? e.custom_tabs_color : (SCHEME[e.buttons_color_scheme] || {}).bg,
    button_active_text: e.buttons_color_scheme === 'custom' ? e.custom_tabs_color_label : (SCHEME[e.buttons_color_scheme] || {}).fg,
    button_radius: e.button_border_radius, nav_style: { shadow: 'shadow', outlined: 'border' }[e.buttons_style] || 'solid', active_style: e.active_button_animation === 'moving' ? 'slide' : 'fade',
    // En Shrine "vertical" apila los botones arriba del contenido: en Gadsden eso es "horizontal" (medido en Limbex).
    layout: e.header_layout === 'vertical' ? 'horizontal' : 'vertical',
    font_size_d: e.buttons_desktop_font_size, stretch_d: e.desktop_full_size_buttons, font_size_m: e.buttons_mobile_font_size, stretch_m: e.mobile_full_size_buttons, ...common(e) }),
  ignore: ['custom_tabs_color', 'custom_tabs_color_label'],
  blocks: { tab: { to: 'tab', settings: e => ({ label: e.btn_label, icon: e.btn_icon, icon_filled: e.filled_btn_icon, image: e.image, video: e.video, loop: e.loop,
    autoplay: e.muted_autoplay, play_scheme: scheme(e.btn_color_scheme), pulse: e.btn_animation, title: e.title, title_size: hSize(e.heading_size, ['h3', 'h2', 'h1', 'h0']),
    title_accent: e.title_highlight_color, text: e.text, button_label: e.button_label, button_link: e.link, button_outline: e.button_style_secondary,
    atc_label: e.atc_button_label, atc_product: e.product, atc_skip_cart: e.atc_skip_cart, media_width: e.desktop_media_width,
    media_position: e.desktop_media_position === 'media_second' ? 'second' : 'first', align: e.desktop_text_alignment,
    m_media_position: e.mobile_media_position === 'media_second' ? 'second' : 'first', m_align: String(e.mobile_text_alignment).replace('mobile-', '') }) } },
};

TR.testimonials = {
  to: 'gad-testimonials',
  settings: e => ({ ...heading(e), text: e.text, ...colorScheme(e), media_width: e.image_width, media_ratio: e.image_ratio, text_align: e.column_alignment,
    show_stars: e.show_stars, empty_stars: { solid: 'filled', outlined: 'outline', hidden: 'hidden' }[e.inactive_stars_style], star_color: e.star_color,
    star_empty_color: e.bg_star_color, show_quotes: e.show_quotes, quotes_color: (SCHEME[e.quotes_color_scheme] || {}).fg,
    card_style: e.cards_color_scheme === 'custom' ? 'custom' : e.cards_color_scheme === 'bg-overlay' ? 'tint' : 'scheme', card_color_scheme: scheme(e.cards_color_scheme),
    card_cc_bg: e.custom_cards_colors_background, card_cc_bg_gradient: e.custom_cards_gradient_background, card_cc_text: e.custom_cards_colors_text,
    full_width: e.desktop_full_page, ...carousel(e), car_drag: 'on', ...common(e) }),
  blocks: { column: { to: 'testimonial', settings: e => ({ image: e.image, video: e.video, rating: e.star_rating, title: e.title, text: e.text, avatar: e.author_avatar, author: e.author }),
    ignore: ['video_thumbnail'], note: e => e.video_thumbnail ? `GAP miniatura del video ${e.video_thumbnail}` : null } },
};

TR.multirow = {
  to: 'multirow',
  settings: e => ({ image_height: e.image_height, desktop_image_width: e.desktop_image_width, image_layout: e.image_layout,
    heading_size: hSize(e.heading_size, ['h2', 'h1', 'h0', 'hxl', 'hxxl']), text_style: e.text_style, button_style: e.button_style,
    desktop_content_position: e.desktop_content_position, desktop_content_alignment: e.desktop_content_alignment, mobile_content_alignment: e.mobile_content_alignment,
    section_color_scheme: e.section_color_scheme === 'custom' ? 'scheme-1' : scheme(e.section_color_scheme),
    ...(e.section_color_scheme === 'custom' ? { section_custom_colors: true, section_cc_bg: e.custom_section_colors_background, section_cc_bg_gradient: e.custom_section_gradient_background } : { section_custom_colors: false }),
    row_color_scheme: e.row_color_scheme === 'custom' ? 'scheme-1' : scheme(e.row_color_scheme),
    ...(e.row_color_scheme === 'custom' ? { row_custom_colors: true, row_cc_bg: e.custom_colors_background, row_cc_bg_gradient: e.custom_gradient_background,
      row_cc_text: e.custom_colors_text, row_cc_btn_bg: e.custom_colors_solid_button_background, row_cc_btn_text: e.custom_colors_solid_button_text,
      row_cc_outline: e.custom_colors_outline_button } : { row_custom_colors: false }),
    m_media_full: e.mobile_full_media_width, m_media_order: e.mobile_direction === 'reverse' ? 'second' : 'first', ...common(e) }),
  ignore: ['custom_colors_background', 'custom_gradient_background', 'custom_colors_text', 'custom_colors_solid_button_background', 'custom_colors_solid_button_text',
    'custom_colors_outline_button', 'custom_section_colors_background', 'custom_section_gradient_background'],
  blocks: { row: { to: 'row', settings: e => ({ image: e.image, video: e.video, video_autoplay: e.video_muted_autoplay, caption: e.caption,
    heading: e.title, heading_accent: e.title_highlight_color, text: e.text, button_label: e.button_label, button_link: e.button_link }),
    ignore: ['atc_button_label', 'atc_product', 'atc_skip_cart'], note: e => e.atc_button_label ? 'GAP botón de agregar al carrito en la fila' : null } },
};

TR['rich-text'] = {
  to: 'rich-text',
  settings: e => ({ desktop_content_position: e.desktop_content_position, content_alignment: e.content_alignment, full_width: e.full_width, ...colorScheme(e), ...common(e) }),
  blocks: {
    heading: { to: 'heading', settings: e => heading(e, 'title', ['h2', 'h1', 'h0', 'hxl', 'hxxl']) },
    caption: sameBlock('rich-text', 'caption'), text: sameBlock('rich-text', 'text'), button: sameBlock('rich-text', 'button'),
    rating_stars: { to: 'stars', settings: e => ({ rating: e.rating, star_color: e.star_color, empty_style: e.bg_stars_style === 'outlined' ? 'outline' : 'filled',
      empty_color: e.bg_star_color, text: e.label, size: e.size, scroll_target: e.scroll_id }) },
    trustpilot_stars: { to: 'trustpilot', settings: e => ({ rating: e.rating, color: e.star_color, empty_color: e.bg_star_color, text: e.label, size: e.size, scroll_target: e.scroll_id }),
      ignore: ['star_symbol_color'] },
    atc_button: { to: 'atc', settings: e => ({ atc_label: e.button_label, atc_product: e.atc_product, atc_skip_cart: e.atc_skip_cart }) },
  },
};

TR['track-order'] = {
  to: 'gad-track-order',
  settings: e => ({ ...heading(e), text: e.text, input_label: e.input_label, button_label: e.button_label, button_full_width: e.button_full_width, ...colorScheme(e), ...common(e) }),
};

TR['image-with-text'] = {
  to: 'image-with-text',
  settings: e => ({ image: e.image, video: e.video, video_autoplay: e.video_autoplay, height: e.height, media_width: e.desktop_media_width, full_width: e.full_desktop_width,
    layout: e.layout, content_layout: e.content_layout, desktop_content_position: e.desktop_content_position, desktop_content_alignment: e.desktop_content_alignment,
    mobile_content_alignment: e.mobile_content_alignment,
    color_scheme: e.color_scheme === 'custom' ? 'scheme-1' : scheme(e.color_scheme), section_color_scheme: e.section_color_scheme === 'custom' ? 'scheme-1' : scheme(e.section_color_scheme),
    padding_top: e.desktop_padding_top, padding_bottom: e.desktop_padding_bottom, m_padding_top: e.mobile_padding_top, m_padding_bottom: e.mobile_padding_bottom,
    m_media_full: e.mobile_full_media_width, m_media_order: e.mobile_direction === 'reverse' ? 'second' : 'first', m_quality: e.mobile_image_quanlity === '1' ? 'standard' : 'enhanced',
    ...common(e) }),
  ignore: ['video_loop'],
  note: e => [e.color_scheme === 'custom' || e.section_color_scheme === 'custom' ? 'GAP colores propios de image-with-text (Gadsden: sólo combinaciones)' : null,
    !e.video_loop && e.video ? 'GAP video sin repetir' : null].filter(Boolean).join('; ') || null,
  blocks: {
    heading: { to: 'heading', settings: e => heading(e, 'title', ['h2', 'h1', 'h0', 'hxl', 'hxxl']) },
    caption: sameBlock('image-with-text', 'caption'), text: sameBlock('image-with-text', 'text'), button: sameBlock('image-with-text', 'button'),
    rating_stars: { to: 'stars', settings: e => ({ rating: e.rating, star_color: e.star_color, empty_style: e.bg_stars_style === 'outlined' ? 'outline' : 'filled',
      empty_color: e.bg_star_color, text: e.label, size: e.size, scroll_target: e.scroll_id }) },
    trustpilot_stars: { to: 'trustpilot', settings: e => ({ rating: e.rating, color: e.star_color, empty_color: e.bg_star_color, text: e.label, size: e.size, scroll_target: e.scroll_id }), ignore: ['star_symbol_color'] },
    image: { to: 'image', settings: e => ({ image: e.image, width: e.width, align: { 'flex-start': 'left', center: 'center', 'flex-end': 'right' }[e.alignment], radius: e.border_radius }),
      ignore: ['mobile_alignment'] },
    atc_button: { to: 'atc', settings: e => ({ atc_label: e.button_label, atc_product: e.atc_product, atc_skip_cart: e.atc_skip_cart }) },
  },
};

module.exports = { same, sameBlock, auto };

const WIDTH = { normal: 'page', 'desktop-full-page': 'full', 'desktop-full-page-no-padding': 'full-bleed' };
TR['image-slider'] = {
  to: 'gad-media-slider',
  // Shrine muestra las diapositivas sin imagen con el marcador gris de Shopify (medido en Limbex): show_empty.
  settings: e => ({ show_empty: true, ...heading(e), ...colorScheme(e), page_width: WIDTH[e.desktop_page_width], radius_d: e.desktop_border_radius,
    m_full_width: e.mobile_full_page, radius_m: e.mobile_border_radius, ...carousel(e), ...common(e) }),
  blocks: {
    image_slide: { to: 'image_slide', settings: e => ({ image: e.image, link: e.link, description: e.description, desc_align: e.desc_alignment || 'left',
      desc_scheme: scheme(e.desc_color_scheme) }) },
    video_slide: { to: 'video_slide', settings: e => ({ video: e.video, thumbnail: e.thumbnail, loop: e.loop, autoplay: e.muted_autoplay,
      tap_toggle: e.display_play_btn, pulse: e.btn_animation, button_scheme: scheme(e.btn_color_scheme), sound: e.display_sound_btn,
      sound_scheme: scheme(e.sound_btn_color_scheme), timeline: e.display_timeline, timeline_color: (SCHEME[e.timeline_color] || {}).bg,
      description: e.description, desc_align: e.desc_alignment || 'left', desc_scheme: scheme(e.desc_color_scheme) }) },
  },
};
TR.apps = { to: 'apps', settings: e => ({ include_margins: e.include_margins }), ignore: ['display_id'] };

// ---------- cinta (horizontal-ticker -> gad-ticker) y antes/después (comparison-slider -> gad-before-after) ----------
const tiBlock = e => {
  const f = e.mobile_text_size;
  const ti = { ti_size_m: e.mobile_text_size, ti_size_d: e.desktop_text_size, ti_align: e.alignment, ti_color: e.text_color, ti_icon_scale: e.icon_scale,
    ti_icon_color: e.icon_color, ti_stack: e.direction, ti_gap: Math.round(e.column_gap * f / (e.direction === 'horizontal' ? 2 : 5)),
    ti_bg: e.enable_bg, ti_bg_color: e.bg_color, ti_radius: Math.round(e.corner_radius / 100 * f), ti_pad_axes: true,
    ti_padding_y: Math.round(e.padding / 7 * f), ti_padding_x: Math.round(e.padding / 7 * f * 2), ti_border: e.border_size, ti_border_color: e.border_color };
  for (const i of [1, 2, 3]) Object.assign(ti, { [`ti_text_${i}`]: e[`text_${i}`], [`ti_icon_${i}`]: e[`text_${i}`] ? e[`icon_${i}`] : '', [`ti_filled_${i}`]: e[`filled_icon_${i}`], [`ti_image_${i}`]: e[`custom_icon_${i}`] });
  return ti;
};
TR['horizontal-ticker'] = {
  to: 'gad-ticker',
  settings: e => ({ speed: e.speed, direction: e.direction, pause_hover: e.stop_on_hover, gap_m: e.mobile_spacing, gap_d: e.desktop_spacing, ...colorScheme(e),
    text_size_m: e.mobile_text_size, text_size_d: e.desktop_text_size, italic: e.italic_text, uppercase: e.uppercase_text, bold: e.bold_text,
    image_height_m: e.mobile_image_height, image_height_d: e.desktop_image_height, review_width_m: e.mobile_reviews_width, review_width_d: e.desktop_reviews_width,
    padding_top_m: e.mobile_padding_top, padding_bottom_m: e.mobile_padding_bottom, padding_top_d: e.desktop_padding_top, padding_bottom_d: e.desktop_padding_bottom,
    only_on_products_enabled: e.enable_specific_display, ...common(e) }),
  ignore: ['hidden_products', 'displayed_products'],
  note: e => (e.hidden_products || e.displayed_products) ? `[VERIFICAR] fichas por handle (${e.hidden_products || ''} ${e.displayed_products || ''}): Gadsden las elige como lista de productos` : null,
  blocks: {
    text: { to: 'text', settings: e => ({ text: e.title }) },
    image: { to: 'image', settings: e => ({ image: e.image }) },
    reviews: { to: 'review', settings: e => ({ author: tok(e.author_1), photo: e.image_1, text: e.text_1, rv_color_scheme: scheme(e.color_scheme), rv_custom_bg: e.show_custom_bg,
      rv_bg: e.custom_bg_color, rv_radius: e.corner_radius, rv_border: e.border_width, rv_border_color: e.border_color, rv_avatar_align: e.avatar_alignment,
      rv_avatar_radius: e.avatar_corner_radius, rv_star_color: e.star_color, rv_star_offset: e.stars_translate, rv_check_bg: e.checkmark_color, rv_check_color: e.checkmark_icon_color }) },
    text_with_icon: { to: 'text_icons', settings: e => ({ fixed_width: e.block_width === 'fixed', width_m: e.block_mobile_width, width_d: e.block_desktop_width, ...tiBlock(e) }), ignore: ['mobile_alignment'] },
    icon_with_content: { to: 'icon_content', settings: e => ({ fixed_width: e.block_width === 'fixed', width_m: e.block_mobile_width, width_d: e.block_desktop_width,
      icon: e.icon, icon_filled: e.filled_icon, icon_image: e.image, icon_size: e.icon_size,
      icon_position: { above: 'above', 'next-to-title': 'title', 'next-to-text': 'content' }[e.icon_position], icon_color: e.icon_color === 'text' ? 'text' : 'accent',
      title_size: e.icon_heading_size === 'h2' ? 'h3' : e.icon_heading_size, align: e.icon_text_alignment, title: e.title, text: e.text }) },
  },
};
const LINE = { 'background-1': 'background', 'background-2': 'background', inverse: 'foreground', 'accent-1': 'button', 'accent-2': 'accent' };
TR['comparison-slider'] = {
  to: 'gad-before-after',
  settings: e => ({ ...heading(e), text: e.text, button_label: e.button_label, button_link: e.link, button_outline: e.button_style_secondary,
    atc_label: e.atc_button_label, atc_product: e.atc_product, atc_skip_cart: e.atc_skip_cart, ...colorScheme(e),
    position: e.layout === 'slider_first' ? 'first' : 'second', before_image: e.before_image, after_image: e.after_image,
    before_label: e.before_label, after_label: e.after_label, labels_scheme: scheme(e.labels_color_scheme), line_color: LINE[e.line_color],
    // La manija "classic" de Shrine es la línea con dos triángulos (Limbex); "circle", el círculo.
    handle_style: e.arrows_style === 'classic' ? 'triangles' : 'circle', ...common(e) }),
};
