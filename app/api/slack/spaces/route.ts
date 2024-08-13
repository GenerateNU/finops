import { NextResponse } from "next/server";
import { App as SlackApp } from "@slack/bolt";
import { z } from "zod";

// Define Zod schema for request validation
const schema = z.object({
  token: z.string(),
  team_id: z.string(),
  team_domain: z.string(),
  channel_id: z.string(),
  channel_name: z.string(),
  user_id: z.string(),
  user_name: z.string(),
  command: z.string(),
  text: z.string(),
  response_url: z.string().url(),
  trigger_id: z.string(),
});

// Initialize Slack Bolt app
const slackApp = new SlackApp({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

async function parseFormData(req: Request) {
  const formData = await req.formData();
  const data: { [key: string]: string } = {};
  formData.forEach((value, key) => {
    data[key] = value.toString();
  });
  return data;
}

export async function POST(request: Request) {
  try {
    const req = await parseFormData(request);
    console.log("req", req);
    const parsed = schema.safeParse(req);
    console.log("parsed", parsed);

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Invalid request",
        },
        { status: 400 },
      );
    }

    // acknowledge message
    await fetch(parsed.data?.response_url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    // respond to message
    await fetch(parsed.data?.response_url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: "Success" }),
    });

    return NextResponse.json({ message: "Command received!" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
