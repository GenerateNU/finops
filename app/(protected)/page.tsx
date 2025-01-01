import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";

import { getEnv } from "@/lib/utils";
import { InfoIcon } from "lucide-react";
import { DashboardSkeleton } from "./dashboard-skeleton";
import Dashboard from "./dashboard.server";

export default async function DashboardPage() {
  const session = await auth();
  if (!session) return redirect("/auth/login");

  return (
    <>
      <div className="w-full max-w-screen-lg bg-generate-blue text-white p-4 md:p-2 md:text-center rounded-lg shadow-sm mx-auto">
        <div className="flex flex-col md:flex-row gap-2 md:items-center md:justify-center font-medium font-mono uppercase text-sm">
          <InfoIcon className="mb-1 md:mb-0 size-6 md:size-4" />
          Orders are placed on {getEnv("NEXT_PUBLIC_ORDER_PLACEMENT_SCHEDULE")}.
        </div>
      </div>

      <Suspense fallback={<DashboardSkeleton />}>
        <Dashboard />
      </Suspense>
    </>
  );
}
