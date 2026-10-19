// Compara una página sección por sección entre dos themes (referencia vs. nuevo), a 1440 y 390.
// Captura la página entera de la referencia en capturas/original/<nombre>-referencia-dawn-{d,m}.png y cada sección
// (por el id de sección, que es el mismo en las dos plantillas) en tmp/cmp/<nombre>/<ref|new>-<vp>-<id>.png.
// Después arma con ffmpeg una hoja por sección (referencia | nuevo) en capturas/comparacion/<nombre>-<id>-<vp>.jpg.
// Uso: node tools/compare_sections.js <ruta> <nombre> <theme referencia> <theme nuevo> [ids...]
const puppeteer = require('D:/_envs/anim-3js-lab/node_modules/puppeteer-core');
const { execFileSync } = require('child_process');
const { fs, path, ROOT } = require('./lib');
const SHOP = 'https://domuhogar.com';
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36';
const [rawRoute, name, refId, newId, ...only] = process.argv.slice(2);
const route = rawRoute.replace(/^[A-Z]:\/.*?\/Git(?=\/)/i, '');
const tmp = path.join(ROOT, 'tmp', 'cmp', name);
fs.mkdirSync(tmp, { recursive: true });
fs.mkdirSync(path.join(ROOT, 'capturas', 'original'), { recursive: true });
fs.mkdirSync(path.join(ROOT, 'capturas', 'comparacion'), { recursive: true });

async function shoot(browser, theme, vp, tag) {
  const page = await browser.newPage();
  await page.setUserAgent(UA);
  if (vp === 'm') await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 1 });
  else await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'no-preference' }]);
  // Como check.js: la vista previa redirige una vez (cookie del theme) y los videos en bucle no dejan la red quieta.
  await page.goto(`${SHOP}${route}${route.includes('?') ? '&' : '?'}preview_theme_id=${theme}`, { waitUntil: 'domcontentloaded', timeout: 90000 }).catch((e) => console.log(vp, 'goto:', e.message));
  for (let i = 0; i < 5; i++) {
    await new Promise((r) => setTimeout(r, 1200));
    await page.waitForNetworkIdle({ idleTime: 500, timeout: 30000 }).catch(() => {});
    if (await page.$('[id^="shopify-section-template"]').catch(() => null)) break;
  }
  // Dawn pinta .gradient con background-attachment fixed: en capturas largas sólo sale el primer alto.
  await page.addStyleTag({ content: '*{background-attachment:scroll!important} .shopify-preview-bar,#preview-bar-iframe,#PBarNextFrameWrapper{display:none!important}' });
  // Recorrer la página para que carguen las imágenes diferidas y se disparen las animaciones de entrada.
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 400) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); }
    window.scrollTo(0, 0);
  });
  await new Promise((r) => setTimeout(r, 2500));
  // Página entera (como check.js) y recorte por sección: la captura por elemento agarraba las animaciones de entrada a medias.
  const boxes = await page.evaluate(() => [...document.querySelectorAll('[id^="shopify-section-template"]')].map((s) => {
    const r = s.getBoundingClientRect();
    return { full: s.id, y: Math.round(r.top + scrollY), h: Math.round(r.height) };
  }));
  const whole = path.join(tmp, `${tag}-${vp}-page.png`);
  await page.screenshot({ path: whole, fullPage: true, captureBeyondViewport: true });
  if (tag === 'ref') fs.copyFileSync(whole, path.join(ROOT, 'capturas', 'original', `${name}-referencia-dawn-${vp}.png`));
  const W = vp === 'd' ? 1440 : 390;
  const out = {};
  for (const { full, y, h } of boxes) {
    const id = full.replace(/^.*__/, '');
    if ((only.length && !only.includes(id)) || h < 4) continue;
    const file = path.join(tmp, `${tag}-${vp}-${id}.png`);
    execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', whole, '-vf', `crop=${W}:${h}:0:${y}`, file]);
    out[id] = file;
  }
  const ids = boxes.map((x) => x.full);
  await page.close();
  return { ids: ids.map((f) => f.replace(/^.*__/, '')), out };
}

(async () => {
  const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: true, args: ['--mute-audio'] });
  const report = {};
  try {
    for (const vp of ['d', 'm']) {
      const ref = await shoot(browser, refId, vp, 'ref');
      const neu = await shoot(browser, newId, vp, 'new');
      report[vp] = { ref: ref.ids, new: neu.ids };
      const W = vp === 'd' ? 720 : 390;
      for (const id of new Set([...Object.keys(ref.out), ...Object.keys(neu.out)])) {
        const a = ref.out[id], b = neu.out[id];
        const dst = path.join(ROOT, 'capturas', 'comparacion', `${name}-${id}-${vp}.jpg`);
        if (a && b) {
          execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', a, '-i', b, '-filter_complex',
            `[0]scale=${W}:-2[a];[1]scale=${W}:-2[b];[a][b]xstack=inputs=2:layout=0_0|w0+20_0:fill=white`, '-q:v', '4', dst]);
        } else {
          execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', a || b, '-vf', `scale=${W}:-2`, '-q:v', '4', dst]);
        }
        console.log(vp, id, a ? 'ref' : '-', b ? 'nuevo' : '-');
      }
    }
  } finally {
    await browser.close();
  }
  fs.writeFileSync(path.join(tmp, 'ids.json'), JSON.stringify(report, null, 2));
})();
