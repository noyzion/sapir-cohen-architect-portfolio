export type A11yTextScale = 0 | 1 | 2;
export type A11yPrefs = {
  textScale: A11yTextScale;
  highContrast: boolean;
  underlineLinks: boolean;
  readableFont: boolean;
};

export const A11Y_STORAGE_KEY = "sapir-a11y-prefs";

export const defaultA11yPrefs: A11yPrefs = {
  textScale: 0,
  highContrast: false,
  underlineLinks: false,
  readableFont: false,
};

export function loadA11yPrefs(): A11yPrefs {
  if (typeof window === "undefined") return defaultA11yPrefs;
  try {
    const raw = localStorage.getItem(A11Y_STORAGE_KEY);
    if (!raw) return defaultA11yPrefs;
    const parsed = JSON.parse(raw) as Partial<A11yPrefs>;
    return {
      textScale: [0, 1, 2].includes(parsed.textScale as number)
        ? (parsed.textScale as A11yTextScale)
        : 0,
      highContrast: Boolean(parsed.highContrast),
      underlineLinks: Boolean(parsed.underlineLinks),
      readableFont: Boolean(parsed.readableFont),
    };
  } catch {
    return defaultA11yPrefs;
  }
}

export function saveA11yPrefs(prefs: A11yPrefs) {
  localStorage.setItem(A11Y_STORAGE_KEY, JSON.stringify(prefs));
}

export function applyA11yPrefs(prefs: A11yPrefs) {
  const root = document.documentElement;
  root.classList.remove("a11y-text-1", "a11y-text-2");
  if (prefs.textScale === 1) root.classList.add("a11y-text-1");
  if (prefs.textScale === 2) root.classList.add("a11y-text-2");
  root.classList.toggle("a11y-high-contrast", prefs.highContrast);
  root.classList.toggle("a11y-underline-links", prefs.underlineLinks);
  root.classList.toggle("a11y-readable-font", prefs.readableFont);
}
