"use client";

import {
  Column,
  ColumnDef,
  ColumnFiltersState,
  ColumnPinningState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import * as React from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { InfoIcon, SearchIcon } from "lucide-react";
import { DataTableViewOptions } from "./column-toggle";
import { DataTableDebug } from "./debug";
import { DataTableFilterVisualizer } from "./filter-visualizer";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const memoizedColumns = React.useMemo<Array<ColumnDef<TData, TValue>>>(
    () => columns,
    []
  );

  const [sorting, setSorting] = React.useState<SortingState>([
    { desc: false, id: "name" },
  ]);
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [globalFilter, setGlobalFilter] = React.useState<any>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnPinning, setColumnPinning] = React.useState<ColumnPinningState>({
    left: ["name"],
    right: [],
  });

  const [showDebug, setShowDebug] = React.useState<boolean>(false);

  const table = useReactTable({
    data,
    columns: memoizedColumns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    onSortingChange: setSorting,
    onColumnPinningChange: setColumnPinning,
    state: {
      sorting,
      columnVisibility,
      globalFilter,
      columnFilters,
      columnPinning,
    },
    debugTable: showDebug,
    debugColumns: showDebug,
  });

  const { rows } = table.getRowModel();

  const parentRef = React.useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 34,
    overscan: 20,
  });

  const getCommonPinningStyles = (
    column: Column<TData>
  ): React.CSSProperties => {
    const isPinned = column.getIsPinned();
    const isLastLeftPinnedColumn =
      isPinned === "left" && column.getIsLastColumn("left");
    const isFirstRightPinnedColumn =
      isPinned === "right" && column.getIsFirstColumn("right");

    return {
      boxShadow: isLastLeftPinnedColumn
        ? "-4px 0 4px -4px gray inset"
        : isFirstRightPinnedColumn
        ? "4px 0 4px -4px gray inset"
        : undefined,
      left: isPinned === "left" ? `${column.getStart("left")}px` : undefined,
      right: isPinned === "right" ? `${column.getAfter("right")}px` : undefined,
      opacity: isPinned ? 0.95 : 1,
      position: isPinned ? "sticky" : "relative",
      width: column.getSize(),
      zIndex: isPinned ? 1 : 0,
      backgroundColor: isPinned ? "var(--color-slate-50)" : "transparent",
    };
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-row gap-2 justify-between">
        <DataTableFilterVisualizer
          table={table}
          columnFilters={columnFilters}
        />
        <DataTableViewOptions
          table={table}
          showDebug={showDebug}
          setShowDebug={setShowDebug}
        />
      </div>

      <div className="flex flex-row gap-2 items-center">
        <Label htmlFor="search">
          <div className="bg-slate-100 rounded-md size-8 aspect-square flex items-center justify-center border border-slate-200">
            <SearchIcon className="size-4" />
            <span className="sr-only">Search</span>
          </div>
        </Label>
        <Input
          id="search"
          name="search"
          value={globalFilter}
          onChange={(e) => table.setGlobalFilter(String(e.target.value))}
          placeholder="Search..."
          autoComplete="off"
          className="h-8"
        />
        <Popover>
          <PopoverTrigger className="bg-slate-100 rounded-md size-8 aspect-square flex items-center justify-center border border-slate-200 cursor-pointer">
            <InfoIcon className="size-4" />
            <span className="sr-only">Information</span>
          </PopoverTrigger>
          <PopoverContent align="end">
            <p className="text-sm text-slate-800 leading-none">
              Begin typing to filter by name or email.
            </p>
          </PopoverContent>
        </Popover>
      </div>

      {showDebug ? <DataTableDebug table={table} /> : null}

      <div ref={parentRef}>
        <div
          className="block rounded-md border max-w-full overflow-x-auto overflow-y-hidden"
          style={
            table.getSortedRowModel().rows?.length > 0
              ? { height: `${virtualizer.getTotalSize() + 42}px` }
              : {}
          }
        >
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="bg-slate-50 hover:bg-slate-50"
                >
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        colSpan={header.colSpan}
                        style={{
                          width: header.getSize(),
                          ...getCommonPinningStyles(header.column),
                        }}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getSortedRowModel().rows?.length ? (
                <>
                  {virtualizer.getVirtualItems().map((virtualRow, index) => {
                    const row = rows[virtualRow.index];
                    return (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                        style={{
                          height: `${virtualRow.size}px`,
                          transform: `translateY(${
                            virtualRow.start - index * virtualRow.size
                          }px)`,
                        }}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell
                            key={cell.id}
                            className="py-0 px-3 whitespace-nowrap"
                            style={{ ...getCommonPinningStyles(cell.column) }}
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    );
                  })}
                </>
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
