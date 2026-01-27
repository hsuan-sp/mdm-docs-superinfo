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
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (redirectPath?: string) => void;
  signOut: () => void;
  revalidate: () => Promise<void>; // 新增：手動刷新使用者狀態
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Check build-time env first, fallback to runtime check
  const isGhPagesEnv = process.env.NEXT_PUBLIC_IS_GH_PAGES === "true";
  // Also keep the runtime check as a backup if env missing
  const isGhPagesRuntime =
    typeof window !== "undefined" &&
    window.location.hostname.includes("github.io");
  const isStaticPreview = isGhPagesEnv || isGhPagesRuntime;

  const mockUser = {
    sub: "guest",
    email: "guest@superinfo.com.tw", // 使用授權網域，避免被 Guard 擋住
    name: "Guest (Static Preview)",
  };

  // Initialize with auth state if we know it's a static preview
  const [data, setData] = useState<{ user: LogtoUser | null; auth: boolean }>({
    user: isStaticPreview ? mockUser : null,
    auth: isStaticPreview,
  });
  const [isLoading, setIsLoading] = useState(!isStaticPreview);
  const hasFetched = useRef(false);

  const fetchUser = useCallback(async () => {
    // If we already determined it's a static preview, no need to fetch
    if (
      process.env.NEXT_PUBLIC_IS_GH_PAGES === "true" ||
      (typeof window !== "undefined" &&
        window.location.hostname.includes("github.io"))
    ) {
      if (!data.auth) {
        setData({ user: mockUser, auth: true });
        setIsLoading(false);
      }
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/logto/user", {
        cache: "no-store",
      });
      if (!res.ok) {
        if (res.status === 401) {
          console.log("[useUser] User is not authenticated");
        } else {
          console.error("[useUser] Failed to fetch user:", res.statusText);
        }
        setData({ user: null, auth: false });
        return;
      }
      const json = await res.json();
      setData({
        user: json.claims
          ? {
              sub: json.claims.sub,
              email: json.claims.email,
              name: json.claims.name || json.claims.username,
            }
          : null,
        auth: !!json.isAuthenticated,
      });
    } catch (e) {
      console.error("[useUser] Fetch failed (likely static build)", e);
      // Fallback for static export if fetch fails
      if (
        typeof window !== "undefined" &&
        window.location.hostname.includes("github.io")
      ) {
        setData({ user: mockUser, auth: true });
      } else {
        setData({ user: null, auth: false });
      }
    } finally {
      setIsLoading(false);
    }
  }, [data.auth, mockUser]);

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
        isAuthenticated: data.auth,
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
