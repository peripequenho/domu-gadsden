// Sube archivos locales a Contenido > Archivos con su nombre original (stagedUploadsCreate + POST + fileCreate).
// Saltea los que ya existen con ese nombre (tmp/files.json, bajado con files_pull.js). Uso: node tools/files_upload.js <archivo>...
const { fs, path, ROOT, gql } = require('./lib');
const { execFileSync } = require('child_process');
const existing = new Set(require(path.join(ROOT, 'tmp/files.json')).map(f => f.name));
const MIME = { svg: 'image/svg+xml', jpg: 'image/jpeg', jpeg: 'image/jpeg', webp: 'image/webp', png: 'image/png', gif: 'image/gif', mp4: 'video/mp4' };
const files = process.argv.slice(2).filter(f => { const n = path.basename(f); if (existing.has(n)) { console.log('ya está:', n); return false; } return true; });
for (let i = 0; i < files.length; i += 10) {
  const batch = files.slice(i, i + 10).map(f => {
    const ext = f.split('.').pop().toLowerCase();
    return { f, filename: path.basename(f), mimeType: MIME[ext], fileSize: String(fs.statSync(f).size), resource: ext === 'mp4' ? 'VIDEO' : 'IMAGE', contentType: ext === 'mp4' ? 'VIDEO' : 'IMAGE' };
  });
  const st = gql(`mutation($input: [StagedUploadInput!]!) { stagedUploadsCreate(input: $input) { stagedTargets { url resourceUrl parameters { name value } } userErrors { field message } } }`,
    { input: batch.map(b => ({ filename: b.filename, mimeType: b.mimeType, resource: b.resource, httpMethod: 'POST', fileSize: b.fileSize })) });
  const errs = st.stagedUploadsCreate.userErrors; if (errs.length) throw new Error(JSON.stringify(errs));
  st.stagedUploadsCreate.stagedTargets.forEach((t, k) => {
    const args = ['-s', '-o', require('os').devNull, '-w', '%{http_code}'];
    t.parameters.forEach(p => args.push('-F', `${p.name}=${p.value}`));
    args.push('-F', `file=@${batch[k].f}`, t.url);
    const code = execFileSync('curl', args, { encoding: 'utf8' });
    if (!/^20/.test(code)) throw new Error(`POST ${batch[k].filename}: HTTP ${code}`);
    batch[k].src = t.resourceUrl;
  });
  const fc = gql(`mutation($files: [FileCreateInput!]!) { fileCreate(files: $files) { files { id fileStatus } userErrors { field message } } }`,
    { files: batch.map(b => ({ originalSource: b.src, contentType: b.contentType, filename: b.filename })) });
  if (fc.fileCreate.userErrors.length) throw new Error(JSON.stringify(fc.fileCreate.userErrors));
  batch.forEach((b, k) => console.log('subido:', b.filename, fc.fileCreate.files[k].id));
}
