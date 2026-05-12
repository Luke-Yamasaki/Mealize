/** In-app wiki mirrors https://www.lukeyamasaki.com/work/mealize/wiki */

export const PORTFOLIO_WIKI_ROOT = "https://www.lukeyamasaki.com/work/mealize/wiki";

export const MEALIZE_WIKI_BASE_PATH = "/work/mealize/wiki";

export const WIKI_IMG_BASE = "https://www.lukeyamasaki.com/images/projects/mealize";

export const WIKI_SLUGS = [
  "covid-19-image-gallery",
  "database-diagram",
  "design-thinking",
  "feature-list",
  "google-survey",
  "prototypes",
  "user-stories",
] as const;

export type WikiSlug = (typeof WIKI_SLUGS)[number];

export type WikiPageKey = "index" | WikiSlug;

export function isWikiSlug(value: string): value is WikiSlug {
  return (WIKI_SLUGS as readonly string[]).includes(value);
}

export function portfolioWikiUrl(portfolioPath: string): string {
  return portfolioPath ? `${PORTFOLIO_WIKI_ROOT}/${portfolioPath}` : PORTFOLIO_WIKI_ROOT;
}

export function appWikiHref(slug?: WikiSlug): string {
  return slug ? `${MEALIZE_WIKI_BASE_PATH}/${slug}` : MEALIZE_WIKI_BASE_PATH;
}

export const WIKI_PAGE_META: Record<
  WikiPageKey,
  { kicker: string; title: string; portfolioPath: string; description: string }
> = {
  index: {
    kicker: "Overview",
    title: "Overview",
    portfolioPath: "",
    description: "Problem, solution, features",
  },
  "covid-19-image-gallery": {
    kicker: "Gallery",
    title: "Covid-19 image gallery",
    portfolioPath: "covid-19-image-gallery",
    description: "Context imagery & sources",
  },
  "database-diagram": {
    kicker: "Schema",
    title: "Database diagram",
    portfolioPath: "database-diagram",
    description: "Schema snapshot",
  },
  "design-thinking": {
    kicker: "Process",
    title: "Design thinking",
    portfolioPath: "design-thinking",
    description: "Process narrative",
  },
  "feature-list": {
    kicker: "Capabilities",
    title: "Feature list",
    portfolioPath: "feature-list",
    description: "CRUD by domain",
  },
  "google-survey": {
    kicker: "Research",
    title: "Google survey",
    portfolioPath: "google-survey",
    description: "Research & responses",
  },
  prototypes: {
    kicker: "Exploration",
    title: "Prototypes",
    portfolioPath: "prototypes",
    description: "Sketches & fidelity",
  },
  "user-stories": {
    kicker: "Requirements",
    title: "User stories",
    portfolioPath: "user-stories",
    description: "Roles & acceptance",
  },
};
