import 'nextra-theme-docs/style.css'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { LanguageProvider } from '../hooks/useLanguage'
import SecurityGuard from '../components/features/SecurityGuard'
import BackToTop from '../components/ui/BackToTop'
import Footer from '../components/layout/Footer'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const getLayout = (Component as any).getLayout || ((page: React.ReactNode) => page)

  // 1. 定義哪些頁面需要登入
  const isProtectedPath = router.pathname.startsWith('/guide') || router.pathname.startsWith('/glossary')

  useEffect(() => {
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
  }, [router.pathname])

  // 2. 如果是保護路徑且未登入，強制導向登入
  useEffect(() => {
    if (!isLoading && isProtectedPath && !isAuthenticated) {
      window.location.href = '/api/logto/sign-in'
    }
  }, [isLoading, isProtectedPath, isAuthenticated])

  // 3. 過濾渲染
  if (isProtectedPath && (isLoading || !isAuthenticated)) {
     return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🔒 安全載入中...</div>
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
