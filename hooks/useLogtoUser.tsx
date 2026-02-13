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
  isAuthenticated: boolean; // 已認證 (且包含基礎資料)
  isAuthorized: boolean; // 已授權 (Email 在白名單)
  isLogtoAuthenticated: boolean; // 原始認證狀態 (只要有 Token 就算)
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

  const fetchUser = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/logto/user", {
        cache: "no-store",
      });
      if (!res.ok) {
        setData({ user: null, auth: false });
        return;
      }
      const json = await res.json();

      // ✅ 關鍵修復：Logto 的 Email 可能藏在 claims 或 userInfo 裡
      const email = json.userInfo?.email || json.claims?.email;
      const name =
        json.userInfo?.name || json.claims?.name || json.claims?.username;

      setData({
        user: json.isAuthenticated
          ? {
              sub: json.claims?.sub || json.userInfo?.sub,
              email: email,
              name: name,
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
  }, []);

  useEffect(() => {
    if (!hasFetched.current) {
      fetchUser();
      hasFetched.current = true;
    }
  }, [fetchUser]);

  const signIn = (redirectPath?: string) => {
    const path = redirectPath || window.location.pathname;
    const target = `/api/logto/sign-in?redirect=${encodeURIComponent(path)}`;
    window.location.href = target;
  };

  const signOut = () => {
    window.location.href = "/api/logto/sign-out";
  };

  return (
    <UserContext.Provider
      value={{
        user: data.user,
        // 是否已登入且順利拿到 Email
        isAuthenticated: data.auth && !!data.user?.email,
        // 是否在白名單
        isAuthorized:
          data.auth &&
          !!data.user?.email &&
          isAuthorizedEmail(data.user?.email),
        // 原始 Logto 認證標記
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
