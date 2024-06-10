"use client";

import { PlusIcon, StretchHorizontalIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { NavLink } from "@/types";

const LINK_ICON_CLASSES =
  "p-2 transition-all border rounded-md size-8 bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-primary group-hover:border-generate-green group-hover:bg-generate-green group-hover:bg-opacity-30";

const NAV_LINKS: NavLink[] = [
  {
    href: "/reimbursements",
    label: "My Reimbursements",
    icon: StretchHorizontalIcon,
  },
  {
    href: "/reimbursements/new",
    label: "Submit Request",
    icon: PlusIcon,
  },
];

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <>
      <div className="grid w-full max-w-6xl gap-2 mx-auto">
        <h1 className="text-3xl font-semibold text-black dark:text-white">
          Reimbursements
        </h1>
      </div>

      <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        <nav className="grid gap-4 text-sm text-slate-600 dark:text-slate-400">
          {NAV_LINKS.map((link) => {
            const Icon = link.icon;

            return (
              <Link
                key={link.href}
                href={link.href}
                className="flex flex-row gap-2.5 items-center group"
              >
                <Icon
                  className={cn(
                    LINK_ICON_CLASSES,
                    pathname === link.href &&
                      "border-generate-green bg-generate-green bg-opacity-30"
                  )}
                />
                <span
                  className={cn(
                    "inline-flex items-center gap-2 font-semibold text-primary flex-nowrap",
                    pathname === link.href && "border-b border-b-generate-green"
                  )}
                >
                  {link.label}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="grid gap-6">{children}</div>
      </div>
    </>
  );
}
