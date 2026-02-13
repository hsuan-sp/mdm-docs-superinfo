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
  const { user, isLoading, isAuthenticated, isLogtoAuthenticated } = useUser();

  // 檢查當前路徑是否屬於受保護範圍 (支援 /zh/guide, /en/glossary 等)
  const isProtected = PROTECTED_ROUTES.some((route) => {
    // 使用 Regex 匹配語系前綴
    const regex = new RegExp(`^(\/(zh|en))?${route}(\/|$)`);
    return regex.test(pathname);
  });

  useEffect(() => {
    // --- 殭屍會話 (Zombie Session) 處理 ---
    // 狀況：Logto 說登入成功了，但我們拿不到 Email。
    // 這通常發生在剛註冊完，或是憑證權限 (Scopes) 不全時。
    const isZombieSession = !isLoading && isLogtoAuthenticated && !user?.email;

    if (isZombieSession) {
      console.warn(
        "[Guard] Zombie Session detected (Auth but no Email). Forcing re-sync..."
      );
      // 嘗試重新導向到登入頁面來刷新權限。
      // 如果 Logto 已經有 Session，它理論上應該直接帶回新的 Claims。
      // 如果還是沒用，這裡最終會因為重複重導向被瀏覽器擋住，或者是我們手動觸發 signOut。
      window.location.href = `/api/logto/sign-in?redirect=${encodeURIComponent(pathname)}`;
      return;
    }

    // 2. 處理「未登入」：如果是受保護路由且未登入，則跳轉至登入
    if (!isLoading && isProtected && !isAuthenticated) {
      console.log(
        "[Guard] Protected route and unauthenticated, redirecting to Logto..."
      );
      window.location.href = `/api/logto/sign-in?redirect=${encodeURIComponent(pathname)}`;
      return;
    }

    // 3. 處理「授權檢查」：已登入但不在白名單
    if (!isLoading && isProtected && isAuthenticated && user?.email) {
      if (!isAuthorizedEmail(user.email)) {
        console.warn(
          "[Guard] Email not authorized, redirecting to unauthorized"
        );
        router.replace("/unauthorized");
      }
    }
  }, [
    isLoading,
    isAuthenticated,
    isLogtoAuthenticated,
    user,
    isProtected,
    pathname,
    router,
  ]);

  // --- 渲染邏輯 ---

  // 非保護路由或已通過驗證：直接渲染
  if (
    !isProtected ||
    (isAuthenticated && user?.email && isAuthorizedEmail(user.email))
  ) {
    return <>{children}</>;
  }

  // 載入中或是正在跳轉的過渡狀態：顯示 Loading
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <GeometricBackground />
      <div className="relative z-10 flex flex-col items-center">
        <div className="relative">
          <div className="absolute inset-0 w-16 h-16 bg-apple-blue/20 rounded-full blur-xl animate-pulse" />
          <ShieldCheck className="relative w-12 h-12 text-apple-blue animate-bounce mb-4" />
        </div>
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-apple-gray animate-pulse">
          {isAuthenticated
            ? "Verifying Authority"
            : "Redirecting to Security Login"}
        </p>

        {/* 如果卡太久，提供一個手動登出的按鈕 */}
        {!isLoading && isAuthenticated && !user?.email && (
          <button
            onClick={() => (window.location.href = "/api/logto/sign-out")}
            className="mt-8 px-4 py-2 text-[11px] font-bold text-apple-blue hover:underline animate-fade-in"
          >
            Session Error? Click to Reset
          </button>
        )}
      </div>
    </div>
  );
};

export default AuthGuard;
