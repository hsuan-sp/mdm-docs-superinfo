"use client"

import React, { useState, useEffect, Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

// 內部實作邏輯
const LoaderBar = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  // 當路徑或參數改變時，觸發完成動畫
  useEffect(() => {
    // 初始觸發：模擬進度完成
    const handleStart = () => {
      setLoading(true)
      setProgress(30) // 直接跳到 30% 讓使用者有感
    }

    const handleComplete = () => {
      setProgress(100)
      setTimeout(() => {
        setLoading(false)
        setProgress(0)
      }, 400)
    }

    // 在 App Router 中，當 useEffect 執行時，代表新頁面已掛載 (Complete)
    handleComplete()

    // 注意：App Router 目前沒有完美的 "BeforeRouteChange" 鉤子
    // 通常透過攔截 <a> 標籤或搭配特定套件來達成 Start 動畫
  }, [pathname, searchParams])

  if (!loading && progress === 0) return null

  return (
    <div className="fixed top-0 left-0 right-0 z-99999 pointer-events-none">
      <div 
        className="h-0.75 bg-linear-to-r from-apple-blue via-apple-blue/80 to-purple-500 shadow-[0_0_10px_rgba(0,113,227,0.5)] transition-all duration-300 ease-out"
        style={{ 
          width: `${progress}%`, 
          opacity: progress >= 100 ? 0 : 1 
        }}
      />
      {/* 旋轉小圈圈 (選配) */}
      <div className="absolute right-4 top-4">
        <div className={`w-4 h-4 border-2 border-apple-blue/30 border-t-apple-blue rounded-full animate-spin transition-opacity duration-300 ${progress > 0 && progress < 100 ? 'opacity-100' : 'opacity-0'}`} />
      </div>
    </div>
  )
}

// 導出組件並包裝在 Suspense 中 (這是 App Router 必備，否則 useSearchParams 會報錯)
const GlobalLoader: React.FC = () => {
  return (
    <Suspense fallback={null}>
      <LoaderBar />
    </Suspense>
  )
}

export default GlobalLoader