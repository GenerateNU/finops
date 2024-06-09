import { LockIcon, Menu } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { UserDropdown } from "./user-dropdown";

type Link = {
  href: string;
  label: string;
};

const LINKS = [
  {
    href: "/orders/new",
    label: "Orders",
  },
  {
    href: "/reimbursements/new",
    label: "Reimbursements",
  },
];

export const MainNavigation = () => (
  <header className="sticky top-0 z-10 flex items-center h-16 gap-4 px-4 bg-white border-b border-b-slate-100 dark:border-b-slate-900 dark:bg-black bg-background md:px-6">
    <nav className="flex-col hidden gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
      <Link
        href="/"
        className="flex items-center gap-2 text-lg font-semibold md:text-base"
      >
        {/* <Package2 className="w-6 h-6" /> */}
        <span className="text-black whitespace-nowrap dark:text-white">
          Generate FinOps
        </span>
      </Link>
      {LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="transition-colors text-slate-600 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
        >
          {link.label}
        </Link>
      ))}
      <Link
        href="/manage"
        className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
      >
        Manage
        <LockIcon className="size-3 text-slate-400 dark:text-slate-600" />
      </Link>
    </nav>

    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="w-5 h-5 text-slate-800 dark:text-slate-200" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <nav className="grid gap-6 text-lg font-medium">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-semibold"
          >
            <span className="sr-only">Generate FinOps</span>
          </Link>
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-slate-600 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/manage"
            className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
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
);
