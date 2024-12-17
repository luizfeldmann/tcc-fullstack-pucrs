import { z } from "zod";

export const storeHoursSchema = z.object({
  weekday: z.number().min(0).max(7),
  opens: z.number().min(0).max(24),
  closes: z.number().min(0).max(24),
});

export type IStoreHours = z.infer<typeof storeHoursSchema>;

export const storeDetailsSchema = z.object({
  id: z.string(),
  name: z.string(),
  address: z.string(),
  imageSrc: z.string(),
  description: z.string(),
  rating: z.number(),
  countRatings: z.number(),
  workingHours: z.array(storeHoursSchema),
});

export type IStoreDetailsResponseData = z.infer<typeof storeDetailsSchema>;
