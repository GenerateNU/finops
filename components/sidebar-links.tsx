"use client";

import { cn } from "@/lib/utils";
import { NavLink } from "@/types";
import { Slot } from "@radix-ui/react-slot";
import Link from "next/link";
import { usePathname } from "next/navigation";

const LINK_ICON_CLASSES =
  "p-2 transition-all border rounded-md size-8 bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-primary group-hover:border-generate-green group-hover:bg-generate-green group-hover:bg-opacity-30";

export function SidebarLinks({ links }: { links: NavLink[] }) {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="flex flex-row gap-2.5 items-center group"
        >
          <Slot
            className={cn(
              LINK_ICON_CLASSES,
              pathname === link.href &&
                "border-generate-green bg-generate-green bg-opacity-30"
            )}
          >
            {link.icon}
          </Slot>
          <span
            className={cn(
              "inline-flex items-center gap-2 font-semibold text-primary flex-nowrap",
              pathname === link.href && "border-b border-b-generate-green"
            )}
          >
            {link.label}
          </span>
        </Link>
      ))}
    </>
  );
}
