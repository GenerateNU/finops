import { ArrowUpRightIcon, PlusCircleIcon, Table2Icon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { getExpenseVoucherFiles } from "@/lib/sheets";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export async function ExpenseVoucherFilesTable() {
  const session = await auth();
  // TODO: ensure user has perms
  if (!session || !session.user) {
    return redirect("/auth/login");
  }

  const vouchers = await getExpenseVoucherFiles();

  if (!vouchers || !vouchers.files || vouchers.files.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm p-8">
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            There are no expense vouchers
          </h3>
          <p className="text-sm text-muted-foreground">
            We don&rsquo;t currently have any records of expense vouchers.
          </p>
          <Button className="mt-4" before={<PlusCircleIcon />} asChild>
            <Link href="/reimbursements/new">Submit Request</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>File Name</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {vouchers.files.map((voucher) => (
          <TableRow key={voucher.id} className="bg-accent">
            <TableCell className="font-semibold leading-tight">
              <div className="flex items-center gap-2">
                {voucher.mimeType ===
                "application/vnd.google-apps.spreadsheet" ? (
                  <Table2Icon className="size-5 p-1 rounded-md bg-generate-green text-white" />
                ) : null}
                {voucher.name}
              </div>
            </TableCell>
            <TableCell className="text-right">
              <Link
                href={`https://docs.google.com/spreadsheets/d/${voucher.id}`}
                target="_blank"
                className="inline-flex gap-1.5 items-center text-generate-green font-mono uppercase font-semibold hover:bg-generate-green hover:text-white transition-colors px-1 rounded-sm text-base"
              >
                Open
                <ArrowUpRightIcon className="size-5" />
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export const VouchersTableSkeleton = () => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>File Name</TableHead>
        <TableHead></TableHead>
      </TableRow>
    </TableHeader>

    <TableBody>
      <TableRow className="bg-accent">
        <TableCell className="font-semibold">
          <div className="flex items-center gap-2">
            <Skeleton className="size-5" />
            <Skeleton className="w-full h-5" />
          </div>
        </TableCell>
        <TableCell className="text-right">
          <Skeleton className="w-full h-5" />
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
);
