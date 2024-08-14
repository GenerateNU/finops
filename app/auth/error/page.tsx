"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getEnv } from "@/lib/utils";
import { ArrowRightIcon, SlackIcon } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

enum Error {
  Configuration = "Configuration",
  AccessDenied = "AccessDenied",
  Verification = "Verification",
  Default = "Default",
}

const errorMap = {
  [Error.Configuration]:
    "There was a problem when trying to authenticate. Please contact us if this error persists.",
  [Error.AccessDenied]:
    "You do not have access to Generate FinOps. Please make sure you completed all onboarding.",
  [Error.Verification]:
    "Your authentication request has expired. Please try logging in again.",
  [Error.Default]: "Please contact us if this error persists.",
};

export default function AuthErrorPage() {
  const search = useSearchParams();
  const error = search.get("error") as Error;

  return (
    <>
      <div className="grid gap-2">
        <h1 className="text-3xl font-bold">Something went wrong</h1>

        <p className="text-slate-700 dark:text-slate-300">
          {errorMap[error] || "Please contact us if this error persists."}
        </p>
      </div>

      <div>
        <Button type="submit" before={<SlackIcon />} asChild>
          <Link href={getEnv("NEXT_PUBLIC_SLACK_HELP_CHANNEL_URL")}>
            Contact Us <ArrowRightIcon className="size-3" /> #
            {getEnv("NEXT_PUBLIC_SLACK_HELP_CHANNEL_NAME")}
          </Link>
        </Button>

        <Separator className="mt-8 mb-3" />

        <p className="text-slate-500 text-sm">
          Error code:{" "}
          <code className="ml-1 text-xs bg-slate-100 px-2 py-1 rounded-sm">
            {error || "Unknown"}
          </code>
        </p>
      </div>
    </>
  );
}
