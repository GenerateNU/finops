import { redirect } from "next/navigation";

import { auth } from "@/auth";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ConstructionIcon } from "lucide-react";
import { OrderForm } from "./form";

export default async function NewOrderPage() {
  const session = await auth();
  if (!session) return redirect("/auth/login");

  return (
    <>
      <Alert variant="destructive">
        <ConstructionIcon className="size-4" />
        <AlertTitle className="font-semibold">Work in Progress</AlertTitle>

        <AlertDescription>
          This form is a work-in-progress and is subject to change. Submissions
          will not be saved and will not be processed.
        </AlertDescription>
      </Alert>

      <OrderForm session={session} />
    </>
  );
}
