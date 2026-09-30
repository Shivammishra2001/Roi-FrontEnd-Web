/**
 * Typed shape of GET /api/home-page/full, generated from FRONTEND_CONTRACT.md.
 * No `any` anywhere — SectionRenderer's registry is the one deliberate
 * exception (see components/sections/SectionRenderer.tsx) since it must hold
 * components of differing prop shapes in one map.
 */

export interface Media {
  url: string;
  alt: string;
  width: number | null;
  height: number | null;
  priority: boolean;
}

export interface Link {
  label: string | null;
  href: string | null;
  isExternal: boolean;
  ariaLabel: string | null;
  arrowGlyph: string | null;
}

export interface Seo {
  metaTitle: string;
  metaDescription: string;
  ogImage: Media | null;
}

export interface NavItem {
  label: string;
  href: string;
  isExternal: boolean;
  hasSubmenu: boolean;
}

export interface Navbar {
  logoDefault: Media;
  logoScrolled: Media;
  logoMobile: Media;
  ctaLabel: string;
  ctaHref: string;
  ctaArrowGlyph: string;
  primaryNavItems: NavItem[];
  theThinkingSubmenuItems: Link[];
}

export interface LinkColumn {
  columnTitle: string;
  links: Link[];
}

export interface SocialLink {
  iconName: string;
  href: string;
  isExternal: boolean;
}

export interface Footer {
  footerLogoText: string;
  copyrightText: string | null;
  legalLinks: Link[];
  reachUsEmailLabel: string;
  reachUsEmailHref: string;
  reachUsLocation1: string;
  reachUsLocation2: string;
  footerLinkColumns: LinkColumn[];
  socialLinks: SocialLink[];
}

export interface Loader {
  brandText: string;
  progressCounterSuffix: string;
}

export interface Global {
  navbar: Navbar | null;
  footer: Footer | null;
  loader: Loader | null;
  defaultSeo: Seo | null;
}

export interface HeroSectionData {
  __component: 'sections.hero';
  badgeText: string;
  headingLine1: string;
  headingLine2: string;
  headingRotatorDefaultWord: string;
  headingTrailingPeriod: string;
  subtitle: string;
  infoStrip: string;
  scrollCueText: string;
  ctaButtons: Link[];
  headingRotatorWords: string[];
}

export interface LogoMarqueeSectionData {
  __component: 'sections.logo-marquee';
  sectionAriaLabel: string;
  partnerLogos: Media[];
}

export interface TimelineShiftRow {
  number: string;
  verb: string;
}

export interface TimelineShiftSectionData {
  __component: 'sections.timeline-shift';
  eyebrow: string;
  heading: string;
  shiftRows: TimelineShiftRow[];
}

export interface PillarCard {
  number: string;
  tag: string;
  title: string;
  listItems: Link[];
}

export interface ThreePillarsSectionData {
  __component: 'sections.three-pillars';
  backgroundImage: Media;
  pillars: PillarCard[];
}

export interface StatCard {
  number: string;
  title: string;
  body: string;
  icon: Media;
}

export interface StatsGridSectionData {
  __component: 'sections.stats-grid';
  eyebrow: string;
  heading: string;
  statCards: StatCard[];
}

export interface BrandTile {
  name: string;
  category: string;
  photo: Media;
}

export interface BrandTileMarqueeSectionData {
  __component: 'sections.brand-tile-marquee';
  headingPrefix: string;
  headingEmphasis: string;
  brandTiles: BrandTile[];
}

export interface MarqueeBandSectionData {
  __component: 'sections.marquee-band';
  marqueePhrase: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  /** ISO date (YYYY-MM-DD); format with lib/format.js. */
  date: string;
  category: string;
  categoryKey: string | null;
  sector: string | null;
  excerpt: string | null;
  href: string;
  image: Media;
}

export interface BlogPreviewSectionData {
  __component: 'sections.blog-preview';
  eyebrow: string;
  heading: string;
  viewAllLabel: string;
  viewAllHref: string;
  viewAllArrowGlyph: string;
  posts: BlogPost[];
}

export interface Testimonial {
  quote: string;
  attribution: string;
  dotAriaLabel: string;
}

export interface TestimonialsCarouselSectionData {
  __component: 'sections.testimonials-carousel';
  eyebrow: string;
  testimonials: Testimonial[];
}

export interface VideoCtaBackground {
  url: string;
  poster: string | null;
  autoplay: boolean;
  loop: boolean;
  muted: boolean;
}

export interface VideoCtaSectionData {
  __component: 'sections.video-cta';
  backgroundVideo: VideoCtaBackground;
  title: string;
  bodyText: string;
  ctaLabel: string;
  ctaHref: string;
  ctaArrowGlyph: string;
}

