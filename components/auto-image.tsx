"use client"

import Image from "next/image"
import { useState } from "react"

interface AutoImageProps {
  baseSrc: string;
  width: number;
  height: number;
  alt: string;
  className?: string;
}

const base = process.env.NODE_ENV === 'production' ? '/art_portfolio' : '';

export default function AutoImage({ baseSrc, width, height, alt, className }: AutoImageProps) {
  const [currentSrc, setCurrentSrc] = useState(`${base}${baseSrc}.jpg`);
  const [fallbackIndex, setFallbackIndex] = useState(0);

  // Possible extensions to try
  const extensions = ['.jpg', '.jpeg', '.png', '.PNG', '.JPG', '.JPEG'];

  const handleError = () => {
    if (fallbackIndex < extensions.length - 1) {
      const nextIndex = fallbackIndex + 1;
      setCurrentSrc(`${base}${baseSrc}${extensions[nextIndex]}`);
      setFallbackIndex(nextIndex);
    }
  };

  return (
    <Image
      src={currentSrc}
      width={width}
      height={height}
      alt={alt}
      className={className}
      onError={handleError}
    />
  );
}