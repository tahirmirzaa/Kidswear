// SEO-01: generate public/sitemap.xml from the actual launch-visible product
// data at build time, so drafts/hidden SKUs never leak into it and it never
// drifts out of sync with the catalogue. Run via `npm run build` (postbuild).
import { writeFileSync } from "node:fs";
import { launchProducts } from "../src/data/products.ts";
import { launchCollections, launchSizes } from "../src/data/taxonomy.ts";

const SITE_URL = "https://www.pipandpanda.com";

const staticRoutes = [
  "/",
  "/new-arrivals",
  "/shop-by-age",
  "/about",
  "/faqs",
  "/shipping-returns",
  "/size-guide",
  "/contact",
  "/privacy-policy",
  "/terms",
];

const urls = [
  ...staticRoutes,
  ...launchCollections.map((c) => `/category/${c.slug}`),
  ...launchSizes.map((s) => `/shop-by-age/${s.slug}`),
  ...launchProducts.map((p) => `/product/${p.slug}`),
];

const body = urls
  .map((path) => `  <url><loc>${SITE_URL}${path}</loc></url>`)
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;

writeFileSync(new URL("../public/sitemap.xml", import.meta.url), xml);
console.log(`sitemap.xml written with ${urls.length} URLs`);
