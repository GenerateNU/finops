import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import dayjs from "@/lib/dayjs";
import { getMember } from "@/lib/sheets";
import { getEnv, getGreeting } from "@/lib/utils";
import {
  ArrowRightIcon,
  CheckCircle2Icon,
  CircleHelpIcon,
  CloudSunIcon,
  CreditCardIcon,
  GitBranchIcon,
  MailboxIcon,
  MessageCircleIcon,
  MoonStarIcon,
  PlusIcon,
  SunIcon,
  UsersIcon,
  XCircleIcon,
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await auth();
  if (!session || !session.user || !session.user.email) {
    return redirect("/auth/login");
  }

  const member = await getMember(session.user.email).catch(() =>
    redirect("/access-denied")
  );

  return (
    <>
      {/* <div className="p-4 mx-auto w-screen-md bg-slate-100">
        <pre className="text-xs break-all whitespace-pre-wrap">
          {JSON.stringify(session, null, 2)}
        </pre>
      </div> */}

      {/* <div className="p-4 mx-auto w-screen-md bg-slate-100">
        <pre className="text-xs break-all whitespace-pre-wrap">
          {JSON.stringify(member, null, 2)}
        </pre>
      </div> */}

      <div className="lg:mt-12 mx-auto w-full max-w-screen-lg p-4 flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[45%_1fr_1fr] gap-4">
          <Card className="md:col-span-2 lg:col-span-1 flex flex-col bg-black text-white p-6 uppercase justify-end">
            <p className="ml-1 mb-2 font-mono text-sm inline-flex gap-2 items-center">
              <GreetingIcon className="size-4" />
              Hey {member.fullName.split(" ")[0]},
            </p>
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
                  <Indicator predicate={member.orientationComplete} />
                  Attended Session
                </div>
                <div className="inline-flex items-center gap-2 font-mono font-semibold uppercase text-sm leading-tight">
                  <Indicator predicate={member.shermContractComplete} />
                  Submitted Sherm Space Contract
                </div>
                <div className="inline-flex items-center gap-2 font-mono font-semibold uppercase text-sm leading-tight">
                  <Indicator predicate={member.makerspaceTrainingComplete} />
                  Attended Makerspace Training
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
                  <Indicator predicate={member.generalShermAccess} />
                  General Sherm Access
                </div>
                <div className="inline-flex items-center gap-2 font-mono font-semibold uppercase text-sm leading-tight">
                  <Indicator predicate={member.makerspaceAccess} />
                  Makerspace Access
                </div>
                <div className="inline-flex items-center gap-2 font-mono font-semibold uppercase text-sm leading-tight">
                  <Indicator predicate={member.bookingAccess} />
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
                  {member.nuid}
                </div>
                <div className="inline-flex items-center gap-3 text-sm leading-tight">
                  <MailboxIcon className="size-5 shrink-0" />
                  {member.email}
                </div>
                <div className="inline-flex items-center gap-3 text-sm leading-tight">
                  <GitBranchIcon className="size-5 shrink-0" />
                  {member.branch}
                </div>
                <div className="inline-flex items-center gap-3 text-sm leading-tight">
                  <UsersIcon className="size-5 shrink-0" />
                  {member.team}
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
                  <Link href={getEnv("NEXT_PUBLIC_SLACK_HELP_CHANNEL_URL")}>
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
    </>
  );
}

function GreetingIcon({ className }: { className?: string }) {
  const currentHour = dayjs().hour();

  if (currentHour < 12) {
    return <SunIcon className={className} />;
  } else if (currentHour < 18) {
    return <CloudSunIcon className={className} />;
  }
  return <MoonStarIcon className={className} />;
}

function Indicator({ predicate }: { predicate: string }) {
  if (predicate && predicate.toLowerCase() === "true") {
    return <CheckCircle2Icon className="text-generate-green size-6 shrink-0" />;
  } else if (predicate && predicate.toLowerCase() === "false") {
    return <XCircleIcon className="text-generate-red size-6 shrink-0" />;
  }
  return <CircleHelpIcon className="text-generate-gold size-6 shrink-0" />;
}
