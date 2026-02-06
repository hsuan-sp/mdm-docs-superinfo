"use client";

import React from "react";
// ✅ Nextra 4 / App Router 下必須從 next/navigation 引入 useRouter
import { useRouter } from "next/navigation";
import CardSheen from "@/components/ui/CardSheen";
import {
  User,
  Package,
  Smartphone,
  GraduationCap,
  Apple,
  Wrench,
  Monitor,
  HelpCircle,
  Book,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import { translations } from "@/locales";
import { useLanguage } from "@/hooks/useLanguage";

// 定義 Feature 介面以取代 any 型別
interface Feature {
  id: string;
  title: string;
  subtitle: string;
  desc: string;
  emoji?: string;
}

const Home: React.FC = () => {
  const router = useRouter();
  const { t, language: locale } = useLanguage();

  // Since features is an array, we access it from the raw translations object for now
  // OR we can define a standard for arrays in our i18n system.
  // For simplicity, let's get the features array directly.
  const features = translations[locale as keyof typeof translations].home
    .features as Feature[];

  const handleRoute = (id: string) => {
    if (id === "glossary") {
      router.push("/glossary");
    } else {
      // 在 App Router 中，push 帶 hash 的路徑依然有效
      router.push(`/guide#${id}`);
    }
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-40 pb-32 text-center lg:px-8">
        {/* Designer Studio Metadata */}
        <div className="flex items-center justify-center gap-4 mb-14 animate-enter-up">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-apple-blue/80 font-sans">
            {t("home.eyebrow")}
          </p>
        </div>

        {/* Designer-Selected Typography */}
        <div className="max-w-5xl mx-auto mb-16 space-y-6">
          <h1 className="text-hero text-apple-text dark:text-white animate-enter-up delay-100 text-balance">
            {t("home.title")}
          </h1>
          <p className="text-4xl md:text-5xl font-extrabold tracking-tight text-apple-gray dark:text-apple-dark-gray/80 animate-enter-up delay-200 text-balance">
            {t("home.intro1")}
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-20 animate-enter-up delay-300">
          <p className="text-xl md:text-2xl text-apple-gray dark:text-apple-dark-gray/60 leading-relaxed font-medium tracking-tight">
            {t("home.intro2")}
          </p>
        </div>

        {/* High-Impact Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-10 animate-enter-up delay-400">
          <button
            onClick={() => router.push("/guide")}
            className="btn-apple-primary w-full sm:w-auto px-16 py-5 group shadow-2xl shadow-apple-blue/20 text-xl font-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-apple-blue"
          >
            {t("home.explore")}
            <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-500" />
          </button>
          <button
            onClick={() => router.push("/glossary")}
            className="btn-apple-link w-full sm:w-auto group text-xl font-bold rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-blue"
          >
            {t("home.searchGlossary")}
            <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-500" />
          </button>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-40 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f: Feature, idx: number) => {
            return (
              <div
                key={f.id}
                onClick={() => handleRoute(f.id)}
                onKeyDown={(e) => e.key === "Enter" && handleRoute(f.id)}
                role="button"
                tabIndex={0}
                className="apple-card group cursor-pointer p-10 md:p-12 flex flex-col h-full min-h-85 animate-enter-up focus-visible:ring-2 focus-visible:ring-apple-blue focus-visible:ring-offset-2 focus-visible:outline-none"
                style={{ animationDelay: `${idx * 100 + 500}ms` }}
              >
                {/* Refined Glass Sheen */}
                <CardSheen />

                <div className="absolute top-0 right-0 p-10 opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-x-4 group-hover:translate-x-0 text-apple-blue z-20">
                  <ArrowRight className="w-8 h-8" />
                </div>

                <div className="relative z-10 flex flex-col h-full">
                  <div className="mb-12 flex h-24 w-24 items-center justify-center rounded-4xl bg-apple-bg dark:bg-white/10 transition-all duration-700 group-hover:scale-110 group-hover:bg-white dark:group-hover:bg-white/20 text-6xl shadow-inner border border-black/5 dark:border-white/5">
                    <span className="drop-shadow-sm">{f.emoji || "✨"}</span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-extrabold mb-4 text-apple-text dark:text-white tracking-tight">
                    {f.title}
                  </h3>

                  <p className="text-[12px] font-black uppercase tracking-[0.3em] text-apple-blue/70 mb-8">
                    {f.subtitle}
                  </p>

                  <p className="text-[18px] leading-relaxed text-apple-gray dark:text-apple-dark-gray/80 font-medium flex-1">
                    {f.desc}
                  </p>

                  <div className="mt-12 flex items-center gap-2.5 text-apple-blue text-[16px] font-bold opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-y-3 group-hover:translate-y-0">
                    {t("home.explore")}
                    <div className="p-1 rounded-full bg-apple-blue/10">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
