import { Blocks, Md, Message } from "slack-block-builder";
import dedent from "ts-dedent";

import type { PublishedPackages } from "./schema";

export const publishedMessage = (
  packages: PublishedPackages,
  repoLink: string,
  repoShorthand: string
) => {
  let message = Message()
    .asUser()
    .blocks(
      Blocks.Section({
        text: dedent`
        ${Md.emoji("butterfly")} A new version of ${Md.link(
          repoLink,
          repoShorthand
        )} has been published!
      `,
      })
    );
  if (packages.length > 0) {
    message = message.blocks(
      Blocks.Section({
        text: Md.codeBlock(
          packages.map((x) => `${x.name}@${x.version}`).join("\n")
        ),
      })
    );
  }
  return message;
};
