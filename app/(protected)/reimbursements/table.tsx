import {
  ArrowUpRightIcon,
  FileWarningIcon,
  PlusCircleIcon,
  ReceiptTextIcon,
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Fragment } from "react";

import { auth } from "@/auth";
import dayjs from "@/lib/dayjs";
import { getReimbursementRequests } from "@/lib/drive/sheets";

import { Badge } from "@/components/ui/badge";
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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn, getDriveUrl } from "@/lib/utils";

export async function MyReimbursementsTable() {
  const session = await auth();
  if (!session || !session.user || !session.user.email) {
    return redirect("/auth/login");
  }

  const requests = await getReimbursementRequests(session.user.email);

  if (!requests || requests.length === 0) {
    return (
      <div className="flex items-center justify-center flex-1 p-8 border border-dashed rounded-lg shadow-sm border-slate-200 dark:border-slate-800">
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            You have no reimbursements
          </h3>
          <p className="text-sm text-slate">
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
          <TableHead>ID</TableHead>
          <TableHead className="hidden sm:table-cell">Budget</TableHead>
          <TableHead>Purpose</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="hidden md:table-cell">Purchased</TableHead>
          <TableHead>Submitted</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {requests.map((request) => (
          <Fragment key={request.id}>
            <TableRow
              className={cn(
                request.status === "Missing Receipt" && request.receiptsFolderId
                  ? "border-b-transparent pb-0 bg-slate-50"
                  : ""
              )}
            >
              <TableCell>{request.id}</TableCell>
              <TableCell className="hidden sm:table-cell">
                <div className="inline font-medium">
                  {request.branch ?? "--"}
                </div>
                <div className="text-xs lg:text-sm text-slate-600 dark:text-slate-400">
                  {request.team ?? "--"}
                </div>
              </TableCell>
              <TableCell>{request.purpose ?? "--"}</TableCell>
              <TableCell>
                <Badge className="text-xs" variant="outline">
                  {request.status ?? "Unknown"}
                </Badge>
              </TableCell>
              <TableCell
                className="hidden md:table-cell"
                title={dayjs(request.purchased).format("ddd, MMM DD, YYYY")}
              >
                {dayjs(request.purchased).format("MMM DD") ?? "--"}
              </TableCell>
              <TableCell
                title={dayjs(request.submitted).format("ddd, MMM DD, YYYY")}
              >
                {dayjs(request.submitted).format("MMM DD") ?? "--"}
              </TableCell>
              <TableCell className="text-right whitespace-nowrap">
                {request.amount ?? "--"}
              </TableCell>
              <TableCell className="text-right">
                {request.status !== "Missing Receipt" &&
                request.receiptsFolderId ? (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={getDriveUrl("folder", request.receiptsFolderId)}
                        target="_blank"
                      >
                        <ReceiptTextIcon className="size-5 text-generate-green" />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>View receipt</p>
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <FileWarningIcon className="size-5 text-slate-400 dark:text-slate-600" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>No receipt uploaded</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              </TableCell>
            </TableRow>

            {request.status === "Missing Receipt" &&
            request.receiptsFolderId ? (
              <TableRow className="bg-slate-50 dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-generate-red">
                <TableCell className="pt-0"></TableCell>
                <TableCell colSpan={7} className="pt-0">
                  <p className="font-semibold">
                    Please{" "}
                    <Link
                      href={getDriveUrl("folder", request.receiptsFolderId)}
                      target="_blank"
                      className="inline-flex items-center gap-0.5 text-generate-red underline hover:opacity-75"
                    >
                      upload
                      <ArrowUpRightIcon className="size-3" />
                    </Link>{" "}
                    your itemized receipt.
                  </p>
                </TableCell>
              </TableRow>
            ) : null}
          </Fragment>
        ))}
      </TableBody>
    </Table>
  );
}

export const MyReimbursementsTableSkeleton = () => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>ID</TableHead>
        <TableHead className="hidden sm:table-cell">Budget</TableHead>
        <TableHead>Purpose</TableHead>
        <TableHead>Status</TableHead>
        <TableHead className="hidden md:table-cell">Purchased</TableHead>
        <TableHead>Submitted</TableHead>
        <TableHead className="text-right">Amount</TableHead>
      </TableRow>
    </TableHeader>

    <TableBody>
      <TableRow className="bg-accent">
        <TableCell>
          <Skeleton className="w-full h-5" />
        </TableCell>
        <TableCell className="hidden sm:table-cell">
          <div>
            <Skeleton className="w-full h-5" />
          </div>
          <div>
            <Skeleton className="w-full h-3 mt-2" />
          </div>
        </TableCell>
        <TableCell>
          <Skeleton className="w-full h-5" />
        </TableCell>
        <TableCell>
          <Skeleton className="w-full h-5" />
        </TableCell>
        <TableCell className="hidden md:table-cell">
          <Skeleton className="w-full h-5" />
        </TableCell>
        <TableCell>
          <Skeleton className="w-full h-5" />
        </TableCell>
        <TableCell className="text-right">
          <Skeleton className="w-full h-5" />
        </TableCell>
      </TableRow>
    </TableBody>
  </Table>
);
