// Traductores de las secciones propias de Gero (athlex-*, ct-*, gps-*) a los widgets de Gadsden que las
// generalizaron (LANDINGS-MAPA.md, V1-MATRIZ.md c.2). Se configura el equivalente; el código propio no se copia.
const { fs, path, ROOT } = require('./lib');
const { TR } = require('./sections');
const { scheme, SCHEME, hSize, tok, colorScheme, carousel, common, heading } = require('./translate');

// Texto enriquecido de Shopify: sólo p, h1-h6, ul/ol/li, strong/em/b/i/u, a, br, span. Lo demás se pasa a eso.
const ENT = { laquo: '«', raquo: '»', hellip: '…', nbsp: ' ', mdash: '—', ndash: '–', quot: '"', amp: '&' };
function rte(html) {
  return html.replace(/&(\w+);/g, (m, n) => ENT[n] ?? m)
    .replace(/<div class="ax-dest">([\s\S]*?)<\/div>/g, '<p><strong>$1</strong></p>')
    .replace(/<p class="ax-voces-tit">([\s\S]*?)<\/p>/g, '<p><strong>$1</strong></p>')
    .replace(/<blockquote>([\s\S]*?)<cite>([\s\S]*?)<\/cite><\/blockquote>/g, '<p><em>$1</em> — $2</p>')
    .replace(/<p class="ax-legal">([\s\S]*?)<\/p>/g, '<p>$1</p>').replace(/<p class="[^"]*">/g, '<p>')
    .replace(/<\/?div[^>]*>/g, '').replace(/\s*\n\s*/g, '').trim();
}
const para = s => (s && !/^\s*</.test(s) ? `<p>${String(s).replace(/\n+/g, '</p><p>')}</p>` : s);
const product = h => h || undefined;

// ---------- ATHLEX · Nota (L12, gad-article) ----------
TR['athlex-nota'] = {
  to: 'gad-article',
  settings: e => ({ ribbon: e.cinta, kicker: e.eyebrow, heading: e.titulo, dek: e.bajada, author: e.autor, meta: e.dato, legal: para(e.legal),
    bar_on: e.barra, bar_title: e.barra_titulo, bar_button: e.barra_boton, bar_link: `/products/${e.handle}${e.utm || ''}`,
    // Piel "portal" de Shrine -> estilo Diario de Gadsden 1.1.0 (la de papel queda con la combinación); chips de temas al pie.
    look: e.estilo === 'portal' ? 'news' : 'scheme', topics_title: e.temas ? e.temas_titulo : '', topics: e.temas || '' }),
  blocks: {
    subtitulo: { to: 'subtitle', settings: e => ({ text: e.texto }) },
    parrafo: { to: 'paragraph', settings: e => ({ text: e.texto }) },
    destacado: { to: 'highlight', settings: e => ({ text: e.texto }) },
    imagen: { to: 'image', settings: e => ({ image: e.imagen, caption: e.pie }), ignore: ['alt'],
      note: e => e.alt ? `texto alternativo "${e.alt}": en Gadsden sale del archivo (Contenido > Archivos)` : null },
    firma: { to: 'signature', settings: e => ({ name: e.nombre, role: e.rol }) },
    test: { to: 'quiz_bridge', settings: e => ({ title: e.titulo, text: e.texto, label: e.boton, link: e.url }) },
    versus: { to: 'versus', settings: e => ({ title: e.titulo, col_a: e.col_a, steps_a: e.pasos_a, col_b: e.col_b, steps_b: e.pasos_b, footer: e.pie }) },
    ciclo: { to: 'cycle', settings: e => ({ title: e.titulo, step_1: e.n1, step_2: e.n2, step_3: e.n3, step_4: e.n4, footer: e.pie }) },
    // El título del video va como párrafo en negrita antes del video (como subtítulo entraría en el índice).
    video: { to: 'video', settings: (e, sec, se, bid) => [
      ...(e.titulo ? [{ id: bid + '-titulo', type: 'paragraph', settings: { text: `<p><strong>${e.titulo}</strong></p>` } }] : []),
      { id: bid, type: 'video', settings: { video: e.video, autoplay: true, caption: e.pie } }] },
    tira: { to: 'strip', settings: e => ({ image_1: e.img_1, caption_1: e.pie_1, image_2: e.img_2, caption_2: e.pie_2, image_3: e.img_3, caption_3: e.pie_3 }) },
    indice: { to: 'index', settings: e => ({ title: e.titulo }) },
    citas: { to: 'quotes', settings: e => ({ title: e.titulo, quote_1: e.cita_1, source_1: e.fuente_1, quote_2: e.cita_2, source_2: e.cita_2 ? e.fuente_2 : '', footer: e.pie }), ignore: ['fuente_2'] },
    cta: { to: 'button', settings: (e, sec, se, bid) => [
      ...(e.linea ? [{ id: bid + '-linea', type: 'paragraph', settings: { text: `<p>${e.linea}</p>` } }] : []),
      { id: bid, type: 'button', settings: { label: e.boton, link: `/products/${se.handle}${se.utm || ''}` } }] },
    caja: { to: 'product_box', settings: (e, sec, se) => ({ product: product(se.handle), title: e.titulo, text: `<p>${e.sub}</p>${e.pie ? `<p>${e.pie}</p>` : ''}`, button_label: e.boton }),
      note: () => 'caja de producto: en Shrine el botón llevaba a la ficha con la marca de la nota; en Gadsden agrega al carrito' },
    // "día" y "semana" quedaron afuera de L12 (decisión de Gero, 19-oct): ver GAPS-GADSDEN.md.
    dia: null, semana: null,
  },
};

