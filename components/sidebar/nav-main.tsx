"use client";

import { PlusIcon, type LucideIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { UserRole } from "@/types";
import { Session } from "next-auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export function NavMain({
  items,
  session,
}: {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
    adminOnly?: boolean;
    addNew?: {
      url: string;
      title: string;
    };
    items?: {
      title: string;
      url: string;
    }[];
  }[];
  session: Session | null;
}) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => {
          if (
            item.adminOnly &&
            !session?.user.role
              .split("|")
              .map((r) => r.toLowerCase())
              .includes(UserRole.ADMIN)
          )
            return null;

          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild tooltip={item.title}>
                <Link href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
              {item.addNew ? (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <SidebarMenuAction
                      className="data-[state=open]:rotate-90"
                      asChild
                    >
                      <Link href={item.addNew.url}>
                        <PlusIcon />
                        <span className="sr-only">Toggle</span>
                      </Link>
                    </SidebarMenuAction>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{item.addNew.title}</p>
                  </TooltipContent>
                </Tooltip>
              ) : null}

              {item.items?.length ? (
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton
                        asChild
                        isActive={pathname === subItem.url}
                      >
                        <Link href={subItem.url}>
                          <span>{subItem.title}</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              ) : null}
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
