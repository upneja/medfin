import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { UserProfileProvider } from "@/hooks/useUserProfile";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MedFin — Your Financial Co-Pilot for Residency",
  description:
    "MedFin helps medical residents navigate student loans, build budgets, plan for PSLF, and project their financial future — all personalized to your program and specialty.",
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
        <UserProfileProvider>{children}</UserProfileProvider>
      </body>
    </html>
  );
}
