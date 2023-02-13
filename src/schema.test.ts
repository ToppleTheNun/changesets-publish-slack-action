import { describe, expect, it } from "vitest";

import { publishedPackageSchema, publishedPackagesSchema } from "./schema";

describe("publishedPackageSchema", () => {
  it("parses a published package", () => {
    const good = JSON.parse('{"name":"good","version":""}');

    const parsed = publishedPackageSchema.parse(good);

    expect(parsed.name).toEqual("good");
    expect(parsed.version).toEqual("");
  });

  it("fails to parse an invalid published package", () => {
    const bad = JSON.parse('{"name":"bad","version":0}');

    expect(() => publishedPackageSchema.parse(bad)).toThrowError();
  });
});

describe("publishedPackagesSchema", () => {
  it("parses a list of published package", () => {
    const good = JSON.parse('[{"name":"good","version":""}]');

    const parsed = publishedPackagesSchema.parse(good);

    expect(parsed).toHaveLength(1);
    expect(parsed.at(0)).toBeDefined();

    expect(parsed.at(0)?.name).toEqual("good");
    expect(parsed.at(0)?.version).toEqual("");
  });

  it("fails to parse a list of invalid published packages", () => {
    const bad = JSON.parse('[{"name":"bad","version":0}]');

    expect(() => publishedPackagesSchema.parse(bad)).toThrowError();
  });
});
