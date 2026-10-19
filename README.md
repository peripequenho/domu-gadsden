# DOMU sobre Gadsden

Rearmado de la tienda **DOMU Hogar** (domuhogar.com, `mem1a9-ev.myshopify.com`) sobre el theme libre [Gadsden](https://github.com/peripequenho/gadsden-theme) 1.1.0, como copia 1 a 1 de la configuración y el contenido que DOMU tenía en su theme anterior (Shrine PRO 1.3.0) hasta el 15-oct-2026.

- **Theme en la tienda:** "Gadsden 1.2.7", id `167835435171`, publicado el 21-oct-2026. Quedan sin publicar: `167834222755` (Gadsden 1.2.6, la vuelta atrás), `167811842211` (1.2.5), `167661797539` (DOMU propio en Dawn, la referencia), `154455212195` (export de abril) y `154454491299` (Horizon).
- **Base:** Gadsden `v1.1.0` (commit en `.gadsden-base`), sin tocar. Lo único propio de DOMU es configuración y contenido: `theme/config/settings_data.json`, `theme/sections/*-group*.json`, `theme/templates/*.json` y los bloques de código propio (custom liquid) que DOMU ya tenía escritos.
- **Referencia:** la copia del theme de Shrine del 15-oct-2026 está **fuera de este repo** (`D:\_refs\shrine-domu-og-2026-10-15\` en la PC de trabajo). Es código de un tercero: de ahí se leen sólo los JSON de configuración y los schemas, y nada de ese código entra acá.

## Contenido

- `theme/`: Gadsden 1.1.0 + configuración de DOMU.
- `tools/`: scripts que generan la configuración de Gadsden desde los JSON de la referencia (`build_*.js`), inventario y verificación.
- `capturas/`: `nuevo/` (el theme rearmado), `original/` (referencias visuales, si las hay) y `comparacion/`.
- `INVENTARIO.md`, `MAPEO.md`, `COMPARACION.md`, `GAPS-GADSDEN.md`, `DIFF-CONTENIDO-15OCT.md`, `BUILD-DOMU.md` (bitácora).

## Regenerar y subir

```bash
node tools/build_globals.js          # settings_data, cabecera, pie y variantes por mercado
node tools/build_templates.js all    # las 35 plantillas (o: pages, products, product.gps-landing…)
node tools/check_refs.js             # cada imagen y video referenciado existe en Archivos
node tools/secrets.js                # barrido de secretos antes de cada push
shopify theme check --path theme
shopify theme push --path theme --store mem1a9-ev --theme <id> --nodelete --only <archivos>
```

O `bash tools/push.sh <archivos>` (usa `THEME_ID`). Verificar con `node tools/check.js <ruta> <nombre> --template <plantilla>`. Nunca `--allow-live`. Para cambios con el theme ya publicado: duplicarlo desde el admin, subir al duplicado, revisar con `?preview_theme_id=<id>` y publicar.

## Volver atrás

El theme anterior, "DOMU propio (Dawn)" (id `167661797539`), queda en la tienda sin publicar y no se borra. Para volver a él:

```bash
shopify theme publish --theme 167794409635 --store mem1a9-ev --force   # Gadsden 1.0.1; el Dawn es 167661797539
```

O desde el admin: *Tienda online > Temas > DOMU propio (Dawn) > Publicar*.
