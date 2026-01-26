"use client"
import React from 'react'
import { Lock, ChevronRight, Home, ShieldCheck, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from '../../hooks/useLanguage'

// 定義 Props 型別，接收來自 Guard 的路徑
interface AuthGateProps {
  redirectPath?: string;
}

const AuthGate: React.FC<AuthGateProps> = ({ redirectPath = '/' }) => {
  const { t } = useLanguage() 

  const handleSignIn = () => {
    const apiEndpoint = '/api/logto/sign-in';
    const finalTarget = encodeURIComponent(redirectPath);
    window.location.href = `${apiEndpoint}?redirect=${finalTarget}`;
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6 bg-transparent animate-reveal">
      <div className="max-w-2xl w-full">
        <div className="apple-card p-10 md:p-16 flex flex-col items-center text-center relative overflow-hidden">
          {/* Subtle Background Glow */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-linear-to-r from-apple-blue/50 to-purple-500/50" />
          
          <div className="mb-12 inline-flex items-center gap-2.5 px-4 py-1.5 bg-apple-blue/5 text-apple-blue rounded-full border border-apple-blue/10">
            <ShieldCheck className="w-4 h-4" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em]">{t('authGate.badge')}</span>
          </div>

          <div className="mb-10 relative">
            <div className="w-24 h-24 bg-apple-bg dark:bg-zinc-800 rounded-apple-lg flex items-center justify-center shadow-inner group-hover:rotate-12 transition-transform duration-700">
              <Lock className="w-10 h-10 text-apple-blue animate-pulse" />
            </div>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-[#1d1d1f] dark:text-white mb-6 tracking-tight leading-[1.1] text-balance">
            {t('authGate.title')}
          </h2>
          
          <p 
            className="text-[rgb(134,134,139)] dark:text-zinc-400 font-medium mb-12 leading-relaxed max-w-md mx-auto text-lg"
            dangerouslySetInnerHTML={{ __html: t('authGate.subtitle') }}
          />

          <div className="flex flex-col w-full gap-5 max-w-sm">
            <button 
              onClick={handleSignIn}
              className="w-full flex items-center justify-center gap-3 px-8 py-5 bg-apple-blue text-white rounded-full font-bold text-[17px] hover:bg-[#0077ed] hover:shadow-2xl hover:shadow-blue-500/20 active:scale-[0.98] transition-all group"
            >
              {t('authGate.signInBtn')}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1transition-transform" />
            </button>

            <Link 
              href="/"
              className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-[rgb(245,245,247)] dark:bg-zinc-800 text-[#1d1d1f] dark:text-white rounded-full font-bold text-[15px] hover:bg-[#e8e8ed] dark:hover:bg-zinc-700 transition-all active:scale-[0.98]"
            >
              <Home className="w-4 h-4 opacity-70" />
              {t('authGate.backHome')}
            </Link>
          </div>

          <div className="mt-16 pt-10 border-t border-zinc-100 dark:border-zinc-800 w-full">
            <p className="text-[10px] font-bold text-[rgb(134,134,139)] dark:text-zinc-500 uppercase tracking-[0.4em]">
              Enhanced Security Environment
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthGate