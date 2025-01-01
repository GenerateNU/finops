import React from "react";
import { DashboardSkeleton } from "./dashboard-skeleton";
import Dashboard from "./dashboard.server";

export default async function DashboardPage() {
  return (
    <>
      <React.Suspense fallback={<DashboardSkeleton />}>
        <Dashboard />
        {/* <NeverResolvingComponent /> */}
      </React.Suspense>
    </>
  );
}

const NeverResolvingComponent = () => {
  throw new Promise(() => {}); // Never resolves
};
