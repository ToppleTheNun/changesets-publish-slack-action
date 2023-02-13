import fetch from "node-fetch";

export const notifySlackWebhook = async (
  webhookUrl: string,
  message: string
) => {
  const response = await fetch(webhookUrl, {
    method: "POST",
    body: JSON.stringify({
      blocks: [
        {
          type: "section",
          text: { type: "mrkdwn", text: message },
        },
      ],
    }),
  });
  return response.text();
};
