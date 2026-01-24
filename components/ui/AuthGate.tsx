import { Lock, ChevronRight, Home, ShieldCheck } from 'lucide-react'
import Link from 'next/link'
import { useLanguage } from '../../hooks/useLanguage'
import { translations } from '../../locales'
import { useUser } from '../../hooks/useLogtoUser'

const AuthGate: React.FC = () => {
  const { language } = useLanguage()
  const t = translations[language as keyof typeof translations]?.authGate || translations['zh-TW'].authGate
  const { signIn } = useUser()

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-6 bg-zinc-50/50 dark:bg-black/20">
      <div className="max-w-xl w-full">
        <div className="relative group">
          {/* Decorative background glow */}
          <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600/10 to-indigo-600/10 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
          
          <div className="relative bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 p-8 md:p-14 rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] dark:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] flex flex-col items-center text-center">
            
            {/* Top Indicator Badge */}
            <div className="mb-10 inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full border border-blue-100 dark:border-blue-800">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span className="text-[10px] font-black uppercase tracking-[0.1em]">{t.badge}</span>
            </div>

            {/* Lock Icon Box */}
            <div className="mb-10 relative">
              <div className="w-24 h-24 bg-gradient-to-b from-blue-50 to-white dark:from-zinc-800 dark:to-zinc-900 rounded-[2rem] flex items-center justify-center shadow-inner border border-zinc-50 dark:border-zinc-800">
                <Lock className="w-10 h-10 text-blue-600 dark:text-blue-400 animate-pulse" />
              </div>
            </div>

            <h2 className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white mb-4 tracking-tight leading-tight">
              {t.title}
            </h2>
            
            <p 
              className="text-zinc-500 dark:text-zinc-400 font-bold mb-12 leading-relaxed max-w-[20rem] md:max-w-md mx-auto text-[15px] md:text-base"
              dangerouslySetInnerHTML={{ __html: t.subtitle }}
            />

            <div className="flex flex-col w-full gap-4 max-w-sm">
              <button 
                onClick={signIn}
                className="w-full flex items-center justify-center gap-3 px-8 py-5 bg-blue-600 text-white rounded-[1.25rem] font-black text-[16px] hover:bg-blue-700 hover:shadow-2xl hover:shadow-blue-500/30 active:scale-95 transition-all group"
              >
                {t.signInBtn}
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <Link 
                href="/"
                className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-zinc-50 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 rounded-[1.25rem] font-black text-[14px] hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-all active:scale-95 border border-zinc-100 dark:border-zinc-800"
              >
                <Home className="w-4 h-4 text-zinc-400" />
                {t.backHome}
              </Link>
            </div>

            <div className="mt-14 pt-8 border-t border-zinc-100 dark:border-zinc-800 w-full opacity-40">
              <p className="text-[9px] font-black text-zinc-400 uppercase tracking-[0.3em]">
                Secure Documentation Access Protocol
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default AuthGate
