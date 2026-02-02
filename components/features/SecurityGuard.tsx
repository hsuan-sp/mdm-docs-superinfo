"use client"

import React, { useEffect, useState } from 'react'
// ✅ 在 App Router 下，必須改用 next/navigation
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/hooks/useLanguage'

const SecurityGuard: React.FC = () => {
  const router = useRouter()
  const { language, setLanguage } = useLanguage()
  const [isMounted, setIsMounted] = useState(false)

  // 1. 處理掛載狀態，防止 Hydration 錯誤
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // 2. 語系自動導向 (僅限 Session 首次啟動)
  useEffect(() => {
    if (typeof window === "undefined" || !isMounted) return

    const checkLanguageRedirect = () => {
      const userLang = navigator.language || ""
      const isChinese = userLang.toLowerCase().startsWith("zh")
      const hasRedirected = sessionStorage.getItem("lang-redirect-checked")

      if (!isChinese && language === 'zh-TW' && !hasRedirected) {
        sessionStorage.setItem("lang-redirect-checked", "true")
        setLanguage('en')
        console.log("🌐 Auto-switched language to English based on browser settings.")
      }
    }

    checkLanguageRedirect()
  }, [language, setLanguage, isMounted])

  // 3. 安全事件監聽 (右鍵、快捷鍵、複製、拖曳)
  useEffect(() => {
    if (!isMounted) return

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      // ✅ 使用 e.key 取代 e.keyCode (更好的跨平台支援)
      const ctrlOrMeta = e.ctrlKey || e.metaKey
      
      const isForbidden =
        e.key === 'F12' ||
        (ctrlOrMeta && e.key === 'u') || // 查看原始碼
        (ctrlOrMeta && e.key === 's') || // 儲存網頁
        (ctrlOrMeta && e.key === 'p') || // 列印
        (ctrlOrMeta && e.shiftKey && (e.key === 'I' || e.key === 'C' || e.key === 'J')) || // 開發者工具
        (e.metaKey && e.altKey && e.key === 'i') // Mac DevTools

      if (isForbidden) {
        e.preventDefault()
        e.stopPropagation()
      }
    }

    const handleCopy = (e: ClipboardEvent) => {
      const msg = "🔒 本站內容受技術保護，禁止複製或側錄。\n\n如需引用，請聯繫：hsuan@superinfo.com.tw"
      e.clipboardData?.setData("text/plain", msg)
      e.preventDefault()
    }

    const handleDragStart = (e: DragEvent) => {
      e.preventDefault()
    }

    document.addEventListener("contextmenu", handleContextMenu)
    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("copy", handleCopy)
    document.addEventListener("dragstart", handleDragStart)

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu)
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("copy", handleCopy)
      document.removeEventListener("dragstart", handleDragStart)
    }
  }, [isMounted])

  // 4. 開發者工具與自動化偵測
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' || !isMounted) return

    let devtoolsOpen = false
    const detectDevTools = () => {
      const threshold = 160
      const isDevToolsOpen = 
        window.outerWidth - window.innerWidth > threshold || 
        window.outerHeight - window.innerHeight > threshold
      
      if (isDevToolsOpen) {
        if (!devtoolsOpen) {
          devtoolsOpen = true
          console.clear()
          console.log("%c⚠️ 警告 Warning", "color: red; font-size: 40px; font-weight: bold;")
          console.log("%c請勿在此執行任何指令！", "font-size: 16px;")
        }
      } else {
        devtoolsOpen = false
      }
    }

    const intervalId = setInterval(detectDevTools, 2000)
    return () => clearInterval(intervalId)
  }, [isMounted])

  // 5. 注入全局 CSS (禁止選擇與列印保護)
  useEffect(() => {
    if (!isMounted) return

    const styleId = 'security-guard-styles'
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style')
      style.id = styleId
      style.innerHTML = `
        body {
          -webkit-user-select: none !important;
          user-select: none !important;
        }
        input, textarea, [contenteditable="true"] {
          -webkit-user-select: text !important;
          user-select: text !important;
        }
        @media print {
          body { display: none !important; }
        }
      `
      document.head.appendChild(style)
    }
  }, [isMounted])

  if (!isMounted) return null

  return null
}

export default SecurityGuard