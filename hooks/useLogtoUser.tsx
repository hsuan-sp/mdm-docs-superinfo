"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { isAuthorizedEmail } from "@/lib/auth";

// ✅ Auth 抽象層：透過環境變數控制是否啟用驗證
// 設定 NEXT_PUBLIC_AUTH_DISABLED=true 即可繞過所有 Logto 驗證，方便本地部署
const AUTH_DISABLED = process.env.NEXT_PUBLIC_AUTH_DISABLED === "true";

// Bypass 模式下使用的模擬使用者
const MOCK_USER: LogtoUser = {
  sub: "local-dev-user",
  email: "dev@superinfo.com.tw",
  name: "Local Dev",
};

interface LogtoUser {
  sub: string;
  email?: string;
  name?: string;
}

interface UserContextType {
  user: LogtoUser | null;
  displayName: string;
  isAuthenticated: boolean;
  isAuthorized: boolean;
  isLoading: boolean;
  signIn: (redirectPath?: string) => void;
  signOut: () => void;
  revalidate: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // ✅ Bypass 模式：直接設為已驗證，不發送任何 API 請求
  const [data, setData] = useState<{ user: LogtoUser | null; auth: boolean }>(
    AUTH_DISABLED
      ? { user: MOCK_USER, auth: true }
      : { user: null, auth: false }
  );
  const [isLoading, setIsLoading] = useState(!AUTH_DISABLED);
  const hasFetched = useRef(AUTH_DISABLED); // Bypass 模式下標記為已抓取

  // ✅ 深層清理函數：自動處理 Cookie 以外的所有殘留資料
  const clearLocalPersistence = useCallback(() => {
    if (AUTH_DISABLED) return; // Bypass 模式下不需要清理
    try {
      localStorage.clear();
      sessionStorage.clear();
      // 清除所有非 HttpOnly 的 Cookie (透過過期時間)
      document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });
      console.warn(
        "[Self-Healing] Local caches and non-HttpOnly cookies cleared."
      );
    } catch (e) {
      console.error("[Self-Healing] Cleanup failed", e);
    }
  }, []);

  const fetchUser = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/logto/user?t=${Date.now()}`, {
        cache: "no-store",
        headers: { Pragma: "no-cache", "Cache-Control": "no-cache" },
      });

      if (!res.ok) {
        setData({ user: null, auth: false });
        return;
      }
      const json = await res.json();

      const email = json.userInfo?.email || json.claims?.email;

      // ✅ 自動偵測並應對會話污染
      if (json.isAuthenticated && !email) {
        console.error(
          "[Auth] Corrupted session detected (Auth without Email). Triggering auto-repair..."
        );
        clearLocalPersistence();
        // 我們不自動重定向 signOut 以避免死循環，但清除快取後讓 Guard 顯示提示
      }

      setData({
        user: json.isAuthenticated
          ? {
              sub: json.claims?.sub || json.userInfo?.sub,
              email: email || undefined,
              name:
                json.userInfo?.name ||
                json.claims?.name ||
                json.claims?.username,
            }
          : null,
        auth: !!json.isAuthenticated,
      });
    } catch (e) {
      console.error("[useUser] Fetch failed", e);
      setData({ user: null, auth: false });
    } finally {
      setIsLoading(false);
    }
  }, [clearLocalPersistence]);

  useEffect(() => {
    if (!hasFetched.current) {
      fetchUser();
      hasFetched.current = true;
    }
  }, [fetchUser]);

  const signIn = (redirectPath?: string) => {
    if (AUTH_DISABLED) {
      console.log("[Auth Bypass] signIn() called but auth is disabled.");
      return;
    }
    const path = redirectPath || window.location.pathname;
    window.location.replace(
      `/api/logto/sign-in?redirect=${encodeURIComponent(path)}`
    );
  };

  const signOut = () => {
    if (AUTH_DISABLED) {
      console.log("[Auth Bypass] signOut() called but auth is disabled.");
      return;
    }
    // 登出時順便執行深層清理
    clearLocalPersistence();
    window.location.replace("/api/logto/sign-out");
  };

  const getDisplayName = () => {
    if (!data.user) return "";
    return (
      data.user.name ||
      (data.user.email ? data.user.email.split("@")[0] : "Authorized")
    );
  };

  return (
    <UserContext.Provider
      value={{
        user: data.user,
        displayName: getDisplayName(),
        isAuthenticated: data.auth && !!data.user?.email, // 只有完整身分才算認證
        isAuthorized:
          data.auth &&
          !!data.user?.email &&
          isAuthorizedEmail(data.user?.email),
        isLoading,
        signIn,
        signOut,
        revalidate: fetchUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
};
