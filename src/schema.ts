import { z } from "zod";
export const publishedPackageSchema = z.object({
  name: z.string(),
  version: z.string(),
});

export const publishedPackagesSchema = z.array(publishedPackageSchema);
