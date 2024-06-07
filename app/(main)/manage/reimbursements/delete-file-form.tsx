"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LoaderIcon, TrashIcon, TriangleAlert, XIcon } from "lucide-react";
import { useEffect, useRef, useTransition } from "react";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
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

import { formSchema } from "./form-schema";
import { onSubmitAction } from "./form-submit";

export function DeleteFileForm() {
  const [loading, setTransitioning] = useTransition();
  const [state, formAction] = useFormState(onSubmitAction, {
    success: false,
    message: "",
  });

  // define form
  const form = useForm<z.output<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fileId: "",
      ...(state?.fields ?? {}),
    },
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
        className="-mt-4 space-y-4"
        onSubmit={(ev) => {
          setTransitioning(async () => {
            form.handleSubmit(() => {
              formAction(new FormData(formRef.current ?? undefined));
            })(ev);
          });
        }}
      >
        {!state.success && state?.message !== "" && (
          <Alert
            variant={!state.success ? "destructive" : "default"}
            className="mt-0 mb-4"
          >
            <TriangleAlert className="size-4" />
            <AlertTitle className="font-semibold">{state.message}</AlertTitle>

            {state?.issues && state.issues.length > 0 && (
              <AlertDescription>
                <ul className="text-red-500">
                  {state.issues.map((issue, i) => (
                    <li key={`${issue}-${i}`} className="flex gap-1">
                      <XIcon />
                      {issue}
                    </li>
                  ))}
                </ul>
              </AlertDescription>
            )}
          </Alert>
        )}

        <FormField
          control={form.control}
          name="fileId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>File ID</FormLabel>
              <FormControl>
                <Input placeholder="..." {...field} />
              </FormControl>
              <FormDescription>
                The Google Drive file ID of the file to delete.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          variant="destructive"
          before={!loading ? <TrashIcon /> : undefined}
          after={loading ? <LoaderIcon className="animate-spin" /> : undefined}
          disabled={loading}
        >
          Permanently delete file
        </Button>
      </form>
    </Form>
  );
}
