# Inventario — ajustes que DOMU cambió respecto del default de Shrine

Generado con `node tools/settings_used.js` (se lee sólo el `{% schema %}` de cada sección de la referencia). Por tipo de sección: dónde está, ajustes con valor distinto del default (hasta 5 valores de muestra) y lo mismo por bloque. Los ajustes iguales al default también se traducen (ver MAPEO.md), porque los defaults de Gadsden no son los de Shrine.

## main-404

Dónde: 404#main

## newsletter

Dónde: 404#newsletter, article#newsletter, blog#newsletter, list-collections#newsletter, page#newsletter, search#newsletter

| Ajuste | Valores |
|---|---|
| `color_scheme` | `"background-2"` |
| `padding_top` | `68` |
| `custom_gradient_background` | `""` |

**Bloque `heading`** ×6: sin cambios

**Bloque `paragraph`** ×6:
- `text`: `"<p>Join our email list for exclusive offers and the latest news. </p>`

**Bloque `email_form`** ×6: sin cambios

## main-article

Dónde: article#main

**Bloque `featured_image`** ×1:
- `image_height`: `"large"`

**Bloque `title`** ×1: sin cambios

**Bloque `share`** ×1: sin cambios

**Bloque `content`** ×1: sin cambios

## main-blog

Dónde: blog#main

| Ajuste | Valores |
|---|---|
| `layout` | `"grid"` |
| `padding_top` | `0` |
| `padding_bottom` | `64` |

## main-cart-items

Dónde: cart#cart-items

| Ajuste | Valores |
|---|---|
| `padding_top` | `0` |
| `padding_bottom` | `24` |

## main-cart-footer

Dónde: cart#cart-footer

**Bloque `subtotal`** ×1: sin cambios

**Bloque `buttons`** ×1: sin cambios

## featured-collection

Dónde: cart#featured-collection

| Ajuste | Valores |
|---|---|
| `title` | `"Tambien puede interesarte:"` |
| `title_highlight_color` | `"#6d388b"` |
| `heading_size` | `"h2"` |
| `description` | `""` |
| `collection` | `"all"` |
| `image_ratio` | `"square"` |
| `swatches_option_name` | `""` |
| `columns_desktop` | `4` |
| `columns_mobile` | `"2"` |
| `padding_top` | `100` |
| `padding_bottom` | `100` |
| `custom_colors_background` | `"#ffffff"` |
| `custom_gradient_background` | `""` |
| `custom_colors_text` | `"#2e2a39"` |

## custom-liquid

Dónde: collection.general#custom_liquid_AxmgpN, collection.lga#custom_liquid_x4X4Er, collection.lga#custom_liquid_F7BdNg, product.gps-landing#custom_liquid_8EnbUH

| Ajuste | Valores |
|---|---|
| `custom_liquid` | `"{%- assign img = collection.image -%}\n{%- assign heading = collectio` · `"{%- if collection.handle == 'apto-credito-lga' -%}\n<div id=\"cred3\"` · `"{%- assign media_1 = 'https://cdn.shopify.com/videos/c/vp/cd5cf2cd195` |
| `padding_top` | `0` |
| `padding_bottom` | `0` |

## main-collection-product-grid

Dónde: collection.general#main-collection-product-grid, collection#main-collection-product-grid, collection.lga#main-collection-product-grid

| Ajuste | Valores |
|---|---|
| `products_per_page` | `48` |
| `stretch_cards` | `true` |
| `image_ratio` | `"square"` |
| `show_secondary_image` | `true` |
| `show_rating` | `true` |
| `enable_quick_add` | `true` |
| `swatches_option_name` | `""` |
| `swatches_position` | `"bottom"` |
| `filter_type` | `"vertical"` |
| `padding_top` | `0` |

## slideshow

Dónde: collection#slideshow_RNkFxw, page.caracteristicas#slideshow_bDnkYj

| Ajuste | Valores |
|---|---|
| `show_text_below` | `false` |
| `mobile_pagination_position` | `"over"` |
| `slide_height` | `"adapt_image"` |
| `auto_rotate` | `true` |

**Bloque `slide`** ×8:
- `image`: `"shopify://shop_images/06-envio-a-todo-el-pais.png"` · `"shopify://shop_images/01-credito-lga.png"` · `"shopify://shop_images/02-3-cuotas-sin-interes.png"` · `"shopify://shop_images/horneroprep_caracteristicas_acero_2905c1b3-f07b` · `"shopify://shop_images/horneroprep_caracteristicas_acabado.webp"`
- `image_overlay_opacity`: `20`
- `heading`: `"<strong>Envíos a todo el país</strong>"` · `"<strong>Equipá tu casa hoy, pagalo en cuotas</strong>"` · `"<strong>Todo en 3 cuotas sin interés</strong>"` · `"Acero Inoxidable 420HC"` · `"Acabado Stone Wash"`
- `title_highlight_color`: `"#ffffff"`
- `subheading`: `"Comprá seguro, recibí en tu casa"` · `"Crédito LGA — aprobación rápida"` · `"Con Mercado Pago, sin recargo"` · `"Resistencia a la corrosión + retención de filo. Se puede afilar con h` · `"Oculta los rayones del uso diario. Reduce reflejos. Se mantiene estét`
- `button_label`: `""` · `"Ver créditos →"` · `"Comprar → "`
- `link`: `""` · `"shopify://collections/apto-credito-lga"` · `"shopify://collections"`
- `atc_button_label`: `""`
- `atc_product`: `""`
- `atc_skip_cart`: `false`
- `box_align`: `"middle-left"`
- `show_text_box`: `false`
- `color_scheme`: `"accent-1"`
- `custom_colors_background`: `"#ffffff"`
- `custom_gradient_background`: `""`
- `custom_colors_text`: `"#2e2a39"`
- `text_alignment`: `"left"`
- `text_alignment_mobile`: `"left"`
- `heading_size`: `"h2"`
- `mobile_image`: `"shopify://shop_images/horneroprep_caracteristicas_acabado.webp"` · `"shopify://shop_images/horneroprep_caracteristicas_peso.webp"` · `"shopify://shop_images/horneroprep_caracteristicas_dimensiones_cb198bd` · `"shopify://shop_images/geekey_multiherramienta_funciones_herramientas.`

## collection-list

Dónde: collection#collection_list_R6tnja

| Ajuste | Valores |
|---|---|
| `title` | `""` |
| `title_highlight_color` | `"#6d388b"` |
| `custon_styling` | `true` |
| `card_style` | `"card"` |
| `card_text_alignment` | `"center"` |
| `card_title_position` | `"over-center"` |
| `cards_mobile_title_size` | `15` |
| `cards_show_arrow` | `false` |
| `cards_cta_label` | `""` |
| `cards_cta_style` | `"primary"` |
| `cards_cta_color` | `"#6d388b"` |
| `type` | `"loop"` |
| `autoplay` | `true` |
| `autoplay_speed` | `2` |
| `desktop_page_width` | `"desktop-full-page-no-padding"` |
| `columns_desktop` | `4` |
| `slider_desktop` | `true` |
| `per_move_desktop` | `2` |
| `desktop_side_padding` | `30` |
| `desktop_padding_calc` | `false` |
| `desktop_dots_position` | `"hidden"` |
| `columns_mobile_int` | `2` |
| `mobile_spacing` | `9` |
| `enable_mobile_preview` | `true` |
| `mobile_dots_position` | `"hidden"` |
| `mobile_arrows_position` | `"sides"` |
| `padding_top` | `0` |
| `padding_bottom` | `0` |
| `custom_colors_background` | `"#ffffff"` |
| `custom_gradient_background` | `""` |
| `custom_colors_text` | `"#2e2a39"` |

**Bloque `featured_collection`** ×7:
- `collection`: `"seguridad"` · `"indumentaria-deportiva"` · `"beauty-y-skincare"` · `"desayunos-y-meriendas"` · `"ayudantes-de-cocina"`
- `custom_title`: `""`

## image-slider

Dónde: collection.lga#image_slider_WpHhwR, product.athlex-landing#image_slider_k6hTQm, product.carbotiras-nativo#image_slider_YzHBWx, product.gps-landing#image_slider_bNgeFp

| Ajuste | Valores |
|---|---|
| `visibility` | `"desktop-hidden"` |
| `title` | `""` |
| `title_highlight_color` | `"#6d388b"` |
| `drag` | `"disabled"` |
| `slides_desktop` | `1` · `6` · `7` |
| `desktop_dots_position` | `"hidden"` |
| `desktop_arrows_position` | `"hidden"` |
| `mobile_full_page` | `true` |
| `slides_mobile` | `1` · `3` · `4` |
| `mobile_dots_position` | `"hidden"` |
| `mobile_arrows_position` | `"hidden"` |
| `custom_colors_background` | `"#ffffff"` |
| `custom_gradient_background` | `""` |
| `type` | `"loop"` |
| `autoplay` | `true` |
| `desktop_page_width` | `"desktop-full-page-no-padding"` · `"desktop-full-page"` |
| `desktop_spacing` | `0` |
| `mobile_spacing` | `0` |
| `padding_top` | `0` |
| `padding_bottom` | `0` |
| `autoplay_speed` | `1.5` |
| `center_mode` | `true` |
| `per_move_desktop` | `3` |
| `transparent_arrows` | `true` |

