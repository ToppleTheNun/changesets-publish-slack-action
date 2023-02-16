import { expect, it } from "vitest";

import example from "./__fixtures__/example.json";
import { publishedMessage } from "./publishedMessage";
import type { PublishedPackages } from "./schema";

it("has 1 block when no packages were published", async () => {
  const packages: PublishedPackages = [];
  const repoLink = "https://github.com/test/test";
  const repoShorthand = "test/test";

  const message = publishedMessage(packages, repoLink, repoShorthand);

  expect(message.buildToObject().blocks).toHaveLength(1);
});

it("has 2 blocks when no packages were published", async () => {
  const packages: PublishedPackages = [{ name: "test", version: "0.0.0" }];
  const repoLink = "https://github.com/test/test";
  const repoShorthand = "test/test";

  const message = publishedMessage(packages, repoLink, repoShorthand);

  expect(message.buildToObject().blocks).toHaveLength(2);
});

it("outputs the expected format", async () => {
  const packages: PublishedPackages = [{ name: "test", version: "0.0.0" }];
  const repoLink = "https://github.com/test/test";
  const repoShorthand = "test/test";

  const message = publishedMessage(packages, repoLink, repoShorthand);

  expect(JSON.parse(message.buildToJSON())).toEqual(example);
});
