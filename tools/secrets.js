// Barrido de secretos antes de cada push: busca tokens, claves y contraseñas en todo lo que va al repo
// (excepto binarios y el código de Gadsden, que ya es público). Sale con código 1 si encuentra algo.
// Uso: node tools/secrets.js
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const ROOT = path.join(__dirname, '..');
const PATTERNS = [
  /shp(at|ca|pa|ss)_[0-9a-f]{20,}/i, /\bsk_(live|test)_[0-9a-z]{10,}/i, /\bBearer\s+[A-Za-z0-9._-]{16,}/,
  /gh[pousr]_[A-Za-z0-9]{30,}/, /AKIA[0-9A-Z]{16}/, /-----BEGIN [A-Z ]*PRIVATE KEY-----/,
  /(api[_-]?key|secret|password|contraseña|passwd|access[_-]?token)["'\s:=]+["'][^"'\s]{8,}["']/i,
  /APP_USR-[0-9a-f-]{20,}/i, /xox[baprs]-[0-9A-Za-z-]{10,}/,
];
// Archivos que se suben: los rastreados más los nuevos (sin ignorados).
const files = execSync('git ls-files -co --exclude-standard', { cwd: ROOT, encoding: 'utf8' }).split('\n').filter(Boolean)
  .filter(f => !/\.(png|jpe?g|webp|gif|mp4|webm|woff2?|ttf|ico|zip)$/i.test(f))
  // El código y los textos de Gadsden ya son públicos y no se tocan: se barre lo que pone DOMU.
  .filter(f => !/^theme\/(assets|snippets|layout|locales)\//.test(f) && !/^theme\/sections\/.*\.liquid$/.test(f));
let hits = 0;
for (const f of files) {
  const txt = fs.readFileSync(path.join(ROOT, f), 'utf8');
  txt.split('\n').forEach((line, i) => {
    for (const re of PATTERNS) if (re.test(line)) { hits++; console.log(`${f}:${i + 1}: ${line.trim().slice(0, 160)}`); }
  });
}
console.log(hits ? `\n${hits} posibles secretos: revisar antes de subir.` : `OK: ${files.length} archivos sin secretos.`);
process.exit(hits ? 1 : 0);