**Bloque `video_slide`** ×1:
- `video`: `"shopify://files/videos/DOMU x LGA - Credito (como comprar).mp4"`
- `thumbnail`: `"shopify://shop_images/portada-credito-lga-domu_1920x1080_425388a1-85f`
- `display_sound_btn`: `true`
- `description`: `""`

**Bloque `image_slide`** ×29:
- `image`: `"shopify://shop_images/athlex-ugc-5.gif"` · `"shopify://shop_images/athlex-ugc-7.gif"` · `"shopify://shop_images/athlex-ugc-10.gif"` · `"shopify://shop_images/athlex-ugc-9.gif"` · `"shopify://shop_images/athlex-ugc-2.gif"`
- `link`: `""`
- `description`: `""`

## slideshow-hero

Dónde: index#slideshow_hero_ga8MNL, index#slideshow_hero_MjfPeg, page.nosotros#slideshow_hero_ByxwwM, page.nosotros#slideshow_hero_Hpr8fx, page.nosotros#slideshow_hero_R3w9HF

| Ajuste | Valores |
|---|---|
| `desktop_pixels_height` | `400` · `300` · `200` |
| `slider_type` | `"loop"` |
| `mobile_pixels_height` | `20` · `200` |

**Bloque `slide`** ×5:
- `desktop_bg_image`: `"shopify://shop_images/store-scanner-for-checkout.jpg"` · `"shopify://shop_images/wallet-and-money.jpg"` · `"shopify://shop_images/passing-curbside-pickup-order-through-window.jp` · `"shopify://shop_images/business-owner-working-on-online-store.jpg"` · `"shopify://shop_images/self-serve-coffee-shop.jpg"`
- `desktop_overlay_opacity`: `60`
- `mobile_overlay_opacity`: `60`
- `sound_btn_color_scheme`: `"accent-1"`
- `heading_prefix`: `"Créditos personales y comerciales"` · `"Domu existe para una cosa:"` · `""` · `"No se trata de"`
- `heading`: `"Equipa tu hogar o comercio HOY"` · `"Que consigas lo que necesitas, sin fundirte."` · `"Equipar tu hogar o tu negocio no debería ser complicado"` · `""` · `"<strong>\"elegir perfecto\".</strong>"`
- `title_highlight_color`: `"#6d388b"` · `"#ffffff"`
- `heading_suffix`: `""`
- `text`: `""` · `"<p>En Domu ofrecemos productos confiables con financiación directa, p` · `"<p>No siempre es el momento de pagar todo junto.</p><p>Domu está pens` · `"<p>Porque ese momento casi nunca llega.</p><p>Domu ordena la compra p`
- `button_label_1`: `"Ver más"` · `"Conocenos"` · `""`
- `button_link_1`: `"shopify://collections/all"` · `"shopify://pages/nosotros"` · `""`
- `button_label_2`: `""`
- `button_link_2`: `""`
- `color_scheme`: `"custom"`
- `content_max_width`: `"unlimited"`
- `custom_colors_text`: `"#f3f3f3"` · `"#ffffff"` · `"#f3f1ec"`
- `custom_colors_solid_button_background`: `"#2e7d32"`
- `custom_colors_solid_button_text`: `"#f3f3f3"`
- `mobile_content_text_alignment`: `"left"`

## icon-bar

Dónde: index#icon_bar_YgtVD6, page.nosotros#icon_bar_MjU9WG, product.gps-landing#icon_bar_qH6Jxb

| Ajuste | Valores |
|---|---|
| `title` | `"Compra con seguridad"` · `""` |
| `title_highlight_color` | `"#6d388b"` |
| `text` | `""` |
| `type` | `"loop"` |
| `autoplay` | `true` |
| `mobile_dots_position` | `"hidden"` |
| `mobile_arrows_position` | `"hidden"` |
| `custom_colors_background` | `"#ffffff"` |
| `custom_gradient_background` | `""` |
| `custom_colors_text` | `"#2e2a39"` |
| `custom_cards_colors_background` | `"#f3f3f3"` |
| `custom_cards_gradient_background` | `"linear-gradient(309deg, rgba(15, 142, 191, 1), rgba(255, 255, 255, 1)` · `""` |
| `custom_cards_colors_text` | `"#2e2a39"` |
| `autoplay_speed` | `3.5` · `3` |
| `desktop_full_page` | `true` |
| `columns_desktop` | `3` |
| `columns_mobile` | `"2"` |
| `enable_mobile_preview` | `true` |
| `padding_top` | `40` |
| `padding_bottom` | `0` |
| `color_scheme` | `"accent-1"` |
| `icon_color` | `"background-2"` |
| `cards_color_scheme` | `"bg-overlay"` |
| `desktop_dots_position` | `"hidden"` |
| `desktop_arrows_position` | `"hidden"` |

**Bloque `column`** ×11:
- `icon`: `"security"` · `"local_shipping"` · `"box_add"` · `"call_quality"` · `"account_balance"`
- `title`: `"Compra asegurada con MercadoPago"` · `"Envios Rápidos A TODO EL PAÍS"` · `"Productos EXCLUSIVOS"` · `"Soporte en vivo PERSONALIZADO"` · `"Financiación directa"`
- `text`: `"<p></p><p></p>"`
- `filled_icon`: `true`

## contact-form

Dónde: index#contact_form_WHP8G7, page.contact#contact_form_U9ptC4, page.nosotros#contact_form_XPCpqm

| Ajuste | Valores |
|---|---|
| `title` | `"Contáctanos"` · `"Sumate a la comunidad Domu"` |
| `title_highlight_color` | `"#6d388b"` |
| `success_text_color` | `"#28c100"` |
| `success_bg_color` | `"#f2ffed"` |
| `success_border_color` | `"#28c100"` |
| `errors_text_color` | `"#ff0000"` |
| `errors_border_color` | `"#ff0000"` |
| `custom_colors_background` | `"#ffffff"` |
| `custom_gradient_background` | `""` |
| `custom_colors_text` | `"#2e2a39"` |
| `color_scheme` | `"accent-1"` |

**Bloque `field_row`** ×6:
- `input_1_type`: `"name"` · `"phone"`
- `input_2_enabled`: `true`
- `input_2_type`: `"email"`

**Bloque `textarea`** ×2:
- `input_type`: `"comment"`

## main-list-collections

Dónde: list-collections#main

| Ajuste | Valores |
|---|---|
| `cards_mobile_title_size` | `16` |
| `cards_cta_label` | `""` |

## athlex-nota

Dónde: page.athlex-nota-6cosas#nota, page.athlex-nota-carta#nota, page.athlex-nota-investigativa#nota, page.athlex-nota-sincuentos#nota

| Ajuste | Valores |
|---|---|
| `estilo` | `"portal"` |
| `eyebrow` | `"Guía rápida"` · `"Carta abierta"` · `"Piel · zonas de roce"` · `"Salud de la piel"` |
| `titulo` | `"7 cosas que conviene saber antes de comprar algo para la picazón en l` · `"Me pasé meses leyendo foros de gente con picazón en la ingle. Lo que ` · `"Probó de todo durante seis años. Lo que le faltaba <em>no estaba dond` · `"La picazón en la ingle casi nunca empieza en la ingle: los manuales m` |
| `bajada` | `"Qué organismo es, de dónde llega, por qué vuelve y en qué fijarse ant` · `"Era la vergüenza. Y arriba de esa vergüenza encontré un mercado enter` · `"El error se comete siempre en el mismo punto y casi nadie lo ve. Qué ` · `"El hongo de la ingle y el del pie de atleta son el mismo. Sube en el ` |
| `autor` | `"Por el equipo de ATHLEX"` · `"Por [DATO: NOMBRE REAL], fundador de ATHLEX"` · `"Por [PENDIENTE: nombre real]"` · `"Por [DATO: NOMBRE REAL]"` |
| `dato` | `"23 de agosto 2026 · 3 min de lectura"` · `"23 de agosto 2026 · 4 min de lectura"` · `"25 de agosto 2026 · 7 min de lectura"` · `"23 de agosto 2026, 18:17hs · 5 min de lectura"` |
| `utm` | `"?ref=nota-6cosas"` · `"?ref=nota-carta"` · `"?ref=adv-recaida"` · `"?ref=nota-sincuentos"` |
| `barra_boton` | `"Ver producto"` |
| `temas` | `"Piel, Hongos, Tiña inguinal, Pie de atleta, Higiene personal, Deporte` · `"Piel, Hongos, Tiña inguinal, Pie de atleta, Higiene personal"` · `"Piel, Hongos, Tiña inguinal, Pie de atleta, Recaídas, Higiene persona` |
| `legal` | `"Esta nota es contenido publicitario de ATHLEX. Las referencias sobre ` · `"Esta nota es contenido publicitario de ATHLEX, escrito por su fundado` · `"Esta nota es contenido publicitario de ATHLEX. Martín Ojeda es un per` |
| `cinta` | `"PUBLICIDAD · CARTA DEL FUNDADOR DE ATHLEX"` |

