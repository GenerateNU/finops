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

export const projectTypeEnum = pgEnum('project_type', ['Data', 'Hardware', 'Software'])

export const connectionTypeEnum = pgEnum('connection_type', [
  'Undergraduate Student',
  'Graduate Student',
  'Faculty/Staff',
  'Alumnus',
  'External'
])

export const ventureClientsTable = pgTable('venture_clients', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  url: text('linkedin_url'),
  projectType: projectTypeEnum('project_type').notNull(),
  connection: connectionTypeEnum('connection_type'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
});

export const contactsTable = pgTable('contacts', {
  id: serial('id').primaryKey(),
  firstName: text('first_name').notNull(),
  lastName: text('last_name').notNull(),
  email: text('email'),
  linkedinUrl: text('linkedin_url'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
});

export const ventureClientContactsTable = pgTable('venture_client_contacts', {
  id: serial('id').primaryKey(),
  ventureClientId: integer('venture_client_id')
    .notNull()
    .references(() => ventureClientsTable.id),
  contactId: integer('contact_id')
    .notNull()
    .references(() => contactsTable.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
}, (t) => [
  unique().on(t.ventureClientId, t.contactId)
]);

export const ventureTermsTable = pgTable('venture_terms', {
  id: serial('id').primaryKey(),
  ventureId: integer('venture_id')
    .notNull()
    .references(() => ventureClientsTable.id),
  termId: integer('term_id')
    .notNull()
    .references(() => termsTable.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
}, (t) => [
  unique().on(t.ventureId, t.termId)
]);

export type InsertTerm = typeof termsTable.$inferInsert;
export type SelectTerm = typeof termsTable.$inferSelect;

export type InsertMember = typeof membersTable.$inferInsert;
export type SelectMember = typeof membersTable.$inferSelect;

export type InsertMembership = typeof membershipsTable.$inferInsert;
export type SelectMembership = typeof membershipsTable.$inferSelect;

export type InsertVentureClient = typeof ventureClientsTable.$inferInsert;
export type SelectVentureClient = typeof ventureClientsTable.$inferSelect;

export type InsertContact = typeof contactsTable.$inferInsert;
export type SelectContact = typeof contactsTable.$inferSelect;

export type InsertVentureClientContact = typeof ventureClientContactsTable.$inferInsert;
export type SelectVentureClientContact = typeof ventureClientContactsTable.$inferSelect;

export type InsertVentureTerm = typeof ventureTermsTable.$inferInsert;
export type SelectVentureTerm = typeof ventureTermsTable.$inferSelect;
