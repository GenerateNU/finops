"use client";

import { ArrowRightIcon, ChevronsUpDownIcon, FilterIcon } from "lucide-react";
import { FieldValues, Path, PathValue, UseFormReturn } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Budget, BUDGETS, BUDGETS_BY_TEAM } from "@/lib/globals";
import { cn } from "@/lib/utils";
import { useSession } from "@/providers/AuthContext";
import { useEffect, useState } from "react";
import { Badge } from "./ui/badge";

export function BudgetPicker<TFieldValues extends FieldValues>({
  name,
  form,
  purpose,
}: {
  name: Path<TFieldValues>;
  form: UseFormReturn<TFieldValues>;
  purpose?: string;
}) {
  const session = useSession();

  const [availableItems, setAvailableItems] = useState<Budget[]>([]);

  useEffect(() => {
    if (session.user.role === "admin") {
      console.info("[DEBUG] User is an admin; showing all budget line items.");
      setAvailableItems(BUDGETS);
    } else {
      setAvailableItems(
        BUDGETS.filter(
          (budgetItem) => budgetItem.branch === session.user.branch
        )
      );
    }

    console.log(availableItems);
  }, []);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col justify-end">
          <FormLabel className="pb-1">Budget</FormLabel>
          <input type="hidden" name={field.name} value={field.value} />
          <Popover>
            <PopoverTrigger
              disabled={typeof purpose === "undefined" ? false : purpose === ""}
              asChild
            >
              <FormControl>
                <Button
                  variant="outline"
                  size="sm"
                  role="combobox"
                  className={cn(
                    "font-normal justify-between",
                    !field.value &&
                      "text-slate-500 dark:placeholder:text-slate-400 shadow-sm"
                  )}
                >
                  {field.value
                    ? (() => {
                        const selectedBudget = BUDGETS.find(
                          (budget) => budget.code === field.value
                        );
                        return (
                          <div className="flex flex-row items-center gap-2">
                            <p className="flex flex-row gap-x-1 items-center flex-wrap leading-[1.1]">
                              {selectedBudget?.branch}{" "}
                              <ArrowRightIcon className="size-3 text-slate-400 dark:text-slate-600" />{" "}
                              {selectedBudget?.subTeam}{" "}
                              <ArrowRightIcon className="size-3 text-slate-400 dark:text-slate-600" />{" "}
                              {selectedBudget?.lineItem}
                            </p>
                          </div>
                        );
                      })()
                    : "Select budget"}
                  <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="p-0">
              <Command loop>
                <CommandInput
                  placeholder="Search budget..."
                  disabled={
                    typeof purpose === "undefined" ? false : purpose === ""
                  }
                />
                <CommandList>
                  <CommandEmpty>
                    <p className="font-semibold">No budget found.</p>

                    <div className="mt-2 flex flex-row justify-center items-center gap-2">
                      <Badge
                        variant="secondary"
                        className="flex justify-start gap-2 text-left"
                      >
                        <FilterIcon className="size-3" />
                        {session.user.role}
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="flex justify-start gap-2 text-left"
                      >
                        <FilterIcon className="size-3" />
                        {purpose}
                      </Badge>
                    </div>
                  </CommandEmpty>
                  {Object.keys(BUDGETS_BY_TEAM).map((team) => {
                    if (typeof purpose === "undefined") {
                      return true;
                    }
                    const availableBudgets = availableItems.filter(
                      (budget) =>
                        budget.branch === team &&
                        (budget.purposes.includes("any") ||
                          budget.purposes.includes(purpose))
                    );

                    if (availableBudgets.length === 0) return null;

                    return (
                      <CommandGroup
                        key={team.toLowerCase()}
                        heading={
                          <span className="font-mono uppercase text-generate-blue">
                            {team}
                          </span>
                        }
                      >
                        {availableBudgets.map((budget) => (
                          <CommandItem
                            key={budget.code}
                            value={budget.code}
                            keywords={[
                              budget.branch,
                              budget.subTeam,
                              budget.lineItem,
                            ]}
                            onSelect={() => {
                              form.setValue(
                                name,
                                budget.code as PathValue<
                                  TFieldValues,
                                  Path<TFieldValues>
                                >
                              );
                            }}
                            className={cn(
                              "border border-transparent",
                              budget.code === field.value &&
                                "border-generate-green bg-generate-green bg-opacity-10"
                            )}
                          >
                            <ArrowRightIcon
                              className={cn(
                                "mr-2 h-4 w-4",
                                budget.code === field.value
                                  ? "opacity-100 text-generate-green"
                                  : "opacity-0"
                              )}
                            />
                            <div className="flex flex-row gap-2 w-full justify-between items-center leading-snug">
                              <strong>{budget.lineItem}</strong>
                              <code className="text-slate-500 whitespace-nowrap uppercase text-xs">
                                {budget.subTeam}
                              </code>
                            </div>
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    );
                  })}
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormDescription>
            The budget line item to cover this expense.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
