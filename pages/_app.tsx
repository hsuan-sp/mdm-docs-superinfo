import 'nextra-theme-docs/style.css'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect, useMemo } from 'react'
import useSWR from 'swr'
import { LanguageProvider } from '../hooks/useLanguage'
import SecurityGuard from '../components/features/SecurityGuard'
import BackToTop from '../components/ui/BackToTop'
import Footer from '../components/layout/Footer'

// Fetcher
const fetcher = (url: string) => fetch(url).then((res) => res.json())

// 嚴格定義公開路徑
const PUBLIC_PATHS = ['/', '/unauthorized', '/changelog', '/api/logto/sign-in', '/api/logto/sign-out', '/404']

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const getLayout = (Component as any).getLayout || ((page: React.ReactNode) => page)

  // 1. 精確判定是否為保護路徑 (排除首頁與白名單)
  const isProtected = useMemo(() => {
    // 如果是首頁 (精確比對)
    if (router.pathname === '/') return false;
    // 如果在白名單內
    if (PUBLIC_PATHS.includes(router.pathname)) return false;
    // 只針對 guide 和 glossary 保護
    return router.pathname.startsWith('/guide') || router.pathname.startsWith('/glossary');
  }, [router.pathname])

  // 2. 只有保護路徑才啟用 SWR 守衛
  const { data, isLoading } = useSWR(isProtected ? '/api/check-auth' : null, fetcher, {
    revalidateOnFocus: false,
    shouldRetryOnError: false
  })

  // 3. 處理跳轉
  useEffect(() => {
    if (!isProtected || isLoading) return;

    if (data && !data.authorized) {
      if (data.reason === 'not_logged_in') {
        window.location.href = '/api/logto/sign-in'
      } else {
        router.replace('/unauthorized')
      }
    }
  }, [isProtected, data, isLoading, router])

  //受保護頁面渲染 Loading，首頁等公開頁面則秒開
  if (isProtected && (isLoading || !data)) {
    return (
      <div className="min-h-screen flex items-center justify-center font-bold text-blue-600 bg-white dark:bg-black">
        🛡️ 安全身分核對中...
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
