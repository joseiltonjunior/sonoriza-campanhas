const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  await page.setViewport({ width: 1080, height: 1350, deviceScaleFactor: 1 });

  const filePath = path.resolve(__dirname, 'campanha.html');
  await page.goto(`file://${filePath}`, { waitUntil: 'networkidle0' });

  // Aguarda fontes do Google Fonts carregarem
  await new Promise(r => setTimeout(r, 2500));

  const count = await page.$$eval('.frame', f => f.length);
  console.log(`Encontrados ${count} slides.`);

  for (let i = 0; i < count; i++) {
    await page.evaluate((index) => {
      const frameCols = document.querySelectorAll('.frame-col');
      const frames    = document.querySelectorAll('.frame');
      const slides    = document.querySelectorAll('.slide');

      // Esconde todos os frame-cols
      frameCols.forEach(fc => fc.style.display = 'none');

      // Mostra somente o slide alvo em tamanho real
      const col   = frameCols[index];
      const frame = frames[index];
      const slide = slides[index];

      col.style.display    = 'block';
      col.style.margin     = '0';
      col.style.padding    = '0';

      // Esconde o label de frame (ex: "08 / 08 — CTA")
      const label = col.querySelector('.frame-label');
      if (label) label.style.display = 'none';

      frame.style.width    = '1080px';
      frame.style.height   = '1350px';
      frame.style.borderRadius = '0';
      frame.style.boxShadow    = 'none';
      slide.style.transform    = 'none';

      // Remove padding do body e wrap
      document.body.style.padding = '0';
      document.body.style.margin  = '0';
      const wrap = document.querySelector('.wrap');
      wrap.style.display = 'block';
      wrap.style.gap     = '0';
      wrap.style.padding = '0';
    }, i);

    const filename = `slide-${String(i + 1).padStart(2, '0')}.png`;
    await page.screenshot({
      path: path.resolve(__dirname, filename),
      clip: { x: 0, y: 0, width: 1080, height: 1350 },
    });

    console.log(`✓ ${filename}`);
  }

  await browser.close();
  console.log('\nPronto! Arquivos salvos em:', __dirname);
})();
