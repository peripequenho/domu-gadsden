// Verificación de una página del theme (Chrome sin ventana, UA real, reducir movimiento en no-preference):
// desktop 1440 y mobile 390. Junta errores de Liquid, de consola y de red, scroll horizontal, secciones en orden
// (contra la plantilla de theme/templates si se pasa), imágenes y videos que no cargan y cajas de marcador vacías.
// Guarda la página entera en capturas/nuevo/<nombre>-d.png y -m.png y el reporte en capturas/nuevo/<nombre>.json.
// Uso: node tools/check.js <ruta> <nombre> [--template product.gps-landing] [--live] [--only d|m] [--eval "js"]
const puppeteer = require('D:/_envs/anim-3js-lab/node_modules/puppeteer-core');
const { fs, path, ROOT, THEME, readJSON } = require('./lib');
const THEME_ID = process.env.THEME_ID || '167794409635';
const SHOP = 'https://domuhogar.com';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36';
const args = process.argv.slice(2);
const flag = n => { const i = args.indexOf(n); if (i < 0) return null; const v = args[i + 1]; args.splice(i, 2); return v; };
const bool = n => { const i = args.indexOf(n); if (i < 0) return false; args.splice(i, 1); return true; };
const template = flag('--template');
const only = flag('--only');
const evalCode = flag('--eval');
const live = bool('--live');
const [rawRoute, name] = args;
// Git Bash convierte /ruta en C:/Program Files/Git/ruta: se deshace.
const route = rawRoute.replace(/^[A-Z]:\/.*?\/Git(?=\/)/i, '');
const outDir = path.join(ROOT, 'capturas', live ? 'produccion' : 'nuevo');
fs.mkdirSync(outDir, { recursive: true });

