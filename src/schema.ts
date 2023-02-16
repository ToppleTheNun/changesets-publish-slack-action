import { z } from "zod";
export const publishedPackageSchema = z.object({
  name: z.string(),
  version: z.string(),
});
export type PublishedPackage = z.infer<typeof publishedPackageSchema>;

export const publishedPackagesSchema = z.array(publishedPackageSchema);
export type PublishedPackages = z.infer<typeof publishedPackagesSchema>;
