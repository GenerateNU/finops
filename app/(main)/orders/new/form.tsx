"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRightIcon,
  LoaderIcon,
  LockIcon,
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

import {
  BRANCH_TEAMS,
  BRANCHES,
  EXPENSE_PURPOSE_OPTIONS,
  VENDORS,
} from "@/lib/globals";
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

export function OrderForm({ session }: { session: Session }) {
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
      budgetBranch: undefined,
      budgetTeam: undefined,
      vendor: undefined,
      productLink: "",
      productDescription: "",
      productQuantity: "1",
      productCost: "",
      purpose: "",
      ...(state?.fields ?? {}),
    },
    // TEST DATA:
    // defaultValues: {
    //   name: "Burton Guster",
    //   email: "burton.g@northeastern.edu",
    //   budgetBranch: "Engagement",
    //   budgetTeam: "Events",
    //   vendor: "Amazon",
    //   productLink: "https://example.com",
    //   productDescription: "Lorem ipsum delor",
    //   productQuantity: "1",
    //   productCost: "23.45",
    //   purpose: "Morale",
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
                  Requestor
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-8">
                <DualColumn>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="name">Name</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              id="name"
                              placeholder="Burton Guster"
                              className="pl-11"
                              readOnly
                              {...field}
                            />
                            <div className="absolute inset-y-0 flex items-center justify-center start-0 aspect-square shrink-0 bg-slate-200 dark:bg-slate-800 rounded-l-md text-slate-400 dark:text-slate-600">
                              <LockIcon className="size-4" />
                            </div>
                          </div>
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
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              id="email"
                              type="email"
                              placeholder="burton.guster@generatenu.com"
                              className="pl-11"
                              readOnly
                              {...field}
                            />
                            <div className="absolute inset-y-0 flex items-center justify-center start-0 aspect-square shrink-0 bg-slate-200 dark:bg-slate-800 rounded-l-md text-slate-400 dark:text-slate-600">
                              <LockIcon className="size-4" />
                            </div>
                          </div>
                        </FormControl>
                        <FormDescription>
                          Your official Northeastern email address.
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
                  Product
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-8">
                <DualColumn>
                  <FormField
                    control={form.control}
                    name="vendor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Vendor</FormLabel>
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
                                placeholder="Select a vendor"
                              />
                            </SelectTrigger>
                          </FormControl>

                          <SelectContent>
                            {VENDORS.map((vendor) => (
                              <SelectItem key={camelize(vendor)} value={vendor}>
                                {vendor}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Where is this item sold?
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="productLink"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product link</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="https://example.com/product-page"
                            type="url"
                          />
                        </FormControl>
                        <FormDescription>
                          A direct link to the desired item's product page, with
                          all configuration options applied, if applicable and
                          possible.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </DualColumn>

                <FormField
                  control={form.control}
                  name="productDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product description</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder={
                            "3.2 ft x 9.8 ft Metallic Tinsel Foil Fringe Curtains (Green)"
                          }
                        />
                      </FormControl>
                      <FormDescription>
                        A detailed description of the desired product. Include
                        any necessary product configurations, such as size,
                        bundle quantity, or color.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <TripleColumn>
                  <FormField
                    control={form.control}
                    name="productQuantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quantity</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="1"
                            type="number"
                            min="0"
                          />
                        </FormControl>
                        <FormDescription>
                          How many of this product to buy. A requested quantity
                          of 2 for a product sold as a 3-pack would result in 6
                          total items.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="productCost"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cost ($)</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="12.34"
                            type="number"
                            min="0"
                            step="any"
                          />
                        </FormControl>
                        <FormDescription>
                          This product's expected list price.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="purpose"
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
                          What is this purchase for?
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TripleColumn>
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

                <div className="mt-8">
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
                    #{state.requestNo}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Request Submitted!</CardTitle>
                <CardDescription>
                  <p>
                    Your order request has been successfully submitted. If
                    approved, orders are typically placed on{" "}
                    {process.env.NEXT_PUBLIC_ORDER_PLACEMENT_SCHEDULE}.
                  </p>

                  <p>
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
                  <Link href="/orders">View Order Requests</Link>
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

const TripleColumn = ({ children }: { children: React.ReactNode[] }) => (
  <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
    {children}
  </div>
);
