"use client"
import React, { useEffect, PropsWithChildren } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { useUser } from '@/hooks/useLogtoUser'
import { isAuthorizedEmail } from '@/lib/auth'
import { ShieldCheck, AlertCircle } from 'lucide-react'

// 1. 定義需要保護的路由，其餘路由（包含 404）皆視為公開
const PROTECTED_ROUTES = ['/guide', '/glossary']

const AuthGuard = ({ children }: PropsWithChildren) => {
  const router = useRouter()
  const pathname = usePathname() 
  const { user, isLoading, isAuthenticated } = useUser()
  
  // 檢查當前路徑是否屬於受保護範圍
  const isProtected = PROTECTED_ROUTES.some(route => 
    pathname === route || pathname.startsWith(`${route}/`)
  )

  useEffect(() => {
    // 🔍 偵測是否在 GitHub Pages 環境
    const isGitHubPages = typeof window !== 'undefined' && window.location.hostname.includes('github.io');
    if (isGitHubPages) return; // 靜態預覽模式不執行任何跳轉邏輯

    // 2. 處理「未登入」：如果是受保護路由且未登入，則跳轉至登入
    if (!isLoading && isProtected && !isAuthenticated) {
      console.log("[Guard] 受保護路由且未登入，執行 Logto 跳轉");
      window.location.href = `/api/logto/sign-in?redirect=${encodeURIComponent(pathname)}`;
      return;
    }

    // 3. 處理「授權失敗」：郵件不符合白名單
    if (!isLoading && isProtected && isAuthenticated && user?.email) {
      if (!isAuthorizedEmail(user.email)) {
        console.warn("[Guard] 郵件未獲授權，重定向至 unauthorized");
        router.replace('/unauthorized');
      }
    }
  }, [isLoading, isAuthenticated, user, isProtected, pathname, router])

  // --- 渲染邏輯 ---

  // 非保護路由或已通過驗證：直接渲染
  if (!isProtected || (isAuthenticated && user?.email && isAuthorizedEmail(user.email))) {
    return <>{children}</>
  }

  // 載入中或是正在跳轉的過渡狀態：顯示 Loading
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-black">
      <div className="relative">
        <div className="absolute inset-0 w-16 h-16 bg-blue-500/20 rounded-full blur-xl animate-pulse" />
        <ShieldCheck className="relative w-12 h-12 text-blue-600 animate-bounce mb-4" />
      </div>
      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 animate-pulse">
        {isAuthenticated ? "Verifying Authority" : "Redirecting to Security Login"}
      </p>
    </div>
  )
}

export default AuthGuard