**Bloque `imagen`** ×8:
- `imagen`: `"shopify://shop_images/athlex-real-vestuario.jpg"` · `"shopify://shop_images/athlex-real-medias.jpg"` · `"shopify://shop_images/athlex-real-foros.jpg"`
- `alt`: `"Pared de lockers en un vestuario"` · `"Una persona poniéndose una media antes de terminar de vestirse"` · `"Una mano sosteniendo un teléfono con un texto largo en pantalla"` · `"Una mano sosteniendo un teléfono encendido en la oscuridad"`
- `pie`: `"Vestuario, ropa húmeda y toalla compartida: el escenario donde este h` · `"Así la ropa interior no hace escala en los pies camino a la ingle. (F` · `"Reddit, grupos y consultas médicas online quedan públicas. Ahí está e` · `"Las medias antes que el calzoncillo: así la ropa interior no hace esc` · `"El horario en que se busca esto en Google dice bastante del problema.`

**Bloque `parrafo`** ×42:
- `texto`: `"<p>Esto es lo que sacamos en limpio después de leer cientos de mensaj` · `"<p>Arrancamos por la duda que más gente se come sola y a las tres de ` · `"<p>Necesita calor, humedad y roce. Nada más que eso: no hay ninguna a` · `"<p>Este es el punto que casi nadie conoce y el que más explica las re` · `"<p>Esta es la razón número uno por la que vuelve. La picazón afloja a`

**Bloque `indice`** ×2:
- `titulo`: `"Los siete puntos"`

**Bloque `subtitulo`** ×31:
- `texto`: `"1 · No es una enfermedad de transmisión sexual"` · `"2 · Vive de tres cosas, y una es fácil de cortar"` · `"3 · Viaja del pie a la ingle, y vuelve"` · `"4 · El día que deja de picar no es el día de terminar"` · `"5 · La forma importa más que la fórmula"`

**Bloque `destacado`** ×7:
- `texto`: `"El mismo hongo del pie de atleta. <em>No te lo pegó nadie en la cama.` · `"Cuando ya no lo sentís, <em>seguí una semana más</em>."` · `"El mismo hongo del pie de atleta. <em>No es una enfermedad de transmi` · `"Cuando ya no lo sentís, <em>seguí una semana más</em>. Es la parte qu` · `"Cuando la piel está sana, <em>se termina</em>. No te queda, ni lo ten`

**Bloque `dia`** ×2:
- `titulo`: `"Un día cualquiera, y las horas en que la zona queda húmeda"`
- `marcas`: `"7:00 | Salís de la ducha. Te secás rápido y te vestís.\n9 a 17 | Sent`
- `pie`: `"Las franjas verdes son las horas húmedas. No es un rato: es casi todo`

**Bloque `semana`** ×4:
- `pie_a`: `"Corta el día que deja de sentirlo. Los cuadros oscuros son el tiempo `
- `fila_b`: `"El que sigue una semana más"`
- `pie_b`: `"Sigue siete días después de dejar de sentirlo. Esa franja es toda la ` · `"Sigue siete días después de dejar de sentirlo. Esa franja verde oscur`
- `titulo`: `"Las mismas tres semanas, dos finales distintos"`

**Bloque `versus`** ×4:
- `col_b`: `"Un spray"`
- `pie`: `"Un producto que se usa todos los días le gana a uno perfecto que aban` · `"La diferencia no es la potencia. Es cuántas veces vas a tener ganas d` · `"Dos veces por día, durante semanas. Ahí se decide quién abandona."`

**Bloque `caja`** ×5:
- `sub`: `"Spray corporal para zonas de roce. 120 ml. Se aplica sin tocarte, sec` · `"Envío a todo el país en caja neutra. Se paga online."` · `"Spray corporal para zonas de roce. 120 ml. Se aplica sin tocarte, se `
- `boton`: `"Quiero probarlo un mes"` · `"Lo quiero"` · `"Mirá los detalles y el precio"`
- `pie`: `"Garantía de 30 días. Si no te convence, escribinos y te devolvemos lo` · `"Garantía de 30 días."` · `"Llega en caja neutra: nadie sabe qué es ni de qué marca, ni el carter`

**Bloque `test`** ×3:
- `titulo`: `"¿Querés saber en cuál de los casos estás?"` · `"¿No sabés si es tu caso?"`
- `texto`: `"Armamos un test de 8 preguntas con todo esto. No pide mail ni fotos, ` · `"Armé un test de 8 preguntas con lo que aprendí leyendo todo eso. No p`
- `url`: `"/pages/athlex-test"`

**Bloque `citas`** ×5:
- `titulo`: `"Dos de los mensajes que me hicieron arrancar"` · `"Lo escribió alguien que ya llevaba años"` · `"La preocupación que casi nadie dice en voz alta"` · `"La respuesta de un médico a un paciente que preguntó exactamente esto` · `"Cómo se cuenta esto cuando nadie está mirando"`
- `cita_1`: `"No quiero ir al médico porque francamente me da demasiada vergüenza."` · `"Suele pasar que en gral uno ve la mejoria y corta… da embole seguir p` · `"Ten cuidado porque te puede dar tiña inguinal y eso tarda en quitarse` · `"…continuar usándolo hasta una semana después de la «aparente» desapar` · `"uno ve la mejoría y corta… da embole seguir poniendo cuando parece qu`
- `fuente_1`: `"Mensaje de un foro público, traducido del inglés"` · `"Mensaje de un foro público argentino, ortografía original, recortado"` · `"Mensaje de un foro público en español"` · `"Respuesta en una consulta médica pública · [PENDIENTE: nombre y matrí` · `"Mensaje de un foro público, en español"`
- `cita_2`: `"ya no tengo la paranoia de que alguien me agarre rascándome"` · `""` · `"pensé que me había pegado herpes, pero al final era por la transpirac`
- `fuente_2`: `"Mensaje de un foro público, en español"` · `""`
- `pie`: `"Citas textuales de los foros que leí. No son clientes de ATHLEX: el p` · `"Cita textual de un foro público. No es un cliente de ATHLEX: el produ` · `"Guardate esta última, porque más abajo tiene respuesta."` · `"Cita recortada de una consulta pública. Hasta tener la matrícula, va ` · `"Citas textuales de foros públicos. No son clientes de ATHLEX."`

**Bloque `ciclo`** ×2:
- `titulo`: `"El círculo que se repetía en casi todos los mensajes"` · `"El círculo que ya conocés de memoria"`
- `n2`: `"Usás algo"`
- `pie`: `"Después de dos o tres vueltas, la conclusión siempre era la misma: \"` · `"El círculo no se corta solo. Se corta en el paso 4, y por eso el paso`

**Bloque `video`** ×4:
- `titulo`: `"Así se aplica y así se seca"` · `"Qué pasa en la piel cuando la zona se mantiene seca"`
- `video`: `"shopify://files/videos/athlex-frio-v3.mp4"` · `"shopify://files/videos/athlex-ciencia.mp4"`
- `pie`: `"Sin contacto, sin frotar y sin esperar para vestirse."` · `"Sin tocarse, sin frotar, sin esperar para vestirse."` · `"Animación de ATHLEX sobre el mecanismo de secado."`

**Bloque `firma`** ×2:
- `nombre`: `"[DATO: NOMBRE REAL]"`

**Bloque `tira`** ×1:
- `img_1`: `"shopify://shop_images/athlex-real-entreno.jpg"`
- `pie_1`: `"Al terminar de entrenar la ropa queda húmeda, y sigue así el viaje de`
- `img_2`: `"shopify://shop_images/athlex-real-sentado.jpg"`
- `pie_2`: `"Ocho horas sentado, con la misma ropa y sin aire que circule. (Foto: `
- `img_3`: `"shopify://shop_images/athlex-real-lavarropas.jpg"`
- `pie_3`: `"La toalla compartida es una de las vías de contagio dentro de una mis`

## athlex-test

Dónde: page.athlex-test#test

