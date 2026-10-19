# Comparación por plantilla

No hay referencia visual del DOMU de Shrine (el theme se borró el 15-oct, el Wayback Machine no tiene capturas y no se pidió el login de Clarity): el 1 a 1 se mide por **configuración** (cada ajuste usado, traducido con su valor; ver MAPEO.md) y por **funcionamiento** en la vista previa del theme nuevo. Las capturas desktop (1440) y mobile (390) de cada plantilla están en `capturas/nuevo/`; las hojas lado a lado, en `capturas/comparacion/`.

| Plantilla | Verificada | Secciones | Liquid / JS | Scroll horizontal | Aproximado | GAP |
|---|---|---|---|---|---|---|
| 404 | sí | 2 | OK | no | 1 | 0 |
| article | no (ver BUILD-DOMU.md) | — | — | — | 1 | 0 |
| blog | sí | 2 | OK | no | 1 | 0 |
| cart | sí | 3 | OK | no | 0 | 0 |
| collection | sí | 3 | OK | no | 1 | 0 |
| collection.general | sí | 2 | OK | no | 1 | 0 |
| collection.lga | sí | 4 | OK | no | 1 | 0 |
| index | sí | 4 | OK | no | 0 | 0 |
| list-collections | sí | 2 | OK | no | 1 | 0 |
| page | no (ver BUILD-DOMU.md) | — | — | — | 1 | 0 |
| page.athlex-nota-6cosas | sí | 1 | OK | no | 4 | 0 |
| page.athlex-nota-carta | sí | 1 | OK | no | 3 | 0 |
| page.athlex-nota-investigativa | sí | 1 | OK | no | 3 | 0 |
| page.athlex-nota-sincuentos | sí | 1 | OK | no | 3 | 0 |
| page.athlex-test | sí | 1 | OK | no | 1 | 0 |
| page.caracteristicas | sí | 1 | OK | no | 0 | 0 |
| page.contact | sí | 1 | OK | no | 0 | 0 |
| page.faq | sí | 1 | OK | no | 0 | 0 |
| page.nosotros | sí | 12 | OK | no | 0 | 0 |
| page.track-order | sí | 2 | OK | no | 0 | 0 |
| password | no (ver BUILD-DOMU.md) | — | — | — | 0 | 0 |
| product.athlex-landing | sí | 17 | OK | no | 6 | 1 |
| product.carbotiras-nativo | sí | 13 | OK | no | 6 | 0 |
| product.gps-landing | sí | 9 | OK | no | 4 | 0 |
| product.prod_test | sí | 3 | OK | no | 1 | 0 |
| product.prod_test_kaching | sí | 2 | OK | no | 1 | 0 |
| product.prod_test_lga | sí | 2 | OK | no | 1 | 0 |
| search | sí | 2 | OK | no | 1 | 0 |

Avisos esperados que no cuentan: `bank-maestro.svg` (roto también en Shrine: el archivo es `bank-mastro.svg`) y el 404 de la página de prueba del 404.

## Valores redondeados al rango de Gadsden

- collection.general#main-collection-product-grid (main-collection-product-grid → main-collection-product-grid): `products_per_page` 48 → 36 (rango 8..36 paso 1)
- collection#main-collection-product-grid (main-collection-product-grid → main-collection-product-grid): `products_per_page` 48 → 36 (rango 8..36 paso 1)
- collection.lga#main-collection-product-grid (main-collection-product-grid → main-collection-product-grid): `products_per_page` 48 → 36 (rango 8..36 paso 1)

## Aproximaciones (lo que entra, pero no igual)

