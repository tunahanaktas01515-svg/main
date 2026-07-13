import type { Metadata } from "next";
import { Exo_2, Orbitron } from "next/font/google";
import { Providers } from "@/components/layout/Providers";
import "./globals.css";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const exo = Exo_2({
  variable: "--font-exo",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "MakerAI Hub — 3D Printing & RC Maker AI",
  description:
    "Modern AI platform for 3D printing and RC makers. STL analysis, smart model search, and maker assistant.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${orbitron.variable} ${exo.variable} h-full`}>
      <body className="min-h-full antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}