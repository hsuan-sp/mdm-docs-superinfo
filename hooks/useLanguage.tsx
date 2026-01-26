"use client"
import React, { createContext, useContext, useState, useEffect, PropsWithChildren, useCallback } from 'react'
import { translations, TranslationType } from "@/locales";
import { getNestedValue, interpolate, PathsToLeaves } from "@/lib/i18n-utils";

type Language = 'zh-TW' | 'en'
type TranslationPath = PathsToLeaves<TranslationType>;

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (path: TranslationPath, args?: Record<string, string | number>) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const LanguageProvider = ({ children }: PropsWithChildren) => {
  const [language, setLanguageState] = useState<Language>('zh-TW')

  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred-language') as Language
    if (savedLanguage && (savedLanguage === 'zh-TW' || savedLanguage === 'en')) {
      setLanguageState(savedLanguage)
    } else {
      const browserLang = navigator.language
      if (browserLang.startsWith('en')) {
        setLanguageState('en')
      }
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferred-language', lang)
    }
  }

  // standard path-based translation function
  const t = useCallback((path: TranslationPath, args?: Record<string, string | number>) => {
    const root = translations[language];
    let text = getNestedValue(root, path);
    
    // Fallback to zh-TW
    if (text === undefined) {
      text = getNestedValue(translations['zh-TW'], path);
    }
    
    if (text === undefined) return path;

    return args ? interpolate(String(text), args) : String(text);
  }, [language]);

  // ✅ 自動切換雙語標題 (Preserved logic)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const suffix = language === 'en' ? 'Superinfo MDM Hub' : '極電資訊 MDM 資料庫';
    const pathName = window.location.pathname.replace('/', '') || 'index';
    
    // Use the new t function to get page title
    const pageTitle = t(`pageTitles.${pathName}` as any) || t('pageTitles.index');
    document.title = `${pageTitle} - ${suffix}`;
  }, [language, t]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) throw new Error('useLanguage must be used within LanguageProvider')
  return context
}