import { db } from "@/db/db";
import {
  membershipsTable,
  membersTable,
  SelectMember,
  SelectTerm,
  termsTable,
} from "@/db/schema";
import { eq, sql } from "drizzle-orm";

export async function getTerms(): Promise<SelectTerm[]> {
  return db.select().from(termsTable);
}

export interface GetMembersResponse {
  memberId: number | null;
  membershipId: number | null;
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
      memberId: membersTable.id,
      membershipId: membershipsTable.id,
      name: membersTable.name,
      email: membersTable.email,
      branch: membershipsTable.branchName,
      team: membershipsTable.teamName,
      role: membershipsTable.roleName,
      term: sql<string>`concat(${termsTable.term}, ' ', ${termsTable.year})`,
    })
    .from(membersTable)
    .leftJoin(membershipsTable, eq(membersTable.id, membershipsTable.memberId))
    .leftJoin(termsTable, eq(membershipsTable.termId, termsTable.id));
}

export async function getMember(id: number): Promise<SelectMember | undefined> {
  return db.query.membersTable.findFirst({
    where: eq(membersTable.id, id),
  });
}

export interface GetMembershipsByMemberIdResponse {
  id: number | null;
  branchName: string | null;
  teamName: string | null;
  roleName: string | null;
  term: string | null;
}
export async function getMembershipsByMemberId(
  memberId: number
): Promise<GetMembershipsByMemberIdResponse[]> {
  return db
    .select({
      id: membershipsTable.id,
      branchName: membershipsTable.branchName,
      teamName: membershipsTable.teamName,
      roleName: membershipsTable.roleName,
      term: sql<string>`concat(${termsTable.term}, ' ', ${termsTable.year})`,
    })
    .from(membershipsTable)
    .where(eq(membershipsTable.memberId, memberId))
    .leftJoin(termsTable, eq(membershipsTable.termId, termsTable.id));
}
