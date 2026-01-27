"use client"

import React, { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'

/**
 * Apple-style Geometric Background
 * Inspired by Apple's design language with soft, subtle gradients
 */
const GeometricBackground: React.FC = () => {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const isDark = resolvedTheme === 'dark'

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none select-none">
      {/* Base gradient background */}
      <div 
        className="absolute inset-0 transition-colors duration-700"
        style={{
          background: isDark
            ? 'linear-gradient(180deg, #000000 0%, #0a0a0a 100%)'
            : 'linear-gradient(180deg, #ffffff 0%, #f5f5f7 100%)'
        }}
      />

      {/* Subtle mesh gradients - Apple style */}
      <div className="absolute inset-0 opacity-40">
        {/* Top-left gradient blob */}
        <div
          className="absolute top-0 left-0 w-200 h-200 rounded-full blur-3xl transition-all duration-1000"
          style={{
            background: isDark
              ? 'radial-gradient(circle, rgba(0, 113, 227, 0.15) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(0, 113, 227, 0.08) 0%, transparent 70%)',
            transform: 'translate(-30%, -30%)',
          }}
        />

        {/* Bottom-right gradient blob */}
        <div
          className="absolute bottom-0 right-0 w-225 h-225 rounded-full blur-3xl transition-all duration-1000"
          style={{
            background: isDark
              ? 'radial-gradient(circle, rgba(147, 51, 234, 0.12) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(147, 51, 234, 0.06) 0%, transparent 70%)',
            transform: 'translate(30%, 30%)',
          }}
        />

        {/* Center accent blob */}
        <div
          className="absolute top-1/2 left-1/2 w-150 h-150 rounded-full blur-3xl transition-all duration-1000"
          style={{
            background: isDark
              ? 'radial-gradient(circle, rgba(94, 92, 230, 0.08) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(94, 92, 230, 0.04) 0%, transparent 70%)',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </div>

      {/* Subtle geometric grid pattern */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: isDark
            ? 'radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.05) 1px, transparent 0)'
            : 'radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.02) 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Floating orbs with subtle animation */}
      <div className="absolute inset-0">
        {[
          { top: '10%', left: '20%', size: 300, delay: 0, color: isDark ? 'rgba(0, 113, 227, 0.06)' : 'rgba(0, 113, 227, 0.03)' },
          { top: '60%', left: '70%', size: 400, delay: 2, color: isDark ? 'rgba(175, 82, 222, 0.05)' : 'rgba(175, 82, 222, 0.025)' },
          { top: '30%', left: '80%', size: 250, delay: 4, color: isDark ? 'rgba(94, 92, 230, 0.06)' : 'rgba(94, 92, 230, 0.03)' },
        ].map((orb, index) => (
          <div
            key={index}
            className="absolute rounded-full blur-3xl transition-all duration-1000"
            style={{
              top: orb.top,
              left: orb.left,
              width: `${orb.size}px`,
              height: `${orb.size}px`,
              background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
              animation: `float ${10 + index * 2}s ease-in-out infinite ${orb.delay}s`,
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}
      </div>

      {/* Noise texture overlay for depth */}
      <div 
        className="absolute inset-0 opacity-10 mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
        }}
      />

      {/* CSS animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translate(-50%, -50%) translateY(0px);
          }
          50% {
            transform: translate(-50%, -50%) translateY(-20px);
          }
        }
      `}</style>
    </div>
  )
}

export default GeometricBackground
