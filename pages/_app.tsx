import 'nextra-theme-docs/style.css'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { LanguageProvider } from '../hooks/useLanguage'
import SecurityGuard from '../components/features/SecurityGuard'
import BackToTop from '../components/ui/BackToTop'
import GlobalLoader from '../components/ui/GlobalLoader'
import { ClerkProvider } from '@clerk/nextjs'
import Footer from '../components/layout/Footer'

export default function App({ Component, pageProps }: AppProps) {
  // Use the layout defined at the page level, if available
  const getLayout = (Component as any).getLayout || ((page: React.ReactNode) => page)

  return (
    <ClerkProvider>
      <LanguageProvider>
        <GlobalLoader />
        <SecurityGuard />
        {getLayout(<Component {...pageProps} />)}
        <Footer />
        <BackToTop />
      </LanguageProvider>
    </ClerkProvider>
  )
}
