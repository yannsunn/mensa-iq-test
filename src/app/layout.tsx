import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ErrorBoundary from "@/components/ErrorBoundary";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MENSA IQ Test - 高精度知能測定システム",
  description: "国際MENSA基準準拠の高精度IQテスト。論理推論、数的推論、空間認識、パターン認識など多角的な知能測定。",
  keywords: "MENSA, IQ test, 知能テスト, 知能指数, 論理推論, 空間認識",
  openGraph: {
    title: "MENSA IQ Test - 高精度知能測定システム",
    description: "国際MENSA基準準拠の高精度IQテスト",
    type: "website",
  },
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
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
}
