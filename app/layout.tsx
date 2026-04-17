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
    images: [
      {
        url: "https://mentitastudio.vercel.app/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Mentita Studio",
    description: "Vibe coding studio. Proyectos web y SaaS hechos con Claude Code.",
  },
  metadataBase: new URL("https://mentitastudio.vercel.app"),
  icons: {
    shortcut: "/favicon.ico",
    icon: "/favicon.ico",
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
      <head>
        <link rel="icon" href="/favicon.ico?v=2" />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
