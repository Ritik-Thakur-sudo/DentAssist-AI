import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import UserSync from "@/components/UserSync";
import TanStackProvider from "@/components/providers/TanStackProvider";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DENTASSIST - AI Powered Dental Assistant",
  description:
    "Get instant dental advice through voice calls with our AI assistant.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
      >
        <TanStackProvider>
          <ClerkProvider appearance={{
            variables: {
              colorPrimary: "#e78a53",
              colorBackground: "#f3f4f6",
              colorText: "#111827",
              colorTextSecondary: "#6b7280",
              colorInputBackground: "#f3f4f6",
            }
          }}>
            <TooltipProvider>
              <UserSync />
              <Toaster />
              {children}
            </TooltipProvider>
          </ClerkProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}