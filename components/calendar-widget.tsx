"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"

export default function CalendarWidget() {
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState({ x: 199, y: 409 })
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

  const upcomingEvents = [
    { date: "May 10-11", event: "Brooklyn Indie Comics Fair", location: "Industry City, Brooklyn" },
    { date: "May 17-18", event: "Toronto Comic Arts Festival", location: "Toronto" },
  ]

  const currentDate = new Date()
  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

  return (
    <div
      className="fixed z-40 bg-white border border-gray-400 select-none"
      style={{
        left: position.x,
        top: position.y,
        width: '280px',
        fontFamily: 'system-ui, -apple-system',
        fontSize: '12px',
        filter: 'drop-shadow(6px 6px 0px rgba(0,0,0,0.3))',
        boxShadow: '6px 6px 0px rgba(0,0,0,0.2), 3px 3px 0px rgba(0,0,0,0.1), 1px 1px 0px rgba(0,0,0,0.05)'
      }}
    >
      {/* Calendar title bar */}
      <div
        className="bg-black text-white px-2 py-1 flex justify-between items-center cursor-move"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-gray-300 border border-gray-500"></div>
          <span className="font-bold text-xs">Calendar</span>
        </div>
        <button className="w-3 h-3 bg-gray-300 border border-gray-500 flex items-center justify-center hover:bg-gray-400">
          <X size={8} />
        </button>
      </div>

      {/* Calendar header */}
      <div className="bg-gray-100 px-3 py-2 border-b border-gray-300">
        <div className="text-center font-semibold text-gray-800">{monthName}</div>
      </div>

      {/* Calendar content */}
      <div className="p-3 bg-white">
        <div className="mb-3">
          <h3 className="text-xs font-semibold text-gray-700 mb-2">Coming up</h3>
          <div className="space-y-2">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="text-xs">
                <div className="font-medium text-gray-800">{event.date}</div>
                <div className="text-gray-600">{event.event}</div>
                <div className="text-gray-500 text-xs">{event.location}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Mini calendar grid */}
        <div className="border-t border-gray-200 pt-3">
          <div className="grid grid-cols-7 gap-1 text-center text-xs">
            {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
              <div key={day} className="text-gray-500 font-medium p-1">{day}</div>
            ))}
            {Array.from({ length: 35 }, (_, i) => {
              // March 2026 starts on a Sunday (day 0), so no offset needed
              const dayNum = i + 1
              const isCurrentMonth = dayNum >= 1 && dayNum <= 31
              const isToday = dayNum === currentDate.getDate() && isCurrentMonth

              return (
                <div
                  key={i}
                  className={`p-1 text-xs ${
                    isCurrentMonth
                      ? isToday
                        ? 'bg-black text-white rounded'
                        : 'text-gray-800 hover:bg-gray-100'
                      : 'text-gray-300'
                  }`}
                >
                  {isCurrentMonth ? dayNum : ''}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}