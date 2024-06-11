import { auth, signOut } from "@/auth";

import { LogOutIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";

import groupPhoto from "@/images/group-photo.jpg";

export default async function AccessDenied() {
  const session = await auth();
  if (!session) {
    return redirect("/auth/login");
  }

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2">
            <h1 className="text-3xl font-bold">Access Denied</h1>
            <p className="text-slate-700 dark:text-slate-300">
              You do not have access to Generate FinOps. If you believe this is
              an error, please ensure you have completed all necessary Generate
              onboarding. Afterwards, please reach out in{" "}
              <Link href={process.env.NEXT_PUBLIC_SLACK_HELP_CHANNEL_URL!}>
                <code>#{process.env.NEXT_PUBLIC_SLACK_HELP_CHANNEL_NAME}</code>
              </Link>
              .
            </p>
          </div>

          <div>
            <form
              action={async () => {
                "use server";
                await signOut();
              }}
            >
              <Button type="submit" before={<LogOutIcon />}>
                Log Out
              </Button>
            </form>
          </div>
        </div>
      </div>

      <div className="hidden bg-[#187dff] lg:block">
        <Image
          src={groupPhoto}
          alt="Group photo"
          placeholder="blur"
          className="h-full w-full object-cover grayscale opacity-70 dark:opacity-100"
        />
      </div>
    </div>
  );
}
