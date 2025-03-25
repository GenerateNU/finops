CREATE TYPE "public"."term" AS ENUM('Fall', 'Spring', 'Summer');--> statement-breakpoint
ALTER TABLE "semesters" RENAME TO "terms";--> statement-breakpoint
ALTER TABLE "memberships" RENAME COLUMN "semester_id" TO "term_id";--> statement-breakpoint
ALTER TABLE "terms" DROP CONSTRAINT "semesters_semester_name_unique";--> statement-breakpoint
ALTER TABLE "memberships" DROP CONSTRAINT "memberships_semester_id_semesters_id_fk";
--> statement-breakpoint
ALTER TABLE "terms" ADD COLUMN "term" "term" NOT NULL;--> statement-breakpoint
ALTER TABLE "terms" ADD COLUMN "year" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "memberships" ADD CONSTRAINT "memberships_term_id_terms_id_fk" FOREIGN KEY ("term_id") REFERENCES "public"."terms"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "terms" DROP COLUMN "semester_name";
