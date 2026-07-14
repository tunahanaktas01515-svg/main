import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "MakerAI Hub — The AI copilot for 3D printing",
    template: "%s · MakerAI Hub",
  },
  description:
    "Upload an STL, STEP or F3D model and let MakerAI estimate filament, suggest colors, tune slicer settings and grade your 3D printing project in seconds.",
  keywords: [
    "3D printing",
    "STL analysis",
    "AI",
    "filament calculator",
    "slicer settings",
    "STEP",
    "F3D",
  ],
  applicationName: "MakerAI Hub",
};

export const viewport: Viewport = {
  themeColor: "#05070d",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div className="app-backdrop" aria-hidden />
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
