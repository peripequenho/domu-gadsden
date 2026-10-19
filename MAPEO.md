# Mapeo Shrine (DOMU) → Gadsden 1.1.0

Niveles: **N0** = sale con ajustes de Gadsden; **GAP** = algo de Shrine sin ajuste equivalente (detalle en [GAPS-GADSDEN.md](GAPS-GADSDEN.md)). DOMU no tiene N1 ni N2: nada de CSS ni secciones propias.

El mapeo es código: cada fila sale de un traductor de `tools/sections*.js` (`build_globals.js` para los globales). El motor (`tools/translate.js`) lee los ajustes efectivos de Shrine (default del schema + lo guardado), registra cuáles usó el traductor, valida contra el schema de Gadsden (ids, opciones, min/max/step) y reporta lo que quedó sin traducir. Resultado de la última corrida: **0 errores, 0 ajustes sin traducir**.

## Ajustes globales

| Shrine | Gadsden | Nota |
|---|---|---|
| Paleta de 5 colores (`colors_*`, `gradient_*`) y esquemas fijos background-1, background-2, inverse, accent-1, accent-2 | `color_schemes` scheme-1..5 | misma lógica de Dawn viejo (fondo, texto, botón, etiqueta del botón, botón de contorno); los degradés de accent-1/2 como degradé de la combinación |
| Logo, logo secundario, anchos 110/50, favicon | `logo`, `logo_secondary`, `logo_width`, `logo_width_mobile`, `favicon` | |
| Poppins 700 / Harmonia Sans 400, escalas, interlineados, interletrado | mismos ids | Estilo base: Clásico |
| Animación de entrada (`enable_load_animations`, `animation_*`) | `animations_reveal_on_scroll`, `reveal_*` | mismos valores |
| Botones, píldoras, campos, tarjetas (producto, colección, blog), cajas, medios, popups, drawers | mismos ids de Dawn | |
| Hover de botones (glow / center / left / arrow) | `button_fx_link`, `button_fx_action` | center → fill-center, left → fill-left |
| Selectores (`pickers_*`), cantidad (`quantity_*`), píldoras de variantes, muestras | `dd_*`, `q_*`, `pill_*`, `swatch_*` | colores sueltos → rol (text → foreground, accent-1 → accent); redondeo de muestras 0–100 % → 0–50 % |
| Flechas y puntos de los sliders (`slider_arrow_*`, `pagination_dot_*`) | `carousel_arrow_*`, `carousel_dot_*`; corte de desktop 750 px | flecha 30 × 1,05 = 32 px (Shrine mide en rem, medido en Limbex) |
| Etiquetas (posición, redondeo, combinaciones, texto "Ahorras [percentage]!", etiquetas propias) | `badge_*`, `card_badge_position`, `sale_label_text` (`{porcentaje}`), `card_badges_tags` | |
| Carrito (tipo, ícono bag_2, nota, seguir comprando) | `cart_type`, `cart_icon: bag-2`, … | |
| Volver arriba (sección fija) | `back_to_top_*` (global) | |
| Proteger contenido (`disable_inspect`), países (lista vacía) | `protect_content`, `geo_mode: off` | |
| Barra de scroll, cursor | `custom_scrollbar`, `scrollbar_*`, `cursor_image` | |
| `animations_type`, `fav_collection` | — | candado de licencia de Shrine: no se migra |
| `checkout_*_color` | — | sin efecto (el checkout tiene su editor) |
| Globales viejos del carrito (`enable_cart_timer`, `cart_progress_*`, `cart_upsell_*`) | — | sin schema en Shrine 1.3.0; el cajón va por bloques |
| App embeds (Judge.me, Clarity ×2, Kaching Bundles, MP Antifraud) | `current.blocks` con los mismos ids | Clarity brandAgents sigue apagado |

## Secciones y bloques

