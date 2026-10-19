// Injects the server-rendered page into dist/index.html so the first paint needs no JavaScript.
import { readFile, writeFile, rm } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const ssrEntry = pathToFileURL(`${root}dist-ssr/entry-server.js`).href;
const { render } = await import(ssrEntry);

const htmlPath = `${root}dist/index.html`;
const template = await readFile(htmlPath, 'utf8');
const marker = '<div id="root"></div>';
if (!template.includes(marker)) throw new Error('root marker not found in dist/index.html');

const html = template.replace(marker, `<div id="root">${render()}</div>`);
await writeFile(htmlPath, html);
await rm(`${root}dist-ssr`, { recursive: true, force: true });
console.log(`prerendered ${Math.round(html.length / 1024)} KB of HTML`);
