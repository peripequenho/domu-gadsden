// ATHLEX: secciones propias de la landing del producto athlex -> widgets L01-L19 de Gadsden (LANDINGS-MAPA.md).
// Paletas del CSS de Gero: tinta #141210, papel #E6DFCE, papel-2 #D6CDB6, lima #93D920, lima honda #6BA512.
// Los títulos marcan con cursiva lo resaltado (lima): en Gadsden lo resaltado es la negrita.
// El look del original (etiquetas, marcador, bordes, cajas, franjas) sale de los ajustes de "look de landing" de
// Gadsden 1.1.0 (tandas 37–39): "Usá siempre el original" (Gero, 19-oct). Referencia: capturas/original/athlex-*.
const { TR } = require('./sections');
const { emStrong } = require('./sections_landings');

const MF = require('./data/athlex-metafields.json');
const TINTA = '#141210', PAPEL = '#E6DFCE', PAPEL2 = '#D6CDB6', LIMA = '#93D920', LIMA2 = '#6BA512';
const ax = bg => bg === TINTA
  ? { color_scheme: 'scheme-1', custom_colors: true, cc_bg: TINTA, cc_text: PAPEL, cc_accent: LIMA, cc_btn_bg: LIMA, cc_btn_text: TINTA, cc_outline: LIMA }
  : { color_scheme: 'scheme-1', custom_colors: true, cc_bg: bg, cc_text: TINTA, cc_accent: LIMA2, cc_btn_bg: TINTA, cc_btn_text: PAPEL, cc_outline: TINTA };
// Volanta: en las oscuras, texto lima; en las claras, la etiqueta tinta del estilo de página. Resaltado: lima (en las claras,
// marcador). Encabezados a la izquierda como en el original.
// En Shrine la negrita del título era sólo negrita y la cursiva el resaltado lima: se saca la negrita y la cursiva pasa a negrita.
const axTitle = t => emStrong((t || '').replace(/<\/?(strong|b)>/g, ''));
const axHead = (e, dark) => ({ caption: e.eyebrow, ...(dark ? { caption_color: LIMA } : {}), heading: axTitle(e.heading), heading_size: 'h0', heading_accent: LIMA });
const axLeft = { heading_align: 'left', heading_align_m: 'same' };
const axText = (...p) => p.filter(Boolean).map(x => `<p>${x}</p>`).join('');

TR['athlex-progreso'] = { to: 'gad-reading-progress', settings: () => ({ position: 'top', height: 4, color: LIMA }) };

// Skin: CSS que repintaba sólo esta plantilla (fondo papel, títulos Archivo Black inclinados, botón de compra lima) y
// los detalles de toda la landing (volanta en etiqueta, marcador, texto pleno, bordes de 2 px, esquinas rectas, trama, línea).
TR['athlex-skin'] = {
  to: 'gad-page-style',
  settings: () => ({ colors_on: true, bg: PAPEL, text: TINTA, button: TINTA, button_text: PAPEL,
    title_font_on: true, title_font: 'archivo_black_n4', title_case: 'uppercase', title_italic: false, title_skew: -9,
    atc_on: true, atc_bg: LIMA, atc_text: TINTA, atc_radius: 0, atc_skew: -9, atc_upper: true, bar_on: true, bar_bg: TINTA, bar_text: LIMA,
    body_font_on: true, body_font: 'barlow_semi_condensed_n4', badge_on: true, badge_bg: LIMA, badge_text: TINTA, badge_skew: -9, badge_upper: true,
    caption_style: 'tag', hl_style: 'marker', text_full: true, border_on: true, border_width: 2, border_opacity: 100, border_opacity_dark: 20,
    square: true, texture: 6, section_line: 3, page_width: 1200, title_zoom_m: 75 }),
  note: () => 'skin de ATHLEX → L19 con los detalles de las secciones de Gadsden 1.1.0; GAP el precio en dos columnas (afuera de la 1.1.0, decisión de Gero)',
};

TR['athlex-reviews-mini'] = {
  to: 'gad-ticker',
  settings: () => ({ speed: 1, direction: 'normal', pause_hover: true, gap_m: 16, gap_d: 24, ...ax(TINTA), text_size_m: 15, text_size_d: 16,
    uppercase: false, bold: false, review_width_m: 280, review_width_d: 340, padding_top_m: 16, padding_bottom_m: 16, padding_top_d: 20, padding_bottom_d: 20 }),
  note: e => `velocidad: Shrine ${e.velocidad} s por vuelta; Gadsden va de 1 a 5 (se usa 1)`,
  ignore: ['velocidad'],
  blocks: { destacado: { to: 'review', settings: e => ({
    author: `${e.autor}${e.fecha ? ' · ' + e.fecha : ''}${e.verificada ? ' {verificado}' : ''} {estrellas:${e.estrellas}}`,
    photo: e.foto, text: `<p>${e.texto}</p>`, rv_color_scheme: 'scheme-3', rv_custom_bg: true, rv_bg: '#0D0C0A', rv_radius: 0, rv_border: 0,
    rv_avatar_radius: 0, rv_lines: 1, rv_star_color: LIMA, rv_check_bg: LIMA, rv_check_color: TINTA }) } },
};

