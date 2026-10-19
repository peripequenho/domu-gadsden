# Bitácora — DOMU sobre Gadsden

Encadenado de punta a punta sin OK por paso (decisión de Gero, 19-oct-2026). Cada paso: plan, qué se verificó, decisiones y pendientes.

## Paso 0 — estado (19-oct-2026)

- Gadsden local `v1.0.1` = `4a8e137`. La copia local tiene plantillas `*.lab*` ignoradas por git: se toma `git archive v1.0.1` (477 archivos).
- Tienda mem1a9-ev: en vivo "DOMU propio (Dawn)" `167661797539`; sin publicar, Horizon `154454491299` y `154455212195` ("theme-export-horneroprep-com…", último guardado 29-abr-2026). Este último es DOMU pero una foto vieja: mismo logo, colores, fuentes y home, sin gps-landing, athlex-landing, carbotiras-nativo, notas ni test de ATHLEX, collection.general/lga ni prod_test_kaching/lga; prod_test de abril; sólo el embed de Judge.me; restos de cleanlab (product.clear4, dermaseal, footly, collection.test) y el script del candado de licencia. Gero decidió que la referencia es el DOMU del 15-oct: ese theme no se usa, no se previsualiza y no se publica.
- Admin API por `shopify store execute`: responde ("Domu Hogar").
- Clarity: **no se pidió el login** para no frenar la cadena; no hay grabaciones de antes del 15-oct en `capturas/original/`. [VERIFICAR] con Gero si quiere sumarlas (vencen ~13-nov).

## Paso 1 — repo y theme (19-oct-2026)

- `theme/` = `git archive v1.0.1` de Gadsden; `.gadsden-base` = `4a8e137…`; `.gitattributes` con LF.
- `tools/secrets.js`: barrido de secretos sobre lo que pone DOMU (config, plantillas, grupos, docs, tools). El código y los locales de Gadsden ya son públicos y quedan fuera (daban falsos positivos con "password" en las traducciones). OK sobre 37 archivos.
- Repo público `peripequenho/domu-gadsden` creado y subido (commit `bb4db01`).
- Theme "DOMU Gadsden" subido sin publicar: **id `167794409635`** (18:16 UTC).

## Paso 2 — inventario (19-oct-2026)

- INVENTARIO.md (+ INVENTARIO-AJUSTES.md) y DIFF-CONTENIDO-15OCT.md generados con `tools/*.js`.
- Productos y colecciones por Admin API: coincide la tabla del pedido (prod_test ×7, prod_test_lga ×39, athlex-landing ×1, carbotiras-nativo ×1); colecciones: `general` ×25 y `frontpage` con la de defecto; **ninguna** con `collection.lga`.
- Páginas: la Admin API no tiene `read_content` (Access denied). Por el storefront: sólo `/pages/contact` (page.contact) y `/pages/nosotros` (page.nosotros) están publicadas. [VERIFICAR] qué páginas usan faq, caracteristicas, track-order, athlex-test y las 4 notas.
- Dawn vivo vs. copia del 15-oct: 0 ediciones de contenido (sólo el `<strong>` del anuncio que perdió el port).
- Archivos: `fileCreate` por staged upload **funciona** (probado con `bank-visa-debit.svg`): no hace falta ARCHIVOS-A-SUBIR.md.

## Pasos 3 y 4 — mapeo y globales (19-oct-2026)

- El mapeo se escribe como código: `tools/translate.js` (motor: registra qué ajustes de Shrine lee cada traductor, valida contra el schema de Gadsden y redondea a min/max/step) y `tools/sections.js` (un traductor por tipo de sección y bloque). Lo que tiene valor distinto del default y nadie leyó sale como "sin traducir" en `tmp/report-*.json`; MAPEO.md se arma de ahí.
- `tools/build_globals.js` → `config/settings_data.json` (202 ajustes, 5 combinaciones de color con la lógica de Dawn viejo, 5 embeds con los mismos ids), grupos y las 4 variantes por mercado (vacías en la referencia: se copian vacías). 0 errores, 0 sin traducir.
- Verificado en la vista previa (1440 y 390): cabecera (anuncio, logo al centro, link activo en pastilla accent-1, panel mobile), pie y cajón (barra, cuenta regresiva, ítem con ahorro, cantidad, nota, cupón, subtotales, botón con total, sellos de pago).
- Arnés: `tools/check.js`. Para las capturas pasa `.gradient` a `background-attachment: scroll` (Dawn lo tiene fijo y en una captura de página entera pinta sólo el primer alto de pantalla; en el navegador acompaña el scroll).

