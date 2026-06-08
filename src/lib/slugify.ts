/** Convert free text to a URL-safe slug (lowercase ASCII + hyphens). */
export function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

type LocalizedName = { he: string; en: string };

export function slugifyFromName(name: LocalizedName): string {
  const source = name.en.trim() || name.he.trim();
  return slugify(source);
}

/** Keep slug in sync with name until the editor customizes the slug manually. */
export function shouldSyncSlugFromName(
  currentSlug: string,
  previousName: LocalizedName
): boolean {
  const normalized = currentSlug.trim();
  if (!normalized) return true;
  return normalized === slugifyFromName(previousName);
}
