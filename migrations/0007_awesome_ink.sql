ALTER TABLE "contacts" RENAME COLUMN "nickname" TO "greeting";--> statement-breakpoint
ALTER TABLE "contacts" ALTER COLUMN "last_name" SET DATA TYPE varchar(75);