TR['athlex-faq'] = {
  to: 'collapsible-content',
  settings: e => ({ ...axHead(e), heading_alignment: 'left', layout: 'none', ...ax(PAPEL2), container_color_scheme: 'scheme-1',
    open_first_collapsible_row: e.open_first, title_size: 'md', toggle_icon: 'plus', top_border: true, footer: e.pie ? `<p>${e.pie}</p>` : '',
    row_style: 'box', box_border: 2, box_bg: PAPEL, open_bg: LIMA, open_text: TINTA, padding_top: 56, padding_bottom: 56 }),
  blocks: { qa: { to: 'collapsible_row', settings: e => ({ heading: e.q, icon: 'none', row_content: e.a }) } },
};

TR['athlex-dolor'] = {
  to: 'gad-reveal-cards',
  settings: e => ({ ...axHead(e, true), ...axLeft, text: axText(e.lead), columns_d: 2, button_label: e.boton_popup, dialog_video: e.popup_video, dialog_image: e.popup_imagen,
    dialog_scheme: 'scheme-1', phrase_font: 'heading', phrase_size_d: 22, phrase_size_m: 20, phrase_position: 'center', chev_style: 'plain',
    ...ax(TINTA), padding_top: 64, padding_bottom: 32 }),
  ignore: ['ciencia_eyebrow', 'ciencia_titulo', 'ciencia_lead', 'ciencia_video', 'ciencia_imagen'],
  blocks: { punal: { to: 'card', settings: e => ({ image: e.imagen, phrase: e.frase, intro: e.intro, body: e.cuerpo }) }, dato: null },
  // Los "datos científicos" van en una segunda sección: Íconos con contenido (S21), con el título de la ciencia: la animación al
  // costado, los datos en cajas numeradas y los dos de "salida" (seco, frío) destacados en lima, como en el original.
  after: (e, sec) => {
    const ICON = { hongo: 'microbiology', gota: 'water_drop', vuelve: 'autorenew', extiende: 'open_in_full', seco: 'wb_sunny', frio: 'ac_unit' };
    const blocks = {}, block_order = [];
    if (e.ciencia_video || e.ciencia_imagen) {
      blocks['ciencia-animacion'] = { type: 'media', settings: { video: e.ciencia_video || '', image: e.ciencia_imagen || '', autoplay: true, ratio: '16-9', width: 100, radius: 0, bleed_m: true } };
      block_order.push('ciencia-animacion');
    }
    for (const bid of sec.block_order) {
      const b = sec.blocks[bid];
      if (b.disabled || b.type !== 'dato') continue;
      blocks[bid] = { type: 'item', settings: { icon: ICON[b.settings.icono] || 'science', icon_filled: false, title: b.settings.titulo, text: `<p>${b.settings.texto}</p>`,
        featured: ['seco', 'frio'].includes(b.settings.icono) } };
      block_order.push(bid);
    }
    return [{ id: 'dolor-ciencia', type: 'gad-icon-content', settings: { caption: e.ciencia_eyebrow, caption_color: LIMA, heading: axTitle(e.ciencia_titulo), heading_size: 'h0',
      heading_accent: LIMA, ...axLeft, text: axText(e.ciencia_lead), layout: 'grid', media_side: true, item_style: 'box', columns_d: 2, columns_m: '2', align: 'center',
      icon_size: 40, icon_color: 'accent', ...ax(TINTA), padding_top: 32, padding_bottom: 64 }, blocks, block_order }];
  },
};

TR['athlex-mecanismo'] = {
  to: 'gad-stamps',
  settings: e => ({ video: e.video, image: e.imagen, media_height: 50, media_width: 'page', ...axHead(e, true), ...axLeft, text: axText(e.lead), angle: -3, delay: 350,
    closing: e.remate, stamp_style: 'box', word_color: 'alternate', last_marker: true, closing_style: 'band', ...ax(TINTA), padding_top: 0, padding_bottom: 56 }),
  blocks: { sello: { to: 'stamp', settings: e => ({ word: e.palabra, text: e.texto }) } },
};

