"use client";

import Image, { ImageProps } from "next/image";
import { useEffect, useState } from "react";

interface ImageWithFallbackProps extends Omit<ImageProps, "src" | "alt"> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  onError?: () => void;
  onLoad?: () => void;
}

export default function ImageWithFallback({
  src,
  alt,
  fallbackSrc,
  className,
  fill = false,
  width,
  height,
  priority = false,
  unoptimized = false,
  loading = "lazy",
  sizes,
  onClick,
  ...props
}: ImageWithFallbackProps) {
  const [currentSrc, setCurrentSrc] = useState<string>(() => {
    if (src && src.trim() !== "") {
      return `${process.env.NEXT_PUBLIC_CDN}/${src}`;
    }
    return "";
  });
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);

      if (fallbackSrc) {
        setCurrentSrc(fallbackSrc);
        return;
      }

      props.onError?.();
    }
  };

  const handleLoad = () => {
    setHasError(false);
    props.onLoad?.();
  };

  useEffect(() => {
    if (src && src.trim() !== "") {
      setCurrentSrc(`${process.env.NEXT_PUBLIC_CDN}/${src}`);
      setHasError(false);
    }
  }, [src]);

  const imageProps = {
    src: currentSrc,
    alt,
    className,
    fill,
    width: fill ? undefined : width,
    height: fill ? undefined : height,
    priority,
    unoptimized,
    loading: priority ? undefined : loading,
    sizes,
    onClick,
    onError: handleError,
    onLoad: handleLoad,
    ...props,
  };

  if (!currentSrc || currentSrc.trim() === "") {
    return null;
  }

  return <Image {...imageProps} />;
}
