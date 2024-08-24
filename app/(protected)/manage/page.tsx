import { redirect } from "next/navigation";

export default function ManagePage() {
  return redirect("/manage/reimbursements");
}
