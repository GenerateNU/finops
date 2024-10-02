import { App as SlackApp } from "@slack/bolt";
import { z } from "zod";

const slackApp = new SlackApp({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

const schema = z.object({
  requestorName: z.string(),
  requestorEmail: z.string().email(),
  teamName: z.string(),
  purpose: z.string(),
  budget: z.string(),
  vendorName: z.string(),
  productDescription: z.string(),
  productLink: z.string().url(),
  requestId: z.string(),
});
type NotificationData = z.infer<typeof schema>;

export async function sendNewOrderNotification(data: NotificationData) {
  const parsed = schema.safeParse(data);

  if (!parsed.success) {
    throw new Error("Invalid data provided");
  }

  try {
    const destSlackChannelId = process.env.NEXT_PUBLIC_SLACK_FINANCE_INTERNAL_CHANNEL_ID
    if (!destSlackChannelId) throw new Error("NEXT_PUBLIC_SLACK_FINANCE_INTERNAL_CHANNEL_ID environment variable not specified");

    const requestorId = await slackApp.client.users
      .lookupByEmail({
        email: parsed.data.requestorEmail,
      })
      .then((res) => res.user?.id);
    if (!requestorId) {
      throw new Error(
        "The specified email address is not associated with any Slack profiles"
      );
    }

    slackApp.client.chat.postMessage({
      channel: destSlackChannelId,
      text: `New Order Requested: #${parsed.data.requestId}`,
      blocks: [
        {
          type: "header",
          text: {
            type: "plain_text",
            text: `:new: Order #${parsed.data.requestId} Requested for ${parsed.data.teamName}`,
            emoji: true,
          },
        },
        {
          "type": "section",
          "fields": [
            {
              "type": "mrkdwn",
              "text": `*Submitter:*\n<@${requestorId}>`
            },
            {
              "type": "mrkdwn",
              "text": `*Team:*\n${parsed.data.teamName}`
            },
            {
              "type": "mrkdwn",
              "text": `*Purpose:*\n${parsed.data.purpose}`
            },
            {
              "type": "mrkdwn",
              "text": `*Budget:*\n${parsed.data.budget}`
            },
            {
              "type": "mrkdwn",
              "text": `*Vendor:*\n${parsed.data.vendorName}`
            },
            {
              "type": "mrkdwn",
              "text": `*Product:*\n<${parsed.data.productLink}|${parsed.data.productDescription}>`
            }
          ]
        }
      ],
      unfurl_links: false,
    });
  } catch (err) {
    throw new Error("Unable to send Slack message");
  }
}
