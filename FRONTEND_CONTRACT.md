# FRONTEND_CONTRACT.md

The single endpoint the Next.js frontend needs for the Home page:

```
GET {STRAPI_URL}/api/home-page/full
```

No authentication required — the `public` role has been granted read access
automatically (see `src/bootstrap.ts`). Response envelope: `{ "data": { ... } }`.

Also available (all public, unauthenticated, read-only):

| Endpoint | Purpose |
|---|---|
| `GET /api/home-page` | Raw (non-flattened) home-page single type, deep-populated |
| `GET /api/global` | Raw (non-flattened) global single type, deep-populated |
| `GET /api/blog-posts` / `GET /api/blog-posts/:documentId` | Blog post collection (core REST) |

`/api/home-page/full` is the one Stage C should consume — it is pre-flattened
and requires no client-side populate query.

## Top-level shape

```ts
interface HomePageFull {
  seo: Seo | null;
  global: {
    navbar: Navbar | null;
    footer: Footer | null;
    loader: Loader | null;
  };
  sections: Section[]; // in CMS-editor order; render by `__component`
}
```

## `seo`

```ts
interface Seo {
  metaTitle: string;
  metaDescription: string;
  ogImage: Media | null; // currently always null — no OG image exists in the source app
}
```

## `global.navbar`

```ts
interface Navbar {
  logoDefault: Media;
  logoScrolled: Media;
  logoMobile: Media;
  ctaLabel: string;
  ctaHref: string;
  ctaArrowGlyph: string; // '' if unset
  primaryNavItems: NavItem[];         // always 6
  theThinkingSubmenuItems: Link[];    // always 5
}

interface NavItem {
  label: string;
  href: string;
  isExternal: boolean;
  hasSubmenu: boolean;
}
```

## `global.footer`

```ts
interface Footer {
  footerLogoText: string;
  reachUsEmailLabel: string;
  reachUsEmailHref: string;
  reachUsLocation1: string;
  reachUsLocation2: string;
  footerLinkColumns: LinkColumn[]; // always 2
  socialLinks: SocialLink[];       // always 4
}

interface LinkColumn {
  columnTitle: string;
  links: Link[];
}

interface SocialLink {
  iconName: string; // Font Awesome 4 class, e.g. "fa-facebook"
  href: string;
  isExternal: boolean;
}
```

## `global.loader`

```ts
interface Loader {
  brandText: string;
  progressCounterSuffix: string; // "%" today
}
```

## Shared primitives

```ts
interface Media {
  url: string;         // ABSOLUTE (STRAPI_URL-prefixed for local uploads)
  alt: string;          // '' if unset — never null
  width: number | null;
  height: number | null;
  priority: boolean;
}

interface Link {
  label: string | null;
  href: string | null;
  isExternal: boolean;
  ariaLabel: string | null;
  arrowGlyph: string | null;
}
```

## `sections[]` — discriminate on `__component`