// ---------- ATHLEX · Test (L11, gad-quiz) ----------
// Las preguntas y los resultados estaban escritos en el Liquid de la sección: salen de tools/data/athlex-test.json.
TR['athlex-test'] = {
  to: 'gad-quiz',
  settings: e => ({ heading: e.titulo, text: `<p>${e.bajada}</p>`, start_label: e.boton_empezar, count_label: 'Pregunta {n} de {total}', back_label: 'Volver',
    restart_label: 'Volver a empezar el test', intro_note: '', option_two_lines: true, summary_title: 'Lo que contaste' }),
  ignore: Object.keys({ absolucion: 1, voces_pie: 1, handle: 1, caja_titulo: 1, caja_sub: 1, bene_1: 1, bene_2: 1, bene_3: 1, caja_boton: 1, caja_pie: 1, legal: 1 }),
  extra: (e, out, report, where) => {
    const d = JSON.parse(fs.readFileSync(path.join(ROOT, 'tools/data/athlex-test.json'), 'utf8'));
    const fill = h => h.replace(/\{\{\s*section\.settings\.(\w+)\s*\}\}/g, (m, k) => e[k] ?? '');
    out.settings.caption = d.intro.eyebrow;
    out.settings.text += `<ul>${d.intro.bullets.map(b => `<li>${b}</li>`).join('')}</ul>`;
    const cheer = d.questions.find(q => q.cheer); if (cheer) out.settings.cheer = cheer.cheer;
    // Lógica de DOMU: corte si en la 8 marca cualquier cosa menos "ninguna"; "vuelve" si pasa seguido (7) o volvió (6);
    // "instalado" si no mejora (4: poco/nada); si no, "humedad". Con puntos y los resultados en ese orden da lo mismo.
    const TAG = { 7: v => v === 'ninguna' ? '' : '!', 6: v => v === 'seguido' ? 'vuelve' : '', 5: v => v === 'volvio' ? 'vuelve' : '', 3: v => (v === 'nada' || v === 'poco') ? 'instalado' : '' };
    out.blocks = {}; out.block_order = [];
    for (const q of d.questions) {
      const id = `pregunta-${q.n + 1}`;
      out.blocks[id] = { type: 'question', settings: { question: q.question, help: q.help,
        options: q.options.map(o => { const t = TAG[q.n] ? TAG[q.n](o.v) : ''; return `${o.title} — ${o.desc}${t ? ' | ' + t : ''}`; }).join('\n') } };
      out.block_order.push(id);
    }
    const res = Object.fromEntries(d.results.map(r => [r.id, r]));
    const legal = `<p>${e.legal}</p>`;
    const cut = res.medico;
    out.settings.cut_title = cut.title;
    out.settings.cut_text = `<p><strong>${cut.chapa}</strong></p>` + rte(fill(cut.body)) + legal;
    const caja = `<p><strong>${e.caja_titulo}</strong></p><p>${e.caja_sub}</p>`;
    for (const [pid, profile] of [['vuelve', 'vuelve'], ['instalado', 'instalado'], ['humedad', '']]) {
      const r = res[pid];
      out.blocks[`resultado-${pid}`] = { type: 'result', settings: { profile, kicker: r.chapa, title: r.title,
        text: rte(fill(r.body)) + caja + `<p>${e.caja_pie}</p>` + legal, benefits: [e.bene_1, e.bene_2, e.bene_3].filter(Boolean).join('\n'),
        product: product(e.handle), button_label: e.caja_boton } };
      out.block_order.push(`resultado-${pid}`);
    }
    report.notes.push(`${where}: preguntas y resultados pasados a bloques desde la sección propia (tools/data/athlex-test.json); opciones "título — descripción" en dos líneas; volanta y "Lo que contaste" con los ajustes de Gadsden 1.1.0 (el resumen muestra la pregunta arriba de cada respuesta; Shrine listaba sólo las respuestas)`);
  },
};



// ---------- GPS (secciones propias de la landing del GF-07) ----------
// Colores fijos del CSS de Gero (blanco / gris claro #F5F7FA, verde #2E7D32, azul #0B1F3A) -> colores propios de Gadsden.
const NAVY = '#0B1F3A', GREEN = '#2E7D32';
const emStrong = s => (s || '').replace(/<em>/g, '<strong>').replace(/<\/em>/g, '</strong>');
const ccWhite = (bg = '#FFFFFF') => ({ color_scheme: 'scheme-1', custom_colors: true, cc_bg: bg, cc_text: NAVY, cc_accent: GREEN, cc_btn_bg: GREEN, cc_btn_text: '#FFFFFF', cc_outline: GREEN });

