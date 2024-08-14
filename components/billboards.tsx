import { Card } from "@/components/ui/card";
import { Slot } from "@radix-ui/react-slot";
import {
  ArrowRightIcon,
  ReceiptIcon,
  ShoppingBag,
  ShoppingBagIcon,
  ShoppingBasketIcon,
  ShoppingCartIcon,
} from "lucide-react";
import Link from "next/link";

export function Billboards() {
  return (
    <div className="p-6 pt-4 rounded-xl bg-slate-100 border border-generate-black">
      <h2 className="font-mono text-lg uppercase mb-3">Quick Actions</h2>

      <div className="grid grid-cols-2 gap-4">
        <Billboard
          href="/orders/new"
          text="Place Order"
          icon={<ShoppingBagIcon />}
        />
        <Billboard
          href="/reimbursements/new"
          text="Request Payment"
          icon={<ReceiptIcon />}
        />
      </div>
    </div>
  );
}

export function Billboard({
  href,
  text,
  icon,
}: {
  href: string;
  text: string;
  icon: React.ReactElement<HTMLElement>;
}) {
  return (
    <Link href={href}>
      <Card className="flex flex-col md:flex-row md:items-center md:justify-start gap-3 rounded-lg bg-slate-100 text-generate-black overflow-clip uppercase shadow-none border-generate-black group">
        <div className="bg-generate-black p-3 w-max rounded-l-md">
          <Slot className="text-white size-6">{icon}</Slot>
        </div>

        <div className="flex flex-row gap-2 items-center">
          <p className="font-mono font-bold text-2xl leading-0">{text}</p>
          <ArrowRightIcon className="opacity-0 group-hover:opacity-100 text-slate-500 transition-opacity" />
        </div>
      </Card>
    </Link>
  );
}
