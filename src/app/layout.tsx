import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Jiawen Sun - Machine Learning, Systems, and Web Engineering",
  description: "Portfolio for Jiawen Sun, an Honors Computer Science student focused on machine learning, ASR, systems, GPU programming, and full-stack web projects.",
  keywords: "Jiawen Sun, machine learning, ASR, reinforcement learning, CUDA, C++, Python, TypeScript, React, Next.js, Express, MongoDB",
  authors: [{ name: "Jiawen Sun" }],
  openGraph: {
    title: "Jiawen Sun - Portfolio",
    description: "Machine learning, systems, GPU, and full-stack web projects by Jiawen Sun.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
