"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { ProjectImage } from "@/components/ui/ProjectImage";

type PortfolioSlideshowProps = {
  images: string[];
  alt: string;
  intervalMs?: number;
  fadeMs?: number;
  sizes?: string;
  priority?: boolean;
};

export function PortfolioSlideshow({
  images,
  alt,
  intervalMs = 3600,
  fadeMs = 850,
  sizes = "(max-width: 1024px) 100vw, (max-width: 1280px) 55vw, 600px",
  priority = false,
}: PortfolioSlideshowProps) {
  const [index, setIndex] = useState(0);
  const [motionOk, setMotionOk] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setMotionOk(!mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!motionOk || images.length <= 1) return;

    let timer: ReturnType<typeof setInterval> | undefined;

    const start = () => {
      timer = setInterval(() => {
        setIndex((current) => (current + 1) % images.length);
      }, intervalMs);
    };

    const stop = () => {
      if (timer) clearInterval(timer);
      timer = undefined;
    };

    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };

    start();
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [images.length, intervalMs, motionOk]);

  if (images.length === 0) return null;

  const slides = motionOk && images.length > 1 ? images : [images[0]];

  const slideshowStyle = {
    "--slideshow-fade-ms": `${fadeMs}ms`,
  } as CSSProperties;

  return (
    <div
      className="portfolio-slideshow"
      style={slideshowStyle}
      role="group"
      aria-roledescription="carousel"
      aria-label={alt}
    >
      {slides.map((src, i) => (
        <div
          key={src}
          className={`portfolio-slideshow__slide ${
            i === index ? "is-active" : ""
          }`}
          aria-hidden={slides.length > 1 ? i !== index : undefined}
        >
          <ProjectImage
            src={src}
            alt={i === index ? alt : ""}
            sizes={sizes}
            priority={priority && i === 0}
          />
        </div>
      ))}
    </div>
  );
}
