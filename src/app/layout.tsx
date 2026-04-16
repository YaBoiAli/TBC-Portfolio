import type { Metadata } from "next";
import { DM_Sans, Syne } from "next/font/google";
import "./globals.css";

const display = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ali Nawab — Tunnel Portfolio",
  description:
    "Computer Science student at UT Dallas — software engineering, ML systems, and infrastructure-minded builds.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="font-sans min-h-screen bg-void text-bone grain">
        {children}
      </body>
    </html>
  );
}
