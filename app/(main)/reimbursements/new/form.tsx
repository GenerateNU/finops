"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRightIcon,
  LoaderIcon,
  OctagonPauseIcon,
  StretchHorizontalIcon,
  XIcon,
} from "lucide-react";
import { Session } from "next-auth";
import Link from "next/link";
import { useEffect, useRef, useState, useTransition } from "react";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import dayjs from "@/lib/dayjs";
import { BRANCH_TEAMS, BRANCHES, EXPENSE_PURPOSE_OPTIONS } from "@/lib/globals";
import { camelize } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { formSchema } from "./form-schema";
import { onSubmitAction } from "./form-submit";

export function ExpenseVoucherForm({ session }: { session: Session }) {
  const [loading, setTransitioning] = useTransition();
  const [state, formAction] = useFormState(onSubmitAction, {
    success: false,
    message: "",
  });

  // override form visibility to allow multiple submissions
  const [showForm, setShowForm] = useState(false);

  // define form
  const form = useForm<z.output<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: session.user?.name ?? "",
      email: session.user?.email ?? "",
      nuid: "",
      address: "",
      budgetBranch: undefined,
      budgetTeam: undefined,
      expenseDate: dayjs().format("YYYY-MM-DD"),
      expenseTotal: "",
      expenseDescription: "",
      expensePurpose: "",
      ...(state?.fields ?? {}),
    },
    // TEST DATA:
    // defaultValues: {
    //   name: "Burton Guster",
    //   email: "burton.g@northeastern.edu",
    //   nuid: "002156789",
    //   address: "360 Huntington Ave, Boston, MA 02120",
    //   budgetBranch: "Engagement",
    //   budgetTeam: "Events",
    //   expenseDate: dayjs().subtract(6, "days").format("YYYY-MM-DD"),
    //   expenseTotal: "23.45",
    //   expenseDescription: "Pizza and soda",
    //   expensePurpose: "Morale",
    //   ...(state?.fields ?? {}),
    // },
  });

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
      form.reset();
    }
  }, [state.resetKey, state.success]);

  return (
    <Form {...form}>
      <form
        ref={formRef}
        action={formAction}
        onSubmit={(ev) => {
          setTransitioning(async () => {
            form.handleSubmit(() => {
              formAction(new FormData(formRef.current ?? undefined));
            })(ev);
          });
        }}
        className="space-y-8"
      >
        {showForm || !state.success ? (
          <>
            <div>
              {state?.message !== "" && !state.issues && (
                <div
                  className={state.success ? "text-green-500" : "text-red-500"}
                >
                  {state.message}
                </div>
              )}
              {state?.issues && (
                <ul className="text-red-500">
                  {state.issues.map((issue, i) => (
                    <li key={`${issue}-${i}`} className="flex gap-1">
                      <XIcon />
                      {issue}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <Card>
              <CardHeader className="relative w-full">
                <hr className="w-full h-px mt-3.5 border-0 bg-generate-green" />
                <CardTitle className="absolute pb-2 pr-3 font-mono font-bold uppercase bg-white dark:bg-slate-950 left-6">
                  Purchaser
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-8">
                <DualColumn>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            autoComplete="name"
                            placeholder="Burton Guster"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Your full name, as recorded in University documents.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            autoComplete="email"
                            placeholder="burton.guster@generatenu.com"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Your official Northeastern email address.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </DualColumn>

                <DualColumn>
                  <FormField
                    control={form.control}
                    name="nuid"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>NUID</FormLabel>
                        <FormControl>
                          <Input placeholder="001234567" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input
                            autoComplete="billing street-address"
                            placeholder="360 Huntington Ave, Boston, MA 02120"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Your full mailing address where you can receive a
                          check.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </DualColumn>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="relative w-full">
                <hr className="w-full h-px mt-3.5 border-0 bg-generate-green" />
                <CardTitle className="absolute pb-2 pr-3 font-mono font-bold uppercase bg-white dark:bg-slate-950 left-6">
                  Budget
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-8">
                <DualColumn>
                  <FormField
                    control={form.control}
                    name="budgetBranch"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Branch</FormLabel>
                        <Select
                          name={field.name}
                          value={field.value}
                          defaultValue={field.value}
                          onValueChange={field.onChange}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                ref={field.ref}
                                onBlur={field.onBlur}
                                placeholder="Select a branch"
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {BRANCHES.map((branch) => (
                              <SelectItem
                                key={branch.toLowerCase()}
                                value={branch}
                              >
                                {branch}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Which branch's budget should this purchase be expensed
                          to?
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="budgetTeam"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Team</FormLabel>
                        <Select
                          name={field.name}
                          value={field.value}
                          defaultValue={field.value}
                          onValueChange={field.onChange}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                ref={field.ref}
                                onBlur={field.onBlur}
                                placeholder="Select a team"
                              />
                            </SelectTrigger>
                          </FormControl>

                          <SelectContent>
                            {BRANCH_TEAMS.map((branch) => (
                              <SelectGroup key={branch.name.toLowerCase()}>
                                <SelectLabel>{branch.name}</SelectLabel>

                                {branch.teams.map((team) => (
                                  <SelectItem
                                    key={team.toLowerCase()}
                                    value={team}
                                  >
                                    {team}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Which team's budget should this purchase be expensed
                          to?
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </DualColumn>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="relative w-full">
                <hr className="w-full h-px mt-3.5 border-0 bg-generate-green" />
                <CardTitle className="absolute pb-2 pr-3 font-mono font-bold uppercase bg-white dark:bg-slate-950 left-6">
                  Expense
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-8">
                <DualColumn>
                  <FormField
                    control={form.control}
                    name="expenseDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Expense date</FormLabel>
                        <FormControl>
                          <Input placeholder="YYYY-MM-DD" {...field} />
                        </FormControl>
                        <FormDescription>
                          This must be the date the transaction occurred and
                          match the date on your receipt.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* <FormField
                control={form.control}
                name="expenseDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Expense date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "h-9 pl-3 text-left font-normal shadow-sm",
                              !field.value && "text-slate-700 dark:text-slate-300"
                            )}
                          >
                            {field.value ? (
                              dayjs(field.value).format("MMMM Do, YYYY")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      This must be the date the transaction occurred and match
                      the date on your receipt.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}

                  <FormField
                    control={form.control}
                    name="expenseTotal"
                    render={({ field }) => (
                      <FormItem>
                        {/* <FormItem className="md:-mt-2"> */}
                        <FormLabel>Expense total cost ($)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="12.34"
                            type="number"
                            min="0"
                            step="any"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          The total amount requested.{" "}
                          <strong>Do NOT include sales tax</strong> unless for
                          prepared meals. Northeastern is tax-exempt.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </DualColumn>

                <DualColumn>
                  <FormField
                    control={form.control}
                    name="expenseDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Expense description</FormLabel>
                        <FormControl>
                          <Input placeholder="Pizza and soda" {...field} />
                        </FormControl>
                        <FormDescription>
                          What items were purchased?
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="expensePurpose"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Purpose</FormLabel>
                        <Select
                          name={field.name}
                          value={field.value}
                          defaultValue={field.value}
                          onValueChange={field.onChange}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                ref={field.ref}
                                onBlur={field.onBlur}
                                placeholder="Select a purpose"
                              />
                            </SelectTrigger>
                          </FormControl>

                          <SelectContent>
                            {EXPENSE_PURPOSE_OPTIONS.map((purpose) => (
                              <SelectItem
                                key={camelize(purpose)}
                                value={purpose}
                              >
                                {purpose}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          What was this purchase for?
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* <FormField
                  control={form.control}
                  name="expensePurpose"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expense purpose</FormLabel>
                      <FormControl>
                        <Input placeholder="Morale" {...field} />
                      </FormControl>
                      <FormDescription>
                        What was this purchase for? Examples:{" "}
                        <span className="bg-slate-200 px-1 py-0.25 rounded-sm">
                          &ldquo;Morale&rdquo;
                        </span>
                        ,{" "}
                        <span className="bg-slate-200 px-1 py-0.25 rounded-sm">
                          &ldquo;Showcase&rdquo;
                        </span>
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                /> */}
                </DualColumn>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="relative w-full">
                <hr className="w-full h-px mt-3.5 border-0 bg-generate-green" />
                <CardTitle className="absolute pb-2 pr-3 font-mono font-bold uppercase bg-white dark:bg-slate-950 left-6">
                  Itemized Receipt(s)
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-8">
                <div className="p-4 text-sm border rounded-md border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
                  An itemized receipt is required for all purchases in order to
                  receive reimbursement.
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="relative w-full">
                <hr className="w-full h-px mt-3.5 border-0 bg-generate-green" />
                <CardTitle className="absolute pb-2 pr-3 font-mono font-bold uppercase bg-white dark:bg-slate-950 left-6">
                  Verify &amp; Submit
                </CardTitle>
              </CardHeader>

              <CardContent>
                <OctagonPauseIcon className="mt-4 size-16 text-generate-gold" />
                <p className="max-w-sm mt-4">
                  Before submitting, make sure that all information is 100%
                  correct. If it&rsquo;s not, processing may be delayed or
                  impossible.
                </p>

                <div className="inline-flex items-center gap-4 mt-8">
                  <Button
                    type="submit"
                    after={
                      loading ? (
                        <LoaderIcon className="animate-spin" />
                      ) : (
                        <ArrowRightIcon />
                      )
                    }
                    disabled={loading}
                  >
                    I&rsquo;m sure, submit
                  </Button>
                  {loading ? (
                    <span className="text-sm text-slate-600 dark:text-slate-400 animate-pulse animate-in">
                      Grab your coffee, this may take a minute...
                    </span>
                  ) : null}
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          <div className="space-y-8">
            <Card className="bg-slate-950 dark:bg-slate-50">
              <CardContent className="p-6 py-8">
                <div className="text-center">
                  <p className="text-sm uppercase text-slate-400 dark:text-slate-600">
                    Request No.
                  </p>
                  <p className="mt-1 font-mono text-7xl text-generate-green">
                    #{state.requestId}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="relative w-full">
                <hr className="w-full h-px my-3.5 border-0 bg-generate-green" />
                <CardTitle className="absolute pb-2 pr-3 font-mono font-bold uppercase bg-white dark:bg-slate-950 left-6">
                  Request Submitted!
                </CardTitle>
                <CardDescription>
                  <p>
                    Your request has been successfully submitted. If approved,
                    reimbursements are typically processed by Northeastern
                    within 2-3 weeks.
                  </p>

                  <p className="mt-2">
                    Please reach out in{" "}
                    <Link
                      href={
                        process.env.NEXT_PUBLIC_SLACK_HELP_CHANNEL_URL ?? "/"
                      }
                    >
                      <code>
                        #{process.env.NEXT_PUBLIC_SLACK_HELP_CHANNEL_NAME}
                      </code>
                    </Link>{" "}
                    if you have any questions or concerns.
                  </p>
                </CardDescription>
              </CardHeader>

              <CardContent>
                <Button before={<StretchHorizontalIcon />} asChild>
                  <Link href="/reimbursements">
                    View Reimbursement Requests
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </form>
    </Form>
  );
}

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="inline-flex items-center gap-2 p-3 font-mono font-semibold leading-none tracking-tight text-white uppercase border border-transparent rounded-md bg-generate-green dark:bg-slate-900 dark:border-slate-800 dark:text-generate-green">
    {children}
  </h3>
);

const DualColumn = ({ children }: { children: React.ReactNode[] }) => (
  <div className="grid grid-cols-1 gap-8 md:grid-cols-2">{children}</div>
);
