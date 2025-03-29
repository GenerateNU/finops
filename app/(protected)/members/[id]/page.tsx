import { auth } from "@/auth";
import { EmptyTable } from "@/components/empty-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getMember, getMembershipsByContactId } from "@/queries/select";
import { notFound } from "next/navigation";

const emptyMembershipsTableData = {
  title: "No memberships found",
};

export default async function MemberDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await auth();
  if (!session || !session.user.role.includes("admin")) {
    return notFound();
  }

  const member = await getMember(parseInt(params.id));
  if (!member) {
    return notFound();
  }

  const memberships = await getMembershipsByContactId(member.id);

  return (
    <>
      <div className="grid w-full max-w-5xl gap-2">
        <h1 className="text-3xl font-semibold text-black dark:text-white">
          {member.firstName} {member.lastName}
        </h1>
        <p className="text-slate-500 dark:text-slate-400">Member Overview</p>
      </div>

      <div>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-semibold text-slate-500 uppercase">
              Greeting
            </label>
            <p>{member.greeting}</p>
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-500 uppercase">
              Northeastern Email
            </label>
            <p>{member.northeasternEmail}</p>
          </div>
        </div>

        <h2 className="mt-8 mb-3 text-2xl font-semibold text-black dark:text-white">
          Memberships
        </h2>
        {memberships.length > 0 ? (
          <div className="border border-slate-200 dark:border-slate-800 shadow-xs rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-100">
                  <TableHead>Term</TableHead>
                  <TableHead>Branch</TableHead>
                  <TableHead>Team</TableHead>
                  <TableHead>Role</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {memberships.map((membership) => (
                  <TableRow key={membership.id} className="bg-accent">
                    <TableCell>{membership.term}</TableCell>
                    <TableCell>{membership.branchName}</TableCell>
                    <TableCell>{membership.teamName}</TableCell>
                    <TableCell>{membership.roleName}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <EmptyTable content={emptyMembershipsTableData} />
        )}
      </div>
    </>
  );
}
