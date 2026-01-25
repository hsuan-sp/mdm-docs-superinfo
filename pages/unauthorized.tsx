import React from 'react';
import Link from 'next/link';
import { Home, LogOut } from 'lucide-react';
import { useUser } from '@/hooks/useLogtoUser';

const UnauthorizedPage = () => {
  const { signOut } = useUser();

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-zinc-50 dark:bg-black">
      <div className="max-w-md w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 md:p-12 shadow-2xl text-center">
        <div className="w-20 h-20 bg-red-50 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">🚫</span>
        </div>
        
        <h1 className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-white mb-4 tracking-tight">
          存取被拒絕
        </h1>
        
        <p className="text-zinc-500 dark:text-zinc-400 mb-8 leading-relaxed font-medium">
          抱歉，此平台僅限使用 <span className="text-blue-600 dark:text-blue-400 font-bold">.edu.tw</span> 教育信箱登入。
          <br /><br />
          請登出並使用符合資格的帳號重新登入。
        </p>

        <div className="flex flex-col gap-3">
          <button 
            onClick={signOut}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-red-600 text-white rounded-2xl font-bold hover:bg-red-700 active:scale-95 transition-all shadow-lg shadow-red-500/20"
          >
            <LogOut className="w-4 h-4" />
            登出目前帳號
          </button>
          
          <Link 
            href="/"
            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 rounded-2xl font-bold hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all"
          >
            <Home className="w-4 h-4" />
            返回首頁
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
