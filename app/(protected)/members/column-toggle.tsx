"use client";

import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Table } from "@tanstack/react-table";
import { Settings2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
  showDebug: boolean;
  setShowDebug: (val: boolean) => void;
}

export function DataTableViewOptions<TData>({
  table,
  showDebug,
  setShowDebug,
}: DataTableViewOptionsProps<TData>) {
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 cursor-pointer"
          before={<Settings2 />}
        >
          Columns
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
        {table
          .getAllColumns()
          .filter((column) => typeof column.accessorFn !== "undefined")
          .map((column) => {
            return (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
                onSelect={(ev) => ev.preventDefault()}
                disabled={!column.getCanHide()}
              >
                {column.columnDef.meta?.label ?? column.id}
              </DropdownMenuCheckboxItem>
            );
          })}
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Miscellaneous</DropdownMenuLabel>
        <DropdownMenuCheckboxItem
          checked={showDebug}
          onCheckedChange={setShowDebug}
        >
          Toggle debug
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
