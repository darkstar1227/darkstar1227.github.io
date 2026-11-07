// Builds the responsive portrait set (AVIF + WebP) from the source photo.
// Run once after replacing scripts/portrait-source.jpg: `npm run images`.
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const SRC = fileURLToPath(new URL('./portrait-source.jpg', import.meta.url));
const OUT = fileURLToPath(new URL('../public/img/', import.meta.url));
const WIDTHS = [360, 540, 720, 960];

await mkdir(OUT, { recursive: true });
for (const w of WIDTHS) {
  const base = sharp(SRC).resize({ width: w, withoutEnlargement: true });
  await base.clone().avif({ quality: 52, effort: 6 }).toFile(`${OUT}portrait-${w}.avif`);
  await base.clone().webp({ quality: 72, effort: 6 }).toFile(`${OUT}portrait-${w}.webp`);
}
console.log('portrait images written for widths', WIDTHS.join(', '));

// 1200×630 JPEG share card for Open Graph / social previews (JPEG: the most widely supported format).
const portrait = await sharp(SRC).resize({ width: 520, height: 630, fit: 'cover', position: 'north' }).toBuffer();
const label = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="680" height="630">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#f4f6f8"/><stop offset=".55" stop-color="#8fe6f1"/><stop offset="1" stop-color="#edbe8c"/>
  </linearGradient></defs>
  <text x="72" y="250" font-family="Helvetica, Arial, sans-serif" font-size="30" fill="#8fe6f1" letter-spacing="4">SOFTWARE ENGINEER</text>
  <text x="68" y="340" font-family="Helvetica, Arial, sans-serif" font-size="78" font-weight="700" fill="url(#g)">Hao-Ting Lee</text>
  <text x="72" y="410" font-family="Helvetica, Arial, sans-serif" font-size="30" fill="#c9d1da">Reliable systems × AI · dst-justin.com</text>
</svg>`);
await sharp({ create: { width: 1200, height: 630, channels: 3, background: '#0b0d10' } })
  .composite([{ input: portrait, left: 680, top: 0 }, { input: label, left: 0, top: 0 }])
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(`${OUT}og.jpg`);
console.log('share image written: og.jpg');
