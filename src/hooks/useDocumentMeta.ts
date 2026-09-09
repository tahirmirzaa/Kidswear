import { useEffect } from "react";

const SITE_URL = "https://www.pipandpanda.com";
const SITE_NAME = "Pip & Panda";

interface MetaOptions {
  title: string;
  description?: string;
  /** Pages with no standalone public content (account, bag, checkout, private orders) should not be indexed. */
  noindex?: boolean;
}

function setMetaTag(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

// SEO-01: render unique per-route title, description, canonical and sharing
// metadata into the document head. This is a client-rendered SPA with no
// SSR/prerendering, so crawlers that don't execute JS (most non-Google link
// previews) won't see these tags; Google's own renderer does pick them up,
// but a prerender step is still needed for full crawler coverage.
export function useDocumentMeta({ title, description, noindex }: MetaOptions) {
  useEffect(() => {
    document.title = title;
    if (description) setMetaTag("name", "description", description);

    setMetaTag("property", "og:site_name", SITE_NAME);
    setMetaTag("property", "og:title", title);
    if (description) setMetaTag("property", "og:description", description);
    setMetaTag("property", "og:type", "website");

    const url = `${SITE_URL}${window.location.pathname}`;
    setMetaTag("property", "og:url", url);
    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", title);
    if (description) setMetaTag("name", "twitter:description", description);

    let canonical = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", url);

    let robotsTag = document.head.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
    if (noindex) {
      if (!robotsTag) {
        robotsTag = document.createElement("meta");
        robotsTag.setAttribute("name", "robots");
        document.head.appendChild(robotsTag);
      }
      robotsTag.setAttribute("content", "noindex, nofollow");
    } else if (robotsTag) {
      robotsTag.remove();
    }
  }, [title, description, noindex]);
}
