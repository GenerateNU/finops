import { PlusIcon, StretchHorizontalIcon } from "lucide-react";
import { NavLink } from "@/types";
import { SidebarLinks } from "@/components/sidebar-links";

const NAV_LINKS: NavLink[] = [
  {
    href: "/reimbursements",
    label: "My Reimbursements",
    icon: <StretchHorizontalIcon />,
  },
  {
    href: "/reimbursements/new",
    label: "Submit Request",
    icon: <PlusIcon />,
  },
];

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="grid w-full max-w-5xl gap-2 mx-auto">
        <h1 className="text-3xl font-semibold text-black dark:text-white">
          Reimbursements
        </h1>
      </div>

      <div className="mx-auto grid w-full max-w-5xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
        <nav className="grid gap-4 text-sm text-slate-600 dark:text-slate-400">
          <SidebarLinks links={NAV_LINKS} />
        </nav>

        <div className="grid gap-6">{children}</div>
      </div>
    </>
  );
}
