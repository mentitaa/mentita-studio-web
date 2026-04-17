import type { Metadata } from "next";
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
  title: "Mentita Studio",
  description: "Vibe coding studio. Proyectos web y SaaS hechos con Claude Code.",
  openGraph: {
    title: "Mentita Studio",
    description: "Vibe coding studio. Proyectos web y SaaS hechos con Claude Code.",
    url: "https://mentitastudio.vercel.app",
    siteName: "Mentita Studio",
    locale: "es_PE",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Mentita Studio",
    description: "Vibe coding studio. Proyectos web y SaaS hechos con Claude Code.",
  },
  metadataBase: new URL("https://mentitastudio.vercel.app"),
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
<body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
