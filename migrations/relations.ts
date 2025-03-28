import { relations } from "drizzle-orm/relations";
import { terms, memberships, contacts, ventureClients, ventureClientContacts, ventureTerms } from "./schema";

export const membershipsRelations = relations(memberships, ({one}) => ({
	term: one(terms, {
		fields: [memberships.termId],
		references: [terms.id]
	}),
	contact: one(contacts, {
		fields: [memberships.contactId],
		references: [contacts.id]
	}),
}));

export const termsRelations = relations(terms, ({many}) => ({
	memberships: many(memberships),
	ventureTerms: many(ventureTerms),
	contacts: many(contacts),
}));

export const contactsRelations = relations(contacts, ({one, many}) => ({
	memberships: many(memberships),
	ventureClientContacts: many(ventureClientContacts),
	term: one(terms, {
		fields: [contacts.graduationTermId],
		references: [terms.id]
	}),
}));

export const ventureClientContactsRelations = relations(ventureClientContacts, ({one}) => ({
	ventureClient: one(ventureClients, {
		fields: [ventureClientContacts.ventureClientId],
		references: [ventureClients.id]
	}),
	contact: one(contacts, {
		fields: [ventureClientContacts.contactId],
		references: [contacts.id]
	}),
}));

export const ventureClientsRelations = relations(ventureClients, ({many}) => ({
	ventureClientContacts: many(ventureClientContacts),
	ventureTerms: many(ventureTerms),
}));

export const ventureTermsRelations = relations(ventureTerms, ({one}) => ({
	ventureClient: one(ventureClients, {
		fields: [ventureTerms.ventureId],
		references: [ventureClients.id]
	}),
	term: one(terms, {
		fields: [ventureTerms.termId],
		references: [terms.id]
	}),
}));