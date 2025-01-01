"use client";

import {
  BookTextIcon,
  BoxesIcon,
  ChartColumnBig,
  CoinsIcon,
  LockIcon,
  MessageSquare,
  Send,
} from "lucide-react";
import * as React from "react";

import { NavMain } from "@/components/sidebar/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { getEnv } from "@/lib/utils";
import { UserRole } from "@/types";
import { Session } from "next-auth";
import Link from "next/link";
import OpsLogo from "../ops-logo";
import { NavQuicklinks } from "./nav-quicklinks";
import { NavUser } from "./nav-user";

const data = {
  navMain: [
    {
      title: "Orders",
      url: "/orders",
      icon: BoxesIcon,
      addNew: {
        url: "/orders/new",
        title: "Submit New Order",
      },
      items: [
        {
          title: "Personal",
          url: "/orders",
        },
        {
          title: "Team",
          url: "/orders/team",
        },
      ],
    },
    {
      title: "Reimbursements",
      url: "/reimbursements",
      icon: CoinsIcon,
      addNew: {
        url: "/reimbursements/new",
        title: "Submit New Reimbursement",
      },
    },
    {
      title: "Manage",
      url: "/manage",
      icon: LockIcon,
      adminOnly: true,
    },
  ],
  quicklinks: [
    {
      title: "Wiki",
      url: getEnv("NEXT_PUBLIC_WIKI_PROCUREMENT_URL"),
      icon: BookTextIcon,
    },
    {
      title: "Propose Expense",
      url: getEnv("NEXT_PUBLIC_BUDGET_BALANCES_SHEET_URL"),
      icon: Send,
    },
    {
      title: "Budget Balances",
      url: getEnv("NEXT_PUBLIC_BUDGET_BALANCES_SHEET_URL"),
      icon: ChartColumnBig,
      role: "PL",
    },
    {
      title: "Ask a Question",
      url: getEnv("NEXT_PUBLIC_SLACK_HELP_CHANNEL_URL"),
      icon: MessageSquare,
    },
  ],
};

export function AppSidebar({
  session,
  ...props
}: { session: Session | null } & React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-transparent">
                  <OpsLogo className="size-6" />
                </div>
                <div className="grid flex-1 text-left text-lg leading-tight">
                  <span className="truncate font-semibold">
                    Generate FinOps
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          items={data.navMain}
          adminOnly={session?.user.role === UserRole.ADMIN}
        />
        <NavQuicklinks items={data.quicklinks} session={session} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser session={session} />
      </SidebarFooter>
    </Sidebar>
  );
}
