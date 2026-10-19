# Inventario — DOMU en Shrine (copia del 15-oct-2026)

Fuente: `D:\_refs\shrine-domu-og-2026-10-15\` (sólo JSON y `{% schema %}`), Admin API de mem1a9-ev y storefront (19-oct-2026). Detalle de ajustes por sección y bloque en [INVENTARIO-AJUSTES.md](INVENTARIO-AJUSTES.md).

## Plantillas

29 plantillas + 7 de clientes + `gift_card.liquid`, más `sections/header-group.json`, `footer-group.json` y sus variantes por mercado (`*.context.international.json` y `*.context.04d13b88-4025-4eda-aa29-07fdfbea8470.json`). No hay `templates/product.json`: queda la de Gadsden.

### Quién usa cada plantilla

**Productos** (Admin API, 48):

- `product.prod_test` ×7: test [UNLISTED], mini-gps-localizador-gf-07-sin-abono, purificador-aire-hepa-h13-sin-ozono, mini-camara-wifi-magnetica-la-ves-desde-el-celular-sin-abono, cepillo-anti-frizz-domu, guantes-gym-mujer-livianos-4-dedos [DRAFT], delineador-de-labios-doble-punta-a-prueba-de-agua-multicolor-difuminador [DRAFT]
- `product.prod_test_lga` ×39: wa-26236193442723607, wa-26466033899741967, wa-26878338145181157, wa-26898386439861256, wa-26999423333050036, wa-27016942674622470, wa-27018436267807357, … (los `wa-*` del catálogo de WhatsApp)
- `product.athlex-landing` ×1: athlex [UNLISTED]
- `product.carbotiras-nativo` ×1: carbotiras
- `product.gps-landing`: ningún producto la tiene como sufijo; se abre como vista alternativa: `/products/mini-gps-localizador-gf-07-sin-abono?view=gps-landing`.
- `product.prod_test_kaching`: ningún producto la tiene asignada hoy.

**Colecciones** (Admin API, 26):

- `collection` ×1: frontpage
- `collection.general` ×25: ayudantes-de-cocina, desayunos-y-meriendas, hogar, cuidado-personal, indumentaria-deportiva, beauty-y-skincare, …
- `collection.lga`: ninguna colección la tiene asignada (se usa por `?view=lga` o quedó sin uso). [VERIFICAR] con Gero.

**Páginas** (la Admin API no tiene permiso `read_content`; se dedujo desde el storefront con `tools/probe_pages.js`):

- `/pages/contact` → `page.contact`; `/pages/nosotros` → `page.nosotros` (12/12 secciones coinciden). Son las dos únicas del sitemap.
- `faq`, `caracteristicas`, `track-order`, `athlex-test` y las 4 notas de ATHLEX dan 404 con esos nombres: o no existen o no están publicadas. Las plantillas se llevan igual (mismo nombre) y se verifican con `?view=` sobre una página publicada. [VERIFICAR] qué páginas de la tienda las usan.

## Secciones, bloques, apps y embeds

Generado con `node tools/usage.js` sobre plantillas, grupos (con variantes por mercado) y las secciones estáticas de `settings_data.json`.

### Secciones activas

- `newsletter` ×6: 404, article, blog, list-collections, page, search
- `main-product` ×6: product.athlex-landing, product.carbotiras-nativo, product.gps-landing, product.prod_test, product.prod_test_kaching, product.prod_test_lga
- `slideshow-hero` ×5: index (2), page.nosotros (3)
- `custom-liquid` ×4: collection.general, collection.lga (2), product.gps-landing
- `image-slider` ×4: collection.lga, product.athlex-landing, product.carbotiras-nativo, product.gps-landing
- `athlex-nota` ×4: page.athlex-nota-6cosas, page.athlex-nota-carta, page.athlex-nota-investigativa, page.athlex-nota-sincuentos
- `apps` ×4: product.gps-landing, product.prod_test, product.prod_test_kaching, product.prod_test_lga
- `main-collection-product-grid` ×3: collection.general, collection, collection.lga
- `icon-bar` ×3: index, page.nosotros, product.gps-landing
- `contact-form` ×3: index, page.contact, page.nosotros
- `collapsible-content` ×3: page.faq, page.nosotros, product.carbotiras-nativo
- `horizontal-ticker` ×3: product.athlex-landing (2), product.carbotiras-nativo
- `slideshow` ×2: collection, page.caracteristicas
- `multicolumn` ×2: page.nosotros, product.prod_test
- `comparison-table` ×2: page.nosotros, product.carbotiras-nativo
- `main-404` ×1: 404
- `main-article` ×1: article
- `main-blog` ×1: blog
- `main-cart-items` ×1: cart
- `main-cart-footer` ×1: cart
- `featured-collection` ×1: cart
- `collection-list` ×1: collection
- `main-list-collections` ×1: list-collections
- `athlex-test` ×1: page.athlex-test
- `main-page` ×1: page
- `content-tabs` ×1: page.nosotros
- `testimonials` ×1: page.nosotros
- `multirow` ×1: page.nosotros
- `rich-text` ×1: page.nosotros
- `track-order` ×1: page.track-order
- `image-with-text` ×1: page.track-order
- `email-signup-banner` ×1: password
- `athlex-reviews-mini` ×1: product.athlex-landing
- `athlex-faq` ×1: product.athlex-landing
- `athlex-dolor` ×1: product.athlex-landing
- `athlex-mecanismo` ×1: product.athlex-landing
- `comparison-slider` ×1: product.athlex-landing
- `athlex-uso` ×1: product.athlex-landing
- `athlex-ingredientes` ×1: product.athlex-landing
- `athlex-proceso` ×1: product.athlex-landing
- `athlex-reviews` ×1: product.athlex-landing
- `athlex-legal` ×1: product.athlex-landing
- `athlex-skin` ×1: product.athlex-landing
- `athlex-progreso` ×1: product.athlex-landing
- `ct-hero` ×1: product.carbotiras-nativo
- `ct-pasos` ×1: product.carbotiras-nativo
- `ct-resenas` ×1: product.carbotiras-nativo
- `ct-beneficios` ×1: product.carbotiras-nativo
- `ct-comparar` ×1: product.carbotiras-nativo
- `ct-coverflow` ×1: product.carbotiras-nativo
- `ct-garantia` ×1: product.carbotiras-nativo
- `ct-cierre` ×1: product.carbotiras-nativo
- `gps-steps` ×1: product.gps-landing
- `gps-comparativa` ×1: product.gps-landing
- `gps-marquee` ×1: product.gps-landing
- `gps-cta` ×1: product.gps-landing
- `main-search` ×1: search
- `main-account` ×1: customers/account
- `main-activate-account` ×1: customers/activate_account
- `main-addresses` ×1: customers/addresses
- `main-login` ×1: customers/login
- `main-order` ×1: customers/order
- `main-register` ×1: customers/register
- `main-reset-password` ×1: customers/reset_password
- `footer` ×1: footer-group
- `announcement-bar` ×1: header-group
- `header` ×1: header-group
- `main-password-header [settings_data]` ×1: main-password-header
- `main-password-footer [settings_data]` ×1: main-password-footer
- `promo-popup [settings_data]` ×1: promo-popup
- `scroll-to-top-btn [settings_data]` ×1: scroll-to-top-btn
- `global-music-player [settings_data]` ×1: global-music-player
- `cart-drawer [settings_data]` ×1: cart-drawer
- `header [settings_data]` ×1: header
- `footer [settings_data]` ×1: footer

### Bloques activos

- `athlex-nota > parrafo` ×42: page.athlex-nota-6cosas (9), page.athlex-nota-carta (10), page.athlex-nota-investigativa (13), page.athlex-nota-sincuentos (10)
- `main-product > custom_liquid` ×33: product.athlex-landing (6), product.carbotiras-nativo (5), product.gps-landing (5), product.prod_test (5), product.prod_test_kaching (5), product.prod_test_lga (7)
- `athlex-nota > subtitulo` ×31: page.athlex-nota-6cosas (7), page.athlex-nota-carta (6), page.athlex-nota-investigativa (10), page.athlex-nota-sincuentos (8)
- `image-slider > image_slide` ×29: product.athlex-landing (8), product.carbotiras-nativo (17), product.gps-landing (4)
- `main-product > collapsible_tab` ×24: product.carbotiras-nativo (6), product.prod_test (6), product.prod_test_kaching (6), product.prod_test_lga (6)
- `collapsible-content > collapsible_row` ×20: page.faq (4), page.nosotros (10), product.carbotiras-nativo (6)
- `ct-coverflow > video` ×18: product.carbotiras-nativo (18)
- `horizontal-ticker > text` ×12: product.athlex-landing (8), product.carbotiras-nativo (4)
- `icon-bar > column` ×11: index (4), page.nosotros (3), product.gps-landing (4)
- `athlex-reviews > resena` ×11: product.athlex-landing (11)
- `comparison-table > row` ×9: page.nosotros (5), product.carbotiras-nativo (4)
- `slideshow > slide` ×8: collection (3), page.caracteristicas (5)
- `athlex-nota > imagen` ×8: page.athlex-nota-6cosas (2), page.athlex-nota-carta (2), page.athlex-nota-investigativa (2), page.athlex-nota-sincuentos (2)
- `ct-resenas > resena` ×8: product.carbotiras-nativo (8)
- `collection-list > featured_collection` ×7: collection (7)
- `athlex-nota > destacado` ×7: page.athlex-nota-6cosas (2), page.athlex-nota-carta (2), page.athlex-nota-investigativa, page.athlex-nota-sincuentos (2)
- `multicolumn > column` ×7: page.nosotros (4), product.prod_test (3)
- `newsletter > heading` ×6: 404, article, blog, list-collections, page, search
- `newsletter > paragraph` ×6: 404, article, blog, list-collections, page, search
- `newsletter > email_form` ×6: 404, article, blog, list-collections, page, search
- `contact-form > field_row` ×6: index (2), page.contact (2), page.nosotros (2)
- `main-product > title` ×6: product.athlex-landing, product.carbotiras-nativo, product.gps-landing, product.prod_test, product.prod_test_kaching, product.prod_test_lga
- `main-product > buy_buttons` ×6: product.athlex-landing, product.carbotiras-nativo, product.gps-landing, product.prod_test, product.prod_test_kaching, product.prod_test_lga
- `main-product > sticky_atc` ×6: product.athlex-landing, product.carbotiras-nativo, product.gps-landing, product.prod_test, product.prod_test_kaching, product.prod_test_lga
- `athlex-faq > qa` ×6: product.athlex-landing (6)
- `athlex-dolor > dato` ×6: product.athlex-landing (6)
- `gps-comparativa > row` ×6: product.gps-landing (6)
- `slideshow-hero > slide` ×5: index (2), page.nosotros (3)
- `athlex-nota > caja` ×5: page.athlex-nota-6cosas (2), page.athlex-nota-carta, page.athlex-nota-investigativa, page.athlex-nota-sincuentos
- `athlex-nota > citas` ×5: page.athlex-nota-carta, page.athlex-nota-investigativa (3), page.athlex-nota-sincuentos
- `main-product > price` ×5: product.athlex-landing, product.carbotiras-nativo, product.prod_test, product.prod_test_kaching, product.prod_test_lga
- `athlex-reviews-mini > destacado` ×5: product.athlex-landing (5)
- `athlex-ingredientes > equipo` ×5: product.athlex-landing (5)
- `athlex-nota > semana` ×4: page.athlex-nota-6cosas, page.athlex-nota-carta, page.athlex-nota-investigativa, page.athlex-nota-sincuentos
- `athlex-nota > versus` ×4: page.athlex-nota-6cosas, page.athlex-nota-carta, page.athlex-nota-investigativa, page.athlex-nota-sincuentos
- `athlex-nota > video` ×4: page.athlex-nota-carta, page.athlex-nota-investigativa, page.athlex-nota-sincuentos (2)
- `athlex-dolor > punal` ×4: product.athlex-landing (4)
- `athlex-proceso > etapa` ×4: product.athlex-landing (4)
- `ct-pasos > paso` ×4: product.carbotiras-nativo (4)
- `ct-beneficios > beneficio` ×4: product.carbotiras-nativo (4)
- `main-product > reviews` ×4: product.gps-landing, product.prod_test, product.prod_test_kaching, product.prod_test_lga
- `main-product > image` ×4: product.prod_test (2), product.prod_test_kaching (2)
- `athlex-nota > test` ×3: page.athlex-nota-6cosas, page.athlex-nota-carta, page.athlex-nota-sincuentos
- `content-tabs > tab` ×3: page.nosotros (3)
- `testimonials > column` ×3: page.nosotros (3)
- `athlex-mecanismo > sello` ×3: product.athlex-landing (3)
- `athlex-uso > paso` ×3: product.athlex-landing (3)
- `gps-steps > step` ×3: product.gps-landing (3)
- `main-product > variant_picker` ×3: product.prod_test, product.prod_test_kaching, product.prod_test_lga
- `main-product > quantity_selector` ×3: product.prod_test, product.prod_test_kaching, product.prod_test_lga
- `main-product > emoji_benefits` ×3: product.prod_test, product.prod_test_kaching, product.prod_test_lga
- `main-product > text` ×3: product.prod_test, product.prod_test_kaching, product.prod_test_lga
- `contact-form > textarea` ×2: index, page.contact
- `athlex-nota > indice` ×2: page.athlex-nota-6cosas, page.athlex-nota-sincuentos
- `athlex-nota > dia` ×2: page.athlex-nota-6cosas, page.athlex-nota-sincuentos
- `athlex-nota > ciclo` ×2: page.athlex-nota-carta, page.athlex-nota-sincuentos
- `athlex-nota > firma` ×2: page.athlex-nota-carta, page.athlex-nota-sincuentos
- `footer > link_list` ×2: footer-group, settings_data
- `main-article > featured_image` ×1: article
- `main-article > title` ×1: article
- `main-article > share` ×1: article
- `main-article > content` ×1: article
- `main-cart-footer > subtotal` ×1: cart
- `main-cart-footer > buttons` ×1: cart
- `image-slider > video_slide` ×1: collection.lga
- `athlex-nota > tira` ×1: page.athlex-nota-sincuentos
- `multirow > row` ×1: page.nosotros
- `rich-text > text` ×1: page.nosotros
- `image-with-text > heading` ×1: page.track-order
- `image-with-text > text` ×1: page.track-order
- `image-with-text > button` ×1: page.track-order
- `email-signup-banner > heading` ×1: password
- `email-signup-banner > paragraph` ×1: password
- `email-signup-banner > email_form` ×1: password
- `footer > brand_information` ×1: footer-group
- `announcement-bar > announcement` ×1: header-group
- `cart-drawer > progress_bar` ×1: settings_data
- `cart-drawer > countdown_timer` ×1: settings_data
- `cart-drawer > cart_items` ×1: settings_data
- `cart-drawer > cart_note` ×1: settings_data
- `cart-drawer > discount_field` ×1: settings_data
- `cart-drawer > subtotals` ×1: settings_data
- `cart-drawer > checkout_btn` ×1: settings_data
- `cart-drawer > payment_badges` ×1: settings_data
- `footer > image` ×1: settings_data
- `footer > email_signup` ×1: settings_data

### Bloques de apps

- `shopify://apps/conversion-bear-trust-badges/blocks/widget/163a9b59-0ec2-4cb7-bf5c-31408b4a9420 (en main-product)` ×6: product.athlex-landing, product.carbotiras-nativo, product.gps-landing, product.prod_test, product.prod_test_kaching, product.prod_test_lga
- `shopify://apps/judge-me-reviews/blocks/review_widget/61ccd3b1-a9f2-4160-9fe9-4fec8413e5d8 (en apps)` ×4: product.gps-landing, product.prod_test, product.prod_test_kaching, product.prod_test_lga

