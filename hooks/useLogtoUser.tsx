"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";

interface LogtoUser {
  sub: string;
  email?: string;
  name?: string;
}

interface UserContextType {
  user: LogtoUser | null;
  isAuthenticated: boolean; // ✅ Logto 官方定義：是否有會話
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
      const res = await fetch("/api/logto/user", { cache: "no-store" });
      if (!res.ok) {
        setData({ user: null, auth: false });
        return;
      }
      const json = await res.json();

      // ✅ 依照 Logto 規範同時從 Claims 與 UserInfo 解析 Email
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
        auth: !!json.isAuthenticated, // 這是標準的登入狀態
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
        isAuthenticated: data.auth, // ✅ 回歸標準，有登入就是 true
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
