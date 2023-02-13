import * as core from "@actions/core";
import * as github from "@actions/github";

import { notifySlackWebhook } from "./notify";
import { publishedPackagesSchema } from "./schema";

(async () => {
  const webhook = core.getInput("slackWebhook", { required: true });
  const publishedPackagesInput = core.getInput("publishedPackages", {
    required: true,
  });
  const publishedPackages = publishedPackagesSchema.parse(
    JSON.parse(publishedPackagesInput)
  );
  const repo = `${github.context.repo.owner}/${github.context.repo.repo}`;
  const message = `🦋 A new version of [${repo}](https://github.com/${repo}) has been published!!\n\`\`\`${publishedPackages.map(
    (x) => `${x.name}@${x.version}`
  )}\`\`\``;

  await notifySlackWebhook(webhook, message);
})().catch((e) => {
  console.error(e);
  if (
    typeof e === "object" &&
    e != null &&
    "message" in e &&
    typeof e.message === "string"
  ) {
    core.setFailed(e.message);
  } else {
    core.setFailed("Unable to determine why, but it failed!");
  }
});
