type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  align?: "start" | "center";
  light?: boolean;
  className?: string;
};

export function SectionHeader({
  title,
  subtitle,
  align = "start",
  light = false,
  className = "",
}: SectionHeaderProps) {
  return (
    <header
      className={`section-header section-header--${align} mb-10 md:mb-14 ${
        align === "center" ? "mx-auto max-w-prose text-center" : "max-w-prose"
      } ${className}`}
    >
      <h2
        className={`section-heading text-balance ${
          light ? "section-heading--light" : ""
        }`}
      >
        {title}
      </h2>
      <div
        className={`section-heading-rule ${
          light ? "section-heading-rule--light" : ""
        }`}
        aria-hidden
      />
      {subtitle && (
        <p
          className={`mt-4 text-prose ${align === "center" ? "mx-auto" : ""} ${
            light ? "!text-white/60" : ""
          }`}
        >
          {subtitle}
        </p>
      )}
    </header>
  );
}
