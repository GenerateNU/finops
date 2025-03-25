import { DebugBlock } from "@/components/DebugBlock";
import { Table } from "@tanstack/react-table";

interface DataTableDebugProps<TData> {
  table: Table<TData>;
}

export function DataTableDebug<TData>({ table }: DataTableDebugProps<TData>) {
  return <DebugBlock snippet={table.getState()} />;
}
