"use client";
import React, { useEffect, PropsWithChildren } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@/hooks/useLogtoUser";
import { ShieldCheck, Sparkles } from "lucide-react";
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
    signOut,
  } = useUser();

  // 檢查當前路徑是否屬於受保護範圍
  const isProtected = PROTECTED_ROUTES.some((route) => {
    const regex = new RegExp(`^(\/(zh|en))?${route}(\/|$)`);
    return regex.test(pathname);
  });

  useEffect(() => {
    // --- 狀況 1：未登入受保護區塊 ---
    if (!isLoading && isProtected && !isLogtoAuthenticated) {
      console.log("[Guard] Unauthenticated entry, redirecting to login...");
      signIn(pathname);
      return;
    }

    // --- 狀況 2：已有 Email 資料但權限不足 (Unauthorized) ---
    if (!isLoading && isProtected && isAuthenticated && !isAuthorized) {
      console.warn("[Guard] Unauthorized access (Email not in whitelist).");
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

  // --- 優先判定：幽靈會話 (剛註冊完，拿不到 Email) ---
  // 只有當使用者試圖進入「保護區塊」時，我們才顯示這個提示畫面
  const isZombie =
    isProtected && !isLoading && isLogtoAuthenticated && !user?.email;

  if (isZombie) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-apple-bg">
        <GeometricBackground />
        <div className="relative z-10 flex flex-col items-center text-center px-8 py-12 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-2xl shadow-2xl rounded-[32px] border border-zinc-200/50 dark:border-zinc-800/50 max-w-sm">
          <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mb-8 relative">
            <div className="absolute inset-0 bg-blue-500/20 rounded-full animate-ping opacity-20" />
            <Sparkles className="w-10 h-10 text-blue-500" />
          </div>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-4 tracking-tight">
            歡迎加入！
          </h2>
          <p className="text-[15px] text-zinc-500 dark:text-zinc-400 mb-10 leading-relaxed font-medium">
            您已成功建立帳號。由於這是您的第一次登入，系統需要重置會話以同步您的權限與信箱資訊。
          </p>
          <button
            onClick={() => signOut()}
            className="w-full py-4 bg-zinc-950 dark:bg-zinc-50 text-white dark:text-zinc-950 rounded-2xl font-bold text-[15px] shadow-2xl shadow-zinc-950/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            完成初始化並登入
          </button>
        </div>
      </div>
    );
  }

  // --- 渲染邏輯 ---

  // 通過授權或非保護區域：直接渲染
  if (!isProtected || isAuthorized) {
    return <>{children}</>;
  }

  // 切換中的過渡 UI
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-apple-bg">
      <GeometricBackground />
      <div className="relative z-10 flex flex-col items-center">
        <div className="relative w-16 h-16 mb-6">
          <div className="absolute inset-0 border-4 border-apple-blue/10 rounded-full" />
          <div className="absolute inset-0 border-4 border-apple-blue border-t-transparent rounded-full animate-spin" />
        </div>
        <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-apple-gray animate-pulse">
          Verifying Identity
        </p>
      </div>
    </div>
  );
};

export default AuthGuard;
