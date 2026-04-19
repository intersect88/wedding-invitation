import puppeteer from 'puppeteer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const bgPath = path.join(__dirname, 'src/assets/beach-background.jpg');
const bgBase64 = fs.readFileSync(bgPath).toString('base64');
const bgDataUrl = `data:image/jpeg;base64,${bgBase64}`;

const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"/>
  <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:ital,wght@1,700&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      width: 1200px;
      height: 630px;
      overflow: hidden;
    }
    .bg {
      position: absolute;
      inset: 0;
      background-image: url('${bgDataUrl}');
      background-size: cover;
      background-position: center;
    }
    .overlay {
      position: absolute;
      inset: 0;
      background: rgba(255,255,255,0.35);
    }
    .content {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 24px;
      text-align: center;
      padding: 60px;
    }
    .names {
      font-family: 'Great Vibes', cursive;
      font-size: 80px;
      color: #3d6fa3;
      text-shadow: 2px 2px 8px rgba(255,255,255,0.9);
      line-height: 1;
    }
    .headline {
      font-family: 'Great Vibes', cursive;
      font-size: 110px;
      color: #2d5080;
      text-shadow: 2px 2px 10px rgba(255,255,255,0.95);
      line-height: 1.1;
    }
    .date {
      font-family: 'Playfair Display', serif;
      font-size: 34px;
      font-style: italic;
      font-weight: 700;
      color: #2d5080;
      letter-spacing: 2px;
      text-shadow: 2px 2px 6px rgba(255,255,255,1), -1px -1px 4px rgba(255,255,255,1);
      background: transparent;
    }
  </style>
</head>
<body>
  <div class="bg"></div>
  <div class="overlay"></div>
  <div class="content">
    <div class="names">Ornella &amp; Genny</div>
    <div class="headline">Sei invitato al nostro matrimonio</div>
    <div class="date">10 Giugno 2026 · ore 19:00 · Ammot Cafè, Castel Volturno</div>
  </div>
</body>
</html>`;

const browser = await puppeteer.launch({ headless: true });
const page = await browser.newPage();
await page.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
await page.setContent(html, { waitUntil: 'networkidle0' });
await page.screenshot({ path: path.join(__dirname, 'public/og-image.jpg'), type: 'jpeg', quality: 90 });
await browser.close();
console.log('OG image generated: public/og-image.jpg');
