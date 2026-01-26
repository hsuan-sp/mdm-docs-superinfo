"use client"

import React, { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'

const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // 滾動超過 400px 就顯示，比百分比更直覺且一致
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      setVisible(scrollTop > 400)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-6 md:right-10 w-12 h-12 md:w-14 md:h-14 rounded-full bg-apple-blue text-white shadow-2xl shadow-apple-blue/30 flex items-center justify-center z-150 transition-all duration-500 transform ${
        visible 
          ? 'translate-y-0 opacity-100 scale-100' 
          : 'translate-y-16 opacity-0 scale-75 pointer-events-none'
      } hover:scale-110 active:scale-95 group`}
      aria-label="Back to Top"
    >
      {/* 呼吸波紋動畫 */}
      <div className="absolute inset-0 rounded-full bg-apple-blue/40 animate-ping opacity-25 group-hover:hidden" />
      
      {/* 內圈裝飾 */}
      <div className="absolute inset-1 rounded-full border border-white/20 pointer-events-none" />
      
      <ArrowUp className="w-5 h-5 md:w-6 md:h-6 group-hover:-translate-y-1.5 transition-transform duration-300" />
    </button>
  )
}

export default BackToTop