import type { ThemeConfig } from "@/types/theme";
import avatar from "@/assets/avatar.jpg";

export const themeConfig: ThemeConfig = {
  lang: "zh-TW",
  siteTitle: "Welcome to Astro.",
  siteDescription: "An Astro theme.",
  profile: {
    name: "Tester",
    avatar: avatar,
    bio: "Testing",
  },
  socialLinks: [
    { url: "#", icon: "BiTwitterX.astro" },
    { url: "#", icon: "MdiGithub.astro" },
    { url: "#", text: "Any Site" },
  ],
};
