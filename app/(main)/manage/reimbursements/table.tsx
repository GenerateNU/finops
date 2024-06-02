import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { getReimbursementRequests } from "@/lib/sheets";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import dayjs from "@/lib/dayjs";
import { PlusCircleIcon, Table2Icon } from "lucide-react";
import Link from "next/link";

export async function ReimbursementsTable() {
  const session = await auth();
  // TODO: ensure user has perms
  if (!session || !session.user) {
    return redirect("/auth/login");
  }

  const requests = await getReimbursementRequests();
  console.log(requests);

  if (!requests || requests.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm p-8">
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            There are no reimbursements
          </h3>
          <p className="text-sm text-muted-foreground">
            We don&rsquo;t currently have any records of reimbursement requests.
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
          <TableHead>ID</TableHead>
          <TableHead>Purchaser</TableHead>
          <TableHead className="hidden sm:table-cell">Budget</TableHead>
          <TableHead className="hidden md:table-cell">Purpose</TableHead>
          <TableHead className="hidden sm:table-cell">Status</TableHead>
          <TableHead className="hidden md:table-cell">Purchased</TableHead>
          <TableHead className="hidden md:table-cell">Submitted</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {requests?.map((request, i) => (
          <TableRow key={i} className="bg-accent">
            <TableCell>{request.id}</TableCell>
            <TableCell className="hidden sm:table-cell">
              <div className="font-medium">{request.requester ?? "--"}</div>
              <div className="hidden text-sm text-muted-foreground md:inline">
                {request.email ?? "--"}
              </div>
            </TableCell>
            <TableCell className="hidden sm:table-cell">
              <div className="font-medium">{request.branch ?? "--"}</div>
              <div className="hidden text-sm text-muted-foreground md:inline">
                {request.team ?? "--"}
              </div>
            </TableCell>
            <TableCell className="hidden md:table-cell">
              {request.purpose ?? "--"}
            </TableCell>
            <TableCell className="hidden sm:table-cell">
              <Badge className="text-xs" variant="outline">
                Pending
              </Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell">
              {dayjs(request.purchased).format("YYYY-MM-DD") ?? "--"}
            </TableCell>
            <TableCell className="hidden md:table-cell">
              {dayjs(request.submitted).format("YYYY-MM-DD") ?? "--"}
            </TableCell>
            <TableCell className="text-right">
              {request.amount ?? "--"}
            </TableCell>
            <TableCell className="text-right">
              <div className="inline-flex gap-4 items-center">
                {request.voucherFileId ? (
                  <Link
                    href={`https://docs.google.com/spreadsheets/d/${request.voucherFileId}`}
                    target="_blank"
                  >
                    <Table2Icon className="size-5 text-generate-green" />
                  </Link>
                ) : (
                  <Table2Icon className="size-5 text-slate-400 dark:text-slate-600" />
                )}

                {/* <Link
                  href={`https://docs.google.com/spreadsheets/d/${request.voucherFileId}`}
                  target="_blank"
                >
                  <ReceiptTextIcon className="size-5 text-generate-green" />
                </Link> */}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
