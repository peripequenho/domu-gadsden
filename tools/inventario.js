// Arma INVENTARIO.md con lo que sacan usage.js, custom_liquid.js, suffixes.js, files_pull.js y assets_match.js (tmp/).
// Uso: node tools/usage.js > tmp/usage.txt && node tools/custom_liquid.js > tmp/custom_liquid.md && node tools/inventario.js
const { fs, path, ROOT, REF } = require('./lib');
const T = f => fs.readFileSync(path.join(ROOT, 'tmp', f), 'utf8');
const suf = JSON.parse(T('suffixes.json'));
const files = JSON.parse(T('files.json'));
const names = new Set(files.map(f => f.name));
const own = fs.readdirSync(path.join(REF, 'assets')).filter(x => /^(ct|bank)-/.test(x));
const match = Object.fromEntries(T('ct_cover_match.txt').trim().split('\n').map(l => l.split('\t')).filter(([, , e]) => +e <= 200).map(([a, b]) => [a, b]));
const grp = (list, key) => { const by = {}; list.forEach(x => (by[x[key] || '(defecto)'] = by[x[key] || '(defecto)'] || []).push(x)); return by; };
const L = [];
L.push('# Inventario — DOMU en Shrine (copia del 15-oct-2026)', '',
  'Fuente: `D:\\_refs\\shrine-domu-og-2026-10-15\\` (sólo JSON y `{% schema %}`), Admin API de mem1a9-ev y storefront (19-oct-2026). Detalle de ajustes por sección y bloque en [INVENTARIO-AJUSTES.md](INVENTARIO-AJUSTES.md).', '');
L.push('## Plantillas', '', '29 plantillas + 7 de clientes + `gift_card.liquid`, más `sections/header-group.json`, `footer-group.json` y sus variantes por mercado (`*.context.international.json` y `*.context.04d13b88-4025-4eda-aa29-07fdfbea8470.json`). No hay `templates/product.json`: queda la de Gadsden.', '');
L.push('### Quién usa cada plantilla', '');
L.push('**Productos** (Admin API, 48):', '');
for (const [s, l] of Object.entries(grp(suf.products, 'templateSuffix'))) L.push(`- \`product.${s}\` ×${l.length}: ${l.slice(0, 7).map(p => p.handle + (p.status !== 'ACTIVE' ? ` [${p.status}]` : '')).join(', ')}${l.length > 7 ? ', … (los `wa-*` del catálogo de WhatsApp)' : ''}`);
L.push('- `product.gps-landing`: ningún producto la tiene como sufijo; se abre como vista alternativa: `/products/mini-gps-localizador-gf-07-sin-abono?view=gps-landing`.',
  '- `product.prod_test_kaching`: ningún producto la tiene asignada hoy.', '');
L.push('**Colecciones** (Admin API, 26):', '');
for (const [s, l] of Object.entries(grp(suf.collections, 'templateSuffix'))) L.push(`- \`collection${s === '(defecto)' ? '' : '.' + s}\` ×${l.length}: ${l.slice(0, 6).map(c => c.handle).join(', ')}${l.length > 6 ? ', …' : ''}`);
L.push('- `collection.lga`: ninguna colección la tiene asignada (se usa por `?view=lga` o quedó sin uso). [VERIFICAR] con Gero.', '');
L.push('**Páginas** (la Admin API no tiene permiso `read_content`; se dedujo desde el storefront con `tools/probe_pages.js`):', '',
  '- `/pages/contact` → `page.contact`; `/pages/nosotros` → `page.nosotros` (12/12 secciones coinciden). Son las dos únicas del sitemap.',
  '- `faq`, `caracteristicas`, `track-order`, `athlex-test` y las 4 notas de ATHLEX dan 404 con esos nombres: o no existen o no están publicadas. Las plantillas se llevan igual (mismo nombre) y se verifican con `?view=` sobre una página publicada. [VERIFICAR] qué páginas de la tienda las usan.', '');
