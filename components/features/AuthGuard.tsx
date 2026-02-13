"use client";
import React, { useEffect, PropsWithChildren } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@/hooks/useLogtoUser";
import { ShieldAlert, Fingerprint } from "lucide-react";
import GeometricBackground from "@/components/ui/GeometricBackground";

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
    isSessionInvalid,
    signIn,
  } = useUser();

  const isProtected = PROTECTED_ROUTES.some((route) => {
    const regex = new RegExp(`^(\/(zh|en))?${route}(\/|$)`);
    return regex.test(pathname);
  });

  useEffect(() => {
    // 狀況 1：未登入受保護路徑 -> 丟去登入
    if (!isLoading && isProtected && !isLogtoAuthenticated) {
      signIn(pathname);
      return;
    }

    // 狀況 2：資料完整但沒權限 -> 丟去拒絕訪問
    if (!isLoading && isProtected && isAuthenticated && !isAuthorized) {
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

  // --- 關鍵優先級渲染：無效會話攔截 ---

  // ✅ 這是您要的：判定註冊完但沒重登的情況
  // 不管是不是受保護路徑，只要偵測到這種「殭屍狀態」，就強制顯示提示
  if (!isLoading && isSessionInvalid) {
    return (
      <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl">
        <GeometricBackground />
        <div className="relative z-10 flex flex-col items-center text-center px-8 py-10 bg-white dark:bg-zinc-900 shadow-2xl rounded-3xl border border-zinc-200/50 dark:border-zinc-800/50 max-w-sm">
          <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-6">
            <Fingerprint className="w-8 h-8 text-blue-500 animate-pulse" />
          </div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-3">
            帳號初始化中
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-8 leading-relaxed">
            您剛完成了帳號註冊！為了安全性考量，系統需要重新同步您的電子郵件權限。請先「點擊重置」並再次登入。
          </p>
          <button
            onClick={() => (window.location.href = "/api/logto/sign-out")}
            className="w-full py-3.5 bg-zinc-950 dark:bg-zinc-50 text-white dark:text-zinc-950 rounded-2xl font-bold text-[14px] shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            重置並重新登入
          </button>
        </div>
      </div>
    );
  }

  // --- 標準權限攔截 ---

  if (!isProtected || isAuthorized) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-apple-bg">
      <GeometricBackground />
      <div className="relative z-10 flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-apple-blue/20 border-t-apple-blue rounded-full animate-spin mb-4" />
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-apple-gray animate-pulse">
          Verifying Authority
        </p>
      </div>
    </div>
  );
};

export default AuthGuard;
