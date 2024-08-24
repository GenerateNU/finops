"use client";

import { ArrowRightIcon, ChevronsUpDownIcon } from "lucide-react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

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

import { BUDGETS, BUDGETS_BY_TEAM } from "@/lib/globals";
import { cn } from "@/lib/utils";

export function BudgetPicker<TFieldValues extends FieldValues>({
  name,
  form,
  purpose,
}: {
  name: Path<TFieldValues>;
  form: UseFormReturn<TFieldValues>;
  purpose?: string;
}) {
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
                      "text-slate-500 dark:placeholder:text-slate-400 shadow-sm",
                  )}
                >
                  {field.value
                    ? (() => {
                        const selectedBudget = BUDGETS.find(
                          (budget) => budget.code === field.value,
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
                  <CommandEmpty>No budget found.</CommandEmpty>
                  {Object.keys(BUDGETS_BY_TEAM).map((team) => {
                    if (typeof purpose === "undefined") {
                      return true;
                    }
                    const availableBudgets = BUDGETS.filter(
                      (budget) =>
                        budget.branch === team &&
                        (budget.purposes.includes("any") ||
                          budget.purposes.includes(purpose)),
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
                              form.setValue("budget", budget.code);
                            }}
                            className={cn(
                              "border border-transparent",
                              budget.code === field.value &&
                                "border-generate-green bg-generate-green bg-opacity-10",
                            )}
                          >
                            <ArrowRightIcon
                              className={cn(
                                "mr-2 h-4 w-4",
                                budget.code === field.value
                                  ? "opacity-100 text-generate-green"
                                  : "opacity-0",
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
