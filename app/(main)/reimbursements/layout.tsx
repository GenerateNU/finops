import { PlusIcon, StretchHorizontalIcon } from "lucide-react";
import Link from "next/link";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="mx-auto grid w-full max-w-6xl gap-2">
        <h1 className="text-3xl font-semibold">Reimbursements</h1>
      </div>

      <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        <nav
          className="grid gap-4 text-sm text-muted-foreground"
          x-chunk="dashboard-04-chunk-0"
        >
          <Link
            href="/reimbursements"
            className="flex flex-row gap-2.5 items-center group"
          >
            <StretchHorizontalIcon className="size-8 p-2 bg-slate-100 border border-slate-200 text-primary rounded-md group-hover:border-generate-green group-hover:bg-generate-green group-hover:bg-opacity-30 transition-all" />
            <span className="font-semibold text-primary">My Submissions</span>
          </Link>
          <Link
            href="/reimbursements/new"
            className="flex flex-row gap-2.5 items-center group"
          >
            <PlusIcon className="size-8 p-2 bg-slate-100 border border-slate-200 text-primary rounded-md group-hover:border-generate-green group-hover:bg-generate-green group-hover:bg-opacity-30 transition-all" />
            <span className="font-semibold text-primary">Submit Request</span>
          </Link>
        </nav>

        <div className="grid gap-6">{children}</div>
      </div>
    </>
  );
}
