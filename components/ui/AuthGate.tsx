"use client";
import React from "react";
import { Lock, Home, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/hooks/useLanguage";

interface AuthGateProps {
  redirectPath?: string;
}

/**
 * AuthGate - Apple-style Authentication Gate
 *
 * 設計原則：
 * - 極簡設計，大量留白
 * - 清晰的視覺層次
 * - 乾淨的按鈕設計（實心藍色 CTA）
 * - 無多餘裝飾
 */
const AuthGate: React.FC<AuthGateProps> = ({ redirectPath = "/" }) => {
  const { t } = useLanguage();

  const [isLoading, setIsLoading] = React.useState(false);

  const handleSignIn = React.useCallback(() => {
    setIsLoading(true);
    const apiEndpoint = "/api/logto/sign-in";
    const finalTarget = encodeURIComponent(redirectPath);
    window.location.assign(`${apiEndpoint}?redirect=${finalTarget}`);
  }, [redirectPath]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        {/* Icon */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-apple-bg dark:bg-apple-dark-bg-secondary rounded-full">
            <Lock className="w-9 h-9 text-apple-gray dark:text-apple-dark-gray" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-semibold text-apple-text dark:text-apple-dark-text mb-4 tracking-tight">
          {t("authGate.title")}
        </h1>

        {/* Subtitle */}
        <p
          className="text-lg text-apple-gray dark:text-apple-dark-gray mb-10 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: t("authGate.subtitle") }}
        />

        {/* Primary CTA */}
        <button
          onClick={handleSignIn}
          disabled={isLoading}
          className={`btn-apple-primary w-full min-h-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-apple-blue ${isLoading ? "opacity-80 cursor-wait" : ""}`}
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              {t("authGate.signInBtn")}
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>

        {/* Secondary Link */}
        <Link
          href="/"
          className="btn-apple-link mt-6 min-h-11 inline-flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-blue rounded-lg"
        >
          <Home className="w-4 h-4" />
          {t("authGate.backHome")}
        </Link>
      </div>
    </div>
  );
};

export default AuthGate;
