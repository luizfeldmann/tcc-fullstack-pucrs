import { z } from "zod";

export const schemaStoreHours = z.object({
  weekday: z.number().min(0).max(7),
  opens: z.number().min(0).max(24),
  closes: z.number().min(0).max(24),
});

export type IStoreHours = z.infer<typeof schemaStoreHours>;

export const schemaStoreInfo = z.object({
  name: z.string(),
  address: z.string(),
  imageSrc: z.string(),
  description: z.string(),
  rating: z.number(),
  countRatings: z.number(),
  workingHours: z.array(schemaStoreHours),
});

export type IStoreInfo = z.infer<typeof schemaStoreInfo>;
