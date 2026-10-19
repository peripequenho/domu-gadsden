// CarboTiras: secciones propias de la landing carbotiras-nativo -> widgets de Gadsden (LANDINGS-MAPA.md).
// Las imágenes y videos que Shrine tomaba de assets/ct-* cuando el ajuste estaba vacío van desde Archivos
// (subidos con el mismo nombre; las portadas del coverflow que ya existían como carbotiras-ugc-* se reusan).
const { fs, path, ROOT } = require('./lib');
const { TR } = require('./sections');

const IMG = n => `shopify://shop_images/${n}`;
const VID = n => `shopify://files/videos/${n}`;
const cc = e => ({ color_scheme: 'scheme-1', custom_colors: true, cc_bg: e.background, cc_text: e.text_color, cc_accent: e.text_color,
  cc_btn_bg: e.text_color, cc_btn_text: e.background, cc_outline: e.text_color });
const OFERTA = '#ct-oferta'; // los botones de Shrine bajaban al bloque de compra (ancla del custom liquid de Kaching)
const blocksOf = sec => (sec.block_order || []).filter(b => !sec.blocks[b].disabled);
const nth = (sec, bid) => blocksOf(sec).indexOf(bid) + 1;

TR['ct-hero'] = {
  to: 'gad-rotating-hero',
  settings: e => ({ photo_1: e.antes_image || IMG('ct-hero-antes.jpg'), label_1: e.antes_label, photo_2: e.despues_image || IMG('ct-hero-despues.jpg'),
    label_2: e.despues_label, photo_height: 280, bg_image: e.bg_image || IMG('ct-hero-bg.jpg'), parallax: Math.min(40, e.parallax_speed), caption: e.caption,
    // Con el titular vacío, Shrine usaba la promesa como título (h1 al tamaño del titular, con la parte destacada
    // resaltada como marcador): en Gadsden 1.1.0 es "Tamaño de la promesa: como el título". Con titular cargado,
    // la promesa va debajo como en Shrine.
    promise: [e.promise, e.promise_highlight].filter(Boolean).join(' '), promise_mark: e.promise_highlight, promise_color: e.promise_color,
    ...(e.heading || e.words
      ? { heading_before: e.heading, words: e.words, word_color: e.word_color, promise_size: 'text' }
      : { heading_before: '', words: '', promise_size: 'heading' }),
    heading_after: '', heading_size: e.heading_size, speed: e.rotate_speed / 10,
    pill_1: e.pill_1, pill_1_icon: e.pill_1_icon, pill_2: e.pill_2, pill_2_icon: e.pill_2_icon, pill_3: e.pill_3, pill_3_icon: e.pill_3_icon,
    button_label: e.button_label, button_link: OFERTA, ...cc(e), padding_top: e.padding_top, padding_bottom: e.padding_bottom }),
  ignore: ['fotos_width', 'fotos_height', 'bg_offset', 'bg_ratio', 'gap_height', 'caption_size', 'note', 'word_color'],
  note: e => `alto de las fotos: Shrine ${e.fotos_height}vh al ${e.fotos_width} % del ancho; Gadsden en px (280); espacio fotos-texto ${e.gap_height}px y fondo corrido ${e.bg_offset}px sin ajuste; texto de arriba ${e.caption_size}px`,
};

TR['ct-pasos'] = {
  to: 'gad-auto-steps',
  settings: e => ({ heading: e.heading, heading_size: e.heading_size, text: e.caption ? `<p>${e.caption}</p>` : '', seconds: e.interval, accent: e.accent,
    button_label: e.button_label, button_link: OFERTA, ...cc(e), padding_top: e.padding_top, padding_bottom: e.padding_bottom }),
  ignore: ['image_size', 'section_height', 'highlight', 'caption'],
  note: e => `el texto chico de arriba ("${e.caption}") va como texto; tamaño de imagen ${e.image_size}px y color de resaltado ${e.highlight} sin ajuste propio`,
  blocks: { paso: { to: 'step', settings: (e, sec, se, bid) => ({ image: e.image || IMG(`ct-paso-${nth(sec, bid)}.jpg`), title: e.title, tag: e.tag, text: e.text }) } },
};

TR['ct-resenas'] = {
  to: 'gad-review-rows',
  settings: e => ({ heading: '', rating: e.rating, subtitle: e.subtitle, max_avatars: e.max_avatars, more_label: e.more_label, avatar_size: e.avatar_size,
    duration: e.speed, star_color: '#F5B301', card_scheme: 'scheme-1', ...cc(e), padding_top: e.padding_top, padding_bottom: e.padding_bottom }),
  ignore: ['mockup_faces'],
  note: e => e.mockup_faces ? 'avatares: Shrine usaba "caras de prueba" (ct-cara-N.jpg, fotos de stock que no son clientes): se cargan igual como foto de cada reseña. Para revisar' : null,
  blocks: { resena: { to: 'review', settings: (e, sec, se, bid) => ({ name: e.name, place: e.place, stars: e.stars, text: `<p>${e.text}</p>`,
    photo: e.photo || (se.mockup_faces && nth(sec, bid) <= 8 ? IMG(`ct-cara-${nth(sec, bid)}.jpg`) : undefined) }) } },
};

