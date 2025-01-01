import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";

import { DashboardSkeleton } from "./dashboard-skeleton";
import Dashboard from "./dashboard.server";

export default async function DashboardPage() {
  const session = await auth();
  if (!session) return redirect("/auth/login");

  return (
    <>
      <Suspense fallback={<DashboardSkeleton />}>
        <Dashboard />
      </Suspense>
    </>
  );
}
