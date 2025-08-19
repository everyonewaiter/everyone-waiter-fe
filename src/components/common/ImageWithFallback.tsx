"use client";

import Image, { ImageProps } from "next/image";
import { useState, useEffect } from "react";

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
  const [currentSrc, setCurrentSrc] = useState<string>("");
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);

      if (currentSrc.startsWith(process.env.NEXT_PUBLIC_PROD_CDN!)) {
        setCurrentSrc(`${process.env.NEXT_PUBLIC_DEV_CDN}/${src}`);
        return;
      }

      if (currentSrc.startsWith(process.env.NEXT_PUBLIC_DEV_CDN!)) {
        if (fallbackSrc) {
          setCurrentSrc(fallbackSrc);
          return;
        }
      }

      props.onError?.();
    }
  };

  const handleLoad = () => {
    setHasError(false);
    props.onLoad?.();
  };

  useEffect(() => {
    setCurrentSrc(`${process.env.NEXT_PUBLIC_PROD_CDN}/${src}`);
    setHasError(false);
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
    loading,
    sizes,
    onClick,
    onError: handleError,
    onLoad: handleLoad,
    ...props,
  };

  return <Image {...imageProps} />;
}
