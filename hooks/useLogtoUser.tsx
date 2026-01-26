"use client";
import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";

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

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<{user: LogtoUser | null, auth: boolean}>({ user: null, auth: false });
  const [isLoading, setIsLoading] = useState(true);
  const hasFetched = useRef(false);

  const fetchUser = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/logto/user", {
        cache: 'no-store',
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
        user: json.claims ? {
          sub: json.claims.sub,
          email: json.claims.email,
          name: json.claims.name || json.claims.username
        } : null, 
        auth: !!json.isAuthenticated 
      });
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
    window.location.href = '/api/logto/sign-out';
  };

  return (
    <UserContext.Provider value={{ 
      user: data.user, 
      isAuthenticated: data.auth,
      isLoading, 
      signIn, 
      signOut,
      revalidate: fetchUser
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
};