## Paso 5 — páginas y sistema (19-oct-2026)

- `tools/sections_pages.js` (24 tipos de Shrine) + `tools/sections_landings.js` (athlex-nota → gad-article, athlex-test → gad-quiz); `node tools/build_templates.js pages` → 29 plantillas (22 + 7 de clientes). 0 errores, 0 sin traducir.
- Subidas y bajadas de vuelta para confirmar que Shopify las guardó enteras (el texto enriquecido con `<h3>` del test lo acepta).
- Verificado en la vista previa (1440 y 390), todo con 0 errores de Liquid, 0 de JS, sin scroll horizontal y con las secciones en el orden de la referencia: index, contact, nosotros, faq, caracteristicas, track-order, athlex-test, las 4 notas, collection (frontpage), collection.general (hogar y apto-credito-lga), collection.lga (por `?view=lga`), list-collections, search, 404, blog y carrito con un producto (ítem, total y "Pagar pedido").
- Test de ATHLEX probado de punta a punta: los 4 recorridos dan el resultado de DOMU (corte médico, "el que vuelve", "se quedó a vivir", "recién empieza").
- No verificables: `page.json` (ninguna página publicada lo usa), `article` (el blog no tiene artículos), `password` (la tienda no tiene contraseña: /password redirige al inicio) y las cuentas clásicas (la tienda usa las cuentas nuevas de Shopify, `shopify.com/authentication`: `customers/*` no se usan).

## Paso 6 — fichas de producto y landings (19-oct-2026)

- `tools/sections_product.js` (main-product con los bloques que DOMU le sumó), `tools/sections_landings.js` (GPS), `tools/sections_athlex.js` (11 secciones de ATHLEX) y `tools/sections_ct.js` (8 de CarboTiras); `tools/postprocess.js` (custom liquid `asset_url` → `file_url` y los colores del skin de ATHLEX). Las 6 plantillas de producto: 0 errores, 0 sin traducir.
- Archivos subidos por Admin API con su nombre original: 12 `bank-*.svg` del popup de medios de pago, `ct-cara-1..8`, `ct-pack-1..3`, `ct-hero-*`, `ct-paso-1..4`, `ct-ben-1..4`, `ct-cierre-producto.webp`, `ct-comparar-*`, `ct-cover-7/13.jpg` y los 18 `ct-cover-N.mp4` (las otras 16 portadas ya estaban como `carbotiras-ugc-*`). `tools/check_refs.js`: las 156 referencias existen salvo las 6 que ya faltaban en Shrine.
- Verificado en la vista previa (1440 y 390), todas en orden y sin errores de Liquid ni de JS: prod_test (GPS), prod_test_lga (`wa-26236193442723607`), prod_test_kaching (`?view=`), gps-landing (`?view=gps-landing`), athlex (unlisted, por URL) y carbotiras. Kaching (ofertas), Conversion Bear (sellos de pago) y Judge.me (reseñas) cargan. Único 404: `bank-maestro.svg`, roto también en Shrine.
- La plantilla de ATHLEX fue rechazada una vez por Shopify: los metacampos `athlex.*` no tienen definición y no se pueden usar como fuente dinámica. Se cargó el valor que tenían (ver decisiones).

## Decisiones tomadas sin OK

1. Secciones y bloques con `disabled: true` en la referencia no se migran (no se ven en la tienda); quedan listados en INVENTARIO.md. Ejemplo: la sección de collection.general con el bloque de IA `ai_gen_block_f894c2c` (bloque de theme de Shrine).
2. Los dos valores cifrados de la licencia de Shrine en settings_data (`animations_type`, `fav_collection`) no se portan: son del candado de Shrine.
3. El CSS de plataforma de la referencia (`platform_customizations.custom_css`: `sticky-atc.sticky-atc {z-index: 50 !important;}`) no se porta: apunta a un elemento de Shrine que no existe en Gadsden. Ver GAPS-GADSDEN.md.

4. Cabecera mobile como en Shrine (medido en Limbex): menú en panel lateral con "Iniciar sesión", lupa a la derecha y sin ícono de cuenta; link activo en pastilla.
5. Pie: `copyright_text` = "© {año}, {tienda}" + el texto de marca de DOMU, como lo imprime Shrine (medido en Limbex). Suscripción del pie apagada (DOMU no la tenía).
6. Barra de anuncios sin línea debajo (Shrine no tiene ese ajuste) y una sola separación (28px, la de desktop; con un anuncio por vez no se ve). [VERIFICAR] la línea con Gero.
7. Cajón: el relleno del contenedor y del número de la cantidad (0 y 0.7rem) no tienen ajuste propio: se usa el de los botones (0.4rem = 4px). El "quitar" va arriba (como Shrine, medido en Limbex).
8. Colores propios de Shrine (`custom_colors_*`) con la combinación de la sección distinta de "custom" no tienen efecto en Shrine: no se traducen (p. ej. el degradé turquesa guardado en la barra de anuncios, que usa accent-1).
9. Estilo base: Clásico (tipografía y botones de Dawn, como Shrine). Los ajustes que sólo tiene Gadsden quedan en su default de schema (= comportamiento Dawn), no en el preset Clásico 1.0.1.

