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
  isAuthenticated: boolean;
  isAuthorized: boolean;
  isLogtoAuthenticated: boolean;
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

  const signOut = useCallback(() => {
    window.location.href = "/api/logto/sign-out";
  }, []);

  const fetchUser = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/logto/user", { cache: "no-store" });
      if (!res.ok) {
        setData({ user: null, auth: false });
        return;
      }
      const json = await res.json();

      const email = json.userInfo?.email || json.claims?.email;

      // ✅ 關鍵自癒邏輯：
      // 如果 Logto 說 isAuthenticated=true，但 Email 完全消失。
      // 代表這是一個 Session 損壞或 Scope 遺失的殭屍會話。
      if (json.isAuthenticated && !email) {
        console.warn(
          "[Auth] Corrupted session detected (No Email). Auto-clearing..."
        );
        signOut(); // 直接觸發登出清理 Cookie
        return;
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
  }, [signOut]);

  useEffect(() => {
    if (!hasFetched.current) {
      fetchUser();
      hasFetched.current = true;
    }
  }, [fetchUser]);

  const signIn = (redirectPath?: string) => {
    const path = redirectPath || window.location.pathname;
    // 確保路徑是絕對的
    const target = `/api/logto/sign-in?redirect=${encodeURIComponent(path)}`;
    window.location.replace(target); // 使用 replace 避免瀏覽器歷史堆疊問題
  };

  return (
    <UserContext.Provider
      value={{
        user: data.user,
        isAuthenticated: data.auth && !!data.user?.email,
        isAuthorized:
          data.auth &&
          !!data.user?.email &&
          isAuthorizedEmail(data.user?.email),
        isLogtoAuthenticated: data.auth,
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
