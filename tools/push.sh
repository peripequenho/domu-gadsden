#!/usr/bin/env bash
# Sube archivos sueltos de theme/ al theme "DOMU Gadsden" (sin publicar) sin borrar nada:
#   tools/push.sh config/settings_data.json templates/index.json
# Nunca --allow-live: si el theme ya está publicado, la CLI se niega.
THEME_ID=${THEME_ID:-167794409635}
cd /d/PROYECTOS/DOMU/domu-gadsden/theme || exit 1
args=()
for f in "$@"; do args+=(--only "$f"); done
MSYS_NO_PATHCONV=1 timeout 900 shopify theme push --theme "$THEME_ID" --store mem1a9-ev --nodelete --json "${args[@]}" 2>&1 | grep -v '"type":"progress"' | tail -8
