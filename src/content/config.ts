import { z, defineCollection } from "astro:content";

const postSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  poster: z.string().optional(),
  tags: z.array(z.string()),
  draft: z.boolean().default(false),
  published: z.date(),
  updateAt: z.date().optional(),
});
const postCollection = defineCollection({
  type: "content",
  schema: postSchema,
});

// export type PostProps = z.infer<typeof postSchema>;

export const collections = {
  posts: postCollection,
};