| Ajuste | Valores |
|---|---|
| `titulo` | `"¿Roce, o <em>algo más</em>? El test de las 8 preguntas"` |
| `bajada` | `"Si hay picazón o ardor en la ingle, contestá estas 8 preguntas. Al fi` |
| `absolucion` | `"Eso se llama <em>tiña inguinal</em>. Es un hongo, es comunísimo, y no` |
| `voces_pie` | `"Cita textual de un foro público. No es un cliente de ATHLEX: el produ` |
| `bene_1` | `"Se aplica sin tocar la zona y sin frotar nada."` |
| `bene_2` | `"Seca en segundos: te vestís enseguida, no queda pegoteado."` |
| `bene_3` | `"Parece un producto de deporte. Puede quedar a la vista en el baño."` |
| `caja_pie` | `"Garantía de 30 días: si no te convence, escribinos y te devolvemos lo` |
| `legal` | `"Este test es una orientación, no un diagnóstico médico, y no reemplaz` |

## collapsible-content

Dónde: page.faq#9c121ec4-42cd-4c8e-82a2-935e073db7d7, page.nosotros#collapsible_content_J6WxeR, product.carbotiras-nativo#faq

| Ajuste | Valores |
|---|---|
| `caption` | `"Frequently asked questions"` · `""` · `"Tus preguntas"` |
| `heading_size` | `"h0"` |
| `title` | `"Preguntas frecuentes"` · `"Lo que todos preguntan <strong>antes de comprar</strong>"` |
| `title_highlight_color` | `"#6d388b"` · `"#5f5e5a"` |
| `row_heading_size` | `"large"` |
| `display_top_border` | `false` |
| `custom_colors_background` | `"#ffffff"` · `"#f5f7fa"` |
| `custom_gradient_background` | `""` |
| `custom_colors_text` | `"#2e2a39"` · `"#0b0b0b"` |
| `custom_contaner_colors_background` | `"#ffffff"` |
| `custom_container_gradient_background` | `""` |
| `custom_contaner_colors_text` | `"#2e2a39"` · `"#0b0b0b"` |
| `layout` | `"section"` |
| `color_scheme` | `"custom"` |
| `container_color_scheme` | `"custom"` |
| `open_first_collapsible_row` | `true` |
| `collapse_icon` | `"plus"` |
| `padding_top` | `48` |
| `padding_bottom` | `48` |

**Bloque `collapsible_row`** ×20:
- `row_content`: `""` · `"<p>Domu es una tienda enfocada en equipamiento del hogar y uso diario` · `"<p>Soluciones para preparación cotidiana y para preparacionistas: her` · `"<p>Operamos online. Por ahora no trabajamos con retiro en persona (to` · `"<p>Sí, hacemos envíos dentro de Argentina. Al finalizar la compra vas`
- `page`: `""` · `"contact"`
- `heading`: `"¿Qué es Domu?"` · `"¿Qué tipo de productos venden?"` · `"¿Dónde operan? ¿Tienen local físico?"` · `"¿Hacen envíos a todo el país?"` · `"¿Cómo puedo seguir mi pedido?"`
- `icon`: `"help"`

## main-page

Dónde: page#main

## multicolumn

Dónde: page.nosotros#multicolumn_LipbPN, product.prod_test#multicolumn_aTnHmr

| Ajuste | Valores |
|---|---|
| `title` | `""` · `"Cómo funciona, en 3 pasos"` |
| `title_highlight_color` | `"#6d388b"` |
| `button_label` | `""` |
| `button_link` | `""` |
| `atc_button_label` | `""` |
| `atc_product` | `""` |
| `atc_skip_cart` | `false` |
| `mobile_heading_size` | `16` |
| `mobile_text_size` | `12` |
| `type` | `"loop"` |
| `autoplay` | `true` |
| `autoplay_speed` | `3.5` |
| `desktop_full_page` | `true` |
| `columns_desktop` | `2` |
| `slider_desktop` | `true` |
| `desktop_dots_position` | `"hidden"` |
| `enable_mobile_preview` | `true` |
| `mobile_dots_position` | `"hidden"` |
| `mobile_arrows_position` | `"hidden"` |
| `custom_colors_background` | `"#ffffff"` |
| `custom_gradient_background` | `""` |
| `custom_colors_text` | `"#2e2a39"` |
| `custom_cards_colors_background` | `"#f3f3f3"` |
| `custom_cards_gradient_background` | `""` |
| `custom_cards_colors_text` | `"#2e2a39"` |

**Bloque `column`** ×7:
- `title`: `"QUÉ HACEMOS"` · `"PARA QUIÉN"` · `"QUÉ PROBLEMA RESOLVEMOS"` · `"CÓMO LO RESOLVEMOS"`
- `text`: `"<p>Ofrecemos equipamiento para el hogar y uso diario, combinando prod` · `"<p>Para quienes necesitan equipar su casa o su negocio sin hacer un d` · `"<p>Muchas compras se postergan por el costo inicial. Domu elimina esa` · `"<p>Con productos seleccionados y financiación directa: accedés a lo q`
- `link_label`: `""`
- `link`: `""`

## content-tabs

Dónde: page.nosotros#content_tabs_KpYMNP

| Ajuste | Valores |
|---|---|
| `title` | `""` |
| `title_highlight_color` | `"#6d388b"` |
| `text` | `""` |
| `header_layout` | `"vertical"` |
| `custom_colors_background` | `"#ffffff"` |
| `custom_gradient_background` | `""` |
| `custom_colors_text` | `"#2e2a39"` |
| `custom_tabs_color_label` | `"#ffffff"` |

**Bloque `tab`** ×3:
- `btn_label`: `"Misión"` · `"Visión"` · `"Valores"`
- `btn_icon`: `""`
- `muted_autoplay`: `false`
- `title`: `"Nuestra guía"` · `"Nuestro norte"` · `"Nuestros pilares"`
- `title_highlight_color`: `"#6d388b"`
- `text`: `"<p>Se trata de facilitar el acceso.<br/><br/>Que puedas resolver lo q` · `"<p>Se trata de cambiar la forma de comprar.<br/><br/>Que acceder a lo` · `"<p><strong>Acceso: </strong>Si no podés acceder, no sirve.<br/>El cos`
- `button_label`: `""`
- `link`: `""`
- `atc_button_label`: `""`
- `atc_skip_cart`: `false`
- `product`: `""`
- `desktop_media_width`: `"full"`

## comparison-table

Dónde: page.nosotros#comparison_table_gXJrt7, product.carbotiras-nativo#comparacion

| Ajuste | Valores |
|---|---|
| `title` | `""` · `"Comparación <strong>honesta</strong>"` |
| `title_highlight_color` | `"#6d388b"` · `"#5f5e5a"` |
| `text` | `""` · `"<p>Las otras opciones que tenés para sacarte el amarillo, punto por p` |
| `button_label` | `""` |
| `link` | `""` |
| `atc_button_label` | `""` |
| `atc_product` | `""` |
| `atc_skip_cart` | `false` |
| `style` | `"minimal"` · `"centered"` |
| `us_label` | `""` · `"Carbo"` |
| `logo` | `"shopify://shop_images/LOGO_2x_0aae1f5e-4393-4a06-b23c-bd288ccd22fb.we` |
| `logo_width` | `75` |
| `mobile_logo_width` | `75` |
| `others_label` | `"Otros"` · `"Violetas"` |
| `checkmark_style` | `"solid"` |
| `checkmark_color` | `"#ffffff"` · `"#0b0b0b"` |
| `checkmark_bg_color` | `"#53af01"` · `"#9fe1cb"` |
| `x_color` | `"#ffffff"` |
| `x_bg_color` | `"#dd1d1d"` · `"#5f5e5a"` |
| `custom_colors_background` | `"#ffffff"` · `"#f5f7fa"` |
| `custom_gradient_background` | `""` |
| `custom_colors_text` | `"#2e2a39"` · `"#0b0b0b"` |
| `custom_colors_highlighted_background` | `"#2e2a39"` · `"#0b0b0b"` |
| `custom_colors_highlighted_text` | `"#ffffff"` |
| `custom_colors_others_background` | `"#ffffff"` |
| `custom_colors_others_text` | `"#2e2a39"` |
| `color_scheme` | `"custom"` |
| `corner_radius` | `14` |
| `number_of_competitors` | `2` |
| `us_label_size` | `14` |
| `others_label_size` | `13` |
| `others_2_label` | `"Dentista"` |
| `others_2_label_size` | `13` |
| `x_style` | `"solid"` |
| `highlighted_color_scheme` | `"custom"` |
| `padding_top` | `48` |
| `padding_bottom` | `48` |
| `custom_colors_solid_button_background` | `"#0b0b0b"` |
| `custom_colors_outline_button` | `"#0b0b0b"` |

