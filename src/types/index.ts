export type Locale = "he" | "en";

export type LocalizedString = Record<Locale, string>;

export type NavLink = {
  id: string;
  href: string;
  label: LocalizedString;
};

export type ServicePackage = {
  id: string;
  tier: string;
  name: LocalizedString;
  summary: LocalizedString;
  description: LocalizedString;
  suitableFor: LocalizedString;
  highlights: LocalizedString[];
  featured?: boolean;
};

export type ProjectType = {
  id: string;
  label: LocalizedString;
};

export type GalleryPhase = "before" | "after";

export type ProjectImage = {
  src: string;
  caption?: LocalizedString;
  phase?: GalleryPhase;
};

export type ProjectSummary = {
  id: string;
  slug: string;
  name: LocalizedString;
  type: LocalizedString;
  location: LocalizedString;
  description: LocalizedString;
  coverImage: string;
  thumbnailImage: string;
};

export type Project = ProjectSummary & {
  gallery?: ProjectImage[];
  renders?: ProjectImage[];
};

export type ProcessStep = {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
};

export type LegalSection = {
  heading: LocalizedString;
  paragraphs: LocalizedString[];
};

export type LegalPageCopy = {
  title: LocalizedString;
  updatedAt: LocalizedString;
  intro: LocalizedString;
  sections: LegalSection[];
};

export type SiteCopy = {
  meta: { title: LocalizedString; description: LocalizedString };
  brand: LocalizedString;
  tagline: LocalizedString;
  nav: NavLink[];
  cta: {
    consult: LocalizedString;
    portfolio: LocalizedString;
    packageDetails: LocalizedString;
    viewProject: LocalizedString;
    send: LocalizedString;
    whatsapp: LocalizedString;
  };
  hero: {
    headline: LocalizedString;
    lead: LocalizedString;
    subtext: LocalizedString;
    scrollHint: LocalizedString;
  };
  about: {
    title: LocalizedString;
    intro: LocalizedString;
    credentials: LocalizedString;
    /** About page portrait — editable in admin under Site texts → About */
    portraitImage: string;
    opening: LocalizedString[];
    approachIntro: LocalizedString;
    approachPillars: LocalizedString[];
    highlight: LocalizedString;
    closing: LocalizedString[];
  };
  services: {
    title: LocalizedString;
    subtitle: LocalizedString;
    popular: LocalizedString;
    suitableLabel: LocalizedString;
    readMore: LocalizedString;
    readLess: LocalizedString;
    includesLabel: LocalizedString;
  };
  projectTypes: { title: LocalizedString };
  portfolio: {
    title: LocalizedString;
    subtitle: LocalizedString;
    viewProject: LocalizedString;
    galleryTitle: LocalizedString;
    rendersTitle: LocalizedString;
    beforeTitle: LocalizedString;
    backToPortfolio: LocalizedString;
  };
  process: { title: LocalizedString; subtitle: LocalizedString };
  contact: {
    title: LocalizedString;
    prompt: LocalizedString;
    text: LocalizedString;
    locationLabel: LocalizedString;
    location: LocalizedString;
    areaLabel: LocalizedString;
    area: LocalizedString;
    emailLabel: LocalizedString;
    email: string;
    whatsapp: string;
    form: {
      name: LocalizedString;
      phone: LocalizedString;
      email: LocalizedString;
      projectType: LocalizedString;
      message: LocalizedString;
      messagePlaceholder: LocalizedString;
      projectTypeOptions: LocalizedString[];
      privacyConsentBefore: LocalizedString;
      privacyConsentLink: LocalizedString;
      privacyConsentAfter: LocalizedString;
    };
  };
  footer: {
    rights: LocalizedString;
    privacyLabel: LocalizedString;
    accessibilityLabel: LocalizedString;
    termsLabel: LocalizedString;
    cookiesLabel: LocalizedString;
  };
  legalDisclaimer: LocalizedString;
  privacy: LegalPageCopy;
  accessibility: LegalPageCopy;
  terms: LegalPageCopy;
  cookies: LegalPageCopy;
  ctaBand: {
    afterPortfolio: { title: LocalizedString; text: LocalizedString };
  };
};

export type SiteTheme = {
  colors: {
    ink: string;
    inkSoft: string;
    text: string;
    textMuted: string;
    textSubtle: string;
    surfaceWarm: string;
    surfaceWhite: string;
    pageBackground: string;
  };
  borders: {
    color: string;
    colorLight: string;
    colorStrong: string;
    width: string;
    widthStrong: string;
    radius: string;
  };
  hero: {
    panelBackground: string;
    panelBorder: string;
    cornerColor: string;
    titleColor: string;
    subtitleColor: string;
    accentBar: string;
    sectionBorder: string;
  };
  cards: {
    background: string;
    border: string;
    shadow: string;
  };
  featured: {
    background: string;
    text: string;
    textMuted: string;
    border: string;
    badgeBackground: string;
    badgeBorder: string;
    badgeText: string;
    innerBorder: string;
  };
  buttons: {
    primaryBackground: string;
    primaryText: string;
    primaryHover: string;
    outlineBorder: string;
    outlineText: string;
    ghostHoverBorder: string;
  };
  header: {
    border: string;
    background: string;
    backgroundScrolled: string;
  };
  forms: {
    inputBorder: string;
    inputBackground: string;
    inputText: string;
  };
  footer: {
    background: string;
    border: string;
  };
  accents: {
    selectionBackground: string;
    selectionText: string;
    focusRing: string;
    sectionRule: string;
    linkUnderline: string;
  };
  about: {
    portraitBorder: string;
    portraitBackground: string;
    portraitPlaceholderBorder: string;
    highlightBorder: string;
  };
  project: {
    mediaBorder: string;
    overlay: string;
  };
};
