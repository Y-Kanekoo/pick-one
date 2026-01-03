import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PickOne - 迷ったらこれ！ランダム選択アプリ",
  description: "ランチ、映画、行き先...迷った時はルーレットで決めよう！シンプルで使いやすいランダム選択アプリ",
  keywords: ["ルーレット", "ランダム", "くじ引き", "選択", "決められない"],
  authors: [{ name: "PickOne" }],
  openGraph: {
    title: "PickOne - 迷ったらこれ！",
    description: "ルーレットで迷いを解決！",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#8B5CF6",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
