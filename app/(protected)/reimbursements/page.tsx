import { Suspense } from "react";

import dayjs from "@/lib/dayjs";


import { MyReimbursementsTable, MyReimbursementsTableSkeleton } from "./table";

export default function MyReimbursementsPage() {
  return (
    <>
      <div className="grid w-full max-w-5xl gap-2">
        <h1 className="text-3xl font-semibold text-black dark:text-white">
          Personal Reimbursements
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          Your current and past reimbursement requests.
        </p>
      </div>

      <Suspense fallback={<MyReimbursementsTableSkeleton />}>
        <MyReimbursementsTable />
      </Suspense>

      <div className="flex flex-col items-start gap-4 pt-3 border-t border-t-slate-200 dark:border-t-slate-800">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Last updated: {dayjs().format("MMMM Do [at] h:mm a")}
        </p>
      </div>
    </>
  );
}
