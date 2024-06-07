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

import { DeleteFileForm } from "./delete-file-form";
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

        <CardFooter className="flex flex-col items-start gap-4 px-6 py-4 border-t border-t-slate-200 dark:border-t-slate-800">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Last updated: {dayjs().format("MMMM Do [at] h:mm a")}
          </p>
        </CardFooter>
      </Card>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Expense Vouchers</CardTitle>
            <CardDescription>All expense vouchers.</CardDescription>
          </CardHeader>

          <CardContent>
            <Suspense fallback={<VouchersTableSkeleton />}>
              <ExpenseVoucherFilesTable />
            </Suspense>
          </CardContent>

          <CardFooter className="flex flex-col items-start gap-4 px-6 py-4 border-t border-t-slate-200 dark:border-t-slate-800">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Last updated: {dayjs().format("MMMM Do [at] h:mm a")}
            </p>
          </CardFooter>
        </Card>

        <Card className="border-red-200">
          <CardHeader>
            <CardTitle>Delete File</CardTitle>
            <CardDescription>
              Permanently delete a file owned by the Generate FinOps service
              account.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <DeleteFileForm />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
