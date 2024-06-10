import { ConstructionIcon } from "lucide-react";
import { redirect } from "next/navigation";

import { auth } from "@/auth";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { OrderForm } from "./form";

export default async function NewOrderPage() {
  const session = await auth();
  if (!session) return redirect("/auth/login");

  return (
    <div className="space-y-8">
      <div>
        <h2 className="inline-block pt-2 font-mono text-4xl text-black uppercase border-t-4 border-t-generate-green">
          Request Order
        </h2>
        <p className="text-slate-700">
          Request a product be ordered for your team.
        </p>
      </div>

      <Alert variant="destructive">
        <ConstructionIcon className="size-4" />
        <AlertTitle className="font-semibold">Work in Progress</AlertTitle>

        <AlertDescription>
          This form is a work-in-progress and is subject to change. Submissions
          will not be saved and will not be processed.
        </AlertDescription>
      </Alert>

      <OrderForm session={session} />
    </div>
  );
}
