import { z } from "zod";

export const reviewListItemSchema = z.object({
  userName: z.string(),
  date: z.coerce.date(),
  rating: z.number().min(0).max(5),
  comment: z.string(),
});

export type IReviewListItem = z.infer<typeof reviewListItemSchema>;

export const getReviewsResponseSchema = z.object({
  own: reviewListItemSchema.optional(),
  others: z.array(reviewListItemSchema),
});

export type IGetReviewsResponseData = z.infer<typeof getReviewsResponseSchema>;
