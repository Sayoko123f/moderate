import type { HTMLAttributes } from "astro/types";

export interface SocialLink {
  url: string;
  icon?: string;
  text?: string;
}

export interface ThemeConfig {
  lang: HTMLAttributes<"html">["lang"];
  siteTitle: string;
  socialLinks: SocialLink[];
}
