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
