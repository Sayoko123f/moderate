import { getCollection, getEntry } from "astro:content";
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

export async function getAbout() {
  const about = await getEntry("about", "index");
  if (!about) {
    throw Error('Not found "src/content/about/index.md"');
  }
  return about;
}

export type PostEntry = CollectionEntry<"posts">;
