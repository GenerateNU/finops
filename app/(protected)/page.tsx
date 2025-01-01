import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";

import { DashboardSkeleton } from "./dashboard-skeleton";
import Dashboard from "./dashboard.server";

export default async function DashboardPage() {
  const session = await auth();
  if (!session) return redirect("/auth/login");

  return (
    <>
      <React.Suspense fallback={<DashboardSkeleton />}>
        <Dashboard />
      </React.Suspense>
    </>
  );
}
