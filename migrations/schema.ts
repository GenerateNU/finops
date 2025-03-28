import { pgTable, unique, serial, timestamp, integer, foreignKey, varchar, text, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const connectionType = pgEnum("connection_type", ['Undergraduate Student', 'Graduate Student', 'Faculty/Staff', 'Alumnus', 'External'])
export const projectType = pgEnum("project_type", ['Data', 'Hardware', 'Software'])
export const term = pgEnum("term", ['Fall', 'Spring', 'Summer'])


export const terms = pgTable("terms", {
	id: serial().primaryKey().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).notNull(),
	term: term().notNull(),
	year: integer().notNull(),
}, (table) => [
	unique("terms_term_year_unique").on(table.term, table.year),
]);

export const memberships = pgTable("memberships", {
	id: serial().primaryKey().notNull(),
	contactId: integer("contact_id").notNull(),
	termId: integer("term_id").notNull(),
	teamName: varchar("team_name", { length: 50 }).notNull(),
	roleName: varchar("role_name", { length: 50 }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).notNull(),
	branchName: varchar("branch_name", { length: 50 }).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.termId],
			foreignColumns: [terms.id],
			name: "memberships_term_id_terms_id_fk"
		}),
	foreignKey({
			columns: [table.contactId],
			foreignColumns: [contacts.id],
			name: "memberships_contact_id_contacts_id_fk"
		}),
	unique("memberships_contact_id_term_id_unique").on(table.contactId, table.termId),
]);

export const ventureClientContacts = pgTable("venture_client_contacts", {
	id: serial().primaryKey().notNull(),
	ventureClientId: integer("venture_client_id").notNull(),
	contactId: integer("contact_id").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.ventureClientId],
			foreignColumns: [ventureClients.id],
			name: "venture_client_contacts_venture_client_id_venture_clients_id_fk"
		}),
	foreignKey({
			columns: [table.contactId],
			foreignColumns: [contacts.id],
			name: "venture_client_contacts_contact_id_contacts_id_fk"
		}),
	unique("venture_client_contacts_venture_client_id_contact_id_unique").on(table.ventureClientId, table.contactId),
]);

export const ventureTerms = pgTable("venture_terms", {
	id: serial().primaryKey().notNull(),
	ventureId: integer("venture_id").notNull(),
	termId: integer("term_id").notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.ventureId],
			foreignColumns: [ventureClients.id],
			name: "venture_terms_venture_id_venture_clients_id_fk"
		}),
	foreignKey({
			columns: [table.termId],
			foreignColumns: [terms.id],
			name: "venture_terms_term_id_terms_id_fk"
		}),
	unique("venture_terms_venture_id_term_id_unique").on(table.ventureId, table.termId),
]);

export const ventureClients = pgTable("venture_clients", {
	id: serial().primaryKey().notNull(),
	name: text().notNull(),
	url: varchar({ length: 250 }),
	projectType: projectType("project_type").notNull(),
	connectionType: connectionType("connection_type"),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).notNull(),
});

export const contacts = pgTable("contacts", {
	id: serial().primaryKey().notNull(),
	firstName: varchar("first_name", { length: 50 }).notNull(),
	lastName: varchar("last_name", { length: 100 }).notNull(),
	northeasternEmail: varchar("northeastern_email", { length: 100 }),
	linkedinUrl: varchar("linkedin_url", { length: 250 }),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).notNull(),
	nickname: varchar({ length: 25 }),
	nonNortheasternEmail: varchar("non_northeastern_email", { length: 100 }),
	location: text(),
	graduationTermId: integer("graduation_term_id"),
}, (table) => [
	foreignKey({
			columns: [table.graduationTermId],
			foreignColumns: [terms.id],
			name: "contacts_graduation_term_id_terms_id_fk"
		}),
]);
