import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "./components/layouts/header/Header";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { createTheme, ThemeProvider } from "@mui/material";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Clothes Discounts",
  description: "Discount information about clothes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <AppRouterCacheProvider>
          <Header />
          {children}
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
