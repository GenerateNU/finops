import { auth } from "@/auth";
import { UserRole } from "@/types";

import { LockIcon } from "lucide-react";
import Link from "next/link";

export async function ManageLink() {
  const session = await auth();

  if (session?.user.role === UserRole.ADMIN) {
    return (
      <Link
        href="/manage"
        className="inline-flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
      >
        Manage
        <LockIcon className="size-3 text-slate-400 dark:text-slate-600" />
      </Link>
    );
  }

  return null;
}
