import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Management",
};

export default function ManagePage() {
  return redirect("/manage/reimbursements");
}
