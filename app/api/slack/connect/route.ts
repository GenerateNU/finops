export const dynamic = "force-dynamic";

import { App as SlackApp } from "@slack/bolt";
import { NextResponse } from "next/server";
import { z } from "zod";

const slackApp = new SlackApp({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

const schema = z.object({ email: z.string().email() });

export async function POST(request: Request) {
  const req = await request.json();
  const parsed = schema.safeParse(req);

  if (!parsed.success) {
    return NextResponse.json(
      {
        message: "Invalid request",
      },
      { status: 400 }
    );
  }

  try {
    // get user's ID from their email
    const userId = await slackApp.client.users
      .lookupByEmail({ email: parsed.data.email })
      .then((res) => res.user?.id);
    if (!userId) {
      return NextResponse.json(
        {
          message:
            "The specified email address is not associated with any Slack profiles",
        },
        { status: 404 }
      );
    }

    // TODO: store user ID in member roster

    // create DM
    const dmId = await slackApp.client.conversations
      .open({ users: userId })
      .then((res) => res.channel?.id);
    if (!dmId) {
      return NextResponse.json(
        {
          message: "Conversation not created",
        },
        { status: 500 }
      );
    }

    // send intro message
    slackApp.client.chat.postMessage({
      channel: dmId,
      text: `Hey <@${userId}>! Thanks for connecting your Slack profile with Generate FinOps.`,
    });
  } catch (err) {
    return NextResponse.json(
      {
        message: "Unable to connect profile",
      },
      { status: 500 }
    );
  }

  return NextResponse.json({ message: "Profile connected" });
}
