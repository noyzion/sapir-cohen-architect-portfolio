"use client";

import Image from "next/image";
import { useState } from "react";
import { getImageMeta } from "@/data/imageMeta";
import { resolveBlobSrc } from "@/lib/blobAccess";

const IMAGE_QUALITY_DEFAULT = 82;
const IMAGE_QUALITY_HERO = 95;

type ProjectImageProps = {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  priority?: boolean;
  loading?: "lazy" | "eager";
  sizes?: string;
  quality?: number;
  /** Serve static file as-is (no Next re-encode). Best for pre-optimized hero covers. */
  unoptimized?: boolean;
  onLoad?: () => void;
};

export function ProjectImage({
  src,
  alt,
  className = "",
  fill = true,
  priority = false,
  loading,
  sizes = "(max-width: 768px) 100vw, 50vw",
  quality,
  unoptimized = false,
  onLoad,
}: ProjectImageProps) {
  const imageQuality =
    quality ?? (priority ? IMAGE_QUALITY_HERO : IMAGE_QUALITY_DEFAULT);
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const resolvedSrc = resolveBlobSrc(src);
  const isPlaceholder = resolvedSrc.includes("placeholders");
  const meta = getImageMeta(resolvedSrc.startsWith("/api/") ? src : resolvedSrc);
  const blurDataURL = meta?.blurDataURL;
  const useBlur = Boolean(blurDataURL) && !priority;

  if (error || isPlaceholder) {
    return (
      <div
        className={`absolute inset-0 bg-gradient-to-br from-stone-200 via-stone-100 to-stone-300 ${className}`}
        aria-hidden
      />
    );
  }

  const handleLoad = () => {
    setLoaded(true);
    onLoad?.();
  };

  return (
    <>
      <span
        className={`absolute inset-0 bg-stone-200 transition-opacity duration-500 ${
          loaded ? "opacity-0" : "opacity-100"
        }`}
        aria-hidden
      />
      <Image
        src={resolvedSrc}
        alt={alt}
        unoptimized={unoptimized || resolvedSrc.startsWith("/api/blob")}
        fill={fill}
        width={fill ? undefined : meta?.width}
        height={fill ? undefined : meta?.height}
        priority={priority}
        loading={priority ? undefined : loading ?? "lazy"}
        sizes={sizes}
        quality={imageQuality}
        placeholder={useBlur ? "blur" : "empty"}
        blurDataURL={useBlur ? blurDataURL : undefined}
        className={`object-cover transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        } ${className}`}
        onLoad={handleLoad}
        onError={() => setError(true)}
      />
    </>
  );
}
