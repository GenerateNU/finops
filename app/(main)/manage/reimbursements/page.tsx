import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import dayjs from "@/lib/dayjs";
import { Suspense } from "react";
import { ReimbursementsTable } from "./table";

export default function MyReimbursementsPage() {
  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle>Reimbursements</CardTitle>
        <CardDescription>
          All current and past reimbursement requests.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Suspense fallback={<TableSkeleton />}>
          <ReimbursementsTable />
        </Suspense>
      </CardContent>

      <CardFooter className="flex flex-col items-start gap-4 px-6 py-4 border-t">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Last updated: {dayjs().format("MMMM Do [at] h:mm a")}
        </p>
      </CardFooter>
    </Card>
  );
}

const TableSkeleton = () => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>ID</TableHead>
        <TableHead>Purchaser</TableHead>
        <TableHead>Budget</TableHead>
        <TableHead className="hidden md:table-cell">Purpose</TableHead>
        <TableHead className="hidden sm:table-cell">Status</TableHead>
        <TableHead className="hidden lg:table-cell">Purchased</TableHead>
        <TableHead className="hidden md:table-cell">Submitted</TableHead>
        <TableHead className="text-right">Amount</TableHead>
        <TableHead></TableHead>
      </TableRow>
    </TableHeader>

    <TableBody>
      <TableRow className="bg-accent">
        <TableCell>
          <Skeleton className="w-full h-5" />
        </TableCell>
        <TableCell>
          <div className="inline">
            <Skeleton className="w-full h-5" />
          </div>
          <div className="hidden md:block">
            <Skeleton className="mt-2 w-full h-3" />
          </div>
        </TableCell>
        <TableCell>
          <div className="hidden sm:inline">
            <Skeleton className="w-full h-5" />
          </div>
          <div>
            <Skeleton className="sm:mt-2 w-full h-5 sm:h-3" />
          </div>
        </TableCell>
        <TableCell className="hidden md:table-cell">
          <Skeleton className="w-full h-5" />
        </TableCell>
        <TableCell className="hidden sm:table-cell">
          <Skeleton className="w-full h-5" />
        </TableCell>
        <TableCell className="hidden lg:table-cell">
          <Skeleton className="w-full h-5" />
        </TableCell>
        <TableCell className="hidden md:table-cell">
          <Skeleton className="w-full h-5" />
        </TableCell>
        <TableCell className="text-right">
          <Skeleton className="w-full h-5" />
        </TableCell>
        <TableCell className="text-right">
          <Skeleton className="w-full h-5 aspect-square" />
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
);
