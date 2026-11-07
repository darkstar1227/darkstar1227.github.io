// Post-build step:
// 1. Injects the server-rendered page into dist/index.html so the first paint needs no JavaScript.
// 2. Writes dist/index.md, the Markdown version served to agents that send `Accept: text/markdown`
//    (see functions/index.js).
// 3. Writes dist/sitemap.xml with lastmod set to the date of the latest commit.
import { readFile, writeFile, rm } from 'node:fs/promises';
import { execSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';
import TurndownService from 'turndown';

const SITE = 'https://dst-justin.com';
const root = fileURLToPath(new URL('..', import.meta.url));
const ssrEntry = pathToFileURL(`${root}dist-ssr/entry-server.js`).href;
const { render } = await import(ssrEntry);

// 1. Prerendered HTML
const htmlPath = `${root}dist/index.html`;
const template = await readFile(htmlPath, 'utf8');
const marker = '<div id="root"></div>';
if (!template.includes(marker)) throw new Error('root marker not found in dist/index.html');

const body = render();
const html = template.replace(marker, `<div id="root">${body}</div>`);
await writeFile(htmlPath, html);
await rm(`${root}dist-ssr`, { recursive: true, force: true });
console.log(`prerendered ${Math.round(html.length / 1024)} KB of HTML`);

// 2. Markdown for agents: same layout as Cloudflare's converter (frontmatter, body, JSON-LD).
const meta = (attr, key) =>
  template.match(new RegExp(`<meta ${attr}="${key}" content="([^"]*)"`))?.[1]?.replace(/&amp;/g, '&');
const title = template.match(/<title>([^<]*)<\/title>/)?.[1]?.replace(/&amp;/g, '&');
const jsonLd = template.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];

const td = new TurndownService({ headingStyle: 'atx', bulletListMarker: '-', codeBlockStyle: 'fenced' });
td.remove(['script', 'style', 'svg', 'nav', 'button', 'img', 'picture', 'noscript']);
td.addRule('hidden', {
  filter: (node) => node.getAttribute?.('aria-hidden') === 'true',
  replacement: () => '',
});
td.addRule('relativeLinks', {
  filter: (node) => node.nodeName === 'A' && node.getAttribute('href'),
  replacement: (content, node) => {
    const href = node.getAttribute('href');
    const text = content.trim();
    if (!text) return '';
    if (href.startsWith('#')) return text;
    return `[${text}](${href.startsWith('/') ? SITE + href : href})`;
  },
});
const yaml = (v) => JSON.stringify(v);
const front = [
  '---',
  title && `title: ${yaml(title)}`,
  meta('name', 'description') && `description: ${yaml(meta('name', 'description'))}`,
  meta('property', 'og:image') && `image: ${meta('property', 'og:image')}`,
  `url: ${SITE}/`,
  '---',
]
  .filter(Boolean)
  .join('\n');
const markdown = td.turndown(body).replace(/\n{3,}/g, '\n\n').trim();
const ld = jsonLd ? `\n\n\`\`\`json\n${JSON.stringify(JSON.parse(jsonLd), null, 2)}\n\`\`\`\n` : '\n';
const md = `${front}\n\n${markdown}${ld}`;
await writeFile(`${root}dist/index.md`, md);
console.log(`markdown written: index.md (${Math.round(md.length / 1024)} KB)`);

// 3. Sitemap
let lastmod = new Date().toISOString().slice(0, 10);
try {
  lastmod = execSync('git log -1 --format=%cs', { cwd: root, encoding: 'utf8' }).trim() || lastmod;
} catch {
  // Not a git checkout: fall back to the build date.
}
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE}/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;
await writeFile(`${root}dist/sitemap.xml`, sitemap);
console.log(`sitemap written: lastmod ${lastmod}`);
