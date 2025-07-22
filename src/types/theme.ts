import type { RequireExactlyOne } from "type-fest";
import type { HTMLAttributes } from "astro/types";
import type { ImageMetadata } from "astro";

interface _SocialLink {
  url: string;
  icon?: string;
  text?: string;
}
export type SocialLink = RequireExactlyOne<_SocialLink, "icon" | "text">;

export interface ThemeConfig {
  lang: HTMLAttributes<"html">["lang"];
  siteTitle: string;
  siteDescription: string;
  siteTitleDelimiter?: string;
  profile: {
    name: string;
    avatar?: ImageMetadata;
    bio?: string;
  };
  socialLinks: SocialLink[];
}
