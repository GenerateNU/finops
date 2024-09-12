import { App as SlackApp } from "@slack/bolt";
import { z } from "zod";

const slackApp = new SlackApp({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

const schema = z.object({
  recipientEmail: z.string().email(),
});
type NotificationData = z.infer<typeof schema>;

export async function sendOrderConfirmation(data: NotificationData) {
  const parsed = schema.safeParse(data);

  if (!parsed.success) {
    throw new Error("Invalid data provided");
  }

  try {
    const userId = await slackApp.client.users
      .lookupByEmail({
        email: parsed.data.recipientEmail,
      })
      .then((res) => res.user?.id);
    if (!userId) {
      throw new Error(
        "The specified email address is not associated with any Slack profiles"
      );
    }

    const dmId = await slackApp.client.conversations
      .open({
        users: userId,
      })
      .then((res) => res.channel?.id);
    if (!dmId) throw new Error("Conversation not created");

    slackApp.client.chat.postMessage({
      channel: dmId,
      text: "Error: Order Not Submitted",
      blocks: [
        {
          type: "header",
          text: {
            type: "plain_text",
            text: ":internet-problems: Error: Order Not Submitted",
            emoji: true,
          },
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "Hi there, we could not process your order request. Please send a message in #ops-help.",
          },
        },
      ],
    });
  } catch (err) {
    throw new Error("Unable to connect profile");
  }
}
