import "nextra-theme-docs/style.css"; // ✅ 讓 Next.js 處理這份預編譯 CSS
import "./globals.css"; // ✅ 讓 Tailwind 只處理這份檔案
import { ReactNode } from "react";
import { UserProvider } from "@/hooks/useLogtoUser";
import { LanguageProvider } from "@/hooks/useLanguage";
import AuthGuard from "@/components/features/AuthGuard";
import SecurityGuard from "@/components/features/SecurityGuard";
import BackToTop from "@/components/ui/BackToTop";
import CustomFooter from "@/components/layout/Footer";
import { Layout, Navbar } from "nextra-theme-docs";
import { getPageMap } from "nextra/page-map";
import { Logo, NavbarExtra } from "@/components/layout/NavbarItems";
import type { Metadata } from "next";
import GeometricBackground from "@/components/ui/GeometricBackground";
import { LiquidGlassFilter } from "@/components/ui/LiquidGlassFilter";

export const metadata: Metadata = {
  title: {
    default: "Superinfo Apple MDM Hub | 極電資訊 MDM 知識庫",
    template: "%s – Superinfo MDM Hub",
  },
  description:
    "專業的 Apple 裝置管理 (MDM) 知識庫，包含實戰指南、技術術語與常見問題解答。",
  metadataBase: new URL("https://your-domain.com"),
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pageMap = await getPageMap();

  return (
    <html lang="zh-TW" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&family=Noto+Serif+TC:wght@700;900&family=Noto+Sans+TC:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <LiquidGlassFilter />
        <GeometricBackground />
        <UserProvider>
          <LanguageProvider>
            <Layout
              navbar={
                <Navbar logo={<Logo />}>
                  <NavbarExtra />
                </Navbar>
              }
              search={null}
              footer={<CustomFooter />}
              pageMap={pageMap}
              docsRepositoryBase="https://github.com/hsuan-sp/mdm-docs-superinfo/tree/main"
              editLink="編輯此頁"
              sidebar={{
                defaultMenuCollapseLevel: 1,
                toggleButton: false,
              }}
              nextThemes={{ defaultTheme: "light" }}
              toc={{ float: true, title: "本頁目錄" }}
            >
              <AuthGuard>
                <SecurityGuard />
                {children}
                <BackToTop />
              </AuthGuard>
            </Layout>
          </LanguageProvider>
        </UserProvider>
      </body>
    </html>
  );
}
