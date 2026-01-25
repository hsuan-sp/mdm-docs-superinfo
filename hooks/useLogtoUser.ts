"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { isAuthorizedEmail } from "@/lib/auth";

interface LogtoUser {
  sub: string;
  username?: string;
  primaryEmail?: string;
  name?: string;
}

export function useUser() {
  const [user, setUser] = useState<LogtoUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/logto/user");
      if (res.ok) {
        const userData = await res.json();
        // 加入前端偵錯日誌
        console.log(
          "[Auth Hook Debug] User metadata:",
          JSON.stringify(userData)
        );

        // 增強檢查：確保 userData 不是空物件且包含 sub 或 isAuthenticated
        // 同時執行網域檢查 (Domain Whitelist Enforcement)
        if (userData && (userData.sub || userData.isAuthenticated)) {
          const email = userData.primaryEmail || userData.email || "";

          if (isAuthorizedEmail(email)) {
            setUser(userData);
          } else {
            console.warn("Unauthorized domain access attempt:", email);
            setUser(null);
            if (router.pathname !== "/unauthorized") {
              router.push("/unauthorized");
            }
          }
        } else {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = useCallback(async () => {
    window.location.href = "/api/logto/sign-in";
  }, []);

  const signOut = useCallback(async () => {
    window.location.href = "/api/logto/sign-out";
  }, []);

  return {
    user,
    isLoading,
    isSignedIn: !!user,
    signIn,
    signOut,
  };
}

export function useAuth() {
  const { user, isLoading } = useUser();

  return {
    userId: user?.sub || null,
    isLoaded: !isLoading,
    isSignedIn: !!user,
  };
}
