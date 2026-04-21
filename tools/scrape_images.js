const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const puppeteer = require('puppeteer');

async function download(url, dest) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? https : http;
    const req = lib.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        // follow redirects
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error('Response status ' + res.statusCode + ' for ' + url));
      }
      const file = fs.createWriteStream(dest);
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
      file.on('error', (err) => reject(err));
    });
    req.on('error', reject);
  });
}

(async () => {
  const url = 'https://www.heartfeltcraftsco.com/';
  const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
  const page = await browser.newPage();
  await page.setViewport({width: 1200, height: 2000});
  await page.goto(url, {waitUntil: 'networkidle2', timeout: 30000});

  // Extract image URLs and background images
  const assets = await page.evaluate(() => {
    const imgs = Array.from(document.images).map((i) => i.src).filter(Boolean);
    // background images
    const bgs = [];
    const all = Array.from(document.querySelectorAll('*'));
    all.forEach((el) => {
      try {
        const s = window.getComputedStyle(el).backgroundImage || '';
        if (s && s !== 'none') {
          // extract url("...") pattern
          const m = s.match(/url\(["']?(.*?)["']?\)/);
          if (m && m[1]) bgs.push(m[1]);
        }
      } catch (e) {}
    });
    const unique = Array.from(new Set(imgs.concat(bgs))).filter(Boolean);

    // get computed primary color candidate: look for meta theme-color, inline headers, or hero backgrounds
    const themeMeta = document.querySelector('meta[name="theme-color"]')?.content || null;

    // heuristics: find a large image element (naturalWidth >= 600)
    const largeImgs = Array.from(document.images).filter((i) => (i.naturalWidth || 0) >= 600).map((i) => i.src);

    // find hero-like elements with big background images
    const heroBgs = unique.slice(0, 5);

    // body background color
    const bodyBg = window.getComputedStyle(document.body).backgroundColor;

    return {unique, largeImgs, heroBgs, themeMeta, bodyBg};
  });

  console.log('Found', assets.unique.length, 'asset URLs');
  // Choose up to 3 image URLs: prefer largeImgs, then unique list
  const chosen = [];
  for (const u of assets.largeImgs) {
    if (chosen.length >= 3) break;
    if (u && !u.startsWith('data:')) chosen.push(u);
  }
  for (const u of assets.unique) {
    if (chosen.length >= 3) break;
    if (u && !u.startsWith('data:') && !chosen.includes(u)) chosen.push(u);
  }

  // fallback: screenshot hero regions if no images
  if (chosen.length === 0) {
    const screenshotPath = path.join(__dirname, '..', 'public', 'product-1.png');
    await page.screenshot({path: screenshotPath, fullPage: true});
    console.log('No images found; saved screenshot to', screenshotPath);
    await browser.close();
    return;
  }

  // ensure public dir
  const outDir = path.join(__dirname, '..', 'public');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, {recursive: true});

  // download each chosen image to public/product-#.ext (use png fallback)
  for (let i = 0; i < chosen.length; i++) {
    const u = chosen[i];
    const extMatch = u.split('?')[0].match(/\.([a-zA-Z0-9]{2,5})$/);
    const ext = (extMatch && extMatch[1]) ? extMatch[1] : 'png';
    const dest = path.join(outDir, `product-${i+1}.${ext}`);
    const destPng = path.join(outDir, `product-${i+1}.png`);
    try {
      console.log('Downloading', u, '->', dest);
      await download(u, dest);
      // if not png, convert to png using sips if available
      if (ext.toLowerCase() !== 'png') {
        const {execSync} = require('child_process');
        try {
          execSync(`sips -s format png "${dest}" --out "${destPng}"`);
          fs.unlinkSync(dest);
          console.log('Converted to', destPng);
        } catch (e) {
          console.warn('Conversion failed, keeping original at', dest);
        }
      } else {
        console.log('Saved', dest);
      }
    } catch (e) {
      console.warn('Failed to download', u, e.message);
    }
  }

  // write a small colors.json with sampled values
  const colors = await page.evaluate(() => {
    const theme = document.querySelector('meta[name="theme-color"]')?.content || null;
    const bodyBg = window.getComputedStyle(document.body).backgroundColor || null;
    // try to find a prominent element color (header or hero)
    let candidate = null;
    const header = document.querySelector('header, .hero, .site-hero');
    if (header) candidate = window.getComputedStyle(header).backgroundColor;
    // fallback to computed color from a primary button
    if (!candidate) {
      const btn = document.querySelector('button, a.button, .button');
      if (btn) candidate = window.getComputedStyle(btn).backgroundColor;
    }
    return {theme, bodyBg, candidate};
  });

  fs.writeFileSync(path.join(outDir, 'scraped-colors.json'), JSON.stringify({assets: chosen, colors}, null, 2));

  console.log('Saved scraped colors and assets list to public/scraped-colors.json');
  await browser.close();
  console.log('Done');
})();