| Shrine | Gadsden | Nivel | Bloques (Shrine → Gadsden) |
|---|---|---|---|
| `announcement-bar` | `announcement-bar` | N0 | announcement → announcement, discount → coupon, socials → social |
| `apps` | `apps` | N0 | — |
| `athlex-dolor` | `gad-reveal-cards` + `gad-icon-content` | N0 | punal → card, dato → (no se migra) |
| `athlex-faq` | `collapsible-content` | N0 | qa → collapsible_row |
| `athlex-ingredientes` | `gad-posters` | N0 | equipo → poster |
| `athlex-legal` | `gad-legal` | N0 | (armados desde datos) |
| `athlex-mecanismo` | `gad-stamps` | N0 | sello → stamp |
| `athlex-nota` | `gad-article` | N0 | subtitulo → subtitle, parrafo → paragraph, destacado → highlight, imagen → image, firma → signature, test → quiz_bridge, versus → versus, ciclo → cycle, video → video, tira → strip, indice → index, citas → quotes, cta → button, caja → product_box, dia → (no se migra), semana → (no se migra) |
| `athlex-proceso` | `gad-chapters` | N0 | etapa → chapter |
| `athlex-progreso` | `gad-reading-progress` | N0 | — |
| `athlex-reviews` | `gad-reviews-wall` | N0 | resena → review |
| `athlex-reviews-mini` | `gad-ticker` | N0 | destacado → review |
| `athlex-skin` | `gad-page-style` | N0 + GAP | — |
| `athlex-test` | `gad-quiz` | N0 | (armados desde datos) |
| `athlex-uso` | `gad-timed-steps` | N0 | paso → step |
| `cart-drawer` | `cart-drawer` | N0 | progress_bar → progress, checkpoints_bar → milestones, countdown_timer → countdown, cart_items → items, cart_note → note, discount_field → coupon, subtotals → subtotals, checkout_btn → checkout, payment_badges → payment_icons, custom_liquid → custom, image → image |
| `collapsible-content` | `collapsible-content` | N0 | collapsible_row → collapsible_row |
| `collection-list` | `collection-list` | N0 | featured_collection → featured_collection |
| `comparison-slider` | `gad-before-after` | N0 | — |
| `comparison-table` | `gad-compare-table` | N0 | row → row |
| `contact-form` | `contact-form` | N0 | field_row → fields, textarea → textarea |
| `content-tabs` | `gad-tabs` | N0 | tab → tab |
| `ct-beneficios` | `gad-cropped-cards` | N0 | beneficio → card |
| `ct-cierre` | `gad-closing` | N0 | — |
| `ct-comparar` | `gad-before-after` | N0 | — |
| `ct-coverflow` | `gad-coverflow` | N0 | video → video |
| `ct-garantia` | `gad-guarantee` | N0 | — |
| `ct-hero` | `gad-rotating-hero` | N0 | — |
| `ct-pasos` | `gad-auto-steps` | N0 | paso → step |
| `ct-resenas` | `gad-review-rows` | N0 | resena → review |
| `custom-liquid` | `custom-liquid` | N0 | — |
| `email-signup-banner` | `email-signup-banner` | N0 | heading → heading, paragraph → paragraph, email_form → email_form |
| `featured-collection` | `featured-collection` | N0 | — |
| `footer` | `footer` | N0 | link_list → link_list, brand_information → brand_information, text → text, image → image, email_signup → newsletter, featured_product → product, featured_collection → collection |
| `global-music-player` | `gad-music-global` | N0 | — |
| `gps-comparativa` | `gad-compare-table` | N0 | row → row |
| `gps-cta` | `rich-text` | N0 | (armados desde datos) |
| `gps-marquee` | `gad-ticker` | N0 | (armados desde datos) |
| `gps-steps` | `gad-icon-content` | N0 | step → item |
| `header` | `header` | N0 | — |
| `horizontal-ticker` | `gad-ticker` | N0 | text → text, image → image, reviews → review, text_with_icon → text_icons, icon_with_content → icon_content |
| `icon-bar` | `gad-icon-bar` | N0 | column → icon |
| `image-slider` | `gad-media-slider` | N0 | image_slide → image_slide, video_slide → video_slide |
| `image-with-text` | `image-with-text` | N0 | heading → heading, caption → caption, text → text, button → button, rating_stars → stars, trustpilot_stars → trustpilot, image → image, atc_button → atc |
| `main-404` | `main-404` | N0 | — |
| `main-account` | `main-account` | N0 | — |
| `main-activate-account` | `main-activate-account` | N0 | — |
| `main-addresses` | `main-addresses` | N0 | — |
| `main-article` | `main-article` | N0 | featured_image → featured_image, title → title, content → content, share → share |
| `main-blog` | `main-blog` | N0 | — |
| `main-cart-footer` | `main-cart-footer` | N0 | subtotal → subtotal, buttons → buttons, discount_field → coupon |
| `main-cart-items` | `main-cart-items` | N0 | — |
| `main-collection-product-grid` | `main-collection-product-grid` | N0 | — |
| `main-list-collections` | `main-list-collections` | N0 | — |
| `main-login` | `main-login` | N0 | — |
| `main-order` | `main-order` | N0 | — |
| `main-page` | `main-page` | N0 | — |
| `main-password-footer` | `main-password-footer` | N0 | — |
| `main-password-header` | `main-password-header` | N0 | — |
| `main-product` | `main-product` | N0 | title → title, price → price, variant_picker → variant_picker, quantity_selector → quantity_selector, buy_buttons → buy_buttons, custom_liquid → custom_liquid, collapsible_tab → collapsible_tab, image → image, emoji_benefits → benefits, text → text_icons, sticky_atc → sticky_bar, reviews → reviews |
| `main-register` | `main-register` | N0 | — |
| `main-reset-password` | `main-reset-password` | N0 | — |
| `main-search` | `main-search` | N0 | — |
| `multicolumn` | `multicolumn` | N0 | column → column |
| `multirow` | `multirow` | N0 | row → row |
| `newsletter` | `newsletter` | N0 | heading → heading, paragraph → paragraph, email_form → email_form |
| `promo-popup` | `gad-promo-popup` | N0 | — |
| `rich-text` | `rich-text` | N0 | heading → heading, caption → caption, text → text, button → button, rating_stars → stars, trustpilot_stars → trustpilot, atc_button → atc |
| `slideshow` | `slideshow` | N0 | slide → slide |
| `slideshow-hero` | `gad-hero-slides` | N0 | slide → slide |
| `testimonials` | `gad-testimonials` | N0 | column → testimonial |
| `track-order` | `gad-track-order` | N0 | — |

Las secciones propias de Gero (athlex-*, ct-*, gps-*) se mapean según LANDINGS-MAPA.md / V1-MATRIZ.md c.2 de Gadsden; los bloques sticky_atc, emoji_benefits, reviews y text de la ficha, según V1-MATRIZ.md c.5. Los ids de sección y de bloque son los de la referencia (salvo los bloques que en Shrine no existían como tales: preguntas y resultados del test, filas del aviso legal, palabras de la cinta gigante, bloques del cierre del GPS y la sección `dolor-ciencia`).
