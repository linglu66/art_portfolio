"use client"

import { ReactNode, useEffect, useRef } from 'react'

interface MasonryGridProps {
  children: ReactNode[]
  gap?: number
}

export default function MasonryGrid({ children, gap = 16 }: MasonryGridProps) {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const grid = gridRef.current
    if (!grid) return

    const resizeGridItem = (item: HTMLElement) => {
      const rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'))
      const rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'))
      const rowSpan = Math.ceil((item.querySelector('.grid-item-content')?.scrollHeight! + rowGap) / (rowHeight + rowGap))
      item.style.gridRowEnd = `span ${rowSpan}`
    }

    const resizeAllGridItems = () => {
      const allItems = grid.querySelectorAll('.grid-item') as NodeListOf<HTMLElement>
      allItems.forEach(resizeGridItem)
    }

    const resizeObserver = new ResizeObserver(() => {
      resizeAllGridItems()
    })

    // Observe the grid container
    resizeObserver.observe(grid)

    // Initial resize
    setTimeout(resizeAllGridItems, 100)

    return () => {
      resizeObserver.disconnect()
    }
  }, [children])

  return (
    <div
      ref={gridRef}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-[10px] gap-4"
      style={{ gridAutoRows: '10px' }}
    >
      {children.map((child, index) => (
        <div key={index} className="grid-item">
          <div className="grid-item-content">
            {child}
          </div>
        </div>
      ))}
    </div>
  )
}