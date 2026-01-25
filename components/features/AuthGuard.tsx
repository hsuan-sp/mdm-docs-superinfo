"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useUser } from '@/hooks/useLogtoUser'
import { isAuthorizedEmail } from '@/lib/auth'
import AuthGate from '../ui/AuthGate'
import { ShieldCheck } from 'lucide-react'

interface AuthGuardProps {
  children: React.ReactNode
}

const PUBLIC_ROUTES = ['/', '/404', '/unauthorized', '/api', '/_error', '/changelog']

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const router = useRouter()
  const { user, isLoading, isSignedIn } = useUser()
  const [isAuthorized, setIsAuthorized] = useState(false)

  // 檢查是否為公開路由 (確保首頁徹底放行)
  const isPublicRoute = PUBLIC_ROUTES.some(path => 
    router.pathname === path || router.pathname.startsWith('/api') || router.asPath === '/'
  )

  useEffect(() => {
    if (isLoading) return

    // 如果是公開路由，直接放行
    if (isPublicRoute) {
      setIsAuthorized(true)
      return
    }

    // 如果未登入，顯示 AuthGate (由下方渲染邏輯處理)
    if (!user) {
      setIsAuthorized(false)
      return
    }

    // 嚴格 Email 白名單檢查 (與 Hook 及 API 對齊)
    const email = user.primaryEmail || (user as any).email || user.username || ''

    if (isAuthorizedEmail(email)) {
      setIsAuthorized(true)
    } else {
      setIsAuthorized(false)
      if (router.pathname !== '/unauthorized') {
        console.warn('Unauthorized domain detected via Global Guard:', email)
        router.replace('/unauthorized')
      }
    }
  }, [isLoading, user, isPublicRoute, router.pathname])

  // 1. 公開路由：優先不檢查身分，實現秒開 (Bypass loading for public routes)
  if (isPublicRoute) {
    return <>{children}</>
  }

  // 2. 載入中：對受保護頁面顯示品牌加載畫面
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-black">
        <div className="relative flex items-center justify-center mb-8">
          <div className="absolute inset-0 w-16 h-16 bg-blue-500/20 rounded-full blur-xl animate-pulse" />
          <div className="relative w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-500/40">
            <ShieldCheck className="w-7 h-7 text-white animate-bounce" style={{ animationDuration: '2s' }} />
          </div>
        </div>
        <p className="text-zinc-400 font-bold text-xs uppercase tracking-[0.3em] animate-pulse">
          Secure Authenticating
        </p>
      </div>
    )
  }

  // 3. 受保護路由 & 未登入：顯示 AuthGate
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <AuthGate />
      </div>
    )
  }

  // 4. 受保護路由 & 已登入 & 已授權：渲染內容
  if (isAuthorized) {
    return <>{children}</>
  }

  // 5. 受保護路由 & 已登入 & 未授權 (跳轉中)：不渲染內容
  return null
}

export default AuthGuard