TR['athlex-uso'] = {
  to: 'gad-timed-steps',
  settings: e => ({ ...axHead(e), heading_align: 'center', heading_align_m: 'left', text: axText(e.lead), timer_total: Number(e.crono_total) || 0, timer_label: e.crono_label,
    timer_style: 'tag', time_style: 'plain', m_peek: 45, panel_scheme: 'scheme-1', panel_custom: true, panel_bg: LIMA, panel_text: TINTA,
    note: e.nota ? `<p>${e.nota}</p>` : '', note_icon: e.nota ? 'format_color_reset' : '', ...ax(PAPEL), padding_top: 56, padding_bottom: 56 }),
  blocks: { paso: { to: 'step', settings: e => ({ image: e.image, icon: { agitar: 'vibration', spray: 'sanitizer', secar: 'air' }[e.icon], title: e.title,
    time: e.tiempo, text: e.text }), ignore: ['num'] } },
};

TR['athlex-ingredientes'] = {
  to: 'gad-posters',
  settings: e => ({ ...axHead(e, true), ...axLeft, text: axText(e.lead), ratio: '3 / 4', height_d: 440, m_peek: 45, columns_d: 5, first_wide: true, title_accent: true, chips_style: 'rows',
    overlay: 20, text_position: 'bottom', list_title: e.lista_titulo, list_style: 'box',
    list_content: `<p>${(e.lista || '').split('\n').filter(Boolean).join('<br>')}</p>${e.lista_nota ? `<p><em>${e.lista_nota}</em></p>` : ''}`,
    seal_text: e.sello, seal_value: e.sello_dato, seal_style: 'band', ...ax(TINTA), padding_top: 56, padding_bottom: 56 }),
  blocks: { equipo: { to: 'poster', settings: e => ({ image: e.imagen, kicker: '', title: e.palabra, text: e.linea,
    chips: (e.ingredientes || '').split('\n').map(l => l.replace('|', ' | ')).join('\n') }) } },
};

TR['athlex-proceso'] = {
  to: 'gad-chapters',
  settings: e => ({ ...axHead(e), ...axLeft, text: axText(e.lead, e.pie), ratio: '4 / 5', ratio_d: '7 / 6', board_layout: 'side', tab_style: 'numbered', stage_label: 'Etapa', bleed_m: true,
    seconds: 5, ...ax(PAPEL2), padding_top: 56, padding_bottom: 56 }),
  blocks: { etapa: { to: 'chapter', settings: e => ({ video: e.video, image: e.imagen, number: e.num, title: e.title, text: e.text }) } },
};

TR['athlex-reviews'] = {
  to: 'gad-reviews-wall',
  settings: e => ({ ...axHead(e), ...axLeft, text: '', average: e.mostrar_resumen ? e.promedio : '', count_text: e.mostrar_resumen ? e.cuantas : '', marquee: true,
    star_color: LIMA2, columns_d: 3, batch: e.lote, photo_ratio: '3 / 4', more_style: 'solid', more_label: 'Ver más reseñas ({cantidad})', card_scheme: 'scheme-1',
    featured_scheme: 'scheme-1', featured_custom: true, featured_bg: LIMA, featured_text: TINTA, featured_title_font: true, ...ax(PAPEL), padding_top: 56, padding_bottom: 56 }),
  blocks: { resena: { to: 'review', settings: e => ({ image: e.image, stars: e.estrellas, title: e.title, text: `<p>${e.text}</p>`, author: e.autor, date: e.fecha,
    verified: e.verificada, featured: e.destacada }) } },
};

TR['athlex-legal'] = {
  to: 'gad-legal',
  settings: e => ({ notice: `<p>${e.aviso}</p>`, notice_icon: 'warning', notice_icon_line: true,
    data_line: [e.categoria, e.neto ? `Cont. neto ${e.neto}` : '', e.origen].filter(Boolean).join(' · '),
    details_label: e.titulo_detalle, open: false, label_accent: true, line_upper: true, line_below: true, ...ax(TINTA), padding_top: 24, padding_bottom: 24 }),
  note: () => 'contenido neto: Shrine leía primero el metacampo athlex.contenido_neto (hoy "120 ml", igual que el ajuste). INCI, titular y ANMAT salen de metacampos sin definición: se cargan como texto con el valor del 19-oct (si cambian, crear la definición y conectarlos)',
  extra: (e, out) => {
    const row = (title, text) => ({ type: 'row', settings: { title, text, required: true } });
    out.blocks = {
      advertencias: row('Advertencias', `<p>${e.advertencias}</p>`),
      'modo-uso': row('Modo de uso', `<p>${e.modo_uso}</p>`),
      // Los metacampos athlex.* no tienen definición en la tienda (Shrine los leía desde el Liquid): Gadsden no los puede
      // conectar como fuente dinámica, así que va el valor que tenían el 19-oct (tools/data/athlex-metafields.json).
      ingredientes: row('Ingredientes', `<p>${MF.inci}</p>`),
      titular: row('Titular / Responsable', `<p>${MF.titular}</p>`),
      anmat: row('Inscripción ANMAT', `<p>${MF.anmat_legajo}</p>`),
    };
    out.block_order = Object.keys(out.blocks);
  },
};
