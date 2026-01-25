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

// 定義高效率 Fetcher
const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const getLayout = (Component as any).getLayout || ((page: React.ReactNode) => page)

  // 1. 定義受保護的路由 (依照方案建議)
  const protectedPaths = ['/guide', '/glossary']
  const isProtected = protectedPaths.some((path) => router.pathname.startsWith(path))

  // 2. 呼叫整合判定 API
  const { data, error, isLoading } = useSWR(isProtected ? '/api/check-auth' : null, fetcher, {
    revalidateOnFocus: false,
    shouldRetryOnError: false
  })

  // 3. 處理跳轉邏輯
  useEffect(() => {
    if (isProtected && data && !data.authorized) {
      if (data.reason === 'not_logged_in') {
        // 重導向至 Logto 登入，並在成功後跳回當前頁面
        window.location.href = `/api/logto/sign-in?callbackUrl=${encodeURIComponent(window.location.href)}`
      } else {
        // 登入但網域不符
        router.replace('/unauthorized')
      }
    }
  }, [isProtected, data, router])

  // 渲染內容：如果是受保護路由且還在載入身分，顯示 Loading 以免洩漏 HTML
  if (isProtected && (isLoading || !data)) {
    return (
      <div className="min-h-screen flex items-center justify-center font-black text-blue-600 bg-white dark:bg-black">
        🛡️ 檢查權限中...
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