**Bloque `row`** ×9:
- `benefit`: `"<strong>Acceso en cuotas</strong>"` · `"<strong>Compra sin desembolso completo</strong>"` · `"<strong>Proceso simple</strong>"` · `"<strong>Decisión clara desde el inicio</strong>"` · `"<strong>Pensado para uso real</strong>"`
- `others_2`: `true`
- `others`: `true`

## testimonials

Dónde: page.nosotros#testimonials_RUyymc

| Ajuste | Valores |
|---|---|
| `title` | `""` |
| `title_highlight_color` | `"#6d388b"` |
| `text` | `""` |
| `image_width` | `"third"` |
| `quotes_color_scheme` | `"accent-1"` |
| `enable_mobile_preview` | `true` |
| `mobile_dots_position` | `"hidden"` |
| `mobile_arrows_position` | `"hidden"` |
| `custom_colors_background` | `"#ffffff"` |
| `custom_gradient_background` | `""` |
| `custom_colors_text` | `"#2e2a39"` |
| `custom_cards_colors_background` | `"#f3f3f3"` |
| `custom_cards_gradient_background` | `""` |
| `custom_cards_colors_text` | `"#2e2a39"` |

**Bloque `column`** ×3:
- `title`: `"Me resolvió el pago"` · `"Todo claro desde el principio"` · `"Respondieron cuando hizo falta"`
- `text`: `"<p>“Lo necesitaba pero no podía pagarlo todo junto. Lo saqué en cuota` · `"<p>“Me explicaron bien cómo eran las cuotas y no hubo sorpresas. Lo q` · `"<p>“Tuve una consulta después de comprar y me respondieron rápido. Se`
- `author`: `"<em><strong>Martín G.</strong></em>"` · `"<em><strong>Carla L. G.</strong></em>"` · `"<em><strong>Julián B.</strong></em>"`

## multirow

Dónde: page.nosotros#multirow_x6YNjf

| Ajuste | Valores |
|---|---|
| `mobile_full_media_width` | `true` |
| `custom_colors_background` | `"#2e2a39"` |
| `custom_gradient_background` | `""` |
| `custom_colors_text` | `"#ffffff"` |
| `custom_section_colors_background` | `"#ffffff"` |
| `custom_section_gradient_background` | `""` |

**Bloque `row`** ×1:
- `caption`: `"un proyecto con nombre y cara."`
- `title`: `"Domu es una operación liderada directamente por nosotros, ejecutando `
- `title_highlight_color`: `"#6d388b"`
- `text`: `"<p>Venimos del mundo de los negocios y esto no nace para “armar una m`
- `button_label`: `""`
- `button_link`: `""`
- `atc_button_label`: `""`
- `atc_product`: `""`
- `atc_skip_cart`: `false`

## rich-text

Dónde: page.nosotros#rich_text_Ddzr3i

| Ajuste | Valores |
|---|---|
| `custom_colors_background` | `"#ffffff"` |
| `custom_gradient_background` | `""` |
| `custom_colors_text` | `"#2e2a39"` |

**Bloque `text`** ×1:
- `text`: `"<p><strong>Comprar no debería ser un problema operativo.</strong></p>`

## track-order

Dónde: page.track-order#48a61bc7-365a-4136-bce5-4aa7f7623d0a

| Ajuste | Valores |
|---|---|
| `text` | `"<p>Welcome to our tracking page! Here you can easily track the status` |

## image-with-text

Dónde: page.track-order#fd57cce8-d801-473c-9554-025221fb7723

| Ajuste | Valores |
|---|---|
| `content_layout` | `"overlap"` |

**Bloque `heading`** ×1: sin cambios

**Bloque `text`** ×1: sin cambios

**Bloque `button`** ×1:
- `button_label`: `"Contact us"`
- `button_link`: `""`

## email-signup-banner

Dónde: password#main

**Bloque `heading`** ×1: sin cambios

**Bloque `paragraph`** ×1: sin cambios

**Bloque `email_form`** ×1: sin cambios

## main-product

Dónde: product.athlex-landing#main, product.carbotiras-nativo#main, product.gps-landing#main, product.prod_test#main, product.prod_test_kaching#main, product.prod_test_lga#main

| Ajuste | Valores |
|---|---|
| `transparent_arrows` | `true` |
| `media_fit` | `"cover"` |
| `mobile_media_corner_radius` | `0` · `10` |
| `mobile_pagination` | `"hidden"` |
| `mobile_thumbnails_position` | `"bottom"` |
| `mobile_vertical_thumbnails_hide_arrows` | `false` |
| `mobile_scroll_padding_pixels` | `0` |
| `enable_mobile_outher_spacing` | `true` |
| `disable_prepend` | `true` |

**Bloque `custom_liquid`** ×33:
- `custom_liquid`: `"<style>\n/* ── DESKTOP: grilla de 2 columnas, quieta (las copias del ` · `"{% assign rating_val = product.metafields.custom.rating_avg.value %}\` · `"{%- assign v = product.selected_or_first_available_variant -%}\n{%- a` · `"{%- comment -%}\n  ML-style Payment Methods Popup (Shrine)\n  - 3 cuo` · `"{%- comment -%}\n  ATHLEX · bloque de mensaje — versión para \"Liquid`

**Bloque `title`** ×6:
- `text_size`: `"h2"`
- `uppercase_title`: `true`
- `margin_bottom`: `0`

**Bloque `price`** ×5:
- `price_color`: `"text"`
- `compare_price_color`: `"outline-button"`
- `icon_scale`: `100`
- `margin_top`: `0`
- `margin_bottom`: `0`

**Bloque `buy_buttons`** ×6:
- `display_price`: `true`
- `enable_custom_color`: `true`
- `custom_color`: `"#0b0b0b"` · `"#2b7427"`
- `secondary_btn_label`: `"Agregar al carrito"`
- `show_dynamic_checkout`: `true`

**Bloque `sticky_atc`** ×6:
- `button_label`: `"Agregar al carrito"` · `"Quiero dientes más blancos"`
- `mobile_full_button_width`: `true`
- `display_when`: `"always"`
- `enable_custom_btn_color`: `true`
- `custom_btn_color`: `"#0b0b0b"`
- `desktop_show_image`: `true`
- `desktop_variant_picker`: `true`
- `mobile_show_image`: `true`
- `mobile_show_title`: `false`
- `mobile_show_sale_badge`: `false`

**Bloque `collapsible_tab`** ×24:
- `heading`: `"Cómo se usan"` · `"Qué trae la caja"` · `"¿Cuánto me sale por día?"` · `"Envío"` · `"Ingredientes"`
- `icon`: `"dentistry"` · `"inventory_2"` · `"payments"` · `"local_shipping"` · `"science"`
- `filled_icon`: `true`
- `content`: `"<p><strong>Secá los dientes.</strong> Con una servilleta o una toalla` · `"<p>14 sobres individuales. Cada sobre trae una tira superior y una in` · `"<p>Una caja trae 14 sobres y se usan dos por día: te dura una semana.` · `"<p><strong>El envío es GRATIS y llega en 24 h en CABA.</strong></p><p` · `"<p>Aceite de coco, carbón activado de coco, agua, bicarbonato de sodi`
- `page`: `""`
- `margin_top`: `21` · `0`
- `display_top_border`: `false`
- `heading_size`: `"large"`

**Bloque `reviews`** ×4:
- `custom_bg_color`: `"#f2f2f2"`
- `border_width`: `1`
- `border_color`: `"#b7b7b7"`
- `checkmark_color`: `"#6d388b"`
- `checkmark_icon_color`: `"#ffffff"`
- `slider_type`: `"loop"`
- `autoplay`: `true`
- `display_dots`: `false`
- `author_1`: `"{{ product.metafields.custom.rvw_nom_01.value }}[stars]"`
- `text_1`: `"<p>{{ product.metafields.custom.rvw_txt_01 | metafield_tag }}</p>"`
- `author_2`: `"{{ product.metafields.custom.rvw_nom_02.value }}[stars]"`
- `text_2`: `"<p>{{ product.metafields.custom.rvw_txt_02 | metafield_tag }}</p>"`
- `author_3`: `"{{ product.metafields.custom.rvw_nom_03.value }}[stars]"`
- `text_3`: `"<p>{{ product.metafields.custom.rvw_txt_03 | metafield_tag }}</p>"`
- `show_custom_bg`: `true`

**Bloque `variant_picker`** ×3:
- `picker_types`: `"pills, dropdown, dropdown"`
- `custom_labels`: `"[name] - [selected]"`
- `swatches_custom_colors_list`: `"#000000, #6D388B, #0000FF, #FFCC00"`
- `breaks_displayed_images`: `"variant_images"`
- `breaks_custom_images`: `""`

