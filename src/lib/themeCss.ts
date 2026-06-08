import type { SiteTheme } from "@/types";
import { siteTheme as seedSiteThemeData } from "@/data/siteTheme";

function deepMergeTheme(base: SiteTheme, patch: Partial<SiteTheme>): SiteTheme {
  return {
    colors: { ...base.colors, ...patch.colors },
    borders: { ...base.borders, ...patch.borders },
    hero: { ...base.hero, ...patch.hero },
    cards: { ...base.cards, ...patch.cards },
    featured: { ...base.featured, ...patch.featured },
    buttons: { ...base.buttons, ...patch.buttons },
    header: { ...base.header, ...patch.header },
    forms: { ...base.forms, ...patch.forms },
    footer: { ...base.footer, ...patch.footer },
    accents: { ...base.accents, ...patch.accents },
    about: { ...base.about, ...patch.about },
    project: { ...base.project, ...patch.project },
  };
}

export function mergeSiteTheme(stored: Partial<SiteTheme> | null | undefined): SiteTheme {
  if (!stored) return seedSiteThemeData;
  return deepMergeTheme(seedSiteThemeData, stored);
}

/** Maps the editable theme to CSS custom properties consumed by globals.css */
export function themeToCssText(theme: SiteTheme): string {
  const v = {
    "--surface-warm": theme.colors.surfaceWarm,
    "--theme-color-ink": theme.colors.ink,
    "--theme-color-ink-soft": theme.colors.inkSoft,
    "--theme-color-text": theme.colors.text,
    "--theme-color-text-muted": theme.colors.textMuted,
    "--theme-color-text-subtle": theme.colors.textSubtle,
    "--theme-color-surface-warm": theme.colors.surfaceWarm,
    "--theme-color-surface-white": theme.colors.surfaceWhite,
    "--theme-color-page-bg": theme.colors.pageBackground,
    "--theme-border-color": theme.borders.color,
    "--theme-border-color-light": theme.borders.colorLight,
    "--theme-border-color-strong": theme.borders.colorStrong,
    "--theme-border-width": theme.borders.width,
    "--theme-border-width-strong": theme.borders.widthStrong,
    "--theme-border-radius": theme.borders.radius,
    "--theme-hero-panel-bg": theme.hero.panelBackground,
    "--theme-hero-panel-border": theme.hero.panelBorder,
    "--theme-hero-corner": theme.hero.cornerColor,
    "--theme-hero-title": theme.hero.titleColor,
    "--theme-hero-subtitle": theme.hero.subtitleColor,
    "--theme-hero-accent-bar": theme.hero.accentBar,
    "--theme-hero-section-border": theme.hero.sectionBorder,
    "--theme-card-bg": theme.cards.background,
    "--theme-card-border": theme.cards.border,
    "--theme-card-shadow": theme.cards.shadow,
    "--theme-shadow-soft": theme.cards.shadow,
    "--theme-featured-bg": theme.featured.background,
    "--theme-featured-text": theme.featured.text,
    "--theme-featured-text-muted": theme.featured.textMuted,
    "--theme-featured-border": theme.featured.border,
    "--theme-featured-badge-bg": theme.featured.badgeBackground,
    "--theme-featured-badge-border": theme.featured.badgeBorder,
    "--theme-featured-badge-text": theme.featured.badgeText,
    "--theme-featured-inner-border": theme.featured.innerBorder,
    "--theme-button-primary-bg": theme.buttons.primaryBackground,
    "--theme-button-primary-text": theme.buttons.primaryText,
    "--theme-button-primary-hover": theme.buttons.primaryHover,
    "--theme-button-outline-border": theme.buttons.outlineBorder,
    "--theme-button-outline-text": theme.buttons.outlineText,
    "--theme-button-ghost-hover-border": theme.buttons.ghostHoverBorder,
    "--theme-header-border": theme.header.border,
    "--theme-header-bg": theme.header.background,
    "--theme-header-bg-scrolled": theme.header.backgroundScrolled,
    "--theme-input-border": theme.forms.inputBorder,
    "--theme-input-bg": theme.forms.inputBackground,
    "--theme-input-text": theme.forms.inputText,
    "--theme-footer-bg": theme.footer.background,
    "--theme-footer-border": theme.footer.border,
    "--theme-selection-bg": theme.accents.selectionBackground,
    "--theme-selection-text": theme.accents.selectionText,
    "--theme-focus-ring": theme.accents.focusRing,
    "--theme-section-rule": theme.accents.sectionRule,
    "--theme-link-underline": theme.accents.linkUnderline,
    "--theme-about-portrait-border": theme.about.portraitBorder,
    "--theme-about-portrait-bg": theme.about.portraitBackground,
    "--theme-about-portrait-placeholder-border": theme.about.portraitPlaceholderBorder,
    "--theme-about-highlight-border": theme.about.highlightBorder,
    "--theme-project-media-border": theme.project.mediaBorder,
    "--theme-project-overlay": theme.project.overlay,
  };

  const lines = Object.entries(v)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join("\n");

  return `:root {\n${lines}\n}`;
}

export { seedSiteThemeData as seedSiteTheme };
