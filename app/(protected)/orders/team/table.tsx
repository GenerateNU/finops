import { redirect } from "next/navigation";

import { auth } from "@/auth";

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
import dayjs from "@/lib/dayjs";
import { getOrderRequests } from "@/lib/drive/orders";
import { PlusCircleIcon } from "lucide-react";
import Link from "next/link";

export async function TeamOrdersTable() {
  const session = await auth();
  if (!session || !session.user || !session.user.email) {
    return redirect("/auth/login");
  }

  const requests = await getOrderRequests({ team: session.user.team });

  if (!requests || requests.length === 0) {
    return (
      <div className="flex items-center justify-center flex-1 p-8 border border-dashed rounded-lg shadow-sm border-slate-200 dark:border-slate-800">
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            Your team has no orders
          </h3>
          <p className="text-sm text-slate">
            We don&rsquo;t have any records of order requests associated with
            your email address.
          </p>
          <Button className="mt-4" before={<PlusCircleIcon />} asChild>
            <Link href="/orders/new">Submit Request</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-slate-200 dark:border-slate-800 shadow-sm rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-100">
            <TableHead>ID</TableHead>
            <TableHead className="hidden sm:table-cell">Budget</TableHead>
            <TableHead>Item &amp; Vendor</TableHead>
            <TableHead>Status</TableHead>
            {/* <TableHead className="hidden md:table-cell">Purchased</TableHead> */}
            <TableHead>Submitted</TableHead>
            <TableHead className="text-right">Unit Cost</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {requests.map((request) => (
            <TableRow key={request.id} className="bg-accent">
              <TableCell>{request.id}</TableCell>
              <TableCell className="hidden sm:table-cell">
                <div className="inline font-medium">
                  {request.branch ?? "--"} &middot; {request.team ?? "--"}
                </div>
                <div className="text-xs lg:text-sm text-slate-600 dark:text-slate-400">
                  {request.purpose ?? "--"}
                </div>
              </TableCell>
              <TableCell>
                <div className="inline font-medium">
                  <span className="inline-block text-xs bg-slate-200 rounded-md px-2 py-0.5 mr-0.5">
                    {request.quantity ?? "0"}
                  </span>{" "}
                  {request.description ?? "--"}
                </div>
                <div className="text-xs lg:text-sm text-slate-600 dark:text-slate-400">
                  from {request.vendor ?? "Unknown Vendor"}
                </div>
              </TableCell>
              <TableCell>
                <Badge className="text-xs" variant="outline">
                  {request.status}
                </Badge>
              </TableCell>
              {/* <TableCell
              className="hidden md:table-cell"
              title={
                request.purchased
                  ? dayjs(request.purchased).format("ddd, MMM DD, YYYY")
                  : ""
              }
            >
              {request.purchased
                ? dayjs(request.purchased).format("MMM DD")
                : "N/A"}
            </TableCell> */}
              {/* <TableCell
              title={dayjs(request.submitted).format("ddd, MMM DD, YYYY")}
            >
              {dayjs(request.submitted).format("MMM DD") ?? "--"}
            </TableCell> */}
              <TableCell className="hidden sm:table-cell">
                <div
                  className="inline font-medium"
                  title={dayjs(request.submitted).format("ddd, MMM DD, YYYY")}
                >
                  {dayjs(request.submitted).format("MMM DD") ?? "--"}
                </div>
                <div className="text-xs lg:text-sm text-slate-600 dark:text-slate-400">
                  {request.requester ?? "Unknown Requester"}
                </div>
              </TableCell>
              <TableCell className="text-right whitespace-nowrap">
                {request.totalCost
                  ? request.totalCost
                  : request.expectedUnitCost}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export const TeamOrdersTableSkeleton = () => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>ID</TableHead>
        <TableHead className="hidden sm:table-cell">Budget</TableHead>
        <TableHead>Item &amp; Vendor</TableHead>
        <TableHead>Status</TableHead>
        {/* <TableHead className="hidden md:table-cell">Purchased</TableHead> */}
        <TableHead>Submitted</TableHead>
        <TableHead className="text-right">Unit Cost</TableHead>
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
        {/* <TableCell className="hidden md:table-cell">
          <Skeleton className="w-full h-5" />
        </TableCell> */}
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
