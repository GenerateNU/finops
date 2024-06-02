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
import { PlusCircleIcon } from "lucide-react";
import Link from "next/link";

export default async function ReimbursementsTable() {
  const session = await auth();
  if (!session || !session.user || !session.user.email) {
    return redirect("/auth/login");
  }

  const requests = await getReimbursementRequests(session.user.email);

  if (!requests || requests.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm p-8">
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            You have no reimbursements
          </h3>
          <p className="text-sm text-muted-foreground">
            We don&rsquo;t have any records of reimbursement requests associated
            with your email address.
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
          {/* <TableHead>Purchaser</TableHead> */}
          <TableHead>ID</TableHead>
          <TableHead className="hidden sm:table-cell">Budget</TableHead>
          <TableHead className="hidden md:table-cell">Purpose</TableHead>
          <TableHead className="hidden sm:table-cell">Status</TableHead>
          <TableHead className="hidden md:table-cell">Purchased</TableHead>
          <TableHead className="hidden md:table-cell">Submitted</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {requests?.map((request, i) => (
          <TableRow key={i} className="bg-accent">
            <TableCell>{request.id}</TableCell>
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
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
