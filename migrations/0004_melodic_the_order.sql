CREATE TYPE "public"."connection_type" AS ENUM('Undergraduate Student', 'Graduate Student', 'Faculty/Staff', 'Alumnus', 'External');--> statement-breakpoint
CREATE TYPE "public"."project_type" AS ENUM('Data', 'Hardware', 'Software');--> statement-breakpoint
CREATE TABLE "contacts" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"email" text,
	"linkedin_url" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "venture_client_contacts" (
	"id" serial PRIMARY KEY NOT NULL,
	"venture_client_id" integer NOT NULL,
	"contact_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "venture_client_contacts_venture_client_id_contact_id_unique" UNIQUE("venture_client_id","contact_id")
);
--> statement-breakpoint
CREATE TABLE "venture_clients" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"linkedin_url" text,
	"project_type" "project_type" NOT NULL,
	"connection_type" "connection_type",
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "venture_terms" (
	"id" serial PRIMARY KEY NOT NULL,
	"venture_id" integer NOT NULL,
	"term_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "venture_terms_venture_id_term_id_unique" UNIQUE("venture_id","term_id")
);
--> statement-breakpoint
ALTER TABLE "venture_client_contacts" ADD CONSTRAINT "venture_client_contacts_venture_client_id_venture_clients_id_fk" FOREIGN KEY ("venture_client_id") REFERENCES "public"."venture_clients"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "venture_client_contacts" ADD CONSTRAINT "venture_client_contacts_contact_id_contacts_id_fk" FOREIGN KEY ("contact_id") REFERENCES "public"."contacts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "venture_terms" ADD CONSTRAINT "venture_terms_venture_id_venture_clients_id_fk" FOREIGN KEY ("venture_id") REFERENCES "public"."venture_clients"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "venture_terms" ADD CONSTRAINT "venture_terms_term_id_terms_id_fk" FOREIGN KEY ("term_id") REFERENCES "public"."terms"("id") ON DELETE no action ON UPDATE no action;