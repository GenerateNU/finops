import { redirect } from "next/navigation";

import { auth } from "@/auth";

import { OrderForm } from "./form";

export default async function NewOrderPage() {
  const session = await auth();
  if (!session) return redirect("/auth/login");

  return <OrderForm session={session} />;
}
