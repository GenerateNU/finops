"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRightIcon,
  CalendarIcon,
  LoaderIcon,
  OctagonPauseIcon,
  StretchHorizontalIcon,
  TriangleAlert,
  UploadCloudIcon,
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
import { EXPENSE_PURPOSE_OPTIONS } from "@/lib/globals";
import { camelize, cn, getEnv } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { AutoFilledInput, Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { BudgetPicker } from "@/components/BudgetPicker";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { formSchema } from "./form-schema";
import { onSubmitAction } from "./form-submit";

export function ExpenseVoucherForm({ session }: { session: Session }) {
  const [loading, setTransitioning] = useTransition();
  const [selectedPurpose, setSelectedPurpose] = useState("");
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
      nuid: session.user?.nuid ?? "",
      address: "",

      transactionDate: new Date(),
      expenseTotal: "",
      expensePurpose: "",
      budget: "",
      expenseDescription: "",
      preApproved: false,

      hasReceipt: false,
      ...(state?.fields ?? {}),
    },
    // TEST DATA:
    // defaultValues: {
    //   name: "Burton Guster",
    //   email: "burton.g@northeastern.edu",
    //   nuid: "002156789",
    //   address: "123 Somewhere St, Boston, MA 12345"

    //   transactionDate: new Date(),
    //   expenseTotal: "5.00",
    //   expensePurpose: "Morale",
    //   budget: ""
    //   expenseDescription: "Testing",
    //   preApproved: false,
    //
    //   hasReceipt: true,
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
        {!state.success ? (
          <>
            <div>
              {state?.message !== "" && !state.issues && (
                <div
                  className={state.success ? "text-green-500" : "text-red-500"}
                >
                  {state.message}
                </div>
              )}
              {state.issues && (
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
              <CardHeader>
                <CardTitle>Purchaser</CardTitle>
              </CardHeader>

              <CardContent className="space-y-6">
                <DualColumn>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <AutoFilledInput
                            autoComplete="name"
                            placeholder="Burton Guster"
                            readOnly
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
                          <AutoFilledInput
                            type="email"
                            autoComplete="email"
                            placeholder="burton.guster@generatenu.com"
                            readOnly
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
                          <AutoFilledInput
                            placeholder="001234567"
                            readOnly
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Your official 9-digit NUID.
                        </FormDescription>
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
              <CardHeader>
                <CardTitle>Expense</CardTitle>
              </CardHeader>

              <CardContent className="space-y-8">
                <DualColumn>
                  <FormField
                    control={form.control}
                    name="transactionDate"
                    render={({ field }) => (
                      <>
                        <FormItem className="flex flex-col mt-1.5">
                          <FormLabel className="pb-1">
                            Transaction date
                          </FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "h-9 pl-3 text-left font-normal shadow-sm",
                                    !field.value &&
                                      "text-slate-700 dark:text-slate-300"
                                  )}
                                >
                                  {field.value ? (
                                    dayjs(field.value).format("MMMM D, YYYY")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date > new Date() ||
                                  date < new Date("1900-01-01")
                                }
                                autoFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormDescription>
                            The date on your receipt.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                        <input
                          type="hidden"
                          name={field.name}
                          value={field.value?.toISOString()}
                        />
                      </>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="expenseTotal"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Total amount desired ($)</FormLabel>
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
                    name="expensePurpose"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Purpose</FormLabel>
                        <Select
                          name={field.name}
                          value={field.value}
                          defaultValue={field.value}
                          onValueChange={(value) => {
                            field.onChange(value);
                            form.setValue("budget", "");
                            setSelectedPurpose(value);
                          }}
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
                          The primary reason for this expense.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <BudgetPicker<z.output<typeof formSchema>>
                    name="budget"
                    session={session}
                    form={form}
                    purpose={selectedPurpose}
                  />
                </DualColumn>

                <DualColumn>
                  <FormField
                    control={form.control}
                    name="expenseDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Input placeholder="Pizza and soda" {...field} />
                        </FormControl>
                        <FormDescription>
                          A brief description of the item(s) purchased.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <></>
                </DualColumn>

                {form.getValues().expensePurpose !== "Morale" &&
                  Number(form.getValues().expenseTotal) > 75 && (
                    <FormField
                      control={form.control}
                      name="preApproved"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox
                              name={field.name}
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-2 leading-none">
                            <FormLabel>Pre-approved</FormLabel>
                            <FormDescription className="leading-tight">
                              Did you receive approval from the Operations
                              Director or CFO prior to making this transaction?
                              See{" "}
                              <Link
                                href="https://www.notion.so/generate-nu/Procurement-Reimbursements-5e02a4837a6b424990237b436dce066a?pvs=4"
                                target="_blank"
                                className="text-generate-blue"
                              >
                                Procurement &amp; Reimbursements
                              </Link>{" "}
                              for more info.
                            </FormDescription>
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />
                  )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Itemized Receipt</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="p-4 text-sm border rounded-md border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
                  An itemized receipt is required for all purchases in order to
                  receive reimbursement. It must show the vendor name, purchase
                  date, items purchased, total price, and payment method.
                  <br />
                  <br />
                  <strong>
                    On the next page, you will need to upload your receipt.
                  </strong>{" "}
                  Without this, your request will not be processed.
                </div>

                <FormField
                  control={form.control}
                  name="hasReceipt"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          name={field.name}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-2 leading-none">
                        <FormLabel>Yes, I have it!</FormLabel>
                        <FormDescription className="leading-tight">
                          I acknowledge the itemized receipt requirement, have
                          one on-hand for this transaction which meets the
                          requirements, and will upload it immediately after
                          submitting this form on the next page.
                        </FormDescription>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Verify &amp; Submit</CardTitle>
              </CardHeader>

              <CardContent>
                <div className="flex flex-row gap-4 items-center">
                  <OctagonPauseIcon className="size-24 text-generate-gold" />
                  <p className="leading-snug">
                    Before submitting, make sure that all information is 100%
                    correct. If it&rsquo;s not, processing may be delayed or
                    impossible.
                  </p>
                </div>

                {state.issues ? (
                  <Alert variant="destructive" className="mt-4">
                    <TriangleAlert className="size-4" />
                    <AlertTitle className="font-semibold">Oh no!</AlertTitle>
                    <AlertDescription>
                      There are errors! Please review them at the top of the
                      form in red.
                    </AlertDescription>
                  </Alert>
                ) : null}

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
                      Grab a coffee, this may take a minute...
                    </span>
                  ) : null}
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Upload Receipt</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    To complete your reimbursement request, please upload an
                    itemized receipt for this transaction.
                  </p>

                  <div className="mt-8 flex gap-4">
                    <Button before={<UploadCloudIcon />} asChild>
                      <Link href={state.receiptsFolderUrl!} target="_blank">
                        Upload
                      </Link>
                    </Button>
                    {/* <Button variant="link" before={<CheckIcon />}>
                      I&apos;m done uploading
                    </Button> */}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-slate-950 dark:bg-slate-50">
                <CardContent className="p-6 py-8 h-full flex items-center justify-center pt-6">
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
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Next Steps</CardTitle>
              </CardHeader>

              <CardContent>
                <p>
                  Once you upload your receipt, your request is submitted for
                  review. If approved, reimbursements are typically processed by
                  Northeastern within 3-4 weeks. Please reach out in{" "}
                  <Link
                    href={getEnv("NEXT_PUBLIC_SLACK_HELP_CHANNEL_URL")}
                    target="_blank"
                  >
                    <code>
                      #{getEnv("NEXT_PUBLIC_SLACK_HELP_CHANNEL_NAME")}
                    </code>
                  </Link>{" "}
                  if you have any questions or concerns.
                </p>

                <Button
                  className="mt-8"
                  before={<StretchHorizontalIcon />}
                  asChild
                >
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

const DualColumn = ({ children }: { children: React.ReactNode[] }) => (
  <div className="grid grid-cols-1 gap-8 md:grid-cols-2">{children}</div>
);
