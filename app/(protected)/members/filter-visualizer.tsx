import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ColumnFiltersState, Table } from "@tanstack/react-table";
import { XIcon } from "lucide-react";
import { columns } from "./columns";

interface DataTableFilterVisualizerProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  table: Table<TData>;
  columnFilters: ColumnFiltersState;
}

export function DataTableFilterVisualizer<TData, TValue>({
  table,
  columnFilters,
}: DataTableFilterVisualizerProps<TData, TValue>) {
  const activeFilters = columnFilters.map((filter) => ({
    id: filter.id,
    value: filter.value,
  }));

  return (
    <div className="flex flex-wrap gap-2">
      {activeFilters.length > 0 ? (
        <>
          {activeFilters.map((filter) => (
            <Badge
              key={filter.id}
              variant="secondary"
              className="px-3 py-1 text-sm"
            >
              <span className="font-bold mr-1">
                {columns.find((col) => col.id === filter.id)?.meta?.label}:
              </span>
              <span className="font-medium">
                {typeof filter.value === "string"
                  ? filter.value
                  : ((filter.value as Array<string>) ?? []).join(" or ")}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="size-4 ml-1 p-0 cursor-pointer"
                onClick={() =>
                  table.setColumnFilters(() =>
                    columnFilters.filter((f) => f.id !== filter.id)
                  )
                }
              >
                <XIcon className="size-3" />
                <span className="sr-only">Remove filter</span>
              </Button>
            </Badge>
          ))}
          <Button
            variant="outline"
            size="sm"
            className="h-8"
            onClick={() => table.setColumnFilters([])}
          >
            Clear All
          </Button>
        </>
      ) : null}
    </div>
  );
}