TR['ct-beneficios'] = {
  to: 'gad-cropped-cards',
  settings: e => ({ heading: e.heading, heading_size: e.heading_size, columns_d: 4, card_height: e.card_height, image_size: 70, card_scheme: 'scheme-1',
    ...cc(e), padding_top: e.padding_top, padding_bottom: e.padding_bottom }),
  ignore: ['image_size'],
  note: e => `tamaño de imagen ${e.image_size}px (Gadsden en %: 70) y "bajar la imagen" por tarjeta sin ajuste`,
  blocks: { beneficio: { to: 'card', settings: (e, sec, se, bid) => ({ title: e.title, text: e.text, image: e.image || IMG(`ct-ben-${nth(sec, bid)}.jpg`) }), ignore: ['image_down'] } },
};

TR['ct-comparar'] = {
  to: 'gad-before-after',
  settings: e => ({ heading: e.heading, heading_size: e.heading_size, text: e.note ? `<p>${e.note}</p>` : '', align: 'center', m_align: 'center', ...cc(e),
    before_image: e.antes_image || IMG('ct-comparar-antes.jpg'), after_image: e.despues_image || IMG('ct-comparar-despues.jpg'),
    before_label: e.labels ? e.before_label : '', after_label: e.labels ? e.after_label : '', labels_style: 'pill', elastic: true, max_width: e.max_width,
    padding_top: e.padding_top, padding_bottom: e.padding_bottom }),
  ignore: ['ratio', 'corner', 'labels', 'note'],
  note: e => `proporción ${e.ratio} y redondeo ${e.corner}px sin ajuste propio (Gadsden: el de los medios)`,
};

// Portadas de los videos: las que ya estaban en Archivos como carbotiras-ugc-* (mismo contenido, tools/assets_match.js).
const covers = Object.fromEntries(fs.readFileSync(path.join(ROOT, 'tmp/ct_cover_match.txt'), 'utf8').trim().split('\n')
  .map(l => l.split('\t')).filter(([, , d]) => +d <= 200).map(([a, b]) => [a, b]));
TR['ct-coverflow'] = {
  to: 'gad-coverflow',
  settings: e => ({ heading: e.heading, heading_size: e.heading_size, card_width: e.card_width, play_range: e.play_range, ...cc(e),
    padding_top: e.padding_top, padding_bottom: e.padding_bottom }),
  blocks: { video: { to: 'video', settings: (e, sec, se, bid) => {
    const n = nth(sec, bid);
    return { video: e.video || VID(`ct-cover-${n}.mp4`), poster: e.poster || IMG(covers[`ct-cover-${n}.jpg`] || `ct-cover-${n}.jpg`), stars: e.stars, quote: e.quote, name: e.name };
  } } },
};

TR['ct-garantia'] = {
  to: 'gad-guarantee',
  settings: e => ({ days: e.days, caption: e.caption, heading: e.heading, heading_size: 'h1', chip: e.chip, text: `<p>${e.text}</p>`,
    point_1: e.point_1, point_1_icon: { chat: 'chat', tienda: 'storefront', escudo: 'shield' }[e.point_1_icon] || e.point_1_icon,
    point_2: e.point_2, point_2_icon: { chat: 'chat', tienda: 'storefront', escudo: 'shield' }[e.point_2_icon] || e.point_2_icon,
    point_3: e.point_3, point_3_icon: { chat: 'chat', tienda: 'storefront', escudo: 'shield' }[e.point_3_icon] || e.point_3_icon,
    button_label: e.button_label, button_link: OFERTA, ring_size: e.ring_size, ring_offset: e.ring_offset, ring_color: e.ring_primary, ring_track: e.ring_secondary,
    ...cc(e), padding_top: e.padding_top, padding_bottom: e.padding_bottom }),
};

TR['ct-cierre'] = {
  to: 'gad-closing',
  settings: e => ({ image: e.image || IMG('ct-cierre-producto.webp'), caption: e.caption, heading: [e.heading, e.heading_mark].filter(Boolean).join(' '),
    mark: e.heading_mark, heading_size: e.heading_size, mark_from: e.stain_color, mark_to: e.mark_color, text: `<p>${e.text}</p>`,
    scale_from: e.show_scale ? e.scale_from : '', scale_to: e.show_scale ? e.scale_to : '', item_1: e.item_1, item_2: e.item_2, item_3: e.item_3,
    button_label: e.button_label, button_link: OFERTA, ...cc(e), padding_top: e.padding_top, padding_bottom: e.padding_bottom }),
  note: e => `"Pie de la imagen" de Gadsden = texto chico de Shrine ("${e.caption}"): [VERIFICAR] ubicación; mancha ${e.stain_color} → color inicial del resaltador`,
};
