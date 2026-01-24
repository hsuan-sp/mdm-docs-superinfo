"use client"
import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useLanguage } from '@/hooks/useLanguage'

const SecurityGuard: React.FC = () => {
  const router = useRouter()
  const { language, setLanguage } = useLanguage()

  useEffect(() => {
    // Anti-Copy Protection
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
      console.warn("⚠️ 本站原創內容，未經授權禁止複製或側錄。")
      return false
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      const isForbidden =
        e.keyCode === 123 || // F12
        ((e.ctrlKey || e.metaKey) && e.keyCode === 85) || // Ctrl+U
        ((e.ctrlKey || e.metaKey) && e.keyCode === 83) || // Ctrl+S
        ((e.ctrlKey || e.metaKey) && e.keyCode === 80) || // Ctrl+P
        ((e.ctrlKey || e.metaKey) && e.shiftKey && e.keyCode === 73) || // Ctrl+Shift+I
        ((e.ctrlKey || e.metaKey) && e.shiftKey && e.keyCode === 67) || // Ctrl+Shift+C
        ((e.ctrlKey || e.metaKey) && e.shiftKey && e.keyCode === 74) || // Ctrl+Shift+J
        (e.metaKey && e.altKey && e.keyCode === 73) // Mac Opt+Cmd+I

      if (isForbidden) {
        e.preventDefault()
        console.error("🛡️ 系統已攔截受限操作 (Security Intercepted)")
        return false
      }
    }

    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault()
      const msg = "🔒 本站內容受技術保護，禁止複製或側錄。\n\n如需引用，請聯繫：hsuan@superinfo.com.tw"
      if (e.clipboardData) {
        e.clipboardData.setData("text/plain", msg)
      }
      console.error("🛡️ 複製操作已被攔截")
      return false
    }

    const handleSelectStart = (e: Event) => {
      const target = e.target as HTMLElement
      // Allow selection in input fields
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
        return true
      }
      e.preventDefault()
      return false
    }

    const handleDragStart = (e: DragEvent) => {
      e.preventDefault()
      return false
    }

    // DevTools Detection
    let devtoolsOpen = false
    const detectDevTools = () => {
      const threshold = 160
      const widthThreshold = window.outerWidth - window.innerWidth > threshold
      const heightThreshold = window.outerHeight - window.innerHeight > threshold
      
      if (widthThreshold || heightThreshold) {
        if (!devtoolsOpen) {
          devtoolsOpen = true
          console.clear()
          console.log("%c⚠️ 警告 Warning", "color: red; font-size: 40px; font-weight: bold;")
          console.log("%c請勿在此貼上或執行任何代碼！\nDo not paste or run any code here!", "font-size: 16px;")
          console.log("%c這可能導致您的帳號被盜用。\nThis could compromise your account.", "font-size: 14px; color: orange;")
        }
      } else {
        devtoolsOpen = false
      }
    }

    // Anti-Crawler: Detect headless browsers and bots
    const detectCrawler = () => {
      const userAgent = navigator.userAgent.toLowerCase()
      const isSuspicious = 
        !navigator.webdriver && 
        /headless|phantom|selenium|puppeteer|chromium/i.test(userAgent)

      if (isSuspicious || navigator.webdriver) {
        console.error("🤖 自動化工具已被偵測 (Automation Detected)")
        // Optional: redirect or block access
        // window.location.href = '/'
      }
    }

    // Dynamic Language Detection
    if (typeof window !== "undefined") {
      const userLang = navigator.language || (navigator as any).userLanguage || ""
      const isChinese = userLang.toLowerCase().startsWith("zh")
      const hasRedirected = sessionStorage.getItem("lang-redirect-checked")

      if (!isChinese && language === 'zh-TW' && !hasRedirected) {
        sessionStorage.setItem("lang-redirect-checked", "true")
        setLanguage('en')
      }
    }

    // Apply protections
    document.addEventListener("contextmenu", handleContextMenu)
    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("copy", handleCopy)
    document.addEventListener("selectstart", handleSelectStart as EventListener)
    document.addEventListener("dragstart", handleDragStart)
    
    // DevTools & Crawler detection
    const devToolsInterval = setInterval(detectDevTools, 1000)
    detectCrawler()
    
    // Apply Global Protective Styles
    const styleId = 'security-guard-styles'
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style')
      style.id = styleId
      style.innerHTML = `
        * {
          -webkit-user-select: none !important;
          -moz-user-select: none !important;
          -ms-user-select: none !important;
          user-select: none !important;
        }
        input, textarea {
          -webkit-user-select: text !important;
          -moz-user-select: text !important;
          -ms-user-select: text !important;
          user-select: text !important;
        }
      `
      document.head.appendChild(style)
    }

    // Add geometric pattern watermark (non-intrusive)

    const watermark = document.createElement('div')
    watermark.id = 'geometric-watermark'
    watermark.innerHTML = `
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 0; opacity: 1;">
        <defs>
          <pattern id="hexPattern" x="0" y="0" width="100" height="87" patternUnits="userSpaceOnUse">
            <path d="M50 0 L93.3 25 L93.3 62 L50 87 L6.7 62 L6.7 25 Z" fill="none" stroke="currentColor" stroke-width="0.3" opacity="0.08"/>
            <circle cx="50" cy="43.5" r="1.5" fill="currentColor" opacity="0.04"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexPattern)" class="dark:text-white text-zinc-900" />
      </svg>
    `
    watermark.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;user-select:none;'
    document.body.appendChild(watermark)

    return () => {
      try {
        document.removeEventListener("contextmenu", handleContextMenu)
        document.removeEventListener("keydown", handleKeyDown)
        document.removeEventListener("copy", handleCopy)
        document.removeEventListener("selectstart", handleSelectStart as EventListener)
        document.removeEventListener("dragstart", handleDragStart)
        clearInterval(devToolsInterval)
        const el = document.getElementById('geometric-watermark')
        if (el) el.remove()
        const style = document.getElementById('security-guard-styles')
        if (style) style.remove()
      } catch (e) {}
    }
  }, [language]) // 只依賴語言變化，不依賴 setLanguage 避免潛在的 Provider 重繪循環

  return null
}

export default SecurityGuard
