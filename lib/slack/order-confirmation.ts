import { App as SlackApp } from "@slack/bolt";
import { z } from "zod";
import { getEnv } from "../utils";

const slackApp = new SlackApp({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

const schema = z.object({
  recipientEmail: z.string().email(),
  requestId: z.string(),
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
      text: `Order #${parsed.data.requestId} Submitted!`,
      blocks: [
        {
          type: "header",
          text: {
            type: "plain_text",
            text: `:white_check_mark: Order #${parsed.data.requestId} Submitted!`,
            emoji: true,
          },
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `Hi <@${userId}>, we received your order request.`,
          },
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `Orders are placed on ${getEnv("NEXT_PUBLIC_ORDER_PLACEMENT_SCHEDULE")}.`,
          },
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `Please reach out in #${getEnv("NEXT_PUBLIC_SLACK_HELP_CHANNEL_NAME")} with any questions. Thanks!`,
          },
        },
        {
          type: "actions",
          elements: [
            {
              type: "button",
              text: {
                type: "plain_text",
                text: "View All Order Requests",
              },
              style: "primary",
              url: process.env.MY_ORDER_REQUESTS_LINK,
            },
          ],
        },
      ],
    });
  } catch (err) {
    throw new Error("Unable to connect profile");
  }
}

export async function sendOrderConfirmationError(data: NotificationData) {
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
            text: `Hi there, we could not process your order request. Please send a message in #${getEnv("NEXT_PUBLIC_SLACK_HELP_CHANNEL_NAME")}.`,
          },
        },
      ],
    });
  } catch (err) {
    throw new Error("Unable to send Slack message");
  }
}
