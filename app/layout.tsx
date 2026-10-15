import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
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
    url: "https://www.mentitastudio.com",
    siteName: "Mentita Studio",
    locale: "es_PE",
    type: "website",
    images: [
      {
        url: "https://www.mentitastudio.com/og-image.png",
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
  metadataBase: new URL("https://www.mentitastudio.com"),
  alternates: { canonical: "/" },
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
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" href="/favicon.ico?v=2" />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
      </body>
    </html>
  );
}
