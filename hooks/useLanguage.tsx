"use client"
import React, { createContext, useContext, useState, useEffect } from 'react'

type Language = 'zh-TW' | 'en'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('zh-TW')

  useEffect(() => {
    // 優先讀取保存的語系，若無則預設為 zh-TW (不讀取瀏覽器語系避免不必要的跳轉)
    const saved = localStorage.getItem('preferred-language') as Language
    if (saved && (saved === 'zh-TW' || saved === 'en')) {
      setLanguageState(saved)
    } else {
      setLanguageState('zh-TW')
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('preferred-language', lang)
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used within LanguageProvider')
  return context
}
