import { integer, pgEnum, pgTable, serial, text, timestamp, unique, varchar } from 'drizzle-orm/pg-core';

export const termEnum = pgEnum('term', ['Fall', 'Spring', 'Summer'])

export const termsTable = pgTable('terms', {
  id: serial('id').primaryKey(),
  term: termEnum().notNull(),
  year: integer('year').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
}, (t) => [
  unique().on(t.term, t.year)
]);

export const membersTable = pgTable('members', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').unique(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
});

export const membershipsTable = pgTable('memberships', {
  id: serial('id').primaryKey(),
  memberId: integer('member_id').notNull().references(() => membersTable.id),
  termId: integer('term_id').notNull().references(() => termsTable.id),
  branchName: varchar('branch_name', { length: 100 }).notNull(),
  teamName: varchar('team_name', { length: 100 }).notNull(),
  roleName: varchar('role_name', { length: 100 }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
}, (t) => [
  unique().on(t.memberId, t.termId)
]);

export type InsertTerm = typeof termsTable.$inferInsert;
export type SelectTerm = typeof termsTable.$inferSelect;

export type InsertMember = typeof membersTable.$inferInsert;
export type SelectMember = typeof membersTable.$inferSelect;

export type InsertMembership = typeof membershipsTable.$inferInsert;
export type SelectMembership = typeof membershipsTable.$inferSelect;
