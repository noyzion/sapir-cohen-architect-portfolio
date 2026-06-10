function getInstagramHandle(url: string): string {
  const trimmed = url.replace(/\/$/, "");
  const segment = trimmed.split("/").pop()?.replace(/^@/, "") ?? "";
  return segment ? `@${segment}` : "";
}

type InstagramLinkProps = {
  href: string;
  locale: "he" | "en";
  className?: string;
};

export function InstagramLink({
  href,
  locale,
  className = "",
}: InstagramLinkProps) {
  const handle = getInstagramHandle(href);
  const label =
    locale === "he" ? `אינסטגרם — ${handle}` : `Instagram — ${handle}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={label}
    >
      {handle}
    </a>
  );
}
