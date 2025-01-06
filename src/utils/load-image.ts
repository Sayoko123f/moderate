import type { ImageMetadata } from "astro";
import path from "node:path";
import { joinBaseURL } from "@/utils/url";

interface LoadImageParams {
  src: string | ImageMetadata;
  entryFilePath?: string;
}

interface LoadImageReturn {
  isLocal: boolean;
  isRemote: boolean;
  localImage?: ImageMetadata;
  urlIfNotLocal?: string;
}

export async function loadImage({
  src,
  entryFilePath = "/",
}: LoadImageParams): Promise<LoadImageReturn> {
  if (isImageMetadata(src)) {
    return {
      isLocal: true,
      isRemote: false,
      localImage: src,
    };
  }
  const isLocal = !(
    src.startsWith("/") ||
    src.startsWith("http") ||
    src.startsWith("https") ||
    src.startsWith("data:")
  );
  const isRemote = src.startsWith("/");
  let localImage: ImageMetadata | undefined;
  if (isLocal) {
    const allImageFiles = import.meta.glob(
      "../**/*.{jpeg,webp,jpg,png,svg,gif,avif}",
      { import: "default" },
    );
    const srcDir = "..";

    const imagePath = path.join(srcDir, entryFilePath, src);
    const importPath = path.normalize(imagePath).replaceAll("\\", "/");
    if (!(importPath in allImageFiles)) {
      throw new Error(
        `[ERROR] Not found image file, src=${src}, importPath=${importPath}, entryFilePath=${entryFilePath}.`,
      );
    }

    const imgModule = await allImageFiles[importPath]();
    localImage = imgModule as ImageMetadata;
  }
  let urlIfNotLocal: string | undefined;
  if (!isLocal) {
    urlIfNotLocal = isRemote ? joinBaseURL(src) : src;
  }

  return {
    isLocal,
    isRemote,
    localImage,
    urlIfNotLocal,
  };
}

function isImageMetadata(obj: unknown): obj is ImageMetadata {
  if (obj && typeof obj === "object") {
    if ("src" in obj && "width" in obj && "height" in obj && "format" in obj) {
      return true;
    }
  }
  return false;
}
