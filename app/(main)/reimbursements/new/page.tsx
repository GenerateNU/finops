import { redirect } from "next/navigation";

import { auth } from "@/auth";

import { VoucherForm } from "./form";

export default async function ReimbursementsPage() {
  const session = await auth();
  if (!session) return redirect("/auth/login");

  return (
    <>
      <VoucherForm session={session} />
    </>
  );
}