function url() {
  if (live) return SHOP + route;
  return SHOP + route + (route.includes('?') ? '&' : '?') + 'preview_theme_id=' + THEME_ID;
}
async function run(browser, vp) {
  const page = await browser.newPage();
  await page.setUserAgent(UA);
  if (vp === 'm') await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 1 });
  else if (vp === 't') await page.setViewport({ width: 768, height: 1024, isMobile: true, hasTouch: true, deviceScaleFactor: 1 });
  else await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'no-preference' }]);
  const errors = [];
  page.on('pageerror', e => errors.push('JS: ' + e.message.slice(0, 200)));
  page.on('console', m => m.type() === 'error' && errors.push('consola: ' + m.text().slice(0, 200)));
  page.on('response', r => r.status() >= 400 && !/favicon|monorail|\/web-pixels|\/api\/collect|shop\.app|clarity\.ms/.test(r.url()) && errors.push(r.status() + ' ' + r.url().slice(0, 160)));
  let resp;
  for (let i = 0; i < 3; i++) {
    resp = await page.goto(url(), { waitUntil: 'networkidle2', timeout: 90000 }).catch(e => ({ status: () => 0, err: e.message }));
    if (resp.err) console.log(vp, 'goto:', resp.err);
    if (resp.status() !== 429) break;
    await new Promise(r => setTimeout(r, 30000));
  }
  // La vista previa puede redirigir una vez (cookie del theme): esperar a que la página quede quieta.
  for (let i = 0; i < 5; i++) {
    await new Promise(r => setTimeout(r, 1200));
    await page.waitForNetworkIdle({ idleTime: 500, timeout: 30000 }).catch(() => {});
    // Sólo para la captura: el degradé de Dawn va con background-attachment fixed y en una captura de página entera
    // pinta nada más el primer alto de pantalla. En el navegador real acompaña el scroll.
    try { await page.addStyleTag({ content: '#PBarNextFrameWrapper,#preview-bar-iframe{display:none!important} .gradient{background-attachment:scroll!important}' }); break; } catch (e) { if (i === 4) throw e; }
  }
  // Bajar de a una pantalla para disparar la carga diferida y las apariciones.
  await page.evaluate(async () => {
    const h = () => document.documentElement.scrollHeight;
    for (let y = 0; y < h(); y += innerHeight * 0.8) { scrollTo(0, y); await new Promise(r => setTimeout(r, 250)); }
    scrollTo(0, 0); await new Promise(r => setTimeout(r, 600));
  });
  if (evalCode) { const r = await page.evaluate(evalCode); console.log(vp, 'eval:', JSON.stringify(r)); await new Promise(r => setTimeout(r, 2500)); }
  const info = await page.evaluate(() => {
    const html = document.documentElement.outerHTML;
    const liquid = [...new Set((html.match(/Liquid (syntax )?error[^<]{0,160}/g) || []))];
    const secs = [...document.querySelectorAll('main .shopify-section, main > .shopify-section')].map(s => ({
      id: s.id.replace(/^shopify-section-template--\d+__/, ''), h: Math.round(s.getBoundingClientRect().height), empty: !s.innerText.trim() && !s.querySelector('img,video,iframe,svg'),
    }));
    const imgs = [...document.querySelectorAll('img')].filter(i => i.offsetParent !== null || i.closest('main'));
    const broken = imgs.filter(i => i.complete && i.naturalWidth === 0 && (i.currentSrc || i.src)).map(i => (i.currentSrc || i.src).slice(0, 140));
    const placeholders = [...document.querySelectorAll('main .placeholder-svg, main svg.placeholder')].map(p => p.closest('.shopify-section')?.id.replace(/^shopify-section-template--\d+__/, ''));
    const videos = [...document.querySelectorAll('main video')].map(v => ({ src: (v.currentSrc || v.querySelector('source')?.src || '').slice(0, 120), state: v.readyState, err: v.error && v.error.code }));
    return { title: document.title, theme: (window.Shopify && Shopify.theme && Shopify.theme.name) || '', w: innerWidth, sw: document.documentElement.scrollWidth,
      liquid, secs, broken, placeholders: [...new Set(placeholders)], videos: videos.filter(v => v.err || !v.src) , nVideos: videos.length, nImgs: imgs.length };
  });
  info.status = resp.status(); info.errors = [...new Set(errors)];
  info.hscroll = info.sw > info.w + 1;
  const file = path.join(outDir, `${name}-${vp}.jpg`);
  const total = await page.evaluate(() => document.documentElement.scrollHeight);
  // Tope de alto para que el PNG no explote (las landings largas se cortan; el reporte cubre todo).
  await page.screenshot({ path: file, type: 'jpeg', quality: 80, fullPage: total <= 16000, ...(total > 16000 ? { clip: { x: 0, y: 0, width: { m: 390, t: 768 }[vp] || 1440, height: 16000 } } : {}), captureBeyondViewport: true });
  await page.close();
  return info;
}
(async () => {
  const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true, args: ['--mute-audio', '--hide-scrollbars'] });
  const res = {};
  for (const vp of only ? [only] : ['d', 'm']) res[vp] = await run(browser, vp);
  await browser.close();
  if (template) {
    const t = readJSON(path.join(THEME, 'templates', template + '.json'));
    const want = (t.order || Object.keys(t.sections)).filter(id => !t.sections[id].disabled);
    for (const vp of Object.keys(res)) {
      const got = res[vp].secs.map(s => s.id);
      res[vp].missing = want.filter(id => !got.includes(id));
      res[vp].orderOk = JSON.stringify(got.filter(id => want.includes(id))) === JSON.stringify(want.filter(id => got.includes(id)));
    }
  }
  // Se combina con lo que ya había (p. ej. correr sólo tablet no borra desktop y mobile).
  const jf = path.join(outDir, name + '.json');
  const prev = fs.existsSync(jf) ? JSON.parse(fs.readFileSync(jf, 'utf8')) : {};
  fs.writeFileSync(jf, JSON.stringify({ ...prev, ...res }, null, 1));
  for (const [vp, r] of Object.entries(res)) {
    console.log(`[${vp}] ${r.status} theme="${r.theme}" secciones=${r.secs.length} imgs=${r.nImgs} videos=${r.nVideos} hscroll=${r.hscroll}${template ? ` faltan=${JSON.stringify(r.missing)} orden=${r.orderOk}` : ''}`);
    if (r.liquid.length) console.log('  LIQUID:', r.liquid.join(' | '));
    if (r.errors.length) console.log('  errores:', r.errors.join(' | '));
    if (r.broken.length) console.log('  imágenes rotas:', r.broken.join(' | '));
    if (r.placeholders.length) console.log('  marcadores:', r.placeholders.join(', '));
    if (r.videos.length) console.log('  videos con problema:', JSON.stringify(r.videos));
    const empty = r.secs.filter(s => s.empty || s.h < 4).map(s => s.id); if (empty.length) console.log('  secciones vacías o sin alto:', empty.join(', '));
  }
})();
