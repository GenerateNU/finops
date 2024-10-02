import { App as SlackApp } from "@slack/bolt";
import { z } from "zod";

const slackApp = new SlackApp({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

const schema = z.object({
  recipientEmail: z.string().email(),
  receiptFolderUrl: z.string().url(),
  requestId: z.string(),
});
type NotificationData = z.infer<typeof schema>;

export async function sendNotification(data: NotificationData) {
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
      blocks: [
        {
          type: "header",
          text: {
            type: "plain_text",
            text: ":warning: Action Required: Upload Itemized Receipt",
            emoji: true,
          },
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "Hi there! We received your Reimbursement Request.",
          },
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: "Please *upload your itemized receipt* as soon as possible. We cannot begin processing this reimbursement until you upload your receipt. Thanks!",
          },
        },
        {
          type: "context",
          elements: [
            {
              type: "mrkdwn",
              text: `*Request No*: ${parsed.data.requestId}`,
            },
          ],
        },
        {
          type: "actions",
          elements: [
            {
              type: "button",
              text: {
                type: "plain_text",
                text: "Upload Receipt",
              },
              style: "primary",
              url: parsed.data.receiptFolderUrl,
            },
            {
              type: "button",
              text: {
                type: "plain_text",
                text: "View All Requests",
              },
              url: process.env.MY_REIMBURSEMENT_REQUESTS_LINK,
            },
          ],
        },
      ],
    });
  } catch (err) {
    throw new Error("Unable to send Slack message");
  }
}
