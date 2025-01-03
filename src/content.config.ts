import { z, defineCollection } from "astro:content";
import { glob } from "astro/loaders";

const postSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  cover: z.string().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()),
  draft: z.boolean().default(false),
  published: z.date(),
  updateAt: z.date().optional(),
});
const postCollection = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/posts" }),
  schema: postSchema,
});

const aboutCollection = defineCollection({
  loader: glob({ pattern: "index.md", base: "./src/content/about" }),
  schema: postSchema,
});

export const collections = {
  posts: postCollection,
  about: aboutCollection,
};
