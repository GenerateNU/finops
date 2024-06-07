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
      <div className="flex items-center justify-center flex-1 p-8 border border-dashed rounded-lg shadow-sm border-slate-200 dark:border-slate-800">
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            There are no expense vouchers
          </h3>
          <p className="text-sm text-slate-700 dark:text-slate-300">
            We don&rsquo;t currently have any active expense vouchers.
          </p>
          <Button className="mt-4" before={<PlusCircleIcon />} asChild>
            <Link href="/reimbursements/new">Create Voucher</Link>
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
              <div className="flex items-start gap-2">
                {voucher.mimeType ===
                "application/vnd.google-apps.spreadsheet" ? (
                  <Table2Icon className="p-1 text-white rounded-md size-5 bg-generate-green shrink-0" />
                ) : null}
                <div>
                  {voucher.name}
                  <small className="block font-normal text-xs mt-0.5 text-slate-500 dark:text-slate-400">
                    ID: {voucher.id}
                  </small>
                </div>
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
