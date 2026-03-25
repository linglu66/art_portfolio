"use client"

import { useState, useEffect } from "react"

export default function StickyNoteWidget() {
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState({ x: 548, y: 358 })
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })

  const handleMouseDown = (e: React.MouseEvent) => {
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

  const currentlyList = [
    "physical computing",
    "blender tutorials",
    "risograph printing",
    "walking around greenpoint",
    "making fish happy"
  ]

  return (
    <div
      className="fixed z-40 bg-gray-100 border border-gray-400 select-none transform rotate-1"
      style={{
        left: position.x,
        top: position.y,
        width: '200px',
        fontFamily: 'system-ui, -apple-system',
        fontSize: '13px',
        filter: 'drop-shadow(5px 5px 0px rgba(0,0,0,0.3))',
        boxShadow: '5px 5px 0px rgba(0,0,0,0.2), 2px 2px 0px rgba(0,0,0,0.1), 1px 1px 0px rgba(0,0,0,0.05)'
      }}
    >
      {/* Note header */}
      <div
        className="bg-gray-200 px-3 py-1 cursor-move flex items-center justify-between border-b border-gray-300"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center">
          <div className="w-2 h-2 bg-black rounded-full mr-2"></div>
          <span className="font-medium text-black">currently</span>
        </div>
        <span className="text-xs text-gray-600">mar 18</span>
      </div>

      {/* Note content */}
      <div className="p-3 bg-gray-100">
        <ul className="space-y-1">
          {currentlyList.map((item, index) => (
            <li key={index} className="text-gray-800 text-sm">
              • {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}