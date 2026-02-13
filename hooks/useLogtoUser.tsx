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
  const [data, setData] = useState<{ user: LogtoUser | null; auth: boolean }>({
    user: null,
    auth: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  const hasFetched = useRef(false);

  // ✅ 深層清理函數：自動處理 Cookie 以外的所有殘留資料
  const clearLocalPersistence = useCallback(() => {
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
    const path = redirectPath || window.location.pathname;
    window.location.replace(
      `/api/logto/sign-in?redirect=${encodeURIComponent(path)}`
    );
  };

  const signOut = () => {
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
