"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GetMembersResponse } from "@/queries/select";
import { ColumnDef, RowData } from "@tanstack/react-table";
import { LinkedinIcon, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { DataTableColumnHeader } from "./column-header";

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends RowData, TValue> {
    label: string;
  }
}

export const columns: ColumnDef<GetMembersResponse>[] = [
  {
    id: "firstName",
    accessorKey: "firstName",
    meta: { label: "First Name" },
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    enableColumnFilter: false,
  },
  {
    id: "greeting",
    accessorKey: "greeting",
    meta: { label: "Greeting" },
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    enableColumnFilter: false,
  },
  {
    id: "lastName",
    accessorKey: "lastName",
    meta: { label: "Last Name" },
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    enableColumnFilter: false,
  },
  {
    id: "pronouns",
    accessorKey: "pronouns",
    meta: { label: "Pronouns" },
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    enableColumnFilter: false,
    enableGlobalFilter: false,
  },
  {
    id: "nuid",
    accessorKey: "nuid",
    meta: { label: "NUID" },
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    enableColumnFilter: false,
    cell: ({ row }) => {
      const val = row.getValue("nuid");

      return <span className="font-mono font-light">{String(val)}</span>;
    },
  },
  {
    id: "northeasternEmail",
    accessorKey: "northeasternEmail",
    meta: { label: "Northeastern Email" },
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    enableColumnFilter: false,
  },
  {
    id: "nonNortheasternEmail",
    accessorKey: "nonNortheasternEmail",
    meta: { label: "Non-Northeastern Email" },
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    enableColumnFilter: false,
  },
  {
    id: "major",
    accessorKey: "major",
    meta: { label: "Major" },
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    filterFn: "arrIncludesSome",
  },
  {
    id: "homeCollege",
    accessorKey: "homeCollege",
    meta: { label: "Home College" },
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    filterFn: "arrIncludesSome",
    enableGlobalFilter: false,
  },
  {
    id: "graduationTerm",
    accessorKey: "graduationTerm",
    meta: { label: "Graduation Term" },
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    filterFn: "arrIncludesSome",
    enableGlobalFilter: false,
  },
  {
    id: "linkedinUrl",
    accessorKey: "linkedinUrl",
    meta: { label: "LinkedIn URL" },
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    enableColumnFilter: false,
    enableGlobalFilter: false,
    cell: ({ row }) => {
      let val = String(row.getValue("linkedinUrl"));
      if (!val || val.length === 0) return null;

      if (!/^https?:\/\//i.test(val)) {
        val = "https://" + val;
      }

      try {
        const url = new URL(val);
        return (
          <div className="inline-flex items-center gap-1">
            <div className="flex items-center justify-center bg-slate-200 rounded-md size-5">
              <LinkedinIcon className="size-3" />
            </div>
            <Link
              href={`https://${url.hostname}${url.pathname}`}
              className="text-generate-blue"
            >
              {url.pathname.replace("/in/", "/").replace(/\/$/, "")}
            </Link>
          </div>
        );
      } catch (error) {
        console.error(`Invalid URL: ${val}`, error);
        return null;
      }
    },
  },
  {
    id: "term",
    accessorKey: "term",
    meta: { label: "Term" },
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    filterFn: "arrIncludesSome",
    enableGlobalFilter: false,
  },
  {
    id: "branch",
    accessorKey: "branch",
    meta: { label: "Branch" },
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    filterFn: "arrIncludesSome",
    enableGlobalFilter: false,
  },
  {
    id: "team",
    accessorKey: "team",
    meta: { label: "Team" },
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    filterFn: "arrIncludesSome",
    enableGlobalFilter: false,
  },
  {
    id: "role",
    accessorKey: "role",
    meta: { label: "Role" },
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    filterFn: "arrIncludesSome",
    enableGlobalFilter: false,
  },
  {
    id: "tShirtSize",
    accessorKey: "tShirtSize",
    meta: { label: "T-Shirt Size" },
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    filterFn: "arrIncludesSome",
    enableGlobalFilter: false,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const member = row.original;

      if (!member) return null;

      return (
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="size-6 border border-transparent hover:border-slate-200"
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(String(member.memberId))
              }
            >
              Copy member ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <Link href={`/members/${member.memberId}`}>View member</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    size: 24,
    enableColumnFilter: false,
    enableGlobalFilter: false,
    enableHiding: false,
    enablePinning: false,
    enableResizing: false,
    enableSorting: false,
  },
];
