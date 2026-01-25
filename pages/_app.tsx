import 'nextra-theme-docs/style.css'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect, useState, useMemo } from 'react'
import { LanguageProvider } from '../hooks/useLanguage'
import SecurityGuard from '../components/features/SecurityGuard'
import BackToTop from '../components/ui/BackToTop'
import Footer from '../components/layout/Footer'
import { isAuthorizedEmail } from '@/lib/auth'

// 定義受保護的路徑 (僅限指南與百科)
const PROTECTED_PREFIXES = ['/guide', '/glossary']

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userEmail, setUserEmail] = useState<string | null>(null)
  
  const getLayout = (Component as any).getLayout || ((page: React.ReactNode) => page)

  // 1. 精確過濾：只有進入受保護路徑才發起身分辨識
  const isProtected = useMemo(() => {
    // 首頁、公開頁面一律放行
    if (router.pathname === '/' || router.pathname === '/unauthorized' || router.pathname === '/changelog') return false;
    return PROTECTED_PREFIXES.some(prefix => router.pathname.startsWith(prefix));
  }, [router.pathname])

  useEffect(() => {
    // 首頁秒開，不發起任何請求
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
          setUserEmail(user.primaryEmail || user.email || null)
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
    if (!isLoading && isProtected) {
      if (!isAuthenticated) {
        // 未登入，導向登入頁面
        window.location.href = '/api/logto/sign-in'
      } else if (!isAuthorizedEmail(userEmail)) {
        // 已登入但網域不對
        router.replace('/unauthorized')
      }
    }
  }, [isLoading, isProtected, isAuthenticated, userEmail, router])

  // 3. 守衛渲染
  if (isProtected && (isLoading || !isAuthenticated || !isAuthorizedEmail(userEmail))) {
     return (
       <div className="min-h-screen flex items-center justify-center font-black text-blue-600 bg-white dark:bg-black">
         🛡️ 安全守衛正在核對您的身分...
       </div>
     )
  }

  return (
    <LanguageProvider>
      <SecurityGuard />
      {getLayout(<Component {...pageProps} />)}
      <Footer />
      <BackToTop />
    </LanguageProvider>
  )
}
