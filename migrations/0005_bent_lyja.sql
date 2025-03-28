ALTER TABLE "members" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "members" CASCADE;--> statement-breakpoint
ALTER TABLE "memberships" RENAME COLUMN "member_id" TO "contact_id";--> statement-breakpoint
ALTER TABLE "memberships" DROP CONSTRAINT "memberships_member_id_term_id_unique";--> statement-breakpoint
ALTER TABLE "memberships" DROP CONSTRAINT "memberships_member_id_members_id_fk";
--> statement-breakpoint
ALTER TABLE "contacts" ADD COLUMN "nickname" text;--> statement-breakpoint
ALTER TABLE "memberships" ADD CONSTRAINT "memberships_contact_id_contacts_id_fk" FOREIGN KEY ("contact_id") REFERENCES "public"."contacts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "memberships" ADD CONSTRAINT "memberships_contact_id_term_id_unique" UNIQUE("contact_id","term_id");