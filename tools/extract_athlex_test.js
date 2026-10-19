// Saca el contenido del test de ATHLEX (preguntas, opciones y resultados) de la sección propia de Gero
// `athlex-test.liquid` (código de DOMU, no de Shrine; copia del Dawn vivo). En Shrine ese contenido estaba
// escrito en el Liquid y no en ajustes: para el cuestionario de Gadsden tiene que ir en bloques.
// Sólo se extrae texto; el código no se usa. Escribe tools/data/athlex-test.json.
const { fs, path, ROOT } = require('./lib');
const src = fs.readFileSync('D:/_refs/domu-live-167661797539/sections/athlex-test.liquid', 'utf8');
const clean = s => s.replace(/\s+/g, ' ').trim();
const inner = (html, re) => { const m = html.match(re); return m ? clean(m[1]) : ''; };
const questions = [...src.matchAll(/<div class="ax-paso" data-q="(\d+)" hidden>([\s\S]*?)\n    <\/div>/g)].map(([, n, h]) => ({
  n: +n,
  question: inner(h, /<h2>([\s\S]*?)<\/h2>/),
  help: inner(h, /<p class="ax-ayuda">([\s\S]*?)<\/p>/),
  cheer: inner(h, /<p class="ax-aliento">([\s\S]*?)<\/p>/),
  options: [...h.matchAll(/<button type="button" class="ax-op" data-v="([^"]+)"><b>([\s\S]*?)<\/b>([\s\S]*?)<\/button>/g)].map(([, v, b, d]) => ({ v, title: clean(b), desc: clean(d) })),
}));
const results = [...src.matchAll(/<div class="ax-paso ax-res" data-res="([^"]+)" hidden>([\s\S]*?)<button type="button" class="ax-reset"/g)].map(([, id, h]) => {
  h += '<button type="button" class="ax-reset"';
  const chapa = inner(h, /<span class="ax-chapa[^"]*"><span>([\s\S]*?)<\/span><\/span>/);
  const title = inner(h, /<h2>([\s\S]*?)<\/h2>/);
  // Cuerpo: todo lo que va entre el título y el botón de reiniciar, sin los huecos del espejo y de la caja.
  let body = h.slice(h.indexOf('</h2>') + 5, h.indexOf('<button type="button" class="ax-reset"'))
    .replace(/<div data-espejo><\/div>/g, '').replace(/<div data-caja><\/div>/g, '');
  return { id, chapa, title, body: body.trim() };
});
const intro = {
  eyebrow: inner(src, /<span class="ax-eye"><span>([\s\S]*?)<\/span><\/span>/),
  bullets: [...src.match(/<ul class="ax-nada">([\s\S]*?)<\/ul>/)[1].matchAll(/<span>([\s\S]*?)<\/span>/g)].map(m => clean(m[1])),
};
fs.mkdirSync(path.join(ROOT, 'tools/data'), { recursive: true });
fs.writeFileSync(path.join(ROOT, 'tools/data/athlex-test.json'), JSON.stringify({ intro, questions, results }, null, 1));
console.log(questions.length, 'preguntas', questions.map(q => q.options.length).join(','), '|', results.map(r => r.id).join(','));