**Bloque `quantity_selector`** ×3:
- `full_width_classic`: `false`
- `enable_quantity_discounts`: `false`
- `pickers_label`: `""`
- `option_1_badge`: `""`
- `option_1_benefit`: `""`
- `option_2_badge`: `""`
- `option_2_benefit`: `""`
- `option_3_badge`: `""`
- `option_3_benefit`: `""`
- `option_4_badge`: `""`
- `option_4_benefit`: `""`

**Bloque `emoji_benefits`** ×3:
- `benefits`: `"<p>{{ product.metafields.custom.desc_tit.value }}</p>"`

**Bloque `image`** ×4:
- `image`: `"{{ product.metafields.custom.img_01.value }}"` · `"{{ product.metafields.custom.img_02.value }}"`

**Bloque `text`** ×3:
- `text_1`: `"{{ product.metafields.custom.benef_01.value }}"`
- `text_2`: `"{{ product.metafields.custom.benef_02.value }}"`
- `text_3`: `"{{ product.metafields.custom.benef_03.value }}"`
- `direction`: `"vertical"`
- `bg_color`: `"#f3f3f3"`
- `border_color`: `"#b7b7b7"`

## athlex-reviews-mini

Dónde: product.athlex-landing#reviews-mini

**Bloque `destacado`** ×5:
- `foto`: `"shopify://shop_images/athlex-revu-auto.jpg"` · `"shopify://shop_images/athlex-revu-cocina.jpg"` · `"shopify://shop_images/athlex-revu-banco-gym.jpg"` · `"shopify://shop_images/athlex-revu-post-run.jpg"` · `"shopify://shop_images/athlex-revu-cinta.jpg"`
- `texto`: `"Imposible andar poniéndome pomadas en la calle"` · `"Las cremas eran un asco porque quedabas todo pegajoso"` · `"Ya no estoy para andar poniéndome pomadas a cada rato"` · `"ya no tengo la paranoia de que alguien me agarre rascándome"` · `"Tenía que ir al baño constantemente o acortar mi entrenamiento"`
- `autor`: `"Facundo G."` · `"Diego R."` · `"Cristian V."` · `"Alejandro D."` · `"Nicolás P."`
- `fecha`: `"06/26"` · `"07/26"` · `"05/26"`
- `verificada`: `true`

## horizontal-ticker

Dónde: product.athlex-landing#horizontal_ticker_Bwfdhe, product.athlex-landing#horizontal_ticker_qxD6nk, product.carbotiras-nativo#anuncios

| Ajuste | Valores |
|---|---|
| `hidden_products` | `""` |
| `displayed_products` | `""` |
| `custom_colors_background` | `"#ffffff"` · `"#f5f7fa"` |
| `custom_gradient_background` | `""` |
| `custom_colors_text` | `"#2e2a39"` · `"#0b0b0b"` |
| `speed` | `1.5` |
| `color_scheme` | `"custom"` |
| `mobile_text_size` | `13` |
| `desktop_text_size` | `14` |
| `uppercase_text` | `true` |
| `bold_text` | `true` |
| `mobile_padding_top` | `8` |
| `mobile_padding_bottom` | `8` |
| `desktop_padding_top` | `12` |
| `desktop_padding_bottom` | `12` |

**Bloque `text`** ×12:
- `title`: `"+1.200 PEDIDOS"` · `"4,8 ★ EN 300 RESEÑAS"` · `"8 DE CADA 10 RECOMPRAN"` · `"ENVÍO EN 24hr EN CABA"` · `"ENVÍO A TODO EL PAÍS"`

## athlex-faq

Dónde: product.athlex-landing#faq

**Bloque `qa`** ×6:
- `q`: `"¿Es contagioso? ¿Es una ETS?"` · `"¿Arde? ¿Dónde me lo puedo poner?"` · `"¿Cuánto tardo en ver resultados?"` · `"¿Cómo se usa?"` · `"¿Dónde lo uso?"`
- `a`: `"<p>No es una ETS y no es falta de higiene<strong>. Es un hongo de pie` · `"<p><strong>No arde: sentís frío</strong>, como algo fresco en la piel` · `"<p>Probalo y fijate en tu propia piel: <strong>el alivio se siente IN` · `"<p><strong>Agitalo, tirá dos o tres toques </strong>a 15 cm <strong>s` · `"<p><strong>Ingle, pliegues, cara interna del muslo y glúteos. Cubrí d`

## athlex-dolor

Dónde: product.athlex-landing#dolor

| Ajuste | Valores |
|---|---|
| `eyebrow` | `"— EL PROBLEMA"` |
| `heading` | `"¿TE PASA <em>ALGUNA DE ESTAS</em>?"` |
| `lead` | `"Tocá y lee"` |
| `ciencia_titulo` | `"<strong>LO QUE TENÉS ES </strong><em><strong>UN HONGO</strong></em>"` |
| `ciencia_lead` | `"Se llama tiña inguinal y es más común de lo que pensás. No tiene nada` |
| `ciencia_video` | `"shopify://files/videos/athlex-ciencia.mp4"` |

**Bloque `punal`** ×4:
- `imagen`: `"shopify://shop_images/athlex-dolor-cama.png"` · `"shopify://shop_images/athlex-dolor-bolsillo.png"` · `"shopify://shop_images/athlex-dolor-vestuario.png"` · `"shopify://shop_images/athlex-dolor-noche.png"`
- `frase`: `"EVITÁS TENER RELACIONES"` · `"TE RASCÁS A ESCONDIDAS"` · `"TE ESCONDÉS PARA CAMBIARTE"` · `"LA PICAZÓN TE DESPIERTA DE NOCHE"`
- `intro`: `"Se dio la ocasión y pusiste una excusa. Otra vez. No porque no quiera` · `"En el baño del laburo, en el auto antes de bajarte. Aprendiste a hace` · `"En el vestuario esperás a que se vayan todos, o te cambiás mirando a ` · `"Las 3 de la mañana y otra vez despierto. A veces ni te das cuenta: te`

**Bloque `dato`** ×6:
- `titulo`: `"Es un hongo"` · `"Crece con la humedad"` · `"Por eso vuelve"` · `"Y se extiende"` · `"EL HONGO VIVE DE LA HUMEDAD"`
- `texto`: `"No es falta de higiene: es un hongo en la piel."` · `"Transpiración, calor y roce lo alimentan."` · `"La crema calma; la humedad lo trae de nuevo."` · `"A muslos y glúteos. Viaja por la toalla."` · `"En piel seca no crece más. Preguntale a cualquier dermatólogo."`
- `icono`: `"gota"` · `"vuelve"` · `"extiende"` · `"seco"` · `"frio"`

## athlex-mecanismo

Dónde: product.athlex-landing#mecanismo

| Ajuste | Valores |
|---|---|
| `video` | `"shopify://files/videos/athlex-frio-v3.mp4"` |
| `heading` | `"LA PICAZÓN Y EL ARDOR <em>DESAPARECEN al instante</em>"` |
| `lead` | `"Lo tirás a 15 cm, sin tocar la zona. Sentís el alivio instantáneo y, ` |

**Bloque `sello`** ×3:
- `palabra`: `"alivio"` · `"SECO"` · `"LISTO"`
- `texto`: `"Al instante. Con efecto frio y duradero."` · `"Se evapora solo. En segundos."` · `"Te vestís y seguís. Ni la tocaste."`

## comparison-slider

Dónde: product.athlex-landing#comparison_slider_9qeVzq

| Ajuste | Valores |
|---|---|
| `title` | `""` |
| `title_highlight_color` | `"#6d388b"` |
| `text` | `""` |
| `button_label` | `""` |
| `link` | `""` |
| `atc_button_label` | `""` |
| `atc_product` | `""` |
| `atc_skip_cart` | `false` |
| `before_label` | `"Antes de tratar"` |
| `after_label` | `"21 días de uso"` |
| `before_image` | `"shopify://shop_images/8.png"` |
| `after_image` | `"shopify://shop_images/8_._antes_despues_2_copia.png"` |
| `custom_colors_background` | `"#ffffff"` |
| `custom_gradient_background` | `""` |
| `custom_colors_text` | `"#2e2a39"` |

## athlex-uso

Dónde: product.athlex-landing#uso

| Ajuste | Valores |
|---|---|
| `lead` | `"Dos veces por día sobre la piel limpia y seca: a la mañana y a la noc` |
| `nota` | `"No se enjuaga. Y con el uso de todos los días, a las tres semanas la ` |

