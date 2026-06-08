import { themeToCssText } from "@/lib/themeCss";
import type { SiteTheme } from "@/types";

export function ThemeStyles({ theme }: { theme: SiteTheme }) {
  return (
    <style
      id="site-theme"
      dangerouslySetInnerHTML={{ __html: themeToCssText(theme) }}
    />
  );
}
