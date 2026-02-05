"use client"
import React, { useState, useMemo } from 'react'
import { Calendar, ChevronDown } from 'lucide-react'
import AuthGate from '../ui/AuthGate'
import { useUser } from '../../hooks/useLogtoUser'
import { translations } from '../../locales'
import { useLanguage } from '../../hooks/useLanguage'
import BackButton from '../ui/BackButton'

interface LogEntry {
  version: string
  date: string
  type: string
  content: string
}

// 修改 Props 接收雙語資料
interface ChangelogProps {
  zhLogs: LogEntry[]
  enLogs: LogEntry[]
}

const Changelog: React.FC<ChangelogProps> = ({ zhLogs, enLogs }) => {
  const { t, language: locale } = useLanguage()
  const { user, isLoading } = useUser()
  const [selectedVersion, setSelectedVersion] = useState<string>('ALL')

  // 根據語言選擇對應的 logs
  const logs = useMemo(() => (locale === "en" ? enLogs : zhLogs), [locale, zhLogs, enLogs])

  const filteredLogs = useMemo(() => {
    if (selectedVersion === 'ALL') return logs
    return logs.filter(log => log.version === selectedVersion)
  }, [logs, selectedVersion])

  if (isLoading) return null;
  if (!user) return <AuthGate />;
  if (logs.length === 0) return <div className="py-20 text-center text-apple-gray font-medium">{t('changelog.noLogs')}</div>

  return (
    <div className="max-w-4xl mx-auto py-10 px-6 lg:px-0">
      {/* Back Button */}
      <div className="mb-8">
        <BackButton />
      </div>

      {/* Version Selector */}
      <div className="mb-12 p-6 bg-apple-bg dark:bg-apple-dark-bg/60 rounded-3xl border border-apple-border dark:border-apple-dark-border flex flex-col md:flex-row items-start md:items-center gap-4">
        <label htmlFor="version-select" className="text-sm font-black uppercase tracking-widest text-apple-gray">
          {t('changelog.selectVersion')}
        </label>
        <div className="relative flex-1 w-full md:max-w-xs">
          <select 
            id="version-select"
            value={selectedVersion}
            onChange={(e) => setSelectedVersion(e.target.value)}
            className="w-full pl-4 pr-10 py-2.5 bg-white dark:bg-apple-dark-bg border border-apple-border dark:border-apple-dark-border rounded-xl appearance-none cursor-pointer focus:ring-4 focus:ring-apple-blue/10 focus:border-apple-blue transition-all font-bold text-sm text-apple-text dark:text-apple-dark-text"
          >
            <option value="ALL">{t('changelog.allVersions')}</option>
            {logs.map((log) => (
              <option key={log.version} value={log.version}>
                v{log.version} ({log.date})
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-apple-gray pointer-events-none" />
        </div>
      </div>
{/* Timeline Section */}
      <div className="space-y-16">
        {filteredLogs.map((log, index) => (
          <article key={log.version} className="relative pl-8 md:pl-12 border-l-2 border-apple-bg dark:border-apple-dark-border last:border-l-0">
            <div className={`absolute -left-2.25 top-0 w-4 h-4 rounded-full border-4 border-white dark:border-apple-dark-bg ${index === 0 && selectedVersion === 'ALL' ? 'bg-apple-blue scale-125' : 'bg-apple-gray dark:bg-apple-dark-gray'}`} />
            <header className="mb-6 flex flex-wrap items-baseline gap-4">
              <h2 className="text-3xl font-black font-mono tracking-tight text-apple-text dark:text-apple-dark-text">v{log.version}</h2>
              <div className="flex items-center gap-1.5 text-apple-gray font-bold text-sm"><Calendar className="w-4 h-4" />{log.date}</div>
            </header>
            <div className="prose prose-zinc dark:prose-invert max-w-none prose-p:text-apple-gray dark:prose-p:text-apple-dark-gray prose-headings:text-apple-text dark:prose-headings:text-apple-dark-text" dangerouslySetInnerHTML={{ __html: log.content }} />
          </article>
        ))}
      </div>
    </div>
  )
}

export default Changelog