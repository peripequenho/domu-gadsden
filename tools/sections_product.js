// Ficha de producto: main-product de Shrine (con los bloques que DOMU le sumó: sticky_atc, emoji_benefits,
// reviews, text) -> main-product de Gadsden (V1-MATRIZ.md c.5). Los bloques de apps pasan tal cual.
const { TR } = require('./sections');
const { scheme, SCHEME, tok } = require('./translate');

const ROLE = v => ({ text: 'foreground', 'accent-1': 'button', 'outline-button': 'outline', 'accent-2': 'accent' }[v] || 'foreground');
const AL = { 'flex-start': 'left', center: 'center', 'flex-end': 'right' };
const mg = e => ({ margin_top: e.margin_top, margin_bottom: e.margin_bottom });

TR['main-product'] = {
  to: 'main-product',
  settings: e => ({
    enable_sticky_info: e.enable_sticky_info, gad_sticky_media: false, color_scheme: 'scheme-1',
    media_size: e.media_size, constrain_to_viewport: e.constrain_to_viewport, media_fit: e.media_fit, gallery_layout: e.gallery_layout,
    media_position: e.media_position, image_zoom: e.image_zoom, hide_variants: e.hide_variants, enable_video_looping: e.enable_video_looping,
    thumbs_position: e.desktop_thumbnails_position, thumbs_count: e.desktop_thumbnails_count, thumbs_v_width: e.desktop_vertical_thumbnails_width,
    thumbs_v_hide_arrows: e.desktop_vertical_thumbnails_hide_arrows, thumbs_ratio: e.thumbnails_ratio,
    main_arrows: e.desktop_arrows_position === 'sides', gallery_arrows_scheme: scheme(e.arrows_color_scheme), gallery_arrows_bare: e.transparent_arrows,
    gallery_dots_color: (SCHEME[e.dots_color_scheme] || {}).bg,
    mobile_thumbnails: e.mobile_thumbnails_position === 'hidden' ? 'hide' : 'show',
    ...(e.mobile_thumbnails_position !== 'hidden' ? { m_thumbs_position: e.mobile_thumbnails_position } : {}),
    m_thumbs_count: e.mobile_thumbnails_count, m_thumbs_v_width: e.mobile_vertical_thumbnails_width,
    m_radius: e.mobile_media_corner_radius, m_gap: e.mobile_spacing_pixels,
    m_peek_type: e.mobile_scroll_padding_percentage > 0 ? 'pct' : e.mobile_scroll_padding_pixels > 0 ? 'px' : 'none',
    m_peek_pct: e.mobile_scroll_padding_percentage, m_peek_px: e.mobile_scroll_padding_pixels, m_edge: e.enable_mobile_outher_spacing,
    m_container: e.mobile_slides_container_width, m_image_width: e.mobile_slides_inner_width,
    m_pagination: { dots_overlay: 'dots_over', dots_under: 'dots_under', numeric: 'numbers', hidden: 'hidden' }[e.mobile_pagination],
    m_arrows: e.mobile_arrows_position, m_arrows_scheme: scheme(e.arrows_color_scheme), m_arrows_bare: e.transparent_arrows,
    m_dots_color: (SCHEME[e.dots_color_scheme] || {}).bg,
    trust_badge: e.trust_badge, trust_badge_position: e.trust_badge_position, trust_badge_size: e.trust_badge_size,
    video_mode: { play_btn: 'button', autoplay: 'autoplay', modal: 'modal' }[e.video_player], video_pause: e.autoplay_videos_pause_btn,
    video_sound: e.video_sound_btn, video_timeline: e.video_timeline, video_button_scheme: scheme(e.play_btn_color_scheme),
    video_timeline_color: (SCHEME[e.timeline_color] || {}).bg,
    variant_media_first: e.display_variant_image_first, keep_media_order: e.disable_prepend,
    filter_option: e.variant_image_filtering === 'none' ? '' : e.variant_image_filtering,
    padding_top: e.desktop_padding_top, padding_bottom: e.desktop_padding_bottom, m_padding_top: e.mobile_padding_top, m_padding_bottom: e.mobile_padding_bottom,
  }),
  // El botón de sonido de Shrine pinta con la combinación "sound_btn"; Gadsden usa la de los botones de video para los dos.
  ignore: ['display_id', 'sound_btn_color_scheme', 'mobile_vertical_thumbnails_hide_arrows'],
  note: e => [e.variant_image_filtering !== 'none' ? `[VERIFICAR] filtrar imágenes por ${e.variant_image_filtering}: Gadsden pide el nombre de la opción` : null,
    e.mobile_thumbnails_position !== 'hidden' && e.mobile_vertical_thumbnails_hide_arrows !== true ? null : null].filter(Boolean).join('; ') || null,
  blocks: {
    title: { to: 'title', settings: e => ({ size: { h2: 'sm', h1: 'md', h0: 'lg' }[e.text_size], align: e.title_alignment, uppercase: e.uppercase_title, ...mg(e) }) },
    price: { to: 'price', settings: e => ({ order: e.layout === 'price_second' ? 'compare_first' : 'price_first', price_color: ROLE(e.price_color),
      compare_color: ROLE(e.compare_price_color), badge: e.displayed_badge, badge_text: tok(e.custom_badge_text), badge_icon_scale: e.icon_scale,
      badge_icon_1: e.icon_1, badge_icon_1_filled: e.filled_icon_1, badge_icon_1_image: e.custom_icon_1,
      badge_icon_2: e.icon_2, badge_icon_2_filled: e.filled_icon_2, badge_icon_2_image: e.custom_icon_2, show_tax_note: false, ...mg(e) }) },
    variant_picker: { to: 'variant_picker', settings: e => ({ picker_type: 'button', swatch_shape: 'circle', option_types: e.picker_types,
      label_format: tok(e.custom_labels) || '{nombre}', hide_sold_out: e.skip_unavailable, dropdown_full: e.full_width_dropdowns,
      swatch_size: { small: 's', medium: 'm', large: 'l', 'extra-large': 'l' }[e.swatches_size],
      swatch_source: { disabled: 'none', image_alt: 'alt', custom: 'custom', predefined: 'global' }[e.swatches_custom_colors],
      swatch_colors: String(e.swatches_custom_colors_list || '').split(',').map(x => x.trim()).filter(Boolean).join('\n') }),
      // Las "breaks" (ofertas por variante) sólo se activan con "breaks" en los tipos de opción: DOMU no lo usa.
      ignore: k => /^breaks_/.test(k), ignoreFn: true,
      note: e => /breaks/.test(e.picker_types || '') ? 'GAP ofertas por variante (breaks) del selector de Shrine' : null },
    quantity_selector: { to: 'quantity_selector', settings: e => ({ full_width: e.full_width_classic, ...mg(e) }),
      ignoreFn: true, ignore: k => /^option_\d_|^(enable_quantity_discounts|atc_append|atc_append_heights|style|headline|preselected|display_selected_indicator|border_radius|border_width|color_scheme|enable_variant_selectors|enable_variant_selectors_on_quantity_of_1|update_prices|skip_unavailable|full_width_pickers|hide_pickers_overlay|pickers_label|image_width|space_images|vertical_images_position|vertical_prices_layout)$/.test(k),
      note: e => [e.enable_quantity_discounts ? 'GAP ofertas por cantidad de Shrine: revisar quantity_offers' : null,
        e.atc_append !== 'none' ? `GAP selector de cantidad pegado al botón (${e.atc_append})` : null].filter(Boolean).join('; ') || null },
    buy_buttons: { to: 'buy_buttons', settings: e => ({ show_dynamic_checkout: e.show_dynamic_checkout, show_gift_card_recipient: false,
      uppercase: e.uppercase_text, price_in_button: e.display_price, skip_cart: e.skip_cart, custom_color: e.enable_custom_color, color: e.custom_color,
      icon_before: e.prefix_icon, icon_after: e.suffix_icon, icon_scale: e.icon_scale, icon_gap: e.icon_spacing,
      second_button: e.enable_secondary_btn, second_label: e.secondary_btn_label, second_custom_color: e.secondary_btn_enable_custom_color,
      second_color: e.secondary_btn_custom_color, second_icon_before: e.secondary_btn_prefix_icon, second_icon_after: e.secondary_btn_suffix_icon, ...mg(e) }) },
    custom_liquid: { to: 'custom_liquid', settings: e => ({ custom_liquid: e.custom_liquid }) },
    collapsible_tab: { to: 'collapsible_tab', settings: e => ({ heading: e.heading, icon: 'none', icon_name: e.custom_icon ? '' : e.icon,
      icon_filled: e.filled_icon, icon_image: e.custom_icon, content: e.content, page: e.page, title_size: { small: 'sm', medium: 'md', large: 'lg' }[e.heading_size],
      toggle_icon: e.collapse_icon === 'plus' ? 'plus' : 'caret', top_border: e.display_top_border, open: e.open, ...mg(e) }) },
    image: { to: 'image', settings: e => ({ image: e.image, width: e.width || 10, full_mobile: e.Full_mobile_width, align: AL[e.alignment], radius: e.border_radius, ...mg(e) }) },
    emoji_benefits: { to: 'benefits', settings: e => ({ benefits: e.benefits, ...mg(e) }) },
    // "Texto con íconos" de Shrine: las medidas van en em según la letra (medido en Limbex): filas a separación/5,
    // columnas a separación/2, relleno separación/7 (el doble a los costados), redondeo/100. Acá en px con la letra de mobile.
    text: { to: 'text_icons', settings: e => {
      const f = e.mobile_text_size;
      const ti = { ti_size_m: e.mobile_text_size, ti_size_d: e.desktop_text_size, ti_align: e.alignment, ti_color: e.text_color, ti_icon_scale: e.icon_scale,
        ti_icon_color: e.icon_color, ti_width: e.width === 'fit-content' ? 'fit' : 'full', ti_stack: e.direction,
        ti_gap: Math.round(e.column_gap * f / (e.direction === 'horizontal' ? 2 : 5)), ti_bg: e.enable_bg, ti_bg_color: e.bg_color,
        ti_radius: Math.round(e.corner_radius / 100 * f), ti_pad_axes: true, ti_padding_y: Math.round(e.padding / 7 * f), ti_padding_x: Math.round(e.padding / 7 * f * 2),
        ti_border: e.border_size, ti_border_color: e.border_color, ...mg(e) };
      for (const i of [1, 2, 3]) Object.assign(ti, { [`ti_text_${i}`]: e[`text_${i}`], [`ti_icon_${i}`]: e[`text_${i}`] ? e[`icon_${i}`] : '',
        [`ti_filled_${i}`]: e[`filled_icon_${i}`], [`ti_image_${i}`]: e[`custom_icon_${i}`] });
      return ti;
    }, note: e => e.mobile_text_size !== e.desktop_text_size ? `texto con íconos: separación y relleno calculados con la letra de mobile (${e.mobile_text_size}px); en desktop Shrine los agrandaba con la letra (${e.desktop_text_size}px)` : null },
    sticky_atc: { to: 'sticky_bar', settings: e => ({
      action: { add_to_cart: 'add_to_cart', 'scroll_#ProductInfo-id': 'scroll_info', 'scroll_#variant-selects-id': 'scroll_variants', 'scroll_#quantity-breaks-id': 'scroll_offers', 'scroll_.pricing-table': 'scroll_plans' }[e.function],
      show_when: e.display_when === 'always' ? 'always' : 'after_button', button_label: e.button_label, custom_button: e.enable_custom_btn_color,
      button_color: e.custom_btn_color, color_scheme: scheme(e.color_scheme), star_color: e.star_color, stars_text: e.stars_label,
      variant_mode: e.picker_type === 'separate' ? 'per_option' : 'combined',
      d_image: e.desktop_show_image, d_title: e.desktop_show_title, d_stars: e.desktop_rating_stars, d_price: e.desktop_show_price, d_badge: e.desktop_show_sale_badge,
      d_variants: e.desktop_variant_picker, d_full_button: e.desktop_full_button_width, d_price_in_button: e.desktop_show_price_in_button, d_transparent: e.desktop_transparent_bg,
      m_image: e.mobile_show_image, m_title: e.mobile_show_title, m_stars: e.mobile_rating_stars, m_price: e.mobile_show_price, m_badge: e.mobile_show_sale_badge,
      m_variants: e.mobile_variant_picker, m_full_button: e.mobile_full_button_width, m_stack: e.mobile_full_button_width, // en Shrine el botón a todo el ancho en mobile va en su propia fila, abajo
      m_price_in_button: e.mobile_show_price_in_button, m_transparent: e.mobile_transparent_bg }) },
    reviews: { to: 'reviews', settings: e => {
      const r = { rv_color_scheme: scheme(e.color_scheme), rv_custom_bg: e.show_custom_bg, rv_bg: e.custom_bg_color, rv_radius: e.corner_radius, rv_border: e.border_width,
        rv_border_color: e.border_color, rv_avatar_align: e.avatar_alignment, rv_avatar_radius: e.avatar_corner_radius, rv_star_color: e.star_color,
        rv_star_offset: e.stars_translate, rv_check_bg: e.checkmark_color, rv_check_color: e.checkmark_icon_color,
        car_type: e.slider_type === 'slide' ? 'classic' : e.slider_type, car_autoplay: e.autoplay, car_speed: e.autoplay_speed,
        show_arrows: e.display_arrows, show_dots: e.display_dots, ...mg(e) };
      for (const i of [1, 2, 3]) Object.assign(r, { [`author_${i}`]: tok(e[`author_${i}`]), [`photo_${i}`]: e[`image_${i}`], [`text_${i}`]: e[`text_${i}`] });
      return r;
    } },
  },
};
