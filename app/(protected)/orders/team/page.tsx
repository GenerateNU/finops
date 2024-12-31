import dayjs from "@/lib/dayjs";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Suspense } from "react";
import { TeamOrdersTable, TeamOrdersTableSkeleton } from "./table";

export default function TeamOrdersPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>My Team's Orders</CardTitle>
        <CardDescription>
          Your team's current and past order requests.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Suspense fallback={<TeamOrdersTableSkeleton />}>
          <TeamOrdersTable />
        </Suspense>
      </CardContent>

      <CardFooter className="flex flex-col items-start gap-4 px-6 py-4 border-t border-t-slate-200 dark:border-t-slate-800">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Last updated: {dayjs().format("MMMM Do [at] h:mm a")}
        </p>
      </CardFooter>
    </Card>
  );
}
