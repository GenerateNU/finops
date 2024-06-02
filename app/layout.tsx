import { LockIcon, Menu } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { UserDropdown } from "@/components/user-dropdown";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Outfit, Space_Mono } from "next/font/google";
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
          "min-h-screen bg-background font-sans antialiased",
          outfit.variable,
          spaceMono.variable
        )}
      >
        <div className="flex flex-col w-full min-h-screen">
          <header className="sticky top-0 flex items-center h-16 gap-4 px-4 bg-white border-b bg-background md:px-6">
            <nav className="flex-col hidden gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
              <Link
                href="/"
                className="flex items-center gap-2 text-lg font-semibold md:text-base"
              >
                {/* <Package2 className="w-6 h-6" /> */}
                <span className="whitespace-nowrap">Generate FinOps</span>
              </Link>
              <Link
                href="/reimbursements/new"
                className="transition-colors text-muted-foreground hover:text-foreground"
              >
                Reimbursements
              </Link>
              <Link
                href="/manage"
                className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2"
              >
                Manage
                <LockIcon className="size-3 text-slate-400 dark:text-slate-600" />
              </Link>
            </nav>
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="shrink-0 md:hidden"
                >
                  <Menu className="w-5 h-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <nav className="grid gap-6 text-lg font-medium">
                  <Link
                    href="/"
                    className="flex items-center gap-2 text-lg font-semibold"
                  >
                    {/* <Package2 className="w-6 h-6" /> */}
                    <span className="sr-only">Generate FinOps</span>
                  </Link>
                  <Link
                    href="/reimbursements/new"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    Reimbursements
                  </Link>
                  <Link
                    href="/manage"
                    className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2"
                  >
                    Manage
                    <LockIcon className="size-3 text-slate-400 dark:text-slate-600" />
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>

            <div className="flex items-center w-full gap-4 md:ml-auto md:gap-2 lg:gap-4">
              <div className="flex-1 ml-auto sm:flex-initial"></div>
              <UserDropdown />
            </div>
          </header>

          {children}
        </div>
      </body>
    </html>
  );
}
