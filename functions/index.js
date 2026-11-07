// Cloudflare Pages Function for "/": Markdown content negotiation for agents.
// Requests that accept text/markdown get dist/index.md (built by scripts/prerender.mjs);
// everyone else gets the prerendered HTML as before.

const wantsMarkdown = (accept) =>
  accept
    .split(',')
    .map((part) => part.trim().split(';'))
    .some(([type, ...params]) => type.trim().toLowerCase() === 'text/markdown' && !params.some((p) => /^\s*q=0(\.0+)?\s*$/.test(p)));

// RFC 8288 Link headers pointing agents at the site's machine-readable resources.
const LINK = [
  '</.well-known/api-catalog>; rel="api-catalog"',
  '</openapi.json>; rel="service-desc"; type="application/vnd.oai.openapi+json"',
  '</llms.txt>; rel="service-doc"; type="text/plain"',
  '</llms.txt>; rel="describedby"; type="text/plain"',
  '</index.md>; rel="alternate"; type="text/markdown"',
  '</sitemap.xml>; rel="sitemap"; type="application/xml"',
].join(', ');

const withVary = (response) => {
  const res = new Response(response.body, response);
  const vary = res.headers.get('Vary');
  if (!vary || !/\baccept\b/i.test(vary)) res.headers.set('Vary', vary ? `${vary}, Accept` : 'Accept');
  res.headers.set('Link', LINK);
  return res;
};

export async function onRequestGet({ request, env, next }) {
  if (!wantsMarkdown(request.headers.get('Accept') || '')) return withVary(await next());

  const asset = await env.ASSETS.fetch(new URL('/index.md', request.url));
  if (!asset.ok) return withVary(await next());

  const markdown = await asset.text();
  return new Response(markdown, {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=0, must-revalidate',
      Vary: 'Accept',
      Link: LINK,
      // Rough estimate (about 4 characters per token); the exact count depends on the tokenizer.
      'x-markdown-tokens': String(Math.ceil(markdown.length / 4)),
      'Content-Signal': 'ai-train=yes, search=yes, ai-input=yes',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
