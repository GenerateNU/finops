import { auth } from "@/auth";
import { Breadcrumbs } from "@/components/breadcrumbs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (!session) return redirect("/auth/login");

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b">
        <div className="flex items-center gap-2 px-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <SidebarTrigger className="-ml-1" />
            </TooltipTrigger>
            <TooltipContent>Toggle sidebar</TooltipContent>
          </Tooltip>
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumbs rootTitle="Dashboard" />
        </div>
      </header>

      {!session.user.position ? (
        <AlertDialog open>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Please log out and back in</AlertDialogTitle>
              <AlertDialogDescription>
                New features are now available which require a fresh session.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex flex-row items-center justify-between! w-full gap-2">
              <p className="text-slate-500 text-sm">
                Reason:{" "}
                <code className="ml-1 text-xs bg-slate-100 px-2 py-1 rounded-xs">
                  NoPosition
                </code>
              </p>
              <AlertDialogAction asChild>
                <Link href="/api/auth/signout">Log Out</Link>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      ) : (
        ""
      )}

      <main className="flex flex-1 flex-col gap-4 bg-muted/40 p-4 md:p-7">
        {children}
      </main>

      <Toaster />
    </>
  );
}
