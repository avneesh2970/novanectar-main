# SEO Audit Report

Project: NovaNectar  
Audit date: 2026-04-11  
Audit type: Codebase-based technical and on-page SEO review

## Scope

This audit was performed against the local Next.js codebase after a successful production build. It focuses on technical SEO, metadata coverage, crawlability, indexation controls, structured data, and content discoverability.

This is not a live crawl of the production domain, so rankings, backlink health, Core Web Vitals in the field, Search Console issues, and live indexing status were not verified.

## Executive Summary

The site has a solid SEO foundation in a few areas:

- Production build completes successfully.
- `robots.ts` and `sitemap.ts` are present.
- The root layout defines global metadata, canonical, robots, and organization schema.
- Dynamic detail pages for blog, news, event, and portfolio include at least some metadata work.
- Image alt text is enforced in the content admin flows for blog, news, and event content.

The highest-impact issues are:

- Blog, news, and event listing pages are client-rendered and fetch indexable content only after hydration.
- News and event cards are not real anchor links, which weakens crawlability and discoverability.
- Several important indexable pages do not define page-specific metadata and appear to rely on the generic site-wide defaults.
- The sitemap depends on runtime API fetches and env configuration in a way that can fail silently or break URL completeness.
- Blog structured data is assembled, but it is wired through a metadata field that is unlikely to emit valid JSON-LD script output.

## Findings

### High Priority

1. Blog, news, and event listing pages are client-side content shells

Severity: High

Why it matters:
Search engines can render JavaScript, but pages that ship mostly a loading shell and fetch their main content after hydration are weaker for crawl efficiency, freshness discovery, and preview reliability. This is especially important for content hubs that should help crawlers discover article and event detail pages.

Evidence:

- `src/app/blog/page.tsx:1-48` is a `"use client"` page that fetches `/api/blog/posts` in `useEffect`.
- `src/app/news/page.tsx:1-52` is a `"use client"` page that fetches `/api/news/posts` in `useEffect`.
- `src/app/event/page.tsx:1-253` is a `"use client"` page that fetches `/api/event/posts` in `useEffect`.

Recommendation:

- Convert these listing pages to server-rendered pages using async server components.
- Fetch the content on the server and render crawlable article/event cards in the initial HTML.
- Keep client-side search, filters, and animation as progressive enhancement where needed.

2. News and event cards are not crawl-friendly anchor links

Severity: High

Why it matters:
Search crawlers discover pages most reliably through standard links. Click handlers with `router.push()` are less robust than real `<a>` or `Link` navigation for crawl discovery and link extraction.

Evidence:

- `src/app/news/page.tsx:69-72` uses `router.push(`/news/${newsItem.slug}`)`.
- `src/app/news/page.tsx:135-142` attaches navigation to a clickable `motion.article`.
- `src/app/event/page.tsx:49-52` attaches navigation to a clickable `div`.
- `src/app/event/page.tsx:186-189` uses `router.push(`/event/${event.slug}`)`.

Recommendation:

- Wrap each news and event card in Next `Link`.
- Preserve the current visual design, but make the semantic clickable element a real anchor.

3. Important indexable pages are missing page-specific metadata

Severity: High

Why it matters: 
Brand pages and content hub pages should not inherit only the root site title/description/canonical. Unique page metadata improves relevance, CTR, canonical accuracy, and sharing behavior.

Evidence:

No page-level `metadata` or `generateMetadata` was found for these key pages:

- `src/app/page.tsx`
- `src/app/about-us/page.tsx`
- `src/app/blog/page.tsx`
- `src/app/news/page.tsx`
- `src/app/event/page.tsx`
- `src/app/portfolio/page.tsx`
- `src/app/privacy/page.tsx`

Recommendation:

- Add route-level metadata for each major public page.
- At minimum include page title, meta description, canonical URL, Open Graph, and Twitter metadata.
- Use page-specific messaging aligned to intent, for example services, company profile, articles, news, events, portfolio, and legal page context.

4. Sitemap generation is brittle and can fail or omit URLs

Severity: High

Why it matters:
A sitemap should be reliable even if a content API has a temporary issue. Broken or incomplete sitemap output can slow discovery and re-crawl.

Evidence:

- `src/app/sitemap.ts:90-123` fetches blog/news/event entries from `${process.env.NEXT_PUBLIC_APP_URL}/api/...`.
- There is no fallback base URL in the sitemap.
- There is no explicit error handling around those remote fetches.
- Static URLs use `lastModified: new Date()` for every request in multiple places, which makes unchanged pages appear freshly modified.

Recommendation:

- Use a stable base URL fallback, such as `https://novanectar.co.in`, if the env var is missing.
- Add `try/catch` handling so the sitemap still returns static URLs even if content fetches fail.
- Use real content timestamps where available.
- Avoid using `new Date()` for all static routes unless content truly changes on every request.

### Medium Priority

5. Blog JSON-LD is likely not being emitted as valid structured data

Severity: Medium

Why it matters:
Structured data helps search engines interpret articles. If the JSON-LD is not rendered as a `<script type="application/ld+json">`, the intended schema may never be consumed.

Evidence:

- `src/app/blog/[slug]/page.tsx:30-50` builds a `BlogPosting` JSON-LD object.
- `src/app/blog/[slug]/page.tsx:95-97` returns it via:
  `other: { "script:ld+json": JSON.stringify(jsonLd) }`

