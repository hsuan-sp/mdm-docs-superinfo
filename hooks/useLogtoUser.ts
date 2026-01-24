"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";

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
        setUser(userData);
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
