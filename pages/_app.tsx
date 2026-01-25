import 'nextra-theme-docs/style.css'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect, useState, useMemo } from 'react'
import { LanguageProvider } from '../hooks/useLanguage'
import SecurityGuard from '../components/features/SecurityGuard'
import BackToTop from '../components/ui/BackToTop'
import Footer from '../components/layout/Footer'

// 受保護的路徑開頭
const PROTECTED_PREFIXES = ['/guide', '/glossary']

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const getLayout = (Component as any).getLayout || ((page: React.ReactNode) => page)

  // 1. 精確判斷當前頁面是否需要守護
  const isProtected = useMemo(() => {
    return PROTECTED_PREFIXES.some(prefix => router.pathname.startsWith(prefix))
  }, [router.pathname])

  useEffect(() => {
    // 只有在受保護頁面才發起身分檢查，首頁等公開頁面直接放行
    if (!isProtected) {
      setIsLoading(false)
      return
    }

    async function checkAuth() {
      try {
        const res = await fetch('/api/logto/user')
        if (res.ok) {
          const user = await res.json()
          setIsAuthenticated(!!(user && user.sub))
        } else {
          setIsAuthenticated(false)
        }
      } catch (e) {
        setIsAuthenticated(false)
      } finally {
        setIsLoading(false)
      }
    }
    
    checkAuth()
  }, [isProtected, router.pathname])

  // 2. 授權跳轉邏輯
  useEffect(() => {
    if (!isLoading && isProtected && !isAuthenticated) {
      // 導向 Logto 登入畫面
      window.location.href = '/api/logto/sign-in'
    }
  }, [isLoading, isProtected, isAuthenticated])

  // 3. 渲染守衛畫面：受保護路徑在載入或未授權時，顯示 Loading，防止內容閃爍
  if (isProtected && (isLoading || !isAuthenticated)) {
     return (
       <div className="min-h-screen flex items-center justify-center font-bold text-blue-600 bg-white dark:bg-black">
         🛡️ 安全守衛加載中...
       </div>
     )
  }

  // 4. 公開頁面或已授權頁面，正常渲染
  return (
    <LanguageProvider>
      <SecurityGuard />
      {getLayout(<Component {...pageProps} />)}
      <Footer />
      <BackToTop />
    </LanguageProvider>
  )
}
