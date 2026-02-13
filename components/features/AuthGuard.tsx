"use client";
import React, { useEffect, PropsWithChildren } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@/hooks/useLogtoUser";
import { isAuthorizedEmail } from "@/lib/auth";
import { ShieldCheck } from "lucide-react";
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

  // 檢查當前路徑是否屬於受保護範圍 (支援 /zh/guide, /en/glossary 等)
  const isProtected = PROTECTED_ROUTES.some((route) => {
    // 使用 Regex 匹配語系前綴
    const regex = new RegExp(`^(\/(zh|en))?${route}(\/|$)`);
    return regex.test(pathname);
  });

  useEffect(() => {
    // --- 1. 處理「完全未登入」 ---
    if (!isLoading && isProtected && !isLogtoAuthenticated) {
      console.log(
        "[Guard] Protected route and unauthenticated, redirecting to Logto..."
      );
      signIn(pathname);
      return;
    }

    // --- 2. 處理「有登入但沒郵件」 (Zombie Session) ---
    // 我們不在這裡自動重定向，因為這可能導致無限迴圈。
    // 我們讓渲染邏輯顯示一個「修復會話」按鈕。

    // --- 3. 處理「有登入有郵件但沒權限」 ---
    if (!isLoading && isProtected && isLogtoAuthenticated && user?.email) {
      if (!isAuthorized) {
        console.warn(
          "[Guard] Authorized check failed, redirecting to unauthorized"
        );
        router.replace("/unauthorized");
      }
    }
  }, [
    isLoading,
    isLogtoAuthenticated,
    isAuthorized,
    user,
    isProtected,
    pathname,
    router,
    signIn,
  ]);

  // --- 渲染邏輯 ---

  // A. 非保護路由 或 已完全通過授權 (有Auth + 有Email + 在白名單)
  if (!isProtected || isAuthorized) {
    return <>{children}</>;
  }

  // B. 處理「幽靈會話」：有登入但沒郵件資訊 (通常是註冊後 Scopes 不同步)
  const isZombie = !isLoading && isLogtoAuthenticated && !user?.email;

  if (isZombie) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-apple-bg">
        <GeometricBackground />
        <div className="relative z-10 flex flex-col items-center text-center px-6">
          <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center mb-6">
            <ShieldCheck className="w-8 h-8 text-amber-500" />
          </div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
            身分資料未同步
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-xs mb-8">
            系統目前無法取得您的有效郵件資訊。這通常發生在初次註冊後，請嘗試「重置會話」並重新登入以完成同步。
          </p>
          <button
            onClick={() => (window.location.href = "/api/logto/sign-out")}
            className="px-8 py-3 bg-zinc-950 dark:bg-zinc-50 text-white dark:text-zinc-950 rounded-full font-bold text-sm shadow-xl shadow-zinc-950/20 hover:scale-105 active:scale-95 transition-all outline-none"
          >
            重置會話並重新登入
          </button>
        </div>
      </div>
    );
  }

  // C. 正在切換或驗證中的讀取畫面
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
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
