import { db } from "@/db/db";
import {
  membershipsTable,
  membersTable,
  SelectTerm,
  termsTable,
} from "@/db/schema";
import { eq, sql } from "drizzle-orm";

export async function getTerms(): Promise<SelectTerm[]> {
  return db.select().from(termsTable);
}

// export async function getMembers(): Promise<{ members: SelectMember; memberships: SelectMembership | null }[]> {
interface GetMembersResponse {
  id: number | null;
  name: string;
  email: string | null;
  branch: string | null;
  team: string | null;
  role: string | null;
  term: string | null;
}
export async function getMembers(): Promise<GetMembersResponse[]> {
  return db
    .select({
      id: membershipsTable.id,
      name: membersTable.name,
      email: membersTable.email,
      branch: membershipsTable.branchName,
      team: membershipsTable.teamName,
      role: membershipsTable.roleName,
      term: sql<string>`concat(${termsTable.term}, ' ', ${termsTable.year})`
    })
    .from(membersTable)
    .leftJoin(membershipsTable, eq(membersTable.id, membershipsTable.memberId))
    .leftJoin(termsTable, eq(membershipsTable.termId, termsTable.id))
}
