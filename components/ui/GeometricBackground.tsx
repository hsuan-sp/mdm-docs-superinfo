"use client"

import React, { useMemo, useEffect, useState } from 'react'

interface Shape {
  id: number
  type: 'circle' | 'rect' | 'triangle'
  x: number
  y: number
  size: number
  rotate: number
  color: string
  opacity: number
}

const GeometricBackground: React.FC = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const shapes = useMemo(() => {
    const COLORS = [
      'rgba(0, 113, 227, 0.08)', // Apple Blue
      'rgba(94, 92, 230, 0.08)',  // Apple Indigo
      'rgba(175, 82, 222, 0.08)', // Apple Purple
      'rgba(255, 59, 48, 0.05)',  // Apple Red
      'rgba(88, 86, 214, 0.06)'   // Apple Violet
    ]
    
    return Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      type: ['circle', 'rect', 'triangle'][Math.floor(Math.random() * 3)] as Shape['type'],
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 150 + Math.random() * 400,
      rotate: Math.random() * 360,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      opacity: 0.3 + Math.random() * 0.5
    }))
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none select-none bg-white dark:bg-black transition-colors duration-700">
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-white/50 to-white dark:via-black/50 dark:to-black" />
      <svg className="w-full h-full opacity-60 dark:opacity-40" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
        <defs>
          <filter id="blur-shape">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" />
          </filter>
        </defs>
        {shapes.map((shape) => {
          const style = {
            fill: shape.color,
            transformOrigin: 'center',
            transform: `translate(${shape.x}px, ${shape.y}px) rotate(${shape.rotate}deg)`,
            filter: 'url(#blur-shape)',
          }

          if (shape.type === 'circle') {
            return (
              <circle
                key={shape.id}
                cx="0"
                cy="0"
                r={shape.size / 20}
                style={style}
              />
            )
          }

          if (shape.type === 'rect') {
            return (
              <rect
                key={shape.id}
                x={-shape.size / 40}
                y={-shape.size / 40}
                width={shape.size / 20}
                height={shape.size / 20}
                rx="10"
                style={style}
              />
            )
          }

          return (
            <path
              key={shape.id}
              d={`M 0 ${-shape.size / 30} L ${shape.size / 30} ${shape.size / 30} L ${-shape.size / 30} ${shape.size / 30} Z`}
              style={style}
            />
          )
        })}
      </svg>
      
      {/* Mesh Gradient Effect for extra premium feel */}
      <div className="absolute inset-0 opacity-30 dark:opacity-20 animate-pulse duration-10000">
          <div className="absolute top-[10%] left-[20%] w-[40%] h-[40%] bg-blue-400/20 blur-[120px] rounded-full" />
          <div className="absolute bottom-[20%] right-[10%] w-[50%] h-[50%] bg-purple-400/20 blur-[150px] rounded-full" />
      </div>
    </div>
  )
}

export default GeometricBackground
