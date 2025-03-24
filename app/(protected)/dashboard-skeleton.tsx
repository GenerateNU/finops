import { GreetingIcon } from "@/components/greeting-icon";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getEnv, getGreeting } from "@/lib/utils";
import {
  ArrowRightIcon,
  CreditCardIcon,
  GitBranchIcon,
  MailboxIcon,
  MessageCircleIcon,
  PlusIcon,
  TagIcon,
  UsersIcon,
} from "lucide-react";
import Link from "next/link";

export function DashboardSkeleton() {
  return (
    <div className="mx-auto w-full max-w-(--breakpoint-lg) flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[45%_1fr_1fr] gap-4">
        <Card className="md:col-span-2 lg:col-span-1 flex flex-col bg-black text-white p-6 uppercase justify-end">
          <div className="ml-1 mb-2 font-mono text-sm inline-flex gap-2 items-center">
            <GreetingIcon className="size-4" />
            Hey <Skeleton className="inline w-[80px] h-4 bg-slate-100/90" />
          </div>
          <p className="font-mono font-bold text-6xl leading-0">
            {getGreeting()}!
          </p>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Onboarding</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <div className="inline-flex items-center gap-2 font-mono font-semibold uppercase text-sm leading-tight">
                <Skeleton className="size-6" />
                Submitted Onboarding
              </div>
              <div className="inline-flex items-center gap-2 font-mono font-semibold uppercase text-sm leading-tight">
                <Skeleton className="size-6" />
                Makerspace-Trained
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Spaces</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <div className="inline-flex items-center gap-2 font-mono font-semibold uppercase text-sm leading-tight">
                <Skeleton className="size-6 shrink-0" />
                Sherm Lobby Access
              </div>
              <div className="inline-flex items-center gap-2 font-mono font-semibold uppercase text-sm leading-tight">
                <Skeleton className="size-6 shrink-0" />
                Studio One Access
              </div>
              <div className="inline-flex items-center gap-2 font-mono font-semibold uppercase text-sm leading-tight">
                <Skeleton className="size-6 shrink-0" />
                Makerspace Access
              </div>
              <div className="inline-flex items-center gap-2 font-mono font-semibold uppercase text-sm leading-tight">
                <Skeleton className="size-6 shrink-0" />
                Booking Access
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_45%_1fr] gap-4">
        <Card>
          <CardHeader>
            <CardTitle>About Me</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <div className="inline-flex items-center gap-3 text-sm leading-tight">
                <CreditCardIcon className="size-5 shrink-0" />
                <Skeleton className="w-[80px] h-[12px]" />
              </div>
              <div className="inline-flex items-center gap-3 text-sm leading-tight">
                <MailboxIcon className="size-5 shrink-0" />
                <Skeleton className="w-full h-[12px]" />
              </div>
              <div className="inline-flex items-center gap-3 text-sm leading-tight">
                <TagIcon className="size-5 shrink-0" />
                <Skeleton className="w-[160px] h-[12px]" />
              </div>
              <div className="inline-flex items-center gap-3 text-sm leading-tight">
                <UsersIcon className="size-5 shrink-0" />
                <Skeleton className="w-[100px] h-[12px]" />
              </div>
              <div className="inline-flex items-center gap-3 text-sm leading-tight">
                <GitBranchIcon className="size-5 shrink-0" />
                <Skeleton className="w-[70px] h-[12px]" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <Button
                size="sm"
                variant="outline"
                before={<PlusIcon />}
                className="justify-start"
                asChild
              >
                <Link href="/orders/new">New Order</Link>
              </Button>
              <Button
                size="sm"
                variant="outline"
                before={<PlusIcon />}
                className="justify-start"
                asChild
              >
                <Link href="/reimbursements/new">New Reimbursement</Link>
              </Button>
              <Button
                size="sm"
                variant="outline"
                before={<MessageCircleIcon />}
                className="justify-start"
                asChild
              >
                <Link
                  href={getEnv("NEXT_PUBLIC_SLACK_HELP_CHANNEL_URL")}
                  target="_blank"
                >
                  Get Help
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-2">
          <Button
            size="lg"
            after={<ArrowRightIcon />}
            className="w-full"
            asChild
          >
            <Link href="/orders">View Orders</Link>
          </Button>
          <Button
            size="lg"
            after={<ArrowRightIcon />}
            className="w-full"
            asChild
          >
            <Link href="/reimbursements">View Reimbursements</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
