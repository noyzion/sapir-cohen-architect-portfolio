# Sapir Cohen — Visual Style Guide

Premium architectural portfolio. Minimal black / white / stone palette.

---

## Colors

| Token | Hex | Use |
|-------|-----|-----|
| `ink` | `#0a0a0a` | Headlines, primary buttons, process section |
| `ink-soft` | `#141414` | Button hover |
| `stone-50` | `#fafaf9` | Alternate section backgrounds |
| `stone-200` | `#e7e5e4` | Borders, dividers |
| `stone-400` | `#a8a29e` | Labels, captions |
| `stone-600` | `#57534e` | Body text |

**Rule:** No accent colors. Contrast through typography, space, and photography.

---

## Typography scale

| Class | Size | Use |
|-------|------|-----|
| `text-display-xl` | clamp 2.75rem → 5rem | Hero name |
| `text-display-lg` | clamp 2rem → 3rem | Section titles, project names |
| `text-display-md` | clamp 1.5rem → 2.25rem | Cards, process steps |
| `text-body` | 1.0625rem | Long-form about text |
| `text-body-sm` | 0.9375rem | UI, forms, nav |
| `label-caps` | 0.6875rem, tracking 0.16em | Labels, tiers, metadata |

**Fonts**
- Hebrew: Heebo (body + display)
- English body: Outfit
- English display: DM Serif Display

---

## Spacing system

| Token | Value |
|-------|--------|
| `gutter` | clamp(1.25rem, 4vw, 2.5rem) — horizontal page padding |
| `section` | clamp(5rem, 12vw, 8rem) — vertical section padding |
| `section-sm` | clamp(3.5rem, 8vw, 5rem) — CTA bands, compact sections |

**Layout:** `container-site` = max-width 76rem, centered, gutter padding.

---

## Buttons

| Class | Style |
|-------|--------|
| `btn-primary` | Black fill, white text |
| `btn-secondary` | White fill, border, black text |
| `btn-ghost` | Transparent, hover border |

Use `Button` / `ButtonLink` components. Min tap target: 44px height on mobile.

---

## Cards

| Class | Use |
|-------|-----|
| `card` + `card-pad` | Value props, form container |
| `card-service` | Service packages |
| `card-service-featured` | SMART tier — ink ring |

---

## Project gallery

**Home portfolio**
- Alternating image / text grid on desktop
- Full-width image stack on mobile
- `project-media` — subtle zoom on hover, light overlay
- `ArrowLink` — direction-aware arrow (RTL ← / LTR →)

**Project detail**
- Hero image 16:9 → 21:9 on desktop
- Grid: 1 col mobile → 2 col tablet → 3 col desktop
- First image spans 2 cols when 4+ images
- Captions: gradient overlay, label caps

---

## Process section (responsive)

| Breakpoint | Layout |
|------------|--------|
| Mobile | Horizontal scroll + snap, ~82vw cards |
| Tablet (md) | 2-column grid |
| Desktop (xl) | 5-column grid |

Hint text on mobile: "גלילה לצפייה בכל השלבים".

---

## Mobile behavior

- Sticky bottom CTA: consultation button (`StickyCta`)
- `has-sticky-cta` padding on main to avoid overlap
- Hero CTAs stack full-width on narrow screens
- Services: single column → 3 columns at `lg`
- Header: hamburger menu, brand visible

---

## RTL / LTR rules

1. Set `lang` + `dir` on `<html>` via `LanguageContext`.
2. Use **logical** properties: `ps`/`pe`, `ms`/`me`, `start`/`end`, `border-s`.
3. About grid: text column uses `lg:col-start-2` in Hebrew, `col-start-1` in English.
4. Back links & arrows flip with `dir` (see `ArrowLink`, `ProjectDetail`).
5. Process scroll hint arrow matches reading direction.

---

## Conversion flow

1. Hero → primary CTA (consultation)
2. After Services → `CtaBand`
3. Portfolio → project pages → contact CTA
4. After Portfolio → `CtaBand`
5. Contact form + WhatsApp
6. Mobile sticky CTA throughout scroll

---

## CSS utilities (globals.css)

All components should prefer: `container-site`, `section-pad`, `label-caps`, `text-prose`, `btn-*`, `card-*`, `input-field`, `process-track`, `process-step`.