- settings_data/cart-drawer > 097b7b4f-c0b8-4073-a06b-e6d49a5aad20 (cart_items): cantidad: relleno del contenedor 0rem y del número 0.7rem sin ajuste propio en Gadsden (se usa el de los botones, 0.4rem = 4px)
- header-group.json#fe1c8c67-b84c-4466-a515-70df3134c1c0 (announcement-bar): separación entre anuncios: Gadsden tiene una sola (28px); la de mobile de Shrine era 16px y con un anuncio por vez no se ve
- 404#newsletter (newsletter): botón "Sign up" lleno: Gadsden lo pone debajo del campo ("below")
- article#newsletter (newsletter): botón "Sign up" lleno: Gadsden lo pone debajo del campo ("below")
- blog#newsletter (newsletter): botón "Sign up" lleno: Gadsden lo pone debajo del campo ("below")
- list-collections#newsletter (newsletter): botón "Sign up" lleno: Gadsden lo pone debajo del campo ("below")
- page.athlex-nota-6cosas#nota > b00 (imagen): texto alternativo "Pared de lockers en un vestuario": en Gadsden sale del archivo (Contenido > Archivos)
- page.athlex-nota-6cosas#nota > b11 (imagen): texto alternativo "Una persona poniéndose una media antes de terminar de vestirse": en Gadsden sale del archivo (Contenido > Archivos)
- page.athlex-nota-6cosas#nota > b19 (caja): caja de producto: en Shrine el botón llevaba a la ficha con la marca de la nota; en Gadsden agrega al carrito
- page.athlex-nota-6cosas#nota > b26 (caja): caja de producto: en Shrine el botón llevaba a la ficha con la marca de la nota; en Gadsden agrega al carrito
- page.athlex-nota-carta#nota > b00 (imagen): texto alternativo "Una mano sosteniendo un teléfono con un texto largo en pantalla": en Gadsden sale del archivo (Contenido > Archivos)
- page.athlex-nota-carta#nota > b16 (imagen): texto alternativo "Una persona poniéndose una media antes de terminar de vestirse": en Gadsden sale del archivo (Contenido > Archivos)
- page.athlex-nota-carta#nota > b22 (caja): caja de producto: en Shrine el botón llevaba a la ficha con la marca de la nota; en Gadsden agrega al carrito
- page.athlex-nota-investigativa#nota > b02 (imagen): texto alternativo "Una mano sosteniendo un teléfono encendido en la oscuridad": en Gadsden sale del archivo (Contenido > Archivos)
- page.athlex-nota-investigativa#nota > b17 (imagen): texto alternativo "Una persona poniéndose una media antes de terminar de vestirse": en Gadsden sale del archivo (Contenido > Archivos)
- page.athlex-nota-investigativa#nota > b32 (caja): caja de producto: en Shrine el botón llevaba a la ficha con la marca de la nota; en Gadsden agrega al carrito
- page.athlex-nota-sincuentos#nota > b00 (imagen): texto alternativo "Pared de lockers en un vestuario": en Gadsden sale del archivo (Contenido > Archivos)
- page.athlex-nota-sincuentos#nota > b11b (imagen): texto alternativo "Una persona poniéndose una media antes de terminar de vestirse": en Gadsden sale del archivo (Contenido > Archivos)
- page.athlex-nota-sincuentos#nota > b30 (caja): caja de producto: en Shrine el botón llevaba a la ficha con la marca de la nota; en Gadsden agrega al carrito
- page.athlex-test#test: preguntas y resultados pasados a bloques desde la sección propia (tools/data/athlex-test.json); opciones "título — descripción" en dos líneas; volanta y "Lo que contaste" con los ajustes de Gadsden 1.1.0 (el resumen muestra la pregunta arriba de cada respuesta; Shrine listaba sólo las respuestas)
- page#newsletter (newsletter): botón "Sign up" lleno: Gadsden lo pone debajo del campo ("below")
- product.athlex-landing#main > custom_liquid_NbFHWK: custom liquid con 7 `asset_url` → `file_url` (imágenes en Archivos)
- product.athlex-landing#reviews-mini (athlex-reviews-mini): velocidad: Shrine 40 s por vuelta; Gadsden va de 1 a 5 (se usa 1)
- product.athlex-landing#horizontal_ticker_Bwfdhe: colores del skin de ATHLEX (custom_colors, cc_bg, cc_text, uppercase, text_size_m, text_size_d)
- product.athlex-landing#image_slider_k6hTQm: colores del skin de ATHLEX (custom_colors, cc_bg, cc_text, radius_d, radius_m)
- product.athlex-landing#horizontal_ticker_qxD6nk: colores del skin de ATHLEX (custom_colors, cc_bg, cc_text, uppercase, text_size_m, text_size_d)
- product.athlex-landing#comparison_slider_9qeVzq: colores del skin de ATHLEX (custom_colors, cc_bg, cc_text)
- product.athlex-landing#legal (athlex-legal): contenido neto: Shrine leía primero el metacampo athlex.contenido_neto (hoy "120 ml", igual que el ajuste). INCI, titular y ANMAT salen de metacampos sin definición: se cargan como texto con el valor del 19-oct (si cambian, crear la definición y conectarlos)
- product.carbotiras-nativo#hero (ct-hero): alto de las fotos: Shrine 15vh al 100 % del ancho; Gadsden en px (280); espacio fotos-texto 220px y fondo corrido 0px sin ajuste; texto de arriba 13px
- product.carbotiras-nativo#pasos (ct-pasos): el texto chico de arriba ("Cómo se usan") va como texto; tamaño de imagen 104px y color de resaltado #9fe1cb sin ajuste propio
- product.carbotiras-nativo#resenas_ui (ct-resenas): avatares: Shrine usaba "caras de prueba" (ct-cara-N.jpg, fotos de stock que no son clientes): se cargan igual como foto de cada reseña. Para revisar
- product.carbotiras-nativo#beneficios (ct-beneficios): tamaño de imagen 148px (Gadsden en %: 70) y "bajar la imagen" por tarjeta sin ajuste
- product.carbotiras-nativo#main > rating: custom liquid con 1 `asset_url` → `file_url` (imágenes en Archivos)
- product.carbotiras-nativo#main > medios-pago: custom liquid con 7 `asset_url` → `file_url` (imágenes en Archivos)
- product.carbotiras-nativo#main > kaching-estilo: custom liquid con 3 `asset_url` → `file_url` (imágenes en Archivos)
- product.carbotiras-nativo#comparar (ct-comparar): proporción 4 / 5 y redondeo 20px sin ajuste propio (Gadsden: el de los medios)
- product.carbotiras-nativo#cierre (ct-cierre): "Pie de la imagen" de Gadsden = texto chico de Shrine ("Para los que no largan el mate"): [VERIFICAR] ubicación; mancha #f1dc9c → color inicial del resaltador
- product.gps-landing#main > custom_liquid_HmMNDc: custom liquid con 7 `asset_url` → `file_url` (imágenes en Archivos)
- product.gps-landing#icon_bar_qH6Jxb (icon-bar): color de íconos background-2 → acento
- product.gps-landing#gps_steps_peKf7E (gps-steps): la nota va como segundo párrafo del texto, arriba de los pasos (en Shrine iba abajo, en caja con radar animado)
- product.gps-landing#gps_marquee (gps-marquee): velocidad: Shrine 34 s por vuelta; Gadsden va de 1 a 5 (se usa 1, la más lenta). [VERIFICAR] el color del relleno (#EEF4EF en Shrine; en Gadsden sale del color del texto)
- product.gps-landing#gps_cta (gps-cta): la píldora de oferta va como bajada (Gadsden no tiene píldora con borde en el texto enriquecido)
- product.prod_test#main > text_iG6Kng (text): texto con íconos: separación y relleno calculados con la letra de mobile (14px); en desktop Shrine los agrandaba con la letra (16px)
- product.prod_test#main > custom_liquid_HmMNDc: custom liquid con 7 `asset_url` → `file_url` (imágenes en Archivos)
- product.prod_test_kaching#main > text_iG6Kng (text): texto con íconos: separación y relleno calculados con la letra de mobile (14px); en desktop Shrine los agrandaba con la letra (16px)
- product.prod_test_kaching#main > custom_liquid_HmMNDc: custom liquid con 7 `asset_url` → `file_url` (imágenes en Archivos)
- product.prod_test_lga#main > text_iG6Kng (text): texto con íconos: separación y relleno calculados con la letra de mobile (14px); en desktop Shrine los agrandaba con la letra (16px)
- product.prod_test_lga#main > custom_liquid_HmMNDc: custom liquid con 7 `asset_url` → `file_url` (imágenes en Archivos)
- search#newsletter (newsletter): botón "Sign up" lleno: Gadsden lo pone debajo del campo ("below")

