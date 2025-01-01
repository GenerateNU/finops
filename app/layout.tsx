import type { Metadata } from "next";
import { Outfit, Space_Mono } from "next/font/google";

import { cn } from "@/lib/utils";

// import { SlackConnectionBanner } from "@/components/slack-connection-banner.tsx";
import { TooltipProvider } from "@/components/ui/tooltip";

import { auth } from "@/auth";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
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
              <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2">
                  <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <Breadcrumb>
                      <BreadcrumbList>
                        <BreadcrumbItem className="hidden md:block">
                          <BreadcrumbLink href="#">
                            Building Your Application
                          </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator className="hidden md:block" />
                        <BreadcrumbItem>
                          <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                        </BreadcrumbItem>
                      </BreadcrumbList>
                    </Breadcrumb>
                  </div>
                </header>

                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                  {children}
                </div>
              </SidebarInset>
            </SidebarProvider>
          ) : (
            children
          )}
          {/* <div className="flex flex-col w-full min-h-screen"> */}
          {/* <MainNavigation /> */}
          {/* <SlackConnectionBanner /> */}

          {/* {children} */}
          {/* </div> */}
        </TooltipProvider>
      </body>
    </html>
  );
}
