"use client";
import React, { useEffect, PropsWithChildren } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@/hooks/useLogtoUser";
import { isAuthorizedEmail } from "@/lib/auth";
import { LogOut, UserCheck } from "lucide-react";
import GeometricBackground from "@/components/ui/GeometricBackground";
import { useLanguage } from "@/hooks/useLanguage";

const PROTECTED_ROUTES = ["/guide", "/glossary"];

const AuthGuard = ({ children }: PropsWithChildren) => {
  const { t } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();
  const { user, isLoading, isAuthenticated, signIn, signOut } = useUser();

  const isProtected = PROTECTED_ROUTES.some((route) => {
    const regex = new RegExp(`^(\/(zh|en))?${route}(\/|$)`);
    return regex.test(pathname);
  });

  useEffect(() => {
    // 1. 完全沒登入受保護路徑 -> 丟回登入
    if (!isLoading && isProtected && !isAuthenticated) {
      signIn(pathname);
      return;
    }

    // 2. 有登入也有 Email -> 檢查白名單
    if (!isLoading && isProtected && isAuthenticated && user?.email) {
      if (!isAuthorizedEmail(user.email)) {
        router.replace("/unauthorized");
      }
    }
  }, [isLoading, isAuthenticated, user, isProtected, pathname, router, signIn]);

  // --- 引導新使用者：剛註冊完沒有 Email 的狀態 (或 Cookie 污染導致沒拿到權限) ---
  const isZombieSession =
    isProtected && !isLoading && isAuthenticated && !user?.email;

  if (isZombieSession) {
    return (
      <div className="min-h-screen flex items-center justify-center relative bg-apple-bg overflow-hidden px-6">
        <GeometricBackground />
        <div className="relative z-10 w-full max-w-sm bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-zinc-200/50 dark:border-zinc-800/50 rounded-4xl p-10 text-center shadow-2xl">
          <div className="w-16 h-16 bg-apple-blue/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <UserCheck className="w-8 h-8 text-apple-blue shadow-lg shadow-apple-blue/20" />
          </div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 mb-3 tracking-tight">
            {t("authGate.zombieTitle")}
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-8 leading-relaxed font-medium">
            {t("authGate.zombieDesc")}
          </p>
          <button
            onClick={() => signOut()}
            className="w-full h-12 bg-zinc-950 dark:bg-zinc-50 text-white dark:text-zinc-950 rounded-2xl font-black text-[14px] flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-black/10"
          >
            <LogOut className="w-4 h-4" />
            {t("authGate.zombieBtn")}
          </button>
          <p className="mt-6 text-[11px] text-zinc-500 dark:text-zinc-500 opacity-60">
            Session ID: {user?.sub?.slice(0, 8)}... (Auto-cleanup enabled)
          </p>
        </div>
      </div>
    );
  }

  // --- 通過條件 ---
  const isFullyAuthorized =
    !isProtected ||
    (isAuthenticated && user?.email && isAuthorizedEmail(user.email));

  if (isFullyAuthorized) {
    return <>{children}</>;
  }

  // --- 載入狀態 ---
  return (
    <div className="min-h-screen flex items-center justify-center bg-apple-bg">
      <GeometricBackground />
      <div className="relative z-10 flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-apple-blue/20 border-t-apple-blue rounded-full animate-spin mb-4" />
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-apple-gray animate-pulse">
          AUTHENTICATING
        </p>
      </div>
    </div>
  );
};

export default AuthGuard;
