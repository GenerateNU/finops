"use state";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Column } from "@tanstack/react-table";
import {
  ArrowDown,
  ArrowDownIcon,
  ArrowUp,
  ArrowUpIcon,
  ChevronsUpDownIcon,
  EyeOff,
  FilterIcon,
  PinIcon,
  PinOffIcon,
} from "lucide-react";
import { useMemo, useState } from "react";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  const [filterSearch, setFilterSearch] = useState<string>("");

  const label = column.columnDef.meta?.label ?? column.id;

  if (!column.getCanSort()) {
    return <div className={cn("px-1", className)}>{label}</div>;
  }

  const columnFilterFn = column.columnDef.filterFn;
  const columnFilterValue = column.getFilterValue();

  const sortedUniqueValues = useMemo(
    () =>
      Array.from(column.getFacetedUniqueValues().keys()).sort().slice(0, 5000),
    [column.getFacetedUniqueValues()]
  );

  return (
    <div className="flex flex-row gap-1 items-center">
      <div className={cn("flex items-center space-x-2", className)}>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="-ml-1 h-auto py-1 px-2 rounded-sm data-[state=open]:bg-slate-100 border border-transparent hover:border-slate-200 data-[state=open]:border-slate-500 focus-visible:ring-offset-0"
              after={
                column.getIsSorted() === "desc" ? (
                  <ArrowDownIcon />
                ) : column.getIsSorted() === "asc" ? (
                  <ArrowUpIcon />
                ) : column.getIsPinned() ? (
                  <PinIcon className="rotate-45" />
                ) : column.getIsFiltered() ? (
                  <FilterIcon />
                ) : (
                  <ChevronsUpDownIcon />
                )
              }
            >
              {label}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuLabel>Sort</DropdownMenuLabel>

            <DropdownMenuGroup>
              <DropdownMenuItem
                className="gap-2"
                onClick={() => column.toggleSorting(false)}
              >
                <ArrowUp className="size-4 text-slate-800" />
                Asc
              </DropdownMenuItem>
              <DropdownMenuItem
                className="gap-2"
                onClick={() => column.toggleSorting(true)}
              >
                <ArrowDown className="size-4 text-slate-800" />
                Desc
              </DropdownMenuItem>
            </DropdownMenuGroup>

            {column.getCanPin() || column.getCanHide() ? (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Controls</DropdownMenuLabel>

                <DropdownMenuGroup>
                  {column.getCanPin() ? (
                    column.getIsPinned() ? (
                      <DropdownMenuItem
                        className="gap-2"
                        onClick={() => column.pin(false)}
                      >
                        <PinOffIcon className="size-4 text-slate-800" />
                        Unpin
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem
                        className="gap-2"
                        onClick={() => column.pin("left")}
                      >
                        <PinIcon className="size-4 text-slate-800" />
                        Pin
                      </DropdownMenuItem>
                    )
                  ) : null}
                </DropdownMenuGroup>

                {column.getCanHide() ? (
                  <DropdownMenuItem
                    className="gap-2"
                    onClick={() => column.toggleVisibility(false)}
                  >
                    <EyeOff className="size-4 text-slate-800" />
                    Hide
                  </DropdownMenuItem>
                ) : null}
              </>
            ) : null}

            {column.getCanFilter() ? (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="gap-2">
                    <FilterIcon className="size-4" />
                    <span>Filter</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent className="max-h-[min(300px,var(--radix-dropdown-menu-content-available-height))] overflow-y-auto">
                    <DropdownMenuItem asChild>
                      <Input
                        id="search"
                        name="search"
                        aria-label="search"
                        type="text"
                        placeholder="Search..."
                        className="rounded-sm cursor-text"
                        value={filterSearch}
                        onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
                          setFilterSearch(ev.target.value);
                        }}
                        onClick={(ev: React.MouseEvent<HTMLInputElement>) =>
                          ev.preventDefault()
                        }
                        onKeyDown={(
                          ev: React.KeyboardEvent<HTMLInputElement>
                        ) => {
                          if (
                            ev.key !== "Escape" &&
                            ev.key !== "ArrowUp" &&
                            ev.key !== "ArrowDown"
                          ) {
                            ev.stopPropagation();
                          }
                        }}
                        autoComplete="off"
                      />
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {columnFilterFn === "arrIncludesSome" &&
                      sortedUniqueValues
                        .filter((val) =>
                          filterSearch.length > 0
                            ? val
                                .trim()
                                .toLowerCase()
                                .includes(filterSearch.trim().toLowerCase())
                            : true
                        )
                        .map((val) => (
                          <DropdownMenuCheckboxItem
                            key={val}
                            checked={columnFilterValue
                              ?.toString()
                              .includes(val)}
                            onCheckedChange={() => {
                              const currentFilters =
                                (column.getFilterValue() as string[]) || [];
                              const newFilters = currentFilters.includes(val)
                                ? currentFilters.filter(
                                    (filter) => filter !== val
                                  )
                                : [...currentFilters, val];

                              column.setFilterValue(newFilters);
                            }}
                            onSelect={(ev) => ev.preventDefault()}
                          >
                            {val}
                          </DropdownMenuCheckboxItem>
                        ))}

                    {columnFilterFn === "auto" && (
                      <DropdownMenuRadioGroup
                        value={columnFilterValue?.toString()}
                        onValueChange={(val) => column.setFilterValue(val)}
                      >
                        {sortedUniqueValues
                          .filter((val) =>
                            filterSearch.length > 0
                              ? val
                                  .trim()
                                  .toLowerCase()
                                  .includes(filterSearch.trim().toLowerCase())
                              : true
                          )
                          .map((val) => (
                            <DropdownMenuRadioItem key={val} value={val}>
                              {val}
                            </DropdownMenuRadioItem>
                          ))}
                      </DropdownMenuRadioGroup>
                    )}
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              </>
            ) : null}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
