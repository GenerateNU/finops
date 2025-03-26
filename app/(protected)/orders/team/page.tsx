import dayjs from "@/lib/dayjs";

import { Metadata } from "next";
import { Suspense } from "react";
import { TeamOrdersTable, TeamOrdersTableSkeleton } from "./table";

export const metadata: Metadata = {
  title: "My Team's Orders",
};

export default function TeamOrdersPage() {
  return (
    <>
      <div className="grid w-full max-w-5xl gap-2">
        <h1 className="text-3xl font-semibold text-black dark:text-white">
          My Team's Orders
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          Your team's current and past orders.
        </p>
      </div>

      <Suspense fallback={<TeamOrdersTableSkeleton />}>
        <TeamOrdersTable />
      </Suspense>

      <div className="flex flex-col items-start gap-4 pt-3 border-t border-t-slate-200 dark:border-t-slate-800">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Last updated: {dayjs().format("MMMM Do [at] h:mm a")}
        </p>
      </div>
    </>
  );
}
