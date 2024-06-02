import { VoucherForm } from "@/app/(main)/requests/reimbursements/form";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function ReimbursementsPage() {
  const session = await auth();
  if (!session) return redirect("/auth/login");

  return (
    <>
      <VoucherForm session={session} />
      {/* <VoucherPoc /> */}
    </>
  );
}
