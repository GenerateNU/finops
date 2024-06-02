import { Suspense } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import dayjs from "@/lib/dayjs";

import { ReimbursementsTable, ReimbursementsTableSkeleton } from "./table";
import {
  ExpenseVoucherFilesTable,
  VouchersTableSkeleton,
} from "./vouchers-table";

export default function MyReimbursementsPage() {
  return (
    <>
      <Card>
        <CardHeader className="px-7">
          <CardTitle>Reimbursements</CardTitle>
          <CardDescription>
            All current and past reimbursement requests.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Suspense fallback={<ReimbursementsTableSkeleton />}>
            <ReimbursementsTable />
          </Suspense>
        </CardContent>

        <CardFooter className="flex flex-col items-start gap-4 px-6 py-4 border-t">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Last updated: {dayjs().format("MMMM Do [at] h:mm a")}
          </p>
        </CardFooter>
      </Card>

      <Card className="w-full md:max-w-lg">
        <CardHeader className="px-7">
          <CardTitle>Expense Vouchers</CardTitle>
          <CardDescription>All expense vouchers.</CardDescription>
        </CardHeader>

        <CardContent>
          <Suspense fallback={<VouchersTableSkeleton />}>
            <ExpenseVoucherFilesTable />
          </Suspense>
        </CardContent>

        <CardFooter className="flex flex-col items-start gap-4 px-6 py-4 border-t">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Last updated: {dayjs().format("MMMM Do [at] h:mm a")}
          </p>
        </CardFooter>
      </Card>
    </>
  );
}
