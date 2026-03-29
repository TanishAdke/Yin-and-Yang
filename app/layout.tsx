import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// 1. Import the new Cursor Trail component
import CursorTrail from "@/components/CursorTrail";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Feel free to update this title to "Tanish Adke | Portfolio" when you are ready!
export const metadata: Metadata = {
  title: "Zenith Portfolio", 
  description: "A showcase of my creative and programming projects, blending cinematic storytelling with interactive web experiences.",
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
      <body className="min-h-full flex flex-col">
        {/* 2. Drop the cursor right here before your page content */}
        <CursorTrail />
        {children}
      </body>
    </html>
  );
}