import { db } from "@/db/db";
import {
  contactsTable,
  membershipsTable,
  SelectContact,
  SelectTerm,
  termsTable,
} from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { alias } from "drizzle-orm/pg-core";

export async function getTerms(): Promise<SelectTerm[]> {
  return db.select().from(termsTable);
}

export interface GetMembersResponse {
  memberId: number | null;
  membershipId: number | null;
  firstName: string;
  lastName: string;
  pronouns: string | null;
  nuid: string | null;
  northeasternEmail: string | null;
  nonNortheasternEmail: string | null;
  major: string | null;
  homeCollege: string | null;
  linkedinUrl: string | null;
  graduationTerm: string | null;
  tShirtSize: string | null;
  branch: string | null;
  team: string | null;
  role: string | null;
  term: string | null;
}

export async function getMembers(): Promise<GetMembersResponse[]> {
  const graduationTerm = alias(termsTable, "graduation_term")
  return db
    .select({
      memberId: contactsTable.id,
      membershipId: membershipsTable.id,
      firstName: contactsTable.firstName,
      lastName: contactsTable.lastName,
      pronouns: contactsTable.pronouns,
      nuid: contactsTable.nuid,
      northeasternEmail: contactsTable.northeasternEmail,
      nonNortheasternEmail: contactsTable.nonNortheasternEmail,
      major: contactsTable.major,
      homeCollege: contactsTable.homeCollege,
      linkedinUrl: contactsTable.linkedinUrl,
      tShirtSize: contactsTable.tShirtSize,
      graduationTerm: sql<string>`concat(${termsTable.term}, ' ', ${termsTable.year})`,
      branch: membershipsTable.branchName,
      team: membershipsTable.teamName,
      role: membershipsTable.roleName,
      term: sql<string>`concat(${termsTable.term}, ' ', ${termsTable.year})`,
    })
    .from(contactsTable)
    .leftJoin(membershipsTable, eq(contactsTable.id, membershipsTable.contactId))
    .leftJoin(graduationTerm, eq(graduationTerm.id, contactsTable.graduationTermId))
    .leftJoin(termsTable, eq(membershipsTable.termId, termsTable.id));
}

export async function getMember(id: number): Promise<SelectContact | undefined> {
  return db.query.contactsTable.findFirst({
    where: eq(contactsTable.id, id),
  });
}

export interface GetMembershipsByContactIdResponse {
  id: number | null;
  branchName: string | null;
  teamName: string | null;
  roleName: string | null;
  term: string | null;
}
export async function getMembershipsByContactId(
  contactId: number
): Promise<GetMembershipsByContactIdResponse[]> {
  return db
    .select({
      id: membershipsTable.id,
      branchName: membershipsTable.branchName,
      teamName: membershipsTable.teamName,
      roleName: membershipsTable.roleName,
      term: sql<string>`concat(${termsTable.term}, ' ', ${termsTable.year})`,
    })
    .from(membershipsTable)
    .where(eq(membershipsTable.contactId, contactId))
    .leftJoin(termsTable, eq(membershipsTable.termId, termsTable.id));
}
