import path from "node:path";
import type { PostEntry } from "./content";

export function joinBaseURL(...input: string[]): string {
  return `${path.join(import.meta.env.BASE_URL, ...input)}`;
}

export function postURL(post: PostEntry): string {
  return joinBaseURL("posts", post.slug);
}

export function tagURL(tag: string): string {
  return joinBaseURL("tag", tag);
}

/**
 * Return relative path from `src`.
 */
export function calcPostFilePath(post: PostEntry): string {
  return path.join("content", "posts", post.id);
}
