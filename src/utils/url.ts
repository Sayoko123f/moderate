import { joinURL } from "ufo";
import type { PostEntry } from "./content";

function toURL(...input: string[]): string {
  return `${joinURL(import.meta.env.BASE_URL, ...input)}`;
}

export function postURL(post: PostEntry): string {
  return toURL("posts", post.slug);
}

export function tagURL(tag: string): string {
  return toURL("tag", tag);
}
