"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import portfolioData from "@/content/portfolio.yaml"

interface Piece {
  title: string
  cover: string
}

const pieces: Piece[] = portfolioData.pieces

const SEGMENTS = 12
const TICK_MS = 220
// progress counts past 100 so each finished piece lingers before the swap
const HOLD_OVERSHOOT = 45

export default function ArtLoader() {
  const [index, setIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100 + HOLD_OVERSHOOT) {
          setIndex((i) => (i + 1) % pieces.length)
          return 0
        }
        // lurch forward in uneven chunks like a real old installer
        return p + 3 + Math.floor(Math.random() * 12)
      })
    }, TICK_MS)
    return () => clearInterval(timer)
  }, [])

  const piece = pieces[index]
  const shown = Math.min(progress, 100)
  const filled = Math.floor((shown / 100) * SEGMENTS)
  const filename = piece.cover.split("/").pop()

  return (
    <>
      {/* Pane chrome: filename + loading bar */}
      <div className="px-3 py-1 border-b border-gray-300 text-xs text-gray-500 flex items-center gap-2">
        <span className="flex-1 truncate">{filename}</span>
        <div className="w-24 h-3 border border-gray-500 bg-white shrink-0 flex gap-[1px] p-[1px]">
          {Array.from({ length: SEGMENTS }, (_, i) => (
            <div key={i} className={`flex-1 ${i < filled ? "bg-gray-600" : ""}`} />
          ))}
        </div>
        <span className="w-9 text-right shrink-0">{shown}%</span>
      </div>

      {/* Artwork */}
      <div className="flex-1 relative min-h-[260px] m-5">
        <Image
          key={piece.cover}
          src={piece.cover}
          alt={piece.title}
          fill
          className="object-contain"
        />
      </div>
    </>
  )
}
