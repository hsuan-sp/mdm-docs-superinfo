"use client";

import React, { useEffect, useState } from "react";
import { LogIn, LogOut, User as UserIcon } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useUser } from "@/hooks/useLogtoUser";

const UserCenter: React.FC = () => {
  const { t } = useLanguage();
  const { user, displayName, isLoading, isAuthenticated, signIn, signOut } =
    useUser();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || isLoading) {
    return (
      <div className="flex items-center gap-2 px-2">
        <div className="w-9 h-9 rounded-full bg-zinc-100 dark:bg-zinc-800 animate-pulse border border-zinc-200/50 dark:border-zinc-700/50" />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 pl-2">
      {isAuthenticated && user?.email ? (
        <div className="flex items-center gap-3">
          {/* 使用者名稱與標籤 - 所有螢幕尺寸均顯示 */}
          <div className="flex flex-col items-end leading-tight select-none">
            <span className="text-[9px] font-black text-apple-gray dark:text-zinc-500 uppercase tracking-widest mb-1 opacity-70">
              {t("userCenter.authorized")}
            </span>
            <span className="text-[13px] font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
              {displayName}
            </span>
          </div>

          {/* 頭像 */}
          <div
            className="w-10 h-10 rounded-full bg-apple-blue text-white flex items-center justify-center font-bold text-[14px] shadow-lg shadow-apple-blue/15 cursor-default select-none ring-1 ring-apple-blue/30 dark:ring-blue-400/30 ring-offset-2 ring-offset-white dark:ring-offset-zinc-950 transition-transform active:scale-95"
            title={`Email: ${user.email}`}
          >
            {displayName[0].toUpperCase()}
          </div>

          {/* 單純的登出圖示按鈕 */}
          <button
            onClick={() => signOut()}
            className="p-2.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full text-zinc-500 dark:text-zinc-400 transition-all active:scale-90 border border-zinc-200/50 dark:border-zinc-800/50 ml-1 group"
            title={t("userCenter.logout")}
          >
            <LogOut className="w-4 h-4 group-hover:text-red-500 transition-colors" />
          </button>
        </div>
      ) : (
        <button
          onClick={() => signIn()}
          className="flex items-center gap-2 px-5 py-2.5 bg-zinc-950 dark:bg-zinc-50 text-white dark:text-zinc-950 rounded-full text-[13px] font-bold hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-zinc-950/10 dark:shadow-zinc-50/10 group min-h-11"
        >
          <LogIn className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          <span>{t("userCenter.login")}</span>
        </button>
      )}
    </div>
  );
};

export default UserCenter;
