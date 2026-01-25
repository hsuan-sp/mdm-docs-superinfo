import 'nextra-theme-docs/style.css'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import useSWR from 'swr'
import { LanguageProvider } from '../hooks/useLanguage'
import SecurityGuard from '../components/features/SecurityGuard'
import BackToTop from '../components/ui/BackToTop'
import Footer from '../components/layout/Footer'

// Fetcher
const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const getLayout = (Component as any).getLayout || ((page: React.ReactNode) => page)

  // 1. 定義受保護的路由 (僅限 guide 與 glossary)
  const protectedPaths = ['/guide', '/glossary']
  const isProtected = protectedPaths.some((path) => router.pathname.startsWith(path))

  // 2. 呼叫權限判定 API
  const { data, isLoading } = useSWR(isProtected ? '/api/check-auth' : null, fetcher, {
    revalidateOnFocus: false,
    shouldRetryOnError: false
  })

  // 3. 全域授權守衛
  useEffect(() => {
    if (isProtected && data && !data.authorized) {
      if (data.reason === 'not_logged_in') {
        // 標準跳轉至登入頁面
        window.location.href = '/api/logto/sign-in'
      } else {
        // 已登入但網域非教育網域
        router.replace('/unauthorized')
      }
    }
  }, [isProtected, data, router])

  //受保護頁面在載入完成前，顯示 Loading 畫面，確保內容不洩漏
  if (isProtected && (isLoading || !data)) {
    return (
      <div className="min-h-screen flex items-center justify-center font-black text-blue-600 bg-white dark:bg-black">
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
