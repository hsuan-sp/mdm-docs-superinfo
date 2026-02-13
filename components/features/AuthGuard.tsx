"use client";
import React, { useEffect, PropsWithChildren } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@/hooks/useLogtoUser";
import { ShieldCheck } from "lucide-react";
import GeometricBackground from "@/components/ui/GeometricBackground";

// 1. 定義需要保護的路由
const PROTECTED_ROUTES = ["/guide", "/glossary"];

const AuthGuard = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const pathname = usePathname();
  const {
    user,
    isLoading,
    isAuthenticated,
    isAuthorized,
    isLogtoAuthenticated,
    signIn,
  } = useUser();

  // 檢查當前路徑是否屬於受保護範圍
  const isProtected = PROTECTED_ROUTES.some((route) => {
    const regex = new RegExp(`^(\/(zh|en))?${route}(\/|$)`);
    return regex.test(pathname);
  });

  useEffect(() => {
    // 狀況 1：完全未登入 -> 去登入頁
    if (!isLoading && isProtected && !isLogtoAuthenticated) {
      console.log("[Guard] Unauthenticated entry, redirecting...");
      signIn(pathname);
      return;
    }

    // 狀況 2：有登入有資訊但沒權限 (Unauthorized) -> 去錯誤頁
    if (!isLoading && isProtected && isAuthenticated && !isAuthorized) {
      console.warn("[Guard] Unauthorized access. Redirecting...");
      router.replace("/unauthorized");
    }
  }, [
    isLoading,
    isLogtoAuthenticated,
    isAuthenticated,
    isAuthorized,
    isProtected,
    pathname,
    router,
    signIn,
  ]);

  // --- 渲染邏輯 ---

  // 通過授權或非保護路由：直接顯示
  if (!isProtected || isAuthorized) {
    return <>{children}</>;
  }

  // 否則顯示載入動畫 (等待重定向)
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-apple-bg">
      <GeometricBackground />
      <div className="relative z-10 flex flex-col items-center">
        <div className="relative">
          <div className="absolute inset-0 w-16 h-16 bg-apple-blue/20 rounded-full blur-xl animate-pulse" />
          <ShieldCheck className="relative w-12 h-12 text-apple-blue animate-bounce mb-4" />
        </div>
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-apple-gray animate-pulse">
          Verifying Authority...
        </p>
      </div>
    </div>
  );
};

export default AuthGuard;