L.push('## Secciones, bloques, apps y embeds', '', 'Generado con `node tools/usage.js` sobre plantillas, grupos (con variantes por mercado) y las secciones estáticas de `settings_data.json`.', '');
L.push(T('usage.txt').replace(/^\s*\n/, '').replace(/^### /gm, '### '), '');
L.push('### Notas', '',
  '- Secciones estáticas reales: `cart-drawer`, `promo-popup`, `scroll-to-top-btn`, `global-music-player`, `main-password-header` y `main-password-footer`. Las `header` y `footer` de `settings_data.sections` son restos de antes de los grupos: Shrine 1.3.0 dibuja la cabecera y el pie desde `header-group.json` y `footer-group.json`, que son los que se migran.',
  '- `settings_data` trae dos valores cifrados del candado de Shrine (`animations_type`, `fav_collection`): no se migran.',
  '- `platform_customizations.custom_css`: `sticky-atc.sticky-atc {z-index: 50 !important;}` (selector de Shrine). No se migra: ver GAPS-GADSDEN.md.',
  '- Ajustes globales del carrito de Shrine (`enable_cart_timer`, `cart_progress_*`, `cart_upsell_*`, `show_cart_payment_badges`): en Gadsden son bloques del cajón; el cajón de DOMU ya los tenía como bloques (progress_bar, countdown_timer…).',
  '- Bloques de apps: **Conversion Bear Trust Badges** (`shopify://apps/conversion-bear-trust-badges/…`) en las 6 fichas, sin embed propio; **Judge.me** `review_widget` en 4 secciones `apps`. El `preview_badge` de Judge.me está apagado en las 3 prod_test.', '');
L.push('## Custom liquid (código propio de DOMU)', '',
  '46 piezas en total: 37 activas (abajo) y 9 apagadas (ver "Desactivado"). Se llevan tal cual. "Clases sin regla" = clases que la pieza usa sin definirlas en su propio `<style>` y que Gadsden tampoco define (comparado contra el CSS de Gadsden, no el de Shrine): si eran de Shrine, se ven distinto; los prefijos `mlpay-` y `cbpx` son propios de Gero (sin regla a propósito o con regla por otro selector). "Variables" = `var(--…)` que nadie define.', '',
  '| Plantilla | Dónde | Tamaño | Clases de Dawn/Gadsden | Clases sin regla | Variables sin definir | `<script>` / assets |', '|---|---|---|---|---|---|---|');
L.push(T('custom_liquid.md').trim(), '');
L.push('**Assets del theme dentro del custom liquid.** 8 piezas cargan imágenes del theme con `asset_url`: el popup de medios de pago (`bank-<marca>.svg`, 6 piezas), las caras de reseñas de CarboTiras (`ct-cara-1..4.jpg`) y las fotos de packs de Kaching (`ct-pack-1..3.webp`). En Gadsden nativo esos archivos no están en `assets/`: se suben a Archivos con el mismo nombre y, en esas piezas, `| asset_url` pasa a `| file_url` (único cambio al código; ver BUILD-DOMU.md, decisiones). Dos logos ya estaban rotos en Shrine por el nombre del archivo y se dejan igual: `bank-diners-club.svg` (el archivo es `bank-dinners-club.svg`) y `bank-maestro.svg` (el archivo es `bank-mastro.svg`).', '');
L.push('## Assets propios (78)', '',
  '| Asset | Medidas | En Archivos | Se usa en | Qué se hace |', '|---|---|---|---|---|');
const dims = Object.fromEntries(T('ct_dims.txt').trim().split('\n').map(l => l.split(' ')));
const USE = [
  [/^bank-(visa|mastercard|american-express|cabal|argencard|naranjax|tarjeta-shopping|visa-debit|mastercard-debit|cabal-debit|rapipago|pago-facil)\.svg$/, 'popup de medios de pago (custom liquid)', 'subir'],
  [/^bank-/, 'nadie (Gadsden elige los medios de pago desde el pie)', 'no se sube'],
  [/^ct-cara-[1-4]\.jpg$/, 'reseñas de la ficha CarboTiras (custom liquid)', 'subir'],
  [/^ct-cara-/, 'ct-resenas (avatares de prueba)', 'ver MAPEO (L09)'],
  [/^ct-pack-/, 'estilo de Kaching en CarboTiras (custom liquid)', 'subir'],
  [/^ct-cover-\d+\.mp4$/, 'ct-coverflow (videos)', 'subir'],
  [/^ct-cover-\d+\.jpg$/, 'ct-coverflow (portadas)', 'existe o subir'],
  [/^ct-/, 'sección ct-* de CarboTiras (imagen por defecto)', 'subir'],
];
for (const a of own) {
  const [, use, what] = USE.find(([re]) => re.test(a));
  const have = names.has(a) ? 'sí (mismo nombre)' : match[a] ? `mismo contenido: \`${match[a]}\`` : 'no';
  L.push(`| \`${a}\` | ${dims[a] || 'svg'} | ${have} | ${use} | ${what === 'existe o subir' ? (match[a] ? 'usar el existente' : 'subir') : what} |`);
}
L.push('', 'Los 42 archivos `carbotiras*` de Archivos son otras piezas (fotos UGC 900×1600, pasos 1200×900, galería 1500×1500). Por contenido (huella de 16×16 en gris, `tools/assets_match.js`, revisado a ojo), 16 portadas `ct-cover-N.jpg` son las mismas fotos que `carbotiras-ugc-*`: se usan las existentes. `ct-cover-7.jpg` y `ct-cover-13.jpg` no tienen par y se suben. Ningún otro `ct-*` coincide en medidas ni proporción.', '');
L.push('## Archivos de la tienda', '', `${files.length} archivos (${files.filter(f => f.type === 'MediaImage').length} imágenes, ${files.filter(f => f.type === 'Video').length} videos) al 19-oct. Con nombres de DOMU: athlex* ${files.filter(f => /^athlex/i.test(f.name)).length}, carbotiras* ${files.filter(f => /^carbotiras/i.test(f.name)).length}, ct-* 0, bank-* 0.`, '');
fs.writeFileSync(path.join(ROOT, 'INVENTARIO.md'), L.join('\n') + '\n');
console.log('INVENTARIO.md', L.length, 'líneas');
