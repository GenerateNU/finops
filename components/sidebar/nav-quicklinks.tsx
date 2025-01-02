"use client";

import { type LucideIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Session } from "next-auth";
import Link from "next/link";

export function NavQuicklinks({
  items,
  session,
}: {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
    role?: string;
    openNewTab?: boolean;
  }[];
  session: Session | null;
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Quicklinks</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          if (item.role && !session?.user.role.split("|").includes(item.role))
            return null;

          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild tooltip={item.title}>
                <Link
                  href={item.url}
                  target={item.openNewTab ? "_blank" : undefined}
                >
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
