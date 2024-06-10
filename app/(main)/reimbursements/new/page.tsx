import { redirect } from "next/navigation";

import { auth } from "@/auth";

import { ExpenseVoucherForm } from "./form";

export default async function NewReimbursementPage() {
  const session = await auth();
  if (!session) return redirect("/auth/login");

  return (
    <div className="space-y-8">
      <div>
        <h2 className="inline-block pt-2 font-mono text-4xl text-black uppercase border-t-4 dark:text-white border-t-generate-green">
          Request Reimbursement
        </h2>
        <p className="max-w-xl mt-4 leading-snug text-slate-600 dark:text-slate-400">
          Request reimbursement for pre-approved Generate expenses personally
          incurred. Typically, these should only be <strong>morale</strong>
          -related purchases.
        </p>
      </div>

      <ExpenseVoucherForm session={session} />
    </div>
  );
}
