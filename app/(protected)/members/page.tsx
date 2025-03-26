import { getMembers } from "@/queries/select";
import { Metadata } from "next";

import { columns } from "./columns";
import { DataTable } from "./data-table";

export const metadata: Metadata = {
  title: "Member History",
};

export default async function MembersPage() {
  const members = await getMembers();

  return (
    <>
      <div className="grid w-full max-w-5xl gap-2">
        <h1 className="text-3xl font-semibold text-black dark:text-white">
          Member History
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          List of all Generate members and their roles
        </p>
      </div>

      <DataTable columns={columns} data={members}></DataTable>
    </>
  );
}
