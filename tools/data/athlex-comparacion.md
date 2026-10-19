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