Risk note:

This does not match the normal Next.js pattern for JSON-LD output. It is likely to render as metadata rather than a script tag.

Recommendation:

- Render JSON-LD directly in the page component with a `<script type="application/ld+json">`.
- Apply the same approach consistently to blog, news, and event detail pages.

6. Canonical generation for some dynamic pages depends on an env var without fallback

Severity: Medium

Why it matters:
If the base URL env var is missing or misconfigured, canonical tags can become invalid, leading to indexing ambiguity.

Evidence:

- `src/app/blog/[slug]/page.tsx:92-94` sets canonical using `${process.env.NEXT_PUBLIC_APP_URL}/blog/${post.slug}``.
- `src/app/event/[slug]/page.tsx:31-37` and `:39-47` use `${process.env.NEXT_PUBLIC_APP_URL}` directly.

By comparison, other routes already use a fallback pattern:

- `src/app/news/[slug]/page.tsx:20`
- `src/app/portfolio/[slug]/page.tsx:10`

Recommendation:

- Standardize on one base URL helper with a production fallback.
- Reuse it in sitemap, canonical tags, Open Graph URLs, and API fetch URLs.

7. Admin areas rely on `robots.txt` disallow rather than explicit noindex directives

Severity: Medium

Why it matters:
`robots.txt` controls crawling, not guaranteed indexation. If admin URLs are linked externally or already discovered, they can still appear in search results without a `noindex` signal.

Evidence:

- `src/app/robots.ts:6-13` disallows `/admin/` and `/blog-admin/`.
- No route-level metadata with `robots: { index: false, follow: false }` was found for the admin pages reviewed.

Recommendation:

- Add route-level `noindex, nofollow` metadata to admin and blog-admin routes.
- Consider auth gating plus noindex together.

8. Service page metadata quality is inconsistent and overly generic

Severity: Medium

Why it matters:
Metadata should reflect user intent naturally. Over-optimized or repetitive phrasing can reduce CTR and weaken topical clarity.

Evidence:

- `src/app/services/digital-marketing/page.tsx`
- `src/app/services/graphic-designing/page.tsx`
- `src/app/services/mobile-development/page.tsx`
- `src/app/services/seo/page.tsx`
- `src/app/services/social-media-management/page.tsx`
- `src/app/services/web-development/page.tsx`

Common patterns observed:

- Repeated use of "Smart IT Solution" instead of consistent brand naming.
- Awkward phrases like "best website development in dehradun".
- Spelling inconsistency: "Novenectar" vs "Novanectar".
- No page-level canonical or page-specific social card definitions were found in these files.

Recommendation:

- Rewrite each service title and description for clarity and search intent.
- Standardize brand naming.
- Add canonical, Open Graph, and Twitter metadata per service page.

### Low Priority

9. Global analytics script is hardcoded with a placeholder measurement ID

Severity: Low

Why it matters:
This is not a direct ranking issue, but it creates implementation noise in the page head and can complicate analytics validation.

Evidence:

- `src/app/layout.tsx:181-191` includes `gtag('config', 'G-YOUR-MEASUREMENT-ID');`
- `src/lib/analytics.ts:3-10` already initializes analytics from `NEXT_PUBLIC_ANALYTICS_MEASUREMENT_ID`

Recommendation:

- Remove the placeholder script or wire it to the env var in one consistent analytics implementation.

10. Organization schema is loaded `afterInteractive`

Severity: Low

Why it matters:
Search engines often process JavaScript, but server-rendered structured data is still the safer implementation for core entity schema.

Evidence:

- `src/app/layout.tsx:153-179` injects organization JSON-LD via `next/script` with `strategy="afterInteractive"`.

Recommendation:

- Render core organization schema in the initial HTML instead of deferring it.

## Positive Signals

- Global robots metadata is present in the root layout: `src/app/layout.tsx:81-91`
- Root canonical is present: `src/app/layout.tsx:95-97`
- `robots.ts` exists and references the sitemap: `src/app/robots.ts:3-16`
- Dynamic detail metadata exists for blog, news, event, and portfolio:
  - `src/app/blog/[slug]/page.tsx`
  - `src/app/news/[slug]/page.tsx`
  - `src/app/event/[slug]/page.tsx`
  - `src/app/portfolio/[slug]/page.tsx`
- Blog/news/event content flows enforce image alt text in admin forms and API validation.

## Recommended Fix Order

1. Server-render the blog, news, and event listing pages.
2. Replace clickable `div` and `article` navigation with real `Link` elements on news and event cards.
3. Add unique metadata to homepage, about, blog, news, event, portfolio, and privacy pages.
4. Harden sitemap generation and centralize base URL handling.
5. Fix structured data output for blog pages and extend consistent JSON-LD coverage.
6. Add explicit `noindex` metadata to admin surfaces.
7. Rewrite service metadata for cleaner keyword targeting and consistent brand language.

## Conclusion

The project is not starting from zero; it already has several important SEO foundations in place. The biggest lift now is to make content discovery more crawl-friendly and to replace generic metadata inheritance with page-level intent targeting.

If the top four recommendations are implemented, the site should be in a much stronger position for indexation quality, content discovery, and search-result presentation.
