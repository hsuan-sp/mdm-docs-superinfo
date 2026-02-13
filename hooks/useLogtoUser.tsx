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
  displayName: string; // ✅ 用於 UI 顯示的名稱 (Email 前綴或 Name)
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

  const fetchUser = useCallback(async () => {
    setIsLoading(true);
    try {
      // ✅ 使用 cache: 'no-cache' 並加上 timestamp 破解任何潛在的 Cookie/API 緩存污染
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
      const name =
        json.userInfo?.name || json.claims?.name || json.claims?.username;

      setData({
        user: json.isAuthenticated
          ? {
              sub: json.claims?.sub || json.userInfo?.sub,
              email: email || undefined,
              name: name || undefined,
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
    window.location.replace(target);
  };

  const signOut = () => {
    // ✅ 直接跳向 Sign-out 端點，確保 Cookie 從伺服器端徹底抹除
    window.location.replace("/api/logto/sign-out");
  };

  const getDisplayName = () => {
    if (!data.user) return "";
    if (data.user.name) return data.user.name;
    if (data.user.email) return data.user.email.split("@")[0];
    return "User";
  };

  return (
    <UserContext.Provider
      value={{
        user: data.user,
        displayName: getDisplayName(),
        isAuthenticated: data.auth,
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
