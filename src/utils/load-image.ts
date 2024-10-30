import type { ImageMetadata } from "astro";
import path from "node:path";
import { joinBaseURL } from "@/utils/url";

interface LoadImageParams {
  src: string;
  basePath: string;
}

export async function loadImage({ src, basePath }: LoadImageParams) {
  const isLocal = !(
    src.startsWith("/") ||
    src.startsWith("http") ||
    src.startsWith("https") ||
    src.startsWith("data:")
  );
  const isPublic = src.startsWith("/");
  let localImage: ImageMetadata | undefined;
  if (isLocal) {
    const allImageFiles = import.meta.glob(
      "../**/*.{jpeg,webp,jpg,png,svg,gif,avif}",
      { import: "default" },
    );
    const srcDir = "..";
    const imagePath = path.join(srcDir, path.dirname(basePath), src);
    const importPath = path.normalize(imagePath).replaceAll("\\", "/");
    const imgModule = await allImageFiles[importPath]();
    if (!imgModule) {
      throw new Error(
        `[ERROR] Not found image file, originalInput=${src}, importPath=${importPath}, basePath=${basePath}.`,
      );
    }
    localImage = imgModule as ImageMetadata;
  }
  let urlIfNotLocal: string | undefined;
  if (!isLocal) {
    urlIfNotLocal = isPublic ? joinBaseURL(src) : src;
  }

  return {
    isLocal,
    isPublic,
    localImage,
    urlIfNotLocal,
  };
}
