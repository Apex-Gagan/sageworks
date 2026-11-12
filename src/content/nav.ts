/**
 * Navigation shared by all samples. The samples cover three pages
 * (home, founder, projects); the remaining items point at the matching
 * homepage section until those pages are built.
 */
export type Base = "/1" | "/2" | "/3";

export function navItems(base: Base) {
  return [
    { label: "Discover", href: `${base}#about` },
    { label: "Founder", href: `${base}/founder` },
    { label: "Projects", href: `${base}/projects` },
    { label: "Five Senses", href: `${base}#senses` },
    { label: "Dr Gutsy", href: `${base}#gutsy` },
    { label: "Research", href: `${base}#research` },
    { label: "Work with Sagework", href: `${base}#work` },
  ];
}

/** Resolve the short hrefs used in content files against a sample base. */
export function resolve(base: Base, href: string) {
  if (href.startsWith("#")) return `${base}${href}`;
  if (href.startsWith("/") || href.startsWith("mailto:")) return href;
  return `${base}/${href}`;
}
