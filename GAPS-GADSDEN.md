# Lo que Gadsden no tiene (GAP)

Ajustes o comportamientos de DOMU en Shrine sin equivalente en Gadsden 1.1.0. **No se parchean en el theme de DOMU** (Gadsden nativo). Los huecos que dejó la migración sobre la 1.0.1 (volantas, lista de colecciones, botón de contacto, pie del desplegable, tabla comparativa, test, nota, señal de los pasos, destacadas, promesa, fuente y etiqueta de ATHLEX) se sumaron a Gadsden 1.1.0 como ajustes genéricos. Lo que sigue o quedó afuera con OK de Gero (19-oct-2026) o espera su decisión (el estilo de la landing de ATHLEX, ver COMPARACION.md). Salen de los reportes de los traductores.

| Dónde | Qué falta (valor de DOMU) | Por qué queda afuera |
|---|---|---|
| product.athlex-landing#skin (athlex-skin) | el precio en dos columnas (afuera de la 1.1.0, decisión de Gero) | decisión de Gero (19-oct): es rearmar el bloque Precio de la ficha, no un estilo de página; si hace falta, va como disposición del bloque Precio en otra versión |

## Otros (fuera de los traductores)

| Dónde | Qué falta | Por qué queda afuera |
|---|---|---|
| page.athlex-nota-* (bloques "día" y "semana") | 2 bloques "día" (franjas horarias húmedas) y 4 "semana" (dos filas de 21 días) de la nota de Shrine; sus textos están en la referencia y en INVENTARIO-AJUSTES.md. | decisión de Gero (19-oct): son demostraciones muy de un producto; la nota se lee completa con "versus" y "ciclo". |
| settings_data `platform_customizations.custom_css` | `sticky-atc.sticky-atc {z-index: 50 !important;}` (CSS para la barra fija de Shrine, por el botón "Shop with AI"). | no aplica: es un selector de Shrine que en Gadsden no existe; la barra fija de Gadsden tiene su z-index y el botón de Clarity está apagado. Verificado el 19-oct en la tienda en vivo, en 390 y 1440: nada tapa la barra (en la vista previa la tapa sólo la barra de preview de Shopify). |
