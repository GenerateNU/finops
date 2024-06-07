import { PlusIcon, StretchHorizontalIcon } from "lucide-react";
import Link from "next/link";

const LINK_ICON_CLASSES =
  "p-2 transition-all border rounded-md size-8 bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-primary group-hover:border-generate-green group-hover:bg-generate-green group-hover:bg-opacity-30";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="grid w-full max-w-6xl gap-2 mx-auto">
        <h1 className="text-3xl font-semibold text-black dark:text-white">
          Reimbursements
        </h1>
      </div>

      <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        <nav className="grid gap-4 text-sm text-slate-600 dark:text-slate-400">
          <Link
            href="/reimbursements"
            className="flex flex-row gap-2.5 items-center group"
          >
            <StretchHorizontalIcon className={LINK_ICON_CLASSES} />
            <span className="font-semibold text-primary">My Submissions</span>
          </Link>
          <Link
            href="/reimbursements/new"
            className="flex flex-row gap-2.5 items-center group"
          >
            <PlusIcon className={LINK_ICON_CLASSES} />
            <span className="font-semibold text-primary">Submit Request</span>
          </Link>
        </nav>

        <div className="grid gap-6">{children}</div>
      </div>
    </>
  );
}
