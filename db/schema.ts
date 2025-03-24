import { integer, pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';

export const semestersTable = pgTable('semesters', {
  id: serial('id').primaryKey(),
  semesterName: varchar('semester_name', { length: 100 }).notNull().unique(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
});

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
  semesterId: integer('semester_id').notNull().references(() => semestersTable.id),
  teamName: varchar('team_name', { length: 100 }).notNull(),
  roleName: varchar('role_name', { length: 100 }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
});

export type InsertSemester = typeof semestersTable.$inferInsert;
export type SelectSemester = typeof semestersTable.$inferSelect;

export type InsertMember = typeof membersTable.$inferInsert;
export type SelectMember = typeof membersTable.$inferSelect;

export type InsertMembership = typeof membershipsTable.$inferInsert;
export type SelectMembership = typeof membershipsTable.$inferSelect;
