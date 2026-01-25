"use client"
import React, { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'

const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrollPercentage = (scrollTop / scrollHeight) * 100
      setVisible(scrollPercentage > 20)
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
      className={`fixed bottom-8 right-8 w-14 h-14 rounded-full bg-blue-600 text-white shadow-2xl shadow-blue-500/40 flex items-center justify-center z-[100] transition-all duration-500 transform ${
        visible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-90 pointer-events-none'
      } hover:scale-110 active:scale-95 group`}
      aria-label="Back to Top"
    >
      <div className="absolute inset-0 rounded-full bg-blue-600 animate-ping opacity-20 group-hover:hidden" />
      <ArrowUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
    </button>
  )
}

export default BackToTop
