import {
  ArrowRightIcon,
  PlusCircleIcon,
  ReceiptTextIcon,
  SparklesIcon,
  Table2Icon,
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import dayjs from "@/lib/dayjs";
import {
  // createERVPacket,
  getReimbursementRequests,
} from "@/lib/drive/sheets";

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
import { z } from "zod";

export async function ReimbursementsTable() {
  const session = await auth();
  // TODO: ensure user has perms
  if (!session || !session.user) {
    return redirect("/auth/login");
  }

  const requests = await getReimbursementRequests();

  async function getERVPacket(data: FormData) {
    ("use server");

    const schema = z.object({
      filePrefix: z.string(),
      voucherFileId: z.string(),
      receiptFolderId: z.string(),
    });

    const formData = Object.fromEntries(data);
    const parsed = schema.safeParse(formData);

    if (!parsed.data) return;

    // await createERVPacket(
    //   parsed.data.filePrefix,
    //   parsed.data.voucherFileId,
    //   parsed.data.receiptFolderId
    // );
  }

  if (!requests || requests.length === 0) {
    return (
      <div className="flex items-center justify-center flex-1 p-8 border border-dashed rounded-lg shadow-xs border-slate-200 dark:border-slate-800">
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            There are no reimbursements
          </h3>
          <p className="text-sm text-slate-700 dark:text-slate-300">
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
        {requests.map((request) => (
          <TableRow key={request.id} className="bg-accent">
            <TableCell>{request.id}</TableCell>
            <TableCell>
              <div className="inline font-medium">
                {request.requester ?? "--"}
              </div>
              <div className="hidden text-xs leading-none lg:text-sm text-slate-600 dark:text-slate-400 md:block">
                {request.email ?? "--"}
              </div>
            </TableCell>
            <TableCell>
              <div className="hidden font-medium sm:inline">
                {request.branch ?? "--"}
              </div>
              <div className="leading-none sm:text-xs lg:text-sm sm:text-slate-600 sm:dark:text-slate-400">
                {request.team ?? "--"}
              </div>
            </TableCell>
            <TableCell className="hidden md:table-cell">
              {request.purpose ?? "--"}
            </TableCell>
            <TableCell className="hidden sm:table-cell">
              <Badge className="text-xs" variant="outline">
                {request.status ?? "Unknown"}
              </Badge>
            </TableCell>
            <TableCell
              className="hidden lg:table-cell"
              title={dayjs(request.purchased).format("ddd, MMM DD, YYYY")}
            >
              {dayjs(request.purchased).format("MMM DD") ?? "--"}
            </TableCell>
            <TableCell
              className="hidden md:table-cell"
              title={dayjs(request.submitted).format("ddd, MMM DD, YYYY")}
            >
              {dayjs(request.submitted).format("MMM DD") ?? "--"}
            </TableCell>
            <TableCell className="text-right whitespace-nowrap">
              {request.amount ?? "--"}
            </TableCell>
            <TableCell className="text-right">
              <div className="flex items-center gap-2 justify-end">
                {request.voucherFileId ? (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={getDriveUrl("sheet", request.voucherFileId)}
                        target="_blank"
                      >
                        <Table2Icon className="size-5 text-generate-green" />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>View voucher</p>
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  <Table2Icon className="size-5 text-slate-400 dark:text-slate-600" />
                )}

                {request.receiptsFolderId ? (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={getDriveUrl("folder", request.receiptsFolderId)}
                        target="_blank"
                      >
                        <ReceiptTextIcon
                          className={cn(
                            "size-5",
                            request.status === "Missing Receipt"
                              ? "text-slate-400"
                              : "text-generate-green"
                          )}
                        />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        {request.status === "Missing Receipt"
                          ? "Upload receipt"
                          : "View receipt"}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  <ReceiptTextIcon className="size-5 text-slate-400" />
                )}

                <ArrowRightIcon className="size-3 text-slate-400" />

                {/* <form className="flex items-center" action={getERVPacket}> */}
                <input
                  type="hidden"
                  name="filePrefix"
                  value={`ERV - ${dayjs(request.submitted).format(
                    "YYYY-MM-DD"
                  )} - ${request.requester}`}
                />
                <input
                  type="hidden"
                  name="voucherFileId"
                  value={request.voucherFileId}
                />
                <input
                  type="hidden"
                  name="receiptFolderId"
                  value={request.receiptsFolderId}
                />
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button type="submit">
                      <SparklesIcon className="size-5 text-generate-green" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Generate merged packet</p>
                  </TooltipContent>
                </Tooltip>
                {/* </form> */}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export const ReimbursementsTableSkeleton = () => (
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
            <Skeleton className="w-full h-3 mt-2" />
          </div>
        </TableCell>
        <TableCell>
          <div className="hidden sm:inline">
            <Skeleton className="w-full h-5" />
          </div>
          <div>
            <Skeleton className="w-full h-5 sm:mt-2 sm:h-3" />
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