10. Test de ATHLEX: las 8 preguntas y los 4 resultados estaban escritos dentro de la sección propia de Gero (`athlex-test.liquid`, código de DOMU, no de Shrine), no en ajustes. Se extrajo sólo el texto (`tools/extract_athlex_test.js` → `tools/data/athlex-test.json`) y se cargó en bloques del cuestionario de Gadsden. La lógica de DOMU (corte si la 8 no es "ninguna"; "vuelve" si la 7 es "seguido" o la 6 "volvió"; "instalado" si la 4 es "poco/nada"; si no, "humedad") se reproduce con puntos y el orden de los resultados. Cada opción va "título — descripción" en un renglón (Gadsden no tiene opción en dos líneas).
11. Notas de ATHLEX: el título de los bloques de video va como párrafo en negrita antes del video (como subtítulo entraría en el índice); "Botón suelto" = párrafo + botón; el enlace de la barra fija y del botón se arma con el handle y los parámetros de la nota (`/products/athlex?ref=…`), como en Shrine.
12. `products_per_page` 48 → 36 en las 3 colecciones (máximo de Shopify para Gadsden; ver COMPARACION.md).
13. Imágenes que ya faltaban en Archivos en Shrine (las 5 `horneroprep_*`/`geekey_*` de page.caracteristicas y el logo secundario `Mesa_de_trabajo_1.webp`) se dejan referenciadas igual: se ven vacías, como en Shrine.

14. Custom liquid: único cambio al código de DOMU, `| asset_url` → `| file_url` en las 8 piezas que cargaban imágenes del theme (logos de bancos, caras y packs de CarboTiras), con esos archivos subidos a Archivos con el mismo nombre.
15. Secciones propias de Gero con colores fijos en su CSS (GPS, ATHLEX, CarboTiras): se cargan como "colores propios" del widget de Gadsden con los mismos hex. Los títulos que resaltaban con cursiva (`<em>`, "cursiva = verde/lima") pasan a negrita, que es como resalta Gadsden.
16. Skin de ATHLEX: la sección `athlex-skin` (sólo CSS) va a L19 "Estilo de esta página"; lo que repintaba en las secciones comunes de esa plantilla (cintas, slider, antes/después) se carga en los ajustes de esas secciones, sólo en product.athlex-landing.
17. athlex-dolor = L02 (situaciones) + una sección nueva `dolor-ciencia` con S21 (datos científicos), justo después.
18. Metacampos `athlex.inci`, `athlex.titular` y `athlex.anmat_legajo` sin definición: el aviso legal muestra el valor que tenían el 19-oct (`tools/data/athlex-metafields.json`). Si cambian, crear la definición y conectarlos.
19. Slider de imágenes con diapositivas vacías (las 4 de la landing del GPS): "Mostrar las diapositivas vacías" prendido, porque Shrine las mostraba con el marcador gris (medido en Limbex).
20. Reseñas de CarboTiras: Shrine tenía prendidas las "caras de prueba" (fotos de stock `ct-cara-N.jpg`, no son clientes); se cargan igual como foto de cada reseña.
21. Velocidad de las cintas de Gero (segundos por vuelta) → la más lenta de Gadsden (1).

## Pendientes / [VERIFICAR]

- page.caracteristicas muestra un slideshow con marcadores grises: sus 5 imágenes (de horneroprep) no existen en la tienda, igual que en Shrine.
- Seguimiento de pedido: Gadsden usa el rastreador `t.17track.net` por defecto; el de Shrine no figura en su schema. [VERIFICAR] que sea el que usaba DOMU.

- La meta de envío gratis del cajón es **50** (pesos), igual que en Shrine: con cualquier compra dice "¡Felicidades! Tienes ENVÍO GRATIS!". Se copió igual; revisar si es lo que Gero quiere.

## Paso 7 — comparación, theme check y design review (19-oct-2026)

