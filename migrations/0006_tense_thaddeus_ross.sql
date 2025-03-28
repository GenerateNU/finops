ALTER TABLE "contacts" RENAME COLUMN "email" TO "northeastern_email";--> statement-breakpoint
ALTER TABLE "venture_clients" RENAME COLUMN "linkedin_url" TO "url";--> statement-breakpoint
ALTER TABLE "contacts" ALTER COLUMN "first_name" SET DATA TYPE varchar(50);--> statement-breakpoint
ALTER TABLE "contacts" ALTER COLUMN "last_name" SET DATA TYPE varchar(100);--> statement-breakpoint
ALTER TABLE "contacts" ALTER COLUMN "nickname" SET DATA TYPE varchar(25);--> statement-breakpoint
ALTER TABLE "contacts" ALTER COLUMN "linkedin_url" SET DATA TYPE varchar(250);--> statement-breakpoint
ALTER TABLE "memberships" ALTER COLUMN "branch_name" SET DATA TYPE varchar(50);--> statement-breakpoint
ALTER TABLE "memberships" ALTER COLUMN "team_name" SET DATA TYPE varchar(50);--> statement-breakpoint
ALTER TABLE "memberships" ALTER COLUMN "role_name" SET DATA TYPE varchar(50);--> statement-breakpoint
ALTER TABLE "contacts" ADD COLUMN "non_northeastern_email" varchar(100);--> statement-breakpoint
ALTER TABLE "contacts" ADD COLUMN "location" text;--> statement-breakpoint
ALTER TABLE "contacts" ADD COLUMN "graduation_term_id" integer;--> statement-breakpoint
ALTER TABLE "contacts" ADD CONSTRAINT "contacts_graduation_term_id_terms_id_fk" FOREIGN KEY ("graduation_term_id") REFERENCES "public"."terms"("id") ON DELETE no action ON UPDATE no action;