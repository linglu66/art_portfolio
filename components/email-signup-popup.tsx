"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import EmailSignupForm from "@/components/email-signup-form"

export default function EmailSignupModule() {
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [isClosed, setIsClosed] = useState(false)

  // Center on first render; can't do this at useState time since window
  // doesn't exist during static export prerendering
  useEffect(() => {
    setPosition({
      x: Math.max(8, window.innerWidth / 2 - 200),
      y: Math.max(8, window.innerHeight / 2 - 140),
    })
  }, [])

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!position) return
    setIsDragging(true)
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y
    })
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y
        })
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
    }

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, dragOffset])

  if (isClosed || !position) return null

  return (
    <div
      className="fixed z-50 bg-gray-100 border border-gray-400 select-none max-w-[calc(100vw-16px)]"
      style={{
        left: position.x,
        top: position.y,
        width: '400px',
        fontFamily: 'system-ui, -apple-system',
        fontSize: '12px',
        filter: 'drop-shadow(8px 8px 0px rgba(0,0,0,0.3))',
        boxShadow: '8px 8px 0px rgba(0,0,0,0.2), 4px 4px 0px rgba(0,0,0,0.1), 2px 2px 0px rgba(0,0,0,0.05)'
      }}
    >
      {/* Title bar */}
      <div
        className="bg-black text-white px-2 py-1 flex justify-between items-center cursor-move"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-300 border border-gray-500"></div>
          <span className="font-bold">fishlooker.exe</span>
        </div>
        <button
          onClick={() => setIsClosed(true)}
          className="w-4 h-4 bg-gray-300 border border-gray-500 flex items-center justify-center hover:bg-gray-400 text-black"
        >
          <X size={10} />
        </button>
      </div>

      {/* Dialog content */}
      <div className="p-4 bg-gray-100">
        <div className="flex items-start gap-3">
          {/* Icon */}
          <div className="w-8 h-8 bg-black flex items-center justify-center text-white font-bold text-xs mt-1">
            !
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="font-bold mb-3">
              fishlooker.exe would like to send you notifications
            </div>

            <div className="text-gray-700 mb-4 leading-relaxed">
              Frequency: occasional<br />
              Content: projects, prints, kits
            </div>

            <EmailSignupForm />
          </div>
        </div>
      </div>
    </div>
  )
}