- `shopify theme check --path theme`: 0 errores, 10 avisos = los 9 de Gadsden 1.0.1 de base + `DeprecatedFontsOnSettingsData` (la fuente de textos de DOMU, `harmonia_sans_n4`, la misma de Shrine, figura como obsoleta en la biblioteca de Shopify).
- MAPEO.md, GAPS-GADSDEN.md y COMPARACION.md generados con `tools/docs.js` desde los traductores y los reportes. Hojas lado a lado en `capturas/comparacion/` (`tools/sheets.sh`); tablet 768 de las 6 plantillas principales.
- DESIGN_REVIEW.md: 1 "must fix" (texto de las reseñas mini de ATHLEX invisible) y 1 "should fix" (promesa del hero de CarboTiras) **arreglados con ajustes** y reverificados; el resto queda para revisar.

## Paso 8 — publicación (19-oct-2026)

- Embeds del Dawn vivo vs. el theme nuevo: idénticos (Judge.me, Clarity, Kaching, MP Antifraud; Clarity brandAgents apagado).
- **Publicado "DOMU Gadsden" (`167794409635`) el 19-oct-2026 a las 19:44 UTC (16:44 hora argentina)** con `shopify theme publish --theme 167794409635 --store mem1a9-ev --force`. "DOMU propio (Dawn)" `167661797539` quedó sin publicar (no se borró).
- Smoke test en producción (sin vista previa, UA real, 390 y 1440): inicio, GPS por `?view=gps-landing`, carbotiras, `wa-26236193442723607`, colección `hogar`, nosotros y 404: todo 200 (404 el 404), sin errores de Liquid ni de JS, secciones en orden. Botón "Agregar al carrito" de la ficha del GPS → cajón abierto con 1 producto; `/cart` con el producto, total $49.999,00 y "Pagar pedido". **Pasó: no hubo que volver atrás.**

## Para revisar

**Qué se publicó y cuándo.** "DOMU Gadsden" (`167794409635`), Gadsden 1.0.1 sin tocar + configuración y contenido de DOMU, en vivo desde el 19-oct-2026 19:44 UTC (16:44 ART).

**Volver al Dawn** (queda en la tienda sin publicar):

```bash
shopify theme publish --theme 167661797539 --store mem1a9-ev --force
```

**Decisiones tomadas sin OK:** las 21 de arriba ("Decisiones tomadas sin OK"). Las que más conviene mirar: 10 (test de ATHLEX pasado a bloques), 14 (`asset_url` → `file_url` en el custom liquid), 15–16 (colores de las landings y skin de ATHLEX como ajustes), 18 (metacampos de ATHLEX como texto fijo), 19–20 (diapositivas vacías del GPS y caras de prueba de CarboTiras, que se copiaron igual).

**GAP** (detalle en GAPS-GADSDEN.md): lista de colecciones con título sobre la imagen, velo y carrusel; volantas de las secciones de ATHLEX y GPS; bloques "día" y "semana" de las notas; piel "portal" y chips de temas de las notas; espejo de respuestas del test; botón de enviar a todo el ancho del formulario de contacto; reseñas destacadas en lima; fuente Barlow de ATHLEX; resaltado menta de la promesa de CarboTiras; tilde "parcial" de la comparativa del GPS; CSS de plataforma `sticky-atc` de Shrine.

**[VERIFICAR]:**
- Qué páginas de la tienda usan faq, caracteristicas, track-order, athlex-test y las 4 notas (la Admin API no tiene permiso de páginas; no están publicadas o no existen con esos nombres).
- `collection.lga`: ninguna colección la tiene asignada.
- Rastreador del seguimiento de pedido (17track por defecto en Gadsden).
- Meta de envío gratis del cajón = 50 pesos (como en Shrine): siempre dice "Tienes ENVÍO GRATIS".
- Puntos del slideshow de la colección y del inicio ("over") arriba de la imagen.
- Beneficios de CarboTiras: la imagen recortada pisa parte de la frase en desktop.
- Barra de anuncios sin línea debajo; línea del pie y cabecera mobile según lo medido en Limbex.
- Plantillas no verificables en la tienda: `page.json`, `article` (el blog no tiene artículos), `password` (la tienda no tiene contraseña) y las de clientes (la tienda usa las cuentas nuevas de Shopify).
- Contenido de prueba que venía de Shrine y se copió igual: "[TODO — …]" en el proceso de ATHLEX, "(DATOS DE PRUEBA)" en sus reseñas, "[DATO: NOMBRE REAL]" en las notas, texto de ejemplo de Dawn en la multicolumna de prod_test y en track-order, slider del GPS sin fotos, `bank-maestro.svg` / `bank-diners-club.svg` con el nombre de archivo mal escrito.
- Referencia visual: no se pidió el login de Clarity; las grabaciones de antes del 15-oct vencen ~13-nov si se quiere comparar.

