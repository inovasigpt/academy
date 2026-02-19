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
  title: "AI Academy | Platform Edukasi AI-Generated Courses",
  description:
    "Platform pembelajaran revolusioner di mana AI menciptakan semua materi. Cyber Security, Programming, Automation, Data Science - belajar gratis 24/7.",
  keywords: [
    "AI courses",
    "cyber security",
    "programming",
    "automation",
    "data science",
    "online learning",
    "free courses",
  ],
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#020617",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-950 text-slate-100`}
      >
        {children}
      </body>
    </html>
  );
}
