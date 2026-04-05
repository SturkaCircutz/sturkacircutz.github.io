import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Jiawen Sun | Portfolio",
  description:
    "Portfolio of Jiawen Sun featuring low-level programming, RISC-V and assembly, LLM training, algorithms, and computer architecture work.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
