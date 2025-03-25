"use client";

import { ColumnDef, RowData } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { DataTableColumnHeader } from "./column-header";

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends RowData, TValue> {
    label: string;
  }
}

export type Membership = {
  id: number | null;
  name: string;
  email: string | null;
  branch: string | null;
  team: string | null;
  role: string | null;
  term: string | null;
};

export const columns: ColumnDef<Membership>[] = [
  {
    id: "name",
    accessorKey: "name",
    meta: { label: "Name" },
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    // enableColumnFilter: false,
  },
  {
    id: "email",
    accessorKey: "email",
    meta: { label: "Email" },
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    enableColumnFilter: false,
  },
  {
    id: "term",
    accessorKey: "term",
    meta: { label: "Term" },
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    filterFn: "arrIncludesSome",
  },
  {
    id: "branch",
    accessorKey: "branch",
    meta: { label: "Branch" },
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    filterFn: "arrIncludesSome",
  },
  {
    id: "team",
    accessorKey: "team",
    meta: { label: "Team" },
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    enableColumnFilter: false,
  },
  {
    id: "role",
    accessorKey: "role",
    meta: { label: "Role" },
    header: ({ column }) => <DataTableColumnHeader column={column} />,
    enableColumnFilter: false,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const member = row.original;

      if (!member) return null;

      return (
        <DropdownMenu>
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
              onClick={() => navigator.clipboard.writeText(String(member.id))}
            >
              Copy member ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => alert("TODO: implement")}>
              View member
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    size: 24,
  },
];
