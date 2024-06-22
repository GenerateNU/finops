import type { Metadata } from "next";
import { Outfit, Space_Mono } from "next/font/google";

import { MainNavigation } from "@/components/main-navigation";
import { Toaster } from "@/components/ui/sonner";

import { cn } from "@/lib/utils";

import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});
const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Generate FinOps",
  description: "Making FinOps easier for everyone connected to Generate",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-white dark:bg-black font-sans antialiased",
          outfit.variable,
          spaceMono.variable
        )}
      >
        <TooltipProvider>
          <div className="flex flex-col w-full min-h-screen">
            <MainNavigation />

            {children}

            <Toaster />
          </div>
        </TooltipProvider>
      </body>
    </html>
  );
}