```ts
type Section =
  | HeroSection
  | LogoMarqueeSection
  | TimelineShiftSection
  | ThreePillarsSection
  | StatsGridSection
  | BrandTileMarqueeSection
  | MarqueeBandSection
  | BlogPreviewSection
  | TestimonialsCarouselSection
  | VideoCtaSection;

interface HeroSection {
  __component: 'sections.hero';
  badgeText: string;
  headingLine1: string;
  headingLine2: string;
  headingRotatorDefaultWord: string;
  headingTrailingPeriod: string;
  subtitle: string;
  infoStrip: string;
  scrollCueText: string;
  ctaButtons: Link[];          // always 2
  headingRotatorWords: string[]; // always 5, plain strings
}

interface LogoMarqueeSection {
  __component: 'sections.logo-marquee';
  sectionAriaLabel: string;
  partnerLogos: Media[]; // always 6 — render the seamless-loop duplicate yourself, do not duplicate this array
}

interface TimelineShiftSection {
  __component: 'sections.timeline-shift';
  eyebrow: string;
  heading: string;
  shiftRows: { number: string; verb: string }[]; // always 6
}

interface ThreePillarsSection {
  __component: 'sections.three-pillars';
  backgroundImage: Media;
  pillars: {
    number: string;
    tag: string;
    title: string;
    listItems: Link[]; // 6 or 7 items
  }[]; // always 3
}

interface StatsGridSection {
  __component: 'sections.stats-grid';
  eyebrow: string;
  heading: string;
  statCards: {
    number: string; // mixed format: "98%", "15M", "$423K", "83+" — kept as string
    title: string;
    body: string;
    icon: Media;
  }[]; // always 4
}

interface BrandTileMarqueeSection {
  __component: 'sections.brand-tile-marquee';
  headingPrefix: string;
  headingEmphasis: string;
  brandTiles: {
    name: string;
    category: string;
    photo: Media;
  }[]; // always 14
}

interface MarqueeBandSection {
  __component: 'sections.marquee-band';
  marqueePhrase: string; // base phrase only — repeat/loop it in the frontend, do not store the repeated string
}

interface BlogPreviewSection {
  __component: 'sections.blog-preview';
  eyebrow: string;
  heading: string;
  viewAllLabel: string;
  viewAllHref: string;
  viewAllArrowGlyph: string;
  posts: BlogPost[]; // always 3 today — sourced from the featuredBlogPosts relation, NOT embedded copy
}

interface BlogPost {
  id: string;       // documentId
  title: string;
  slug: string;
  date: string;      // "YYYY-MM-DD"
  category: string;
  href: string;      // "/blog/{slug}"
  image: Media;
}

interface TestimonialsCarouselSection {
  __component: 'sections.testimonials-carousel';
  eyebrow: string;
  testimonials: {
    quote: string;
    attribution: string;
    dotAriaLabel: string;
  }[]; // always 3
}

interface VideoCtaSection {
  __component: 'sections.video-cta';
  backgroundVideo: {
    url: string;
    poster: string | null;
    autoplay: boolean;
    loop: boolean;
    muted: boolean;
  };
  title: string;
  bodyText: string;
  ctaLabel: string;
  ctaHref: string;
  ctaArrowGlyph: string;
}
```

## Nullability / defaults summary

- Every `Media` is non-null in practice (all required in the schema) except `seo.ogImage` and `video-cta.backgroundVideo.poster`, which are `null` because no source value exists yet.
- Optional string fields (`ctaArrowGlyph`, `scrollCueText`, `sectionAriaLabel`, `viewAllArrowGlyph`, `dotAriaLabel`) are `''` when unset, never `null` — safe to interpolate directly.
- `Link.label` / `Link.href` / `Link.ariaLabel` / `Link.arrowGlyph` CAN be `null` (only `label`/`href` are required at the schema level for `shared.link`; guard before rendering if a future edit clears one).
- An unrecognized `__component` (e.g. after a future schema change) should render `null` in production and throw in development, per the intended Stage C registry pattern.

## Known deviations from a byte-for-byte mirror

- **`sections.three-pillars.backgroundImage.alt`** and **`sections.stats-grid.statCards[].icon.alt`**: the source renders these as CSS `background-image`s with no `<img alt>` anywhere in code. Since the CMS requires alt text on every media field, minimal descriptive alts were added during seeding (`"Discovery pillars background"`, `"Stat icon 1"`–`"4"`). Replace via the admin UI if you want more descriptive copy.
- **Blog posts are relations, not embedded data.** `sections.blog-preview.posts` comes from `home-page.featuredBlogPosts` (a `manyToMany` to the new `api::blog-post.blog-post` collection type), per the modeling rule that reused entities (blog teasers) should be independent, publishable content — not copy-pasted into a component. This matches the current site (all 3 posts on `/blog`'s data file are the same 3 shown on Home) and additionally makes those posts independently editable/reusable for a future `/blog` and `/blog/[slug]` CMS migration.
