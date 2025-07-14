import rss from "@astrojs/rss";
import { getPosts } from "@/utils/content";
import { postURL } from "@/utils/url";
import type { APIContext } from "astro";
import { themeConfig } from "@/theme-config";

export async function GET(context: APIContext) {
  const blog = await getPosts();

  return rss({
    title: themeConfig.siteTitle,
    description: themeConfig.siteDescription || "No description",
    site: context.site ?? "https://fuwari.vercel.app",
    trailingSlash: false,
    items: blog.map((post) => {
      return {
        title: post.data.title,
        pubDate: post.data.published,
        description: post.data.description || "",
        link: postURL(post),
      };
    }),
    customData: `<language>${themeConfig.lang}</language>`,
  });
}
