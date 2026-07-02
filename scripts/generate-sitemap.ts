// Runs before `vite dev` and `vite build` (predev/prebuild hooks); writes public/sitemap.xml.
import { writeFileSync } from "fs";
import { resolve } from "path";

const BASE_URL = "https://artful-perspective-show.lovable.app";

// Keep in sync with src/data/projects.ts
const projectIds = [
  "svp-recognition",
  "continuous-improvement-forum",
  "aramco-trophies",
  "collective-oasis",
  "executive-banquet",
  "desert-archway",
];

interface Entry {
  path: string;
  changefreq?: "weekly" | "monthly" | "yearly";
  priority?: string;
}

const entries: Entry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/work", changefreq: "weekly", priority: "0.9" },
  { path: "/about", changefreq: "monthly", priority: "0.7" },
  { path: "/contact", changefreq: "monthly", priority: "0.8" },
  ...projectIds.map((id) => ({
    path: `/work/${id}`,
    changefreq: "monthly" as const,
    priority: "0.6",
  })),
];

const xml = [
  `<?xml version="1.0" encoding="UTF-8"?>`,
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
  ...entries.map((e) =>
    [
      `  <url>`,
      `    <loc>${BASE_URL}${e.path}</loc>`,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      `  </url>`,
    ]
      .filter(Boolean)
      .join("\n"),
  ),
  `</urlset>`,
].join("\n");

writeFileSync(resolve("public/sitemap.xml"), xml);
console.log(`sitemap.xml written (${entries.length} entries)`);
