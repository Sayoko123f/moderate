import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";

export async function getPosts() {
  const postEntries = await getCollection("posts", ({ data }) => {
    return import.meta.env.PROD ? data.draft !== true : true;
  });

  postEntries.sort(
    (a, b) => b.data.published.getTime() - a.data.published.getTime(),
  );

  return postEntries;
}

export type PostEntry = CollectionEntry<"posts">;