**Bloque `paso`** ×3:
- `image`: `"shopify://shop_images/athlex-ph-paso-1.jpg"` · `"shopify://shop_images/athlex-ph-paso-2.jpg"` · `"shopify://shop_images/athlex-ph-paso-3.jpg"`
- `num`: `"1"` · `"2"` · `"3"`
- `icon`: `"agitar"` · `"secar"`
- `text`: `"Un par de sacudidas y listo."` · `"Dos o tres golpes sobre la zona y dos centímetros al rededor, sin fro` · `"Unos segundos parado ahí y listo. Después te vestís normal."`
- `tiempo`: `"2 s"` · `"5 s"` · `"8 s"`
- `title`: `"Aplicá a 15 cm"` · `"Dejá secar"`

## athlex-ingredientes

Dónde: product.athlex-landing#ingredientes

| Ajuste | Valores |
|---|---|
| `lista` | `"Aqua\nAlcohol Denat.\nDipropylene Glycol\nPentylene Glycol\nUrea\nPan` |

**Bloque `equipo`** ×5:
- `imagen`: `"shopify://shop_images/athlex-eq-frio.png"` · `"shopify://shop_images/athlex-eq-secado.png"` · `"shopify://shop_images/athlex-eq-calma.png"` · `"shopify://shop_images/athlex-eq-control.png"` · `"shopify://shop_images/athlex-eq-lisa.png"`
- `linea`: `"Dos refrescantes: uno pega al toque, el otro se queda un rato más."` · `"Evapora en segundos y deja la piel con toque seco."` · `"El escuadrón que baja la sensación de picazón y ardor."` · `"Purificantes y control de olor y grasitud."` · `"Renovación suave para la piel que vive rozando."`
- `ingredientes`: `"MENTHYL LACTATE|0,8 %\nMENTHOXYPROPANEDIOL|0,3 %"` · `"ALCOHOL DENAT.|16 %\nSILICA|1 %"` · `"PANTHENOL|2 %\nBISABOLOL|0,3 %\nALLANTOIN|0,3 %\nGLYCYRRHETINIC ACID|` · `"PIROCTONE OLAMINE|0,5 %\nUNDECYLENOYL GLYCINE|0,5 %\nZINC PCA|0,5 %\n` · `"UREA|3 %\nGLUCONOLACTONE|2 %\nSALICYLIC ACID|0,5 %"`
- `palabra`: `"EL SECADO"` · `"LA CALMA"` · `"EL CONTROL"` · `"LA PIEL LISA"`

## athlex-proceso

Dónde: product.athlex-landing#proceso

| Ajuste | Valores |
|---|---|
| `pie` | `""` |

**Bloque `etapa`** ×4:
- `video`: `"shopify://files/videos/athlex-proc-mezcla.mp4"` · `"shopify://files/videos/athlex-proc-llenado.mp4"` · `"shopify://files/videos/athlex-proc-control.mp4"` · `"shopify://files/videos/athlex-proc-empaque.mp4"`
- `num`: `"1"` · `"2"` · `"3"` · `"4"`
- `title`: `"LA FÓRMULA ESTÁ ESCRITA"` · `"SE ELABORA EL LOTE"` · `"SE CONTROLA ANTES DE ENVASAR"` · `"CADA FRASCO SE PUEDE RASTREAR"`
- `text`: `"Cada ingrediente, cada porcentaje, el orden y la temperatura de cada ` · `"Cada ingrediente se pesa en balanza controlada y se mezcla en el orde` · `"De cada lote se saca una muestra y se mide todo: pH, viscosidad, aspe` · `"Cada frasco sale con número de lote y vencimiento, y de cada producci`

## athlex-reviews

Dónde: product.athlex-landing#reviews

| Ajuste | Valores |
|---|---|
| `promedio` | `"4,7"` |
| `cuantas` | `"11 opiniones (DATOS DE PRUEBA)"` |

**Bloque `resena`** ×11:
- `image`: `"shopify://shop_images/athlex-revu-espejo-gym.jpg"` · `"shopify://shop_images/athlex-revu-banio-pileta.jpg"` · `"shopify://shop_images/athlex-revu-auto.jpg"` · `"shopify://shop_images/athlex-revu-cinta.jpg"` · `"shopify://shop_images/athlex-revu-flash-noche.jpg"`
- `title`: `""`
- `text`: `"pensé que me había pegado herpes, pero al final era por la transpirac` · `"Las cremas eran un asco porque quedabas todo pegajoso."` · `"Imposible andar poniéndome pomadas en la calle."` · `"Tenía que ir al baño constantemente o acortar mi entrenamiento."` · `"A los cinco minutos del spray la picazón se había ido."`
- `autor`: `"Marcos T."` · `"Diego R."` · `"Facundo G."` · `"Nicolás P."` · `"Juan M."`
- `fecha`: `"07/26"` · `"06/26"` · `"05/26"`
- `verificada`: `true`
- `destacada`: `true`
- `estrellas`: `4`

## athlex-legal

Dónde: product.athlex-landing#legal

## athlex-skin

Dónde: product.athlex-landing#skin

## athlex-progreso

Dónde: product.athlex-landing#progreso

## ct-hero

Dónde: product.carbotiras-nativo#hero

| Ajuste | Valores |
|---|---|
| `background` | `"#f5f7fa"` |
| `text_color` | `"#0b0b0b"` |
| `caption_size` | `13` |
| `heading` | `""` |
| `words` | `""` |
| `word_color` | `"#5f5e5a"` |
| `heading_size` | `"h0"` |
| `promise_color` | `"#9fe1cb"` |
| `pill_1` | `"2 por día"` |
| `pill_1_icon` | `"event_repeat"` |
| `note` | `""` |

## ct-pasos

Dónde: product.carbotiras-nativo#pasos

| Ajuste | Valores |
|---|---|
| `heading` | `"Sin turno ni consultorio"` |
| `background` | `"#f5f7fa"` |
| `text_color` | `"#0b0b0b"` |
| `accent` | `"#0b0b0b"` |
| `highlight` | `"#9fe1cb"` |

**Bloque `paso`** ×4:
- `title`: `"Secá los dientes"` · `"Pegá las dos tiras"` · `"Esperá y sacala"` · `"Repetí"`
- `tag`: `"10 seg"` · `"1 min"` · `"30 min"` · `"2 por día"`
- `text`: `"Así la tira no se resbala."` · `"Arriba y abajo, presionando con el dedo."` · `"Enjuagate y listo."` · `"Durante 7 días, hasta terminar la caja."`

## ct-resenas

Dónde: product.carbotiras-nativo#resenas_ui

| Ajuste | Valores |
|---|---|
| `mockup_faces` | `true` |
| `background` | `"#f5f7fa"` |
| `text_color` | `"#0b0b0b"` |

**Bloque `resena`** ×8:
- `name`: `"Sofía M."` · `"Martín G."` · `"Lucía R."` · `"Joaquín P."` · `"Camila S."`
- `place`: `"Rosario"` · `"CABA"` · `"Córdoba"` · `"Mendoza"` · `"La Plata"`
- `text`: `"Tomo mate todo el día y se nota. Me las pongo mientras miro una serie` · `"Pensé que eran como las violetas que te pintan los dientes. Estas no ` · `"Re fáciles de usar. Media hora y listo, ni me acuerdo que las tengo p` · `"Fumo y tomo café. Al terminar la caja comparé con la guía de tonos y ` · `"Me las compré para un casamiento. Llegaron rapidísimo."`
- `stars`: `4`

## ct-beneficios

Dónde: product.carbotiras-nativo#beneficios

| Ajuste | Valores |
|---|---|
| `heading` | `"Blanqueá sin cambiar tu rutina"` |
| `card_height` | `160` |
| `image_size` | `148` |
| `background` | `"#f5f7fa"` |
| `text_color` | `"#0b0b0b"` |

**Bloque `beneficio`** ×4:
- `image_down`: `16` · `20`
- `title`: `"Mate, café y pucho"` · `"Media hora y listo"` · `"Arriba y abajo"` · `"Sabor menta"`
- `text`: `"Saca las manchas de todos los días."` · `"Te la ponés y seguís con lo tuyo."` · `"Una tira para cada fila de dientes."` · `"Fresco, nada de gusto a químico."`

## ct-comparar

Dónde: product.carbotiras-nativo#comparar

| Ajuste | Valores |
|---|---|
| `heading` | `""` |
| `note` | `""` |
| `background` | `"#f5f7fa"` |
| `text_color` | `"#0b0b0b"` |

## ct-coverflow

Dónde: product.carbotiras-nativo#videos_ui

| Ajuste | Valores |
|---|---|
| `background` | `"#f5f7fa"` |
| `text_color` | `"#0b0b0b"` |

**Bloque `video`** ×18:
- `quote`: `"Las saco del sobre y van directo"` · `"Pensé que eran como las violetas. No tiñen: sacan"` · `"Media hora y ni me acuerdo que las tengo"` · `"Tomo mate todo el día y se nota"` · `"Las compramos con mi amiga para el casamiento"`
- `name`: `"Lucía R. · Córdoba"` · `"Martín G. · CABA"` · `"Camila S. · La Plata"` · `"Joaquín P. · Mendoza"` · `"Valentina D. · Tucumán"`
- `stars`: `4`

