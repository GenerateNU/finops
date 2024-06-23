"use client";

import { Button } from "@/components/ui/button";
import { ArrowRightIcon, BadgeAlertIcon, Loader } from "lucide-react";
import { Session } from "next-auth";
import { useState } from "react";
import { toast } from "sonner";

export function SlackConnectionBanner({ session }: { session: Session }) {
  const [loading, setLoading] = useState(false);
  const [connected, setConnected] = useState(false);

  // this component is currently disabled
  // TODO: enable
  return null;

  if (!session || !session.user || !session.user.email) return null;

  if (connected) return null;

  async function connectSlackProfile(email: string) {
    setLoading(true);

    await fetch("/api/slack/connect", {
      method: "POST",
      body: JSON.stringify({ email }),
    })
      .then(() => {
        setConnected(true);
        toast.success("Slack profile connected!");
      })
      .catch((err) => {
        console.log(err.response);
        toast.error("Unable to connect Slack profile");
      })
      .finally(() => setLoading(false));
  }

  return (
    <div className="flex justify-between w-full p-4 border-b border-slate-200 bg-slate-50 dark:bg-slate-700 dark:border-slate-600">
      <div className="flex items-center mx-auto">
        <p className="flex items-center text-sm font-normal text-slate-700 dark:text-slate-300">
          <span className="inline-flex p-1.5 me-3 bg-slate-200 rounded-full dark:bg-slate-600 w-7 h-7 items-center justify-center flex-shrink-0">
            <BadgeAlertIcon />
          </span>
          <span>Please connect your Slack profile.</span>

          <Button
            type="submit"
            size="xs"
            after={
              loading ? <Loader className="animate-spin" /> : <ArrowRightIcon />
            }
            className="ms-3"
            onClick={() => connectSlackProfile(session.user.email!)}
          >
            Connect
          </Button>
        </p>
      </div>
    </div>
  );
}