### App embeds (settings_data.current.blocks)

- `shopify://apps/judge-me-reviews/blocks/judgeme_core/61ccd3b1-a9f2-4160-9fe9-4fec8413e5d8` id `14060646107696862457`
- `shopify://apps/microsoft-clarity/blocks/clarity_js/31c3d126-8116-4b4a-8ba1-baeda7c4aeea` id `2567389343055140935`
- `shopify://apps/kaching-bundles/blocks/app-embed-block/6c637362-a106-4a32-94ac-94dcfd68cdb8` id `15557474716127144420`
- `shopify://apps/mercado-pago-antifraud-plus/blocks/embed-block/b19ea721-f94a-4308-bee5-0057c043bac5` id `12948015482042402483`
- `shopify://apps/microsoft-clarity/blocks/brandAgents_js/31c3d126-8116-4b4a-8ba1-baeda7c4aeea` id `2200952712151285029` (apagado)

### Desactivado en la referencia (no se migra)

- cart > cart-footer > dec6ac13-eef3-4b4c-900a-e550eb977500 (discount_field)
- collection.general > main-collection-banner (main-collection-banner)
- collection.general > 1783972397951c2e09 (_blocks)
- collection.general > collage (collage)
- collection > main-collection-banner (main-collection-banner)
- collection > collage (collage)
- collection.lga > main-collection-banner (main-collection-banner)
- collection.lga > collage (collage)
- page.caracteristicas > main (main-page)
- page.contact > main (main-page)
- page.contact > 60910267-55e8-4e0d-a9f9-79b26b3533dc (rich-text)
- page.faq > main (main-page)
- page.nosotros > main (main-page)
- page.nosotros > video_PiVDUy (video)
- page.nosotros > collapsible_content_J6WxeR > collapsible_row_ib3AHJ (collapsible_row)
- page.nosotros > collapsible_content_J6WxeR > collapsible_row_y6cBPd (collapsible_row)
- page.track-order > main (main-page)
- product.athlex-landing > main > bb-oferta (custom_liquid)
- product.athlex-landing > main > custom_liquid_YHJ9cE (custom_liquid)
- product.athlex-landing > problema (athlex-problema)
- product.athlex-landing > oferta (athlex-oferta)
- product.carbotiras-nativo > antes_despues (comparison-slider)
- product.carbotiras-nativo > resenas (apps)
- product.gps-landing > main > price (price)
- product.gps-landing > main > custom_liquid_NKJTwG (custom_liquid)
- product.gps-landing > main > 5fcc0428-e768-4cb7-bea3-eb0274198dd1 (variant_picker)
- product.gps-landing > main > 04ba004e-2f54-4936-8b1c-8bcadf6573f6 (quantity_selector)
- product.gps-landing > main > custom_liquid_HmQCK6 (custom_liquid)
- product.gps-landing > main > emoji_benefits_8r83k3 (emoji_benefits)
- product.gps-landing > main > image_6rmkYM (image)
- product.gps-landing > main > custom_liquid_39ajAd (custom_liquid)
- product.gps-landing > main > image_LjeMXU (image)
- product.gps-landing > main > text_iG6Kng (text)
- product.gps-landing > main > collapsible_tab_HEfeJf (collapsible_tab)
- product.gps-landing > main > collapsible_tab_zgYfRM (collapsible_tab)
- product.gps-landing > main > collapsible_tab_kxP4cK (collapsible_tab)
- product.gps-landing > main > collapsible_tab_q4ENKB (collapsible_tab)
- product.gps-landing > main > collapsible_tab_tDY7Wg (collapsible_tab)
- product.gps-landing > main > collapsible_tab_wkB9pw (collapsible_tab)
- product.gps-landing > gps_stats_DT6r9V (gps-stats)
- product.gps-landing > related-products (related-products)
- product.prod_test > main > judge_me_reviews_preview_badge_bhcVc8 (shopify://apps/judge-me-reviews/blocks/preview_badge/61ccd3b1-a9f2-4160-9fe9-4fec8413e5d8)
- product.prod_test > main > custom_liquid_L4EVxm (custom_liquid)
- product.prod_test > main > custom_liquid_HmQCK6 (custom_liquid)
- product.prod_test > related-products (related-products)
- product.prod_test_kaching > main > judge_me_reviews_preview_badge_bhcVc8 (shopify://apps/judge-me-reviews/blocks/preview_badge/61ccd3b1-a9f2-4160-9fe9-4fec8413e5d8)
- product.prod_test_kaching > main > custom_liquid_L4EVxm (custom_liquid)
- product.prod_test_kaching > main > custom_liquid_HmQCK6 (custom_liquid)
- product.prod_test_kaching > related-products (related-products)
- product.prod_test_lga > main > judge_me_reviews_preview_badge_bhcVc8 (shopify://apps/judge-me-reviews/blocks/preview_badge/61ccd3b1-a9f2-4160-9fe9-4fec8413e5d8)
- product.prod_test_lga > main > image_6rmkYM (image)
- product.prod_test_lga > main > image_LjeMXU (image)
- product.prod_test_lga > related-products (related-products)
- footer-group > 177016447490938abc (apps)
- header-group > 2c2ec774-3430-481f-b927-e9c035b9d24e (horizontal-ticker)


### Notas

- Secciones estáticas reales: `cart-drawer`, `promo-popup`, `scroll-to-top-btn`, `global-music-player`, `main-password-header` y `main-password-footer`. Las `header` y `footer` de `settings_data.sections` son restos de antes de los grupos: Shrine 1.3.0 dibuja la cabecera y el pie desde `header-group.json` y `footer-group.json`, que son los que se migran.
- `settings_data` trae dos valores cifrados del candado de Shrine (`animations_type`, `fav_collection`): no se migran.
- `platform_customizations.custom_css`: `sticky-atc.sticky-atc {z-index: 50 !important;}` (selector de Shrine). No se migra: ver GAPS-GADSDEN.md.
- Ajustes globales del carrito de Shrine (`enable_cart_timer`, `cart_progress_*`, `cart_upsell_*`, `show_cart_payment_badges`): en Gadsden son bloques del cajón; el cajón de DOMU ya los tenía como bloques (progress_bar, countdown_timer…).
- Bloques de apps: **Conversion Bear Trust Badges** (`shopify://apps/conversion-bear-trust-badges/…`) en las 6 fichas, sin embed propio; **Judge.me** `review_widget` en 4 secciones `apps`. El `preview_badge` de Judge.me está apagado en las 3 prod_test.

## Custom liquid (código propio de DOMU)

46 piezas en total: 37 activas (abajo) y 9 apagadas (ver "Desactivado"). Se llevan tal cual. "Clases sin regla" = clases que la pieza usa sin definirlas en su propio `<style>` y que Gadsden tampoco define (comparado contra el CSS de Gadsden, no el de Shrine): si eran de Shrine, se ven distinto; los prefijos `mlpay-` y `cbpx` son propios de Gero (sin regla a propósito o con regla por otro selector). "Variables" = `var(--…)` que nadie define.

| Plantilla | Dónde | Tamaño | Clases de Dawn/Gadsden | Clases sin regla | Variables sin definir | `<script>` / assets |
|---|---|---|---|---|---|---|
| collection.general | sección custom_liquid_AxmgpN | 2.6 KB | — | cbpx | — | 1 |
| collection.lga | sección custom_liquid_x4X4Er | 2.6 KB | — | cbpx | — | 1 |
| collection.lga | sección custom_liquid_F7BdNg | 5.2 KB | — | — | — | 1 |
| product.athlex-landing | main > bb-chips | 3.8 KB | — | — | — | 0 |
| product.athlex-landing | main > custom_liquid_F6dBXr | 1.1 KB | — | — | — | 0 |
| product.athlex-landing | main > custom_liquid_HdzP3B | 2.8 KB | — | — | — | 1 |
| product.athlex-landing | main > custom_liquid_NbFHWK | 7.8 KB | — | mlpay-link-arrow mlpay-intro mlpay-sub mlpay-accordion mlpay-sum-title mlpay-p mlpay-logos-row | — | 1 · asset_url |
| product.athlex-landing | main > custom_liquid_mgX9U6 | 5.8 KB | — | — | — | 0 |
| product.athlex-landing | main > bb-chequeo | 8.1 KB | — | — | — | 0 |
| product.carbotiras-nativo | main > bb-chips | 2.7 KB | — | — | — | 0 |
| product.carbotiras-nativo | main > rating | 2.8 KB | — | — | — | 1 · asset_url |
| product.carbotiras-nativo | main > cuotas | 4.7 KB | — | — | — | 2 |
| product.carbotiras-nativo | main > medios-pago | 7.9 KB | — | mlpay-link-arrow mlpay-intro mlpay-sub mlpay-accordion mlpay-sum-title mlpay-p mlpay-logos-row | — | 1 · asset_url |
| product.carbotiras-nativo | main > kaching-estilo | 9.4 KB | — | — | — | 0 · asset_url |
| product.gps-landing | main > custom_liquid_gX3AKU | 1.1 KB | — | — | — | 0 |
| product.gps-landing | main > custom_liquid_L4EVxm | 1.9 KB | — | — | — | 0 |
| product.gps-landing | main > custom_liquid_GTkmHj | 1.4 KB | — | — | — | 1 |
| product.gps-landing | main > custom_liquid_haMnb7 | 2.8 KB | — | — | — | 1 |
| product.gps-landing | main > custom_liquid_HmMNDc | 7.8 KB | — | mlpay-link-arrow mlpay-intro mlpay-sub mlpay-accordion mlpay-sum-title mlpay-p mlpay-logos-row | — | 1 · asset_url |
| product.gps-landing | sección custom_liquid_8EnbUH | 7.2 KB | — | — | — | 0 |
| product.prod_test | main > custom_liquid_gX3AKU | 1.1 KB | — | — | — | 0 |
| product.prod_test | main > custom_liquid_haMnb7 | 0.5 KB | — | — | — | 0 |
| product.prod_test | main > custom_liquid_HmMNDc | 7.8 KB | — | mlpay-link-arrow mlpay-intro mlpay-sub mlpay-accordion mlpay-sum-title mlpay-p mlpay-logos-row | — | 1 · asset_url |
| product.prod_test | main > custom_liquid_NKJTwG | 1.1 KB | — | — | — | 0 |
| product.prod_test | main > custom_liquid_39ajAd | 0.1 KB | — | — | — | 0 |
| product.prod_test_kaching | main > custom_liquid_gX3AKU | 1.1 KB | — | — | — | 0 |
| product.prod_test_kaching | main > custom_liquid_haMnb7 | 0.5 KB | — | — | — | 0 |
| product.prod_test_kaching | main > custom_liquid_HmMNDc | 7.8 KB | — | mlpay-link-arrow mlpay-intro mlpay-sub mlpay-accordion mlpay-sum-title mlpay-p mlpay-logos-row | — | 1 · asset_url |
| product.prod_test_kaching | main > custom_liquid_NKJTwG | 1.1 KB | — | — | — | 0 |
| product.prod_test_kaching | main > custom_liquid_39ajAd | 0.1 KB | — | — | — | 0 |
| product.prod_test_lga | main > custom_liquid_gX3AKU | 1.1 KB | — | — | — | 0 |
| product.prod_test_lga | main > custom_liquid_haMnb7 | 0.5 KB | — | — | — | 0 |
| product.prod_test_lga | main > custom_liquid_HmMNDc | 7.8 KB | — | mlpay-link-arrow mlpay-intro mlpay-sub mlpay-accordion mlpay-sum-title mlpay-p mlpay-logos-row | — | 1 · asset_url |
| product.prod_test_lga | main > custom_liquid_NKJTwG | 1.1 KB | — | — | — | 0 |
| product.prod_test_lga | main > custom_liquid_L4EVxm | 2.5 KB | — | custom-product-benefits benefit-content | — | 0 |
| product.prod_test_lga | main > custom_liquid_HmQCK6 | 6.2 KB | — | — | — | 1 |
| product.prod_test_lga | main > custom_liquid_39ajAd | 0.1 KB | — | — | — | 0 |

37 piezas, 130 KB

**Assets del theme dentro del custom liquid.** 8 piezas cargan imágenes del theme con `asset_url`: el popup de medios de pago (`bank-<marca>.svg`, 6 piezas), las caras de reseñas de CarboTiras (`ct-cara-1..4.jpg`) y las fotos de packs de Kaching (`ct-pack-1..3.webp`). En Gadsden nativo esos archivos no están en `assets/`: se suben a Archivos con el mismo nombre y, en esas piezas, `| asset_url` pasa a `| file_url` (único cambio al código; ver BUILD-DOMU.md, decisiones). Dos logos ya estaban rotos en Shrine por el nombre del archivo y se dejan igual: `bank-diners-club.svg` (el archivo es `bank-dinners-club.svg`) y `bank-maestro.svg` (el archivo es `bank-mastro.svg`).

## Assets propios (78)

| Asset | Medidas | En Archivos | Se usa en | Qué se hace |
|---|---|---|---|---|
| `bank-american-express.svg` | svg | no | popup de medios de pago (custom liquid) | subir |
| `bank-argencard.svg` | svg | no | popup de medios de pago (custom liquid) | subir |
| `bank-cabal-debit.svg` | svg | no | popup de medios de pago (custom liquid) | subir |
| `bank-cabal.svg` | svg | no | popup de medios de pago (custom liquid) | subir |
| `bank-dinners-club.svg` | svg | no | nadie (Gadsden elige los medios de pago desde el pie) | no se sube |
| `bank-mastercard-debit.svg` | svg | no | popup de medios de pago (custom liquid) | subir |
| `bank-mastercard.svg` | svg | no | popup de medios de pago (custom liquid) | subir |
| `bank-mastro.svg` | svg | no | nadie (Gadsden elige los medios de pago desde el pie) | no se sube |
| `bank-mercado-pago.svg` | svg | no | nadie (Gadsden elige los medios de pago desde el pie) | no se sube |
| `bank-naranjax.svg` | svg | no | popup de medios de pago (custom liquid) | subir |
| `bank-pago-facil.svg` | svg | no | popup de medios de pago (custom liquid) | subir |
| `bank-rapipago.svg` | svg | no | popup de medios de pago (custom liquid) | subir |
| `bank-supervielle.svg` | svg | no | nadie (Gadsden elige los medios de pago desde el pie) | no se sube |
| `bank-tarjeta-shopping.svg` | svg | no | popup de medios de pago (custom liquid) | subir |
| `bank-visa-debit.svg` | svg | no | popup de medios de pago (custom liquid) | subir |
| `bank-visa.svg` | svg | no | popup de medios de pago (custom liquid) | subir |
| `ct-ben-1.jpg` | 360x360 | no | sección ct-* de CarboTiras (imagen por defecto) | subir |
| `ct-ben-2.jpg` | 360x360 | no | sección ct-* de CarboTiras (imagen por defecto) | subir |
| `ct-ben-3.jpg` | 360x360 | no | sección ct-* de CarboTiras (imagen por defecto) | subir |
| `ct-ben-4.jpg` | 360x360 | no | sección ct-* de CarboTiras (imagen por defecto) | subir |
| `ct-cara-1.jpg` | 160x160 | no | reseñas de la ficha CarboTiras (custom liquid) | subir |
| `ct-cara-2.jpg` | 160x160 | no | reseñas de la ficha CarboTiras (custom liquid) | subir |
| `ct-cara-3.jpg` | 160x160 | no | reseñas de la ficha CarboTiras (custom liquid) | subir |
| `ct-cara-4.jpg` | 160x160 | no | reseñas de la ficha CarboTiras (custom liquid) | subir |
| `ct-cara-5.jpg` | 160x160 | no | ct-resenas (avatares de prueba) | ver MAPEO (L09) |
| `ct-cara-6.jpg` | 160x160 | no | ct-resenas (avatares de prueba) | ver MAPEO (L09) |
| `ct-cara-7.jpg` | 160x160 | no | ct-resenas (avatares de prueba) | ver MAPEO (L09) |
| `ct-cara-8.jpg` | 160x160 | no | ct-resenas (avatares de prueba) | ver MAPEO (L09) |
| `ct-cierre-producto.webp` | 804x821 | no | sección ct-* de CarboTiras (imagen por defecto) | subir |
| `ct-comparar-antes.jpg` | 900x796 | no | sección ct-* de CarboTiras (imagen por defecto) | subir |
| `ct-comparar-despues.jpg` | 900x795 | no | sección ct-* de CarboTiras (imagen por defecto) | subir |
| `ct-cover-1.jpg` | 360x640 | mismo contenido: `carbotiras-ugc-08.jpg` | ct-coverflow (portadas) | usar el existente |
| `ct-cover-1.mp4` | 360x640 | no | ct-coverflow (videos) | subir |
| `ct-cover-10.jpg` | 360x640 | mismo contenido: `carbotiras-ugc-14.jpg` | ct-coverflow (portadas) | usar el existente |
| `ct-cover-10.mp4` | 360x640 | no | ct-coverflow (videos) | subir |
| `ct-cover-11.jpg` | 360x640 | mismo contenido: `carbotiras-ugc-07.jpg` | ct-coverflow (portadas) | usar el existente |
| `ct-cover-11.mp4` | 360x640 | no | ct-coverflow (videos) | subir |
| `ct-cover-12.jpg` | 360x640 | mismo contenido: `carbotiras-ugc-16.jpg` | ct-coverflow (portadas) | usar el existente |
| `ct-cover-12.mp4` | 360x640 | no | ct-coverflow (videos) | subir |
| `ct-cover-13.jpg` | 360x640 | no | ct-coverflow (portadas) | subir |
| `ct-cover-13.mp4` | 360x640 | no | ct-coverflow (videos) | subir |
| `ct-cover-14.jpg` | 360x640 | mismo contenido: `carbotiras-ugc-12.jpg` | ct-coverflow (portadas) | usar el existente |
| `ct-cover-14.mp4` | 360x640 | no | ct-coverflow (videos) | subir |
| `ct-cover-15.jpg` | 360x640 | mismo contenido: `carbotiras-ugc-15.jpg` | ct-coverflow (portadas) | usar el existente |
| `ct-cover-15.mp4` | 360x640 | no | ct-coverflow (videos) | subir |
| `ct-cover-16.jpg` | 360x640 | mismo contenido: `carbotiras-ugc-18.jpg` | ct-coverflow (portadas) | usar el existente |
| `ct-cover-16.mp4` | 360x640 | no | ct-coverflow (videos) | subir |
| `ct-cover-17.jpg` | 360x640 | mismo contenido: `carbotiras-ugc-17.jpg` | ct-coverflow (portadas) | usar el existente |
| `ct-cover-17.mp4` | 360x640 | no | ct-coverflow (videos) | subir |
| `ct-cover-18.jpg` | 360x640 | mismo contenido: `carbotiras-ugc-13.jpg` | ct-coverflow (portadas) | usar el existente |
| `ct-cover-18.mp4` | 360x640 | no | ct-coverflow (videos) | subir |
| `ct-cover-2.jpg` | 360x640 | mismo contenido: `carbotiras-ugc-10.jpg` | ct-coverflow (portadas) | usar el existente |
| `ct-cover-2.mp4` | 360x640 | no | ct-coverflow (videos) | subir |
| `ct-cover-3.jpg` | 360x640 | mismo contenido: `carbotiras-ugc-02.jpg` | ct-coverflow (portadas) | usar el existente |
| `ct-cover-3.mp4` | 360x640 | no | ct-coverflow (videos) | subir |
| `ct-cover-4.jpg` | 360x640 | mismo contenido: `carbotiras-ugc-01.jpg` | ct-coverflow (portadas) | usar el existente |
| `ct-cover-4.mp4` | 360x640 | no | ct-coverflow (videos) | subir |
| `ct-cover-5.jpg` | 360x640 | mismo contenido: `carbotiras-ugc-04.jpg` | ct-coverflow (portadas) | usar el existente |
| `ct-cover-5.mp4` | 360x640 | no | ct-coverflow (videos) | subir |
| `ct-cover-6.jpg` | 360x640 | mismo contenido: `carbotiras-ugc-03.jpg` | ct-coverflow (portadas) | usar el existente |
| `ct-cover-6.mp4` | 360x640 | no | ct-coverflow (videos) | subir |
| `ct-cover-7.jpg` | 360x640 | no | ct-coverflow (portadas) | subir |
| `ct-cover-7.mp4` | 360x640 | no | ct-coverflow (videos) | subir |
| `ct-cover-8.jpg` | 360x640 | mismo contenido: `carbotiras-ugc-09.jpg` | ct-coverflow (portadas) | usar el existente |
| `ct-cover-8.mp4` | 360x640 | no | ct-coverflow (videos) | subir |
| `ct-cover-9.jpg` | 360x640 | mismo contenido: `carbotiras-ugc-11.jpg` | ct-coverflow (portadas) | usar el existente |
| `ct-cover-9.mp4` | 360x640 | no | ct-coverflow (videos) | subir |
| `ct-hero-antes.jpg` | 800x497 | no | sección ct-* de CarboTiras (imagen por defecto) | subir |
| `ct-hero-bg.jpg` | 752x1344 | no | sección ct-* de CarboTiras (imagen por defecto) | subir |
| `ct-hero-despues.jpg` | 800x496 | no | sección ct-* de CarboTiras (imagen por defecto) | subir |
| `ct-pack-1.webp` | 134x260 | no | estilo de Kaching en CarboTiras (custom liquid) | subir |
| `ct-pack-2.webp` | 217x260 | no | estilo de Kaching en CarboTiras (custom liquid) | subir |
| `ct-pack-3.webp` | 260x230 | no | estilo de Kaching en CarboTiras (custom liquid) | subir |
| `ct-paso-1.jpg` | 360x360 | no | sección ct-* de CarboTiras (imagen por defecto) | subir |
| `ct-paso-2.jpg` | 360x360 | no | sección ct-* de CarboTiras (imagen por defecto) | subir |
| `ct-paso-3.jpg` | 360x360 | no | sección ct-* de CarboTiras (imagen por defecto) | subir |
| `ct-paso-4.jpg` | 360x360 | no | sección ct-* de CarboTiras (imagen por defecto) | subir |
| `ct-pasos-bg.jpg` | 752x1344 | no | sección ct-* de CarboTiras (imagen por defecto) | subir |

Los 42 archivos `carbotiras*` de Archivos son otras piezas (fotos UGC 900×1600, pasos 1200×900, galería 1500×1500). Por contenido (huella de 16×16 en gris, `tools/assets_match.js`, revisado a ojo), 16 portadas `ct-cover-N.jpg` son las mismas fotos que `carbotiras-ugc-*`: se usan las existentes. `ct-cover-7.jpg` y `ct-cover-13.jpg` no tienen par y se suben. Ningún otro `ct-*` coincide en medidas ni proporción.

## Archivos de la tienda

500 archivos (465 imágenes, 35 videos) al 19-oct. Con nombres de DOMU: athlex* 75, carbotiras* 42, ct-* 0, bank-* 0.

