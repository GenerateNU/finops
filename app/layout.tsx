import type { Metadata } from "next";
import { Outfit, Space_Mono } from "next/font/google";

import { cn } from "@/lib/utils";

// import { SlackConnectionBanner } from "@/components/slack-connection-banner.tsx";
import { TooltipProvider } from "@/components/ui/tooltip";

import { auth } from "@/auth";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

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
          {session ? (
            <SidebarProvider>
              <AppSidebar session={session} />
              <SidebarInset>{children}</SidebarInset>
            </SidebarProvider>
          ) : (
            children
          )}
          {/* <div className="flex flex-col w-full min-h-screen"> */}
          {/* <SlackConnectionBanner /> */}
          {/* </div> */}
        </TooltipProvider>
      </body>
    </html>
  );
}