// gps-steps -> Íconos con contenido (S21): el número de cada paso como ícono counter_N; la nota sin lugar propio.
TR['gps-steps'] = {
  to: 'gad-icon-content',
  settings: (e, sec) => ({ caption: e.eyebrow, heading: emStrong(e.heading), heading_size: 'h1',
    text: `<p>${e.lead}</p>${e.show_note && e.note ? `<p>${e.note}</p>` : ''}`, layout: 'grid',
    columns_d: Math.min(4, (sec.block_order || []).filter(b => !sec.blocks[b].disabled).length || 3), columns_m: '1', align: 'center',
    icon_size: 66, icon_color: 'accent', ...ccWhite(e.bg === 'light' ? '#FFFFFF' : '#F5F7FA'), padding_top: 80, padding_bottom: 80 }),
  note: () => 'la nota va como segundo párrafo del texto, arriba de los pasos (en Shrine iba abajo, en caja con radar animado)',
  ignore: ['bg', 'note', 'show_note', 'lead'],
  // La señal animada del número va como pulso del ícono de ese paso (Gadsden 1.1.0).
  blocks: { step: { to: 'item', settings: (e, sec, se, bid) => {
    const n = e.num || String((sec.block_order || []).filter(b => !sec.blocks[b].disabled).indexOf(bid) + 1);
    return { icon: /^\d$/.test(n) ? `counter_${n}` : 'radio_button_checked', icon_filled: false, pulse: !!e.signal, title: e.title, text: e.text ? `<p>${e.text}</p>` : '' };
  } } },
};

// gps-comparativa -> Tabla comparativa (S06) con los colores de la de Gero.
TR['gps-comparativa'] = {
  to: 'gad-compare-table',
  settings: e => ({ caption: e.eyebrow, heading: e.heading, heading_size: 'h1', text: '', align: 'center', m_align: 'center', ...ccWhite(), position: 'top',
    feature_label: e.col_feature, partial_color: '#8AA2B1',
    table_style: 'classic', radius: 22, competitors: 1, own_label: e.col_us, c1_label: e.col_other,
    check_style: 'filled', check_color: '#FFFFFF', check_bg: GREEN, cross_style: 'filled', cross_color: '#ADB8C0', cross_bg: '#E9EEF2',
    hl_style: 'custom', hl_bg: '#E9F5EA', hl_text: NAVY, reg_style: 'custom', reg_bg: '#FFFFFF', reg_text: NAVY, reg_zebra: 4, padding_top: 80, padding_bottom: 80 }),
  blocks: { row: { to: 'row', settings: e => ({ benefit: e.feature, own: e.us !== 'no', own_partial: e.us === 'partial', c1: e.other !== 'no', c1_partial: e.other === 'partial' }) } },
};

// gps-marquee -> Cinta (S03) con texto gigante en contorno y relleno alternados.
TR['gps-marquee'] = {
  to: 'gad-ticker',
  settings: e => ({ speed: 1, direction: 'normal', pause_hover: false, gap_m: 60, gap_d: 60, color_scheme: 'scheme-1', custom_colors: true,
    cc_bg: '#FFFFFF', cc_text: '#D3E0D6', text_size_m: 54, text_size_d: 96, text_effect: 'outline_alt', uppercase: true, bold: true,
    padding_top_m: 26, padding_bottom_m: 4, padding_top_d: 26, padding_bottom_d: 4 }),
  note: e => `velocidad: Shrine ${e.speed} s por vuelta; Gadsden va de 1 a 5 (se usa 1, la más lenta). [VERIFICAR] el color del relleno (#EEF4EF en Shrine; en Gadsden sale del color del texto)`,
  extra: (e, out) => { out.blocks = { outline: { type: 'text', settings: { text: e.text_outline } }, fill: { type: 'text', settings: { text: e.text_fill } } }; out.block_order = ['outline', 'fill']; },
};

// gps-cta -> Texto enriquecido (E07) en caja a ancho de página, con los colores de la tarjeta de Gero.
TR['gps-cta'] = {
  to: 'rich-text',
  settings: e => ({ desktop_content_position: 'center', content_alignment: 'center', full_width: false, color_scheme: 'scheme-1', custom_colors: true,
    cc_bg: NAVY, cc_text: '#FFFFFF', cc_accent: GREEN, cc_btn_bg: '#FFFFFF', cc_btn_text: GREEN, cc_outline: '#FFFFFF', padding_top: 70, padding_bottom: 70 }),
  extra: (e, out) => {
    out.blocks = { heading: { type: 'heading', settings: { heading: e.heading, heading_size: 'h1' } },
      pill: { type: 'caption', settings: { caption: e.pill, text_style: 'subtitle', text_size: 'large' } },
      sub: { type: 'text', settings: { text: `<p>${e.sub}</p>` } },
      button: { type: 'button', settings: { button_label: e.btn_label, button_link: e.btn_link || '#' } } };
    out.block_order = ['heading', 'pill', 'sub', 'button'];
  },
  note: () => 'la píldora de oferta va como bajada (Gadsden no tiene píldora con borde en el texto enriquecido)',
};
module.exports = { rte, para, emStrong };
