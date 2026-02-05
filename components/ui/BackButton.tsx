"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface BackButtonProps {
  className?: string;
}

/**
 * Unified Back Button Component
 * Provides consistent navigation across all pages
 * Falls back to home if no history
 */
export default function BackButton({ className = "" }: BackButtonProps) {
  const router = useRouter();

  const handleBack = () => {
    // Check if there's history to go back to
    if (window.history.length > 1) {
      router.back();
    } else {
      // Fallback to home
      router.push("/");
    }
  };

  return (
    <button
      onClick={handleBack}
      className={`btn-apple-link ${className}`}
      aria-label="Go back"
    >
      <ArrowLeft className="w-4 h-4" />
      返回
    </button>
  );
}
