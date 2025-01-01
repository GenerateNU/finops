import { NavLink } from "@/types";
import { PlusIcon, StretchHorizontalIcon } from "lucide-react";

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

      <div className="grid gap-6">{children}</div>
    </>
  );
}
