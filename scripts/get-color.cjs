const puppeteer = require('puppeteer-core');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new'
  });
  const page = await browser.newPage();
  const imgBase64 = fs.readFileSync('C:/Users/rakes/.gemini/antigravity/brain/a7fddb23-69ed-40f1-9c66-6be3d9fafabe/.user_uploaded/media_1795099235821_5c99002c.jpg').toString('base64');
  await page.setContent('<img id="img" src="data:image/jpeg;base64,' + imgBase64 + '" />');
  const color = await page.evaluate(() => {
    const img = document.getElementById('img');
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    // sample at 20% x, 50% y which is in the blue outer ring
    const pixel = ctx.getImageData(Math.floor(img.naturalWidth * 0.2), Math.floor(img.naturalHeight * 0.5), 1, 1).data;
    return {
      r: pixel[0],
      g: pixel[1],
      b: pixel[2],
      hex: '#' + [pixel[0], pixel[1], pixel[2]].map(x => x.toString(16).padStart(2, '0')).join('').toUpperCase()
    };
  });
  console.log('Sampled Color:', color);
  await browser.close();
})();
