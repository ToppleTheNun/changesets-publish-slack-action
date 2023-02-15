import * as core from "@actions/core";
import * as github from "@actions/github";

import { notifySlackWebhook } from "./notify";
import { publishedPackagesSchema } from "./schema";

(async () => {
  const dryRun = core.getBooleanInput("dryRun");
  const webhook = core.getInput("slackWebhook", { required: true });
  const publishedPackagesInput = core.getInput("publishedPackages", {
    required: true,
  });
  const publishedPackages = publishedPackagesSchema.parse(
    JSON.parse(publishedPackagesInput)
  );
  const repo = `${github.context.repo.owner}/${github.context.repo.repo}`;
  const joinedPublishedPackages = publishedPackages
    .map((x) => `${x.name}@${x.version}`)
    .join("\n");
  const message = `🦋 A new version of <${repo}|https://github.com/${repo}> has been published!!\n\`\`\`${joinedPublishedPackages}\`\`\``;

  if (!dryRun) {
    await notifySlackWebhook(webhook, message);
  } else {
    console.log("Dry run enabled, printing message instead!");
    console.log(message);
  }
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