## Gadsden 1.1.0 y look original de ATHLEX (19-oct-2026)

- Base `v1.1.0` (`ba10c95`, `.gadsden-base`). Los huecos de GAPS-GADSDEN.md entraron a Gadsden como ajustes genéricos (tandas 33–36) y los traductores los usan: volantas (L02–L12, S06, S21, test), lista de colecciones con título sobre la imagen + carrusel + ancho completo, botón de contacto a todo el ancho, pie del desplegable, tabla comparativa con texto arriba + "Característica" + tilde parcial (#8AA2B1), test con opciones en dos líneas + "Lo que contaste", nota "portal" → estilo Diario + temas, ciencia con su animación (bloque Video o imagen de S21), señal del paso 1 del GPS → pulso por ícono, destacadas de las reseñas en lima, promesa de CarboTiras como título con marcador #9FE1CB, fuente Barlow y etiqueta de oferta lima de ATHLEX.
- Pedido de Gero para ATHLEX ("estilizá las secciones como estaban antes"; "usá siempre el original"): referencia = el Dawn sin publicar `167661797539`, comparado sección por sección con `tools/compare_sections.js` (hojas en `capturas/comparacion/athlex-*`, original en `capturas/original/athlex-referencia-dawn-*`). Todo lo que el original hacía con CSS propio entró a Gadsden 1.1.0 como opciones genéricas (tandas 37–41, mapa en `horneroprep-theme\ATHLEX-LOOK-MAPA.md`) y `tools/sections_athlex.js` las usa. Tabla en COMPARACION.md ("ATHLEX: original vs. nuevo").
- Bug encontrado al comparar: `gad-reveal-cards` y otros elementos propios de Gadsden eran `inline` y no pintaban el fondo con colores propios ("dolor" salía beige). Arreglado en Gadsden.
- GAPS-GADSDEN.md: queda el precio en dos columnas y los bloques "día"/"semana" (afuera por decisión de Gero) y el CSS de la barra fija de Shrine (no aplica: verificado en vivo que nada tapa la barra de Gadsden, z 41, en 390 y 1440).
- Duplicado "DOMU Gadsden 1.1.0" `167798571171` (del vivo `167794409635`) con todo subido. Gotcha: `shopify theme duplicate` vuelve antes de terminar de copiar; lo que se sube en ese rato se pisa: volver a subir todo cuando el duplicado tenga las secciones.
- `check.js` en el duplicado: athlex, gps (`?view=gps-landing`: el producto hoy usa la plantilla general, igual que en vivo), carbotiras, `/collections/all`, inicio, contacto, nosotros, test y nota: todas las secciones, sin scroll horizontal, sin errores nuevos (sólo el `bank-maestro.svg` roto de siempre).
- Diferencias chicas que quedan en ATHLEX (en COMPARACION.md): reseñas en 3 columnas (el original 4), la cinta de arriba del muro en píldoras claras (el original, tarjetas tintas) y las tarjetas de "dolor" un poco más altas.
- **Publicado el 19-oct-2026 23:36 UTC (20:36 ART)** con OK de Gero ("Publicá el duplicado…; las tres diferencias chicas quedan anotadas"). Smoke test en producción (`check.js --live`): athlex, gps (`?view=gps-landing`), carbotiras, `/collections/all`, inicio, contacto, nosotros y carrito con todas las secciones, sin scroll horizontal ni errores del theme (sólo el píxel de Clarity, externo, y el `bank-maestro.svg` de siempre). Volver atrás: `shopify theme publish --theme 167794409635 --store mem1a9-ev --force`.

## ATHLEX con sus secciones originales (19/20-oct-2026)

- Pedido de Gero: "toda esta landing es código nuestro, así que podés copypastear para tener los mismos resultados". Las 11 secciones propias de ATHLEX (`athlex-reviews-mini`, `-faq`, `-dolor`, `-mecanismo`, `-uso`, `-ingredientes`, `-proceso`, `-reviews`, `-legal`, `-skin`, `-progreso`) van copiadas tal cual en `theme/sections/` (código de DOMU, no de Shrine; idénticas en la copia del 15-oct y en el Dawn) y la plantilla las usa con sus ajustes originales (`OWN` en `tools/build_templates.js`). Se reemplaza la reproducción con widgets de Gadsden sólo en esa plantilla; las notas y el test siguen con widgets.
- Comparación sección por sección contra el original (Dawn 167661797539) con `tools/compare_sections.js /products/athlex athlex-copia 167661797539 167802372259`: dolor, uso y el resto iguales.
- **Publicado "DOMU ATHLEX original" (`167802372259`) el 20-oct-2026 a las 00:10 UTC (21:10 ART del 19).** Smoke test en producción OK (athlex 16 secciones, inicio, GPS, carbotiras). Vuelta: `shopify theme publish --theme 167798571171 --store mem1a9-ev --force` (DOMU Gadsden 1.1.0).
- Páginas de ATHLEX publicadas por Admin API (permiso `read_content`/`write_content` autorizado por Gero el 20-oct): athlex-test, athlex-sin-cuentos, athlex-carta, athlex-7-cosas y athlex-por-que-vuelve, ya con sus plantillas; las 5 dan 200 en producción.
- Antes/después de ATHLEX igual al de CarboTiras (pedido de Gero): línea elástica con barrido al aparecer, centrado, 360 px, etiquetas legibles. **Publicado "DOMU ATHLEX original v2" (`167802699939`) el 20-oct-2026 00:25 UTC.** Smoke OK. Vuelta: `shopify theme publish --theme 167802372259 --store mem1a9-ev --force`.
- Los fondos de la ficha coinciden con el original (gris claro `#f5f7fa` en ficha y cabecera; papel en el resto): el papel que se veía arriba en el editor era de la versión anterior (skin reproducido con L19).
- **Gero eligió widgets (20-oct):** ATHLEX vuelve a los widgets de Gadsden 1.1.0 con las opciones de las tandas 37–41 (sin código propio en DOMU); se sacaron los `athlex-*.liquid` del theme. El antes/después queda como el de CarboTiras (línea elástica, centrado, 360 px) con la línea y la manija en lima (`line_color: accent`, acento `#93D920`). **Publicado "DOMU Gadsden 1.1.0 (ATHLEX widgets)" (`167802831011`) el 20-oct-2026 00:35 UTC.** Smoke OK (athlex, inicio, GPS, carbotiras, test). Vuelta: `shopify theme publish --theme 167802699939 --store mem1a9-ev --force` (la v2 con las secciones copiadas) o `167798571171` (1.1.0 sin el antes/después nuevo).
- Diferencias que quedan contra el original de ATHLEX (van como opciones de Gadsden, no en DOMU): reseñas en 3 columnas contra 4, cinta del muro en píldoras claras contra tarjetas tintas, tarjetas de "dolor" algo más altas y la manija del antes/después con contorno en vez de círculo lleno.

## Gadsden 1.1.1 (20-oct-2026)

- Base `v1.1.1` (`.gadsden-base`): manija **círculo relleno** del antes/después (`handle_style: filled`, `handle_arrows`). Entran sólo `sections/gad-before-after.liquid`, `config/settings_schema.json` y `CHANGELOG.md`.
- Antes/después de ATHLEX con los colores del original (pedido de Gero: "no me arreglaste los colores"), medidos en `capturas/original/athlex-ba-*`: etiquetas azul `#0B1F3A` con texto claro (`scheme-4`), línea `#93D920` y manija rellena lima con flechas `#1B1B1B`; sigue la animación de CarboTiras (elástica, 360 px). El papel alrededor es el fondo de la página, igual que en el original. Lo que Gero veía raro en el editor era el borrador viejo "DOMU ATHLEX original" (`167802372259`), no el vivo.
- El theme se llama **"Gadsden 1.1.1"** en la tienda (pedido de Gero: que diga Gadsden, no DOMU Gadsden). **Publicado `167803388067` el 20-oct-2026.** Smoke OK (athlex 17 secciones, inicio, carrito, colección; sólo el 404 previo de `bank-maestro.svg`). Vuelta: `shopify theme publish --theme 167802831011 --store mem1a9-ev --force`.

## Gadsden 1.1.2 (20-oct-2026)

- Base `v1.1.2`: en el bloque Precio, letra del precio y de la etiqueta (texto o títulos) y orden "precio anterior arriba" con la etiqueta en una segunda columna.
- Ficha de ATHLEX, pedidos de Gero:
  - precio más grande y en black (Archivo Black, escala 150 %), precio anterior arriba y "Ahorrás" al costado con la letra de los títulos, como el original;
  - cuotas y transferencia "como en MeLi" (15 px; antes 10 px);
  - chips con menos aire horizontal y letra de 12 px.
- Barra de anuncios con letra de 13 px en mobile (antes 10).
- Los cambios al código propio (custom liquid) van como reemplazos exactos en `tools/postprocess.js` (`CL`, `PRICE`).
- **Publicado `167804141731` el 20-oct-2026.** Smoke OK. Vuelta: `shopify theme publish --theme 167803388067 --store mem1a9-ev --force`.

## Gadsden 1.2.0: widgets = código propio (20-oct-2026)

- **Corrección de Gero:** "agarrar el código que metimos a Shrine y meterlo a Gadsden, no replicarlo"; "arreglá los widgets para que sean los del código propio".
- Los widgets de landing de Gadsden pasan a ser el .liquid propio tal cual (`own-code-domu/landings-marca`), con el mismo schema. Sólo cambia el "name".
  - Ejemplos: ct-hero → gad-rotating-hero, athlex-dolor → gad-reveal-cards, gps-steps → gad-icon-content.
  - Nuevos: gad-compare-reveal, gad-reviews-mini, gad-objections, gad-landing-skin, gad-vs-table, gad-marquee, gad-cta-final.
- `tools/build_templates.js` (`OWN_AS`): esas secciones pasan con sus ajustes ORIGINALES, sin traducir, sólo con el tipo cambiado.
  - `OWN_FN`: el antes/después de ATHLEX va en gad-compare-reveal (el de CarboTiras, pedido de Gero) con las fotos y etiquetas de ATHLEX.
- Assets `ct-*` (fotos y videos de CarboTiras, 3 MB) en `theme/assets`, como en el original.
- Estilo base `dawn` (el original era Dawn 16; "clasico" achicaba los h0).
- Título de la ficha con los tamaños del código propio.
- ATHLEX: el precio lo pinta el skin original. Se mantienen lo compacto (pago en 122 px = 15 % de 812) y las cuotas a 13 px en un renglón.
- Verificado con `compare_sections.js` contra el Dawn `167661797539`: hero, pasos, reseñas, tarjetas, comparar, coverflow, garantía y cierre de CarboTiras, todas las secciones de ATHLEX y las 4 de GPS se ven iguales.
  - GPS se probó con `?view=gps-landing`: ningún producto usa esa plantilla.
- **Publicado `167806238883` ("Gadsden 1.2.0").** Vuelta: `167804928163` (1.1.3).

## Gadsden 1.2.1: widgets compartidos con el código propio (20-oct-2026)

- Gero eligió "portá el markup, CSS y JS propios sobre los ids de Gadsden, sin la nomenclatura de Shrine en el repo público".
- Portados sobre el schema de Gadsden: tabla comparativa, pestañas, testimonios y barra de íconos. Comparados con `compare_sections.js` contra el Dawn `167661797539`: iguales.
  - En la tabla, la cruz siempre es un círculo lleno, como en el código propio (su regla general pisa a la "simple").
  - En la barra de íconos, el ícono queda en 24 px.
- Cinta, slider de fotos, hero de diapositivas y seguimiento ya eran equivalentes: no se tocaron.
- El FAQ (collapsible-content) queda como Shrine: caja blanca y "+", según los ajustes originales. La réplica en Dawn no los soportaba.
- `gad-colors`: el texto con colores propios va en color pleno, como `scheme-custom` del código propio.
- Traductores:
  - tildes y cruces: "regular" → simple, el resto → llenas;
  - pestañas: outlined → border, shadow → shadow, el resto → solid (nuevo);
  - íconos de la barra: color del botón;
  - comillas de los testimonios: color del texto de la combinación;
  - la "vista previa" mobile de Shrine ya no asoma vecinos, como el código propio.
- Los ajustes de letra y aire de cuotas y medios de pago (`CL`) se aplican sólo en ATHLEX.
- **Publicado `167806730403` ("Gadsden 1.2.1").** Vuelta: `167806238883` (1.2.0).

## Gadsden 1.2.2 y fondo de ATHLEX (20-oct-2026)

- ATHLEX con el fondo de la marca (pedido de Gero).
  - En Shrine las secciones no pintaban fondo y se veía el papel del skin. En Gadsden pintan la combinación 1.
  - `build_templates.js` suma a la plantilla un `gad-page-style` sólo con colores: papel #E6DFCE, tinta #141210.
- Gadsden 1.2.2, pedido de Gero sobre el slider de CarboTiras:
  - el modo centrado ya no achica ni apaga las vecinas, que era lo que dejaba espacios;
  - en un carrusel se reproducen todos los videos a la vista.
  - El slider de CarboTiras tiene FOTOS (carbotiras-ugc-XX.jpg, igual que en el original): no hay videos con esos nombres en Archivos.
- **Publicado `167807647907` ("Gadsden 1.2.2").** Vuelta: `167806730403` (1.2.1).

## CarboTiras como ATHLEX y Gadsden 1.2.3 (20-oct-2026)

- Pedido de Gero: "lo del precio y del resto de cosas que te dije con ATHLEX, acá también".
- Precio con las opciones de Gadsden (CarboTiras no tiene skin): letra de los títulos, escala 125 %, precio anterior arriba y "Ahorrás" al borde derecho con la letra de los títulos.
- Cuotas en un renglón a 13 px, transferencia a 14 px, chips con menos aire y "Ver medios de pago" compacto (`CL` en `tools/postprocess.js`).
- Sellos "Compra con seguridad" debajo del botón (`AFTER_BUY`, que ahora busca el bloque de compra por tipo).
- Pago en 121 px = 14,9 % de 812.
- El código de cuotas de CarboTiras pintaba el precio y la etiqueta en verde (pedido de Gero, 6-oct) con selectores de Shrine que en Gadsden no aplican. Quedan con los colores de la combinación: Gero decidió dejarlos así (20-oct).
- Gadsden 1.2.3: en "precio anterior arriba", la etiqueta va al borde derecho y no hay espacio entre los dos precios.
- **Publicado `167810465955` ("Gadsden 1.2.3").** Vuelta: `167807647907` (1.2.2).

## Gadsden 1.2.4 (20-oct-2026)

- Pedido de Gero sobre CarboTiras:
  - el chip de ahorro, bien acomodado: queda centrado respecto de los dos precios, sin el margen de abajo de Dawn;
  - la barra fija, con el botón grande abajo y los datos arriba: opción nueva `m_stack` del bloque, prendida en CarboTiras desde `tools/postprocess.js`.
- **Publicado `167810826403` ("Gadsden 1.2.4").** Vuelta: `167810465955` (1.2.3).

## Gadsden 1.2.5: barra fija como Shrine (20-oct-2026)

- Gero: "en el sticky fijate cómo está en Shrine y hacelo igual, que es código nuestro".
- En Shrine, "botón a todo el ancho" en mobile pone el botón en su propia fila, abajo. Ahora el traductor lo pasa a `m_stack` en todas las fichas que lo tenían.
- El CSS propio de la barra (en el bloque de cuotas de CarboTiras) apuntaba a clases de Shrine (`.sticky-atc`). Va reescrito sobre `gad-sticky-bar` (`CL`): CTA en un renglón con `clamp(14px, 4.2vw, 18px)` y la barra que entra recién con el primer scroll (clase `ctb-scrolleo` del script propio).
- El precio y el chip verdes de ese CSS no se portan: Gero decidió dejar los colores como están.
- Chip "Ahorrás": va a la altura del precio actual (Gadsden 1.2.5: `align-self: flex-end`), no entre los dos precios.
- **Publicado `167811842211` ("Gadsden 1.2.5").** Vuelta: `167810826403` (1.2.4).

## Gadsden 1.2.6 (21-oct-2026)

- Pedido de Gero sobre el precio de CarboTiras:
  - "la etiqueta centrala un toque más": queda centrada con el precio actual (medido: los centros coinciden en 420 px);
  - "el de comparación, mitad del tamaño del normal": 0,5 em del precio actual, 8 px contra 16 en mobile y 9 contra 18 en desktop.
- **Publicado `167834222755` ("Gadsden 1.2.6").** Vuelta: `167811842211` (1.2.5).

## Limpieza de themes (21-oct-2026)

- Pedido de Gero: "eliminame las versiones, dejá las últimas dos y los originales". Se borraron 15 themes (DOMU Gadsden 1.0.1 a Gadsden 1.2.4, incluidos los intentos de ATHLEX).
- Quedan: 1.2.6 (en vivo), 1.2.5, DOMU propio (Dawn), el export de abril y Horizon.

## Gadsden 1.2.7: galería en bucle (21-oct-2026)

- Pedido de Gero: la galería de la ficha en bucle, a nivel global del theme y no en un solo lugar.
- Ajuste global `product_gallery_loop` (Gadsden · Carruseles), prendido en DOMU desde `build_globals.js`.
  - En el slider de mobile, pasar de la última foto vuelve a la primera y al revés, con las flechas y deslizando.
  - En desktop las flechas de la foto principal ya daban la vuelta.
- Probado en la vista previa: siguiente desde la última da 2250 → 0, deslizar a la izquierda en la última da 2250 → 0, y deslizar a la derecha en la primera da 0 → 2250.
- **Publicado `167835435171` ("Gadsden 1.2.7").** Vuelta: `167834222755` (1.2.6).
