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
        <TableHead className="hidden sm:table-cell">Budget</TableHead>
        <TableHead className="hidden md:table-cell">Purpose</TableHead>
        <TableHead className="hidden sm:table-cell">Status</TableHead>
        <TableHead className="hidden md:table-cell">Purchased</TableHead>
        <TableHead className="hidden md:table-cell">Submitted</TableHead>
        <TableHead className="text-right">Amount</TableHead>
      </TableRow>
    </TableHeader>

    <TableBody>
      <TableRow className="bg-accent">
        <TableCell>
          <Skeleton className="w-full h-5" />
        </TableCell>
        <TableCell className="hidden sm:table-cell">
          <div className="font-medium">
            <Skeleton className="w-full h-5" />
          </div>
          <div className="hidden text-sm text-muted-foreground md:inline">
            <Skeleton className="mt-2 w-full h-3" />
          </div>
        </TableCell>
        <TableCell className="hidden sm:table-cell">
          <div className="font-medium">
            <Skeleton className="w-full h-5" />
          </div>
          <div className="hidden text-sm text-muted-foreground md:inline">
            <Skeleton className="mt-2 w-full h-3" />
          </div>
        </TableCell>
        <TableCell className="hidden md:table-cell">
          <Skeleton className="w-full h-5" />
        </TableCell>
        <TableCell className="hidden sm:table-cell">
          <Skeleton className="w-full h-5" />
        </TableCell>
        <TableCell className="hidden md:table-cell">
          <Skeleton className="w-full h-5" />
        </TableCell>
        <TableCell className="hidden md:table-cell">
          <Skeleton className="w-full h-5" />
        </TableCell>
        <TableCell className="text-right">
          <Skeleton className="w-full h-5" />
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
);
