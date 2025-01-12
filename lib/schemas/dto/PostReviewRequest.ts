import { z } from "zod";

export const postReviewRequestSchema = z.object({
  storeId: z.string(),
  rating: z.number().min(0).max(5),
  comment: z.string(),
});

export type IPostReviewRequestData = z.infer<typeof postReviewRequestSchema>;
