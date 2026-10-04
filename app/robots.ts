import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

/*
 * Everyone is welcome, and the search and AI crawlers are named explicitly.
 * `*` already allows them, but Jay asked specifically about OAI-SearchBot
 * (what puts a site in ChatGPT search answers), and naming each one makes the
 * intent unambiguous to anyone auditing the file — and survives somebody
 * later tightening the `*` rule.
 */
const CRAWLERS = [
  "Googlebot",
  "Bingbot",
  "Applebot",
  "DuckDuckBot",
  "OAI-SearchBot", // ChatGPT search
  "ChatGPT-User", // ChatGPT fetching a page a user asked about
  "GPTBot",
  "PerplexityBot",
  "Claude-SearchBot",
  "Claude-User",
  "ClaudeBot",
  "Google-Extended",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: "/api/" },
      { userAgent: CRAWLERS, allow: "/", disallow: "/api/" },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
