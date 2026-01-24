"use client"
import React, { useState, useMemo } from 'react'
import { useRouter } from 'nextra/hooks'
import { Calendar, Tag, ChevronDown, ExternalLink } from 'lucide-react'
import { SignedIn, SignedOut } from '@clerk/nextjs'
import AuthGate from '../ui/AuthGate'

import { translations } from '@/locales'
import { useLanguage } from '@/hooks/useLanguage'

interface LogEntry {
  version: string
  date: string
  type: string
  content: string
}

interface ChangelogProps {
  logs: LogEntry[]
}

const Changelog: React.FC<ChangelogProps> = ({ logs }) => {
  const router = useRouter()
  const { language: locale } = useLanguage()
  const t = translations[locale as keyof typeof translations]?.changelog || translations['zh-TW'].changelog

  const [selectedVersion, setSelectedVersion] = useState<string>('ALL')


  const filteredLogs = useMemo(() => {
    if (selectedVersion === 'ALL') return logs
    return logs.filter(log => log.version === selectedVersion)
  }, [logs, selectedVersion])

  if (logs.length === 0) {
    return (
      <div className="py-20 text-center text-zinc-500 font-medium">
        {t.noLogs}
      </div>
    )
  }

  return (
    <>
      <SignedIn>
        <div className="max-w-4xl mx-auto py-10">
          {/* Version Selector */}
          <div className="mb-12 p-6 bg-gray-50 dark:bg-zinc-900 rounded-3xl border border-gray-100 dark:border-zinc-800 flex flex-col md:flex-row items-start md:items-center gap-4">
            <label htmlFor="version-select" className="text-sm font-black uppercase tracking-widest text-zinc-400">
              {t.selectVersion}
            </label>
            <div className="relative flex-1 w-full md:max-w-xs">
              <select 
                id="version-select"
                value={selectedVersion}
                onChange={(e) => setSelectedVersion(e.target.value)}
                className="w-full pl-4 pr-10 py-2.5 bg-white dark:bg-black border border-gray-200 dark:border-zinc-800 rounded-xl appearance-none cursor-pointer focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all font-bold text-sm"
              >
                <option value="ALL">{t.allVersions}</option>
                {logs.map((log, idx) => (
                  <option key={log.version} value={log.version}>
                    v{log.version} ({log.date}) {idx === 0 ? `[${t.latest}]` : ''}
                  </option>
                ))}
              </select>

              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
            </div>
          </div>

          {/* Timeline Section */}
          <div className="space-y-16">
            {filteredLogs.map((log, index) => (
              <article 
                key={log.version} 
                id={log.version}
                className="relative pl-8 md:pl-12 border-l-2 border-gray-100 dark:border-zinc-900 last:border-l-0"
              >
                {/* Timeline Dot */}
                <div className={`absolute left-[-9px] top-0 w-4 h-4 rounded-full border-4 border-white dark:border-black ${index === 0 && selectedVersion === 'ALL' ? 'bg-blue-600 scale-125' : 'bg-gray-300 dark:bg-zinc-700'}`} />
                
                <header className="mb-6 flex flex-wrap items-baseline gap-4">
                  <div className="flex items-center gap-3">
                    <h2 className="text-3xl font-black font-mono tracking-tight text-zinc-900 dark:text-zinc-100">
                      {log.version}
                    </h2>
                    {index === 0 && selectedVersion === 'ALL' && (
                      <span className="px-2 py-0.5 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-md">
                        {t.latest}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 text-zinc-400 font-bold text-sm">
                    <Calendar className="w-4 h-4" />
                    {log.date}
                  </div>
                </header>

                <div 
                  className="prose prose-zinc dark:prose-invert max-w-none 
                    prose-h3:text-sm prose-h3:font-black prose-h3:uppercase prose-h3:tracking-widest prose-h3:text-zinc-400 prose-h3:flex prose-h3:items-center prose-h3:gap-2 
                    prose-h3:before:content-[''] prose-h3:before:w-1 prose-h3:before:h-4 prose-h3:before:bg-blue-600 prose-h3:before:rounded-full
                    prose-p:text-zinc-600 dark:prose-p:text-zinc-400 prose-p:leading-relaxed
                    prose-li:text-zinc-600 dark:prose-li:text-zinc-400"
                  dangerouslySetInnerHTML={{ __html: log.content }}
                />
              </article>
            ))}
          </div>
        </div>
      </SignedIn>
      <SignedOut>
        <AuthGate />
      </SignedOut>
    </>
  )
}

export default Changelog
