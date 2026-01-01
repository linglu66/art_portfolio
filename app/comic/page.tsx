"use client"

import Image from "next/image"
import { ArrowRight } from "lucide-react"
import portfolioData from "@/content/portfolio.yaml"
import Link from "next/link"
import ImagePreviewModal from "@/components/image-preview-modal"
import { useState } from "react"

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

const base = process.env.NODE_ENV === 'production' ? '/art_portfolio' : '';

export default function ComicPage() {
  const [selectedPiece, setSelectedPiece] = useState<PortfolioPiece | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handlePieceClick = (piece: PortfolioPiece) => {
    setSelectedPiece(piece)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedPiece(null)
  }

  // Filter for comic works
  const comicPieces = portfolioData.pieces.filter((piece: PortfolioPiece) =>
    piece.title.toLowerCase().includes('comic') ||
    piece.title.toLowerCase().includes('crossed') ||
    piece.title.toLowerCase().includes('featherweight') ||
    piece.id.includes('comic')
  )

  return (
    <div>
      <div className="p-4 columns-1 md:columns-2 lg:columns-3 gap-4">
        {comicPieces.map((piece: PortfolioPiece) => (
          piece.hasDetailPage ? (
            <Link key={piece.id} href={`/piece/${piece.id}`} className="border border-gray-200 rounded-md p-2 relative inline-block w-full mb-4 break-inside-avoid hover:border-gray-300 hover:shadow-md transition-all duration-200 hover:-translate-y-1">
              <div className="grid grid-cols-2 gap-2">
                <div className="col-span-2">
                    <Image
                      src={`${base}${piece.cover}`}
                      width={300}
                      height={200}
                      alt={piece.description}
                      className={`w-full h-auto bg-${piece.backgroundColor} rounded-md`}
                    />
                </div>
              </div>
              <div className="mt-2 flex justify-between items-center">
                <div>{piece.title}</div>
                {piece.hasArrow && <ArrowRight size={18} />}
              </div>
            </Link>
          ) : (
            <div
              key={piece.id}
              className="border border-gray-200 rounded-md p-2 relative inline-block w-full mb-4 break-inside-avoid cursor-pointer hover:border-gray-300 hover:shadow-md transition-all duration-200 hover:-translate-y-1"
              onClick={() => handlePieceClick(piece)}
            >
              <div className="grid grid-cols-2 gap-2">
                <div className="col-span-2">
                    <Image
                      src={`${base}${piece.cover}`}
                      width={300}
                      height={200}
                      alt={piece.description}
                      className={`w-full h-auto bg-${piece.backgroundColor} rounded-md`}
                    />
                </div>
              </div>
              <div className="mt-2 flex justify-between items-center">
                <div>{piece.title}</div>
                {piece.hasArrow && <ArrowRight size={18} />}
              </div>
            </div>
          )
        ))}
      </div>

      <ImagePreviewModal
        piece={selectedPiece}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  )
}