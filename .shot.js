const { chromium } = require('playwright');
const path = require('path');
const BASE = 'http://localhost:3001';
const OUT = path.join(process.cwd(), 'screenshots');
const routes = [
  ['home', '/'], ['sofas', '/sofas'], ['sofas-l-shaped', '/sofas/l-shaped-sofas'],
  ['beds', '/beds'], ['beds-king-size', '/beds/king-size'],
  ['furniture', '/furniture'], ['furniture-dining-tables', '/furniture/dining-tables'],
  ['collections', '/collections'], ['about', '/about'], ['contact', '/contact'],
  ['faq', '/faq'], ['guides', '/guides'],
  ['showroom-chennai', '/sofa-showroom-chennai'],
  ['showroom-virugambakkam', '/sofa-showroom-virugambakkam'],
  ['privacy-policy', '/privacy-policy'], ['terms-and-conditions', '/terms-and-conditions'],
  ['thank-you', '/thank-you'],
];
const viewports = [['desktop', 1440, 900], ['mobile', 390, 844]];

(async () => {
  const browser = await chromium.launch();
  for (const [vpName, width, height] of viewports) {
    const ctx = await browser.newContext({
      viewport: { width, height }, deviceScaleFactor: 2,
      isMobile: vpName === 'mobile', hasTouch: vpName === 'mobile',
    });
    const page = await ctx.newPage();
    for (const [name, route] of routes) {
      try {
        const res = await page.goto(BASE + route, { waitUntil: 'load', timeout: 60000 });

        // 1. wait for the preloader overlay to fully unmount (it locks body scroll)
        await page.waitForSelector('.preloader', { state: 'detached', timeout: 20000 })
          .catch(() => console.log(`   (no preloader detach on ${name})`));

        // 2. now that scrolling is unlocked, walk the page to trigger reveal animations
        await page.evaluate(() => new Promise((resolve) => {
          let y = 0;
          const step = () => {
            window.scrollTo(0, y);
            y += Math.round(window.innerHeight * 0.8);
            if (y < document.body.scrollHeight) setTimeout(step, 150);
            else { window.scrollTo(0, document.body.scrollHeight); setTimeout(() => { window.scrollTo(0, 0); setTimeout(resolve, 500); }, 400); }
          };
          step();
        }));

        // 3. let every image finish decoding
        await page.evaluate(() => Promise.all(
          Array.from(document.images)
            .filter((i) => !i.complete)
            .map((i) => new Promise((r) => { i.onload = i.onerror = r; }))
        ));

        // 4. settle any in-flight transitions
        await page.waitForLoadState('networkidle').catch(() => {});
        await page.waitForTimeout(800);

        await page.screenshot({ path: path.join(OUT, vpName, `${name}.png`), fullPage: true });
        const stuck = await page.locator('.preloader').count();
        console.log(`${vpName}/${name}.png  [${res && res.status()}]${stuck ? '  ** PRELOADER STILL PRESENT **' : ''}`);
      } catch (e) {
        console.log(`FAIL ${vpName}/${name}: ${e.message.split('\n')[0]}`);
      }
    }
    await ctx.close();
  }
  await browser.close();
})();
