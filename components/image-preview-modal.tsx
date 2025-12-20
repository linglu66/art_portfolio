"use client"

import Image from "next/image"
import { X } from "lucide-react"
import { useEffect } from "react"

interface PortfolioPiece {
  id: string;
  title: string;
  cover: string;
  images: string[];
  description: string;
  category: string;
  hasArrow: boolean;
  aspectRatio: string;
  backgroundColor: string;
  hasDetailPage: boolean;
}

interface ImagePreviewModalProps {
  piece: PortfolioPiece | null;
  isOpen: boolean;
  onClose: () => void;
}

const base = process.env.NODE_ENV === 'production' ? '/art_portfolio' : '';

export default function ImagePreviewModal({
  piece,
  isOpen,
  onClose
}: ImagePreviewModalProps) {

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEsc);
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !piece) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-60 text-white hover:text-gray-300 transition-colors"
      >
        <X size={24} />
      </button>

      {/* Title */}
      <div className="absolute top-4 left-4 z-60 text-white font-normal">
        {piece.title}
      </div>

      {/* Image container - takes up most of the screen */}
      <div className="relative w-[90vw] h-[90vh] flex items-center justify-center">
        <Image
          src={`${base}${piece.cover}`}
          alt={piece.description}
          fill
          className="object-contain"
          sizes="90vw"
          priority
        />
      </div>

      {/* Description at bottom */}
      <div className="absolute bottom-4 left-4 right-4 z-60 text-white text-sm text-center">
        {piece.description}
      </div>
    </div>
  )
}