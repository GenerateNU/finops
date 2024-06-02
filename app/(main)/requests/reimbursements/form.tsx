"use client";

import {
  ArrowRightIcon,
  CheckIcon,
  HomeIcon,
  ScanEyeIcon,
  XIcon,
} from "lucide-react";
import { Session } from "next-auth";
import { useRef } from "react";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";

import dayjs from "@/lib/dayjs";
import { zodResolver } from "@hookform/resolvers/zod";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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

import Link from "next/link";
import { formSchema } from "./form-schema";
import { onSubmitAction } from "./form-submit";

export function VoucherForm({ session }: { session: Session }) {
  const [state, formAction] = useFormState(onSubmitAction, {
    success: false,
    message: "",
  });

  // define form
  const form = useForm<z.output<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: session.user?.name ?? "",
      email: session.user?.email ?? "",
      nuid: "",
      address: "",
      expenseDate: dayjs().format("YYYY-MM-DD"),
      expenseTotal: "",
      expenseDescription: "",
      expensePurpose: "",
      ...(state?.fields ?? {}),
    },
    // TEST DATA:
    // defaultValues: {
    //   name: "Burton Guster",
    //   email: "burton.guster@northeastern.edu",
    //   nuid: "002156789",
    //   address: "360 Huntington Ave, Boston, MA 02120",
    //   expenseDate: dayjs().subtract(6, "days").format("YYYY-MM-DD"),
    //   expenseTotal: "23.45",
    //   expenseDescription: "Pizza and soda",
    //   expensePurpose: "Morale",
    //   ...(state?.fields ?? {}),
    // },
  });

  const formRef = useRef<HTMLFormElement>(null);

  return (
    <Form {...form}>
      <form
        ref={formRef}
        action={formAction}
        onSubmit={(ev) => {
          // ev.preventDefault();
          form.handleSubmit(() => {
            formAction(new FormData(formRef.current ?? undefined));
          })(ev);
        }}
      >
        {!state.success ? (
          <Card>
            <CardHeader>
              <CardTitle>Request Reimbursement</CardTitle>
              <CardDescription>
                Seek reimbursement for pre-approved Generate expenses personally
                incurred. Typically, these should only be{" "}
                <strong>morale</strong>
                -related purchases.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-8">
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

              <SectionTitle>Purchaser Info</SectionTitle>

              <DualColumn>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Burton Guster" {...field} />
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
                          placeholder="360 Huntington Ave, Boston, MA 02120"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Your full mailing address where you can receive a check.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </DualColumn>

              <SectionTitle>Expense Info</SectionTitle>

              <DualColumn>
                <FormField
                  control={form.control}
                  name="expenseDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Expense Date</FormLabel>
                      <FormControl>
                        <Input placeholder="YYYY-MM-DD" {...field} />
                      </FormControl>
                      <FormDescription>
                        This must be the date the transaction occurred and match
                        the date on your receipt.
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
                              !field.value && "text-muted-foreground"
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
                />
              </DualColumn>
            </CardContent>

            <CardFooter className="flex flex-col items-start gap-4 px-6 py-4 border-t">
              <Alert>
                <ScanEyeIcon className="size-4" />
                <AlertTitle className="font-semibold">
                  Did you triple check?
                </AlertTitle>
                <AlertDescription>
                  Before submitting, make sure that all information is 100%
                  correct. If it&rsquo;s not, processing may be delayed or
                  impossible.
                </AlertDescription>
              </Alert>

              <Button type="submit" after={<ArrowRightIcon />}>
                Submit
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Request Reimbursement</CardTitle>
              <CardDescription>
                Seek reimbursement for pre-approved Generate expenses personally
                incurred. Typically, these should only be{" "}
                <strong>morale</strong>
                -related purchases.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-8">
              <Alert>
                <CheckIcon className="size-4" />
                <AlertTitle className="font-semibold">
                  Request submitted!
                </AlertTitle>
                <AlertDescription>
                  <p>
                    Your reimbursement request has been successfully submitted.
                    If approved, reimbursements are typically processed by
                    Northeastern within 2-3 weeks.
                  </p>

                  {state.url ? (
                    <Button
                      className="mt-4"
                      variant="outline"
                      size="sm"
                      after={<ArrowRightIcon />}
                      asChild
                    >
                      <Link href={state.url} target="_blank">
                        View Generated Voucher
                      </Link>
                    </Button>
                  ) : null}
                </AlertDescription>
              </Alert>
            </CardContent>

            <CardFooter className="flex flex-col items-start gap-4 px-6 py-4 border-t">
              <Button before={<HomeIcon />} asChild>
                <Link href="/">Go Home</Link>
              </Button>
            </CardFooter>
          </Card>
        )}
      </form>
    </Form>
  );
}

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="font-semibold font-mono uppercase leading-none tracking-tight p-3 border-b bg-[#6FCF97] text-white rounded-md section-header">
    {children}
  </h3>
);

const DualColumn = ({ children }: { children: React.ReactNode[] }) => (
  <div className="grid grid-cols-1 gap-y-8 gap-x-12 md:grid-cols-2">
    {children}
  </div>
);
