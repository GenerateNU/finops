import { getEnv } from "@/lib/utils";
import { OrderForm } from "./form";

export default async function NewOrderPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="inline-block pt-2 font-mono text-4xl text-black uppercase border-t-4 dark:text-white border-t-generate-green">
          Request Order
        </h2>
        <p className="max-w-xl mt-4 leading-snug text-slate-600 dark:text-slate-400">
          Request a product be ordered for your team.
          <br />
          Orders are placed {getEnv("NEXT_PUBLIC_ORDER_PLACEMENT_SCHEDULE")}.
        </p>
      </div>

      <OrderForm />
    </div>
  );
}