## ct-garantia

Dónde: product.carbotiras-nativo#garantia

| Ajuste | Valores |
|---|---|
| `chip` | `"+ 30 días de la tienda"` |
| `text` | `"Sabemos que hay muchas tiras que prometen y no cumplen. Por eso: usal` |
| `point_1` | `"Un mensaje y listo"` |
| `point_2` | `"30 días de la tienda"` |
| `point_3` | `""` |
| `button_label` | `""` |
| `ring_primary` | `"#0b0b0b"` |
| `ring_secondary` | `"#e4e3de"` |
| `background` | `"#f5f7fa"` |
| `text_color` | `"#0b0b0b"` |

## ct-cierre

Dónde: product.carbotiras-nativo#cierre

| Ajuste | Valores |
|---|---|
| `background` | `"#f5f7fa"` |
| `text_color` | `"#0b0b0b"` |
| `mark_color` | `"#9fe1cb"` |
| `stain_color` | `"#f1dc9c"` |

## gps-steps

Dónde: product.gps-landing#gps_steps_peKf7E

| Ajuste | Valores |
|---|---|
| `note` | `"Ubicación cada minuto por antena de red celular · sin abono de plataf` |

**Bloque `step`** ×3:
- `num`: `"1"` · `"2"` · `"3"`
- `text`: `"De cualquier compañía."` · `"En unos minutos queda andando."` · `"Ves la ubicación actual desde el celu."`
- `signal`: `true`
- `title`: `"Activalo desde el celular"` · `"Localizá cuando quieras"`

## gps-comparativa

Dónde: product.gps-landing#gps_comparativa

**Bloque `row`** ×6:
- `feature`: `"Funciona lejos de casa (no solo a unos metros)"` · `"Se ubica por red celular con chip propio"` · `"Sin abono mensual de plataforma"` · `"Imán incorporado y tamaño mini"` · `"Se paga una sola vez"`
- `other`: `"partial"`

## apps

Dónde: product.gps-landing#177483634895303dd5, product.prod_test#177483634895303dd5, product.prod_test_kaching#177483634895303dd5, product.prod_test_lga#177483634895303dd5

## gps-marquee

Dónde: product.gps-landing#gps_marquee

## gps-cta

Dónde: product.gps-landing#gps_cta

## main-search

Dónde: search#main

## main-account

Dónde: customers/account#main

| Ajuste | Valores |
|---|---|
| `padding_bottom` | `72` |

## main-activate-account

Dónde: customers/activate_account#main

| Ajuste | Valores |
|---|---|
| `padding_bottom` | `72` |

## main-addresses

Dónde: customers/addresses#main

| Ajuste | Valores |
|---|---|
| `padding_bottom` | `72` |

## main-login

Dónde: customers/login#main

| Ajuste | Valores |
|---|---|
| `padding_bottom` | `72` |

## main-order

Dónde: customers/order#main

| Ajuste | Valores |
|---|---|
| `padding_bottom` | `72` |

## main-register

Dónde: customers/register#main

| Ajuste | Valores |
|---|---|
| `padding_bottom` | `72` |

## main-reset-password

Dónde: customers/reset_password#main

| Ajuste | Valores |
|---|---|
| `padding_bottom` | `72` |

## footer

Dónde: footer-group#footer, settings_data#footer

| Ajuste | Valores |
|---|---|
| `color_scheme` | `"accent-1"` |
| `show_social` | `false` |
| `enable_country_selector` | `false` |
| `enabled_payment_types` | `""` |
| `branding_text` | `"Propiedad de DomuHogar - Todos los derechos reservados."` · `"Powered by <a href=\"https://shrinetheme.com/\" target=\"_blank\" tit` |
| `padding_top` | `32` |
| `padding_bottom` | `20` |
| `custom_gradient_background` | `""` |
| `custom_colors_text` | `"#ffffff"` |
| `custom_colors_solid_button_background` | `"#ffffff"` |

**Bloque `brand_information`** ×1:
- `width_desktop`: `2`

**Bloque `link_list`** ×2:
- `heading`: `""`
- `width_desktop`: `4`
- `width_mobile`: `"1"`

**Bloque `image`** ×1:
- `url`: `""`
- `width_desktop`: `4`

**Bloque `email_signup`** ×1:
- `subtext`: `"<p>Join our email list for exclusive offers and the latest news.</p>"`
- `width_desktop`: `4`

## announcement-bar

Dónde: header-group#fe1c8c67-b84c-4466-a515-70df3134c1c0

| Ajuste | Valores |
|---|---|
| `hidden_products` | `""` |
| `displayed_products` | `""` |
| `custom_gradient_background` | `"linear-gradient(23deg, rgba(15, 142, 191, 1) 54%, rgba(252, 254, 255,` |
| `custom_colors_text` | `"#0f455b"` |

**Bloque `announcement`** ×1:
- `text`: `"<strong>Envío a todo el país</strong>"`
- `mobile_text_size`: `10`
- `hidden_products`: `""`
- `displayed_products`: `""`

## header

Dónde: header-group#header, settings_data#header

| Ajuste | Valores |
|---|---|
| `logo_position` | `"middle-center"` |
| `products_mega_menu_links` | `""` |
| `products_mega_menu_display_collection_products` | `true` |
| `products_mega_menu_display_collection_images_on_mobile` | `true` |
| `secondary_menu` | `""` |
| `padding_top` | `4` |
| `padding_bottom` | `4` |

## main-password-header

Dónde: settings_data#main-password-header

## main-password-footer

Dónde: settings_data#main-password-footer

## promo-popup

Dónde: settings_data#promo-popup

| Ajuste | Valores |
|---|---|
| `layout` | `"image_second"` |
| `heading_suffix` | `""` |
| `success_heading_suffix` | `""` |

## scroll-to-top-btn

Dónde: settings_data#scroll-to-top-btn

| Ajuste | Valores |
|---|---|
| `enable_scroll_btn` | `true` |

## global-music-player

Dónde: settings_data#global-music-player

| Ajuste | Valores |
|---|---|
| `audio_src` | `""` |

## cart-drawer

Dónde: settings_data#cart-drawer

| Ajuste | Valores |
|---|---|
| `heading_text` | `"Tu carrito • [count] producto/s"` |
| `desktop_width` | `"large"` |
| `mobile_width` | `"full"` |
| `header_bg_color` | `"#f3f3f3"` |
| `body_bg_color` | `"#f3f3f3"` |
| `footer_bg_color` | `"#f3f3f3"` |

**Bloque `progress_bar`** ×1:
- `progress_message`: `"Te faltan [amount] para tener ENVÍO GRATIS!"`
- `success_message`: `"¡Felicidades! Tienes ENVÍO GRATIS!"`
- `icon_filled`: `true`
- `margin_top`: `0`
- `margin_bottom`: `0`

**Bloque `countdown_timer`** ×1:
- `timer_text`: `"Perderas tu descuento en:<strong> [timer]</strong>"`
- `color_scheme`: `"accent-2"`
- `margin_bottom`: `0`

**Bloque `cart_items`** ×1:
- `image_link`: `true`
- `title_size`: `"1.3"`
- `displayed_variants`: `"compact"`
- `prices_position`: `"left"`
- `enable_savings`: `true`
- `savings_text`: `"<strong>(Ahorras [amount]!)</strong>"`
- `quantity_corner_radius`: `6`
- `quantity_border_color`: `"#787878"`
- `quantity_input_padding`: `0.7`
- `quantity_separators_opacity`: `20`
- `quantity_round_btns`: `true`
- `margin_top`: `21`
- `margin_bottom`: `21`

**Bloque `cart_note`** ×1: sin cambios

**Bloque `discount_field`** ×1:
- `bottom_separator`: `false`
- `placeholder`: `"Código de descuento"`
- `btn_label`: `"Usar"`
- `error_msg`: `"Agrega un código valido"`
- `margin_top`: `9`
- `margin_bottom`: `0`

**Bloque `subtotals`** ×1:
- `display_total_savings`: `true`
- `savings_left_text`: `"Descuentos"`
- `savings_right_text`: `"-[savings]"`
- `savings_text_size`: `14`
- `savings_spacing`: `0`
- `subtotal_left_text`: `"<strong>Subtotal</strong>"`
- `subtotal_text_size`: `17`
- `display_discounts`: `false`
- `discounts_label`: `"<strong>Descuentos:</strong>"`

**Bloque `checkout_btn`** ×1:
- `display_price`: `true`

**Bloque `payment_badges`** ×1:
- `enabled_payment_types`: `""`
