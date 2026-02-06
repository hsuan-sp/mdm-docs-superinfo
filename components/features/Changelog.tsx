"use client";
import React, { useState, useMemo } from "react";
import { Calendar, ChevronDown } from "lucide-react";
import AuthGate from "@/components/ui/AuthGate";
import { useUser } from "@/hooks/useLogtoUser";
import { translations } from "@/locales";
import { useLanguage } from "@/hooks/useLanguage";

interface LogEntry {
  version: string;
  date: string;
  type: string;
  content: string;
}

// 修改 Props 接收雙語資料
interface ChangelogProps {
  zhLogs: LogEntry[];
  enLogs: LogEntry[];
}

const Changelog: React.FC<ChangelogProps> = ({ zhLogs, enLogs }) => {
  const { t, language: locale } = useLanguage();
  const { user, isLoading } = useUser();
  const [selectedVersion, setSelectedVersion] = useState<string>("ALL");

  // 根據語言選擇對應的 logs
  const logs = useMemo(
    () => (locale === "en" ? enLogs : zhLogs),
    [locale, zhLogs, enLogs]
  );

  const filteredLogs = useMemo(() => {
    if (selectedVersion === "ALL") return logs;
    return logs.filter((log) => log.version === selectedVersion);
  }, [logs, selectedVersion]);

  if (isLoading) return null;
  if (!user) return <AuthGate />;
  if (logs.length === 0)
    return (
      <div className="py-32 text-center text-apple-gray font-medium animate-enter-up">
        {t("changelog.noLogs")}
      </div>
    );

  return (
    <div className="max-w-5xl mx-auto py-16 px-6 lg:px-8 space-y-12 animate-enter-up">
      {/* Header & Filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-16">
        <div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-apple-text dark:text-apple-dark-text mb-3">
            {t("changelog.title") ||
              (locale === "en" ? "Changelog" : "更新日誌")}
          </h1>
          <p className="text-lg text-apple-gray font-medium">
            {locale === "en"
              ? "Latest updates and system improvements"
              : "最新更新與系統改進"}
          </p>
        </div>

        <div className="relative z-20 min-w-50">
          <div className="relative group">
            <select
              id="version-select"
              value={selectedVersion}
              onChange={(e) => setSelectedVersion(e.target.value)}
              className="w-full pl-5 pr-12 py-3.5 bg-apple-bg-secondary dark:bg-apple-dark-bg-secondary border border-apple-border dark:border-apple-dark-border rounded-xl appearance-none cursor-pointer focus:ring-2 focus:ring-apple-blue/50 focus:border-apple-blue transition-all font-bold text-base text-apple-text dark:text-apple-dark-text min-h-12.5 shadow-sm hover:border-apple-gray/50"
            >
              <option value="ALL">{t("changelog.allVersions")}</option>
              {logs.map((log) => (
                <option key={log.version} value={log.version}>
                  v{log.version}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-apple-gray group-hover:text-apple-blue transition-colors">
              <ChevronDown className="w-5 h-5 stroke-[2.5]" />
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Content */}
      <div className="relative space-y-12">
        {/* Timeline Line (Desktop only) */}
        <div className="hidden md:block absolute left-32 top-8 bottom-8 w-0.5 bg-linear-to-b from-apple-blue/50 via-apple-border/50 to-transparent dark:from-apple-blue/30 dark:via-white/10" />

        {filteredLogs.map((log, index) => (
          <article key={log.version} className="relative md:pl-48 group">
            {/* Timeline Dot - Centered on 128px line (128-7=121) */}
            <div className="hidden md:flex absolute left-[121px] top-8 w-4 h-4 rounded-full border-[3px] border-white dark:border-[#121212] bg-apple-blue shadow-[0_0_0_4px_rgba(10,132,255,0.15)] z-10 group-hover:scale-110 transition-transform duration-300" />

            {/* Version Label (Left side on desktop) */}
            <div className="hidden md:flex absolute left-0 top-7 w-28 flex-col items-end pr-6 text-right">
              <span className="font-mono font-bold text-apple-blue text-xl tracking-tight">
                v{log.version}
              </span>
              <span className="text-xs font-semibold text-apple-gray mt-1 opacity-70">
                {log.date}
              </span>
            </div>

            <div
              className={`apple-card p-8 md:p-10 transition-all duration-300 ${index === 0 && selectedVersion === "ALL" ? "ring-2 ring-apple-blue/20 dark:ring-apple-blue/10 shadow-xl" : ""}`}
            >
              <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-apple-border/50 dark:border-white/5">
                <div className="flex items-center gap-4">
                  <div className="md:hidden font-mono font-bold text-white bg-apple-blue px-3 py-1 rounded-lg text-sm">
                    v{log.version}
                  </div>
                  <div className="flex items-center gap-2 text-apple-gray dark:text-apple-gray font-bold text-sm bg-apple-bg dark:bg-white/5 px-3 py-1.5 rounded-full">
                    <Calendar className="w-4 h-4" />
                    {log.date}
                  </div>
                </div>

                {index === 0 && selectedVersion === "ALL" && (
                  <span className="inline-flex self-start sm:self-auto px-3 py-1 bg-apple-blue/10 text-apple-blue text-[10px] font-black uppercase tracking-widest rounded-full">
                    Latest Release
                  </span>
                )}
              </header>

              <div
                className="prose prose-lg prose-zinc dark:prose-invert max-w-none 
                  prose-p:text-apple-text-secondary dark:prose-p:text-[#a1a1a6] 
                  prose-headings:text-apple-text dark:prose-headings:text-white
                  prose-headings:font-bold
                  prose-a:text-apple-blue hover:prose-a:text-apple-blue-hover
                  prose-ul:list-disc prose-ul:pl-5 
                  prose-li:marker:text-apple-blue/50
                  leading-relaxed"
                dangerouslySetInnerHTML={{ __html: log.content }}
              />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Changelog;
