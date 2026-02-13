"use client";
import React, { useEffect, PropsWithChildren } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@/hooks/useLogtoUser";
import { ShieldAlert, ShieldCheck } from "lucide-react";
import GeometricBackground from "@/components/ui/GeometricBackground";

// 1. 定義需要保護的路由 (基礎路徑)
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
    // --- A. 完全未登入 ---
    if (!isLoading && isProtected && !isLogtoAuthenticated) {
      console.log("[Guard] Unauthenticated entry, redirecting to login...");
      signIn(pathname);
      return;
    }

    // --- B. 已登入且資訊完整，但權限檢查不通過 (Unauthorized) ---
    if (!isLoading && isProtected && isAuthenticated && !isAuthorized) {
      console.warn(
        "[Guard] Unauthorized access (Email not in whitelist). Redirecting..."
      );
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

  // 1. 通過授權：直接顯示內容
  if (!isProtected || isAuthorized) {
    return <>{children}</>;
  }

  // 2. 殭屍狀態偵測：Logto 認證成功，但無論如何都抓不到 Email 資訊
  const isZombie = !isLoading && isLogtoAuthenticated && !user?.email;

  if (isZombie) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-apple-bg">
        <GeometricBackground />
        <div className="relative z-10 flex flex-col items-center text-center px-6">
          <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center mb-6">
            <ShieldAlert className="w-8 h-8 text-amber-500" />
          </div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
            身分資料同步異常
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-xs mb-8 leading-relaxed">
            系統目前無法從 Logto
            取得您的帳號資訊。這通常是因為新註冊帳號的會話延遲，請執行「重置會話」並重新登入。
          </p>
          <button
            onClick={() => (window.location.href = "/api/logto/sign-out")}
            className="px-8 py-3 bg-zinc-950 dark:bg-zinc-50 text-white dark:text-zinc-950 rounded-full font-bold text-[13px] shadow-xl shadow-zinc-950/20 hover:scale-105 active:scale-95 transition-all outline-none"
          >
            重置會話並重新登入
          </button>
        </div>
      </div>
    );
  }

  // 3. 處理中狀態
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
