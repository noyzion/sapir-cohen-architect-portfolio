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
      className={`mb-10 md:mb-14 ${align === "center" ? "mx-auto max-w-prose text-center" : "max-w-prose"} ${className}`}
    >
      <h2
        className={`font-display text-display-lg text-balance ${
          light ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
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
