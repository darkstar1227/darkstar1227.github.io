# dst-justin.com auth.md

Agent access policy for https://dst-justin.com/, the portfolio site of Hao-Ting Lee (李浩廷).

## Audience

Any AI agent, crawler or automated client that reads this site, including search and answer engines, research assistants and coding agents.

## Registration

None. This site has no accounts, no registration endpoint and no provisioning endpoint. Do not look for or call `/agent/auth` or any other sign-up route; none exist.

## Supported methods

- **Anonymous, unauthenticated read access** over HTTPS `GET` (and `HEAD`).

There are no OAuth, OpenID Connect, API key, ID-JAG or verified-email flows, and no OAuth Protected Resource or Authorization Server metadata.

## Credentials

No credentials are issued or accepted. Send requests without an `Authorization` header, cookies or tokens. The site has no write operations, so nothing requires signing in.

## What you can read

| Resource | URL | Type |
|---|---|---|
| Portfolio page | https://dst-justin.com/ | `text/html`; `text/markdown` with `Accept: text/markdown` |
| Markdown version | https://dst-justin.com/index.md | `text/markdown` |
| Summary for language models | https://dst-justin.com/llms.txt | `text/plain` |
| API catalog (RFC 9727) | https://dst-justin.com/.well-known/api-catalog | `application/linkset+json` |
| OpenAPI description | https://dst-justin.com/openapi.json | `application/vnd.oai.openapi+json` |
| Agent Skills index | https://dst-justin.com/.well-known/agent-skills/index.json | `application/json` |
| Sitemap | https://dst-justin.com/sitemap.xml | `application/xml` |

## Usage

- Crawling rules are in https://dst-justin.com/robots.txt.
- Please keep request rates modest; the whole site is one page.
- To reach Hao-Ting about hiring or collaboration, use the email on the page: justin30303.jl@gmail.com.
