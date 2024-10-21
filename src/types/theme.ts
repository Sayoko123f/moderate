import type { RequireExactlyOne } from "type-fest";
import type { HTMLAttributes } from "astro/types";

interface _SocialLink {
  url: string;
  icon?: string;
  text?: string;
}
export type SocialLink = RequireExactlyOne<_SocialLink, "icon" | "text">;

export interface ThemeConfig {
  lang: HTMLAttributes<"html">["lang"];
  siteTitle: string;
  profile: {
    name: string;
    avatar?: string;
    bio?: string;
  };
  socialLinks: SocialLink[];
}
