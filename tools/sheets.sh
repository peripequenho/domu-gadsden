#!/usr/bin/env bash
# Hoja por plantilla: captura desktop (a 960 px) y mobile (a 320 px) lado a lado, en capturas/comparacion/.
# Uso: bash tools/sheets.sh [nombre ...]   (sin nombres: todas las de capturas/nuevo/)
cd /d/PROYECTOS/DOMU/domu-gadsden/capturas || exit 1
mkdir -p comparacion
names=("$@")
[ ${#names[@]} -eq 0 ] && names=($(ls nuevo/*-d.jpg | sed 's#nuevo/##; s#-d\.jpg##'))
h() { ffprobe -v error -show_entries stream=width,height -of csv=p=0 "$1" | awk -F, -v w="$2" '{printf "%d", $2 * w / $1}'; }
for n in "${names[@]}"; do
  d="nuevo/$n-d.jpg"; m="nuevo/$n-m.jpg"
  [ -f "$d" ] && [ -f "$m" ] || continue
  hd=$(h "$d" 960); hm=$(h "$m" 320); H=$(( hd > hm ? hd : hm )); H=$(( (H + 1) / 2 * 2 ))
  ffmpeg -v error -y -i "$d" -i "$m" -filter_complex \
    "[0]scale=960:$hd,pad=980:$H:0:0:white[a];[1]scale=320:$hm,pad=320:$H:0:0:white[b];[a][b]hstack=inputs=2" -q:v 5 "comparacion/$n.jpg" && echo -n "$n "
done
echo
