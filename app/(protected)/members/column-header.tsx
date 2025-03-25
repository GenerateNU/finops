import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Column } from "@tanstack/react-table";
import {
  ArrowDown,
  ArrowDownIcon,
  ArrowUp,
  ArrowUpIcon,
  EyeOff,
  PinIcon,
  PinOffIcon,
} from "lucide-react";
import { useMemo } from "react";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
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
        <DropdownMenu>
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
                ) : (
                  <></>
                )
              }
            >
              {label}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="max-h-[var(--radix-dropdown-menu-content-available-height)] overflow-y-auto"
          >
            <DropdownMenuLabel>Sort</DropdownMenuLabel>

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

            {column.getCanPin() || column.getCanHide() ? (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Controls</DropdownMenuLabel>

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
                <DropdownMenuLabel>Filter</DropdownMenuLabel>

                {columnFilterFn === "arrIncludesSome" &&
                  sortedUniqueValues.map((val) => (
                    <DropdownMenuCheckboxItem
                      key={val}
                      checked={columnFilterValue?.toString().includes(val)}
                      onCheckedChange={() => {
                        const currentFilters =
                          (column.getFilterValue() as string[]) || [];
                        const newFilters = currentFilters.includes(val)
                          ? currentFilters.filter((filter) => filter !== val)
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
                    {sortedUniqueValues.map((val) => (
                      <DropdownMenuRadioItem key={val} value={val}>
                        {val}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                )}
              </>
            ) : null}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