/**
 * Sections added for the fully CMS-driven site (About, Contact, listings).
 * Their fields are flattened straight from the Strapi schema, so they're
 * typed loosely here and consumed by the (JS) section components.
 */
export interface GenericSectionData {
  __component: string;
  [field: string]: unknown;
}

export type Section =
  | GenericSectionData
  | HeroSectionData
  | LogoMarqueeSectionData
  | TimelineShiftSectionData
  | ThreePillarsSectionData
  | StatsGridSectionData
  | BrandTileMarqueeSectionData
  | MarqueeBandSectionData
  | BlogPreviewSectionData
  | TestimonialsCarouselSectionData
  | VideoCtaSectionData;

export interface HomePageFull {
  seo: Seo | null;
  global: Global;
  sections: Section[];
}

export interface ContactInfoCard {
  heading: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
}

export interface ContactStat {
  number: string;
  label: string;
}

export interface ContactNextStep {
  stepNumber: string | null;
  title: string | null;
  description: string;
}

/** Typed shape of GET /api/contact-page (Strapi's raw response, unflattened — this content type has no media/relations needing a serializer). */
export interface ContactPageData {
  title: string;
  seo: Seo | null;
  heroBadge: string | null;
  heroHeading: string | null;
  heroSubheading: string | null;
  infoCard: ContactInfoCard | null;
  stats: ContactStat[];
  nextStepsHeading: string | null;
  nextSteps: ContactNextStep[];
}

/**
 * Typed shape of GET /api/pages/slug/:slug — the unified Pages collection
 * (Home/About/Contact all as one Collection Type). One shape covers every
 * page: `sections` is Home's dynamic zone, the hero/infoCard/stats/nextSteps
 * fields are Contact's, and any page not using a given field just gets
 * an empty array / null there.
 */
export interface PageData {
  title: string;
  slug: string;
  seo: Seo | null;
  sections: Section[];
  heroBadge: string | null;
  heroHeading: string | null;
  heroSubheading: string | null;
  infoCard: ContactInfoCard | null;
  stats: ContactStat[];
  nextStepsHeading: string | null;
  nextSteps: ContactNextStep[];
}

/** Plain media file (bare Strapi `media` attributes, e.g. videos). */
export interface MediaFile {
  url: string;
  alt: string;
  width: number | null;
  height: number | null;
  mime: string | null;
}

export interface CtaBanner {
  label: string | null;
  title: string;
  description: string | null;
  buttonLabel: string;
  buttonHref: string;
}

/** GET /api/blog-posts/slug/:slug */
export interface BlogPostDetail {
  post: {
    id: string;
    title: string;
    slug: string;
    date: string;
    category: string;
    categoryKey: string | null;
    sector: string | null;
    excerpt: string | null;
    content: string | null;
    coverImage: Media | null;
    seo: Seo | null;
  };
  related: BlogPost[];
}

export interface CaseStudyCard {
  id: string;
  title: string;
  slug: string;
  category: string | null;
  sector: string | null;
  href: string;
  image: Media | null;
}

/** GET /api/case-studies/slug/:slug */
export interface CaseStudyDetail {
  caseStudy: {
    id: string;
    title: string;
    slug: string;
    subtitle: string | null;
    summary: string | null;
    seo: Seo | null;
    [field: string]: unknown;
  };
  related: CaseStudyCard[];
}

/** GET /api/blog-detail-page */
export interface BlogDetailSettings {
  backgroundVideo: MediaFile | null;
  dateLabel: string | null;
  categoryLabel: string | null;
  relatedKicker: string | null;
  relatedTitle: string | null;
  relatedButtonLabel: string | null;
  cta: CtaBanner | null;
  metaTitleSuffix: string | null;
  notFoundTitle: string | null;
}

/** GET /api/case-study-detail-page */
export interface CaseStudyDetailSettings {
  backgroundVideo: MediaFile | null;
  clientLabel: string | null;
  industryLabel: string | null;
  servicesLabel: string | null;
  durationLabel: string | null;
  objectivesLabel: string | null;
  objectivesTitle: string | null;
  challengesLabel: string | null;
  challengesTitle: string | null;
  servicesDeployedLabel: string | null;
  servicesDeployedTitle: string | null;
  resultsKicker: string | null;
  resultsTitle: string | null;
  relatedKicker: string | null;
  relatedTitle: string | null;
  relatedButtonLabel: string | null;
  cta: CtaBanner | null;
  metaTitleSuffix: string | null;
  notFoundTitle: string | null;
}