## ATHLEX: original vs. nuevo, sección por sección (19-oct-2026)

Pedido de Gero: "en el de athlex estilizá las secciones como estaban antes" y "Usá siempre el original". Original = el Dawn sin publicar "DOMU propio (Dawn)" (`167661797539`), que todavía tiene las secciones propias de ATHLEX con su CSS (mismo contenido que la copia de Shrine del 15-oct). Nuevo = "DOMU Gadsden 1.1.0" (`167798571171`). Capturas del original: `capturas/original/athlex-referencia-dawn-d.png` y `-m.png`. Hojas lado a lado (izquierda original, derecha nuevo): `capturas/comparacion/athlex-<sección>-d.jpg` y `-m.jpg`, con `node tools/compare_sections.js /products/athlex athlex 167661797539 167798571171`.

Todo lo que el original hacía con CSS propio entró en Gadsden 1.1.0 como opciones genéricas (tandas 37–41: estilo de página, encabezados y una o más por widget); DOMU sigue sin código propio. La landing usa esas opciones desde `tools/sections_athlex.js`.

| Sección | Cómo quedó | Diferencias chicas que quedan |
|---|---|---|
| Común | página de 1200, títulos Archivo Black en mayúsculas inclinados (más chicos en mobile), volanta en etiqueta tinta (claras) o lima (oscuras), resaltado con marcador lima en las claras, texto pleno, bordes de 2 px y esquinas rectas, trama de puntos y línea entre secciones | — |
| Ficha (main) | galería, íconos, título, precio, cuotas, bloque oscuro, botón y etiqueta de oferta lima | precio en dos columnas (afuera por decisión de Gero) |
| faq | volanta en etiqueta, título con marcador, desplegable en caja con la fila abierta en lima, texto al pie | — |
| dolor | fondo tinta, volanta lima, frase de las tarjetas con la letra de los títulos, al medio, flecha lima | tarjetas un poco más altas |
| dolor (ciencia) | animación al costado, datos en cajas numeradas, los dos de "salida" en franja lima con el ícono al costado | — |
| mecanismo | video del ancho de la página con borde (a todo el ancho en mobile), sellos en caja con la palabra grande, alternados y el último con marcador, remate en franja lima | — |
| uso | encabezado centrado (izquierda en mobile), cronómetro en etiqueta tinta con números lima, panel lima, nota en caja con ícono, vista previa del siguiente en mobile | — |
| ingredientes | primer póster más ancho, alto fijo de 440, títulos lima, datos en filas, desplegable en caja, sello en franja lima | — |
| proceso | escenario a la izquierda y etapas a la derecha (la activa invertida), "Etapa 1" en lima, 7:6 en desktop y 4:5 en mobile | — |
| reseñas | promedio a la izquierda, cinta, fotos 3:4, destacada en lima, botón "Ver más reseñas (5)" lleno e inclinado | 3 columnas (el original 4: con 6 reseñas Gadsden reparte en columnas y dejaría la cuarta vacía); la cinta de arriba va en píldoras claras (en el original, tarjetas tintas) |
| aviso legal | aviso, desplegable con el título en lima y mayúsculas, línea de datos en mayúsculas debajo | — |

