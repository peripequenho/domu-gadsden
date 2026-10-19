# Design Review: DOMU sobre Gadsden (todas las plantillas)

Reviewed against: la configuración de DOMU en Shrine (MAPEO.md); no hay DESIGN_BRIEF ni capturas del original.
Philosophy: la de DOMU tal como estaba (marca DOMU azul marino `#0B1F3A` + fondo `#F5F7FA`, Poppins/Harmonia Sans; landings con identidad propia: GPS verde/azul, ATHLEX papel/tinta/lima, CarboTiras blanco/negro con menta).
Date: 19-oct-2026

## Screenshots Captured

Capturas con Chrome sin ventana (UA real, reducir movimiento en no-preference), en la vista previa del theme `167794409635`. La convención del repo es `capturas/` (no `.design/`).

| Screenshot | Breakpoint | Description |
|---|---|---|
| `capturas/nuevo/<plantilla>-d.jpg` | Desktop 1440 | página entera, 29 plantillas |
| `capturas/nuevo/<plantilla>-m.jpg` | Mobile 390 | página entera, 29 plantillas |
| `capturas/nuevo/<plantilla>-t.jpg` | Tablet 768 | index, collection, page.nosotros, product.gps-landing, product.athlex-landing, product.carbotiras-nativo |
| `capturas/nuevo/cajon-m.jpg` | Mobile 390 | cajón del carrito abierto con un producto |
| `capturas/comparacion/<plantilla>.jpg` | Desktop + mobile | hoja lado a lado |

Estados probados además de las capturas: cajón del carrito abierto, página de carrito con producto, los 4 recorridos del test de ATHLEX (corte médico y 3 resultados).

## Summary

Todas las plantillas renderizan completas, en el orden de la referencia, sin errores de Liquid ni de JS y sin scroll horizontal en 390, 768 y 1440. Cada landing conserva su identidad visual con los colores propios de los widgets de Gadsden. Lo que no iguala a Shrine está listado en GAPS-GADSDEN.md: volantas, la lista de colecciones con título sobre la imagen y la fuente Barlow de ATHLEX.

## Must Fix

1. **Reseñas mini de ATHLEX sin texto visible**: la tarjeta tomaba el texto de scheme-1 (casi negro) sobre el fondo `#0D0C0A`. Ver `capturas/nuevo/product.athlex-landing-d.jpg`. _Arreglado con ajustes: combinación de la tarjeta → scheme-3 (texto claro)._

## Should Fix

1. **Hero de CarboTiras con la promesa chica**: con el titular vacío, Shrine usaba la promesa como título h0. _Arreglado con ajustes: la promesa va como título y "7 días" como palabra fija; el resaltado menta queda como GAP._
2. **Puntos del slideshow de la colección** (`collection`, desktop "over"): se ven arriba de la imagen, no encima. Ver `capturas/comparacion/collection.jpg`. _[VERIFICAR] con Gero; es comportamiento de Gadsden con `pagination_d: over`._
3. **Barra de íconos del inicio en tablet**: "PERSONALIZADO" se corta en la cuarta columna a 768. Ver `capturas/nuevo/index-t.jpg`. _Sin ajuste de tamaño de texto por corte en Gadsden: anotado._
4. **Beneficios de CarboTiras**: la imagen recortada tapa parte de la frase en desktop (Shrine: imagen de 148 px; Gadsden: 70 % de la tarjeta). Ver `capturas/nuevo/product.carbotiras-nativo-d.jpg`. _[VERIFICAR] si en Shrine también se pisaban; si no, bajar "Tamaño de la imagen" en el editor._

## Could Improve

1. Colección `frontpage` sin productos ("No se encontró ningún producto"): es contenido de la tienda, no del theme.
2. Slider de la landing del GPS con 4 diapositivas vacías (marcador gris), como en Shrine: conviene cargarle fotos o sacarlo.
3. Textos de prueba que vienen de Shrine y se copiaron igual: "[TODO — escribir…]" en el proceso de ATHLEX, "(DATOS DE PRUEBA)" en sus reseñas, "[DATO: NOMBRE REAL]" en las notas, texto de ejemplo en la multicolumna de prod_test y en track-order.

## What Works Well

- Cabecera, pie y cajón iguales en todas las páginas, con la paleta de 5 combinaciones derivada de los colores de DOMU.
- Fichas: Kaching, Conversion Bear y Judge.me cargan en el mismo lugar; los 33 custom liquid se dibujan, incluido el popup de medios de pago con los logos desde Archivos.
- ATHLEX: L19 reproduce el skin (fondo papel, títulos Archivo Black inclinados, botón lima sin redondeo) sin CSS propio.
- Test de ATHLEX: misma lógica de resultados que el original.
