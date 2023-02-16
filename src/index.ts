import * as core from "@actions/core";
import * as github from "@actions/github";

import { notifySlackWebhook } from "./notify";
import { publishedMessage } from "./publishedMessage";
import { publishedPackagesSchema } from "./schema";

(async () => {
  const dryRun = core.getBooleanInput("dryRun");
  const webhook = core.getInput("slackWebhook", { required: true });
  const publishedPackagesInput = core.getInput("publishedPackages", {
    required: true,
  });
  const linkRoot = core.getInput("linkRoot") || "https://github.com";

  const publishedPackages = publishedPackagesSchema.parse(
    JSON.parse(publishedPackagesInput)
  );
  const repo = `${github.context.repo.owner}/${github.context.repo.repo}`;
  const message = publishedMessage(
    publishedPackages,
    `${linkRoot}/${repo}`,
    repo
  );

  if (!dryRun) {
    await notifySlackWebhook(webhook, message.buildToJSON());
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
